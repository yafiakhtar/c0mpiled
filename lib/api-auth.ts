import { cookies } from "next/headers";
import { authCookieName, verifyAuthCookie } from "./auth";

export async function requireAuth() {
  const cookieStore = await cookies();
  const value = cookieStore.get(authCookieName)?.value;
  return verifyAuthCookie(value);
}
