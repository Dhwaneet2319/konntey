import { quoteKind } from "@/content/business";

/**
 * Single source of truth for the suburb landing pages: the /renovations hub,
 * each /renovations/[suburb] page, the sitemap, ServiceAreasStrip and the
 * business JSON-LD all read from here.
 *
 * Profile copy describes the suburb's housing and typical renovation needs.
 * It must not claim local track record ("we work here every week", "our most
 * requested project") unless that is backed by published projects in
 * src/content/projects.ts and local proof in src/content/localProof.ts.
 */
export type SuburbRegion = "West" | "Southeast";

export interface SuburbProfile {
  name: string;
  slug: string;
  region: SuburbRegion;
  council: string;
  /** Nearby suburbs; only those with their own page are linked. */
  nearby: string[];
  profile: string[];
  commonProjects: string[];
}

export const suburbProfiles: SuburbProfile[] = [
  {
    name: "Tarneit",
    slug: "tarneit",
    region: "West",
    council: "Wyndham City Council",
    nearby: ["Truganina", "Werribee", "Hoppers Crossing", "Wyndham Vale", "Manor Lakes"],
    profile: [
      "Tarneit is one of Australia's fastest-growing suburbs, and most of its housing was built in the last ten to twenty years. That first wave of builder-grade kitchens and bathrooms is now reaching the end of its life — laminate benchtops, basic tapware and standard-range tiles that are ready for an upgrade. Replacing builder basics with stone benchtops, quality cabinetry and modern fittings improves daily living and presentation for resale.",
      "Beyond kitchens and bathrooms, common Tarneit projects include alfresco decks and pergolas for family-sized backyards, theatre-room conversions into extra bedrooms, and butler's pantry additions. Many homes follow standard volume-builder layouts, so an on-site measure usually confirms scope quickly.",
    ],
    commonProjects: [
      "Builder-grade kitchen upgrades with stone benchtops",
      "Alfresco decks and pergolas for estate blocks",
      "Butler's pantry additions",
      "Theatre room to bedroom conversions",
    ],
  },
  {
    name: "Truganina",
    slug: "truganina",
    region: "West",
    council: "Wyndham City Council",
    nearby: ["Tarneit", "Williams Landing", "Laverton", "Hoppers Crossing"],
    profile: [
      "Truganina's estates are among the newest in Melbourne's west, with open-plan layouts that already suit modern living. What many homes lack is the finishing touch — builder-grade splashbacks, basic benchtops and unlandscaped yards — so typical projects personalise a standard volume build.",
      "Popular upgrades include waterfall stone benchtops and quality splashbacks, walk-in pantry fit-outs, feature-wall painting, and outdoor living areas with merbau decking and pergolas. For newer homes still under builder warranty, check the warranty terms before modifying anything the builder covers; we'll flag what to confirm first.",
    ],
    commonProjects: [
      "Stone benchtop and splashback upgrades",
      "Walk-in pantry fit-outs",
      "Merbau decks and outdoor living areas",
      "Feature walls and repainting",
    ],
  },
  {
    name: "Werribee",
    slug: "werribee",
    region: "West",
    council: "Wyndham City Council",
    nearby: ["Hoppers Crossing", "Wyndham Vale", "Point Cook", "Tarneit"],
    profile: [
      "Werribee is the established heart of Melbourne's west, and much of its housing dates from the 1970s to the 1990s. These solid brick-veneer homes have good bones but original kitchens and bathrooms that are well past their use-by date, which makes full strip-out renovations a common choice.",
      "Werribee's larger established blocks also suit home extensions. Whether it's a ground-floor extension for a growing family or opening up a chopped-up 1980s floor plan, the project typically runs from permits and approvals through to handover.",
    ],
    commonProjects: [
      "Full kitchen and bathroom strip-out renovations",
      "Open-plan conversions of older floor plans",
      "Ground-floor home extensions",
      "Exterior and interior repainting",
    ],
  },
  {
    name: "Hoppers Crossing",
    slug: "hoppers-crossing",
    region: "West",
    council: "Wyndham City Council",
    nearby: ["Werribee", "Tarneit", "Williams Landing", "Point Cook"],
    profile: [
      "Hoppers Crossing is classic 1970s and 80s brick-veneer territory — sturdy family homes with original bathrooms, dated kitchens and separate, closed-off living rooms. Common projects here are full bathroom strip-outs with new waterproofing, and open-plan conversions that bring kitchen, dining and living together.",
      "Many Hoppers Crossing homes sit on generous blocks with room for decks, pergolas and extensions, so renovating can be a practical alternative to moving.",
    ],
    commonProjects: [
      "Full bathroom rebuilds with new waterproofing",
      "Open-plan kitchen and living conversions",
      "Decks and pergolas on established blocks",
      "Home extensions",
    ],
  },
  {
    name: "Point Cook",
    slug: "point-cook",
    region: "West",
    council: "Wyndham City Council",
    nearby: ["Williams Landing", "Hoppers Crossing", "Werribee", "Laverton"],
    profile: [
      "Point Cook boomed through the 2000s, which means many of its homes are now fifteen to twenty-five years old — right in the renovation sweet spot. Kitchens and ensuites from that era look dated next to current builds, and replacing the mid-2000s laminate-and-chrome finish is a common upgrade.",
      "Point Cook's townhouses call for small-space thinking — clever storage, space-maximising kitchen layouts and ensuite upgrades. On larger family blocks, alfresco areas and decks are popular outdoor projects.",
    ],
    commonProjects: [
      "Mid-2000s kitchen and ensuite modernisations",
      "Townhouse and small-space kitchen layouts",
      "Alfresco areas and decks",
      "Vastu-aligned renovations",
    ],
  },
  {
    name: "Wyndham Vale",
    slug: "wyndham-vale",
    region: "West",
    council: "Wyndham City Council",
    nearby: ["Manor Lakes", "Werribee", "Tarneit", "Melton"],
    profile: [
      "Wyndham Vale has grown rapidly as one of the west's more affordable family suburbs, and many owners who bought new five to fifteen years ago are now ready to upgrade. Budget-conscious renovations suit many homes here — cabinet and benchtop refreshes, bathroom updates and repainting.",
      `For growing families staying put, decks and pergolas, garage conversions and butler's pantries are common next steps. Small refreshes and full renovations both start with a ${quoteKind}.`,
    ],
    commonProjects: [
      "Budget-conscious kitchen and bathroom refreshes",
      "Decks and pergolas",
      "Garage conversions",
      "Whole-home repainting",
    ],
  },
  {
    name: "Manor Lakes",
    slug: "manor-lakes",
    region: "West",
    council: "Wyndham City Council",
    nearby: ["Wyndham Vale", "Tarneit", "Werribee", "Melton"],
    profile: [
      "Manor Lakes is one of Melbourne's newer communities, so renovation needs look different to older suburbs. Rather than gut renovations, most projects are finishing works: decks, pergolas and alfresco areas, landscaping structures, feature painting, and upgrades to builder-grade fixtures.",
      "If your backyard is still a blank slate, an outdoor living space can be designed for a new estate block. Front-facing works in newer estates may also need developer design-guideline approval, which we check as part of scoping.",
    ],
    commonProjects: [
      "Outdoor living areas for new builds",
      "Decks, pergolas and alfresco areas",
      "Builder-grade fixture upgrades",
      "Feature painting",
    ],
  },
  {
    name: "Williams Landing",
    slug: "williams-landing",
    region: "West",
    council: "Wyndham City Council",
    nearby: ["Laverton", "Point Cook", "Hoppers Crossing", "Truganina"],
    profile: [
      "Williams Landing is a master-planned suburb where most housing is barely a decade old. Renovation work here centres on personalisation: upgrading standard builder inclusions, custom storage and study nooks, feature walls and repainting, and small-footprint kitchen upgrades in townhouses.",
      "Outdoor projects are popular too — low-maintenance composite decks and pergolas sized for compact modern blocks. Where body-corporate or estate design guidelines apply, approvals are part of the plan.",
    ],
    commonProjects: [
      "Builder inclusion upgrades",
      "Custom storage and study nooks",
      "Composite decks for compact blocks",
      "Townhouse kitchen upgrades",
    ],
  },
  {
    name: "Laverton",
    slug: "laverton",
    region: "West",
    council: "Wyndham or Hobsons Bay council, depending on your address",
    nearby: ["Williams Landing", "Point Cook", "Truganina", "Hoppers Crossing"],
    profile: [
      "Laverton has post-war and 1960s–70s homes on blocks that are generous by newer-estate standards, about seventeen kilometres from the CBD. Full renovations can turn tired weatherboard and brick homes into modern family houses.",
      "Bigger blocks also make extensions achievable. Planning goes through either Wyndham or Hobsons Bay council depending on your side of the suburb, so we confirm which applies early in scoping.",
    ],
    commonProjects: [
      "Full renovations of post-war homes",
      "Home extensions on large blocks",
      "Kitchen and bathroom rebuilds",
      "Weatherboard exterior restoration and repainting",
    ],
  },
  {
    name: "Melton",
    slug: "melton",
    region: "West",
    council: "Melton City Council",
    nearby: ["Wyndham Vale", "Manor Lakes", "Tarneit", "Werribee"],
    profile: [
      "Melton spans two different renovation markets: the established centre with solid 1980s and 90s homes due for kitchen and bathroom updates, and the new growth estates where finishing works — decks, pergolas, landscaping structures and painting — are in demand.",
      `Established Melton homes often sit on large blocks, which suits extensions and outdoor living projects. We service Melton, Melton South and Melton West with a free consultation and a ${quoteKind}.`,
    ],
    commonProjects: [
      "Kitchen and bathroom updates in established homes",
      "Decks and pergolas in new estates",
      "Home extensions on large blocks",
      "Interior and exterior painting",
    ],
  },
  {
    name: "Dandenong",
    slug: "dandenong",
    region: "Southeast",
    council: "Greater Dandenong City Council",
    nearby: ["Springvale", "Narre Warren", "Cranbourne", "Berwick"],
    profile: [
      "Dandenong's housing stock includes many solid post-war brick homes that were built to last but are overdue for modern interiors. Kitchen and bathroom modernisations are common, turning compartmentalised mid-century layouts into open, light-filled family spaces.",
      "Dandenong's diverse community also means interest in Vastu-aligned renovations — kitchen, entrance and bathroom placements planned around traditional principles. See our Vastu renovations page for how that works.",
    ],
    commonProjects: [
      "Kitchen and bathroom modernisations",
      "Open-plan conversions of mid-century layouts",
      "Vastu-aligned renovations",
      "Whole-home interior refreshes",
    ],
  },
  {
    name: "Springvale",
    slug: "springvale",
    region: "Southeast",
    council: "Greater Dandenong City Council",
    nearby: ["Dandenong", "Clayton", "Noble Park", "Keysborough"],
    profile: [
      "Springvale's 1960s–80s brick homes are often good candidates for renovation — where frames and slabs are sound, new kitchens, bathrooms and open-plan conversions bring older layouts up to how families live today.",
      "Like neighbouring Dandenong, Springvale has interest in culturally aware design, including Vastu principles. Repainting, flooring and interior refreshes for owners preparing to sell or lease are also common.",
    ],
    commonProjects: [
      "Kitchen and bathroom rebuilds in brick homes",
      "Open-plan living conversions",
      "Vastu-aligned renovations",
      "Pre-sale interior refreshes",
    ],
  },
  {
    name: "Cranbourne",
    slug: "cranbourne",
    region: "Southeast",
    council: "Casey City Council",
    nearby: ["Narre Warren", "Berwick", "Clyde", "Frankston"],
    profile: [
      "Cranbourne mixes 1990s established homes with the newer estates spreading toward Clyde. In the established areas, 90s kitchens and bathrooms are due for replacement; in the newer estates, decks, pergolas and alfresco areas top the list.",
      `We service Cranbourne North, East, West and South with a ${quoteKind}, and coordinate building and planning approvals where your project needs them.`,
    ],
    commonProjects: [
      "1990s kitchen and bathroom replacements",
      "Decks and alfresco areas in newer estates",
      "Pergolas and outdoor living",
      "Interior repainting",
    ],
  },
  {
    name: "Frankston",
    slug: "frankston",
    region: "Southeast",
    council: "Frankston City Council",
    nearby: ["Cranbourne", "Seaford", "Langwarrin", "Carrum Downs"],
    profile: [
      "Frankston's mix of 1960s–80s weatherboard and brick homes near the bay suits coastal-style kitchen and bathroom renovations — light palettes, quality tiling and finishes chosen to handle salt air.",
      "Many Frankston homes have solid structures but dated interiors, which makes full renovations and extensions a practical alternative to moving. We service Frankston, Frankston South and Karingal, and coordinate building and planning approvals where required.",
    ],
    commonProjects: [
      "Coastal-style kitchen and bathroom renovations",
      "Full renovations of 1960s–80s homes",
      "Home extensions",
      "Decks built for bayside conditions",
    ],
  },
  {
    name: "Narre Warren",
    slug: "narre-warren",
    region: "Southeast",
    council: "Casey City Council",
    nearby: ["Berwick", "Dandenong", "Cranbourne", "Officer"],
    profile: [
      "Narre Warren's family homes from the 1980s and 90s are reaching the age where original kitchens and bathrooms need full replacement rather than repair. Complete kitchen renovations with modern appliances and stone benchtops are a common project.",
      "Many Narre Warren homes have under-used formal lounge and dining rooms that can become open-plan living, home offices or extra bedrooms.",
    ],
    commonProjects: [
      "Complete kitchen replacements",
      "Formal lounge to open-plan conversions",
      "Bathroom and ensuite rebuilds",
      "Home office conversions",
    ],
  },
  {
    name: "Berwick",
    slug: "berwick",
    region: "Southeast",
    council: "Casey City Council",
    nearby: ["Narre Warren", "Officer", "Pakenham", "Clyde"],
    profile: [
      "Berwick is one of the southeast's most established and leafy suburbs, with quality 1980s–2000s homes. Premium kitchen renovations, ensuites and second-storey extensions are popular projects.",
      "Berwick homeowners often renovate to stay long-term, so durable, timeless materials and layouts that will still work in twenty years matter — with a written scope and one point of contact throughout.",
    ],
    commonProjects: [
      "Premium kitchen renovations",
      "Ensuite and bathroom rebuilds",
      "Second-storey extensions",
      "Outdoor entertaining areas",
    ],
  },
  {
    name: "Pakenham",
    slug: "pakenham",
    region: "Southeast",
    council: "Cardinia Shire Council",
    nearby: ["Officer", "Berwick", "Clyde", "Nar Nar Goon"],
    profile: [
      "Pakenham has grown quickly over two decades, leaving a clear split: 1990s–2000s homes in the established areas now due their first full kitchen and bathroom renovations, and newer estates wanting decks, pergolas and outdoor living.",
      `We service Pakenham with a free consultation and a ${quoteKind}, and coordinate building and planning approvals where your project needs them.`,
    ],
    commonProjects: [
      "First full kitchen renovations for 90s–2000s homes",
      "Bathroom rebuilds",
      "Decks and pergolas in newer estates",
      "Interior repainting",
    ],
  },
  {
    name: "Officer",
    slug: "officer",
    region: "Southeast",
    council: "Cardinia Shire Council",
    nearby: ["Pakenham", "Berwick", "Narre Warren", "Clyde"],
    profile: [
      "Officer is one of the southeast's newest suburbs, so most work here completes and personalises near-new homes: alfresco decks and pergolas, landscaping structures, feature painting and upgraded storage.",
      "For owners who bought standard builder packages, benchtops, splashbacks and tapware can be upgraded after handover once any builder warranty considerations are checked.",
    ],
    commonProjects: [
      "Alfresco decks and pergolas",
      "Benchtop and splashback upgrades",
      "Custom storage",
      "Feature walls and painting",
    ],
  },
  {
    name: "Clyde",
    slug: "clyde",
    region: "Southeast",
    council: "Casey City Council",
    nearby: ["Cranbourne", "Berwick", "Pakenham", "Officer"],
    profile: [
      "Clyde and Clyde North sit at the newest edge of Melbourne's southeast growth corridor. Most homes here are under ten years old, so demand centres on outdoor living — merbau and composite decks, pergolas and alfresco areas built to estate design guidelines.",
      "Interior personalisation for new builds is common too: butler's pantry fit-outs, feature walls, repainting and storage upgrades.",
    ],
    commonProjects: [
      "Merbau and composite decks",
      "Pergolas and alfresco areas",
      "Butler's pantry fit-outs",
      "New-build interior personalisation",
    ],
  },
];

export interface SuburbLink {
  name: string;
  slug: string;
  region: SuburbRegion;
}

export const suburbLinks: SuburbLink[] = suburbProfiles.map(({ name, slug, region }) => ({
  name,
  slug,
  region,
}));

export function getSuburb(slug: string): SuburbProfile | undefined {
  return suburbProfiles.find((s) => s.slug === slug);
}

export function suburbSlugFor(name: string): string | undefined {
  return suburbProfiles.find((s) => s.name === name)?.slug;
}

/** Handful of suburbs surfaced on the homepage and service pages. */
export const featuredSuburbSlugs: string[] = [
  "tarneit",
  "werribee",
  "point-cook",
  "hoppers-crossing",
  "dandenong",
  "cranbourne",
  "berwick",
  "frankston",
];
