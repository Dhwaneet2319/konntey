import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui";
import { projectsForService, serviceLabels } from "@/content/projects";
import type { RelatedLink } from "@/content/services";

export type { RelatedLink };

function LinkList({ title, links }: { title: string; links: RelatedLink[] }) {
  return (
    <div>
      <h2 className="font-display text-[22px] font-bold text-navy">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group inline-flex items-start gap-2 font-body text-[16px] text-navy/80 transition-colors duration-hover hover:text-gold-deep"
            >
              <ArrowRight
                aria-hidden="true"
                size={15}
                strokeWidth={2.25}
                className="mt-1 shrink-0 text-gold-deep transition-transform duration-hover ease-brand group-hover:translate-x-0.5"
              />
              <span>{l.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Related projects (only when published case studies exist), guides and
 * adjacent services. Empty groups are omitted.
 */
export default function RelatedContent({
  serviceRoute,
  projectNoun,
  relatedGuides = [],
  relatedServices = [],
}: {
  serviceRoute: string;
  projectNoun: string;
  relatedGuides?: RelatedLink[];
  relatedServices?: RelatedLink[];
}) {
  const projects = projectsForService(serviceRoute)
    .slice(0, 4)
    .map((p) => ({
      href: `/projects/${p.slug}`,
      label: `${p.suburb} ${serviceLabels[p.primaryService].toLowerCase()} case study`,
    }));

  if (projects.length + relatedGuides.length + relatedServices.length === 0) return null;

  return (
    <section
      aria-label={`Related projects and guides for ${projectNoun}`}
      className="border-t border-navy/10 bg-white py-16 sm:py-20"
    >
      <Container className="grid gap-12 md:grid-cols-3">
        {projects.length > 0 && <LinkList title={`Recent ${projectNoun} projects`} links={projects} />}
        {relatedGuides.length > 0 && <LinkList title={`Planning a ${projectNoun}?`} links={relatedGuides} />}
        {relatedServices.length > 0 && <LinkList title="Related services" links={relatedServices} />}
      </Container>
    </section>
  );
}
