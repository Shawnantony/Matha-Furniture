import type { Metadata } from "next";
import { Inter, Playfair_Display, Fredoka } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// Free Bauhaus 93 lookalike (rounded geometric) used as the web fallback for the logo.
const bahamas = Fredoka({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--font-bahamas",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Premium Furniture in Thiruvananthapuram`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "furniture Thiruvananthapuram",
    "furniture shop Kerala",
    "sofas",
    "beds",
    "dining tables",
    "wardrobes",
    "Matha Furniture",
    "Kesavadasapuram",
    "Pattom",
  ],
  openGraph: {
    title: `${siteConfig.name} | Premium Furniture in Thiruvananthapuram`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${bahamas.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
