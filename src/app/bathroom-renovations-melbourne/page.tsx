"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import WhatsAppButton from "@/components/WhatsAppButton";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Script from "next/script";
import { Phone } from "lucide-react";

const bathroomTypes = [
  { title: "Main Bathroom", desc: "Full gut and rebuild, new layout if needed" },
  { title: "Ensuite", desc: "Compact, high-spec finishes in tight spaces" },
  { title: "Small Bathroom", desc: "Space-maximising layouts common in western Melbourne townhouses" },
  { title: "Laundry-Bathroom Combo", desc: "Practical dual-purpose renovations popular in Point Cook and Wyndham Vale estates" },
];

const processSteps = [
  { step: "01", title: "Free consultation", desc: "We visit your home, assess the space, discuss your brief" },
  { step: "02", title: "Design & quote", desc: "Fixed-price itemised quote, no hidden costs" },
  { step: "03", title: "Demolition", desc: "Full strip-out, check for water damage and structural issues" },
  { step: "04", title: "Waterproofing", desc: "AS/NZS 3740 certified waterproofing applied and inspected" },
  { step: "05", title: "Plumbing rough-in", desc: "AS/NZS 3500:2025 compliant, coordinated with licensed plumber" },
  { step: "06", title: "Tiling & fixtures", desc: "Your chosen tiles, tapware, vanity, and fittings installed" },
  { step: "07", title: "Fit-off & finishing", desc: "Final plumbing connections, mirrors, accessories, silicone" },
  { step: "08", title: "Handover + certificate", desc: "Waterproofing certificate issued, full clean, walkthrough" },
];

const complianceItems = [
  "AS/NZS 3740 waterproofing — certified and inspected",
  "AS/NZS 3500:2025 plumbing compliance",
  "BPC registered builder (Building and Plumbing Commission, est. July 2025)",
  "Waterproofing certificate issued on completion",
  "Full public liability insurance",
];

const pricingRows = [
  { scope: "Small bathroom / ensuite", range: "$10,000 – $20,000" },
  { scope: "Full bathroom renovation", range: "$20,000 – $35,000" },
  { scope: "Premium full remodel", range: "$35,000 – $45,000+" },
];

const testimonials = [
  { quote: "Konntey renovated our main bathroom in Werribee. Clean work, finished on time, and they handled everything including the waterproofing cert. Highly recommend.", author: "James T.", location: "Werribee" },
  { quote: "We had a small ensuite done in our Tarneit home. The team was respectful of our space and the finish was excellent. Fixed price as promised.", author: "Priya S.", location: "Tarneit" },
  { quote: "Finally found a builder who actually knows the Wyndham council requirements. No delays on permits, no surprises on cost.", author: "Michael R.", location: "Hoppers Crossing" },
];

const faqs = [
  { q: "Do I need a building permit for a bathroom renovation in Melbourne's west?", a: "Most cosmetic bathroom renovations — retiling, vanity replacement, fixture upgrades — don't require a building permit. However, if you're moving plumbing, changing the layout, or the works affect waterproofing membranes in a structural way, a permit may be required. Wyndham City, Maribyrnong, and Hobsons Bay councils each have slightly different requirements. We handle permit assessment as part of every quote." },
  { q: "How long does a bathroom renovation take?", a: "A standard bathroom renovation takes 2–3 weeks from demolition to handover. Ensuites can be completed in 10–14 days. Delays most commonly occur from special-order tiles or fixtures — we recommend confirming all selections before works begin." },
  { q: "What is the payment schedule?", a: "We use staged milestone payments: deposit on contract signing, progress payment after waterproofing inspection, and final payment on handover. No large upfront lump sums." },
  { q: "Can I use my bathroom during the renovation?", a: "No — the bathroom is fully out of service during works. If you only have one bathroom, we can discuss scheduling to minimise impact or prioritise a faster turnaround." },
  { q: "Do you renovate bathrooms in new estates like Tarneit and Point Cook?", a: "Yes. We regularly work in Wyndham Vale, Tarneit, Point Cook, and surrounding estates. These homes often have builder-grade bathrooms from the 2000s–2010s that are now due for a full upgrade. We understand the plumbing layouts, drainage systems, and Wyndham City Council requirements common in these estates." },
  { q: "Are you waterproofing certified?", a: "Yes. All our bathroom waterproofing is applied by a certified waterproofer to AS/NZS 3740 standard. You receive a waterproofing certificate on completion — a legal document you keep with your property records." },
  { q: "How do I get started?", a: "Request a free quote online or call us. We'll arrange a site visit, assess your bathroom, and provide a fixed-price itemised quote within 48 hours." },
];

