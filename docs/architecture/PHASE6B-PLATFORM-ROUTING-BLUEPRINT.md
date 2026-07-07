# PHASE 6B — PLATFORM ROUTING BLUEPRINT

**Date**: 2026-07-08  
**Phase**: Phase 6B — Platform Routing  
**Status**: Blueprint (Ready for Blueprint Audit)  
**Baseline**: Phase 6A Closed (commit aabda1b) + Frozen Homepage Visual + Phase 5 Platform Foundation + Governance v2.1  
**Governing Documents**:
- WORKFLOW-v2.1.md (ACTIVE)
- DEVELOPMENT-LIFECYCLE.md (ACTIVE)
- docs/reports/phase6/PRE-WP00-PHASE6B-PLATFORM-ROUTING.md (COMPLETE)
- docs/reports/phase6/PRE-WP00A-PHASE6B-PLATFORM-ROUTING.md (COMPLETE)
- PHASE6A-CONVERSION-PATH-HARDENING-BLUEPRINT.md (CLOSED)
- PHASE6A-CONVERSION-PATH-HARDENING-SCOPE-LOCK.md (CLOSED)
- SA Decision (2026-07-08): Product titles/images → /products/[slug]; CTA buttons remain LINE handoff. Do not disrupt Phase 6A.
- Phase 5 platform routes, entity loader, and Product Authority

**Objective**: Define the minimal, additive changes to connect homepage product discovery surfaces (Featured Product in Section 3 and Product Grid in Section 4) to the existing `/products/[slug]` platform pages, while ensuring every product CTA button continues to perform the exact Phase 6A LINE handoff via `activateLineCta` without any modification.

---

## 1. Executive Summary

Phase 6B is strictly **Platform Routing for product discovery**. It is not a redesign, not a CTA overhaul, and not an expansion of LINE conversion work.

Current state after Phase 6A:
- All primary LINE CTAs (including product-grid-card, product-grid-final, and featured-product-line) are fully functional and call `activateLineCta()` with correct surfaces, context, persistence, and LINE handoff.
- Homepage product surfaces (Section 3 Featured and Section 4 Grid) render product data (including `slug`) but have no navigation to `/products/[slug]`.
- The platform `/products/[slug]` pages are complete (SSG, full content sections, SEO, structured data, entity loader, own LINE CTA).
- Product Authority provides consistent slugs across homepage UI content and platform routes.
- No `/products/` links exist anywhere on the homepage surfaces.

Phase 6B will add `<Link>` navigation on product titles and image areas in Section 3 and Section 4 only. The existing CTA buttons in those sections will remain 100% unchanged (still call `activateLineCta` for LINE). All changes are additive and preserve the Phase 6A behavior, visual baseline, and labels exactly.

Primary goal: Homepage product discovery now leads users into the platform while direct LINE conversion paths from the same surfaces stay intact.

---

## 2. Objective

Enable product discovery on the homepage to route to the existing platform:

Homepage Featured Product (title/image) and Product Grid (titles/images/non-CTA areas) → `/products/[slug]`

While:

Product CTA buttons (the styled "สั่งซื้อผ่าน LINE" elements) → continue to call `activateLineCta` with their Phase 6A surfaces and perform LINE handoff.

Deliver this without:
- Changing any CTA onClick, label, or href behavior.
- Mutating Product Authority.
- Altering visuals, layout, or spacing.
- Touching any other homepage section.
- Adding query params or new architecture.

---

## 3. Current Foundation

- **Homepage Discovery**:
  - Section 3 (Featured Product): Renders `featuredProduct` data (slug, title, pricing, artwork, cta from authority). CTA is SolidLineCTA with onClick → `activateLineCta({product, surface: "featured-product-line", ...})`.
  - Section 4 (Product Grid): Renders mapped cards with `slug`, title, image, features, pricing, cta. Each has ProductCardCTA with onClick → `activateLineCta({product, surface: "product-grid-card", ...})` + FinalLineCTA for the grid (`"product-grid-final"`).
- **Platform Routes**:
  - `app/(platform)/products/[slug]/page.tsx` with `generateStaticParams` from `getAllProducts()`.
  - Full sections via platform components, SEO, structured data.
  - Uses `loadProductBySlug` from entity-loader.
- **Data**:
  - `content/products.ts`: 6 products with slug/sku/title/linePayloadMetadata.
  - UI content (`section-3-hero-product.ts`, `section-4-product-catalog.ts`) maps from authority and hardcodes cta.href = "#".
- **Phase 6A**:
  - All product-related CTAs on homepage use the shared `activateLineCta` helper.
  - No routing from homepage to platform yet.
- **Governance**:
  - Phase 6A closed with clean commit and CI.
  - Workflow v2.1 requires Blueprint → Audit → Scope Lock → controlled batches.

