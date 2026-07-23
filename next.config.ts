import type { NextConfig } from "next";

/**
 * Baseline HTTP security headers (SEC-04).
 * Intentionally excludes a restrictive Content-Security-Policy.
 * Hostinger currently emits CSP: upgrade-insecure-requests — left unchanged.
 */
const baselineSecurityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
] as const;

const productionOnlyHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
] as const;

const nextConfig: NextConfig = {
  // Reduce stack fingerprinting; Hostinger may still inject other signatures.
  poweredByHeader: false,
  images: {
    unoptimized: process.env.NODE_ENV === "development",
  },
  async headers() {
    const securityHeaders = [
      ...baselineSecurityHeaders,
      // HSTS only when Next runs as production (HTTPS edge: beta / future apex).
      ...(process.env.NODE_ENV === "production" ? productionOnlyHeaders : []),
    ];

    return [
      {
        source: "/:path*",
        headers: securityHeaders.map(({ key, value }) => ({ key, value })),
      },
    ];
  },
};

export default nextConfig;
