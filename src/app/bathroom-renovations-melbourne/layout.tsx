import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Bathroom Renovations Western Melbourne | Waterproofing Certified Builder | Konntey H&R",
  description:
    "Bathroom renovations across Melbourne's western suburbs from $10,000. BPC registered, AS/NZS 3740 certified waterproofing, fixed-price quotes. Serving Werribee, Tarneit, Point Cook, Footscray, Hoppers Crossing & Williamstown. Free quote within 48 hours.",
  alternates: {
    canonical: "/bathroom-renovations-melbourne",
  },
  openGraph: {
    title: "Bathroom Renovations Western Melbourne | Waterproofing Certified | Konntey H&R",
    description:
      "Complete bathroom renovations from $10,000. BPC registered, AS/NZS 3740 certified waterproofing, fixed-price quotes. Serving all western Melbourne suburbs.",
    url: "https://www.konnteyhomerenovations.com.au/bathroom-renovations-melbourne",
    siteName: "Konntey Home & Renovations",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/images/bathroom/hero.webp",
        width: 1200,
        height: 630,
        alt: "Professional bathroom renovation in western Melbourne by Konntey H&R",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bathroom Renovations Western Melbourne | Konntey H&R",
    description:
      "Complete bathroom renovations from $10,000. BPC registered, AS/NZS 3740 waterproofing certified. Fixed-price quotes across Melbourne's west.",
    images: ["/images/bathroom/hero.webp"],
  },
  keywords: [
    "bathroom renovation Melbourne",
    "bathroom renovation western Melbourne",
    "bathroom renovation Tarneit",
    "bathroom renovation Werribee",
    "bathroom renovation Point Cook",
    "bathroom renovation Hoppers Crossing",
    "bathroom renovation Wyndham Vale",
    "bathroom renovation cost Melbourne",
    "small bathroom renovation Melbourne",
    "ensuite renovation Melbourne",
    "waterproofing certified bathroom Melbourne",
    "BPC registered bathroom builder",
    "affordable bathroom renovation Melbourne",
    "bathroom remodel western suburbs",
    "fixed price bathroom renovation",
  ],
};

export default function BathroomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
