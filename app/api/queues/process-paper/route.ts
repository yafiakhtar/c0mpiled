import { processPaper } from "@/lib/papers/processing";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(request: Request) {
  const body = (await request.json()) as
    | { paperId?: string; data?: { paperId?: string } }
    | undefined;
  const paperId = body?.paperId ?? body?.data?.paperId;

  if (!paperId) {
    return Response.json({ error: "Missing paperId." }, { status: 400 });
  }

  await processPaper(paperId);

  return Response.json({ ok: true });
}
