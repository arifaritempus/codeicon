import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { uploadMediaToSupabase } from "@/lib/contentStore";
import { isSessionValid } from "@/lib/auth";
import { validateImageUpload } from "@/lib/fileValidation";

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
      return NextResponse.json({ error: "Lütfen bir dosya seçin." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Strict Magic Bytes & Content Security Validation
    const validation = validateImageUpload(buffer, file.name);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error || "Geçersiz dosya!" },
        { status: 400 }
      );
    }

    const secureFileName = validation.sanitizedName;
    const mimeType = validation.mimeType;

    let storageError: any = null;

    // 2. Try uploading to Supabase Storage with cryptographically unguessable name & verified MIME
    try {
      const uploaded = await uploadMediaToSupabase(buffer, secureFileName, mimeType);
      return NextResponse.json({
        success: true,
        url: uploaded.url,
        name: secureFileName,
        size: file.size,
      });
    } catch (storageErr: any) {
      storageError = storageErr;
      console.warn("Supabase storage upload failed, attempting local fallback:", storageErr);
    }

    // 3. Fallback to local uploads directory (safe in local dev, ignored on read-only serverless)
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, secureFileName);
      fs.writeFileSync(filePath, buffer);

      return NextResponse.json({
        success: true,
        url: `/uploads/${secureFileName}`,
        name: secureFileName,
        size: file.size,
      });
    } catch (localErr) {
      console.error("Local file fallback failed:", localErr);
      return NextResponse.json(
        { error: storageError?.message || "Depolama alanına dosya yüklenemedi. Lütfen tekrar deneyin." },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Dosya yükleme işlemi başarısız oldu." },
      { status: 500 }
    );
  }
}

