import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const suburbs: Record<string, { name: string; nearby: string[] }> = {
  tarneit: { name: "Tarneit", nearby: ["Truganina", "Werribee", "Hoppers Crossing", "Wyndham Vale", "Manor Lakes"] },
  truganina: { name: "Truganina", nearby: ["Tarneit", "Williams Landing", "Laverton", "Hoppers Crossing"] },
  werribee: { name: "Werribee", nearby: ["Hoppers Crossing", "Wyndham Vale", "Point Cook", "Tarneit"] },
  "hoppers-crossing": { name: "Hoppers Crossing", nearby: ["Werribee", "Tarneit", "Williams Landing", "Point Cook"] },
  "point-cook": { name: "Point Cook", nearby: ["Williams Landing", "Hoppers Crossing", "Werribee", "Laverton"] },
  "wyndham-vale": { name: "Wyndham Vale", nearby: ["Manor Lakes", "Werribee", "Tarneit", "Melton"] },
  dandenong: { name: "Dandenong", nearby: ["Springvale", "Narre Warren", "Cranbourne", "Berwick"] },
  cranbourne: { name: "Cranbourne", nearby: ["Narre Warren", "Berwick", "Clyde", "Frankston"] },
  frankston: { name: "Frankston", nearby: ["Cranbourne", "Seaford", "Langwarrin", "Carrum Downs"] },
  "narre-warren": { name: "Narre Warren", nearby: ["Berwick", "Dandenong", "Cranbourne", "Officer"] },
  berwick: { name: "Berwick", nearby: ["Narre Warren", "Officer", "Pakenham", "Clyde"] },
  springvale: { name: "Springvale", nearby: ["Dandenong", "Clayton", "Noble Park", "Keysborough"] },
  pakenham: { name: "Pakenham", nearby: ["Officer", "Berwick", "Clyde", "Nar Nar Goon"] },
  "manor-lakes": { name: "Manor Lakes", nearby: ["Wyndham Vale", "Tarneit", "Werribee", "Melton"] },
  "williams-landing": { name: "Williams Landing", nearby: ["Laverton", "Point Cook", "Hoppers Crossing", "Truganina"] },
  laverton: { name: "Laverton", nearby: ["Williams Landing", "Point Cook", "Truganina", "Hoppers Crossing"] },
  officer: { name: "Officer", nearby: ["Pakenham", "Berwick", "Narre Warren", "Clyde"] },
  clyde: { name: "Clyde", nearby: ["Cranbourne", "Berwick", "Pakenham", "Officer"] },
  melton: { name: "Melton", nearby: ["Wyndham Vale", "Manor Lakes", "Tarneit", "Werribee"] },
};

type Props = { params: { suburb: string } };

