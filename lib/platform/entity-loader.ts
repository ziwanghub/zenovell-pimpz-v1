/**
 * Entity Loader (Phase 5A Platform Structure)
 *
 * Skeleton for loading entities from Product Authority.
 * This is the foundation for entity-driven architecture in Phase 5.
 *
 * Currently supports Product entity only.
 * Designed to be extended for other entities (Information, Knowledge) in later phases.
 *
 * Does NOT modify Product Authority.
 * Pure loader functions.
 */

import type { Product } from '@/content/products';
import { products } from '@/content/products';

export type EntityType = 'product' | 'information' | 'knowledge';

export interface EntityLoadResult<T = unknown> {
  entity: T | null;
  found: boolean;
  type: EntityType;
}

/**
 * Load a Product by slug from Product Authority.
 * This is the canonical way to access product data in Phase 5+.
 */
export function loadProductBySlug(slug: string): EntityLoadResult<Product> {
  const product = products.find((p) => p.slug === slug) ?? null;

  return {
    entity: product,
    found: product !== null,
    type: 'product',
  };
}

/**
 * Load a Product by SKU (alternative lookup).
 */
export function loadProductBySku(sku: string): EntityLoadResult<Product> {
  const product = products.find((p) => p.sku === sku) ?? null;

  return {
    entity: product,
    found: product !== null,
    type: 'product',
  };
}

/**
 * Generic entity loader stub.
 * Will be expanded in 5B+ for Information and Knowledge entities.
 */
export function loadEntity(type: EntityType, identifier: string): EntityLoadResult {
  if (type === 'product') {
    // Prefer slug, fallback to sku for flexibility
    const bySlug = loadProductBySlug(identifier);
    if (bySlug.found) return bySlug;

    return loadProductBySku(identifier);
  }

  // Placeholder for future entity types
  return {
    entity: null,
    found: false,
    type,
  };
}

/**
 * Get all available products (for listing, related, etc.).
 * Returns a copy to prevent mutation.
 */
export function getAllProducts(): Product[] {
  return [...products];
}

/**
 * Check if a product exists (lightweight check).
 */
export function productExists(slugOrSku: string): boolean {
  return loadProductBySlug(slugOrSku).found || loadProductBySku(slugOrSku).found;
}
