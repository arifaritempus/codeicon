"use client";

import { useState } from "react";

export default function CaseStudies({ content }: { content?: any }) {
  const [showAll, setShowAll] = useState(false);

  const title = content?.title || "Success stories";
  const subtitle =
    content?.subtitle ||
    "Grovia has partnered with growing businesses to build foundations for sustainable success. Explore real stories of transformation.";

  const defaultStories = [
    {
      id: "pluto",
      title: "Pluto",
      year: "2025",
      description: "Helped Pluto scale their product team and streamline onboarding as they expanded into new markets.",
      bgGradient: "from-[#48CAE4] to-[#F4A261]",
      logoText: "Pluto Inc",
      logoIcon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
          <path d="M4 4l8 8-8 8V4zm8 0l8 8-8 8V4z" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "vitahealth",
      title: "VitaHealth",
      year: "2024",
      description: "Partnered with VitaHealth to set up their first operations team from the ground up.",
      bgGradient: "from-[#F28482] to-[#F7B267]",
      logoText: "VitaHealth",
      logoIcon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
          <path d="M19 10.5h-5.5V5a1.5 1.5 0 00-3 0v5.5H5a1.5 1.5 0 000 3h5.5V19a1.5 1.5 0 003 0v-5.5H19a1.5 1.5 0 000-3z" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "boxmedia",
      title: "BoxMedia",
      year: "2025",
      description: "Supported BoxMedia, a creative agency, in building their client success team and internal delivery process.",
      bgGradient: "from-[#F3C68F] to-[#E5989B]",
      logoText: "BoxMedia",
      logoIcon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
          <path d="M21 16.5l-9 5.2-9-5.2V7.5L12 2.3l9 5.2v9z" stroke="currentColor" fill="none" strokeWidth="2" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "novatech",
      title: "NovaTech",
      year: "2023",
      description: "Helped NovaTech optimize cross-functional collaboration between marketing, product, and sales teams.",
      bgGradient: "from-[#E9D8A6] to-[#94D2BD]",
      logoText: "NovaTech",
      logoIcon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
          <circle cx="12" cy="12" r="8" fill="currentColor" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
    },
  ];

  // If user uploaded custom logos/references, map them into the grid
  const userLogos = Array.isArray(content?.logos) ? content.logos : [];
  const stories = userLogos.length > 0
    ? userLogos.map((l: any, i: number) => ({
        id: l.id || `logo-${i}`,
        title: l.name || "Referans",
        year: "2025",
        description: l.category ? `${l.name} için MICE ve operasyon altyapısı entegrasyonu sağlandı.` : "Operasyonel süreçleri dijitalleştirildi.",
        bgGradient: defaultStories[i % defaultStories.length].bgGradient,
        logoText: l.name,
        customLogoUrl: l.logoUrl,
        image: defaultStories[i % defaultStories.length].image,
      }))
    : defaultStories;

  const defaultTestimonials = [
    {
      quote: "Grovia helped us streamline our operations and scale faster than we imagined. Their mix of strategy and execution is unmatched.",
      author: "Talia Smith",
      role: "Head of Product at Forma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    },
    {
      quote: "Working with Grovia felt like having an extension of our team. They understood our challenges and executed with precision.",
      author: "Jordan Johnson",
      role: "COO at Metricon",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    },
    {
      quote: "From the first meeting, Grovia brought clarity and momentum to our hiring. We couldn't have scaled without them.",
      author: "Samuel Torres",
      role: "Founder at Bloomtech",
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
            className="bg-white border border-[#DCD6D0] hover:border-[#1A1A1A] rounded-full px-6 py-2.5 text-sm font-medium text-[#1A1A1A] shadow-xs transition-all hover:bg-neutral-50"
          >
            {showAll ? "Show less" : "Read more"}
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
