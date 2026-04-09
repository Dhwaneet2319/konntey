import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Free Renovation Quote | Konntey Home & Renovations Melbourne",
  description:
    "Request a free, no-obligation renovation quote from Konntey Home & Renovations. Kitchen renovations, bathroom renos, home extensions, decks & painting across Melbourne. Licensed builders — call 0493 191 798.",
  alternates: {
    canonical: "/quote",
  },
  openGraph: {
    title: "Get a Free Renovation Quote | Konntey Home & Renovations",
    description:
      "Request a free renovation quote. Licensed builders in Melbourne servicing Tarneit, Truganina, Werribee & all western suburbs.",
    url: "https://konntey.com.au/quote",
    siteName: "Konntey Home & Renovations",
    locale: "en_AU",
    type: "website",
  },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
