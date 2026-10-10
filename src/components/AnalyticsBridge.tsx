"use client";

import { useEffect } from "react";
import { track, pageContext } from "@/lib/analytics";

/**
 * Sitewide click delegation for phone and WhatsApp links, mounted once in
 * the root layout. Adds page context from the URL and the nearest
 * data-placement attribute (e.g. "hero", "mobile_bar"). No PII is collected.
 */
export default function AnalyticsBridge() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const isPhone = href.startsWith("tel:");
      const isWhatsApp = href.includes("wa.me/") || href.includes("api.whatsapp.com");
      if (!isPhone && !isWhatsApp) return;
      const placement =
        anchor.closest<HTMLElement>("[data-placement]")?.dataset.placement?.replace(/-/g, "_");
      track(isPhone ? "phone_click" : "whatsapp_click", {
        ...pageContext(window.location.pathname),
        placement,
      });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
