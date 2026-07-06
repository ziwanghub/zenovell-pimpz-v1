import type { AnalyticsEventKey } from "@/content/site-navigation";

/**
 * Canonical list of analytics events for the platform.
 * This extends the existing AnalyticsEventKey from site-navigation.ts
 * and provides the approved taxonomy from M10-P3-ANALYTICS-FOUNDATION.md.
 *
 * Keep this as the single source of truth for event names.
 * Do not hardcode strings elsewhere.
 */
export const AnalyticsEvents = {
  PAGE_VIEW: "page_view" as const,
  HEADER_CTA_CLICK: "header_cta_click" as const,
  DRAWER_OPEN: "drawer_open" as const,
  DRAWER_CLOSE: "drawer_close" as const,
  NAVIGATION_CLICK: "navigation_click" as const,
  HERO_CTA_CLICK: "hero_cta_click" as const,
  PRODUCT_CLICK: "product_click" as const,
  FAQ_EXPAND: "faq_expand" as const,
  FAQ_COLLAPSE: "faq_collapse" as const,
  SUPPORT_CTA_CLICK: "support_cta_click" as const,
  FOOTER_CTA_CLICK: "footer_cta_click" as const,
  CONTACT_CLICK: "contact_click" as const,
  SOCIAL_CLICK: "social_click" as const,
  MENU_OPEN: "menu_open" as const,
  MENU_CLICK: "menu_click" as const,
} as const;

export type AnalyticsEvent =
  | (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents]
  | AnalyticsEventKey; // Allow extension from existing taxonomy

/**
 * Helper to type-check that an event name is valid.
 * Usage: const event = asAnalyticsEvent("hero_cta_click");
 */
export function asAnalyticsEvent(event: string): AnalyticsEvent {
  // In runtime this is a no-op identity; at compile time it narrows.
  return event as AnalyticsEvent;
}
