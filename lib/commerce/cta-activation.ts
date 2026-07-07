/**
 * CTA Activation (Batch 1 — Shared Activation Pattern)
 *
 * Thin orchestration layer for LINE handoff using existing Phase 5 commerce contracts.
 *
 * This file provides reusable activation logic so that homepage CTA surfaces
 * (and future surfaces) can consistently:
 *   - Build or receive Commerce Context via official helpers
 *   - Generate LINE message via canonical builders
 *   - Dispatch events
 *   - Persist + clear context
 *   - Perform real LINE handoff
 *
 * Rules (enforced for Batch 1 and all later batches):
 * - This helper is THIN. It only orchestrates existing pure contracts.
 * - No new architecture, no heavy abstractions, no side-effectful state beyond the documented contracts.
 * - All context creation MUST go through createCommerceContext / createContextFromProduct.
 * - All messages MUST go through buildLineMessage or buildNonProductLineMessage.
 * - No direct window.open or sessionStorage outside the persistence contract.
 * - No UI, no routing, no visual changes.
 *
 * Later batches (Header, Hero, Product Grid, etc.) will call these functions.
 */

'use client';

import type { CommerceContext } from './context';
import {
  createCommerceContext,
  createContextFromProduct,
} from './context';
import {
  saveCommerceContext,
  clearCommerceContext,
  loadCommerceContext,
} from './persistence';
import {
  buildCommerceEvent,
  CommerceEvents,
  commerceEventDispatcher,
} from './events';
import {
  buildNonProductLineMessage,
} from './line-message-builder';
import {
  createCtaPayload,
  type CtaPayload,
  type CtaSurface,
  type ProductShape,
} from './cta-contract';

/**
 * Options for high-level activation.
 * Callers can pass either a product (for product-aware CTAs) or a title (for non-product).
 */
export interface ActivateLineCtaOptions {
  product?: ProductShape;
  title?: string;
  surface: CtaSurface;
  landingPage?: string;
  intent?: string;
  source?: string;
  campaign?: string;
}

/**
 * Pure helper: build the LINE handoff URL from a pre-built message.
 * Useful for progressive enhancement or testing.
 */
export function buildLineHandoffUrl(message: string): string {
  return `https://line.me/R/msg/text/?${encodeURIComponent(message)}`;
}

/**
 * Core side-effect function.
 * Performs the full activation flow using the provided context and message.
 *
 * This is the single place where the documented sequence happens:
 *   dispatch → save → open → clear
 */
export function performLineHandoff(params: {
  context: CommerceContext;
  message: string;
  _surface?: CtaSurface; // reserved for future enrichment (carried in context)
}): void {
  const { context, message } = params;

  // Dispatch using existing event builder (enriched)
  commerceEventDispatcher.dispatch(
    buildCommerceEvent(CommerceEvents.LINE_CLICK, {
      context,
      lineMessage: message,
    })
  );

  // Persist before handoff (for continuity on return)
  saveCommerceContext(context);

  // Real handoff using the established pattern
  const lineUrl = buildLineHandoffUrl(message);
  if (typeof window !== 'undefined') {
    window.open(lineUrl, '_blank');
  }

  // Clear after successful handoff (per contract)
  clearCommerceContext();
}

/**
 * High-level convenience for CTA surfaces.
 *
 * This is the recommended entry point for Batch 2+.
 * It handles:
 * - Context creation via official helpers
 * - Merge with persisted context (persisted values have highest priority)
 * - Message building via canonical builders
 * - Delegation to performLineHandoff
 *
 * Stays thin: no business logic, no UI, just orchestration.
 */
export function activateLineCta(options: ActivateLineCtaOptions): void {
  const {
    product,
    title,
    surface,
    landingPage = '/',
    intent = 'high_intent',
    source = 'homepage',
    campaign,
  } = options;

  // 1. Build base context using official helpers only
  const baseContext = product
    ? createContextFromProduct(
        {
          slug: product.slug,
          sku: product.sku,
          title: product.title,
        },
        {
          entrySurface: surface,
          landingPage,
          intent,
          source,
          campaign,
        }
      )
    : createCommerceContext({
        entrySurface: surface,
        landingPage,
        intent,
        source,
        campaign,
      });

  // 2. Merge with any persisted context — persisted has highest priority for returning users
  //    (previous intent, source, campaign, utm etc. are preserved over the current baseContext)
  //    Current timestamp always wins to reflect "now".
  const persisted = loadCommerceContext();
  const context: CommerceContext = persisted
    ? { ...baseContext, ...persisted, timestamp: baseContext.timestamp }
    : baseContext;

  // 3. Build message using the correct canonical builder
  let message: string;
  if (product) {
    // Prefer CTA contract for product-aware surfaces (consistent with Blueprint)
    const payload = createCtaPayload(product, context, surface);
    message = payload.lineMessage;
  } else {
    // Non-product surfaces (consultation, FAQ, etc.)
    const displayTitle = title || 'Consultation';
    message = buildNonProductLineMessage(displayTitle, context);
  }

  // 4. Perform the handoff (dispatch + persist + open + clear)
  performLineHandoff({
    context,
    message,
  });
}

/**
 * Alternative entry point when you already have a CtaPayload
 * (e.g. after using createCtaPayload from the contract).
 *
 * This keeps activation separate from payload building.
 */
export function activateFromCtaPayload(payload: CtaPayload): void {
  if (!payload.lineMessage) {
    // Fallback: should not happen if payload was built correctly
    console.warn('[cta-activation] CtaPayload missing lineMessage');
    return;
  }

  performLineHandoff({
    context: payload.commerceContext,
    message: payload.lineMessage,
    // surface carried inside context; kept for API shape compatibility
  });
}

/**
 * Re-export commonly needed types for consumers in later batches.
 */
export type { CtaSurface, CtaPayload } from './cta-contract';
export type { CommerceContext } from './context';
