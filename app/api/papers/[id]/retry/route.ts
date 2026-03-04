import { publishProcessingJob } from "@/lib/queue";
import { requireRouteUser, unauthorizedJson } from "@/lib/auth";

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await requireRouteUser();

  if (auth.unauthorized) {
    return unauthorizedJson();
  }

  const { id } = await context.params;
  const { data, error } = await auth.supabase
    .from("papers")
    .select("id, status")
    .eq("id", id)
    .eq("user_id", auth.user.id)
    .single();

  if (error || !data) {
    return Response.json({ error: "Paper not found." }, { status: 404 });
  }

  if (data.status !== "failed") {
    return Response.json({ error: "Only failed papers can be retried." }, { status: 409 });
  }

  const { error: updateError } = await auth.supabase
    .from("papers")
    .update({
      status: "queued",
      error_message: null,
      failure_code: null,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .eq("user_id", auth.user.id);

  if (updateError) {
    return Response.json({ error: updateError.message }, { status: 500 });
  }

  try {
    await publishProcessingJob({ paperId: id });
  } catch (errorValue) {
    const error = errorValue as Error;
    await auth.supabase
      .from("papers")
      .update({
        status: "failed",
        error_message: error.message,
        failure_code: "QUEUE_PUBLISH_FAILED",
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .eq("user_id", auth.user.id);

    return Response.json(
      { error: "Retry could not be queued. Please try again." },
      { status: 500 }
    );
  }

  return Response.json({ ok: true, status: "queued" }, { status: 202 });
}
