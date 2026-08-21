import { MetadataRoute } from "next";
import { suburbLinks } from "@/content/suburbs";
import { guides } from "@/content/guides";
import { sitemapProjects, projectsHubLive } from "@/content/projects";
import { isSuburbIndexable } from "@/content/localProof";
import { credentialsPageIndexable } from "@/content/business";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.konnteyhomerenovations.com.au";
  const now = new Date();

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/kitchen-renovations-melbourne`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/bathroom-renovations-melbourne`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/home-extensions-melbourne`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/decks-pergolas-melbourne`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/interior-painting-melbourne`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/vastu-renovations-melbourne`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/renovations`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/guides`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/quote`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.2 },
  ];

  // Projects hub enters the sitemap only once enough owner-approved case
  // studies are published (it is noindexed until then).
  const projectsHub = projectsHubLive()
    ? [{ url: `${baseUrl}/projects`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 }]
    : [];

  // Individual projects: published AND seo.indexable only.
  const projectPages = sitemapProjects().map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Credentials page: owner flips credentialsPageIndexable after reviewing
  // every displayed fact.
  const credentialsPage = credentialsPageIndexable
    ? [{ url: `${baseUrl}/credentials-and-compliance`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 }]
    : [];

  // Existing suburb pages stay listed unless the owner explicitly sets a
  // suburb to non-indexable in src/content/localProof.ts.
  const suburbPages = suburbLinks
    .filter((suburb) => isSuburbIndexable(suburb.slug))
    .map((suburb) => ({
      url: `${baseUrl}/renovations/${suburb.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const guidePages = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.dateModified),
    changeFrequency: "monthly" as const,
    priority: 0.6,
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
