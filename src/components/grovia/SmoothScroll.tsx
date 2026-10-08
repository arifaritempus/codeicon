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
    let anchorRafId: number | null = null;

    // Authentic Grovia / Framer lerp factor for signature floaty, buttery feel
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

      // Cancel any ongoing anchor navigation so mouse immediately takes over
      if (anchorRafId) {
        cancelAnimationFrame(anchorRafId);
        anchorRafId = null;
      }

      e.preventDefault();

      let delta = e.deltaY;

      // Normalize line / page delta modes
      if (e.deltaMode === 1) {
        delta *= 40;
      } else if (e.deltaMode === 2) {
        delta *= window.innerHeight;
      }

      // Authentic Grovia momentum multiplier
      targetY += delta * 0.95;
      targetY = Math.max(0, Math.min(targetY, maxScroll()));

      startAnimation();
    };

    // Keep target synchronized when native scroll events occur (e.g. scrollbar drag, spacebar, arrows)
    const onScroll = () => {
      if (!isRunning && !anchorRafId) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    // Snappy, fast smooth scroll for anchor link clicks (~280ms cubic ease)
    const fastScrollTo = (targetPosition: number, duration = 280) => {
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
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
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

    // Smooth anchor link click handling for menu & footer
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

          fastScrollTo(boundedTop, 280);

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

