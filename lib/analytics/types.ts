/**
 * Vendor-neutral analytics payload contract.
 * This is the canonical shape for all analytics events.
 * Adapters are responsible for mapping this to vendor-specific formats.
 */
export interface AnalyticsPayload {
  /** The event name, e.g. "hero_cta_click" */
  event: string;

  /** Logical surface where the event originated (header, hero, drawer, faq, footer, etc.) */
  surface?: string;

  /** Section identifier (e.g. "1", "9", "11", "global") */
  section?: string;

  /** Destination or target of the action (href or destinationId) */
  destination?: string;

  /** Human-readable label or aria-label of the element */
  label?: string;

  /** Optional numeric or string value (e.g. product id, count) */
  value?: string | number;

  /** ISO timestamp; dispatcher will fill if missing */
  timestamp?: string;

  /** Current path; dispatcher will fill if missing */
  path?: string;

  /** Additional metadata (keep minimal for privacy) */
  metadata?: Record<string, unknown>;
}

/**
 * Interface that all analytics adapters must implement.
 * This keeps the core utility completely vendor-neutral.
 */
export interface AnalyticsAdapter {
  /**
   * Track an event with the neutral payload.
   * Adapters must not throw; they should fail silently or log in dev.
   */
  track(payload: AnalyticsPayload): void;

  /**
   * Optional: return a name for the adapter (used by registry).
   */
  getName?(): string;

  /**
   * Optional: perform initialization when the adapter is registered.
   */
  initialize?(): void | Promise<void>;
}
