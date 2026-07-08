/**
 * CTA Contract (Phase 6C Standardized)
 *
 * Reusable, dependency-injected CTA contract layer for the LINE-First Commerce Landing Platform.
 *
 * Supports both Product and Non-Product CTA surfaces.
 *
 * Connects:
 * - Product Authority (content/products.ts)
 * - Commerce Context (lib/commerce/context.ts)
 * - LINE Message Builder (lib/commerce/line-message-builder.ts)
 *
 * This is the canonical contract interface + pure payload builders.
 * No runtime integration, no UI, no behavior changes.
 *
 * Phase 6C standardization: product and non-product paths unified under contract.
 * Preserves all existing runtime behavior and surface names from Phase 6A/6B.
 *
 * Per ADR-001, Scope Lock, and Roadmap: formalizes CTA taxonomy and ensures
 * every CTA surface can produce consistent Commerce Context + LINE message.
 */

import type { CommerceContext } from "./context";
import { buildLineMessage, buildNonProductLineMessage } from "./line-message-builder";

/**
 * Minimal Product shape from Product Authority (content/products.ts).
 * Avoids direct module dependency for CI compatibility in release patches.
 */
export type ProductShape = {
  slug: string;
  sku: string;
  title: string;
  cta: {
    label: string;
    ariaLabel: string;
  };
  linePayloadMetadata?: {
    sku: string;
    title: string;
    saleDisplay: string;
    originalDisplay: string;
  };
};

/**
 * Minimal Non-Product shape for non-product CTA surfaces.
 * Used for support, consultation, FAQ, etc.
 */
export type NonProductShape = {
  title: string;
};

/**
 * Minimal CtaDestination shape for compatibility.
 */
type CtaDestinationShape = {
  id?: string;
  label?: string;
  href?: string;
  ariaLabel?: string;
};

/**
 * Supported CTA surfaces / taxonomy (extensible).
 * Mirrors existing ctaDestinations ids for compatibility.
 */
export type CtaSurface =
  | "header-line"
  | "hero-line"
  | "featured-product-line"
  | "product-grid-card"
  | "product-grid-final"
  | "faq-support"
  | "faq-primary"
  | "final-cta"
  | "footer-line"
  | "footer-contact-line"
  | "section-line"
  | "support-line"
  | (string & {}); // allow future surfaces

/**
 * Reusable CTA Contract interface (for dependency injection in future phases).
 */
export interface ICtaContract {
  /**
   * Build a commerce-enriched CTA payload for a given product, context, and surface.
   */
  createPayload(
    product: ProductShape,
    context: CommerceContext,
    surface: CtaSurface,
    baseDestination?: Partial<CtaDestinationShape>
  ): CtaPayload;

  /**
   * Build a commerce-enriched CTA payload for non-product surfaces.
   */
  createNonProductPayload(
    title: string,
    context: CommerceContext,
    surface: CtaSurface,
    baseDestination?: Partial<CtaDestinationShape>
  ): CtaPayload;
}

/**
 * The payload produced by CTA contracts.
 * Contains everything needed for rendering + handoff (without performing the handoff).
 */
export interface CtaPayload {
  id: string;
  label: string;
  ariaLabel: string;
  href: string; // kept as placeholder per current design (no redirect changes)
  lineMessage: string;
  commerceContext: CommerceContext;
  surface: CtaSurface;
}

/**
 * Default pure implementation of the CTA contract.
 * This is the reusable builder.
 */
export const defaultCtaContract: ICtaContract = {
  createPayload(
    product: ProductShape,
    context: CommerceContext,
    surface: CtaSurface,
    baseDestination?: Partial<CtaDestinationShape>
  ): CtaPayload {
    // Merge context with surface info (non-mutating)
    const enrichedContext: CommerceContext = {
      ...context,
      entrySurface: surface,
      product: context.product ?? product.slug,
      sku: context.sku ?? product.sku,
    };

    // Generate LINE message using the dedicated builder
    const lineMessage = buildLineMessage(product, enrichedContext);

    // Use product CTA as base, allow override from destination
    const label = baseDestination?.label ?? product.cta.label;
    const ariaLabel = baseDestination?.ariaLabel ?? product.cta.ariaLabel;
    const href = baseDestination?.href ?? "#line-primary";

    const id = baseDestination?.id ?? `${surface}`;

    return {
      id,
      label,
      ariaLabel,
      href,
      lineMessage,
      commerceContext: enrichedContext,
      surface,
    };
  },

  createNonProductPayload(
    title: string,
    context: CommerceContext,
    surface: CtaSurface,
    baseDestination?: Partial<CtaDestinationShape>
  ): CtaPayload {
    const enrichedContext: CommerceContext = {
      ...context,
      entrySurface: surface,
    };

    const lineMessage = buildNonProductLineMessage(title, enrichedContext);

    const label = baseDestination?.label ?? title;
    const ariaLabel = baseDestination?.ariaLabel ?? title;
    const href = baseDestination?.href ?? "#line-primary";

    const id = baseDestination?.id ?? `${surface}`;

    return {
      id,
      label,
      ariaLabel,
      href,
      lineMessage,
      commerceContext: enrichedContext,
      surface,
    };
  },
};

/**
 * Convenience pure helper (for direct use without the interface).
 */
export function createCtaPayload(
  product: ProductShape,
  context: CommerceContext,
  surface: CtaSurface,
  baseDestination?: Partial<CtaDestinationShape>
): CtaPayload {
  return defaultCtaContract.createPayload(product, context, surface, baseDestination);
}

export function createNonProductCtaPayload(
  title: string,
  context: CommerceContext,
  surface: CtaSurface,
  baseDestination?: Partial<CtaDestinationShape>
): CtaPayload {
  return defaultCtaContract.createNonProductPayload(title, context, surface, baseDestination);
}

/**
 * Helper to attach commerce context to an existing CtaDestination shape (for future wiring).
 * Returns a new object; does not mutate.
 */
export function withCommerceContext(
  destination: CtaDestinationShape,
  context: CommerceContext
): CtaDestinationShape & { commerceContext: CommerceContext } {
  return {
    ...destination,
    commerceContext: {
      ...context,
      entrySurface: destination.id as CtaSurface,
    },
  };
}
