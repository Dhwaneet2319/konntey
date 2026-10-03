"use client";

import { m } from "framer-motion";

// Static, truthful facts: none of these gain meaning from counting up, and a
// count-up risked settling short of the real value.
const stats = [
  { value: "Free", label: "Consultation" },
  { value: "4-Step", label: "Build Process" },
  { value: "1", label: "Point of Contact" },
  { value: "Itemised", label: "Written Quotes", small: true },
];

export default function StatsCounter() {
  return (
    <section className="border-y border-navy/8 bg-off-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {stats.map((stat, index) => (
            <m.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.35, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col-reverse items-center justify-center text-center sm:items-start sm:text-left"
            >
              <dt className="mt-4 font-body text-[14px] font-semibold uppercase tracking-kicker text-navy/60">
                {stat.label}
              </dt>
              <dd
                className={`font-display font-black uppercase leading-none tracking-tighter text-gold-bright ${
                  stat.small ? "text-[clamp(2rem,4.5vw,3.5rem)]" : "text-[clamp(3.5rem,7vw,5rem)]"
                }`}
              >
                {stat.value}
              </dd>
            </m.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
