"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

export default function Navbar({ content }: { content?: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const brandName = content?.brand?.name || "Grovia";
  const ctaText = content?.buttons?.navbarCtaText || "Contact us";
  const ctaHref = content?.buttons?.navbarCtaHref || "#contact";
  const assets = content?.assets || {};

  const defaultNavLinks = [
    { label: "Özellikler", href: "/#features" },
    { label: "Entegrasyonlar", href: "/#integrations" },
    { label: "Fiyatlar", href: "/#pricing" },
    { label: "Blog", href: "/blog" },
  ];

  let rawNavLinks =
    content?.navigation?.headerLinks && content.navigation.headerLinks.length > 0
      ? content.navigation.headerLinks
      : defaultNavLinks;

  // If blog is enabled and not explicitly in navLinks, include it
  if (
    content?.blog?.enabled !== false &&
    !rawNavLinks.some(
      (l: any) =>
        l.href === "/blog" ||
        l.href === "#blog" ||
        l.label?.trim().toLowerCase() === "blog"
    )
  ) {
    rawNavLinks = [...rawNavLinks, { label: "Blog", href: "/blog" }];
  }

  // Ensure hash links have leading slash so they work across pages
  const navLinks = rawNavLinks.map((l: any) => ({
    ...l,
    href: l.href && l.href.startsWith("#") ? `/${l.href}` : l.href,
  }));

  return (
    <>
      <header className="fixed top-5 inset-x-0 mx-auto w-[92%] max-w-[720px] z-50 transition-all">
        <nav className="bg-white/95 backdrop-blur-md border border-[#E6E1DC] shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-medium text-lg tracking-tight text-[#1A1A1A] shrink-0"
          >
            {assets.logoType === "image" && assets.logoUrl ? (
              <img
                src={assets.logoUrl}
                alt={brandName}
                className="h-7 max-h-7 w-auto max-w-[140px] object-contain rounded-md"
              />
            ) : (
              <>
                <span className="w-6 h-6 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white shrink-0">
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </span>
                <span className="font-semibold text-[17px] tracking-tight text-[#1A1A1A]">
                  {brandName}
                </span>
              </>
            )}
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm text-[#605F5F] font-medium">
            {navLinks.map((link: any, idx: number) => (
              <a
                key={link.id || idx}
                href={link.href}
                className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={ctaHref}
              className="hidden sm:inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1A1A1A] text-white text-xs sm:text-sm font-medium hover:bg-black transition-all shadow-xs group whitespace-nowrap"
            >
              <span>{ctaText}</span>
              <span className="w-5 h-5 rounded-full bg-white text-[#1A1A1A] flex items-center justify-center text-xs transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="w-3 h-3 text-[#1A1A1A]" />
              </span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full text-[#1A1A1A] hover:bg-neutral-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-white/95 backdrop-blur-lg border border-[#E6E1DC] shadow-xl rounded-2xl p-4 flex flex-col gap-2">
            {navLinks.map((link: any, idx: number) => (
              <a
                key={link.id || idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#1A1A1A] py-2 px-3 rounded-lg hover:bg-[#F4F2EE] transition"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-[#EAE6E1] mt-1">
              <a
                href={ctaHref}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 px-4 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold block"
              >
                {ctaText}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
