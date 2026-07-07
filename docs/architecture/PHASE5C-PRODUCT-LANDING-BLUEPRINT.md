# PHASE5C — PRODUCT LANDING PAGE BLUEPRINT

**Date**: 2026-07-07
**Phase**: Phase 5C — Product Landing Page Template
**Status**: Blueprint (Ready for Scope Lock / Implementation)
**Governing Documents**:
- ADR-001: LINE-First Commerce Landing Platform (APPROVED)
- ADR-002: Acquisition Architecture (APPROVED)
- ADR-003: LINE Commerce Architecture (APPROVED)
- PHASE5-COMMERCE-EXPERIENCE-BLUEPRINT.md (APPROVED)
- PHASE5-COMMERCE-EXPERIENCE-SCOPE-LOCK.md (ACTIVE)
- COMMERCE-FOUNDATION-COMPLETE.md (APPROVED)
- COMMERCE-CONTEXT-PERSISTENCE-BLUEPRINT.md (APPROVED)
- PRODUCTION-READINESS-GATE-v1.md (ACTIVE)
- RELEASE-STRATEGY.md (ACTIVE)

**Objective**: Define the complete architecture for the Product Landing Page (PLP) as a "Mini Landing Page" — not a traditional Product Detail Page. The PLP is designed for Education, Trust Building, SEO, AI SEO, and direct LINE Conversion, while the frozen Homepage remains the high-velocity acquisition hub.

---

## 1. Executive Summary

Phase 5C focuses exclusively on the Product Landing Page Template architecture.

This is a critical "spoke" in the Hub-and-Spoke model defined in ADR-001 and the Phase 5 Blueprint.

The PLP will:
- Deliver deep, product-specific education and trust signals.
- Leverage Product Authority as the Single Source of Truth.
- Carry and enrich Commerce Context for personalized LINE handoff.
- Be optimized for SEO and AI SEO (long-tail, entity-rich content).
- Drive qualified LINE Friend conversions.

The homepage (Sections 1–11) remains completely frozen. No changes to Hero, MobileShell, or existing content.

This blueprint provides the detailed design so that implementation (when authorized) can be consistent, scalable, and aligned with all ADRs.

---

## 2. Objectives

- Create a reusable, entity-driven Product Landing Page template (Mini LP) for each product/SKU.
- Maximize education and trust to improve conversion to LINE Friend.
- Enable strong SEO and AI SEO performance for product-specific and long-tail queries.
- Ensure seamless, context-rich handoff to LINE using Commerce Context + LINE Message Builder.
- Support Google/Meta/TikTok Ads by providing highly relevant landing pages.
- Maintain strict separation from the frozen homepage.
- Prepare for future extensibility (e.g., more products, A/B testing, personalization).

Primary success metric for each PLP: Qualified LINE Friend acquisition rate + downstream conversion quality.

---

## 3. Architecture Principles

- **Entity-Driven**: Every PLP is driven by the Product entity from Product Authority (content/products.ts).
- **Context-Aware**: Every surface carries and enriches Commerce Context (from ADR-001/002/003).
- **LINE-First**: All primary CTAs lead to LINE with pre-filled, context-rich messages.
- **Mini Landing Page, Not Detail Page**: Rich, conversion-oriented content (education + trust + social proof), not thin specs.
- **Mobile-First**: All design, performance, and navigation optimized for mobile (consistent with MobileShell constraints where applicable).
- **SEO & AI SEO Native**: Built from the ground up for search engines and AI answer engines.
- **Reusable & Scalable**: Template + component system that works for 6 products today and scales to dozens or hundreds.
- **Pure Separation**: Content (Product Authority + rich content layer) vs. Presentation (templates).
- **No Homepage Pollution**: Zero impact on frozen Sections 1–11.
- **Channel Independent**: Commerce Context remains usable for future channels per ADR-003.

---

## 4. Information Architecture

The PLP is organized around the Product entity:

Core Data (from Product Authority):
- id, slug, sku, title, subtitle
- pricing (sale, original)
- promotions
- category
- linePayloadMetadata
- cta (label, ariaLabel)
- features

Rich Content Layer (separate from core data, per entity):
- Hero visuals
- Detailed benefits
- Ingredients / composition
- How to Use / Dosage
- Certifications & Quality details
- Manufacturing story
- Reviews (curated + dynamic)
- FAQs (product-specific)
- Related products logic

