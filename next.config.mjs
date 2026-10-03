/** @type {import('next').NextConfig} */

// Legacy /services/<slug> URLs map to the matching service page by keyword.
// Anything unmatched returns a real 404 rather than redirecting to the
// homepage (which search engines treat as a soft 404).
const legacyServiceRedirects = [
  ["kitchen[^/]*", "/kitchen-renovations-melbourne"],
  ["bathroom[^/]*", "/bathroom-renovations-melbourne"],
  ["(?:home-)?extension[^/]*", "/home-extensions-melbourne"],
  ["(?:new-build|knockdown)[^/]*", "/home-extensions-melbourne"],
  ["(?:deck|pergola|outdoor|landscap)[^/]*", "/decks-pergolas-melbourne"],
  ["(?:paint|interior)[^/]*", "/interior-painting-melbourne"],
  ["vastu[^/]*", "/vastu-renovations-melbourne"],
].map(([pattern, destination]) => ({
  source: `/services/:slug(${pattern})`,
  destination,
  permanent: true,
}));

const nextConfig = {
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    // All images are served locally from /public — no remote patterns needed.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      ...legacyServiceRedirects,
      {
        source: "/images/bathroom/wide-shot.webp",
        destination: "/images/bathroom/hero.webp",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // /public/images files keep stable names when replaced, so they must
        // not be cached as immutable.
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
