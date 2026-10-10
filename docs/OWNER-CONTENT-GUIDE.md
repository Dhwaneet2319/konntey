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

## 2a. Council links on suburb pages — `src/content/councils.ts`

Each suburb page links to its council's official building permit page (and
VicPlan for zones and overlays). The granny flat guide also cites the
councils' small second dwelling pages from this file. Council websites get
restructured, so open every link once a year (Cardinia's old permit page
has already moved), fix any that moved, and update `councilLinksLastChecked`.
Several council sites block automated link checkers, so check them in a
normal browser.

## 3. Credentials & compliance — `src/content/business.ts`

The page `/credentials-and-compliance` exists but is **noindexed** until you
review it and set `credentialsPageIndexable = true`.

- `credentialRecords` — add exact registration/licence label, type, number,
  public-register URL and the date you verified it. **Records with any empty
  field are hidden automatically.**
- `insuranceStatement` — approved wording only; leave empty to hide.
- `verifiedTrustPoints` — the homepage trust strip. Currently: ABN,
  Melbourne-based, written itemised quotes. "BPC registered builder" and
  "Insured" are added automatically once those claims are approved (section 5).

## 4. Guide authorship — `src/content/guides.ts`

For each guide add, when you can supply them factually:

- `author: { name: "…", role: "…" }` — shown as "Written by: …". Omitted
  until supplied; never invented.
- `sources: [{ label, href }]` — official links (council, vic.gov.au,
  Building and Plumbing Commission) for cost/permit claims.
- `reviewer: { name, role }` + `reviewedDate` — the qualified practitioner
  who checked the technical/regulatory statements. Until both are supplied
  the page shows only "Last updated", never "Reviewed".
- Update `dateModified` whenever a guide's content materially changes.

## 4a. Service-page testimonials

Each service page keeps its testimonials in a `testimonials` array with
`consentConfirmed: false`. They are **hidden** until you set
`consentConfirmed: true` for a quote that matches a real customer who agreed
to publication. Add `sourceUrl` (e.g. the original Google review) when public.
If a quote can't be substantiated, delete it.

## 4b. Sitemap dates — `src/app/sitemap.ts`

`contentUpdated` holds the date each page's main content last materially
changed. Update the relevant entry when you change a page; don't bump dates
for footer/navigation-only changes.

## 4c. Quote comparison checklist — `/guides/renovation-quote-checklist-melbourne`

The checklist items, the illustrative example and the sections live on that
guide's entry in `src/content/guides.ts` (the `checklist` field). Before
promoting the page, have the builder review the wording, especially
waterproofing, approvals and GST, then add a `reviewer` and `reviewedDate`.
Keep the example labelled illustrative and free of prices; never replace it
with a real customer's or competitor's quote.

## 4d. Quote links from CTAs

Buttons link to `/quote?service=kitchen` (also `bathroom`, `extension`,
`deck-pergola`, `painting`, `vastu`) or `/quote?suburb=Tarneit`, and the form
pre-selects that choice. The mapping is `serviceFromParam` in
`src/app/quote/page.tsx`; add to it if you add a service option.

## 5. Approved business facts — `claims` in `src/content/business.ts`

Every credential, insurance, experience, staffing, price-range and timing
claim lives in one `claims` object. Each entry has the exact statement, an
`evidence` reference, `approvedWording`, a `neutralWording` fallback,
`status` and `reviewedOn`. Copy, page metadata, social cards text, the web
manifest and JSON-LD all read claims through `claimText()` /
`isClaimApproved()`.

**All claims are currently `needs-evidence`, so the site shows the neutral
wording (or nothing).** This replaces the earlier decision to keep these
claims live; nothing about the claim itself has been judged untrue.

To re-approve a claim:

1. Put the proof location in `evidence` (e.g. "BPC register entry DB-U 12345,
   checked 2026-10-10" or "Public liability policy schedule, Insurer X,
   expires 2027-06-30").
2. Set `reviewedOn` to today's date (YYYY-MM-DD).
3. Check `approvedWording` says exactly what the evidence supports.
4. Set `status: "approved"`, rebuild and redeploy.

A claim with `status: "approved"` but an empty `evidence` or `reviewedOn`
still renders as neutral. Review every approved claim at least yearly.

| Claim id | What it unlocks |
| --- | --- |
| `bpcRegistration` | "BPC registered builder" in descriptions and trust points |
| `insurance` | "Insured" trust point |
| `waterproofingCertificate` | Certified applicator + certificate wording on the bathroom page |
| `tradeExperience` | "10+ years of trade experience" |
| `noSubcontractors` | "No subcontractors" |
| `founderLed`, `familyRun`, `ownershipHeritage` | Team descriptors |
| `languages` | "We speak Hindi and Gujarati" and `availableLanguage` in schema |
| `fixedPriceQuotes` | "fixed-price" instead of "itemised" quote wording everywhere |
| `responseTimes` | 24-hour reply / 48-hour quote promise |
| `priceRanges` | "Typical Konntey project ranges" heading and price `offers` in schema |
| `vastuProvider` | Whether Konntey assesses Vastu itself or works with your consultant |

Also confirm the indicative price ranges (kitchen $15k–$25k / $25k–$45k /
$45k–$80k+; bathroom $10k–$20k / $20k–$35k / $35k–$45k+) and whether they
include GST, demolition, disposal, appliances and permits.

The LocalBusiness schema publishes no street address, postcode, coordinates,
payment methods, star ratings or Twitter handle. If you open a
customer-facing premises, add its real address there.

## 5a. Photo provenance — `src/content/images.ts`

Every photo the site uses is registered with its real size, alt text and a
`provenance` of `"konntey-project"` or `"unverified"`. All current photos are
`"unverified"`, so galleries and before/after sliders are captioned as
example images and never described as Konntey work. Change a photo to
`"konntey-project"` only if it shows a job Konntey completed and you have the
client's permission to publish it. The homepage's nine AI-generated
design-inspiration images are served from a separate pre-encoded pack
(`src/components/home/home-images.ts`, files in `public/images/konntey-home-v1/`)
rather than this registry; they are illustrative concepts, never photos of
Konntey work, and the AI-imagery disclosure lives on the terms page
(`/terms#imagery`). Social share cards in
`public/images/social/` are generated by `scripts/generate-social-images.mjs`
(text and logo only, no photos).

## 6. Other inputs the site is ready for

- **Google review link:** set `googleReviewUrl` in `src/content/business.ts`
  to the "Ask for reviews" link (g.page/r/…/review) from your verified
  Business Profile. Until then the footer shows "Find us on Google".
- **Analytics:** neutral event hooks are in place (`quote_form_start`,
  `quote_form_submit`, `phone_click`, `whatsapp_click`, `project_view`,
  `project_gallery_interaction`). They push to `window.dataLayer`; when you
  choose a provider (e.g. GA4 via GTM), add it through your own configuration
  — no IDs are hard-coded.
- **Search Console:** verification already reads
  `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` from environment config.
- **Search visibility outside the website** (Google Business Profile,
  reviews, directory listings, the www redirect): see the owner checklist in
  `docs/SEO-2026-10.md`.
- **Photo provenance:** see section 5a.
