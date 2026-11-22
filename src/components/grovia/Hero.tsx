"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  Laptop,
  Calendar,
  Building2,
  Calculator,
  Smartphone,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  Clock,
  Layers
} from "lucide-react";

export default function Hero({
  content,
  brand,
  assets,
  buttons,
  references,
}: {
  content?: any;
  brand?: any;
  assets?: any;
  buttons?: any;
  references?: any;
}) {
  const [activeSystem, setActiveSystem] = useState<"mice" | "kongre" | "arch" | "bordro" | "hepp">("mice");

  const title = content?.title || "MICE Acente Sistemi, Kongre";
  const titleAccent = content?.titleAccent || "& Kurumsal İşletim Sistemleri";
  const subtitle =
    content?.subtitle ||
    "B2B MICE acentelerinden kongre yönetimine, mimarlık stüdyolarından KKTC bordro ERP'sine ve akıllı randevu pazaryerine; operasyonları sıfır hataya indiren entegre teknoloji ekosistemi.";

  const ctaPrimaryText = buttons?.heroPrimaryText || content?.ctaPrimary || "Demoyu Keşfedin";
  const ctaPrimaryHref = buttons?.heroPrimaryHref || "#contact";
  const ctaSecondaryText = buttons?.heroSecondaryText || content?.ctaSecondary || "Ekosistem Ürünleri";
  const ctaSecondaryHref = buttons?.heroSecondaryHref || "#products";

  const heroMockupImage = assets?.heroMockupImage || "/images/mockups/dashboard.png";

  // System Configurations
  const systems = {
    mice: {
      id: "mice-os",
      tag: "MICE AGENCY OS",
      tagColor: "bg-[#FEF7AF] text-[#594C00] border-[#FEF7AF]",
      title: "MICE Agency OS",
      subtitle: "B2B MICE Acente İşletim Sistemi & Kur Motoru",
      description:
        "TCMB saat 15:30 kur sabitleme, Sejour & Uçuş API entegrasyonu, WhatsApp şoför görev emri ve tek tıkla Excel rooming listesi eşleme ile kurumsal acentelerin hata payını sıfırlayan bulut altyapısı.",
      domain: "app.codeicon.co",
      badge: "Canlı & Satışta",
      badgeType: "emerald",
      image: heroMockupImage,
      icon: Laptop,
      highlights: [
        { label: "TCMB Canlı Kur", val: "15:30 Çek-in Kuru Sabitleme" },
        { label: "Uçuş & Transfer", val: "Rötar Korumalı WhatsApp Görev Emri" },
        { label: "Rooming List", val: "Excel'den Tek Tıkla Sıfır Hata Eşleme" },
        { label: "ERP Entegrasyon", val: "Sejour, Logo & Netsis Çift Yönlü" },
      ],
      ctaText: "MICE OS Demosu Al",
      ctaHref: "#contact",
      detailsHref: "#products",
    },
    kongre: {
      id: "kongre-os",
      tag: "KONGRE CLOUD SAAS",
      tagColor: "bg-[#F5F3FF] text-[#6D28D9] border-[#EDE9FE]",
      title: "KONGRE Cloud",
      subtitle: "Bağımsız Domainli Çok Kiracılı Kongre & Bildiri Platformu",
      description:
        "Dernekler ve acenteler için tek tıkla bağımsız web sitesi açan; bildiri (abstract) toplama, çift kör hakemlik puanlama motoru, 3 saniyede QR akredite ve sponsor portalını yöneten SaaS.",
      domain: "portal.kongre.cloud",
      badge: "Multi-Tenant Bulut",
      badgeType: "purple",
      image: "/images/kongre/kongre-portal.webp",
      icon: Calendar,
      highlights: [
        { label: "Özel Domain", val: "kongre2026.org (Otomatik SSL)" },
        { label: "Bildiri / Abstract", val: "Çift Kör Hakem Puanlama Motoru" },
        { label: "Hızlı Akredite", val: "3 Saniyede QR Kodlu Yaka Kartı" },
        { label: "Sponsor Portalı", val: "Stant Yerleşimi & Kota Yönetimi" },
      ],
      ctaText: "KONGRE Demosu Al",
      ctaHref: "#contact",
      detailsHref: "#products",
    },
    arch: {
      id: "arch-os",
      tag: "ARCH OS MİMARLIK",
      tagColor: "bg-[#FFF7ED] text-[#C2410C] border-[#FFEDD5]",
      title: "ARCH OS",
      subtitle: "Mimarlık Stüdyosu & Anahtar Teslim Şantiye İşletim Sistemi",
      description:
        "Röleve'den ruhsata Design Freeze (/approve/[token]), fotoğraflı ve canvas çizimli şantiye kusur (snag) listesi, birim fiyatlı BOQ metrajı ve Çift Cüzdan (Ofis Turnkey vs İşveren Escrow) yönetimi.",
      domain: "app.archos.live",
      badge: "TR & KKTC Standartları",
      badgeType: "orange",
      image: "/images/arch/arch-dashboard.jpg",
      icon: Building2,
      highlights: [
        { label: "Design Freeze", val: "/approve/[token] Dijital Müşteri Onayı" },
        { label: "Şantiye Snag", val: "Fotoğraflı & Canvas Çizimli Kusur Kaydı" },
        { label: "BOQ & Metraj", val: "Kümülatif Taşeron Hakediş Motoru" },
        { label: "Çift Cüzdan", val: "Ofis Turnkey & İşveren Emanet Kasası" },
      ],
      ctaText: "ARCH OS Demosu Al",
      ctaHref: "#contact",
      detailsHref: "#products",
    },
    bordro: {
      id: "bordro-cy",
      tag: "BORDRO CY ERP",
      tagColor: "bg-[#EFF6FF] text-[#1D4ED8] border-[#DBEAFE]",
      title: "BORDRO CY",
      subtitle: "%100 KKTC Mevzuat Uyumlu Bulut Bordro & İK ERP'si",
      description:
        "Net'ten Brüt'e hatasız hesaplama, 70.893 ₺ brüt asgari ücret vergi koruması, Form VD 17a Stopaj Beyannamesi, Sosyal Sigortalar Form SS14 (D1/D2) ve İhtiyat Sandığı İ.S. 22A resmi matbu formları.",
      domain: "app.bordro.cy",
      badge: "%100 KKTC Mevzuat",
      badgeType: "blue",
      image: "/images/bordro/bordro-matbu-bos.svg",
      icon: Calculator,
      highlights: [
        { label: "Asgari Ücret", val: "70.893 ₺ Tam Vergi Koruması" },
        { label: "Resmi Belgeler", val: "Form VD 17a, SS14 & İ.S. 22A" },
        { label: "Bordro Düzeni", val: "D1, D2 Gruplama & Sicil Sıralaması" },
        { label: "Matbu Pusula", val: "KVKK Korumalı 4 Kutulu Hesap Pusulası" },
      ],
      ctaText: "BORDRO CY Demosu Al",
      ctaHref: "#contact",
      detailsHref: "#products",
    },
    hepp: {
      id: "hepp-app",
      tag: "HEPP MOBİL & WEB",
      tagColor: "bg-[#FFF1F2] text-[#E11D48] border-[#FFE4E6]",
      title: "hepp",
      subtitle: "Yeni Nesil Akıllı Randevu, Hizmet & Rezervasyon Pazaryeri",
      description:
        "Kuaför, güzellik merkezi, klinik, veteriner ve bağımsız uzmanlar için saniyeler içinde randevu oluşturan, WhatsApp/SMS hatırlatmalı ve doğrudan komisyonsuz tahsilat sunan randevu ekosistemi.",
      domain: "hepp.app",
      badge: "Mobil & Web Platform",
      badgeType: "rose",
      image: "/images/hepp/hepp-home.png",
      icon: Smartphone,
      highlights: [
        { label: "Hızlı Randevu", val: "15 Saniyede Anında Onay & Rezervasyon" },
        { label: "WhatsApp & SMS", val: "Otomatik Hatırlatma & No-Show Koruması" },
        { label: "İşletme Yönetimi", val: "Takvim, Personel & Müşteri Geçmişi" },
        { label: "Komisyonsuz", val: "İşletmeye Doğrudan ve Şeffaf Ödeme" },
      ],
      ctaText: "hepp.app'i Ziyaret Et",
      ctaHref: "https://hepp.app",
      isExternal: true,
      detailsHref: "#products",
    },
  };

  const currentSystem = systems[activeSystem];

  const defaultLogos = [
    { name: "TEMPUS TRAVEL", icon: "✦" },
    { name: "LA TOUR EVENT", icon: "▲" },
    { name: "RAVENTO TRAVEL", icon: "✚" },
    { name: "NOVA TRAVEL", icon: "⬡" },
    { name: "PLUTO MICE", icon: "✦" },
  ];

  const userLogos = references?.logos && references.logos.length > 0 ? references.logos : null;
  const logos = userLogos || defaultLogos;

  return (
    <section className="relative pt-24 pb-14 md:pt-32 md:pb-20 overflow-hidden">
      {/* Background Soft Glow & Grid Pattern */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[520px] bg-gradient-to-b from-[#FEF7AF]/25 via-[#F4F2EE]/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grovia-container">
        {/* HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 pt-2 sm:pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E6E1DC] text-xs font-semibold text-[#1A1A1A] mb-5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#1A1A1A] animate-pulse" />
            <span className="tracking-wide">CODEICON TEKNOLOJİ EKOSİSTEMİ</span>
          </div>

          <h1 className="custom-hero-title text-4xl sm:text-5xl lg:text-[56px] font-normal tracking-tight text-[#1A1A1A] leading-[1.08] mb-5 break-words">
            {title}{" "}
            <span className="custom-hero-accent italic font-normal text-[#1A1A1A] block sm:inline">
              {titleAccent}
            </span>
          </h1>

          <p className="custom-hero-sub text-base sm:text-lg text-[#605F5F] leading-relaxed max-w-2xl mx-auto mb-8">
            {subtitle}
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={ctaPrimaryHref}
              className="grovia-btn-primary group text-sm py-2.5 px-5 shadow-sm"
            >
              <span>{ctaPrimaryText}</span>
              <span className="arrow-capsule">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
            <a
              href={ctaSecondaryHref}
              className="grovia-btn-secondary text-sm py-2.5 px-4"
            >
              <span>{ctaSecondaryText}</span>
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MASTER ECOSYSTEM CONSOLE (FLAGSHIP INTERACTIVE STAGE)                     */}
        {/* ========================================================================= */}
        <div className="relative max-w-5xl mx-auto bg-white rounded-3xl border border-[#E6E1DC] shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden mb-12">
          
          {/* Top Interactive Product Navigation Tabs */}
          <div className="border-b border-[#EAE6E1] bg-[#FAF9F6] p-2 sm:p-2.5">
            <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-0.5">
              {(
                [
                  { id: "mice", label: "MICE Agency OS", icon: Laptop },
                  { id: "kongre", label: "KONGRE Cloud", icon: Calendar },
                  { id: "arch", label: "ARCH OS", icon: Building2 },
                  { id: "bordro", label: "BORDRO CY", icon: Calculator },
                  { id: "hepp", label: "hepp", icon: Smartphone },
                ] as const
              ).map((tab) => {
                const isSelected = activeSystem === tab.id;
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSystem(tab.id)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer ${
                      isSelected
                        ? "bg-white text-[#1A1A1A] shadow-xs border border-[#E2DDD6]"
                        : "text-[#605F5F] hover:text-[#1A1A1A] hover:bg-black/5"
                    }`}
                  >
                    <IconComponent
                      className={`w-3.5 h-3.5 ${
                        isSelected ? "text-[#1A1A1A]" : "text-[#8C8C8C]"
                      }`}
                    />
                    <span>{tab.label}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Console Body: 2 Columns (Info on Left, Real UI Preview on Right) */}
          <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: System Info & Core Capabilities */}
            <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${currentSystem.tagColor}`}
                  >
                    <currentSystem.icon className="w-3.5 h-3.5" />
                    <span>{currentSystem.tag}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{currentSystem.badge}</span>
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight mb-2">
                  {currentSystem.title}
                </h3>
                <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                  {currentSystem.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[#605F5F] leading-relaxed">
                  {currentSystem.description}
                </p>
              </div>

              {/* 4 Technical Highlights Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {currentSystem.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE6E1]"
                  >
                    <div className="text-[11px] font-bold text-[#1A1A1A] flex items-center gap-1.5 mb-0.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{h.label}</span>
                    </div>
                    <div className="text-[11px] text-[#605F5F] leading-snug">
                      {h.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Primary Action Button */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={currentSystem.ctaHref}
                  target={(currentSystem as any).isExternal ? "_blank" : undefined}
                  rel={(currentSystem as any).isExternal ? "noopener noreferrer" : undefined}
                  className="grovia-btn-primary group text-xs sm:text-sm py-2 px-4 shadow-sm"
                >
                  <span>{currentSystem.ctaText}</span>
                  <span className="arrow-capsule">
                    {(currentSystem as any).isExternal ? (
                      <ExternalLink className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5" />
                    )}
                  </span>
                </a>
                <a
                  href={`#${currentSystem.id}`}
                  className="grovia-btn-secondary text-xs sm:text-sm py-2 px-3 text-[#605F5F]"
                >
                  Detayları Gör
                </a>
              </div>
            </div>

            {/* Right Column: High-Fidelity Browser Window Preview */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl p-2 bg-[#FAF9F6] border border-[#EAE6E1] shadow-inner group transition duration-300">
                {/* Browser Mockup Chrome */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#EAE6E1] bg-white rounded-t-xl mb-1.5 text-xs text-[#8C8C8C]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    <span className="ml-2 font-mono text-[11px] text-[#475569] font-medium bg-[#F1F5F9] px-2 py-0.5 rounded-md border border-[#E2E8F0]">
                      https://{currentSystem.domain}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-600 hidden sm:inline">
                    {currentSystem.title}
                  </span>
                </div>

                {/* Mockup Display Box */}
                <div className="overflow-hidden rounded-xl bg-white border border-[#EAE6E1] flex items-center justify-center p-1 sm:p-2 min-h-[260px] sm:min-h-[320px]">
                  <img
                    key={currentSystem.id}
                    src={currentSystem.image}
                    alt={`${currentSystem.title} Ekran Görüntüsü`}
                    className="w-full h-[240px] sm:h-[300px] object-contain object-center transition-all duration-500 animate-fadeIn"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* ECOSYSTEM METRICS & TRUST STRIP                                           */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16 sm:mb-20 text-center">
          <div className="p-4 rounded-2xl bg-white/80 border border-[#EAE6E1] backdrop-blur-xs shadow-2xs">
            <div className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight">
              5 Dikey SaaS
            </div>
            <div className="text-xs text-[#605F5F] font-medium mt-1">
              Entegre Kurumsal Altyapı
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/80 border border-[#EAE6E1] backdrop-blur-xs shadow-2xs">
            <div className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight">
              15:30 TCMB
            </div>
            <div className="text-xs text-[#605F5F] font-medium mt-1">
              Canlı Kur Kilitleme Garantisi
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/80 border border-[#EAE6E1] backdrop-blur-xs shadow-2xs">
            <div className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight">
              3 Saniye
            </div>
            <div className="text-xs text-[#605F5F] font-medium mt-1">
              QR Akredite &amp; Termal Yaka Kartı
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/80 border border-[#EAE6E1] backdrop-blur-xs shadow-2xs">
            <div className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight">
              %100 Uyum
            </div>
            <div className="text-xs text-[#605F5F] font-medium mt-1">
              KKTC Gelir &amp; Sigortalar Mevzuatı
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION BREAK: 5 FLAGSHIP PRODUCTS GRID (THE 5 PILLARS)                   */}
        {/* ========================================================================= */}
        <div id="products" className="scroll-mt-24 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block bg-[#FEF7AF] text-[#594C00] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              UZMANLAŞMIŞ YAZILIMLAR
            </span>
            <h2 className="custom-section-title text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight mb-3">
              5 Amiral Sistem. Sıfır Hata Payı.
            </h2>
            <p className="text-sm sm:text-base text-[#605F5F] leading-relaxed">
              Her sektöre jenerik çözümler değil; işin mutfağında geliştirilmiş tam teşekküllü işletim sistemleri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* PILLAR 1: MICE OS */}
            <div
              id="mice-os"
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6E1DC] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FEF7AF] text-[#594C00]">
                    <Laptop className="w-3.5 h-3.5" />
                    <span>MICE ACENTE OS</span>
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    B2B Turizm
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight mb-1.5">
                  MICE Agency OS
                </h3>
                <p className="text-xs font-semibold text-neutral-800 mb-2">
                  Acente Operasyon, Kur &amp; Saha Omurgası
                </p>
                <p className="text-xs sm:text-sm text-[#605F5F] leading-relaxed mb-5">
                  Kongre, bayi toplantısı ve kurumsal etkinliklerde TCMB canlı kur sabitleme, uçuş API entegreli şoför WhatsApp görev emri ve matbu Excel rooming listelerini tek tıkla sisteme aktarma.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-start gap-2 text-xs text-[#2A2A2A]">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>TCMB 15:30 Kuru:</strong> Çek-in günü döviz kurunu kilitleyerek kur farkı zararını sıfırlar.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[#2A2A2A]">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Uçuş &amp; WhatsApp:</strong> THY/Pegasus rötarlarını takip edip şoföre anında görev emri iletir.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[#2A2A2A]">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Tek Tıkla Rooming:</strong> Dağınık Excel oda listelerini tek saniyede hatasız eşler.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[#2A2A2A]">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Sejour &amp; Muhasebe:</strong> Sejour, Logo ve Netsis ile çift yönlü cari mutabakat.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#F0ECE6] flex items-center justify-between">
                <a
                  href="#contact"
                  className="grovia-btn-primary group text-xs py-2 px-3.5"
                >
                  <span>MICE OS Demosu</span>
                  <span className="arrow-capsule">
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </a>
                <span className="font-mono text-[11px] text-[#8C8C8C]">app.codeicon.co</span>
              </div>
            </div>

            {/* PILLAR 2: KONGRE CLOUD */}
            <div
              id="kongre-os"
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6E1DC] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F5F3FF] text-[#6D28D9]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>KONGRE CLOUD</span>
                  </span>
                  <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                    Multi-Tenant SaaS
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight mb-1.5">
                  KONGRE Cloud
                </h3>
                <p className="text-xs font-semibold text-neutral-800 mb-2">
                  Bağımsız Domainli Kongre, Sempozyum &amp; Etkinlik
                </p>
                <p className="text-xs sm:text-sm text-[#605F5F] leading-relaxed mb-5">
                  Dernek ve acentelerin tek tıkla kendi domaininde kongre sitesi açtığı; bildiri (abstract) toplama, çift kör hakemlik, QR kodlu hızlı akredite ve sponsor portallarını yönettiği çok kiracılı SaaS.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-start gap-2 text-xs text-[#2A2A2A]">
                    <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span><strong>Özel Alan Adı:</strong> Her kongre kendi domaininde (kongre2026.org) ve SSL ile açılır.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[#2A2A2A]">
                    <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span><strong>Bildiri &amp; Hakem:</strong> Sözel/Poster bildiri toplama ve çift kör bağımsız hakem puanlaması.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[#2A2A2A]">
                    <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span><strong>3 Saniye QR Akredite:</strong> Kayıt masasında sıra beklemeden anında termal yaka kartı baskısı.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[#2A2A2A]">
                    <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span><strong>Sponsor Portalı:</strong> Platin/altın sponsorlar için bağımsız stant ve kota giriş ekranı.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#F0ECE6] flex items-center justify-between">
                <a
                  href="#contact"
                  className="grovia-btn-primary group text-xs py-2 px-3.5"
                >
                  <span>KONGRE Demosu</span>
                  <span className="arrow-capsule">
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </a>
                <span className="font-mono text-[11px] text-[#8C8C8C]">portal.kongre.cloud</span>
              </div>
            </div>

            {/* PILLAR 3: ARCH OS */}
            <div
              id="arch-os"
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6E1DC] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FFF7ED] text-[#C2410C]">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>ARCH OS</span>
                  </span>
                  <span className="text-[11px] font-semibold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                    Mimarlık &amp; Şantiye
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight mb-1.5">
                  ARCH OS
                </h3>
                <p className="text-xs font-semibold text-neutral-800 mb-2">
                  Stüdyo, Hakediş &amp; Şantiye İşletim Sistemi
                </p>
                <p className="text-xs sm:text-sm text-[#605F5F] leading-relaxed mb-5">
                  Röleve'den anahtar teslime mimarlık stüdyolarının bulut işletim sistemi. Tasarım dondurma, fotoğraflı şantiye kusur takibi, kümülatif taşeron hakedişi ve çift cüzdan mimarisi.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-start gap-2 text-xs text-[#2A2A2A]">
                    <Check className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span><strong>Design Freeze:</strong> /approve/[token] ile işverenden dijital revizyon onayı alınır ve proje dondurulur.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[#2A2A2A]">
                    <Check className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span><strong>Şantiye Snag:</strong> Sahadan fotoğraflı ve canvas çizimli kusurlar anında taşerona atanır.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[#2A2A2A]">
                    <Check className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span><strong>BOQ &amp; Hakediş:</strong> Metrajlı birim fiyat listeleri ve kümülatif taşeron hakediş motoru.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[#2A2A2A]">
                    <Check className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span><strong>Çift Cüzdan:</strong> Ofis anahtar teslim geliri ile işveren emanet (escrow) kasası tam izole.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#F0ECE6] flex items-center justify-between">
                <a
                  href="#contact"
                  className="grovia-btn-primary group text-xs py-2 px-3.5"
                >
                  <span>ARCH OS Demosu</span>
                  <span className="arrow-capsule">
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </a>
                <span className="font-mono text-[11px] text-[#8C8C8C]">app.archos.live</span>
              </div>
            </div>

            {/* PILLAR 4: BORDRO CY */}
            <div
              id="bordro-cy"
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6E1DC] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#1D4ED8]">
                    <Calculator className="w-3.5 h-3.5" />
                    <span>BORDRO CY</span>
                  </span>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    KKTC Mevzuat %100
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight mb-1.5">
                  BORDRO CY
                </h3>
                <p className="text-xs font-semibold text-neutral-800 mb-2">
                  KKTC Standartlarında Bulut Bordro &amp; İK
                </p>
                <p className="text-xs sm:text-sm text-[#605F5F] leading-relaxed mb-5">
                  Kuzey Kıbrıs mevzuatına tam uyumlu bulut bordro ERP'si. Net'ten Brüt'e hatasız hesaplama, asgari ücret vergi muafiyeti, Form VD 17a Stopaj Beyannamesi ve Form SS14 sigorta bildirgeleri.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-start gap-2 text-xs text-[#2A2A2A]">
                    <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>70.893 ₺ Vergi Koruması:</strong> 24/1982 sayılı yasa gereğince asgari ücrete kadar sıfır vergi.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[#2A2A2A]">
                    <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Form VD 17a &amp; SS14:</strong> Gelir ve Vergi Dairesi ile Sosyal Sigortalar Dairesi bildirgeleri hazır.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[#2A2A2A]">
                    <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>D1/D2 Gruplama &amp; Sicil:</strong> Sigorta numarasına göre küçükten büyüğe yasal sıralama.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[#2A2A2A]">
                    <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>4 Kutulu Matbu Pusula:</strong> Kazançlar, kesintiler, işveren maliyeti ve net tutar şablonu.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#F0ECE6] flex items-center justify-between">
                <a
                  href="#contact"
                  className="grovia-btn-primary group text-xs py-2 px-3.5"
                >
                  <span>BORDRO CY Demosu</span>
                  <span className="arrow-capsule">
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </a>
                <span className="font-mono text-[11px] text-[#8C8C8C]">app.bordro.cy</span>
              </div>
            </div>

            {/* PILLAR 5: hepp (WIDE 2-COLUMN SPAN ON DESKTOP) */}
            <div
              id="hepp-app"
              className="bg-gradient-to-br from-[#1A1A1A] via-[#242424] to-[#141414] text-white rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-md md:col-span-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FF4D2D] text-white">
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>HEPP MOBİL &amp; WEB</span>
                    </span>
                    <span className="text-[11px] font-semibold text-neutral-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                      Randevu Pazaryeri
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#FF4D2D] font-bold">https://hepp.app</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                      Her anında Hepp yanında.
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                      Kuaför, güzellik salonu, klinik, veteriner ve bağımsız uzmanlar için yeni nesil online randevu platformu. Müşteriler saniyeler içinde randevu alır; işletme onaylar, hepp WhatsApp ve SMS ile anında hatırlatır.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                        <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#FF4D2D]" />
                          15 Saniyede Rezervasyon
                        </div>
                        <p className="text-neutral-400 text-[11px]">Mobil ve webden anında uygun saat dilimini seçip onaylama.</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                        <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#FF4D2D]" />
                          WhatsApp Hatırlatma
                        </div>
                        <p className="text-neutral-400 text-[11px]">Unutulan randevuları ve no-show oranını sıfıra indiren otomasyon.</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                        <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#FF4D2D]" />
                          İşletme Takvim Portalı
                        </div>
                        <p className="text-neutral-400 text-[11px]">Personel vardiyası, hizmet süreleri ve ciro istatistikleri.</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                        <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#FF4D2D]" />
                          %0 Komisyonlu Ödeme
                        </div>
                        <p className="text-neutral-400 text-[11px]">İşletmenin kendi pos veya nakit kasasına doğrudan akış.</p>
                      </div>
                    </div>
                  </div>

                  {/* Hepp Phone Mockup Box */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative rounded-2xl p-2 bg-neutral-900 border border-neutral-700/80 shadow-2xl max-w-[280px]">
                      <img
                        src="/images/hepp/hepp-home.png"
                        alt="hepp Randevu Uygulaması"
                        className="w-full h-auto rounded-xl object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 mt-4">
                <a
                  href="https://hepp.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grovia-btn-primary group text-xs sm:text-sm py-2 px-5 bg-[#FF4D2D] hover:bg-[#e03f20] text-white border-none"
                >
                  <span>hepp.app'e Git</span>
                  <span className="arrow-capsule bg-white/20">
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </span>
                </a>
                <span className="text-xs text-neutral-400">
                  KKTC ve Türkiye genelinde aktif randevu pazaryeri
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* TRUSTED BY / REFERENCES CLIENT LOGOS                                      */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-[#EAE6E1] text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#8C8C8C] mb-6">
            Öncü Turizm Acenteleri, Kongre Organizasyonları &amp; Kurumsal Ekipler Tarafından Tercih Ediliyor
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            {logos.map((logo: any, idx: number) => (
              <div key={idx} className="flex items-center gap-2 text-sm font-bold tracking-tight text-[#1A1A1A]">
                <span className="text-xs text-[#FF4D2D]">{logo.icon || "✦"}</span>
                <span>{logo.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
