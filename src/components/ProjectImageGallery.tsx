"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { track } from "@/lib/analytics";
import type { ProjectImage } from "@/content/projects";

const typeLabels: Record<ProjectImage["type"], string> = {
  before: "Before",
  after: "After",
  during: "During the build",
  detail: "Detail",
  hero: "Completed",
};

/**
 * Accessible, keyboard-navigable project gallery. One image is shown at a
 * time with its caption; thumbnails are real buttons with descriptive
 * accessible names. Only the active image loads at display size — the rest
 * are lazy thumbnails, so the full-resolution set never loads on first paint.
 */
export default function ProjectImageGallery({
  images,
  projectSlug,
}: {
  images: ProjectImage[];
  projectSlug: string;
}) {
  const [index, setIndex] = useState(0);
  if (images.length === 0) return null;

  const current = images[index];

  function goTo(next: number) {
    const bounded = (next + images.length) % images.length;
    setIndex(bounded);
    track("project_gallery_interaction", { project_slug: projectSlug });
  }

  return (
    <figure aria-label="Project photo gallery">
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-navy/10 bg-navy/5">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
          loading="lazy"
        />
        <span className="absolute left-4 top-4 bg-navy/85 px-3 py-1.5 font-display text-[12px] font-black uppercase tracking-button text-gold-bright">
          {typeLabels[current.type]}
        </span>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-navy/80 p-2.5 text-white transition-colors hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-bright"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-navy/80 p-2.5 text-white transition-colors hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-bright"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </>
        )}
      </div>
      <figcaption className="mt-3 font-body text-[14px] leading-[1.6] text-navy/70">
        {current.caption ?? current.alt}
        {images.length > 1 && (
          <span className="text-navy/50">
            {" "}
            — photo {index + 1} of {images.length}
          </span>
        )}
      </figcaption>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6" role="group" aria-label="Choose a photo">
          {images.map((img, i) => (
            <button
              key={img.src + i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show photo ${i + 1}: ${typeLabels[img.type]}`}
              aria-current={i === index ? "true" : undefined}
              className={`relative aspect-square overflow-hidden border-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-bright ${
                i === index ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </figure>
  );
}
