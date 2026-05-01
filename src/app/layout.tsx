import type { Metadata } from "next";
import { Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import MotionProvider from "@/components/MotionProvider";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
  process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  title: {
    default: "Home Extensions & Renovations Melbourne | Konntey H&R",
    template: "%s | Konntey H&R",
  },
  description:
    "Professional home extensions, new builds, kitchen & bathroom renovations across Melbourne. Fair pricing, founder-led service, and quality craftsmanship. Get a free quote today.",
  keywords: [
    "home renovations Melbourne",
    "renovation company Melbourne",
    "kitchen renovation Melbourne",
    "bathroom renovation Melbourne",
    "home extension Melbourne",
    "renovation builders Melbourne near me",
    "professional renovator Melbourne",
    "affordable kitchen renovation Melbourne",
    "small bathroom renovation Melbourne cost",
    "home extension builders Melbourne suburbs",
    "deck builder Melbourne southeast",
    "pergola installation Melbourne",
    "interior painter Melbourne",
    "full home renovation Melbourne quote",
    "kitchen renovation Melbourne cost",
    "bathroom reno Melbourne price",
    "how much does a home extension cost Melbourne",
    "renovation quote Melbourne free",
    "professional renovation contractor Victoria",
    "renovation builder reviews Melbourne",
    "kitchen renovation Tarneit",
    "bathroom renovation Tarneit",
    "home renovation Truganina",
    "renovation company Werribee",
    "builder Hoppers Crossing",
    "home extension Point Cook",
    "renovation Wyndham Vale",
    "renovations Manor Lakes",
    "builder Williams Landing",
    "renovation company Dandenong",
    "kitchen renovation Cranbourne",
    "bathroom renovation Frankston",
    "home renovation Narre Warren",
    "builder Springvale",
    "renovations Berwick",
    "renovation company Pakenham",
    "builder Officer",
    "renovations Clyde",
    "renovation Melton",
    "Konntey",
    "Konntey Home and Renovations",
    "Konntey renovations Melbourne",
  ],
  metadataBase: new URL("https://www.konnteyhomerenovations.com.au"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Home Extensions & Renovations Melbourne | Konntey H&R",
    description:
      "Professional home extensions, new builds, kitchen & bathroom renovations across Melbourne. Fair pricing, founder-led service, and quality craftsmanship. Get a free quote today.",
    type: "website",
    locale: "en_AU",
    url: "https://www.konnteyhomerenovations.com.au",
    siteName: "Konntey Home & Renovations",
    images: [
      {
        url: "/images/hero_main.webp",
        width: 1200,
        height: 630,
        alt: "Konntey Home & Renovations — Professional renovation builders in Melbourne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Extensions & Renovations Melbourne | Konntey H&R",
    description:
      "Professional home extensions, new builds, kitchen & bathroom renovations across Melbourne. Fair pricing, founder-led service, and quality craftsmanship. Get a free quote today.",
    images: ["/images/hero_main.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: googleSiteVerification,
  },
  other: {
    "geo.region": "AU-VIC",
    "geo.placename": "Melbourne",
    "geo.position": "-37.8136;144.9631",
    ICBM: "-37.8136, 144.9631",
  },
};

// JSON-LD Structured Data
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Konntey Home & Renovations",
  alternateName: ["Konntey H&R", "Konntey Homes and Renovations"],
  url: "https://www.konnteyhomerenovations.com.au",
  logo: "https://www.konnteyhomerenovations.com.au/logo.png",
  image: "https://www.konnteyhomerenovations.com.au/logo.png",
  description:
    "Professional home extensions, new builds, kitchen & bathroom renovations across Melbourne. Fair pricing, founder-led service, and quality craftsmanship.",
  telephone: "+61493191798",
  email: "info@konnteyhomerenovations.com.au",
  abn: "64 684 703 972",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -37.8136,
    longitude: 144.9631,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  areaServed: {
    "@type": "State",
    name: "Victoria",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Renovation Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home Extensions & New Builds" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kitchen Renovations Melbourne" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bathroom Renovations Melbourne" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Deck & Pergola Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interior Painting & Finishing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vastu & Feng Shui Consultation" } },
    ],
  },
  sameAs: [
    "https://www.facebook.com/konnteyhomerenovations",
    "https://www.instagram.com/konnteyhomerenovations",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a kitchen renovation cost in Melbourne?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kitchen renovation costs in Melbourne typically range from $15,000 for a budget refresh to $60,000+ for a full luxury kitchen renovation. At Konntey, we provide free on-site quotes with transparent, itemized pricing so you know exactly what you're paying for. We service Tarneit, Truganina, Werribee, Point Cook and all western Melbourne suburbs.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a bathroom renovation cost in Melbourne?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A small bathroom renovation in Melbourne typically costs between $10,000 and $25,000. Full luxury bathroom renovations can range from $25,000 to $50,000+. Konntey offers affordable bathroom renovation packages across Melbourne's west and southeast with no hidden fees.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a home extension cost in Melbourne?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Home extension costs in Melbourne vary from $1,800 to $4,500+ per square metre depending on complexity, materials and finishes. Konntey Home & Renovations provides free consultations and detailed quotes for home extensions across Hoppers Crossing, Point Cook, Wyndham Vale, Dandenong and surrounding suburbs.",
      },
    },
    {
      "@type": "Question",
      name: "Are you professional renovation builders in Melbourne?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Konntey Home & Renovations is a fully professional and insured renovation contractor in Victoria. We hold all required building licenses and carry comprehensive insurance for every project we undertake across Melbourne.",
      },
    },
    {
      "@type": "Question",
      name: "What suburbs in Melbourne do you service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We service all of Melbourne with a focus on western and southeastern suburbs including Tarneit, Truganina, Werribee, Hoppers Crossing, Point Cook, Wyndham Vale, Manor Lakes, Williams Landing, Dandenong, Cranbourne, Frankston, Narre Warren, Berwick, Springvale, Pakenham, Officer, Clyde and Melton.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer free renovation quotes in Melbourne?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We offer 100% free, no-obligation on-site quotes for all renovation projects. We'll visit your property, discuss your vision, measure the space and provide a transparent, itemized quote within 48 hours. Call us or fill out our online form to book your free consultation.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.konnteyhomerenovations.com.au",
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Konntey Home & Renovations",
  url: "https://www.konnteyhomerenovations.com.au",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.konnteyhomerenovations.com.au/?s={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${barlow.variable}`}
    >
      <head>
        <Script
          id="local-business-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <Script
          id="faq-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="font-body">
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
