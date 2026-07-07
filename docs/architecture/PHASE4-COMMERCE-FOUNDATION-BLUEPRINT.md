# PHASE 4 — Commerce Foundation Blueprint

**Date**: 2026-07-06  
**Phase**: Phase 4 — Commerce Foundation  
**Status**: Architecture Blueprint  
**Release Baseline**: v4.1.12-ws01-p1d-iconwrapper  
**Governance**: Lightweight Z-MOS Style (Blueprint → Independent Audit → Scope Lock → Impl → Release)  
**Objective**: Prepare the Landing Page for Phase 5 Commerce Integration. Inventory and architecture definition only.

---

## Executive Summary

Phase 4 defines the **Commerce Foundation** required to turn the current content-driven landing page (Sections 1–11) into a commerce-capable surface.

All current CTAs point to placeholder `#line-primary` or `#`. Products, pricing, and flows exist in content but lack unified authority, SKU, promotion modeling, structured events, UTM, and prefilled LINE payloads.

This blueprint provides the complete architecture (no implementation) so that:

- Product data becomes the single source of truth.
- Every CTA surface is classified and contract-driven.
- Commerce events are defined and compatible with the existing M10 Analytics Dispatcher.
- The end-to-end flow (Landing → LINE OA → Admin → Order) is instrumented.
- UTM and LINE message formats are standardized.
- A production readiness checklist exists before any code is written.

**Phase 4 is strictly blueprint + contracts.** No source files are modified. No LINE API, backend, checkout, or UI changes occur here.

---

## 1. Current Architecture Snapshot (Read-only Inventory)

### Products & Pricing
- Primary catalog: `content/section-4-product-catalog.ts` (6 products)
  - nicky-pimpz-boss (BEST SELLER, 990/1290)
  - boss-men (990/1290)
  - boss-lady (890/1190)
  - np-gel (590/790)
  - np-mens-wipes
  - b21
- Featured hero product: `content/section-3-hero-product.ts`
- Final CTA: `content/section-10-final-cta.ts`

Current product card type (simplified):
```ts
type Section4ProductCard = {
  slug: string;
  title: string;
  subtitle: string;
  pricing: { salePrice: string; originalPrice: string; ariaLabel: string };
  cta: { label: string; ariaLabel: string; href: string }; // currently "#"
  ...
};
```

### CTA Surfaces (Current)
- Hero primary CTA (hero-line)
- Product catalog cards (section-line / product)
- Final CTA (section-10)
- How-to-Order final CTA + steps (section-6)
- Header / Drawer / Nav (header-line)
- Footer support / contact
- All currently resolve to `href: "#line-primary"` or `"#"` via `ctaDestinations` in `content/site-navigation.ts`

### Analytics Foundation (M10 Complete)
- `lib/analytics/` : dispatcher, events, adapters (vendor-neutral)
- Existing events include: `product_click`, `hero_cta_click`, `line_click`, `footer_cta_click`, `support_cta_click`, `page_view`, etc.
- `AnalyticsEventKey` in site-navigation + `AnalyticsEvents` in lib/analytics/events.ts
- Tracking already wired in a few places (e.g. footer).

### Flow (Current, documented in content)
Section 6 defines the 6-step customer journey:
1. กดปุ่ม “ปรึกษาผ่าน LINE”
2. แชทกับทีมงาน
3. เลือกสินค้าและจำนวน
4. ยืนยันการสั่งซื้อ
5. จัดส่งแบบปกปิด
6. รับสินค้าอย่างมั่นใจ

No structured product context or UTM is passed today.

### Gaps Identified
- No central Product Authority / SKU
- No price model (strings only, no cents)
- No promotion entity
- CTA hrefs are placeholders
- No prefilled message contract
- No UTM capture or forwarding
- Commerce events not yet declared
- No sticky CTA surface defined
- No single source of truth for "which product + which source + which campaign"

---

## 2. Product Authority

### 2.1 Canonical Product Schema (Proposed)

Create (in future impl) `content/products.ts` (or extend existing) as the single source of truth.

