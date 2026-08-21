# Owner Content Guide — Konntey Home & Renovations

This site now has an evidence-led content system. **Templates are built and
live; they render only owner-approved facts.** Nothing invented ever shows in
production — empty sections hide themselves automatically.

Everything you edit lives in four files under `src/content/`. After editing,
redeploy (or ask your developer to).

---

## 1. Publish a project case study — `src/content/projects.ts`

This is the highest-value content you can add. Copy the draft template entry
(`example-template-do-not-publish`), fill in **real, factual** details of a
completed job, and set `status: "published"`.

| Field | What to supply | Rules |
|---|---|---|
| `slug` | URL part, e.g. `family-kitchen-renovation-tarneit` | lowercase, hyphens |
| `title` | e.g. `Family Kitchen Renovation in Tarneit` | Real service + real suburb |
| `primaryService` | `kitchen` / `bathroom` / `extension` / `deck-pergola` / `painting` / `other` | — |
| `suburb`, `region` | Where the job actually was | Never substitute a suburb |
| `excerpt`, `challenge`, `scope`, `solution`, `outcome` | The real story of the job | Specific and factual; no marketing filler |
| `completedMonth`, `duration`, `investmentBand`, `councilOrComplianceNote` | Optional | Only if you approve publishing them and they are accurate |
| `testimonial` | Client quote | **`consentConfirmed: true` is required** or it will not render. Add `sourceUrl` (e.g. the Google review) when public |
| `images` | Min. 4 photos of the actual job (before / during / after / detail + a landscape hero) | Put files in `public/images/projects/<slug>/`; write `alt` text describing the actual photo |
| `seo.title` / `seo.description` | Page title & description | Factual summary of the transformation and location |
| `seo.indexable` | `true` to allow Google indexing | Only for fully complete, approved projects |

**Launch rules (automatic):**
- Draft projects never appear in production.
- A project enters the sitemap only when `published` + `indexable: true`.
- The `/projects` hub stays noindexed and out of the sitemap until **3
  projects are published**. Aim for 6–10 across your best services/areas.
- Homepage project cards appear automatically once projects are published.

## 2. Add local proof to suburb pages — `src/content/localProof.ts`

For each suburb where you have genuine evidence, add an entry keyed by the
suburb slug:

- `featuredProjects` — published project slugs completed **in that suburb**.
- `localTestimonials` — quotes with accurate attribution, `consentConfirmed:
  true`, and a public `sourceUrl` when allowed.
- `localPlanningNotes` — notes backed by a current official source (council /
  vic.gov.au) with a `reviewedDate`. Never legal advice.
- `localFaqs` — questions real customers from that suburb actually ask.
  Do **not** copy the same FAQ across suburbs.

**Indexability control:** in the same file, `suburbIndexable` lets you set a
suburb page to `false` to noindex it and drop it from the sitemap (for pages
with no evidence, after you review Search Console data). All pages stay
indexable until *you* change this — nothing is automatic.

## 3. Credentials & compliance — `src/content/business.ts`

The page `/credentials-and-compliance` exists but is **noindexed** until you
review it and set `credentialsPageIndexable = true`.

- `credentialRecords` — add exact registration/licence label, type, number,
  public-register URL and the date you verified it. **Records with any empty
  field are hidden automatically.**
- `insuranceStatement` — approved wording only; leave empty to hide.
- `verifiedTrustPoints` — the homepage trust strip. Currently: ABN,
  Melbourne-based, fixed-price written quotes. Only add claims (e.g. "BPC
  registered", "insured") once wording is confirmed and documentable.

## 4. Guide authorship — `src/content/guides.ts`

For each guide add, when you can supply them factually:

- `author: { name: "…", role: "…" }` — shown as "Written by: …". Omitted
  until supplied; never invented.
- `sources: [{ label, href }]` — official links (council, vic.gov.au,
  Building and Plumbing Commission) for cost/permit claims.
- Update `dateModified` whenever you review/refresh a guide — it displays as
  "Reviewed: [Month Year]".

## 5. Claims that need your confirmation (currently published)

These existing claims pre-date this upgrade and remain on the site. Please
confirm exact current wording + evidence, or ask for them to be removed:

- "BPC registered" (homepage/service metadata and service page copy)
- "no subcontractors" (kitchen page copy)
- "10+ years trade experience" (homepage stat)
- "Professional & Insured — VIC" (footer)
- "fixed-price quote within 48 hours" (quote-page metadata)
- "AS/NZS 3740 certified waterproofing" (schema/service copy)
- LocalBusiness schema `address` (postcode 3000) and `geo` (Melbourne CBD
  coordinates) in `src/app/layout.tsx` — confirm the real service-area
  business model; a service-area business should generally not publish a CBD
  address/geo it doesn't operate from.

## 6. Other inputs the site is ready for

- **Google review link:** replace `GOOGLE_REVIEW_URL` in
  `src/components/Footer.tsx` with your official review-composer short link
  (g.page/r/…/review) once your Business Profile is verified.
- **Analytics:** neutral event hooks are in place (`quote_form_start`,
  `quote_form_submit`, `phone_click`, `whatsapp_click`, `project_view`,
  `project_gallery_interaction`). They push to `window.dataLayer`; when you
  choose a provider (e.g. GA4 via GTM), add it through your own configuration
  — no IDs are hard-coded.
- **Search Console:** verification already reads
  `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` from environment config.
