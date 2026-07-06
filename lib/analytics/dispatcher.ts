import type { AnalyticsAdapter, AnalyticsPayload } from "./types";
import type { AnalyticsEvent } from "./events";

/**
 * Vendor-neutral Analytics Dispatcher.
 *
 * Responsibilities:
 * - Accept typed events + partial payload
 * - Normalize / enrich safe fields (timestamp, path)
 * - Dispatch to registered adapters (no-op if none)
 * - Never throw at runtime
 * - Browser-safe (no server-only assumptions)
 *
 * This is the central point where all future instrumentation will call.
 * Adapters are added later in P3D.
 */
export class AnalyticsDispatcher {
  private adapters: AnalyticsAdapter[] = [];
  private isEnabled = true;

  /**
   * Register an adapter. Multiple adapters can be registered (e.g. GA4 + custom).
   * Adapters must be idempotent and non-throwing.
   */
  registerAdapter(adapter: AnalyticsAdapter): void {
    if (!this.adapters.includes(adapter)) {
      this.adapters.push(adapter);
    }
  }

  /**
   * Remove a previously registered adapter.
   */
  unregisterAdapter(adapter: AnalyticsAdapter): void {
    this.adapters = this.adapters.filter((a) => a !== adapter);
  }

  /**
   * Enable or disable the entire dispatcher.
   * Useful for consent, dev mode, or kill-switch.
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  /**
   * Core tracking method.
   * This is what UI code will eventually call (via thin wrappers in P3C).
   */
  track(event: AnalyticsEvent, payload: Partial<AnalyticsPayload> = {}): void {
    if (!this.isEnabled) return;

    try {
      const enrichedPayload: AnalyticsPayload = {
        event,
        timestamp: payload.timestamp ?? new Date().toISOString(),
        path:
          payload.path ??
          (typeof window !== "undefined" ? window.location.pathname + window.location.search : ""),
        ...payload,
      };

      // Dispatch to all adapters. Never let one adapter break others.
      this.adapters.forEach((adapter) => {
        try {
          adapter.track(enrichedPayload);
        } catch (err) {
          // Swallow adapter errors in production; log in development only.
          if (process.env.NODE_ENV === "development") {
            console.warn("[Analytics] Adapter error:", err);
          }
        }
      });
    } catch (err) {
      // Top-level safety: analytics must never crash the app.
      if (process.env.NODE_ENV === "development") {
        console.warn("[Analytics] Dispatcher error:", err);
      }
    }
  }

  // Future methods (identify/page) intentionally omitted in P3B skeleton.
  // They will be added when the interface is extended in later phases.
}

// Singleton instance for the whole app.
// Future code will import { analytics } from "@/lib/analytics"
export const analytics = new AnalyticsDispatcher();