```ts
export type Money = {
  amount: number;      // in smallest unit (satang for THB)
  currency: 'THB';
  display: string;     // "990.-" for UI
};

export type Promotion = {
  id: string;
  type: 'discount' | 'bundle' | 'limited';
  label: string;
  discountPercent?: number;
  endsAt?: string;     // ISO
};

export type Product = {
  id: string;                    // stable uuid or slug-based
  slug: string;                  // url + analytics friendly
  sku: string;                   // e.g. "NPB-001"
  title: string;
  subtitle: string;
  category: 'capsule' | 'gel' | 'wipes' | 'bundle';
  pricing: {
    sale: Money;
    original: Money;
  };
  promotions?: Promotion[];
  inventory?: {
    status: 'in_stock' | 'low' | 'preorder';
    note?: string;
  };
  images: {
    main: string;
    alt: string;
    thumbnail?: string;
  };
  features: Array<{ icon: string; title: string; sub?: string }>;
  commerceCta: {
    label: string;
    ariaLabel: string;
    // Generates the exact LINE message text to prefill
    getLineMessage: (context: LineMessageContext) => string;
  };
  seo?: {
    metaTitle?: string;
    description?: string;
  };
};

export type LineMessageContext = {
  utm?: UtmParams;
  sourceSurface: string;   // "hero" | "catalog-card" | "sticky" | ...
  sessionId?: string;
};
```

### 2.2 SKU Strategy
- Format: `{BRAND}-{CATEGORY}-{SEQ}` e.g. `NPB-001`, `BSM-002`, `BSL-003`
- SKU is the canonical identifier passed to LINE, admin, and analytics.
- Slug remains human/SEO friendly and stable.

### 2.3 CTA Mapping per Product
Every product declares its own `commerceCta.getLineMessage(ctx)`.  
This keeps product-specific language + pricing in content, not scattered in components.

Example (concept):
```ts
getLineMessage: (ctx) => 
  `สนใจ ${title} (SKU:${sku})\nราคา ${sale.display}\nจาก: ${ctx.sourceSurface}${utmLine(ctx.utm)}`
```

---

## 3. CTA Architecture

### 3.1 CTA Taxonomy (5 Surfaces)

| CTA Type       | Surfaces                          | Primary Action          | Analytics Event Base | Prefill Context |
|----------------|-----------------------------------|-------------------------|----------------------|-----------------|
| Hero CTA       | Hero (Section 1)                  | Consult / Primary       | hero_cta / line_click | Product (featured) + UTM |
| Product CTA    | Catalog cards, Section 3/4        | Buy specific product    | product_click        | Specific product + UTM |
| Sticky CTA     | Future floating bar (Phase 5)     | Always visible buy      | sticky_cta_click     | Last viewed or default |
| Footer CTA     | Section 10 Final + Section 11     | Strong close            | footer_cta_click     | Campaign default |
| LINE CTA       | Header, Nav, How-to-Order, Drawer | Generic consult         | line_click           | Generic or last product |

### 3.2 Contract Principles
- All CTAs receive `product?` + `utm` + `surfaceId`
- Click handler (when implemented):
  1. `analytics.track(appropriateEvent, { productSlug, sku, price: sale.amount, ...utm, surface })`
  2. Build LINE payload via `product.commerceCta.getLineMessage(...)`
  3. Navigate to target (currently placeholder, later real LINE OA link or liff)
- Visual treatment remains frozen unless Phase 5 explicitly allows (use existing primitives: LineIcon, IconWrapper, SectionHeader).

### 3.3 No Visual or Layout Change in Phase 4
All architecture is data + event + contract only.

---

## 4. Commerce Events

Extend the existing M10 Analytics foundation (do not break).

### 4.1 Proposed Commerce Events

```ts
// Add to lib/analytics/events.ts (future)
COMMERCE: {
  PRODUCT_VIEW: "product_view",
  PRODUCT_CLICK: "product_click",          // already exists — align
  LINE_CLICK: "line_click",                // already exists — enrich
  CONVERSION_START: "conversion_start",    // start of LINE consult for purchase
  CONSULTATION_START: "consultation_start",
}
```

### 4.2 Recommended Payload (enrichment of AnalyticsPayload)

```ts
interface CommercePayload {
  productSlug?: string;
  sku?: string;
  price?: number;           // sale amount in satang
  currency?: 'THB';
  surface?: string;         // "hero" | "catalog" | "final-cta" | "sticky" | "footer"
  lineMessagePreview?: string; // first 80 chars for debug
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
}
```

