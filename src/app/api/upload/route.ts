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

    // 2. Try uploading to Supabase Storage with cryptographically unguessable name & verified MIME
    try {
      const uploaded = await uploadMediaToSupabase(buffer, secureFileName, mimeType);
      return NextResponse.json({
        success: true,
        url: uploaded.url,
        name: secureFileName,
        size: file.size,
      });
    } catch (storageErr) {
      console.warn("Supabase storage upload failed, falling back to local file:", storageErr);
    }

    // 3. Fallback to local uploads directory (works in local dev)
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
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Dosya yükleme işlemi başarısız oldu." }, { status: 500 });
  }
}

