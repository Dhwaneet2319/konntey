"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Vertical offset the element animates in from (px). Default 30. */
  y?: number;
  /** Horizontal offset the element animates in from (px). Default 0. */
  x?: number;
  /** Delay before the animation starts (s). Default 0. */
  delay?: number;
  /** Animation duration (s). Default 0.8. */
  duration?: number;
  /**
   * "inview" (default) reveals when scrolled into view.
   * "mount" reveals immediately on mount — use for above-the-fold heroes.
   */
  mode?: "inview" | "mount";
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Lightweight client island that wraps server-rendered content in a
 * scroll/mount reveal animation. Lets the surrounding page stay a server
 * component while keeping the same motion the site used inline previously.
 */
export default function Reveal({
  children,
  className,
  y = 30,
  x = 0,
  delay = 0,
  duration = 0.8,
  mode = "inview",
}: RevealProps) {
  const initial = { opacity: 0, x, y };
  const target = { opacity: 1, x: 0, y: 0 };
  const transition = { duration, delay, ease: EASE };

  if (mode === "mount") {
    return (
      <m.div initial={initial} animate={target} transition={transition} className={className}>
        {children}
      </m.div>
    );
  }

  return (
    <m.div
      initial={initial}
      whileInView={target}
      viewport={{ once: true, margin: "100px" }}
      transition={transition}
      className={className}
    >
      {children}
    </m.div>
  );
}
