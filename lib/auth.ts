import { redirect } from "next/navigation";
import type { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function requirePageUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return { supabase, user };
}

export async function requireRouteUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, user: null, unauthorized: true as const };
  }

  return { supabase, user, unauthorized: false as const };
}

export function unauthorizedJson() {
  return Response.json({ error: "Unauthorized" }, { status: 401 }) as NextResponse;
}
