import ServiceFaq from "@/components/ServiceFaq";
import { Container, SectionHeading, TextLink } from "@/components/ui";
import { homeFaqs } from "@/content/homeFaqs";

/** Homepage FAQ; the same array feeds the homepage FAQPage JSON-LD. */
export default function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-20 py-16 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <SectionHeading id="faq-heading" kicker="FAQ" title="Questions homeowners ask" />
          <p className="mt-5 font-body text-[16px] leading-[1.7] text-navy/75">
            Getting quotes from a few builders? Our free checklist shows what a complete
            renovation quote should include, so you can compare like with like.
          </p>
          <div className="mt-4">
            <TextLink href="/guides/renovation-quote-checklist-melbourne">Quote comparison checklist</TextLink>
          </div>
        </div>
        <ServiceFaq faqs={homeFaqs} />
      </Container>
    </section>
  );
}
