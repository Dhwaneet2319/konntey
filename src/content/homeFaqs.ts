import { claimText } from "@/content/business";

/**
 * Single source of truth for the homepage FAQ. The visible accordion and the
 * homepage FAQPage JSON-LD both read from this array, so they always match.
 * Wording that depends on business claims comes from the claims model.
 */
export interface HomeFaq {
  q: string;
  a: string;
}

export const homeFaqs: HomeFaq[] = [
  {
    q: "How much does a kitchen renovation cost in Melbourne?",
    a: "As an indicative Melbourne guide, a cabinet and benchtop refresh is often $15,000–$25,000, a full kitchen renovation $25,000–$45,000, and a premium open-plan redesign $45,000–$80,000 or more. Layout changes, appliances and finishes move the number most. Your quote is itemised for your actual scope after a free site visit.",
  },
  {
    q: "How much does a bathroom renovation cost in Melbourne?",
    a: "As an indicative Melbourne guide, a small bathroom or ensuite is often $10,000–$20,000, a full bathroom renovation $20,000–$35,000, and a premium remodel $35,000–$45,000 or more. Tile choice, layout changes and plumbing moves have the biggest effect on price.",
  },
  {
    q: "How much does a home extension cost in Melbourne?",
    a: "Extensions commonly range from about $1,800 to $4,500+ per square metre, depending on structure, access, permits, materials and finishes. We start with a free consultation to confirm what's feasible before pricing.",
  },
  {
    q: "What suburbs in Melbourne do you service?",
    a: "We service Melbourne's west and southeast, including Tarneit, Truganina, Werribee, Hoppers Crossing, Point Cook, Wyndham Vale, Manor Lakes, Williams Landing, Laverton, Melton, Dandenong, Cranbourne, Frankston, Narre Warren, Berwick, Springvale, Pakenham, Officer and Clyde. If you're elsewhere in Melbourne, ask us.",
  },
  {
    q: "Do you offer free renovation quotes?",
    a: `Yes. Consultations and quotes are free and there's no obligation. ${claimText("responseTimes")} Before you compare quotes, our quote checklist shows what a complete renovation quote should include.`,
  },
];
