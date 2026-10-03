import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kitchen Renovations Melbourne | Fixed-Price Quotes",
  description:
    "Kitchen renovations from $15,000 across Melbourne's west. BPC registered, fixed-price quotes, full project management. Serving Tarneit, Werribee & Point Cook.",
  alternates: {
    canonical: "/kitchen-renovations-melbourne",
  },
  openGraph: {
    title: "Kitchen Renovations Western Melbourne | Fixed Pricing | Konntey H&R",
    description:
      "Complete kitchen renovations from $15,000. BPC registered, fixed-price quotes, no subcontractors. Serving all western Melbourne suburbs.",
    url: "https://www.konnteyhomerenovations.com.au/kitchen-renovations-melbourne",
    siteName: "Konntey Home & Renovations",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/images/kitchen/hero.webp",
        width: 1200,
        height: 630,
        alt: "Professional kitchen renovation in western Melbourne by Konntey H&R",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitchen Renovations Western Melbourne | Konntey H&R",
    description:
      "Complete kitchen renovations from $15,000. BPC registered, fixed-price quotes, no subcontractors. Serving Melbourne's western suburbs.",
    images: ["/images/kitchen/hero.webp"],
  },
};

export default function KitchenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
