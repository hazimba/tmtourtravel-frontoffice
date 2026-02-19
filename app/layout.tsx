import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Ubuntu } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "TM Tours & Travel | Trusted Muslim Tour Operator in Malaysia",
  description:
    "TM Tours & Travel is a dedicated travel agency, helping Malaysian families enjoy unforgettable travel experiences with trusted services.",
  keywords: [
    "TM Tours & Travel",
    "Muslim travel agency",
    "family travel",
    "Malaysia travel",
    "Umrah packages",
    "MICE services",
    "conference",
    "meeting",
  ],
  authors: [{ name: "TM Tours & Travel" }],
  openGraph: {
    title: "TM Tours & Travel | Trusted Muslim Tour Operator in Malaysia",
    description:
      "Helping Malaysian families with unforgettable travel experiences. Contact TM Tours & Travel for the best travel packages and promotions.",
    url: "https://tmtourtravel-frontoffice-git-main-hazim-bakars-projects.vercel.app",
    siteName: "TM Tours & Travel",
    images: [
      {
        url: "https://tmtourtravel-frontoffice-git-main-hazim-bakars-projects.vercel.app/profile-muaz.jpeg",
        width: 1200,
        height: 630,
        alt: "TM Tours & Travel - Trusted Muslim Tour Operator in Malaysia",
      },
    ],
    locale: "en_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TM Tours & Travel | Trusted Muslim Tour Operator in Malaysia",
    description:
      "Helping Malaysian families with unforgettable travel experiences. Contact TM Tours & Travel for the best travel packages and promotions.",
    images: [
      "https://tmtourtravel-frontoffice-git-main-hazim-bakars-projects.vercel.app/profile-muaz.jpeg",
    ],
  },
  metadataBase: new URL(
    "https://tmtourtravel-frontoffice-git-main-hazim-bakars-projects.vercel.app"
  ),
  alternates: {
    canonical:
      "https://tmtourtravel-frontoffice-git-main-hazim-bakars-projects.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "TM Tours & Travel",
    description:
      "TM Tours & Travel is a dedicated travel agency, helping Malaysian families enjoy unforgettable travel experiences with trusted services.",
    url: "https://tmtourtravel-frontoffice-git-main-hazim-bakars-projects.vercel.app",
    telephone: "03-4031 4171",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. Lot 3A-3, Level 4, Wisma Q, Jalan Pahang, Titiwangsa",
      addressLocality: "Wilayah Persekutuan",
      addressRegion: "Kuala Lumpur",
      postalCode: "53000",
      addressCountry: "MY",
    },
    sameAs: [
      "https://www.facebook.com/tmtourstravel",
      "https://www.instagram.com/tm_tours",
    ],
    logo: "https://tmtourtravel-frontoffice-git-main-hazim-bakars-projects.vercel.app/profile-muaz.jpeg",
  };
  return (
    <html lang="en">
      <head>
        {/* <meta name="application-name" content="TM Tours & Travel"  /> */}
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ubuntu.variable} antialiased`}
      >
        <Toaster />
        <main>{children}</main>
      </body>
    </html>
  );
}
