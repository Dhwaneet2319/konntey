import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { suburbLinks, featuredSuburbSlugs } from "@/content/suburbs";

const featured = featuredSuburbSlugs
  .map((slug) => suburbLinks.find((s) => s.slug === slug))
  .filter((s): s is (typeof suburbLinks)[number] => Boolean(s));

/**
 * Homepage "areas we serve" band. Server-rendered internal links to the
 * highest-intent suburb pages plus the /renovations hub — a strong local-SEO
 * crawl path that ships in the initial HTML.
 */
export default function AreasWeServe() {
  return (
    <section className="bg-off-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright">
              WHERE WE WORK
            </div>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,4rem)] font-black uppercase leading-[0.9] tracking-tightest text-navy">
              Renovation Builders <span className="text-gold-bright">Near You</span>
            </h2>
            <p className="mt-6 font-body text-[16px] leading-[1.8] text-navy/65 max-w-md">
              Konntey works across Melbourne&apos;s west and southeast every week. Pick your suburb
              for local pricing, permit guidance and project examples.
            </p>
            <Link
              href="/renovations"
              className="mt-8 inline-flex items-center gap-2 font-display text-[14px] font-black uppercase tracking-button text-navy border-b-2 border-gold-bright pb-1 hover:text-gold-bright transition-colors"
            >
              View all suburbs we service
              <ArrowRight size={16} strokeWidth={2.25} className="shrink-0" />
            </Link>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {featured.map((s) => (
                <Link
                  key={s.slug}
                  href={`/renovations/${s.slug}`}
                  className="group border border-navy/10 bg-white p-5 transition-colors hover:border-gold-bright"
                >
                  <span className="block font-display text-[16px] font-black uppercase tracking-tight text-navy group-hover:text-gold-bright transition-colors leading-[1.1]">
                    {s.name}
                  </span>
                  <span className="mt-1 block font-body text-[11px] uppercase tracking-kicker text-navy/40">
                    Renovations
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
