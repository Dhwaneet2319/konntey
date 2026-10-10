"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, prefersReducedMotion } from "@/lib/motion";

/**
 * Drives [data-reveal] entrances (see Reveal.tsx). Runs after hydration and
 * only hides elements that start below the viewport, so content that is
 * already visible never flashes or waits for JavaScript.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;

    const pending = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-state])"),
    ).filter((el) => el.getBoundingClientRect().top > window.innerHeight);

    if (pending.length === 0) return;

    for (const el of pending) {
      el.dataset.revealState = "hidden";
      if (el.dataset.reveal === "group") {
        el.querySelectorAll<HTMLElement>(":scope > *").forEach((child, i) => {
          child.style.setProperty(
            "--reveal-delay",
            `${Math.min(i, motion.staggerCap) * motion.stagger}s`,
          );
        });
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealState = "shown";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    pending.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      for (const el of pending) {
        if (el.dataset.revealState === "hidden") el.dataset.revealState = "shown";
      }
    };
  }, [pathname]);

  return null;
}
