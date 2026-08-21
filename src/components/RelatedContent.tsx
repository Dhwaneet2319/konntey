import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projectsForService, serviceLabels } from "@/content/projects";

export interface RelatedLink {
  label: string;
  href: string;
}

/**
 * Contextual related-content module for service pages: real project proof
 * (when published projects exist for the service), relevant guides, genuinely
 * adjacent services and a concise link to the areas hub. Sections with no
 * content are omitted — never filled with generic keyword lists.
 */
export default function RelatedContent({
  serviceRoute,
  serviceName,
  relatedGuides = [],
  relatedServices = [],
  areasServed = [],
}: {
  serviceRoute: string;
  serviceName: string;
  relatedGuides?: RelatedLink[];
  relatedServices?: RelatedLink[];
  /** A curated handful of relevant suburb links, not an exhaustive list. */
  areasServed?: RelatedLink[];
}) {
  const projects = projectsForService(serviceRoute).slice(0, 4);

  const hasAnything =
    projects.length > 0 ||
    relatedGuides.length > 0 ||
    relatedServices.length > 0 ||
    areasServed.length > 0;
  if (!hasAnything) return null;

  return (
    <section
      aria-label={`Related projects and guides for ${serviceName}`}
      className="bg-off-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-navy/8"
    >
      <div className="mx-auto max-w-[1600px] grid gap-12 lg:grid-cols-3">
        {projects.length > 0 && (
          <div>
            <h2 className="font-display text-[18px] font-black uppercase tracking-button text-navy">
              Recent {serviceName} Projects
            </h2>
            <ul className="mt-6 space-y-3">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group inline-flex items-center gap-2 font-body text-[15px] text-navy/80 transition-colors hover:text-gold-deep"
                  >
                    <ArrowRight
                      size={14}
                      strokeWidth={2.5}
                      className="shrink-0 text-gold-deep"
                    />
                    <span>
                      {p.suburb} {serviceLabels[p.primaryService].toLowerCase()}{" "}
                      case study
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {relatedGuides.length > 0 && (
          <div>
            <h2 className="font-display text-[18px] font-black uppercase tracking-button text-navy">
              Planning a {serviceName}?
            </h2>
            <ul className="mt-6 space-y-3">
              {relatedGuides.map((g) => (
                <li key={g.href}>
                  <Link
                    href={g.href}
                    className="group inline-flex items-center gap-2 font-body text-[15px] text-navy/80 transition-colors hover:text-gold-deep"
                  >
                    <ArrowRight
                      size={14}
                      strokeWidth={2.5}
                      className="shrink-0 text-gold-deep"
                    />
                    <span>{g.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {(relatedServices.length > 0 || areasServed.length > 0) && (
          <div className="space-y-10">
            {relatedServices.length > 0 && (
              <div>
                <h2 className="font-display text-[18px] font-black uppercase tracking-button text-navy">
                  Related Services
                </h2>
                <ul className="mt-6 space-y-3">
                  {relatedServices.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        className="group inline-flex items-center gap-2 font-body text-[15px] text-navy/80 transition-colors hover:text-gold-deep"
                      >
                        <ArrowRight
                          size={14}
                          strokeWidth={2.5}
                          className="shrink-0 text-gold-deep"
                        />
                        <span>{s.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {areasServed.length > 0 && (
              <div>
                <h2 className="font-display text-[18px] font-black uppercase tracking-button text-navy">
                  Areas We Serve
                </h2>
                <ul className="mt-6 space-y-3">
                  {areasServed.map((a) => (
                    <li key={a.href}>
                      <Link
                        href={a.href}
                        className="group inline-flex items-center gap-2 font-body text-[15px] text-navy/80 transition-colors hover:text-gold-deep"
                      >
                        <ArrowRight
                          size={14}
                          strokeWidth={2.5}
                          className="shrink-0 text-gold-deep"
                        />
                        <span>{a.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/renovations"
                  className="mt-4 inline-block font-body text-[14px] font-medium text-gold-deep hover:underline"
                >
                  All areas we serve →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
