"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, Check, ExternalLink, X, Loader2, Sparkles, Smartphone, Laptop } from "lucide-react";

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
  const title = content?.title || "Geleceğin Yazılımlarını";
  const titleAccent = content?.titleAccent || "inşa ediyoruz.";
  const subtitle =
    content?.subtitle ||
    "Kurumsal B2B MICE acente işletim sisteminden, Kıbrıs'ın ilk hiper-yerel mobil randevu pazaryerine: operasyonları kolaylaştıran ve değer üreten yeni nesil teknolojiler.";

  const ctaPrimaryText = buttons?.heroPrimaryText || content?.ctaPrimary || "Hadi Başlayalım";
  const ctaPrimaryHref = buttons?.heroPrimaryHref || "#contact";
  const ctaSecondaryText = buttons?.heroSecondaryText || content?.ctaSecondary || "Bize Ulaşın";
  const ctaSecondaryHref = buttons?.heroSecondaryHref || "#contact";

  const heroMockupImage = assets?.heroMockupImage || "/images/mockups/dashboard.png";

  // Hepp configuration (from Supabase/siteContent or defaults)
  const hepp = content?.hepp || {
    badge: "KKTC'DE İLK",
    eyebrow: "YENİ MOBİL RANDEVU UYGULAMASI",
    title: "Her anında Hepp yanında.",
    subtitle: "KKTC'de berber, kuaför, veteriner, ev temizliği ve daha fazlası için randevu uygulaması. İşletme onaylar, hepp WhatsApp ya da bildirimle hatırlatır.",
    primaryImage: "/images/hepp/hepp-home.png", // Discovery Home screen in FRONT (as requested)
    secondaryImage: "/images/hepp/hepp-business.png", // Business detail screen in BACK (as requested)
    websiteUrl: "https://hepp.app",
    ctaText: "Açılışta Haber Ver",
  };

  // Lead modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadContact, setLeadContact] = useState("");
  const [leadType, setLeadType] = useState<"musteri" | "isletme">("musteri");
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadContact.trim()) {
      setLeadError("Lütfen adınızı ve telefon/e-posta bilginizi giriniz.");
      return;
    }
    setLeadLoading(true);
    setLeadError(null);

    try {
      const isEmail = leadContact.includes("@");
      const res = await fetch("/api/hepp/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          phone: isEmail ? undefined : leadContact,
          email: isEmail ? leadContact : undefined,
          type: leadType,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Kayıt alınamadı.");
      }

      setLeadSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setLeadSuccess(false);
        setLeadName("");
        setLeadContact("");
      }, 2500);
    } catch (err: any) {
      setLeadError(err.message || "Bir hata oluştu.");
    } finally {
      setLeadLoading(false);
    }
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

          <h1 className="custom-hero-title text-4xl sm:text-5xl lg:text-[58px] font-normal tracking-tight text-[#1A1A1A] leading-[1.08] mb-5 break-words">
            {title}{" "}
            <span className="custom-hero-accent italic font-normal text-[#1A1A1A] block sm:inline">
              {titleAccent}
            </span>
          </h1>

          <p className="custom-hero-sub text-base sm:text-lg text-[#605F5F] leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* DUAL PRODUCT SHOWCASE (ECOSYSTEM HERO) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch mb-16 sm:mb-24">
          
          {/* PRODUCT 1: CODEICON MICE OS */}
          <div
            id="mice-os"
            className="group relative bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E1DC] shadow-[0_15px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.07)] transition-all duration-300 flex flex-col justify-between text-left"
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
                MICE Agency Operating System
              </h2>
              <p className="text-sm text-[#605F5F] leading-relaxed mb-6">
                Kongre, bayi toplantısı, transfer operasyonu ve TCMB kur sabitleme ile kurumsal acentelerin hata payını sıfırlayan bulut mimarisi.
              </p>

              {/* Feature Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs text-[#1A1A1A] font-medium">
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
                  <span>Excel'den Tek Tıkla Rooming</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF9F6] border border-[#EAE6E1]">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sejour &amp; Muhasebe Entegrasyonu</span>
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
                    className="w-full h-[220px] sm:h-[260px] object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={ctaPrimaryHref}
                className="grovia-btn-primary group text-xs sm:text-sm py-2 px-5"
              >
                <span>{ctaPrimaryText}</span>
                <span className="arrow-capsule">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
              <a
                href="#features"
                className="grovia-btn-secondary text-xs sm:text-sm py-2 px-4"
              >
                Tüm Özellikleri Gör
              </a>
            </div>
          </div>

          {/* PRODUCT 2: hepp MOBİL RANDEVU UYGULAMASI */}
          <div
            id="hepp-app"
            className="group relative bg-gradient-to-b from-white via-white to-[#FFF9F6] rounded-3xl p-6 sm:p-8 border border-[#E6E1DC] shadow-[0_15px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(255,77,45,0.08)] transition-all duration-300 flex flex-col justify-between text-left"
          >
            <div>
              {/* Product Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FAF9F6] text-[#1A1A1A] border border-[#E6E1DC]">
                  <Smartphone className="w-3.5 h-3.5 text-[#FF4D2D]" />
                  <span>B2C &amp; YEREL İŞLETME</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FF4D2D] bg-[#FF4D2D]/10 px-2.5 py-0.5 rounded-full border border-[#FF4D2D]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D2D] animate-pulse" />
                  <span>{hepp.badge || "KKTC'DE İLK"}</span>
                </span>
              </div>

              {/* Product Info with Official Logo */}
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={hepp.logoSvg || "/images/hepp/hepp-logo.svg"}
                  alt="hepp Logo"
                  className="w-9 h-9 rounded-xl object-contain shadow-2xs"
                />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight">
                    hepp
                  </h2>
                </div>
              </div>

              <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                {hepp.title || "Her anında Hepp yanında."}
              </p>
              <p className="text-sm text-[#605F5F] leading-relaxed mb-6">
                {hepp.subtitle || "KKTC'de berber, kuaför, veteriner, ev temizliği ve daha fazlası için randevu uygulaması. İşletme onaylar, hepp WhatsApp ya da bildirimle hatırlatır."}
              </p>

              {/* Feature Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs text-[#1A1A1A] font-medium">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#EAE6E1]">
                  <span className="text-[#FF4D2D] font-bold">⚡</span>
                  <span>Müşteriye %100 Ücretsiz</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#EAE6E1]">
                  <span className="text-[#FF4D2D] font-bold">💬</span>
                  <span>WhatsApp Hatırlatma Bildirimi</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#EAE6E1]">
                  <span className="text-[#FF4D2D] font-bold">📍</span>
                  <span>Lefkoşa · Girne · Gazimağusa</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#EAE6E1]">
                  <span className="text-[#FF4D2D] font-bold">✓</span>
                  <span>Türkçe ve İngilizce Deneyim</span>
                </div>
              </div>

              {/* SWAPPED REAL MOCKUPS DISPLAY (hepp-home in FRONT, hepp-business in BACK) */}
              <div className="relative rounded-2xl p-4 bg-gradient-to-b from-[#F4F2EE]/50 to-[#FAF9F6] border border-[#EAE6E1] overflow-hidden mb-6 flex items-center justify-center min-h-[260px] sm:min-h-[285px] group-hover:border-[#FF4D2D]/30 transition">
                {/* Secondary Background Mockup (Aura Spa profile) */}
                <div className="absolute right-4 sm:right-10 top-3 w-[150px] sm:w-[175px] opacity-45 blur-[0.4px] rotate-[8deg] transition-all duration-500 group-hover:rotate-[11deg] group-hover:opacity-60">
                  <img
                    src={hepp.secondaryImage || "/images/hepp/hepp-business.png"}
                    alt="hepp İşletme Profili"
                    className="w-full h-auto drop-shadow-md rounded-2xl"
                  />
                </div>

                {/* Primary Foreground Mockup (Discovery Home Screen - user requested in FRONT) */}
                <div className="relative z-10 w-[170px] sm:w-[200px] -rotate-[3deg] transition-all duration-500 group-hover:rotate-0 group-hover:scale-105">
                  <img
                    src={hepp.primaryImage || "/images/hepp/hepp-home.png"}
                    alt="hepp Keşif Ana Ekranı"
                    className="w-full h-auto drop-shadow-2xl rounded-2xl"
                  />
                </div>

                {/* Floating Micro Badge */}
                <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E6E1DC] shadow-md text-[11px] font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF4D2D]" />
                  <span>Bugün müsait · Tek dokunuş</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions & Store Badges */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF4D2D] text-white text-xs sm:text-sm font-bold hover:bg-[#E03D1E] transition shadow-xs cursor-pointer group"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{hepp.ctaText || "Açılışta Haber Ver"}</span>
                  <span className="arrow-capsule bg-white text-[#FF4D2D]">
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </button>

                <a
                  href={hepp.websiteUrl || "https://hepp.app"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white text-[#1A1A1A] border border-[#E6E1DC] text-xs sm:text-sm font-semibold hover:bg-[#F4F2EE] transition cursor-pointer"
                >
                  <span>hepp.app</span>
                  <ExternalLink className="w-3 h-3 text-[#605F5F]" />
                </a>
              </div>

              {/* Store Availability Text */}
              <div className="flex items-center gap-3 text-[11px] text-[#8C8C8C]">
                <span>🍎 App Store (Yakında)</span>
                <span>•</span>
                <span>🤖 Google Play (Yakında)</span>
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

      {/* HEPP PRE-REGISTRATION / AÇILIŞTA HABER VER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E6E1DC] shadow-2xl relative text-left">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <img
                src={hepp.logoSvg || "/images/hepp/hepp-logo.svg"}
                alt="hepp"
                className="w-10 h-10 rounded-xl object-contain shadow-2xs"
              />
              <div>
                <h3 className="text-xl font-bold text-[#1A1A1A]">
                  hepp Açılışında İlk Haberdar Olun
                </h3>
                <p className="text-xs text-[#605F5F]">Her anında Hepp yanında.</p>
              </div>
            </div>

            <p className="text-xs text-[#605F5F] mb-5 leading-relaxed">
              KKTC'de berber, kuaför, veteriner, evcil hayvan bakımı ve ev temizliğinde ilk randevunuzu avantajla almak için bilgilerinizi bırakın.
            </p>

            {leadSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-1">
                <span className="text-2xl">🎉</span>
                <p className="font-bold text-sm">Harika! Bilgileriniz Alındı.</p>
                <p className="text-xs text-emerald-700">hepp açıldığında size öncelikli olarak WhatsApp ve e-posta ile bildireceğiz.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                {/* Role Switcher */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#F4F2EE] rounded-xl text-xs font-bold text-center">
                  <button
                    type="button"
                    onClick={() => setLeadType("musteri")}
                    className={`py-2 rounded-lg transition cursor-pointer ${
                      leadType === "musteri" ? "bg-white text-[#1A1A1A] shadow-2xs" : "text-[#605F5F]"
                    }`}
                  >
                    👤 Müşteriyim
                  </button>
                  <button
                    type="button"
                    onClick={() => setLeadType("isletme")}
                    className={`py-2 rounded-lg transition cursor-pointer ${
                      leadType === "isletme" ? "bg-white text-[#FF4D2D] shadow-2xs" : "text-[#605F5F]"
                    }`}
                  >
                    🏢 İşletme Sahibiyim
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                    Ad Soyad {leadType === "isletme" ? "/ İşletme Adı" : ""}
                  </label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder={leadType === "isletme" ? "Örn: Salon Bella / Ahmet Kaya" : "Örn: Ahmet Yılmaz"}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD7D0] text-sm focus:outline-hidden focus:border-[#1A1A1A] bg-[#FAF9F6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                    Telefon veya WhatsApp
                  </label>
                  <input
                    type="text"
                    required
                    value={leadContact}
                    onChange={(e) => setLeadContact(e.target.value)}
                    placeholder="Örn: 0533 889 99 44 veya e-posta"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD7D0] text-sm focus:outline-hidden focus:border-[#1A1A1A] bg-[#FAF9F6]"
                  />
                </div>

                {leadError && (
                  <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                    {leadError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={leadLoading}
                  className="w-full py-3 rounded-full bg-[#FF4D2D] text-white font-bold text-xs hover:bg-[#E03D1E] disabled:opacity-50 transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  {leadLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Kaydediliyor...</span>
                    </>
                  ) : (
                    <span>{leadType === "isletme" ? "İşletmemi Ön Kaydet" : "Açılışta Bana Haber Ver"}</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
