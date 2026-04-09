"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let raf: number;
    let start: number | null = null;
    const duration = 1400;

    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
}

const stats = [
  { value: 24, suffix: "hr", label: "Quote Response Time" },
  { value: 3, suffix: "-Step", label: "Simple Build Process" },
  { value: 1, suffix: ":1", label: "Founder-Led Service" },
  { value: 100, suffix: "%", label: "Transparent Pricing" },
];

export default function StatsCounter() {
  return (
    <section className="border-t border-white/10 bg-navy-light py-16 sm:py-24">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center text-center sm:items-start sm:text-left"
            >
              <div className="font-display text-[clamp(3.5rem,7vw,5rem)] font-black uppercase leading-none tracking-tighter text-gold-bright">
                <AnimatedCounter value={stat.value} />
                {stat.suffix}
              </div>
              <div className="mt-4 font-body text-[14px] font-semibold uppercase tracking-kicker text-white/70">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