export async function generateStaticParams() {
  return Object.keys(suburbs).map((suburb) => ({ suburb }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.suburb;
  const suburb = suburbs[slug];
  if (!suburb) return {};

  return {
    title: `Renovation Builders in ${suburb.name} Melbourne`,
    description: `Looking for professional renovation builders in ${suburb.name}? Konntey delivers home extensions, kitchen & bathroom renovations, and new builds across ${suburb.name} and surrounding Melbourne suburbs. Get a free quote today.`,
    alternates: {
      canonical: `/renovations/${slug}`,
    },
    openGraph: {
      title: `Renovation Builders in ${suburb.name} Melbourne | Konntey H&R`,
      description: `Looking for professional renovation builders in ${suburb.name}? Konntey delivers home extensions, kitchen & bathroom renovations, and new builds across ${suburb.name} and surrounding Melbourne suburbs. Get a free quote today.`,
      url: `https://www.konnteyhomerenovations.com.au/renovations/${slug}`,
      siteName: "Konntey Home & Renovations",
      locale: "en_AU",
      type: "website",
    },
  };
}

export default function SuburbPage({ params }: Props) {
  const slug = params.suburb;
  const suburb = suburbs[slug];
  if (!suburb) notFound();

  const services = [
    { name: `Kitchen Renovation ${suburb.name}`, desc: `Complete kitchen renovations in ${suburb.name}. From budget refreshes to full luxury transformations with premium materials.` },
    { name: `Bathroom Renovation ${suburb.name}`, desc: `Affordable bathroom renovation and remodeling in ${suburb.name}. Modern designs, quality fixtures, and expert tiling.` },
    { name: `Home Extension ${suburb.name}`, desc: `Expand your living space with a professionally built home extension in ${suburb.name}. Professional builders, council-approved plans.` },
    { name: `Deck & Pergola ${suburb.name}`, desc: `Premium timber deck and pergola installation in ${suburb.name}. Built to withstand Australian weather.` },
    { name: `Interior Painting ${suburb.name}`, desc: `Professional interior and exterior painting services in ${suburb.name}. Sharp lines, clean finishes.` },
  ];

  const suburbSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Home Renovations ${suburb.name}`,
    description: `Professional renovation company servicing ${suburb.name} and surrounding suburbs. Kitchen renovations, bathroom renovations, home extensions, deck building and interior painting.`,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: "Konntey Home & Renovations",
      url: "https://www.konnteyhomerenovations.com.au",
      telephone: "+61493191798",
      address: { "@type": "PostalAddress", addressLocality: "Melbourne", addressRegion: "VIC", addressCountry: "AU" },
    },
    areaServed: [
      { "@type": "City", name: suburb.name },
      ...suburb.nearby.map((n) => ({ "@type": "City" as const, name: n })),
    ],
    serviceType: "Home Renovation",
  };

  return (
    <div className="bg-navy text-white font-body min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(suburbSchema) }}
      />
      {/* Hero */}
      <section className="relative py-32 sm:py-44 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="font-body text-[12px] font-semibold uppercase tracking-[3px] text-gold-bright">
            RENOVATION COMPANY {suburb.name.toUpperCase()}
          </div>
          <h1 className="mt-4 font-display text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-[0.85] tracking-tighter text-white">
            HOME RENOVATIONS <br />
            <span className="text-gold-bright">{suburb.name.toUpperCase()}</span>
          </h1>
          <p className="mt-8 max-w-2xl font-body text-[18px] leading-[1.8] text-white/90">
            Konntey Home & Renovations is {suburb.name}&apos;s professional renovation company. 
            We deliver affordable kitchen renovations, bathroom renovations, home extensions, deck building 
            and interior painting across {suburb.name} and nearby suburbs including{" "}
            {suburb.nearby.join(", ")}. Professional, insured, and family-run.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/#contact"
              className="bg-gold-bright px-8 py-5 font-display text-[16px] font-black uppercase tracking-button text-navy"
            >
              Get a Free Quote in {suburb.name}
            </Link>
            <Link
              href="/"
              className="border-2 border-white/20 px-8 py-5 font-display text-[16px] font-black uppercase tracking-button text-white hover:border-gold-bright hover:text-gold-bright transition-colors"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-navy-light py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-black uppercase tracking-tightest text-white mb-12">
            Our Services in <span className="text-gold-bright">{suburb.name}</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => (
              <div
                key={svc.name}
                className="border border-white/10 p-8 hover:border-gold-bright/30 transition-colors"
              >
                <h3 className="font-display text-[20px] font-black uppercase tracking-button text-gold-bright">
                  {svc.name}
                </h3>
                <p className="mt-4 font-body text-[15px] leading-relaxed text-white/85">
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Renovate content — unique per suburb for SEO depth */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-black uppercase tracking-tightest text-white mb-8">
            Why Choose Konntey in <span className="text-gold-bright">{suburb.name}</span>?
          </h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6 font-body text-[16px] leading-[1.8] text-white/90">
              <p>
                {suburb.name} homeowners deserve renovation builders who understand the local area.
                Konntey Home &amp; Renovations is a professional and insured renovation company based in
                Melbourne, servicing {suburb.name} and nearby suburbs including {suburb.nearby.join(", ")}.
              </p>
              <p>
                Whether you need an affordable kitchen renovation, a complete bathroom remodel,
                a home extension for your growing family, or a new deck and outdoor living space —
                we deliver transparent pricing, clear communication, and quality craftsmanship
                on every project in {suburb.name}.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Free on-site consultation and quote",
                "Professional and fully insured in Victoria",
                "Transparent, fair price agreements",
                "One dedicated point of contact throughout",
                "Servicing " + suburb.name + " and all nearby suburbs",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 bg-gold-bright" />
                  <span className="font-body text-[15px] text-white/85">{item}</span>
                </div>
              ))}
              <div className="mt-8">
                <Link
                  href="/#contact"
                  className="bg-gold-bright px-8 py-5 font-display text-[15px] font-black uppercase tracking-button text-navy inline-flex"
                >
                  Get a Free Quote in {suburb.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby suburbs internal links */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="font-display text-[24px] font-black uppercase tracking-button text-white mb-6">
            Also Servicing Nearby Suburbs
          </h2>
          <div className="flex flex-wrap gap-3">
            {suburb.nearby.map((nearbyName) => {
              const nearbySlug = nearbyName.toLowerCase().replace(/\s+/g, "-");
              const exists = suburbs[nearbySlug];
              return exists ? (
                <Link
                  key={nearbyName}
                  href={`/renovations/${nearbySlug}`}
                  className="border border-white/10 px-6 py-3 font-display text-[14px] font-bold uppercase tracking-button text-white/85 hover:border-gold-bright hover:text-gold-bright transition-colors"
                >
                  Renovations {nearbyName}
                </Link>
              ) : (
                <span
                  key={nearbyName}
                  className="border border-white/5 px-6 py-3 font-display text-[14px] font-bold uppercase tracking-button text-white/40"
                >
                  Renovations {nearbyName}
                </span>
              );
            })}
          </div>
          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-display text-[15px] font-black uppercase tracking-button text-gold-bright hover:text-white transition-colors"
            >
              <ArrowLeft size={16} strokeWidth={2.25} className="shrink-0" />
              <span>Back to Konntey Home</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
