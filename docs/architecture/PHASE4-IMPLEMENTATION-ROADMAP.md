# PHASE 4 — Commerce Foundation Implementation Roadmap

**Date**: 2026-07-06  
**Status**: Planning Complete (Ready for 4B)  
**Baseline**: v4.1.12-ws01-p1d-iconwrapper  
**ADR Reference**: ADR-001-LINE-FIRST-COMMERCE-PLATFORM.md (APPROVED)  
**Governance**: Lightweight Z-MOS (Blueprint → Audit → Scope Lock → Planning → Impl → Release)  

This document provides the official phased implementation plan for Phase 4 based on:
- ADR-001: Redefinition to LINE-First Commerce Landing Platform
- PHASE4-COMMERCE-FOUNDATION-BLUEPRINT.md
- PHASE4-COMMERCE-FOUNDATION-SCOPE-LOCK.md (ACTIVE)
- content/products.ts (Phase 4A COMPLETE)

**Core Principle**: The website is the acquisition/qualification layer. Primary output = LINE OA Friend. All commerce logic and sales execution lives in LINE.

---

## 1. Implementation Sequence

### Phase 4A — Product Authority (COMPLETE)
- Central Product schema, SKUs, structured pricing, promotions, CTA mapping, linePayloadMetadata.
- Single Source of Truth established in `content/products.ts`.
- Existing catalog and hero content adapted (backward compatible).

### Phase 4B — Commerce Context (Next)
- Define and implement official Commerce Context type/contract.
- Attach context to all CTA surfaces (Hero, Product Cards, Final CTA, Navigation).
- UTM capture/preservation at runtime.
- Pass context through to LINE handoff points.
- Update Product Authority usage to carry full context.

### Phase 4C — LINE Message Builder
- Implement pure `LineMessageBuilder` (or per-product `getLineMessage(context)`).
- Builder consumes Commerce Context + Intent.
- Define standard message templates (per ADR-001).
- Support for Research / High Intent / Promotion variants.
- No actual LINE API calls (out of scope per Scope Lock).

### Phase 4D — CTA Contract
- Formalize CTA taxonomy and contracts (Hero, Product, Footer, LINE, future Sticky).
- Update `content/site-navigation.ts` ctaDestinations with commerce-aware contracts.
- Ensure every CTA surface produces consistent Commerce Context + analytics payload.
- Define surface identifiers (entrySurface).

### Phase 4E — Analytics Integration
- Extend `lib/analytics/events.ts` and payload with commerce fields (product, sku, intent, utm*, source, landingPage, entrySurface).
- Instrument existing and new events (product_view, conversion_start, etc.) with full context.
- Ensure dispatcher enriches payloads safely (non-throwing).
- Align with M10 analytics foundation.

### Phase 4F — Optional Hardening & Validation (if needed before release)
- Full production readiness checklist execution.
- Intent Classification helpers.
- Regression across all current surfaces.
- Documentation and examples for Phase 5.

### Phase 4 Release
- Tag + release after all sub-phases + independent audit.
- Baseline becomes ready for Product Landing Pages (Phase 5+) and full platform expansion.

---

## 2. Dependencies

**Internal (must complete in order)**:
- 4A (done) → 4B (Context requires Product Authority + SKU/slug)
- 4B → 4C (Builder requires Context)
- 4C → 4D (CTA Contract must feed Builder and Context)
- 4D → 4E (Analytics must carry the full Context produced by CTAs)

**External (existing, must not break)**:
- M10 Analytics Dispatcher & events (extend only)
- WS-01 UI Primitives
- Frozen visual baseline of Sections 1–11
- MobileShell + GlobalHeader contracts
- Content separation model

**Future (out of Phase 4 scope)**:
- Actual Product Landing Pages / new routes (Phase 5)
- Real LINE API / LIFF / Flex (later)
- Backend / orders / checkout (later)

---

## 3. Files Expected to Change

**Data / Contracts (primary)**:
- `content/products.ts` (minor extensions for context compatibility if needed)
- `content/section-4-product-catalog.ts` (attach commerce data / context hooks)
- `content/section-3-hero-product.ts` (same)
- `content/site-navigation.ts` (CTA contracts + destinations)
- `lib/analytics/events.ts`
- `lib/analytics/types.ts`

**New Files (foundation only)**:
- `lib/commerce/context.ts` (Commerce Context type + helpers)
- `lib/commerce/line-message-builder.ts` (pure builder)
- `lib/commerce/intent.ts` (Intent Classification)
- Possibly `lib/commerce/index.ts` barrel

**Analytics extensions**:
- `lib/analytics/dispatcher.ts` (enrichment only if required)
- Adapter payloads (no adapter impl changes)

**Minimal content updates**:
- Other section-*.ts only if they contain CTAs that need context (e.g. section-6, section-10, footer)

**No new pages/routes in Phase 4** (Product Landing Pages deferred).

---

## 4. Files That Must Remain Frozen

