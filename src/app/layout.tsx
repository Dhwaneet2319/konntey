import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import AnalyticsBridge from "@/components/AnalyticsBridge";

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

export const metadata: Metadata = {
  title: {
    default: "Home Extensions & Renovations Melbourne | Konntey H&R",
    template: "%s | Konntey H&R",
  },
  description:
    "Professional home extensions, kitchen & bathroom renovations across Melbourne. BPC registered, fixed-price quotes. Serving Tarneit, Werribee & Point Cook.",
  // Note: no `keywords` meta — Google does not use the keywords meta tag.
  metadataBase: new URL("https://www.konnteyhomerenovations.com.au"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Home Extensions & Renovations Melbourne | Konntey H&R",
    description:
      "Professional home extensions, new builds, kitchen & bathroom renovations across Melbourne. BPC registered, fixed-price quotes, founder-led service. Get a free quote today.",
    type: "website",
    locale: "en_AU",
    url: "https://www.konnteyhomerenovations.com.au",
    siteName: "Konntey Home & Renovations",
    images: [
      {
        url: "/images/hero-main.webp",
        width: 1200,
        height: 630,
        alt: "Konntey Home & Renovations — Professional renovation builders in Melbourne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Extensions & Renovations Melbourne | Konntey H&R",
    description:
      "Professional home extensions, new builds, kitchen & bathroom renovations across Melbourne. BPC registered, fixed-price quotes, founder-led service. Get a free quote today.",
    images: ["/images/hero-main.webp"],
    creator: "@konnteyreno",
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
    "apple-mobile-web-app-title": "Konntey H&R",
    "format-detection": "telephone=yes",
  },
};

// JSON-LD Structured Data
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://www.konnteyhomerenovations.com.au/#organization",
  name: "Konntey Home & Renovations",
  alternateName: ["Konntey H&R", "Konntey Homes and Renovations"],
  url: "https://www.konnteyhomerenovations.com.au",
  logo: {
    "@type": "ImageObject",
    url: "https://www.konnteyhomerenovations.com.au/images/logo.png",
    width: 600,
    height: 200,
  },
  image: "https://www.konnteyhomerenovations.com.au/images/hero-main.webp",
  description:
    "Professional home extensions, new builds, kitchen & bathroom renovations across Melbourne. BPC registered, fixed-price quotes, founder-led service, and quality craftsmanship.",
  telephone: "+61493191798",
  email: "info@konnteyhomerenovations.com.au",
  priceRange: "$$",
  currenciesAccepted: "AUD",
  paymentAccepted: "Cash, Bank Transfer, Credit Card",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Melbourne",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    postalCode: "3000",
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -37.8136,
    longitude: 144.9631,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+61493191798",
    contactType: "customer service",
    areaServed: "AU",
    availableLanguage: ["English", "Hindi", "Gujarati"],
  },
  sameAs: [
    "https://www.instagram.com/konntey/",
  ],
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=Konntey%20Home%20%26%20Renovations%20Melbourne",
  areaServed: [
    { "@type": "State", name: "Victoria" },
    { "@type": "City", name: "Melbourne" },
    { "@type": "City", name: "Tarneit" },
    { "@type": "City", name: "Werribee" },
    { "@type": "City", name: "Point Cook" },
    { "@type": "City", name: "Hoppers Crossing" },
    { "@type": "City", name: "Truganina" },
    { "@type": "City", name: "Wyndham Vale" },
    { "@type": "City", name: "Dandenong" },
    { "@type": "City", name: "Cranbourne" },
    { "@type": "City", name: "Narre Warren" },
    { "@type": "City", name: "Berwick" },
    { "@type": "City", name: "Pakenham" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Renovation Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home Extensions & New Builds", description: "Structural extensions, second storeys, granny flats, and knockdown rebuilds across Melbourne" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kitchen Renovations Melbourne", description: "Complete kitchen renovations from cabinet refresh to full open-plan redesigns" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bathroom Renovations Melbourne", description: "Full bathroom rebuilds with AS/NZS 3740 certified waterproofing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Deck & Pergola Installation", description: "Premium timber deck and pergola construction built for Australian weather" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interior Painting & Finishing", description: "Professional interior and exterior painting with sharp lines and clean finishes" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vastu & Feng Shui Consultation", description: "Traditional Vastu-compliant renovations for culturally aligned home design" } },
    ],
  },

};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.konnteyhomerenovations.com.au/#website",
  name: "Konntey Home & Renovations",
  url: "https://www.konnteyhomerenovations.com.au",
  publisher: {
    "@id": "https://www.konnteyhomerenovations.com.au/#organization",
  },
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
      className={`${barlowCondensed.variable} ${barlow.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="font-body">
        <AnalyticsBridge />
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
