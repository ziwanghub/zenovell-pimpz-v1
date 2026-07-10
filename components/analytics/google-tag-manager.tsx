'use client';

import Script from 'next/script';
import { isValidGtmContainerId } from '@/lib/analytics/gtm-validation';

interface GoogleTagManagerProps {
  gtmId?: string;
}

/**
 * GoogleTagManager
 *
 * Thin, project-owned component for loading GTM as the single tag authority.
 *
 * - Uses NEXT_PUBLIC_GTM_ID (or prop)
 * - Returns null when ID missing or invalid (safe noop)
 * - Loads official GTM bootstrap via next/script (afterInteractive)
 * - Includes official noscript iframe fallback
 * - Stable script id to prevent duplicate injection
 * - Never loads or configures direct GA4 gtag
 * - No UI impact
 *
 * Placement: Mount once from root layout only.
 */
export function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  const rawId = gtmId || process.env.NEXT_PUBLIC_GTM_ID;
  const containerId = typeof rawId === 'string' ? rawId.trim() : '';

  if (!isValidGtmContainerId(containerId)) {
    if (process.env.NODE_ENV === 'development' && rawId) {
      // One concise development-only warning. No production output.
      console.warn(
        `[GTM] Invalid NEXT_PUBLIC_GTM_ID. ` +
        `Expected: GTM- followed by uppercase letters/digits. ` +
        `Received: "${rawId}". GTM disabled (safe noop).`
      );
    }
    return null;
  }

  // containerId is now guaranteed to be a valid trimmed GTM- ID
  const gtmIdValue = containerId;

  return (
    <>
      {/* 
        GTM bootstrap script (official).
        - next/script with afterInteractive ensures it runs after hydration.
        - Stable id prevents duplicate injection across re-renders.
        - No direct GA4 initialization here.
      */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmIdValue}');
          `,
        }}
      />

      {/* 
        Official GTM noscript fallback.
        Placed inside body. Safe for hydration (static content).
      */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmIdValue}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="GTM noscript"
        />
      </noscript>
    </>
  );
}
