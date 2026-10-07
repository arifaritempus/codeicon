"use client";

import { ArrowRight } from "lucide-react";

export default function Integrations({ content }: { content?: any }) {
  const title = content?.title || "Powerful integrations";
  const subtitle =
    content?.subtitle ||
    "Seamlessly integrate with your favorite tools to streamline workflows and keep everything in sync.";

  const defaultSteps = [
    { number: "01", text: "Explore 50+ supported integrations" },
    { number: "02", text: "Securely link your account" },
    { number: "03", text: "Sync and streamline your workflow" },
  ];

  const steps =
    content?.highlights && content.highlights.length > 0
      ? content.highlights.map((h: any, idx: number) => ({
          number: `0${idx + 1}`,
          text: typeof h === "string" ? h : h.text || h.label || defaultSteps[idx]?.text,
        }))
      : defaultSteps;

  // SVG Brand / Tech Logos matching Grovia Screenshot 5
  const logoTiles = [
    {
      id: "hubspot",
      bg: "bg-[#FFFFFF]",
      svg: (
        <svg viewBox="0 0 40 40" className="w-10 h-10">
          <circle cx="20" cy="20" r="16" fill="#FF5C35" />
          <circle cx="20" cy="20" r="8" fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      id: "mastercard",
      bg: "bg-[#FFFFFF]",
      svg: (
        <div className="flex items-center -space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#00A1FF]/90" />
          <div className="w-8 h-8 rounded-full bg-[#FF8A00]/90 mix-blend-multiply" />
        </div>
      ),
    },
    {
      id: "logo",
      bg: "bg-[#FFFFFF]",
      svg: (
        <div className="flex flex-col items-center">
          <div className="w-7 h-4 bg-gradient-to-r from-amber-400 to-rose-500 rounded-t-full mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight text-[#1A1A1A]">logo</span>
        </div>
      ),
    },
    {
      id: "spark",
      bg: "bg-[#FFFFFF]",
      svg: (
        <div className="w-10 h-10 rounded-2xl bg-[#E07A5F] flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        </div>
      ),
    },
    {
      id: "circles",
      bg: "bg-[#FFFFFF]",
      svg: (
        <div className="flex items-center gap-1">
          <div className="w-7 h-7 rounded-full bg-[#6B5B95]" />
          <div className="w-5 h-5 rounded-full bg-[#FF6F61] -ml-2" />
        </div>
      ),
    },
    {
      id: "cross",
      bg: "bg-[#FFFFFF]",
      svg: (
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="w-8 h-3 rounded-full bg-[#0080FF]" />
          <div className="w-3 h-8 rounded-full bg-[#0080FF] absolute" />
        </div>
      ),
    },
    {
      id: "stripe",
      bg: "bg-[#FFFFFF]",
      svg: (
        <div className="flex flex-col gap-1.5 transform -skew-x-12">
          <div className="w-7 h-2 bg-[#635BFF] rounded-sm" />
          <div className="w-7 h-2 bg-[#635BFF] rounded-sm" />
        </div>
      ),
    },
    {
      id: "tcmb",
      bg: "bg-[#FFFFFF]",
      svg: (
        <div className="w-10 h-10 rounded-full border-3 border-[#0070F3] border-t-transparent flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#0070F3]" />
        </div>
      ),
    },
  ];

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
                href="#contact"
                className="grovia-btn-primary inline-flex"
              >
                <span>Get started</span>
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
              {logoTiles.slice(0, 4).map((tile, i) => (
                <div
                  key={tile.id}
                  className="bg-white/80 hover:bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex items-center justify-center aspect-square border border-[#E6E1DC] shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer group"
                >
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {tile.svg}
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 (Offset / Staggered) */}
            <div className="space-y-4 sm:space-y-5 pt-8 sm:pt-12">
              {logoTiles.slice(4, 8).map((tile, i) => (
                <div
                  key={tile.id}
                  className="bg-white/80 hover:bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex items-center justify-center aspect-square border border-[#E6E1DC] shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer group"
                >
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {tile.svg}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
