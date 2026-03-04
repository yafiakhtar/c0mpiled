import type { ExtractedPage } from "@/lib/types";

function cleanTitleCandidate(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function derivePaperTitle(pages: ExtractedPage[], originalFilename: string | null) {
  const firstPage = pages.find((page) => page.pageNumber === 1);

  if (firstPage?.text) {
    const lines = firstPage.text
      .split(/\n+/)
      .map((line) => cleanTitleCandidate(line))
      .filter(Boolean);

    const candidate = lines.find((line) => line.length > 4 && line.length <= 150);

    if (candidate) {
      return candidate;
    }
  }

  if (originalFilename) {
    return originalFilename.replace(/\.pdf$/i, "");
  }

  return "Untitled paper";
}
