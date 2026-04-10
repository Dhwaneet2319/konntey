"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

function smoothScrollTo(hash: string) {
  if (!hash || hash === "#") return;
  const el = document.querySelector(hash);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <>
      <motion.header
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-light h-[70px]" : "bg-transparent h-[90px]"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3 overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="Konntey Home & Renovations logo"
              width={44}
              height={44}
              className="h-9 w-auto sm:h-11 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex items-center gap-1.5">
              <motion.span
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="font-display text-[22px] sm:text-[26px] font-black tracking-tighter text-navy"
              >
                KONNTEY
              </motion.span>
              <motion.span
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="font-display text-[17px] sm:text-[20px] font-black tracking-tighter text-gold-bright transition-transform duration-300 group-hover:translate-x-1"
              >
                H&R
              </motion.span>
            </div>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => smoothScrollTo(item.href)}
                className="group relative font-body text-[13px] font-medium tracking-[1px] text-navy/80 uppercase"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-gold-bright">
                  {item.label}
                </span>
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gold-bright transition-all duration-300 ease-out group-hover:w-full" />
              </button>
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
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`block h-[2px] w-8 ${mobileOpen ? "bg-white" : "bg-navy"}`}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`block h-[2px] w-8 ${mobileOpen ? "bg-white" : "bg-navy"}`}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`block h-[2px] w-8 ${mobileOpen ? "bg-white" : "bg-navy"}`}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-10%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-10%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-navy pt-[90px] lg:hidden"
          >
            <div className="grain-overlay" />
            <div className="flex h-full flex-col justify-center px-6 relative z-10">
              {navLinks.map((item, index) => (
                <div key={item.label} className="overflow-hidden border-b border-white/10">
                  <motion.button
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => {
                      setMobileOpen(false);
                      setTimeout(() => smoothScrollTo(item.href), 300);
                    }}
                    className="py-4 text-left font-display text-[clamp(4rem,14vw,8rem)] font-black uppercase tracking-tightest text-white transition-colors hover:text-gold-bright"
                  >
                    {item.label}
                  </motion.button>
                </div>
              ))}
              <motion.div
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
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
