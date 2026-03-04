import { CHUNK_OVERLAP_TOKENS, TARGET_CHUNK_TOKENS } from "@/lib/constants";
import type { ExtractedPage } from "@/lib/types";

function estimateTokens(value: string) {
  return Math.max(1, Math.ceil(value.length / 4));
}

function splitIntoSegments(pageText: string) {
  const paragraphs = pageText
    .split(/\n{2,}/)
    .map((segment) => segment.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  if (paragraphs.length) {
    return paragraphs;
  }

  return pageText
    .split(/(?<=[.!?])\s+/)
    .map((segment) => segment.trim())
    .filter(Boolean);
}

export function chunkExtractedPages(pages: ExtractedPage[]) {
  const segments = pages.flatMap((page) =>
    splitIntoSegments(page.text).map((text) => ({
      pageNumber: page.pageNumber,
      text,
      tokens: estimateTokens(text)
    }))
  );

  const chunks: Array<{
    chunkIndex: number;
    pageStart: number;
    pageEnd: number;
    tokenCount: number;
    content: string;
  }> = [];

  let pointer = 0;
  let chunkIndex = 0;

  while (pointer < segments.length) {
    const selected: typeof segments = [];
    let tokenCount = 0;
    let nextPointer = pointer;

    while (nextPointer < segments.length) {
      const candidate = segments[nextPointer];

      if (selected.length > 0 && tokenCount + candidate.tokens > TARGET_CHUNK_TOKENS) {
        break;
      }

      selected.push(candidate);
      tokenCount += candidate.tokens;
      nextPointer += 1;

      if (tokenCount >= TARGET_CHUNK_TOKENS) {
        break;
      }
    }

    if (!selected.length) {
      break;
    }

    chunks.push({
      chunkIndex,
      pageStart: selected[0].pageNumber,
      pageEnd: selected.at(-1)?.pageNumber ?? selected[0].pageNumber,
      tokenCount,
      content: selected.map((segment) => segment.text).join("\n\n")
    });

    let overlapTokens = 0;
    let rewindIndex = selected.length - 1;

    while (rewindIndex >= 0 && overlapTokens < CHUNK_OVERLAP_TOKENS) {
      overlapTokens += selected[rewindIndex].tokens;
      rewindIndex -= 1;
    }

    pointer = Math.max(pointer + 1, pointer + rewindIndex + 1);
    chunkIndex += 1;
  }

  return chunks;
}
