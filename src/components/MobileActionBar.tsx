"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { business } from "@/content/business";

/**
 * Mobile-only Call / Quote bar. Appears once the page's hero CTAs
 * ([data-hero-ctas]) have scrolled out of view, and hides while a form or the
 * footer is on screen or a field has focus (on-screen keyboard). Pages
 * without hero CTAs never show it. Sets html[data-mobile-bar] so the floating
 * WhatsApp button can move clear of it.
 */
export default function MobileActionBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ctas = document.querySelector("[data-hero-ctas]");
    if (!ctas || !("IntersectionObserver" in window)) return;

    let pastHero = false;
    let typing = false;
    const blockers = new Set<Element>();
    const update = () => setVisible(pastHero && !typing && blockers.size === 0);

    const heroObserver = new IntersectionObserver(([entry]) => {
      pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      update();
    });
    heroObserver.observe(ctas);

    const blockObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) blockers.add(entry.target);
        else blockers.delete(entry.target);
      }
      update();
    });
    document.querySelectorAll("main form, footer").forEach((el) => blockObserver.observe(el));

    const isField = (el: EventTarget | null) =>
      el instanceof HTMLElement && el.matches("input, textarea, select, [contenteditable]");
    const onFocusIn = (e: FocusEvent) => {
      typing = isField(e.target);
      document.documentElement.toggleAttribute("data-typing", typing);
      update();
    };
    const onFocusOut = () => {
      typing = false;
      document.documentElement.removeAttribute("data-typing");
      update();
    };
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);

    return () => {
      heroObserver.disconnect();
      blockObserver.disconnect();
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      document.documentElement.removeAttribute("data-typing");
      setVisible(false);
    };
  }, [pathname]);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-mobile-bar", visible);
  }, [visible]);

  return (
    <div
      inert={!visible}
      data-placement="mobile_bar"
      style={{
        visibility: visible ? "visible" : "hidden",
        transition: `transform 200ms var(--motion-ease), visibility 0s linear ${visible ? "0s" : "200ms"}`,
      }}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-white/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a
          href={`tel:${business.phoneE164}`}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-navy/25 font-body text-[16px] font-semibold text-navy"
        >
          <Phone aria-hidden="true" size={17} />
          Call
        </a>
        <Link
          href="/quote"
          className="inline-flex min-h-[48px] items-center justify-center bg-gold-bright font-body text-[16px] font-semibold text-navy"
        >
          Get a free quote
        </Link>
      </div>
    </div>
  );
}
