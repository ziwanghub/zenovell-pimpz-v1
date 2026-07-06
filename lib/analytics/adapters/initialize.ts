import { adapterRegistry } from "./adapter-registry";
import { AdapterFactory } from "./adapter-factory";

/**
 * initializeAnalyticsAdapters
 * 
 * Entry point for initializing the adapter layer.
 * 
 * In M10-P3D-1 this only ensures a NoopAdapter is registered.
 * 
 * Future calls (in P3D-2+) can pass a list of adapter names
 * to be created via the factory and registered.
 * 
 * This function is safe to call multiple times (idempotent).
 */
export function initializeAnalyticsAdapters(adapterNames: string[] = ["noop"]): void {
  // Reset to clean state first (keeps only noop)
  adapterRegistry.reset();

  for (const name of adapterNames) {
    try {
      const adapter = AdapterFactory.create(name);
      adapterRegistry.register(adapter);

      // Optional initialization hook if adapter supports it
      if (typeof adapter.initialize === "function") {
        adapter.initialize();
      }
    } catch (error) {
      // Never let adapter initialization break the app
      if (process.env.NODE_ENV === "development") {
        console.warn(`[Analytics] Failed to initialize adapter "${name}":`, error);
      }
    }
  }
}

/**
 * Convenience function to get the current registry.
 * Useful for testing or advanced usage.
 */
export function getAdapterRegistry() {
  return adapterRegistry;
}
