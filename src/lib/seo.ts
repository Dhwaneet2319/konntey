import type { Metadata } from "next";
import {
  BASE_URL,
  business,
  claimText,
  claims,
  isClaimApproved,
} from "@/content/business";
import { siteImages, type SiteImageKey } from "@/content/images";
import type { ServiceContent } from "@/content/services";

export const SITE_SHORT_NAME = "Konntey H&R";
export const ORGANIZATION_ID = `${BASE_URL}/#organization`;
export const WEBSITE_ID = `${BASE_URL}/#website`;

const sentence = (s: string) => (s ? `${s.charAt(0).toUpperCase()}${s.slice(1)}.` : "");

/** Default site description built only from approved claims. */
export const siteDescription = [
  "New homes, kitchen and bathroom renovations, extensions, decks and painting in Melbourne's west and southeast.",
  sentence(isClaimApproved("bpcRegistration") ? claims.bpcRegistration.approvedWording : ""),
  `Free consultation and a written ${claimText("fixedPriceQuotes")} quote.`,
]
  .filter(Boolean)
  .join(" ");

interface PageMetaInput {
  /** Page title; the root template appends " | Konntey H&R". */
  title: string;
  description: string;
  /** Path beginning with "/", used for the canonical and og:url. */
  path: string;
  image?: SiteImageKey;
  /** Use the title as-is, without the site template. */
  absoluteTitle?: boolean;
  noindex?: boolean;
  /** Social title when it should differ from the page title. */
  socialTitle?: string;
  article?: { publishedTime: string; modifiedTime: string };
}

/**
 * Complete per-page metadata: canonical, robots (only when noindexed),
 * Open Graph and Twitter, with the image's real pixel size.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = "socialDefault",
  absoluteTitle = false,
  noindex = false,
  socialTitle: socialTitleInput,
  article,
}: PageMetaInput): Metadata {
  const img = siteImages[image];
  const baseSocial = socialTitleInput ?? title;
  const socialTitle = absoluteTitle ? baseSocial : `${baseSocial} | ${SITE_SHORT_NAME}`;
  const common = {
    title: socialTitle,
    description,
    url: path === "/" ? BASE_URL : `${BASE_URL}${path}`,
    siteName: business.name,
    locale: "en_AU",
    images: [{ url: img.src, width: img.width, height: img.height, alt: img.alt }],
  };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: article
      ? { ...common, type: "article", ...article }
      : { ...common, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [img.src],
    },
  };
}

export function serviceMetadata(service: ServiceContent): Metadata {
  return pageMetadata({
    title: service.meta.title,
    description: service.meta.description,
    path: service.route,
    image: service.socialImage,
  });
}

/** Reference to the single sitewide business entity. */
export const providerRef = { "@id": ORGANIZATION_ID } as const;

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path === "/" ? BASE_URL : `${BASE_URL}${item.path}`,
    })),
  };
}

export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
