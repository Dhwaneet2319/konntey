"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discovery & Quote",
    desc: "We visit your property to understand your vision, measure the space, and provide a transparent, itemized quote with no hidden surprises.",
  },
  {
    num: "02",
    title: "Design & Approvals",
    desc: "From architectural drawings to securing permits and finalizing material selections, we handle the bureaucracy so you don't have to.",
  },
  {
    num: "03",
    title: "The Build",
    desc: "Our trusted tradespeople execute the work with precision. We maintain a clean site and keep you updated every step of the way.",
  },
  {
    num: "04",
    title: "Handover",
    desc: "We conduct a rigorous final walkthrough to ensure every detail is flawless before handing you the keys to your transformed space.",
  },
];

export default function ProcessStrip() {
  return (
    <section className="bg-navy-light py-20 sm:py-32 relative overflow-hidden">
      {/* Background large watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none z-0 font-display text-[clamp(8rem,15vw,25rem)] font-black text-white leading-none whitespace-nowrap">
        PROCESS
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright">
            HOW WE WORK
          </div>
          <h2 className="mt-4 font-display text-[clamp(3.5rem,6vw,5.5rem)] font-black uppercase leading-display tracking-tightest text-white">
            THE KONNTEY <br className="hidden sm:block" /> WAY
          </h2>
        </motion.div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 relative group">
          {/* Horizontal connector line on desktop */}
          <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-white/10 z-0" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy border border-gold-bright font-display text-[20px] font-black text-gold-bright transition-transform duration-500 hover:scale-110 hover:bg-gold-bright hover:text-navy">
                {step.num}
              </div>
              <h3 className="mt-8 font-display text-[22px] font-black uppercase tracking-button text-white">
                {step.title}
              </h3>
              <p className="mt-4 font-body text-[15px] leading-relaxed text-white/85 max-w-sm">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
