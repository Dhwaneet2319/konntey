import Link from "next/link";
import { suburbLinks, featuredSuburbSlugs } from "@/content/suburbs";

/**
 * Compact "areas we serve" strip for the bottom of each service page.
 * Shows a curated set of relevant suburbs with natural anchor text plus a
 * link to the areas hub — not an exhaustive service-x-suburb keyword block.
 */
export default function ServiceAreasStrip({ service }: { service: string }) {
  const featured = suburbLinks.filter((s) =>
    featuredSuburbSlugs.includes(s.slug),
  );

  return (
    <section className="bg-navy border-t border-white/10 py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">
          Areas We Serve
        </div>
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-black uppercase tracking-tightest leading-[0.9] text-white max-w-3xl">
          {service} across Melbourne&apos;s west &amp; southeast
        </h2>
        <p className="mt-5 font-body text-[15px] leading-[1.8] text-white/70 max-w-2xl">
          We regularly work in these suburbs and the areas around them:
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {featured.map((s) => (
            <Link
              key={s.slug}
              href={`/renovations/${s.slug}`}
              className="border border-white/10 px-5 py-3 font-display text-[14px] font-bold uppercase tracking-button text-white/85 transition-colors hover:border-gold-bright hover:text-gold-bright"
            >
              {s.name}
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/renovations"
            className="inline-flex items-center gap-2 font-display text-[13px] font-black uppercase tracking-button text-gold-bright transition-colors hover:text-white"
          >
            View all suburbs we service →
          </Link>
        </div>
      </div>
    </section>
  );
}
