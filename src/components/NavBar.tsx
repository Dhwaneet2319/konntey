"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/#hero" },
  { 
    label: "Services", 
    href: "/#services",
    children: [
      { label: "Extensions & New Builds", href: "/services/extensions" },
      { label: "Kitchen Renovations", href: "/services/kitchens" },
      { label: "Bathroom Renovations", href: "/services/bathrooms" },
      { label: "Decks & Pergolas", href: "/services/outdoor" },
      { label: "Interior Finishing", href: "/services/interior" },
      { label: "Vastu & Feng Shui", href: "/services/vastu" },
    ]
  },
  { label: "About", href: "/#about" },
  { label: "Careers", href: "/#careers" },
  { label: "Contact", href: "/#contact" },
];

function smoothScrollTo(hash: string) {
  if (!hash || hash === "#") return;
  const el = document.querySelector(hash);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const hash = href.replace("/", "");
      smoothScrollTo(hash);
    }
  };

  return (
    <>
      <m.header
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          mobileOpen ? "bg-navy" : scrolled ? "glass-light" : "bg-transparent"
        } ${
          scrolled && !mobileOpen ? "h-[70px]" : "h-[90px]"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3 overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="Konntey Home & Renovations logo"
              width={56}
              height={56}
              className={`h-11 w-auto sm:h-14 transition-all duration-300 group-hover:scale-105 ${mobileOpen ? "brightness-0 invert" : ""}`}
            />
            <div className="flex flex-col leading-none">
              <m.span
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`font-display text-[26px] sm:text-[32px] font-black tracking-tighter transition-colors duration-300 ${mobileOpen ? "text-white" : "text-navy"}`}
              >
                KONNTEY
              </m.span>
              <m.span
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="font-display text-[10px] sm:text-[12px] font-bold tracking-[1.5px] uppercase text-gold-bright transition-transform duration-300 group-hover:translate-x-1"
              >
                Homes and Renovations
              </m.span>
            </div>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {navLinks.map((item) => (
              <div key={item.label} className="group relative">
                {item.children ? (
                  <div className="relative flex items-center h-[90px]">
                    <Link
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="group/btn relative font-body text-[13px] font-medium tracking-[1px] text-navy/80 uppercase flex items-center gap-1.5"
                    >
                      <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-gold-bright">
                        {item.label}
                      </span>
                      <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gold-bright transition-all duration-300 ease-out group-hover/btn:w-full" />
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:rotate-180 opacity-60">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                    
                    {/* Hover Dropdown Menu */}
                    <div className="absolute left-0 top-[70%] pt-4 opacity-0 translate-y-4 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto z-50">
                      <div className="w-64 bg-white border border-navy/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] p-2 flex flex-col gap-1 relative before:absolute before:-top-2 before:left-8 before:border-8 before:border-transparent before:border-b-white">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="font-body text-[12px] font-semibold uppercase tracking-[1px] text-navy/70 p-3 hover:bg-off-white hover:text-gold-bright transition-colors text-left flex items-center justify-between group/link"
                          >
                            <span>{child.label}</span>
                            <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0">
                              &rarr;
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="group/btn relative font-body text-[13px] font-medium tracking-[1px] text-navy/80 uppercase"
                  >
                    <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-gold-bright">
                      {item.label}
                    </span>
                    <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gold-bright transition-all duration-300 ease-out group-hover/btn:w-full" />
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/quote"
              className="group relative overflow-hidden bg-gold-bright px-7 py-3 font-display text-[14px] font-black uppercase tracking-button text-navy"
            >
              <span className="relative z-10 transition-transform duration-300 block group-hover:-translate-y-10">
                Get a Quote
              </span>
              <span className="absolute inset-x-0 top-10 z-10 flex h-full items-center justify-center transition-transform duration-300 group-hover:-translate-y-10">
                Let&apos;s Talk
              </span>
            </Link>
          </nav>

          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="relative z-50 inline-flex h-12 w-12 items-center justify-center lg:hidden"
          >
            <div className="flex flex-col gap-1.5">
              <m.span
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`block h-[2px] w-8 ${mobileOpen ? "bg-white" : "bg-navy"}`}
              />
              <m.span
                animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`block h-[2px] w-8 ${mobileOpen ? "bg-white" : "bg-navy"}`}
              />
              <m.span
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`block h-[2px] w-8 ${mobileOpen ? "bg-white" : "bg-navy"}`}
              />
            </div>
          </button>
        </div>
      </m.header>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0, y: "-10%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-10%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-navy pt-[90px] lg:hidden overflow-y-auto"
          >
            <div className="grain-overlay" />
            <div className="flex min-h-full flex-col px-6 relative z-10 pb-20 pt-10">
              {navLinks.map((item, index) => (
                <div key={item.label} className="border-b border-white/10">
                  {item.children ? (
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between py-4">
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            setMobileOpen(false);
                            handleLinkClick(e, item.href);
                          }}
                          className="font-display text-[clamp(2.5rem,10vw,4rem)] font-black uppercase tracking-tightest text-white transition-colors active:text-gold-bright"
                        >
                          {item.label}
                        </Link>
                        <button 
                          onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)} 
                          className="p-4 text-gold-bright"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`transition-transform duration-300 ${openDropdown === item.label ? "rotate-180" : ""}`}>
                            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <m.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-4 pb-6 pl-4 border-l-2 border-gold-bright/30 ml-2 mb-4">
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="font-display text-[18px] font-bold uppercase tracking-button text-white/70 hover:text-gold-bright"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <m.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: index * 0.08,
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          setMobileOpen(false);
                          handleLinkClick(e, item.href);
                        }}
                        className="block py-4 text-left font-display text-[clamp(2.5rem,10vw,4rem)] font-black uppercase tracking-tightest text-white transition-colors active:text-gold-bright"
                      >
                        {item.label}
                      </Link>
                    </m.div>
                  )}
                </div>
              ))}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-10"
              >
                <Link
                  href="/quote"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex bg-gold-bright px-8 py-5 font-display text-[18px] font-black uppercase tracking-button text-navy"
                >
                  Get a Quote
                </Link>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
