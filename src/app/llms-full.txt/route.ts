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

  let markdown = `# ${brandName} — ${brandTitle} (Tam Bilgi Bankası / Full Knowledge Base)\n\n`;
  markdown += `> ${brandDesc}\n\n`;
  markdown += `Web Sitesi: ${baseUrl}\n\n`;
  markdown += `---\n\n`;

  markdown += `## 1. Platform Genel Mimarisi ve Çözümleri\n\n`;
  markdown += `CODEICON, geleneksel seyahat acentelerinin ve kurumsal MICE organizasyon ekiplerinin yaşadığı operasyonel kör noktaları, finansal kur kayıplarını ve koordinasyon problemlerini çözen entegre bir acente işletim sistemidir.\n\n`;

  markdown += `### Temel Özellikler:\n`;
  markdown += `1. **TCMB Kur Sabitleme ve Finans Modülü**: TCMB bültenini otomatik olarak bağlayarak teklif anında ve fatura kesiminde kur farkı zararlarını sıfırlar.\n`;
  markdown += `2. **Saha ve Transfer Operasyonu**: Havalimanı karşılama ekipleri, şoförler ve operasyon şefleri arasında anlık WhatsApp görev emri entegrasyonu kurar.\n`;
  markdown += `3. **Otel ve Rooming List Otomasyonu**: Kongrelerdeki yüzlerce misafirin oda dağılımını, erken check-in / geç check-out taleplerini ve no-show risklerini yönetir.\n`;
  markdown += `4. **Gerçek Zamanlı Bütçe ve Kârlılık**: Proje bazlı gelir, gider, avans ve tedarikçi borçlarını tek ekranda sunar.\n\n`;

  markdown += `---\n\n`;
  markdown += `## 2. Blog Makaleleri ve Sektörel Rehberler\n\n`;

  posts.forEach((post: any, index: number) => {
    markdown += `### 2.${index + 1}. ${post.title}\n`;
    markdown += `- **URL**: ${baseUrl}/blog/${post.slug}\n`;
    if (post.category) markdown += `- **Kategori**: ${post.category}\n`;
    if (post.publishedAt) markdown += `- **Yayın Tarihi**: ${post.publishedAt}\n`;
    if (post.readingTime) markdown += `- **Okuma Süresi**: ${post.readingTime}\n`;
    if (post.tags && Array.isArray(post.tags)) markdown += `- **Etiketler**: ${post.tags.join(", ")}\n`;
    markdown += `\n**Özet:**\n${post.excerpt || ""}\n\n`;
    markdown += `**Makale Metni:**\n\n${post.content || ""}\n\n`;
    markdown += `---\n\n`;
  });

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
