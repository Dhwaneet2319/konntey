import { MetadataRoute } from "next";
import { BASE_URL } from "@/content/business";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // All crawlers, including AI search crawlers, may read the site.
        userAgent: "*",
        allow: "/",
        // /scan (QR landing page) is deliberately NOT disallowed: it carries a
        // noindex meta tag, which crawlers can only see if allowed to fetch it.
        disallow: ["/api/"],
      },
    ],
    // No Host line: it is a non-standard, Yandex-only directive. The canonical
    // host is set by the www redirect and each page's canonical tag.
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
