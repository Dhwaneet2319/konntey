import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { publishedProjects, projectsHubLive } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";

/**
 * Homepage proof-first section: shows up to three featured project cards
 * when published, owner-approved case studies exist. Until then it renders
 * a compact, honest "Our work" teaser — never fake cards or placeholder
 * testimonials.
 */
export default function FeaturedProjects() {
  const featured = publishedProjects().slice(0, 3);

  if (featured.length === 0) {
    // Compact teaser only — no invented content.
    return (
      <section
        aria-labelledby="our-work-heading"
        className="border-y border-navy/8 bg-off-white py-14 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              id="our-work-heading"
              className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-black uppercase tracking-tightest text-navy"
            >
              Our Work
            </h2>
            <p className="mt-3 max-w-xl font-body text-[15px] leading-[1.7] text-navy/70">
              Detailed case studies of completed Melbourne renovations are on
              their way. In the meantime, see real before-and-after results on
              our kitchen and bathroom pages.
            </p>
          </div>
          <Link
            href={projectsHubLive() ? "/projects" : "/kitchen-renovations-melbourne"}
            className="inline-flex w-fit items-center gap-2 border-2 border-navy px-6 py-4 font-display text-[14px] font-black uppercase tracking-button text-navy transition-colors hover:bg-navy hover:text-gold-bright"
          >
            <span>
              {projectsHubLive() ? "View recent projects" : "See kitchen transformations"}
            </span>
            <ArrowRight size={15} strokeWidth={2.5} className="shrink-0" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="featured-projects-heading"
      className="bg-off-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-deep">
          COMPLETED PROJECTS
        </div>
        <h2
          id="featured-projects-heading"
          className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9] text-navy"
        >
          Renovations Built for Real Melbourne Homes
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-display text-[15px] font-black uppercase tracking-button text-gold-deep hover:text-navy transition-colors"
          >
            <span>Browse all completed projects</span>
            <ArrowRight size={15} strokeWidth={2.5} className="shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}
