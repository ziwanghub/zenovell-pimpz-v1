# PHASE6B-PLATFORM-ROUTING-SCOPE-LOCK.md (v1.0)

**Project:** ZENOVELL-PIMPZ-V4-Active  
**Phase:** 6B — Platform Routing  
**Milestone:** Scope Lock  
**Version:** v1.0  
**Status:** Locked  
**Date:** 2026-07-08  
**References:**
- PHASE6B-PLATFORM-ROUTING-BLUEPRINT.md (SA Approved)
- PRE-WP00-PHASE6B-PLATFORM-ROUTING.md (COMPLETE)
- PRE-WP00A-PHASE6B-PLATFORM-ROUTING.md (COMPLETE)
- WORKFLOW-v2.1.md (ACTIVE)
- DEVELOPMENT-LIFECYCLE.md (ACTIVE)
- SA Decision (2026-07-08): Product titles/images → /products/[slug]; CTA buttons remain LINE handoff. Do not disrupt Phase 6A.

---

## 1. Executive Summary

This Scope Lock translates the approved Phase 6B Blueprint into a strict, executable implementation boundary.

Phase 6B is **exclusively** about adding platform routing from homepage product discovery surfaces (Featured Product in Section 3 and Product Grid in Section 4) to the existing `/products/[slug]` pages.

**Core Rule (enforced):**  
Product title / image / non-CTA card areas → `/products/[slug]`  
CTA buttons → remain exactly Phase 6A LINE handoff behavior (unchanged `activateLineCta` calls, unchanged labels).

This document locks the boundary so that implementation cannot bleed into changing Phase 6A work, mutating authorities, or expanding scope.

---

## 2. In Scope (Locked)

- Add navigation (`<Link href={`/products/${slug}`}>` from next/link) on:
  - Product titles (h3 in grid, ProductNameHeading/h2 in featured)
  - Image containers (the relative divs containing the product artwork)
  - Optionally, non-CTA card body areas (subtitle/features/price), only if no layout or style change is required.
- Use the existing `slug` already present in the component props (`product.slug` in Section 4, `featuredProduct.slug` in Section 3).
- Add lightweight analytics tracking for the new "view product detail" navigation (distinct from LINE_CLICK events).
- All changes must be additive.
- Preserve every visual className, spacing, typography, color, shadow, layout, and structure exactly.
- The target platform pages (`/products/[slug]`) are already complete and do not require changes.

---

## 3. Out of Scope (Locked)

- Any modification to existing CTA buttons, their `onClick` handlers, `href`, labels, or `ariaLabel`.
- Any change to `activateLineCta` calls or the surfaces used by product CTAs (`product-grid-card`, `featured-product-line`, `product-grid-final`).
- Modifying or removing Phase 6A LINE behavior in any way.
- Changes to Product Authority (`content/products.ts`) or UI content cta labels.
- Adding new buttons, "View Details" text, or any new UI elements.
- Any visual, layout, or spacing changes.
- Changes to any homepage section other than Section 3 (Featured) and Section 4 (Product Grid).
- Routing or links outside `/products/[slug]`.
- Query parameters on routes.
- Modifications to platform product pages, entity loader, SEO, sitemap, or any other infrastructure.
- Any work on other phases (6C+).

---

## 4. Allowed Files

Only the following files **MAY** be created or modified. Any edit outside this list is a Scope Lock violation.

**Section 3 (Featured Product)**
- sections/section-3-hero-product/section-3-hero-product.tsx

**Section 4 (Product Grid)**
- sections/section-4-product-catalog/section-4-product-catalog.tsx

**Notes on Allowed:**
- Edits are limited exclusively to adding `<Link>` wrappers on title and image (non-CTA) areas.
- The inner functions `ProductCardCTA`, `SolidLineCTA` (in Section 3), and their onClick logic must remain completely untouched.
- No changes to imports of analytics or activation helper beyond what is strictly needed for the new links.
- Index files may only be touched if re-exports are absolutely required (currently not expected).

---

## 5. Forbidden Files

The following are **strictly forbidden**. Any change, creation, or deletion in these areas violates Scope Lock.

**CTA Logic (absolute prohibition)**
- Any modification to `ProductCardCTA` or `SolidLineCTA` (including their onClick handlers, even inside the two allowed files).
- Any change to calls of `activateLineCta` for product surfaces.

**Authorities & Data (no mutation)**
- content/products.ts
- content/section-3-hero-product.ts (beyond read-only reference)
- content/section-4-product-catalog.ts (beyond read-only reference)
- Any other content or data files.

**All Other Homepage Sections**
- sections/hero/hero-section.tsx
- sections/section-2-trust-bar/section-2-trust-bar.tsx
- sections/section-9-faq/section-9-faq.tsx
- sections/section-10-final-cta/section-10-final-cta.tsx
- sections/section-11-footer/section-11-footer.tsx
- components/layout/global-header.tsx
- Any other section or component file.

