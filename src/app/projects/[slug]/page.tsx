import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ExternalLink } from "lucide-react";
import NavBar from "@/components/NavBar";
import { ButtonLink } from "@/components/ui";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/chat/FloatingActions";
import ProjectImageGallery from "@/components/ProjectImageGallery";
import ProjectViewPing from "@/components/ProjectViewPing";
import {
  displayableProjects,
  getProject,
  serviceLabels,
  serviceRoutes,
} from "@/content/projects";
import { suburbLinks } from "@/content/suburbs";
import { BASE_URL, quoteKind } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return displayableProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};

  const indexable = project.status === "published" && project.seo.indexable;

  const meta = pageMetadata({
    title: project.seo.title,
    description: project.seo.description,
    path: `/projects/${project.slug}`,
    noindex: !indexable,
  });
  const photo = project.images[0];
  if (!photo) return meta;
  return {
    ...meta,
    openGraph: { ...meta.openGraph, images: [{ url: photo.src, alt: photo.alt }] },
    twitter: { ...meta.twitter, images: [photo.src] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const hero =
    project.images.find((img) => img.type === "hero") ?? project.images[0];
  const gallery = project.images.filter((img) => img !== hero);
  const serviceRoute = serviceRoutes[project.primaryService];
  const serviceLabel = serviceLabels[project.primaryService];
  const suburbPage = project.relatedSuburb
    ? suburbLinks.find((s) => s.slug === project.relatedSuburb)
    : undefined;
  const testimonial =
    project.testimonial?.consentConfirmed === true ? project.testimonial : undefined;

  const facts: Array<{ label: string; value: string }> = [
    { label: "Service", value: serviceLabel },
    { label: "Suburb", value: project.suburb },
    { label: "Project type", value: project.projectType },
  ];
  if (project.duration) facts.push({ label: "Duration", value: project.duration });
  if (project.investmentBand)
    facts.push({ label: "Investment", value: project.investmentBand });
  if (project.completedMonth)
    facts.push({ label: "Completed", value: project.completedMonth });

  // Article schema only for published projects whose core narrative fields
  // are complete and visible on the page. No ratings/review markup.
  const schemaEligible =
    project.status === "published" &&
    Boolean(project.challenge && project.solution && project.outcome && hero);

  const articleSchema = schemaEligible
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: project.title,
        description: project.excerpt,
        image: `${BASE_URL}${hero.src}`,
        author: {
          "@type": "Organization",
          name: "Konntey Home & Renovations",
          url: BASE_URL,
        },
        publisher: { "@id": `${BASE_URL}/#organization` },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${BASE_URL}/projects/${project.slug}`,
        },
        articleSection: serviceLabel,
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${BASE_URL}/projects` },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${BASE_URL}/projects/${project.slug}`,
      },
    ],
  };

  return (
    <div className="bg-white text-navy font-body min-h-screen flex flex-col">
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <NavBar />
      <FloatingActions />
      <ProjectViewPing
        projectSlug={project.slug}
        service={project.primaryService}
        suburb={project.suburb}
      />

      <main id="main" className="flex-grow">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="border-b border-navy/10 px-4 sm:px-6 lg:px-8 pt-[110px]"
        >
          <div className="mx-auto max-w-4xl pb-4">
            <ol className="flex flex-wrap items-center gap-2 font-body text-[13px] text-navy/70">
              <li>
                <Link href="/" className="transition-colors hover:text-gold-deep">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="flex items-center">
                <ChevronRight size={14} className="text-navy/30" />
              </li>
              <li>
                <Link href="/projects" className="transition-colors hover:text-gold-deep">
                  Projects
                </Link>
              </li>
              <li aria-hidden="true" className="flex items-center">
                <ChevronRight size={14} className="text-navy/30" />
              </li>
              <li
                aria-current="page"
                className="max-w-[50vw] truncate text-navy/90 sm:max-w-none"
              >
                {project.title}
              </li>
            </ol>
          </div>
        </nav>

        <article className="px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="mx-auto max-w-4xl">
            {project.status === "draft" && (
              <div className="mb-8 border border-gold/50 bg-off-white p-5 font-body text-[14px] text-navy/80">
                <strong className="font-semibold">Draft preview</strong> — this
                project is visible in development only and will not render or
                be indexed in production until its status is set to
                &ldquo;published&rdquo; with owner-approved content.
              </div>
            )}

            <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-deep">
              {serviceLabel} · {project.suburb}
            </div>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-navy">
              {project.title}
            </h1>
            <p className="mt-6 font-body text-[17px] leading-[1.85] text-navy/75">
              {project.excerpt}
            </p>

            {/* Hero image */}
            {hero && (
              <figure className="mt-10">
                <div className="relative aspect-[16/9] w-full overflow-hidden border border-navy/10">
                  <Image
                    src={hero.src}
                    alt={hero.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 896px"
                    className="object-cover"
                    priority
                  />
                </div>
                {hero.caption && (
                  <figcaption className="mt-3 font-body text-[14px] text-navy/70">
                    {hero.caption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Fact summary */}
            <dl className="mt-10 grid grid-cols-2 gap-px border border-navy/10 bg-navy/10 sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-off-white p-5">
                  <dt className="font-body text-[11px] font-semibold uppercase tracking-kicker text-navy/70">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 font-display text-[16px] font-bold text-navy">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Narrative */}
            <div className="mt-14 space-y-12">
              <section>
                <h2 className="font-display text-[clamp(1.5rem,3.5vw,2rem)] font-bold tracking-[-0.01em] text-gold-deep">
                  The brief
                </h2>
                <p className="mt-5 font-body text-[16px] leading-[1.85] text-navy/80">
                  {project.challenge}
                </p>
              </section>

              {project.scope.length > 0 && (
                <section>
                  <h2 className="font-display text-[clamp(1.5rem,3.5vw,2rem)] font-bold tracking-[-0.01em] text-gold-deep">
                    Scope of work
                  </h2>
                  <ul className="mt-6 space-y-3">
                    {project.scope.map((item) => (
                      <li
                        key={item.slice(0, 40)}
                        className="flex items-start gap-3 font-body text-[16px] leading-[1.7] text-navy/80"
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 bg-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <h2 className="font-display text-[clamp(1.5rem,3.5vw,2rem)] font-bold tracking-[-0.01em] text-gold-deep">
                  What we changed
                </h2>
                <p className="mt-5 font-body text-[16px] leading-[1.85] text-navy/80">
                  {project.solution}
                </p>
              </section>

              <section>
                <h2 className="font-display text-[clamp(1.5rem,3.5vw,2rem)] font-bold tracking-[-0.01em] text-gold-deep">
                  The finished result
                </h2>
                <p className="mt-5 font-body text-[16px] leading-[1.85] text-navy/80">
                  {project.outcome}
                </p>
              </section>

              {project.councilOrComplianceNote && (
                <section>
                  <h2 className="font-display text-[clamp(1.5rem,3.5vw,2rem)] font-bold tracking-[-0.01em] text-gold-deep">
                    Planning considerations
                  </h2>
                  <p className="mt-5 font-body text-[16px] leading-[1.85] text-navy/80">
                    {project.councilOrComplianceNote}
                  </p>
                </section>
              )}
            </div>

            {/* Gallery */}
            {gallery.length > 0 && (
              <section className="mt-14">
                <h2 className="mb-6 font-display text-[clamp(1.5rem,3.5vw,2rem)] font-bold tracking-[-0.01em] text-navy">
                  Project photos
                </h2>
                <ProjectImageGallery images={gallery} projectSlug={project.slug} />
              </section>
            )}

            {/* Consented testimonial */}
            {testimonial && (
              <blockquote className="mt-14 border-l-4 border-gold-deep bg-off-white p-8">
                <p className="font-body text-[17px] italic leading-[1.85] text-navy/85">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer className="mt-5 flex flex-wrap items-center gap-4 font-display text-[14px] font-bold text-gold-deep">
                  <cite className="not-italic">
                    — {testimonial.firstNameOrInitial}, {testimonial.suburb}
                  </cite>
                  {testimonial.sourceUrl && (
                    <a
                      href={testimonial.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-body text-[13px] font-medium normal-case tracking-normal text-navy/70 transition-colors hover:text-gold-deep"
                    >
                      <span>View source</span>
                      <ExternalLink size={13} strokeWidth={2.25} />
                    </a>
                  )}
                </footer>
              </blockquote>
            )}

            {/* Related links */}
            <div className="mt-14 border-t border-navy/10 pt-10">
              <h2 className="mb-5 font-display text-[16px] font-bold text-navy/70">
                Keep exploring
              </h2>
              <div className="flex flex-col gap-3">
                <Link
                  href={serviceRoute}
                  className="group inline-flex items-center justify-between border border-navy/10 px-6 py-4 transition-colors hover:border-gold/50"
                >
                  <span className="font-display text-[15px] font-bold text-navy/85 transition-colors group-hover:text-gold-deep">
                    {serviceLabel}s in Melbourne
                  </span>
                  <ChevronRight size={16} className="shrink-0 text-gold-deep" />
                </Link>
                {suburbPage && (
                  <Link
                    href={`/renovations/${suburbPage.slug}`}
                    className="group inline-flex items-center justify-between border border-navy/10 px-6 py-4 transition-colors hover:border-gold/50"
                  >
                    <span className="font-display text-[15px] font-bold text-navy/85 transition-colors group-hover:text-gold-deep">
                      Renovations in {suburbPage.name}
                    </span>
                    <ChevronRight size={16} className="shrink-0 text-gold-deep" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Quote CTA with project context */}
        <section className="bg-gold-bright px-4 py-16 text-center text-navy sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1216px]">
            <h2 className="mx-auto max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.02em]">
              Planning a similar {serviceLabel.toLowerCase()}?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-body text-[17px] leading-[1.8] text-navy/80">
              Tell us about your project and we&apos;ll arrange a free on-site
              consultation and a {quoteKind}.
            </p>
            <div className="mt-10">
              <ButtonLink
                variant="dark"
                href={`/quote?service=${project.primaryService}&suburb=${encodeURIComponent(project.suburb)}`}
              >
                Get a free quote
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
