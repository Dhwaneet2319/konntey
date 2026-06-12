import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/scan"],
      },
    ],
    sitemap: "https://www.konnteyhomerenovations.com.au/sitemap.xml",
    host: "https://www.konnteyhomerenovations.com.au",
  };
}
