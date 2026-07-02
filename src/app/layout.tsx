import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1628",
};

export const metadata: Metadata = {
  title: {
    default: "Home Extensions & Renovations Melbourne | Konntey H&R",
    template: "%s | Konntey H&R",
  },
  description:
    "Professional home extensions, kitchen & bathroom renovations across Melbourne. BPC registered, fixed-price quotes. Serving Tarneit, Werribee & Point Cook.",
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
    "BPC registered builder Melbourne",
    "fixed price renovation Melbourne",
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
      "Professional home extensions, new builds, kitchen & bathroom renovations across Melbourne. BPC registered, fixed-price quotes, founder-led service. Get a free quote today.",
    type: "website",
    locale: "en_AU",
    url: "https://www.konnteyhomerenovations.com.au",
    siteName: "Konntey Home & Renovations",
    images: [
      {
        url: "/images/hero-main.webp",
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
      "Professional home extensions, new builds, kitchen & bathroom renovations across Melbourne. BPC registered, fixed-price quotes, founder-led service. Get a free quote today.",
    images: ["/images/hero-main.webp"],
    creator: "@konnteyreno",
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
  category: "Home Improvement",
  other: {
    "geo.region": "AU-VIC",
    "geo.placename": "Melbourne",
    "geo.position": "-37.8136;144.9631",
    ICBM: "-37.8136, 144.9631",
    "apple-mobile-web-app-title": "Konntey H&R",
    "format-detection": "telephone=yes",
  },
};

// JSON-LD Structured Data
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://www.konnteyhomerenovations.com.au/#organization",
  name: "Konntey Home & Renovations",
  alternateName: ["Konntey H&R", "Konntey Homes and Renovations"],
  url: "https://www.konnteyhomerenovations.com.au",
  logo: {
    "@type": "ImageObject",
    url: "https://www.konnteyhomerenovations.com.au/images/logo.png",
    width: 600,
    height: 200,
  },
  image: "https://www.konnteyhomerenovations.com.au/images/hero-main.webp",
  description:
    "Professional home extensions, new builds, kitchen & bathroom renovations across Melbourne. BPC registered, fixed-price quotes, founder-led service, and quality craftsmanship.",
  telephone: "+61493191798",
  email: "info@konnteyhomerenovations.com.au",
  priceRange: "$$",
  currenciesAccepted: "AUD",
  paymentAccepted: "Cash, Bank Transfer, Credit Card",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Melbourne",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    postalCode: "3000",
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
      opens: "09:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+61493191798",
    contactType: "customer service",
    areaServed: "AU",
    availableLanguage: ["English", "Hindi", "Gujarati"],
  },
  sameAs: [
    "https://www.instagram.com/konntey/",
  ],
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=Konntey%20Home%20%26%20Renovations%20Melbourne",
  areaServed: [
    { "@type": "State", name: "Victoria" },
    { "@type": "City", name: "Melbourne" },
    { "@type": "City", name: "Tarneit" },
    { "@type": "City", name: "Werribee" },
    { "@type": "City", name: "Point Cook" },
    { "@type": "City", name: "Hoppers Crossing" },
    { "@type": "City", name: "Truganina" },
    { "@type": "City", name: "Wyndham Vale" },
    { "@type": "City", name: "Dandenong" },
    { "@type": "City", name: "Cranbourne" },
    { "@type": "City", name: "Narre Warren" },
    { "@type": "City", name: "Berwick" },
    { "@type": "City", name: "Pakenham" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Renovation Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home Extensions & New Builds", description: "Structural extensions, second storeys, granny flats, and knockdown rebuilds across Melbourne" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kitchen Renovations Melbourne", description: "Complete kitchen renovations from cabinet refresh to full open-plan redesigns" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bathroom Renovations Melbourne", description: "Full bathroom rebuilds with AS/NZS 3740 certified waterproofing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Deck & Pergola Installation", description: "Premium timber deck and pergola construction built for Australian weather" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interior Painting & Finishing", description: "Professional interior and exterior painting with sharp lines and clean finishes" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vastu & Feng Shui Consultation", description: "Traditional Vastu-compliant renovations for culturally aligned home design" } },
    ],
  },

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



const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.konnteyhomerenovations.com.au/#website",
  name: "Konntey Home & Renovations",
  url: "https://www.konnteyhomerenovations.com.au",
  publisher: {
    "@id": "https://www.konnteyhomerenovations.com.au/#organization",
  },
  inLanguage: "en-AU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${barlowCondensed.variable} ${barlow.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        <script
          type="application/ld+json"
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
