import type { AnalyticsPayload } from "../types";
import { BaseAdapter } from "./base-adapter";

/**
 * NoopAdapter
 * 
 * A safe no-operation adapter.
 * Used as default/fallback when no real vendors are configured.
 * 
 * This adapter does nothing but satisfies the interface.
 * It is always safe to register.
 */
export class NoopAdapter extends BaseAdapter {
  constructor() {
    super("noop");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  track(_payload: AnalyticsPayload): void {
    // Intentionally does nothing.
    // This is the safe default.
  }

}
