# Release notes: October 2026 site refresh

Branch `upgrade/2026-10-site-refresh`, built on `b21c27a` (the working copy as
found on 3 October 2026). Nothing has been deployed, no DNS or Business Profile
changes were made and no real enquiry was sent.

## What changed

| Commit | Scope |
|---|---|
| `b21c27a` | Baseline snapshot of the working copy, before any change |
| `b8baaa0` | `scripts/route-js-size.mjs` (per-route JS/CSS measurement) |
| `149d4e2` | Next.js 16.3.8, React 19, ESLint 9 flat config. Tailwind stays on 3.4; no forced peer installs |
| `29c4115` | Approved-facts model (`src/content/business.ts`): every trust claim is gated; content for services and suburbs is centralised |
| `d6047e6` | Technical SEO: per-page canonicals and metadata, `/scan` title (noindex, crawlable), real 404s, redirects and headers moved into `next.config.mjs`, `/images` caching, bathroom wide-shot deduplicated |
| `46e9275` | One shared enquiry form (Formspree `xkopaqvd` kept), analytics via environment only, allowlisted event context |
| `02bcdf3` | Homepage redesign, new header and footer, mobile Call/Quote bar, CSS-only motion (framer-motion removed) |
| `ece3f41` | Printable quote checklist, projects hub empty state and case-study template polish, redesigned 404, `<main>` landmarks |
| `8af0c43` | Verification fixes: form works without JS, contrast, one display font weight, lighter header logo |
| `f5d87e8` | Mobile bar fully hidden after it slides out; quote intro de-duplicated |

Across the branch, 26 files were added, 23 deleted and 57 modified. Run
`git diff --stat b21c27a..HEAD` for the full list.

### Migration notes for developers

- **Node 20.9 or later** (`engines` in `package.json`). Vercel's default Node 22 is fine.
- **framer-motion and `@formspree/react` were removed.** Scroll reveals use
  `src/components/Reveal.tsx` plus `RevealObserver`, styled in `globals.css`.
  Server HTML is always visible, and only content below the fold is hidden
  after hydration. Reduced-motion users never see hidden content.
- **Motion tokens:** `src/lib/motion.ts`, the `--motion-*` variables in
  `globals.css`, and the Tailwind `duration-hover` / `duration-enter` /
  `ease-brand` utilities hold the same values.
- **Shared UI:** `src/components/ui.tsx` (`Container`, `Kicker`,
  `SectionHeading`, `ButtonLink`, `PhoneButton`, `TextLink`).
- **Six service pages** render `src/components/service/ServicePage.tsx` from
  `src/content/services.ts`. Their old per-route `layout.tsx` files were deleted.
- **Headers** (`nosniff`, `SAMEORIGIN`, `Referrer-Policy`, `/images` cache) now
  live in `next.config.mjs`. `vercel.json` only keeps the apex-to-www redirect.
- **Colour:** `gold-deep` is now `#7a5f17`, to pass AA contrast on the off-white background.
- **Fonts:** Barlow Condensed loads weight 700 only. `font-black` was replaced with `font-bold`.

## Verification (local production build)

All of the following were run on this branch. Lint and typecheck were clean,
and `next build` succeeded after every commit.

| Check | Result |
|---|---|
| Routes | All 37 sitemap URLs return 200 with their own canonical and one `<h1>`. `/projects`, `/credentials-and-compliance`, `/scan` and `/careers` are `noindex, follow`. Unknown project, suburb and guide slugs, random paths and `/services/plumbing` return 404. Legacy `/home`, `/services*`, `/contact` and the wide-shot URL return 308 |
| JSON-LD | One business `@id`, logo 154×112, city-level address only, no ratings, reviews, awards or geo. Service `offers` appear only once `priceRanges` is approved. FAQ schema matches the visible questions |
| Keyboard and menus (29 automated checks) | Desktop Services menu opens with Enter, closes with Escape or an outside click, and returns focus. The mobile menu is inert when closed, traps focus when open, and returns focus on Escape |
| Mobile bar | Hidden while the hero CTAs are visible, over the enquiry form and footer, and while a field has focus. Never shown on `/quote` or on desktop. Lifts the WhatsApp button |
| Slider | Arrow, Home and preset buttons work, with `aria-pressed` state |
| Enquiry form (22 checks against a local mock, never Formspree) | Validation, the chosen contact method is enforced, a 500 shows an error and never a fake success, endpoint field errors map to the right field, pending state, focused success, URL prefill, homepage form. Analytics events carry no name, phone, email or message |
| No-JS | No hidden or opacity-0 content in server HTML. The form posts natively to Formspree |
| Reduced motion | No element is ever hidden |
| Overflow | None at 360, 390, 768 and 1440 px, or at 640 and 720 px (200% zoom of 1280 and 1440) |
| Print | The quote checklist prints black on white, without header, footer or CTAs, and with official source URLs |
| `npm audit --omit=dev` | 0 vulnerabilities |

