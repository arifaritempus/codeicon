import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import { selectNextDailyTopic, generateBlogPostWithAI, slugify } from "../src/lib/blogGenerator.ts";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zetujnpgzeoxicqhevdv.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpldHVqbnBnemVveGljcWhldmR2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzQyNiwiZXhwIjoyMTA3MDQzNDI2fQ.9cKUJc5X9127ljv9uw5EQV_YzDjNJO4efECZ7uhKf0s";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const BUCKET_NAME = "logos";
const FILE_NAME = "siteContent.json";

async function main() {
  console.log("Loading current siteContent from Supabase...");
  let content;
  try {
    const { data, error } = await supabase.storage.from(BUCKET_NAME).download(FILE_NAME);
    if (!error && data) {
      content = JSON.parse(await data.text());
    }
  } catch (e) {
    console.error("Failed to download from Supabase:", e);
  }

  if (!content) {
    content = JSON.parse(fs.readFileSync("src/data/siteContent.json", "utf8"));
  }

  if (!content.blog) {
    content.blog = { enabled: true, posts: [] };
  }
  content.blog.enabled = true;

  const existingPosts = content.blog.posts || [];
  console.log(`Found ${existingPosts.length} existing posts.`);

  const selected = selectNextDailyTopic(existingPosts);
  console.log("Selected next topic:", selected.title);

  const { post, source } = await generateBlogPostWithAI({
    topic: selected.title,
    tone: selected.tone,
    audience: selected.audience,
    provider: "auto",
  });

  let finalSlug = post.slug || slugify(post.title);
  if (existingPosts.some((p) => p.slug === finalSlug)) {
    finalSlug = `${finalSlug}-${Date.now().toString(36)}`;
    post.slug = finalSlug;
  }
  post.published = true;
  post.publishedAt = new Date().toISOString().split("T")[0];

  content.blog.posts = [post, ...existingPosts];
  content.updatedAt = new Date().toISOString();

  console.log("Saving locally to src/data/siteContent.json...");
  fs.writeFileSync("src/data/siteContent.json", JSON.stringify(content, null, 2), "utf8");

  console.log("Uploading to Supabase Storage...");
  const { error: uploadErr } = await supabase.storage.from(BUCKET_NAME).upload(FILE_NAME, JSON.stringify(content, null, 2), {
    contentType: "application/json",
    cacheControl: "0",
    upsert: true,
  });

  if (uploadErr) {
    console.error("Supabase upload error:", uploadErr);
  } else {
    console.log("✅ Successfully generated & published new post:", post.title);
    console.log("Slug:", post.slug);
    console.log("Date:", post.publishedAt);
  }
}

main().catch(console.error);
