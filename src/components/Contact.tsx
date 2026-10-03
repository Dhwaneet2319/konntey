import { Mail, Phone } from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";
import { Container, Kicker } from "@/components/ui";
import { business, claimText } from "@/content/business";

/** Homepage enquiry section: short intro, direct contact options, shared form. */
export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20 bg-navy py-16 text-white sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <Kicker tone="dark">Free quote</Kicker>
          <h2
            id="contact-heading"
            className="mt-4 font-display text-[clamp(1.875rem,3.4vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.01em]"
          >
            Tell us about your project
          </h2>
          <p className="mt-5 max-w-md font-body text-[17px] leading-[1.7] text-white/75">
            We&apos;ll arrange a free site visit and send you a written, itemised quote.{" "}
            {claimText("responseTimes")}
          </p>
          <ul className="mt-8 space-y-4 font-body text-[16px]">
            <li>
              <a
                href={`tel:${business.phoneE164}`}
                data-placement="home_contact"
                className="inline-flex items-center gap-3 font-semibold hover:text-gold-bright"
              >
                <Phone aria-hidden="true" size={18} className="text-gold-bright" />
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="inline-flex items-center gap-3 break-all hover:text-gold-bright">
                <Mail aria-hidden="true" size={18} className="shrink-0 text-gold-bright" />
                {business.email}
              </a>
            </li>
          </ul>
          <p className="mt-6 font-body text-[14px] text-white/60">{business.hours.join(" · ")}</p>
        </div>
        <div className="bg-navy-light p-6 sm:p-8">
          <EnquiryForm placement="home_contact" tone="dark" variant="compact" />
        </div>
      </Container>
    </section>
  );
}
