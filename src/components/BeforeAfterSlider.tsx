"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ResponsivePicture from "@/components/home/ResponsivePicture";
import type { ResponsiveAsset } from "@/components/home/home-images";
import type { SiteImage } from "@/content/images";
import { track } from "@/lib/analytics";

/**
 * A comparison layer: either a registry SiteImage (rendered through the
 * Next.js Image pipeline, as on service pages) or a pre-encoded pack asset
 * (rendered through native <picture> markup; see ResponsivePicture).
 */
export type ComparisonImage = SiteImage | ResponsiveAsset;

const isPackImage = (image: ComparisonImage): image is ResponsiveAsset => "avif" in image;

/**
 * Before/after comparison. Pointer drag (touch keeps vertical page scroll),
 * a visually hidden range input for keyboard and assistive tech, and preset
 * buttons. Height follows the photos' own aspect ratio.
 *
 * Pack assets are AI-generated design concepts, disclosed on /terms#imagery.
 * They are never treated as verified Konntey work.
 */
export default function BeforeAfterSlider({
  before,
  after,
  placement,
  sizes = "(max-width: 1024px) 100vw, 960px",
}: {
  before: ComparisonImage;
  after: ComparisonImage;
  /** Analytics placement, e.g. "home_proof" or "service_kitchen". */
  placement: string;
  sizes?: string;
}) {
  const [position, setPosition] = useState(50);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const activePointer = useRef<number | null>(null);
  const interacted = useRef(false);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const noteInteraction = useCallback(() => {
    if (interacted.current) return;
    interacted.current = true;
    track("project_gallery_interaction", { placement, interaction: "before_after" });
  }, [placement]);

  const moveTo = useCallback((clientX: number) => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setPosition((x / rect.width) * 100);
    });
  }, []);

  // touch-action: pan-y keeps vertical scrolling native; touch and pen don't
  // jump on pointerdown, so starting a scroll never moves the divider.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    activePointer.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
    if (e.pointerType === "mouse") moveTo(e.clientX);
    noteInteraction();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointer.current !== e.pointerId) return;
    moveTo(e.clientX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointer.current !== e.pointerId) return;
    activePointer.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const rounded = Math.round(position);
  const portrait = before.height > before.width;

  return (
    <figure className={`mx-auto w-full ${portrait ? "max-w-[520px]" : "max-w-[960px]"}`}>
      <div
        ref={containerRef}
        className="relative w-full cursor-ew-resize touch-pan-y select-none overflow-hidden bg-navy/5"
        style={{ aspectRatio: `${before.width} / ${before.height}` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
      >
        {isPackImage(after) ? (
          <ResponsivePicture
            asset={after}
            sizes={sizes}
            alt={after.alt}
            pictureClassName="pointer-events-none absolute inset-0 block"
            className="block h-full w-full object-cover"
          />
        ) : (
          <Image
            src={after.src}
            alt={after.alt}
            fill
            sizes={sizes}
            draggable={false}
            className="pointer-events-none object-cover"
          />
        )}
        <span className="absolute bottom-4 right-4 z-10 bg-navy px-3 py-1.5 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-gold-bright">
          After
        </span>

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          {isPackImage(before) ? (
            <ResponsivePicture
              asset={before}
              sizes={sizes}
              alt={before.alt}
              pictureClassName="pointer-events-none absolute inset-0 block"
              className="block h-full w-full object-cover"
            />
          ) : (
            <Image
              src={before.src}
              alt={before.alt}
              fill
              sizes={sizes}
              draggable={false}
              className="pointer-events-none object-cover"
            />
          )}
          <span className="absolute bottom-4 left-4 z-10 bg-white/90 px-3 py-1.5 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-navy">
            Before
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={rounded}
          onChange={(e) => {
            setPosition(Number(e.target.value));
            noteInteraction();
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-label="Before and after comparison. Use the arrow keys to show more of the before or after photo."
          aria-valuetext={`${rounded}% of the before photo shown`}
          className="sr-only"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-20 flex items-center"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_8px_rgba(0,0,0,0.35)]" />
          <div
            className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold-bright bg-navy text-gold-bright shadow-lg transition-transform duration-hover ease-brand ${
              focused ? "scale-110 ring-4 ring-white ring-offset-2 ring-offset-navy" : ""
            }`}
          >
            <ChevronLeft size={15} strokeWidth={2.5} className="-mr-0.5" />
            <ChevronRight size={15} strokeWidth={2.5} className="-ml-0.5" />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {[
          { label: "Before", value: 100 },
          { label: "Half and half", value: 50 },
          { label: "After", value: 0 },
        ].map((b) => (
          <button
            key={b.label}
            type="button"
            onClick={() => {
              setPosition(b.value);
              noteInteraction();
            }}
            aria-pressed={rounded === b.value}
            className="min-h-[44px] border border-navy/20 px-4 font-body text-[14px] font-semibold text-navy transition-colors duration-hover ease-brand hover:border-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep aria-pressed:border-navy aria-pressed:bg-navy aria-pressed:text-white"
          >
            {b.label}
          </button>
        ))}
      </div>
    </figure>
  );
}
