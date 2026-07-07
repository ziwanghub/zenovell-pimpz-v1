/**
 * Commerce Context Persistence (Phase 5A Skeleton)
 *
 * This is a SKELETON only for Phase 5A Platform Structure.
 * No actual wiring, no hooks, no runtime usage yet.
 *
 * Purpose:
 * - Define the contract for persisting Commerce Context across navigation
 * - Use Session Storage as the Phase 5 mechanism (per Persistence Blueprint)
 * - Keep Commerce Context channel-independent
 *
 * This file will be expanded in later sub-phases (5F etc.) after proper Scope Lock and wiring approval.
 */

import type { CommerceContext } from './context';

const STORAGE_KEY = 'zenovell_commerce_ctx_v1';

/**
 * Save Commerce Context to Session Storage.
 * This is a skeleton implementation.
 */
export function saveCommerceContext(context: CommerceContext): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(context));
  } catch (err) {
    // Silent fail in skeleton phase
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Commerce Persistence Skeleton] Failed to save context:', err);
    }
  }
}

/**
 * Load Commerce Context from Session Storage.
 * Returns null if not present or invalid.
 */
export function loadCommerceContext(): CommerceContext | null {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CommerceContext;
    // Basic shape validation (timestamp is required)
    if (parsed && typeof parsed.timestamp === 'string') {
      return parsed;
    }
    return null;
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Commerce Persistence Skeleton] Failed to load context:', err);
    }
    return null;
  }
}

/**
 * Clear persisted Commerce Context.
 */
export function clearCommerceContext(): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Commerce Persistence Skeleton] Failed to clear context:', err);
    }
  }
}

/**
 * Check if Commerce Context is currently persisted.
 */
export function hasPersistedCommerceContext(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

/**
 * Future extension point.
 * This will support different adapters (cookie, server session, etc.) in later phases.
 */
export interface CommerceContextPersistenceAdapter {
  save(context: CommerceContext): void;
  load(): CommerceContext | null;
  clear(): void;
}

// Default adapter for Phase 5 (Session Storage)
export const defaultPersistenceAdapter: CommerceContextPersistenceAdapter = {
  save: saveCommerceContext,
  load: loadCommerceContext,
  clear: clearCommerceContext,
};
