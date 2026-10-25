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
    rawNavLinks = [...rawNavLinks, { id: "blog-nav-link", label: "Blog", href: "/blog" }];
  }

  // Ensure hash links have leading slash so they work across pages
  const navLinks = rawNavLinks.map((l: any) => ({
    ...l,
    href: l.href && l.href.startsWith("#") ? `/${l.href}` : l.href,
  }));

  const handleNavClick = (_e: React.MouseEvent<HTMLAnchorElement>, _href: string) => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-5 inset-x-0 mx-auto w-[92%] max-w-[820px] z-50 transition-all">
        <nav className="bg-white/95 backdrop-blur-md border border-[#E6E1DC] shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-full px-3.5 sm:px-5 py-2 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-medium text-lg tracking-tight text-[#1A1A1A] shrink-0"
          >
            {assets.logoType === "image" && assets.logoUrl ? (
              <img
                src={assets.logoUrl}
                alt={brandName}
                className="h-7 max-h-7 w-auto max-w-[130px] object-contain rounded-md"
              />
            ) : (
              <>
                <span className="w-6 h-6 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white shrink-0">
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </span>
                <span className="font-semibold text-[16px] tracking-tight text-[#1A1A1A]">
                  {brandName}
                </span>
              </>
            )}
          </Link>

          {/* Product Switcher Pill */}
          <div className="hidden sm:flex items-center bg-[#F4F2EE] p-0.5 rounded-full border border-[#E6E1DC] text-xs font-semibold shrink-0">
            <a
              href="/#mice-os"
              onClick={(e) => handleNavClick(e, "/#mice-os")}
              className="px-2.5 py-1 rounded-full transition-all duration-200 bg-white text-[#1A1A1A] shadow-2xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-white"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
              <span>MICE OS</span>
            </a>
            <a
              href="/#hepp-app"
              onClick={(e) => handleNavClick(e, "/#hepp-app")}
              className="px-2.5 py-1 rounded-full transition-all duration-200 text-[#605F5F] hover:text-[#1A1A1A] flex items-center gap-1.5 cursor-pointer group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D2D] animate-pulse" />
              <span>hepp</span>
              <span className="text-[9px] font-bold text-[#FF4D2D] bg-[#FF4D2D]/10 px-1.5 py-0.2 rounded-full">YENİ</span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7 text-sm text-[#605F5F] font-medium">
            {navLinks.map((link: any, idx: number) => (
              <a
                key={link.id ? `nav-link-${link.id}` : `nav-link-${idx}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={ctaHref}
              onClick={(e) => handleNavClick(e, ctaHref)}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-white text-xs sm:text-sm font-medium hover:bg-black transition-all shadow-xs group whitespace-nowrap cursor-pointer"
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
            {/* Mobile Product Switcher */}
            <div className="grid grid-cols-2 gap-2 pb-3 mb-1 border-b border-[#EAE6E1]">
              <a
                href="/#mice-os"
                onClick={(e) => handleNavClick(e, "/#mice-os")}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#F4F2EE] text-[#1A1A1A] text-xs font-bold"
              >
                <span className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
                <span>MICE OS</span>
              </a>
              <a
                href="/#hepp-app"
                onClick={(e) => handleNavClick(e, "/#hepp-app")}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-900 text-white text-xs font-bold"
              >
                <span className="w-2 h-2 rounded-full bg-[#FF4D2D] animate-pulse" />
                <span>hepp App</span>
              </a>
            </div>

            {navLinks.map((link: any, idx: number) => (
              <a
                key={link.id ? `mob-link-${link.id}` : `mob-link-${idx}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-[#1A1A1A] py-2 px-3 rounded-lg hover:bg-[#F4F2EE] transition cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-[#EAE6E1] mt-1">
              <a
                href={ctaHref}
                onClick={(e) => handleNavClick(e, ctaHref)}
                className="w-full text-center py-2.5 px-4 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold block cursor-pointer"
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
