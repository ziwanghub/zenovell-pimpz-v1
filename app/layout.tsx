import type { Metadata, Viewport } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";
import { DevCacheGuard } from "@/app/dev-cache-guard";
import { cn } from "@/lib/utils";

// Analytics initialization (GTM is sole authority)
import { initializeAnalyticsAdapters } from "@/lib/analytics/adapters";
import { GoogleTagManager } from "@/components/analytics/google-tag-manager";
import { isValidGtmContainerId } from "@/lib/analytics/gtm-validation";

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
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  // Single analytics initialization point.
  // GTM is the sole tag authority.
  // - When NEXT_PUBLIC_GTM_ID is present AND valid (GTM-XXXX...) → register GTM adapter
  // - Otherwise → safe noop (dev / misconfig / invalid value)
  // The call is kept at module render time for compatibility with existing abstraction.
  // Adapters themselves are SSR-safe (they no-op when !window).
  if (isValidGtmContainerId(gtmId)) {
    initializeAnalyticsAdapters(["gtm"]);
  } else {
    initializeAnalyticsAdapters(["noop"]);
  }

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
        {/* GTM mounted exactly once at root. GTM is the single tag authority. */}
        <GoogleTagManager gtmId={gtmId} />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteData) }}
        />
      </body>
    </html>
  );
}
