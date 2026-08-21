/**
 * Content source for the /guides hub. Each guide is plain structured data so
 * the index page, the article route, and the Article/BreadcrumbList JSON-LD all
 * read from one place. Adding a new article = appending one object here.
 *
 * Pricing figures intentionally mirror the ranges used across the service pages
 * so the site tells a single, consistent story. Nothing here is legal advice —
 * every guide points readers to confirm specifics with their council, a
 * registered building surveyor, or the Building and Plumbing Commission (BPC).
 */

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface GuideLink {
  label: string;
  href: string;
}

export interface GuideAuthor {
  /** Real person's name, supplied and approved by the owner. */
  name: string;
  /** e.g. "Founder, Konntey Home & Renovations". */
  role: string;
}

export interface Guide {
  slug: string;
  /** Display H1 on the article page. */
  title: string;
  /** <title> tag (kept ~55–60 chars; the "| Konntey H&R" template is appended). */
  metaTitle: string;
  /** Meta description (~150–160 chars). */
  description: string;
  /** Short summary shown on the guides index card. */
  excerpt: string;
  category: string;
  readMinutes: number;
  datePublished: string;
  dateModified: string;
  /**
   * OWNER TODO: byline shown as "Written by: [Name], [Role]". Omitted from
   * the page and schema until a real author is supplied — never invented.
   */
  author?: GuideAuthor;
  /**
   * Official sources backing regulatory/permit/cost claims (council, VBA,
   * Building and Plumbing Commission, consumer.vic.gov.au …). Rendered
   * prominently when present; strongly recommended for every cost/permit
   * guide.
   */
  sources?: GuideLink[];
  /** Opening paragraphs shown before the first sub-heading. */
  intro: string[];
  sections: GuideSection[];
  keyTakeaways: string[];
  /** Internal links surfaced at the foot of the article. */
  related: GuideLink[];
}

const BASE = "https://www.konnteyhomerenovations.com.au";

