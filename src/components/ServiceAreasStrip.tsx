import Link from "next/link";
import { suburbLinks } from "@/content/suburbs";

/**
 * Compact "areas we serve" internal-linking strip for the bottom of each
 * service page. Server component — pure links, no client JS. Reinforces the
 * crawl path to every suburb landing page.
 */
export default function ServiceAreasStrip({ service }: { service: string }) {
  return (
    <section className="bg-navy border-t border-white/10 py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">
          Areas We Serve
        </div>
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-black uppercase tracking-tightest leading-[0.9] text-white max-w-3xl">
          {service} across Melbourne&apos;s west &amp; southeast
        </h2>
        <p className="mt-5 font-body text-[15px] leading-[1.8] text-white/60 max-w-2xl">
          Konntey delivers {service} to homeowners right across Melbourne. Find fixed-price,
          founder-led work in your suburb:
        </p>
        <div className="mt-8 flex flex-wrap gap-x-1.5 gap-y-2 font-body text-[13px] text-white/55">
          {suburbLinks.map((s, i) => (
            <span key={s.slug}>
              <Link
                href={`/renovations/${s.slug}`}
                className="transition-colors duration-150 hover:text-gold-bright"
              >
                {service.replace(/\b\w/, (c) => c.toUpperCase())} {s.name}
              </Link>
              {i < suburbLinks.length - 1 ? <span className="text-white/20"> · </span> : null}
            </span>
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
