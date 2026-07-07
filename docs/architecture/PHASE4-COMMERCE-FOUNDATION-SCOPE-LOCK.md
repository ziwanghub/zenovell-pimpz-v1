# PHASE 4 — Commerce Foundation Scope Lock

**Date**: 2026-07-06
**Phase**: Phase 4 — Commerce Foundation
**Workstream**: Commerce Foundation
**Status**: ACTIVE
**Governance**: Lightweight Z-MOS Style Governance
**Release Baseline**: v4.1.12-ws01-p1d-iconwrapper
**Prerequisite**: 
- docs/architecture/PHASE4-COMMERCE-FOUNDATION-BLUEPRINT.md (PASS)
- docs/reports/phase4-commerce/PHASE4-BLUEPRINT-INDEPENDENT-AUDIT.md (PASS)

---

## 1. Purpose

This scope lock document formally authorizes and bounds the implementation of the Commerce Foundation for the ZENOVELL landing page.

It locks the architecture defined in the Phase 4 Blueprint so that implementation can proceed safely, predictably, and without scope creep.

The lock protects:
- The frozen visual, DOM, and behavioral baseline of Sections 1–11
- Existing M10 Analytics Dispatcher and event taxonomy
- WS-01 Shared UI Primitives
- Content separation model
- No premature backend, payment, or LINE API integration

All Phase 4 implementation work **must** stay within the contracts and boundaries defined here.

---

## 2. Current Authority

This document is subordinate to and references:

- PHASE4-COMMERCE-FOUNDATION-BLUEPRINT.md (primary architecture authority)
- PHASE4-BLUEPRINT-INDEPENDENT-AUDIT.md (PASS)
- M10 Foundation Hardening Blueprint
- M10-P3 Analytics Foundation + related scope decisions
- WS01-SHARED-UI-PRIMITIVES-SCOPE-LOCK.md
- M10-P4-PERFORMANCE-SCOPE-LOCK.md
- All prior release reports and frozen section policies

The blueprint + this scope lock together form the binding contract for Phase 4.

---

## 3. In Scope (Allowed)

The following are explicitly authorized for Phase 4:

1. **Product Authority schema**
   - Central `Product` type, `Money`, `Promotion`, SKU assignment
   - Migration / extension of existing product data in `content/`

2. **Product CTA mapping**
   - `commerceCta` definition per product
   - `getLineMessage(context)` implementation per product

3. **LINE prefilled message architecture**
   - Message template definition
   - Context passing (product + UTM + surface)

4. **Product Message Builder design**
   - Pure functions or methods that generate the prefilled text payload (no side effects)

5. **UTM capture/preserve design**
   - Capture from URL
   - Snapshot at CTA time
   - Forwarding into message context

6. **Commerce event mapping**
   - Extension of `AnalyticsEvents`
   - Payload enrichment for commerce events
   - Integration points with existing dispatcher (no changes to dispatcher core)

7. **Production readiness checklist**
   - Implementation of items listed in blueprint checklist (via code + tests where appropriate)

---

## 4. Out of Scope (Forbidden)

Explicitly forbidden in Phase 4:

- LINE Messaging API, LIFF, Flex Messages, or any real LINE integration code
- Checkout, cart, payment flows
- Backend, database, admin panel, order management, CRM
- Marketplace, omnichannel, or external platform connectors
- Any UI redesign, visual changes, layout shifts, or DOM changes to frozen sections
- New components that alter appearance (beyond data-driven contracts)
- Analytics adapter implementation or GA4 wiring (deferred)
- Server Component conversions or runtime architecture changes
- Ads launch, tracking pixel changes, or marketing instrumentation beyond defined events
- Any work that touches Phase 5 Commerce Integration items

**No implementation outside the contracts below is permitted.**

---

## 5. Allowed Implementation Units

During Phase 4 implementation, the following units are authorized (subject to contracts):

**New / Primary Files (recommended):**
- `content/products.ts` — canonical Product authority + all 6 products + SKU + `getLineMessage`
- (Optional) `lib/commerce/` — pure message builder utilities (if extracted)

