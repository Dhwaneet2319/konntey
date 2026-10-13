/**
 * Registry of the site's images with their real pixel sizes and provenance.
 *
 * `provenance` controls how an image may be presented:
 * - "konntey-project": the owner has confirmed the photo shows a completed
 *   Konntey job and that the customer allows it to be shown. Only these
 *   images may sit under "our work", "real transformation" or project labels.
 * - "unverified": source not yet confirmed (stock, AI-generated or unknown).
 *   Use only as illustration, captioned as an example where the context
 *   could otherwise read as proof.
 *
 * OWNER: change a photo to "konntey-project" only once both facts are true.
 *
 * The homepage additionally renders a pre-encoded image pack
 * (src/components/home/home-images.ts, served from
 * public/images/konntey-home-v1/) through native <picture> markup. Those nine
 * images are AI-generated design inspiration, disclosed on /terms#imagery, and
 * are intentionally not registered here.
 */
export type ImageProvenance = "konntey-project" | "unverified";

export interface SiteImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  provenance: ImageProvenance;
}

const img = (
  src: string,
  width: number,
  height: number,
  alt: string,
  provenance: ImageProvenance = "unverified",
): SiteImage => ({ src, width, height, alt, provenance });

export const siteImages = {
  logo: img("/images/logo.png", 154, 112, "Konntey Home & Renovations logo", "konntey-project"),

  heroMain: img("/images/hero-main.webp", 1536, 1024, "Open-plan kitchen with navy cabinets, island bench and timber floors"),
  exteriorBeforeAfter: img("/images/before-after.webp", 1535, 1025, "Brick home before and after an exterior makeover"),
  extension: img("/images/extension.webp", 1024, 1024, "Glazed modern extension at the rear of a brick home"),
  kitchenFeature: img("/images/kitchen.webp", 1024, 1024, "Dark kitchen with marble island and pendant lights"),
  outdoor: img("/images/outdoor.webp", 1024, 1024, "Timber deck with a slatted pergola and outdoor seating"),
  interior: img("/images/interior.webp", 1024, 1024, "White-painted hallway with timber floors"),

  kitchenHero: img("/images/kitchen/hero.webp", 1448, 1086, "White kitchen with subway tile splashback and stone benchtops"),
  kitchenBefore: img("/images/kitchen/before.webp", 1448, 1086, "Dated U-shaped kitchen with dark timber cabinets"),
  kitchenAfter: img("/images/kitchen/after.webp", 1448, 1086, "The same U-shaped kitchen with white cabinets and subway tiles"),
  kitchenCabinets: img("/images/kitchen/cabinets.webp", 1448, 1086, "White kitchen drawers and cupboards with bar handles"),
  kitchenBenchtop: img("/images/kitchen/benchtop.webp", 1448, 1086, "Stone benchtop with an undermount double sink"),
  kitchenOpenPlan: img("/images/kitchen/open-plan.webp", 1448, 1086, "Open-plan kitchen with island bench and dining table"),
  kitchenSplashback: img("/images/kitchen/splashback.webp", 1448, 1086, "Subway tile splashback behind a gas cooktop"),
  kitchenTiler: img("/images/kitchen/tiler-working.webp", 1536, 1024, "Tiler setting a kitchen splashback"),

  bathroomHero: img("/images/bathroom/hero.webp", 1448, 1086, "Bathroom with frameless shower, niche and wall-hung vanity"),
  bathroomBefore: img("/images/bathroom/before.webp", 1086, 1448, "Dated bathroom with cream tiles, gold-framed shower and bath"),
  bathroomAfter: img("/images/bathroom/after.webp", 1086, 1448, "The same bathroom retiled in white with a new vanity"),
  bathroomShower: img("/images/bathroom/shower.webp", 1086, 1448, "Frameless glass shower with a tiled niche"),
  bathroomVanity: img("/images/bathroom/vanity.webp", 1086, 1448, "White vanity with mirror"),
  bathroomEnsuite: img("/images/bathroom/small-ensuite.webp", 1086, 1448, "Compact ensuite with shower, vanity and toilet"),
  bathroomTiler: img("/images/bathroom/tiler-working.webp", 1086, 1448, "Tiler laying large-format wall tiles in a shower"),

  // New home builds. AI-generated example images (disclosed on /terms#imagery).
  // They stay "unverified", so the gallery labels them as example images and
  // never as Konntey projects. Replace with real job photos when available.
  newHomeHero: img("/images/new-homes/hero.webp", 1448, 1086, "Newly built single-storey brick home with a double garage and fresh front landscaping"),
  newHomeFacade: img("/images/new-homes/facade.webp", 1086, 1448, "Front of a new double-storey home with rendered upper level and timber entry door"),
  newHomeLiving: img("/images/new-homes/kitchen-living.webp", 1086, 1448, "Open-plan kitchen and living area in a newly built home with stone island bench"),
  newHomeFrame: img("/images/new-homes/frame.webp", 1086, 1448, "Timber wall and roof frame of a new home under construction on a concrete slab"),
  newHomeAlfresco: img("/images/new-homes/alfresco.webp", 1086, 1448, "Covered alfresco area at the back of a new home opening onto a small lawn"),

  socialDefault: img("/images/social/konntey-default.png", 1200, 630, "Konntey Home & Renovations: home renovations and extensions across Melbourne's west and southeast", "konntey-project"),
  socialKitchen: img("/images/social/kitchen.png", 1200, 630, "Konntey Home & Renovations: kitchen renovations in Melbourne", "konntey-project"),
  socialBathroom: img("/images/social/bathroom.png", 1200, 630, "Konntey Home & Renovations: bathroom renovations in Melbourne", "konntey-project"),
  socialExtensions: img("/images/social/extensions.png", 1200, 630, "Konntey Home & Renovations: home extensions in Melbourne", "konntey-project"),
  socialDecks: img("/images/social/decks.png", 1200, 630, "Konntey Home & Renovations: decks and pergolas in Melbourne", "konntey-project"),
  socialPainting: img("/images/social/painting.png", 1200, 630, "Konntey Home & Renovations: interior and exterior painting in Melbourne", "konntey-project"),
  socialVastu: img("/images/social/vastu.png", 1200, 630, "Konntey Home & Renovations: Vastu-aligned renovations in Melbourne", "konntey-project"),
  socialNewHomes: img("/images/social/new-homes.png", 1200, 630, "Konntey Home & Renovations: new home builds in Melbourne", "konntey-project"),
} satisfies Record<string, SiteImage>;

export type SiteImageKey = keyof typeof siteImages;

export function isVerifiedWork(...images: SiteImage[]): boolean {
  return images.length > 0 && images.every((i) => i.provenance === "konntey-project");
}
