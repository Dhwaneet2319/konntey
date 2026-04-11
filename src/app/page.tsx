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

const heroService = {
  kicker: "BUILDING & EXTENSIONS",
  title: "EXTENSIONS & NEW BUILDS",
  body: "Need a home extension in Melbourne's west? Whether you're opening up space for a growing family or starting a new build in Point Cook, Hoppers Crossing or Wyndham Vale, Konntey delivers reliable project management and expert craftsmanship.",
  image: "/images/extension.png",
  imageAlt: "Home extension builders Melbourne suburbs — modern luxury extension",
  dark: true,
  imageLeft: false,
};

const remainingServices = [
  {
    kicker: "OUR SERVICES",
    title: "KITCHEN & BATHROOM RENOS",
    body: "Looking for an affordable kitchen renovation in Melbourne? From complete kitchen transformations to precision bathroom upgrades across Tarneit, Truganina & Werribee, we handle every detail — transparent pricing, clear communication, and a finish built to last.",
    image: "/images/kitchen.png",
    imageAlt: "Affordable kitchen renovation Melbourne by licensed renovation builders",
    dark: false,
    imageLeft: true,
  },
  {
    kicker: "OUTDOOR LIVING",
    title: "DECKS, PERGOLAS & LANDSCAPING",
    body: "Melbourne's trusted deck builder and pergola installation experts. We build premium outdoor living spaces across the western and southeastern suburbs — strong, clean, and ready for real Australian weather.",
    image: "/images/outdoor.png",
    imageAlt: "Deck builder Melbourne — premium timber pergola installation",
    dark: true,
    imageLeft: false,
  },
  {
    kicker: "INTERIOR FINISHING",
    title: "PAINTING & INTERIOR FINISHING",
    body: "Sharp lines, fresh finishes, and careful attention to every last detail. Our licensed interior painters in Melbourne turn construction sites into polished homes — servicing Dandenong, Cranbourne, Frankston, Berwick and beyond.",
    image: "/images/interior.png",
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

        <ServiceBlock {...heroService} index={0} sectionId="services" />

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

        <Ticker text="Respect ◆ Growth ◆ Teamwork ◆" />

        <Contact />

        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
