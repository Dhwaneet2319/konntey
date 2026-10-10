import Link from "next/link";
import Image from "next/image";
import StarBorder from "./StarBorder";
import { Container } from "@/components/ui";
import { business, googleMapsSearchUrl } from "@/content/business";
import { serviceList } from "@/content/services";
import { suburbLinks } from "@/content/suburbs";

const company = [
  { label: "Our work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Renovation guides", href: "/guides" },
  { label: "Areas we service", href: "/renovations" },
  { label: "How we work", href: "/credentials-and-compliance" },
  { label: "Careers", href: "/careers" },
];

const headingCls = "font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-gold-bright";
const linkCls = "font-body text-[15px] text-white/75 transition-colors duration-hover hover:text-white";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy text-white">
      <Container className="pb-[calc(2rem+env(safe-area-inset-bottom))] pt-14 sm:pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-white/10 pb-10 lg:grid-cols-[1.2fr_0.9fr_0.8fr_1.4fr] lg:gap-x-10">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" aria-label={`${business.name} home`} className="inline-flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt=""
                width={154}
                height={112}
                className="h-10 w-auto brightness-0 invert"
              />
              <span className="font-display text-[24px] font-bold leading-none">
                Konntey
                <span className="mt-1 block font-body text-[12px] font-medium text-gold-bright">
                  Home &amp; Renovations
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs font-body text-[15px] leading-[1.65] text-white/70">
              Kitchen and bathroom renovations, home extensions, decks and painting across{" "}
              {business.serviceArea}.
            </p>
            <Link
              href="/quote"
              className="mt-6 inline-flex min-h-[44px] items-center bg-gold-bright px-5 font-body text-[15px] font-semibold text-navy transition-colors duration-hover hover:bg-[#e0b847]"
            >
              Get a free quote
            </Link>
          </div>

          <div>
            <h2 className={headingCls}>Services</h2>
            <ul className="mt-4 space-y-2.5">
              {serviceList.map((s) => (
                <li key={s.route}>
                  <Link href={s.route} className={linkCls}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={headingCls}>Company</h2>
            <ul className="mt-4 space-y-2.5">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h2 className={headingCls}>Contact</h2>
            <ul className="mt-4 space-y-2.5 font-body text-[15px] text-white/75">
              <li>
                <a href={`tel:${business.phoneE164}`} data-placement="footer" className={linkCls}>
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className={`${linkCls} [overflow-wrap:anywhere]`}>{business.email}</a>
              </li>
              {business.hours.map((line) => (
                <li key={line}>{line}</li>
              ))}
              <li>Melbourne, VIC · ABN {business.abn}</li>
            </ul>
          </div>
        </div>

        <div className="border-b border-white/10 py-8">
          <h2 className={headingCls}>Areas we service</h2>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {suburbLinks.map((s) => (
              <li key={s.slug}>
                <Link href={`/renovations/${s.slug}`} className="font-body text-[14px] text-white/60 hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 pt-6 font-body text-[14px] text-white/60 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {business.name}</span>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <a href={business.googleReviewUrl || googleMapsSearchUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {business.googleReviewUrl ? "Review us on Google" : "Find us on Google"}
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/konntey/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Instagram
              </a>
            </li>
            <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
          </ul>
        </div>

        <div className="mt-6 flex justify-center">
          <StarBorder
            as="a"
            href="https://dhwaneet.codes"
            target="_blank"
            rel="noopener noreferrer"
            color="#d4a832"
            speed="5s"
            thickness={1}
            className="origin-bottom scale-95 opacity-80 transition-opacity hover:opacity-100"
          >
            Built by dhwaneet
          </StarBorder>
        </div>
      </Container>
    </footer>
  );
}
