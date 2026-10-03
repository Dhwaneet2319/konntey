import Reveal from "@/components/Reveal";

export interface ServiceTestimonial {
  quote: string;
  author: string;
  location: string;
  /**
   * Set to true only after the quote has been matched to a real customer
   * record and the customer has agreed to it being published.
   */
  consentConfirmed: boolean;
  /** Public, verifiable source (e.g. the original Google review) when allowed. */
  sourceUrl?: string;
}

/**
 * Service-page testimonial section. Renders nothing until at least one
 * testimonial is marked consentConfirmed, so unverified quotes never ship.
 */
export default function ServiceTestimonials({
  testimonials,
  heading = "What Our Clients Say",
  theme = "dark",
}: {
  testimonials: ServiceTestimonial[];
  heading?: string;
  theme?: "dark" | "light";
}) {
  const verified = testimonials.filter((t) => t.consentConfirmed);
  if (verified.length === 0) return null;

  const dark = theme === "dark";

  return (
    <section className={`py-20 sm:py-28 ${dark ? "bg-navy text-white" : "bg-off-white"}`}>
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright mb-4">TESTIMONIALS</div>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tightest leading-[0.9]">{heading}</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {verified.map((t, i) => (
            <Reveal
              key={t.author}
              y={20}
              duration={0.6}
              delay={i * 0.1}
              className={dark ? "border border-white/10 p-8" : "border border-navy/8 bg-white p-8"}
            >
              <p className={`font-body text-[15px] leading-[1.8] italic ${dark ? "text-white/80" : "text-navy/70"}`}>&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 font-display text-[14px] font-black uppercase tracking-button text-gold-bright">— {t.author}, {t.location}</div>
              {t.sourceUrl && (
                <a
                  href={t.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-2 inline-block font-body text-[13px] hover:text-gold-bright ${dark ? "text-white/60" : "text-navy/60"}`}
                >
                  View original review
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
