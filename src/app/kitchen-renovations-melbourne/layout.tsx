import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Kitchen Renovations Western Melbourne | Custom Designs & Fixed Pricing | Konntey H&R",
  description:
    "Kitchen renovations from $15,000 across Melbourne's west. BPC registered, fixed-price quotes, full project management. Serving Tarneit, Werribee, Point Cook & more.",
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
  keywords: [
    "kitchen renovation Melbourne",
    "kitchen renovation western Melbourne",
    "kitchen renovation Tarneit",
    "kitchen renovation Werribee",
    "kitchen renovation Point Cook",
    "kitchen renovation Hoppers Crossing",
    "kitchen renovation Wyndham Vale",
    "kitchen renovation cost Melbourne",
    "affordable kitchen renovation Melbourne",
    "open plan kitchen renovation Melbourne",
    "kitchen cabinet replacement Melbourne",
    "stone benchtop installation Melbourne",
    "BPC registered kitchen builder",
    "fixed price kitchen renovation",
    "kitchen remodel western suburbs",
  ],
};

export default function KitchenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
