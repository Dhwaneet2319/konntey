import Image from "next/image";
import TrustStrip from "@/components/TrustStrip";
import { ButtonLink, Container, Kicker, PhoneButton } from "@/components/ui";
import { business } from "@/content/business";
import { siteImages } from "@/content/images";

/** Server-rendered hero: no entrance animation on the H1, copy, CTAs or LCP image. */
export default function HomeHero() {
  const image = siteImages.heroMain;
  return (
    <section id="hero" className="bg-off-white pt-16 lg:pt-20">
      <Container className="grid gap-10 pb-12 pt-8 sm:pt-12 lg:grid-cols-[1fr_1.08fr] lg:items-center lg:gap-14 lg:pb-20 lg:pt-14">
        <div>
          <Kicker>Melbourne&apos;s west &amp; southeast</Kicker>
          <h1 className="mt-5 max-w-[14ch] font-display text-[clamp(2.5rem,5.6vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.02em] text-navy">
            Home renovations &amp; extensions across Melbourne
          </h1>
          <p className="mt-5 font-display text-[clamp(1.25rem,2vw,1.625rem)] font-bold leading-tight text-gold-deep">
            It&apos;s your home. We build it right.
          </p>
          <p className="mt-4 max-w-lg font-body text-[17px] leading-[1.7] text-navy/75">
            Kitchens, bathrooms, extensions, decks and painting — planned with you,
            quoted in writing and built with care.
          </p>
          <div data-hero-ctas className="mt-8 flex flex-wrap gap-3 max-sm:[&>a]:w-full">
            <ButtonLink href="/quote">Get a free quote</ButtonLink>
            <PhoneButton label={`Call ${business.phoneDisplay}`} />
          </div>
          <div className="mt-7">
            <TrustStrip />
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy/5 lg:aspect-[5/4]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 640px"
            className="object-cover"
          />
          {image.provenance !== "konntey-project" && (
            <span className="absolute bottom-3 left-3 bg-white/85 px-2 py-1 font-body text-[12px] text-navy/70">
              Illustrative image
            </span>
          )}
        </div>
      </Container>
    </section>
  );
}
