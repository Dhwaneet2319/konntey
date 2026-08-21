import dynamic from "next/dynamic";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import ServiceBlock from "@/components/ServiceBlock";
import Footer from "@/components/Footer";
import AreasWeServe from "@/components/AreasWeServe";
import FeaturedProjects from "@/components/FeaturedProjects";
import { homeFaqs } from "@/content/homeFaqs";

// FAQPage structured data — lives on the homepage only (not sitewide) and is
// generated from the same source as the visible <FAQ /> accordion so the two
// always match. Service and suburb pages carry their own page-specific FAQPage.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// Dynamic imports for below-fold components — reduces initial JS bundle significantly
const About = dynamic(() => import("@/components/About"));
const Careers = dynamic(() => import("@/components/Careers"));
const Contact = dynamic(() => import("@/components/Contact"));
const StatsCounter = dynamic(() => import("@/components/StatsCounter"));
const BeforeAfterSlider = dynamic(() => import("@/components/BeforeAfterSlider"));
const ProjectGallery = dynamic(() => import("@/components/ProjectGallery"));
const ProcessStrip = dynamic(() => import("@/components/ProcessStrip"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const MoreServices = dynamic(() => import("@/components/MoreServices"));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), { ssr: false });
const CtaBanner = dynamic(() => import("@/components/CtaBanner"));
const VastuSection = dynamic(() => import("@/components/VastuSection"));

const heroService = {
  kicker: "BUILDING & EXTENSIONS",
  title: "EXTENSIONS & NEW BUILDS",
  body: "Need a home extension or new build in western Melbourne? Whether you're creating more space for a growing family or starting fresh from the ground up, Konntey delivers reliable project management and expert craftsmanship — built to the highest standard, every time.",
  image: "/images/extension.webp",
  imageAlt: "Home extension builders Melbourne suburbs — modern luxury extension",
  dark: true,
  imageLeft: false,
};

const remainingServices = [
  {
    kicker: "OUR SERVICES",
    title: "KITCHEN & BATHROOM RENOVATIONS",
    body: "Looking for an affordable kitchen or bathroom renovation in Melbourne? From complete kitchen transformations to precision bathroom upgrades, we handle every detail — transparent pricing, clear communication, and a finish built to last.",
    image: "/images/kitchen.webp",
    imageAlt: "Affordable kitchen renovation Melbourne by professional renovation builders",
    dark: false,
    imageLeft: true,
  },
  {
    kicker: "OUTDOOR LIVING",
    title: "DECKS, PERGOLAS & LANDSCAPING",
    body: "Your local deck builder and pergola installation experts. We design and build premium outdoor living spaces — decks, pergolas, and landscaping — crafted for Melbourne homes and built to handle real Australian weather.",
    image: "/images/outdoor.webp",
    imageAlt: "Deck builder Melbourne — premium timber pergola installation",
    dark: true,
    imageLeft: false,
  },
  {
    kicker: "INTERIOR FINISHING",
    title: "PAINTING & INTERIOR FINISHING",
    body: "Sharp lines, fresh finishes, and careful attention to every last detail. Our professional interior painters in Melbourne turn construction sites into polished, move-in ready homes — servicing suburbs across Melbourne and beyond.",
    image: "/images/interior.webp",
    imageAlt: "Interior painter Melbourne — professional finishing and painting",
    dark: false,
    imageLeft: true,
  },
];

export default function HomePage() {
  return (
    <div className="bg-white text-navy font-body selection:bg-gold-bright selection:text-navy hide-scrollbar">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <NavBar />
      <WhatsAppButton />

      <main>
        <Hero />

        <ServiceBlock {...heroService} index={0} sectionId="services">
          <ul className="mt-8 space-y-3 font-body text-[15px] xl:text-[17px] text-navy/80">
            <li className="flex items-start gap-3">
              <span className="text-gold-bright font-bold mt-0.5">✓</span>
              <span>Structural extensions, second storeys &amp; granny flats</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-bright font-bold mt-0.5">✓</span>
              <span>Knockdown rebuilds &amp; new home construction</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold-bright font-bold mt-0.5">✓</span>
              <span>Full project management from permits to handover</span>
            </li>
          </ul>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="border border-navy/8 bg-off-white p-4 text-center">
              <div className="font-display text-[22px] font-black text-gold-deep leading-none">10+</div>
              <div className="mt-1 font-display text-[11px] font-bold uppercase tracking-kicker text-navy/60">Years Trade Experience</div>
            </div>
            <div className="border border-navy/8 bg-off-white p-4 text-center">
              <div className="font-display text-[22px] font-black text-gold-deep leading-none">✓</div>
              <div className="mt-1 font-display text-[11px] font-bold uppercase tracking-kicker text-navy/60">Council Approvals Handled</div>
            </div>
            <div className="border border-navy/8 bg-off-white p-4 text-center">
              <div className="font-display text-[22px] font-black text-gold-deep leading-none">✓</div>
              <div className="mt-1 font-display text-[11px] font-bold uppercase tracking-kicker text-navy/60">Fair Price Contracts</div>
            </div>
            <div className="border border-navy/8 bg-off-white p-4 text-center">
              <div className="font-display text-[22px] font-black text-gold-deep leading-none">✓</div>
              <div className="mt-1 font-display text-[11px] font-bold uppercase tracking-kicker text-navy/60">Founder-Led Every Build</div>
            </div>
          </div>
        </ServiceBlock>

        {/* Proof-first section: real project cards when published case
            studies exist; honest compact teaser otherwise. */}
        <FeaturedProjects />

        <VastuSection />

        <Ticker text="Quality Work ◆ On Time ◆ Fair Pricing ◆ Melbourne Based ◆ Family Run ◆" />

        <BeforeAfterSlider />

        <div>
          {remainingServices.map((service, index) => (
            <ServiceBlock key={service.title} {...service} index={index + 1} />
          ))}
        </div>

        <MoreServices />

        <ProcessStrip />

        <StatsCounter />

        <ProjectGallery />

        <About />

        <Testimonials />

        <AreasWeServe />

        <CtaBanner />

        <Careers />

        <FAQ />

        <Contact />
      </main>

      <Ticker text="Respect ◆ Growth ◆ Teamwork ◆" />
      <Footer />
    </div>
  );
}
