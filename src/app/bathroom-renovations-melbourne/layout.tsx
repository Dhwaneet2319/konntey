import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bathroom Renovations Melbourne | Fixed-Price Quotes",
  description:
    "Bathroom renovations from $10,000 across Melbourne's west. BPC registered, AS/NZS 3740 certified waterproofing, fixed-price quotes. Serving all western suburbs.",
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
};

export default function BathroomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
