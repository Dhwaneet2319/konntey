import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Free Renovation Quote in Melbourne",
  description:
    "Request a free, no-obligation renovation quote from Konntey. Kitchen, bathroom, extensions, decks & painting. We visit your property and provide a fixed-price quote within 48 hours. Serving all Melbourne suburbs.",
  alternates: {
    canonical: "/quote",
  },
  openGraph: {
    title: "Get a Free Renovation Quote in Melbourne | Konntey H&R",
    description:
      "Request a free, no-obligation renovation quote from Konntey. We visit your property, understand your vision, and provide a fixed-price quote within 48 hours.",
    url: "https://www.konnteyhomerenovations.com.au/quote",
    siteName: "Konntey Home & Renovations",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/images/hero_main.webp",
        width: 1200,
        height: 630,
        alt: "Get a free renovation quote from Konntey Home & Renovations Melbourne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get a Free Renovation Quote | Konntey H&R Melbourne",
    description:
      "Free, no-obligation renovation quotes. Fixed-price within 48 hours. Kitchen, bathroom, extensions & more.",
    images: ["/images/hero_main.webp"],
  },
  keywords: [
    "free renovation quote Melbourne",
    "renovation quote western Melbourne",
    "kitchen renovation quote",
    "bathroom renovation quote",
    "home extension quote Melbourne",
    "renovation cost estimate Melbourne",
    "free building quote Melbourne",
  ],
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
