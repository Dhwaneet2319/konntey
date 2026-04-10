"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const serviceAreas = [
  "Tarneit", "Truganina", "Werribee", "Hoppers Crossing", "Point Cook",
  "Wyndham Vale", "Manor Lakes", "Williams Landing", "Laverton",
  "Dandenong", "Cranbourne", "Frankston", "Narre Warren", "Berwick",
  "Springvale", "Pakenham", "Officer", "Clyde", "Melton",
];

export default function Footer() {
  const [toast, setToast] = useState(false);

  const handleSocialClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <footer className="border-t border-white/10 bg-navy-light relative text-white">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 border border-gold-bright/20 bg-navy px-6 py-3 shadow-lg shadow-black/30"
          >
            <span className="font-display text-[13px] font-bold uppercase tracking-button text-gold-bright">
              Socials coming soon — stay tuned!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-display text-[22px] font-black uppercase tracking-tighter text-white">
              KONNTEY <span className="text-gold-bright">H&R</span>
            </div>
            <p className="mt-4 font-body text-[14px] leading-relaxed text-white/75">
              Melbourne&apos;s trusted renovation company. Licensed builders delivering affordable kitchen renovations, bathroom renos, home extensions, decks & interior finishing.
            </p>
            <div className="mt-4 flex items-center gap-2 font-body text-[12px] uppercase tracking-kicker text-gold-bright">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
              Licensed & Insured — VIC
            </div>
            <div className="mt-2 font-body text-[12px] uppercase tracking-kicker text-white/70">
              ABN 64 684 703 972
            </div>
          </div>

          <div>
            <div className="font-display text-[14px] font-black uppercase tracking-button text-gold-bright mb-4">
              Our Services
            </div>
            <ul className="space-y-2 font-body text-[14px] text-white/75">
              <li>Kitchen Renovation Melbourne</li>
              <li>Bathroom Renovation Melbourne</li>
              <li>Home Extensions & New Builds</li>
              <li>Deck & Pergola Installation</li>
              <li>Interior Painting & Finishing</li>
              <li>Full Home Renovation</li>
            </ul>
          </div>

          <div>
            <div className="font-display text-[14px] font-black uppercase tracking-button text-gold-bright mb-4">
              Contact Us
            </div>
            <ul className="space-y-2 font-body text-[14px] text-white/75">
              <li>Melbourne, VIC</li>
              <li>0493 191 798</li>
              <li>info@konnteyhomerenovations.com.au</li>
              <li className="pt-2">Mon–Fri 7am–5pm</li>
              <li>Sat by appointment</li>
            </ul>
          </div>

          <div>
            <div className="font-display text-[14px] font-black uppercase tracking-button text-gold-bright mb-4">
              Quick Links
            </div>
            <ul className="space-y-2 font-body text-[14px] text-white/75">
              <li><a href="#hero" className="transition-colors hover:text-gold-bright">Home</a></li>
              <li><a href="#services" className="transition-colors hover:text-gold-bright">Services</a></li>
              <li><a href="#about" className="transition-colors hover:text-gold-bright">About Us</a></li>
              <li><a href="#contact" className="transition-colors hover:text-gold-bright">Contact</a></li>
              <li><a href="/quote" className="transition-colors hover:text-gold-bright">Free Quote</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="font-display text-[13px] font-black uppercase tracking-button text-white/40 mb-4">
            Proudly Servicing Melbourne&apos;s West & Southeast
          </div>
          <p className="font-body text-[13px] leading-relaxed text-white/30">
            {serviceAreas.map((suburb, i) => {
              const slug = suburb.toLowerCase().replace(/\s+/g, "-");
              return (
                <span key={suburb}>
                  <Link href={`/renovations/${slug}`} className="transition-colors duration-150 hover:text-gold-bright">
                    {suburb} renovation builders
                  </Link>
                  {i < serviceAreas.length - 1 ? " · " : ""}
                </span>
              );
            })}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-[13px] text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} Konntey Home & Renovations. Melbourne, VIC. Built by{" "}
            <a
              href="https://dhwaneet.codes"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-gold-bright"
            >
              dhwaneet
            </a>
            .
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors duration-150 hover:text-gold-bright">Privacy</Link>
            <Link href="/terms" className="transition-colors duration-150 hover:text-gold-bright">Terms</Link>
            <button onClick={handleSocialClick} className="transition-colors duration-150 hover:text-gold-bright">IG</button>
            <button onClick={handleSocialClick} className="transition-colors duration-150 hover:text-gold-bright">FB</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
