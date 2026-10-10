// Native <picture> + <img> is intentional: these pack assets are pre-encoded
// (already resized and compressed; see home-images.ts) and must be served
// as-is rather than re-processed by the /_next/image pipeline. The
// @next/next/no-img-element rule does not flag an <img> inside <picture>,
// so no lint exception is needed.
import type { ResponsiveAsset } from "./home-images";

type Props = {
  /** Pre-resolved asset. Server components pass homeImages[id]; client
   *  components receive the asset via props so the full data module stays
   *  out of the client bundle. */
  asset: ResponsiveAsset;
  /** Required: the image's actual rendered CSS width at each breakpoint. */
  sizes: string;
  alt?: string;
  className?: string;
  pictureClassName?: string;
  /** Set true only for the visible homepage hero/LCP candidate. */
  eager?: boolean;
  /** Largest variant offered to phones (viewports up to 639px). */
  mobileMaxWidth?: number;
};

// Phones report a 3x DPR, so a full-width image would otherwise pull the
// largest variant. ~2x is visually indistinguishable for photos at that size
// and roughly halves the bytes, which matters most for the LCP hero.
const MOBILE_QUERY = "(max-width: 639px)";

const srcSet = (variants: ResponsiveAsset["webp"]) =>
  variants.map((v) => `${v.src} ${v.width}w`).join(", ");

/**
 * Native <picture> renderer for the pre-encoded homepage image pack: an AVIF
 * source with width-descriptor srcSet plus a responsive WebP fallback. No
 * hooks, no browser-width detection, no loader service.
 */
export default function ResponsivePicture({
  asset,
  sizes,
  alt,
  className = "block h-auto w-full",
  pictureClassName = "block",
  eager = false,
  mobileMaxWidth = 768,
}: Props) {
  const fallback = asset.webp[asset.webp.length - 1];
  const capped = (variants: ResponsiveAsset["webp"]) => {
    const kept = variants.filter((v) => v.width <= mobileMaxWidth);
    return kept.length > 0 && kept.length < variants.length ? kept : null;
  };
  const mobileAvif = capped(asset.avif);
  const mobileWebp = capped(asset.webp);

  // Source order matters: the first <source> whose media and type both match
  // wins, so the phone AVIF set must precede the unrestricted one.
  return (
    <picture className={pictureClassName}>
      {mobileAvif && (
        <source type="image/avif" media={MOBILE_QUERY} srcSet={srcSet(mobileAvif)} sizes={sizes} />
      )}
      <source type="image/avif" srcSet={srcSet(asset.avif)} sizes={sizes} />
      {mobileWebp && (
        <source type="image/webp" media={MOBILE_QUERY} srcSet={srcSet(mobileWebp)} sizes={sizes} />
      )}
      <img
        src={fallback.src}
        srcSet={srcSet(asset.webp)}
        sizes={sizes}
        width={asset.width}
        height={asset.height}
        alt={alt ?? asset.alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        // Async decoding can push the LCP paint back a frame; keep it for
        // the lazy images only.
        decoding={eager ? undefined : "async"}
        draggable={false}
        className={className}
      />
    </picture>
  );
}
