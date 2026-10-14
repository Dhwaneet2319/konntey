import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/chat/FloatingActions";
import QuoteChecklist from "@/components/QuoteChecklist";
import { guides, getGuide, GUIDES_BASE_URL } from "@/content/guides";
import { quoteKind } from "@/content/business";
import { siteImages, type SiteImageKey } from "@/content/images";
import { ORGANIZATION_ID, WEBSITE_ID, jsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

function formatMonth(date: string): string {
  return new Date(date).toLocaleDateString("en-AU", { month: "long", year: "numeric" });
}

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return {};

  return pageMetadata({
    title: guide.metaTitle,
    socialTitle: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    image: guideSocialImage(guide.slug),
    article: { publishedTime: guide.datePublished, modifiedTime: guide.dateModified },
  });
}

function guideSocialImage(slug: string): SiteImageKey {
  if (slug.includes("kitchen")) return "socialKitchen";
  if (slug.includes("bathroom")) return "socialBathroom";
  if (slug.includes("extension") || slug.includes("granny-flat")) return "socialExtensions";
  return "socialDefault";
}

export default async function GuideArticlePage({ params }: Props) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();

  const url = `${GUIDES_BASE_URL}/guides/${guide.slug}`;
  const headerImage = guide.image ? siteImages[guide.image] : undefined;
  const image = headerImage ?? siteImages[guideSocialImage(guide.slug)];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    // A named Person author appears only when the owner supplies one;
    // otherwise the organisation remains the factual author.
    author: guide.author
      ? {
          "@type": "Person",
          name: guide.author.name,
          jobTitle: guide.author.role,
        }
      : {
          "@type": "Organization",
          name: "Konntey Home & Renovations",
          url: GUIDES_BASE_URL,
        },
    publisher: { "@id": ORGANIZATION_ID },
    image: {
      "@type": "ImageObject",
      url: `${GUIDES_BASE_URL}${image.src}`,
      width: image.width,
      height: image.height,
    },
    inLanguage: "en-AU",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
      ...(guide.reviewer && guide.reviewedDate
        ? {
            reviewedBy: {
              "@type": "Person",
              name: guide.reviewer.name,
              jobTitle: guide.reviewer.role,
            },
            lastReviewed: guide.reviewedDate,
          }
        : {}),
    },
    articleSection: guide.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: GUIDES_BASE_URL },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${GUIDES_BASE_URL}/guides` },
      { "@type": "ListItem", position: 3, name: guide.title, item: url },
    ],
  };

  return (
    <div className="bg-navy text-white font-body min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />
      <NavBar theme="dark" />
      <FloatingActions />

      <main id="main" className="flex-grow">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="border-b border-white/10 px-4 sm:px-6 lg:px-8 pt-[110px]">
          <div className="mx-auto max-w-3xl pb-4">
            <ol className="flex flex-wrap items-center gap-2 font-body text-[13px] text-white/60">
              <li><Link href="/" className="transition-colors hover:text-gold-bright">Home</Link></li>
              <li aria-hidden="true" className="flex items-center"><ChevronRight size={14} className="text-white/30" /></li>
              <li><Link href="/guides" className="transition-colors hover:text-gold-bright">Guides</Link></li>
              <li aria-hidden="true" className="flex items-center"><ChevronRight size={14} className="text-white/30" /></li>
              <li aria-current="page" className="text-white/90 truncate max-w-[45vw] sm:max-w-none">{guide.title}</li>
            </ol>
          </div>
        </nav>

        <article className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <div className="flex items-center gap-3 font-body text-[11px] font-semibold uppercase tracking-kicker text-gold-bright">
              <span>{guide.category}</span>
              <span className="text-white/25">•</span>
              <span className="text-white/50">{guide.readMinutes} min read</span>
            </div>
            <h1 className="mt-5 font-display text-[clamp(2.25rem,6vw,4rem)] font-bold leading-[1] tracking-[-0.02em] text-white">
              {guide.title}
            </h1>

            {/* Editorial line — author appears only when supplied by the owner */}
            <p className="mt-4 font-body text-[13px] leading-[1.6] text-white/60">
              {guide.author && (
                <>
                  Written by: {guide.author.name}, {guide.author.role}
                  {" · "}
                </>
              )}
              {guide.reviewer && guide.reviewedDate && (
                <>
                  Reviewed by: {guide.reviewer.name}, {guide.reviewer.role},{" "}
                  {formatMonth(guide.reviewedDate)}
                  {" · "}
                </>
              )}
              Last updated: {formatMonth(guide.dateModified)}
              {" · "}Melbourne/Victoria guidance
            </p>

            {headerImage && (
              <div className="relative mt-8 aspect-[16/9] overflow-hidden bg-navy-light">
                <Image
                  src={headerImage.src}
                  alt={headerImage.alt}
                  fill
                  priority
                  sizes="(max-width: 767px) calc(100vw - 32px), 768px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Intro */}
            <div className="mt-8 space-y-5 font-body text-[18px] leading-[1.85] text-white/90">
              {guide.intro.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>

            {guide.checklist && <QuoteChecklist checklist={guide.checklist} />}

            {/* Sections */}
            <div className="mt-14 space-y-12">
              {guide.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-[clamp(1.5rem,3.5vw,2rem)] font-bold tracking-[-0.01em] leading-[1] text-gold-bright">
                    {section.heading}
                  </h2>
                  {section.paragraphs?.map((p) => (
                    <p key={p.slice(0, 40)} className="mt-5 font-body text-[16px] leading-[1.85] text-white/80">
                      {p}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-6 space-y-3">
                      {section.bullets.map((b) => (
                        <li key={b.slice(0, 40)} className="flex items-start gap-3 font-body text-[16px] leading-[1.7] text-white/80">
                          <span className="mt-1.5 h-2 w-2 shrink-0 bg-gold-bright" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* Key takeaways */}
            <div className="mt-14 border border-gold-bright/25 bg-navy-light p-8">
              <h2 className="font-display text-[18px] font-bold text-gold-bright">
                Key takeaways
              </h2>
              <ul className="mt-6 space-y-4">
                {guide.keyTakeaways.map((t) => (
                  <li key={t.slice(0, 40)} className="flex items-start gap-3 font-body text-[15px] leading-[1.7] text-white/85">
                    <Check size={18} strokeWidth={2.5} className="mt-0.5 shrink-0 text-gold-bright" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Official sources — rendered when supplied for the guide */}
            {guide.sources && guide.sources.length > 0 && (
              <div className="mt-14 border border-white/10 bg-navy-light p-8">
                <h2 className="font-display text-[16px] font-bold text-gold-bright">
                  Official sources
                </h2>
                <ul className="mt-5 space-y-3">
                  {guide.sources.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-body text-[15px] text-white/85 transition-colors hover:text-gold-bright"
                      >
                        <span>{s.label}</span>
                        <ExternalLink size={13} strokeWidth={2.25} className="shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related links */}
            <div className="mt-14 border-t border-white/10 pt-10 print:hidden">
              <h2 className="font-display text-[16px] font-bold text-white/50 mb-5">
                Keep reading
              </h2>
              <div className="flex flex-col gap-3">
                {guide.related.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="group inline-flex items-center justify-between border border-white/10 px-6 py-4 transition-colors hover:border-gold-bright/40"
                  >
                    <span className="font-display text-[15px] font-bold text-white/85 group-hover:text-gold-bright transition-colors">
                      {r.label}
                    </span>
                    <ArrowRight size={16} strokeWidth={2.25} className="shrink-0 text-gold-bright transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <p className="mt-12 font-body text-[13px] leading-[1.7] text-white/60 italic">
              This guide is general information for Melbourne homeowners, not legal or financial
              advice. Costs are indicative and vary by project. Always confirm permit and
              compliance requirements with your council, a registered building surveyor, or the
              Building and Plumbing Commission before starting work.
            </p>

            <div className="mt-10 print:hidden">
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 font-display text-[15px] font-bold text-gold-bright hover:text-white transition-colors"
              >
                <ArrowLeft size={16} strokeWidth={2.25} className="shrink-0" />
                <span>All guides</span>
              </Link>
            </div>
          </div>
        </article>

        {/* CTA */}
        <section className="print:hidden bg-gold-bright text-navy py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-[1216px]">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.01em] leading-[1.05] max-w-3xl mx-auto">
              Ready to start your renovation?
            </h2>
            <p className="mt-6 font-body text-[17px] leading-[1.8] text-navy/80 max-w-2xl mx-auto">
              Book a free consultation and get a {quoteKind} for your project.
            </p>
            <div className="mt-10 print:hidden">
              <Link
                href="/quote"
                className="inline-flex bg-navy px-8 py-4 font-display text-[14px] font-bold text-gold-bright hover:-translate-y-0.5 transition-transform"
              >
                Get a free quote →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
