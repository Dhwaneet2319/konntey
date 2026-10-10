import Link from "next/link";
import { Container, SectionHeading, TextLink } from "@/components/ui";
import { suburbLinks } from "@/content/suburbs";

/**
 * Homepage "areas we service" band: server-rendered links to every suburb
 * page, grouped by region, plus the /renovations hub.
 */
export default function AreasWeServe() {
  const regions = [
    { label: "West", items: suburbLinks.filter((s) => s.region === "West") },
    { label: "Southeast", items: suburbLinks.filter((s) => s.region === "Southeast") },
  ];
  return (
    <section aria-labelledby="areas-heading" className="bg-off-white py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <SectionHeading
            id="areas-heading"
            kicker="Where we work"
            title="Suburbs we service"
            intro="Local housing notes, typical projects and permit pointers for each area."
          />
          <div className="mt-6">
            <TextLink href="/renovations">All service areas</TextLink>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {regions.map((r) => (
            <div key={r.label}>
              <h3 className="font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-gold-deep">
                {r.label}
              </h3>
              <ul className="mt-3 grid grid-cols-2 gap-x-4">
                {r.items.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/renovations/${s.slug}`}
                      className="block py-1.5 font-body text-[16px] text-navy/80 underline-offset-4 hover:text-navy hover:underline"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
