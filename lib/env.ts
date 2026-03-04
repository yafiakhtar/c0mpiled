import { DEFAULT_MAX_UPLOAD_BYTES, DEFAULT_MAX_UPLOAD_PAGES } from "@/lib/constants";

function requiredPublicEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function optionalNumber(value: string | undefined, fallback: number) {
  const parsed = Number(value);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const publicEnv = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
};

export function hasConfiguredPublicEnv() {
  return Boolean(publicEnv.supabaseUrl && publicEnv.supabaseAnonKey);
}

export function getServerEnv() {
  return {
    supabaseUrl: requiredPublicEnv("NEXT_PUBLIC_SUPABASE_URL"),
    supabaseAnonKey: requiredPublicEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    supabaseServiceRoleKey: requiredPublicEnv("SUPABASE_SERVICE_ROLE_KEY"),
    openAiApiKey: requiredPublicEnv("OPENAI_API_KEY"),
    openAiEmbeddingModel: process.env.OPENAI_EMBEDDING_MODEL ?? "text-embedding-3-small",
    anthropicApiKey: requiredPublicEnv("ANTHROPIC_API_KEY"),
    anthropicModel: process.env.ANTHROPIC_MODEL ?? "claude-3-7-sonnet-latest",
    vercelQueueTopic: process.env.VERCEL_QUEUE_TOPIC ?? "process-paper",
    maxUploadBytes: optionalNumber(process.env.MAX_UPLOAD_BYTES, DEFAULT_MAX_UPLOAD_BYTES),
    maxUploadPages: optionalNumber(process.env.MAX_UPLOAD_PAGES, DEFAULT_MAX_UPLOAD_PAGES)
  };
}