**Allowed Modification Targets (contracts only):**
- `lib/analytics/events.ts` — add commerce event constants (extend only)
- `content/site-navigation.ts` — minor enrichment of `AnalyticsEventKey` or cta metadata if needed for surface typing (no href or visual changes)
- Existing content files (`section-3-hero-product.ts`, `section-4-product-catalog.ts`, etc.) — only for migrating to new Product types or adding `commerceCta` (no visual copy or structure changes)
- `app/page.tsx` or section files — **only** for wiring new data props and event calls; **zero** visual/DOM/ style modifications

**Strict Limits:**
- All new code must be pure data + contracts + event dispatch calls.
- No changes to any `.tsx` rendering logic that would alter output HTML, classes, or spacing.
- Use existing primitives (LineIcon, IconWrapper, etc.) — do not create new UI primitives.

---

## 6. Forbidden Work

- Any edit to `components/layout/mobile-shell.tsx`, `global-header.tsx`
- Any edit to hero or section visual structure
- Hard-coded strings for prices, messages, or CTAs outside the Product authority
- Direct `window.open` or navigation logic changes without going through the defined contracts
- Introduction of new dependencies
- Changes that would require re-freezing or visual regression of Sections 1–11
- Implementation of real LINE targets or prefill APIs

---

## 7. Product Authority Contract

All products must be represented using this authoritative contract (future implementation target: `content/products.ts`).

```ts
export type Money = {
  amount: number;      // satang
  currency: 'THB';
  display: string;
};

export type Promotion = {
  id: string;
  type: 'discount' | 'bundle' | 'limited';
  label: string;
  discountPercent?: number;
  endsAt?: string;
};

export type Product = {
  id: string;
  slug: string;
  sku: string;                    // e.g. "NPB-001"
  title: string;
  subtitle: string;
  category: 'capsule' | 'gel' | 'wipes' | 'bundle';
  pricing: {
    sale: Money;
    original: Money;
  };
  promotions?: Promotion[];
  inventory?: { status: 'in_stock' | 'low' | 'preorder'; note?: string };
  images: { main: string; alt: string; thumbnail?: string };
  features: Array<{ icon: string; title: string; sub?: string }>;
  commerceCta: {
    label: string;
    ariaLabel: string;
    getLineMessage: (context: LineMessageContext) => string;
  };
};

export type LineMessageContext = {
  utm?: UtmParams;
  sourceSurface: 'hero' | 'catalog-card' | 'sticky' | 'footer' | 'line-cta' | string;
  sessionId?: string;
};
```

**SKU Rule**: `{PREFIX}-{SEQ}` (e.g. NPB-001 for Nicky Pimpz Boss). SKU is the stable key for analytics, messages, and future admin.

**Migration Rule**: Existing product content types may be extended or wrapped. Original display strings must be preserved exactly during transition.

---

## 8. LINE Message Builder Contract

The single source of truth for prefilled messages is `product.commerceCta.getLineMessage(ctx)`.

**Required Template (v1)**:
```
สนใจ: {title}
SKU: {sku}
ราคา: {sale.display} (จาก {original.display})
ที่มา: {utm_campaign} / {utm_content}
ข้อความจาก: {sourceSurface}
```

**Rules**:
- Must always include SKU.
- Must be under ~200 chars preferred.
- Must never include PII.
- UTM line is optional but recommended when present: `UTM: source=...|medium=...|campaign=...|content=...`
- Implementations must be pure (no side effects, no network).

Example output:
```
สนใจ: NICKY PIMPZ BOSS
SKU: NPB-001
ราคา: 990.- (จาก 1,290.-)
ที่มา: june-promo / catalog-nicky
ข้อความจาก: product-card
```

---

## 9. CTA Contract

All CTAs must follow the 5-type taxonomy:

| Type          | Surface Examples               | Required Context                  | Base Event          |
|---------------|--------------------------------|-----------------------------------|---------------------|
| Hero CTA      | Hero primary                   | featured product + UTM            | hero_cta / line_click |
| Product CTA   | Catalog cards, Section 3/4     | specific product + UTM            | product_click       |
| Sticky CTA    | Future (Phase 5)               | last-viewed or default + UTM      | sticky_cta_click    |
| Footer CTA    | Section 10 + 11                | campaign default                  | footer_cta_click    |
| LINE CTA      | Header, Nav, How-to-Order      | generic or last product           | line_click          |

