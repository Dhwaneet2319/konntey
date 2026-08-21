import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/chat/FloatingActions";
import {
  business,
  BASE_URL,
  completeCredentials,
  insuranceStatement,
  howWeWork,
  credentialsPageIndexable,
} from "@/content/business";

export const metadata: Metadata = {
  title: "Credentials, Compliance & How We Work",
  description:
    "How Konntey Home & Renovations works: business details, our quoting and contract process, and compliance information for Melbourne renovation projects.",
  alternates: { canonical: "/credentials-and-compliance" },
  // OWNER: page stays noindexed until every displayed fact is reviewed and
  // credentialsPageIndexable is set to true in src/content/business.ts.
  robots: credentialsPageIndexable ? undefined : { index: false, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Credentials, Compliance & How We Work",
      item: `${BASE_URL}/credentials-and-compliance`,
    },
  ],
};

const isProd = process.env.NODE_ENV === "production";

export default function CredentialsPage() {
  const credentials = completeCredentials();

  return (
    <div className="bg-navy text-white font-body min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <NavBar theme="dark" />
      <FloatingActions />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="border-b border-white/10 px-4 sm:px-6 lg:px-8 pt-[110px]"
        >
          <div className="mx-auto max-w-4xl pb-4">
            <ol className="flex flex-wrap items-center gap-2 font-body text-[13px] text-white/60">
              <li>
                <Link href="/" className="transition-colors hover:text-gold-bright">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="flex items-center">
                <ChevronRight size={14} className="text-white/30" />
              </li>
              <li aria-current="page" className="text-white/90">
                Credentials &amp; Compliance
              </li>
            </ol>
          </div>
        </nav>

        <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-black uppercase leading-[0.9] tracking-tightest text-white">
              Credentials, Compliance &amp;{" "}
              <span className="text-gold-bright">How We Work</span>
            </h1>
            <p className="mt-8 max-w-2xl font-body text-[17px] leading-[1.85] text-white/85">
              Everything on this page is factual business information you can
              check for yourself. We only publish credentials once they can be
              independently verified.
            </p>

            {/* Business details */}
            <section className="mt-14">
              <h2 className="font-display text-[clamp(1.5rem,3.5vw,2rem)] font-black uppercase tracking-tightest text-gold-bright">
                Business Details
              </h2>
              <dl className="mt-6 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
                {[
                  { label: "Business name", value: business.name },
                  { label: "ABN", value: business.abn },
                  { label: "Phone", value: business.phoneDisplay },
                  { label: "Email", value: business.email },
                  { label: "Based in", value: "Melbourne, Victoria" },
                  { label: "Service area", value: business.serviceArea },
                ].map((row) => (
                  <div key={row.label} className="bg-navy p-5">
                    <dt className="font-body text-[11px] font-semibold uppercase tracking-kicker text-white/60">
                      {row.label}
                    </dt>
                    <dd className="mt-1.5 font-body text-[15px] text-white/90">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 font-body text-[13px] text-white/60">
                You can verify our ABN on the{" "}
                <a
                  href="https://abr.business.gov.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gold-bright transition-colors hover:text-white"
                >
                  <span>Australian Business Register</span>
                  <ExternalLink size={12} strokeWidth={2.25} />
                </a>
                .
              </p>
            </section>

            {/* Registrations & licences — hidden until records are complete */}
            {credentials.length > 0 && (
              <section className="mt-14">
                <h2 className="font-display text-[clamp(1.5rem,3.5vw,2rem)] font-black uppercase tracking-tightest text-gold-bright">
                  Registrations &amp; Licences
                </h2>
                <div className="mt-6 space-y-4">
                  {credentials.map((c) => (
                    <div key={c.id} className="border border-white/10 p-6">
                      <h3 className="font-display text-[17px] font-black uppercase tracking-button text-white">
                        {c.label}
                      </h3>
                      <p className="mt-2 font-body text-[14px] text-white/80">
                        {c.registrationType} · No. {c.number}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-4 font-body text-[13px] text-white/60">
                        <a
                          href={c.publicCheckUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-gold-bright transition-colors hover:text-white"
                        >
                          <span>Check on the public register</span>
                          <ExternalLink size={12} strokeWidth={2.25} />
                        </a>
                        <span>Last verified: {c.lastVerified}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {!isProd && credentials.length === 0 && (
              <div className="mt-14 border border-gold-bright/40 bg-navy-light p-6 font-body text-[14px] leading-[1.7] text-white/80">
                <strong className="font-semibold">Development note:</strong> no
                complete credential records exist in{" "}
                <code>src/content/business.ts</code>, so the Registrations
                &amp; Licences section is hidden. It will appear automatically
                once the owner supplies label, type, number, public-check URL
                and a last-verified date for each record.
              </div>
            )}

            {/* Insurance — approved wording only */}
            {insuranceStatement && (
              <section className="mt-14">
                <h2 className="font-display text-[clamp(1.5rem,3.5vw,2rem)] font-black uppercase tracking-tightest text-gold-bright">
                  Insurance
                </h2>
                <p className="mt-5 font-body text-[16px] leading-[1.85] text-white/85">
                  {insuranceStatement}
                </p>
              </section>
            )}

            {/* Process — factual description of how jobs actually run */}
            <section className="mt-14">
              <h2 className="font-display text-[clamp(1.5rem,3.5vw,2rem)] font-black uppercase tracking-tightest text-gold-bright">
                How Every Project Runs
              </h2>
              <ol className="mt-8 space-y-6">
                {howWeWork.map((stage, i) => (
                  <li key={stage.step} className="flex gap-5">
                    <span
                      aria-hidden="true"
                      className="font-display text-[28px] font-black leading-none text-gold-bright/40"
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-[16px] font-black uppercase tracking-button text-white">
                        {stage.step}
                      </h3>
                      <p className="mt-1.5 font-body text-[15px] leading-[1.75] text-white/80">
                        {stage.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Official resources */}
            <section className="mt-14">
              <h2 className="font-display text-[clamp(1.5rem,3.5vw,2rem)] font-black uppercase tracking-tightest text-gold-bright">
                Official Resources
              </h2>
              <p className="mt-5 font-body text-[15px] leading-[1.8] text-white/80">
                If you&apos;re planning a renovation in Victoria, these official
                sources cover permits, practitioner registration and consumer
                protections:
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  {
                    label: "Building and renovating — Victorian Government",
                    href: "https://www.vic.gov.au/building-and-renovating",
                  },
                  {
                    label: "Australian Business Register — ABN lookup",
                    href: "https://abr.business.gov.au/",
                  },
                  {
                    label: "Consumer Affairs Victoria — building and renovating",
                    href: "https://www.consumer.vic.gov.au/housing/building-and-renovating",
                  },
                ].map((r) => (
                  <li key={r.href}>
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-body text-[15px] text-gold-bright transition-colors hover:text-white"
                    >
                      <span>{r.label}</span>
                      <ExternalLink size={13} strokeWidth={2.25} />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-16">
              <Link
                href="/quote"
                className="inline-flex bg-gold-bright px-8 py-5 font-display text-[15px] font-black uppercase tracking-button text-navy"
              >
                Request a Free Quote
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
