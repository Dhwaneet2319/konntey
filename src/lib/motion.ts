/**
 * Motion tokens. globals.css (--motion-*) and tailwind.config.ts
 * (duration-hover, duration-enter, ease-brand) mirror these values.
 */
export const motion = {
  /** Hover / press feedback, seconds. */
  hover: 0.16,
  /** Section entrance, seconds. */
  entrance: 0.45,
  /** Entrance travel, px. */
  travel: 12,
  /** Delay between siblings in a group, seconds. */
  stagger: 0.05,
  /** Siblings beyond this index enter together, so groups never drag on. */
  staggerCap: 6,
  /** One easing family for everything. */
  ease: [0.22, 1, 0.36, 1] as const,
} as const;

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function scrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? "auto" : "smooth";
}