**Invocation Contract (when implemented)**:
1. Capture current UTM + surface
2. `analytics.track(event, { productSlug, sku, price: sale.amount, ...utm, surface })`
3. `const msg = product.commerceCta.getLineMessage({ utm, sourceSurface })`
4. Use msg for prefill / navigation (placeholder targets remain until authorized)

No CTA may bypass the Product authority or the event dispatcher.

---

## 10. Event Contract

Extend (do not replace) the existing M10 analytics events.

**New / Enriched Commerce Events** (add to `lib/analytics/events.ts`):

```ts
PRODUCT_VIEW: "product_view",
PRODUCT_CLICK: "product_click",           // align with existing
LINE_CLICK: "line_click",                 // enrich payload
CONVERSION_START: "conversion_start",
CONSULTATION_START: "consultation_start",
```

**Required Commerce Payload** (merged into AnalyticsPayload):

```ts
{
  productSlug?: string;
  sku?: string;
  price?: number;               // satang
  currency?: 'THB';
  surface?: string;
  lineMessagePreview?: string;  // truncated
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
}
```

All events must route through the existing `analytics` singleton. Dispatcher behavior, error handling, and non-throwing guarantees remain unchanged.

---

## 11. UTM Contract

**Canonical parameters** (only these four):

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`

**Capture Rules**:
- Read at page load from `window.location.search`
- Snapshot at the moment of CTA interaction
- Pass snapshot into `LineMessageContext`

**Defaults** (when missing):
- source: `direct`
- medium: `landing`
- campaign: `organic`
- content: `unknown`

**Forwarding**:
Include compact UTM line in message when values are meaningful.

---

## 12. Validation Rules

Before any Phase 4 patch can be considered complete:

- `npm run lint` — PASS (zero warnings treated as errors)
- `npm run typecheck` — PASS
- `npm run build` — PASS (production build)
- `npm run validate` — PASS

Additional rules:
- No visual, spacing, typography, color, or DOM changes to any frozen section
- All new types exported cleanly; no `any`
- Product data remains static and tree-shakeable
- Existing analytics contracts and non-throwing guarantees preserved
- All CTAs continue to use existing LineIcon / IconWrapper / primitives
- Placeholder hrefs (`#`, `#line-primary`) remain until real targets are authorized in later phase
- Privacy: no PII in events or messages

---

## 13. Rollback Rules

If any of the following occur during implementation, the affected changes **must** be rolled back:

- Visual or layout drift in Sections 1–11 (measured by regression or audit)
- New runtime errors or hydration mismatches introduced
- Analytics dispatcher throws or loses existing events
- Product data changes cause display string or price drift
- Any introduction of real LINE API calls or backend dependencies
- Scope creep into out-of-scope areas listed above

Rollback target: revert to the exact state at v4.1.12-ws01-p1d-iconwrapper (frozen content + blueprint + this lock).

---

## 14. Frozen Section & Integration Policy

**Sections 1–11 remain 100% visually and behaviorally frozen.**

Phase 4 may only:
- Supply new data contracts
- Add event tracking calls
- Define message generation logic

Phase 4 **must not**:
- Alter any JSX, Tailwind classes, or component structure in sections
- Change MobileShell, GlobalHeader, or layout contracts
- Introduce new visual primitives

Integration:
- Re-use WS-01 primitives (LineIcon, IconWrapper, SectionHeader, SectionBadge)
- Extend M10 Analytics (no core changes)
- Preserve content/ authority model

---

## 15. Readiness for Implementation

**READY FOR PHASE 4 IMPLEMENTATION**

With:
- Blueprint: PASS
- Independent Audit: PASS
- This Scope Lock: ACTIVE

Implementation may now proceed under the strict boundaries above.

Recommended approach (per blueprint):
- One primitive/contract area at a time
- Full validation + regression after each unit
- Independent audit + release only after full Phase 4 scope is complete

No work may begin until this document is created and the baseline is recorded.

---

**End of Scope Lock**

This document is binding. Any deviation requires a new scope decision and updated lock.

*Governed under Lightweight Z-MOS. Documentation only. No implementation authorized outside this lock.*
