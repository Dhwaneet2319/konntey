import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handyman & Renovation Services Melbourne | Konntey H&R",
  description:
    "Quality handyman and renovation services across Melbourne. Carpentry, plumbing, painting, fencing, landscaping, end of lease repairs & more. Get a free quote from Konntey Home & Renovations.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ScanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
