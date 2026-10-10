import ResponsivePicture from "./ResponsivePicture";
import { homeImages, type HomeImageId } from "./home-images";

type Props = {
  image: HomeImageId;
  /** Required: the image's actual rendered CSS width at each breakpoint. */
  sizes: string;
  alt?: string;
  className?: string;
  pictureClassName?: string;
  /** Set true only for the visible homepage hero/LCP candidate. */
  eager?: boolean;
};

/**
 * Resolves a homepage image-pack id to its pre-encoded asset and renders it
 * with native <picture> markup (AVIF source + responsive WebP fallback).
 *
 * Server components only: importing this file also imports the full
 * home-images data module. Client Components should render ResponsivePicture
 * directly with an asset passed in via props (see BeforeAfterSlider).
 */
export default function ResponsiveHomeImage({ image, ...rest }: Props) {
  return <ResponsivePicture asset={homeImages[image]} {...rest} />;
}
