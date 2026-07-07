# PRE-WP00A-PHASE6B-PLATFORM-ROUTING.md

**Project:** ZENOVELL-PIMPZ-V4-Active  
**Phase:** 6B  
**Milestone:** PRE-WP00A — Platform Routing Strategy Definition (Read-only)  
**Document Type:** Governance Gate Report — Read-only Architecture Analysis  
**Date:** 2026-07-08  
**Authority:** SA Direction — Phase 6B PRE-WP00 (PASS)  
**Role:** Implementation Analysis Agent (read-only)  
**Status:** Analysis Complete / Recommendations for Blueprint

---

## WORKSPACE VERIFICATION

```
=== WORKSPACE VERIFICATION ===
Project Root: /Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active
Git Root:     /Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active
Current Branch: main
Working Directory: /Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active
Git Status: CLEAN (post Phase 6A)
Last Commit: aabda1b feat(phase6a): harden homepage conversion path
Source Verified:
- sections/section-3-hero-product/section-3-hero-product.tsx (uses "featured-product-line")
- sections/section-4-product-catalog/section-4-product-catalog.tsx (uses "product-grid-card" / "product-grid-final")
- lib/commerce/cta-activation.ts (shared helper)
- lib/commerce/cta-contract.ts (CtaSurface taxonomy)
- content/products.ts + UI content layers
- app/(platform)/products/[slug]/page.tsx + entity-loader
```

**Verification Result:** PASSED.

---

## 1. Executive Summary

PRE-WP00A defines the detailed strategy for Phase 6B.

**Core Decision (confirmed by SA):**
- Product titles and images (non-CTA areas) in Featured (Section 3) and Product Grid (Section 4) will link to `/products/[slug]`.
- The CTA buttons in those same areas **must remain** LINE handoff only, exactly as implemented in Phase 6A.

This ensures two coexisting paths from the same surfaces:
- Study details → Platform Product Page
- Convert now → LINE (preserved 6A behavior)

**Key Constraints Enforced:**
- Do not change any `activateLineCta` calls or their surfaces for product CTAs.
- Do not change CTA labels.
- No mutation of Product Authority.
- No visual redesign.
- Changes limited primarily to Section 3 and Section 4.

**Recommendation:**  
Proceed to Blueprint with the strategy defined below.

---

## 2. Clickable Elements Recommendation

**Product Grid (Section 4 — ProductCatalogCard):**
- The `<h3>` title containing `product.title`
- The image container (relative div with `<Image fill ... />` and optional badge)

**Featured Product (Section 3):**
- The `<ProductNameHeading>` (renders as `<h2>`)
- The image container (relative div with artwork and badges)

**Rationale:**
- These are the primary discovery elements.
- They are currently non-interactive (pure display).
- The prominent CTA buttons below them remain exclusively for LINE.

**Not Clickable (must stay LINE only):**
- The CTA buttons themselves (`ProductCardCTA` and `SolidLineCTA` in featured).

---

## 3. CTA Preservation Strategy (Critical)

All existing product CTA implementations must remain **bit-for-bit identical** to post-Phase 6A state:

- `ProductCardCTA` (grid cards): `onClick` calls `analytics` + `activateLineCta({ product: {...}, surface: "product-grid-card", ... })` + `preventDefault()`.
- Featured `SolidLineCTA`: `onClick` calls `activateLineCta({ product: {...}, surface: "featured-product-line", ... })`.
- Grid Final CTA: remains `surface: "product-grid-final"`.

**Explicit Rules:**
- Do not remove or wrap the CTA elements in additional Links.
- Do not change the `surface` strings passed to `activateLineCta`.
- Do not alter `cta.label` or `ariaLabel` values.
- The `cta-activation.ts` helper must not be modified for these surfaces.

This directly preserves the Phase 6A closed work.

---

## 4. Routing Strategy

- Use `import Link from 'next/link';`
- `<Link href={`/products/${slug}`}>` around the recommended elements.
- No query parameters (keep minimal).
- Slugs come from existing data already passed to the components (`product.slug` in grid, `featuredProduct.slug` in featured).
- The target platform page (`app/(platform)/products/[slug]/page.tsx`) is already fully implemented with SSG and SEO.

