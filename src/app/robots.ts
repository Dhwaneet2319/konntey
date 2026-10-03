import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /scan (QR landing page) is deliberately NOT disallowed: it carries a
        // noindex meta tag, which crawlers can only see if allowed to fetch it.
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://www.konnteyhomerenovations.com.au/sitemap.xml",
    host: "https://www.konnteyhomerenovations.com.au",
  };
}
