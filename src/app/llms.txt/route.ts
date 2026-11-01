import { NextResponse } from "next/server";
import { getSiteContent } from "@/lib/contentStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getSiteContent();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codeicon.co";

  const brandName = content?.brand?.name || "CODEICON";
  const brandTitle = "MICE Acente Sistemi, ARCH OS Mimarlık Platformu & Kurumsal Yazılım Ekosistemi";
  const brandDesc =
    "CODEICON; B2B MICE acente işletim sistemi (MICE OS), mimarlık ve anahtar teslim şantiye yönetim platformu (ARCH OS), KKTC mevzuat uyumlu bordro ERP'si (BORDRO CY) ve yeni nesil randevu pazaryeri (hepp) ile kurumsal süreçleri buluta taşıyan yeni nesil teknoloji ekosistemidir.";

  const posts: any[] = (content?.blog?.posts || []).filter((p: any) => p.published !== false);

  let markdown = `# ${brandName} — ${brandTitle}\n\n`;
  markdown += `> ${brandDesc}\n\n`;

  markdown += `## Temel Bilgiler\n`;
  markdown += `- **Ekosistem**: B2B & B2C Bulut Yazılımları (SaaS / ERP)\n`;
  markdown += `- **Hedef Kitle**: MICE ve Kongre Acenteleri, Seyahat Acenteleri, Mimarlık Ofisleri, Şantiye ve İnşaat Yöneticileri, KKTC İşletmeleri & Muhasebe Ekipleri, Hizmet Sektörü Tüketicileri\n`;
  markdown += `- **Resmi Web Sitesi**: ${baseUrl}\n`;
  markdown += `- **Blog & Bilgi Bankası**: ${baseUrl}/blog\n`;
  markdown += `- **İletişim**: ${content?.brand?.contactEmail || "hello@codeicon.co"} | ${content?.brand?.contactPhone || "+90 (533) 889 99 44"}\n\n`;

  markdown += `## Ürün Ekosistemi\n\n`;

  markdown += `### 1. CODEICON MICE OS (MICE ve Seyahat Acente İşletim Sistemi)\n`;
  markdown += `- **Kapsam**: Kongre, toplantı, seminer ve kurumsal etkinlik düzenleyen acenteler için operasyon ve finans platformu.\n`;
  markdown += `- **Öne Çıkan Özellikler**:\n`;
  markdown += `  - **TCMB Canlı Kur Sabitleme**: Giriş (check-in) günü efektif satış kurunu otomatik bağlayarak kur farkı riskini sıfırlar.\n`;
  markdown += `  - **Şoför WhatsApp Görev Emri**: Uçuş API entegrasyonuyla rötarları algılar, transfer şoförlerine otomatik karşılama emirleri iletir.\n`;
  markdown += `  - **Excel'den Tek Tıkla Rooming List**: Müşterilerin dağınık Excel listelerini tek tıkla oda şablonlarına dönüştürür.\n`;
  markdown += `  - **Sejour & Muhasebe Entegrasyonu**: Logo, Netsis ve Dia gibi ERP'lerle çift yönlü mutabakat.\n\n`;

  markdown += `### 2. ARCH OS (Mimarlık Ofis & Şantiye Operasyonları Platformu)\n`;
  markdown += `- **Kapsam**: Mimarlık stüdyoları, anahtar teslim müteahhitler ve iç mimarlık ekipleri için stüdyo ve saha yönetim sistemi.\n`;
  markdown += `- **Öne Çıkan Özellikler**:\n`;
  markdown += `  - **Müşteri Tasarım Dondurma (Design Freeze)**: Röleve, ruhsat ve uygulama aşamalarında token korumalı link ile (/approve/[token]) müşteriden dijital imza ve tasarım onayı alır.\n`;
  markdown += `  - **Fotoğraflı Şantiye Snag / Punch List**: Şantiye alanında kusurları fotoğraf üstüne canvas ile işaretleyip ilgili taşerona görev atar.\n`;
  markdown += `  - **Kümülatif Taşeron Hakediş Motoru (BOQ)**: Metraj cetveli üzerinden avans mahsubu, %5 teminat kesintisi ve KDV tevkifatlı hakediş raporları üretir.\n`;
  markdown += `  - **Çift Kasa Finans Yönetimi**: Ofis anahtar teslim (Turnkey) kasası ile işveren emanet (Escrow) kasasını yasal olarak ayrıştırır; TCMB canlı çapraz kurlarıyla proje kârlılığını izler.\n\n`;

  markdown += `### 3. BORDRO CY (KKTC Standartlarında Bulut Bordro & İK ERP)\n`;
  markdown += `- **Kapsam**: Kuzey Kıbrıs Türk Cumhuriyeti mevzuatına %100 uyumlu bulut bordro yazılımı.\n`;
  markdown += `- **Öne Çıkan Özellikler**:\n`;
  markdown += `  - Net'ten Brüt'e hatasız kuruşu kuruşuna hesaplama.\n`;
  markdown += `  - 70.893 ₺ Asgari Ücret Vergi Koruması ve PAYE dilimleri.\n`;
  markdown += `  - Resmi matbu bildirgeler: SS7, SS8, İ.S.4 ve VD17A formları.\n`;
  markdown += `  - Toplu puantaj içe aktarımı ve 4 kutulu resmi ücret hesap pusulası.\n\n`;

  markdown += `### 4. hepp (Yeni Nesil Mobil Randevu Pazaryeri)\n`;
  markdown += `- **Kapsam**: KKTC'de berber, kuaför, veteriner, ev temizliği vb. yerel işletmeler için mobil randevu uygulaması.\n`;
  markdown += `- **Öne Çıkan Özellikler**:\n`;
  markdown += `  - Müşteriye %100 ücretsiz rezervasyon ve anlık müsaitlik.\n`;
  markdown += `  - 24 saat ve 2 saat kala otomatik WhatsApp randevu hatırlatması.\n`;
  markdown += `  - Lefkoşa, Girne ve Gazimağusa genelinde yerel işletme keşfi.\n`;
  markdown += `  - Web: [hepp.app](https://hepp.app)\n\n`;

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
