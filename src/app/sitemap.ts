import { MetadataRoute } from "next";

const suburbs = [
  "tarneit", "truganina", "werribee", "hoppers-crossing", "point-cook",
  "wyndham-vale", "dandenong", "cranbourne", "frankston", "narre-warren",
  "berwick", "springvale", "pakenham",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://konntey.com.au";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/quote`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const suburbPages = suburbs.map((suburb) => ({
    url: `${baseUrl}/renovations/${suburb}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...suburbPages];
}
