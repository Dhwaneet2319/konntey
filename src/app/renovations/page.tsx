import type { Metadata } from "next";
import { jsonLd, pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/chat/FloatingActions";
import { suburbLinks } from "@/content/suburbs";
import { quoteKind } from "@/content/business";

const BASE = "https://www.konnteyhomerenovations.com.au";

export const metadata: Metadata = pageMetadata({
  title: "Renovations in Melbourne's west & southeast",
  description:
    "Renovations across Melbourne's western and south-eastern suburbs, from Tarneit and Point Cook to Dandenong and Berwick, with local notes for each suburb.",
  path: "/renovations",
});

const regions: { title: string; region: "West" | "Southeast"; intro: string }[] = [
  {
    title: "Melbourne's West",
    region: "West",
    intro:
      "From the fast-growing estates of Tarneit, Truganina and Manor Lakes to established Werribee, Hoppers Crossing and Laverton. Newer homes often need builder-grade kitchens and bathrooms upgraded and outdoor living added; older brick homes suit full renovations and extensions.",
  },
  {
    title: "Melbourne's Southeast",
    region: "Southeast",
    intro:
      "From established Dandenong, Springvale and Frankston to the growth areas of Cranbourne, Clyde, Officer and Pakenham. Expect everything from first full renovations of 1990s homes to decks, pergolas and personalisation for new builds.",
  },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Suburbs serviced by Konntey Home & Renovations",
  itemListElement: suburbLinks.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${BASE}/renovations/${s.slug}`,
    name: `Renovations ${s.name}`,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    { "@type": "ListItem", position: 2, name: "Areas we service", item: `${BASE}/renovations` },
  ],
};

export default function RenovationsHubPage() {
  return (
    <div className="bg-navy text-white font-body min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemListSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />
      <NavBar theme="dark" />
      <FloatingActions />

      <main id="main" className="flex-grow">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="border-b border-white/10 px-4 sm:px-6 lg:px-8 pt-[110px]">
          <div className="mx-auto max-w-[1216px] pb-4">
            <ol className="flex flex-wrap items-center gap-2 font-body text-[13px] text-white/60">
              <li><Link href="/" className="transition-colors hover:text-gold-bright">Home</Link></li>
              <li aria-hidden="true" className="flex items-center"><ChevronRight size={14} className="text-white/30" /></li>
              <li aria-current="page" className="text-white/90">Areas we service</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-20 sm:pb-16">
          <div className="mx-auto max-w-[1216px]">
            <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright">
              AREAS WE SERVICE
            </div>
            <h1 className="mt-4 font-display text-[clamp(3rem,8vw,6rem)] font-bold uppercase leading-[0.85] tracking-tighter text-white">
              Home Renovations <br />
              <span className="text-gold-bright">Across Melbourne</span>
            </h1>
            <p className="mt-8 max-w-2xl font-body text-[18px] leading-[1.8] text-white/90">
              Konntey Home &amp; Renovations delivers new home builds, kitchen and bathroom renovations,
              home extensions, decks and painting right across Melbourne&apos;s west and southeast. Choose
              your suburb for local housing notes, permit information and the services available.
            </p>
          </div>
        </section>

        {/* Suburb lists by region */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="mx-auto max-w-[1216px] grid gap-12 lg:grid-cols-2">
            {regions.map(({ title, region, intro }) => (
              <div key={region}>
                <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold uppercase tracking-tightest leading-[0.9] text-white">
                  {title}
                </h2>
                <p className="mt-4 mb-8 max-w-xl font-body text-[16px] leading-[1.7] text-white/75">{intro}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {suburbLinks
                    .filter((s) => s.region === region)
                    .map((s) => (
                      <Link
                        key={s.slug}
                        href={`/renovations/${s.slug}`}
                        className="group flex items-center justify-between border border-white/10 px-6 py-4 transition-colors hover:border-gold-bright/40"
                      >
                        <span className="font-display text-[15px] font-bold uppercase tracking-button text-white/85 group-hover:text-gold-bright transition-colors">
                          {s.name}
                        </span>
                        <ArrowRight size={15} strokeWidth={2.25} className="shrink-0 text-white/30 transition-all group-hover:text-gold-bright group-hover:translate-x-1" />
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services cross-links */}
        <section className="bg-navy-light py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="mx-auto max-w-[1216px]">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold uppercase tracking-tightest leading-[0.9] text-white mb-8">
              Explore Our <span className="text-gold-bright">Services</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "New Home Builds", href: "/new-home-builders-melbourne" },
                { label: "Kitchen Renovations", href: "/kitchen-renovations-melbourne" },
                { label: "Bathroom Renovations", href: "/bathroom-renovations-melbourne" },
                { label: "Home Extensions", href: "/home-extensions-melbourne" },
                { label: "Decks & Pergolas", href: "/decks-pergolas-melbourne" },
                { label: "Painting", href: "/interior-painting-melbourne" },
                { label: "Vastu Renovations", href: "/vastu-renovations-melbourne" },
              ].map((svc) => (
                <Link
                  key={svc.href}
                  href={svc.href}
                  className="border border-white/10 px-6 py-3 font-display text-[14px] font-bold uppercase tracking-button text-white/85 hover:border-gold-bright hover:text-gold-bright transition-colors"
                >
                  {svc.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gold-bright text-navy py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-[1216px]">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase tracking-tightest leading-[0.9] max-w-3xl mx-auto">
              Can&apos;t see your suburb?
            </h2>
            <p className="mt-6 font-body text-[17px] leading-[1.8] text-navy/80 max-w-2xl mx-auto">
              We service Melbourne&apos;s west and southeast and can often help further afield. Get in touch for a free consultation and a {quoteKind}.
            </p>
            <div className="mt-10">
              <Link
                href="/quote"
                className="inline-flex bg-navy px-8 py-4 font-display text-[14px] font-bold uppercase tracking-button text-gold-bright hover:-translate-y-0.5 transition-transform"
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
