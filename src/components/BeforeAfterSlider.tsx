"use client";

import { useRef, useState, useCallback, useEffect } from "react";
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
  /** Optional anchor id so other pages can link straight to the comparison. */
  id?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Room before renovation",
  afterAlt = "Room after renovation",
  title = "SEE WHAT'S POSSIBLE",
  subtitle = "Slide to reveal the difference between an outdated space and a premium Konntey execution. We turn potential into reality.",
  id,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [rangeFocused, setRangeFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const activePointerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const moveTo = useCallback((clientX: number) => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setSliderPosition((x / rect.width) * 100);
    });
  }, []);

  // touch-action: pan-y lets the page scroll vertically over the image; the
  // browser only hands us the pointer for horizontal drags. Touch/pen don't
  // jump on pointerdown so a vertical scroll never moves the divider.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    activePointerRef.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
    if (e.pointerType === "mouse") moveTo(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerRef.current !== e.pointerId) return;
    moveTo(e.clientX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerRef.current !== e.pointerId) return;
    activePointerRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const isCombinedFallback = !beforeSrc || !afterSrc;
  const rounded = Math.round(sliderPosition);

  return (
    <section id={id} className="bg-off-white py-20 text-navy sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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

        <div className="mx-auto mt-16 max-w-5xl">
          <div
            ref={containerRef}
            className="bracket-corners bracket-corners-extra relative h-[400px] w-full select-none overflow-hidden touch-pan-y sm:h-[500px] lg:h-[700px] cursor-ew-resize parent-group"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onLostPointerCapture={endDrag}
          >
            {/* After Image — right half of composite */}
            <div className="absolute inset-0 overflow-hidden">
              {isCombinedFallback ? (
                // Composite fallback: w-[200%] + object-fill shows the right half
                // of the combined image, so it genuinely renders at ~200vw on mobile.
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

            {/* Keyboard / assistive-tech control. Visually hidden; the handle
                shows its focus ring. */}
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={rounded}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              onFocus={() => setRangeFocused(true)}
              onBlur={() => setRangeFocused(false)}
              aria-label="Before and after comparison — use arrow keys to reveal more of the before or after photo"
              aria-valuetext={`${rounded}% of the before photo shown`}
              className="sr-only"
            />

            {/* Slider Handle */}
            <div
              aria-hidden="true"
              className="absolute top-0 bottom-0 z-20 flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
            >
              <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
              <div
                className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold-bright bg-navy text-gold-bright shadow-lg sm:h-16 sm:w-16 ${
                  rangeFocused ? "ring-4 ring-white ring-offset-2 ring-offset-navy" : ""
                }`}
              >
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

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              { label: "Show before", value: 100 },
              { label: "50 / 50", value: 50 },
              { label: "Show after", value: 0 },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                onClick={() => setSliderPosition(b.value)}
                aria-pressed={rounded === b.value}
                className="border-2 border-navy/20 px-5 py-3 font-display text-[13px] font-black uppercase tracking-button text-navy transition-colors duration-150 hover:border-gold-bright hover:text-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright aria-pressed:border-navy aria-pressed:bg-navy aria-pressed:text-gold-bright"
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
