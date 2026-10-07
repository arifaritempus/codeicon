"use client";

import { useState } from "react";
import { Sparkles, ShieldCheck, CheckCircle2, Zap } from "lucide-react";

export default function ProcessSteps({ content }: { content?: any }) {
  const [activeStep, setActiveStep] = useState(0);

  const rawSteps = content?.steps || [
    {
      number: "01",
      title: "Kolay Kullanım",
      description: "Sisteminizi dakikalar içinde açalım.",
    },
    {
      number: "02",
      title: "Anında Kurulum",
      description: "Tanımlamalarınızı ve yetkilendirmelerinizi tamamlayın.",
    },
    {
      number: "03",
      title: "Operasyonlarınızı Yönetmeye Başlayın",
      description: "Artık her şey sizin için daha kolay, daha efektif, daha ulaşılabilir.",
    },
  ];

  return (
    <section id="process" className="py-12 sm:py-16 bg-[#F4F2EE] relative">
      <div className="grovia-container">
        {/* 3 Step Cards Grid matching Grovia Screenshot 3 with Hover Expansion */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {rawSteps.map((step: any, idx: number) => {
            const isActive = activeStep === idx;
            const stepNum = step.number || `0${idx + 1}`;

            if (isActive) {
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveStep(idx)}
                  onClick={() => setActiveStep(idx)}
                  className="md:col-span-6 bg-white rounded-[2rem] p-7 sm:p-9 border border-[#E6E1DC] shadow-[0_12px_32px_rgba(0,0,0,0.04)] flex flex-col justify-between cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                    {/* Left text column */}
                    <div className="flex flex-col justify-between h-full">
                      <span className="grovia-mono text-sm text-[#A09A93] font-medium tracking-wider">
                        {stepNum}
                      </span>
                      <div className="mt-8 sm:mt-16">
                        <h3 className="custom-card-title text-2xl font-normal text-[#1A1A1A] mb-2.5 tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-sm text-[#7A7570] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Right interactive UI Mockup column with Spring Animation */}
                    <div
                      key={activeStep}
                      className="bg-gradient-to-br from-[#EAE2D8] via-[#F4E9E2] to-[#E3EAF3] p-2.5 rounded-2xl border border-white/60 shadow-inner animate-grovia-fade"
                    >
                      <div className="bg-white rounded-xl p-5 shadow-sm space-y-3.5">
                        <div className="flex items-center justify-between">
                          <div className="w-6 h-6 rounded-md bg-[#FAF5F0] flex items-center justify-center text-[#D96B43]">
                            {idx === 0 ? (
                              <Sparkles className="w-3.5 h-3.5 fill-[#D96B43]" />
                            ) : idx === 1 ? (
                              <ShieldCheck className="w-3.5 h-3.5 text-[#D96B43]" />
                            ) : (
                              <Zap className="w-3.5 h-3.5 fill-[#D96B43]" />
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            {idx === 0 ? "LIVE" : idx === 1 ? "YETKİLİ" : "AKTİF SAHA"}
                          </span>
                        </div>

                        {/* Step 0: Create Account & Invite */}
                        {idx === 0 && (
                          <>
                            <div>
                              <h4 className="text-base font-medium text-[#1A1A1A]">
                                Create account
                              </h4>
                              <div className="inline-flex items-center gap-1.5 mt-2 px-2 py-1 rounded-full bg-[#F4F2EE] border border-[#E6E1DC]">
                                <span className="text-[10px] text-[#605F5F] font-medium">+ Invite</span>
                                <div className="flex -space-x-1.5">
                                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80" alt="Avatar" className="w-4 h-4 rounded-full border border-white object-cover" />
                                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80" alt="Avatar" className="w-4 h-4 rounded-full border border-white object-cover" />
                                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80" alt="Avatar" className="w-4 h-4 rounded-full border border-white object-cover" />
                                  <span className="w-4 h-4 rounded-full bg-[#1A1A1A] text-white text-[8px] flex items-center justify-center font-mono">+2</span>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2.5 pt-1">
                              <div>
                                <span className="text-[11px] font-medium text-[#7A7570] block mb-1">Username</span>
                                <div className="bg-[#FAF9F6] border border-[#EDE8E3] rounded-lg px-3 py-1.5 text-xs text-[#2A2A2A] font-medium">
                                  mert.yilmaz
                                </div>
                              </div>
                              <div>
                                <span className="text-[11px] font-medium text-[#7A7570] block mb-1">Email</span>
                                <div className="bg-[#FAF9F6] border border-[#EDE8E3] rounded-lg px-3 py-1.5 text-xs text-[#2A2A2A] font-medium">
                                  mert@tempustravel.com
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Step 1: Instant Setup & Roles */}
                        {idx === 1 && (
                          <>
                            <div>
                              <h4 className="text-base font-medium text-[#1A1A1A]">
                                Yetki & Rol Dağılımı
                              </h4>
                              <p className="text-[11px] text-[#7A7570] mt-0.5">Departman bazlı akıllı erişim</p>
                            </div>
                            <div className="space-y-2 pt-1">
                              <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#EDE8E3] flex items-center justify-between text-xs">
                                <span className="font-semibold text-[#1A1A1A]">MICE & Satış</span>
                                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">Tam Erişim</span>
                              </div>
                              <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#EDE8E3] flex items-center justify-between text-xs">
                                <span className="font-semibold text-[#1A1A1A]">Saha & Transfer</span>
                                <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full font-medium">Pax & Filo</span>
                              </div>
                              <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#EDE8E3] flex items-center justify-between text-xs">
                                <span className="font-semibold text-[#1A1A1A]">Finans & Muhasebe</span>
                                <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full font-medium">TCMB & Fatura</span>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Step 2: Live Operations Dashboard */}
                        {idx === 2 && (
                          <>
                            <div>
                              <h4 className="text-base font-medium text-[#1A1A1A]">
                                Canlı Operasyon
                              </h4>
                              <p className="text-[11px] text-[#7A7570] mt-0.5">Saha ve transfer senkronu</p>
                            </div>
                            <div className="space-y-2 pt-1">
                              <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#EDE8E3] flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="font-semibold text-[#1A1A1A]">180 Pax Transfer</span>
                                </div>
                                <span className="text-[10px] font-mono text-[#7A7570]">4 Araç Hazır</span>
                              </div>
                              <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#EDE8E3] flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="font-semibold text-[#1A1A1A]">TCMB Kur Sabitleme</span>
                                </div>
                                <span className="text-[10px] font-mono text-[#7A7570]">€38.45 Kilitli</span>
                              </div>
                              <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#EDE8E3] flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="font-semibold text-[#1A1A1A]">Online Müşteri Onayı</span>
                                </div>
                                <span className="text-[10px] font-mono text-emerald-600 font-semibold">Onaylandı</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Inactive Cards with Hover expansion
            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveStep(idx)}
                onClick={() => setActiveStep(idx)}
                className="md:col-span-3 bg-white/75 hover:bg-white rounded-[2rem] p-7 sm:p-9 border border-[#E6E1DC] hover:border-[#1A1A1A]/30 shadow-xs hover:shadow-md flex flex-col justify-between cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 group"
              >
                <div>
                  <span className="grovia-mono text-sm text-[#A09A93] font-medium tracking-wider group-hover:text-[#1A1A1A] transition-colors">
                    {stepNum}
                  </span>
                </div>
                <div className="mt-12 sm:mt-24">
                  <h3 className="custom-card-title text-xl font-normal text-[#1A1A1A] mb-2 tracking-tight group-hover:text-black">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7A7570] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
