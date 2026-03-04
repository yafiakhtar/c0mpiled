export type PaperStatus = "queued" | "processing" | "ready" | "failed";

export interface PaperRecord {
  id: string;
  user_id: string;
  file_path: string;
  original_filename: string | null;
  title: string | null;
  status: PaperStatus;
  page_count: number | null;
  file_size_bytes: number;
  ocr_used: boolean;
  failure_code: string | null;
  error_message: string | null;
  processing_attempts: number;
  last_processed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaperSummary {
  id: string;
  title: string | null;
  originalFilename: string | null;
  status: PaperStatus;
  pageCount: number | null;
  ocrUsed: boolean;
  errorMessage: string | null;
  createdAt: string;
  viewerUrl: string | null;
}

export interface ExtractedPage {
  pageNumber: number;
  text: string;
}

export interface ChunkRecordInput {
  paper_id: string;
  chunk_index: number;
  page_start: number;
  page_end: number;
  token_count: number;
  content: string;
  embedding: number[];
}

export interface RetrievedChunk {
  id: string;
  page_start: number;
  page_end: number;
  content: string;
  similarity: number;
}

export interface CitationSnippet {
  page: number;
  snippet: string;
}

export interface ChatMessageRecord {
  id: string;
  paper_id: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  cited_pages: number[] | null;
  cited_snippets: CitationSnippet[] | null;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  citedPages: number[];
  citedSnippets: CitationSnippet[];
  createdAt: string;
}

export interface QueueProcessMessage {
  paperId: string;
}
