import type { AnalyticsPayload } from '../types';
import { BaseAdapter } from './base-adapter';

/**
 * GTMAdapter
 *
 * Project-owned adapter that pushes structured events into window.dataLayer.
 * This is the ONLY place that writes to dataLayer from application analytics.
 *
 * GTM is the single tag authority:
 * - This adapter never loads gtag.js directly.
 * - This adapter never calls gtag('config', ...).
 * - GA4 configuration and forwarding happens inside the GTM container only.
 * - Safe no-op on server and when dataLayer/GTM is unavailable.
 * - Never blocks navigation or throws to callers.
 *
 * event_version: 1 is added to all events for payload evolution tracking.
 *
 * Expected usage (via dispatcher + bridge):
 *   analytics.track('line_cta_click', { ... })
 */
export class GTMAdapter extends BaseAdapter {
  constructor() {
    super('gtm');
  }

  track(payload: AnalyticsPayload): void {
    // SSR guard
    if (typeof window === 'undefined') {
      return;
    }

    const w = window as unknown as {
      dataLayer?: unknown[];
    };

    // Guard: dataLayer must exist (injected by GTM bootstrap)
    if (!w.dataLayer || !Array.isArray(w.dataLayer)) {
      // GTM not loaded yet or disabled — safe noop (no crash)
      return;
    }

    try {
      // Build clean dataLayer event object
      // Only include defined values
      const dataLayerEvent: Record<string, unknown> = {
        event: payload.event,
        // Event version for future payload evolution (GTM side can filter on this)
        event_version: 1,
      };

      if (payload.surface !== undefined) {
        dataLayerEvent.cta_location = payload.surface;
      }

      if (payload.destination !== undefined) {
        dataLayerEvent.destination = payload.destination;
      }

      // Prefer metadata for structured commerce fields
      const meta = (payload.metadata && typeof payload.metadata === 'object')
        ? payload.metadata as Record<string, unknown>
        : {};

      const productSlug = meta.product ?? (payload as { product_slug?: unknown }).product_slug;
      if (productSlug !== undefined) {
        dataLayerEvent.product_slug = productSlug;
      }

      // page_path: prefer explicit path, fall back to payload.path
      const pagePath = meta.page_path ?? payload.path;
      if (pagePath !== undefined) {
        dataLayerEvent.page_path = pagePath;
      }

      // Canonical LINE destination
      if (meta.link_url) {
        dataLayerEvent.link_url = meta.link_url;
      } else if (payload.destination === 'line_oa' || payload.event === 'line_cta_click') {
        dataLayerEvent.link_url = 'https://lin.ee/syjmYE2';
      }

      // Add any additional safe fields from metadata (non-PII)
      // Only pick known safe keys to avoid leaking arbitrary data
      const safeMetaKeys = ['source', 'campaign', 'intent', 'sku'];
      for (const key of safeMetaKeys) {
        if (key in meta && meta[key] !== undefined) {
          dataLayerEvent[key] = meta[key];
        }
      }

      // Push to dataLayer (GTM will pick it up via triggers)
      w.dataLayer.push(dataLayerEvent);

      // Development-only concise debug log — only after successful push
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics:GTM] ${dataLayerEvent.event}`);
        console.log(JSON.stringify(dataLayerEvent, null, 2));
      }
    } catch (err) {
      // Never throw into calling code (CTA handoff, navigation, etc.)
      if (process.env.NODE_ENV === 'development') {
        console.warn('[GTMAdapter] dataLayer push error (isolated):', err);
      }
    }
  }
}
