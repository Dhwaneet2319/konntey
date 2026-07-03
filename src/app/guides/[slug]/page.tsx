import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, ArrowRight, Check } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/chat/FloatingActions";
import { guides, getGuide, GUIDES_BASE_URL } from "@/content/guides";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return {};

  const url = `${GUIDES_BASE_URL}/guides/${guide.slug}`;

  return {
    title: guide.metaTitle,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: `${guide.title} | Konntey H&R`,
      description: guide.description,
      url,
      siteName: "Konntey Home & Renovations",
      locale: "en_AU",
      type: "article",
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      images: [
        {
          url: "/images/hero-main.webp",
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.title} | Konntey H&R`,
      description: guide.description,
      images: ["/images/hero-main.webp"],
    },
  };
}

export default function GuideArticlePage({ params }: Props) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const url = `${GUIDES_BASE_URL}/guides/${guide.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    author: {
      "@type": "Organization",
      name: "Konntey Home & Renovations",
      url: GUIDES_BASE_URL,
    },
    publisher: {
      "@id": `${GUIDES_BASE_URL}/#organization`,
    },
    image: `${GUIDES_BASE_URL}/images/hero-main.webp`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <NavBar theme="dark" />
      <FloatingActions />

      <main className="flex-grow">
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
            <h1 className="mt-5 font-display text-[clamp(2.25rem,6vw,4rem)] font-black uppercase leading-[0.9] tracking-tightest text-white">
              {guide.title}
            </h1>

            {/* Intro */}
            <div className="mt-8 space-y-5 font-body text-[18px] leading-[1.85] text-white/90">
              {guide.intro.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>

            {/* Sections */}
            <div className="mt-14 space-y-12">
              {guide.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-[clamp(1.5rem,3.5vw,2rem)] font-black uppercase tracking-tightest leading-[1] text-gold-bright">
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
              <h2 className="font-display text-[18px] font-black uppercase tracking-button text-gold-bright">
                Key Takeaways
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

            {/* Related links */}
            <div className="mt-14 border-t border-white/10 pt-10">
              <h2 className="font-display text-[16px] font-black uppercase tracking-button text-white/50 mb-5">
                Keep Reading
              </h2>
              <div className="flex flex-col gap-3">
                {guide.related.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="group inline-flex items-center justify-between border border-white/10 px-6 py-4 transition-colors hover:border-gold-bright/40"
                  >
                    <span className="font-display text-[15px] font-bold uppercase tracking-button text-white/85 group-hover:text-gold-bright transition-colors">
                      {r.label}
                    </span>
                    <ArrowRight size={16} strokeWidth={2.25} className="shrink-0 text-gold-bright transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <p className="mt-12 font-body text-[13px] leading-[1.7] text-white/40 italic">
              This guide is general information for Melbourne homeowners, not legal or financial
              advice. Costs are indicative and vary by project. Always confirm permit and
              compliance requirements with your council, a registered building surveyor, or the
              Building and Plumbing Commission before starting work.
            </p>

            <div className="mt-10">
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 font-display text-[15px] font-black uppercase tracking-button text-gold-bright hover:text-white transition-colors"
              >
                <ArrowLeft size={16} strokeWidth={2.25} className="shrink-0" />
                <span>All Guides</span>
              </Link>
            </div>
          </div>
        </article>

        {/* CTA */}
        <section className="bg-gold-bright text-navy py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-[1600px]">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9] max-w-3xl mx-auto">
              Ready to start your renovation?
            </h2>
            <p className="mt-6 font-body text-[17px] leading-[1.8] text-navy/80 max-w-2xl mx-auto">
              Get a free, fixed-price quote from Melbourne&apos;s founder-led renovation team.
            </p>
            <div className="mt-10">
              <Link
                href="/quote"
                className="inline-flex bg-navy px-8 py-4 font-display text-[14px] font-black uppercase tracking-button text-gold-bright hover:-translate-y-0.5 transition-transform"
              >
                Get a Free Quote →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
