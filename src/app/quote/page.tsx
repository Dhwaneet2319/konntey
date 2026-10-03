import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Phone } from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";
import { Container, TextLink } from "@/components/ui";
import { business, claimText, howWeWork } from "@/content/business";
import { siteImages } from "@/content/images";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

const nextSteps = howWeWork.slice(0, 3);

export default function QuotePage() {
  const responseNote = claimText("responseTimes");
  return (
    <div className="flex min-h-screen flex-col bg-white font-body text-navy">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbSchema([{ name: "Get a free quote", path: "/quote" }]))}
      />
      <header className="border-b border-navy/10 bg-white">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link href="/" aria-label={`${business.name} home`} className="flex items-center">
            <Image
              src={siteImages.logo.src}
              alt=""
              width={siteImages.logo.width}
              height={siteImages.logo.height}
              className="h-10 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${business.phoneE164}`}
              data-placement="quote_header"
              className="hidden items-center gap-2 font-body text-[15px] font-semibold text-navy hover:text-gold-deep sm:inline-flex"
            >
              <Phone aria-hidden="true" size={16} />
              {business.phoneDisplay}
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-body text-[14px] text-navy/70 hover:text-navy"
            >
              <ArrowLeft aria-hidden="true" size={15} />
              Back to site
            </Link>
          </div>
        </Container>
      </header>

      <main id="main" className="flex-grow py-12 sm:py-16">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <div>
            <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold leading-[1.03] tracking-[-0.015em]">
              Get a free renovation quote
            </h1>
            <p className="mt-5 max-w-md font-body text-[17px] leading-[1.7] text-navy/75">
              Tell us about your project and we&apos;ll arrange a free site visit.{" "}
              {responseNote}
            </p>
            <p className="mt-4 font-body text-[16px] text-navy/75">
              Prefer to talk?{" "}
              <a
                href={`tel:${business.phoneE164}`}
                data-placement="quote_intro"
                className="font-semibold text-navy underline underline-offset-4"
              >
                Call {business.phoneDisplay}
              </a>
            </p>

            <h2 className="mt-10 font-display text-[22px] font-bold">What happens next</h2>
            <ol className="mt-5 space-y-5">
              {nextSteps.map((s, i) => (
                <li key={s.step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy font-body text-[14px] font-semibold text-gold-bright">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-body text-[16px] font-semibold">{s.step}</h3>
                    <p className="mt-1 font-body text-[15px] leading-[1.6] text-navy/70">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 border-l-2 border-gold-bright pl-5">
              <p className="font-body text-[15px] leading-[1.6] text-navy/75">
                Comparing builders? Our checklist covers what a complete renovation quote should include.
              </p>
              <div className="mt-2">
                <TextLink href="/guides/renovation-quote-checklist-melbourne">Quote comparison checklist</TextLink>
              </div>
            </div>
          </div>

          <div className="border border-navy/10 p-6 sm:p-8">
            <EnquiryForm placement="quote_page" readUrlParams />
          </div>
        </Container>
      </main>

      <footer className="border-t border-navy/10 py-6">
        <Container className="flex flex-col gap-2 font-body text-[13px] text-navy/60 sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {business.name} · ABN {business.abn}
          </span>
          <span>
            <Link href="/privacy" className="hover:text-navy">Privacy</Link>
            {" · "}
            <Link href="/terms" className="hover:text-navy">Terms</Link>
            {" · Built by "}
            <a href="https://dhwaneet.codes" target="_blank" rel="noopener noreferrer" className="hover:text-navy">
              dhwaneet
            </a>
          </span>
        </Container>
      </footer>
    </div>
  );
}
