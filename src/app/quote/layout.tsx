import { claimText, quoteKind } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Get a free renovation quote in Melbourne",
  description: `Request a free, no-obligation renovation quote from Konntey for Melbourne's west and southeast. We visit your property and provide a ${quoteKind}. ${claimText("responseTimes")}`.trim(),
  path: "/quote",
});

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
