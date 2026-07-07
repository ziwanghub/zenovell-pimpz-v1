# PHASE5C-PRODUCT-LANDING-PAGE-SCOPE-LOCK.md (v1.1)

**Project:** ZENOVELL-PIMPZ-V4-Active  
**Phase:** 5C  
**Milestone:** Product Landing Page Template  
**Version:** v1.1  
**Status:** Locked  

---

## 1. Purpose

This document locks the scope for the Phase 5C Product Landing Page (PLP) Template.

It ensures that all implementation stays within the approved boundaries defined in the PHASE5C-PRODUCT-LANDING-BLUEPRINT.md and prevents scope creep.

## 2. In Scope (Locked)

### 2.1 Core Deliverable
- Reusable Product Landing Page Template for `/products/[slug]`
- 10 sections exactly:
  1. Product Hero
  2. Benefits
  3. Ingredients
  4. How To Use
  5. Trust Signals
  6. Reviews
  7. FAQ
  8. Related Products
  9. LINE CTA (primary + supporting)
- Entity-driven from Product Authority (content/products.ts)
- SSG with generateStaticParams + generateMetadata
- Mobile-first, accessible, SEO/AI-SEO native

### 2.2 Technical Boundaries
- Pure contracts (no side effects in foundation layers)
- Commerce Context (channel-independent)
- Pure LINE Message Builder integration
- Performance Budget (LCP, CLS, INP, bundle, images, lazy loading)
- Visual Consistency Gate with frozen homepage

### 2.3 Governance Additions
- PRE-WP00: Product Authority Completeness Check
- Visual Consistency Gate (post WP-11)
- Performance Budget definition and validation

## 3. Explicitly Out of Scope (Locked)

- Any changes to frozen homepage (Sections 1-11)
- Full e-commerce flows (cart, checkout, payment)
- Backend mutations or API implementations
- New product data authoring beyond template exercise
- Phase 5D or later surfaces
- Activation of persistence skeleton
- Non-delta changes to existing contracts

## 4. Data Requirements (Locked)

The template must consume:
- Core Product fields (slug, name, pricing, linePayloadMetadata, etc.)
- Rich content layer (benefits, ingredients, howToUse, reviews, faqs, relatedSkus)
- SEO metadata per product

No hardcoded product strings in presentation layer.

## 5. Acceptance Gates (Locked)

Phase 5C is considered complete only when:
- PRE-WP00 passed and approved
- All 10 sections implemented and validated
- LINE CTA payloads correct for all products
- Visual Consistency Gate passed
- Performance Budget targets met or planned
- Zero impact on frozen homepage
- Full evidence package produced

## 6. Change Control

Any change to this scope requires:
- Update to this document (version bump)
- Update to PHASE5C-PRODUCT-LANDING-BLUEPRINT.md if needed
- ZZ approval

---

**End of PHASE5C-PRODUCT-LANDING-PAGE-SCOPE-LOCK.md (v1.1)**

This document locks the scope for Phase 5C Product Landing Page work. All future implementation must respect these boundaries.