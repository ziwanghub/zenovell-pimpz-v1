# ADR-004: Review Component Authority

**Date:** 2026-07-18  
**Status:** ACCEPTED  
**Decision Makers:** SA / Release Integration (Phase B2.4)  
**Related:** ADR-001, ADR-003, Phase B2.4 Section 8 Implementation  

---

## Context

The Landing Page (Section 8) and Product Detail pages currently present customer reviews with different visual patterns:

| Surface | Location | Pattern notes |
|---|---|---|
| Landing social proof | `sections/section-8-reviews/` | Magenta chrome, score hero, distribution bars, product chips |
| Product Detail reviews | `components/platform/product-reviews.tsx` | Platform shell, yellow stars, author/date/rating metadata, horizontal cards |

Without an authority decision, future campaign pages and section freezes risk **design drift**, inconsistent trust language, and duplicated one-off review UIs.

---

## Decision

**Product Detail Review is the canonical Review Design Authority.**

Landing Page Section 8 is a **consumer** of that design language for conversion composition on the homepage, not a competing authority.

### Authority scope (visual / IA language)

- Rating summary hierarchy  
- Review card structure  
- Review metadata hierarchy (author → date/meta → rating)  
- Star rating treatment  
- Product identification treatment (when product context exists)  
- Disclaimer / note pattern  
- Typography and spacing language for review bodies  

### Consumers

- Landing Page Section 8  
- Product Detail pages (`/products/[slug]`)  
- Future campaign pages  
- Future review surfaces  

### Explicitly not in visual authority

- Page-level conversion CTA architecture (LINE surfaces remain page-owned)  
- Analytics event schema (`line_cta_click` contract)  
- LINE OA destination authority (`LINE_OA_URL`)  
- Review **data** provenance (must remain evidence-based content authority)

---

## Rules

1. **One review design language** across the product.  
2. **Page-specific composition is allowed** (e.g. homepage may keep distribution bars and solid final LINE CTA).  
3. **Review data must remain evidence-based** — no invented social proof, badges, ratings, or purchase claims.  
4. **Analytics contracts remain independent** from visual composition.  
5. **Shared components require explicit reuse justification** and regression review against frozen sections / product pages. Prefer local composition until a shared package is proven safe.  

---

## Alternatives considered

| Option | Why rejected |
|---|---|
| Landing Section 8 as authority | Homepage is conversion-specific; Product Detail is the stable commerce truth surface for SKU-level proof |
| Immediate forced shared component extraction | High regression risk across frozen mobile sections; premature without multi-consumer proof |
| Keep dual unaligned systems | Increases drift and SA review cost |

---

## Consequences

**Good**

- More consistent UX between Landing and Product pages  
- Lower long-term design drift  
- Clear SA rule for future review work  

**Trade-offs**

- Homepage may retain conversion-only elements (distribution, dual CTAs) while adopting authority language for cards/metadata/stars  
- Full component unification is deferred until justified  

---

## Implementation note (B2.4)

Phase B2.4 Section 8 limited implementation aligns **local** Landing Section 8 card/summary language toward Product Detail Review **without** extracting a global shared review package and without modifying Product Detail source.

---

## Owner

Primary: System Architect / SA  
Reviewers: Release Integration, Mobile UX  

## Review Date

Re-evaluate when a third consumer needs the same review UI or when a shared `ReviewCard` package is proposed.
