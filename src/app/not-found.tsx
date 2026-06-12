import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

const popularPages = [
  { href: "/kitchen-renovations-melbourne", label: "Kitchen Renovations" },
  { href: "/bathroom-renovations-melbourne", label: "Bathroom Renovations" },
  { href: "/home-extensions-melbourne", label: "Home Extensions" },
  { href: "/decks-pergolas-melbourne", label: "Decks & Pergolas" },
  { href: "/interior-painting-melbourne", label: "Interior Painting" },
  { href: "/quote", label: "Get a Free Quote" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy text-white font-body flex items-center">
      <div className="mx-auto max-w-3xl px-4 py-32 sm:px-6 lg:px-8 text-center">
        <div className="font-display text-[clamp(6rem,20vw,12rem)] font-black uppercase leading-none tracking-tighter text-gold-bright">
          404
        </div>
        <h1 className="mt-4 font-display text-[clamp(1.5rem,4vw,2.5rem)] font-black uppercase tracking-tightest text-white">
          Page Not Found
        </h1>
        <p className="mt-6 font-body text-[16px] leading-[1.8] text-white/80">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
          moved. Here are some popular pages instead:
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {popularPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="border border-white/15 px-6 py-3 font-display text-[14px] font-bold uppercase tracking-button text-white/85 hover:border-gold-bright hover:text-gold-bright transition-colors"
            >
              {page.label}
            </Link>
          ))}
        </div>
        <div className="mt-12">
          <Link
            href="/"
            className="bg-gold-bright px-8 py-5 font-display text-[16px] font-black uppercase tracking-button text-navy inline-flex"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
