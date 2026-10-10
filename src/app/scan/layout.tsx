import { pageMetadata } from "@/lib/seo";

// QR-code landing page: noindex but crawlable (robots.ts does not disallow
// it), so crawlers can see the noindex directive.
export const metadata = pageMetadata({
  title: "Handyman & renovation services",
  description:
    "Handyman and renovation services across Melbourne: carpentry, painting, fencing, landscaping, general repairs and end-of-lease repairs. Request a free quote from Konntey Home & Renovations.",
  path: "/scan",
  noindex: true,
});

export default function ScanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
