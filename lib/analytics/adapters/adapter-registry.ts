import type { AnalyticsAdapter } from "../types";
import { NoopAdapter } from "./noop-adapter";

/**
 * AdapterRegistry
 * 
 * Central registry for managing analytics adapters.
 * 
 * Responsibilities:
 * - Hold list of active adapters
 * - Provide registration / unregistration
 * - Ensure at least one adapter (NoopAdapter) is always present
 * - Allow querying registered adapters
 * 
 * This is the main entry point for adapter management.
 * The dispatcher can use this registry instead of direct array management.
 */
export class AdapterRegistry {
  private adapters: AnalyticsAdapter[] = [];

  constructor() {
    // Always start with a safe noop adapter
    this.adapters.push(new NoopAdapter());
  }

  /**
   * Register a new adapter.
   * If a NoopAdapter is currently the only one, it will be replaced.
   */
  register(adapter: AnalyticsAdapter): void {
    // Remove noop if this is the first real adapter
    if (this.adapters.length === 1 && this.adapters[0] instanceof NoopAdapter) {
      this.adapters = [];
    }

    // Avoid duplicates
    if (!this.adapters.some((a) => a.getName?.() === adapter.getName?.())) {
      this.adapters.push(adapter);
    }
  }

  /**
   * Unregister an adapter by name.
   * If all adapters are removed, re-insert NoopAdapter.
   */
  unregister(name: string): void {
    this.adapters = this.adapters.filter((a) => a.getName?.() !== name);

    if (this.adapters.length === 0) {
      this.adapters.push(new NoopAdapter());
    }
  }

  /**
   * Get all currently registered adapters.
   */
  getAll(): AnalyticsAdapter[] {
    return [...this.adapters];
  }

  /**
   * Clear all adapters and reset to NoopAdapter.
   * Useful for testing or reset scenarios.
   */
  reset(): void {
    this.adapters = [new NoopAdapter()];
  }

  /**
   * Check if any real (non-noop) adapter is registered.
   */
  hasRealAdapters(): boolean {
    return this.adapters.some((a) => !(a instanceof NoopAdapter));
  }
}

// Singleton registry instance
export const adapterRegistry = new AdapterRegistry();
