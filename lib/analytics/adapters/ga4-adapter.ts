import type { AnalyticsPayload } from '../types';
import { BaseAdapter } from './base-adapter';

/**
 * GA4Adapter
 * 
 * Google Analytics 4 adapter.
 * Maps vendor-neutral AnalyticsPayload to window.gtag('event', ...) calls.
 * 
 * This adapter is completely isolated and vendor-specific only inside this file.
 * It implements the existing AnalyticsAdapter interface via BaseAdapter.
 * 
 * Safe behaviors:
 * - No-op if window or gtag is undefined (SSR, no gtag loaded)
 * - Never throws
 * - Does not own consent or cookies
 */
export class GA4Adapter extends BaseAdapter {
  private measurementId?: string;

  constructor(measurementId?: string) {
    super('ga4');
    this.measurementId = measurementId;
  }

  track(payload: AnalyticsPayload): void {
    if (typeof window === 'undefined' || typeof (window as { gtag?: (...args: unknown[]) => void }).gtag !== 'function') {
      // Safe no-op: gtag not available (common before script loads or in SSR)
      return;
    }

    try {
      const eventName = this.mapToGA4Event(payload.event);

      const params: Record<string, unknown> = {
        // Map neutral fields to GA4 params
        ...(payload.surface && { surface: payload.surface }),
        ...(payload.section && { section: payload.section }),
        ...(payload.label && { label: payload.label }),
        ...(payload.destination && { destination: payload.destination }),
        ...(payload.value !== undefined && { value: payload.value }),
        ...(payload.path && { path: payload.path }),
      };

      // Merge any additional metadata
      if (payload.metadata && typeof payload.metadata === 'object') {
        Object.assign(params, payload.metadata);
      }

      // Call gtag
      const gtagFn = (window as { gtag?: (...args: unknown[]) => void }).gtag!;
      gtagFn('event', eventName, params);
    } catch (err) {
      // Never throw; swallow errors in adapter
      if (process.env.NODE_ENV === 'development') {
        console.warn('[GA4Adapter] Error mapping/tracking event:', err);
      }
    }
  }

  /**
   * Map internal event names to GA4 event names.
   * For custom events we keep the name as-is (GA4 supports custom event names).
   * Can be extended for standard GA4 events later.
   */
  private mapToGA4Event(event: string): string {
    // Keep most events as custom for now.
    // Examples of possible standard mappings (not used yet):
    // 'purchase' -> 'purchase'
    // But per scope, no ecommerce yet.
    const mapping: Record<string, string> = {
      // Add mappings here if needed in future sub-patches
    };

    return mapping[event] || event;
  }

  /**
   * Optional initialize: could be used to call gtag('config', measurementId)
   * if measurementId is provided.
   * For foundation, we assume gtag config is done outside (standard practice).
   */
  initialize(): void {
    if (this.measurementId && typeof window !== 'undefined' && typeof (window as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
      try {
        const gtagFn = (window as { gtag?: (...args: unknown[]) => void }).gtag!;
        gtagFn('config', this.measurementId);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[GA4Adapter] Config error:', err);
        }
      }
    }
  }
}
