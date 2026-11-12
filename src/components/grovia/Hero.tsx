"use client";

import { ArrowRight, Check, Laptop, Smartphone, Calculator, Building2, Calendar } from "lucide-react";

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
  const title = content?.title || "MICE Acente Sistemi, Kongre";
  const titleAccent = content?.titleAccent || "& Kurumsal Mimari Yazılımlar";
  const subtitle =
    content?.subtitle ||
    "B2B MICE acente işletim sisteminden (MICE OS), dernek & kongre platformuna (KONGRE), mimarlık ve anahtar teslim şantiye yönetimine (ARCH OS) ve KKTC bordro ERP'sine (BORDRO CY) uzanan entegre bulut ekosistemi.";

  const ctaPrimaryText = buttons?.heroPrimaryText || content?.ctaPrimary || "Hadi Başlayalım";
  const ctaPrimaryHref = buttons?.heroPrimaryHref || "#contact";
  const ctaSecondaryText = buttons?.heroSecondaryText || content?.ctaSecondary || "Bize Ulaşın";
  const ctaSecondaryHref = buttons?.heroSecondaryHref || "#contact";

  const heroMockupImage = assets?.heroMockupImage || "/images/mockups/dashboard.png";

  // KONGRE configuration (from Supabase/siteContent or defaults)
  const kongre = content?.kongre || {
    eyebrow: "KONGRE & ETKİNLİK SAAS",
    statusBadge: "Multi-Tenant Bulut Mimarisi",
    title: "KONGRE Cloud",
    headline: "Bağımsız Domainli Kongre & Etkinlik",
    subtitle:
      "Dernekler ve acenteler için kendi domaininde açılan web sitesi, bilimsel program, bildiri (abstract) hakemliği ve QR akıllı geçiş.",
    primaryImage: "/images/kongre/kongre-dashboard.png",
    secondaryImage: "/images/kongre/kongre-portal.webp",
    ctaText: "Kongre Demosu Al",
    ctaHref: "#contact",
  };

  // ARCH OS configuration (from Supabase/siteContent or defaults)
  const arch = content?.arch || {
    eyebrow: "MİMARLIK & ŞANTİYE SAAS",
    statusBadge: "TR & KKTC Standartları",
    title: "ARCH OS",
    headline: "Mimarlık & Şantiye Operasyonları",
    subtitle:
      "Röleve'den ruhsata, şantiye günlüğünden taşeron hakedişine ve dijital tasarım dondurmaya (Design Freeze) mimarlık stüdyolarının bulut işletim sistemi.",
    primaryImage: "/images/arch/arch-dashboard.jpg",
    secondaryImage: "/images/arch/arch-siteops.jpg",
    ctaText: "Demo Talep Et",
    ctaHref: "#contact",
  };

  // BORDRO CY configuration (from Supabase/siteContent or defaults)
  const bordro = content?.bordro || {
    eyebrow: "KKTC BORDRO & İK YAZILIMI",
    statusBadge: "%100 KKTC Mevzuat Uyumlu",
    title: "BORDRO CY",
    headline: "KKTC Standartlarında Bulut Bordro & İK",
    subtitle:
      "KKTC Sosyal Sigorta, İhtiyat Sandığı ve Gelir Vergisi (PAYE) mevzuatına tam uyumlu; Net'ten Brüt'e hatasız hesaplama ve resmi matbu bildirgeler.",
    primaryImage: "/images/bordro/bordro-matbu-bos.svg",
    secondaryImage: "/images/bordro/bordro-matbu-bos.svg",
    ctaText: "Demo Talep Et",
    ctaHref: "#contact",
  };

  // Hepp configuration (from Supabase/siteContent or defaults)
  const hepp = content?.hepp || {
    title: "Her anında Hepp yanında.",
    subtitle: "KKTC'de berber, kuaför, veteriner, ev temizliği ve daha fazlası için randevu uygulaması. İşletme onaylar, hepp WhatsApp ya da bildirimle hatırlatır.",
    primaryImage: "/images/hepp/hepp-home.png",
    secondaryImage: "/images/hepp/hepp-business.png",
    websiteUrl: "https://hepp.app",
  };

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
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-b from-[#FEF7AF]/30 via-[#F4F2EE]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grovia-container">
        {/* HERO TITLE & ECOSYSTEM INTRODUCTION */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 pt-4 sm:pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E6E1DC] text-xs font-semibold text-[#1A1A1A] mb-5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#1A1A1A] animate-pulse" />
            <span>CODEICON TEKNOLOJİ EKOSİSTEMİ</span>
          </div>

          <h1 className="custom-hero-title text-4xl sm:text-5xl lg:text-[56px] font-normal tracking-tight text-[#1A1A1A] leading-[1.08] mb-5 break-words">
            {title}{" "}
            <span className="custom-hero-accent italic font-normal text-[#1A1A1A] block sm:inline">
              {titleAccent}
            </span>
          </h1>

          <p className="custom-hero-sub text-base sm:text-lg text-[#605F5F] leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* 4-B2B FLAGSHIP OPERATING SYSTEMS SHOWCASE */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch mb-12 sm:mb-16">
          
          {/* PRODUCT 1: CODEICON MICE OS */}
          <div
            id="mice-os"
            className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-[#E6E1DC] shadow-[0_15px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.07)] transition-all duration-300 flex flex-col justify-between text-left"
          >
            <div>
              {/* Product Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FEF7AF] text-[#594C00] border border-[#FEF7AF]">
                  <Laptop className="w-3.5 h-3.5" />
                  <span>B2B ACENTE PLATFORMU</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Canlı &amp; Satışta</span>
                </span>
              </div>

              {/* Product Info */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight mb-2">
                MICE Agency OS
              </h2>
              <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                Acente Operasyon &amp; Kur Sistemi
              </p>
              <p className="text-xs sm:text-sm text-[#605F5F] leading-relaxed mb-6">
                Kongre, bayi toplantısı, transfer operasyonu ve TCMB kur sabitleme ile kurumsal acentelerin hata payını sıfırlayan bulut mimarisi.
              </p>

              {/* Feature Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 text-xs text-[#1A1A1A] font-medium">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F6] border border-[#EAE6E1]">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>TCMB Canlı Kur Sabitleme</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F6] border border-[#EAE6E1]">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Şoför WhatsApp Görev Emri</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F6] border border-[#EAE6E1]">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Excel&apos;den Tek Tıkla Rooming</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F6] border border-[#EAE6E1]">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sejour &amp; Muhasebe Entegre</span>
                </div>
              </div>

              {/* Mockup Preview Container */}
              <div className="relative rounded-2xl p-2 bg-[#FAF9F6] border border-[#EAE6E1] overflow-hidden mb-6 shadow-inner group-hover:border-[#DDD7D0] transition">
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#EAE6E1] bg-white rounded-t-xl mb-1.5 text-[11px] text-[#8C8C8C]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E57373]" />
                    <span className="w-2 h-2 rounded-full bg-[#FFB74D]" />
                    <span className="w-2 h-2 rounded-full bg-[#81C784]" />
                    <span className="ml-1 font-mono text-[10px] text-[#605F5F]">app.codeicon.co</span>
                  </div>
                  <span className="text-[10px] font-semibold text-neutral-600">MICE OS Panel</span>
                </div>
                <div className="overflow-hidden rounded-xl bg-white">
                  <img
                    src={heroMockupImage}
                    alt="CODEICON MICE OS Dashboard"
                    className="w-full h-[200px] sm:h-[230px] object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href={ctaPrimaryHref}
                className="grovia-btn-primary group text-xs sm:text-sm py-2 px-4"
              >
                <span>{ctaPrimaryText}</span>
                <span className="arrow-capsule">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
              <a
                href="#features"
                className="grovia-btn-secondary text-xs sm:text-sm py-2 px-3"
              >
                Özellikler
              </a>
            </div>
          </div>

          {/* PRODUCT 2: KONGRE CLOUD SAAS */}
          <div
            id="kongre-os"
            className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-[#E6E1DC] shadow-[0_15px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(139,92,246,0.08)] transition-all duration-300 flex flex-col justify-between text-left"
          >
            <div>
              {/* Product Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F5F3FF] text-[#6D28D9] border border-[#EDE9FE]">
                  <Calendar className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span>{kongre.eyebrow || "KONGRE & ETKİNLİK SAAS"}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                  <span>{kongre.statusBadge || "Multi-Tenant Bulut"}</span>
                </span>
              </div>

              {/* Product Info */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight mb-2">
                {kongre.title || "KONGRE Cloud"}
              </h2>
              <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                {kongre.headline || "Bağımsız Domainli Kongre & Etkinlik"}
              </p>
              <p className="text-xs sm:text-sm text-[#605F5F] leading-relaxed mb-6">
                {kongre.subtitle || "Dernekler ve acenteler için kendi domaininde açılan web sitesi, bilimsel program, bildiri (abstract) hakemliği ve QR akıllı geçiş."}
              </p>

              {/* Feature Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 text-xs text-[#1A1A1A] font-medium">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F6] border border-[#EAE6E1]">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Özel Domain (kongre2026.org)</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F6] border border-[#EAE6E1]">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Bildiri &amp; Çift Kör Hakem</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F6] border border-[#EAE6E1]">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>QR Akredite &amp; Yaka Kartı</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F6] border border-[#EAE6E1]">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Sponsor Stant &amp; Kota Portalı</span>
                </div>
              </div>

              {/* Mockup Preview Container */}
              <div className="relative rounded-2xl p-2 bg-[#FAF9F6] border border-[#EAE6E1] overflow-hidden mb-6 shadow-inner group-hover:border-[#DDD7D0] transition">
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#EAE6E1] bg-white rounded-t-xl mb-1.5 text-[11px] text-[#8C8C8C]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E57373]" />
                    <span className="w-2 h-2 rounded-full bg-[#FFB74D]" />
                    <span className="w-2 h-2 rounded-full bg-[#81C784]" />
                    <span className="ml-1 font-mono text-[10px] text-[#605F5F]">app.kongre.live</span>
                  </div>
                  <span className="text-[10px] font-semibold text-neutral-600">Kongre Paneli</span>
                </div>
                <div className="overflow-hidden rounded-xl bg-white">
                  <img
                    src={kongre.primaryImage || "/images/kongre/kongre-dashboard.png"}
                    alt="KONGRE Cloud Kongre ve Etkinlik Yönetim SaaS Dashboard"
                    className="w-full h-[200px] sm:h-[230px] object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href={kongre.ctaHref || "#contact"}
                className="grovia-btn-primary group text-xs sm:text-sm py-2 px-4"
              >
                <span>{kongre.ctaText || "Kongre Demosu Al"}</span>
                <span className="arrow-capsule">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
              <a
                href="#contact"
                className="grovia-btn-secondary text-xs sm:text-sm py-2 px-3"
              >
                Bildiri Modülü
              </a>
            </div>
          </div>

          {/* PRODUCT 3: ARCH OS (MİMARLIK & ŞANTİYE) */}
          <div
            id="arch-os"
            className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-[#E6E1DC] shadow-[0_15px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(249,115,22,0.08)] transition-all duration-300 flex flex-col justify-between text-left"
          >
            <div>
              {/* Product Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FFF7ED] text-[#C2410C] border border-[#FFEDD5]">
                  <Building2 className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>{arch.eyebrow || "MİMARLIK & ŞANTİYE SAAS"}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span>{arch.statusBadge || "TR & KKTC Standartları"}</span>
                </span>
              </div>

              {/* Product Info */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight mb-2">
                {arch.title || "ARCH OS"}
              </h2>
              <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                {arch.headline || "Mimarlık & Şantiye Operasyonları"}
              </p>
              <p className="text-xs sm:text-sm text-[#605F5F] leading-relaxed mb-6">
                {arch.subtitle || "Röleve'den ruhsata, şantiye günlüğünden taşeron hakedişine ve dijital tasarım dondurmaya (Design Freeze) mimarlık stüdyolarının bulut işletim sistemi."}
              </p>

              {/* Feature Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 text-xs text-[#1A1A1A] font-medium">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F6] border border-[#EAE6E1]">
                  <Check className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>Müşteri Tasarım Dondurma</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F6] border border-[#EAE6E1]">
                  <Check className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>Fotoğraflı Şantiye Snag</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F6] border border-[#EAE6E1]">
                  <Check className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>Taşeron BOQ &amp; Hakediş</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F6] border border-[#EAE6E1]">
                  <Check className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>Çift Kasa (Ofis &amp; Emanet)</span>
                </div>
              </div>

              {/* Mockup Preview Container */}
              <div className="relative rounded-2xl p-2 bg-[#FAF9F6] border border-[#EAE6E1] overflow-hidden mb-6 shadow-inner group-hover:border-[#DDD7D0] transition">
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#EAE6E1] bg-white rounded-t-xl mb-1.5 text-[11px] text-[#8C8C8C]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E57373]" />
                    <span className="w-2 h-2 rounded-full bg-[#FFB74D]" />
                    <span className="w-2 h-2 rounded-full bg-[#81C784]" />
                    <span className="ml-1 font-mono text-[10px] text-[#605F5F]">app.archos.live</span>
                  </div>
                  <span className="text-[10px] font-semibold text-neutral-600">ARCH OS Stüdyo</span>
                </div>
                <div className="overflow-hidden rounded-xl bg-white">
                  <img
                    src={arch.primaryImage || "/images/arch/arch-dashboard.jpg"}
                    alt="ARCH OS Mimarlık ve Şantiye Yönetim Sistemi Dashboard"
                    className="w-full h-[200px] sm:h-[230px] object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href={arch.ctaHref || "#contact"}
                className="grovia-btn-primary group text-xs sm:text-sm py-2 px-4"
              >
                <span>{arch.ctaText || "Demo Talep Et"}</span>
                <span className="arrow-capsule">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
              <a
                href="#contact"
                className="grovia-btn-secondary text-xs sm:text-sm py-2 px-3"
              >
                Şantiye Modülü
              </a>
            </div>
          </div>

          {/* PRODUCT 4: BORDRO CY (KKTC BORDRO & İK ERP) */}
          <div
            id="bordro-cy"
            className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-[#E6E1DC] shadow-[0_15px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(37,99,235,0.07)] transition-all duration-300 flex flex-col justify-between text-left"
          >
            <div>
              {/* Product Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE]">
                  <Calculator className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>{bordro.eyebrow || "KKTC BORDRO & İK ERP"}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span>{bordro.statusBadge || "%100 Mevzuat Uyumlu"}</span>
                </span>
              </div>

              {/* Product Info */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight mb-2">
                {bordro.title || "BORDRO CY"}
              </h2>
              <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                {bordro.headline || "KKTC Standartlarında Bulut Bordro & İK"}
              </p>
              <p className="text-xs sm:text-sm text-[#605F5F] leading-relaxed mb-6">
                {bordro.subtitle || "KKTC Sosyal Sigorta, İhtiyat Sandığı ve Gelir Vergisi (PAYE) mevzuatına tam uyumlu; Net'ten Brüt'e hatasız hesaplama ve resmi matbu bildirgeler."}
              </p>

              {/* Feature Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 text-xs text-[#1A1A1A] font-medium">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F6] border border-[#EAE6E1]">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Net&apos;ten Brüt&apos;e Kuruşu Kuruşuna</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F6] border border-[#EAE6E1]">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>70.893 ₺ Asgari Ücret Koruması</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F6] border border-[#EAE6E1]">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>SS7, SS8, İ.S.4 &amp; VD17A</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F6] border border-[#EAE6E1]">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Toplu Puantaj &amp; 4 Kutulu Pusula</span>
                </div>
              </div>

              {/* Mockup Preview Container */}
              <div className="relative rounded-2xl p-2 bg-[#FAF9F6] border border-[#EAE6E1] overflow-hidden mb-6 shadow-inner group-hover:border-[#DDD7D0] transition">
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#EAE6E1] bg-white rounded-t-xl mb-1.5 text-[11px] text-[#8C8C8C]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E57373]" />
                    <span className="w-2 h-2 rounded-full bg-[#FFB74D]" />
                    <span className="w-2 h-2 rounded-full bg-[#81C784]" />
                    <span className="ml-1 font-mono text-[10px] text-[#605F5F]">app.bordro.cy</span>
                  </div>
                  <span className="text-[10px] font-semibold text-neutral-600">KKTC Bordro ERP</span>
                </div>
                <div className="overflow-hidden rounded-xl bg-white p-1">
                  <img
                    src={bordro.primaryImage || "/images/bordro/bordro-matbu-bos.svg"}
                    alt="BORDRO CY KKTC Resmi Boş Matbu Maaş Bordrosu Şablonu"
                    className="w-full h-[200px] sm:h-[230px] object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href={bordro.ctaHref || "#contact"}
                className="grovia-btn-primary group text-xs sm:text-sm py-2 px-4"
              >
                <span>{bordro.ctaText || "Demo Talep Et"}</span>
                <span className="arrow-capsule">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
              <a
                href="#contact"
                className="grovia-btn-secondary text-xs sm:text-sm py-2 px-3"
              >
                Mevzuat Bilgisi
              </a>
            </div>
          </div>

        </div>

        {/* ECOSYSTEM SPOTLIGHT: hepp MOBİL RANDEVU UYGULAMASI (Full-width Showcase) */}
        <div
          id="hepp-app"
          className="group relative bg-gradient-to-r from-white via-[#FFF9F6] to-white rounded-3xl p-6 sm:p-10 border border-[#E6E1DC] shadow-[0_15px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(255,77,45,0.08)] transition-all duration-300 mb-16 sm:mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FAF9F6] text-[#1A1A1A] border border-[#E6E1DC]">
                  <Smartphone className="w-3.5 h-3.5 text-[#FF4D2D]" />
                  <span>B2C &amp; YEREL İŞLETME</span>
                </span>
                <span className="text-[11px] font-semibold text-[#605F5F] bg-[#F4F2EE] px-2.5 py-0.5 rounded-full border border-[#E6E1DC]">
                  Mobil Randevu Pazaryeri
                </span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={hepp.logoSvg || "/images/hepp/hepp-logo.svg"}
                  alt="hepp Logo"
                  className="w-10 h-10 rounded-xl object-contain shadow-2xs"
                />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight">
                    hepp
                  </h2>
                </div>
              </div>

              <p className="text-base sm:text-lg font-semibold text-[#1A1A1A]">
                {hepp.title || "Her anında Hepp yanında."}
              </p>
              <p className="text-xs sm:text-sm text-[#605F5F] leading-relaxed max-w-xl">
                {hepp.subtitle || "KKTC'de berber, kuaför, veteriner, ev temizliği ve daha fazlası için randevu uygulaması. İşletme onaylar, hepp WhatsApp ya da bildirimle hatırlatır."}
              </p>

              {/* Feature Bullets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs text-[#1A1A1A] font-medium">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EAE6E1]">
                  <span className="text-[#FF4D2D] font-bold">⚡</span>
                  <span>Müşteriye %100 Ücretsiz</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EAE6E1]">
                  <span className="text-[#FF4D2D] font-bold">💬</span>
                  <span>WhatsApp Hatırlatması</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EAE6E1]">
                  <span className="text-[#FF4D2D] font-bold">📍</span>
                  <span>Lefkoşa · Girne · Mağusa</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EAE6E1]">
                  <span className="text-[#FF4D2D] font-bold">✓</span>
                  <span>Türkçe ve İngilizce</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={hepp.websiteUrl || "https://hepp.app"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF4D2D] text-white text-xs sm:text-sm font-bold hover:bg-[#E03D1E] transition shadow-xs group cursor-pointer"
                >
                  <span>hepp.app Web Sitesini Keşfet</span>
                  <span className="w-5 h-5 rounded-full bg-white text-[#FF4D2D] flex items-center justify-center text-xs transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-3 h-3 text-[#FF4D2D]" />
                  </span>
                </a>
              </div>
            </div>

            {/* Right Mockup Display */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative rounded-2xl p-4 bg-gradient-to-b from-[#F4F2EE]/50 to-[#FAF9F6] border border-[#EAE6E1] overflow-hidden flex items-center justify-center min-h-[220px] sm:min-h-[260px] w-full max-w-[380px] group-hover:border-[#FF4D2D]/30 transition">
                <div className="absolute right-4 sm:right-8 top-3 w-[140px] sm:w-[160px] opacity-45 blur-[0.4px] rotate-[8deg] transition-all duration-500 group-hover:rotate-[11deg] group-hover:opacity-60">
                  <img
                    src={hepp.secondaryImage || "/images/hepp/hepp-business.png"}
                    alt="hepp İşletme Profili"
                    className="w-full h-auto drop-shadow-md rounded-2xl"
                  />
                </div>
                <div className="relative z-10 w-[155px] sm:w-[180px] -rotate-[3deg] transition-all duration-500 group-hover:rotate-0 group-hover:scale-105">
                  <img
                    src={hepp.primaryImage || "/images/hepp/hepp-home.png"}
                    alt="hepp Keşif Ana Ekranı"
                    className="w-full h-auto drop-shadow-2xl rounded-2xl"
                  />
                </div>
                <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#E6E1DC] shadow-md text-[10px] font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D2D]" />
                  <span>Bugün müsait</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LOGO STRIP TICKER (Preserved authentic MICE references) */}
        <div className="w-full py-8 sm:py-10 border-t border-b border-[#E2DDD7] mb-14 sm:mb-20 overflow-hidden">
          <div className="flex items-center justify-around gap-8 sm:gap-14 flex-wrap max-w-5xl mx-auto px-4">
            {logos.map((logo: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 transition-all duration-300 hover:scale-105 cursor-pointer opacity-85 hover:opacity-100 grayscale hover:grayscale-0 group"
              >
                {logo.logoUrl ? (
                  <img
                    src={logo.logoUrl}
                    alt={logo.name}
                    className="h-8 sm:h-10 md:h-11 max-w-[160px] sm:max-w-[180px] object-contain transition-all duration-300 drop-shadow-2xs"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-base sm:text-lg font-bold text-[#1A1A1A] tracking-tight">
                    <span className="text-base text-[#1A1A1A]">{logo.icon || "✦"}</span>
                    <span>{logo.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
