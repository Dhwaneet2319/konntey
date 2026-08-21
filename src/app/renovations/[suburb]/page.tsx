import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/chat/FloatingActions";
import LocalProofBlock from "@/components/LocalProofBlock";
import { getLocalProof, isSuburbIndexable } from "@/content/localProof";

type SuburbInfo = {
  name: string;
  nearby: string[];
  council: string;
  profile: string[];
  popular: string[];
};

const suburbs: Record<string, SuburbInfo> = {
  tarneit: {
    name: "Tarneit",
    nearby: ["Truganina", "Werribee", "Hoppers Crossing", "Wyndham Vale", "Manor Lakes"],
    council: "Wyndham City Council",
    profile: [
      "Tarneit is one of Australia's fastest-growing suburbs, and most of its housing was built in the last ten to twenty years. That first wave of builder-grade kitchens and bathrooms is now reaching the end of its life — laminate benchtops, basic tapware and standard-range tiles that are ready for an upgrade. We help Tarneit homeowners replace builder basics with stone benchtops, quality cabinetry and modern fittings that lift both daily living and resale value.",
      "Beyond kitchens and bathrooms, the most requested projects in Tarneit are alfresco decks and pergolas to make use of family-sized backyards, theatre-room conversions into extra bedrooms, and butler's pantry additions. Because we work in Tarneit every week, we know the standard layouts used by the major volume builders and can quote accurately without surprises.",
    ],
    popular: [
      "Builder-grade kitchen upgrades with stone benchtops",
      "Alfresco decks and pergolas for estate blocks",
      "Butler's pantry additions",
      "Theatre room to bedroom conversions",
    ],
  },
  truganina: {
    name: "Truganina",
    nearby: ["Tarneit", "Williams Landing", "Laverton", "Hoppers Crossing"],
    council: "Wyndham City Council",
    profile: [
      "Truganina's estates are among the newest in Melbourne's west, with open-plan layouts that already suit modern living. What most homes lack is the finishing touch — builder-grade splashbacks, basic benchtops and unlandscaped yards. Our most common Truganina projects turn a standard volume build into a personalised family home.",
      "Popular upgrades include waterfall stone benchtops and quality splashbacks, walk-in pantry fit-outs, feature-wall painting, and full outdoor living areas with merbau decking and pergolas. For newer homes still under builder warranty, we'll advise what's safe to modify now and what's better to wait on.",
    ],
    popular: [
      "Stone benchtop and splashback upgrades",
      "Walk-in pantry fit-outs",
      "Merbau decks and outdoor living areas",
      "Feature walls and premium repainting",
    ],
  },
  werribee: {
    name: "Werribee",
    nearby: ["Hoppers Crossing", "Wyndham Vale", "Point Cook", "Tarneit"],
    council: "Wyndham City Council",
    profile: [
      "Werribee is the established heart of Melbourne's west, and much of its housing dates from the 1970s to the 1990s. These solid brick-veneer homes have great bones but original kitchens and bathrooms that are well past their use-by date. Full strip-out renovations deliver dramatic transformations here — and add significant value in a suburb where buyer demand keeps climbing.",
      "Werribee's larger established blocks also make it ideal for home extensions. Whether it's a ground-floor extension for a growing family or fixing a chopped-up 1980s floor plan with an open-plan conversion, we manage everything from council permits through to handover.",
    ],
    popular: [
      "Full kitchen and bathroom strip-out renovations",
      "Open-plan conversions of older floor plans",
      "Ground-floor home extensions",
      "Exterior and interior repainting",
    ],
  },
  "hoppers-crossing": {
    name: "Hoppers Crossing",
    nearby: ["Werribee", "Tarneit", "Williams Landing", "Point Cook"],
    council: "Wyndham City Council",
    profile: [
      "Hoppers Crossing is classic 1970s and 80s brick-veneer territory — sturdy family homes with original bathrooms, dated kitchens and separate, closed-off living rooms. Our bread-and-butter work here is full bathroom strip-outs with new waterproofing, and open-plan conversions that knock through walls to bring kitchen, dining and living together.",
      "Many Hoppers Crossing homes sit on generous blocks with room for decks, pergolas and even extensions. With current prices in surrounding suburbs, renovating in Hoppers Crossing is one of the smartest-value moves in the west — you get an updated home without the cost of moving.",
    ],
    popular: [
      "Full bathroom rebuilds with new waterproofing",
      "Open-plan kitchen and living conversions",
      "Decks and pergolas on established blocks",
      "Home extensions",
    ],
  },
  "point-cook": {
    name: "Point Cook",
    nearby: ["Williams Landing", "Hoppers Crossing", "Werribee", "Laverton"],
    council: "Wyndham City Council",
    profile: [
      "Point Cook boomed through the 2000s, which means thousands of its homes are now fifteen to twenty-five years old — right in the renovation sweet spot. Kitchens and ensuites from that era look dated next to current builds, and the laminate-and-chrome finish of the mid-2000s is the most common thing we're asked to replace.",
      "We also do a lot of small-space work in Point Cook's townhouses — clever storage, space-maximising kitchen layouts and ensuite upgrades. On larger family blocks, alfresco areas and decks remain the most requested outdoor project.",
    ],
    popular: [
      "Mid-2000s kitchen and ensuite modernisations",
      "Townhouse and small-space kitchen layouts",
      "Alfresco areas and decks",
      "Vastu-compliant renovations",
    ],
  },
  "wyndham-vale": {
    name: "Wyndham Vale",
    nearby: ["Manor Lakes", "Werribee", "Tarneit", "Melton"],
    council: "Wyndham City Council",
    profile: [
      "Wyndham Vale has grown rapidly as one of the west's most affordable family suburbs, and many owners who bought new five to fifteen years ago are now ready to upgrade. We specialise in budget-conscious renovations here — cabinet and benchtop refreshes, bathroom updates and repainting that deliver maximum impact per dollar.",
      "For growing families staying put, we also build decks and pergolas, convert garages into living space and add butler's pantries. Every job gets the same fixed-price quote and project management whether it's a small refresh or a full renovation.",
    ],
    popular: [
      "Budget-conscious kitchen and bathroom refreshes",
      "Decks and pergolas",
      "Garage conversions",
      "Whole-home repainting",
    ],
  },
  "manor-lakes": {
    name: "Manor Lakes",
    nearby: ["Wyndham Vale", "Tarneit", "Werribee", "Melton"],
    council: "Wyndham City Council",
    profile: [
      "Manor Lakes is one of Melbourne's newest communities, so the work we do here looks different to older suburbs. Rather than gut renovations, Manor Lakes homeowners mostly ask us for finishing works: decks, pergolas and alfresco areas, landscaping structures, feature painting, and upgrades to builder-grade fixtures.",
      "If you've just had a home built and the backyard is still a blank slate, we design and build complete outdoor living spaces suited to new estate blocks — and we understand the developer design guidelines that can apply to front-facing works in newer estates.",
    ],
    popular: [
      "Complete outdoor living areas for new builds",
      "Decks, pergolas and alfresco areas",
      "Builder-grade fixture upgrades",
      "Feature painting",
    ],
  },
  "williams-landing": {
    name: "Williams Landing",
    nearby: ["Laverton", "Point Cook", "Hoppers Crossing", "Truganina"],
    council: "Wyndham City Council",
    profile: [
      "Williams Landing is a master-planned suburb where most housing is barely a decade old. Renovation work here centres on personalisation: upgrading standard builder inclusions, custom storage and study nooks, feature walls and premium repainting, and small-footprint kitchen upgrades in townhouses.",
      "Outdoor projects are big too — low-maintenance composite decks and pergolas sized for compact modern blocks. Where body-corporate or estate design guidelines apply, we work within them and handle the paperwork.",
    ],
    popular: [
      "Builder inclusion upgrades",
      "Custom storage and study nooks",
      "Composite decks for compact blocks",
      "Townhouse kitchen upgrades",
    ],
  },
  laverton: {
    name: "Laverton",
    nearby: ["Williams Landing", "Point Cook", "Truganina", "Hoppers Crossing"],
    council: "Wyndham or Hobsons Bay council, depending on your address",
    profile: [
      "Laverton is one of the west's best-kept secrets — post-war and 1960s–70s homes on blocks that newer estates can only dream of, just seventeen kilometres from the CBD. Full renovations here routinely transform tired weatherboard and brick homes into modern family houses, and the value uplift is among the strongest in the west.",
      "Bigger blocks also mean extensions are very achievable in Laverton. We handle the full process — design, permits through either Wyndham or Hobsons Bay council depending on your side of the suburb, construction and finishing.",
    ],
    popular: [
      "Full renovations of post-war homes",
      "Home extensions on large blocks",
      "Kitchen and bathroom rebuilds",
      "Weatherboard exterior restorations and repainting",
    ],
  },
  melton: {
    name: "Melton",
    nearby: ["Wyndham Vale", "Manor Lakes", "Tarneit", "Werribee"],
    council: "Melton City Council",
    profile: [
      "Melton spans two very different renovation markets: the established centre with solid 1980s and 90s homes due for full kitchen and bathroom updates, and the new growth estates where finishing works — decks, pergolas, landscaping structures and painting — are in demand.",
      "Established Melton homes typically sit on large blocks, making extensions and outdoor living projects cost-effective. We provide fixed-price quotes across Melton, Melton South and Melton West.",
    ],
    popular: [
      "Full kitchen and bathroom updates in established homes",
      "Decks and pergolas in new estates",
      "Home extensions on large blocks",
      "Interior and exterior painting",
    ],
  },
  dandenong: {
    name: "Dandenong",
    nearby: ["Springvale", "Narre Warren", "Cranbourne", "Berwick"],
    council: "Greater Dandenong City Council",
    profile: [
      "Dandenong's housing stock is dominated by solid post-war brick homes that were built to last but are overdue for modern interiors. Full kitchen and bathroom modernisations are our most common projects here, turning compartmentalised mid-century layouts into open, light-filled family spaces.",
      "Dandenong's wonderfully diverse community also drives strong demand for our Vastu-compliant renovation service — kitchen, entrance and bathroom placements aligned with traditional principles. We're one of the few Melbourne renovation teams offering this as a dedicated service.",
    ],
    popular: [
      "Full kitchen and bathroom modernisations",
      "Open-plan conversions of mid-century layouts",
      "Vastu-compliant renovations",
      "Whole-home interior refreshes",
    ],
  },
  springvale: {
    name: "Springvale",
    nearby: ["Dandenong", "Clayton", "Noble Park", "Keysborough"],
    council: "Greater Dandenong City Council",
    profile: [
      "Springvale's 1960s–80s brick homes are structurally excellent candidates for renovation — the frames and slabs are sound, and the transformation comes from new kitchens, bathrooms and open-plan conversions that bring older layouts up to how families live today.",
      "Like neighbouring Dandenong, Springvale has strong demand for culturally-aware design including Vastu and feng shui principles. We also handle repainting, flooring and complete interior refreshes for owners preparing to sell or lease.",
    ],
    popular: [
      "Kitchen and bathroom rebuilds in brick homes",
      "Open-plan living conversions",
      "Vastu and feng shui aligned renovations",
      "Pre-sale interior refreshes",
    ],
  },
  cranbourne: {
    name: "Cranbourne",
    nearby: ["Narre Warren", "Berwick", "Clyde", "Frankston"],
    council: "Casey City Council",
    profile: [
      "Cranbourne mixes 1990s established homes with the newer estates spreading toward Clyde. In the established areas, kitchens and bathrooms from the 90s are well due for replacement; in the newer estates, decks, pergolas and alfresco areas top the list.",
      "We service all of Cranbourne — North, East, West and South — with fixed-price quotes, and handle Casey council permits where structural or wet-area work requires them.",
    ],
    popular: [
      "1990s kitchen and bathroom replacements",
      "Decks and alfresco areas in newer estates",
      "Pergolas and outdoor living",
      "Interior repainting",
    ],
  },
  frankston: {
    name: "Frankston",
    nearby: ["Cranbourne", "Seaford", "Langwarrin", "Carrum Downs"],
    council: "Frankston City Council",
    profile: [
      "Frankston's mix of 1960s–80s weatherboard and brick homes near the bay makes for some of the most rewarding renovations in the southeast. Coastal-style bathroom and kitchen renovations — light palettes, quality tiling and durable finishes — are our specialty here.",
      "With Frankston's property values rising, full renovations and extensions consistently return their cost. We work across Frankston, Frankston South and Karingal, and handle permits through Frankston City Council where required.",
    ],
    popular: [
      "Coastal-style kitchen and bathroom renovations",
      "Full renovations of 1960s–80s homes",
      "Home extensions",
      "Decks built for bayside conditions",
    ],
  },
  "narre-warren": {
    name: "Narre Warren",
    nearby: ["Berwick", "Dandenong", "Cranbourne", "Officer"],
    council: "Casey City Council",
    profile: [
      "Narre Warren's family homes from the 1980s and 90s are hitting the age where original kitchens and bathrooms need full replacement rather than repair. Complete kitchen renovations with modern appliances and stone benchtops are our most requested project here.",
      "Many Narre Warren homes have under-used formal lounge and dining rooms — we convert these into open-plan living, home offices or extra bedrooms to suit how families actually live now.",
    ],
    popular: [
      "Complete kitchen replacements",
      "Formal lounge to open-plan conversions",
      "Bathroom and ensuite rebuilds",
      "Home office conversions",
    ],
  },
  berwick: {
    name: "Berwick",
    nearby: ["Narre Warren", "Officer", "Pakenham", "Clyde"],
    council: "Casey City Council",
    profile: [
      "Berwick is one of the southeast's most established and leafy suburbs, and its quality 1980s–2000s homes deserve renovations to match. Premium kitchen renovations, luxury ensuites and second-storey extensions are the projects we're most often asked for.",
      "Berwick homeowners typically renovate to stay long-term, so we focus on durable, timeless materials and layouts that will still work in twenty years — backed by fixed-price contracts and one point of contact throughout.",
    ],
    popular: [
      "Premium kitchen renovations",
      "Luxury ensuite and bathroom rebuilds",
      "Second-storey extensions",
      "Outdoor entertaining areas",
    ],
  },
  pakenham: {
    name: "Pakenham",
    nearby: ["Officer", "Berwick", "Clyde", "Nar Nar Goon"],
    council: "Cardinia Shire Council",
    profile: [
      "Pakenham has doubled in size over two decades, leaving a clear split: 1990s–2000s homes in the established areas now due their first full kitchen and bathroom renovations, and newer estates wanting decks, pergolas and outdoor living.",
      "We provide fixed-price quotes across Pakenham and handle building permits through Cardinia Shire Council where structural or wet-area work requires them.",
    ],
    popular: [
      "First full kitchen renovations for 90s–2000s homes",
      "Bathroom rebuilds",
      "Decks and pergolas in newer estates",
      "Interior repainting",
    ],
  },
  officer: {
    name: "Officer",
    nearby: ["Pakenham", "Berwick", "Narre Warren", "Clyde"],
    council: "Cardinia Shire Council",
    profile: [
      "Officer is one of the southeast's newest suburbs, so our work here is mostly about completing and personalising near-new homes: alfresco decks and pergolas, landscaping structures, feature painting and upgraded storage.",
      "For owners who bought standard builder packages, we upgrade benchtops, splashbacks and tapware to premium finishes — often for less than the builder's original upgrade pricing.",
    ],
    popular: [
      "Alfresco decks and pergolas",
      "Benchtop and splashback upgrades",
      "Custom storage solutions",
      "Feature walls and premium painting",
    ],
  },
  clyde: {
    name: "Clyde",
    nearby: ["Cranbourne", "Berwick", "Pakenham", "Officer"],
    council: "Casey City Council",
    profile: [
      "Clyde and Clyde North sit at the newest edge of Melbourne's southeast growth corridor. Most homes here are under ten years old, so demand centres on outdoor living — merbau and composite decks, pergolas and alfresco areas built to estate design guidelines.",
      "We also handle interior personalisation for new builds: butler's pantry fit-outs, feature walls, premium repainting and storage upgrades that volume builders don't offer.",
    ],
    popular: [
      "Merbau and composite decks",
      "Pergolas and alfresco areas",
      "Butler's pantry fit-outs",
      "New-build interior personalisation",
    ],
  },
};

