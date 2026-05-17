import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Konntey Home & Renovations",
  description:
    "Read the privacy policy for Konntey Home & Renovations, Melbourne VIC. Learn how we handle your personal information in accordance with Australian Privacy Principles.",
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-4 font-body text-[14px] text-white/70">
          Last updated: November 2025
        </p>

        <div className="mt-12 space-y-10 font-body text-[16px] leading-[1.8] text-white/90">
          <section>
            <h2 className="font-display text-[20px] font-black uppercase tracking-button text-gold-bright">
              Who We Are
            </h2>
            <p className="mt-4">
              Konntey Home & Renovations is a professional renovation company based
              in Melbourne, Victoria. This policy explains how we handle personal
              information collected through our website at konnteyhomerenovations.com.au.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-black uppercase tracking-button text-gold-bright">
              Information We Collect
            </h2>
            <p className="mt-4">
              When you contact us through our website, we may collect your name,
              phone number, email address and project details that you provide
              voluntarily through our contact form or WhatsApp enquiry.
            </p>
            <p className="mt-4">
              We do not collect sensitive personal information, payment details or
              identification documents through this website.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-black uppercase tracking-button text-gold-bright">
              How We Use Your Information
            </h2>
            <p className="mt-4">We use the information you provide solely to:</p>
            <ul className="mt-3 list-inside list-disc space-y-2 text-white/85">
              <li>Respond to your renovation enquiry</li>
              <li>Arrange a consultation or provide a quote</li>
              <li>Communicate project updates if you become a client</li>
            </ul>
            <p className="mt-4">
              We do not sell, rent or share your personal information with third
              parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-black uppercase tracking-button text-gold-bright">
              Data Storage & Security
            </h2>
            <p className="mt-4">
              Your information is stored securely and accessed only by authorised
              Konntey team members. We take reasonable steps to protect your data
              from misuse, loss or unauthorised access in accordance with the
              Australian Privacy Principles under the Privacy Act 1988 (Cth).
            </p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-black uppercase tracking-button text-gold-bright">
              Cookies & Analytics
            </h2>
            <p className="mt-4">
              Our website may use basic analytics to understand visitor behaviour
              (pages visited, time on site). No personally identifiable information
              is collected through analytics. We do not use advertising cookies or
              tracking pixels.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-black uppercase tracking-button text-gold-bright">
              Your Rights
            </h2>
            <p className="mt-4">
              You may request access to, correction of, or deletion of your
              personal information at any time by contacting us. We will respond
              to your request within a reasonable timeframe.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-black uppercase tracking-button text-gold-bright">
              Contact
            </h2>
            <p className="mt-4">
              For any privacy-related queries, contact us at{" "}
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
