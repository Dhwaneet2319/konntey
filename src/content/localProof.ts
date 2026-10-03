/**
 * Owner-managed local evidence for suburb landing pages, plus the
 * owner-controlled indexability setting for each page.
 *
 * The LocalProofBlock component on /renovations/[suburb] renders ONLY from
 * this data. When a suburb has no entry (the default), no proof modules
 * render — the page never shows invented projects, reviews or planning notes.
 *
 * RULES FOR EDITING:
 * - featuredProjects must reference published project slugs in
 *   src/content/projects.ts for jobs genuinely completed in that suburb.
 * - localTestimonials require consentConfirmed: true and accurate attribution.
 * - localPlanningNotes must cite a current official source (council / VBA /
 *   Building and Plumbing Commission) and carry the date they were last
 *   reviewed. They are general information, never legal advice.
 * - Do not copy the same testimonial, note or FAQ across multiple suburbs.
 */

export interface LocalTestimonial {
  quote: string;
  /** e.g. "Priya S., Tarneit" — accurate, owner-verified attribution. */
  attribution: string;
  /** Public verifiable source (e.g. Google review URL) when allowed. */
  sourceUrl?: string;
  consentConfirmed: boolean;
}

export interface LocalPlanningNote {
  title: string;
  content: string;
  /** Official council/authority source backing the note. */
  sourceUrl?: string;
  /** e.g. "August 2026" — shown to readers as "Last reviewed". */
  reviewedDate: string;
}

export interface SuburbFaq {
  q: string;
  a: string;
}

export interface LocalProofData {
  suburb: string;
  /** Published project slugs completed in this suburb. */
  featuredProjects?: string[];
  localTestimonials?: LocalTestimonial[];
  localPlanningNotes?: LocalPlanningNote[];
  /**
   * Suburb-specific FAQs based on real customer questions. Leave empty to
   * omit the FAQ section entirely — never reuse generic sitewide FAQs here.
   */
  localFaqs?: SuburbFaq[];
}

/**
 * OWNER TODO: add entries keyed by suburb slug as real evidence becomes
 * available, e.g.:
 *
 * tarneit: {
 *   suburb: "Tarneit",
 *   featuredProjects: ["family-kitchen-renovation-tarneit"],
 *   localTestimonials: [{ quote: "…", attribution: "R. K., Tarneit",
 *     sourceUrl: "https://…", consentConfirmed: true }],
 * },
 */
export const localProof: Record<string, LocalProofData> = {};

/**
 * Owner-controlled indexability per suburb page.
 *
 * All existing pages stay indexable by default (missing = true) — nothing is
 * noindexed automatically. After reviewing project evidence and Search
 * Console data, the owner can set a slug to false to noindex that page and
 * remove it from the sitemap without deleting it.
 */
export const suburbIndexable: Record<string, boolean> = {
  // e.g. "springvale": false,
};

export function isSuburbIndexable(slug: string): boolean {
  return suburbIndexable[slug] !== false;
}

export function getLocalProof(slug: string): LocalProofData | undefined {
  const data = localProof[slug];
  if (!data) return undefined;
  const hasContent =
    (data.featuredProjects?.length ?? 0) > 0 ||
    (data.localTestimonials?.some((t) => t.consentConfirmed) ?? false) ||
    (data.localPlanningNotes?.length ?? 0) > 0 ||
    (data.localFaqs?.length ?? 0) > 0;
  return hasContent ? data : undefined;
}
