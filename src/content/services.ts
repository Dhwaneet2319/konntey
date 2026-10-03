/**
 * Content for the six service pages, rendered by <ServicePage />.
 *
 * Credential, staffing, price and timing wording comes from the approved
 * claims in ./business.ts, so it changes everywhere when a claim is approved.
 */
import {
  claimText,
  claims,
  isClaimApproved,
  quoteKind,
  type ClaimId,
} from "./business";
import type { SiteImageKey } from "./images";
import type { ServiceSlug } from "./taxonomy";

export type { ServiceSlug };

export interface ServiceItem {
  title: string;
  desc: string;
}

export interface ServiceFaqItem {
  q: string;
  a: string;
}

export interface ServiceTestimonial {
  quote: string;
  author: string;
  location: string;
  /**
   * Set to true only after the quote has been matched to a real customer
   * record and the customer has agreed to it being published.
   */
  consentConfirmed: boolean;
  /** Public, verifiable source (e.g. the original Google review) when allowed. */
  sourceUrl?: string;
}

export interface RelatedLink {
  label: string;
  href: string;
}

export interface ServiceContent {
  slug: ServiceSlug;
  route: string;
  /** Sentence-case name, e.g. "Kitchen renovations". */
  name: string;
  /** Used in "Planning a ___?" and "Recent ___ projects". */
  projectNoun: string;
  schemaName: string;
  serviceType: string;
  meta: { title: string; description: string };
  socialImage: SiteImageKey;
  hero: {
    kicker: string;
    title: string;
    accent?: string;
    intro: string;
    image: SiteImageKey;
    ctaLabel: string;
  };
  cost?: { heading: string; body: string };
  principles?: { heading: string; intro: string; items: ServiceItem[] };
  types: { heading: string; items: ServiceItem[] };
  gallery?: SiteImageKey[];
  process: { heading: string; steps: ServiceItem[]; image?: SiteImageKey };
  beforeAfter?: { before: SiteImageKey; after: SiteImageKey };
  compliance?: { heading: string; intro: string; items: string[]; note?: string };
  pricing?: { rows: { scope: string; range: string }[]; note: string; low: number; high: number };
  testimonials: ServiceTestimonial[];
  faqs: ServiceFaqItem[];
  finalCta: { heading: string; body: string; phoneLabel: string };
  relatedGuides: RelatedLink[];
  relatedServices: RelatedLink[];
  areasLabel: string;
  /** Homepage service chooser. */
  card: { title: string; blurb: string; image: SiteImageKey };
}

/** Sentences for whichever of these claims are approved. */
function approvedSentences(...ids: ClaimId[]): string {
  return ids
    .filter(isClaimApproved)
    .map((id) => `${claims[id].approvedWording}.`)
    .join(" ");
}

const join = (...parts: string[]) => parts.filter(Boolean).join(" ");

const quoteSentence = `Free consultation and a ${quoteKind}.`;
const getStarted = `Request a free quote online or call us. ${claimText("responseTimes")}`;
const quoteStep = (extra = "") =>
  join(`A ${quoteKind} for the agreed scope`, extra).trim();

