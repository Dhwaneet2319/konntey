"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import Ticker from "@/components/Ticker";
import TrustStrip from "@/components/TrustStrip";
import { business } from "@/content/business";

// Everything in the hero (heading, copy, CTAs, LCP image) is visible in the
// server HTML with no entrance animation; only the decorative underline moves.
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100vh] overflow-hidden bg-white pt-[120px]"
    >
      <div className="relative z-10 mx-auto max-w-[1600px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-16">
          <div className="flex flex-col justify-center lg:col-span-5 xl:col-span-6">
            {/* Eyebrow + H1: the H1 states what we do and where, and must stay
                readable at a glance; the tagline below is supporting brand copy. */}
            <div className="flex gap-4">
              <span
                aria-hidden="true"
                className="mt-[5px] h-auto w-[3px] shrink-0 self-stretch bg-gold-bright"
              />
              <div>
                <p className="font-body text-[11px] font-semibold uppercase tracking-kicker text-gold-deep">
                  Konntey Home &amp; Renovations · Melbourne, Victoria
                </p>
                <h1 className="mt-2 max-w-xl font-display text-[clamp(1.5rem,3vw,2.25rem)] font-black uppercase leading-[1.05] tracking-tight text-navy">
                  Home Renovations, Extensions &amp; Building Services in Melbourne
                </h1>
              </div>
            </div>

            {/* Brand tagline: deliberately not the H1 */}
            <div className="mt-8 flex flex-col gap-1 font-display text-[clamp(4.5rem,14.5vw,7rem)] md:text-[clamp(3.5rem,9vw,6.5rem)] xl:text-[8rem] font-black uppercase leading-[0.82] tracking-tighter text-navy">
              <div>IT&apos;S YOUR</div>
              <div>
                <span className="relative inline-block text-gold-bright">
                  HOME.
                  <m.span
                    aria-hidden="true"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                    className="absolute -bottom-2 left-0 h-[6px] w-full origin-left bg-gold-bright"
                  />
                </span>
              </div>
              <div>WE BUILD</div>
              <div>IT RIGHT.</div>
            </div>

            <p className="mt-8 max-w-md font-body text-[16px] leading-[1.7] text-navy/70">
              We design and build kitchen and bathroom renovations, home
              extensions, decks and interior painting for homes across
              Melbourne&apos;s west and southeast.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/quote"
                className="group relative inline-flex overflow-hidden bg-gold-bright px-8 py-5 font-display text-[16px] font-black uppercase tracking-button text-navy"
              >
                <span className="relative z-10 transition-transform duration-150 block group-hover:-translate-y-12">
                  Request a Free Quote
                </span>
                <span aria-hidden="true" className="absolute inset-x-0 top-12 z-10 flex h-full items-center justify-center gap-1 transition-transform duration-150 group-hover:-translate-y-12">
                  <span>Ready?</span><ArrowRight size={16} strokeWidth={2.25} className="shrink-0" />
                </span>
              </Link>
              <Link
                href="/kitchen-renovations-melbourne#before-after"
                className="inline-flex border-2 border-navy/20 px-8 py-[18px] font-display text-[16px] font-black uppercase tracking-button text-navy transition-colors duration-150 hover:border-gold hover:text-gold"
              >
                See a Before &amp; After
              </Link>
            </div>

            <a
              href={`tel:${business.phoneE164}`}
              className="mt-5 inline-flex w-fit items-center gap-2 font-body text-[15px] font-semibold text-navy/80 transition-colors hover:text-gold-deep"
            >
              <Phone size={15} strokeWidth={2.25} className="shrink-0" />
              <span>Or call {business.phoneDisplay}</span>
            </a>

            <div className="mt-6">
              <TrustStrip theme="light" />
            </div>

            <div className="mt-12 md:hidden relative left-1/2 -ml-[50vw] w-[100vw]">
              <Ticker text="Quality Work ◆ On Time ◆ Fair Pricing ◆ Melbourne Based ◆ Family Run ◆" />
            </div>
          </div>

          <div className="relative mt-8 lg:col-span-7 xl:col-span-6 lg:mt-0 xl:mt-12">
            <div className="relative h-[65vh] min-h-[450px] w-full overflow-hidden border border-navy/10 parent-group">
              <Image
                src="/images/hero-main.webp"
                alt="Premium home renovation by Konntey — professional builders Melbourne"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
                priority
                fetchPriority="high"
              />

              <div className="corner-cut corner-cut-tl" />
              <div className="corner-cut corner-cut-br" />

              <div className="chevron-decoration chevron-tl">»</div>
              <div className="chevron-decoration chevron-br">»</div>

              <div className="absolute bottom-6 right-6 z-10 border border-gold-bright/30 bg-navy/80 px-5 py-3 backdrop-blur-md">
                <span className="font-display text-[14px] font-black uppercase tracking-button text-gold-bright">
                  Melbourne&apos;s Own
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
