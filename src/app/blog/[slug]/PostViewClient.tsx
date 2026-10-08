"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Check,
  ArrowRight,
  BookOpen,
  Sparkles,
} from "lucide-react";

export default function PostViewClient({
  post,
  relatedPosts,
}: {
  post: any;
  relatedPosts: any[];
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(`${post.title} — CODEICON Blog`);

  // Simple and safe Markdown to HTML parser
  const renderMarkdown = (text: string) => {
    if (!text) return null;

    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="my-5 space-y-2.5 pl-6 list-disc marker:text-[#1A1A1A]">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-base sm:text-[17px] text-[#2C2C2C] leading-relaxed">
                {parseInline(item)}
              </li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    const parseInline = (str: string): React.ReactNode => {
      // Bold: **text**
      const parts = str.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
      return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-bold text-[#1A1A1A]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={i} className="italic text-[#1A1A1A]">
              {part.slice(1, -1)}
            </em>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="px-1.5 py-0.5 rounded bg-[#EAE6E1] text-xs font-mono text-[#1A1A1A]"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      });
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Heading 2: ##
      if (trimmed.startsWith("## ")) {
        flushList();
        elements.push(
          <h2
            key={index}
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] mt-10 mb-4 pt-4 border-t border-[#EAE6E1]/60"
          >
            {parseInline(trimmed.replace(/^##\s+/, ""))}
          </h2>
        );
        return;
      }

      // Heading 3: ###
      if (trimmed.startsWith("### ")) {
        flushList();
        elements.push(
          <h3
            key={index}
            className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A1A1A] mt-8 mb-3"
          >
            {parseInline(trimmed.replace(/^###\s+/, ""))}
          </h3>
        );
        return;
      }

      // Blockquote: >
      if (trimmed.startsWith("> ")) {
        flushList();
        elements.push(
          <blockquote
            key={index}
            className="my-6 p-5 sm:p-6 rounded-2xl bg-[#FEF7AF]/30 border-l-4 border-[#1A1A1A] text-base sm:text-lg italic text-[#2A2A2A] font-medium"
          >
            {parseInline(trimmed.replace(/^>\s+/, ""))}
          </blockquote>
        );
        return;
      }

      // Divider: ---
      if (trimmed === "---") {
        flushList();
        elements.push(
          <hr key={index} className="my-8 border-[#EAE6E1]" />
        );
        return;
      }

      // List item: - or *
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        inList = true;
        listItems.push(trimmed.slice(2));
        return;
      }

      // Numbered list item: 1. 2. etc
      if (/^\d+\.\s/.test(trimmed)) {
        inList = true;
        listItems.push(trimmed.replace(/^\d+\.\s+/, ""));
        return;
      }

      // Empty line
      if (trimmed === "") {
        flushList();
        return;
      }

      // Normal paragraph
      flushList();
      elements.push(
        <p
          key={index}
          className="text-base sm:text-[17px] text-[#2C2C2C] leading-[1.8] my-4"
        >
          {parseInline(trimmed)}
        </p>
      );
    });

    flushList();
    return elements;
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#1A1A1A] z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <article className="pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="grovia-container max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#605F5F] hover:text-[#1A1A1A] transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Tüm Blog Yazılarına Dön</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="space-y-6 mb-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-white border border-[#DDD7D0] text-[#1A1A1A] text-xs font-bold shadow-2xs">
                {post.category || "MICE & Kongre"}
              </span>
              {post.readingTime && (
                <span className="inline-flex items-center gap-1.5 text-xs text-[#8C8C8C] font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readingTime}</span>
                </span>
              )}
              {post.publishedAt && (
                <span className="inline-flex items-center gap-1.5 text-xs text-[#8C8C8C]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.publishedAt}</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1A1A1A] leading-[1.12]">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg sm:text-xl text-[#605F5F] leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Author Bar */}
            <div className="pt-4 border-t border-[#EAE6E1] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={
                    post.author?.avatar ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                  }
                  alt={post.author?.name || "Yazar"}
                  className="w-11 h-11 rounded-full object-cover border border-[#DDD7D0] shadow-2xs"
                />
                <div>
                  <div className="text-sm font-bold text-[#1A1A1A]">
                    {post.author?.name || "CODEICON Ekibi"}
                  </div>
                  <div className="text-xs text-[#8C8C8C]">
                    {post.author?.role || "Sektörel Analist & Editör"}
                  </div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  title="Linki Kopyala"
                  className="p-2 rounded-full bg-white border border-[#DDD7D0] text-[#1A1A1A] hover:bg-[#FAF9F6] transition shadow-2xs relative"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(
                    currentUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="X (Twitter)'da Paylaş"
                  className="p-2 rounded-full bg-white border border-[#DDD7D0] text-[#1A1A1A] hover:bg-[#FAF9F6] transition shadow-2xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    currentUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn'de Paylaş"
                  className="p-2 rounded-full bg-white border border-[#DDD7D0] text-[#1A1A1A] hover:bg-[#FAF9F6] transition shadow-2xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(
                    currentUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp'ta Paylaş"
                  className="p-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-2xs text-xs font-semibold px-3"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </header>

          {/* Featured Cover Image */}
          {post.coverImage && (
            <div className="mb-12 rounded-3xl overflow-hidden border border-[#E6E1DC] shadow-md bg-neutral-100">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full max-h-[520px] object-cover"
              />
            </div>
          )}

          {/* Main Article Content */}
          <div className="bg-white rounded-3xl sm:rounded-[2rem] p-6 sm:p-10 lg:p-12 border border-[#E6E1DC] shadow-xs">
            <div className="article-body">
              {renderMarkdown(post.content)}
            </div>

            {/* Tags */}
            {Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className="mt-12 pt-6 border-t border-[#EAE6E1] flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#8C8C8C] mr-2">
                  Etiketler:
                </span>
                {post.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#DDD7D0] text-xs font-medium text-[#605F5F]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Author Box */}
          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-white border border-[#E6E1DC] flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-2xs text-center sm:text-left">
            <img
              src={
                post.author?.avatar ||
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
              }
              alt={post.author?.name || "Yazar"}
              className="w-16 h-16 rounded-full object-cover border border-[#DDD7D0] shadow-sm shrink-0"
            />
            <div className="space-y-1.5">
              <div className="text-xs uppercase tracking-wider font-bold text-[#8C8C8C]">
                Yazar Hakkında
              </div>
              <h4 className="text-base font-bold text-[#1A1A1A]">
                {post.author?.name || "CODEICON Ekibi"}
              </h4>
              <p className="text-xs sm:text-sm text-[#7A7570] leading-relaxed">
                CODEICON Turizm ve MICE Teknolojileri araştırma birimi; acentelerin
                kârlılığını artıran finansal otomasyonlar, saha yönetimi ve
                dijital dönüşüm üzerine içerikler üretmektedir.
              </p>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="mt-16 sm:mt-20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                    İlginizi Çekebilecek Diğer Yazılar
                  </h3>
                  <p className="text-xs text-[#8C8C8C] mt-1">
                    Operasyonel verimliliğinizi artıracak sektörel rehberler
                  </p>
                </div>
                <Link
                  href="/blog"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#1A1A1A] hover:underline"
                >
                  <span>Tümünü Gör</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.slice(0, 2).map((rel) => (
                  <Link
                    key={rel.id || rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group bg-white rounded-3xl border border-[#E6E1DC] overflow-hidden hover:border-[#1A1A1A]/40 transition shadow-xs flex flex-col"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-neutral-100">
                      <img
                        src={
                          rel.coverImage ||
                          "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80"
                        }
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <span className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wider block mb-1">
                          {rel.category}
                        </span>
                        <h4 className="text-base font-bold text-[#1A1A1A] leading-snug group-hover:text-neutral-700 transition line-clamp-2">
                          {rel.title}
                        </h4>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1A1A1A] group-hover:translate-x-1 transition-transform">
                        <span>Yazıyı Oku</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA Banner */}
          <div className="mt-16 rounded-3xl bg-[#2A2E37] text-white p-8 sm:p-10 text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Acente Süreçlerinizi Bugün Dijitalleştirin
            </h3>
            <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto">
              TCMB kur sabitleme, şoför WhatsApp görev emri ve Sejour entegrasyonu ile
              operasyonel riskleri sıfıra indirin.
            </p>
            <div className="pt-2">
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
      </article>
    </>
  );
}
