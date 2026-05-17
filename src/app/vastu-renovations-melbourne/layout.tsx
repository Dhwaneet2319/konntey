import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Vastu Compliant Renovations Melbourne | Vastu Home Design | Konntey H&R",
  description:
    "Vastu Shastra compliant home renovations in Melbourne. Kitchen, bathroom & full home renovations aligned with Vastu principles. Indian-owned, culturally respectful.",
  alternates: {
    canonical: "/vastu-renovations-melbourne",
  },
  openGraph: {
    title: "Vastu Compliant Renovations Melbourne | Konntey H&R",
    description:
      "Vastu Shastra aligned home renovations across Melbourne. Kitchen placement, bathroom direction, entrance orientation — built with respect for tradition.",
    url: "https://www.konnteyhomerenovations.com.au/vastu-renovations-melbourne",
    siteName: "Konntey Home & Renovations",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/images/hero_main.webp",
        width: 1200,
        height: 630,
        alt: "Vastu compliant home renovation in Melbourne by Konntey H&R",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vastu Compliant Renovations Melbourne | Konntey H&R",
    description:
      "Vastu Shastra aligned home renovations. Indian-owned, culturally respectful. Serving all Melbourne suburbs.",
    images: ["/images/hero_main.webp"],
  },
  keywords: [
    "vastu renovation Melbourne",
    "vastu compliant home Melbourne",
    "vastu kitchen renovation",
    "vastu bathroom renovation",
    "vastu home design Melbourne",
    "vastu shastra builder Melbourne",
    "Indian builder Melbourne",
    "vastu house renovation Tarneit",
    "vastu renovation Point Cook",
    "vastu home Truganina",
    "feng shui renovation Melbourne",
    "vastu consultation Melbourne",
  ],
};

export default function VastuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
