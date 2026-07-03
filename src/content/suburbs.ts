/**
 * Single source of truth for the suburb landing pages we link to.
 *
 * Slugs here must match the keys in src/app/renovations/[suburb]/page.tsx and
 * the entries in src/app/sitemap.ts. Used by the /renovations hub and the
 * ServiceAreasStrip so the internal-linking crawl path stays consistent.
 */
export type SuburbRegion = "West" | "Southeast";

export interface SuburbLink {
  name: string;
  slug: string;
  region: SuburbRegion;
}

export const suburbLinks: SuburbLink[] = [
  { name: "Tarneit", slug: "tarneit", region: "West" },
  { name: "Truganina", slug: "truganina", region: "West" },
  { name: "Werribee", slug: "werribee", region: "West" },
  { name: "Hoppers Crossing", slug: "hoppers-crossing", region: "West" },
  { name: "Point Cook", slug: "point-cook", region: "West" },
  { name: "Wyndham Vale", slug: "wyndham-vale", region: "West" },
  { name: "Manor Lakes", slug: "manor-lakes", region: "West" },
  { name: "Williams Landing", slug: "williams-landing", region: "West" },
  { name: "Laverton", slug: "laverton", region: "West" },
  { name: "Melton", slug: "melton", region: "West" },
  { name: "Dandenong", slug: "dandenong", region: "Southeast" },
  { name: "Cranbourne", slug: "cranbourne", region: "Southeast" },
  { name: "Frankston", slug: "frankston", region: "Southeast" },
  { name: "Narre Warren", slug: "narre-warren", region: "Southeast" },
  { name: "Berwick", slug: "berwick", region: "Southeast" },
  { name: "Springvale", slug: "springvale", region: "Southeast" },
  { name: "Pakenham", slug: "pakenham", region: "Southeast" },
  { name: "Officer", slug: "officer", region: "Southeast" },
  { name: "Clyde", slug: "clyde", region: "Southeast" },
];

/** Handful of highest-intent suburbs surfaced on the homepage. */
export const featuredSuburbSlugs = [
  "tarneit",
  "werribee",
  "point-cook",
  "hoppers-crossing",
  "dandenong",
  "cranbourne",
  "berwick",
  "frankston",
];
