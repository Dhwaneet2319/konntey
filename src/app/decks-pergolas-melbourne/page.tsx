import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/chat/FloatingActions";
import Reveal from "@/components/Reveal";
import ServiceFaq from "@/components/ServiceFaq";
import ServiceAreasStrip from "@/components/ServiceAreasStrip";
import Link from "next/link";
import { Phone } from "lucide-react";
import Image from "next/image";

const serviceTypes = [
  { title: "Timber Decking", desc: "Merbau, spotted gum, blackbutt — premium hardwood decks built to last 25+ years in Australian conditions" },
  { title: "Composite Decking", desc: "Low-maintenance composite boards — no oiling, no splinters, 25-year warranty options" },
  { title: "Pergolas & Shade Structures", desc: "Timber or steel pergolas with optional louvres, shade sails, or polycarbonate roofing" },
  { title: "Carports", desc: "Freestanding or attached carports — steel or timber construction, council-approved designs" },
  { title: "Alfresco & Outdoor Rooms", desc: "Full outdoor living areas with integrated lighting, ceiling fans, and weatherproof finishes" },
  { title: "Deck Restoration", desc: "Sand, repair, and re-oil existing decks — bring old timber back to life without a full rebuild" },
];

const processSteps = [
  { step: "01", title: "Free consultation", desc: "Site visit, measure up, discuss timber options and design" },
  { step: "02", title: "Design & quote", desc: "3D render if needed, fixed-price itemised quote" },
  { step: "03", title: "Council permits", desc: "If required — we handle submissions for raised decks and pergolas" },
  { step: "04", title: "Site preparation", desc: "Ground levelling, stump or pier installation" },
  { step: "05", title: "Frame & bearers", desc: "Structural frame built to Australian standards" },
  { step: "06", title: "Decking & finishing", desc: "Boards laid, sanded, oiled or sealed" },
  { step: "07", title: "Pergola & extras", desc: "Pergola erected, balustrading, steps, lighting fitted" },
  { step: "08", title: "Handover", desc: "Final clean, maintenance guide provided, walkthrough" },
];

const pricingRows = [
  { scope: "Timber deck (Merbau)", range: "$320 – $550/sqm" },
  { scope: "Timber deck (Spotted Gum)", range: "$400 – $650/sqm" },
  { scope: "Composite deck", range: "$350 – $600/sqm" },
  { scope: "Pergola (timber)", range: "$8,000 – $20,000" },
  { scope: "Pergola (steel)", range: "$12,000 – $30,000" },
];

const testimonials = [
  { quote: "Konntey built a 40sqm Merbau deck at our Tarneit home. Beautiful finish, built in under two weeks. The neighbours are jealous.", author: "Mark D.", location: "Tarneit" },
  { quote: "We wanted an alfresco area with a pergola and ceiling fan. Konntey designed and built exactly what we envisioned. Fair price too.", author: "Lisa C.", location: "Point Cook" },
  { quote: "Had an old deck that was falling apart. The team stripped it back, replaced the rotted bearers, and re-decked in spotted gum. Looks incredible.", author: "Chris W.", location: "Hoppers Crossing" },
];

const faqs = [
  { q: "Do I need a building permit for a deck or pergola?", a: "Decks under 800mm above ground level and pergolas under certain size thresholds generally don't require a permit. However, raised decks, front-facing structures, and pergolas attached to the house often do. We assess permit requirements at the quoting stage — no surprises." },
  { q: "How long does a deck take to build?", a: "A standard 20–40sqm deck takes 5–8 working days. Larger decks with pergolas or complex designs can take 2–3 weeks. Weather is the main variable — we don't lay timber in rain." },
  { q: "What timber do you recommend?", a: "For Melbourne's climate, we recommend Merbau (best value hardwood, naturally termite resistant) or Spotted Gum (premium, extremely durable). For low maintenance, composite decking is a great choice — no oiling required ever." },
  { q: "How often does a timber deck need oiling?", a: "We recommend oiling hardwood decks every 12–18 months to maintain colour and protection. We provide a maintenance guide at handover and can arrange annual maintenance if you prefer." },
  { q: "Do you build on sloping blocks?", a: "Yes. We regularly build elevated decks on sloping blocks across Melbourne's western and southeastern suburbs. Steel or timber subframes are designed to suit your site's gradient." },
  { q: "What's included in your deck quote?", a: "All materials, labour, stumps/piers, frame, decking boards, finishing (oil or seal), steps if needed, and site cleanup. Balustrading, pergolas, and lighting are quoted as add-ons." },
];

