import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Container, SectionHeading } from "@/components/ui";
import { business, claimText, type ClaimId } from "@/content/business";

const values = [
  { name: "Quality", desc: "Work finished to a standard we're happy to put our name to." },
  { name: "Honesty", desc: "Straight answers, written scopes and no surprise extras." },
  { name: "Reliability", desc: "We agree the schedule up front and tell you early if anything changes." },
  { name: "Care", desc: "Respect for your home, a tidy site and a proper clean at handover." },
];

// Team descriptors render only once the owner approves the matching claim.
const teamClaims: ClaimId[] = ["founderLed", "familyRun", "ownershipHeritage", "languages"];

export default function AboutSection() {
  const teamFacts = teamClaims.map((id) => claimText(id)).filter(Boolean);
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 border-t border-navy/10 py-16 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading id="about-heading" kicker="About" title="A Melbourne renovation company" />
          <p className="mt-6 max-w-xl font-body text-[17px] leading-[1.75] text-navy/75">
            {business.name} renovates homes across {business.serviceArea}: kitchens,
            bathrooms, extensions, decks and painting. We focus on clear written scopes,
            careful trade work and straightforward communication.
          </p>
          {teamFacts.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {teamFacts.map((fact) => (
                <li key={fact} className="border border-navy/15 px-3 py-1.5 font-body text-[14px] text-navy/80">
                  {fact}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-6 font-body text-[14px] text-navy/70">
            ABN {business.abn} ·{" "}
            <Link href="/credentials-and-compliance" className="underline underline-offset-4 hover:text-navy">
              How we work
            </Link>
          </p>
        </div>
        <Reveal as="dl" group className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.name} className="border-l-2 border-gold-bright pl-5">
              <dt className="font-display text-[21px] font-bold text-navy">{v.name}</dt>
              <dd className="mt-1.5 font-body text-[15px] leading-[1.65] text-navy/70">{v.desc}</dd>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
