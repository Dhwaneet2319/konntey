import Reveal from "@/components/Reveal";
import { Container, SectionHeading } from "@/components/ui";
import type { ServiceTestimonial } from "@/content/services";

export type { ServiceTestimonial };

/**
 * Testimonials for a service page. Renders nothing until at least one quote
 * is marked consentConfirmed, so unverified quotes never ship.
 */
export default function ServiceTestimonials({
  testimonials,
  heading = "What clients say",
}: {
  testimonials: ServiceTestimonial[];
  heading?: string;
}) {
  const verified = testimonials.filter((t) => t.consentConfirmed);
  if (verified.length === 0) return null;

  return (
    <section className="bg-off-white py-16 sm:py-24">
      <Container>
        <SectionHeading kicker="Client feedback" title={heading} />
        <Reveal group className="mt-10 grid gap-5 md:grid-cols-3">
          {verified.map((t) => (
            <figure key={t.author} className="border border-navy/10 bg-white p-7">
              <blockquote className="font-body text-[16px] leading-[1.75] text-navy/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 font-body text-[14px] font-semibold text-navy">
                {t.author}, {t.location}
                {t.sourceUrl && (
                  <a
                    href={t.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block font-normal text-gold-deep underline-offset-4 hover:underline"
                  >
                    View original review
                  </a>
                )}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
