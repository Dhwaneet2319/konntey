"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Phone } from "lucide-react";
import { business } from "@/content/business";
import { scrollBehavior } from "@/lib/motion";

const services = [
  { label: "New home builds", href: "/new-home-builders-melbourne" },
  { label: "Kitchen renovations", href: "/kitchen-renovations-melbourne" },
  { label: "Bathroom renovations", href: "/bathroom-renovations-melbourne" },
  { label: "Home extensions", href: "/home-extensions-melbourne" },
  { label: "Decks & pergolas", href: "/decks-pergolas-melbourne" },
  { label: "Painting", href: "/interior-painting-melbourne" },
  { label: "Vastu renovations", href: "/vastu-renovations-melbourne" },
];

const primaryLinks = [
  { label: "Our work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Guides", href: "/guides" },
];

const secondaryLinks = [
  { label: "Areas we service", href: "/renovations" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/#contact" },
];

function scrollToHash(hash: string) {
  document.querySelector(hash)?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
}

/**
 * Site header. `theme="dark"` starts transparent with light text over a navy
 * hero; both themes switch to a solid white bar once the page scrolls.
 */
export default function NavBar({ theme = "light" }: { theme?: "light" | "dark" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const onDark = theme === "dark" && !scrolled && !mobileOpen;

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Desktop services menu: close on outside click, on Escape (returning
  // focus to its button) and when focus leaves it.
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        servicesButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Mobile menu: focus moves in on open, Tab stays within toggle + menu,
  // Escape closes, and focus returns to the toggle on close.
  useEffect(() => {
    if (!mobileOpen) return;
    const toggle = toggleRef.current;
    const menu = menuRef.current;
    const frame = requestAnimationFrame(() => menu?.querySelector<HTMLElement>("a[href]")?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = [
        ...(toggle ? [toggle] : []),
        ...Array.from(menu?.querySelectorAll<HTMLElement>("a[href], button") ?? []),
      ];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKey);
      if (menu?.contains(document.activeElement) || document.activeElement === document.body) {
        toggle?.focus();
      }
    };
  }, [mobileOpen]);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false);
    setServicesOpen(false);
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      scrollToHash(href.slice(1));
      history.replaceState(null, "", href.slice(1));
    }
  };

  // Closed menus are only visibility-hidden, so Next's viewport prefetcher
  // would treat every link in them as visible and fetch ~12 routes on each
  // page load. Their links prefetch only once the menu is opened.
  const servicesPrefetch = servicesOpen ? undefined : false;
  const mobilePrefetch = mobileOpen ? undefined : false;

  const linkTone = onDark ? "text-white/85 hover:text-white" : "text-navy/80 hover:text-navy";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,height] duration-200 ease-brand ${
          mobileOpen
            ? "h-16 bg-navy"
            : scrolled
              ? "h-16 bg-white shadow-[0_1px_0_rgba(13,31,60,0.08)]"
              : "h-16 bg-transparent lg:h-20"
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:bg-gold-bright focus:px-4 focus:py-2 focus:font-body focus:text-[14px] focus:font-semibold focus:text-navy"
        >
          Skip to content
        </a>
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-8">
          <Link
            href="/"
            prefetch={pathname === "/" ? false : undefined}
            aria-label={`${business.name} home`}
            className="flex shrink-0 items-center gap-2.5"
          >
            <Image
              src="/images/logo.png"
              alt=""
              width={154}
              height={112}
              loading="eager"
              sizes="56px"
              className={`h-9 w-auto lg:h-10 ${mobileOpen || onDark ? "brightness-0 invert" : ""}`}
            />
            <span className="flex flex-col leading-none">
              <span
                className={`font-display text-[22px] font-bold tracking-[-0.01em] lg:text-[24px] ${
                  mobileOpen || onDark ? "text-white" : "text-navy"
                }`}
              >
                Konntey
              </span>
              <span
                className={`mt-0.5 font-body text-[11px] font-medium ${
                  mobileOpen || onDark ? "text-gold-bright" : "text-gold-deep"
                }`}
              >
                Home &amp; Renovations
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            <div ref={servicesRef} className="relative">
              <button
                ref={servicesButtonRef}
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                onClick={() => setServicesOpen((v) => !v)}
                className={`inline-flex items-center gap-1 font-body text-[15px] font-medium transition-colors duration-hover ${linkTone}`}
              >
                Services
                <ChevronDown
                  aria-hidden="true"
                  size={15}
                  className={`transition-transform duration-hover ease-brand ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                id="services-menu"
                className={`absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-200 ease-brand ${
                  servicesOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                }`}
              >
                <ul className="border border-navy/10 bg-white p-2 shadow-[0_16px_40px_-16px_rgba(13,31,60,0.25)]">
                  {services.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        prefetch={servicesPrefetch}
                        onClick={(e) => onNavClick(e, s.href)}
                        className="block px-3 py-2.5 font-body text-[15px] text-navy/80 transition-colors duration-hover hover:bg-off-white hover:text-navy"
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                  <li className="mt-1 border-t border-navy/10 pt-1">
                    <Link
                      href="/#services"
                      prefetch={servicesPrefetch}
                      onClick={(e) => onNavClick(e, "/#services")}
                      className="block px-3 py-2.5 font-body text-[14px] font-semibold text-gold-deep hover:bg-off-white"
                    >
                      Compare all services
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {primaryLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={(e) => onNavClick(e, l.href)}
                className={`font-body text-[15px] font-medium transition-colors duration-hover ${linkTone} ${
                  l.label === "Guides" ? "opacity-80" : ""
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={`tel:${business.phoneE164}`}
              data-placement="header"
              className={`hidden items-center gap-2 font-body text-[15px] font-semibold transition-colors duration-hover xl:inline-flex ${linkTone}`}
            >
              <Phone aria-hidden="true" size={16} />
              {business.phoneDisplay}
            </a>
            <Link
              href="/quote"
              className="inline-flex min-h-[44px] items-center bg-gold-bright px-5 font-body text-[15px] font-semibold text-navy transition-colors duration-hover hover:bg-[#e0b847]"
            >
              Get a free quote
            </Link>
          </div>

          <button
            ref={toggleRef}
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="relative z-50 -mr-2 inline-flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span aria-hidden="true" className="relative block h-4 w-6">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`absolute left-0 block h-0.5 w-6 transition-[transform,opacity] duration-200 ease-brand ${
                    mobileOpen || onDark ? "bg-white" : "bg-navy"
                  } ${
                    i === 0
                      ? mobileOpen ? "top-[7px] rotate-45" : "top-0"
                      : i === 1
                        ? mobileOpen ? "top-[7px] opacity-0" : "top-[7px]"
                        : mobileOpen ? "top-[7px] -rotate-45" : "top-[14px]"
                  }`}
                />
              ))}
            </span>
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!mobileOpen}
        className={`fixed inset-0 z-[45] overflow-y-auto bg-navy pt-16 transition-[opacity,transform,visibility] duration-200 ease-brand lg:hidden ${
          mobileOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-6 sm:px-8">
          <p className="font-body text-[13px] font-semibold text-gold-bright">Services</p>
          <ul className="mt-3 grid gap-1">
            {services.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  prefetch={mobilePrefetch}
                  onClick={(e) => onNavClick(e, s.href)}
                  className="block py-2.5 font-display text-[24px] font-bold text-white"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 grid gap-1 border-t border-white/15 pt-6">
            {[...primaryLinks, ...secondaryLinks].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  prefetch={mobilePrefetch}
                  onClick={(e) => onNavClick(e, l.href)}
                  className="block py-2.5 font-body text-[18px] text-white/85"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href="/quote"
              prefetch={mobilePrefetch}
              onClick={() => setMobileOpen(false)}
              className="inline-flex min-h-[52px] items-center justify-center bg-gold-bright px-6 font-body text-[16px] font-semibold text-navy"
            >
              Get a free quote
            </Link>
            <a
              href={`tel:${business.phoneE164}`}
              data-placement="mobile_menu"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 border border-white/30 px-6 font-body text-[16px] font-semibold text-white"
            >
              <Phone aria-hidden="true" size={16} />
              Call {business.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
