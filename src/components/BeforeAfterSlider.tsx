"use client";

import { useRef, useState, useCallback } from "react";
import { m } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const DEFAULT_COMBINED_IMAGE = "/images/before-after.webp";

interface BeforeAfterSliderProps {
  beforeSrc?: string;
  afterSrc?: string;
  beforeAlt?: string;
  afterAlt?: string;
  title?: string;
  subtitle?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  title = "SEE WHAT'S POSSIBLE",
  subtitle = "Slide to reveal the difference between an outdated space and a premium Konntey execution. We turn potential into reality.",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDraggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Use RAF-throttled updates for smooth 60fps slider movement
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    if (rafRef.current) return; // skip if RAF already scheduled
    
    rafRef.current = requestAnimationFrame(() => {
      if (!containerRef.current) { rafRef.current = null; return; }
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
      rafRef.current = null;
    });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDraggingRef.current) handleMove(e.clientX);
  }, [handleMove]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isDraggingRef.current) handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const startDrag = useCallback((clientX: number) => {
    isDraggingRef.current = true;
    handleMove(clientX);
  }, [handleMove]);

  const stopDrag = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const isCombinedFallback = !beforeSrc || !afterSrc;

  return (
    <section className="bg-off-white py-20 text-navy sm:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright">
            THE TRANSFORMATION
          </div>
          <h2 className="mt-4 font-display text-[clamp(3.5rem,8vw,6rem)] font-black uppercase leading-[0.85] tracking-tightest">
            {title.split("WHAT'S").length === 2 ? (
              <>
                {title.split("WHAT'S")[0]}
                <span className="text-gold-bright text-transparent" style={{ WebkitTextStroke: "1px #d4a832" }}>WHAT&apos;S</span>
                {title.split("WHAT'S")[1]}
              </>
            ) : (
              title
            )}
          </h2>
          <p className="mt-6 font-body text-[16px] leading-[1.8] text-navy/90">
            {subtitle}
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div
            ref={containerRef}
            className="bracket-corners bracket-corners-extra relative h-[400px] w-full select-none overflow-hidden touch-none sm:h-[500px] lg:h-[700px] cursor-ew-resize parent-group"
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onTouchMove={handleTouchMove}
            onTouchEnd={stopDrag}
            onMouseDown={(e) => {
              startDrag(e.clientX);
            }}
            onTouchStart={(e) => {
              startDrag(e.touches[0].clientX);
            }}
          >
            {/* After Image — right half of composite */}
            <div className="absolute inset-0 overflow-hidden">
              {isCombinedFallback ? (
                // Composite fallback: render the right half via next/image (AVIF/webp
                // + srcset) instead of a raw CSS background. w-[200%] + object-fill
                // reproduces the previous background-size:200% 100% / position:right.
                <div className="absolute inset-y-0 right-0 w-[200%]">
                  <Image
                    src={DEFAULT_COMBINED_IMAGE}
                    alt={afterAlt}
                    fill
                    className="object-fill pointer-events-none"
                    sizes="(max-width: 1024px) 200vw, 2048px"
                    draggable={false}
                  />
                </div>
              ) : (
                afterSrc && (
                  <Image src={afterSrc} alt={afterAlt} fill className="object-cover object-center pointer-events-none" sizes="(max-width: 1024px) 100vw, 1024px" draggable={false} />
                )
              )}
              <div className="absolute bottom-6 right-6 z-10 border border-gold-bright bg-navy px-4 py-2 text-[12px] font-black uppercase tracking-button text-gold-bright">
                AFTER
              </div>
            </div>

            {/* Before Image (Clipped overlay) — left half of composite */}
            <div
              className="absolute inset-0 border-r-2 border-gold-bright overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              {isCombinedFallback ? (
                // Composite fallback: left half via next/image (mirrors the after side).
                <div className="absolute inset-y-0 left-0 w-[200%]">
                  <Image
                    src={DEFAULT_COMBINED_IMAGE}
                    alt={beforeAlt}
                    fill
                    className="object-fill pointer-events-none"
                    sizes="(max-width: 1024px) 200vw, 2048px"
                    draggable={false}
                  />
                </div>
              ) : (
                beforeSrc && (
                  <Image src={beforeSrc} alt={beforeAlt} fill className="object-cover object-center pointer-events-none" sizes="(max-width: 1024px) 100vw, 1024px" draggable={false} />
                )
              )}
              <div className="absolute bottom-6 left-6 z-10 border border-white/50 bg-black/50 px-4 py-2 text-[12px] font-black uppercase tracking-button text-white backdrop-blur-md">
                BEFORE
              </div>
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 z-20 flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
            >
              <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold-bright bg-navy text-gold-bright shadow-lg sm:h-16 sm:w-16 transition-transform duration-300">
                <div className="flex items-center justify-center gap-0.5 sm:gap-1">
                  <ChevronLeft size={16} strokeWidth={2.25} className="shrink-0 sm:h-[18px] sm:w-[18px]" />
                  <ChevronRight size={16} strokeWidth={2.25} className="shrink-0 sm:h-[18px] sm:w-[18px]" />
                </div>
              </div>
            </div>

            {/* Dynamic corner cuts */}
            <div className="corner-cut corner-cut-light-tl z-30" />
            <div className="corner-cut corner-cut-light-br z-30" />
          </div>
        </m.div>
      </div>
    </section>
  );
}
