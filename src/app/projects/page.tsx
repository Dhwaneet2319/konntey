import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/chat/FloatingActions";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import { ButtonLink, Kicker } from "@/components/ui";
import {
  displayableProjects,
  projectsHubLive,
  MIN_PUBLISHED_FOR_HUB,
} from "@/content/projects";
import { BASE_URL } from "@/content/business";

const hubLive = projectsHubLive();

// The hub stays out of the index until enough owner-approved case studies
// are published to make it genuinely useful.
export const metadata: Metadata = pageMetadata({
  title: "Completed renovation projects in Melbourne",
  description:
    "Completed renovation projects by Konntey Home & Renovations across Melbourne: kitchens, bathrooms, extensions, decks and painting, with the client's permission and real photos.",
  path: "/projects",
  noindex: !hubLive,
});

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Projects", item: `${BASE_URL}/projects` },
  ],
};

const isProd = process.env.NODE_ENV === "production";

export default function ProjectsHubPage() {
  const projects = displayableProjects();

  return (
    <div className="bg-white text-navy font-body min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <NavBar />
      <FloatingActions />

      <main id="main" className="flex-grow">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="border-b border-navy/10 px-4 sm:px-6 lg:px-8 pt-[110px]"
        >
          <div className="mx-auto max-w-[1216px] pb-4">
            <ol className="flex flex-wrap items-center gap-2 font-body text-[13px] text-navy/60">
              <li>
                <Link href="/" className="transition-colors hover:text-gold-deep">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="flex items-center">
                <ChevronRight size={14} className="text-navy/30" />
              </li>
              <li aria-current="page" className="text-navy/90">
                Projects
              </li>
            </ol>
          </div>
        </nav>

        <section className="px-4 sm:px-6 lg:px-8 pt-14 pb-10 sm:pt-16">
          <div className="mx-auto max-w-[1216px]">
            <Kicker>Our work</Kicker>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1] tracking-[-0.02em] text-navy">
              Completed projects
            </h1>
            <p className="mt-6 max-w-2xl font-body text-[17px] leading-[1.75] text-navy/75">
              Case studies here are completed Konntey jobs, published with the
              client&apos;s permission and photos of the actual work: the brief,
              what changed and the finished result.
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="mx-auto max-w-[1216px]">
            {!isProd && !hubLive && (
              <div className="mb-10 border border-gold/40 bg-off-white p-6 font-body text-[14px] leading-[1.7] text-navy/80">
                <strong className="font-semibold">Development preview:</strong>{" "}
                this hub is noindexed and excluded from the sitemap until at
                least {MIN_PUBLISHED_FOR_HUB} projects are published in{" "}
                <code>src/content/projects.ts</code>. Draft projects below are
                visible in development only.
              </div>
            )}

            {projects.length > 0 ? (
              <ProjectsExplorer projects={projects} />
            ) : (
              <div className="max-w-2xl border border-navy/10 bg-off-white p-8 sm:p-10">
                <h2 className="font-display text-[26px] font-bold leading-tight text-navy">
                  Case studies are on their way
                </h2>
                <p className="mt-4 font-body text-[16px] leading-[1.75] text-navy/75">
                  We&apos;re preparing write-ups of completed renovations with our
                  clients&apos; permission. Until they&apos;re published, our service
                  pages explain what each type of project involves, with indicative
                  Melbourne pricing, and we&apos;re happy to talk through recent
                  similar jobs at your free consultation.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href="/quote">Get a free quote</ButtonLink>
                  <ButtonLink href="/#services" variant="outlineLight" arrow={false}>
                    Browse services
                  </ButtonLink>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
