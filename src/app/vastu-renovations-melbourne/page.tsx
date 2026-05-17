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

const vastuPrinciples = [
  { title: "Kitchen Placement", desc: "Southeast (Agni) corner placement for cooking areas — fire element aligned with directional energy for health and prosperity" },
  { title: "Bathroom & Toilet Direction", desc: "Northwest or west placement to channel water element away from wealth and health zones" },
  { title: "Main Entrance", desc: "North or east-facing entrances to welcome positive energy — we design extensions and porticos to optimise this" },
  { title: "Master Bedroom", desc: "Southwest corner for stability and grounding — head direction south or west while sleeping" },
  { title: "Pooja Room", desc: "Northeast (Ishanya) corner — the most sacred direction. We design dedicated spaces with proper ventilation and lighting" },
  { title: "Living & Open Plan", desc: "North or east orientation for living areas to maximise natural light and positive energy flow" },
];

const serviceTypes = [
  { title: "Vastu Kitchen Renovation", desc: "Relocate or redesign your kitchen to align with the southeast fire element. Stove placement, sink direction, and storage optimised." },
  { title: "Vastu Bathroom Renovation", desc: "Correct bathroom placement and drainage direction according to Vastu principles. Toilet, shower, and vanity positioning considered." },
  { title: "Full Home Vastu Renovation", desc: "Complete home realignment — room swaps, entrance modifications, and layout changes to bring your home into Vastu compliance." },
  { title: "Vastu Extension Design", desc: "New extensions designed from scratch with Vastu principles built in — no compromise between modern living and traditional wisdom." },
  { title: "Pooja Room Construction", desc: "Purpose-built prayer rooms in the correct directional zone with appropriate materials, lighting, and ventilation." },
  { title: "Vastu Consultation Only", desc: "Not ready to renovate yet? We offer standalone Vastu assessments of your current home with recommendations for improvement." },
];

const processSteps = [
  { step: "01", title: "Vastu assessment", desc: "On-site compass reading, floor plan analysis, identify deficiencies" },
  { step: "02", title: "Consultation", desc: "Discuss priorities — which Vastu corrections matter most to you" },
  { step: "03", title: "Design proposal", desc: "Architectural plans that honour Vastu while meeting modern building codes" },
  { step: "04", title: "Fixed-price quote", desc: "Transparent, itemised pricing — no hidden costs" },
  { step: "05", title: "Council & permits", desc: "We handle all approvals if structural changes are required" },
  { step: "06", title: "Construction", desc: "Respectful, clean execution — we understand the cultural significance" },
  { step: "07", title: "Vastu verification", desc: "Post-construction check to confirm all alignments are correct" },
  { step: "08", title: "Handover & Griha Pravesh", desc: "Timed handover if you prefer to align with auspicious dates" },
];

const testimonials = [
  { quote: "We wanted our kitchen moved to the southeast corner. Konntey understood exactly why and made it happen without us having to explain Vastu basics. So refreshing.", author: "Priya & Ankit M.", location: "Tarneit" },
  { quote: "Built a proper pooja room in the northeast corner of our home. The team was respectful, kept shoes off inside, and delivered exactly what we envisioned.", author: "Sunita P.", location: "Truganina" },
  { quote: "Our main entrance was facing south. Konntey designed a new portico and entry that redirects energy through an east-facing approach. The difference is noticeable.", author: "Devang S.", location: "Point Cook" },
];

const faqs = [
  { q: "Do you understand Vastu Shastra or just follow instructions?", a: "Our founder is Indian-Australian and grew up with Vastu principles. We understand the cultural and spiritual significance — not just the technical directions. We can discuss doshas, remedies, and priorities in Hindi or Gujarati if preferred." },
  { q: "Can Vastu corrections be done without major renovation?", a: "Sometimes yes — simple changes like relocating a stove, changing door swing direction, or adding a water feature can address minor Vastu deficiencies. For major corrections (kitchen relocation, entrance changes), renovation is typically required. We'll advise honestly on what's achievable." },
  { q: "How much does a Vastu renovation cost?", a: "It depends entirely on the scope. A kitchen relocation to the correct zone typically costs $25,000–$50,000. A full home Vastu realignment can range from $50,000–$150,000+. We provide detailed fixed-price quotes after the initial assessment." },
  { q: "Do you work with a Vastu consultant?", a: "We can work with your preferred Vastu consultant, or provide our own assessment based on traditional Vastu Shastra principles. If you have a pandit or consultant you trust, we're happy to collaborate with them on the design." },
  { q: "Can you time the handover for an auspicious date?", a: "Absolutely. Many of our Indian clients prefer Griha Pravesh or project completion aligned with muhurat timing. We'll plan the construction schedule to accommodate your preferred handover date." },
  { q: "Do modern Australian building codes conflict with Vastu?", a: "Rarely. Most Vastu principles relate to room placement, orientation, and element positioning — none of which conflict with the Building Code of Australia. The main challenge is working within existing house footprints, which is where creative design comes in." },
];

