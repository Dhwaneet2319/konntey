import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Free Renovation Quote in Melbourne",
  description:
    "Request a free, no-obligation renovation quote from Konntey. We'll visit your property, understand your vision, and give you an honest price within 24 hours.",
  alternates: {
    canonical: "/quote",
  },
  openGraph: {
    title: "Get a Free Renovation Quote in Melbourne | Konntey H&R",
    description:
      "Request a free, no-obligation renovation quote from Konntey. We'll visit your property, understand your vision, and give you an honest price within 24 hours.",
    url: "https://www.konnteyhomerenovations.com.au/quote",
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
