import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Konntey Home & Renovations",
  description:
    "Read the terms and conditions for Konntey Home & Renovations, Melbourne VIC.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-navy text-white">
      <div className="mx-auto max-w-3xl px-4 py-32 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-display text-[14px] font-bold uppercase tracking-button text-gold-bright transition-colors hover:text-gold"
        >
          <ArrowLeft size={16} strokeWidth={2.25} className="shrink-0" />
          <span>Back to Home</span>
        </Link>

        <h1 className="mt-10 font-display text-[clamp(2.5rem,6vw,4rem)] font-black uppercase leading-[0.9] tracking-tightest text-white">
          Terms of Service
        </h1>
        <p className="mt-4 font-body text-[14px] text-white/70">
          Last updated: April 2026
        </p>

        <div className="mt-12 space-y-10 font-body text-[16px] leading-[1.8] text-white/90">
          <section>
            <h2 className="font-display text-[20px] font-black uppercase tracking-button text-gold-bright">
              Agreement
            </h2>
            <p className="mt-4">
              By using the Konntey Home & Renovations website
              (konnteyhomerenovations.com.au), you agree to the following terms. If you do not
              agree, please do not use this website.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-black uppercase tracking-button text-gold-bright">
              Services & Quotes
            </h2>
            <p className="mt-4">
              Information on this website, including pricing examples and service
              descriptions, is provided for general guidance only. All quotes are
              estimates until confirmed in writing with a signed scope of work.
              Final pricing may vary depending on site conditions, material
              selections and project complexity.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-black uppercase tracking-button text-gold-bright">
              Intellectual Property
            </h2>
            <p className="mt-4">
              All content on this website — including text, images, design, logos
              and branding — is the property of Konntey Home & Renovations or
              its licensors. You may not reproduce, distribute or use any content
              without prior written consent.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-black uppercase tracking-button text-gold-bright">
              Limitation of Liability
            </h2>
            <p className="mt-4">
              While we make every effort to ensure the information on this website
              is accurate and up to date, Konntey Home & Renovations does not
              guarantee its completeness or accuracy. We are not liable for any
              loss or damage arising from reliance on website content.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-black uppercase tracking-button text-gold-bright">
              Australian Consumer Law
            </h2>
            <p className="mt-4">
              Nothing in these terms limits your rights under the Australian
              Consumer Law. Our renovation services come with guarantees that
              cannot be excluded under Australian law. If something goes wrong,
              you are entitled to a remedy in accordance with those guarantees.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-black uppercase tracking-button text-gold-bright">
              External Links
            </h2>
            <p className="mt-4">
              This website may contain links to third-party websites. We are not
              responsible for the content, privacy practices or availability of
              external sites.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-black uppercase tracking-button text-gold-bright">
              Changes to These Terms
            </h2>
            <p className="mt-4">
              We may update these terms from time to time. Continued use of the
              website after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-black uppercase tracking-button text-gold-bright">
              Contact
            </h2>
            <p className="mt-4">
              Questions about these terms? Contact us at{" "}
              <a
                href="mailto:info@konnteyhomerenovations.com.au"
                className="text-gold-bright transition-colors hover:text-gold"
              >
                info@konnteyhomerenovations.com.au
              </a>{" "}
              or call{" "}
              <a
                href="tel:0493191798"
                className="text-gold-bright transition-colors hover:text-gold"
              >
                0493 191 798
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
