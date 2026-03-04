import { getServerEnv } from "@/lib/env";

interface OpenAiEmbeddingResponse {
  data: Array<{
    embedding: number[];
    index: number;
  }>;
}

export async function embedTexts(texts: string[]) {
  if (!texts.length) {
    return [];
  }

  const { openAiApiKey, openAiEmbeddingModel } = getServerEnv();
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAiApiKey}`
    },
    body: JSON.stringify({
      model: openAiEmbeddingModel,
      input: texts
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI embeddings failed: ${response.status} ${await response.text()}`);
  }

  const json = (await response.json()) as OpenAiEmbeddingResponse;

  return json.data.sort((left, right) => left.index - right.index).map((item) => item.embedding);
}

export async function embedQuery(text: string) {
  const [embedding] = await embedTexts([text]);

  if (!embedding) {
    throw new Error("No query embedding returned.");
  }

  return embedding;
}
