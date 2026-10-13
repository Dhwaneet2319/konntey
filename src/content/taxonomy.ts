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
  { name: "Tarneit", slug: "tarneit" },
  { name: "Truganina", slug: "truganina" },
  { name: "Werribee", slug: "werribee" },
  { name: "Hoppers Crossing", slug: "hoppers-crossing" },
  { name: "Point Cook", slug: "point-cook" },
  { name: "Wyndham Vale", slug: "wyndham-vale" },
  { name: "Manor Lakes", slug: "manor-lakes" },
  { name: "Williams Landing", slug: "williams-landing" },
  { name: "Laverton", slug: "laverton" },
  { name: "Melton", slug: "melton" },
  { name: "Dandenong", slug: "dandenong" },
  { name: "Springvale", slug: "springvale" },
  { name: "Cranbourne", slug: "cranbourne" },
  { name: "Frankston", slug: "frankston" },
  { name: "Narre Warren", slug: "narre-warren" },
  { name: "Berwick", slug: "berwick" },
  { name: "Pakenham", slug: "pakenham" },
  { name: "Officer", slug: "officer" },
  { name: "Clyde", slug: "clyde" },
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
