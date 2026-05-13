import { MetadataRoute } from "next";

const suburbs = [
  "tarneit", "truganina", "werribee", "hoppers-crossing", "point-cook",
  "wyndham-vale", "manor-lakes", "williams-landing", "laverton",
  "dandenong", "cranbourne", "frankston", "narre-warren",
  "berwick", "springvale", "pakenham", "officer", "clyde", "melton",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.konnteyhomerenovations.com.au";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/kitchen-renovations-melbourne`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/bathroom-renovations-melbourne`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/quote`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/scan`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.2 },
  ];

  const suburbPages = suburbs.map((suburb) => ({
    url: `${baseUrl}/renovations/${suburb}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...suburbPages];
}
