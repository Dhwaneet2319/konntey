import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/chat/FloatingActions";
import Reveal from "@/components/Reveal";
import ServiceFaq from "@/components/ServiceFaq";
import ServiceAreasStrip from "@/components/ServiceAreasStrip";
import RelatedContent from "@/components/RelatedContent";
import Link from "next/link";
import { Phone } from "lucide-react";
import Image from "next/image";

const extensionTypes = [
  { title: "Ground Floor Extension", desc: "Expand your living space outward — open-plan living, extra bedrooms, or larger kitchen areas" },
  { title: "Second Storey Addition", desc: "Build up when you can't build out. Full second storey additions with minimal disruption" },
  { title: "Granny Flat / DPU", desc: "Dependent person's unit or rental income — fully self-contained, council-approved builds" },
  { title: "Knockdown Rebuild", desc: "Start fresh on your existing block with a brand new custom-designed home" },
  { title: "Garage Conversion", desc: "Transform an underused garage into a functional living space, home office, or studio" },
];

const processSteps = [
  { step: "01", title: "Free consultation", desc: "Site visit, discuss your vision, assess feasibility" },
  { step: "02", title: "Design & permits", desc: "Architectural plans, council submissions, and fixed-price quote" },
  { step: "03", title: "Site preparation", desc: "Demolition if needed, excavation, and foundation work" },
  { step: "04", title: "Structural frame", desc: "Timber or steel frame erected, roofing installed" },
  { step: "05", title: "Lock-up stage", desc: "External cladding, windows, doors — weather-tight" },
  { step: "06", title: "Internal fit-out", desc: "Plumbing, electrical, plastering, flooring, painting" },
  { step: "07", title: "Finishing & fixtures", desc: "Kitchen, bathroom, cabinetry, and final touches" },
  { step: "08", title: "Handover & warranty", desc: "Final inspection, compliance certificate, full walkthrough" },
];

const pricingRows = [
  { scope: "Ground floor extension", range: "$1,800 – $3,000/sqm" },
  { scope: "Second storey addition", range: "$2,500 – $4,500/sqm" },
  { scope: "Granny flat (60sqm)", range: "$120,000 – $180,000" },
  { scope: "Knockdown rebuild", range: "$350,000 – $600,000+" },
];

const testimonials = [
  { quote: "Konntey added a second storey to our Tarneit home. They handled all the council approvals and the build was completed on schedule. Our home feels brand new.", author: "Raj P.", location: "Tarneit" },
  { quote: "We needed more space for our growing family. Konntey extended our ground floor with a new master suite and open-plan living. Couldn't be happier.", author: "Sarah L.", location: "Point Cook" },
  { quote: "Built a granny flat in our backyard in Werribee. The team managed everything from permits to final handover. Professional and fair pricing.", author: "Tony M.", location: "Werribee" },
];

const faqs = [
  { q: "Do I need a building permit for a home extension?", a: "Yes — all home extensions in Victoria require a building permit. Most also require a planning permit depending on your overlay zones, setback requirements, and the scope of work. We handle all permit applications as part of our service — council liaison, documentation, and submissions are included in your fixed-price quote." },
  { q: "How long does a home extension take?", a: "A standard ground floor extension takes 12–16 weeks from slab to handover. Second storey additions typically run 16–24 weeks. Knockdown rebuilds are 6–9 months. The biggest variable is council permit approval times — Wyndham and Casey councils currently run 8–12 weeks for planning permits." },
  { q: "Can I live at home during the extension?", a: "For ground floor extensions, yes — most clients stay in the home with appropriate dust and noise management. For second storey additions, you can usually remain during the early stages but may need to relocate for 2–4 weeks during roof removal and structural work. We'll advise on a case-by-case basis." },
  { q: "How much does a home extension cost per square metre?", a: "Ground floor extensions typically cost $1,800–$3,000/sqm depending on finishes. Second storeys range from $2,500–$4,500/sqm due to additional structural requirements. These are guide prices — every project is quoted individually with transparent line-item pricing." },
  { q: "Do you handle council approvals?", a: "Yes. We manage the entire permit process including architectural drawings, engineering, energy ratings, and council submissions. We work regularly with Wyndham City, Casey, Hume, and Brimbank councils and understand their specific requirements." },
  { q: "What's included in your fixed-price quote?", a: "Everything from demolition to handover: structural engineering, council permits, all trades (framing, plumbing, electrical, plastering, tiling, painting), project management, site supervision, and rubbish removal. Fixtures and fittings are selected by you within agreed allowances." },
];

