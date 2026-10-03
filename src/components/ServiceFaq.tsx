import { ChevronDown } from "lucide-react";

export interface ServiceFaqItem {
  q: string;
  a: string;
}

/**
 * FAQ list using native <details>, so every answer is in the server HTML and
 * works without JavaScript.
 */
export default function ServiceFaq({
  faqs,
  tone = "light",
}: {
  faqs: ServiceFaqItem[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className={`divide-y ${dark ? "divide-white/15 border-y border-white/15" : "divide-navy/10 border-y border-navy/10"}`}>
      {faqs.map((faq) => (
        <details key={faq.q} className="group">
          <summary
            className={`flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-body text-[17px] font-semibold [&::-webkit-details-marker]:hidden ${
              dark ? "text-white" : "text-navy"
            }`}
          >
            <span>{faq.q}</span>
            <ChevronDown
              aria-hidden="true"
              size={20}
              strokeWidth={2}
              className={`shrink-0 transition-transform duration-hover ease-brand group-open:rotate-180 ${
                dark ? "text-gold-bright" : "text-gold-deep"
              }`}
            />
          </summary>
          <p
            className={`max-w-3xl pb-6 font-body text-[16px] leading-[1.75] ${
              dark ? "text-white/80" : "text-navy/75"
            }`}
          >
            {faq.a}
          </p>
        </details>
      ))}
    </div>
  );
}
