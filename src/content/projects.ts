/**
 * Owner-managed project / case-study content collection.
 *
 * This is the single source of truth for /projects, /projects/[slug], the
 * homepage "Renovations Built for Real Melbourne Homes" section, suburb-page
 * LocalProofBlocks and service-page RelatedContent modules.
 *
 * PUBLISHING RULES (enforced in code — do not work around them):
 * - status "draft" projects NEVER render in production. They are visible in
 *   `next dev` only, so templates can be reviewed with example data.
 * - A project enters the sitemap only when status is "published" AND
 *   seo.indexable is true.
 * - Every field of a published project must be factual and owner-approved:
 *   real suburb, real images of the actual job, real outcomes. Never invent
 *   testimonials, prices, timeframes or council notes.
 * - testimonial.consentConfirmed must be true before a quote is added.
 * - The /projects hub stays out of the sitemap and noindexed until at least
 *   MIN_PUBLISHED_FOR_HUB projects are published.
 */

export type ProjectService =
  | "kitchen"
  | "bathroom"
  | "extension"
  | "deck-pergola"
  | "painting"
  | "other";

export interface ProjectImage {
  src: string;
  /** Describes the actual image, service and context. No keyword lists. */
  alt: string;
  caption?: string;
  type: "before" | "after" | "during" | "detail" | "hero";
}

export interface ProjectTestimonial {
  quote: string;
  firstNameOrInitial: string;
  suburb: string;
  /** Public, verifiable source (e.g. Google review URL) when allowed. */
  sourceUrl?: string;
  /** Must be true before the testimonial renders anywhere. */
  consentConfirmed: boolean;
}

export interface Project {
  slug: string;
  status: "draft" | "published";
  /** e.g. "Family Kitchen Renovation in Tarneit" */
  title: string;
  primaryService: ProjectService;
  suburb: string;
  region?: "West" | "Southeast";
  projectType: string;
  /** e.g. "2026-03". Only if the owner approves publishing the timing. */
  completedMonth?: string;
  excerpt: string;
  challenge: string;
  scope: string[];
  solution: string;
  outcome: string;
  /** Optional truthful band approved by the owner, e.g. "$25k–$35k". */
  investmentBand?: string;
  /** Optional and factual only, e.g. "3 weeks". */
  duration?: string;
  /** Factual, reviewed note (e.g. permit obtained through a named council). */
  councilOrComplianceNote?: string;
  testimonial?: ProjectTestimonial;
  images: ProjectImage[];
  /** Service page routes this project supports, e.g. "/kitchen-renovations-melbourne". */
  relatedServices: string[];
  /** Suburb page slug (from src/content/suburbs.ts) when one exists. */
  relatedSuburb?: string;
  seo: {
    title: string;
    description: string;
    indexable: boolean;
  };
}

export const serviceLabels: Record<ProjectService, string> = {
  kitchen: "Kitchen Renovation",
  bathroom: "Bathroom Renovation",
  extension: "Home Extension",
  "deck-pergola": "Deck & Pergola",
  painting: "Painting & Finishing",
  other: "Renovation",
};

export const serviceRoutes: Record<ProjectService, string> = {
  kitchen: "/kitchen-renovations-melbourne",
  bathroom: "/bathroom-renovations-melbourne",
  extension: "/home-extensions-melbourne",
  "deck-pergola": "/decks-pergolas-melbourne",
  painting: "/interior-painting-melbourne",
  other: "/#services",
};

/** Hub is treated as launched once this many projects are published. */
export const MIN_PUBLISHED_FOR_HUB = 3;

/**
 * OWNER TODO: add real, completed, approved projects here.
 *
 * The single entry below is a DRAFT TEMPLATE. It exists so the owner and
 * developers can preview the project page layout in development. It uses
 * bracketed placeholders, carries status "draft" and therefore never
 * renders, builds or enters the sitemap in production.
 */
export const projects: Project[] = [
  {
    slug: "example-template-do-not-publish",
    status: "draft",
    title: "[Project type] in [Suburb] — template preview",
    primaryService: "kitchen",
    suburb: "[Suburb]",
    region: "West",
    projectType: "[e.g. Full kitchen renovation]",
    excerpt:
      "[One–two factual sentences summarising the completed project. Replace every bracketed field with owner-approved detail before setting status to published.]",
    challenge:
      "[The brief: what the client asked for and what the existing space was like. Factual, specific, no marketing filler.]",
    scope: [
      "[Scope item — e.g. full strip-out of existing cabinetry]",
      "[Scope item — e.g. new stone benchtop and splashback]",
      "[Scope item — e.g. electrical and plumbing rough-in]",
    ],
    solution:
      "[What we changed: the actual work performed, materials used and decisions made along the way.]",
    outcome:
      "[The finished result: one factual outcome the owner is comfortable publishing.]",
    images: [
      {
        src: "/images/kitchen/hero.webp",
        alt: "[Describe the actual photo — room, work completed, suburb context]",
        caption: "[Optional caption]",
        type: "hero",
      },
      {
        src: "/images/kitchen/before.webp",
        alt: "[Describe the before photo]",
        type: "before",
      },
      {
        src: "/images/kitchen/after.webp",
        alt: "[Describe the after photo]",
        type: "after",
      },
    ],
    relatedServices: ["/kitchen-renovations-melbourne"],
    seo: {
      title: "[Project type] in [Suburb] | Kitchen Case Study | Konntey H&R",
      description: "[Factual summary of the transformation and location.]",
      indexable: false,
    },
  },
];

const isProd = process.env.NODE_ENV === "production";

/** Projects that may render on the current build (drafts allowed in dev only). */
export function displayableProjects(): Project[] {
  return projects.filter((p) => p.status === "published" || !isProd);
}

export function publishedProjects(): Project[] {
  return projects.filter((p) => p.status === "published");
}

export function getProject(slug: string): Project | undefined {
  return displayableProjects().find((p) => p.slug === slug);
}

/** Published + indexable — the only projects allowed into the sitemap. */
export function sitemapProjects(): Project[] {
  return publishedProjects().filter((p) => p.seo.indexable);
}

export function projectsHubLive(): boolean {
  return publishedProjects().length >= MIN_PUBLISHED_FOR_HUB;
}

export function projectsForService(serviceRoute: string): Project[] {
  return publishedProjects().filter((p) =>
    p.relatedServices.includes(serviceRoute),
  );
}

export function projectsForSuburb(suburbSlug: string): Project[] {
  return publishedProjects().filter((p) => p.relatedSuburb === suburbSlug);
}
