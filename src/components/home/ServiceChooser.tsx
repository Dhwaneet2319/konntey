import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Container, SectionHeading, TextLink } from "@/components/ui";
import { siteImages } from "@/content/images";
import { chooserServices, services } from "@/content/services";

export default function ServiceChooser() {
  const vastu = services.vastu;
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-20 bg-off-white py-16 sm:py-24">
      <Container>
        <SectionHeading
          id="services-heading"
          kicker="Services"
          title="What are you planning?"
          intro="Choose a project to see what's involved, indicative Melbourne pricing and common questions."
        />
        <Reveal
          as="ul"
          group
          className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5"
        >
          {chooserServices.map((s) => {
            const image = siteImages[s.card.image];
            return (
              <li key={s.slug}>
                <Link
                  href={s.route}
                  className="group flex h-full items-center gap-4 bg-white p-3 transition-shadow duration-hover ease-brand hover:shadow-[0_12px_32px_-18px_rgba(13,31,60,0.35)] sm:flex-col sm:items-stretch sm:gap-0 sm:p-0"
                >
                  <span className="relative block aspect-square w-24 shrink-0 overflow-hidden bg-navy/5 sm:aspect-[4/5] sm:w-full">
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 96px, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover transition-transform duration-enter ease-brand group-hover:scale-[1.025]"
                    />
                  </span>
                  <span className="flex flex-1 flex-col sm:p-5">
                    <span className="flex items-center justify-between gap-2 font-display text-[22px] font-bold leading-tight text-navy">
                      {s.card.title}
                      <ArrowRight
                        aria-hidden="true"
                        size={18}
                        strokeWidth={2.25}
                        className="shrink-0 text-gold-deep transition-transform duration-hover ease-brand group-hover:translate-x-0.5"
                      />
                    </span>
                    <span className="mt-1 font-body text-[15px] leading-[1.55] text-navy/70">{s.card.blurb}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </Reveal>
        {chooserServices.some((s) => siteImages[s.card.image].provenance !== "konntey-project") && (
          <p className="mt-3 font-body text-[13px] text-navy/60">Photos are illustrative examples.</p>
        )}
        <div className="mt-8 flex flex-col gap-3 border-t border-navy/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl font-body text-[16px] leading-[1.6] text-navy/75">
            <span className="font-semibold text-navy">Planning a Vastu-aligned home?</span>{" "}
            {vastu.card.blurb}
          </p>
          <TextLink href={vastu.route}>Vastu renovations</TextLink>
        </div>
      </Container>
    </section>
  );
}
