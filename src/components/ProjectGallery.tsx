"use client";

import { motion } from "framer-motion";

const categories = [
  { label: "Kitchen Renovations", icon: "01" },
  { label: "Bathroom Renovations", icon: "02" },
  { label: "Extensions & New Builds", icon: "03" },
  { label: "Decks & Outdoor Living", icon: "04" },
  { label: "Interior Finishing", icon: "05" },
  { label: "Full Home Transformations", icon: "06" },
];

export default function ProjectGallery() {
  return (
    <section className="relative bg-navy overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 flex items-center justify-center">
        <span className="font-display text-[clamp(10rem,20vw,30rem)] font-black text-white leading-none select-none whitespace-nowrap">
          PROJECTS
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright">
              PORTFOLIO
            </div>
            <h2 className="mt-4 font-display text-[clamp(3.5rem,8vw,7rem)] font-black uppercase leading-[0.85] tracking-tightest text-white">
              YOUR PROJECT{" "}
              <span className="text-gold-bright">COULD BE</span>{" "}
              FIRST.
            </h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 h-[2px] w-24 origin-left bg-white/20"
            />

            <p className="mt-8 font-body text-[17px] leading-[1.8] text-white/90">
              We&apos;re currently taking on our first showcase projects across
              Melbourne&apos;s west and southeast. Early clients get priority
              scheduling, founder-led oversight, and launch pricing.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="group relative inline-flex overflow-hidden bg-gold-bright px-8 py-5 font-display text-[15px] font-black uppercase tracking-button text-navy"
              >
                <span className="relative z-10 transition-transform duration-300 block group-hover:-translate-y-12">
                  Be Our First Project
                </span>
                <span className="absolute inset-x-0 top-12 z-10 flex h-full items-center justify-center transition-transform duration-300 group-hover:-translate-y-12">
                  Let&apos;s Go →
                </span>
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 font-display text-[14px] font-black uppercase tracking-button text-white/75 transition-colors duration-300 hover:text-gold-bright"
              >
                <span>Or request a free quote</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative border border-white/[0.06] bg-navy-light/60 p-6 transition-all duration-500 hover:border-gold-bright/30 hover:bg-navy-light sm:p-8"
              >
                <span className="absolute top-0 left-0 h-[2px] w-0 bg-gold-bright transition-all duration-500 ease-out group-hover:w-full" />
                <div className="font-display text-[clamp(2rem,4vw,3rem)] font-black leading-none text-gold-bright/15 transition-colors duration-500 group-hover:text-gold-bright/30">
                  {cat.icon}
                </div>
                <div className="mt-4 font-display text-[14px] font-black uppercase tracking-button leading-tight text-white/90 transition-colors duration-300 group-hover:text-white sm:text-[16px]">
                  {cat.label}
                </div>
                <div className="mt-3 flex items-center gap-2 font-body text-[11px] uppercase tracking-kicker text-gold-bright/50">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-bright/40" />
                  Coming Soon
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
