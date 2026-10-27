import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";

const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#1A0E0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sekarsulicoffee.com"),
  title: {
    default: "Sekarsuli Coffee & Masakan Jawa — Tradisi Kuliner & Kopi di Ndalem Sekarsuli, Jogja",
    template: "%s | Sekarsuli Coffee & Masakan Jawa",
  },
  description: siteConfig.description,
  keywords: [
    "Sekarsuli Coffee",
    "Masakan Jawa",
    "Ndalem Sekarsuli",
    "Kopi Jogja",
    "Kuliner Bantul",
    "Jalan Wonosari KM 8",
    "Rest Area Ndalem Sekarsuli",
    "Mendoan Gajah",
    "Teh Gajah",
    "Joglo Jogja",
  ],
  authors: [{ name: "Sekarsuli Coffee & Masakan Jawa" }],
  creator: "Sekarsuli Coffee",
  publisher: "Sekarsuli Coffee",
  formatDetection: {
    email: false,
    address: true,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Sekarsuli Coffee & Masakan Jawa — Merawat Rasa, Menjaga Tradisi",
    description: siteConfig.description,
    url: "https://sekarsulicoffee.com",
    siteName: "Sekarsuli Coffee & Masakan Jawa",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/sekarsuli-joglo-panorama.jpg",
        width: 1280,
        height: 720,
        alt: "Ndalem Sekarsuli Joglo & Coffee Ambiance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sekarsuli Coffee & Masakan Jawa",
    description: siteConfig.description,
    images: ["/images/sekarsuli-joglo-panorama.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: siteConfig.name,
    description: siteConfig.description,
    image: "https://sekarsulicoffee.com/images/sekarsuli-joglo-panorama.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Wonosari KM 8, Ndalem Sekarsuli, Baturetno",
      addressLocality: "Banguntapan",
      addressRegion: "Bantul, DI Yogyakarta",
      postalCode: "55197",
      addressCountry: "ID",
    },
    servesCuisine: ["Javanese", "Coffee", "Indonesian"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "22:00",
      },
    ],
    sameAs: [siteConfig.social.instagramUrl],
  };

  return (
    <html lang="id" className={`${serifFont.variable} ${sansFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-cream-50 text-coffee-950 selection:bg-coffee-800 selection:text-cream-50 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
