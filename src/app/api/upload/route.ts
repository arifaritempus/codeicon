import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { uploadMediaToSupabase } from "@/lib/contentStore";
import { isSessionValid } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const authenticated = await isSessionValid();
    if (!authenticated) {
      return NextResponse.json({ error: "Yetkisiz işlem! Lütfen giriş yapın." }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Try uploading to Supabase Storage for persistent public URL
    try {
      const uploaded = await uploadMediaToSupabase(buffer, file.name, file.type || "image/png");
      return NextResponse.json({
        success: true,
        url: uploaded.url,
        name: file.name,
        size: file.size,
      });
    } catch (storageErr) {
      console.warn("Supabase storage upload failed, falling back to local file:", storageErr);
    }

    // 2. Fallback to local uploads directory (works in local dev)
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${timestamp}-${originalName}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${fileName}`,
      name: file.name,
      size: file.size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
