"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Search, Clock, Calendar, Sparkles, Tag, BookOpen } from "lucide-react";

export default function BlogClient({
  blogSettings,
  brand,
}: {
  blogSettings?: any;
  brand?: any;
}) {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");

  const eyebrow = blogSettings?.eyebrow || "Sektörel Rehberler & Analizler";
  const title = blogSettings?.title || "MICE & Seyahat Teknolojileri Blogu";
  const subtitle =
    blogSettings?.subtitle ||
    "Acente operasyonları, finans yönetimi, TCMB kur mutabakatı ve saha transferlerinde sektörel analizler ve pratik rehberler.";

  const allPosts: any[] = useMemo(() => {
    const list = Array.isArray(blogSettings?.posts) ? blogSettings.posts : [];
    // Only published posts
    return list.filter((p: any) => p.published !== false);
  }, [blogSettings]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("Tümü");
    allPosts.forEach((p: any) => {
      if (p.category) cats.add(p.category.trim());
    });
    return Array.from(cats);
  }, [allPosts]);

  // Filter by category and search
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchCat =
        selectedCategory === "Tümü" || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        post.title?.toLowerCase().includes(q) ||
        post.excerpt?.toLowerCase().includes(q) ||
        post.category?.toLowerCase().includes(q) ||
        post.tags?.some((t: string) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [allPosts, selectedCategory, searchQuery]);

  // Separate featured post if any
  const featuredPost = useMemo(() => {
    if (selectedCategory !== "Tümü" || searchQuery) return null;
    return filteredPosts.find((p) => p.featured) || filteredPosts[0] || null;
  }, [filteredPosts, selectedCategory, searchQuery]);

  const gridPosts = useMemo(() => {
    if (featuredPost && selectedCategory === "Tümü" && !searchQuery) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost, selectedCategory, searchQuery]);

  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="grovia-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E6E1DC] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#594C00]" />
            <span className="text-[11px] font-bold text-[#594C00] uppercase tracking-wider">
              {eyebrow}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1A1A1A] leading-[1.08]">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-[#7A7570] leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8C8C8C] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Makale, konu veya etiket ara..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[#DDD7D0] text-xs sm:text-sm text-[#1A1A1A] placeholder:text-[#8C8C8C] focus:outline-none focus:border-[#1A1A1A] shadow-xs transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8C8C8C] hover:text-[#1A1A1A] font-semibold"
                >
                  Temizle
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#1A1A1A] text-white shadow-xs"
                  : "bg-white text-[#605F5F] border border-[#DDD7D0] hover:text-[#1A1A1A] hover:border-[#1A1A1A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post (Only when on 'Tümü' and no search query) */}
        {featuredPost && (
          <div className="mb-14 sm:mb-16">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block bg-white rounded-3xl sm:rounded-[2rem] border border-[#E6E1DC] overflow-hidden hover:border-[#1A1A1A]/40 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Left: Big Cover Image */}
                <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-full min-h-[280px] overflow-hidden bg-neutral-100">
                  <img
                    src={
                      featuredPost.coverImage ||
                      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80"
                    }
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#1A1A1A]/85 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide">
                      {featuredPost.category || "Öne Çıkan"}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#FEF7AF] text-[#594C00] text-[10px] font-bold">
                      ⭐ Editörün Seçimi
                    </span>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-xs text-[#8C8C8C]">
                      {featuredPost.publishedAt && (
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{featuredPost.publishedAt}</span>
                        </span>
                      )}
                      {featuredPost.readingTime && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{featuredPost.readingTime}</span>
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] leading-snug group-hover:text-neutral-700 transition">
                      {featuredPost.title}
                    </h2>

                    <p className="text-sm sm:text-base text-[#7A7570] leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  {/* Author & Read More */}
                  <div className="pt-4 border-t border-[#F0ECE7] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          featuredPost.author?.avatar ||
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                        }
                        alt={featuredPost.author?.name || "Yazar"}
                        className="w-9 h-9 rounded-full object-cover border border-[#DDD7D0]"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#1A1A1A]">
                          {featuredPost.author?.name || "CODEICON Ekibi"}
                        </div>
                        {featuredPost.author?.role && (
                          <div className="text-[10px] text-[#8C8C8C]">
                            {featuredPost.author.role}
                          </div>
                        )}
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1A1A1A] group-hover:translate-x-1 transition-transform">
                      <span>Okumaya Başla</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Regular Posts Grid */}
        {gridPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {gridPosts.map((post) => (
              <Link
                key={post.id || post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-3xl border border-[#E6E1DC] overflow-hidden hover:border-[#1A1A1A]/40 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img
                    src={
                      post.coverImage ||
                      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#1A1A1A] text-[10px] font-bold">
                      {post.category || "Genel"}
                    </span>
                  </div>
                  {post.readingTime && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-[#1A1A1A]/75 backdrop-blur-sm text-white text-[10px] font-mono">
                      {post.readingTime}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-[#8C8C8C]">
                      <span>{post.publishedAt || "Güncel"}</span>
                    </div>

                    <h3 className="text-lg font-bold tracking-tight text-[#1A1A1A] leading-snug group-hover:text-neutral-700 transition line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#7A7570] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Author & Arrow */}
                  <div className="pt-3 border-t border-[#F0ECE7] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          post.author?.avatar ||
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                        }
                        alt={post.author?.name || "Yazar"}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-[11px] font-semibold text-[#1A1A1A]">
                        {post.author?.name || "CODEICON Ekibi"}
                      </span>
                    </div>

                    <span className="w-7 h-7 rounded-full bg-[#FAF9F6] border border-[#E6E1DC] flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E6E1DC] p-8 max-w-lg mx-auto space-y-4">
            <BookOpen className="w-10 h-10 text-[#8C8C8C] mx-auto stroke-1" />
            <h3 className="text-base font-bold text-[#1A1A1A]">
              Aradığınız kriterde yazı bulunamadı
            </h3>
            <p className="text-xs text-[#8C8C8C]">
              Farklı bir arama terimi deneyebilir veya kategoriyi "Tümü" olarak
              değiştirebilirsiniz.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("Tümü");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-neutral-800 transition"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}

        {/* Bottom CTA / Newsletter Banner */}
        <div className="mt-20 sm:mt-24 rounded-3xl bg-[#2A2E37] text-white p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wide">
              MICE & Acente Ekosistemi
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              Acentenizi Yeni Nesil CODEICON İşletim Sistemiyle Güçlendirin
            </h2>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              TCMB canlı kurları, Sejour & HotelRunner otel entegrasyonu, uçuş
              rötarlarına duyarlı şoför görev emri ve matbu Excel ayrıştırıcı tek
              ekranda.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#1A1A1A] text-xs font-bold hover:bg-neutral-100 transition shadow-sm"
              >
                <span>Hemen Demoyu İnceleyin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
