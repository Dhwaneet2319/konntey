import { ClipboardList, FileCheck2, MessagesSquare, Repeat2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { howWeWork, quoteKind } from "@/content/business";

const reasons = [
  {
    icon: ClipboardList,
    title: "A clear, written quote",
    body: `You get a ${quoteKind} for the agreed scope before any work starts.`,
  },
  {
    icon: MessagesSquare,
    title: "One point of contact",
    body: "The same person keeps you updated from the first visit to handover.",
  },
  {
    icon: FileCheck2,
    title: "Permits explained",
    body: "We tell you which building or planning permits apply and coordinate the paperwork.",
  },
  {
    icon: Repeat2,
    title: "Changes agreed in writing",
    body: "Any change to the scope is priced and approved by you before it happens.",
  },
];

const steps = howWeWork.filter((s) => s.step !== "Variations");

export default function HowWeWork() {
  return (
    <section aria-labelledby="how-heading" className="py-16 sm:py-24">
      <Container>
        <SectionHeading id="how-heading" kicker="Why Konntey" title="A renovation you can follow at every step" />
        <Reveal group className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <Icon aria-hidden="true" size={26} strokeWidth={1.75} className="text-gold-deep" />
              <h3 className="mt-4 font-display text-[21px] font-bold leading-tight text-navy">{title}</h3>
              <p className="mt-2 font-body text-[15px] leading-[1.65] text-navy/70">{body}</p>
            </div>
          ))}
        </Reveal>

        <div className="mt-16 bg-navy p-6 text-white sm:p-10 lg:p-12">
          <h3 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-tight">How it works</h3>
          <Reveal as="ol" group className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.step} className="border-t border-white/15 pt-4">
                <span className="font-body text-[13px] font-semibold tabular-nums text-gold-bright">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-1 font-display text-[19px] font-bold">{s.step}</h4>
                <p className="mt-1.5 font-body text-[15px] leading-[1.6] text-white/70">{s.detail}</p>
              </li>
            ))}
          </Reveal>
          <div className="mt-8">
            <ButtonLink href="/quote">Book a free consultation</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
