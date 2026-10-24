import { NextResponse } from "next/server";
import { isSessionValid } from "@/lib/auth";
import { generateBlogPostWithAI } from "@/lib/blogGenerator";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const authenticated = await isSessionValid();
    if (!authenticated) {
      return NextResponse.json({ error: "Yetkisiz işlem! Lütfen panele giriş yapın." }, { status: 401 });
    }

    const body = await request.json();
    const { topic, tone = "profesyonel", audience = "MICE Acenteleri & Operasyon Yöneticileri", customKey, apiKey, provider = "auto" } = body;
    const finalKey = customKey || apiKey;

    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return NextResponse.json({ error: "Lütfen bir blog konusu veya başlığı belirtin." }, { status: 400 });
    }

    const { post, source } = await generateBlogPostWithAI({
      topic,
      tone,
      audience,
      provider,
      apiKey: finalKey
    });

    return NextResponse.json({
      success: true,
      source,
      post,
      article: post
    });
  } catch (error: any) {
    console.error("Generate blog error:", error);
    return NextResponse.json({ error: error?.message || "İçerik oluşturulamadı." }, { status: 500 });
  }
}
