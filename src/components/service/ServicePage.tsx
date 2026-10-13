import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/chat/FloatingActions";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Reveal from "@/components/Reveal";
import ServiceFaq from "@/components/ServiceFaq";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import RelatedContent from "@/components/RelatedContent";
import ServiceAreasStrip from "@/components/ServiceAreasStrip";
import { ButtonLink, Container, Kicker, PhoneButton, SectionHeading, TextLink } from "@/components/ui";
import { BASE_URL, business, claimText, isClaimApproved } from "@/content/business";
import { isVerifiedWork, siteImages } from "@/content/images";
import type { ServiceContent } from "@/content/services";
import { breadcrumbSchema, jsonLd, providerRef } from "@/lib/seo";

export default function ServicePage({ service }: { service: ServiceContent }) {
  const quoteHref = `/quote?service=${service.slug}`;
  const heroImage = siteImages[service.hero.image];
  const gallery = (service.gallery ?? []).map((key) => siteImages[key]);
  const galleryVerified = isVerifiedWork(...gallery);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.schemaName,
    serviceType: service.serviceType,
    provider: providerRef,
    areaServed: { "@type": "City", name: "Melbourne" },
    description: service.meta.description,
    url: `${BASE_URL}${service.route}`,
    image: `${BASE_URL}${heroImage.src}`,
    // The same project types listed on the page, so the schema describes
    // exactly what a visitor can read.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.types.heading,
      itemListElement: service.types.items.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item.title, description: item.desc },
      })),
    },
    ...(service.pricing && isClaimApproved("priceRanges")
      ? {
          offers: {
            "@type": "AggregateOffer",
            lowPrice: String(service.pricing.low),
            highPrice: String(service.pricing.high),
            priceCurrency: "AUD",
          },
        }
      : {}),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-body text-navy">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(serviceSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbSchema([{ name: service.name, path: service.route }]))}
      />
      <NavBar theme="dark" />
      <FloatingActions />

      <main id="main" className="flex-grow">
        {/* Hero */}
        <section className="bg-navy pb-14 pt-[104px] text-white sm:pb-20 lg:pt-[120px]">
          <Container>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 font-body text-[13px] text-white/60">
                <li>
                  <Link href="/" className="hover:text-gold-bright">Home</Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight size={13} />
                </li>
                <li aria-current="page" className="text-white/85">{service.name}</li>
              </ol>
            </nav>
            <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
              <div>
                <Kicker tone="dark">{service.hero.kicker}</Kicker>
                <h1 className="mt-4 font-display text-[clamp(2.25rem,4.6vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.015em]">
                  {service.hero.title}
                  {service.hero.accent && (
                    <span className="mt-1 block text-gold-bright">{service.hero.accent}</span>
                  )}
                </h1>
                <p className="mt-6 max-w-xl font-body text-[17px] leading-[1.7] text-white/80">
                  {service.hero.intro}
                </p>
                <div data-hero-ctas className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={quoteHref}>{service.hero.ctaLabel}</ButtonLink>
                  <PhoneButton variant="outlineDark" label={`Call ${business.phoneDisplay}`} />
                </div>
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-light">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), 600px"
                  className="object-cover"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Cost + pricing guide */}
        {service.cost && (
          <section className="py-16 sm:py-24">
            <Container className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
              <Reveal>
                <SectionHeading kicker="Pricing" title={service.cost.heading} />
                <p className="mt-6 max-w-2xl font-body text-[17px] leading-[1.75] text-navy/75">
                  {service.cost.body}
                </p>
              </Reveal>
              {service.pricing && (
                <Reveal className="self-start">
                  <table className="w-full border border-navy/10 text-left font-body">
                    <caption className="sr-only">{claimText("priceRanges")} for {service.name.toLowerCase()}</caption>
                    <thead className="bg-navy text-white">
                      <tr>
                        <th scope="col" className="px-5 py-3 text-[13px] font-semibold">Scope</th>
                        <th scope="col" className="px-5 py-3 text-[13px] font-semibold">{claimText("priceRanges")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {service.pricing.rows.map((row) => (
                        <tr key={row.scope} className="border-t border-navy/10">
                          <th scope="row" className="px-5 py-3.5 text-[15px] font-normal text-navy/80">{row.scope}</th>
                          <td className="whitespace-nowrap px-5 py-3.5 text-[15px] font-semibold text-navy">{row.range}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-4 font-body text-[14px] leading-[1.65] text-navy/65">
                    {service.pricing.note} Ranges are a guide only; your quote is based on your scope.
                  </p>
                </Reveal>
              )}
            </Container>
          </section>
        )}

        {/* Vastu principles */}
        {service.principles && (
          <section className="py-16 sm:py-24">
            <Container>
              <SectionHeading kicker="Principles" title={service.principles.heading} intro={service.principles.intro} />
              <Reveal group className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {service.principles.items.map((item) => (
                  <div key={item.title} className="border-t-2 border-gold-bright bg-off-white p-6">
                    <h3 className="font-display text-[21px] font-bold text-navy">{item.title}</h3>
                    <p className="mt-2 font-body text-[15px] leading-[1.7] text-navy/75">{item.desc}</p>
                  </div>
                ))}
              </Reveal>
            </Container>
          </section>
        )}

        {/* Types */}
        <section className="bg-off-white py-16 sm:py-24">
          <Container>
            <SectionHeading kicker="What we do" title={service.types.heading} />
            <Reveal group className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {service.types.items.map((item) => (
                <div key={item.title} className="bg-white p-6 sm:p-7">
                  <h3 className="font-display text-[21px] font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 font-body text-[15px] leading-[1.7] text-navy/75">{item.desc}</p>
                </div>
              ))}
            </Reveal>
            <div className="mt-8">
              <TextLink href={quoteHref}>Ask about your {service.projectNoun}</TextLink>
            </div>
          </Container>
        </section>

        {/* Gallery */}
        {gallery.length > 0 && (
          <section className="py-16 sm:py-24">
            <Container>
              <SectionHeading
                kicker={galleryVerified ? "Our work" : "Finishes & details"}
                title={galleryVerified ? `Recent ${service.projectNoun} work` : "The kind of finish to expect"}
              />
              <Reveal group className={`mt-10 grid grid-cols-2 gap-3 sm:gap-4 ${gallery.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
                {gallery.map((img) => (
                  <div key={img.src} className="group relative aspect-[4/5] overflow-hidden bg-navy/5">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-enter ease-brand group-hover:scale-[1.025]"
                    />
                  </div>
                ))}
              </Reveal>
              {!galleryVerified && (
                <p className="mt-4 font-body text-[13px] text-navy/70">
                  Example images — not presented as specific Konntey projects.
                </p>
              )}
            </Container>
          </section>
        )}

        {/* Before / after */}
        {service.beforeAfter && (
          <section id="before-after" className="scroll-mt-24 bg-off-white py-16 sm:py-24">
            <Container>
              <SectionHeading
                kicker="Before & after"
                title={
                  isVerifiedWork(siteImages[service.beforeAfter.before], siteImages[service.beforeAfter.after])
                    ? "A real transformation"
                    : "What a renovation can change"
                }
                intro="Drag the divider, use the arrow keys or the buttons below to compare."
                className="mx-auto text-center [&_p]:justify-center"
              />
              <div className="mt-10">
                <BeforeAfterSlider
                  before={siteImages[service.beforeAfter.before]}
                  after={siteImages[service.beforeAfter.after]}
                  placement={`service_${service.slug}`}
                />
              </div>
            </Container>
          </section>
        )}

        {/* Process */}
        <section className="bg-navy py-16 text-white sm:py-24">
          <Container>
            <SectionHeading kicker="How it works" title={service.process.heading} tone="dark" />
            <div className={`mt-10 grid gap-10 ${service.process.image ? "lg:grid-cols-[1.2fr_1fr]" : ""}`}>
              <Reveal
                as="ol"
                group
                className={`grid gap-x-8 gap-y-6 sm:grid-cols-2 ${service.process.image ? "" : "lg:grid-cols-4"}`}
              >
                {service.process.steps.map((step, i) => (
                  <li key={step.title} className="border-t border-white/15 pt-4">
                    <span className="font-body text-[13px] font-semibold tabular-nums text-gold-bright">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 font-display text-[19px] font-bold">{step.title}</h3>
                    <p className="mt-1.5 font-body text-[15px] leading-[1.65] text-white/70">{step.desc}</p>
                  </li>
                ))}
              </Reveal>
              {service.process.image && (
                <div className="relative hidden aspect-[4/5] overflow-hidden lg:block">
                  <Image
                    src={siteImages[service.process.image].src}
                    alt={siteImages[service.process.image].alt}
                    fill
                    sizes="40vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* Compliance */}
        {service.compliance && (
          <section className="py-16 sm:py-24">
            <Container>
              <SectionHeading kicker="Compliance" title={service.compliance.heading} intro={service.compliance.intro} />
              <ul className="mt-8 max-w-3xl space-y-3">
                {service.compliance.items.map((item) => (
                  <li key={item} className="flex gap-3 font-body text-[16px] leading-[1.65] text-navy/80">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-gold-bright" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {service.compliance.note && (
                <p className="mt-6 max-w-3xl font-body text-[15px] text-navy/65">{service.compliance.note}</p>
              )}
              <div className="mt-6">
                <TextLink href="/guides/renovation-permits-victoria">Read the Victorian permit guide</TextLink>
              </div>
            </Container>
          </section>
        )}

        <ServiceTestimonials testimonials={service.testimonials} />

        {/* FAQ */}
        <section className={`py-16 sm:py-24 ${service.compliance ? "bg-off-white" : ""}`}>
          <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div>
              <SectionHeading kicker="FAQ" title="Common questions" />
              <p className="mt-5 font-body text-[16px] leading-[1.7] text-navy/75">
                Comparing quotes? Our checklist shows what a complete renovation quote should include.
              </p>
              <div className="mt-4">
                <TextLink href="/guides/renovation-quote-checklist-melbourne">Quote comparison checklist</TextLink>
              </div>
            </div>
            <ServiceFaq faqs={service.faqs} />
          </Container>
        </section>

        {/* Final CTA */}
        <section className="bg-gold-bright py-16 text-navy sm:py-20">
          <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-[clamp(1.875rem,3.4vw,2.75rem)] font-bold leading-[1.05]">
                {service.finalCta.heading}
              </h2>
              <p className="mt-3 font-body text-[17px] leading-[1.7] text-navy/80">{service.finalCta.body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={quoteHref} variant="dark">Get a free quote</ButtonLink>
              <PhoneButton label={service.finalCta.phoneLabel} variant="outlineLight" className="border-navy/40" />
            </div>
          </Container>
        </section>

        <RelatedContent
          serviceRoute={service.route}
          projectNoun={service.projectNoun}
          relatedGuides={service.relatedGuides}
          relatedServices={service.relatedServices}
        />

        <ServiceAreasStrip service={service.areasLabel} />
      </main>

      <Footer />
    </div>
  );
}
