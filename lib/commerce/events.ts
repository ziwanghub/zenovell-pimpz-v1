/**
 * Commerce Events (Phase 4E)
 *
 * Pure, reusable Commerce Event contracts for the LINE-First Commerce Landing Platform.
 *
 * This completes the Commerce Foundation (4A-4E).
 *
 * Rules (strictly followed):
 * - Pure functions and contracts only
 * - No side effects
 * - No browser APIs (window, document, fetch, etc.)
 * - No network / SDK calls
 * - No runtime wiring
 * - No UI / routing / behavior changes
 * - Consumes (without modifying):
 *   - Product Authority (content/products.ts)
 *   - Commerce Context (lib/commerce/context.ts)
 *   - CTA Contract (lib/commerce/cta-contract.ts)
 *   - LINE Message Builder (lib/commerce/line-message-builder.ts)
 *
 * Future adapters (Google, Meta, TikTok, LINE, etc.) will consume the dispatcher.
 */

import type { Product } from "../../content/products";
import type { CommerceContext, UtmParams, Intent } from "./context";
import type { CtaPayload } from "./cta-contract";

/* ============================================
 * 1. Event Types
 * ============================================ */

export const CommerceEvents = {
  PRODUCT_VIEW: "product_view" as const,
  PRODUCT_CLICK: "product_click" as const,
  LINE_CLICK: "line_click" as const,
  CONVERSION_START: "conversion_start" as const,
  CONSULTATION_START: "consultation_start" as const,

  // Future events (defined for extensibility, not implemented yet)
  FRIEND_ADD: "friend_add" as const,
  CONVERSATION_START: "conversation_start" as const,
  PURCHASE_COMPLETE: "purchase_complete" as const,
  REPEAT_PURCHASE: "repeat_purchase" as const,
} as const;

export type CommerceEventName = (typeof CommerceEvents)[keyof typeof CommerceEvents];

/* ============================================
 * 2. Commerce Event Payload
 * ============================================ */

export interface CommerceEventPayload {
  eventName: CommerceEventName;
  product?: string;           // slug or id
  sku?: string;
  campaign?: string;
  source?: string;
  entrySurface?: string;      // hero, product-card, etc.
  landingPage?: string;
  intent?: Intent;
  utm?: UtmParams;
  timestamp: string;
  commerceContext?: CommerceContext;   // full enriched context
  lineMessagePreview?: string;         // truncated for debugging
  price?: number;                      // optional, from product
}

/* ============================================
 * 3. Event Builder (Pure)
 * ============================================ */

export interface BuildEventOptions {
  product?: Product | { slug: string; sku: string; title?: string };
  context?: CommerceContext;
  ctaPayload?: CtaPayload;
  lineMessage?: string;
}

export function buildCommerceEvent(
  eventName: CommerceEventName,
  options: BuildEventOptions = {}
): CommerceEventPayload {
  const { product, context, ctaPayload, lineMessage } = options;

  const base: Partial<CommerceEventPayload> = {
    eventName,
    timestamp: new Date().toISOString(),
  };

  // Enrich from Product Authority
  if (product) {
    const p = product as Partial<Product> & { product?: string };
    base.product = p.slug ?? p.product;
    base.sku = p.sku;
    if (p.pricing?.sale?.amount) {
      base.price = p.pricing.sale.amount;
    }
  }

  // Enrich from Commerce Context
  if (context) {
    base.product = base.product ?? context.product;
    base.sku = base.sku ?? context.sku;
    base.campaign = context.campaign;
    base.source = context.source;
    base.utm = context.utm;
    base.landingPage = context.landingPage;
    base.entrySurface = context.entrySurface;
    base.intent = context.intent;
    base.commerceContext = context;
  }

  // Enrich from CTA / Message Builder
  if (ctaPayload) {
    base.entrySurface = base.entrySurface ?? ctaPayload.surface;
    if (!base.lineMessagePreview && ctaPayload.lineMessage) {
      base.lineMessagePreview = ctaPayload.lineMessage.slice(0, 80);
    }
  }

  if (lineMessage && !base.lineMessagePreview) {
    base.lineMessagePreview = lineMessage.slice(0, 80);
  }

  return base as CommerceEventPayload;
}

/* ============================================
 * 4. Event Dispatcher (Pure Contract)
 * ============================================ */

export interface CommerceEventDispatcher {
  /**
   * Dispatch a commerce event.
   * Implementations (adapters) will handle actual delivery.
   * This contract must remain side-effect free at the core.
   */
  dispatch(event: CommerceEventPayload): void;

  /**
   * Future: register adapter (not implemented in 4E foundation)
   */
  // registerAdapter(adapter: any): void;
}

/**
 * No-op dispatcher for foundation phase.
 * Real dispatchers will be provided by future adapters.
 */
export class NoopCommerceEventDispatcher implements CommerceEventDispatcher {
  dispatch(event: CommerceEventPayload): void {
    // Intentionally empty - pure contract foundation
    // In later phases, adapters (GA4, Meta, LINE, etc.) will be attached here.
    void event;
  }
}

/**
 * Default dispatcher instance for the platform.
 */
export const commerceEventDispatcher: CommerceEventDispatcher = new NoopCommerceEventDispatcher();

/* ============================================
 * 5. Commerce Context Enrichment Helpers
 * ============================================ */

/**
 * Enrich an existing payload with full Commerce Context.
 * Pure function.
 */
export function enrichEventWithContext(
  event: CommerceEventPayload,
  context: CommerceContext
): CommerceEventPayload {
  return {
    ...event,
    product: event.product ?? context.product,
    sku: event.sku ?? context.sku,
    campaign: event.campaign ?? context.campaign,
    source: event.source ?? context.source,
    utm: event.utm ?? context.utm,
    landingPage: event.landingPage ?? context.landingPage,
    entrySurface: event.entrySurface ?? context.entrySurface,
    intent: event.intent ?? context.intent,
    commerceContext: context,
    timestamp: event.timestamp ?? new Date().toISOString(),
  };
}

/**
 * Build a commerce event directly from Product + Context (common pattern).
 */
export function buildEventFromProductAndContext(
  eventName: CommerceEventName,
  product: Product,
  context: CommerceContext
): CommerceEventPayload {
  const base = buildCommerceEvent(eventName, { product, context });
  return enrichEventWithContext(base, context);
}

/**
 * Build a commerce event from a CTA Payload (when user interacts with a CTA).
 */
export function buildEventFromCtaPayload(
  eventName: CommerceEventName,
  ctaPayload: CtaPayload,
  additionalContext?: Partial<CommerceContext>
): CommerceEventPayload {
  const context = {
    ...ctaPayload.commerceContext,
    ...additionalContext,
    entrySurface: ctaPayload.surface,
  };

  const base = buildCommerceEvent(eventName, {
    context,
    ctaPayload,
    lineMessage: ctaPayload.lineMessage,
  });

  return base;
}

/* ============================================
 * Type Exports for Consumers
 * ============================================ */

export type { CommerceContext, UtmParams, Intent } from "./context";
export type { Product } from "../../content/products";
export type { CtaPayload } from "./cta-contract";
