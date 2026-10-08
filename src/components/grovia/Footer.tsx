"use client";

import { useState } from "react";
import Link from "next/link";
import { CornerDownRight } from "lucide-react";

export default function Footer({ content }: { content?: any }) {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const email =
    content?.footer?.email ||
    content?.contact?.email ||
    content?.brand?.contactEmail ||
    "hello@codeicon.co";

  const copyright =
    content?.footer?.copyright ||
    `© 2026 CODEICON. Tüm hakları saklıdır.`;

  const newsletterTitle =
    content?.footer?.newsletterTitle ||
    content?.contact?.newsletterTitle ||
    "MICE & Acente Bültenine Kaydolun";

  const newsletterButtonText =
    content?.buttons?.newsletterSubmitText ||
    content?.footer?.newsletterButtonText ||
    "Abone Ol";

  const newsletterSuccess =
    content?.footer?.newsletterSuccess ||
    content?.contact?.newsletterSuccess ||
    "✓ Bülten aboneliğiniz başarıyla kaydedildi!";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      setSubscribed(true);
    }
  };

  const col1Title = content?.footer?.col1Title || "Sayfalar";
  const defaultNavLinks = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hakkımızda", href: "/#process" },
    { label: "Özellikler", href: "/#features" },
    { label: "Fiyatlandırma", href: "/#pricing" },
    { label: "Blog", href: "/blog" },
  ];

  let rawCol1Links =
    Array.isArray(content?.footer?.col1Links) && content.footer.col1Links.length > 0
      ? content.footer.col1Links
      : Array.isArray(content?.navigation?.footerLinks) && content.navigation.footerLinks.length > 0
      ? content.navigation.footerLinks
      : defaultNavLinks;

  if (
    content?.blog?.enabled !== false &&
    !rawCol1Links.some(
      (l: any) =>
        l.href === "/blog" ||
        l.href === "#blog" ||
        l.label?.trim().toLowerCase() === "blog"
    )
  ) {
    rawCol1Links = [...rawCol1Links, { label: "Blog", href: "/blog" }];
  }

  const col1Links = rawCol1Links.map((l: any) => ({
    ...l,
    href: l.href && l.href.startsWith("#") ? `/${l.href}` : l.href,
  }));

  const col2Title = content?.footer?.col2Title;
  const col2Links =
    Array.isArray(content?.footer?.col2Links) && content.footer.col2Links.length > 0
      ? content.footer.col2Links.map((l: any) => ({
          ...l,
          href: l.href && l.href.startsWith("#") ? `/${l.href}` : l.href,
        }))
      : null;

  const socials = content?.footer?.socials || {
    twitter: "https://x.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  };

  const legalLinks = Array.isArray(content?.footer?.legalLinks) ? content.footer.legalLinks : [];

  return (
    <footer className="w-full bg-transparent px-3 sm:px-6 max-w-7xl mx-auto pb-8">
      {/* Soft Light Container matching Grovia Screenshot 11 */}
      <div className="bg-[#EBE7E2] rounded-[2.5rem] p-8 sm:p-12 md:p-16 lg:p-20 border border-[#DDD8D1] shadow-xs">
        {/* Top Half: Newsletter & Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#D8D3CB] items-start">
          {/* Newsletter Box */}
          <div className={`${col2Links ? "md:col-span-6" : "md:col-span-8"} space-y-4`}>
            <h3 className="custom-section-title text-2xl sm:text-3xl md:text-4xl font-normal text-[#1A1A1A] tracking-tight">
              {newsletterTitle}
            </h3>

            {subscribed ? (
              <div className="inline-block px-5 py-2.5 rounded-full bg-white text-emerald-700 text-xs sm:text-sm font-medium border border-emerald-300">
                {newsletterSuccess}
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="bg-white/90 border border-[#D5D0C9] rounded-full p-1.5 flex items-center max-w-md shadow-xs focus-within:border-[#1A1A1A] transition-colors"
              >
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="bg-transparent px-4 py-2 text-xs sm:text-sm text-[#1A1A1A] placeholder:text-[#A09A93] focus:outline-none flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#1A1A1A] hover:bg-neutral-800 text-white rounded-full px-5 sm:px-6 py-2 text-xs sm:text-sm font-medium transition cursor-pointer shrink-0"
                >
                  {newsletterButtonText}
                </button>
              </form>
            )}
          </div>

          {/* Navigation Column 1 */}
          <div className={`${col2Links ? "md:col-span-3" : "md:col-span-4"} flex flex-col md:items-end`}>
            <div className="flex items-center gap-1.5 text-xs text-[#7A7570] font-medium mb-3">
              <CornerDownRight className="w-3.5 h-3.5" />
              <span>{col1Title}</span>
            </div>
            <ul className="space-y-2 md:text-right text-sm">
              {col1Links.map((link: any, idx: number) => (
                <li key={idx}>
                  <Link
                    href={link.href || "#"}
                    className="text-[#1A1A1A] hover:text-black font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Column 2 (if configured) */}
          {col2Links && (
            <div className="md:col-span-3 flex flex-col md:items-end">
              <div className="flex items-center gap-1.5 text-xs text-[#7A7570] font-medium mb-3">
                <CornerDownRight className="w-3.5 h-3.5" />
                <span>{col2Title || "Platform"}</span>
              </div>
              <ul className="space-y-2 md:text-right text-sm">
                {col2Links.map((link: any, idx: number) => (
                  <li key={idx}>
                    <Link
                      href={link.href || "#"}
                      className="text-[#1A1A1A] hover:text-black font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Half: Social Icons, System Status, Giant Email Wordmark, Copyright */}
        <div className="pt-10 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {/* X / Twitter */}
              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white border border-[#D5D0C9] flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition shadow-2xs"
                  aria-label="X (Twitter)"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}

              {/* Instagram */}
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white border border-[#D5D0C9] flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition shadow-2xs"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              )}

              {/* LinkedIn */}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white border border-[#D5D0C9] flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition shadow-2xs"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0-.01-3.2 1.6 1.6 0 0 0 .01 3.2m1.4 9.74v-8.37H5.06v8.37z" />
                  </svg>
                </a>
              )}
            </div>

            {/* Live System Status Badge */}
            {content?.footer?.showSystemStatus !== false && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#D5D0C9] text-xs font-medium text-[#2A2A2A] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{content?.footer?.systemStatus || "Tüm Sistemler Operasyonel"}</span>
              </div>
            )}
          </div>

          {/* Huge Email Wordmark & Copyright / Legal Links */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <a
              href={`mailto:${email}`}
              className="text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1A1A1A] hover:opacity-80 transition tracking-tight"
            >
              {email}
            </a>

            <div className="flex flex-col md:items-end gap-1.5 text-xs text-[#7A7570] font-normal">
              {legalLinks.length > 0 && (
                <div className="flex items-center gap-3">
                  {legalLinks.map((link: any, idx: number) => (
                    <a
                      key={idx}
                      href={link.href || "#"}
                      className="hover:text-[#1A1A1A] underline transition"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
              <span>{copyright}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
