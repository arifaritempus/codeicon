import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://codeicon.co"),
  title: {
    default: "CODEICON — MICE Acente Sistemi, ARCH OS Mimarlık Yazılımı & Bordro ERP",
    template: "%s | CODEICON",
  },
  description:
    "CODEICON; kurumsal MICE acente sistemi, MICE yönetim sistemi, online MICE programı, mimarlık ve şantiye yönetim platformu ARCH OS, KKTC Bordro CY ve hepp randevu ekosistemini tek çatı altında sunan yeni nesil bulut teknolojileri platformudur.",
  keywords: [
    "MICE acente sistemi",
    "MICE yönetim sistemi",
    "online MICE sistemi",
    "MICE programı",
    "MICE acente yazılımı",
    "turizm acente otomasyonu",
    "TCMB kur sabitleme acente",
    "acente rooming list",
    "transfer görev emri otomasyonu",
    "ARCH OS",
    "mimarlık ofis yazılımı",
    "mimarlık proje yönetim sistemi",
    "şantiye takip programı",
    "taşeron hakediş programı",
    "tasarım dondurma design freeze",
    "KKTC bordro programı",
    "BORDRO CY",
    "CODEICON",
  ],
  alternates: {
    canonical: "https://codeicon.co",
    types: {
      "text/plain": "/llms.txt",
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://codeicon.co",
    title: "CODEICON — MICE Acente Sistemi, ARCH OS Mimarlık Yazılımı & Bordro ERP",
    description:
      "Kurumsal MICE acente sistemi, ARCH OS mimarlık ve şantiye hakediş yazılımı, KKTC Bordro CY ve hepp randevu ekosistemi.",
    siteName: "CODEICON",
    images: [
      {
        url: "https://codeicon.co/images/mockups/dashboard.png",
        width: 1200,
        height: 630,
        alt: "CODEICON Teknoloji Ekosistemi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CODEICON — MICE Acente Sistemi, ARCH OS Mimarlık Yazılımı & Bordro ERP",
    description:
      "Kurumsal MICE acente sistemi, ARCH OS mimarlık ve şantiye hakediş yazılımı, KKTC Bordro CY ve hepp randevu ekosistemi.",
    images: ["https://codeicon.co/images/mockups/dashboard.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "TR-34",
    "geo.placename": "Istanbul",
    "geo.position": "41.0082;28.9784",
    "ICBM": "41.0082, 28.9784",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://codeicon.co/#organization",
      name: "CODEICON",
      url: "https://codeicon.co",
      logo: "https://codeicon.co/favicon.ico",
      description:
        "MICE acente sistemi, ARCH OS mimarlık & şantiye yönetimi, KKTC Bordro ERP ve mobil randevu teknolojileri üreten kurumsal yazılım şirketi.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "İstanbul",
        addressRegion: "Marmara",
        addressCountry: "TR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@codeicon.co",
        telephone: "+90-533-889-99-44",
        contactType: "customer support",
        areaServed: ["TR", "CY", "GLOBAL"],
        availableLanguage: ["Turkish", "English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://codeicon.co/#website",
      url: "https://codeicon.co",
      name: "CODEICON",
      description: "MICE Acente Sistemi & Kurumsal Yazılım Ekosistemi",
      publisher: {
        "@id": "https://codeicon.co/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://codeicon.co/blog?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://codeicon.co/#mice-os",
      name: "CODEICON MICE Agency OS",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Cloud / Web",
      description:
        "Kurumsal MICE ve seyahat acenteleri için TCMB kur sabitleme, dinamik rooming list, WhatsApp transfer görev emri ve Sejour entegrasyonu sunan acente işletim sistemi.",
      featureList: [
        "TCMB Otomatik Canlı Kur Sabitleme",
        "Havalimanı ve Transfer Saha Operasyonu",
        "Otel ve Rooming List Yönetimi (Excel Otomasyonu)",
        "WhatsApp Şoför ve Ekip Görev Emri Otomasyonu",
        "Sejour ve Muhasebe ERP Entegrasyonu",
        "MICE Teklif ve Bütçe Onay Portalı",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://codeicon.co/#arch-os",
      name: "ARCH OS (Architectural Office OS)",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Cloud / Web",
      description:
        "Mimarlık, iç mimarlık ve anahtar teslim inşaat ofisleri için dinamik proje aşamaları, müşteri tasarım dondurma (Design Freeze), şantiye günlüğü, fotoğraflı kusur listesi (Snagging) ve taşeron hakediş motoru.",
      featureList: [
        "Mimari Proje Aşamaları & Aday Takibi",
        "Müşteri Tasarım Dondurma (Design Freeze Onayı)",
        "Mobil Uyumlu Şantiye Günlüğü & Hava Durumu",
        "Fotoğraflı Eksik/Kusur Listesi (Snagging Canvas)",
        "Birim Fiyatlı Metraj Cetveli (BOQ) & Kümülatif Hakediş",
        "Çift Cüzdan (Ofis vs. İşveren Emanet Kasası)",
        "TCMB Çapraz Döviz Kurları (GBP, EUR, USD, TRY)",
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://codeicon.co/#bordro-cy",
      name: "BORDRO CY (KKTC Bordro & İK ERP)",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Cloud / Web",
      description:
        "KKTC Sosyal Sigorta, İhtiyat Sandığı ve Gelir Vergisi (PAYE) mevzuatına %100 uyumlu bulut bordro ve insan kaynakları sistemi. Netten brüte kuruşu kuruşuna hesaplama ve resmi matbu bildirgeler.",
      featureList: [
        "Net'ten Brüt'e Kuruşu Kuruşuna Hesaplama",
        "70.893 ₺ Asgari Ücret Vergi Muafiyeti Koruması",
        "SS7, SS8, SS14, İ.S.4, İ.S.22A ve VD17A Bildirgeleri",
        "Toplu Puantaj Matrisi & 4 Kutulu Resmi Maaş Hesap Pusulası",
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://codeicon.co/#hepp-app",
      name: "hepp Mobil Randevu",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "iOS, Android, Web",
      description:
        "KKTC'de berber, kuaför, veteriner, ev temizliği ve yerel hizmetler için hiper-yerel mobil randevu platformu.",
      url: "https://hepp.app",
    },
    {
      "@type": "FAQPage",
      "@id": "https://codeicon.co/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "MICE acente sistemi nedir ve hangi operasyonları kapsar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "MICE acente sistemi; kurumsal bayi toplantıları, kongreler, lansmanlar ve grup seyahatleri düzenleyen acentelerin teklif hazırlama, TCMB canlı kur sabitleme, otel rooming listesi eşleme, havalimanı transferi WhatsApp görev emirleri ve Sejour muhasebe entegrasyonu gibi tüm operasyonlarını tek merkezden yöneten bulut yazılımdır.",
          },
        },
        {
          "@type": "Question",
          name: "ARCH OS mimarlık ve şantiye yönetiminde neler sağlar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ARCH OS; mimarlık ve iç mimarlık ofisleri için Röleve'den Ruhsata proje aşamalarını yönetir, müşteriye tek tıkla dijital tasarım dondurma (Design Freeze) onay linki sunar, şantiyede fotoğraflı eksik (Snagging) işaretleme sağlar ve taşeronların birim fiyatlı kümülatif hakediş hesaplarını otomatikleştirir.",
          },
        },
        {
          "@type": "Question",
          name: "BORDRO CY KKTC mevzuatına tam uyumlu mu?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Evet. BORDRO CY, KKTC Sosyal Sigortalar Dairesi, İhtiyat Sandığı ve Gelir ve Vergi Dairesi mevzuatına tam uyumludur. Net'ten brüt'e çevrimde TC, KKTC ve 3. ülke vatandaşları için kuruşu kuruşuna doğru kesintileri hesaplar ve SS7, SS8, İ.S.4 ve VD17A gibi resmi matbu formları üretir.",
          },
        },
        {
          "@type": "Question",
          name: "CODEICON platformları bulut tabanlı mı?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Evet, tüm CODEICON platformları modern bulut mimarisi üzerinde çalışır. Kurulum gerektirmez, tüm cihazlardan erişilebilir ve veriler anlık olarak yedeklenir.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Albert+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,700&family=Fragment+Mono&family=Geist:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased bg-[#F4F2EE] text-[#1A1A1A]">
        {children}
      </body>
    </html>
  );
}
