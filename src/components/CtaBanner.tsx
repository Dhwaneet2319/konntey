"use client";

import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-gold-bright py-20 sm:py-24">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 font-display text-[clamp(5rem,22vw,22rem)] font-black leading-none text-navy whitespace-nowrap select-none">
          READY?
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <m.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-black uppercase leading-[0.9] tracking-tightest text-navy">
              READY TO START YOUR RENOVATION?
            </h2>
            <p className="mt-4 font-body text-[16px] leading-[1.7] text-navy/70">
              Get a free, no-obligation quote within 24 hours. We&apos;ll come to
              you, understand your vision, and give you an honest price.
            </p>
          </m.div>

          <m.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="/#contact"
              className="group relative inline-flex overflow-hidden bg-navy px-8 py-5 font-display text-[15px] font-black uppercase tracking-button text-gold-bright"
            >
              <span className="relative z-10 transition-transform duration-300 block group-hover:-translate-y-12">
                Get a Free Quote
              </span>
              <span className="absolute inset-x-0 top-12 z-10 flex h-full items-center justify-center gap-1 transition-transform duration-300 group-hover:-translate-y-12">
                <span>Let&apos;s Go</span><ArrowRight size={16} strokeWidth={2.25} className="shrink-0" />
              </span>
            </a>
            <a
              href="tel:0493191798"
              className="inline-flex items-center justify-center gap-2 px-6 py-5 font-display text-[15px] font-black uppercase tracking-button text-navy transition-colors duration-300 hover:text-navy/60"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0493 191 798
            </a>
          </m.div>
        </div>
      </div>
    </section>
  );
}
