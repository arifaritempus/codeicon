import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSiteContent, saveSiteContent } from "@/lib/contentStore";
import { isSessionValid } from "@/lib/auth";
import { selectNextDailyTopic, generateBlogPostWithAI, slugify } from "@/lib/blogGenerator";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Allow up to 60s for AI generation

async function verifyCronAuth(request: Request): Promise<boolean> {
  const cronSecret = process.env.CRON_SECRET;
  const fallbackSecret = "codeicon_daily_blog_secret_key_2026";

  const authHeader = request.headers.get("authorization");
  const { searchParams } = new URL(request.url);
  const secretParam = searchParams.get("secret");

  // 1. If CRON_SECRET is defined in environment, check Bearer header or query param
  if (cronSecret) {
    if (authHeader === `Bearer ${cronSecret}` || secretParam === cronSecret) {
      return true;
    }
  }

  // 2. Fallback secret for direct webhooks & scheduled pings
  if (authHeader === `Bearer ${fallbackSecret}` || secretParam === fallbackSecret) {
    return true;
  }

  // 3. Vercel Cron header check (Vercel automatically attaches x-vercel-cron header or vercel-cron user agent)
  const isVercelCron =
    request.headers.get("x-vercel-cron") !== null ||
    request.headers.get("user-agent")?.toLowerCase().includes("vercel-cron");
  if (isVercelCron) {
    return true;
  }

  // 4. Allow logged-in admin session (e.g. when testing from the admin panel)
  const isAdmin = await isSessionValid();
  if (isAdmin) {
    return true;
  }

  // 5. In development mode without CRON_SECRET set, allow execution for local testing
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  return false;
}

async function handleGenerateDailyBlog(request: Request) {
  try {
    const isAuthorized = await verifyCronAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Yetkisiz erişim. Geçerli bir CRON_SECRET veya admin oturumu gereklidir." },
        { status: 401 }
      );
    }

    // 1. Get current site content
    const content = await getSiteContent();
    if (!content) {
      return NextResponse.json({ error: "Site içeriği yüklenemedi." }, { status: 500 });
    }

    if (!content.blog) {
      content.blog = {
        enabled: true,
        eyebrow: "CODEICON BLOG",
        title: "MICE ve Turizm Teknolojileri Rehberi",
        subtitle: "Acente operasyonları, finans yönetimi ve turizm teknolojilerinde sektörel rehberler ve analizler.",
        posts: []
      };
    }
    if (!Array.isArray(content.blog.posts)) {
      content.blog.posts = [];
    }

    const existingPosts: any[] = content.blog.posts;

    // 2. Select next rotational topic ensuring non-repetition
    const selected = selectNextDailyTopic(existingPosts);

    // 3. Generate high quality unique article via AI / Built-in sectoral engine
    const { post, source } = await generateBlogPostWithAI({
      topic: selected.title,
      tone: selected.tone,
      audience: selected.audience,
      provider: "auto"
    });

    // 4. Ensure guaranteed unique slug
    let finalSlug = post.slug || slugify(post.title);
    const slugExists = existingPosts.some((p: any) => p.slug === finalSlug);
    if (slugExists) {
      finalSlug = `${finalSlug}-${Date.now().toString(36)}`;
      post.slug = finalSlug;
    }

    post.published = true;
    post.publishedAt = new Date().toISOString().split("T")[0];

    // 5. Prepend new post to the top of the blog list
    content.blog.posts = [post, ...existingPosts];

    // 6. Save to Supabase Storage and local fallback
    await saveSiteContent(content);

    // 7. Revalidate Next.js cache so the new post is immediately visible to visitors & crawlers
    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${post.slug}`);
      revalidatePath("/");
      revalidatePath("/sitemap.xml");
      revalidatePath("/admin");
    } catch (revErr) {
      console.warn("Revalidation notice:", revErr);
    }

    return NextResponse.json({
      success: true,
      message: "Günlük MICE blog makalesi başarıyla oluşturuldu ve yayına alındı.",
      source,
      theme: selected.theme.primaryKeyword,
      post: {
        title: post.title,
        slug: post.slug,
        category: post.category,
        tags: post.tags,
        readingTime: post.readingTime,
        publishedAt: post.publishedAt
      }
    });

  } catch (error: any) {
    console.error("Cron generate blog error:", error);
    return NextResponse.json(
      { error: error?.message || "Günlük blog oluşturulurken hata meydana geldi." },
      { status: 500 }
    );
  }
}

// Vercel Cron sends GET requests by default
export async function GET(request: Request) {
  return handleGenerateDailyBlog(request);
}

// Support POST for manual webhooks or admin triggers
export async function POST(request: Request) {
  return handleGenerateDailyBlog(request);
}
