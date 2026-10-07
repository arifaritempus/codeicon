"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, TrendingUp, Star, Pencil, MessageSquare, MoreHorizontal } from "lucide-react";

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
  const title = content?.title || "MICE Acentelerini";
  const titleAccent = content?.titleAccent || "geleceğe taşıyoruz";
  const subtitle =
    content?.subtitle ||
    "Codeicon girişimlerle ortaklık kurarak operasyonları kolaylaştırıyor, ekip performansını artırıyor ve kalıcı başarı için bir temel oluşturuyor.";

  const ctaPrimaryText = buttons?.heroPrimaryText || content?.ctaPrimary || "Hadi Başlayalım";
  const ctaPrimaryHref = buttons?.heroPrimaryHref || "#contact";
  const ctaSecondaryText = buttons?.heroSecondaryText || content?.ctaSecondary || "Bize Ulaşın";
  const ctaSecondaryHref = buttons?.heroSecondaryHref || "#contact";

  const heroMockupImage = assets?.heroMockupImage || "/images/mockups/dashboard.png";

  const cardTitle = content?.cardTitle || "Acenteler";
  const cardFilterText = content?.cardFilterText || "En Yeniler";
  const cardFooterText = content?.cardFooterText || "Tüm Acenteler";
  const statsTitle = content?.statsTitle || "Günlük Ortalama";

  const defaultCustomers = [
    {
      id: "1",
      name: "Mert Yılmaz",
      company: "Tempus Travel (MICE)",
      initials: "MY",
      avatarBg: "#FEF7AF",
      avatarColor: "#594C00",
      statValue: "2h 20m",
      statBadge: "+30dk bu hafta",
      bars: [
        [20, 25, 20, 15],
        [25, 35, 20, 15],
        [20, 30, 20, 15],
        [30, 40, 25, 20],
        [25, 30, 25, 15],
        [15, 20, 15, 10],
        [10, 15, 10, 5],
      ],
    },
    {
      id: "2",
      name: "Selin Kaya",
      company: "La Tour Event",
      initials: "SK",
      avatarBg: "#D4E3CB",
      avatarColor: "#334A29",
      statValue: "3h 45m",
      statBadge: "+45dk bu hafta",
      bars: [
        [25, 30, 25, 20],
        [30, 40, 25, 25],
        [25, 35, 30, 20],
        [35, 45, 30, 25],
        [30, 35, 25, 20],
        [20, 25, 20, 15],
        [15, 20, 15, 10],
      ],
    },
    {
      id: "3",
      name: "Burak Demir",
      company: "Ravento Travel",
      initials: "BD",
      avatarBg: "#E3CBDD",
      avatarColor: "#4D2845",
      statValue: "1h 50m",
      statBadge: "+15dk bu hafta",
      bars: [
        [15, 20, 15, 10],
        [20, 25, 15, 15],
        [15, 20, 20, 10],
        [25, 30, 20, 15],
        [20, 25, 20, 10],
        [10, 15, 10, 5],
        [10, 10, 5, 5],
      ],
    },
  ];

  const customerList =
    content?.customers && content.customers.length > 0
      ? content.customers.map((c: any, i: number) => ({
          ...defaultCustomers[i % defaultCustomers.length],
          ...c,
          bars: c.bars || defaultCustomers[i % defaultCustomers.length].bars,
        }))
      : defaultCustomers;

  const [activeCustomerIndex, setActiveCustomerIndex] = useState(0);
  const activeCustomer = customerList[activeCustomerIndex] || customerList[0];
  const days = ["P", "S", "Ç", "P", "C", "C", "P"];

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
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-b from-[#FEF7AF]/35 via-[#F4F2EE]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grovia-container">
        {/* TOP TWO-COLUMN SPLIT: Left Title & CTAs, Right Customers Card + Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 lg:mb-24 pt-4 sm:pt-8">
          {/* Left Column */}
          <div className="lg:col-span-6 text-left">
            <h1 className="custom-hero-title text-4xl sm:text-5xl lg:text-[56px] font-normal tracking-tight text-[#1A1A1A] leading-[1.08] mb-6 break-words">
              {title}{" "}
              <span className="custom-hero-accent italic font-normal text-[#1A1A1A] block sm:inline">
                {titleAccent}
              </span>
            </h1>

            <p className="custom-hero-sub text-base sm:text-lg text-[#605F5F] leading-relaxed mb-8 max-w-lg">
              {subtitle}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={ctaPrimaryHref}
                className="grovia-btn-primary group"
              >
                <span>{ctaPrimaryText}</span>
                <span className="arrow-capsule">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
              <a
                href={ctaSecondaryHref}
                className="grovia-btn-secondary"
              >
                {ctaSecondaryText}
              </a>
            </div>
          </div>

          {/* Right Column: Floating Customers UI + Daily Average Chart (Screenshot 1) */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end pb-8 sm:pb-10">
            {/* Customers Card */}
            <div className="w-full max-w-[430px] bg-white rounded-3xl p-5 sm:p-6 border border-[#E6E6E6] shadow-[0_15px_35px_rgba(0,0,0,0.04)] text-left transition-all">
              <div className="flex items-center justify-between pb-4 border-b border-[#F0ECE6]">
                <span className="font-semibold text-sm text-[#1A1A1A]">{cardTitle}</span>
                <button className="flex items-center gap-1 text-xs text-[#8C8C8C] hover:text-[#1A1A1A] transition">
                  <span>{cardFilterText}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              {/* Rows */}
              <div className="space-y-2.5 pt-3">
                {customerList.map((cust: any, idx: number) => {
                  const isActive = activeCustomerIndex === idx;
                  return (
                    <div
                      key={cust.id || idx}
                      onMouseEnter={() => setActiveCustomerIndex(idx)}
                      onClick={() => setActiveCustomerIndex(idx)}
                      className={`p-3 rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-between ${
                        isActive
                          ? "bg-[#FEF7AF]/50 border border-[#FEF7AF] shadow-2xs scale-[1.01]"
                          : "border border-transparent hover:border-[#EAE6E1] hover:bg-[#FAF9F6]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          style={{
                            backgroundColor: cust.avatarBg || "#FEF7AF",
                            color: cust.avatarColor || "#594C00",
                          }}
                          className="w-9 h-9 rounded-full border border-black/5 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs transition-transform duration-300"
                        >
                          {cust.initials || "AC"}
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-[#1A1A1A]">
                            {cust.name}
                          </div>
                          <div className="text-[11px] text-[#605F5F]">
                            {cust.company}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons appear on active row */}
                      {isActive ? (
                        <div className="flex items-center gap-2 text-[#605F5F] animate-in fade-in duration-200">
                          <button
                            type="button"
                            title="Düzenle"
                            className="p-1 hover:text-[#1A1A1A] hover:bg-black/5 rounded transition"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            title="Favoriye Ekle"
                            className="p-1 hover:text-[#1A1A1A] hover:bg-black/5 rounded transition"
                          >
                            <Star className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            title="Mesaj Gönder"
                            className="p-1 hover:text-[#1A1A1A] hover:bg-black/5 rounded transition"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            title="Diğer"
                            className="p-1 hover:text-[#1A1A1A] hover:bg-black/5 rounded transition"
                          >
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              {/* Card Footer */}
              <div className="pt-3 mt-1 border-t border-[#F0ECE6] flex items-center gap-1.5 text-xs font-semibold text-[#1A1A1A] cursor-pointer hover:underline">
                <span>{cardFooterText}</span>
                <span className="grovia-mono text-sm">➔</span>
              </div>
            </div>

            {/* Overlapping Daily Average Chart Card (Screenshot 1) */}
            <div className="absolute -bottom-6 -right-2 sm:-right-4 w-[240px] sm:w-[265px] bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-[#E6E6E6] shadow-[0_20px_40px_rgba(0,0,0,0.08)] text-left transition-all duration-300">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-medium text-[#8C8C8C]">
                  {statsTitle}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full transition-all">
                  {activeCustomer?.statBadge || "+30dk bu hafta"}
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight mb-3 transition-all">
                {activeCustomer?.statValue || "2h 20m"}
              </div>

              {/* Stacked Colored Bar Chart */}
              <div className="flex items-end justify-between gap-1.5 h-16 pt-2 border-t border-[#F0ECE6]">
                {days.map((day, idx) => {
                  const bar = activeCustomer.bars?.[idx] || [15, 20, 15, 10];
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-1 flex-1 group/bar cursor-pointer"
                    >
                      <div className="w-full flex flex-col justify-end gap-0.5 h-12 transition-transform duration-200 group-hover/bar:scale-105">
                        <div
                          style={{ height: `${bar[0]}%` }}
                          className="w-full bg-[#84E6F6] rounded-t-xs transition-all duration-500 ease-out"
                        />
                        <div
                          style={{ height: `${bar[1]}%` }}
                          className="w-full bg-[#F7A49E] transition-all duration-500 ease-out"
                        />
                        <div
                          style={{ height: `${bar[2]}%` }}
                          className="w-full bg-[#FECD1A] transition-all duration-500 ease-out"
                        />
                        <div
                          style={{ height: `${bar[3]}%` }}
                          className="w-full bg-[#FEF7AF] rounded-b-xs transition-all duration-500 ease-out"
                        />
                      </div>
                      <span className="text-[9px] font-medium text-[#8C8C8C] group-hover/bar:text-[#1A1A1A] transition-colors">
                        {day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* LOGO STRIP TICKER (Prominent & Clear, Vibrant on Hover) */}
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

        {/* CENTERED LARGE DASHBOARD MOCKUP (Screenshot 2) */}
        <div className="w-full max-w-5xl mx-auto relative rounded-3xl p-2 sm:p-3 bg-white/70 backdrop-blur-md border border-[#E2DDD7] shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
          <div className="bg-[#FAF9F6] border border-[#EAE6E1] rounded-2xl overflow-hidden shadow-inner">
            <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-[#EAE6E1] bg-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E57373]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFB74D]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#81C784]" />
                <span className="text-[11px] text-[#8C8C8C] font-mono ml-2">
                  {content?.mockupBrowserUrl || "app.preview.live"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#605F5F] bg-[#F4F2EE] px-2.5 py-0.5 rounded-full border border-black/5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Canlı Acente Sistemi</span>
              </div>
            </div>
            <img
              src={heroMockupImage}
              alt="Product Dashboard Preview"
              className="w-full h-auto rounded-b-2xl object-cover max-h-[580px] object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
