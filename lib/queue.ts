import { getServerEnv } from "@/lib/env";
import type { QueueProcessMessage } from "@/lib/types";

export async function publishProcessingJob(payload: QueueProcessMessage) {
  const { vercelQueueTopic } = getServerEnv();
  const { send } = await import("@vercel/queue");

  return send(vercelQueueTopic, payload);
}
