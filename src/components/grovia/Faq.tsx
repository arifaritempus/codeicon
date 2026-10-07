"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export default function Faq({ content }: { content?: any }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First item open by default for immediate visual delight

  const title = content?.title || "Aklınıza takılan sorular";
  const subtitle =
    content?.subtitle ||
    "Sistemin işleyişi, geçiş süreci ve entegrasyonlar hakkında en çok merak edilen soruların yanıtları.";

  const defaultFaqs = [
    {
      q: "Mevcut Excel rooming ve transfer listelerimizi içeri aktarabilir miyiz?",
      a: "Evet! Matbu Excel desteğimiz sayesinde yüzlerce misafirden oluşan konaklama veya transfer listelerini tek tıkla sisteme aktarabilirsiniz.",
    },
    {
      q: "Uçuş saati değiştiğinde transfer saatleri otomatik güncelleniyor mu?",
      a: "Evet, sistem uçuş saatine doğrudan duyarlıdır. Belirlediğiniz kurala göre (örneğin uçuştan 3 saat önce) transfer saati ve araç planı otomatik olarak revize edilir.",
    },
    {
      q: "Döviz kurları nasıl yönetiliyor? TCMB entegrasyonu var mı?",
      a: "Sistem TCMB günlük kurlarını canlı çeker. Dilerseniz grup giriş tarihindeki kuru tek tıkla sabitleyebilir ve döviz dalgalanmalarına karşı bütçenizi garantiye alabilirsiniz.",
    },
    {
      q: "Müşteriler teklifleri sistem üzerinden online onaylayabiliyor mu?",
      a: "Kesinlikle. Müşterinize özel güvenli onay linki iletilir ve onaylandığı an teklif kendini otomatik kilitleyerek Projeler modülüne aktarılır.",
    },
    {
      q: "Sisteme geçiş ve personellerin eğitimi ne kadar sürüyor?",
      a: "Kullanıcı dostu arayüz sayesinde sistem dakikalar içinde açılır; operasyon ekibiniz en geç 1-2 gün içinde tüm modülleri aktif şekilde kullanmaya başlar.",
    },
  ];

  const faqs = content?.items || defaultFaqs;

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#F4F2EE] relative">
      <div className="grovia-container">
        {/* Two-column layout matching Grovia Screenshot 9 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading, Subtitle, Contact Us Pill */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="custom-section-title text-4xl sm:text-5xl font-normal tracking-tight text-[#1A1A1A] leading-[1.1]">
              {title}
            </h2>
            <p className="custom-section-sub text-base text-[#7A7570] leading-relaxed max-w-sm">
              {subtitle}
            </p>
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-block bg-white border border-[#DCD6D0] hover:border-[#1A1A1A] rounded-full px-6 py-2.5 text-sm font-medium text-[#1A1A1A] shadow-xs transition-all hover:bg-neutral-50 active:scale-98"
              >
                Bize Ulaşın
              </a>
            </div>
          </div>

          {/* Right Column: Accordion Cards Stack with Silky Smooth Spring Animation */}
          <div className="lg:col-span-7 space-y-3.5">
            {faqs.map((faq: any, idx: number) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className={`rounded-2xl border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden ${
                    isOpen
                      ? "bg-white border-[#1A1A1A]/30 shadow-[0_8px_24px_rgba(0,0,0,0.04)] -translate-y-0.5"
                      : "bg-white/75 hover:bg-white border-[#E6E1DC] shadow-xs hover:border-[#1A1A1A]/20"
                  }`}
                >
                  {/* Header Row */}
                  <div className="p-5 sm:p-6 flex items-center justify-between gap-4 select-none">
                    <span className="text-base sm:text-lg font-normal text-[#1A1A1A] tracking-tight">
                      {faq.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen
                          ? "rotate-45 text-[#1A1A1A] bg-[#FEF7AF]/60"
                          : "rotate-0 text-[#A09A93] bg-transparent"
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Silky Expanding Answer Container (CSS Grid Fr Interpolation) */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#7A7570] leading-relaxed border-t border-[#F4F0EC]">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
