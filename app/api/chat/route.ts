import { answerFromChunks } from "@/lib/ai/anthropic";
import { embedQuery } from "@/lib/ai/embeddings";
import { requireRouteUser, unauthorizedJson } from "@/lib/auth";
import { createChatStream } from "@/lib/chat/sse";
import { buildChunkCitations, matchPaperChunks } from "@/lib/papers/processing";
import { createAssistantMessage } from "@/lib/papers/service";
import { validateChatMessage } from "@/lib/papers/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  const auth = await requireRouteUser();

  if (auth.unauthorized) {
    return unauthorizedJson();
  }

  try {
    const body = (await request.json()) as {
      paperId?: string;
      message?: string;
    };
    const paperId = body.paperId?.trim();
    const message = validateChatMessage(body.message ?? "");

    if (!paperId) {
      return Response.json({ error: "Missing paperId." }, { status: 400 });
    }

    const { data: paper, error: paperError } = await auth.supabase
      .from("papers")
      .select("id, status")
      .eq("id", paperId)
      .eq("user_id", auth.user.id)
      .single();

    if (paperError || !paper) {
      return Response.json({ error: "Paper not found." }, { status: 404 });
    }

    if (paper.status !== "ready") {
      return Response.json({ error: "This paper is still processing." }, { status: 409 });
    }

    const { error: insertUserError } = await auth.supabase.from("chat_messages").insert({
      paper_id: paperId,
      user_id: auth.user.id,
      role: "user",
      content: message
    });

    if (insertUserError) {
      throw insertUserError;
    }

    const queryEmbedding = await embedQuery(message);
    const matches = await matchPaperChunks(auth.supabase, paperId, auth.user.id, queryEmbedding);
    const supportingChunks = matches.slice(0, 6);

    const answer = supportingChunks.length
      ? await answerFromChunks(message, supportingChunks)
      : "I could not find enough support for that answer in this paper.";

    const { citedPages, citedSnippets } = buildChunkCitations(supportingChunks);
    const assistantMessage = await createAssistantMessage(
      paperId,
      auth.user.id,
      answer,
      citedPages,
      citedSnippets
    );

    return new Response(createChatStream(answer, { message: assistantMessage }), {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive"
      }
    });
  } catch (errorValue) {
    const error = errorValue as Error;
    return Response.json({ error: error.message }, { status: 500 });
  }
}
