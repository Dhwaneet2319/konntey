"use client";

import { m } from "framer-motion";
import { ShieldCheck, Handshake, Clock, Hammer } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    name: "QUALITY",
    desc: "Every job finished to a standard we're proud of, crafted to last for generations.",
  },
  {
    icon: Handshake,
    name: "HONESTY",
    desc: "Straight quotes, no hidden costs. We communicate clearly from day one.",
  },
  {
    icon: Clock,
    name: "RELIABILITY",
    desc: "We show up when we say we will and stick rigidly to agreed schedules.",
  },
  {
    icon: Hammer,
    name: "CRAFT",
    desc: "Meticulous tradespeople who bring genuine passion and pride to every build.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-white overflow-hidden">
      <div className="grain-overlay" />
      
      <div className="relative z-10 mx-auto max-w-[1600px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-end">
          <div className="max-w-2xl space-y-8">
            <m.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright">
                WHO WE ARE
              </div>
              <h2 className="font-display text-[clamp(3.5rem,8.5vw,7.5rem)] font-black uppercase leading-display tracking-tightest text-navy">
                BUILT ON{" "}
                <span className="text-gold-bright">
                  CRAFT.
                </span>
                <br />
                BACKED BY{" "}
                <span className="text-gold-bright">TRUST.</span>
              </h2>
            </m.div>

            <m.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl font-body text-[17px] leading-[1.8] text-navy/70"
            >
              Konntey Home & Renovations is Melbourne&apos;s trusted, family-run
              renovation company. As professional renovation contractors in Victoria, we bring 
              top-tier trade expertise, transparent pricing, and meticulous care to every project — 
              from bathroom renovations to full home transformations across western 
              Melbourne. We build spaces meant to be lived in and loved.
            </m.p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:pt-12 relative">
            {values.map((v, index) => {
              const Icon = v.icon;
              return (
                <m.div
                  key={v.name}
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1 + 0.1,
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className={`group relative border border-navy/8 bg-off-white p-8 transition-colors duration-500 hover:border-gold-bright/30 ${
                    index % 2 !== 0 ? "sm:mt-12" : ""
                  }`}
                >
                  <span className="absolute left-0 top-0 h-[2px] w-0 bg-gold-bright transition-all duration-500 ease-out group-hover:w-full" />
                  
                  <div className="text-navy/40 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:text-gold-bright">
                    <Icon size={40} strokeWidth={1.25} />
                  </div>
                  <div className="mt-8 font-display text-[20px] font-black uppercase tracking-button text-gold-bright">
                    {v.name}
                  </div>
                  <p className="mt-4 font-body text-[15px] leading-body text-navy/60 transition-colors duration-300 group-hover:text-navy/80">
                    {v.desc}
                  </p>
                </m.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
