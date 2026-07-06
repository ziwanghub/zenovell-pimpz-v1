/**
 * Public entry point for the analytics utility.
 *
 * Usage (future instrumentation):
 *   import { analytics, AnalyticsEvents } from "@/lib/analytics";
 *   analytics.track(AnalyticsEvents.HERO_CTA_CLICK, { surface: "hero", ... });
 *
 * The dispatcher is a no-op until adapters are registered (P3D).
 * All types and the singleton are re-exported here for convenience.
 */

export * from "./types";
export * from "./events";
export * from "./dispatcher";

// Re-export the singleton for easy import
export { analytics } from "./dispatcher";
export type { AnalyticsPayload, AnalyticsAdapter } from "./types";
export type { AnalyticsEvent } from "./events";
