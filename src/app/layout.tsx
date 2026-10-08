import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://codeicon.co"),
  title: {
    default: "CODEICON — MICE ve Seyahat Acentesi İşletim Sistemi",
    template: "%s | CODEICON",
  },
  description:
    "Kurumsal MICE acenteleri ve seyahat ekipleri için yeni nesil saha operasyonu, TCMB otomatik kur sabitleme, dinamik rooming list ve bütçe yönetim işletim sistemi.",
  keywords: [
    "MICE",
    "Acente Yönetim Sistemi",
    "TCMB Kur Sabitleme",
    "Kongre Yazılımı",
    "Rooming List",
    "Transfer Operasyonu",
    "Turizm Otomasyonu",
    "Seyahat Acentesi Yazılımı",
  ],
  alternates: {
    canonical: "/",
    types: {
      "text/plain": "/llms.txt",
    },
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
        "MICE ve Seyahat Acenteleri için Kurumsal İşletim Sistemi ve Finansal Otomasyon Platformu",
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
      "@type": "SoftwareApplication",
      "@id": "https://codeicon.co/#software",
      name: "CODEICON MICE OS",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web / Cloud",
      featureList: [
        "TCMB Otomatik Kur Entegrasyonu",
        "Havalimanı ve Transfer Saha Operasyonu",
        "Otel ve Rooming List Yönetimi",
        "WhatsApp Şoför ve Ekip Görev Emri Otomasyonu",
        "Sejour ve ERP Entegrasyonu",
        "Bütçe ve Avans Takibi",
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
