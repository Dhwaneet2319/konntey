import { pageMetadata } from "@/lib/seo";

// Kept under ~160 characters so search results show it in full. Response
// times are stated on the page itself, where the approved claim renders.
export const metadata = pageMetadata({
  title: "Get a free renovation quote in Melbourne",
  description:
    "Request a free, no-obligation quote for a kitchen, bathroom, extension, deck or painting project in Melbourne's western and south-eastern suburbs.",
  path: "/quote",
});

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
