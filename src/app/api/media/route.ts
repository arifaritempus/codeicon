import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { listUploadedMedia } from "@/lib/contentStore";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const media: { name: string; url: string; folder: string }[] = [];

    // 1. Supabase Storage Uploads
    try {
      const supabaseMedia = await listUploadedMedia();
      media.push(...supabaseMedia);
    } catch (e) {
      console.warn("Supabase media list error:", e);
    }

    // 2. Root public files (logo, favicon)
    const publicDir = path.join(process.cwd(), "public");
    if (fs.existsSync(publicDir)) {
      const rootFiles = fs.readdirSync(publicDir);
      for (const f of rootFiles) {
        if (/\.(png|jpe?g|svg|webp|ico)$/i.test(f)) {
          media.push({ name: f, url: `/${f}`, folder: "public" });
        }
      }
    }

    // 3. Uploads folder
    const uploadsDir = path.join(publicDir, "uploads");
    if (fs.existsSync(uploadsDir)) {
      const uploadFiles = fs.readdirSync(uploadsDir);
      for (const f of uploadFiles) {
        if (/\.(png|jpe?g|svg|webp|ico)$/i.test(f)) {
          media.push({ name: f, url: `/uploads/${f}`, folder: "uploads" });
        }
      }
    }

    // 4. Mockups folder
    const mockupsDir = path.join(publicDir, "images", "mockups");
    if (fs.existsSync(mockupsDir)) {
      const mockupFiles = fs.readdirSync(mockupsDir);
      for (const f of mockupFiles) {
        if (/\.(png|jpe?g|svg|webp|ico)$/i.test(f)) {
          media.push({ name: f, url: `/images/mockups/${f}`, folder: "mockups" });
        }
      }
    }

    return NextResponse.json({ media }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to list media" }, { status: 500 });
  }
}

