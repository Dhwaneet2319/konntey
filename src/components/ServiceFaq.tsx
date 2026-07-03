"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";

export interface ServiceFaqItem {
  q: string;
  a: string;
}

/**
 * Accordion FAQ client island for the service pages. Kept as a small island so
 * the rest of the page can render as a server component. Markup mirrors the
 * original inline accordion so the pages look identical to before the refactor.
 */
export default function ServiceFaq({ faqs }: { faqs: ServiceFaqItem[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="mt-12 max-w-3xl space-y-4">
      {faqs.map((faq, i) => (
        <m.div
          key={faq.q}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className="border border-navy/10"
        >
          <button
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
            aria-expanded={openFaq === i}
            className="flex w-full items-center justify-between p-6 text-left"
          >
            <span className="font-display text-[16px] font-black uppercase tracking-tight text-navy pr-4">
              {faq.q}
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`shrink-0 transition-transform duration-300 text-gold-bright ${openFaq === i ? "rotate-180" : ""}`}
            >
              <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <AnimatePresence>
            {openFaq === i && (
              <m.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 font-body text-[15px] leading-[1.8] text-navy/70">
                  {faq.a}
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </m.div>
      ))}
    </div>
  );
}
