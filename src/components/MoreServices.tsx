"use client";

import { m } from "framer-motion";
import CircleArrow from "@/components/CircleArrow";

const additionalServices = [
  "Flooring",
  "Roofing",
  "Fencing & Gates",
  "Tiling",
  "Structural Repairs",
  "Demolition",
  "Plastering & Rendering",
  "Carports & Garages",
  "Laundry Renovations",
  "Window & Door Replacement",
];

export default function MoreServices() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright">
            & MANY MORE
          </div>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-[0.9] tracking-tightest text-navy">
            WHATEVER YOUR PROJECT, WE&apos;VE GOT YOU
          </h2>
        </m.div>

        <div className="mt-12 flex flex-wrap justify-center gap-3 sm:gap-4">
          {additionalServices.map((service, i) => (
            <m.div
              key={service}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="border border-navy/15 px-5 py-3 font-display text-[14px] font-bold uppercase tracking-button text-navy transition-colors duration-300 hover:border-gold-bright hover:bg-navy hover:text-gold-bright sm:px-7 sm:py-4 sm:text-[16px]"
            >
              {service}
            </m.div>
          ))}
        </div>

        <m.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-4 font-display text-[15px] font-black uppercase tracking-button text-navy transition-colors duration-300 hover:text-gold"
          >
            <span>Tell Us What You Need</span>
            <CircleArrow className="transition-transform duration-300 group-hover:translate-x-2" />
          </a>
        </m.div>
      </div>
    </section>
  );
}
