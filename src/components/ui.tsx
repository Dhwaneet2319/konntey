import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { business } from "@/content/business";

type Tone = "light" | "dark";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Kicker({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 font-body text-[12px] font-semibold uppercase tracking-[0.16em] ${
        tone === "light" ? "text-gold-deep" : "text-gold-bright"
      } ${className}`}
    >
      <span aria-hidden="true" data-reveal="line" className="h-px w-8 origin-left bg-current" />
      {children}
    </p>
  );
}

export function SectionHeading({
  kicker,
  title,
  intro,
  tone = "light",
  id,
  className = "",
}: {
  kicker?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {kicker && <Kicker tone={tone}>{kicker}</Kicker>}
      <h2
        id={id}
        className={`mt-4 font-display text-[clamp(1.875rem,3.4vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.01em] ${
          tone === "light" ? "text-navy" : "text-white"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 font-body text-[17px] leading-[1.7] ${
            tone === "light" ? "text-navy/75" : "text-white/75"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

const buttonBase =
  "group inline-flex min-h-[48px] items-center justify-center gap-2 px-6 py-3 font-body text-[15px] font-semibold transition-[background-color,border-color,color,transform] duration-hover ease-brand active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const buttonVariants = {
  primary: "bg-gold-bright text-navy hover:bg-[#e0b847] focus-visible:outline-gold-bright",
  dark: "bg-navy text-white hover:bg-navy-light focus-visible:outline-navy",
  outlineLight: "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white focus-visible:outline-navy",
  outlineDark: "border border-white/30 text-white hover:border-white hover:bg-white hover:text-navy focus-visible:outline-white",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
  prefetch,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  arrow?: boolean;
  className?: string;
  prefetch?: boolean;
}) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={`${buttonBase} ${buttonVariants[variant]} ${className}`}
    >
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          size={16}
          strokeWidth={2.25}
          className="shrink-0 transition-transform duration-hover ease-brand group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}

export function PhoneButton({
  label,
  variant = "outlineLight",
  className = "",
}: {
  label?: string;
  variant?: keyof typeof buttonVariants;
  className?: string;
}) {
  return (
    <a
      href={`tel:${business.phoneE164}`}
      data-placement="phone-button"
      className={`${buttonBase} ${buttonVariants[variant]} ${className}`}
    >
      <Phone aria-hidden="true" size={16} strokeWidth={2.25} className="shrink-0" />
      <span>{label ?? business.phoneDisplay}</span>
    </a>
  );
}

export function TextLink({
  href,
  children,
  tone = "light",
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 font-body text-[15px] font-semibold underline-offset-4 hover:underline ${
        tone === "light" ? "text-gold-deep" : "text-gold-bright"
      }`}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        size={15}
        strokeWidth={2.25}
        className="shrink-0 transition-transform duration-hover ease-brand group-hover:translate-x-0.5"
      />
    </Link>
  );
}
