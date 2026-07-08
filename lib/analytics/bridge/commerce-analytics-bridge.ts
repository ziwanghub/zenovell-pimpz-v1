import type { CommerceEventPayload } from '@/lib/commerce/events';
import { analytics } from '@/lib/analytics';
import type { AnalyticsPayload } from '@/lib/analytics/types';

/**
 * Analytics Bridge - Sole translation layer between Commerce and Analytics.
 *
 * This is the ONLY module allowed to invoke the Analytics Dispatcher
 * on behalf of Commerce events.
 *
 * Rules (enforced):
 * - Pure translation only
 * - No business logic
 * - No persistence
 * - No adapter knowledge
 * - Commerce layer remains analytics-agnostic
 * - Analytics layer remains commerce-agnostic (receives standard AnalyticsPayload)
 */
export function bridgeCommerceEventToAnalytics(commerceEvent: CommerceEventPayload): void {
  const payload: AnalyticsPayload = {
    event: commerceEvent.eventName,
    surface: commerceEvent.entrySurface,
    destination: commerceEvent.landingPage,
    // Map key commerce fields into metadata to preserve information
    // without polluting the top-level AnalyticsPayload schema
    metadata: {
      product: commerceEvent.product,
      sku: commerceEvent.sku,
      campaign: commerceEvent.campaign,
      source: commerceEvent.source,
      intent: commerceEvent.intent,
      utm: commerceEvent.utm,
      commerceContext: commerceEvent.commerceContext,
      lineMessagePreview: commerceEvent.lineMessagePreview,
      price: commerceEvent.price,
    },
    timestamp: commerceEvent.timestamp,
  };

  // The Bridge is the only one that calls analytics.track() for commerce events
  // Using unknown cast to satisfy strict typing while allowing commerce event names
  analytics.track(commerceEvent.eventName as unknown as Parameters<typeof analytics.track>[0], payload);
}