---

## 5. Analytics Recommendation

- Add tracking for the new detail navigation, separate from LINE events.
- Example (in the two section files):
  ```ts
  analytics.track(AnalyticsEvents.PRODUCT_CLICK, {
    surface: "grid" | "featured",
    action: "detail",
    slug,
    ...
  });
  ```
- Keep all existing `PRODUCT_CLICK` / `SUPPORT_CTA_CLICK` calls on the LINE CTAs unchanged.
- The commerce `LINE_CLICK` dispatched inside `activateLineCta` remains the source of truth for LINE conversions.

---

## 6. Accessibility Recommendation

- Titles wrapped in `<Link>` will naturally have the product name as accessible text.
- Image containers wrapped in `<Link>` should receive `aria-label={`View details for ${title}`}`.
- Ensure no nested `<a>` elements (current CTA `<a>`s are structurally separate).
- Preserve all existing focus styles, aria-labels on CTAs, and keyboard behavior.
- The new links must be focusable and respect the design system's focus rings.

---

## 7. Surface Naming (Featured CTA)

**Current State (at time of analysis):**
- Implementation (section-3-hero-product.tsx): uses `surface: "featured-product-line"`
- Contract taxonomy (cta-contract.ts): lists `"featured-line"`

**Recommendation:**
- Adopt **"featured-product-line"** as the single canonical name (matches implementation and other product surfaces like "product-grid-card").
- Update the contract additively if needed.
- Update any documentation references to be consistent.

(This will be resolved in the Blueprint Revision step.)

---

## 8. Files Likely Involved (Blueprint Scope)

**Primary implementation files (links only):**
- `sections/section-4-product-catalog/section-4-product-catalog.tsx`
- `sections/section-3-hero-product/section-3-hero-product.tsx`

**Reference only (no mutation):**
- `content/section-4-product-catalog.ts`
- `content/section-3-hero-product.ts`
- `content/products.ts`

**Not to be modified (per constraints):**
- Any CTA onClick logic or the `activateLineCta` helper.
- Product Authority.
- Other homepage sections.
- Platform product pages (already ready).

---

## 9. In Scope (for Blueprint)

- Define exact elements (titles + images) to wrap with `<Link>`.
- Specify use of `next/link`.
- Define analytics for detail navigation (distinct from LINE).
- Define accessibility requirements.
- Enforce strict CTA preservation rules.
- Limit changes to Section 3 and Section 4.
- Ensure zero visual impact and no nested links.

---

## 10. Out of Scope

- Any change to existing LINE CTAs, their labels, or activation calls.
- Modifying Product Authority.
- Adding new buttons or UI elements.
- Visual redesign or layout changes.
- Changes outside the two product sections.
- Query params or complex context passing on routes.

---

## 11. Risks

- Accidental modification of CTA onClick handlers during implementation (high risk — must be audited).
- Image wrapping (fill + badges) could cause layout issues if not implemented carefully.
- User expectation: titles/images now go to details while buttons go to LINE (acceptable per SA, but must be clear).
- Surface name inconsistency (featured-line vs featured-product-line) — to be normalized.

---

## 12. Suggested Milestones (High Level)

- Blueprint → Blueprint Audit → Scope Lock
- Batch 1: Add Links + analytics in Product Grid (Section 4)
- Batch 2: Add Links + analytics in Featured Product (Section 3)
- Validation + Evidence batch
- Closeout

Each batch must explicitly verify that all Phase 6A LINE CTAs (including product ones) still work exactly as before.

---

## 13. Conclusion

**PRE-WP00A Verdict: PASS**

The strategy is clear and respects all boundaries from SA and previous gates.

Phase 6B should add discovery navigation on titles/images while leaving the Phase 6A LINE CTAs completely untouched.

Proceed to Blueprint (with the fixes identified in the subsequent Codex audit).

---

**End of PRE-WP00A-PHASE6B-PLATFORM-ROUTING.md**