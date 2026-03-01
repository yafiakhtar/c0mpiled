import { put } from "@vercel/blob";
import { env } from "./env";

export async function uploadPdf(name: string, data: ArrayBuffer) {
  const result = await put(name, data, {
    access: "public",
    contentType: "application/pdf",
    token: env.VERCEL_BLOB_READ_WRITE_TOKEN
  });

  return result;
}

export async function fetchBlob(url: string) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.VERCEL_BLOB_READ_WRITE_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blob: ${response.status}`);
  }

  return response.arrayBuffer();
}
