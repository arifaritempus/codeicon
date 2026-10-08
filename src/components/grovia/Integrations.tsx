"use client";

import { ArrowRight } from "lucide-react";

export default function Integrations({ content }: { content?: any }) {
  const title = content?.title || "Güçlü ve tam uyumlu entegrasyonlar";
  const subtitle =
    content?.subtitle ||
    "Kullandığınız bankalar, TCMB canlı kurları, otel sistemleri ve muhasebe ERP'leriyle kesintisiz iki yönlü veri köprüsü.";

  const ctaText = content?.ctaText || "Hemen Başlayın";
  const ctaHref = content?.ctaHref || "#contact";

  const defaultSteps = [
    { number: "01", text: "50+ hazır resmi acente entegrasyonu" },
    { number: "02", text: "TCMB Canlı Kur ve Sabitleme" },
    { number: "03", text: "Otomatik Muhasebe & ERP Entegrasyonu" },
  ];

  const steps =
    content?.highlights && content.highlights.length > 0
      ? content.highlights.map((h: any, idx: number) => ({
          number: `0${idx + 1}`,
          text: typeof h === "string" ? h : h.text || h.label || defaultSteps[idx]?.text,
        }))
      : defaultSteps;

  const items = Array.isArray(content?.items) ? content.items : null;

  // Fallback SVG Brand / Tech Logos matching Grovia Screenshot 5
  const fallbackTiles = [
    {
      id: "hubspot",
      name: "TCMB",
      category: "Kur",
      svg: (
        <svg viewBox="0 0 40 40" className="w-10 h-10">
          <circle cx="20" cy="20" r="16" fill="#FF5C35" />
          <circle cx="20" cy="20" r="8" fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      id: "mastercard",
      name: "Logo & Netsis",
      category: "ERP",
      svg: (
        <div className="flex items-center -space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#00A1FF]/90" />
          <div className="w-8 h-8 rounded-full bg-[#FF8A00]/90 mix-blend-multiply" />
        </div>
      ),
    },
    {
      id: "logo",
      name: "THY API",
      category: "Uçuş",
      svg: (
        <div className="flex flex-col items-center">
          <div className="w-7 h-4 bg-gradient-to-r from-amber-400 to-rose-500 rounded-t-full mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight text-[#1A1A1A]">logo</span>
        </div>
      ),
    },
    {
      id: "spark",
      name: "HotelRunner",
      category: "Otel",
      svg: (
        <div className="w-10 h-10 rounded-2xl bg-[#E07A5F] flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 9.5L12 2Z" />
          </svg>
        </div>
      ),
    },
    {
      id: "circles",
      name: "WhatsApp",
      category: "Saha",
      svg: (
        <div className="flex items-center gap-1">
          <div className="w-7 h-7 rounded-full bg-[#6B5B95]" />
          <div className="w-5 h-5 rounded-full bg-[#FF6F61] -ml-2" />
        </div>
      ),
    },
    {
      id: "cross",
      name: "Amadeus",
      category: "GDS",
      svg: (
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="w-8 h-3 rounded-full bg-[#0080FF]" />
          <div className="w-3 h-8 rounded-full bg-[#0080FF] absolute" />
        </div>
      ),
    },
    {
      id: "stripe",
      name: "PayTR",
      category: "Sanal POS",
      svg: (
        <div className="flex flex-col gap-1.5 transform -skew-x-12">
          <div className="w-7 h-2 bg-[#635BFF] rounded-sm" />
          <div className="w-7 h-2 bg-[#635BFF] rounded-sm" />
        </div>
      ),
    },
    {
      id: "tcmb",
      name: "Excel",
      category: "İçe Aktarım",
      svg: (
        <div className="w-10 h-10 rounded-full border-3 border-[#0070F3] border-t-transparent flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#0070F3]" />
        </div>
      ),
    },
  ];

  // Dynamically divide items evenly across 2 staggered columns
  const allTiles = items !== null ? items : fallbackTiles;
  const half = Math.ceil(allTiles.length / 2);
  const col1 = allTiles.slice(0, half);
  const col2 = allTiles.slice(half);

  return (
    <section id="integrations" className="py-20 sm:py-28 bg-[#F4F2EE] relative overflow-hidden">
      <div className="grovia-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading, Subtitle, CTA, Steps */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="custom-section-title text-4xl sm:text-5xl font-normal tracking-tight text-[#1A1A1A] leading-[1.08]">
              {title}
            </h2>
            <p className="custom-section-sub text-base sm:text-lg text-[#7A7570] leading-relaxed max-w-lg">
              {subtitle}
            </p>

            <div className="pt-2">
              <a
                href={ctaHref}
                className="grovia-btn-primary inline-flex"
              >
                <span>{ctaText}</span>
                <span className="grovia-btn-arrow">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>

            {/* Subtle plus separators matching screenshot */}
            <div className="flex items-center gap-10 text-[#C9C4BE] font-light text-base select-none py-3">
              <span>+</span>
              <span>+</span>
              <span>+</span>
              <span>+</span>
            </div>

            {/* Numbered Steps List */}
            <div className="space-y-4 pt-1">
              {steps.map((st: any) => (
                <div key={st.number} className="flex items-center gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-mono font-medium shrink-0">
                    {st.number}
                  </span>
                  <span className="text-sm font-medium text-[#2A2A2A]">
                    {st.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 2 Staggered Columns of Soft Rounded Square Logo Tiles */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-5 max-w-md mx-auto lg:max-w-none">
            {/* Column 1 */}
            <div className="space-y-4 sm:space-y-5">
              {col1.map((tile: any, i: number) => (
                <div
                  key={tile.id || i}
                  className="bg-white/80 hover:bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col items-center justify-center aspect-square border border-[#E6E1DC] shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer group"
                >
                  {tile.logoUrl ? (
                    <img
                      src={tile.logoUrl}
                      alt={tile.name}
                      className="max-h-12 max-w-[120px] object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : tile.svg ? (
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {tile.svg}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-2xl bg-[#FAF9F6] border border-[#EDE8E3] flex items-center justify-center text-2xl mb-2 shadow-2xs group-hover:bg-[#FEF7AF]/70 transition-colors">
                        <span>{tile.icon || "⚡"}</span>
                      </div>
                      <span className="text-xs font-bold text-[#1A1A1A] tracking-tight leading-tight block">
                        {tile.name}
                      </span>
                      {tile.category && (
                        <span className="text-[10px] text-[#7A7570] font-medium mt-0.5 block">
                          {tile.category}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Column 2 (Offset / Staggered) */}
            <div className="space-y-4 sm:space-y-5 pt-8 sm:pt-12">
              {col2.map((tile: any, i: number) => (
                <div
                  key={tile.id || i}
                  className="bg-white/80 hover:bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col items-center justify-center aspect-square border border-[#E6E1DC] shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer group"
                >
                  {tile.logoUrl ? (
                    <img
                      src={tile.logoUrl}
                      alt={tile.name}
                      className="max-h-12 max-w-[120px] object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : tile.svg ? (
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {tile.svg}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-2xl bg-[#FAF9F6] border border-[#EDE8E3] flex items-center justify-center text-2xl mb-2 shadow-2xs group-hover:bg-[#FEF7AF]/70 transition-colors">
                        <span>{tile.icon || "⚡"}</span>
                      </div>
                      <span className="text-xs font-bold text-[#1A1A1A] tracking-tight leading-tight block">
                        {tile.name}
                      </span>
                      {tile.category && (
                        <span className="text-[10px] text-[#7A7570] font-medium mt-0.5 block">
                          {tile.category}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
