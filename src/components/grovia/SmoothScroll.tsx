"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    // Check if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Only apply on desktop / mouse-pointer devices for optimal native touch experience on mobile
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 768;

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let isRunning = false;
    let rafId: number | null = null;

    // Grovia / Framer lerp factor (0.08 - 0.1 gives that signature floaty, buttery feel)
    const LERP_FACTOR = 0.085;

    const maxScroll = () =>
      Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );

    const update = () => {
      // Lerp formula
      const diff = targetY - currentY;
      currentY += diff * LERP_FACTOR;

      if (Math.abs(diff) > 0.5) {
        window.scrollTo(0, Math.round(currentY));
        rafId = requestAnimationFrame(update);
      } else {
        window.scrollTo(0, Math.round(targetY));
        currentY = targetY;
        isRunning = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const startAnimation = () => {
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(update);
      }
    };

    const onWheel = (e: WheelEvent) => {
      // Don't intercept if inside a scrollable textarea or modal
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "TEXTAREA" ||
          target.closest("[data-no-smooth-scroll]"))
      ) {
        return;
      }

      // Check if ctrl key is pressed (pinch to zoom)
      if (e.ctrlKey) return;

      e.preventDefault();

      let delta = e.deltaY;

      // Normalize line / page delta modes
      if (e.deltaMode === 1) {
        delta *= 40;
      } else if (e.deltaMode === 2) {
        delta *= window.innerHeight;
      }

      // Apply subtle momentum multiplier for authentic Framer feel
      targetY += delta * 0.95;
      targetY = Math.max(0, Math.min(targetY, maxScroll()));

      startAnimation();
    };

    // Keep target synchronized when native scroll events occur (e.g. scrollbar drag, spacebar, arrows)
    const onScroll = () => {
      if (!isRunning) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    // Smooth anchor link click handling
    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY - 80; // 80px offset for floating navbar
          targetY = Math.max(0, Math.min(elementTop, maxScroll()));
          startAnimation();
        }
      }
    };

    if (!isTouchDevice) {
      window.addEventListener("wheel", onWheel, { passive: false });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onAnchorClick, { capture: true });

    return () => {
      if (!isTouchDevice) {
        window.removeEventListener("wheel", onWheel);
      }
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onAnchorClick, { capture: true });
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return null;
}
