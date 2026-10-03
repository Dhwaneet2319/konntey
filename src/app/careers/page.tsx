import Link from "next/link";
import { ChevronRight, Mail } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Container, Kicker } from "@/components/ui";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

// Utility page: kept out of the index and the sitemap until there are
// specific roles to advertise.
export const metadata = pageMetadata({
  title: "Work with us",
  description:
    "Skilled tradespeople in Melbourne's west and southeast: how to get in touch with Konntey Home & Renovations about trade work.",
  path: "/careers",
  noindex: true,
});

const include = [
  "Your trade and any licence or registration numbers that apply to it",
  "Your ABN, if you work as a subcontractor",
  "The suburbs you can cover and your general availability",
  "A few photos or links showing recent work",
];

export default function CareersPage() {
  const mailto = `mailto:${business.email}?subject=${encodeURIComponent("Trade work enquiry")}`;
  return (
    <div className="flex min-h-screen flex-col bg-white font-body text-navy">
      <NavBar theme="dark" />
      <main id="main" className="flex-grow">
        <section className="bg-navy pb-14 pt-[104px] text-white sm:pb-20 lg:pt-[120px]">
          <Container>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 font-body text-[13px] text-white/60">
                <li>
                  <Link href="/" className="hover:text-gold-bright">Home</Link>
                </li>
                <li aria-hidden="true"><ChevronRight size={13} /></li>
                <li aria-current="page" className="text-white/85">Work with us</li>
              </ol>
            </nav>
            <div className="mt-8 max-w-2xl">
              <Kicker tone="dark">Careers</Kicker>
              <h1 className="mt-4 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.015em]">
                Skilled tradesperson? Let&apos;s talk.
              </h1>
              <p className="mt-6 font-body text-[17px] leading-[1.7] text-white/80">
                We don&apos;t have specific roles advertised right now, but we&apos;re
                always glad to hear from reliable, quality-focused tradespeople
                working in {business.serviceArea}.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-24">
          <Container className="max-w-3xl">
            <h2 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-tight">
              What to include in your email
            </h2>
            <ul className="mt-6 space-y-3">
              {include.map((item) => (
                <li key={item} className="flex gap-3 font-body text-[16px] leading-[1.65] text-navy/80">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-gold-bright" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={mailto}
              className="mt-10 inline-flex min-h-[48px] items-center gap-2 bg-navy px-6 py-3 font-body text-[15px] font-semibold text-white transition-colors duration-hover hover:bg-navy-light"
            >
              <Mail aria-hidden="true" size={16} />
              Email {business.email}
            </a>
            <p className="mt-6 font-body text-[14px] text-navy/60">
              Looking for a renovation quote instead?{" "}
              <Link href="/quote" className="font-semibold text-gold-deep underline-offset-4 hover:underline">
                Request a free quote
              </Link>
              .
            </p>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
