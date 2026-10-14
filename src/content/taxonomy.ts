/**
 * Lightweight slug lists that client components (analytics, the enquiry
 * form) can import without bundling page content. suburbs.ts and services.ts
 * check themselves against these lists at build time.
 */

export const serviceSlugs = [
  "new-home",
  "kitchen",
  "bathroom",
  "extension",
  "deck-pergola",
  "painting",
  "vastu",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

/** Labels used by the enquiry form's service select. */
export const serviceFormLabels: Record<ServiceSlug, string> = {
  "new-home": "New home build",
  kitchen: "Kitchen renovation",
  bathroom: "Bathroom renovation",
  extension: "Home extension",
  "deck-pergola": "Decks & pergolas",
  painting: "Interior & exterior painting",
  vastu: "Vastu renovation",
};

export const suburbIndex = [
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
  { name: "Springvale", slug: "springvale", region: "Southeast" },
  { name: "Cranbourne", slug: "cranbourne", region: "Southeast" },
  { name: "Frankston", slug: "frankston", region: "Southeast" },
  { name: "Narre Warren", slug: "narre-warren", region: "Southeast" },
  { name: "Berwick", slug: "berwick", region: "Southeast" },
  { name: "Pakenham", slug: "pakenham", region: "Southeast" },
  { name: "Officer", slug: "officer", region: "Southeast" },
  { name: "Clyde", slug: "clyde", region: "Southeast" },
] as const;

export function isServiceSlug(value: string | null | undefined): value is ServiceSlug {
  return !!value && (serviceSlugs as readonly string[]).includes(value);
}

/** Maps a suburb slug or display name (any case) to its slug, if known. */
export function suburbSlugOf(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const v = value.trim().toLowerCase();
  return suburbIndex.find((s) => s.slug === v || s.name.toLowerCase() === v)?.slug;
}
