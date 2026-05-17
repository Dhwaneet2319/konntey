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
import Image from "next/image";

const kitchenTypes = [
  { title: "Full kitchen renovation", desc: "Complete gut and rebuild, new layout, all new fixtures" },
  { title: "Cabinet & benchtop refresh", desc: "New doors, benchtop, and splashback over existing structure" },
  { title: "Open-plan conversion", desc: "Remove walls, extend into living/dining, island bench addition" },
  { title: "Butler's pantry addition", desc: "Secondary prep space, custom cabinetry, additional sink" },
  { title: "Small kitchen renovation", desc: "Space-maximising layouts for townhouses and units common in Point Cook and Wyndham Vale estates" },
];

const processSteps = [
  { step: "01", title: "Free consultation", desc: "Site visit, measure up, discuss layout and brief" },
  { step: "02", title: "Design & quote", desc: "Itemised fixed-price quote with no hidden costs" },
  { step: "03", title: "Demolition", desc: "Full strip-out of existing cabinetry, benchtops, and appliances" },
  { step: "04", title: "Structural work", desc: "Wall removal, electrical and plumbing rough-in if required" },
  { step: "05", title: "Cabinet installation", desc: "Carcasses, doors, drawers, and hardware fitted" },
  { step: "06", title: "Benchtop & splashback", desc: "Stone, laminate, or tile to your selection" },
  { step: "07", title: "Appliance fit-off", desc: "Oven, cooktop, rangehood, dishwasher connected" },
  { step: "08", title: "Finishing & handover", desc: "Full clean, walkthrough, and handover" },
];

const pricingRows = [
  { scope: "Cabinet & benchtop refresh", range: "$15,000 – $25,000" },
  { scope: "Full kitchen renovation", range: "$25,000 – $45,000" },
  { scope: "Premium open-plan redesign", range: "$45,000 – $80,000+" },
];

const testimonials = [
  { quote: "Konntey did our kitchen in Hoppers Crossing. New cabinets, stone benchtop, the lot. Finished on time and exactly on budget. Really happy with the result.", author: "David K.", location: "Hoppers Crossing" },
  { quote: "We had our Tarneit kitchen opened up into the dining room. The team handled the wall removal, new island bench, everything. Smooth process start to finish.", author: "Anika P.", location: "Tarneit" },
  { quote: "Finally got the kitchen we wanted after years of putting it off. Fixed price meant no stress about blowouts. Would use Konntey again for the bathroom next.", author: "Steve M.", location: "Werribee" },
];

const faqs = [
  { q: "Do I need a building permit for a kitchen renovation?", a: "Most kitchen renovations — new cabinets, benchtops, splashbacks, and appliance replacements — don't require a building permit. However if you're removing walls, relocating plumbing, or doing electrical work beyond standard connections, a permit may be required. Wyndham City, Maribyrnong, and Brimbank councils each have slightly different thresholds. We assess permit requirements as part of every quote at no extra cost." },
  { q: "How long does a kitchen renovation take?", a: "A standard kitchen renovation takes 2–3 weeks from demolition to handover. Open-plan conversions involving structural work can take 3–5 weeks. The biggest cause of delays is late fixture or appliance delivery — we recommend locking in all selections before works begin." },
  { q: "Can I live at home during the renovation?", a: "Yes, most clients stay home during a kitchen renovation. You'll be without a functioning kitchen for 2–3 weeks so we recommend setting up a temporary meal prep area. We keep the site clean and contained daily." },
  { q: "What's included in your fixed-price quote?", a: "Labour, project management, cabinet supply and installation, benchtop fabrication and installation, splashback tiling, appliance connection, and rubbish removal. Appliances themselves can be supplied by us or by you — we'll confirm at quote stage." },
  { q: "Do you renovate kitchens in new estates like Tarneit and Point Cook?", a: "Yes. We regularly work in Wyndham Vale, Tarneit, Point Cook, and surrounding Wyndham estates. Builder-grade kitchens from the early 2000s in these areas are now prime for a full upgrade. We understand the standard layouts, plumbing configurations, and Wyndham City Council requirements common in these estates." },
  { q: "What's the payment schedule?", a: "Staged milestone payments: deposit on contract signing, progress payment after cabinet installation, and final payment on handover. No large upfront lump sums." },
  { q: "How do I get started?", a: "Request a free quote online or call us. We'll arrange a site visit, take measurements, and provide a fixed-price itemised quote within 48 hours." },
];

