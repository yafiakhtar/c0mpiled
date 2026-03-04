import type { ExtractedPage } from "@/lib/types";

function normalizeText(value: string) {
  return value
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function lineFrequency(lines: string[]) {
  const counts = new Map<string, number>();

  for (const line of lines) {
    if (!line) {
      continue;
    }

    counts.set(line, (counts.get(line) ?? 0) + 1);
  }

  return counts;
}

function stripRepeatedEdgeLines(pages: ExtractedPage[]) {
  const firstLines = pages.map((page) => page.text.split(/\n+/)[0]?.trim() ?? "");
  const lastLines = pages.map((page) => {
    const lines = page.text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
    return lines.at(-1) ?? "";
  });
  const firstCounts = lineFrequency(firstLines);
  const lastCounts = lineFrequency(lastLines);
  const threshold = Math.max(2, Math.ceil(pages.length / 2));

  return pages.map((page) => {
    const lines = page.text.split(/\n+/).map((line) => line.trim()).filter(Boolean);

    if (!lines.length) {
      return page;
    }

    const firstLine = lines[0];
    const lastLine = lines.at(-1) ?? "";

    if (firstLine && firstLine.length < 120 && (firstCounts.get(firstLine) ?? 0) >= threshold) {
      lines.shift();
    }

    if (lastLine && lastLine.length < 120 && (lastCounts.get(lastLine) ?? 0) >= threshold) {
      lines.pop();
    }

    return {
      pageNumber: page.pageNumber,
      text: lines.join("\n")
    };
  });
}

export async function extractPdfPages(pdfBytes: Uint8Array) {
  const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const loadingTask = getDocument({
    data: pdfBytes,
    useWorkerFetch: false,
    isEvalSupported: false
  });
  const pdf = await loadingTask.promise;
  const extracted: ExtractedPage[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const lines: string[] = [];
    let activeLine: string[] = [];
    let previousY: number | null = null;

    for (const item of content.items) {
      if (!("str" in item) || !("transform" in item)) {
        continue;
      }

      const currentY: number | null =
        Array.isArray(item.transform) && typeof item.transform[5] === "number"
          ? item.transform[5]
          : previousY;

      if (previousY !== null && currentY !== null && Math.abs(currentY - previousY) > 2 && activeLine.length) {
        lines.push(activeLine.join(" "));
        activeLine = [];
      }

      activeLine.push(item.str);
      previousY = currentY ?? previousY;
    }

    if (activeLine.length) {
      lines.push(activeLine.join(" "));
    }

    const text = lines.map((line) => line.trim()).filter(Boolean).join("\n");

    extracted.push({
      pageNumber,
      text: normalizeText(text)
    });
  }

  return stripRepeatedEdgeLines(extracted);
}

export function shouldTriggerOcr(pages: ExtractedPage[]) {
  if (!pages.length) {
    return true;
  }

  const totalCharacters = pages.reduce((sum, page) => sum + page.text.length, 0);
  const sparsePages = pages.filter((page) => page.text.length < 50).length;

  return totalCharacters < 200 || sparsePages / pages.length > 0.7;
}