### 4.3 Event Mapping (Current → Commerce)

| Proposed Event         | Existing Equivalent     | When to Fire                          | Enrich With |
|------------------------|-------------------------|---------------------------------------|-------------|
| product_view           | (new)                   | Product card enters viewport or detail| product + utm |
| product_click          | PRODUCT_CLICK           | Any product CTA click                 | full commerce payload |
| line_click             | LINE_CLICK / hero_cta   | Any LINE entry point                  | + product if known |
| conversion_start       | (new)                   | User clicks a "buy" CTA               | sku + price + utm |
| consultation_start     | support_cta / line_click| Explicit "ปรึกษา" intent               | + surface |

All events go through the existing `analytics.track(...)` + dispatcher. Adapters (GA4 etc.) will receive the enriched payload in Phase 5+.

---

## 5. Commerce Flow (Landing → Order)

```
Landing Page (frozen sections)
        │
        ▼  (instrument: product_view on catalog entry)
Select Product / CTA click
        │
        ▼  (track: product_click + conversion_start)
LINE OA (pre-filled message)
        │
        ▼  (human chat / auto reply)
Admin / Operator
        │
        ▼
Order Confirmation + Fulfillment
```

### Detailed Steps + Instrumentation Points

1. **Landing / Discovery**
   - `page_view`
   - `product_view` (when catalog visible + specific cards)

2. **Select Product**
   - User clicks Product CTA or Hero CTA
   - `product_click` + `conversion_start`
   - Capture UTM from URL at click time

3. **LINE OA + Prefilled**
   - Construct message using Product + SKU + Price + UTM context + surface
   - `line_click` (or `consultation_start`)
   - Navigate / open LINE with prefilled text

4. **Admin / Chat**
   - Operator receives structured message
   - (Future) can parse SKU for quick lookup

5. **Order**
   - Manual or future system
   - (Out of scope for Phase 4/5 landing)

---

## 6. UTM Architecture

### 6.1 Canonical Parameters (Standard)

- `utm_source`   — e.g. `landing`, `organic`, `line`, `facebook`, `google`
- `utm_medium`   — e.g. `cpc`, `organic`, `social`, `referral`, `direct`
- `utm_campaign` — e.g. `pimpz-launch`, `june-promo`, `evergreen`
- `utm_content`  — e.g. `hero-primary`, `catalog-nicky`, `final-cta`, `sticky`

### 6.2 Capture Strategy
- Read from `window.location.search` at page load (already partially done in dispatcher path).
- Store in memory / session (or URL param passthrough).
- On CTA click, snapshot current UTM + surface and pass into `getLineMessage(ctx)`.

### 6.3 Default Values (when absent)
- source: `direct`
- medium: `landing`
- campaign: `organic`
- content: `unknown`

### 6.4 Forwarding to LINE
Include a compact line in the prefilled message:
```
UTM: source=...|medium=...|campaign=...|content=...
```

---

## 7. LINE Payload (Recommended Message Format)

### 7.1 Text Template (v1)

```
สนใจ: {title}
SKU: {sku}
ราคา: {salePrice} (จาก {originalPrice})
ที่มา: {utm_campaign} / {utm_content}
ข้อความจาก: {surface}
```

**Full example**:
```
สนใจ: NICKY PIMPZ BOSS
SKU: NPB-001
ราคา: 990.- (จาก 1,290.-)
ที่มา: june-promo / catalog-nicky
ข้อความจาก: product-card
```

### 7.2 Rules
- Keep under ~200 chars when possible (LINE preview friendly).
- Always include SKU for admin lookup.
- Never include PII.
- Product-specific copy can be customized inside `getLineMessage`.

### 7.3 Future-proofing
- This format is text-only for Phase 5.
- Phase 6+ may introduce Flex Message using the same data contract (no change to product schema).

---

## 8. Production Readiness Checklist

### Content & Product Authority
- [ ] All 6 products migrated to canonical `Product` schema
- [ ] SKU assigned to every product
- [ ] Prices stored as numbers (satang) + display strings
- [ ] Promotions modeled (even if empty)
- [ ] `getLineMessage` implemented per product