type Props = { params: { suburb: string } };

export async function generateStaticParams() {
  return Object.keys(suburbs).map((suburb) => ({ suburb }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.suburb;
  const suburb = suburbs[slug];
  if (!suburb) return {};

  const title = `Home Renovations ${suburb.name}`;
  const description = `Professional renovation builders in ${suburb.name}. Kitchen & bathroom renovations, home extensions, decks & painting. Fixed-price quotes, free consultations.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/renovations/${slug}`,
    },
    // Owner-controlled per-suburb indexability (src/content/localProof.ts).
    // Every existing page defaults to indexable; nothing is noindexed
    // automatically. The robots key is only emitted when noindexing so
    // indexable pages keep inheriting the sitewide robots directives.
    ...(isSuburbIndexable(slug)
      ? {}
      : { robots: { index: false, follow: true } }),
    openGraph: {
      title: `Home Renovations ${suburb.name} Melbourne | Konntey H&R`,
      description,
      url: `https://www.konnteyhomerenovations.com.au/renovations/${slug}`,
      siteName: "Konntey Home & Renovations",
      locale: "en_AU",
      type: "website",
      images: [
        {
          url: "/images/hero-main.webp",
          width: 1200,
          height: 630,
          alt: `Professional renovation builders servicing ${suburb.name} Melbourne`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Renovation Builders ${suburb.name} | Konntey H&R`,
      description: `Professional renovation builders in ${suburb.name}. Kitchen, bathroom, extensions & more. Free quote.`,
      images: ["/images/hero-main.webp"],
    },
  };
}

export default function SuburbPage({ params }: Props) {
  const slug = params.suburb;
  const suburb = suburbs[slug];
  if (!suburb) notFound();

  // Suburb-specific FAQs come only from owner-approved local data — never
  // from a shared template duplicated across every location page.
  const localFaqs = getLocalProof(slug)?.localFaqs ?? [];

  const services = [
    { name: "Kitchen renovations", href: "/kitchen-renovations-melbourne" },
    { name: "Bathroom renovations", href: "/bathroom-renovations-melbourne" },
    { name: "Home extensions", href: "/home-extensions-melbourne" },
    { name: "Decks & pergolas", href: "/decks-pergolas-melbourne" },
    { name: "Interior painting", href: "/interior-painting-melbourne" },
  ];

  const suburbSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Home Renovations ${suburb.name}`,
    description: `Professional renovation company servicing ${suburb.name} and surrounding suburbs. Kitchen renovations, bathroom renovations, home extensions, deck building and interior painting.`,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: "Konntey Home & Renovations",
      url: "https://www.konnteyhomerenovations.com.au",
      telephone: "+61493191798",
      address: { "@type": "PostalAddress", addressLocality: "Melbourne", addressRegion: "VIC", addressCountry: "AU" },
    },
    areaServed: [
      { "@type": "City", name: suburb.name },
      ...suburb.nearby.map((n) => ({ "@type": "City" as const, name: n })),
    ],
    serviceType: "Home Renovation",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.konnteyhomerenovations.com.au",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `Renovations ${suburb.name}`,
        item: `https://www.konnteyhomerenovations.com.au/renovations/${slug}`,
      },
    ],
  };

  // FAQPage markup only when this suburb has its own visible, owner-approved
  // FAQs — never generated from a sitewide template.
  const faqSchema =
    localFaqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: localFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <div className="bg-navy text-white font-body min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(suburbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <NavBar theme="dark" />
      <FloatingActions />
      <main className="flex-grow">
        {/* Breadcrumb — mirrors BreadcrumbList JSON-LD above */}
        <nav aria-label="Breadcrumb" className="border-b border-white/10 px-4 sm:px-6 lg:px-8 pt-[110px]">
          <div className="mx-auto max-w-[1600px] pb-4">
            <ol className="flex flex-wrap items-center gap-2 font-body text-[13px] text-white/60">
              <li>
                <Link href="/" className="transition-colors hover:text-gold-bright">Home</Link>
              </li>
              <li aria-hidden="true" className="flex items-center">
                <ChevronRight size={14} className="text-white/30" />
              </li>
              <li aria-current="page" className="text-white/90">Renovations {suburb.name}</li>
            </ol>
          </div>
        </nav>
      {/* Hero */}
      <section className="relative pt-16 pb-24 sm:pt-20 sm:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="font-body text-[12px] font-semibold uppercase tracking-[3px] text-gold-bright">
            RENOVATION COMPANY {suburb.name.toUpperCase()}
          </div>
          <h1 className="mt-4 font-display text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-[0.85] tracking-tighter text-white">
            HOME RENOVATIONS <br />
            <span className="text-gold-bright">{suburb.name.toUpperCase()}</span>
          </h1>
          <p className="mt-8 max-w-2xl font-body text-[18px] leading-[1.8] text-white/90">
            Konntey Home &amp; Renovations builds kitchens, bathrooms,
            extensions, decks and interior painting for homes in {suburb.name}{" "}
            and the surrounding area, with a written fixed-price quote before
            any work starts.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/#contact"
              className="bg-gold-bright px-8 py-5 font-display text-[16px] font-black uppercase tracking-button text-navy"
            >
              Get a Free Quote in {suburb.name}
            </Link>
            <Link
              href="/#services"
              className="border-2 border-white/20 px-8 py-5 font-display text-[16px] font-black uppercase tracking-button text-white hover:border-gold-bright hover:text-gold-bright transition-colors"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Local knowledge — unique per suburb */}
      <section className="bg-navy-light py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-black uppercase tracking-tightest text-white mb-8">
            Renovating in <span className="text-gold-bright">{suburb.name}</span>
          </h2>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6 font-body text-[16px] leading-[1.8] text-white/90">
              {suburb.profile.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <div>
              <h3 className="font-display text-[18px] font-black uppercase tracking-button text-gold-bright mb-5">
                Most Requested in {suburb.name}
              </h3>
              <ul className="space-y-4">
                {suburb.popular.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 bg-gold-bright" />
                    <span className="font-body text-[15px] text-white/85">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border border-white/10 p-6">
                <div className="font-display text-[14px] font-black uppercase tracking-button text-gold-bright">
                  Permits &amp; Approvals
                </div>
                <p className="mt-3 font-body text-[14px] leading-relaxed text-white/80">
                  Structural and wet-area work in {suburb.name} typically requires a
                  building permit through {suburb.council}. We assess what your project
                  needs and manage the application as part of every quote.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local proof — renders only when owner-approved evidence exists */}
      <LocalProofBlock suburbSlug={slug} />

      {/* Curated service links — natural anchors to the canonical service pages */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-black uppercase tracking-tightest text-white mb-8">
            What We Build in <span className="text-gold-bright">{suburb.name}</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {services.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                className="border border-white/10 px-6 py-4 font-display text-[15px] font-bold uppercase tracking-button text-white/85 hover:border-gold-bright hover:text-gold-bright transition-colors"
              >
                {svc.name}
              </Link>
            ))}
          </div>
          <p className="mt-8 max-w-2xl font-body text-[15px] leading-[1.8] text-white/75">
            Pricing, process and detailed FAQs live on each service page. For
            renovation cost guidance, see our{" "}
            <Link href="/guides" className="text-gold-bright hover:underline">
              Melbourne renovation guides
            </Link>
            .
          </p>
          <div className="mt-8">
            <Link
              href="/quote"
              className="bg-gold-bright px-8 py-5 font-display text-[15px] font-black uppercase tracking-button text-navy inline-flex"
            >
              Get a Free Quote in {suburb.name}
            </Link>
          </div>
        </div>
      </section>

      {/* Suburb-specific FAQs — only when real, local questions exist */}
      {localFaqs.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-navy-light">
          <div className="mx-auto max-w-[1600px]">
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-black uppercase tracking-tightest text-white mb-12">
              {suburb.name} Renovation <span className="text-gold-bright">FAQs</span>
            </h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {localFaqs.map((faq) => (
                <div key={faq.q} className="border border-white/10 p-8">
                  <h3 className="font-display text-[18px] font-black uppercase tracking-button text-gold-bright">
                    {faq.q}
                  </h3>
                  <p className="mt-4 font-body text-[15px] leading-[1.8] text-white/85">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nearby suburbs internal links */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="font-display text-[24px] font-black uppercase tracking-button text-white mb-6">
            Also Servicing Nearby Suburbs
          </h2>
          <div className="flex flex-wrap gap-3">
            {suburb.nearby.map((nearbyName) => {
              const nearbySlug = nearbyName.toLowerCase().replace(/\s+/g, "-");
              const exists = suburbs[nearbySlug];
              return exists ? (
                <Link
                  key={nearbyName}
                  href={`/renovations/${nearbySlug}`}
                  className="border border-white/10 px-6 py-3 font-display text-[14px] font-bold uppercase tracking-button text-white/85 hover:border-gold-bright hover:text-gold-bright transition-colors"
                >
                  Renovations {nearbyName}
                </Link>
              ) : (
                <span
                  key={nearbyName}
                  className="border border-white/5 px-6 py-3 font-display text-[14px] font-bold uppercase tracking-button text-white/40"
                >
                  Renovations {nearbyName}
                </span>
              );
            })}
          </div>
          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-display text-[15px] font-black uppercase tracking-button text-gold-bright hover:text-white transition-colors"
            >
              <ArrowLeft size={16} strokeWidth={2.25} className="shrink-0" />
              <span>Back to Konntey Home</span>
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
