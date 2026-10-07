import fs from "fs";
import path from "path";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/grovia/Navbar";
import Hero from "@/components/grovia/Hero";
import ProcessSteps from "@/components/grovia/ProcessSteps";
import FeatureTabs from "@/components/grovia/FeatureTabs";
import Integrations from "@/components/grovia/Integrations";
import Pricing from "@/components/grovia/Pricing";
import CaseStudies from "@/components/grovia/CaseStudies";
import Faq from "@/components/grovia/Faq";
import ContactCta from "@/components/grovia/ContactCta";
import Footer from "@/components/grovia/Footer";
import SmoothScroll from "@/components/grovia/SmoothScroll";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

function getContent() {
  const filePath = path.join(process.cwd(), "src/data/siteContent.json");
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const content = getContent();
  const title =
    content?.brand?.siteTitle ||
    `${content?.brand?.name || "CODEICON"} — MICE Acente Sistemi`;
  const description =
    content?.hero?.subtitle ||
    content?.brand?.badge ||
    "MICE ve Acente Yönetim Sistemi";
  const favicon = content?.assets?.faviconUrl || "/favicon.ico";

  return {
    title,
    description,
    icons: {
      icon: favicon,
    },
  };
}

export default function Home() {
  const content = getContent();
  const visibility = content?.visibility || {
    hero: true,
    process: true,
    features: true,
    integrations: true,
    pricing: true,
    caseStudies: true,
    faq: true,
    contact: true,
  };

  const faviconUrl = content?.assets?.faviconUrl || "/favicon.ico";
  const siteTitle =
    content?.brand?.siteTitle ||
    `${content?.brand?.name || "CODEICON"} — Turizm ve MICE Acente Yönetim Sistemi`;

  const theme = content?.theme || {};
  const fontFamily = theme?.fontFamily || "'Inter', system-ui, -apple-system, sans-serif";
  const bgMain = theme?.colors?.background || "#F4F2EE";
  const textMain = theme?.colors?.foreground || "#1A1A1A";

  return (
    <div
      style={{
        backgroundColor: bgMain,
        color: textMain,
        fontFamily: fontFamily,
      }}
      className="min-h-screen flex flex-col selection:bg-[#1A1A1A] selection:text-white relative overflow-x-hidden w-full max-w-full"
    >
      <>
        <title>{siteTitle}</title>
        <link rel="icon" href={faviconUrl} />
        {theme?.googleFontUrl && <link rel="stylesheet" href={theme.googleFontUrl} />}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --bg-main: ${bgMain};
                --text-main: ${textMain};
                --color-muted: ${theme?.colors?.muted || "#605F5F"};
                --color-accent: ${theme?.colors?.accent || "#FEF7AF"};
                --color-accent-text: ${theme?.colors?.accentText || "#594C00"};
                --color-card-bg: ${theme?.colors?.cardBg || "#FFFFFF"};
                --color-border: ${theme?.colors?.border || "#DDD7D0"};
                --color-button-bg: ${theme?.colors?.buttonBg || "#1A1A1A"};
                --color-button-text: ${theme?.colors?.buttonText || "#FFFFFF"};

                /* Typography variables */
                --hero-title-size: ${theme?.typography?.heroTitle?.size || "clamp(2.25rem, 5vw, 4.5rem)"};
                --hero-title-weight: ${theme?.typography?.heroTitle?.weight || "700"};
                --hero-title-style: ${theme?.typography?.heroTitle?.italic ? "italic" : "normal"};
                --hero-title-color: ${theme?.typography?.heroTitle?.color || textMain};

                --hero-accent-weight: ${theme?.typography?.heroTitleAccent?.weight || "400"};
                --hero-accent-style: ${theme?.typography?.heroTitleAccent?.italic !== false ? "italic" : "normal"};
                --hero-accent-color: ${theme?.typography?.heroTitleAccent?.color || "#2A2A2A"};

                --hero-sub-size: ${theme?.typography?.heroSubtitle?.size || "clamp(1rem, 2vw, 1.25rem)"};
                --hero-sub-weight: ${theme?.typography?.heroSubtitle?.weight || "400"};
                --hero-sub-style: ${theme?.typography?.heroSubtitle?.italic ? "italic" : "normal"};
                --hero-sub-color: ${theme?.typography?.heroSubtitle?.color || theme?.colors?.muted || "#605F5F"};

                --eyebrow-size: ${theme?.typography?.sectionEyebrow?.size || "0.75rem"};
                --eyebrow-weight: ${theme?.typography?.sectionEyebrow?.weight || "600"};
                --eyebrow-style: ${theme?.typography?.sectionEyebrow?.italic ? "italic" : "normal"};
                --eyebrow-color: ${theme?.typography?.sectionEyebrow?.color || "#8C8C8C"};

                --section-title-size: ${theme?.typography?.sectionTitle?.size || "clamp(1.75rem, 3.5vw, 3rem)"};
                --section-title-weight: ${theme?.typography?.sectionTitle?.weight || "700"};
                --section-title-style: ${theme?.typography?.sectionTitle?.italic ? "italic" : "normal"};
                --section-title-color: ${theme?.typography?.sectionTitle?.color || textMain};

                --section-sub-size: ${theme?.typography?.sectionSubtitle?.size || "1.0625rem"};
                --section-sub-weight: ${theme?.typography?.sectionSubtitle?.weight || "400"};
                --section-sub-style: ${theme?.typography?.sectionSubtitle?.italic ? "italic" : "normal"};
                --section-sub-color: ${theme?.typography?.sectionSubtitle?.color || theme?.colors?.muted || "#605F5F"};

                --card-title-size: ${theme?.typography?.cardTitle?.size || "1.25rem"};
                --card-title-weight: ${theme?.typography?.cardTitle?.weight || "700"};
                --card-title-style: ${theme?.typography?.cardTitle?.italic ? "italic" : "normal"};
                --card-title-color: ${theme?.typography?.cardTitle?.color || textMain};
              }
              body, button, input, textarea {
                font-family: ${fontFamily};
                letter-spacing: -0.03em;
              }
              h1, h2, h3, h4, h5, h6 {
                font-family: 'Albert Sans', -apple-system, sans-serif;
              }
              .custom-hero-title {
                font-family: 'Albert Sans', -apple-system, sans-serif !important;
                font-size: var(--hero-title-size) !important;
                font-weight: var(--hero-title-weight) !important;
                font-style: var(--hero-title-style) !important;
                color: var(--hero-title-color) !important;
                letter-spacing: -0.05em !important;
                line-height: 1.08 !important;
              }
              .custom-hero-accent {
                font-family: 'Albert Sans', -apple-system, sans-serif !important;
                font-weight: var(--hero-accent-weight) !important;
                font-style: var(--hero-accent-style) !important;
                color: var(--hero-accent-color) !important;
                letter-spacing: -0.04em !important;
              }
              .custom-hero-sub {
                font-family: 'Geist', -apple-system, sans-serif !important;
                font-size: var(--hero-sub-size) !important;
                font-weight: var(--hero-sub-weight) !important;
                font-style: var(--hero-sub-style) !important;
                color: var(--hero-sub-color) !important;
                letter-spacing: -0.03em !important;
                line-height: 1.4 !important;
              }
              .custom-eyebrow {
                font-family: 'Albert Sans', -apple-system, sans-serif !important;
                font-size: var(--eyebrow-size) !important;
                font-weight: var(--eyebrow-weight) !important;
                font-style: var(--eyebrow-style) !important;
                color: var(--eyebrow-color) !important;
                letter-spacing: 0.04em !important;
                text-transform: uppercase !important;
              }
              .custom-section-title {
                font-family: 'Albert Sans', -apple-system, sans-serif !important;
                font-size: var(--section-title-size) !important;
                font-weight: var(--section-title-weight) !important;
                font-style: var(--section-title-style) !important;
                color: var(--section-title-color);
                letter-spacing: -0.05em !important;
                line-height: 1.1 !important;
              }
              .custom-section-sub {
                font-family: 'Geist', -apple-system, sans-serif !important;
                font-size: var(--section-sub-size) !important;
                font-weight: var(--section-sub-weight) !important;
                font-style: var(--section-sub-style) !important;
                color: var(--section-sub-color);
                letter-spacing: -0.03em !important;
                line-height: 1.4 !important;
              }
              .custom-card-title {
                font-family: 'Albert Sans', -apple-system, sans-serif !important;
                font-size: var(--card-title-size) !important;
                font-weight: var(--card-title-weight) !important;
                font-style: var(--card-title-style) !important;
                color: var(--card-title-color) !important;
                letter-spacing: -0.04em !important;
              }
            `,
          }}
        />
      </>
      <SmoothScroll />
      <Navbar content={content} />
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {visibility.hero && (
          <Hero
            content={content?.hero}
            brand={content?.brand}
            assets={content?.assets}
            buttons={content?.buttons}
            references={content?.references}
          />
        )}
        {visibility.process && <ProcessSteps content={content?.process} />}
        {visibility.features && <FeatureTabs content={content?.features} />}
        {visibility.integrations && <Integrations content={content?.integrations} />}
        {visibility.pricing && <Pricing content={content?.pricing} />}
        {visibility.caseStudies && <CaseStudies content={content?.references || content?.caseStudies} />}
        {visibility.faq && <Faq content={content?.faq} />}
        {visibility.contact && (
          <ContactCta content={content?.contact} buttons={content?.buttons} />
        )}
      </main>
      <Footer content={content} />

      {/* Floating Admin Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#1A1A1A] text-white text-[11px] sm:text-xs font-semibold shadow-xl hover:bg-neutral-800 transition-all hover:scale-105 border border-white/20 group"
          title="İçerikleri Düzenle"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#FEF7AF] transition-transform group-hover:rotate-45" />
          <span>Yönetim Paneli</span>
        </Link>
      </div>
    </div>
  );
}
