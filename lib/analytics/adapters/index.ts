/**
 * Vendor Adapter Foundation (M10-P3D-1)
 * 
 * This module provides the infrastructure for plugging in analytics vendors
 * in a completely neutral way.
 * 
 * Current exports:
 * - BaseAdapter: abstract base for all adapters
 * - NoopAdapter: safe default adapter
 * - AdapterRegistry + singleton
 * - AdapterFactory
 * - initializeAnalyticsAdapters
 * 
 * Real vendor adapters will be added in subsequent P3D patches.
 */

export * from "./base-adapter";
export * from "./noop-adapter";
export * from "./adapter-registry";
export * from "./adapter-factory";
export * from "./initialize";
export * from "./ga4-adapter";
