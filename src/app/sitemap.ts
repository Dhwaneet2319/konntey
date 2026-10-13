import { MetadataRoute } from "next";
import { suburbLinks } from "@/content/suburbs";
import { guides } from "@/content/guides";
import { sitemapProjects, projectsHubLive } from "@/content/projects";
import { isSuburbIndexable } from "@/content/localProof";
import { BASE_URL, credentialsPageIndexable } from "@/content/business";

/**
 * Date of the last significant change to each page's main content — not the
 * build date. Update an entry only when that page's content materially
 * changes. Routes without a known date omit lastModified entirely.
 */
const contentUpdated: Record<string, string> = {
  "/": "2026-10-13",
  "/new-home-builders-melbourne": "2026-10-13",
  "/kitchen-renovations-melbourne": "2026-10-10",
  "/bathroom-renovations-melbourne": "2026-10-10",
  "/home-extensions-melbourne": "2026-10-10",
  "/decks-pergolas-melbourne": "2026-09-29",
  "/interior-painting-melbourne": "2026-09-29",
  "/vastu-renovations-melbourne": "2026-09-29",
  "/quote": "2026-09-29",
  "/renovations": "2026-10-10",
  "/renovations/[suburb]": "2026-10-10",
  "/terms": "2026-10-13",
  // The guides hub changes whenever a guide is added or updated.
  "/guides": guides.map((g) => g.dateModified).sort().at(-1) ?? "",
};

function lastModifiedFor(route: string): { lastModified?: Date } {
  const date = contentUpdated[route];
  return date ? { lastModified: new Date(date) } : {};
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BASE_URL;

  const staticRoutes = [
    "/",
    "/new-home-builders-melbourne",
    "/kitchen-renovations-melbourne",
    "/bathroom-renovations-melbourne",
    "/home-extensions-melbourne",
    "/decks-pergolas-melbourne",
    "/interior-painting-melbourne",
    "/vastu-renovations-melbourne",
    "/renovations",
    "/guides",
    "/quote",
    "/privacy",
    "/terms",
  ];

  const staticPages = staticRoutes.map((route) => ({
    url: route === "/" ? baseUrl : `${baseUrl}${route}`,
    ...lastModifiedFor(route),
  }));

  // Projects hub enters the sitemap only once enough owner-approved case
  // studies are published (it is noindexed until then).
  const projectsHub = projectsHubLive() ? [{ url: `${baseUrl}/projects` }] : [];

  // Individual projects: published AND seo.indexable only.
  const projectPages = sitemapProjects().map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
  }));

  // Credentials page: owner flips credentialsPageIndexable after reviewing
  // every displayed fact.
  const credentialsPage = credentialsPageIndexable
    ? [{ url: `${baseUrl}/credentials-and-compliance` }]
    : [];

  // Existing suburb pages stay listed unless the owner explicitly sets a
  // suburb to non-indexable in src/content/localProof.ts.
  const suburbPages = suburbLinks
    .filter((suburb) => isSuburbIndexable(suburb.slug))
    .map((suburb) => ({
      url: `${baseUrl}/renovations/${suburb.slug}`,
      ...lastModifiedFor("/renovations/[suburb]"),
    }));

  const guidePages = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.dateModified),
  }));

  return [
    ...staticPages,
    ...projectsHub,
    ...projectPages,
    ...credentialsPage,
    ...suburbPages,
    ...guidePages,
  ];
}
