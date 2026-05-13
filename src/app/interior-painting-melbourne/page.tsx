"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Script from "next/script";
import { Phone } from "lucide-react";
import Image from "next/image";

const serviceTypes = [
  { title: "Full Interior Painting", desc: "Walls, ceilings, trims, doors — complete interior refresh for homes and renovations" },
  { title: "Exterior Painting", desc: "Weatherboard, render, brick — prep, prime, and two-coat finish built to last" },
  { title: "Feature Walls & Accents", desc: "Statement walls, two-tone designs, dark moody colours done right" },
  { title: "Renovation Painting", desc: "End-to-end painting as part of a kitchen, bathroom, or full home renovation" },
  { title: "Ceiling & Cornice", desc: "Flat white ceilings, cornice painting, and plaster repair before painting" },
  { title: "Cabinet & Joinery Painting", desc: "Spray-finished kitchen cabinets, built-in wardrobes, and timber joinery" },
];

const processSteps = [
  { step: "01", title: "Free quote", desc: "On-site inspection, measure up, discuss colours and finishes" },
  { step: "02", title: "Colour consultation", desc: "Help selecting the right colours for your space and lighting" },
  { step: "03", title: "Surface preparation", desc: "Fill holes, sand, caulk gaps, mask edges — prep is everything" },
  { step: "04", title: "Prime", desc: "Primer coat on all new surfaces, stain-block where needed" },
  { step: "05", title: "First coat", desc: "Even application with premium paints (Dulux, Taubmans)" },
  { step: "06", title: "Second coat", desc: "Full coverage second coat for a flawless, durable finish" },
  { step: "07", title: "Detail work", desc: "Cut-in edges, trim, doors, and touch-ups" },
  { step: "08", title: "Handover", desc: "Final inspection, clean up, and leftover paint for touch-ups" },
];

const pricingRows = [
  { scope: "Single room (walls + ceiling)", range: "$400 – $800" },
  { scope: "Full house interior (3-bed)", range: "$4,000 – $8,000" },
  { scope: "Full house interior (4-bed)", range: "$6,000 – $12,000" },
  { scope: "Exterior (single storey)", range: "$4,000 – $10,000" },
  { scope: "Exterior (double storey)", range: "$8,000 – $18,000" },
];

const testimonials = [
  { quote: "Konntey painted our entire 4-bedroom home in Tarneit. Sharp lines, no mess, and they even helped us pick the perfect grey for the living room. Couldn't be happier.", author: "Neha R.", location: "Tarneit" },
  { quote: "Had the exterior of our weatherboard house repainted in Werribee. The prep work was meticulous — filled every crack and gap. Looks brand new.", author: "John B.", location: "Werribee" },
  { quote: "We used Konntey for all the painting on our kitchen renovation. Spray-finished the cabinets and they look like a factory finish. Very professional.", author: "Karen T.", location: "Point Cook" },
];

const faqs = [
  { q: "How much does it cost to paint a house interior in Melbourne?", a: "A full interior repaint for a standard 3-bedroom home in Melbourne typically costs $4,000–$8,000 depending on ceiling height, number of rooms, surface condition, and paint quality. Larger 4–5 bedroom homes with high ceilings and feature walls range from $8,000–$15,000. We provide fixed-price quotes after an on-site inspection." },
  { q: "How long does interior painting take?", a: "A standard 3-bedroom house takes 3–5 days for a full interior repaint including prep. Larger homes or those requiring extensive plaster repair may take 5–8 days. We work room by room so you can still live in the house during painting." },
  { q: "Do you supply the paint?", a: "Yes — we supply premium paint (Dulux or Taubmans) as part of our fixed-price quote. We use Wash & Wear for walls, ceiling flat for ceilings, and semi-gloss for trims. If you have a specific brand or colour preference, just let us know." },
  { q: "Do you do colour consultation?", a: "Yes — free colour advice is included with every painting quote. We can help you choose colours that work with your lighting, flooring, and furniture. For more complex colour schemes, we can arrange a Dulux colour consultant visit." },
  { q: "What preparation do you do before painting?", a: "Proper prep is 80% of a good paint job. We fill nail holes, sand surfaces, caulk gaps between trims and walls, remove flaking paint, spot-prime stains, and mask all edges. We never paint over poor surfaces." },
  { q: "Do you paint exteriors too?", a: "Yes. We paint all exterior surfaces including weatherboard, render, brick, fascia, gutters, and window frames. We use exterior-grade paints rated for Melbourne's UV and weather conditions." },
];