**Visual / DOM / Runtime Baseline (per Scope Lock + ADR-001)**:
- `app/page.tsx` (single-page structure inside MobileShell)
- All `sections/**/*.tsx` (hero-section.tsx, section-*-*.tsx) — no DOM, class, or layout changes
- `components/layout/mobile-shell.tsx`
- `components/layout/global-header.tsx`
- All `components/ui/*` (LineIcon, IconWrapper, SectionHeader, etc.)
- `app/layout.tsx` (minimal, only if metadata absolutely required)
- `content/hero.ts`, `content/site-header.ts` (core branding/navigation)
- Existing section content structures that are not commerce-extended

**No changes allowed**:
- Any Tailwind classes, spacing, typography, colors, shadows on frozen sections
- MobileShell constraints (max-w, overflow)
- Current CTA href behavior (placeholders remain)
- Direct visual rendering of products on landing

**Governance**: Any deviation requires new Scope Lock amendment.

---

## 5. Risk Analysis

**High**:
- Context passing complexity across client surfaces → breakage in UTM or product data.
- Over-extension of analytics events → dispatcher instability (mitigate by non-throwing extensions).
- Misalignment between "Product Landing Page" vision in ADR and current single-page reality → scope creep into Phase 5 too early.

**Medium**:
- CTA Contract changes affect multiple surfaces (Hero, catalog, final, nav) → regression in current conversion paths.
- Message templates becoming too rigid or language-heavy → poor LINE experience.
- Intent Classification added too early without measurement → unused code.

**Low** (but monitored):
- Performance impact from new context objects (should be negligible).
- Future conflict when actual Product Landing Pages are added (plan for context reuse).

**Mitigations**:
- Pure functions only for builder/context.
- Comprehensive unit tests on contracts (even if not full e2e yet).
- Strict "extend only" rule for analytics and content types.
- Stop after every sub-phase for review.

---

## 6. Regression Checkpoints

After each sub-phase:
- All existing product cards, hero CTA, final CTA, navigation CTAs still render identically.
- No visual or layout shift on any of Sections 1–11.
- Current analytics events continue to fire (enriched, not broken).
- `npm run build` succeeds with zero new errors/warnings.
- Manual spot-check of mobile rendering (375–430px).

Specific:
- Product prices, titles, features unchanged in UI.
- Placeholder hrefs and onClick analytics still functional.

---

## 7. Validation Checkpoints

Per sub-phase + overall:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run validate`

Additional:
- Type contracts compile cleanly.
- No runtime errors in console during dev (especially context/UTM capture).
- Commerce Context objects contain all required fields on CTA triggers (dev inspection).

---

## 8. Release Checkpoints

- Completion of 4B + 4C + 4D + 4E
- Independent audit of contracts and context usage
- Full regression report (visual + functional on frozen sections)
- Updated documentation (this roadmap + ADR cross-reference)
- Production readiness checklist items from Blueprint (relevant to contracts)
- Tag: `v4.1.13-ws01-phase4-commerce-foundation` (or similar) after release

---

## 9. Estimated Implementation Order

1. Phase 4B — Commerce Context (foundational, highest dependency)
2. Phase 4C — LINE Message Builder (depends on Context)
3. Phase 4D — CTA Contract (wires everything together)
4. Phase 4E — Analytics Integration (observability layer)
5. (Optional) Phase 4F — Hardening & Examples
6. Phase 4 Release

**Rationale**: Context first (data model), then builder (output), then contracts (surfaces), then analytics (measurement). This order minimizes rework.

---

## 10. Recommended Stopping Points (after every milestone)

- After 4B: Review Commerce Context design + sample payloads with team. Decide on final shape before builder.
- After 4C: Validate message templates with sales/LINE team. Confirm pre-fill quality.
- After 4D: Full CTA surface audit. Confirm Hero direct path + catalog paths produce correct context.
- After 4E: End-to-end event trace (Landing → LINE handoff) with sample UTM/intent.
- After full Phase 4: Independent audit + regression sign-off before any Phase 5 work (Product Landing Pages, new routes).

**Hard rule**: Do not start Product Landing Page implementation (new files/routes) until Phase 4 Release is complete and ADR-aligned contracts are stable.

---

## Summary Table

| Phase | Focus                        | Key Deliverable                     | Stop & Review? |
|-------|------------------------------|-------------------------------------|----------------|
| 4A    | Product Authority            | content/products.ts (done)          | ✅            |
| 4B    | Commerce Context             | lib/commerce/context.ts + usage     | ✅            |
| 4C    | LINE Message Builder         | lib/commerce/line-message-builder.ts| ✅            |
| 4D    | CTA Contract                 | Contracts in site-navigation + CTAs | ✅            |
| 4E    | Analytics Integration        | Enriched events + payloads          | ✅            |
| 4F    | Hardening (opt)              | Full checklist + docs               | ✅            |
| Rel   | Phase 4 Release              | Tag + audit                         | ✅            |

This roadmap ensures the project evolves consistently as a **LINE-First Commerce Landing Platform** without breaking the existing high-velocity landing experience.

---

**End of PHASE4-IMPLEMENTATION-ROADMAP.md**

All future Phase 4 work must follow this sequence and respect frozen boundaries. This document + ADR-001 together form the implementation authority.