export default function DecksPage() {

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Deck & Pergola Construction Melbourne",
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://www.konnteyhomerenovations.com.au/#organization",
      name: "Konntey Home & Renovations",
      url: "https://www.konnteyhomerenovations.com.au",
      telephone: "+61493191798",
    },
    serviceType: "Deck Building",
    areaServed: { "@type": "City", name: "Melbourne" },
    description: "Premium deck and pergola builders across Melbourne. Merbau, spotted gum, composite decking. Fixed-price quotes.",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "5000",
      highPrice: "60000",
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.konnteyhomerenovations.com.au" },
      { "@type": "ListItem", position: 2, name: "Decks & Pergolas Melbourne", item: "https://www.konnteyhomerenovations.com.au/decks-pergolas-melbourne" },
    ],
  };

  return (
    <div className="bg-white text-navy font-body hide-scrollbar min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <NavBar theme="dark" />
      <FloatingActions />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative pt-[150px] pb-20 bg-navy text-white overflow-hidden">
          <Image src="/images/outdoor.webp" alt="Deck and pergola builders Melbourne" fill priority sizes="100vw" className="object-cover object-center opacity-40 mix-blend-overlay" />
          <div className="grain-overlay" />
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 relative z-10">
            <Reveal mode="mount">
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">DECKS & PERGOLAS</div>
              <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-tightest leading-[0.9] max-w-5xl">
                Deck & Pergola Builders in Melbourne — <span className="text-gold-bright">Premium Outdoor Living</span>
              </h1>
              <p className="mt-8 font-body text-[17px] leading-[1.8] text-white/80 max-w-3xl">
                Konntey Home &amp; Renovations designs and builds premium decks, pergolas, and outdoor living spaces across Melbourne. Merbau, spotted gum, or composite — built to handle real Australian weather. BPC registered, fixed-price contracts, and no subcontractors.
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
            </Reveal>
          </div>
        </section>

        {/* Cost Section */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">PRICING</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9] max-w-4xl">
                How much does a deck cost in Melbourne?
              </h2>
              <p className="mt-8 font-body text-[17px] leading-[1.8] text-navy/70 max-w-3xl">
                Deck costs in Melbourne range from $320–$650 per square metre depending on timber species, deck height, and site complexity. A typical 25sqm Merbau deck costs $8,000–$14,000 installed. Pergolas range from $8,000 for a basic timber structure to $30,000+ for large steel designs with louvres. All quotes are fixed-price.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Service Types */}
        <section className="py-20 sm:py-28 bg-off-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">WHAT WE BUILD</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9]">Our Outdoor Services</h2>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {serviceTypes.map((st, i) => (
                <Reveal key={st.title} y={20} duration={0.6} delay={i * 0.1} className="border border-navy/8 bg-white p-8">
                  <h3 className="font-display text-[22px] font-black uppercase tracking-tighter text-navy">{st.title}</h3>
                  <p className="mt-3 font-body text-[15px] leading-[1.8] text-navy/70">{st.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 sm:py-28 bg-navy text-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">HOW IT WORKS</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9]">Our Build Process</h2>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((ps, i) => (
                <Reveal key={ps.step} y={20} duration={0.6} delay={i * 0.08} className="border border-white/10 p-6">
                  <div className="font-display text-[36px] font-black text-gold-bright leading-none">{ps.step}</div>
                  <h3 className="mt-3 font-display text-[16px] font-black uppercase tracking-button text-white">{ps.title}</h3>
                  <p className="mt-2 font-body text-[14px] leading-[1.7] text-white/60">{ps.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="py-20 sm:py-28 bg-off-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">INVESTMENT</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9]">Pricing Guide</h2>
            </Reveal>
            <Reveal y={20} delay={0.15} className="mt-12 max-w-2xl">
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
                Prices vary based on timber species, deck height, site access, and additional features like balustrading or built-in seating. Fixed-price on every job.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 sm:py-28 bg-navy text-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">TESTIMONIALS</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9]">What Our Clients Say</h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal key={t.author} y={20} duration={0.6} delay={i * 0.1} className="border border-white/10 p-8">
                  <p className="font-body text-[15px] leading-[1.8] text-white/80 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 font-display text-[14px] font-black uppercase tracking-button text-gold-bright">— {t.author}, {t.location}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">FAQ</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9]">Frequently Asked Questions</h2>
            </Reveal>
            <ServiceFaq faqs={faqs} />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 sm:py-28 bg-gold-bright text-navy text-center">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9] max-w-3xl mx-auto">
                Ready for your dream outdoor space?
              </h2>
              <p className="mt-6 font-body text-[17px] leading-[1.8] text-navy/80 max-w-2xl mx-auto">
                Get a free, fixed-price quote from Melbourne&apos;s premium deck and pergola builders.
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
            </Reveal>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-12 bg-off-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4 font-body text-[13px] uppercase tracking-kicker text-navy/50">
            <span>Related services:</span>
            <Link prefetch={false} href="/home-extensions-melbourne" className="text-gold-bright hover:underline">Home Extensions →</Link>
            <Link prefetch={false} href="/interior-painting-melbourne" className="text-gold-bright hover:underline">Interior Painting →</Link>
            <Link prefetch={false} href="/kitchen-renovations-melbourne" className="text-gold-bright hover:underline">Kitchen Renovations →</Link>
            <Link prefetch={false} href="/quote" className="text-gold-bright hover:underline">Get a Quote →</Link>
          </div>
        </section>

        <ServiceAreasStrip service="decks and pergolas" />
      </main>

      <Footer />
    </div>
  );
}
