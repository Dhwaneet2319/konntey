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
 * - Claims like "insured", "BPC registered" or "10+ years" live in `claims`
 *   below and render only once approved with evidence and a review date.
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
  /**
   * OWNER TODO: paste the "Ask for reviews" link from the verified Google
   * Business Profile (https://g.page/r/.../review). Until it is set, the
   * footer shows "Find us on Google" linking to a Maps search instead of
   * promising a review form. Never guess a place ID.
   */
  googleReviewUrl: "",
} as const;

export const googleMapsSearchUrl =
  "https://www.google.com/maps/search/?api=1&query=Konntey%20Home%20%26%20Renovations%20Melbourne";

/* -------------------------------------------------------------------------- */
/*  Approved business facts                                                   */
/* -------------------------------------------------------------------------- */

export type ClaimStatus = "approved" | "needs-evidence";

export interface BusinessClaim {
  /** The statement in plain words, exactly as the owner must confirm it. */
  claim: string;
  /**
   * Where the proof lives: register entry, policy schedule, signed template,
   * etc. A claim cannot render as approved without it.
   */
  evidence: string;
  /** Wording used once approved. */
  approvedWording: string;
  /** Wording used until approved. An empty string means "say nothing". */
  neutralWording: string;
  status: ClaimStatus;
  /** YYYY-MM-DD the owner last reviewed the claim. Required for approval. */
  reviewedOn: string;
  /** Where the claim is used, for the owner review list. */
  usedIn: string;
}

/**
 * Every credential, insurance, experience, staffing, price and timing claim
 * the site can make. Copy, metadata, the manifest and JSON-LD read these
 * through `claimText()` / `isClaimApproved()`, never as hard-coded strings.
 *
 * To approve a claim: fill in `evidence` and `reviewedOn`, check the
 * `approvedWording`, then set `status: "approved"`.
 */
