import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ButtonLink, PhoneButton } from "@/components/ui";
import { serviceList } from "@/content/services";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-screen items-center bg-off-white font-body text-navy">
      <div className="mx-auto w-full max-w-2xl px-5 py-20 sm:px-8">
        <Link href="/" aria-label={`${business.name} home`} className="inline-flex items-center gap-2.5">
          <Image src="/images/logo.png" alt="" width={154} height={112} className="h-10 w-auto" />
          <span className="font-display text-[22px] font-bold leading-none">
            Konntey
            <span className="mt-1 block font-body text-[12px] font-medium text-gold-deep">Home &amp; Renovations</span>
          </span>
        </Link>
        <p className="mt-12 font-body text-[13px] font-semibold uppercase tracking-kicker text-gold-deep">Error 404</p>
        <h1 className="mt-3 font-display text-[clamp(2.25rem,6vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.02em]">
          We can&apos;t find that page
        </h1>
        <p className="mt-5 max-w-lg text-[17px] leading-[1.7] text-navy/75">
          It may have moved or the link may be mistyped. Try one of these instead, or get in touch
          and we&apos;ll point you in the right direction.
        </p>
        <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {serviceList.map((s) => (
            <li key={s.route}>
              <Link href={s.route} className="text-[16px] font-medium text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-gold-deep">
                {s.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/guides" className="text-[16px] font-medium text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-gold-deep">
              Renovation guides
            </Link>
          </li>
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to the homepage</ButtonLink>
          <PhoneButton label={`Call ${business.phoneDisplay}`} />
        </div>
      </div>
    </main>
  );
}