export default function VastuPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Vastu Compliant Home Renovations Melbourne",
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://www.konnteyhomerenovations.com.au/#organization",
      name: "Konntey Home & Renovations",
      url: "https://www.konnteyhomerenovations.com.au",
      telephone: "+61493191798",
    },
    serviceType: "Vastu Renovation",
    areaServed: { "@type": "City", name: "Melbourne" },
    description: "Vastu Shastra compliant home renovations in Melbourne. Kitchen, bathroom & full home renovations aligned with Vastu principles. Indian-owned, culturally respectful.",
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
      <Script id="vastu-service-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="vastu-faq-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <NavBar theme="dark" />
      <WhatsAppButton />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative pt-[150px] pb-20 bg-navy text-white overflow-hidden">
          <Image src="/images/hero_main.webp" alt="Vastu compliant home renovation Melbourne" fill priority sizes="100vw" className="object-cover object-center opacity-30 mix-blend-overlay" />
          <div className="grain-overlay" />
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 relative z-10">
            <m.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">VASTU RENOVATIONS</div>
              <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-tightest leading-[0.9] max-w-5xl">
                Vastu Compliant Renovations in Melbourne — <span className="text-gold-bright">Tradition Meets Modern Living</span>
              </h1>
              <p className="mt-8 font-body text-[17px] leading-[1.8] text-white/80 max-w-3xl">
                Konntey Home &amp; Renovations is Melbourne&apos;s Indian-owned renovation company specialising in Vastu Shastra aligned home design. We understand the principles, respect the tradition, and deliver renovations that honour both your cultural values and modern Australian building standards.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link prefetch={true} href="/quote" className="inline-flex bg-gold-bright px-8 py-4 font-display text-[14px] font-black uppercase tracking-button text-navy hover:-translate-y-0.5 transition-transform">
                  Get a Free Vastu Assessment
                </Link>
                <a href="tel:0493191798" className="inline-flex items-center gap-2 border border-white/20 px-8 py-4 font-display text-[14px] font-black uppercase tracking-button text-white hover:border-gold-bright hover:text-gold-bright transition-colors">
                  <Phone size={15} strokeWidth={2.25} />
                  <span>Call Us</span>
                </a>
              </div>
            </m.div>
          </div>
        </section>

        {/* Vastu Principles */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">VASTU PRINCIPLES</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9] max-w-4xl">
                Key Vastu Directions We Work With
              </h2>
              <p className="mt-8 font-body text-[17px] leading-[1.8] text-navy/70 max-w-3xl">
                Every room in your home has an ideal directional placement according to Vastu Shastra. We design renovations that align your living spaces with these principles — bringing balance, health, and prosperity to your home.
              </p>
            </m.div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {vastuPrinciples.map((vp, i) => (
                <m.div key={vp.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} className="border border-navy/8 bg-off-white p-8">
                  <h3 className="font-display text-[20px] font-black uppercase tracking-tighter text-navy">{vp.title}</h3>
                  <p className="mt-3 font-body text-[15px] leading-[1.8] text-navy/70">{vp.desc}</p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Types */}
        <section className="py-20 sm:py-28 bg-off-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">OUR SERVICES</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9]">Vastu Renovation Services</h2>
            </m.div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {serviceTypes.map((st, i) => (
                <m.div key={st.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} className="border border-navy/8 bg-white p-8">
                  <h3 className="font-display text-[20px] font-black uppercase tracking-tighter text-navy">{st.title}</h3>
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
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9]">Our Vastu Process</h2>
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

        {/* Testimonials */}
        <section className="py-20 sm:py-28 bg-off-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">TESTIMONIALS</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9]">What Our Clients Say</h2>
            </m.div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <m.div key={t.author} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} className="border border-navy/8 bg-white p-8">
                  <p className="font-body text-[15px] leading-[1.8] text-navy/70 italic">&ldquo;{t.quote}&rdquo;</p>
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
                Ready to align your home with Vastu?
              </h2>
              <p className="mt-6 font-body text-[17px] leading-[1.8] text-navy/80 max-w-2xl mx-auto">
                Get a free Vastu assessment and fixed-price renovation quote from Melbourne&apos;s Indian-owned renovation team.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link prefetch={true} href="/quote" className="inline-flex bg-navy px-8 py-4 font-display text-[14px] font-black uppercase tracking-button text-gold-bright hover:-translate-y-0.5 transition-transform">
                  Get a Free Assessment →
                </Link>
                <a href="tel:0493191798" className="inline-flex items-center gap-2 border-2 border-navy px-8 py-4 font-display text-[14px] font-black uppercase tracking-button text-navy hover:bg-navy hover:text-gold-bright transition-colors">
                  <Phone size={15} strokeWidth={2.25} />
                  <span>Call us — we speak Hindi &amp; Gujarati</span>
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
