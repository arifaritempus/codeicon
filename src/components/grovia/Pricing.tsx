"use client";

import { useState } from "react";
import { ArrowRight, Check, Rocket, Sparkles, Building2 } from "lucide-react";

export default function Pricing({ content }: { content?: any }) {
  const [activePlanIdx, setActivePlanIdx] = useState(1); // Default to MICE Pro (popular)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  const title = content?.title || "Esnek ve şeffaf fiyatlandırma";
  const currency = content?.currency || "€";
  const monthlyLabel = content?.monthlyLabel || "Aylık";
  const annualLabel = content?.annualLabel || "Yıllık";
  const annualDiscountBadge = content?.annualDiscountBadge || "%20 İndirim";

  const defaultPlans = [
    {
      name: "Butik Acente",
      subtitle: "Hızlı Başlangıç",
      priceMonthly: 199,
      priceAnnual: 159,
      description: "Münferit operasyonlar ve Sejour rezervasyonları yöneten butik acenteler için ideal.",
      icon: Sparkles,
      cta: "Demoyu İncele",
      ctaHref: "#contact",
      features: [
        "2 Kullanıcı Hesabı",
        "Sejour & Münferit Konaklama",
        "Hızlı Teklif Hazırlama",
        "E-posta & Destek Hattı",
        "Matbu Excel İçe Aktarım",
      ],
    },
    {
      name: "MICE Pro",
      subtitle: "En Çok Tercih Edilen",
      priceMonthly: 399,
      priceAnnual: 319,
      description: "Kongre, etkinlik ve yoğun saha transferleri yöneten profesyonel MICE ekipleri için.",
      icon: Building2,
      cta: "Demoyu İncele",
      ctaHref: "#contact",
      features: [
        "5 Kullanıcı Hesabı",
        "Tam Kapsamlı MICE & Proje Modülü",
        "Akıllı Transfer & Pax Kontrolü",
        "TCMB Canlı Kur & Forecast",
        "Online Müşteri Teklif Onayı",
        "Öncelikli 7/24 Destek",
      ],
    },
    {
      name: "Enterprise",
      subtitle: "Büyük Organizasyonlar",
      priceMonthly: 499,
      priceAnnual: 399,
      description: "Büyük kongre firmaları, çok şubeli acenteler ve kurumsal seyahat şirketleri için.",
      icon: Rocket,
      cta: "Bizimle İletişime Geçin",
      ctaHref: "#contact",
      features: [
        "Sınırsız Kullanıcı Hesabı",
        "Tüm MICE Pro Özellikleri Dahil",
        "Özel ERP / Muhasebe Entegrasyonu",
        "Özel Güvenlik SLA & Bulut Yedekleme",
        "Kişisel Müşteri Temsilcisi & Eğitim",
      ],
    },
  ];

  const rawPlans = content?.plans && content.plans.length > 0 ? content.plans : defaultPlans;
  const plans = rawPlans.map((p: any, i: number) => ({
    name: p.name || defaultPlans[i % defaultPlans.length].name,
    subtitle: p.badge || p.subtitle || defaultPlans[i % defaultPlans.length].subtitle,
    priceMonthly: Number(p.priceMonthly || p.price || defaultPlans[i % defaultPlans.length].priceMonthly),
    priceAnnual: Number(p.priceAnnual || Math.round((p.priceMonthly || p.price || 100) * 0.8)),
    description: p.description || defaultPlans[i % defaultPlans.length].description,
    icon: [Sparkles, Building2, Rocket][i % 3],
    cta: p.cta || "Demoyu İncele",
    ctaHref: p.ctaHref || "#contact",
    features: p.features || defaultPlans[i % defaultPlans.length].features,
  }));

  const activePlan = plans[activePlanIdx] || plans[0];
  const IconComponent = activePlan.icon;

  const currentPrice = billingCycle === "annual" ? activePlan.priceAnnual : activePlan.priceMonthly;
  const savingsPerYear = (activePlan.priceMonthly - activePlan.priceAnnual) * 12;

  return (
    <section id="pricing" className="py-8 sm:py-12 px-3 sm:px-6 max-w-7xl mx-auto">
      {/* Curved Dark Band Container matching Grovia Screenshot 6 */}
      <div className="relative rounded-[2.5rem] bg-[#2A2E37] text-white p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden border border-white/10 shadow-2xl">
        {/* Ambient Bloom Background Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#E07A5F]/20 via-[#9B51E0]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading, Billing Cycle Toggle, Plan Selectors, Rating */}
          <div className="lg:col-span-6 space-y-7">
            <div>
              <h2 className="custom-section-title text-4xl sm:text-5xl font-normal tracking-tight !text-white leading-tight mb-4" style={{ color: "#FFFFFF" }}>
                {title}
              </h2>
              {content?.subtitle && (
                <p className="text-sm sm:text-base text-white/70 max-w-md">
                  {content.subtitle}
                </p>
              )}
            </div>

            {/* Billing Toggle: Monthly vs Annual */}
            <div className="inline-flex items-center p-1 rounded-full bg-white/[0.08] border border-white/15">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  billingCycle === "monthly"
                    ? "bg-white text-[#1A1A1A] shadow-md"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {monthlyLabel}
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("annual")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  billingCycle === "annual"
                    ? "bg-[#FEF7AF] text-[#1A1A1A] shadow-md"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <span>{annualLabel}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-600 text-white">
                  {annualDiscountBadge}
                </span>
              </button>
            </div>

            {/* Plan Stack Buttons with Smooth Flow Accordion Expansion */}
            <div className="space-y-3.5 max-w-md">
              {plans.map((p: any, idx: number) => {
                const isActive = activePlanIdx === idx;
                const PIcon = p.icon;
                return (
                  <div
                    key={p.name}
                    onClick={() => setActivePlanIdx(idx)}
                    onMouseEnter={() => setActivePlanIdx(idx)}
                    className={`rounded-2xl cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border ${
                      isActive
                        ? "p-5 sm:p-6 bg-white/10 border-white/40 shadow-[0_15px_30px_rgba(0,0,0,0.25)] text-white scale-[1.01]"
                        : "p-4 sm:p-5 bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20 text-white/80"
                    }`}
                  >
                    {/* Compact Header: Icon, Name, Badge, Baseline Price, Arrow */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                            isActive
                              ? "bg-white text-[#1A1A1A] shadow-md scale-105"
                              : "bg-white/10 text-white"
                          }`}
                        >
                          <PIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                              {p.name}
                            </h3>
                            {p.subtitle && (
                              <span
                                className={`text-[10px] font-medium px-2 py-0.5 rounded-full transition-all ${
                                  isActive
                                    ? "bg-[#FEF7AF] text-[#1A1A1A] font-semibold"
                                    : "bg-white/10 text-white/70"
                                }`}
                              >
                                {p.subtitle}
                              </span>
                            )}
                          </div>
                          {!isActive && (
                            <p className="text-xs text-white/50 mt-0.5">
                              {currency}
                              {billingCycle === "annual" ? p.priceAnnual : p.priceMonthly} /ay
                            </p>
                          )}
                        </div>
                      </div>

                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isActive
                            ? "bg-[#FEF7AF] text-[#1A1A1A] shadow-sm rotate-0"
                            : "bg-white/5 text-white/40 -rotate-45"
                        }`}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Smooth Flowing Accordion Drawer (Üzerine gelince akış gibi açılan alan) */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive
                          ? "grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-white/10"
                          : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0"
                      }`}
                    >
                      <div className="overflow-hidden space-y-3">
                        {/* Side-by-side Monthly & Annual Figures with Savings Badge */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                            <span className="text-[10px] text-white/50 uppercase block font-semibold">
                              Aylık Ödeme
                            </span>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-sm font-bold text-white">
                                {currency}{p.priceMonthly}
                              </span>
                              <span className="text-[10px] text-white/50">/ay</span>
                            </div>
                          </div>

                          <div className="bg-[#FEF7AF]/10 rounded-xl p-2.5 border border-[#FEF7AF]/25">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-[#FEF7AF] uppercase font-semibold">
                                Yıllık Ödeme
                              </span>
                              <span className="text-[9px] font-bold text-emerald-300 bg-emerald-500/25 px-1 py-0.2 rounded">
                                -%20
                              </span>
                            </div>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-sm font-bold text-[#FEF7AF]">
                                {currency}{p.priceAnnual}
                              </span>
                              <span className="text-[10px] text-white/50">/ay</span>
                            </div>
                            <span className="text-[9px] text-white/60 block mt-0.5">
                              {currency}{p.priceAnnual * 12}/yıl fatura
                            </span>
                          </div>
                        </div>

                        {/* Top 2 Features Preview */}
                        {p.features && p.features.length > 0 && (
                          <div className="space-y-1.5 pt-1">
                            {p.features.slice(0, 2).map((feat: string, fIdx: number) => (
                              <div key={fIdx} className="flex items-center gap-2 text-xs text-white/80">
                                <Check className="w-3.5 h-3.5 text-[#FEF7AF] shrink-0" />
                                <span className="truncate">{feat}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rating / Social Proof */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                  alt="Customer"
                  className="w-7 h-7 rounded-full border border-[#2A2E37] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                  alt="Customer"
                  className="w-7 h-7 rounded-full border border-[#2A2E37] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80"
                  alt="Customer"
                  className="w-7 h-7 rounded-full border border-[#2A2E37] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&auto=format&fit=crop&q=80"
                  alt="Customer"
                  className="w-7 h-7 rounded-full border border-[#2A2E37] object-cover"
                />
              </div>
              <div className="text-xs">
                <span className="font-semibold text-white block">
                  {content?.socialProofRating || "4.9 / 5 Memnuniyet"}
                </span>
                <span className="text-white/60">
                  {content?.socialProofText || "50+ MICE & Acente Ekibi"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Active Plan Card with Spring Animation & Side-by-Side Prices */}
          <div className="lg:col-span-6">
            <div
              key={`${activePlanIdx}-${billingCycle}`}
              className="bg-[#1C1F26]/90 backdrop-blur-md border border-white/10 rounded-3xl p-7 sm:p-10 shadow-2xl max-w-lg mx-auto lg:max-w-none animate-grovia-fade"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-normal text-white">{activePlan.name}</h3>
                    <span className="text-xs text-white/60">{activePlan.subtitle}</span>
                  </div>
                </div>

                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/90">
                  {billingCycle === "annual" ? "Yıllık Fatura" : "Aylık Fatura"}
                </span>
              </div>

              {/* Side-by-Side Monthly and Yearly Price Display */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 mb-6 space-y-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  {/* Primary Focus Price */}
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                      {currency}{currentPrice}
                    </span>
                    <span className="text-sm font-medium text-white/60">
                      /ay ({billingCycle === "annual" ? "yıllık taahhütle" : "aylık"})
                    </span>
                  </div>

                  {/* Discount Badge if Annual */}
                  {billingCycle === "annual" && (
                    <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                      {annualDiscountBadge}
                    </span>
                  )}
                </div>

                {/* Direct Comparison: Monthly & Annual Side-by-Side Numbers with Hover Switch */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
                  <div
                    onMouseEnter={() => setBillingCycle("monthly")}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                      billingCycle === "monthly"
                        ? "bg-white/10 border-white/35 text-white shadow-sm scale-[1.01]"
                        : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] text-white/70"
                    }`}
                  >
                    <span className="text-[10px] text-white/50 uppercase block font-semibold">
                      Aylık Plan
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-base font-bold text-white">
                        {currency}{activePlan.priceMonthly}
                      </span>
                      <span className="text-[10px] text-white/50">/ay</span>
                    </div>
                    <span className="text-[10px] text-white/40 block mt-0.5">
                      Taahhütsüz esnek
                    </span>
                  </div>

                  <div
                    onMouseEnter={() => setBillingCycle("annual")}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                      billingCycle === "annual"
                        ? "bg-[#FEF7AF]/15 border-[#FEF7AF]/45 text-white shadow-sm scale-[1.01]"
                        : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] text-white/70"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#FEF7AF] uppercase font-semibold">
                        Yıllık Plan
                      </span>
                      <span className="text-[9px] font-bold text-emerald-300 bg-emerald-500/25 px-1 rounded">
                        -%20
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-base font-bold text-[#FEF7AF]">
                        {currency}{activePlan.priceAnnual}
                      </span>
                      <span className="text-[10px] text-white/50">/ay</span>
                    </div>
                    <span className="text-[10px] text-white/60 block mt-0.5">
                      {currency}{activePlan.priceAnnual * 12} /yıl fatura
                    </span>
                  </div>
                </div>

                {savingsPerYear > 0 && (
                  <p className="text-[11px] text-emerald-300/90 font-medium pt-1">
                    ✓ Yıllık planda yılda toplam <strong>{currency}{savingsPerYear}</strong> tasarruf edersiniz.
                  </p>
                )}
              </div>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {activePlan.description}
              </p>

              {/* Grovia Yellow Pill CTA Button */}
              <a
                href={activePlan.ctaHref || "#contact"}
                className="grovia-btn-yellow w-full justify-between py-3.5 px-6 rounded-full font-medium text-[#1A1A1A] mb-8 group"
              >
                <span>{activePlan.cta}</span>
                <span className="arrow-capsule">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>

              {/* Checklist */}
              <div className="space-y-3.5 pt-2 border-t border-white/10">
                <span className="text-xs font-semibold text-white/50 uppercase tracking-wider block mb-1">
                  {content?.featuresHeader || "Pakete Dahil Özellikler"}
                </span>
                {activePlan.features.map((feat: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/90">
                    <Check className="w-4 h-4 text-[#FEF7AF] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
