import type { CitationSnippet, RetrievedChunk } from "@/lib/types";

interface AnthropicTextBlock {
  type: "text";
  text: string;
}

interface AnthropicMessageResponse {
  content: AnthropicTextBlock[];
}

function extractTextContent(response: AnthropicMessageResponse) {
  return response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();
}

async function callAnthropic(body: Record<string, unknown>) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_MODEL ?? "claude-3-7-sonnet-latest";

  if (!apiKey) {
    throw new Error("Missing ANTHROPIC_API_KEY.");
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model,
      max_tokens: 1_600,
      ...body
    })
  });

  if (!response.ok) {
    throw new Error(`Anthropic request failed: ${response.status} ${await response.text()}`);
  }

  return (await response.json()) as AnthropicMessageResponse;
}

function extractJsonCandidate(text: string) {
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("Claude did not return JSON.");
  }

  return text.slice(firstBrace, lastBrace + 1);
}

export async function extractPagesWithClaude(pdfBytes: Uint8Array) {
  const prompt = [
    "Extract readable text from this PDF.",
    "Return strict JSON shaped exactly like {\"pages\":[{\"pageNumber\":1,\"text\":\"...\"}] }.",
    "Include every page in order.",
    "Do not add markdown fences or commentary."
  ].join(" ");

  const response = await callAnthropic({
    max_tokens: 4_096,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: Buffer.from(pdfBytes).toString("base64")
            }
          },
          {
            type: "text",
            text: prompt
          }
        ]
      }
    ]
  });

  const content = extractTextContent(response);
  const parsed = JSON.parse(extractJsonCandidate(content)) as {
    pages: Array<{ pageNumber: number; text: string }>;
  };

  return parsed.pages
    .filter((page) => Number.isFinite(page.pageNumber))
    .map((page) => ({
      pageNumber: page.pageNumber,
      text: String(page.text ?? "")
        .replace(/\r/g, "")
        .replace(/[ \t]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim()
    }))
    .sort((left, right) => left.pageNumber - right.pageNumber);
}

export async function answerFromChunks(question: string, chunks: RetrievedChunk[]) {
  const context = chunks
    .map(
      (chunk, index) =>
        `Chunk ${index + 1} (pages ${chunk.page_start}-${chunk.page_end}):\n${chunk.content}`
    )
    .join("\n\n");

  const response = await callAnthropic({
    max_tokens: 1_200,
    system:
      "You answer questions about a single PDF. Use only the provided context. If the answer is not supported, say you cannot find it in the paper. Be concise and direct.",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Question: ${question}\n\nContext:\n${context}`
          }
        ]
      }
    ]
  });

  return extractTextContent(response);
}

export function buildCitationsFromChunks(chunks: RetrievedChunk[]): {
  citedPages: number[];
  citedSnippets: CitationSnippet[];
} {
  const pageSet = new Set<number>();
  const citedSnippets: CitationSnippet[] = [];

  for (const chunk of chunks.slice(0, 3)) {
    for (let page = chunk.page_start; page <= chunk.page_end; page += 1) {
      pageSet.add(page);
    }

    citedSnippets.push({
      page: chunk.page_start,
      snippet: chunk.content.replace(/\s+/g, " ").slice(0, 180).trimEnd()
    });
  }

  return {
    citedPages: [...pageSet].sort((left, right) => left - right),
    citedSnippets
  };
}
