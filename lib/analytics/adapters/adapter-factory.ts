import type { AnalyticsAdapter } from "../types";
import { NoopAdapter } from "./noop-adapter";
import { GA4Adapter } from "./ga4-adapter";
import { GTMAdapter } from "./gtm-adapter";

/**
 * AdapterFactory
 * 
 * Simple factory for creating adapter instances by name.
 * 
 * Supports:
 * - "noop" (default safe fallback)
 * - "ga4" (skeleton, not activated in this GTM-only flow)
 * - "gtm" (GTM / dataLayer adapter)
 */
export class AdapterFactory {
  /**
   * Create an adapter instance by adapter name.
   */
  static create(name: string): AnalyticsAdapter {
    switch (name.toLowerCase()) {
      case "noop":
        return new NoopAdapter();
      case "ga4":
        return new GA4Adapter();
      case "gtm":
        return new GTMAdapter();
      default:
        // Safe fallback
        return new NoopAdapter();
    }
  }

  /**
   * List of supported adapter names.
   */
  static getSupportedAdapters(): string[] {
    return ["noop", "ga4", "gtm"];
  }
}
