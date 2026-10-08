import { NextResponse } from "next/server";
import { getSiteContent } from "@/lib/contentStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getSiteContent();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codeicon.co";

  const brandName = content?.brand?.name || "CODEICON";
  const brandTitle = content?.brand?.title || "MICE ve Seyahat Acentesi İşletim Sistemi";
  const brandDesc =
    content?.brand?.description ||
    "CODEICON; kurumsal MICE acenteleri, kongre ve etkinlik ekipleri için tasarlanmış yeni nesil operasyon, saha yönetimi ve finans işletim sistemidir.";

  const posts: any[] = (content?.blog?.posts || []).filter((p: any) => p.published !== false);

  let markdown = `# ${brandName} — ${brandTitle}\n\n`;
  markdown += `> ${brandDesc}\n\n`;

  markdown += `## Temel Bilgiler\n`;
  markdown += `- **Ürün Türü**: SaaS / Kurumsal MICE & Kongre Yönetim Platformu\n`;
  markdown += `- **Hedef Kitle**: Kurumsal MICE Acenteleri, Kongre Organizatörleri, Seyahat Acentesi Sahipleri, Saha ve Transfer Ekipleri, Muhasebe & Finans Yöneticileri\n`;
  markdown += `- **Resmi Web Sitesi**: ${baseUrl}\n`;
  markdown += `- **Blog & Bilgi Bankası**: ${baseUrl}/blog\n`;
  markdown += `- **İletişim**: ${content?.brand?.contactEmail || "hello@codeicon.co"} | ${content?.brand?.contactPhone || "+90 (533) 889 99 44"}\n\n`;

  markdown += `## Temel Platform Yetenekleri & Modüller\n`;
  markdown += `- **TCMB Otomatik Döviz Kuru Entegrasyonu**: TCMB saat 15:30 kur bültenini otomatik çeker; teklif, maliyet ve faturalarda kur farkı risklerini ve zararları sıfırlar.\n`;
  markdown += `- **Havalimanı & Saha Transfer Operasyonu**: Uçuş rötarlarını anlık takip eder, şoför ve rehberlere dinamik WhatsApp görev emirleri gönderir.\n`;
  markdown += `- **Dinamik Rooming List Yönetimi**: Otel oda listelerini matbu Excel karmaşasından kurtarır, çakışmaları ve no-show maliyetlerini önler.\n`;
  markdown += `- **Bütçe, Avans & Masraf Kontrolü**: Saha harcamalarını, tedarikçi ödemelerini ve etkinlik kârlılığını anlık konsolide eder.\n`;
  markdown += `- **Sejour, Otel & Uçak Entegrasyonları**: Acentelerin kullandığı mevcut altyapılarla çift yönlü veri senkronizasyonu sağlar.\n\n`;

  markdown += `## Fiyatlandırma & Paketler\n`;
  if (content?.pricing?.plans && Array.isArray(content.pricing.plans)) {
    content.pricing.plans.forEach((plan: any) => {
      markdown += `- **${plan.name}**: ${plan.price || "Teklif ile"} — ${plan.description || ""}\n`;
    });
    markdown += `\n`;
  } else {
    markdown += `- Başlangıç, Profesyonel ve Enterprise özel acente kurulum paketleri sunulmaktadır.\n\n`;
  }

  markdown += `## Sektörel Blog & Rehber Makaleleri\n`;
  if (posts.length > 0) {
    posts.forEach((post: any) => {
      const postUrl = `${baseUrl}/blog/${post.slug}`;
      const desc = post.excerpt ? `: ${post.excerpt}` : "";
      const cat = post.category ? ` [${post.category}]` : "";
      markdown += `- [${post.title}](${postUrl})${cat}${desc}\n`;
    });
  } else {
    markdown += `- Güncel blog yazıları için ${baseUrl}/blog adresini ziyaret edin.\n`;
  }

  markdown += `\n## Tam İçerik (Full Knowledge Base)\n`;
  markdown += `- Tüm makalelerin ve teknik rehberlerin tam metni için: [${baseUrl}/llms-full.txt](${baseUrl}/llms-full.txt)\n`;

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
