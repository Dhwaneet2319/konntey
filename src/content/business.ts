/**
 * Central, owner-managed business facts.
 *
 * Every trust/credential claim rendered anywhere on the site must come from
 * this file so there is exactly one place to verify, update or retract a
 * claim. Components must never hard-code credentials, insurance wording,
 * registration numbers or response-time promises.
 *
 * RULES FOR EDITING:
 * - Only add a trust point or credential once the exact wording is confirmed
 *   as accurate and (where applicable) supported by documentation.
 * - A credential record is only displayed when ALL of its fields are filled
 *   in. Partially completed records are hidden in production automatically.
 * - Do not add claims like "insured", "BPC registered" or "10+ years" here
 *   until the owner confirms exact current wording and supporting evidence.
 */

export const BASE_URL = "https://www.konnteyhomerenovations.com.au";

export const business = {
  /** Exact public business name — use consistently everywhere. */
  name: "Konntey Home & Renovations",
  abn: "64 684 703 972",
  phoneDisplay: "0493 191 798",
  phoneE164: "+61493191798",
  email: "info@konnteyhomerenovations.com.au",
  serviceArea: "Melbourne's west and southeast",
  hours: ["Mon–Fri 9:00am–9:00pm", "Sat by appointment"],
} as const;

/**
 * Short, verified facts shown in the homepage trust strip.
 * Keep to 3–4 items. Each item must be individually true and verifiable.
 */
export const verifiedTrustPoints: string[] = [
  `ABN ${business.abn}`,
  "Melbourne-based",
  "Fixed-price written quotes",
];

/**
 * A credential/registration record for the credentials & compliance page.
 * The page hides any record with a missing field, so it is safe to start a
 * record and fill it in over time — it will not render until complete.
 */
export interface CredentialRecord {
  id: string;
  /** Owner-approved display label, e.g. "Registered Building Practitioner". */
  label: string;
  /** Exact registration/licence type as it appears on the register. */
  registrationType: string;
  /** Registration / licence number. */
  number: string;
  /** Public register URL where the credential can be independently checked. */
  publicCheckUrl: string;
  /** Date the owner last verified the record is current, e.g. "2026-08-01". */
  lastVerified: string;
}

/**
 * OWNER TODO: populate with real registration/licence details.
 * Records stay hidden until every field is filled in.
 */
export const credentialRecords: CredentialRecord[] = [
  // Example shape (leave commented out until real data is supplied):
  // {
  //   id: "building-registration",
  //   label: "",
  //   registrationType: "",
  //   number: "",
  //   publicCheckUrl: "",
  //   lastVerified: "",
  // },
];

/**
 * Owner-approved insurance wording. Leave empty to hide the insurance block
 * entirely. Do not publish policy numbers or sensitive documents.
 */
export const insuranceStatement: string = "";

/**
 * The real, current quoting/contract sequence. This describes process, not
 * credentials, and matches what is already published on the service pages.
 */
export const howWeWork = [
  {
    step: "Consultation",
    detail:
      "A free on-site visit to measure up, understand the brief and assess what the project involves.",
  },
  {
    step: "Scope & quote",
    detail:
      "A written, itemised fixed-price quote covering labour, materials and project management.",
  },
  {
    step: "Contract",
    detail:
      "Work proceeds under a written agreement with staged milestone payments — no large upfront lump sums.",
  },
  {
    step: "Variations",
    detail:
      "Any change to the agreed scope is priced and approved in writing before it happens.",
  },
  {
    step: "Handover",
    detail:
      "A full clean and walkthrough, with relevant certificates supplied where the work requires them.",
  },
] as const;

/**
 * Whether /credentials-and-compliance may be indexed and listed in the
 * sitemap. OWNER: flip to true after reviewing every fact on the page.
 */
export const credentialsPageIndexable = false;

export function isCredentialComplete(c: CredentialRecord): boolean {
  return Boolean(
    c.label && c.registrationType && c.number && c.publicCheckUrl && c.lastVerified,
  );
}

export function completeCredentials(): CredentialRecord[] {
  return credentialRecords.filter(isCredentialComplete);
}
