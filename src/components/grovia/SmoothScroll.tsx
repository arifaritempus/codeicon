"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    // Check if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let anchorRafId: number | null = null;

    const maxScroll = () =>
      Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );

    // High performance, snappy custom smooth scroll for anchor links
    // 260ms duration with ease-out quart for fast response and instant stop
    const fastScrollTo = (targetPosition: number, duration = 260) => {
      if (anchorRafId) {
        cancelAnimationFrame(anchorRafId);
        anchorRafId = null;
      }

      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      if (Math.abs(distance) < 5) return;

      let startTime: number | null = null;

      // Ease-out quart: fast acceleration, crisp arrival
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeOutQuart(progress);
        const newY = Math.round(startPosition + distance * ease);

        window.scrollTo(0, newY);

        if (progress < 1) {
          anchorRafId = requestAnimationFrame(step);
        } else {
          window.scrollTo(0, targetPosition);
          anchorRafId = null;
        }
      };

      anchorRafId = requestAnimationFrame(step);
    };

    // Smooth anchor link click handling for menu & footer links
    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      let hash = "";
      if (href.startsWith("#") && href.length > 1) {
        hash = href;
      } else if (
        href.startsWith("/#") &&
        href.length > 2 &&
        (typeof window !== "undefined" && (window.location.pathname === "/" || window.location.pathname === ""))
      ) {
        hash = href.substring(1);
      }

      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          e.preventDefault();
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY - 85; // 85px offset for floating navbar
          const boundedTop = Math.max(0, Math.min(elementTop, maxScroll()));

          // Fast & snappy transition (~260ms)
          fastScrollTo(boundedTop, 260);

          window.history.pushState(null, "", hash);
        }
      }
    };

    document.addEventListener("click", onAnchorClick, { capture: true });

    return () => {
      document.removeEventListener("click", onAnchorClick, { capture: true });
      if (anchorRafId) {
        cancelAnimationFrame(anchorRafId);
      }
    };
  }, []);

  return null;
}