export default function BathroomRenovationsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Bathroom Renovations Western Melbourne",
    provider: {
      "@type": "LocalBusiness",
      name: "Konntey Home & Renovations",
      url: "https://konnteyhomerenovations.com.au",
      telephone: "0493 191 798",
      areaServed: ["Tarneit", "Point Cook", "Werribee", "Footscray", "Hoppers Crossing", "Williamstown", "Wyndham Vale"],
    },
    serviceType: "Bathroom Renovation",
    areaServed: { "@type": "City", name: "Melbourne" },
    description: "Bathroom renovations across Melbourne's western suburbs. BPC registered, AS/NZS 3740 certified waterproofing, fixed-price quotes.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="bg-white text-navy font-body hide-scrollbar min-h-screen flex flex-col">
      <Script id="service-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <NavBar theme="dark" />
      <WhatsAppButton />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative pt-[150px] pb-20 bg-navy text-white overflow-hidden">
          <div className="grain-overlay" />
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 relative z-10">
            <m.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">BATHROOM RENOVATIONS</div>
              <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-tightest leading-[0.9] max-w-5xl">
                Bathroom Renovations in Western Melbourne — <span className="text-gold-bright">From Ensuite to Full Remodel</span>
              </h1>
              <p className="mt-8 font-body text-[17px] leading-[1.8] text-white/80 max-w-3xl">
                Konntey Home &amp; Renovations delivers complete bathroom renovations across Melbourne&apos;s western suburbs — from small ensuite refreshes to full bathroom rebuilds. We&apos;re BPC registered, waterproofing certified, and serve homeowners across Tarneit, Point Cook, Werribee, Footscray, Hoppers Crossing, and Williamstown.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link prefetch={true} href="/quote" className="inline-flex bg-gold-bright px-8 py-4 font-display text-[14px] font-black uppercase tracking-button text-navy hover:-translate-y-0.5 transition-transform">
                  Get a Free Quote
                </Link>
                <a href="tel:0493191798" className="inline-flex items-center gap-2 border border-white/20 px-8 py-4 font-display text-[14px] font-black uppercase tracking-button text-white hover:border-gold-bright hover:text-gold-bright transition-colors">
                  <Phone size={15} strokeWidth={2.25} />
                  <span>Call Us</span>
                </a>
              </div>
            </m.div>
          </div>
        </section>

        {/* Cost Section */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">PRICING</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9] max-w-4xl">
                How much does a bathroom renovation cost in Melbourne&apos;s west?
              </h2>
              <p className="mt-8 font-body text-[17px] leading-[1.8] text-navy/70 max-w-3xl">
                Most western Melbourne bathroom renovations cost between $10,000 and $40,000 depending on size, fixtures, and scope. A small ensuite starts from $10,000–$15,000, a standard bathroom runs $15,000–$30,000, and a full premium remodel with freestanding bath and floor-to-ceiling tiling typically sits between $30,000–$45,000. Fixed-price quotes available — no surprises.
              </p>
            </m.div>
          </div>
        </section>

        {/* Bathroom Types */}
        <section className="py-20 sm:py-28 bg-off-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">WHAT WE DO</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9]">Bathroom Types We Renovate</h2>
            </m.div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {bathroomTypes.map((bt, i) => (
                <m.div key={bt.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} className="border border-navy/8 bg-white p-8">
                  <h3 className="font-display text-[22px] font-black uppercase tracking-tighter text-navy">{bt.title}</h3>
                  <p className="mt-3 font-body text-[15px] leading-[1.8] text-navy/70">{bt.desc}</p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 sm:py-28 bg-navy text-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">HOW IT WORKS</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9]">Our Renovation Process</h2>
            </m.div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((ps, i) => (
                <m.div key={ps.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }} className="border border-white/10 p-6">
                  <div className="font-display text-[36px] font-black text-gold-bright leading-none">{ps.step}</div>
                  <h3 className="mt-3 font-display text-[16px] font-black uppercase tracking-button text-white">{ps.title}</h3>
                  <p className="mt-2 font-body text-[14px] leading-[1.7] text-white/60">{ps.desc}</p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* BeforeAfterSlider */}
        <BeforeAfterSlider />

        {/* Compliance */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">COMPLIANCE</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9] max-w-4xl">Compliance &amp; Waterproofing Certification</h2>
              <p className="mt-8 font-body text-[17px] leading-[1.8] text-navy/70 max-w-3xl">
                Waterproofing is a legal requirement under Victorian building regulations. Every Konntey bathroom renovation includes:
              </p>
              <ul className="mt-8 space-y-4">
                {complianceItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-[16px] text-navy/80">
                    <span className="text-gold-bright font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-body text-[15px] leading-[1.8] text-navy/60 italic">
                Most homeowners don&apos;t know to ask for a waterproofing certificate — we provide it without being asked.
              </p>
            </m.div>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="py-20 sm:py-28 bg-off-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">INVESTMENT</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9]">Pricing Guide</h2>
            </m.div>
            <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="mt-12 max-w-2xl">
              <div className="border border-navy/10 bg-white overflow-hidden">
                <div className="grid grid-cols-2 bg-navy text-white font-display text-[13px] font-black uppercase tracking-button">
                  <div className="p-4 border-r border-white/10">Scope</div>
                  <div className="p-4">Price Range</div>
                </div>
                {pricingRows.map((row) => (
                  <div key={row.scope} className="grid grid-cols-2 border-b border-navy/8 last:border-b-0">
                    <div className="p-4 font-body text-[15px] text-navy/80 border-r border-navy/8">{row.scope}</div>
                    <div className="p-4 font-display text-[15px] font-bold text-gold-bright">{row.range}</div>
                  </div>
                ))}
              </div>
              <p className="mt-6 font-body text-[14px] leading-[1.7] text-navy/60">
                Prices vary based on tile format, fixture selection, layout changes, and whether plumbing relocation is required. All quotes are fixed-price — what we quote is what you pay.
              </p>
            </m.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 sm:py-28 bg-navy text-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">TESTIMONIALS</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9]">What Our Western Melbourne Clients Say</h2>
            </m.div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <m.div key={t.author} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} className="border border-white/10 p-8">
                  <p className="font-body text-[15px] leading-[1.8] text-white/80 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 font-display text-[14px] font-black uppercase tracking-button text-gold-bright">— {t.author}, {t.location}</div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">FAQ</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9]">Frequently Asked Questions</h2>
            </m.div>
            <div className="mt-12 max-w-3xl space-y-4">
              {faqs.map((faq, i) => (
                <m.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.5, delay: i * 0.05 }} className="border border-navy/10">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between p-6 text-left">
                    <span className="font-display text-[16px] font-black uppercase tracking-tight text-navy pr-4">{faq.q}</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 transition-transform duration-300 text-gold-bright ${openFaq === i ? "rotate-180" : ""}`}>
                      <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <m.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                        <div className="px-6 pb-6 font-body text-[15px] leading-[1.8] text-navy/70">{faq.a}</div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 sm:py-28 bg-gold-bright text-navy text-center">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9] max-w-3xl mx-auto">
                Ready to transform your bathroom?
              </h2>
              <p className="mt-6 font-body text-[17px] leading-[1.8] text-navy/80 max-w-2xl mx-auto">
                Get a free, fixed-price quote from western Melbourne&apos;s BPC registered renovation team.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link prefetch={true} href="/quote" className="inline-flex bg-navy px-8 py-4 font-display text-[14px] font-black uppercase tracking-button text-gold-bright hover:-translate-y-0.5 transition-transform">
                  Get a Free Quote →
                </Link>
                <a href="tel:0493191798" className="inline-flex items-center gap-2 border-2 border-navy px-8 py-4 font-display text-[14px] font-black uppercase tracking-button text-navy hover:bg-navy hover:text-gold-bright transition-colors">
                  <Phone size={15} strokeWidth={2.25} />
                  <span>Call us directly</span>
                </a>
              </div>
            </m.div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-12 bg-off-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4 font-body text-[13px] uppercase tracking-kicker text-navy/50">
            <span>Related services:</span>
            <Link prefetch={true} href="/kitchen-renovations-melbourne" className="text-gold-bright hover:underline">Kitchen Renovations →</Link>
            <Link prefetch={true} href="/interior-painting-melbourne" className="text-gold-bright hover:underline">Interior Painting →</Link>
            <Link prefetch={true} href="/quote" className="text-gold-bright hover:underline">Get a Quote →</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
