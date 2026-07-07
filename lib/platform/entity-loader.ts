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

import type { Information } from '@/content/information';
import { getAllInformation, getInformationBySlug } from '@/content/information';

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
 * Load an Information page by slug from Information Authority.
 */
export function loadInformationBySlug(slug: string): EntityLoadResult<Information> {
  const info = getInformationBySlug(slug) ?? null;

  return {
    entity: info,
    found: info !== null,
    type: 'information',
  };
}

/**
 * Get all available information pages.
 * Returns a copy to prevent mutation.
 */
export function getAllInformationPages(): Information[] {
  return [...getAllInformation()];
}

/**
 * Generic entity loader.
 * Supports product (existing) and information (Phase 5D).
 */
export function loadEntity(type: EntityType, identifier: string): EntityLoadResult {
  if (type === 'product') {
    // Prefer slug, fallback to sku for flexibility
    const bySlug = loadProductBySlug(identifier);
    if (bySlug.found) return bySlug;

    return loadProductBySku(identifier);
  }

  if (type === 'information') {
    return loadInformationBySlug(identifier);
  }

  // Placeholder for future entity types (e.g. knowledge)
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
