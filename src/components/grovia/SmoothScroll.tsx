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

    // Default lerp factor for natural wheel scrolling
    const WHEEL_LERP_FACTOR = 0.15;
    // Faster, snappier lerp factor for anchor click navigation (fast glide without feeling slow)
    const ANCHOR_LERP_FACTOR = 0.22;
    let currentLerpFactor = WHEEL_LERP_FACTOR;

    const maxScroll = () =>
      Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );

    const update = () => {
      // Lerp formula
      const diff = targetY - currentY;
      currentY += diff * currentLerpFactor;

      if (Math.abs(diff) > 0.8) {
        window.scrollTo(0, Math.round(currentY));
        rafId = requestAnimationFrame(update);
      } else {
        window.scrollTo(0, Math.round(targetY));
        currentY = targetY;
        isRunning = false;
        currentLerpFactor = WHEEL_LERP_FACTOR;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const startAnimation = (factor = WHEEL_LERP_FACTOR) => {
      currentLerpFactor = factor;
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

      targetY += delta * 1.05;
      targetY = Math.max(0, Math.min(targetY, maxScroll()));

      startAnimation(WHEEL_LERP_FACTOR);
    };

    // Keep target synchronized when native scroll events occur (e.g. scrollbar drag, spacebar, arrows)
    const onScroll = () => {
      if (!isRunning) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    // Custom fast smooth scroll with ease-out cubic for anchor clicks
    let anchorRafId: number | null = null;
    const fastScrollTo = (targetPosition: number, duration = 450) => {
      // Cancel wheel animation if running
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
        isRunning = false;
      }
      if (anchorRafId) {
        cancelAnimationFrame(anchorRafId);
        anchorRafId = null;
      }

      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      if (Math.abs(distance) < 5) return;

      let startTime: number | null = null;

      // Ease-out cubic for swift launch and crisp, clean stop (no sluggish tail)
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const ease = easeOutCubic(progress);
        const newY = Math.round(startPosition + distance * ease);

        window.scrollTo(0, newY);
        currentY = newY;
        targetY = newY;

        if (progress < 1) {
          anchorRafId = requestAnimationFrame(step);
        } else {
          window.scrollTo(0, targetPosition);
          currentY = targetPosition;
          targetY = targetPosition;
          anchorRafId = null;
        }
      };

      anchorRafId = requestAnimationFrame(step);
    };

    // Smooth anchor link click handling
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

          // Fast 420ms snappy fluid scroll
          fastScrollTo(boundedTop, 420);

          window.history.pushState(null, "", hash);
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
      if (anchorRafId) {
        cancelAnimationFrame(anchorRafId);
      }
    };
  }, []);

  return null;
}
