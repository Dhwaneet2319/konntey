"use client";

import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = [
  { label: "Extensions & New Builds", icon: "01", href: "/services/extensions" },
  { label: "Vastu & Feng Shui", icon: "02", href: "/services/vastu" },
  { label: "Kitchen Renovations", icon: "03", href: "/kitchen-renovations-melbourne" },
  { label: "Bathroom Renovations", icon: "04", href: "/bathroom-renovations-melbourne" },
  { label: "Decks & Outdoor Living", icon: "05", href: "/services/outdoor" },
  { label: "Interior Finishing", icon: "06", href: "/interior-painting-melbourne" },
];

export default function ProjectGallery() {
  return (
    <section className="relative bg-off-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 flex items-center justify-center">
        <span className="font-display text-[clamp(3.5rem,22vw,30rem)] font-black text-navy leading-none select-none whitespace-nowrap">
          PROJECTS
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <m.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright">
              PORTFOLIO
            </div>
            <h2 className="mt-4 font-display text-[clamp(3.5rem,8vw,7rem)] font-black uppercase leading-[0.85] tracking-tightest text-navy">
              BE THE BUILD{" "}
              <span className="text-gold-bright">THAT SETS THE</span>{" "}
              STANDARD.
            </h2>

            <m.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 h-[2px] w-24 origin-left bg-navy/20"
            />

            <p className="mt-8 font-body text-[17px] leading-[1.8] text-navy/70">
              We&apos;re selective about the projects we take on across
              Melbourne. Every job gets founder-led oversight,
              priority scheduling, and the full Konntey standard from day one.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="group relative inline-flex items-center overflow-hidden bg-gold-bright px-8 py-5 font-display text-[15px] font-black uppercase tracking-button text-navy"
              >
                <span className="relative z-10 transition-transform duration-300 block group-hover:-translate-y-12">
                  Start Your Project
                </span>
                <span className="absolute inset-0 z-10 flex items-center justify-center gap-1 translate-y-12 transition-transform duration-300 group-hover:translate-y-0">
                  <span>Let&apos;s Go</span><ArrowRight size={16} strokeWidth={2.25} className="shrink-0" />
                </span>
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 font-display text-[14px] font-black uppercase tracking-button text-navy/60 transition-colors duration-300 hover:text-gold-bright"
              >
                <span>Or request a free quote</span>
                <ArrowRight size={16} strokeWidth={2.25} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </m.div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {categories.map((cat, i) => (
              <m.div
                key={cat.label}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative border border-navy/[0.08] bg-white p-6 transition-all duration-500 hover:border-gold-bright/30 hover:shadow-sm sm:p-8"
              >
                <Link prefetch={true} href={cat.href} className="absolute inset-0 z-20" aria-label={cat.label} />
                <span className="absolute top-0 left-0 h-[2px] w-0 bg-gold-bright transition-all duration-500 ease-out group-hover:w-full" />
                <div className="relative z-10 font-display text-[clamp(2rem,4vw,3rem)] font-black leading-none text-gold-bright/20 transition-colors duration-500 group-hover:text-gold-bright/40">
                  {cat.icon}
                </div>
                <div className="relative z-10 mt-4 font-display text-[14px] font-black uppercase tracking-button leading-tight text-navy/80 transition-colors duration-300 group-hover:text-navy sm:text-[16px]">
                  {cat.label}
                </div>
                <div className="relative z-10 mt-3 flex items-center gap-2 font-body text-[11px] uppercase tracking-kicker text-gold-bright">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-bright" />
                  Now Booking
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
