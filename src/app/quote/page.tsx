"use client";

import { useState } from "react";
import { m } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const serviceOptions = [
  "Kitchen & Bathroom",
  "Extensions",
  "Decks & Outdoor",
  "Painting & Finishing",
  "Other",
];

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Quote form submitted:", data);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-navy text-white">
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

        {submitted ? (
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
              We&apos;ve received your request. A member of our team will be in
              touch within 24 hours.
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
          >
            {["Name", "Phone", "Email"].map((label) => (
              <label key={label} className="grid gap-2">
                <span className="font-body text-[11px] font-semibold uppercase tracking-kicker text-gold-bright">
                  {label}
                </span>
                <input
                  name={label.toLowerCase()}
                  required={label !== "Phone"}
                  type={
                    label === "Email"
                      ? "email"
                      : label === "Phone"
                      ? "tel"
                      : "text"
                  }
                  className="border border-white/10 bg-navy-light px-4 py-4 font-body text-white outline-none transition-colors duration-200 placeholder:text-white/30 focus:border-gold/50"
                  placeholder={label}
                />
              </label>
            ))}
            <label className="grid gap-2">
              <span className="font-body text-[11px] font-semibold uppercase tracking-kicker text-gold-bright">
                Service
              </span>
              <select
                name="service"
                className="border border-white/10 bg-navy-light px-4 py-4 font-body text-white outline-none transition-colors duration-200 focus:border-gold/50"
              >
                {serviceOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="font-body text-[11px] font-semibold uppercase tracking-kicker text-gold-bright">
                Message
              </span>
              <textarea
                name="message"
                rows={6}
                className="border border-white/10 bg-navy-light px-4 py-4 font-body text-white outline-none transition-colors duration-200 placeholder:text-white/30 focus:border-gold/50"
                placeholder="Tell us about your project..."
              />
            </label>
            <button
              type="submit"
              className="mt-2 inline-flex w-fit items-center justify-center bg-gold-bright px-8 py-4 font-display text-[15px] font-black uppercase tracking-button text-navy transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#be9724]"
            >
              Submit
            </button>
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
