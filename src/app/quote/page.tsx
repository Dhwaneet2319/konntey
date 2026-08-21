"use client";

import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { track } from "@/lib/analytics";

const serviceOptions = [
  "Kitchen Renovation",
  "Bathroom Renovation",
  "Home Extension",
  "Decks & Pergolas",
  "Interior Painting",
  "Vastu Renovation",
  "Other",
];

const contactMethodOptions = ["Phone call", "WhatsApp", "Email"];

const timingOptions = [
  "As soon as possible",
  "Within 1–3 months",
  "In 3–6 months",
  "Just researching for now",
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.konnteyhomerenovations.com.au" },
    { "@type": "ListItem", position: 2, name: "Get a Free Quote", item: "https://www.konnteyhomerenovations.com.au/quote" },
  ],
};

export default function QuotePage() {
  const [state, handleSubmit] = useForm("xkopaqvd");
  const [service, setService] = useState("");
  const startTracked = useRef(false);

  // First interaction with any field → quote_form_start (no PII, once only).
  const onFormInteract = () => {
    if (startTracked.current) return;
    startTracked.current = true;
    track("quote_form_start", { page_type: "quote" });
  };

  // Successful submission only → quote_form_submit. Only the selected
  // service category is sent — never names, contact details or free text.
  useEffect(() => {
    if (state.succeeded) {
      track("quote_form_submit", {
        page_type: "quote",
        service_context: service || undefined,
      });
    }
  }, [state.succeeded, service]);

  return (
    <div className="min-h-screen bg-navy text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Simple nav header */}
      <m.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 h-[60px] border-b border-white/10 bg-navy"
      >
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="font-display text-[22px] font-black tracking-tighter text-white">
              KONNTEY
            </span>
            <span className="font-display text-[18px] font-black tracking-tighter text-gold-bright">
              H&R
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-[13px] font-medium tracking-[0.5px] text-white/75 transition-colors duration-150 hover:text-gold-bright"
          >
            <ArrowLeft size={15} strokeWidth={2.25} className="shrink-0" />
            <span>Back to Home</span>
          </Link>
        </div>
      </m.header>

      <div className="mx-auto max-w-3xl px-4 pt-[100px] pb-16 sm:px-6 lg:px-8">
        <m.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <h1 className="font-display text-[clamp(3rem,10vw,7rem)] font-black uppercase leading-display tracking-tightest text-gold-bright">
            Get a Quote
          </h1>
          <p className="mt-4 max-w-2xl font-body text-[15px] leading-body text-white/75">
            Tell us a little about your project and we&apos;ll get back to you
            with the next steps.
          </p>
        </m.div>

        {state.succeeded ? (
          <m.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-12 border border-gold/30 bg-navy-light p-8"
          >
            <div className="text-4xl">✓</div>
            <h2 className="mt-4 font-display text-[28px] font-black uppercase tracking-tighter text-gold-bright">
              Thank You
            </h2>
            <p className="mt-3 font-body text-[15px] leading-body text-white/90">
              We&apos;ve received your request. A member of our team will
              review your details and be in touch to arrange the next step.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex bg-gold-bright px-6 py-3 font-display text-[14px] font-black uppercase tracking-button text-navy transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#be9724]"
            >
              Back to Home
            </Link>
          </m.div>
        ) : (
          <m.form
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
            className="mt-10 grid gap-5"
            onSubmit={handleSubmit}
            onFocusCapture={onFormInteract}
          >
            <input type="hidden" name="_subject" value="New Quote Request from Konntey website" />
            <input type="hidden" name="form_source" value="Quote Page" />

            <label className="grid gap-2">
              <span className="font-body text-[11px] font-semibold uppercase tracking-kicker text-gold-bright">
                Name
              </span>
              <input
                id="name"
                name="name"
                required
                type="text"
                className="border border-white/10 bg-navy-light px-4 py-4 font-body text-white outline-none transition-colors duration-200 placeholder:text-white/30 focus:border-gold/50"
                placeholder="Your full name"
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} className="font-body text-[12px] text-red-400" />
            </label>

            <label className="grid gap-2">
              <span className="font-body text-[11px] font-semibold uppercase tracking-kicker text-gold-bright">
                Phone
              </span>
              <input
                id="phone"
                name="phone"
                required
                type="tel"
                className="border border-white/10 bg-navy-light px-4 py-4 font-body text-white outline-none transition-colors duration-200 placeholder:text-white/30 focus:border-gold/50"
                placeholder="0493 191 798"
              />
              <ValidationError prefix="Phone" field="phone" errors={state.errors} className="font-body text-[12px] text-red-400" />
            </label>

            <label className="grid gap-2">
              <span className="font-body text-[11px] font-semibold uppercase tracking-kicker text-gold-bright">
                Email
              </span>
              <input
                id="email"
                name="email"
                required
                type="email"
                className="border border-white/10 bg-navy-light px-4 py-4 font-body text-white outline-none transition-colors duration-200 placeholder:text-white/30 focus:border-gold/50"
                placeholder="you@example.com"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="font-body text-[12px] text-red-400" />
            </label>

            <label className="grid gap-2">
              <span className="font-body text-[11px] font-semibold uppercase tracking-kicker text-gold-bright">
                Service
              </span>
              <select
                id="service"
                name="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
                className="border border-white/10 bg-navy-light px-4 py-4 font-body text-white outline-none transition-colors duration-200 focus:border-gold/50"
              >
                <option value="" disabled>Select a service</option>
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="font-body text-[11px] font-semibold uppercase tracking-kicker text-gold-bright">
                Suburb or postcode <span className="normal-case text-white/50">(optional)</span>
              </span>
              <input
                id="suburb"
                name="suburb"
                type="text"
                className="border border-white/10 bg-navy-light px-4 py-4 font-body text-white outline-none transition-colors duration-200 placeholder:text-white/30 focus:border-gold/50"
                placeholder="Tarneit, Werribee, Point Cook..."
              />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="font-body text-[11px] font-semibold uppercase tracking-kicker text-gold-bright">
                  Preferred contact method <span className="normal-case text-white/50">(optional)</span>
                </span>
                <select
                  id="contact_method"
                  name="contact_method"
                  defaultValue=""
                  className="border border-white/10 bg-navy-light px-4 py-4 font-body text-white outline-none transition-colors duration-200 focus:border-gold/50"
                >
                  <option value="">No preference</option>
                  {contactMethodOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="font-body text-[11px] font-semibold uppercase tracking-kicker text-gold-bright">
                  Project timing <span className="normal-case text-white/50">(optional)</span>
                </span>
                <select
                  id="timing"
                  name="timing"
                  defaultValue=""
                  className="border border-white/10 bg-navy-light px-4 py-4 font-body text-white outline-none transition-colors duration-200 focus:border-gold/50"
                >
                  <option value="">Not sure yet</option>
                  {timingOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="grid gap-2">
              <span className="font-body text-[11px] font-semibold uppercase tracking-kicker text-gold-bright">
                Project details
              </span>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="border border-white/10 bg-navy-light px-4 py-4 font-body text-white outline-none transition-colors duration-200 placeholder:text-white/30 focus:border-gold/50"
                placeholder="Tell us about your project..."
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} className="font-body text-[12px] text-red-400" />
            </label>

            <div className="mt-2 flex flex-wrap items-center gap-5">
              <button
                type="submit"
                disabled={state.submitting}
                className="inline-flex w-fit items-center justify-center bg-gold-bright px-8 py-4 font-display text-[15px] font-black uppercase tracking-button text-navy transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#be9724] disabled:opacity-60"
              >
                {state.submitting ? "Sending..." : "Submit Request"}
              </button>
              <span className="font-body text-[13px] text-white/60">
                We only use your details to respond to this enquiry.{" "}
                <Link href="/privacy" className="text-gold-bright hover:underline">
                  Privacy policy
                </Link>
              </span>
            </div>
          </m.form>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-navy-light">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-6 text-[13px] text-white/85 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            © {new Date().getFullYear()} Konntey Home & Renovations. Melbourne,
            VIC. Built by{" "}
            <a
              href="https://dhwaneet.codes"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-bright transition-colors"
            >
              dhwaneet
            </a>
            .
          </div>
        </div>
      </footer>
    </div>
  );
}
