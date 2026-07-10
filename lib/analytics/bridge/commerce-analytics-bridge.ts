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
 *
 * LINE_CLICK (commerce domain) is mapped to the analytics event "line_cta_click"
 * per GTM authority contract. All other commerce events pass through with original name.
 */
export function bridgeCommerceEventToAnalytics(commerceEvent: CommerceEventPayload): void {
  // Map the canonical commerce LINE_CLICK to the approved analytics event name
  // Commerce uses lowercase "line_click" (see lib/commerce/events.ts)
  const analyticsEventName =
    commerceEvent.eventName === 'line_click'
      ? 'line_cta_click'
      : commerceEvent.eventName;

  // Build structured payload
  const payload: AnalyticsPayload = {
    event: analyticsEventName,
    surface: commerceEvent.entrySurface,
    destination: 'line_oa', // canonical for LINE handoff
    // Map key commerce fields into metadata
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
      // Explicit structured params for dataLayer / GTM
      page_path: commerceEvent.landingPage,
      link_url: 'https://lin.ee/syjmYE2',
    },
    timestamp: commerceEvent.timestamp,
  };

  // Dispatch via the central analytics singleton (will reach GTMAdapter when registered)
  analytics.track(analyticsEventName as unknown as Parameters<typeof analytics.track>[0], payload);
}