export default function HomeExtensionsPage() {

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Home Extensions Melbourne",
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://www.konnteyhomerenovations.com.au/#organization",
      name: "Konntey Home & Renovations",
      url: "https://www.konnteyhomerenovations.com.au",
      telephone: "+61493191798",
    },
    serviceType: "Home Extension",
    areaServed: { "@type": "City", name: "Melbourne" },
    description: "Home extensions across Melbourne. Second storeys, granny flats, knockdown rebuilds. BPC registered, council approvals handled, fixed-price quotes.",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "80000",
      highPrice: "600000",
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
      { "@type": "ListItem", position: 2, name: "Home Extensions Melbourne", item: "https://www.konnteyhomerenovations.com.au/home-extensions-melbourne" },
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
          <Image src="/images/extension.webp" alt="Home extension builders Melbourne" fill priority sizes="100vw" className="object-cover object-center opacity-40 mix-blend-overlay" />
          <div className="grain-overlay" />
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 relative z-10">
            <Reveal mode="mount">
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">HOME EXTENSIONS</div>
              <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-tightest leading-[0.9] max-w-5xl">
                Home Extensions in Melbourne — <span className="text-gold-bright">From Ground Floor to Second Storey</span>
              </h1>
              <p className="mt-8 font-body text-[17px] leading-[1.8] text-white/80 max-w-3xl">
                Konntey Home &amp; Renovations delivers professional home extensions across Melbourne — from single-room additions to full second storey builds and knockdown rebuilds. BPC registered, council approvals handled, and fixed-price contracts on every project. Serving Tarneit, Point Cook, Werribee, Hoppers Crossing, Dandenong &amp; beyond.
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
                How much does a home extension cost in Melbourne?
              </h2>
              <p className="mt-8 font-body text-[17px] leading-[1.8] text-navy/70 max-w-3xl">
                Home extension costs in Melbourne vary from $1,800 to $4,500+ per square metre depending on the type of extension, structural complexity, and finishes. A standard ground floor extension typically starts around $150,000–$250,000 for 50–80sqm. Second storey additions run higher due to structural engineering requirements. All our quotes are fixed-price — no cost blowouts.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Extension Types */}
        <section className="py-20 sm:py-28 bg-off-white">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">WHAT WE BUILD</div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9]">Extension Types</h2>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {extensionTypes.map((et, i) => (
                <Reveal key={et.title} y={20} duration={0.6} delay={i * 0.1} className="border border-navy/8 bg-white p-8">
                  <h3 className="font-display text-[22px] font-black uppercase tracking-tighter text-navy">{et.title}</h3>
                  <p className="mt-3 font-body text-[15px] leading-[1.8] text-navy/70">{et.desc}</p>
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
                Prices vary based on site conditions, structural requirements, material selections, and council overlay zones. All quotes are fixed-price with transparent line-item breakdowns.
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
                Ready to extend your home?
              </h2>
              <p className="mt-6 font-body text-[17px] leading-[1.8] text-navy/80 max-w-2xl mx-auto">
                Get a free, fixed-price quote from Melbourne&apos;s BPC registered extension builders.
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

        {/* Related proof, guides and services */}
        <RelatedContent
          serviceRoute="/home-extensions-melbourne"
          serviceName="Home Extension"
          relatedGuides={[
            { label: "Home extension vs moving house: which adds more value?", href: "/guides/home-extension-vs-moving-house" },
            { label: "Do you need a permit to renovate in Victoria?", href: "/guides/renovation-permits-victoria" },
            { label: "How to choose a renovation builder in Melbourne", href: "/guides/how-to-choose-a-renovation-builder-melbourne" },
          ]}
          relatedServices={[
            { label: "Kitchen renovations", href: "/kitchen-renovations-melbourne" },
            { label: "Bathroom renovations", href: "/bathroom-renovations-melbourne" },
            { label: "Decks & pergolas", href: "/decks-pergolas-melbourne" },
          ]}
        />

        <ServiceAreasStrip service="home extensions" />
      </main>

      <Footer />
    </div>
  );
}