### CTA Surfaces
- [ ] Every CTA surface classified under the 5-type taxonomy
- [ ] All CTAs accept `product`, `utm`, `surface` context
- [ ] No hard-coded hrefs outside content
- [ ] Aria labels and labels come from product data

### Events & Analytics
- [ ] Commerce events added to central `AnalyticsEvents`
- [ ] All CTA clicks call `analytics.track` with commerce payload
- [ ] UTM captured on load and on click
- [ ] `lineMessagePreview` (truncated) sent for debugging
- [ ] Existing events remain backward compatible

### LINE & Flow
- [ ] Prefill logic uses single `getLineMessage` method
- [ ] Flow matches Section 6 steps (instrumented)
- [ ] Placeholder `#line-primary` replaced only after real target approved
- [ ] Privacy note preserved (ปกปิด packaging)

### Technical & Ops
- [ ] No new dependencies for blueprint phase
- [ ] All new types exported from content or lib (no inline any)
- [ ] Typecheck + lint pass
- [ ] Build succeeds with zero new warnings
- [ ] No changes to frozen visual/DOM of Sections 1-11
- [ ] MobileShell / GlobalHeader contracts untouched

### Privacy, Consent, Compliance
- [ ] No PII in events or LINE messages
- [ ] UTM and surface data is non-identifying
- [ ] Existing consent / privacy sections remain
- [ ] Future admin order data handling out of scope here

### Performance & Runtime
- [ ] Product data tree-shakeable / static
- [ ] No extra client bundles for blueprint
- [ ] Event dispatch remains non-throwing (existing contract)

### Measurement & Audit
- [ ] Independent audit completed before implementation
- [ ] Scope lock signed before any code change
- [ ] Release report + tag follow prior M10/WS-01 pattern

---

## 9. Integration with Prior Work

- **WS-01 Primitives**: Use `LineIcon`, `IconWrapper`, `SectionHeader`, `SectionBadge` unchanged.
- **M10 Analytics**: Extend `AnalyticsEvents` and `AnalyticsPayload`. Use existing `analytics` singleton and dispatcher.
- **Frozen Sections**: All visual, layout, and copy baselines remain identical. Phase 4 only adds data contracts and event taxonomy.
- **Mobile-first + Content Separation**: Content authority (products, ctas) stays in `content/`. Sections remain thin consumers.
- **No conflict** with M10-P4 Performance or Runtime work.

---

## 10. Out of Scope (Strict)

- Any implementation of the above
- LINE Messaging API / LIFF / Flex Messages
- Backend, database, admin panel, order system
- Payment, checkout, cart
- CRM or customer data platform
- New UI components or visual redesign
- Analytics adapter wiring (GA4 etc.)
- Server components changes
- Phase 5 work

---

## 11. Recommended Execution Sequence (Post-Blueprint)

1. ✅ Phase 4 Blueprint (this document)
2. ✅ Independent Audit (external reviewer, e.g. Gemini)
3. ✅ Scope Lock (M10-style SCOPE-LOCK.md)
4. ✅ Phase 4 Implementation (one patch at a time if possible)
5. ✅ Release + CI + Tag
6. → Phase 5 Commerce Integration (actual wiring + real LINE targets)

This sequence mirrors the successful M10 + WS-01 governance model.

---

## Appendix A: Current Product Inventory (for reference)

| Slug              | Title                | Sale | Original | Badge      |
|-------------------|----------------------|------|----------|------------|
| nicky-pimpz-boss  | NICKY PIMPZ BOSS     | 990  | 1290     | BEST SELLER|
| boss-men          | BOSS MEN             | 990  | 1290     | -          |
| boss-lady         | BOSS LADY            | 890  | 1190     | -          |
| np-gel            | NP GEL               | 590  | 790      | -          |
| np-mens-wipes     | NP MEN'S WIPES       | ?    | ?        | -          |
| b21               | B21                  | ?    | ?        | -          |

(Exact current values and additional fields live in the respective content files.)

---

**End of Blueprint**

This document is the authoritative reference for all Phase 4 and Phase 5 commerce work. No deviation without updated scope lock.

---

*Prepared under Lightweight Z-MOS governance. Blueprint only.*