**Platform & Infrastructure**
- app/(platform)/**
- lib/platform/**
- lib/commerce/**
- app/sitemap.ts
- Any SEO, entity loader, or platform page files.

**General**
- Any file not explicitly listed in "Allowed Files".
- Any change that would alter Phase 6A LINE CTA behavior.
- Any visual or layout modification.

---

## 6. Batch Plan

**One Batch = One Spoke** (per Workflow v2.1 and Blueprint).

**Recommended Batches:**

**Batch 1: Product Grid Routing (Section 4)**
- Add `<Link>` on product titles and image containers in `ProductCatalogCard`.
- Add analytics tracking for detail navigation.
- Explicit verification that all existing `ProductCardCTA` and FinalLineCTA onClick handlers are 100% unchanged.

**Batch 2: Featured Product Routing (Section 3)**
- Add `<Link>` on the product title (`ProductNameHeading`) and image container.
- Add analytics tracking for detail navigation.
- Explicit verification that the existing `SolidLineCTA` onClick handler is 100% unchanged.

**Batch 3: Validation + Evidence**
- Full regression test of all Phase 6A LINE CTAs (especially product-grid-card, featured-product-line, product-grid-final).
- Verify navigation works to correct slugs.
- Verify zero visual/layout drift.
- Collect evidence (screenshots, navigation logs, analytics events, CTA behavior confirmation).
- Run full `npm run validate`.

No large multi-section batches. Each batch must include explicit confirmation that Phase 6A LINE behavior is untouched.

---

## 7. Validation Requirements

**Per Batch (mandatory before considering batch complete):**
- `npm run lint`
- `npm run typecheck`
- `npm run build`

**Final Validation (after Batch 3):**
```bash
npm run validate
```
Must pass cleanly.

**Manual Evidence Required (for audit):**
- Confirmation that product titles and images navigate to `/products/[slug]`.
- Confirmation that every product CTA button still performs exact Phase 6A LINE handoff (same `activateLineCta` call with correct surface).
- Side-by-side visual comparison or diff showing zero changes to layout/styling.
- Analytics events for new detail navigation (separate from LINE_CLICK).
- No nested interactive elements.

---

## 8. Audit Acceptance Criteria

The following must be verified in Scope Lock Audit and later Implementation Audits:

- **Blueprint Compliance**: Every change traces directly to the approved PHASE6B-PLATFORM-ROUTING-BLUEPRINT.md.
- **Scope Lock Verification**: Implementation stayed 100% inside Allowed Files and respected all Forbidden items.
- **CTA Preservation Verification**: Zero modifications to any `activateLineCta` call, surface name, label, or onClick logic for product CTAs.
- **No Product Authority Mutation**: `content/products.ts` and related cta labels untouched.
- **Visual Baseline Verification**: No changes to classNames, spacing, typography, colors, shadows, or layout in Section 3 or 4.
- **Routing Boundary Verification**: All new links go only to `/products/[slug]`. No other routing introduced.
- **No Query Params**: Routes are clean `/products/${slug}`.
- **Analytics Separation**: New detail navigation events are distinct from LINE events.
- **Accessibility**: New links have proper accessible names; no nested interactive elements created.
- **Regression Check**: All Phase 6A LINE CTAs (header, hero, product grid, featured, faq, final, footer) continue to function exactly as before.

---

## 9. Success Criteria

The phase is successful only when:

- Product titles and image areas in both Section 3 and Section 4 navigate to the correct `/products/[slug]` pages.
- Every existing CTA button in those sections continues to perform exact Phase 6A LINE handoff (unchanged `activateLineCta` behavior).
- No CTA labels were changed.
- Zero visual or layout drift from the Phase 6A frozen baseline.
- `npm run validate` passes.
- All Audit Acceptance Criteria are satisfied with clear evidence.

---

## 10. Risks

- **Scope bleed into CTA modification**: Highest risk. Mitigation: Explicit code review and audit verification that CTA functions are untouched.
- **Image wrapping complexity**: The fill Image + badge structure can be fragile. Mitigation: Careful implementation and visual regression testing.
- **User expectation**: Titles/images now go to details while buttons still say "สั่งซื้อผ่าน LINE". Mitigation: This is intentional per SA direction; documentation and evidence must be clear.
- **Accidental visual change**: Even small class or spacing differences violate the lock. Mitigation: Strict diff review required.

---

## 11. Explicit Non-Goals

These are repeated for absolute clarity. They are **permanently out** for Phase 6B:

- NO changes to any CTA button behavior or labels.
- NO modification of `activateLineCta` calls for product surfaces.
- NO Product Authority mutation.
- NO visual redesign or layout changes.
- NO routing outside `/products/[slug]`.
- NO query parameters.
- NO new buttons or UI elements.
- NO changes outside Section 3 and Section 4.
- NO impact on Phase 6A LINE CTA functionality.
- NO work on other phases.

Any attempt to do the above is a direct violation of this Scope Lock.

---

**Scope Lock Status:** LOCKED

**Prepared by:** Grok CLI (Documentation Only)  
**Next:** Codex Scope Lock Audit → SA Approval → Batch Implementation (starting with Batch 1)

**End of PHASE6B-PLATFORM-ROUTING-SCOPE-LOCK.md**