### Before and after metrics

Route JS is gzip KiB of script tags. Lighthouse is mobile, the median of 3 runs.

| Route | JS before | JS after | Perf before | Perf after | LCP before | LCP after |
|---|---|---|---|---|---|---|
| `/` | 160.9 | 155.5 | 96 | 94 (94–97) | 2.72 s | 3.15 s |
| Kitchen service | 142.7 | 151.2 | 95 | 95 | 3.01 s | 2.93 s |
| `/quote` | 135.5 | 150.2 | 97 | 98 | 2.56 s | 2.48 s |
| Tarneit suburb | 139.9 | 149.0 | n/a | n/a | n/a | n/a |

CSS fell from 10.1 to 9.3 KiB. Every route is within the +25 KiB JS budget.
Lighthouse accessibility is 100 on all nine audited pages (it was 96 before),
and SEO and best practices are 100. The homepage LCP element is now the hero
photo, which the brief asked for. Before, it was a paragraph held back by
render delay. The performance runs predate the final contrast and mobile-bar
commits, which only change colours and visibility.

## Owner checklist (needed before these claims can appear)

1. **Projects and photos:** supply completed-job photos and permission. Set the
   image `provenance` in `src/content/images.ts` to `"konntey-project"`, and
   publish case studies in `src/content/projects.ts` (see the content guide,
   sections 1 and 5a). Until then the site shows "Example images" and
   "Illustrative image" labels.
2. **Reviews and testimonials:** written consent per quote (`consentConfirmed: true`).
3. **Credentials:** evidence for each claim in `src/content/business.ts`.
   Every claim is currently `needs-evidence`: `bpcRegistration`, `insurance`,
   `waterproofingCertificate`, `tradeExperience`, `noSubcontractors`,
   `founderLed`, `familyRun`, `ownershipHeritage`, `languages`,
   `fixedPriceQuotes`, `responseTimes`, `priceRanges` and `vastuProvider`.
4. **Operational promises in the copy, to confirm:** "one point of contact",
   "staged milestone payments, no large upfront lump sums", "changes agreed
   in writing", "we coordinate permit paperwork", and the opening hours.
5. **`/scan` service list:** it lists basic electrical and plumbing work. In
   Victoria these generally need a licensed electrician or registered plumber.
   Confirm how these jobs are handled, or remove them.
6. **Google review link:** add `googleReviewUrl` in `src/content/business.ts`.
   Until then the site links to a Maps search.
7. **Analytics:** set `NEXT_PUBLIC_GTM_ID` (or `NEXT_PUBLIC_GA4_ID`) in Vercel.
   Without a valid ID, no tag loads.
8. **Live delivery test:** with your approval, send one real enquiry on the
   preview deployment and confirm it reaches the inbox.
9. **Team material:** owner name, photo and short bio, if wanted. The About
   section shows team details only when the matching claims are approved.
10. **Instagram:** confirm `instagram.com/konntey` is the right account (it is used in `sameAs`).

### Claim gating supersedes the earlier "keep trust claims" decision

The audit required unverified claims to be withheld, so all of them now render
neutral wording. To re-approve one, open `src/content/business.ts`, then for
that claim fill in `evidence` (what proves it), `approvedWording`, and
`reviewedOn` (date), and set `status: "approved"`. `claimText()` shows the
approved wording only when all three fields are filled. See section 5 of
`docs/OWNER-CONTENT-GUIDE.md`.

The indexability switches (`credentialsPageIndexable`, `suburbIndexable`,
project `seo.indexable`) were left exactly as found.

## Deployment

Environment variables (Vercel, Production and Preview):

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_GTM_ID` or `NEXT_PUBLIC_GA4_ID` | Real ID, when ready |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | As before |
| `NEXT_PUBLIC_ENQUIRY_ENDPOINT` | **Leave unset in production.** It exists only for test builds and defaults to Formspree `xkopaqvd` |

Recommended release path:
1. Push the branch and open a pull request.
2. Check the Vercel preview, including the owner's live enquiry test.
3. Merge.
4. In Search Console, resubmit `sitemap.xml` and spot-check a service URL with URL Inspection.

**Rollback:** in Vercel, promote the previous production deployment (instant).
In git, revert the merge, or revert individual commits newest-first. Each
commit builds on its own. The redesign (`02bcdf3` onwards) can be reverted
while keeping the SEO, facts and form work.

## Local tooling (not committed)

`.tmp-node/` (git-ignored) holds the portable Node, the mock endpoint and the
test scripts: `routecheck.sh`, `jsonld.mjs`, `interact.mjs`, `formtest.mjs`,
`shots.mjs`, `print.mjs`, `lh.sh`, plus the screenshots and Lighthouse reports.
Delete it once you no longer need them.
