import type { AnalyticsAdapter } from "../types";
import { NoopAdapter } from "./noop-adapter";
import { GA4Adapter } from "./ga4-adapter";

/**
 * AdapterFactory
 * 
 * Simple factory for creating adapter instances by name.
 * 
 * In M10-P3D-1 this only supports "noop".
 * Future phases (P3D-2+) will extend this to support real vendors
 * without changing the dispatcher.
 */
export class AdapterFactory {
  /**
   * Create an adapter instance by adapter name.
   * Currently only supports 'noop'.
   */
  static create(name: string): AnalyticsAdapter {
    switch (name.toLowerCase()) {
      case "noop":
        return new NoopAdapter();
      case "ga4":
        return new GA4Adapter();
      default:
        // Safe fallback
        return new NoopAdapter();
    }
  }

  /**
   * List of supported adapter names.
   * This will grow when real adapters are added in later patches.
   */
  static getSupportedAdapters(): string[] {
    return ["noop", "ga4"];
  }
}
