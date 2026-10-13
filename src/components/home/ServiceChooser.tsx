import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import ResponsiveHomeImage from "@/components/home/ResponsiveHomeImage";
import type { HomeImageId } from "@/components/home/home-images";
import { Container, SectionHeading, TextLink } from "@/components/ui";
import { siteImages } from "@/content/images";
import { chooserServices, services, type ServiceSlug } from "@/content/services";

// Chooser cards render the pre-encoded AI inspiration pack where one exists.
// A service without a pack image falls back to its registry photo unchanged.
const cardImages: Partial<Record<ServiceSlug, HomeImageId>> = {
  kitchen: "kitchen-after-concept",
  bathroom: "bathroom-concept",
  extension: "home-extension",
  "deck-pergola": "deck-and-pergola",
  painting: "painted-interior",
};

export default function ServiceChooser() {
  const vastu = services.vastu;
  const newHome = services["new-home"];
  const newHomeImage = siteImages[newHome.card.image];
  const anyPackImage = chooserServices.some((s) => cardImages[s.slug] !== undefined);
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-20 bg-off-white py-16 sm:py-24">
      <Container>
        <SectionHeading
          id="services-heading"
          kicker="Services"
          title="What are you planning?"
          intro="Choose a project to see what's involved, indicative Melbourne pricing and common questions."
        />
        {/* New home builds is the newest service, so it gets a wide featured
            card above the grid instead of a sixth tile. */}
        <Link
          href={newHome.route}
          className="group mt-10 grid overflow-hidden bg-navy text-white transition-shadow duration-hover ease-brand hover:shadow-[0_16px_40px_-18px_rgba(13,31,60,0.55)] sm:grid-cols-[1.1fr_1fr]"
        >
          <span className="relative block aspect-[4/3] overflow-hidden bg-navy-light sm:aspect-auto sm:min-h-[320px]">
            <Image
              src={newHomeImage.src}
              alt=""
              fill
              sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1279px) 52vw, 640px"
              className="object-cover transition-transform duration-enter ease-brand group-hover:scale-[1.025]"
            />
          </span>
          <span className="flex flex-col justify-center p-6 sm:p-10">
            <span className="w-fit bg-gold-bright px-2 py-1 font-body text-[11px] font-semibold uppercase leading-none tracking-[0.08em] text-navy">
              New service
            </span>
            <span className="mt-4 font-display text-[clamp(1.875rem,3.2vw,2.625rem)] font-bold leading-[1.02]">
              New home builds
            </span>
            <span className="mt-3 max-w-md font-body text-[16px] leading-[1.65] text-white/75">
              Single and double storey homes and knockdown rebuilds on your land, across
              Melbourne&apos;s west and southeast.
            </span>
            <span className="mt-6 inline-flex items-center gap-2 font-body text-[15px] font-semibold text-gold-bright">
              Explore new home builds
              <ArrowRight
                aria-hidden="true"
                size={18}
                strokeWidth={2.25}
                className="transition-transform duration-hover ease-brand group-hover:translate-x-0.5"
              />
            </span>
          </span>
        </Link>
        <Reveal
          as="ul"
          group
          className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5"
        >
          {chooserServices.map((s) => {
            const packImage = cardImages[s.slug];
            return (
              <li key={s.slug}>
                <Link
                  href={s.route}
                  className="group flex h-full items-center gap-4 bg-white p-3 transition-shadow duration-hover ease-brand hover:shadow-[0_12px_32px_-18px_rgba(13,31,60,0.35)] sm:flex-col sm:items-stretch sm:gap-0 sm:p-0"
                >
                  {/* Pack sources are 3:2 landscape; 4:3 thumbs crop ~11% of
                      width instead of the ~47% a 4:5 portrait box would. */}
                  <span className="relative block aspect-square w-24 shrink-0 overflow-hidden bg-navy/5 sm:aspect-[4/3] sm:w-full">
                    {packImage ? (
                      <ResponsiveHomeImage
                        image={packImage}
                        alt=""
                        sizes="(max-width: 639px) 96px, (max-width: 1023px) calc((100vw - 80px) / 2), (max-width: 1279px) calc((100vw - 128px) / 5), 230px"
                        pictureClassName="absolute inset-0 block"
                        className="block h-full w-full object-cover transition-transform duration-enter ease-brand group-hover:scale-[1.025]"
                      />
                    ) : (
                      <Image
                        src={siteImages[s.card.image].src}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 96px, (max-width: 1024px) 50vw, 20vw"
                        className="object-cover transition-transform duration-enter ease-brand group-hover:scale-[1.025]"
                      />
                    )}
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
        {anyPackImage && (
          <p className="mt-3 font-body text-[13px] text-navy/70">
            See our{" "}
            <Link href="/terms#imagery" className="underline underline-offset-4 hover:text-navy">
              terms
            </Link>{" "}
            for how the imagery on this page was produced.
          </p>
        )}
        <div className="mt-8 border-t border-navy/10 pt-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <p className="max-w-2xl font-body text-[16px] leading-[1.6] text-navy/75">
              <span className="font-semibold text-navy">Planning a Vastu-aligned home?</span>{" "}
              {vastu.card.blurb}
            </p>
            <div className="w-full shrink-0 sm:w-44">
              <ResponsiveHomeImage
                image="calm-living-space"
                sizes="(max-width: 639px) calc(100vw - 40px), 176px"
                className="block h-auto w-full"
              />
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
            <TextLink href={vastu.route}>Vastu renovations</TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
