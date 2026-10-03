"use client";

import { m } from "framer-motion";

export interface ServiceFaqItem {
  q: string;
  a: string;
}

/**
 * Accordion FAQ client island for the service pages. Uses native <details> so
 * every answer is present in the server-rendered HTML (collapsed visually)
 * and matches the page's FAQPage JSON-LD without needing a click to mount.
 */
export default function ServiceFaq({ faqs }: { faqs: ServiceFaqItem[] }) {
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
          <details className="group">
            <summary className="flex w-full cursor-pointer list-none items-center justify-between p-6 text-left [&::-webkit-details-marker]:hidden">
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
                aria-hidden="true"
                className="shrink-0 transition-transform duration-300 text-gold-bright group-open:rotate-180"
              >
                <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <div className="px-6 pb-6 font-body text-[15px] leading-[1.8] text-navy/70">
              {faq.a}
            </div>
          </details>
        </m.div>
      ))}
    </div>
  );
}
