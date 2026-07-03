/**
 * Single source of truth for the homepage FAQ.
 *
 * Both the visible <FAQ /> accordion and the homepage FAQPage JSON-LD read from
 * this array, so the structured data always matches what users actually see —
 * which is what Google requires for FAQ rich results.
 */
export interface HomeFaq {
  q: string;
  a: string;
}

export const homeFaqs: HomeFaq[] = [
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