Navigation within PLP:
- Anchor navigation for long content (mobile-friendly)
- Sticky or prominent LINE CTA
- Related Products section
- Breadcrumbs back to Homepage or category (future)

Context Inheritance:
- Inherits or enriches Commerce Context from entry point (e.g., from Homepage product card).

---

## 5. Page Structure

Recommended high-level structure (mobile-optimized, single-column with clear visual hierarchy):

1. **Hero** (above the fold)
2. **Trust Bar** (social proof, certifications summary)
3. **Benefits**
4. **Ingredients / Composition**
5. **How to Use**
6. **Certifications & Quality**
7. **Reviews**
8. **FAQ**
9. **Related Products**
10. **Final LINE CTA + Trust Signals**
11. **Structured Data** (JSON-LD, invisible)

The structure supports deep scrolling for education while keeping the LINE CTA visible and prominent.

---

## 6. Recommended Section Order

1. Hero
2. Benefits (3–5 key benefits with icons/visuals)
3. Ingredients / Composition (detailed, with visuals)
4. How to Use (step-by-step, dosage, tips)
5. Certifications & Quality (badges + details)
6. Reviews (social proof)
7. FAQ (entity-driven)
8. Related Products
9. Final LINE CTA block
10. Footer (minimal)

This order prioritizes:
- Immediate hook (Hero)
- Education & trust (middle sections)
- Social proof & FAQ (before final CTA)
- Clear conversion (final LINE CTA)

---

## 7. Entity Flow

Product Authority (content/products.ts) → PLP Page → Template

1. Route receives slug.
2. Entity Loader fetches Product from Product Authority.
3. Rich content (if any) is loaded from dedicated content layer keyed by slug.
4. Template renders using Product data + rich content.
5. Commerce Context is read (from persistence or URL) and enriched with current surface ("product-landing-page") and product details.
6. LINE CTAs use LINE Message Builder + enriched context to generate pre-filled message.

This ensures consistency and single source of truth.

---

## 8. Product Authority Integration

The PLP must consume Product Authority as the **Single Source of Truth** for:

- Title, subtitle
- SKU
- Pricing (sale + original)
- Promotions
- Features
- linePayloadMetadata (for LINE message)
- cta (base label/aria)

The PLP template must **never** hardcode product data.

All dynamic elements (title, price, LINE pre-fill data) pull from the Product object.

This enables:
- Easy scaling to new products
- Consistency with homepage and future surfaces
- Accurate Commerce Context

---

## 9. Commerce Context Integration

The PLP must read, enrich, and forward Commerce Context.

On entry:
- Read existing context (from Homepage or direct link) via persistence or URL params.
- Enrich with:
  - entrySurface: "product-landing-page"
  - product / sku from current page
  - Any additional intent signals from on-page behavior (future)

On LINE CTA:
- Pass the enriched context to the LINE Message Builder.
- Generate pre-filled message that includes product + context (campaign, source, utm, intent, etc.).

This maintains the full acquisition story for LINE and for future attribution.

---

## 10. LINE Conversion Strategy

Primary goal of every PLP: Convert the user into a qualified LINE OA Friend.

Strategy:
- Multiple prominent LINE CTAs (Hero + final block + possibly floating).
- All CTAs use the LINE Message Builder + current Commerce Context for personalized pre-fill.
- Message should reference the specific product + source (e.g., "Viewed on Product Page after seeing ads for [campaign]").
- Secondary CTAs for "Learn more" or "Compare" should still offer easy LINE entry.

The PLP is optimized for conversion, not for keeping the user on the site.

---

## 11. SEO Strategy

- **Metadata**: Dynamic title, description, Open Graph from Product + page context.
- **Canonical**: Self-canonical on PLP.
- **Structured Data**: JSON-LD for Product, Offer, Review, FAQPage.
- **URL Structure**: Clean /products/[slug]
- **Internal Linking**: From Homepage product cards + related products on other PLPs.
- **Performance**: Critical for LCP (hero image optimization, above-the-fold priority).

Target keywords: Product name + benefit + "ราคา", "รีวิว", "วิธีใช้", specific claims.

---

## 12. AI SEO Strategy

- Rich, entity-clear content (ingredients, certifications, usage) that LLMs can easily parse.
- Question-answer format in FAQ and How to Use sections.
- Clear product entity signals (consistent naming, schema).
- Authoritative tone with sources where applicable.
- Freshness signals (update dates on certifications/reviews).

