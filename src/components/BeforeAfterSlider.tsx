"use client";

import { useRef, useState } from "react";
import { m } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const COMBINED_IMAGE = "/images/before-after.webp";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  return (
    <section className="bg-off-white py-20 text-navy sm:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright">
            THE TRANSFORMATION
          </div>
          <h2 className="mt-4 font-display text-[clamp(3.5rem,8vw,6rem)] font-black uppercase leading-[0.85] tracking-tightest">
            SEE <span className="text-gold-bright text-transparent" style={{ WebkitTextStroke: "1px #d4a832" }}>WHAT&apos;S</span> POSSIBLE
          </h2>
          <p className="mt-6 font-body text-[16px] leading-[1.8] text-navy/90">
            Slide to reveal the difference between an outdated space and a premium Konntey execution. 
            We turn potential into reality.
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div
            ref={containerRef}
            className="bracket-corners bracket-corners-extra relative h-[400px] w-full select-none overflow-hidden touch-none sm:h-[500px] lg:h-[700px] cursor-ew-resize parent-group"
            onMouseMove={handleMouseMove}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setIsDragging(false)}
            onMouseDown={(e) => {
              setIsDragging(true);
              handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              handleMove(e.touches[0].clientX);
            }}
          >
            {/* After Image (Background) — right half of composite */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${COMBINED_IMAGE})`,
                backgroundSize: "200% 100%",
                backgroundPosition: "right center",
              }}
            >
              <div className="absolute bottom-6 right-6 z-0 border border-gold-bright bg-navy px-4 py-2 text-[12px] font-black uppercase tracking-button text-gold-bright">
                AFTER
              </div>
            </div>

            {/* Before Image (Clipped overlay) — left half of composite */}
            <div
              className="absolute inset-0 border-r-2 border-gold-bright"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                backgroundImage: `url(${COMBINED_IMAGE})`,
                backgroundSize: "200% 100%",
                backgroundPosition: "left center",
              }}
            >
              <div className="absolute bottom-6 left-6 z-0 border border-white/50 bg-black/50 px-4 py-2 text-[12px] font-black uppercase tracking-button text-white backdrop-blur-md">
                BEFORE
              </div>
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 z-20 flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold-bright bg-navy text-gold-bright shadow-lg sm:h-16 sm:w-16 transition-transform duration-300">
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