---

## 4. Problem Statement

Homepage users can currently only:
- View product previews (titles, images, features, price).
- Click CTA buttons → direct LINE handoff (Phase 6A).

There is no way for users who want details to navigate from the discovery surfaces into the rich Product Landing Pages (`/products/[slug]`).

The platform pages are ready, slugs are consistent, but the connection is missing. Any solution must keep the existing LINE CTAs (and their labels/behavior) exactly as Phase 6A left them.

---

## 5. In Scope

- Add `<Link href={`/products/${slug}`}>` (from next/link) on:
  - Product titles (h3 in grid, ProductNameHeading/h2 in featured).
  - Image containers (the relative divs holding the product artwork, preserving fill/object-cover and any badges).
- Optionally make additional non-CTA card body areas (subtitle/features/price area) navigable if it does not require layout or style changes.
- Use the existing `slug` already present in the product prop (Section 4) and `featuredProduct` import (Section 3).
- Add lightweight analytics tracking for the new "view product detail" navigation (distinct from LINE_CLICK).
- Preserve every visual className, spacing, typography, color, shadow, and layout exactly.
- Keep the ProductCardCTA and SolidLineCTA components and their onClick handlers 100% untouched.
- Keep all cta labels exactly as they come from the current UI content (which sources from Product Authority).
- Changes limited to the two section .tsx files (and their direct imports if needed for Link).
- Ensure the new links do not create nested interactive elements with the existing CTA <a>s.

---

## 6. Out of Scope

