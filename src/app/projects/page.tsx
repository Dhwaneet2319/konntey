import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/chat/FloatingActions";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import {
  displayableProjects,
  projectsHubLive,
  MIN_PUBLISHED_FOR_HUB,
} from "@/content/projects";
import { BASE_URL } from "@/content/business";

const hubLive = projectsHubLive();

export const metadata: Metadata = {
  title: "Completed Renovation Projects Melbourne",
  description:
    "Browse completed, real renovation projects by Konntey Home & Renovations across Melbourne — kitchens, bathrooms, extensions, decks and painting, with genuine photos and outcomes.",
  alternates: { canonical: "/projects" },
  // The hub stays out of the index until enough owner-approved case studies
  // are published to make it genuinely useful.
  ...(hubLive ? {} : { robots: { index: false, follow: true } }),
  openGraph: {
    title: "Completed Renovation Projects | Konntey Home & Renovations",
    description:
      "Real, completed renovation projects across Melbourne with genuine photos and factual outcomes.",
    url: `${BASE_URL}/projects`,
    siteName: "Konntey Home & Renovations",
    locale: "en_AU",
    type: "website",
  },
};

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
      <NavBar theme="dark" />
      <FloatingActions />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="border-b border-navy/10 px-4 sm:px-6 lg:px-8 pt-[110px]"
        >
          <div className="mx-auto max-w-[1600px] pb-4">
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

        <section className="px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-20">
          <div className="mx-auto max-w-[1600px]">
            <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-deep">
              OUR WORK
            </div>
            <h1 className="mt-4 font-display text-[clamp(3rem,8vw,6rem)] font-black uppercase leading-[0.85] tracking-tighter text-navy">
              Completed <span className="text-gold-deep">Projects</span>
            </h1>
            <p className="mt-8 max-w-2xl font-body text-[17px] leading-[1.8] text-navy/75">
              Every project here is completed, owner-approved work by Konntey
              Home &amp; Renovations, with genuine photos of the actual job and
              factual outcomes. Each case study links to the full story —
              the brief, what we changed and the finished result.
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="mx-auto max-w-[1600px]">
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
              <div className="max-w-2xl border border-navy/10 bg-off-white p-10">
                <h2 className="font-display text-[24px] font-black uppercase tracking-tighter text-navy">
                  Case studies are on their way
                </h2>
                <p className="mt-4 font-body text-[15px] leading-[1.8] text-navy/70">
                  We&apos;re preparing detailed write-ups of completed
                  renovations. In the meantime, you can see real
                  before-and-after results on our service pages.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/kitchen-renovations-melbourne"
                    className="border border-navy/20 px-5 py-3 font-display text-[13px] font-bold uppercase tracking-button text-navy hover:border-gold-deep hover:text-gold-deep transition-colors"
                  >
                    Kitchen renovations
                  </Link>
                  <Link
                    href="/bathroom-renovations-melbourne"
                    className="border border-navy/20 px-5 py-3 font-display text-[13px] font-bold uppercase tracking-button text-navy hover:border-gold-deep hover:text-gold-deep transition-colors"
                  >
                    Bathroom renovations
                  </Link>
                  <Link
                    href="/quote"
                    className="bg-gold-bright px-5 py-3 font-display text-[13px] font-black uppercase tracking-button text-navy"
                  >
                    Request a free quote
                  </Link>
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
