import type { AnalyticsAdapter, AnalyticsPayload } from "../types";

/**
 * BaseAdapter
 * 
 * Abstract base class for all analytics adapters.
 * Provides common behavior and enforces the AnalyticsAdapter interface.
 * 
 * All future vendor adapters should extend this class.
 */
export abstract class BaseAdapter implements AnalyticsAdapter {
  protected readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  /**
   * Concrete adapters must implement this method.
   * The base provides safety wrapper.
   */
  abstract track(payload: AnalyticsPayload): void;

  /**
   * Optional: Adapters can override to perform initialization.
   */
  initialize?(): void | Promise<void> {}

  getName(): string {
    return this.name;
  }
}
