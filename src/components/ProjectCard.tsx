import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Project, serviceLabels } from "@/content/projects";

/**
 * A single factual project card. Every field shown comes from owner-approved
 * project data — service, suburb, project type, real hero image, one factual
 * outcome and a descriptive link to the case study.
 */
export default function ProjectCard({
  project,
  theme = "light",
}: {
  project: Project;
  theme?: "light" | "dark";
}) {
  const hero =
    project.images.find((img) => img.type === "hero") ?? project.images[0];
  const dark = theme === "dark";

  return (
    <article
      className={`group flex flex-col border transition-colors ${
        dark
          ? "border-white/10 bg-navy-light hover:border-gold-bright/40"
          : "border-navy/10 bg-white hover:border-gold-bright/50"
      }`}
    >
      {hero && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div
          className={`font-body text-[11px] font-semibold uppercase tracking-kicker ${
            dark ? "text-gold-bright" : "text-gold-deep"
          }`}
        >
          {serviceLabels[project.primaryService]} · {project.suburb}
        </div>
        <h3
          className={`mt-3 font-display text-[20px] font-black uppercase tracking-tighter leading-tight ${
            dark ? "text-white" : "text-navy"
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`mt-3 flex-1 font-body text-[14px] leading-[1.7] ${
            dark ? "text-white/75" : "text-navy/70"
          }`}
        >
          {project.outcome}
        </p>
        <Link
          href={`/projects/${project.slug}`}
          className={`mt-5 inline-flex items-center gap-2 font-display text-[13px] font-black uppercase tracking-button transition-colors ${
            dark
              ? "text-gold-bright hover:text-white"
              : "text-gold-deep hover:text-navy"
          }`}
        >
          <span>
            {project.suburb} {serviceLabels[project.primaryService].toLowerCase()} case study
          </span>
          <ArrowRight size={14} strokeWidth={2.5} className="shrink-0" />
        </Link>
      </div>
    </article>
  );
}
