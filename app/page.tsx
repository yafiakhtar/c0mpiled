import { WorkspaceShell } from "@/components/workspace-shell";
import { requirePageUser } from "@/lib/auth";
import { hasConfiguredPublicEnv } from "@/lib/env";
import { listPapersWithViewerUrls } from "@/lib/papers/service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  if (!hasConfiguredPublicEnv()) {
    return (
      <main className="auth-shell">
        <section className="auth-panel">
          <p className="eyebrow">PaperTalk</p>
          <h1>Configure Supabase to start the app.</h1>
          <p className="auth-copy">
            Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to your environment,
            then reload the app.
          </p>
        </section>
      </main>
    );
  }

  const { supabase, user } = await requirePageUser();
  const initialPapers = await listPapersWithViewerUrls(user.id, supabase);

  return <WorkspaceShell userId={user.id} userEmail={user.email ?? ""} initialPapers={initialPapers} />;
}
