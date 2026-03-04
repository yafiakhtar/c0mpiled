import type { ChatMessage, ChatMessageRecord, CitationSnippet, PaperRecord, PaperSummary } from "@/lib/types";

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function toPaperSummary(record: PaperRecord, viewerUrl: string | null): PaperSummary {
  return {
    id: record.id,
    title: record.title,
    originalFilename: record.original_filename,
    status: record.status,
    pageCount: record.page_count,
    ocrUsed: record.ocr_used,
    errorMessage: record.error_message,
    createdAt: record.created_at,
    viewerUrl
  };
}

export function toChatMessage(record: ChatMessageRecord): ChatMessage {
  return {
    id: record.id,
    role: record.role,
    content: record.content,
    citedPages: record.cited_pages ?? [],
    citedSnippets: (record.cited_snippets ?? []) as CitationSnippet[],
    createdAt: record.created_at
  };
}

export function sanitizeSnippet(value: string, maxLength = 180) {
  const cleaned = value.replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  return `${cleaned.slice(0, maxLength - 1).trimEnd()}...`;
}
