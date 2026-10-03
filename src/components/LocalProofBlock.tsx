import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { getLocalProof } from "@/content/localProof";
import { getProject } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";

/**
 * Conditional local-evidence module for suburb pages. Renders only when the
 * suburb has at least one genuine, owner-approved item in
 * src/content/localProof.ts. Renders nothing otherwise — no generic filler.
 */
export default function LocalProofBlock({ suburbSlug }: { suburbSlug: string }) {
  const proof = getLocalProof(suburbSlug);
  if (!proof) return null;

  const featured =
    proof.featuredProjects
      ?.map((slug) => getProject(slug))
      .filter((p) => p !== undefined && p.status === "published") ?? [];

  const testimonials =
    proof.localTestimonials?.filter((t) => t.consentConfirmed) ?? [];

  const notes = proof.localPlanningNotes ?? [];

  if (featured.length === 0 && testimonials.length === 0 && notes.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby={`local-proof-${suburbSlug}`}
      className="bg-navy-light py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10"
    >
      <div className="mx-auto max-w-[1600px] space-y-16">
        {featured.length > 0 && (
          <div>
            <h2
              id={`local-proof-${suburbSlug}`}
              className="font-display text-[clamp(2rem,4vw,3rem)] font-black uppercase tracking-tightest text-white"
            >
              Completed Projects in{" "}
              <span className="text-gold-bright">{proof.suburb}</span>
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map(
                (project) =>
                  project && (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      theme="dark"
                    />
                  ),
              )}
            </div>
          </div>
        )}

        {notes.length > 0 && (
          <div>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-black uppercase tracking-tightest text-white">
              Planning &amp; Permit Considerations
            </h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {notes.map((note) => (
                <div key={note.title} className="border border-white/10 p-8">
                  <h3 className="font-display text-[17px] font-black uppercase tracking-button text-gold-bright">
                    {note.title}
                  </h3>
                  <p className="mt-4 font-body text-[15px] leading-[1.8] text-white/85">
                    {note.content}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-4 font-body text-[13px] text-white/60">
                    <span>Last reviewed: {note.reviewedDate}</span>
                    {note.sourceUrl && (
                      <a
                        href={note.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-gold-bright transition-colors hover:text-white"
                      >
                        <span>Official source</span>
                        <ExternalLink size={13} strokeWidth={2.25} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 font-body text-[13px] italic leading-[1.7] text-white/60">
              General information only, not legal advice. Always confirm
              requirements with your council or a registered building surveyor.
            </p>
          </div>
        )}

        {testimonials.length > 0 && (
          <div>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-black uppercase tracking-tightest text-white">
              Client Feedback from{" "}
              <span className="text-gold-bright">{proof.suburb}</span>
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <blockquote
                  key={t.quote.slice(0, 40)}
                  className="border border-white/10 p-8"
                >
                  <p className="font-body text-[15px] italic leading-[1.8] text-white/85">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-5 flex flex-wrap items-center gap-3 font-display text-[13px] font-black uppercase tracking-button text-gold-bright">
                    <cite className="not-italic">— {t.attribution}</cite>
                    {t.sourceUrl && (
                      <a
                        href={t.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-body text-[12px] font-medium normal-case tracking-normal text-white/60 transition-colors hover:text-gold-bright"
                      >
                        <span>View source</span>
                        <ExternalLink size={12} strokeWidth={2.25} />
                      </a>
                    )}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        )}

        <div>
          <Link
            href="/quote"
            className="inline-flex bg-gold-bright px-8 py-5 font-display text-[15px] font-black uppercase tracking-button text-navy"
          >
            Request a Free Quote in {proof.suburb}
          </Link>
        </div>
      </div>
    </section>
  );
}
