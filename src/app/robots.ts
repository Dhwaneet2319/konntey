import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/scan"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/scan"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/scan"],
      },
    ],
    sitemap: "https://www.konnteyhomerenovations.com.au/sitemap.xml",
    host: "https://www.konnteyhomerenovations.com.au",
  };
}
