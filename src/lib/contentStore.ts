import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://lnyhtuudivwsbedxbauw.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxueWh0dXVkaXZ3c2JlZHhiYXV3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDc5MzI4MiwiZXhwIjoyMTAwMzY5MjgyfQ.GsYUWvBlCu0MRQHG7R9ed5U-BsjHrl5-XvmPhykTuus";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const BUCKET_NAME = "logos";
const FILE_NAME = "siteContent.json";

export async function getSiteContent() {
  // 1. Try Supabase Storage (with short cache / real-time)
  try {
    const { data, error } = await supabase.storage.from(BUCKET_NAME).download(FILE_NAME);
    if (!error && data) {
      const text = await data.text();
      return JSON.parse(text);
    }
  } catch (err) {
    console.error("Error reading from Supabase storage:", err);
  }

  // 2. Fallback to local file
  try {
    const localPath = path.join(process.cwd(), "src/data/siteContent.json");
    if (fs.existsSync(localPath)) {
      const raw = fs.readFileSync(localPath, "utf8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading from local file:", err);
  }

  return null;
}

export async function saveSiteContent(content: any) {
  const jsonString = JSON.stringify(content, null, 2);

  // 1. Save to Supabase Storage
  let supabaseSuccess = false;
  try {
    const { error } = await supabase.storage.from(BUCKET_NAME).upload(FILE_NAME, jsonString, {
      contentType: "application/json",
      upsert: true,
    });
    if (!error) {
      supabaseSuccess = true;
    } else {
      console.error("Supabase upload error:", error);
    }
  } catch (err) {
    console.error("Supabase storage error:", err);
  }

  // 2. Also write to local file if writable (e.g. in development)
  try {
    const localPath = path.join(process.cwd(), "src/data/siteContent.json");
    fs.writeFileSync(localPath, jsonString, "utf8");
  } catch (err) {
    // Expected on Vercel read-only filesystem, safe to ignore
  }

  return supabaseSuccess;
}

export async function uploadMediaToSupabase(buffer: Buffer, fileName: string, contentType: string = "image/png") {
  const timestamp = Date.now();
  const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  const uniquePath = `uploads/${timestamp}-${sanitizedName}`;

  const { error } = await supabase.storage.from(BUCKET_NAME).upload(uniquePath, buffer, {
    contentType,
    upsert: true,
  });

  if (error) {
    throw error;
  }

  const { data: publicData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(uniquePath);
  return {
    url: publicData.publicUrl,
    name: fileName,
  };
}

export async function listUploadedMedia() {
  const media: { name: string; url: string; folder: string }[] = [];

  // 1. Supabase Storage uploads
  try {
    const { data, error } = await supabase.storage.from(BUCKET_NAME).list("uploads", {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (!error && data) {
      for (const item of data) {
        if (item.name && item.id) { // files have id, folders do not
          const { data: publicData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(`uploads/${item.name}`);
          media.push({
            name: item.name,
            url: publicData.publicUrl,
            folder: "supabase",
          });
        }
      }
    }
  } catch (err) {
    console.error("Error listing Supabase media:", err);
  }

  return media;
}
