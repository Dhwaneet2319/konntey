"use client";

import { m } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { homeFaqs as faqs } from "@/content/homeFaqs";

// Native <details> keeps every answer in the server-rendered HTML (collapsed
// visually), so the visible content always matches the FAQPage JSON-LD.
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  return (
    <m.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-navy/10"
    >
      <details className="group">
        <summary className="flex w-full cursor-pointer list-none items-center justify-between py-6 text-left [&::-webkit-details-marker]:hidden">
          <span className="font-display text-[18px] sm:text-[22px] font-bold uppercase tracking-tight text-navy pr-4">
            {q}
          </span>
          <ChevronDown
            size={24}
            className="shrink-0 text-gold-bright transition-transform duration-300 group-open:rotate-180"
          />
        </summary>
        <p className="pb-6 font-body text-[16px] leading-[1.8] text-navy/65 max-w-3xl">
          {a}
        </p>
      </details>
    </m.div>
  );
}

export default function FAQ() {
  return (
    <section className="bg-off-white py-20 sm:py-32 relative">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <m.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright">
                GOT QUESTIONS?
              </div>
              <h2 className="mt-4 font-display text-[clamp(3rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-tightest text-navy">
                FREQUENTLY ASKED
              </h2>
              <p className="mt-6 font-body text-[16px] leading-[1.8] text-navy/65">
                Everything you need to know about renovation costs, timelines, and working with Konntey in Melbourne.
              </p>
            </m.div>
          </div>
          <div className="lg:col-span-8">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