export const guides: Guide[] = [
  {
    slug: "kitchen-renovation-cost-melbourne",
    title: "Kitchen Renovation Cost Guide Melbourne (2026)",
    metaTitle: "Kitchen Renovation Cost Guide Melbourne (2026)",
    description:
      "What a kitchen renovation really costs in Melbourne in 2026 — from budget refreshes to full open-plan rebuilds — plus where the money goes and how to save.",
    excerpt:
      "From a $15k cabinet refresh to an $80k open-plan rebuild — a realistic 2026 breakdown of what kitchen renovations cost in Melbourne, and what drives the price.",
    category: "Cost Guides",
    readMinutes: 7,
    datePublished: "2026-07-01",
    dateModified: "2026-07-01",
    intro: [
      "A kitchen renovation is one of the highest-return upgrades you can make to a Melbourne home — but \"how much does it cost?\" almost always gets the same frustrating answer: it depends. This guide replaces that with real 2026 ranges, an honest breakdown of where each dollar goes, and the choices that move the price up or down.",
      "The figures below reflect what western and southeastern Melbourne homeowners are actually paying, from Tarneit and Point Cook new-estate kitchens to full strip-outs in established Werribee and Hoppers Crossing homes.",
    ],
    sections: [
      {
        heading: "Kitchen renovation cost by scope",
        paragraphs: [
          "Most Melbourne kitchen renovations fall into three tiers. Where you land depends less on the size of the room and more on whether you're keeping the existing layout or changing it.",
        ],
        bullets: [
          "Cabinet & benchtop refresh — $15,000 to $25,000. New doors, benchtop and splashback over the existing footprint. Best value if the layout already works.",
          "Full kitchen renovation — $25,000 to $45,000. Complete strip-out, new cabinetry, stone benchtop, new appliances and finishes.",
          "Premium open-plan redesign — $45,000 to $80,000+. Removing walls, an island bench, butler's pantry and high-end fixtures.",
        ],
      },
      {
        heading: "Where the money actually goes",
        paragraphs: [
          "Understanding the split helps you decide where to spend and where to save. On a typical full renovation, cabinetry and benchtops together are usually the single largest line item, followed by labour and trades.",
        ],
        bullets: [
          "Cabinetry — the biggest variable. Flat-pack is cheapest, custom joinery costs more but fits awkward spaces and lasts longer.",
          "Benchtops — laminate is the budget option; engineered stone and natural stone sit at the top.",
          "Appliances — you control this entirely, from mid-range to premium European brands.",
          "Trades & labour — electrical, plumbing, tiling, plastering and project management.",
          "Structural work — removing a wall for open-plan living adds cost and may need a permit and engineering.",
        ],
      },
      {
        heading: "What pushes the price up",
        bullets: [
          "Moving plumbing or the sink to a new location.",
          "Removing load-bearing walls (engineering + permit).",
          "Stone benchtops with waterfall ends and full-height splashbacks.",
          "Custom joinery, integrated appliances and soft-close everything.",
          "Older homes: asbestos checks and rectifying hidden damage found at demolition.",
        ],
      },
      {
        heading: "How to save without cutting corners",
        bullets: [
          "Keep the existing layout — plumbing and gas stay put, which saves thousands.",
          "Choose a quality engineered stone in a standard thickness rather than exotic natural stone.",
          "Lock in every selection before work starts to avoid costly mid-project changes.",
          "Get an itemised fixed-price quote so you can see exactly what each upgrade adds.",
        ],
      },
      {
        heading: "Do you need a permit?",
        paragraphs: [
          "Most cosmetic kitchen work — new cabinets, benchtops, splashbacks and like-for-like appliance swaps — does not need a building permit. Removing walls, relocating plumbing or significant electrical work can. Requirements vary between councils, so confirm with a registered building surveyor before you commit. Our permit guide covers this in detail.",
        ],
      },
    ],
    keyTakeaways: [
      "Budget $15k–$25k for a refresh, $25k–$45k for a full renovation, and $45k+ for open-plan.",
      "Cabinetry and benchtops are the biggest cost drivers — this is where your choices matter most.",
      "Keeping the existing layout is the single biggest way to control cost.",
      "Always get an itemised, fixed-price quote so upgrades are transparent.",
    ],
    related: [
      { label: "Kitchen Renovations Melbourne", href: "/kitchen-renovations-melbourne" },
      { label: "Do You Need a Permit to Renovate in Victoria?", href: "/guides/renovation-permits-victoria" },
      { label: "How to Choose a Renovation Builder", href: "/guides/how-to-choose-a-renovation-builder-melbourne" },
      { label: "Get a Free Quote", href: "/quote" },
    ],
  },
  {
    slug: "bathroom-renovation-cost-melbourne",
    title: "Bathroom Renovation Cost Guide Melbourne (2026)",
    metaTitle: "Bathroom Renovation Cost Guide Melbourne (2026)",
    description:
      "How much a bathroom renovation costs in Melbourne in 2026 — ensuite to full remodel — plus waterproofing, hidden costs in older homes, and how to budget.",
    excerpt:
      "Ensuite refresh or full remodel? Real 2026 bathroom renovation costs for Melbourne, why waterproofing matters, and the hidden costs that catch owners of older homes.",
    category: "Cost Guides",
    readMinutes: 7,
    datePublished: "2026-07-01",
    dateModified: "2026-07-01",
    intro: [
      "Bathrooms are small rooms with big budgets. Every square metre involves waterproofing, tiling, plumbing and fixtures — so cost per square metre is higher than almost any other room in the house. This guide sets out realistic 2026 ranges for Melbourne and explains what you're paying for.",
      "It also covers the part most quotes gloss over: the hidden costs that surface once demolition begins, especially in the 1970s–90s brick homes common across Werribee, Hoppers Crossing and Frankston.",
    ],
    sections: [
      {
        heading: "Bathroom renovation cost by scope",
        bullets: [
          "Small bathroom / ensuite — $10,000 to $20,000. Compact footprint, standard fixtures, efficient layout.",
          "Full bathroom renovation — $20,000 to $35,000. Complete strip-out, new waterproofing, tiling, vanity and fittings.",
          "Premium full remodel — $35,000 to $45,000+. Freestanding bath, floor-to-ceiling tiling, frameless glass and premium tapware.",
        ],
      },
      {
        heading: "Where the money goes",
        paragraphs: [
          "Unlike a kitchen, much of a bathroom's cost is in labour and compliance rather than the visible fittings. Waterproofing and tiling are skilled, time-intensive trades — and getting them wrong is expensive.",
        ],
        bullets: [
          "Waterproofing — a legal requirement, certified to AS/NZS 3740. Non-negotiable and worth paying to get right.",
          "Tiling — labour-heavy; large-format tiles and full-height walls add time and cost.",
          "Plumbing — relocating the toilet, shower or vanity is far dearer than keeping fixtures in place.",
          "Fixtures & tapware — the range from builder-grade to premium is enormous.",
          "Waterproofing certificate — issued on completion and kept with your property records.",
        ],
      },
      {
        heading: "Hidden costs in older homes",
        paragraphs: [
          "The most common cause of a bathroom blowout isn't a change of mind — it's what's found behind the old tiles.",
        ],
        bullets: [
          "Water damage to timber framing or subfloor, hidden by the old membrane.",
          "Asbestos in wall sheeting or flooring in homes built before the late 1980s (requires licensed removal).",
          "Outdated or corroded pipework that has to be replaced to current standard.",
          "Uneven or rotten floors that need re-sheeting before tiling.",
        ],
      },
      {
        heading: "How long does it take?",
        paragraphs: [
          "A standard bathroom renovation runs about 2–3 weeks from demolition to handover; an ensuite can be done in 10–14 days. The biggest cause of delay is special-order tiles or fixtures arriving late — confirm every selection before work begins.",
        ],
      },
      {
        heading: "Permits and compliance",
        paragraphs: [
          "Cosmetic swaps — retiling, a new vanity, fixture upgrades — generally don't need a permit. Moving plumbing or altering the layout in a way that affects the waterproofing membrane can. Waterproofing itself must always be certified. See our Victorian permit guide for the detail, and confirm with a registered building surveyor.",
        ],
      },
    ],
    keyTakeaways: [
      "Budget $10k–$20k for an ensuite, $20k–$35k for a full bathroom, and $35k+ for a premium remodel.",
      "Waterproofing and tiling — not the fittings — are where much of the cost sits.",
      "Older homes carry real risk of hidden water damage or asbestos; build a contingency in.",
      "Always insist on a waterproofing certificate on completion.",
    ],
    related: [
      { label: "Bathroom Renovations Melbourne", href: "/bathroom-renovations-melbourne" },
      { label: "Do You Need a Permit to Renovate in Victoria?", href: "/guides/renovation-permits-victoria" },
      { label: "Kitchen Renovation Cost Guide", href: "/guides/kitchen-renovation-cost-melbourne" },
      { label: "Get a Free Quote", href: "/quote" },
    ],
  },
  {
    slug: "renovation-permits-victoria",
    title: "Do You Need a Permit to Renovate in Victoria?",
    metaTitle: "Do You Need a Permit to Renovate in Victoria?",
    description:
      "A plain-English guide to building and planning permits for Victorian renovations — what needs one, what doesn't, wet areas, decks, and who issues them.",
    excerpt:
      "Building permit, planning permit, or neither? A plain-English guide to when Victorian renovations need approval — kitchens, bathrooms, decks and extensions.",
    category: "Permits & Process",
    readMinutes: 8,
    datePublished: "2026-07-01",
    dateModified: "2026-07-01",
    intro: [
      "Permits are the part of renovating that causes the most confusion — and the most expensive mistakes when skipped. This guide explains, in plain English, when a Victorian renovation needs approval, when it doesn't, and who actually issues permits.",
      "Important: this is general information, not legal advice. Rules are applied by individual councils and registered building surveyors, and they change. Always confirm your specific project before work starts.",
    ],
    sections: [
      {
        heading: "Building permit vs planning permit",
        paragraphs: [
          "These are two different things and a project can need one, both, or neither.",
        ],
        bullets: [
          "A building permit is about how you build — structural safety, waterproofing, energy and compliance with the building code. Issued by a registered building surveyor.",
          "A planning permit is about what and where you build — how a change affects the neighbourhood, overlays, heritage and setbacks. Issued through your local council.",
        ],
      },
      {
        heading: "Work that generally needs a building permit",
        bullets: [
          "Home extensions and adding rooms.",
          "Removing or altering load-bearing (structural) walls.",
          "New garages, carports and many sheds.",
          "Decks and verandahs above a certain height off the ground.",
          "Re-stumping or underpinning.",
          "Significant plumbing or drainage changes.",
        ],
      },
      {
        heading: "Work that generally does not",
        paragraphs: [
          "Most cosmetic work is exempt, which is why a lot of kitchen and bathroom refreshes proceed without a building permit.",
        ],
        bullets: [
          "Repainting, re-flooring and re-tiling.",
          "Like-for-like cabinetry, vanity and fixture replacement.",
          "Minor repairs and maintenance.",
          "Some low, ground-level decks below the height threshold (confirm this — it's the one people get wrong).",
        ],
      },
      {
        heading: "Wet areas and waterproofing",
        paragraphs: [
          "Even when a full permit isn't required, waterproofing in bathrooms, ensuites and laundries must be done to the Australian Standard (AS/NZS 3740) and certified. This protects your home and is checked at resale — never treat it as optional.",
        ],
      },
      {
        heading: "Decks and pergolas — the grey area",
        paragraphs: [
          "Decks are the most common source of confusion. As a rule of thumb, low decks close to the ground are often exempt, while decks above a set height, or those attached to the dwelling, usually need a building permit — and sometimes a planning permit depending on your overlays. Because the thresholds are specific and council-dependent, always check before you build rather than after.",
        ],
      },
      {
        heading: "Who issues permits, and who can help",
        paragraphs: [
          "Building permits are issued by registered building surveyors; planning permits go through your local council (for example Wyndham City, Casey, Greater Dandenong, Frankston or Cardinia Shire). A good renovation builder assesses what your project needs and manages the applications for you — at Konntey, permit assessment is part of every quote at no extra cost. You can also verify any builder's registration through the Building and Plumbing Commission (BPC).",
        ],
      },
    ],
    keyTakeaways: [
      "Building permits cover how you build; planning permits cover what and where — a project may need one, both or neither.",
      "Extensions, structural changes, garages and higher decks generally need a building permit.",
      "Most cosmetic refreshes don't — but waterproofing must always be certified.",
      "Decks are the classic grey area: always confirm the height threshold with a surveyor first.",
    ],
    related: [
      { label: "Home Extensions Melbourne", href: "/home-extensions-melbourne" },
      { label: "Decks & Pergolas Melbourne", href: "/decks-pergolas-melbourne" },
      { label: "Bathroom Renovation Cost Guide", href: "/guides/bathroom-renovation-cost-melbourne" },
      { label: "Get a Free Quote", href: "/quote" },
    ],
  },
  {
    slug: "home-extension-vs-moving-house",
    title: "Home Extension vs Moving House: Cost Comparison",
    metaTitle: "Home Extension vs Moving House: Cost Comparison",
    description:
      "Should you extend or move? A Melbourne cost comparison covering stamp duty, agent fees and extension prices — plus when each option actually makes sense.",
    excerpt:
      "Outgrown your home? Before you sell, compare the true cost of moving — stamp duty, fees, removalists — against extending. A Melbourne 2026 breakdown.",
    category: "Planning",
    readMinutes: 6,
    datePublished: "2026-07-01",
    dateModified: "2026-07-01",
    intro: [
      "When a family outgrows its home, the instinct is to start scrolling property listings. But moving carries large, often-underestimated costs that buy you nothing physical. Extending your current home is frequently the smarter financial move — this guide compares the two for Melbourne in 2026.",
      "Every situation is different, and the numbers below are illustrative. Use them to frame the decision, then get precise figures from a conveyancer and a fixed-price extension quote.",
    ],
    sections: [
      {
        heading: "The true cost of moving",
        paragraphs: [
          "The sticker price of your next home is only the start. The transaction costs of moving are substantial and, unlike a renovation, they don't add a single square metre to your living space.",
        ],
        bullets: [
          "Stamp duty (land transfer duty) — typically the largest cost, running well into the tens of thousands on a family home. Check the current rate with the State Revenue Office.",
          "Selling agent's commission and marketing.",
          "Conveyancing and legal fees on both the sale and purchase.",
          "Removalists, cleaning and connection fees.",
          "The intangible cost: new schools, new commute, leaving a community you like.",
        ],
      },
      {
        heading: "The cost of extending",
        paragraphs: [
          "Home extensions in Melbourne generally run from about $1,800 per square metre for a straightforward single-storey addition, up to $4,500+ per square metre for complex or high-spec work. A ground-floor family-room extension, a second storey or a granny flat each sit at different points on that scale.",
          "Crucially, that spend stays with you — it becomes extra bedrooms, a bigger kitchen or a second living area, and it adds to the value of a home you already like.",
        ],
      },
      {
        heading: "When extending wins",
        bullets: [
          "You like your location, street, schools and neighbours.",
          "Your block has room to build out or up.",
          "The gap between your needs and your home is a room or two, not a whole different lifestyle.",
          "Comparable larger homes nearby cost far more than the extension would.",
        ],
      },
      {
        heading: "When moving wins",
        bullets: [
          "You need a fundamentally different location (work, schools, family).",
          "Your block genuinely can't accommodate what you need.",
          "The finished value of the extended home would exceed the ceiling price for your street.",
        ],
      },
      {
        heading: "A simple way to decide",
        paragraphs: [
          "Add up the full cost of moving — stamp duty, agent fees, legals and removalists — and treat that as your \"do nothing but relocate\" number. Then get a fixed-price extension quote for the space you actually need. Very often the extension costs less than the transaction costs of moving alone, and you end up with more house instead of just a different one.",
        ],
      },
    ],
    keyTakeaways: [
      "Moving costs — led by stamp duty — can run into the tens of thousands and add no living space.",
      "Extensions generally cost $1,800–$4,500+ per square metre and stay with you as usable space and value.",
      "Extend when you love the location and just need more room; move when you need a different lifestyle.",
      "Compare the full cost of moving against a fixed-price extension quote before deciding.",
    ],
    related: [
      { label: "Home Extensions Melbourne", href: "/home-extensions-melbourne" },
      { label: "How to Choose a Renovation Builder", href: "/guides/how-to-choose-a-renovation-builder-melbourne" },
      { label: "Do You Need a Permit to Renovate in Victoria?", href: "/guides/renovation-permits-victoria" },
      { label: "Get a Free Quote", href: "/quote" },
    ],
  },
  {
    slug: "how-to-choose-a-renovation-builder-melbourne",
    title: "How to Choose a Renovation Builder in Melbourne",
    metaTitle: "How to Choose a Renovation Builder in Melbourne",
    description:
      "A practical checklist for hiring a renovation builder in Melbourne — registration, insurance, contracts, quotes and the red flags that signal trouble.",
    excerpt:
      "Registration, insurance, contracts and quotes — the checklist that separates a safe renovation builder from an expensive mistake. Plus the red flags to walk away from.",
    category: "Planning",
    readMinutes: 8,
    datePublished: "2026-07-01",
    dateModified: "2026-07-01",
    intro: [
      "Choosing the right builder is the single biggest factor in whether your renovation is a good experience or a costly one. Melbourne has thousands of operators, and the gap between the best and the worst is enormous. This checklist covers what to verify, what to ask, and the warning signs to walk away from.",
      "The regulatory points below are specific to Victoria — always confirm current requirements, as the rules and the regulator's name have changed in recent years.",
    ],
    sections: [
      {
        heading: "1. Verify registration and insurance",
        paragraphs: [
          "This is the non-negotiable first filter. In Victoria, domestic building work is regulated, and larger jobs require both a registered builder and insurance.",
        ],
        bullets: [
          "Confirm the builder or company is registered — you can check the public register held by the Building and Plumbing Commission (BPC).",
          "For domestic building work over $16,000, the builder must take out domestic building insurance (also called builder's warranty insurance).",
          "Ask for evidence of current public liability insurance.",
        ],
      },
      {
        heading: "2. Insist on a proper contract",
        paragraphs: [
          "In Victoria a written major domestic building contract is required for work over $10,000. It protects both sides — never rely on a handshake or an email thread for a job of any size.",
        ],
        bullets: [
          "A clear scope of works listing exactly what's included.",
          "A fixed price, or a clearly explained basis for any variations.",
          "A staged payment schedule tied to milestones — not a large upfront lump sum.",
          "Start and completion timeframes.",
        ],
      },
      {
        heading: "3. Compare itemised, fixed-price quotes",
        paragraphs: [
          "Get more than one quote, and make sure they're itemised so you're comparing like with like. A suspiciously low quote often means allowances that balloon later, or trades and materials left out.",
        ],
      },
      {
        heading: "4. Ask the right questions",
        bullets: [
          "Will you use your own trades or subcontractors, and who manages them?",
          "Who is my single point of contact during the build?",
          "How do you handle variations and unexpected issues found during works?",
          "Can I see recent projects like mine, and speak to those clients?",
          "How do you assess and manage permits?",
        ],
      },
      {
        heading: "5. Red flags to walk away from",
        bullets: [
          "Pressure for a large cash deposit before any contract is signed.",
          "Reluctance to put things in writing or provide registration details.",
          "A quote far below every other — it's rarely a bargain.",
          "No fixed address, no reviews, and no contactable references.",
          "Vague answers about insurance, permits or waterproofing certification.",
        ],
      },
      {
        heading: "6. Judge the communication",
        paragraphs: [
          "You'll be living with this relationship for weeks or months. A builder who is responsive, clear and honest during the quoting stage — when they're trying to win your job — is telling you how the whole project will run. Trust that signal.",
        ],
      },
    ],
    keyTakeaways: [
      "Verify registration on the BPC register and confirm domestic building insurance for work over $16,000.",
      "A written major domestic building contract is required in Victoria for work over $10,000.",
      "Compare itemised fixed-price quotes — the cheapest number is rarely the cheapest outcome.",
      "Poor communication and pressure for big cash deposits are your clearest red flags.",
    ],
    related: [
      { label: "Home Extensions Melbourne", href: "/home-extensions-melbourne" },
      { label: "Kitchen Renovations Melbourne", href: "/kitchen-renovations-melbourne" },
      { label: "Do You Need a Permit to Renovate in Victoria?", href: "/guides/renovation-permits-victoria" },
      { label: "Get a Free Quote", href: "/quote" },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function guideUrl(slug: string): string {
  return `${BASE}/guides/${slug}`;
}

export const GUIDES_BASE_URL = BASE;
