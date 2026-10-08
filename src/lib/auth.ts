import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "hello@codeicon.co";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "..Q1w2E3r4..";
const AUTH_SECRET = process.env.AUTH_SECRET || "codeicon-secret-key-2026-auth-session-key";
export const COOKIE_NAME = "codeicon_admin_session";

function sign(payload: string): string {
  const hmac = crypto.createHmac("sha256", AUTH_SECRET).update(payload).digest("hex");
  return `${payload}.${hmac}`;
}

function verify(token: string): boolean {
  if (!token || !token.includes(".")) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, hmac] = parts;
  const expectedHmac = crypto.createHmac("sha256", AUTH_SECRET).update(payload).digest("hex");
  try {
    if (crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expectedHmac))) {
      const data = JSON.parse(Buffer.from(payload, "base64").toString("utf-8"));
      if (data.email === ADMIN_EMAIL && data.exp > Date.now()) {
        return true;
      }
    }
  } catch {
    return false;
  }
  return false;
}

export function validateCredentials(email?: string, password?: string): boolean {
  if (!email || !password) return false;
  return email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD;
}

export function createSessionToken(): string {
  const payload = Buffer.from(
    JSON.stringify({
      email: ADMIN_EMAIL,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    })
  ).toString("base64");
  return sign(payload);
}

export async function isSessionValid(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);
  if (!sessionCookie?.value) return false;
  return verify(sessionCookie.value);
}
