// Pre-encoded responsive homepage images (the "konntey-home-v1" pack).
//
// All nine images are AI-generated design inspiration. They are NOT photos of
// real Konntey projects, customers' homes or verified work, and must never be
// presented as such. The AI-imagery disclosure lives on the terms page
// (/terms#imagery); do not present these as completed work.
//
// Files live in public/images/konntey-home-v1/ with a short content hash in
// each name, so they can be replaced under long-lived caching without URL
// collisions. Filenames and paths must stay intact; regenerate the hash if
// bytes ever change.
//
// The variants are already resized and compressed (AVIF q45-52, WebP q72), so
// they are served directly through native <picture> markup — see
// ResponsiveHomeImage.tsx. Do not route these URLs through /_next/image.

export interface ResponsiveVariant {
  src: string;
  width: number;
}

export interface ResponsiveAsset {
  alt: string;
  /** Intrinsic pixel size of the largest variant. */
  width: number;
  height: number;
  avif: readonly ResponsiveVariant[];
  webp: readonly ResponsiveVariant[];
}

export const homeImages = {
  "hero-living-room": {
    "alt": "AI-generated design inspiration: a naturally lit living and dining room with oak flooring.",
    "width": 1122,
    "height": 1402,
    "avif": [
      {
        "src": "/images/konntey-home-v1/hero-living-room-480w-bcdd1f64.avif",
        "width": 480
      },
      {
        "src": "/images/konntey-home-v1/hero-living-room-768w-84d48e8f.avif",
        "width": 768
      },
      {
        "src": "/images/konntey-home-v1/hero-living-room-1122w-3f75db06.avif",
        "width": 1122
      }
    ],
    "webp": [
      {
        "src": "/images/konntey-home-v1/hero-living-room-480w-c0da27d7.webp",
        "width": 480
      },
      {
        "src": "/images/konntey-home-v1/hero-living-room-768w-fedeb45e.webp",
        "width": 768
      },
      {
        "src": "/images/konntey-home-v1/hero-living-room-1122w-8a2d96a1.webp",
        "width": 1122
      }
    ]
  },
  "home-extension": {
    "alt": "AI-generated design inspiration: a white-clad rear extension beside a brick home.",
    "width": 1536,
    "height": 1024,
    "avif": [
      {
        "src": "/images/konntey-home-v1/home-extension-480w-cc187c1c.avif",
        "width": 480
      },
      {
        "src": "/images/konntey-home-v1/home-extension-768w-7a926a6f.avif",
        "width": 768
      },
      {
        "src": "/images/konntey-home-v1/home-extension-1152w-407ae668.avif",
        "width": 1152
      },
      {
        "src": "/images/konntey-home-v1/home-extension-1536w-d856a031.avif",
        "width": 1536
      }
    ],
    "webp": [
      {
        "src": "/images/konntey-home-v1/home-extension-480w-bd3b65a2.webp",
        "width": 480
      },
      {
        "src": "/images/konntey-home-v1/home-extension-768w-cba9d6f5.webp",
        "width": 768
      },
      {
        "src": "/images/konntey-home-v1/home-extension-1152w-3e62d993.webp",
        "width": 1152
      },
      {
        "src": "/images/konntey-home-v1/home-extension-1536w-b5318c76.webp",
        "width": 1536
      }
    ]
  },
  "deck-and-pergola": {
    "alt": "AI-generated design inspiration: a timber deck and covered pergola in a suburban backyard.",
    "width": 1536,
    "height": 1024,
    "avif": [
      {
        "src": "/images/konntey-home-v1/deck-and-pergola-480w-6aabcc65.avif",
        "width": 480
      },
      {
        "src": "/images/konntey-home-v1/deck-and-pergola-768w-0befe33b.avif",
        "width": 768
      },
      {
        "src": "/images/konntey-home-v1/deck-and-pergola-1152w-80635bf5.avif",
        "width": 1152
      },
      {
        "src": "/images/konntey-home-v1/deck-and-pergola-1536w-98125dde.avif",
        "width": 1536
      }
    ],
    "webp": [
      {
        "src": "/images/konntey-home-v1/deck-and-pergola-480w-23c966a2.webp",
        "width": 480
      },
      {
        "src": "/images/konntey-home-v1/deck-and-pergola-768w-15167ba9.webp",
        "width": 768
      },
      {
        "src": "/images/konntey-home-v1/deck-and-pergola-1152w-0f0dce3d.webp",
        "width": 1152
      },
      {
        "src": "/images/konntey-home-v1/deck-and-pergola-1536w-57bc99f6.webp",
        "width": 1536
      }
    ]
  },
  "painted-interior": {
    "alt": "AI-generated design inspiration: a warm-white room with simple timber furniture.",
    "width": 1536,
    "height": 1024,
    "avif": [
      {
        "src": "/images/konntey-home-v1/painted-interior-480w-a25face2.avif",
        "width": 480
      },
      {
        "src": "/images/konntey-home-v1/painted-interior-768w-00da7e77.avif",
        "width": 768
      },
      {
        "src": "/images/konntey-home-v1/painted-interior-1152w-aa6b8484.avif",
        "width": 1152
      },
      {
        "src": "/images/konntey-home-v1/painted-interior-1536w-c282bfc0.avif",
        "width": 1536
      }
    ],
    "webp": [
      {
        "src": "/images/konntey-home-v1/painted-interior-480w-6b99a825.webp",
        "width": 480
      },
      {
        "src": "/images/konntey-home-v1/painted-interior-768w-68f76fb5.webp",
        "width": 768
      },
      {
        "src": "/images/konntey-home-v1/painted-interior-1152w-d299a9e3.webp",
        "width": 1152
      },
      {
        "src": "/images/konntey-home-v1/painted-interior-1536w-37248c29.webp",
        "width": 1536
      }
    ]
  },
  "bathroom-concept": {
    "alt": "AI-generated bathroom design inspiration with an oak vanity and glass shower screen.",
    "width": 1536,
    "height": 1024,
    "avif": [
      {
        "src": "/images/konntey-home-v1/bathroom-concept-480w-b3ce296c.avif",
        "width": 480
      },
      {
        "src": "/images/konntey-home-v1/bathroom-concept-768w-e19dd9da.avif",
        "width": 768
      },
      {
        "src": "/images/konntey-home-v1/bathroom-concept-1152w-ce3327e2.avif",
        "width": 1152
      },
      {
        "src": "/images/konntey-home-v1/bathroom-concept-1536w-23bfee6f.avif",
        "width": 1536
      }
    ],
    "webp": [
      {
        "src": "/images/konntey-home-v1/bathroom-concept-480w-a7376631.webp",
        "width": 480
      },
      {
        "src": "/images/konntey-home-v1/bathroom-concept-768w-2c7b1e1b.webp",
        "width": 768
      },
      {
        "src": "/images/konntey-home-v1/bathroom-concept-1152w-53f9f3a0.webp",
        "width": 1152
      },
      {
        "src": "/images/konntey-home-v1/bathroom-concept-1536w-00d94f19.webp",
        "width": 1536
      }
    ]
  },
  "calm-living-space": {
    "alt": "AI-generated design inspiration: a naturally lit living room with an open circulation path.",
    "width": 1536,
    "height": 1024,
    "avif": [
      {
        "src": "/images/konntey-home-v1/calm-living-space-480w-b99456b2.avif",
        "width": 480
      },
      {
        "src": "/images/konntey-home-v1/calm-living-space-768w-e935401c.avif",
        "width": 768
      },
      {
        "src": "/images/konntey-home-v1/calm-living-space-1152w-57bde412.avif",
        "width": 1152
      },
      {
        "src": "/images/konntey-home-v1/calm-living-space-1536w-f2f86782.avif",
        "width": 1536
      }
    ],
    "webp": [
      {
        "src": "/images/konntey-home-v1/calm-living-space-480w-42b05839.webp",
        "width": 480
      },
      {
        "src": "/images/konntey-home-v1/calm-living-space-768w-7181bcff.webp",
        "width": 768
      },
      {
        "src": "/images/konntey-home-v1/calm-living-space-1152w-ec4a5deb.webp",
        "width": 1152
      },
      {
        "src": "/images/konntey-home-v1/calm-living-space-1536w-f87e05d4.webp",
        "width": 1536
      }
    ]
  },
  "cabinetry-detail": {
    "alt": "AI-generated design inspiration: oak cabinet fronts and a pale kitchen benchtop.",
    "width": 1536,
    "height": 1024,
    "avif": [
      {
        "src": "/images/konntey-home-v1/cabinetry-detail-480w-fb34a078.avif",
        "width": 480
      },
      {
        "src": "/images/konntey-home-v1/cabinetry-detail-768w-97e7d1f4.avif",
        "width": 768
      },
      {
        "src": "/images/konntey-home-v1/cabinetry-detail-1152w-1ac3d9a7.avif",
        "width": 1152
      },
      {
        "src": "/images/konntey-home-v1/cabinetry-detail-1536w-1fbd0185.avif",
        "width": 1536
      }
    ],
    "webp": [
      {
        "src": "/images/konntey-home-v1/cabinetry-detail-480w-6468db81.webp",
        "width": 480
      },
      {
        "src": "/images/konntey-home-v1/cabinetry-detail-768w-17d677db.webp",
        "width": 768
      },
      {
        "src": "/images/konntey-home-v1/cabinetry-detail-1152w-ce2b0e80.webp",
        "width": 1152
      },
      {
        "src": "/images/konntey-home-v1/cabinetry-detail-1536w-47846137.webp",
        "width": 1536
      }
    ]
  },
  "kitchen-after-concept": {
    "alt": "AI-generated kitchen redesign concept with oak base cabinets and white upper cabinets.",
    "width": 1536,
    "height": 1024,
    "avif": [
      {
        "src": "/images/konntey-home-v1/kitchen-after-concept-480w-63af50ee.avif",
        "width": 480
      },
      {
        "src": "/images/konntey-home-v1/kitchen-after-concept-768w-6b47f3ca.avif",
        "width": 768
      },
      {
        "src": "/images/konntey-home-v1/kitchen-after-concept-1152w-f6913aa0.avif",
        "width": 1152
      },
      {
        "src": "/images/konntey-home-v1/kitchen-after-concept-1536w-b14f204d.avif",
        "width": 1536
      }
    ],
    "webp": [
      {
        "src": "/images/konntey-home-v1/kitchen-after-concept-480w-2a2beb07.webp",
        "width": 480
      },
      {
        "src": "/images/konntey-home-v1/kitchen-after-concept-768w-7b82f532.webp",
        "width": 768
      },
      {
        "src": "/images/konntey-home-v1/kitchen-after-concept-1152w-fbaedc7a.webp",
        "width": 1152
      },
      {
        "src": "/images/konntey-home-v1/kitchen-after-concept-1536w-4eee5433.webp",
        "width": 1536
      }
    ]
  },
  "kitchen-before-concept": {
    "alt": "AI-generated older kitchen concept with honey-coloured cabinets and beige floor tiles.",
    "width": 1536,
    "height": 1024,
    "avif": [
      {
        "src": "/images/konntey-home-v1/kitchen-before-concept-480w-fc127c4c.avif",
        "width": 480
      },
      {
        "src": "/images/konntey-home-v1/kitchen-before-concept-768w-5eae2789.avif",
        "width": 768
      },
      {
        "src": "/images/konntey-home-v1/kitchen-before-concept-1152w-12841acd.avif",
        "width": 1152
      },
      {
        "src": "/images/konntey-home-v1/kitchen-before-concept-1536w-c4e950fe.avif",
        "width": 1536
      }
    ],
    "webp": [
      {
        "src": "/images/konntey-home-v1/kitchen-before-concept-480w-42786ee7.webp",
        "width": 480
      },
      {
        "src": "/images/konntey-home-v1/kitchen-before-concept-768w-f475a064.webp",
        "width": 768
      },
      {
        "src": "/images/konntey-home-v1/kitchen-before-concept-1152w-249acfe5.webp",
        "width": 1152
      },
      {
        "src": "/images/konntey-home-v1/kitchen-before-concept-1536w-1baf5cdf.webp",
        "width": 1536
      }
    ]
  }
} as const;

export type HomeImageId = keyof typeof homeImages;
