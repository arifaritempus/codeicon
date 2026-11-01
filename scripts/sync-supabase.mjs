import fs from "fs";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zetujnpgzeoxicqhevdv.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpldHVqbnBnemVveGljcWhldmR2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzQyNiwiZXhwIjoyMTA3MDQzNDI2fQ.9cKUJc5X9127ljv9uw5EQV_YzDjNJO4efECZ7uhKf0s";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const BUCKET_NAME = "logos";
const FILE_NAME = "siteContent.json";

async function main() {
  console.log("Reading src/data/siteContent.json...");
  const raw = fs.readFileSync("src/data/siteContent.json", "utf8");
  const content = JSON.parse(raw);
  content.updatedAt = new Date().toISOString();

  console.log("Uploading to Supabase Storage bucket 'logos'...");
  const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(FILE_NAME, JSON.stringify(content, null, 2), {
    contentType: "application/json",
    cacheControl: "0",
    upsert: true,
  });

  if (error) {
    console.error("Supabase upload error:", error);
    process.exit(1);
  }

  console.log("Upload successful! Supabase path:", data.path);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
