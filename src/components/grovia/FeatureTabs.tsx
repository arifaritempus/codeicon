"use client";

import { useState } from "react";
import { Laptop, TrendingUp, Layers, Users, Sparkles, Check, ArrowRight } from "lucide-react";

export default function FeatureTabs({ content }: { content?: any }) {
  const [activeTab, setActiveTab] = useState(0);

  const title = content?.title || "Yüksek Performanslı Acente Mimarisi";
  const subtitle =
    content?.subtitle ||
    "Operasyonel yükü azaltan, ekiplerinizi senkronize eden ve tüm süreçleri merkezileştiren akıllı altyapı.";

  const defaultTabs = [
    {
      id: "portal",
      label: "Müşteri Portalı",
      icon: Laptop,
      badge: "MÜŞTERİ PORTALI",
      title: "Müşterilerinize online teklif ve mutabakat gönderin",
      description:
        "Müşterilerinizin teklifleri online inceleyip tek tıkla onayladığı, onaylanan teklifin kendini kilitleyerek otomatik projeye dönüştüğü altyapı.",
      mockupType: "portal",
    },
    {
      id: "kpi",
      label: "Saha & Transfer",
      icon: TrendingUp,
      badge: "SAHA & TRANSFER",
      title: "Akıllı transfer planlama ve filo yönetimi",
      description:
        "Uçuş saatlerine duyarlı otomatik kalkış hesaplama, araç pax kapasitesi kontrolü ve şoförlere anlık WhatsApp görev emri iletimi.",
      mockupType: "kpi",
    },
    {
      id: "automation",
      label: "MICE & Projeler",
      icon: Layers,
      badge: "MICE & PROJELER",
      title: "Kongre, toplantı ve grup organizasyonları",
      description:
        "Çoklu otel yönetimi, matbu Excel rooming listelerini tek tıkla sisteme aktarma ve projeye özel anlık kar/zarar analizi.",
      mockupType: "automation",
    },
    {
      id: "team",
      label: "Finans & Mutabakat",
      icon: Users,
      badge: "FİNANS & MUTABAKAT",
      title: "TCMB canlı kurlar ve otomatik cari mutabakat",
      description:
        "Grup giriş gününde döviz kurunu sabitleme, onaylanan faturaların muhasebe havuzuna düşmesi ve tedarikçilerle dijital mutabakat.",
      mockupType: "team",
    },
  ];

  const icons = [Laptop, TrendingUp, Layers, Users];
  const rawTabs = content?.tabs && content.tabs.length > 0 ? content.tabs : defaultTabs;
  const tabs = rawTabs.map((t: any, i: number) => ({
    id: t.id || defaultTabs[i % defaultTabs.length].id,
    label: t.label || defaultTabs[i % defaultTabs.length].label,
    icon: icons[i % icons.length],
    badge: t.mockupBadge || (t.label || defaultTabs[i % defaultTabs.length].label).toUpperCase(),
    title: t.title || defaultTabs[i % defaultTabs.length].title,
    description: t.description || defaultTabs[i % defaultTabs.length].description,
    bullets: t.bullets || [],
    ctaText: t.ctaText,
    ctaHref: t.ctaHref || "#contact",
    mockupType: defaultTabs[i % defaultTabs.length].mockupType,
    mockupUrl: t.mockupUrl,
  }));

  const currentTab = tabs[activeTab] || tabs[0] || defaultTabs[3];

  return (
    <section id="features" className="py-20 sm:py-28 bg-[#F4F2EE] relative">
      <div className="grovia-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="custom-section-title text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#1A1A1A] mb-4 leading-tight">
            {title}
          </h2>
          <p className="custom-section-sub text-base sm:text-lg text-[#7A7570] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Tab Selector Pills Bar matching Grovia Screenshot 4 */}
        <div className="flex items-center justify-center mb-8 sm:mb-12">
          <div className="bg-[#EBE7E2] p-1.5 rounded-full flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full shadow-inner border border-[#E0DBD4]">
            {tabs.map((tab: any, idx: number) => {
              const Icon = tab.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 active:scale-95 cursor-pointer ${
                    isActive
                      ? "bg-white text-[#1A1A1A] shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-[#DDD8D2]"
                      : "text-[#7A7570] hover:text-[#1A1A1A] hover:bg-white/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#1A1A1A]" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Large Feature Card matching Grovia Screenshot 4 with Spring Animation */}
        <div
          key={activeTab}
          className="bg-white rounded-[2.5rem] p-7 sm:p-12 md:p-16 border border-[#E6E1DC] shadow-[0_15px_40px_rgba(0,0,0,0.03)] grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center max-w-5xl mx-auto animate-grovia-fade"
        >
          {/* Left Column: UI Mockup with Floating Invite Pill */}
          <div className="md:col-span-6 relative pt-4">
            {/* Ambient Dark Gradient Container */}
            <div className="bg-gradient-to-br from-[#2D313A] via-[#353944] to-[#20232A] p-3 sm:p-4 rounded-3xl relative shadow-xl">
              {/* Floating Invite Pill */}
              <div className="absolute -top-4 left-6 sm:left-8 z-20 inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-3.5 py-1.5 rounded-full shadow-lg border border-white/20">
                <span className="text-xs font-medium flex items-center gap-1.5">
                  <span className="text-[14px] leading-none">+</span> Invite
                </span>
                <div className="flex -space-x-1.5 ml-1">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                    alt="User"
                    className="w-4 h-4 rounded-full border border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                    alt="User"
                    className="w-4 h-4 rounded-full border border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80"
                    alt="User"
                    className="w-4 h-4 rounded-full border border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&auto=format&fit=crop&q=80"
                    alt="User"
                    className="w-4 h-4 rounded-full border border-white object-cover"
                  />
                  <span className="w-4 h-4 rounded-full bg-white/20 text-white text-[8px] flex items-center justify-center font-mono">
                    +2
                  </span>
                </div>
              </div>

              {/* White Inner Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 pt-7 sm:pt-8 space-y-4 shadow-sm">
                <div className="w-5 h-5 rounded-md bg-[#FAF5F0] flex items-center justify-center text-[#E07A5F]">
                  <Sparkles className="w-3.5 h-3.5 fill-[#E07A5F]" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight">
                  {currentTab.mockupType === "team"
                    ? "TCMB Canlı Finans"
                    : currentTab.mockupType === "kpi"
                    ? "Canlı Filo & Transfer"
                    : currentTab.mockupType === "automation"
                    ? "MICE Proje Altyapısı"
                    : "Müşteri Teklif Portalı"}
                </h3>

                {/* Form fields mockup */}
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="text-[11px] font-medium text-[#7A7570] block mb-1">
                      {currentTab.mockupType === "team"
                        ? "Kur Durumu"
                        : currentTab.mockupType === "kpi"
                        ? "Transfer Güzergahı"
                        : currentTab.mockupType === "automation"
                        ? "Organizasyon / Proje"
                        : "Teklif & Proje Adı"}
                    </label>
                    <div className="bg-[#FAF9F6] border border-[#EDE8E3] rounded-lg px-3.5 py-2 text-xs text-[#2A2A2A] font-medium">
                      {currentTab.mockupType === "team"
                        ? "€38.45 (Giriş Günü Sabitlendi)"
                        : currentTab.mockupType === "kpi"
                        ? "Antalya Havalimanı - Belek Kongre"
                        : currentTab.mockupType === "automation"
                        ? "Uluslararası Tıp Kongresi (MICE)"
                        : "2026 Bayi Toplantısı Teklifi"}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-[#7A7570] block mb-1">
                      {currentTab.mockupType === "team"
                        ? "Fatura Havuzu"
                        : currentTab.mockupType === "kpi"
                        ? "Pax Kapasitesi"
                        : currentTab.mockupType === "automation"
                        ? "Rooming List"
                        : "Müşteri Yetkilisi"}
                    </label>
                    <div className="bg-[#FAF9F6] border border-[#EDE8E3] rounded-lg px-3.5 py-2 text-xs text-[#2A2A2A] font-medium">
                      {currentTab.mockupType === "team"
                        ? "12 Tedarikçi Faturası Eşleşti"
                        : currentTab.mockupType === "kpi"
                        ? "45 / 45 Dolu (1 Ek Minibüs)"
                        : currentTab.mockupType === "automation"
                        ? "180 Pax Aktarıldı (0 Hata)"
                        : "onay@kurumsal-musteri.com"}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-[#7A7570] block mb-1">
                      {currentTab.mockupType === "team"
                        ? "ERP Senkronu"
                        : currentTab.mockupType === "kpi"
                        ? "Saha İletişimi"
                        : currentTab.mockupType === "automation"
                        ? "Kârlılık Durumu"
                        : "Onay Linki Durumu"}
                    </label>
                    <div className="bg-[#FAF9F6] border border-[#EDE8E3] rounded-lg px-3.5 py-2 text-xs text-emerald-700 font-medium">
                      {currentTab.mockupType === "team"
                        ? "✓ Logo / Netsis Entegre"
                        : currentTab.mockupType === "kpi"
                        ? "✓ WhatsApp Görev Emri İletildi"
                        : currentTab.mockupType === "automation"
                        ? "✓ Net Kâr: %28.4 (Canlı)"
                        : "✓ Güvenli Token ile Onaylandı"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Yellow Tag & Content */}
          <div className="md:col-span-6 space-y-4">
            <span className="inline-block bg-[#FEF7AF] text-[#594C00] text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {currentTab.badge}
            </span>
            <h3 className="custom-card-title text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight leading-tight">
              {currentTab.title}
            </h3>
            <p className="text-sm sm:text-base text-[#7A7570] leading-relaxed max-w-md">
              {currentTab.description}
            </p>

            {/* Feature Bullets */}
            {currentTab.bullets && currentTab.bullets.length > 0 && (
              <ul className="space-y-2.5 pt-2">
                {currentTab.bullets.map((bullet: string, bIdx: number) => (
                  <li key={bIdx} className="flex items-center gap-2.5 text-sm text-[#2A2A2A]">
                    <div className="w-5 h-5 rounded-full bg-[#EBE7E2] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[#1A1A1A]" />
                    </div>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA Button */}
            {currentTab.ctaText && (
              <div className="pt-3">
                <a
                  href={currentTab.ctaHref || "#contact"}
                  className="grovia-btn-primary inline-flex text-xs sm:text-sm"
                >
                  <span>{currentTab.ctaText}</span>
                  <span className="grovia-btn-arrow">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
