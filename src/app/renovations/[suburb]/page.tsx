import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/chat/FloatingActions";
import LocalProofBlock from "@/components/LocalProofBlock";
import Reveal from "@/components/Reveal";
import ServiceFaq from "@/components/ServiceFaq";
import { ButtonLink, Container, Kicker, PhoneButton, SectionHeading, TextLink } from "@/components/ui";
import { BASE_URL, business, quoteKind } from "@/content/business";
import { siteImages } from "@/content/images";
import { getLocalProof, isSuburbIndexable } from "@/content/localProof";
import { chooserServices } from "@/content/services";
import { getSuburb, suburbProfiles, suburbSlugFor } from "@/content/suburbs";
import { breadcrumbSchema, jsonLd, pageMetadata, providerRef } from "@/lib/seo";

type Props = { params: Promise<{ suburb: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return suburbProfiles.map((s) => ({ suburb: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).suburb;
  const suburb = getSuburb(slug);
  if (!suburb) return {};

  return pageMetadata({
    title: `Home renovations ${suburb.name}`,
    description: `Kitchen and bathroom renovations, home extensions, decks and painting in ${suburb.name}. Free consultation and a ${quoteKind}.`,
    path: `/renovations/${slug}`,
    // Owner-controlled per-suburb indexability (src/content/localProof.ts).
    noindex: !isSuburbIndexable(slug),
  });
}

export default async function SuburbPage({ params }: Props) {
  const slug = (await params).suburb;
  const suburb = getSuburb(slug);
  if (!suburb) notFound();

  // Suburb-specific FAQs come only from owner-approved local data, never
  // from a shared template duplicated across every location page.
  const localFaqs = getLocalProof(slug)?.localFaqs ?? [];
  const quoteHref = `/quote?suburb=${encodeURIComponent(suburb.name)}`;
  const nearbyLinked = suburb.nearby
    .map((name) => ({ name, slug: suburbSlugFor(name) }))
    .filter((n): n is { name: string; slug: string } => Boolean(n.slug));
  const nearbyOther = suburb.nearby.filter((name) => !suburbSlugFor(name));

  const suburbSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Home renovations in ${suburb.name}`,
    serviceType: "Home renovation",
    provider: providerRef,
    areaServed: { "@type": "Place", name: `${suburb.name}, VIC` },
    url: `${BASE_URL}/renovations/${slug}`,
  };

  const faqSchema =
    localFaqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: localFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <div className="flex min-h-screen flex-col bg-white font-body text-navy">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(suburbSchema)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Areas we service", path: "/renovations" },
            { name: suburb.name, path: `/renovations/${slug}` },
          ]),
        )}
      />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />}
      <NavBar theme="dark" />
      <FloatingActions />

      <main id="main" className="flex-grow">
        <section className="bg-navy pb-14 pt-[104px] text-white sm:pb-20 lg:pt-[120px]">
          <Container>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 font-body text-[13px] text-white/60">
                <li>
                  <Link href="/" className="hover:text-gold-bright">Home</Link>
                </li>
                <li aria-hidden="true"><ChevronRight size={13} /></li>
                <li>
                  <Link href="/renovations" className="hover:text-gold-bright">Areas we service</Link>
                </li>
                <li aria-hidden="true"><ChevronRight size={13} /></li>
                <li aria-current="page" className="text-white/85">{suburb.name}</li>
              </ol>
            </nav>
            <div className="mt-8 max-w-3xl">
              <Kicker tone="dark">{suburb.council}</Kicker>
              <h1 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.015em]">
                Home renovations in <span className="text-gold-bright">{suburb.name}</span>
              </h1>
              <p className="mt-6 max-w-2xl font-body text-[17px] leading-[1.7] text-white/80">
                Kitchens, bathrooms, extensions, decks and painting for homes in{" "}
                {suburb.name} and nearby suburbs, with a {quoteKind} before any work starts.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={quoteHref}>Get a free quote in {suburb.name}</ButtonLink>
                <PhoneButton variant="outlineDark" label={`Call ${business.phoneDisplay}`} />
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-24">
          <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <Reveal>
              <SectionHeading kicker="Local housing" title={`Renovating in ${suburb.name}`} />
              <div className="mt-6 space-y-5 font-body text-[17px] leading-[1.75] text-navy/75">
                {suburb.profile.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
            <Reveal className="space-y-6">
              <div className="bg-off-white p-7">
                <h2 className="font-display text-[22px] font-bold text-navy">Common projects in {suburb.name}</h2>
                <ul className="mt-5 space-y-3">
                  {suburb.commonProjects.map((item) => (
                    <li key={item} className="flex gap-3 font-body text-[16px] leading-[1.6] text-navy/80">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-gold-bright" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-navy/10 p-7">
                <h2 className="font-display text-[22px] font-bold text-navy">Permits &amp; approvals</h2>
                <p className="mt-3 font-body text-[15px] leading-[1.7] text-navy/75">
                  Structural work in {suburb.name} — extensions, wall removal or a deck on a
                  structural subfloor — usually needs a building permit from a registered
                  building surveyor. You can appoint a private surveyor or use{" "}
                  {suburb.council}&apos;s municipal building surveyor. Some projects also need a
                  planning permit. We assess what your project needs as part of the quote.
                </p>
                <div className="mt-4">
                  <TextLink href="/guides/renovation-permits-victoria">Victorian permit guide</TextLink>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        <LocalProofBlock suburbSlug={slug} />

        <section className="bg-off-white py-16 sm:py-24">
          <Container>
            <SectionHeading
              kicker="Services"
              title={`What we build in ${suburb.name}`}
              intro="Pricing guidance, process and detailed FAQs are on each service page."
            />
            <Reveal group className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
              {chooserServices.map((s) => {
                const image = siteImages[s.card.image];
                return (
                  <Link key={s.slug} href={s.route} className="group block bg-white">
                    <div className="relative aspect-[4/3] overflow-hidden bg-navy/5">
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 50vw, 20vw"
                        className="object-cover transition-transform duration-enter ease-brand group-hover:scale-[1.025]"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2 p-4">
                      <span className="font-body text-[15px] font-semibold text-navy">{s.name}</span>
                      <ChevronRight
                        aria-hidden="true"
                        size={16}
                        className="shrink-0 text-gold-deep transition-transform duration-hover ease-brand group-hover:translate-x-0.5"
                      />
                    </div>
                  </Link>
                );
              })}
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <TextLink href="/vastu-renovations-melbourne">Vastu renovations</TextLink>
              <TextLink href="/guides">Melbourne renovation guides</TextLink>
            </div>
          </Container>
        </section>

        {localFaqs.length > 0 && (
          <section className="py-16 sm:py-24">
            <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
              <SectionHeading kicker="FAQ" title={`${suburb.name} renovation questions`} />
              <ServiceFaq faqs={localFaqs} />
            </Container>
          </section>
        )}

        <section className="border-t border-navy/10 py-14">
          <Container>
            <h2 className="font-display text-[22px] font-bold text-navy">Nearby suburbs</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {nearbyLinked.map((n) => (
                <li key={n.slug}>
                  <Link
                    href={`/renovations/${n.slug}`}
                    className="inline-flex min-h-[44px] items-center border border-navy/15 px-4 font-body text-[15px] text-navy/85 transition-colors duration-hover hover:border-navy hover:text-navy"
                  >
                    {n.name}
                  </Link>
                </li>
              ))}
            </ul>
            {nearbyOther.length > 0 && (
              <p className="mt-4 font-body text-[14px] text-navy/60">
                We also service {nearbyOther.join(", ")}.
              </p>
            )}
            <div className="mt-6">
              <TextLink href="/renovations">All suburbs we service</TextLink>
            </div>
          </Container>
        </section>

        <section className="bg-gold-bright py-14 text-navy sm:py-16">
          <Container className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="max-w-2xl font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.08]">
              Planning a renovation in {suburb.name}?
            </h2>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={quoteHref} variant="dark">Get a free quote</ButtonLink>
              <PhoneButton variant="outlineLight" className="border-navy/40" />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
