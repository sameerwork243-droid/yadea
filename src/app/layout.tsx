import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "motion/react";
import { site } from "@/content/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { models } from "@/content/models";
import "./globals.css";

/* ------------------------------------------------------------------ type */

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-jetbrains",
});

/* -------------------------------------------------------------- metadata */

const description =
  "YADEA electric two-wheelers in Pakistan — the world's No.1 electric two-wheeler brand. " +
  "Browse 13 models with published specs and prices, compare running costs, explore 0% markup " +
  "financing and the PAVE scheme, and find your nearest 3S store.";

export const metadata: Metadata = {
  metadataBase: new URL(site.channels.sourceSite),
  title: {
    default: "YADEA Pakistan — Electric Scooters & Motorcycles",
    template: "%s · YADEA Pakistan",
  },
  description,
  applicationName: "YADEA Pakistan",
  keywords: [
    "YADEA Pakistan",
    "electric scooter Pakistan",
    "electric motorcycle Pakistan",
    "electric bike price Pakistan",
    "PAVE scheme",
    "zero markup electric scooter",
    "YADEA dealer",
    "e-bike Lahore",
    "electric vehicle Pakistan",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/img/official-favicon.png", type: "image/png" }],
    apple: [{ url: "/img/official-favicon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "/",
    siteName: "YADEA Pakistan",
    title: "YADEA Pakistan — Electric Scooters & Motorcycles",
    description,
    images: [
      {
        url: "/img/official-hero.jpg",
        width: 1920,
        height: 1000,
        alt: "A YADEA electric two-wheeler on the road in Pakistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YADEA Pakistan — Electric Scooters & Motorcycles",
    description,
    images: ["/img/official-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "vehicles",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#14100d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/* ------------------------------------------------------------------ json-ld */

function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "YADEA",
    legalName: site.legalName,
    url: site.channels.sourceSite,
    logo: `${site.channels.sourceSite}img/logo.svg`,
    description,
    sameAs: [site.channels.instagram],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: site.channels.productSupport,
        availableLanguage: ["en", "ur"],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "YADEA Pakistan",
    url: site.channels.sourceSite,
    inLanguage: "en-PK",
    publisher: { "@type": "Organization", name: site.legalName },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ItemListSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "YADEA electric two-wheelers available in Pakistan",
    numberOfItems: models.length,
    itemListElement: models.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `YADEA ${m.name}`,
        description: m.tagline || m.intro.slice(0, 180),
        url: `${site.channels.sourceSite}models/${m.slug}`,
        ...(m.price !== null
          ? {
              offers: {
                "@type": "Offer",
                price: m.price,
                priceCurrency: "PKR",
                availability: "https://schema.org/InStock",
                url: `${site.channels.sourceSite}models/${m.slug}`,
                seller: { "@type": "Organization", name: site.legalName },
              },
            }
          : {}),
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ------------------------------------------------------------------ root */

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-PK"
      className={`${interTight.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">
        {/* reducedMotion="user" makes every Framer Motion animation on the
            site respect the OS preference automatically. */}
        <MotionConfig reducedMotion="user">
          <Navbar />
          {children}
          <Footer />
        </MotionConfig>

        <OrganizationSchema />
        <WebSiteSchema />
        <ItemListSchema />
      </body>
    </html>
  );
}
