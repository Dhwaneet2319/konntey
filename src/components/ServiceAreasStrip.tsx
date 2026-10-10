import Link from "next/link";
import { Container, TextLink } from "@/components/ui";
import { suburbLinks, featuredSuburbSlugs } from "@/content/suburbs";

/**
 * Compact "areas we serve" strip for service pages: a curated set of suburb
 * pages plus the areas hub, not an exhaustive keyword block.
 */
export default function ServiceAreasStrip({ service }: { service: string }) {
  const featured = suburbLinks.filter((s) => featuredSuburbSlugs.includes(s.slug));

  return (
    <section className="bg-navy py-14 text-white">
      <Container>
        <h2 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-tight">
          {service} across Melbourne&apos;s west and southeast
        </h2>
        <p className="mt-3 max-w-2xl font-body text-[16px] leading-[1.7] text-white/70">
          Local information for some of the suburbs we service:
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {featured.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/renovations/${s.slug}`}
                className="inline-flex min-h-[44px] items-center border border-white/20 px-4 font-body text-[15px] text-white/85 transition-colors duration-hover hover:border-gold-bright hover:text-gold-bright"
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <TextLink href="/renovations" tone="dark">
            All suburbs we service
          </TextLink>
        </div>
      </Container>
    </section>
  );
}
