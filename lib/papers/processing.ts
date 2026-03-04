import { CHAT_MATCH_COUNT } from "@/lib/constants";
import { buildCitationsFromChunks, extractPagesWithClaude } from "@/lib/ai/anthropic";
import { embedTexts } from "@/lib/ai/embeddings";
import { chunkExtractedPages } from "@/lib/pdf/chunk";
import { extractPdfPages, shouldTriggerOcr } from "@/lib/pdf/extract";
import { derivePaperTitle } from "@/lib/pdf/title";
import { getServerEnv } from "@/lib/env";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { replacePaperChunks, updatePaperStatus } from "@/lib/papers/service";
import type { ExtractedPage, RetrievedChunk } from "@/lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";

function normalizePages(pages: ExtractedPage[]) {
  return pages.map((page) => ({
    pageNumber: page.pageNumber,
    text: page.text
      .replace(/\r/g, "")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  }));
}

function createFailure(code: string, message: string, retryable = false) {
  const error = new Error(message);
  (error as Error & { code?: string; retryable?: boolean }).code = code;
  (error as Error & { code?: string; retryable?: boolean }).retryable = retryable;
  return error;
}

async function downloadPdf(filePath: string) {
  const admin = createAdminSupabaseClient();
  const { data, error } = await admin.storage.from("papers").download(filePath);

  if (error) {
    throw createFailure("STORAGE_DOWNLOAD_FAILED", "The stored PDF could not be downloaded.", true);
  }

  const buffer = await data.arrayBuffer();

  return new Uint8Array(buffer);
}

async function extractReadablePages(pdfBytes: Uint8Array) {
  const extracted = normalizePages(await extractPdfPages(pdfBytes));

  if (!shouldTriggerOcr(extracted)) {
    return {
      pages: extracted,
      ocrUsed: false
    };
  }

  const fallbackPages = normalizePages(await extractPagesWithClaude(pdfBytes));

  if (!fallbackPages.length || fallbackPages.every((page) => page.text.length < 20)) {
    throw createFailure("OCR_FAILED", "The scanned PDF could not be converted into usable text.");
  }

  return {
    pages: fallbackPages,
    ocrUsed: true
  };
}

export async function processPaper(paperId: string) {
  const admin = createAdminSupabaseClient();
  const { data, error } = await admin.from("papers").select("*").eq("id", paperId).single();

  if (error || !data) {
    throw createFailure("PAPER_NOT_FOUND", "Paper not found.");
  }

  if (data.status === "ready") {
    return;
  }

  const attempts = (data.processing_attempts ?? 0) + 1;

  await updatePaperStatus(paperId, {
    status: "processing",
    processing_attempts: attempts,
    error_message: null,
    failure_code: null
  });

  try {
    const pdfBytes = await downloadPdf(data.file_path);
    const { pages, ocrUsed } = await extractReadablePages(pdfBytes);
    const { maxUploadPages } = getServerEnv();

    if (!pages.length) {
      throw createFailure("EMPTY_PDF", "The PDF did not contain usable text.");
    }

    if (pages.length > maxUploadPages) {
      throw createFailure("PAGE_LIMIT_EXCEEDED", `PDFs are limited to ${maxUploadPages} pages.`);
    }

    const chunks = chunkExtractedPages(pages);

    if (!chunks.length) {
      throw createFailure("NO_CHUNKS", "The PDF text could not be prepared for search.");
    }

    const embeddings = await embedTexts(chunks.map((chunk) => chunk.content));

    await replacePaperChunks(
      paperId,
      chunks.map((chunk, index) => ({
        chunk_index: chunk.chunkIndex,
        page_start: chunk.pageStart,
        page_end: chunk.pageEnd,
        token_count: chunk.tokenCount,
        content: chunk.content,
        embedding: embeddings[index]
      }))
    );

    await updatePaperStatus(paperId, {
      title: derivePaperTitle(pages, data.original_filename),
      page_count: pages.length,
      ocr_used: ocrUsed,
      status: "ready",
      error_message: null,
      failure_code: null,
      last_processed_at: new Date().toISOString()
    });
  } catch (errorValue) {
    const error = errorValue as Error & { code?: string; retryable?: boolean };

    await updatePaperStatus(paperId, {
      status: "failed",
      error_message: error.message,
      failure_code: error.code ?? "PROCESSING_FAILED"
    });

    if (error.retryable) {
      throw error;
    }
  }
}

export async function matchPaperChunks(
  client: SupabaseClient,
  paperId: string,
  userId: string,
  embedding: number[]
) {
  const { data, error } = await client.rpc("match_paper_chunks", {
    query_embedding: embedding,
    target_paper_id: paperId,
    target_user_id: userId,
    match_count: CHAT_MATCH_COUNT
  });

  if (error) {
    throw error;
  }

  return (data ?? []) as RetrievedChunk[];
}

export function buildChunkCitations(chunks: RetrievedChunk[]) {
  return buildCitationsFromChunks(chunks);
}
