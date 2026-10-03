import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/chat/FloatingActions";
import { guides, GUIDES_BASE_URL } from "@/content/guides";

export const metadata: Metadata = {
  title: "Renovation Guides Melbourne | Costs, Permits & Advice",
  description:
    "Practical renovation guides for Melbourne homeowners — kitchen and bathroom cost breakdowns, Victorian permit rules, and how to choose a builder. Free, no fluff.",
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    title: "Renovation Guides Melbourne | Konntey H&R",
    description:
      "Kitchen and bathroom cost guides, Victorian permit rules, extension vs moving comparisons, and how to choose a renovation builder in Melbourne.",
    url: `${GUIDES_BASE_URL}/guides`,
    siteName: "Konntey Home & Renovations",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/images/hero-main.webp",
        width: 1200,
        height: 630,
        alt: "Konntey Home & Renovations — Melbourne renovation guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renovation Guides Melbourne | Konntey H&R",
    description:
      "Kitchen & bathroom cost guides, Victorian permit rules, and how to choose a builder in Melbourne.",
    images: ["/images/hero-main.webp"],
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Konntey Renovation Guides",
  itemListElement: guides.map((g, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${GUIDES_BASE_URL}/guides/${g.slug}`,
    name: g.title,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: GUIDES_BASE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${GUIDES_BASE_URL}/guides` },
  ],
};

export default function GuidesIndexPage() {
  return (
    <div className="bg-navy text-white font-body min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <NavBar theme="dark" />
      <FloatingActions />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="border-b border-white/10 px-4 sm:px-6 lg:px-8 pt-[110px]">
          <div className="mx-auto max-w-[1600px] pb-4">
            <ol className="flex flex-wrap items-center gap-2 font-body text-[13px] text-white/60">
              <li><Link href="/" className="transition-colors hover:text-gold-bright">Home</Link></li>
              <li aria-hidden="true" className="flex items-center"><ChevronRight size={14} className="text-white/30" /></li>
              <li aria-current="page" className="text-white/90">Guides</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8 pt-16 pb-14 sm:pt-20 sm:pb-20">
          <div className="mx-auto max-w-[1600px]">
            <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright">
              RENOVATION GUIDES
            </div>
            <h1 className="mt-4 font-display text-[clamp(3rem,8vw,6rem)] font-black uppercase leading-[0.85] tracking-tighter text-white">
              Renovation Guides <br />
              <span className="text-gold-bright">Melbourne</span>
            </h1>
            <p className="mt-8 max-w-2xl font-body text-[18px] leading-[1.8] text-white/90">
              Clear, honest answers to the questions Melbourne homeowners actually ask before they
              renovate — real cost breakdowns, Victorian permit rules, and how to hire the right
              builder. No fluff, no sales pitch.
            </p>
          </div>
        </section>

        {/* Guide grid */}
        <section className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="mx-auto max-w-[1600px]">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {guides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="group flex flex-col border border-white/10 bg-navy-light p-8 transition-colors hover:border-gold-bright/40"
                >
                  <div className="flex items-center gap-3 font-body text-[11px] font-semibold uppercase tracking-kicker text-gold-bright">
                    <span>{g.category}</span>
                    <span className="text-white/25">•</span>
                    <span className="text-white/50">{g.readMinutes} min read</span>
                  </div>
                  <h2 className="mt-5 font-display text-[24px] font-black uppercase leading-[1] tracking-tight text-white group-hover:text-gold-bright transition-colors">
                    {g.title}
                  </h2>
                  <p className="mt-4 font-body text-[15px] leading-[1.7] text-white/70 flex-grow">
                    {g.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-display text-[13px] font-black uppercase tracking-button text-white/60 group-hover:text-gold-bright transition-colors">
                    Read guide <ArrowRight size={15} strokeWidth={2.25} className="shrink-0 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gold-bright text-navy py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-[1600px]">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9] max-w-3xl mx-auto">
              Done reading? Let&apos;s talk about your project.
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
