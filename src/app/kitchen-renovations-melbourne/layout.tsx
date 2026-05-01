import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Kitchen Renovations Western Melbourne | Custom Designs & Fixed Pricing | Konntey H&R",
  description:
    "Kitchen renovations across Melbourne's western suburbs. BPC registered, fixed-price quotes, full project management. Serving Tarneit, Werribee, Footscray, Point Cook & more.",
};

export default function KitchenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
