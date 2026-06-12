import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Extensions Melbourne | Second Storeys",
  description:
    "Home extensions from $1,800/sqm across Melbourne. Second storeys, granny flats, knockdown rebuilds. BPC registered, council approvals, fixed-price quotes.",
  alternates: {
    canonical: "/home-extensions-melbourne",
  },
  openGraph: {
    title: "Home Extensions Melbourne | Second Storey & Granny Flats | Konntey H&R",
    description:
      "Professional home extensions from $1,800/sqm. Second storeys, granny flats, knockdown rebuilds. Fixed-price quotes across all Melbourne suburbs.",
    url: "https://www.konnteyhomerenovations.com.au/home-extensions-melbourne",
    siteName: "Konntey Home & Renovations",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/images/extension.webp",
        width: 1200,
        height: 630,
        alt: "Professional home extension in Melbourne by Konntey H&R",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Extensions Melbourne | Second Storey & Granny Flats | Konntey H&R",
    description:
      "Home extensions from $1,800/sqm. Second storeys, granny flats, knockdown rebuilds. Fixed-price quotes.",
    images: ["/images/extension.webp"],
  },
  keywords: [
    "home extension Melbourne",
    "home extension western Melbourne",
    "second storey extension Melbourne",
    "granny flat Melbourne",
    "knockdown rebuild Melbourne",
    "home extension cost Melbourne",
    "home extension Tarneit",
    "home extension Point Cook",
    "home extension Werribee",
    "house extension builders Melbourne",
    "BPC registered builder Melbourne",
    "council approved extensions",
  ],
};

export default function ExtensionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