export default function KitchenRenovationsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Kitchen Renovations Western Melbourne",
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://www.konnteyhomerenovations.com.au/#organization",
      name: "Konntey Home & Renovations",
      url: "https://www.konnteyhomerenovations.com.au",
      telephone: "+61493191798",
      priceRange: "$$",
      areaServed: [
        { "@type": "City", name: "Tarneit" },
        { "@type": "City", name: "Point Cook" },
        { "@type": "City", name: "Werribee" },
        { "@type": "City", name: "Footscray" },
        { "@type": "City", name: "Hoppers Crossing" },
        { "@type": "City", name: "Sunshine" },
        { "@type": "City", name: "Wyndham Vale" },
      ],
    },
    serviceType: "Kitchen Renovation",
    areaServed: { "@type": "City", name: "Melbourne" },
    description: "Kitchen renovations across Melbourne's western suburbs. BPC registered, fixed-price quotes, full project management. From cabinet refreshes to full open-plan redesigns.",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "15000",
      highPrice: "80000",
      priceCurrency: "AUD",
      offerCount: "3",
    },
    image: "https://www.konnteyhomerenovations.com.au/images/kitchen/hero.webp",
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
      <Script id="kitchen-service-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="kitchen-faq-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <NavBar theme="dark" />
      <WhatsAppButton />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative pt-[150px] pb-20 bg-navy text-white overflow-hidden">
          <Image src="/images/kitchen/hero.webp" alt="Western Melbourne Kitchen Renovation" fill priority sizes="100vw" className="object-cover object-center opacity-40 mix-blend-overlay" />
          <div className="grain-overlay" />
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 relative z-10">
            <m.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">KITCHEN RENOVATIONS</div>
              <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-tightest leading-[0.9] max-w-5xl">
                Kitchen Renovations for Western Melbourne Homes
              </h1>
              <p className="mt-8 font-body text-[17px] leading-[1.8] text-white/80 max-w-3xl">
                Konntey Home &amp; Renovations delivers complete kitchen renovations across Melbourne&apos;s western suburbs — from cabinet replacements to full open-plan rebuilds. BPC registered, fixed-price quotes, and no subcontractors. We serve homeowners across Tarneit, Werribee, Point Cook, Footscray, Hoppers Crossing, and Sunshine.
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
                How much does a kitchen renovation cost in Melbourne&apos;s west?
              </h2>
              <p className="mt-8 font-body text-[17px] leading-[1.8] text-navy/70 max-w-3xl">
                Most western Melbourne kitchen renovations cost between $15,000 and $50,000 depending on size, layout changes, and fixture selections. A basic cabinet and benchtop refresh starts from $15,000–$25,000. A mid-range full renovation runs $25,000–$45,000. A premium open-plan redesign with island bench and butler&apos;s pantry typically sits between $45,000–$80,000+. All quotes are fixed-price — no variations, no surprises.
              </p>
            </m.div>
          </div>
        </section>

        {/* Kitchen Types */}
        <section className="py-20 sm:py-28 bg-off-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">WHAT WE DO</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9]">Kitchen Types We Renovate</h2>
            </m.div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {kitchenTypes.map((kt, i) => (
                <m.div key={kt.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} className="border border-navy/8 bg-white p-8">
                  <h3 className="font-display text-[22px] font-black uppercase tracking-tighter text-navy">{kt.title}</h3>
                  <p className="mt-3 font-body text-[15px] leading-[1.8] text-navy/70">{kt.desc}</p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Gallery */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">OUR WORK</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9]">Project Gallery</h2>
            </m.div>
            <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { src: "/images/kitchen/cabinets.webp", alt: "Custom kitchen cabinets" },
                { src: "/images/kitchen/benchtop.webp", alt: "Stone benchtop installation" },
                { src: "/images/kitchen/open-plan.webp", alt: "Open-plan kitchen conversion" },
                { src: "/images/kitchen/splashback.webp", alt: "Kitchen splashback tiling" }
              ].map((img, i) => (
                <m.div key={img.src} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} className="relative aspect-square overflow-hidden bg-navy/5">
                  <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 hover:scale-105" sizes="(max-width: 1024px) 50vw, 25vw" />
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
            <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start">
              <div className="grid gap-6 sm:grid-cols-2">
                {processSteps.map((ps, i) => (
                  <m.div key={ps.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }} className="border border-white/10 p-6">
                    <div className="font-display text-[36px] font-black text-gold-bright leading-none">{ps.step}</div>
                    <h3 className="mt-3 font-display text-[16px] font-black uppercase tracking-button text-white">{ps.title}</h3>
                    <p className="mt-2 font-body text-[14px] leading-[1.7] text-white/60">{ps.desc}</p>
                  </m.div>
                ))}
              </div>
              <m.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="relative h-[400px] lg:h-full min-h-[400px] w-full overflow-hidden border border-white/10">
                <Image src="/images/kitchen/tiler-working.webp" alt="Tiler working on kitchen renovation" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" />
              </m.div>
            </div>
          </div>
        </section>

        {/* BeforeAfterSlider */}
        <BeforeAfterSlider 
          beforeSrc="/images/kitchen/before.webp"
          afterSrc="/images/kitchen/after.webp"
          title="Real Transformation"
          subtitle="See the difference a professional western Melbourne renovation makes. Drag the slider to compare the outdated original with the premium Konntey finish."
        />

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
                Prices vary based on cabinet material, benchtop selection, appliance grade, and whether structural or plumbing work is required. Fixed-price contract on every job.
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
                Ready for a new kitchen?
              </h2>
              <p className="mt-6 font-body text-[17px] leading-[1.8] text-navy/80 max-w-2xl mx-auto">
                Get a free fixed-price quote from western Melbourne&apos;s BPC registered renovation team.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link prefetch={true} href="/quote" className="inline-flex bg-navy px-8 py-4 font-display text-[14px] font-black uppercase tracking-button text-gold-bright hover:-translate-y-0.5 transition-transform">
                  Get a Free Quote →
                </Link>
                <a href="tel:0493191798" className="inline-flex items-center gap-2 border-2 border-navy px-8 py-4 font-display text-[14px] font-black uppercase tracking-button text-navy hover:bg-navy hover:text-gold-bright transition-colors">
                  <Phone size={15} strokeWidth={2.25} />
                  <span>Call us for a same-day response.</span>
                </a>
              </div>
            </m.div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-12 bg-off-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4 font-body text-[13px] uppercase tracking-kicker text-navy/50">
            <span>Related services:</span>
            <Link prefetch={false} href="/bathroom-renovations-melbourne" className="text-gold-bright hover:underline">Bathroom Renovations →</Link>
            <Link prefetch={false} href="/home-extensions-melbourne" className="text-gold-bright hover:underline">Home Extensions →</Link>
            <Link prefetch={false} href="/decks-pergolas-melbourne" className="text-gold-bright hover:underline">Decks & Pergolas →</Link>
            <Link prefetch={false} href="/quote" className="text-gold-bright hover:underline">Get a Quote →</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
