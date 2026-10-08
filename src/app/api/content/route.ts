import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSiteContent, saveSiteContent } from "@/lib/contentStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const content = await getSiteContent();
    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }
    return NextResponse.json(content, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      },
    });
  } catch (error) {
    console.error("GET /api/content error:", error);
    return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await saveSiteContent(body);

    // Invalidate Next.js cache so changes reflect instantly
    try {
      revalidatePath("/", "layout");
      revalidatePath("/admin");
    } catch (e) {
      console.warn("Revalidation warning:", e);
    }

    return NextResponse.json(
      { success: true, message: "Content updated successfully" },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("POST /api/content error:", error);
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}
