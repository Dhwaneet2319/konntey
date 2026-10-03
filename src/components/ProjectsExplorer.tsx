"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectService } from "@/content/projects";
import { serviceLabels } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";

/**
 * Crawl-safe project browser. All project cards are server-rendered into the
 * initial HTML (client components are SSR'd); filtering happens purely
 * client-side with no query-string URLs, so no duplicate indexable pages are
 * created. The unfiltered hub remains the single canonical page.
 */
export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [service, setService] = useState<ProjectService | "all">("all");
  const [region, setRegion] = useState<"all" | "West" | "Southeast">("all");

  const services = useMemo(() => {
    const present = new Set(projects.map((p) => p.primaryService));
    return Array.from(present);
  }, [projects]);

  const regions = useMemo(() => {
    const present = new Set(
      projects.map((p) => p.region).filter((r): r is "West" | "Southeast" => !!r),
    );
    return Array.from(present);
  }, [projects]);

  const visible = projects.filter(
    (p) =>
      (service === "all" || p.primaryService === service) &&
      (region === "all" || p.region === region),
  );

  const chipClass = (active: boolean) =>
    `border px-4 py-2 font-display text-[13px] font-bold uppercase tracking-button transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
      active
        ? "border-navy bg-navy text-gold-bright"
        : "border-navy/20 text-navy/70 hover:border-navy/50 hover:text-navy"
    }`;

  return (
    <div>
      {(services.length > 1 || regions.length > 1) && (
        <div className="mb-10 space-y-4">
          {services.length > 1 && (
            <div
              role="group"
              aria-label="Filter projects by service"
              className="flex flex-wrap gap-2"
            >
              <button
                type="button"
                onClick={() => setService("all")}
                aria-pressed={service === "all"}
                className={chipClass(service === "all")}
              >
                All services
              </button>
              {services.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setService(s)}
                  aria-pressed={service === s}
                  className={chipClass(service === s)}
                >
                  {serviceLabels[s]}
                </button>
              ))}
            </div>
          )}
          {regions.length > 1 && (
            <div
              role="group"
              aria-label="Filter projects by region"
              className="flex flex-wrap gap-2"
            >
              <button
                type="button"
                onClick={() => setRegion("all")}
                aria-pressed={region === "all"}
                className={chipClass(region === "all")}
              >
                All regions
              </button>
              {regions.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRegion(r)}
                  aria-pressed={region === r}
                  className={chipClass(region === r)}
                >
                  Melbourne&apos;s {r}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {visible.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="font-body text-[15px] text-navy/60">
          No projects match this filter yet.
        </p>
      )}
    </div>
  );
}
