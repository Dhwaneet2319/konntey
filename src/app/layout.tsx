import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import AnalyticsBridge from "@/components/AnalyticsBridge";
import AnalyticsScripts from "@/components/AnalyticsScripts";
import RevealObserver from "@/components/RevealObserver";
import { BASE_URL, business, isClaimApproved } from "@/content/business";
import { siteImages } from "@/content/images";
import { serviceList } from "@/content/services";
import { suburbLinks } from "@/content/suburbs";
import { ORGANIZATION_ID, SITE_SHORT_NAME, WEBSITE_ID, jsonLd, siteDescription } from "@/lib/seo";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
  process.env.GOOGLE_SITE_VERIFICATION;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1628",
};

const defaultSocial = siteImages.socialDefault;

// Sitewide defaults only. There is deliberately no canonical here: each page
// sets its own through pageMetadata() so nothing inherits the home canonical.
export const metadata: Metadata = {
  title: {
    default: "Home renovations & extensions in Melbourne | Konntey H&R",
    template: `%s | ${SITE_SHORT_NAME}`,
  },
  description: siteDescription,
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: business.name,
    images: [
      {
        url: defaultSocial.src,
        width: defaultSocial.width,
        height: defaultSocial.height,
        alt: defaultSocial.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [defaultSocial.src],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: googleSiteVerification,
  },
  category: "Home Improvement",
  other: {
    // Removed geo.position/ICBM meta tags: they encoded Melbourne CBD
    // coordinates that don't represent a real customer-facing location, and
    // search engines don't use these tags.
    "geo.region": "AU-VIC",
    "geo.placename": "Melbourne",
    "apple-mobile-web-app-title": SITE_SHORT_NAME,
    "format-detection": "telephone=yes",
  },
};

// The one sitewide business entity; every other schema references it by @id.
// Service-area business: no street address, postcode or geo coordinates are
// published because there is no customer-facing premises. Saturday is "by
// appointment" (see business.hours), so it has no fixed hours here.
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": ORGANIZATION_ID,
  name: business.name,
  alternateName: [SITE_SHORT_NAME, "Konntey Homes and Renovations"],
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}${siteImages.logo.src}`,
    width: siteImages.logo.width,
    height: siteImages.logo.height,
  },
  image: `${BASE_URL}${defaultSocial.src}`,
  description: siteDescription,
  telephone: business.phoneE164,
  email: business.email,
  currenciesAccepted: "AUD",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    addressCountry: "AU",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "21:00",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: business.phoneE164,
    contactType: "customer service",
    areaServed: "AU",
    availableLanguage: isClaimApproved("languages") ? ["English", "Hindi", "Gujarati"] : ["English"],
  },
  sameAs: ["https://www.instagram.com/konntey/"],
  areaServed: [
    { "@type": "City", name: "Melbourne" },
    ...suburbLinks.map((s) => ({ "@type": "Place", name: `${s.name}, VIC` })),
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Renovation services",
    itemListElement: serviceList.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.schemaName,
        description: s.card.blurb,
        url: `${BASE_URL}${s.route}`,
      },
    })),
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: business.name,
  url: BASE_URL,
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en-AU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      data-scroll-behavior="smooth"
      className={`${barlowCondensed.variable} ${barlow.variable}`}
    >
      <head>
        {/* Scroll reveals are server-rendered at opacity 0; without JS they
            would never appear, so show them as-is. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: '[style*="opacity:0"]{opacity:1!important;transform:none!important}',
            }}
          />
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(localBusinessSchema)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteSchema)} />
      </head>
      <body className="font-body">
        <AnalyticsScripts />
        <AnalyticsBridge />
        <RevealObserver />
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
