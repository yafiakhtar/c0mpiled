import { getPaperMessages } from "@/lib/papers/service";
import { requireRouteUser, unauthorizedJson } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await requireRouteUser();

  if (auth.unauthorized) {
    return unauthorizedJson();
  }

  const { id } = await context.params;

  try {
    const messages = await getPaperMessages(id, auth.user.id, auth.supabase);
    return Response.json({ messages });
  } catch (errorValue) {
    const error = errorValue as Error;
    return Response.json({ error: error.message }, { status: 404 });
  }
}
