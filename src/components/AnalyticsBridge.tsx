"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track, pageContext } from "@/lib/analytics";

/**
 * Sitewide, vendor-neutral click delegation for phone and WhatsApp links.
 * Mounted once in the root layout so every tel:/wa.me link is tracked with
 * page context, without touching individual pages. No PII is collected —
 * only page type and service/suburb context derived from the URL.
 */
export default function AnalyticsBridge() {
  const pathname = usePathname();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const ctx = pageContext(window.location.pathname);
      if (href.startsWith("tel:")) {
        track("phone_click", ctx);
      } else if (href.includes("wa.me/") || href.includes("api.whatsapp.com")) {
        track("whatsapp_click", ctx);
      }
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [pathname]);

  return null;
}
