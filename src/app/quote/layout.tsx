import { claimText } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Get a free renovation quote in Melbourne",
  description: `Request a free, no-obligation renovation quote from Konntey for Melbourne's west and southeast. ${claimText("responseTimes")}`.trim(),
  path: "/quote",
});

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
