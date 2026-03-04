import { DEFAULT_MAX_UPLOAD_BYTES, DEFAULT_MAX_UPLOAD_PAGES } from "@/lib/constants";

export function getUploadLimits() {
  const maxBytes = Number(process.env.MAX_UPLOAD_BYTES ?? DEFAULT_MAX_UPLOAD_BYTES);
  const maxPages = Number(process.env.MAX_UPLOAD_PAGES ?? DEFAULT_MAX_UPLOAD_PAGES);

  return {
    maxBytes: Number.isFinite(maxBytes) ? maxBytes : DEFAULT_MAX_UPLOAD_BYTES,
    maxPages: Number.isFinite(maxPages) ? maxPages : DEFAULT_MAX_UPLOAD_PAGES
  };
}

export function isPdfMimeType(type: string) {
  return type === "application/pdf";
}

export function validateStoragePath(userId: string, filePath: string) {
  return filePath.startsWith(`${userId}/`) && filePath.toLowerCase().endsWith(".pdf");
}

export function validateChatMessage(message: string) {
  const trimmed = message.trim();

  if (!trimmed) {
    throw new Error("Ask a question before sending.");
  }

  if (trimmed.length > 3_000) {
    throw new Error("Questions must be shorter than 3,000 characters.");
  }

  return trimmed;
}