Goal: Appear as authoritative answer in AI search for product-related questions.

---

## 13. Performance Strategy

- Prioritize Hero image (use Next.js Image with priority where appropriate).
- Lazy load below-the-fold sections (Reviews, Related).
- Minimal client-side JS on initial load.
- Reuse existing design system tokens and components where possible.
- Target Core Web Vitals: Good LCP, INP, CLS on mobile.

---

## 14. Accessibility Strategy

- Semantic HTML throughout.
- Proper heading hierarchy.
- Alt text for all images (from Product data or content).
- ARIA labels on CTAs (leveraging existing ariaLabel from Product).
- Keyboard navigation and focus management (consistent with existing primitives).
- Color contrast compliance.

---

## 15. Mobile-first Strategy

- All sections designed mobile-first (max-w container if needed, but full width where appropriate for new pages).
- Touch-friendly CTAs and navigation.
- Collapsible sections (FAQ, reviews) where content is long.
- Performance budget stricter on mobile.

---

## 16. Reusable Component Strategy

- Core sections should be built as reusable components (e.g., ProductHero, BenefitsList, IngredientTable, ReviewList, ProductFAQ, RelatedProducts, LineCtaBlock).
- Components accept data from Product Authority + context.
- Shared across all PLPs for consistency and maintainability.
- Avoid one-off components per product.

---

## 17. Scope Lock

**In Scope for Phase 5C**:
- Architecture and template definition for Product Landing Pages.
- Integration points with Product Authority and Commerce Context.
- SEO/AI SEO/Performance/Accessibility strategies specific to PLP.
- Preparation for LINE conversion using existing contracts.

**Out of Scope for Phase 5C** (see Forbidden Items below):
- Actual implementation of the full template (this is blueprint).
- Homepage changes.
- Commerce wiring / event dispatch.
- Full Information or Knowledge pages.
- Checkout, payment, CRM.

---

## 18. Forbidden Items

- Any modification to the frozen Homepage or Sections 1–11.
- Changes to Hero CTA behavior on homepage.
- Modification of Product Authority, Commerce Context, CTA Contract, LINE Message Builder, or Commerce Events contracts.
- Introduction of production analytics pixels or SDKs before approved wiring.
- Any checkout, payment, or direct e-commerce functionality.
- Premium motion, advanced animations, or design system overhauls in this phase.
- AI features or CMS.
- Scope expansion into Phase 5D or later without new authorization.

---

## 19. Risks

- Scope creep into full template implementation during planning.
- Over-engineering the template before seeing real usage data from Phase 5H pilots.
- Inconsistent experience if PLP template diverges too far from homepage visual language (even if frozen).
- Performance regression if rich content (images, reviews) is not optimized.
- Attribution gaps if Commerce Context is not properly passed from PLP entry points.
- Content maintenance burden if rich PLP content is not governed.

---

## 20. Implementation Sequence (Recommended for Phase 5C)

1. Define reusable component contracts (data interfaces from Product + Context).
2. Build Hero + LINE CTA block first (highest conversion impact).
3. Build Benefits, Ingredients, How to Use sections.
4. Build Certifications, Reviews, FAQ.
5. Add Related Products and final CTA block.
6. Add Structured Data (JSON-LD).
7. Integrate Commerce Context reading and enrichment.
8. Performance, accessibility, and mobile QA.
9. Documentation and handoff to implementation.

---

## 21. Acceptance Criteria

- Template is fully documented with required sections in recommended order.
- All sections clearly map to Product Authority fields or rich content layer.
- Commerce Context integration points are explicitly defined.
- SEO / AI SEO / Performance / Accessibility strategies are specified.
- Reusable component strategy is defined.
- Scope is strictly limited to PLP template architecture (no homepage or other pages).
- Ready for independent audit and subsequent implementation phases.

---

## 22. Final Recommendation

Approve this Phase 5C Product Landing Blueprint as the governing document for all Product Landing Page work.

Proceed to Scope Lock for Phase 5C (if not already covered), then controlled implementation starting with component contracts and Hero block.

This will deliver high-impact Mini Landing Pages that significantly improve education, trust, SEO/AI SEO, and LINE conversion without touching the frozen homepage.

---

**End of PHASE5C-PRODUCT-LANDING-BLUEPRINT.md**

This document is the authoritative architecture reference for Phase 5C only. All future implementation must trace back to the sections above and the governing ADRs.