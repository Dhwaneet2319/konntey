"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How much does a kitchen renovation cost in Melbourne?",
    a: "Kitchen renovation costs in Melbourne typically range from $15,000 for a budget refresh to $60,000+ for a full luxury kitchen renovation. At Konntey, we provide free on-site quotes with transparent, itemized pricing — no hidden surprises. We service Tarneit, Truganina, Werribee, Point Cook and all western Melbourne suburbs.",
  },
  {
    q: "How much does a bathroom renovation cost in Melbourne?",
    a: "A small bathroom renovation in Melbourne typically costs between $10,000 and $25,000. Full luxury bathroom renovations can range from $25,000 to $50,000+. Konntey offers affordable bathroom renovation packages across Melbourne's west and southeast with no hidden fees.",
  },
  {
    q: "How much does a home extension cost in Melbourne?",
    a: "Home extension costs in Melbourne vary from $1,800 to $4,500+ per square metre depending on complexity, materials and finishes. We provide free consultations and detailed quotes for home extensions across Hoppers Crossing, Point Cook, Wyndham Vale, Dandenong and surrounding suburbs.",
  },
  {
    q: "What suburbs in Melbourne do you service?",
    a: "We service all of Melbourne with a focus on western and southeastern suburbs including Tarneit, Truganina, Werribee, Hoppers Crossing, Point Cook, Wyndham Vale, Manor Lakes, Williams Landing, Dandenong, Cranbourne, Frankston, Narre Warren, Berwick, Springvale, Pakenham, Officer, Clyde and Melton.",
  },
  {
    q: "Do you offer free renovation quotes?",
    a: "Absolutely. We offer 100% free, no-obligation on-site quotes for all renovation projects. We'll visit your property, discuss your vision, measure the space and provide a transparent, itemized quote within 48 hours. Call us or fill out our online form.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <m.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-navy/10"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-6 text-left"
      >
        <span className="font-display text-[18px] sm:text-[22px] font-bold uppercase tracking-tight text-navy pr-4">
          {q}
        </span>
        <m.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 text-gold-bright"
        >
          <ChevronDown size={24} />
        </m.div>
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 font-body text-[16px] leading-[1.8] text-navy/65 max-w-3xl">
              {a}
            </p>
          </m.div>
        )}
      </AnimatePresence>
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
