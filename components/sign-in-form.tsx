"use client";

import { useState, type FormEvent } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [message, setMessage] = useState("Use your email to receive a magic link.");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setMessage("Sending your sign-in link...");

    try {
      const supabase = createBrowserSupabaseClient();
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo
        }
      });

      if (error) {
        throw error;
      }

      setStatus("sent");
      setMessage("Check your inbox for the login link.");
    } catch (errorValue) {
      const error = errorValue as Error;
      setStatus("error");
      setMessage(error.message || "Unable to send the sign-in link.");
    }
  };

  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <label className="field-stack">
        <span>Email</span>
        <input
          type="email"
          placeholder="you@lab-notes.com"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <button className="primary-button" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send magic link"}
      </button>
      <p className={`auth-message auth-${status}`}>{message}</p>
    </form>
  );
}
