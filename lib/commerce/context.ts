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

/**
 * Canonical Commerce Context Merge Policy (Phase 6C Batch 2)
 *
 * This is the SINGLE SOURCE OF TRUTH for merging current interaction context
 * with persisted context.
 *
 * ## Guiding Principles (locked in Blueprint)
 * 1. Current Interaction is the Source of Truth for interaction semantics.
 * 2. Persisted Context is an Attribution Fallback only.
 * 3. Merge logic must exist in exactly one location.
 * 4. All CTA surfaces must consume the same merge policy.
 * 5. No UI component may implement its own merge logic.
 *
 * ## Ownership Rules
 * Current interaction ALWAYS owns (never overridden by persisted):
 *   - entrySurface
 *   - landingPage
 *   - intent
 *   - product
 *   - sku
 *   - timestamp
 *
 * Persisted context MAY contribute ONLY when the value is absent in current:
 *   - source
 *   - campaign
 *   - medium (via utm)
 *   - utm
 *   - referrer (if present in persisted)
 *
 * timestamp is ALWAYS taken from baseContext (the current interaction).
 *
 * @param baseContext - The context built from the current CTA interaction.
 * @param persistedContext - Previously saved context (if any).
 * @returns A new CommerceContext object following the canonical policy.
 */
export function mergeCommerceContext(
  baseContext: CommerceContext,
  persistedContext?: CommerceContext | null
): CommerceContext {
  // Start with a shallow copy of base (current interaction wins by default)
  const result: CommerceContext = { ...baseContext };

  if (!persistedContext) {
    return result;
  }

  // Attribution fields: only fill from persisted if absent in current
  if (!result.source && persistedContext.source) {
    result.source = persistedContext.source;
  }

  if (!result.campaign && persistedContext.campaign) {
    result.campaign = persistedContext.campaign;
  }

  // utm handling: if current has no utm, take from persisted
  if (!result.utm && persistedContext.utm) {
    result.utm = { ...persistedContext.utm };
  }

  // referrer: not a top-level field in current interface.
  // If persisted has it (future-proofing), we do not add it to avoid
  // introducing new fields in this batch. Policy is documented above.

  // Explicitly ensure critical current fields (defense in depth)
  result.entrySurface = baseContext.entrySurface;
  result.landingPage = baseContext.landingPage;
  result.intent = baseContext.intent;
  result.product = baseContext.product;
  result.sku = baseContext.sku;

  // timestamp ALWAYS from current base
  result.timestamp = baseContext.timestamp;

  return result;
}
