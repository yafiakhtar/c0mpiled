import { SSE_CHUNK_SIZE } from "@/lib/constants";

function encodeEvent(event: string, data: unknown) {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export function createChatStream(answer: string, payload: Record<string, unknown>) {
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (let start = 0; start < answer.length; start += SSE_CHUNK_SIZE) {
        controller.enqueue(
          encoder.encode(
            encodeEvent("delta", {
              delta: answer.slice(start, start + SSE_CHUNK_SIZE)
            })
          )
        );
      }

      controller.enqueue(encoder.encode(encodeEvent("done", payload)));
      controller.close();
    }
  });
}
