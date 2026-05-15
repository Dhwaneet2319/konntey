"use client";

import { m } from "framer-motion";
import CircleArrow from "@/components/CircleArrow";

export default function VastuSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 flex items-center justify-center">
        <span className="font-display text-[clamp(3.5rem,18vw,22rem)] font-black text-navy leading-none select-none whitespace-nowrap">
          BALANCE
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <m.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright">
            DESIGN WITH INTENTION
          </div>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-display tracking-tightest text-navy">
            VASTU &amp; FENG SHUI{" "}
            <span className="text-gold-bright">CONSULTATION</span>
          </h2>

          <m.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 h-[2px] w-24 origin-left bg-navy/20"
          />

          <m.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl font-body text-[16px] xl:text-[18px] leading-[1.8] text-navy/70"
          >
            Building or renovating? We work with experienced Vastu and Feng Shui
            consultants to help you design spaces that are balanced, intentional,
            and built around positive energy flow. Whether you&apos;re planning a
            new home or a full renovation, we can incorporate these principles
            from the ground up — so your space doesn&apos;t just look right, it
            feels right.
          </m.p>

          <m.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4 items-center"
          >
            <a
              href="/vastu-renovations-melbourne"
              className="group inline-flex items-center gap-4 font-display text-[15px] font-black uppercase tracking-button text-navy transition-colors duration-300 hover:text-gold"
            >
              <span>Learn More About Vastu</span>
              <CircleArrow className="transition-transform duration-300 group-hover:translate-x-2" />
            </a>
            <a
              href="#contact"
              className="font-display text-[13px] font-bold uppercase tracking-button text-navy/50 transition-colors duration-300 hover:text-gold-bright"
            >
              Or Contact Us →
            </a>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
