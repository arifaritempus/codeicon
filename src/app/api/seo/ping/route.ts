import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSiteContent } from "@/lib/contentStore";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const content = await getSiteContent();
    const blogPosts = content?.blog?.posts || [];
    const latestPost = blogPosts[0];

    const host = "www.codeicon.co";
    const key = "f1a8c909e6c24be8b2e35a0928a6f443";
    const keyLocation = `https://${host}/${key}.txt`;

    const urlList = [
      `https://${host}/`,
      `https://${host}/blog`,
      `https://${host}/sitemap.xml`,
      `https://${host}/llms.txt`,
    ];

    if (latestPost?.slug) {
      urlList.push(`https://${host}/blog/${latestPost.slug}`);
    }

    // 1. Revalidate Next.js cache
    try {
      revalidatePath("/");
      revalidatePath("/blog");
      revalidatePath("/sitemap.xml");
      if (latestPost?.slug) {
        revalidatePath(`/blog/${latestPost.slug}`);
      }
    } catch (e) {
      console.warn("Revalidate error:", e);
    }

    // 2. IndexNow submission (Bing, Yandex, Naver, Seznam)
    let indexNowSuccess = false;
    let indexNowStatus = 0;
    try {
      const indexNowRes = await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          host,
          key,
          keyLocation,
          urlList,
        }),
      });
      indexNowStatus = indexNowRes.status;
      indexNowSuccess = indexNowRes.ok || indexNowRes.status === 200 || indexNowRes.status === 202;
    } catch (inErr) {
      console.warn("IndexNow ping failed:", inErr);
    }

    // 3. Ping Google Sitemap
    let googlePingSuccess = false;
    try {
      const googleRes = await fetch(`https://www.google.com/ping?sitemap=https://${host}/sitemap.xml`);
      googlePingSuccess = googleRes.ok;
    } catch (gErr) {
      console.warn("Google ping failed:", gErr);
    }

    return NextResponse.json({
      success: true,
      message: "Arama motorlarına ve yapay zeka tarayıcılarına anlık indeksleme bildirimi iletildi.",
      details: {
        indexNow: { success: indexNowSuccess, status: indexNowStatus },
        googlePing: { success: googlePingSuccess },
        urlsSubmitted: urlList,
        latestPost: latestPost?.title || "Yok",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "İndeksleme isteği gönderilemedi." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  return POST(request);
}
