import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import ServiceBlock from "@/components/ServiceBlock";
import About from "@/components/About";
import Careers from "@/components/Careers";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import StatsCounter from "@/components/StatsCounter";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ProjectGallery from "@/components/ProjectGallery";
import ProcessStrip from "@/components/ProcessStrip";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import MoreServices from "@/components/MoreServices";
import WhatsAppButton from "@/components/WhatsAppButton";
import CtaBanner from "@/components/CtaBanner";
import VastuSection from "@/components/VastuSection";

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
      <Preloader />
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
              <div className="font-display text-[22px] font-black text-gold-bright leading-none">10+</div>
              <div className="mt-1 font-display text-[11px] font-bold uppercase tracking-kicker text-navy/60">Years Trade Experience</div>
            </div>
            <div className="border border-navy/8 bg-off-white p-4 text-center">
              <div className="font-display text-[22px] font-black text-gold-bright leading-none">✓</div>
              <div className="mt-1 font-display text-[11px] font-bold uppercase tracking-kicker text-navy/60">Council Approvals Handled</div>
            </div>
            <div className="border border-navy/8 bg-off-white p-4 text-center">
              <div className="font-display text-[22px] font-black text-gold-bright leading-none">✓</div>
              <div className="mt-1 font-display text-[11px] font-bold uppercase tracking-kicker text-navy/60">Fair Price Contracts</div>
            </div>
            <div className="border border-navy/8 bg-off-white p-4 text-center">
              <div className="font-display text-[22px] font-black text-gold-bright leading-none">✓</div>
              <div className="mt-1 font-display text-[11px] font-bold uppercase tracking-kicker text-navy/60">Founder-Led Every Build</div>
            </div>
          </div>
        </ServiceBlock>

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
