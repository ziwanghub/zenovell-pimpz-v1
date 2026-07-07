# PRE-WP00-PHASE6B-PLATFORM-ROUTING.md

**Project:** ZENOVELL-PIMPZ-V4-Active  
**Phase:** 6B  
**Milestone:** PRE-WP00 — Platform Routing Readiness Assessment  
**Document Type:** Governance Gate Report (Read-only Analysis)  
**Date:** 2026-07-08  
**Authority:** SA Direction following Phase 6A Closeout

---

## WORKSPACE VERIFICATION

```
=== WORKSPACE VERIFICATION ===
Project Root: /Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active
Git Root:     /Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active
Current Branch: main
Working Directory: /Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active
Git Status: CLEAN (post Phase 6A closeout)
Last Commit: aabda1b feat(phase6a): harden homepage conversion path
```

**Verification Result:** PASSED. Operating on clean post-6A baseline.

---

## 1. Executive Summary

PRE-WP00 executed to assess readiness for Phase 6B Platform Routing.

**Core Finding:**  
The foundation for connecting homepage product discovery (Featured Product Section 3 + Product Grid Section 4) to the existing `/products/[slug]` platform pages is strong. Product Authority, entity loader, platform PLP implementation, and SEO/sitemap are all in place from Phase 5.

However, **no navigation currently exists** from the discovery surfaces to the platform pages. All product-related CTAs on the homepage were wired exclusively to LINE handoff during Phase 6A.

**Key Constraint (from SA):**  
Phase 6B must **not disrupt** Phase 6A LINE CTA activation. Product titles/images should link to platform pages; the CTA buttons must continue performing LINE handoff.

**Readiness Verdict:**  
**PASS** with clear scope. The project is ready to proceed to PRE-WP00A for strategy definition.

---

## 2. Current Homepage Product Discovery Surfaces

- **Section 3 — Featured Product**: Renders prominent product (Nicky Pimpz Boss via featuredProduct), with image, details, and a prominent CTA currently wired to LINE via `activateLineCta(..., surface: "featured-product-line")`.
- **Section 4 — Product Grid**: Grid of 6 products (from Product Authority). Each card has title, image, features, price, and CTA wired to LINE (`surface: "product-grid-card"`). There is also a grid Final CTA (`"product-grid-final"`).

**Current CTA Behavior (post-6A):**  
All product CTAs perform LINE handoff with Commerce Context. `href` values are placeholders ("#"). No links to `/products/[slug]`.

---

## 3. Existing Platform Foundation

- **Product Authority** (`content/products.ts`): 6 products with `slug`, `sku`, `title`, `linePayloadMetadata`, etc.
- **Entity Loader** (`lib/platform/entity-loader.ts`): `getAllProducts()`, `loadProductBySlug()`.
- **Platform Routes**: `app/(platform)/products/[slug]/page.tsx` — full PLP with sections, `generateStaticParams`, SEO, structured data.
- **Sitemap**: Already includes all product pages.
- **Platform CTA Pattern**: PLP components already use `createCtaPayload` + LINE handoff (consistent with 6A helper).

---

## 4. Gap Analysis

**Missing:**
- No `<Link>` or navigation from homepage titles/images to `/products/[slug]`.
- Current CTAs (product-grid-card, featured-product-line) are 100% LINE.

**Opportunities:**
- Slugs are already present in the card data passed to Section 3 and 4 components.
- Platform is ready to receive traffic.

**Critical Boundary (enforced):**
- Do not change or remove the LINE activation on the CTA buttons.
- Do not mutate Product Authority.
- Do not redesign visuals or layouts.

---

## 5. Recommended Direction (High Level)

- Add navigation links on **non-CTA elements** (titles and image areas) in Section 3 and Section 4 to `/products/${slug}`.
- Keep **all CTA buttons** exactly as Phase 6A implemented them (LINE handoff via `activateLineCta`).
- This allows two coexisting paths:
  - Click title/image → study details on Product Page.
  - Click CTA button → direct LINE conversion (preserved from 6A).

---

## 6. Risks Identified at PRE-WP00

- Scope creep into changing CTA behavior or labels.
- Visual changes if link styling is added carelessly.
- User expectation mismatch if CTA labels ("สั่งซื้อผ่าน LINE") are not aligned with action (mitigated by keeping CTAs as LINE).
- Accidental nesting of links with existing CTAs.

---

## 7. Conclusion

**PRE-WP00 Verdict: PASS**

The project has a solid foundation. The main gap is the missing connection from discovery surfaces to platform pages. The constraint to preserve Phase 6A LINE CTAs is clear and enforceable.

Proceed to PRE-WP00A for detailed strategy definition.

---

**End of PRE-WP00-PHASE6B-PLATFORM-ROUTING.md**