- Any modification to ProductCardCTA, SolidLineCTA, or their onClick / href logic.
- Changing any CTA label, ariaLabel, or text.
- Calling or altering `activateLineCta` for these CTAs.
- Modifying Product Authority (`content/products.ts`) or its cta objects.
- Changes to content/*.ts files for labels or data (unless purely additive for Link props, which is not required).
- Adding new buttons, "View Details" text, or any UI elements.
- Visual or layout changes (no new classes, no hover styles unless zero visual impact).
- Changes to any other homepage sections (Header, Hero main, Trust, FAQ, Final, Footer, etc.).
- Routing or links in non-product areas.
- Query parameters on the route.
- Modifications to platform pages, entity loader, SEO, or sitemap.
- Any Phase 6C/6D work or desktop-specific changes.
- Mutation of existing analytics on the LINE CTAs.

---

## 7. Routing Strategy

- Use `import Link from 'next/link';`
- `<Link href={`/products/${slug}`}>` (client navigation + prefetch).
- No query params.
- The slug comes directly from the existing product data passed to the components (no new lookups required).
- The platform page already handles the slug via `loadProductBySlug` and `generateStaticParams`.
- Links are added only on non-CTA elements (title and image containers).
- Existing CTA <a>s remain with their current href (currently "#") + onClick that performs LINE handoff.

---

## 8. Clickable Elements

**Product Grid (Section 4 - ProductCatalogCard)**:
- The `<h3>` containing `{product.title}` → wrap in `<Link>`.
- The relative image container div (containing `<Image fill ... />` and optional badge) → wrap in `<Link>` (preserve all classes and structure).

**Featured Product (Section 3)**:
- The `<ProductNameHeading text={content.productName} />` (renders as h2) → wrap in `<Link>`.
- The relative image container div (containing `<Image fill ... />` and badges) → wrap in `<Link>`.

The CTA buttons (and their containing divs) are explicitly excluded and must not receive the Link.

---

## 9. CTA Preservation Rules

- The `onClick` handlers in ProductCardCTA and SolidLineCTA must remain exactly as they are after Phase 6A:
  - Call `analytics.track(...)`
  - Call `activateLineCta({ product: {...}, surface: "product-grid-card" | "featured-product-line" | "product-grid-final", ... })`
  - `e.preventDefault()`
- CTA labels and ariaLabels must stay exactly as defined in the current content files.
- No changes to `cta.href` values in the data or components for these CTAs.
- The helper `activateLineCta` and its internal logic (context creation, message builder, persistence, events) must not be modified or bypassed for these surfaces.
- Phase 6A surfaces "product-grid-card", "product-grid-final", and "featured-product-line" continue to perform LINE handoff only.

---

## 10. Analytics Direction

- Add tracking for the new detail navigation, e.g.:
  ```ts
  analytics.track(AnalyticsEvents.PRODUCT_CLICK, {
    surface: "grid" | "featured",
    action: "detail",
    slug: product.slug,
    label: product.title,
  });
  ```
- This is separate from the existing `PRODUCT_CLICK` used on the LINE CTAs and from the commerce `LINE_CLICK` dispatched inside the activation helper.
- Keep all existing analytics calls on the CTA buttons untouched.
- No changes to the commerce event system.

---

## 11. Accessibility Direction

- Titles wrapped in Link will have the product name as accessible link text (excellent).
- Image containers wrapped in Link must include `aria-label={`View details for ${title}`}` on the Link (or equivalent) to provide accessible name, since the image itself already has alt.
- Ensure no nested `<a>` elements (current CTA <a>s are siblings/outside the proposed Link wrappers).
- Preserve all existing aria-labels, focus-visible styles, and keyboard behavior on the LINE CTA buttons.
- Links must be focusable and respect existing focus ring styles.
- No changes to overall document structure or heading hierarchy.

---

## 12. Files Likely Involved

**Primary (implementation will touch)**:
- `sections/section-4-product-catalog/section-4-product-catalog.tsx`
- `sections/section-3-hero-product/section-3-hero-product.tsx`

**Reference / minimal if needed**:
- `content/section-4-product-catalog.ts` (read-only for understanding data shape)
- `content/section-3-hero-product.ts` (read-only)
- `content/products.ts` (read-only for slugs)

**Not touched** (unless explicitly justified later):
- Any CTA component logic or onClick in the above files.
- `lib/commerce/cta-activation.ts` or other commerce files.
- Product Authority.
- Other homepage sections.
- Platform product pages (already ready).

---

## 13. Risks

- Image wrapping (fill + badge) must be done without introducing layout shift or breaking object-cover (implementation must test carefully).
- Accidental inclusion of the CTA button inside a Link (strict code review required).
- User expectation: titles/images now navigate to details while buttons go to LINE (acceptable per SA direction; labels on buttons stay "สั่งซื้อผ่าน LINE").
- Adding Link may require the files to already be client components (they are, thanks to Phase 6A).
- No visual drift allowed — any hover/focus styles on new links must be zero-impact or deferred.

---

## 14. Success Criteria

- Product titles and image areas in Section 3 and Section 4 are clickable and navigate to the correct `/products/${slug}`.
- All existing CTA buttons in those sections continue to perform exact Phase 6A LINE handoff (same `activateLineCta` call, same surfaces, same behavior).
- No changes to any CTA label or ariaLabel.
- No visual, spacing, typography, or layout differences from Phase 6A baseline.
- No nested interactive elements created.
- New detail navigation is tracked separately from LINE events.
- `npm run validate` passes.
- Clicking a title/image goes to the full Product Landing Page; clicking the CTA button still opens LINE with context.
- All Phase 6A LINE CTAs (including product ones) remain fully functional.

---

## 15. Implementation Sequence

Follow one-batch = one-spoke.

Suggested order (small and reviewable):

1. Add `import Link from 'next/link';` and wrap title + image container in Product Grid (Section 4). Add analytics for detail click. Keep CTA exactly as-is.
2. Add `import Link from 'next/link';` and wrap title + image container in Featured Product (Section 3). Add analytics for detail click. Keep CTA exactly as-is.
3. Validation + evidence batch (full manual test of both new links + all existing LINE CTAs, visual diff, a11y, navigation to correct slugs).
4. (If needed) Minor analytics constant addition (separate from above).

No large multi-section batch.

---

## 16. Audit Acceptance Criteria

- Blueprint strictly follows SA direction (titles/images → PLP; CTAs stay LINE).
- Scope is limited to the two section files for the links + minimal analytics.
- Explicit CTA preservation rules are stated and match the code that will be produced.
- No Product Authority mutation, no label changes, no visual changes.
- Routing uses clean `next/link` to `/products/${slug}` with no query params.
- Success criteria are measurable (navigation works, LINE CTAs unchanged, validate passes).
- Risks (nesting, image wrapping, user expectation) are addressed.
- Implementation sequence respects small batches.

---

## 17. Deferred Items

- Any work on making the entire card (except CTA) clickable if it requires style changes.
- Passing entry context (e.g. "from=grid") to the PLP.
- Changes to CTA labels or behavior in future phases.
- Desktop-specific link treatment.
- Related products or cross-linking inside the platform pages.
- Phase 6C+ standardization.

---

**Blueprint prepared by**: Grok CLI (Documentation Only)  
**References**: docs/reports/phase6/PRE-WP00-PHASE6B-PLATFORM-ROUTING.md, docs/reports/phase6/PRE-WP00A-PHASE6B-PLATFORM-ROUTING.md, Phase 6A closed artifacts, current codebase state (Section 3/4 CTAs call activateLineCta; no homepage routing to products yet; platform ready).  
**Next gate**: Independent Blueprint Audit → SA Final Approval → Scope Lock.

**End of PHASE6B-PLATFORM-ROUTING-BLUEPRINT.md**