import type { Metadata, Viewport } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";
import { DevCacheGuard } from "@/app/dev-cache-guard";
import { cn } from "@/lib/utils";

// Batch 3: Analytics Interface Alignment - Initialization
// Exactly one call site, noop only, idempotent
import { initializeAnalyticsAdapters } from "@/lib/analytics/adapters";

const sarabun = Sarabun({
  subsets: ["latin", "thai"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-sarabun",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://zenovell.com'),
  title: {
    default: "ZENOVELL | Premium Wellness Products",
    template: "%s | ZENOVELL",
  },
  description:
    "Premium wellness supplements for men and women. Discover capsules, gels, and guides for better health and confidence.",
  applicationName: "ZENOVELL",
  keywords: [
    "ZENOVELL",
    "wellness",
    "supplements",
    "men's health",
    "women's wellness",
    "PIMPZ",
    "natural wellness",
  ],
  authors: [{ name: "ZENOVELL" }],
  creator: "ZENOVELL",
  publisher: "ZENOVELL",
  openGraph: {
    title: "ZENOVELL | Premium Wellness Products",
    description: "Premium wellness supplements for men and women.",
    images: [{ url: "/images/og-default.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZENOVELL | Premium Wellness",
    description: "Discover premium wellness products.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Exactly one initialization call for Analytics (Batch 3 requirement)
  // - noop only for this batch
  // - idempotent
  // - safe for App Router (no side effects on server render)
  initializeAnalyticsAdapters(["noop"]);

  const baseUrl = 'https://zenovell.com';
  const siteData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'ZENOVELL',
        url: baseUrl,
        logo: `${baseUrl}/images/logo.png`,
        description: 'Premium wellness products for men and women.',
      },
      {
        '@type': 'WebSite',
        name: 'ZENOVELL',
        url: baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="th" className={cn("font-sans", sarabun.variable)}>
      <body>
        <DevCacheGuard />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteData) }}
        />
      </body>
    </html>
  );
}
