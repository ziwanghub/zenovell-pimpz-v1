import type { Metadata, Viewport } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";
import { DevCacheGuard } from "@/app/dev-cache-guard";
import { cn } from "@/lib/utils";

const sarabun = Sarabun({
  subsets: ["latin", "thai"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-sarabun",
});

export const metadata: Metadata = {
  title: {
    default: "ZENOVELL V4 Active Workspace",
    template: "%s | ZENOVELL V4",
  },
  description:
    "Lightweight production-ready workspace for the ZENOVELL V4 mobile-first landing page.",
  applicationName: "ZENOVELL V4",
  keywords: [
    "ZENOVELL",
    "landing page",
    "Next.js",
    "mobile-first",
    "wellness",
  ],
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
  return (
    <html lang="th" className={cn("font-sans", sarabun.variable)}>
      <body>
        <DevCacheGuard />
        {children}
      </body>
    </html>
  );
}
