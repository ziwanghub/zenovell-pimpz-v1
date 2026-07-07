/**
 * Platform Utilities (Phase 5A)
 *
 * Shared platform-level utilities and types for the Commerce Experience Platform.
 *
 * This is the foundation layer for Phase 5.
 * All new platform code should be organized under lib/platform/.
 */

// Re-export key loaders and persistence for convenience
export * from './entity-loader';
export * from '../commerce/persistence';
export * from './seo';

// Common platform types
export interface PlatformPageParams {
  slug: string;
}

export interface PlatformPageProps {
  params: PlatformPageParams;
  searchParams?: Record<string, string | string[] | undefined>;
}

/**
 * Utility to generate a commerce-aware page title.
 * Can be extended later with full context.
 */
export function generatePlatformTitle(base: string, productName?: string): string {
  if (productName) {
    return `${productName} | ZENOVELL`;
  }
  return `${base} | ZENOVELL`;
}

/**
 * Placeholder for future shared navigation / breadcrumb helpers.
 * Kept minimal for Phase 5A.
 */
export const platformNav = {
  home: '/',
  products: '/products',
  information: '/information',
  knowledge: '/knowledge',
};
