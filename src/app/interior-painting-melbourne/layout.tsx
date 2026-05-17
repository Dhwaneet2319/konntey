import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Interior & Exterior Painting Melbourne | Professional Painters | Konntey H&R",
  description:
    "Professional interior and exterior painters in Melbourne. Sharp lines, clean finishes, colour consultation included. Fixed-price quotes across all suburbs.",
  alternates: {
    canonical: "/interior-painting-melbourne",
  },
  openGraph: {
    title: "Interior & Exterior Painting Melbourne | Konntey H&R",
    description:
      "Professional residential painting across Melbourne. Interior, exterior, feature walls, renovation painting. Fixed-price quotes with colour consultation.",
    url: "https://www.konnteyhomerenovations.com.au/interior-painting-melbourne",
    siteName: "Konntey Home & Renovations",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/images/interior.webp",
        width: 1200,
        height: 630,
        alt: "Professional interior painting in Melbourne by Konntey H&R",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior & Exterior Painting Melbourne | Konntey H&R",
    description:
      "Professional residential painting across Melbourne. Interior, exterior, feature walls. Fixed-price quotes.",
    images: ["/images/interior.webp"],
  },
  keywords: [
    "interior painter Melbourne",
    "house painter Melbourne",
    "exterior painting Melbourne",
    "residential painter Melbourne",
    "interior painting Tarneit",
    "house painting Werribee",
    "painter Point Cook",
    "painting cost Melbourne",
    "feature wall painting",
    "renovation painting Melbourne",
    "professional painter western Melbourne",
    "ceiling painting Melbourne",
  ],
};

export default function PaintingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
