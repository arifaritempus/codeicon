import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const media: { name: string; url: string; folder: string }[] = [];

    // 1. Root public files (logo, favicon)
    const publicDir = path.join(process.cwd(), "public");
    if (fs.existsSync(publicDir)) {
      const rootFiles = fs.readdirSync(publicDir);
      for (const f of rootFiles) {
        if (/\.(png|jpe?g|svg|webp|ico)$/i.test(f)) {
          media.push({ name: f, url: `/${f}`, folder: "public" });
        }
      }
    }

    // 2. Uploads folder
    const uploadsDir = path.join(publicDir, "uploads");
    if (fs.existsSync(uploadsDir)) {
      const uploadFiles = fs.readdirSync(uploadsDir);
      for (const f of uploadFiles) {
        if (/\.(png|jpe?g|svg|webp|ico)$/i.test(f)) {
          media.push({ name: f, url: `/uploads/${f}`, folder: "uploads" });
        }
      }
    }

    // 3. Mockups folder
    const mockupsDir = path.join(publicDir, "images", "mockups");
    if (fs.existsSync(mockupsDir)) {
      const mockupFiles = fs.readdirSync(mockupsDir);
      for (const f of mockupFiles) {
        if (/\.(png|jpe?g|svg|webp|ico)$/i.test(f)) {
          media.push({ name: f, url: `/images/mockups/${f}`, folder: "mockups" });
        }
      }
    }

    return NextResponse.json({ media });
  } catch (error) {
    return NextResponse.json({ error: "Failed to list media" }, { status: 500 });
  }
}
