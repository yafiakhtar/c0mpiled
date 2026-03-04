import type { SupabaseClient } from "@supabase/supabase-js";
import { STORAGE_BUCKET } from "@/lib/constants";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { ChatMessage, ChatMessageRecord, PaperRecord, PaperSummary } from "@/lib/types";
import { toChatMessage, toPaperSummary } from "@/lib/utils";

type DatabaseClient = SupabaseClient;

export async function createSignedViewerUrl(filePath: string) {
  const admin = createAdminSupabaseClient();
  const { data, error } = await admin.storage.from(STORAGE_BUCKET).createSignedUrl(filePath, 60 * 60);

  if (error) {
    throw error;
  }

  return data.signedUrl;
}

export async function listPapersWithViewerUrls(userId: string, supabase?: DatabaseClient) {
  const client = supabase ?? createAdminSupabaseClient();
  const { data, error } = await client
    .from("papers")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  const records = (data ?? []) as PaperRecord[];

  return Promise.all(
    records.map(async (record) => toPaperSummary(record, await createSignedViewerUrl(record.file_path)))
  );
}

export async function getPaperSummaryById(
  paperId: string,
  userId: string,
  supabase?: DatabaseClient
) {
  const client = supabase ?? createAdminSupabaseClient();
  const { data, error } = await client
    .from("papers")
    .select("*")
    .eq("id", paperId)
    .eq("user_id", userId)
    .single();

  if (error) {
    throw error;
  }

  return toPaperSummary(data as PaperRecord, await createSignedViewerUrl((data as PaperRecord).file_path));
}

export async function getPaperMessages(
  paperId: string,
  userId: string,
  supabase?: DatabaseClient
) {
  const client = supabase ?? createAdminSupabaseClient();
  const { data, error } = await client
    .from("chat_messages")
    .select("*")
    .eq("paper_id", paperId)
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return ((data ?? []) as ChatMessageRecord[]).map((record) => toChatMessage(record));
}

export async function getPaperForProcessing(paperId: string) {
  const admin = createAdminSupabaseClient();
  const { data, error } = await admin.from("papers").select("*").eq("id", paperId).single();

  if (error) {
    throw error;
  }

  return data as PaperRecord;
}

export async function updatePaperStatus(paperId: string, values: Partial<PaperRecord>) {
  const admin = createAdminSupabaseClient();
  const { error } = await admin
    .from("papers")
    .update({
      ...values,
      updated_at: new Date().toISOString()
    })
    .eq("id", paperId);

  if (error) {
    throw error;
  }
}

export async function replacePaperChunks(
  paperId: string,
  chunks: Array<{
    chunk_index: number;
    page_start: number;
    page_end: number;
    token_count: number;
    content: string;
    embedding: number[];
  }>
) {
  const admin = createAdminSupabaseClient();
  const { error: deleteError } = await admin.from("paper_chunks").delete().eq("paper_id", paperId);

  if (deleteError) {
    throw deleteError;
  }

  if (!chunks.length) {
    return;
  }

  const rows = chunks.map((chunk) => ({
    paper_id: paperId,
    ...chunk
  }));

  const { error: insertError } = await admin.from("paper_chunks").insert(rows);

  if (insertError) {
    throw insertError;
  }
}

export async function createAssistantMessage(
  paperId: string,
  userId: string,
  content: string,
  citedPages: number[],
  citedSnippets: ChatMessage["citedSnippets"]
) {
  const admin = createAdminSupabaseClient();
  const { data, error } = await admin
    .from("chat_messages")
    .insert({
      paper_id: paperId,
      user_id: userId,
      role: "assistant",
      content,
      cited_pages: citedPages,
      cited_snippets: citedSnippets
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return toChatMessage(data as ChatMessageRecord);
}
