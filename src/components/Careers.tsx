"use client";

import { motion } from "framer-motion";

export default function Careers() {
  return (
    <section id="careers" className="bg-white py-12">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden border border-navy/10 bg-off-white px-8 py-16 sm:px-16 sm:py-20 lg:px-24 lg:py-24"
        >
          <div className="absolute top-6 right-8 font-display text-[clamp(6rem,12vw,14rem)] font-black leading-none text-navy/[0.03] select-none pointer-events-none">
            K
          </div>

          <div className="relative z-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright">
                WORK WITH US
              </div>
              <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-[0.9] tracking-tightest text-navy">
                SKILLED TRADESPERSON?{" "}
                <span className="text-gold-bright">LET&apos;S TALK.</span>
              </h2>
              <p className="mt-6 font-body text-[16px] leading-[1.8] text-navy/65">
                We&apos;re building a team of reliable, quality-focused tradespeople
                across Melbourne. If you take pride in your craft and want to work
                with a company that values communication and integrity, get in touch.
              </p>
            </div>

            <a
              href="#contact"
              className="group/btn relative inline-flex shrink-0 items-center justify-center overflow-hidden border-2 border-gold-bright bg-transparent px-8 py-5 font-display text-[15px] font-black uppercase tracking-button text-gold-bright transition-colors duration-300 hover:text-navy"
            >
              <span className="absolute inset-0 bg-gold-bright transition-transform duration-500 ease-out translate-y-full group-hover/btn:translate-y-0" />
              <span className="relative z-10">Get In Touch</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
