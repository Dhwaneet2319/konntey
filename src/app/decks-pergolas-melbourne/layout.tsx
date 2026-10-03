import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deck & Pergola Builders Melbourne",
  description:
    "Premium deck and pergola builders in Melbourne. Merbau, spotted gum & composite decking. Carports & outdoor living. BPC registered, fixed-price quotes.",
  alternates: {
    canonical: "/decks-pergolas-melbourne",
  },
  openGraph: {
    title: "Decks & Pergolas Melbourne | Timber Deck Builders | Konntey H&R",
    description:
      "Premium deck and pergola construction across Melbourne. Merbau, spotted gum & composite options. Fixed-price quotes, built for Australian weather.",
    url: "https://www.konnteyhomerenovations.com.au/decks-pergolas-melbourne",
    siteName: "Konntey Home & Renovations",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/images/outdoor.webp",
        width: 1200,
        height: 630,
        alt: "Premium timber deck and pergola installation in Melbourne by Konntey H&R",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Decks & Pergolas Melbourne | Timber Deck Builders | Konntey H&R",
    description:
      "Premium deck and pergola builders. Merbau, spotted gum & composite. Fixed-price quotes across Melbourne.",
    images: ["/images/outdoor.webp"],
  },
};

export default function DecksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
