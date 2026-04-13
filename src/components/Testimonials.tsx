"use client";

import { motion } from "framer-motion";

const promises = [
  {
    title: "Clear Communication",
    text: "One dedicated point of contact from your first consultation to final handover. Weekly progress updates, responsive messaging, and zero runaround — because your time matters as much as ours.",
  },
  {
    title: "Fair Price Quotes",
    text: "Every project begins with a detailed, transparent scope of work. No hidden fees, no surprise invoices, no guesswork — the price we quote is the price you pay.",
  },
  {
    title: "Professional & Insured",
    text: "Fully registered, professional, and insured to Australian standards. Every build is backed by proper documentation, compliance checks, and a commitment to getting it right.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-off-white py-20 sm:py-32 relative">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright">
            WHY KONNTEY
          </div>
          <h2 className="mt-4 font-display text-[clamp(3.5rem,6vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tightest text-navy">
            BUILT ON TRUST
          </h2>
          <p className="mt-6 max-w-lg font-body text-[16px] leading-[1.8] text-navy/65">
            Konntey is Melbourne&apos;s renovation company built on one simple promise — every client gets the same high standard, every time. Here&apos;s what you can expect when you build with us.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {promises.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="border border-navy/8 bg-white p-8 sm:p-10 hover:border-gold-bright/30 transition-colors duration-500"
            >
              <div className="font-display text-[clamp(3rem,5vw,4rem)] font-black leading-none text-gold-bright/20 mb-6">
                0{i + 1}
              </div>
              <h3 className="font-display text-[20px] font-black uppercase tracking-button text-navy mb-4">
                {p.title}
              </h3>
              <p className="font-body text-[16px] leading-[1.8] text-navy/70">
                {p.text}
              </p>
              <div className="mt-8 h-[2px] w-12 bg-gold-bright/40" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