export const claims = {
  bpcRegistration: {
    claim:
      "Konntey (or its nominated builder) is registered with the Building and Plumbing Commission for the work advertised.",
    evidence: "",
    approvedWording: "BPC registered builder",
    neutralWording: "",
    status: "needs-evidence",
    reviewedOn: "",
    usedIn:
      "Site/service descriptions, LocalBusiness schema, manifest, service intros, trust strip. Add the record to credentialRecords too.",
  },
  insurance: {
    claim:
      "Konntey holds current public liability insurance and takes out domestic building insurance where the law requires it.",
    evidence: "",
    approvedWording: "Insured",
    neutralWording: "",
    status: "needs-evidence",
    reviewedOn: "",
    usedIn: "Footer, homepage reasons to choose, bathroom compliance list, trust strip. Also set insuranceStatement.",
  },
  waterproofingCertificate: {
    claim:
      "Every bathroom is waterproofed by a certified applicator to AS 3740 and the homeowner receives a certificate on completion.",
    evidence: "",
    approvedWording:
      "Waterproofing by a certified applicator to AS 3740, with a certificate on completion",
    neutralWording:
      "Waterproofing must meet AS 3740 under the National Construction Code. Ask which membrane system will be used, who applies it and what written record you'll receive",
    status: "needs-evidence",
    reviewedOn: "",
    usedIn: "Bathroom page process, compliance list and FAQ; bathroom schema.",
  },
  tradeExperience: {
    claim: "The founder has 10+ years of trade experience.",
    evidence: "",
    approvedWording: "10+ years of trade experience",
    neutralWording: "",
    status: "needs-evidence",
    reviewedOn: "",
    usedIn: "Homepage owner/team introduction. Confirm whose experience it is; never present it as business age.",
  },
  noSubcontractors: {
    claim: "All work is carried out by Konntey's own team, without subcontractors.",
    evidence: "",
    approvedWording: "No subcontractors",
    neutralWording: "",
    status: "needs-evidence",
    reviewedOn: "",
    usedIn: "Kitchen and deck page intros.",
  },
  founderLed: {
    claim: "The founder personally oversees every project.",
    evidence: "",
    approvedWording: "Founder-led",
    neutralWording: "",
    status: "needs-evidence",
    reviewedOn: "",
    usedIn: "Homepage, site description, guide CTAs.",
  },
  familyRun: {
    claim: "Konntey is a family-run business.",
    evidence: "",
    approvedWording: "Family-run",
    neutralWording: "",
    status: "needs-evidence",
    reviewedOn: "",
    usedIn: "Homepage about section.",
  },
  ownershipHeritage: {
    claim:
      "Konntey is Indian-owned and the founder grew up with Vastu Shastra principles.",
    evidence: "",
    approvedWording: "Indian-owned",
    neutralWording: "",
    status: "needs-evidence",
    reviewedOn: "",
    usedIn: "Vastu page intro, FAQ, CTA and description.",
  },
  languages: {
    claim: "Customers can discuss their project in Hindi or Gujarati.",
    evidence: "",
    approvedWording: "We speak Hindi and Gujarati",
    neutralWording: "",
    status: "needs-evidence",
    reviewedOn: "",
    usedIn: "Vastu page CTA and FAQ; contactPoint.availableLanguage in schema.",
  },
  fixedPriceQuotes: {
    claim:
      "Every quote is a written fixed price for the agreed scope; changes are priced and approved in writing first.",
    evidence: "",
    // Adjective, used as "a written ___ quote".
    approvedWording: "fixed-price",
    neutralWording: "itemised",
    status: "needs-evidence",
    reviewedOn: "",
    usedIn: "Trust strip, all service pages, suburb pages, guides CTA, quote page, site description.",
  },
  responseTimes: {
    claim:
      "Konntey replies to enquiries within 24 hours and sends a written quote within 48 hours of the site visit.",
    evidence: "",
    approvedWording:
      "We reply within 24 hours to arrange a site visit, then send your written quote, typically within 48 hours of the visit.",
    neutralWording:
      "We'll reply to arrange a site visit, then send you a written quote for the agreed scope.",
    status: "needs-evidence",
    reviewedOn: "",
    usedIn: "Service FAQs, homepage FAQ, enquiry section, quote page metadata.",
  },
  priceRanges: {
    claim:
      "The price ranges on service pages are Konntey's own typical prices, including GST, for the scope described.",
    evidence: "",
    approvedWording: "Typical Konntey project ranges",
    neutralWording: "Indicative Melbourne ranges",
    status: "needs-evidence",
    reviewedOn: "",
    usedIn:
      "Service page price tables and text, homepage FAQ, service schema offers (only emitted when approved), 'from $' wording in titles (removed until approved).",
  },
  vastuProvider: {
    claim: "Konntey provides its own Vastu assessments and post-construction checks.",
    evidence: "",
    approvedWording:
      "We can assess your home against traditional Vastu Shastra principles ourselves, or work with your preferred consultant or pandit.",
    neutralWording:
      "Bring your preferred Vastu consultant or pandit, or share their recommendations, and we'll turn them into a compliant design and build.",
    status: "needs-evidence",
    reviewedOn: "",
    usedIn: "Vastu page process, services and FAQ.",
  },
} satisfies Record<string, BusinessClaim>;

export type ClaimId = keyof typeof claims;

export function isClaimApproved(id: ClaimId): boolean {
  const c: BusinessClaim = claims[id];
  return c.status === "approved" && c.evidence !== "" && c.reviewedOn !== "";
}

/** Approved wording when approved, otherwise the neutral alternative ("" = omit). */
export function claimText(id: ClaimId): string {
  const c: BusinessClaim = claims[id];
  return isClaimApproved(id) ? c.approvedWording : c.neutralWording;
}

/** "a written fixed-price quote" or "a written itemised quote". */
export const quoteKind = `written ${claimText("fixedPriceQuotes")} quote`;

/**
 * Short facts shown in trust strips. Keep to 3–4 items; approved credential
 * claims are added automatically.
 */
export const verifiedTrustPoints: string[] = [
  `ABN ${business.abn}`,
  "Melbourne-based",
  `Written ${claimText("fixedPriceQuotes")} quotes`,
  ...(isClaimApproved("bpcRegistration") ? [claims.bpcRegistration.approvedWording] : []),
  ...(isClaimApproved("insurance") ? [claims.insurance.approvedWording] : []),
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
 * The quoting/contract sequence. This describes process, not credentials,
 * and matches what is published on the service pages.
 */
export const howWeWork = [
  {
    step: "Consultation",
    detail:
      "A free on-site visit to measure up, understand the brief and assess what the project involves.",
  },
  {
    step: "Scope & quote",
    detail: `A ${quoteKind} covering labour, materials and project management.`,
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
