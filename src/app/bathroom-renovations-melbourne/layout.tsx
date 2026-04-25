import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Bathroom Renovations Western Melbourne | Waterproofing Certified Builder | Konntey H&R",
  description:
    "Bathroom renovations across Melbourne's western suburbs. BPC registered, AS/NZS 3740 certified waterproofing, fixed-price quotes. Serving Werribee, Tarneit, Footscray & more.",
};

export default function BathroomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
