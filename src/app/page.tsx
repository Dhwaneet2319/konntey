import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/chat/FloatingActions";
import HomeHero from "@/components/home/HomeHero";
import ProofSection from "@/components/home/ProofSection";
import ServiceChooser from "@/components/home/ServiceChooser";
import HowWeWork from "@/components/home/HowWeWork";
import AboutSection from "@/components/home/AboutSection";
import AreasWeServe from "@/components/AreasWeServe";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import { homeFaqs } from "@/content/homeFaqs";
import { jsonLd, pageMetadata, siteDescription } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Home renovations & extensions in Melbourne | Konntey H&R",
  absoluteTitle: true,
  description: siteDescription,
  path: "/",
});

// Generated from the same array as the visible FAQ so the two always match.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <div className="bg-white font-body text-navy">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />
      <NavBar />
      <FloatingActions />
      <main id="main">
        <HomeHero />
        <ProofSection />
        <ServiceChooser />
        <HowWeWork />
        <AboutSection />
        <AreasWeServe />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
