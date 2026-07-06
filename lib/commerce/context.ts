/**
 * Commerce Context (Phase 4B)
 *
 * Central contract for Commerce Context as defined in ADR-001.
 * This is the Single Source of Truth for passing commerce-related metadata
 * across the LINE-First Commerce Landing Platform.
 *
 * Used by:
 * - Future CTA surfaces
 * - LINE Message Builder (Phase 4C+)
 * - Analytics events (Phase 4E+)
 * - Product Landing Pages (future)
 *
 * Minimum approved fields only. Backward compatible by design.
 * Relies on Product Authority (content/products.ts) as the source of truth
 * for product, sku, and related data.
 */

/**
 * UTM parameters (standard 4 fields).
 * Captured from URL or passed explicitly.
 */
export interface UtmParams {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
}

/**
 * Intent classification (extensible per ADR-001).
 * Initial values align with Intent Classification section.
 */
export type Intent =
  | "research"
  | "high_intent"
  | "promotion"
  | "product"
  | "returning_customer"
  | (string & {}); // allow extension

/**
 * Core Commerce Context contract.
 * All fields are optional except timestamp (always present).
 * This is the central contract per ADR-001.
 * Consumers (future phases) should pair with Product Authority for product details.
 */
export interface CommerceContext {
  /** Product identifier (slug or id) */
  product?: string;

  /** SKU (e.g. "NPB-001") */
  sku?: string;

  /** Campaign identifier */
  campaign?: string;

  /** Traffic source (e.g. "google", "meta", "organic", "direct") */
  source?: string;

  /** Structured UTM data */
  utm?: UtmParams;

  /** The landing page or route where context was captured */
  landingPage?: string;

  /** Entry surface that initiated the context (e.g. "hero", "product-card", "final-cta") */
  entrySurface?: string;

  /** Classified user intent at time of capture */
  intent?: Intent;

  /** ISO timestamp when context was created */
  timestamp: string;
}

/**
 * Creates a new Commerce Context.
 * Always includes a fresh timestamp.
 * Use this as the canonical way to instantiate context objects.
 */
export function createCommerceContext(
  partial: Partial<Omit<CommerceContext, "timestamp">> = {}
): CommerceContext {
  return {
    timestamp: new Date().toISOString(),
    ...partial,
  };
}

/**
 * Creates a basic Commerce Context.
 * In later phases, pair with Product Authority to populate product/sku.
 */
export function createContextFromProduct(
  productData: { slug: string; sku: string; title?: string },
  partial: Partial<Omit<CommerceContext, "timestamp" | "product" | "sku">> = {}
): CommerceContext {
  return createCommerceContext({
    product: productData.slug,
    sku: productData.sku,
    ...partial,
  });
}

/**
 * Type guard to check if a value is a valid CommerceContext.
 */
export function isCommerceContext(value: unknown): value is CommerceContext {
  return (
    typeof value === "object" &&
    value !== null &&
    "timestamp" in value &&
    typeof (value as CommerceContext).timestamp === "string"
  );
}