export default function PaintingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Interior & Exterior Painting Melbourne",
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://www.konnteyhomerenovations.com.au/#organization",
      name: "Konntey Home & Renovations",
      url: "https://www.konnteyhomerenovations.com.au",
      telephone: "+61493191798",
    },
    serviceType: "House Painting",
    areaServed: { "@type": "City", name: "Melbourne" },
    description: "Professional interior and exterior painting across Melbourne. Sharp lines, clean finishes. Fixed-price quotes with colour consultation included.",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "400",
      highPrice: "18000",
      priceCurrency: "AUD",
    },
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
          <Image src="/images/interior.webp" alt="Professional interior painting Melbourne" fill priority sizes="100vw" className="object-cover object-center opacity-40 mix-blend-overlay" />
          <div className="grain-overlay" />
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 relative z-10">
            <m.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">PAINTING SERVICES</div>
              <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-tightest leading-[0.9] max-w-5xl">
                Interior & Exterior Painting in Melbourne — <span className="text-gold-bright">Sharp Lines, Clean Finishes</span>
              </h1>
              <p className="mt-8 font-body text-[17px] leading-[1.8] text-white/80 max-w-3xl">
                Konntey Home &amp; Renovations delivers professional painting services across Melbourne — from single feature walls to full interior and exterior repaints. Premium paints, meticulous preparation, and colour consultation included. Serving Tarneit, Point Cook, Werribee, Hoppers Crossing &amp; all suburbs.
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
                How much does house painting cost in Melbourne?
              </h2>
              <p className="mt-8 font-body text-[17px] leading-[1.8] text-navy/70 max-w-3xl">
                Interior painting in Melbourne costs $15–$35 per square metre depending on surface condition and paint quality. A full 3-bedroom home interior runs $4,000–$8,000 including ceilings, walls, and trims. Exterior repaints start from $4,000 for a single storey. All our quotes are fixed-price — no hourly rates, no surprises.
              </p>
            </m.div>
          </div>
        </section>

        {/* Service Types */}
        <section className="py-20 sm:py-28 bg-off-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">WHAT WE DO</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9]">Our Painting Services</h2>
            </m.div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {serviceTypes.map((st, i) => (
                <m.div key={st.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} className="border border-navy/8 bg-white p-8">
                  <h3 className="font-display text-[22px] font-black uppercase tracking-tighter text-navy">{st.title}</h3>
                  <p className="mt-3 font-body text-[15px] leading-[1.8] text-navy/70">{st.desc}</p>
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
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9]">Our Painting Process</h2>
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
                Prices depend on ceiling height, surface condition, number of colours, and access difficulty. All quotes include premium paint, all prep work, and cleanup.
              </p>
            </m.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 sm:py-28 bg-navy text-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">TESTIMONIALS</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9]">What Our Clients Say</h2>
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
                Ready for a fresh finish?
              </h2>
              <p className="mt-6 font-body text-[17px] leading-[1.8] text-navy/80 max-w-2xl mx-auto">
                Get a free, fixed-price painting quote from Melbourne&apos;s professional renovation painters.
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
            <Link prefetch={false} href="/kitchen-renovations-melbourne" className="text-gold-bright hover:underline">Kitchen Renovations →</Link>
            <Link prefetch={false} href="/bathroom-renovations-melbourne" className="text-gold-bright hover:underline">Bathroom Renovations →</Link>
            <Link prefetch={false} href="/home-extensions-melbourne" className="text-gold-bright hover:underline">Home Extensions →</Link>
            <Link prefetch={false} href="/quote" className="text-gold-bright hover:underline">Get a Quote →</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
