import { NextResponse } from "next/server";
import { getSiteContent } from "@/lib/contentStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getSiteContent();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codeicon.co";

  const brandName = content?.brand?.name || "CODEICON";
  const brandTitle = "MICE Acente Sistemi, ARCH OS Mimarlık Platformu & Kurumsal Yazılım Ekosistemi";
  const brandDesc =
    "CODEICON; B2B MICE acente işletim sistemi (MICE OS), mimarlık ve anahtar teslim şantiye platformu (ARCH OS), KKTC mevzuat uyumlu bordro ERP'si (BORDRO CY) ve yeni nesil mobil randevu pazaryeri (hepp) ile kurumsal süreçleri buluta taşıyan yeni nesil teknoloji ekosistemidir.";

  const posts: any[] = (content?.blog?.posts || []).filter((p: any) => p.published !== false);

  let markdown = `# ${brandName} — ${brandTitle} (Tam Bilgi Bankası / Full Knowledge Base)\n\n`;
  markdown += `> ${brandDesc}\n\n`;
  markdown += `Web Sitesi: ${baseUrl}\n\n`;
  markdown += `---\n\n`;

  markdown += `## 1. Platform Mimarisi ve Ekosistem Çözümleri\n\n`;
  markdown += `CODEICON, kurumsal sektörlerdeki operasyonel kör noktaları, finansal riskleri ve koordinasyon problemlerini çözen 4 amiral bulut ürününden oluşmaktadır:\n\n`;

  markdown += `### 1.1 CODEICON MICE OS (MICE ve Seyahat Acente İşletim Sistemi)\n`;
  markdown += `Kongre, bayi toplantısı ve grup seyahati organize eden turizm acentelerine yönelik operasyonel omurga.\n`;
  markdown += `- **TCMB Kur Sabitleme**: Otel giriş (check-in) günündeki efektif satış kurunu projeye kilitleyerek döviz dalgalanmalarından doğan kâr kaybını engeller.\n`;
  markdown += `- **Saha Transfer & Şoför WhatsApp**: THY ve Pegasus uçuş API'leri ile rötarlı uçuşları tespit eder; şoföre rota, yolcu ismi ve araç plakasını içeren görev emrini WhatsApp üzerinden iletir.\n`;
  markdown += `- **Rooming List & Excel Haritalama**: Kurumsal müşterilerden gelen farklı Excel şablonlarını tek tıkla standart otel oda listesine dönüştürür.\n`;
  markdown += `- **Muhasebe & Sejour Entegrasyonu**: Logo, Netsis, Dia ve Sejour sistemleriyle anlık çift yönlü mutabakat sağlar.\n\n`;

  markdown += `### 1.2 ARCH OS (Mimarlık Ofis & Şantiye Operasyonları Platformu)\n`;
  markdown += `Mimarlık stüdyoları, anahtar teslim müteahhitler ve iç mimarlık ekipleri için stüdyo ve saha yönetim sistemi.\n`;
  markdown += `- **Müşteri Tasarım Dondurma (Design Freeze)**: Röleve, ruhsat ve uygulama aşamalarında token korumalı link ile (/approve/[token]) müşteriden dijital imza ve tasarım onayı alır. Onay sonrası revizyonlar ek maliyet olarak ayrıştırılır.\n`;
  markdown += `- **Fotoğraflı Şantiye Snag / Punch List**: Şantiye alanında kusurları fotoğraf üstüne canvas ile işaretleyip ilgili taşerona termin tarihiyle görev atar.\n`;
  markdown += `- **Kümülatif Taşeron Hakediş Motoru (BOQ)**: Birim fiyatlı metraj cetveli üzerinden avans mahsubu, %5 teminat kesintisi ve KDV tevkifatlı hakediş raporları üretir.\n`;
  markdown += `- **Çift Kasa Finans Yönetimi**: Ofis anahtar teslim (Turnkey) kasası ile işveren emanet (Escrow) kasasını yasal olarak ayrıştırır; TCMB canlı çapraz kurlarıyla proje kârlılığını izler.\n\n`;

  markdown += `### 1.3 BORDRO CY (KKTC Standartlarında Bulut Bordro & İK ERP)\n`;
  markdown += `Kuzey Kıbrıs Türk Cumhuriyeti mevzuatına %100 uyumlu bulut bordro yazılımı.\n`;
  markdown += `- Net'ten Brüt'e hatasız kuruşu kuruşuna hesaplama.\n`;
  markdown += `- 70.893 ₺ Asgari Ücret Vergi Koruması ve PAYE dilimleri.\n`;
  markdown += `- Resmi matbu bildirgeler: SS7, SS8, İ.S.4 ve VD17A formları.\n`;
  markdown += `- Toplu puantaj içe aktarımı ve 4 kutulu resmi matbu ücret hesap pusulası.\n\n`;

  markdown += `### 1.4 hepp (Yeni Nesil Mobil Randevu Pazaryeri)\n`;
  markdown += `KKTC'de berber, kuaför, veteriner, ev temizliği vb. yerel işletmeler için mobil randevu uygulaması.\n`;
  markdown += `- Müşteriye %100 ücretsiz randevu ve anlık boş koltuk takvimi.\n`;
  markdown += `- 24 saat ve 2 saat kala otomatik WhatsApp hatırlatma bildirimi.\n`;
  markdown += `- Lefkoşa, Girne ve Gazimağusa genelinde yerel işletme keşfi.\n`;
  markdown += `- Web: [hepp.app](https://hepp.app)\n\n`;

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
