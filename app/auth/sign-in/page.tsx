import { redirect } from "next/navigation";
import { SignInForm } from "@/components/sign-in-form";
import { hasConfiguredPublicEnv } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function SignInPage() {
  if (!hasConfiguredPublicEnv()) {
    return (
      <main className="auth-shell">
        <section className="auth-panel">
          <p className="eyebrow">PaperTalk</p>
          <h1>Set your Supabase keys first.</h1>
          <p className="auth-copy">
            Add the public Supabase URL and anon key to `.env.local`, then reopen the sign-in flow.
          </p>
        </section>
      </main>
    );
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <p className="eyebrow">PaperTalk</p>
        <h1>Turn PDFs into a grounded conversation.</h1>
        <p className="auth-copy">
          Upload private papers, let the queue process them, and ask questions with page-linked citations.
        </p>
        <SignInForm />
      </section>
    </main>
  );
}
