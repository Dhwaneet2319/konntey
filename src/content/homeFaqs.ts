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
    a: "Kitchen renovations in Melbourne typically cost $15,000–$25,000 for a cabinet and benchtop refresh, $25,000–$45,000 for a full renovation, and $45,000–$80,000+ for a premium open-plan redesign. At Konntey, we provide free on-site quotes with transparent, itemized pricing. We service Tarneit, Truganina, Werribee, Point Cook and all western Melbourne suburbs.",
  },
  {
    q: "How much does a bathroom renovation cost in Melbourne?",
    a: "A small bathroom or ensuite in Melbourne typically costs $10,000–$20,000, a full bathroom renovation $20,000–$35,000, and a premium remodel $35,000–$45,000+. Konntey provides fixed-price, itemised bathroom quotes across Melbourne's west and southeast.",
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
    a: "Absolutely. We offer 100% free, no-obligation on-site quotes for all renovation projects. We'll respond to your enquiry within 24 hours, visit your property, discuss your vision and measure the space, then provide a transparent, itemized quote — typically within 48 hours of the visit. Call us or fill out our online form.",
  },
];
