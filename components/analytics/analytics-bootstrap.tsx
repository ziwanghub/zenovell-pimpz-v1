'use client';

import { useEffect } from 'react';
import { initializeAnalyticsAdapters } from '@/lib/analytics/adapters';
import { isValidGtmContainerId } from '@/lib/analytics/gtm-validation';

/**
 * Client-side analytics adapter bootstrap (RC1.x).
 *
 * Registers GTMAdapter (or NoopAdapter) on the browser runtime where
 * Hero CTA / commerce analytics track() actually executes.
 *
 * Server Components must not own this registration — module singletons
 * are not shared across RSC and client bundles in the App Router.
 *
 * Mount once from root layout. Renders null (no UI).
 */
let clientAdaptersBootstrapped = false;

export function AnalyticsBootstrap() {
  useEffect(() => {
    // Strict Mode may mount → unmount → remount in development.
    // initializeAnalyticsAdapters() already resets + re-registers (idempotent),
    // but we still skip a second bootstrap to avoid redundant reset churn.
    if (clientAdaptersBootstrapped) {
      return;
    }
    clientAdaptersBootstrapped = true;

    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
    if (isValidGtmContainerId(gtmId)) {
      initializeAnalyticsAdapters(['gtm']);
    } else {
      initializeAnalyticsAdapters(['noop']);
    }
  }, []);

  return null;
}
