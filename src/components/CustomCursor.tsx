"use client";

import { m, useScroll, useSpring } from "framer-motion";

export default function CustomCursor() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <m.div
      className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-gold-bright"
      style={{ scaleX }}
    />
  );
}