export const services: Record<ServiceSlug, ServiceContent> = {
  kitchen: {
    slug: "kitchen",
    route: "/kitchen-renovations-melbourne",
    name: "Kitchen renovations",
    projectNoun: "kitchen renovation",
    schemaName: "Kitchen renovations, western Melbourne",
    serviceType: "Kitchen Renovation",
    meta: {
      title: "Kitchen renovations Melbourne",
      description: join(
        "Kitchen renovations across Melbourne's west, from cabinet and benchtop refreshes to open-plan redesigns.",
        approvedSentences("bpcRegistration"),
        quoteSentence,
      ),
    },
    socialImage: "socialKitchen",
    hero: {
      kicker: "Kitchen renovations",
      title: "Kitchen renovations for western Melbourne homes",
      intro: join(
        "We renovate kitchens across Melbourne's west, from cabinet replacements to full open-plan rebuilds, for homeowners in Tarneit, Werribee, Point Cook, Footscray, Hoppers Crossing and Sunshine.",
        approvedSentences("bpcRegistration", "noSubcontractors"),
      ),
      image: "kitchenHero",
      ctaLabel: "Get a free quote",
    },
    cost: {
      heading: "How much does a kitchen renovation cost in Melbourne's west?",
      body: `Kitchen renovations in Melbourne's west generally cost between $15,000 and $80,000 or more. A cabinet and benchtop refresh is around $15,000–$25,000, a full renovation $25,000–$45,000, and a premium open-plan redesign with island bench and butler's pantry $45,000–$80,000+. Size, layout changes and selections move the number most. Your ${quoteKind} covers the agreed scope, and any change is priced and approved in writing before it happens.`,
    },
    types: {
      heading: "Kitchens we renovate",
      items: [
        { title: "Full kitchen renovation", desc: "Complete strip-out and rebuild, new layout and all new fixtures." },
        { title: "Cabinet & benchtop refresh", desc: "New doors, benchtop and splashback over the existing structure." },
        { title: "Open-plan conversion", desc: "Remove walls, extend into living or dining, add an island bench." },
        { title: "Butler's pantry addition", desc: "Secondary prep space, custom cabinetry and an extra sink." },
        { title: "Small kitchen renovation", desc: "Space-maximising layouts for the townhouses and units common in Point Cook and Wyndham Vale estates." },
      ],
    },
    gallery: ["kitchenCabinets", "kitchenBenchtop", "kitchenOpenPlan", "kitchenSplashback"],
    process: {
      heading: "How a kitchen renovation runs",
      image: "kitchenTiler",
      steps: [
        { title: "Free consultation", desc: "Site visit, measure-up, layout and brief." },
        { title: "Design & quote", desc: quoteStep() },
        { title: "Demolition", desc: "Strip-out of existing cabinetry, benchtops and appliances." },
        { title: "Structural work", desc: "Wall removal, electrical and plumbing rough-in if required." },
        { title: "Cabinet installation", desc: "Carcasses, doors, drawers and hardware fitted." },
        { title: "Benchtop & splashback", desc: "Stone, laminate or tile to your selection." },
        { title: "Appliance fit-off", desc: "Oven, cooktop, rangehood and dishwasher connected." },
        { title: "Finishing & handover", desc: "Full clean, walkthrough and handover." },
      ],
    },
    beforeAfter: { before: "kitchenBefore", after: "kitchenAfter" },
    pricing: {
      rows: [
        { scope: "Cabinet & benchtop refresh", range: "$15,000 – $25,000" },
        { scope: "Full kitchen renovation", range: "$25,000 – $45,000" },
        { scope: "Premium open-plan redesign", range: "$45,000 – $80,000+" },
      ],
      note: "Prices vary with cabinet material, benchtop selection, appliance grade and whether structural or plumbing work is needed.",
      low: 15000,
      high: 80000,
    },
    // OWNER: set consentConfirmed only after matching each quote to a real
    // customer and getting their permission to publish it.
    testimonials: [
      { quote: "Konntey did our kitchen in Hoppers Crossing. New cabinets, stone benchtop, the lot. Finished on time and exactly on budget. Really happy with the result.", author: "David K.", location: "Hoppers Crossing", consentConfirmed: false },
      { quote: "We had our Tarneit kitchen opened up into the dining room. The team handled the wall removal, new island bench, everything. Smooth process start to finish.", author: "Anika P.", location: "Tarneit", consentConfirmed: false },
      { quote: "Finally got the kitchen we wanted after years of putting it off. Fixed price meant no stress about blowouts. Would use Konntey again for the bathroom next.", author: "Steve M.", location: "Werribee", consentConfirmed: false },
    ],
    faqs: [
      { q: "Do I need a building permit for a kitchen renovation?", a: "Most kitchen renovations — new cabinets, benchtops, splashbacks and appliance replacements — don't need a building permit. Removing walls, relocating plumbing or electrical work beyond standard connections can. Wyndham City, Maribyrnong and Brimbank councils each have slightly different thresholds. We assess permit requirements as part of every quote at no extra cost." },
      { q: "How long does a kitchen renovation take?", a: "A standard kitchen renovation typically takes 2–3 weeks from demolition to handover. Open-plan conversions involving structural work can take 3–5 weeks. Late fixture or appliance delivery is the most common cause of delay, so we recommend locking in selections before work begins." },
      { q: "Can I live at home during the renovation?", a: "Yes, most people stay home during a kitchen renovation. You'll be without a working kitchen for a few weeks, so set up a temporary meal-prep area. We keep the site clean and contained each day." },
      { q: "What's included in your quote?", a: "Labour, project management, cabinet supply and installation, benchtop fabrication and installation, splashback tiling, appliance connection and rubbish removal. Appliances can be supplied by us or by you — we'll confirm at quote stage." },
      { q: "Do you renovate kitchens in new estates like Tarneit and Point Cook?", a: "Yes. Kitchens in Tarneit, Point Cook, Wyndham Vale and nearby estates often follow standard volume-builder layouts, and many builder-grade kitchens from the early 2000s are now due for an upgrade. We check the layout, plumbing and any council requirements at the site visit." },
      { q: "What's the payment schedule?", a: "Staged milestone payments: a deposit on contract signing, a progress payment after cabinet installation and the final payment on handover. No large upfront lump sums." },
      { q: "How do I get started?", a: getStarted },
    ],
    finalCta: {
      heading: "Ready for a new kitchen?",
      body: join(quoteSentence, approvedSentences("bpcRegistration")),
      phoneLabel: "Call us",
    },
    relatedGuides: [
      { label: "Kitchen renovation cost guide for Melbourne", href: "/guides/kitchen-renovation-cost-melbourne" },
      { label: "How to choose a renovation builder in Melbourne", href: "/guides/how-to-choose-a-renovation-builder-melbourne" },
      { label: "Renovation quote comparison checklist", href: "/guides/renovation-quote-checklist-melbourne" },
      { label: "Do you need a permit to renovate in Victoria?", href: "/guides/renovation-permits-victoria" },
    ],
    relatedServices: [
      { label: "Bathroom renovations", href: "/bathroom-renovations-melbourne" },
      { label: "Home extensions", href: "/home-extensions-melbourne" },
      { label: "Interior painting", href: "/interior-painting-melbourne" },
    ],
    areasLabel: "Kitchen renovations",
    card: { title: "Kitchens", blurb: "Cabinet refreshes to open-plan redesigns.", image: "kitchenHero" },
  },

  bathroom: {
    slug: "bathroom",
    route: "/bathroom-renovations-melbourne",
    name: "Bathroom renovations",
    projectNoun: "bathroom renovation",
    schemaName: "Bathroom renovations, western Melbourne",
    serviceType: "Bathroom Renovation",
    meta: {
      title: "Bathroom renovations Melbourne",
      description: join(
        "Bathroom renovations across Melbourne's west, from small ensuite refreshes to full rebuilds.",
        approvedSentences("bpcRegistration", "waterproofingCertificate"),
        quoteSentence,
      ),
    },
    socialImage: "socialBathroom",
    hero: {
      kicker: "Bathroom renovations",
      title: "Bathroom renovations in western Melbourne",
      accent: "from ensuite to full remodel",
      intro: join(
        "We renovate bathrooms across Melbourne's western suburbs, from small ensuite refreshes to full rebuilds, for homeowners in Tarneit, Point Cook, Werribee, Footscray, Hoppers Crossing and Williamstown.",
        approvedSentences("bpcRegistration"),
      ),
      image: "bathroomHero",
      ctaLabel: "Get a free quote",
    },
    cost: {
      heading: "How much does a bathroom renovation cost in Melbourne's west?",
      body: `Bathroom renovations in Melbourne's west generally cost between $10,000 and $45,000 or more, depending on size, fixtures and scope. A small bathroom or ensuite is around $10,000–$20,000, a full bathroom renovation $20,000–$35,000, and a premium remodel with freestanding bath and floor-to-ceiling tiling $35,000–$45,000+. Your ${quoteKind} covers the agreed scope, and any change is priced and approved in writing before it happens.`,
    },
    types: {
      heading: "Bathrooms we renovate",
      items: [
        { title: "Main bathroom", desc: "Full strip-out and rebuild, with a new layout if needed." },
        { title: "Ensuite", desc: "Compact, high-spec finishes in tight spaces." },
        { title: "Small bathroom", desc: "Space-maximising layouts for western Melbourne townhouses." },
        { title: "Laundry-bathroom combo", desc: "Practical dual-purpose rooms, common in Point Cook and Wyndham Vale estates." },
      ],
    },
    gallery: ["bathroomShower", "bathroomVanity", "bathroomEnsuite"],
    process: {
      heading: "How a bathroom renovation runs",
      image: "bathroomTiler",
      steps: [
        { title: "Free consultation", desc: "We visit, assess the space and discuss your brief." },
        { title: "Design & quote", desc: quoteStep() },
        { title: "Demolition", desc: "Full strip-out, checking for water damage and structural issues." },
        {
          title: "Waterproofing",
          desc: isClaimApproved("waterproofingCertificate")
            ? "Certified waterproofing to AS 3740, applied and inspected."
            : "Membrane applied to AS 3740 before tiling.",
        },
        { title: "Plumbing rough-in", desc: "Coordinated with a licensed plumber to AS/NZS 3500." },
        { title: "Tiling & fixtures", desc: "Your chosen tiles, tapware, vanity and fittings installed." },
        { title: "Fit-off & finishing", desc: "Final plumbing connections, mirrors, accessories and silicone." },
        {
          title: "Handover",
          desc: isClaimApproved("waterproofingCertificate")
            ? "Waterproofing certificate issued, full clean and walkthrough."
            : "Full clean, walkthrough and the paperwork your job requires.",
        },
      ],
    },
    beforeAfter: { before: "bathroomBefore", after: "bathroomAfter" },
    compliance: {
      heading: "Compliance and waterproofing",
      intro: "Wet-area waterproofing must meet the National Construction Code, which references AS 3740. What to expect on a Konntey bathroom:",
      items: [
        claimText("waterproofingCertificate"),
        "Plumbing coordinated with a licensed plumber to AS/NZS 3500",
        ...(isClaimApproved("bpcRegistration") ? [claims.bpcRegistration.approvedWording] : []),
        ...(isClaimApproved("insurance") ? [claims.insurance.approvedWording] : []),
      ].filter(Boolean),
      note: isClaimApproved("waterproofingCertificate")
        ? "Most homeowners don't know to ask for a waterproofing certificate — we provide it without being asked."
        : undefined,
    },
    pricing: {
      rows: [
        { scope: "Small bathroom / ensuite", range: "$10,000 – $20,000" },
        { scope: "Full bathroom renovation", range: "$20,000 – $35,000" },
        { scope: "Premium full remodel", range: "$35,000 – $45,000+" },
      ],
      note: "Prices vary with tile format, fixture selection, layout changes and whether plumbing needs relocating.",
      low: 10000,
      high: 45000,
    },
    // OWNER: set consentConfirmed only after matching each quote to a real
    // customer and getting their permission to publish it.
    testimonials: [
      { quote: "Konntey renovated our main bathroom in Werribee. Clean work, finished on time, and they handled everything including the waterproofing cert. Highly recommend.", author: "James T.", location: "Werribee", consentConfirmed: false },
      { quote: "We had a small ensuite done in our Tarneit home. The team was respectful of our space and the finish was excellent. Fixed price as promised.", author: "Priya S.", location: "Tarneit", consentConfirmed: false },
      { quote: "Finally found a builder who actually knows the Wyndham council requirements. No delays on permits, no surprises on cost.", author: "Michael R.", location: "Hoppers Crossing", consentConfirmed: false },
    ],
    faqs: [
      { q: "Do I need a building permit for a bathroom renovation in Melbourne's west?", a: "Most cosmetic bathroom renovations — retiling, vanity replacement, fixture upgrades — don't need a building permit. Moving plumbing, changing the layout or affecting the waterproofing membrane in a structural way can. Wyndham City, Maribyrnong and Hobsons Bay councils each have slightly different requirements. We handle permit assessment as part of every quote." },
      { q: "How long does a bathroom renovation take?", a: "A standard bathroom renovation typically takes 2–3 weeks from demolition to handover, and ensuites 10–14 days. Special-order tiles or fixtures are the most common cause of delay, so we recommend confirming selections before work begins." },
      { q: "What is the payment schedule?", a: "Staged milestone payments: a deposit on contract signing, a progress payment after the waterproofing inspection and the final payment on handover. No large upfront lump sums." },
      { q: "Can I use my bathroom during the renovation?", a: "No — the bathroom is out of service during the works. If it's your only bathroom, we'll discuss scheduling to keep the disruption as short as possible." },
      { q: "Do you renovate bathrooms in new estates like Tarneit and Point Cook?", a: "Yes. Many homes in Tarneit, Point Cook, Wyndham Vale and nearby estates have builder-grade bathrooms from the 2000s and 2010s that are now due for an upgrade. We check the plumbing layout, drainage and any council requirements at the site visit." },
      {
        q: "Who does the waterproofing?",
        a: isClaimApproved("waterproofingCertificate")
          ? "All our bathroom waterproofing is applied by a certified waterproofer to AS 3740. You receive a waterproofing certificate on completion — a document to keep with your property records."
          : "Waterproofing in bathrooms, ensuites and laundries must meet AS 3740, which the National Construction Code references. Ask us which membrane system will be used, who will apply it and what written record you'll receive — we'll answer before you sign anything.",
      },
      { q: "How do I get started?", a: getStarted },
    ],
    finalCta: {
      heading: "Ready to renovate your bathroom?",
      body: join(quoteSentence, approvedSentences("bpcRegistration")),
      phoneLabel: "Call us",
    },
    relatedGuides: [
      { label: "Bathroom renovation cost guide for Melbourne", href: "/guides/bathroom-renovation-cost-melbourne" },
      { label: "How to choose a renovation builder in Melbourne", href: "/guides/how-to-choose-a-renovation-builder-melbourne" },
      { label: "Renovation quote comparison checklist", href: "/guides/renovation-quote-checklist-melbourne" },
      { label: "Do you need a permit to renovate in Victoria?", href: "/guides/renovation-permits-victoria" },
    ],
    relatedServices: [
      { label: "Kitchen renovations", href: "/kitchen-renovations-melbourne" },
      { label: "Interior painting", href: "/interior-painting-melbourne" },
      { label: "Home extensions", href: "/home-extensions-melbourne" },
    ],
    areasLabel: "Bathroom renovations",
    card: { title: "Bathrooms", blurb: "Ensuite refreshes to full rebuilds.", image: "bathroomAfter" },
  },

  extension: {
    slug: "extension",
    route: "/home-extensions-melbourne",
    name: "Home extensions",
    projectNoun: "home extension",
    schemaName: "Home extensions, Melbourne",
    serviceType: "Home Extension",
    meta: {
      title: "Home extensions Melbourne",
      description: join(
        "Ground-floor extensions, second storeys, granny flats and knockdown rebuilds across Melbourne, with permits and approvals coordinated.",
        approvedSentences("bpcRegistration"),
        quoteSentence,
      ),
    },
    socialImage: "socialExtensions",
    hero: {
      kicker: "Home extensions",
      title: "Home extensions in Melbourne",
      accent: "from ground floor to second storey",
      intro: join(
        "We build home extensions across Melbourne, from single-room additions to second storeys and knockdown rebuilds, and coordinate the permits and approvals. Serving Tarneit, Point Cook, Werribee, Hoppers Crossing, Dandenong and beyond.",
        approvedSentences("bpcRegistration"),
      ),
      image: "extension",
      ctaLabel: "Get a free quote",
    },
    cost: {
      heading: "How much does a home extension cost in Melbourne?",
      body: `Home extensions in Melbourne generally cost $1,800 to $4,500 or more per square metre, depending on the type of extension, structural complexity and finishes. A 50–80 m² ground-floor extension often lands around $150,000–$250,000, and second storeys cost more because of the extra structural engineering. Your ${quoteKind} breaks the work down line by line.`,
    },
    types: {
      heading: "Extensions we build",
      items: [
        { title: "Ground-floor extension", desc: "Expand outward for open-plan living, extra bedrooms or a larger kitchen." },
        { title: "Second-storey addition", desc: "Build up when you can't build out." },
        { title: "Granny flat / DPU", desc: "A dependent person's unit or rental space, self-contained and built with the approvals it needs." },
        { title: "Knockdown rebuild", desc: "Start fresh on your existing block with a new home." },
        { title: "Garage conversion", desc: "Turn an under-used garage into living space, a home office or a studio." },
      ],
    },
    process: {
      heading: "How an extension runs",
      steps: [
        { title: "Free consultation", desc: "Site visit, your brief and an initial feasibility check." },
        { title: "Design & permits", desc: quoteStep("plus architectural plans and council submissions") },
        { title: "Site preparation", desc: "Demolition if needed, excavation and footings." },
        { title: "Structural frame", desc: "Timber or steel frame erected and roof installed." },
        { title: "Lock-up", desc: "External cladding, windows and doors — weather-tight." },
        { title: "Internal fit-out", desc: "Plumbing, electrical, plastering, flooring and painting." },
        { title: "Finishing & fixtures", desc: "Kitchen, bathroom, cabinetry and final touches." },
        { title: "Handover", desc: "Final inspection and the required completion paperwork, then a full walkthrough." },
      ],
    },
    pricing: {
      rows: [
        { scope: "Ground-floor extension", range: "$1,800 – $3,000/m²" },
        { scope: "Second-storey addition", range: "$2,500 – $4,500/m²" },
        { scope: "Granny flat (60 m²)", range: "$120,000 – $180,000" },
        { scope: "Knockdown rebuild", range: "$350,000 – $600,000+" },
      ],
      note: "Prices vary with site conditions, structural requirements, material selections and planning overlays.",
      low: 80000,
      high: 600000,
    },
    // OWNER: set consentConfirmed only after matching each quote to a real
    // customer and getting their permission to publish it.
    testimonials: [
      { quote: "Konntey added a second storey to our Tarneit home. They handled all the council approvals and the build was completed on schedule. Our home feels brand new.", author: "Raj P.", location: "Tarneit", consentConfirmed: false },
      { quote: "We needed more space for our growing family. Konntey extended our ground floor with a new master suite and open-plan living. Couldn't be happier.", author: "Sarah L.", location: "Point Cook", consentConfirmed: false },
      { quote: "Built a granny flat in our backyard in Werribee. The team managed everything from permits to final handover. Professional and fair pricing.", author: "Tony M.", location: "Werribee", consentConfirmed: false },
    ],
    faqs: [
      { q: "Do I need a building permit for a home extension?", a: "Yes — home extensions in Victoria need a building permit, and many also need a planning permit depending on overlays, setbacks and scope. We coordinate the permit applications, council liaison and documentation, and your quote shows what's included." },
      { q: "How long does a home extension take?", a: "A standard ground-floor extension typically takes 12–16 weeks from slab to handover, second storeys 16–24 weeks and knockdown rebuilds 6–9 months. Planning permit times vary by council and application, so ask your council or surveyor for current estimates." },
      { q: "Can I live at home during the extension?", a: "For ground-floor extensions, usually yes, with dust and noise management. For second storeys you can often stay during the early stages but may need to move out for a few weeks while the roof is off and structural work is under way. We'll advise case by case." },
      { q: "How much does a home extension cost per square metre?", a: "Ground-floor extensions typically cost $1,800–$3,000/m² depending on finishes. Second storeys range from $2,500–$4,500/m² because of the extra structural work. These are guide prices — every project is quoted individually with line-item pricing." },
      { q: "Do you handle council approvals?", a: "Yes. We coordinate architectural drawings, engineering, energy ratings and council submissions with your building surveyor and council — for example Wyndham City, Casey, Hume or Brimbank." },
      { q: "What's included in your quote?", a: "Everything from demolition to handover: structural engineering, permits, all trades (framing, plumbing, electrical, plastering, tiling, painting), project management, site supervision and rubbish removal. Fixtures and fittings are selected by you within agreed allowances." },
      { q: "How do I get started?", a: getStarted },
    ],
    finalCta: {
      heading: "Ready to extend your home?",
      body: join(quoteSentence, approvedSentences("bpcRegistration")),
      phoneLabel: "Call us",
    },
    relatedGuides: [
      { label: "Home extension vs moving house: which adds more value?", href: "/guides/home-extension-vs-moving-house" },
      { label: "Do you need a permit to renovate in Victoria?", href: "/guides/renovation-permits-victoria" },
      { label: "How to choose a renovation builder in Melbourne", href: "/guides/how-to-choose-a-renovation-builder-melbourne" },
      { label: "Renovation quote comparison checklist", href: "/guides/renovation-quote-checklist-melbourne" },
    ],
    relatedServices: [
      { label: "Kitchen renovations", href: "/kitchen-renovations-melbourne" },
      { label: "Bathroom renovations", href: "/bathroom-renovations-melbourne" },
      { label: "Decks & pergolas", href: "/decks-pergolas-melbourne" },
    ],
    areasLabel: "Home extensions",
    card: { title: "Extensions", blurb: "Ground floor, second storey and granny flats.", image: "extension" },
  },

  "deck-pergola": {
    slug: "deck-pergola",
    route: "/decks-pergolas-melbourne",
    name: "Decks & pergolas",
    projectNoun: "deck or pergola",
    schemaName: "Deck and pergola construction, Melbourne",
    serviceType: "Deck Building",
    meta: {
      title: "Deck & pergola builders Melbourne",
      description: join(
        "Timber and composite decks, pergolas, carports and outdoor rooms across Melbourne, in merbau, spotted gum or composite.",
        approvedSentences("bpcRegistration"),
        quoteSentence,
      ),
    },
    socialImage: "socialDecks",
    hero: {
      kicker: "Decks & pergolas",
      title: "Deck and pergola builders in Melbourne",
      accent: "outdoor living, built for the weather",
      intro: join(
        "We design and build decks, pergolas and outdoor living spaces across Melbourne, in merbau, spotted gum or composite.",
        approvedSentences("bpcRegistration", "noSubcontractors"),
      ),
      image: "outdoor",
      ctaLabel: "Get a free quote",
    },
    cost: {
      heading: "How much does a deck cost in Melbourne?",
      body: `Decks in Melbourne generally cost $320–$650 per square metre, depending on timber species, deck height and site complexity. A typical 25 m² merbau deck is around $8,000–$14,000 installed. Pergolas range from about $8,000 for a basic timber structure to $30,000+ for large steel designs with louvres. You'll get a ${quoteKind} after the site visit.`,
    },
    types: {
      heading: "Outdoor projects we build",
      items: [
        { title: "Timber decking", desc: "Merbau, spotted gum or blackbutt hardwood decks suited to Australian conditions." },
        { title: "Composite decking", desc: "Low-maintenance boards with no oiling or splinters; many ranges carry a manufacturer warranty." },
        { title: "Pergolas & shade structures", desc: "Timber or steel pergolas with optional louvres, shade sails or polycarbonate roofing." },
        { title: "Carports", desc: "Freestanding or attached, in steel or timber, built with the approvals they need." },
        { title: "Alfresco & outdoor rooms", desc: "Outdoor living areas with lighting, ceiling fans and weatherproof finishes." },
        { title: "Deck restoration", desc: "Sand, repair and re-oil an existing deck without a full rebuild." },
      ],
    },
    process: {
      heading: "How a deck or pergola build runs",
      steps: [
        { title: "Free consultation", desc: "Site visit, measure-up, timber options and design." },
        { title: "Design & quote", desc: quoteStep() },
        { title: "Permits", desc: "If required, we coordinate the building surveyor and any planning approval." },
        { title: "Site preparation", desc: "Ground levelling and stump or pier installation." },
        { title: "Frame & bearers", desc: "Structural frame built to Australian standards." },
        { title: "Decking & finishing", desc: "Boards laid, sanded and oiled or sealed." },
        { title: "Pergola & extras", desc: "Pergola, balustrading, steps and lighting fitted." },
        { title: "Handover", desc: "Final clean, maintenance guide and walkthrough." },
      ],
    },
    pricing: {
      rows: [
        { scope: "Timber deck (merbau)", range: "$320 – $550/m²" },
        { scope: "Timber deck (spotted gum)", range: "$400 – $650/m²" },
        { scope: "Composite deck", range: "$350 – $600/m²" },
        { scope: "Pergola (timber)", range: "$8,000 – $20,000" },
        { scope: "Pergola (steel)", range: "$12,000 – $30,000" },
      ],
      note: "Prices vary with timber species, deck height, site access and extras like balustrading or built-in seating.",
      low: 5000,
      high: 60000,
    },
    // OWNER: set consentConfirmed only after matching each quote to a real
    // customer and getting their permission to publish it.
    testimonials: [
      { quote: "Konntey built a 40sqm Merbau deck at our Tarneit home. Beautiful finish, built in under two weeks. The neighbours are jealous.", author: "Mark D.", location: "Tarneit", consentConfirmed: false },
      { quote: "We wanted an alfresco area with a pergola and ceiling fan. Konntey designed and built exactly what we envisioned. Fair price too.", author: "Lisa C.", location: "Point Cook", consentConfirmed: false },
      { quote: "Had an old deck that was falling apart. The team stripped it back, replaced the rotted bearers, and re-decked in spotted gum. Looks incredible.", author: "Chris W.", location: "Hoppers Crossing", consentConfirmed: false },
    ],
    faqs: [
      { q: "Do I need a building permit for a deck or pergola?", a: "It depends on how the structure is built, not just its height. A deck on a structural subfloor — stumps or footings with bearers and joists — generally needs a building permit, while decking laid directly onto an existing slab is treated differently. Pergolas, verandahs and front-facing structures have their own rules, and overlays can trigger a planning permit. We assess what your project needs at the quoting stage and confirm it with a registered building surveyor before work starts." },
      { q: "How long does a deck take to build?", a: "A standard 20–40 m² deck typically takes 5–8 working days. Larger decks with pergolas or complex designs can take 2–3 weeks. Weather is the main variable — we don't lay timber in the rain." },
      { q: "What timber do you recommend?", a: "For Melbourne's climate, merbau (good-value hardwood with natural termite resistance) or spotted gum (premium and very durable). For low maintenance, composite decking needs no oiling." },
      { q: "How often does a timber deck need oiling?", a: "Every 12–18 months to maintain colour and protection. We provide a maintenance guide at handover and can arrange annual maintenance if you prefer." },
      { q: "Do you build on sloping blocks?", a: "Yes. Elevated decks on sloping blocks need a steel or timber subframe designed for the gradient, and usually a building permit. We'll assess your site at the consultation." },
      { q: "What's included in your deck quote?", a: "All materials, labour, stumps or piers, frame, decking boards, finishing (oil or seal), steps if needed and site clean-up. Balustrading, pergolas and lighting are quoted as add-ons." },
      { q: "How do I get started?", a: getStarted },
    ],
    finalCta: {
      heading: "Ready for a new outdoor space?",
      body: join(quoteSentence, approvedSentences("bpcRegistration")),
      phoneLabel: "Call us",
    },
    relatedGuides: [
      { label: "Do you need a permit to renovate in Victoria?", href: "/guides/renovation-permits-victoria" },
      { label: "How to choose a renovation builder in Melbourne", href: "/guides/how-to-choose-a-renovation-builder-melbourne" },
      { label: "Renovation quote comparison checklist", href: "/guides/renovation-quote-checklist-melbourne" },
    ],
    relatedServices: [
      { label: "Home extensions", href: "/home-extensions-melbourne" },
      { label: "Interior painting", href: "/interior-painting-melbourne" },
      { label: "Kitchen renovations", href: "/kitchen-renovations-melbourne" },
    ],
    areasLabel: "Decks and pergolas",
    card: { title: "Outdoor living", blurb: "Decks, pergolas and alfresco areas.", image: "outdoor" },
  },

  painting: {
    slug: "painting",
    route: "/interior-painting-melbourne",
    name: "Interior & exterior painting",
    projectNoun: "painting project",
    schemaName: "Interior and exterior painting, Melbourne",
    serviceType: "House Painting",
    meta: {
      title: "Interior & exterior painting Melbourne",
      description: join(
        "Interior and exterior house painting across Melbourne, with careful preparation, clean lines and colour advice included.",
        quoteSentence,
      ),
    },
    socialImage: "socialPainting",
    hero: {
      kicker: "Painting",
      title: "Interior and exterior painting in Melbourne",
      accent: "sharp lines, clean finishes",
      intro: "We paint homes across Melbourne, from single feature walls to full interior and exterior repaints, with quality paints, careful preparation and colour advice included. Serving Tarneit, Point Cook, Werribee, Hoppers Crossing and surrounding suburbs.",
      image: "interior",
      ctaLabel: "Get a free quote",
    },
    cost: {
      heading: "How much does house painting cost in Melbourne?",
      body: isClaimApproved("fixedPriceQuotes")
        ? "Interior painting in Melbourne generally costs $15–$35 per square metre depending on surface condition and paint quality. A full 3-bedroom interior is around $4,000–$8,000 including ceilings, walls and trims, and exterior repaints start from about $4,000 for a single storey. All our quotes are fixed-price — no hourly rates."
        : `Interior painting in Melbourne generally costs $15–$35 per square metre depending on surface condition and paint quality. A full 3-bedroom interior is around $4,000–$8,000 including ceilings, walls and trims, and exterior repaints start from about $4,000 for a single storey. You'll get a ${quoteKind} after an on-site inspection.`,
    },
    types: {
      heading: "Painting we do",
      items: [
        { title: "Full interior painting", desc: "Walls, ceilings, trims and doors — a complete interior refresh." },
        { title: "Exterior painting", desc: "Weatherboard, render or brick: prep, prime and a two-coat finish." },
        { title: "Feature walls & accents", desc: "Statement walls, two-tone designs and dark colours done right." },
        { title: "Renovation painting", desc: "Painting as part of a kitchen, bathroom or whole-home renovation." },
        { title: "Ceiling & cornice", desc: "Flat white ceilings, cornice painting and plaster repair." },
        { title: "Cabinet & joinery painting", desc: "Spray-finished kitchen cabinets, built-in wardrobes and timber joinery." },
      ],
    },
    process: {
      heading: "How a paint job runs",
      steps: [
        { title: "Free quote", desc: "On-site inspection, measure-up, colours and finishes." },
        { title: "Colour advice", desc: "Help choosing colours for your space and lighting." },
        { title: "Surface preparation", desc: "Fill holes, sand, caulk gaps and mask edges." },
        { title: "Prime", desc: "Primer on new surfaces and stain-block where needed." },
        { title: "First coat", desc: "Even application with quality paints such as Dulux or Taubmans." },
        { title: "Second coat", desc: "Full coverage for a durable finish." },
        { title: "Detail work", desc: "Cut-in edges, trims, doors and touch-ups." },
        { title: "Handover", desc: "Final inspection, clean-up and leftover paint for touch-ups." },
      ],
    },
    pricing: {
      rows: [
        { scope: "Single room (walls + ceiling)", range: "$400 – $800" },
        { scope: "Full house interior (3-bed)", range: "$4,000 – $8,000" },
        { scope: "Full house interior (4-bed)", range: "$6,000 – $12,000" },
        { scope: "Exterior (single storey)", range: "$4,000 – $10,000" },
        { scope: "Exterior (double storey)", range: "$8,000 – $18,000" },
      ],
      note: "Prices depend on ceiling height, surface condition, number of colours and access.",
      low: 400,
      high: 18000,
    },
    // OWNER: set consentConfirmed only after matching each quote to a real
    // customer and getting their permission to publish it.
    testimonials: [
      { quote: "Konntey painted our entire 4-bedroom home in Tarneit. Sharp lines, no mess, and they even helped us pick the perfect grey for the living room. Couldn't be happier.", author: "Neha R.", location: "Tarneit", consentConfirmed: false },
      { quote: "Had the exterior of our weatherboard house repainted in Werribee. The prep work was meticulous — filled every crack and gap. Looks brand new.", author: "John B.", location: "Werribee", consentConfirmed: false },
      { quote: "We used Konntey for all the painting on our kitchen renovation. Spray-finished the cabinets and they look like a factory finish. Very professional.", author: "Karen T.", location: "Point Cook", consentConfirmed: false },
    ],
    faqs: [
      { q: "How much does it cost to paint a house interior in Melbourne?", a: `A full interior repaint for a standard 3-bedroom home in Melbourne typically costs $4,000–$8,000 depending on ceiling height, number of rooms, surface condition and paint quality. Larger 4–5 bedroom homes with high ceilings and feature walls range from $8,000–$15,000. You'll get a ${quoteKind} after an on-site inspection.` },
      { q: "How long does interior painting take?", a: "A standard 3-bedroom house typically takes 3–5 days for a full interior repaint including prep. Larger homes or those needing extensive plaster repair may take 5–8 days. We work room by room so you can stay in the house." },
      { q: "Do you supply the paint?", a: "Yes — quality paint such as Dulux or Taubmans is included in your quote: wash-and-wear for walls, ceiling flat for ceilings and semi-gloss for trims. If you prefer a particular brand or colour, just tell us." },
      { q: "Do you offer colour advice?", a: "Yes — colour advice is included with every painting quote. We'll help you choose colours that suit your lighting, flooring and furniture." },
      { q: "What preparation do you do before painting?", a: "Good prep is most of a good paint job. We fill nail holes, sand surfaces, caulk gaps between trims and walls, remove flaking paint, spot-prime stains and mask all edges." },
      { q: "Do you paint exteriors too?", a: "Yes — weatherboard, render, brick, fascia, gutters and window frames, using exterior-grade paints suited to Melbourne's UV and weather." },
      { q: "How do I get started?", a: getStarted },
    ],
    finalCta: {
      heading: "Ready for a fresh finish?",
      body: quoteSentence,
      phoneLabel: "Call us",
    },
    relatedGuides: [
      { label: "How to choose a renovation builder in Melbourne", href: "/guides/how-to-choose-a-renovation-builder-melbourne" },
      { label: "Renovation quote comparison checklist", href: "/guides/renovation-quote-checklist-melbourne" },
    ],
    relatedServices: [
      { label: "Kitchen renovations", href: "/kitchen-renovations-melbourne" },
      { label: "Bathroom renovations", href: "/bathroom-renovations-melbourne" },
      { label: "Home extensions", href: "/home-extensions-melbourne" },
    ],
    areasLabel: "Painting",
    card: { title: "Painting", blurb: "Interior and exterior repaints.", image: "interior" },
  },

  vastu: {
    slug: "vastu",
    route: "/vastu-renovations-melbourne",
    name: "Vastu renovations",
    projectNoun: "Vastu renovation",
    schemaName: "Vastu-compliant home renovations, Melbourne",
    serviceType: "Vastu Renovation",
    meta: {
      title: "Vastu-compliant renovations Melbourne",
      description: join(
        "Kitchen, bathroom, entrance and whole-home renovations planned around Vastu Shastra principles and built to Australian standards across Melbourne.",
        approvedSentences("ownershipHeritage"),
      ),
    },
    socialImage: "socialVastu",
    hero: {
      kicker: "Vastu renovations",
      title: "Vastu-compliant renovations in Melbourne",
      accent: "tradition meets modern living",
      intro: join(
        "We plan and build renovations around Vastu Shastra principles — kitchen, bathroom, entrance and pooja room placement — while meeting Australian building standards.",
        approvedSentences("ownershipHeritage"),
      ),
      image: "heroMain",
      ctaLabel: "Request a Vastu renovation quote",
    },
    principles: {
      heading: "Key Vastu directions we work with",
      intro: "Every room has an ideal directional placement under Vastu Shastra. We plan renovations so your living spaces follow these principles where your home allows.",
      items: [
        { title: "Kitchen placement", desc: "Southeast (Agni) corner for cooking, aligning the fire element with its traditional direction." },
        { title: "Bathroom & toilet direction", desc: "Northwest or west placement, keeping water away from the wealth and health zones." },
        { title: "Main entrance", desc: "North- or east-facing entrances. Extensions and porticos can be designed to achieve this." },
        { title: "Master bedroom", desc: "Southwest corner for stability, with the head facing south or west while sleeping." },
        { title: "Pooja room", desc: "Northeast (Ishanya) corner, with proper ventilation and lighting." },
        { title: "Living & open plan", desc: "North or east orientation to maximise natural light." },
      ],
    },
    types: {
      heading: "Vastu renovation services",
      items: [
        { title: "Vastu kitchen renovation", desc: "Relocate or redesign the kitchen toward the southeast, with stove, sink and storage placed accordingly." },
        { title: "Vastu bathroom renovation", desc: "Bathroom placement and drainage direction planned around Vastu, including toilet, shower and vanity positions." },
        { title: "Whole-home Vastu renovation", desc: "Room swaps, entrance changes and layout changes to bring your home into alignment." },
        { title: "Vastu extension design", desc: "New extensions planned with Vastu principles from the start." },
        { title: "Pooja room construction", desc: "Purpose-built prayer rooms in the right zone, with suitable materials, lighting and ventilation." },
        ...(isClaimApproved("vastuProvider")
          ? [{ title: "Vastu assessment only", desc: "Not ready to renovate? A standalone assessment of your current home with recommendations." }]
          : []),
      ],
    },
    process: {
      heading: "How a Vastu renovation runs",
      steps: [
        isClaimApproved("vastuProvider")
          ? { title: "Vastu assessment", desc: "On-site compass reading, floor plan analysis and deficiencies identified." }
          : { title: "Brief & orientation", desc: "On-site compass reading and floor plan review, with your consultant's recommendations if you have them." },
        { title: "Priorities", desc: "Agree which corrections matter most to you and what each involves." },
        { title: "Design proposal", desc: "Plans that follow Vastu while meeting building codes." },
        { title: "Quote", desc: quoteStep() },
        { title: "Permits", desc: "We coordinate approvals if structural changes are needed." },
        { title: "Construction", desc: "Respectful, clean work that recognises the cultural significance." },
        isClaimApproved("vastuProvider")
          ? { title: "Vastu verification", desc: "Post-construction check to confirm the alignments." }
          : { title: "Alignment check", desc: "We walk through the finished work against the agreed plan." },
        { title: "Handover & Griha Pravesh", desc: "Handover planned around an auspicious date if you prefer." },
      ],
    },
    // OWNER: set consentConfirmed only after matching each quote to a real
    // customer and getting their permission to publish it.
    testimonials: [
      { quote: "We wanted our kitchen moved to the southeast corner. Konntey understood exactly why and made it happen without us having to explain Vastu basics. So refreshing.", author: "Priya & Ankit M.", location: "Tarneit", consentConfirmed: false },
      { quote: "Built a proper pooja room in the northeast corner of our home. The team was respectful, kept shoes off inside, and delivered exactly what we envisioned.", author: "Sunita P.", location: "Truganina", consentConfirmed: false },
      { quote: "Our main entrance was facing south. Konntey designed a new portico and entry that redirects energy through an east-facing approach. The difference is noticeable.", author: "Devang S.", location: "Point Cook", consentConfirmed: false },
    ],
    faqs: [
      {
        q: "Who provides the Vastu advice?",
        a: `${claimText("vastuProvider")} We'll explain where a recommendation affects structure, plumbing or permits, and what it adds to the cost.`,
      },
      { q: "Can Vastu corrections be done without major renovation?", a: "Sometimes — relocating a stove, changing a door swing or adding a water feature can address minor deficiencies. Major corrections such as moving a kitchen or changing the entrance usually need renovation. We'll tell you honestly what's achievable." },
      { q: "How much does a Vastu renovation cost?", a: `It depends on scope. Relocating a kitchen to the southeast zone typically costs $25,000–$50,000, and a whole-home realignment can range from $50,000–$150,000+. You'll get a ${quoteKind} once the brief is clear.` },
      { q: "Can you time the handover for an auspicious date?", a: "Many families prefer Griha Pravesh or completion aligned with muhurat timing. Tell us your preferred date early and we'll plan the construction schedule around it wherever the build allows." },
      { q: "Do Australian building codes conflict with Vastu?", a: "Rarely. Most Vastu principles concern room placement, orientation and element positioning, none of which conflict with the National Construction Code. The main challenge is working within an existing footprint, which is where design comes in." },
      ...(isClaimApproved("languages")
        ? [{ q: "Can we discuss the project in Hindi or Gujarati?", a: `${claims.languages.approvedWording}. Just let us know your preference when you call or enquire.` }]
        : []),
    ],
    finalCta: {
      heading: "Ready to align your home with Vastu?",
      body: join(quoteSentence, approvedSentences("ownershipHeritage")),
      phoneLabel: isClaimApproved("languages") ? "Call us — we speak Hindi & Gujarati" : "Call us",
    },
    relatedGuides: [
      { label: "How to choose a renovation builder in Melbourne", href: "/guides/how-to-choose-a-renovation-builder-melbourne" },
      { label: "Do you need a permit to renovate in Victoria?", href: "/guides/renovation-permits-victoria" },
    ],
    relatedServices: [
      { label: "Kitchen renovations", href: "/kitchen-renovations-melbourne" },
      { label: "Bathroom renovations", href: "/bathroom-renovations-melbourne" },
      { label: "Home extensions", href: "/home-extensions-melbourne" },
    ],
    areasLabel: "Vastu renovations",
    card: { title: "Vastu renovations", blurb: "Layouts planned around Vastu Shastra.", image: "heroMain" },
  },
};

export const serviceList: ServiceContent[] = Object.values(services);

/** Services shown in the homepage chooser, in order. */
export const chooserServices: ServiceContent[] = [
  services.kitchen,
  services.bathroom,
  services.extension,
  services["deck-pergola"],
  services.painting,
];
