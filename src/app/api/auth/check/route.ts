import { NextResponse } from "next/server";
import { isSessionValid } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const authenticated = await isSessionValid();
  return NextResponse.json({ authenticated });
}
