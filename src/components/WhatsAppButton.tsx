"use client";

import { useState, useEffect, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";

const PHONE = "61493191798";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowTooltip(true), 2500);
    const hideTimer = setTimeout(() => setShowTooltip(false), 7000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const dismissTooltip = useCallback(() => setShowTooltip(false), []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence mode="wait">
        {showTooltip && (
          <m.div
            key="tooltip"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.25 }}
            className="relative whitespace-nowrap bg-navy border border-gold-bright/20 px-4 py-2.5 shadow-lg shadow-black/20 cursor-pointer"
            onClick={dismissTooltip}
          >
            <span className="font-display text-[13px] font-bold uppercase tracking-button text-gold-bright">
              Click here to contact us
            </span>
            <div className="absolute -bottom-[6px] right-5 h-3 w-3 rotate-45 border-b border-r border-gold-bright/20 bg-navy" />
          </m.div>
        )}
      </AnimatePresence>

      <a
        href={`https://wa.me/${PHONE}?text=Hi%20Konntey%2C%20I%27d%20like%20to%20discuss%20a%20renovation%20project.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="text-gold-bright drop-shadow-lg transition-transform duration-300 hover:scale-110 hover:text-gold animate-fade-in-up"
      >
        <svg viewBox="0 0 32 32" fill="currentColor" className="h-12 w-12 sm:h-14 sm:w-14">
          <path d="M16.004 2.002c-7.732 0-14.002 6.27-14.002 14.002 0 2.468.654 4.876 1.896 6.994L2 30l7.176-1.878A13.94 13.94 0 0016.004 30c7.73 0 14-6.268 14-14s-6.27-13.998-14-13.998zm0 25.618a11.58 11.58 0 01-5.908-1.618l-.424-.252-4.394 1.152 1.174-4.286-.276-.44a11.58 11.58 0 01-1.778-6.172c0-6.408 5.216-11.622 11.626-11.622 6.408 0 11.622 5.214 11.622 11.622 0 6.41-5.234 11.616-11.642 11.616zm6.374-8.704c-.35-.174-2.07-1.022-2.39-1.138-.32-.118-.554-.174-.786.174-.234.35-.904 1.138-1.108 1.372-.204.234-.408.264-.758.088-.35-.174-1.476-.544-2.812-1.734-1.04-.926-1.742-2.07-1.946-2.42-.204-.35-.022-.538.154-.712.158-.156.35-.408.524-.612.176-.204.234-.35.352-.584.118-.234.058-.438-.03-.612-.088-.176-.786-1.896-1.078-2.596-.284-.68-.572-.588-.786-.598l-.67-.012c-.234 0-.612.088-.932.438-.32.35-1.224 1.196-1.224 2.916s1.254 3.382 1.428 3.616c.176.234 2.466 3.764 5.976 5.278.836.36 1.488.576 1.996.738.838.266 1.602.228 2.204.138.672-.1 2.07-.846 2.362-1.662.292-.818.292-1.518.204-1.664-.088-.146-.32-.234-.67-.408z" />
        </svg>
      </a>
    </div>
  );
}
