"use client";

import { useState } from "react";

export default function CaseStudies({ content }: { content?: any }) {
  const [showAll, setShowAll] = useState(false);

  const title = content?.title || "Başarı Hikayeleri & Referanslar";
  const subtitle =
    content?.subtitle ||
    "CODEICON ile operasyonlarını sıfır hataya indiren sektörün öncü turizm ve MICE acenteleri.";

  const defaultStoryImages = [
    "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
  ];

  const defaultGradients = [
    "from-[#48CAE4] to-[#F4A261]",
    "from-[#F28482] to-[#F7B267]",
    "from-[#F3C68F] to-[#E5989B]",
    "from-[#E9D8A6] to-[#94D2BD]",
  ];

  const defaultStories = [
    {
      id: "tempus",
      title: "Tempus Travel (MICE)",
      year: "2025",
      impact: "180 Pax Sıfır Hata",
      description: "Antalya ve İstanbul kongre operasyonlarında 180 kişilik transfer ve çoklu otel rooming sürecini tek tıkla yönetti.",
      bgGradient: "from-[#48CAE4] to-[#F4A261]",
      logoText: "Tempus Travel",
      customLogoUrl: "/uploads/1791380715995-TEMPUS_LOGO_BLACK.png",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "latour",
      title: "La Tour Event",
      year: "2025",
      impact: "3 Kat Hızlı Teklif Dönüşü",
      description: "Müşterilerine online teklif sunup link üzerinden onay alma altyapısı sayesinde satış döngüsünü 2 güne indirdi.",
      bgGradient: "from-[#F28482] to-[#F7B267]",
      logoText: "La Tour Event",
      customLogoUrl: "/uploads/1791380736167-TRANSPARAN-LOGO-03-1-scaled.png",
      image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "ravento",
      title: "Ravento Travel",
      year: "2024",
      impact: "TCMB Canlı Mutabakat",
      description: "Dövizli gruplarda giriş günü kur sabitleme ve otel tedarikçileriyle online cari mutabakat ile finansal riskleri sıfırladı.",
      bgGradient: "from-[#F3C68F] to-[#E5989B]",
      logoText: "Ravento Travel",
      customLogoUrl: "/uploads/1791380760782-Varl_k_31_4x-8-2.png",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "novatech",
      title: "Global MICE Partner",
      year: "2024",
      impact: "Uçuş Senkronu & Filo",
      description: "Rötarlı uçuşlarda otomatik transfer revizyonu ve şoför WhatsApp görev emri ile saha operasyonunu %100 otonomlaştırdı.",
      bgGradient: "from-[#E9D8A6] to-[#94D2BD]",
      logoText: "Global MICE",
      customLogoUrl: "",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
    },
  ];

  // Dynamic Stories: Prefer content.items, then fallback to logos or defaults
  const userItems = Array.isArray(content?.items) && content.items.length > 0 ? content.items : null;
  const userLogos = Array.isArray(content?.logos) && content.logos.length > 0 ? content.logos : null;

  const stories = userItems
    ? userItems.map((item: any, i: number) => ({
        id: item.id || `story-${i}`,
        title: item.title || item.client || "Referans",
        year: item.year || "2025",
        impact: item.impact || "",
        description: item.description || "Operasyonel süreçleri dijitalleştirildi.",
        bgGradient: item.bgGradient || defaultGradients[i % defaultGradients.length],
        logoText: item.title || item.client || "MICE Partner",
        customLogoUrl: item.logoUrl || "",
        image: item.image || defaultStoryImages[i % defaultStoryImages.length],
      }))
    : userLogos
    ? userLogos.map((l: any, i: number) => ({
        id: l.id || `logo-${i}`,
        title: l.name || "Referans",
        year: "2025",
        impact: l.category || "",
        description: l.category
          ? `${l.name} için MICE ve operasyon altyapısı entegrasyonu sağlandı.`
          : "Operasyonel süreçleri dijitalleştirildi.",
        bgGradient: defaultGradients[i % defaultGradients.length],
        logoText: l.name,
        customLogoUrl: l.logoUrl,
        image: defaultStoryImages[i % defaultStoryImages.length],
      }))
    : defaultStories;

  const defaultTestimonials = [
    {
      quote:
        "CODEICON ile operasyonlarımızı tamamen merkezileştirdik. Excel karmaşası ve saha transferlerinde pax çakışmaları tamamen geride kaldı.",
      author: "Anılay Acıkavak",
      role: "Operasyon Direktörü, Tempus Travel",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    },
    {
      quote:
        "Tekliflerimizin online onaylanıp tek tıkla kilitlenerek projeye dönüşmesi satış ekibimizin hızını ve dönüşüm oranını 3 katına çıkardı.",
      author: "Haki Tokul",
      role: "Genel Koordinatör, La Tour Event",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    },
    {
      quote:
        "TCMB canlı kurlar üzerinden proje girişinde kur sabitleme ve online cari mutabakat muhasebe departmanımıza müthiş zaman kazandırdı.",
      author: "Tayfun Kürtür",
      role: "Kurucu Ortak, Ravento Travel",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    },
  ];

  const testimonials =
    Array.isArray(content?.testimonials) && content.testimonials.length > 0
      ? content.testimonials.map((t: any, i: number) => ({
          quote: t.quote || defaultTestimonials[i % defaultTestimonials.length].quote,
          author: t.author || defaultTestimonials[i % defaultTestimonials.length].author,
          role: t.role || defaultTestimonials[i % defaultTestimonials.length].role,
          avatar: t.avatar || defaultTestimonials[i % defaultTestimonials.length].avatar,
        }))
      : defaultTestimonials;

  const visibleStories = showAll ? stories : stories.slice(0, 4);

  return (
    <section id="references" className="py-20 sm:py-28 bg-[#F4F2EE] relative">
      <div className="grovia-container">
        {/* Header matching Grovia Screenshot 7 */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="custom-section-title text-4xl sm:text-5xl font-normal tracking-tight text-[#1A1A1A] mb-4 leading-tight">
            {title}
          </h2>
          <p className="custom-section-sub text-base sm:text-lg text-[#7A7570] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 2x2 Grid of Cards matching Grovia Screenshot 7 & 8 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-10">
          {visibleStories.map((story: any) => (
            <div
              key={story.id}
              className="bg-white rounded-[2rem] p-5 sm:p-6 border border-[#E6E1DC] shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              {/* Product Render / Image Banner */}
              <div className="rounded-2xl overflow-hidden relative aspect-[16/10] bg-neutral-100 flex items-center justify-center p-6">
                <img
                  src={story.image}
                  alt={story.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Gradient tint */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${story.bgGradient} opacity-75 mix-blend-multiply`} />

                {/* Centered Brand / Logo display */}
                <div className="relative z-10 flex items-center gap-2.5 text-white font-medium text-xl sm:text-2xl drop-shadow-md">
                  {story.customLogoUrl ? (
                    <img
                      src={story.customLogoUrl}
                      alt={story.title}
                      className="max-h-10 max-w-[140px] object-contain drop-shadow"
                    />
                  ) : (
                    <>
                      {story.logoIcon}
                      <span>{story.logoText}</span>
                    </>
                  )}
                </div>

                {/* Impact / KPI Tag at bottom left if present */}
                {story.impact && (
                  <div className="absolute bottom-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-emerald-950/60 backdrop-blur-md text-emerald-300 text-[11px] font-mono font-medium border border-emerald-400/30">
                    {story.impact}
                  </div>
                )}

                {/* Year Pill Tag at bottom right */}
                <div className="absolute bottom-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-[11px] font-mono font-medium">
                  {story.year}
                </div>
              </div>

              {/* Text Info */}
              <div className="pt-5 pb-2">
                <h3 className="custom-card-title text-xl font-normal text-[#1A1A1A] mb-1.5">
                  {story.title}
                </h3>
                <p className="text-sm text-[#7A7570] leading-relaxed">
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Read More Pill Button */}
        <div className="flex justify-center mb-16 sm:mb-20">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-white border border-[#DCD6D0] hover:border-[#1A1A1A] rounded-full px-6 py-2.5 text-sm font-medium text-[#1A1A1A] shadow-xs transition-all hover:bg-neutral-50 cursor-pointer"
          >
            {showAll ? (content?.ctaLessText || "Daha Az Göster") : (content?.ctaText || "Daha Fazla Göster")}
          </button>
        </div>

        {/* Spaced Plus Separators matching Grovia Screenshot 8 */}
        <div className="flex items-center justify-center gap-12 text-[#C9C4BE] font-light text-base select-none mb-14 sm:mb-16">
          <span>+</span>
          <span>+</span>
          <span>+</span>
          <span>+</span>
          <span>+</span>
        </div>

        {/* 3 Testimonials Cards matching Grovia Screenshot 8 & 9 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {testimonials.map((t: any, idx: number) => (
            <div
              key={idx}
              className="bg-white rounded-[2rem] p-6 sm:p-7 border border-[#E6E1DC] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <div>
                {/* Terracotta / Coral quote mark */}
                <div className="text-3xl font-serif text-[#D96B43] mb-3 leading-none select-none">
                  “
                </div>
                <p className="text-sm text-[#2A2A2A] leading-relaxed mb-6 font-normal">
                  {t.quote}
                </p>
              </div>

              {/* Author & Photo */}
              <div className="flex items-center justify-between pt-4 border-t border-[#F0ECE6]">
                <div>
                  <div className="text-sm font-medium text-[#1A1A1A]">{t.author}</div>
                  <div className="text-xs text-[#7A7570]">{t.role}</div>
                </div>
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#E6E1DC]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
