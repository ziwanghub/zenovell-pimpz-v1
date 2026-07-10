/**
 * GTM validation utilities.
 * Pure functions — safe to import from both Server and Client Components.
 *
 * Single source of truth for NEXT_PUBLIC_GTM_ID validation.
 */

/**
 * Validate GTM Container ID.
 *
 * Rules:
 * 1. Trim leading/trailing whitespace.
 * 2. Must match ^GTM-[A-Z0-9]+$
 * 3. Production value GTM-P7MSP66X must pass.
 * 4. No fixed length beyond the regex (official Google format allows variable length after GTM-).
 *
 * Rejects: empty, "abc", "G-J8HYPV9S4N", "GT-KDBK783H", "GTM_", "GTM-", IDs with spaces/symbols.
 */
export function isValidGtmContainerId(id: string | undefined | null): boolean {
  if (!id || typeof id !== 'string') return false;
  const trimmed = id.trim();
  return /^GTM-[A-Z0-9]+$/.test(trimmed);
}
