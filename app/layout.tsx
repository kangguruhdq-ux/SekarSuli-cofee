import type { Metadata, Viewport } from "next";
import { Cinzel, Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";

const cinzelFont = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const displayFont = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#0a1510",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sekarsulicoffee.com"),
  title: {
    default: "Sekarsuli Coffee & Masakan Jawa — Oase Kopi, Joglo Tradisi & Cita Rasa Jawa",
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
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/icon.png",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
    <html lang="id" className={`${cinzelFont.variable} ${displayFont.variable} ${sansFont.variable}`}>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="192x192" />
        <link rel="shortcut icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#0a1510] text-[#f6f4ee] selection:bg-[#c9a86a] selection:text-[#0a1510] min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
