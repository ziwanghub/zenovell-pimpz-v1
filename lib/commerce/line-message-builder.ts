/**
 * LINE Message Builder (Phase 4C)
 *
 * Pure, reusable builder for generating pre-filled LINE OA message text.
 *
 * Consumes ONLY:
 * - Product Authority (content/products.ts)
 * - Commerce Context (lib/commerce/context.ts)
 *
 * This is the foundation for all future LINE pre-filled messages
 * in the LINE-First Commerce Landing Platform (ADR-001).
 *
 * Rules followed:
 * - Pure functions only
 * - No side effects
 * - No browser APIs (window, document, fetch, etc.)
 * - No LINE SDK / Messaging API
 * - No runtime wiring, redirects, or UI
 *
 * Supports all required fields from ADR-001 and Phase 4C spec:
 * product, sku, campaign, source, utm, landingPage, entrySurface, intent
 *
 * Extensibility: Options object and helper functions allow future enhancements
 * without breaking existing callers.
 */

import type { CommerceContext, UtmParams } from "./context";

/**
 * Minimal shape from Product Authority (content/products.ts).
 * The builder is designed to receive objects from the Single Source of Truth.
 * This local interface avoids direct module dependency for compilation in release patches.
 */
type ProductShape = {
  title: string;
  sku: string;
  linePayloadMetadata?: {
    sku: string;
    title: string;
    saleDisplay: string;
    originalDisplay: string;
  };
};

/**
 * Options for controlling message generation.
 * Designed for future extensibility (e.g. language, additional fields, custom templates).
 */
export interface LineMessageOptions {
  /** Whether to include price information (default: true) */
  includePrice?: boolean;
  /** Whether to include intent classification (default: true) */
  includeIntent?: boolean;
  /** Optional custom prefix for the message (for extensibility) */
  prefix?: string;
}

/**
 * Formats UTM parameters into a human-readable string.
 * Example: "june-promo / catalog-nicky"
 */
export function formatUtmLine(utm?: UtmParams): string | undefined {
  if (!utm) return undefined;

  const parts: string[] = [];

  if (utm.campaign) parts.push(utm.campaign);
  if (utm.content) parts.push(utm.content);

  if (parts.length > 0) {
    return parts.join(" / ");
  }

  // Fallback to source if no campaign/content
  if (utm.source) {
    return utm.source;
  }

  return undefined;
}

/**
 * Builds a pre-filled LINE message text using Product Authority and Commerce Context.
 *
 * This is the primary reusable function for Phase 4C+.
 *
 * @param product - Product from the Product Authority (single source of truth)
 * @param context - Commerce Context containing campaign, utm, surface, intent, etc.
 * @param options - Optional configuration for message content
 * @returns Formatted multi-line string ready for LINE pre-fill
 */
export function buildLineMessage(
  product: ProductShape,
  context: CommerceContext,
  options: LineMessageOptions = {}
): string {
  const { linePayloadMetadata, title: productTitle, sku: productSku } = product;
  const { utm, campaign, source, entrySurface, landingPage, intent } = context;

  const lines: string[] = [];

  // Use linePayloadMetadata when available (preferred), fallback to product fields
  const displayTitle = linePayloadMetadata?.title || productTitle;
  const displaySku = linePayloadMetadata?.sku || productSku;

  lines.push(`สนใจ: ${displayTitle}`);
  lines.push(`SKU: ${displaySku}`);

  // Price section (optional)
  if (options.includePrice !== false && linePayloadMetadata) {
    const { saleDisplay, originalDisplay } = linePayloadMetadata;
    if (saleDisplay && originalDisplay) {
      lines.push(`ราคา: ${saleDisplay} (จาก ${originalDisplay})`);
    }
  }

  // Source / UTM / Campaign information
  const utmLine = formatUtmLine(utm);
  if (utmLine) {
    lines.push(`ที่มา: ${utmLine}`);
  } else if (campaign || source) {
    const sourceParts = [campaign, source].filter(Boolean);
    if (sourceParts.length > 0) {
      lines.push(`ที่มา: ${sourceParts.join(" / ")}`);
    }
  }

  // Entry surface (where the user came from)
  const surface = entrySurface || landingPage;
  if (surface) {
    lines.push(`ข้อความจาก: ${surface}`);
  }

  // Intent (for future routing / personalization)
  if (options.includeIntent !== false && intent) {
    lines.push(`Intent: ${intent}`);
  }

  // Optional prefix for extensibility (e.g. branding or A/B variants)
  if (options.prefix) {
    return `${options.prefix}\n${lines.join("\n")}`;
  }

  return lines.join("\n");
}

/**
 * Convenience wrapper for common use cases.
 * Equivalent to buildLineMessage(product, context, { includePrice: true, includeIntent: true })
 */
export function buildStandardLineMessage(
  product: ProductShape,
  context: CommerceContext
): string {
  return buildLineMessage(product, context, {
    includePrice: true,
    includeIntent: true,
  });
}

/**
 * Creates a message focused on research/education use case (less commercial).
 * Useful for "Research" intent.
 */
export function buildResearchLineMessage(
  product: ProductShape,
  context: CommerceContext
): string {
  return buildLineMessage(product, context, {
    includePrice: false,
    includeIntent: false,
  });
}

/**
 * Additive helper for non-product surfaces (Information, Knowledge).
 * Builds a consistent context-rich message for research/intent flows.
 * Does not require ProductShape. Additive only - does not affect Product path.
 */
export function buildNonProductLineMessage(
  title: string,
  context: CommerceContext,
  prefix: string = 'Hello ZENOVELL'
): string {
  const contextLine = [
    `Topic: ${title}`,
    `URL: ${context.landingPage}`,
    `Intent: ${context.intent}`,
    `Source: ${context.source}`,
    context.timestamp ? `At: ${context.timestamp}` : '',
  ]
    .filter(Boolean)
    .join(' | ');

  return `${prefix},\n\nI'm reaching out from the page.\n\n${contextLine}\n\nPlease assist me. Thank you!`;
}
