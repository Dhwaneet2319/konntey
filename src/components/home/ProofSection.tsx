import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { homeImages } from "@/components/home/home-images";
import { Container, SectionHeading, TextLink } from "@/components/ui";
import { business, googleMapsSearchUrl } from "@/content/business";
import { publishedProjects, projectsHubLive } from "@/content/projects";

/**
 * Proof directly after the hero. Shows published, owner-approved case studies
 * when they exist; otherwise an honest empty state whose before/after is an
 * illustrative AI-generated design concept (disclosed on /terms#imagery) —
 * never placeholder projects, ratings or testimonials, and never presented
 * as Konntey work.
 */
export default function ProofSection() {
  const featured = publishedProjects().slice(0, 3);

  if (featured.length > 0) {
    return (
      <section id="work" aria-labelledby="work-heading" className="scroll-mt-20 py-16 sm:py-24">
        <Container>
          <SectionHeading id="work-heading" kicker="Our work" title="Recent Konntey projects" />
          <Reveal group className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </Reveal>
          {projectsHubLive() && (
            <div className="mt-8">
              <TextLink href="/projects">Browse all completed projects</TextLink>
            </div>
          )}
        </Container>
      </section>
    );
  }

  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-20 py-16 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            id="work-heading"
            kicker="Our work"
            title="See what a redesign could change"
            intro="Detailed case studies of completed Konntey projects are being prepared with our clients' permission. Until then, this AI-generated concept shows the kind of change a renovation can make — ask us for recent examples of similar work at your free consultation."
          />
          <div className="mt-6 flex flex-col items-start gap-3">
            <TextLink href="/kitchen-renovations-melbourne">Kitchen renovations</TextLink>
            <TextLink href="/bathroom-renovations-melbourne#before-after">Bathroom before &amp; after</TextLink>
            <a
              href={business.googleReviewUrl || googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[15px] font-semibold text-navy/70 underline-offset-4 hover:text-navy hover:underline"
            >
              {business.googleReviewUrl ? "Read and leave Google reviews" : "Find us on Google"}
            </a>
          </div>
        </div>
        <BeforeAfterSlider
          before={homeImages["kitchen-before-concept"]}
          after={homeImages["kitchen-after-concept"]}
          placement="home_proof"
          sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), (max-width: 1279px) calc((100vw - 128px) * 0.6), 691px"
        />
      </Container>
    </section>
  );
}
