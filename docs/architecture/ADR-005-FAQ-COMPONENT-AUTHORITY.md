# ADR-005: FAQ Component Authority

**Date:** 2026-07-18  
**Status:** ACCEPTED  
**Decision Makers:** SA / Release Integration (Phase B2.5)  
**Related:** ADR-001, ADR-003, ADR-004, Phase B2.5 Section 9 Implementation  

---

## Context

Landing Page Section 9 and Product Detail FAQ previously used different accordion languages:

| Surface | Path | Pattern notes |
|---|---|---|
| Landing FAQ | `sections/section-9-faq/` | Brand Q badge, Plus/Minus, large shield column, conversion CTAs |
| Product FAQ | `components/platform/product-faq.tsx` | Chevron disclosure, animated panel, compact answer typography |

Without a design authority, FAQ UI drifts across homepage, product pages, and future campaign surfaces.

---

## Decision

**Product Detail FAQ is the canonical FAQ Design Authority** for accordion language and disclosure behavior.

Landing Section 9 is a **consumer** that may retain page-specific conversion composition (eight-question funnel, support CTA, final LINE CTA).

---

## Authority scope

- Accordion language (trigger + chevron disclosure)  
- Disclosure animation / open-panel behavior  
- Spacing rhythm  
- Answer layout and typography  
- FAQ header micro-label treatment (when applicable)  

### Explicitly not in visual authority

- Question **content** and ordering for landing funnel  
- LINE conversion CTA architecture (page-owned surfaces)  
- Analytics event **schema**  
- LINE OA destination authority  

---

## Consumers

- Landing Page Section 9  
- Product Detail FAQ  
- Future FAQ surfaces / campaign pages  

---

## Rules

1. **One FAQ design language** for disclosure and answer presentation.  
2. **Page-specific composition is allowed** (e.g. homepage conversion CTAs, broader question set).  
3. **No invented FAQ content** — answers remain evidence-based.  
4. **Prefer local alignment** until a shared FAQ package is justified with regression review.  
5. **Analytics contracts stay independent** from visual composition.  

---

## Consequences

**Good**

- Consistent accordion UX across product and landing  
- Clear SA rule for future FAQ work  
- Lower long-term drift  

**Trade-offs**

- Landing may keep conversion-only chrome while adopting authority disclosure language  
- Full shared component extraction is deferred  

---

## Implementation note (B2.5)

Phase B2.5 aligns Landing Section 9 accordion/disclosure/answer density toward Product FAQ **locally**, without modifying Product Detail source and without extracting a global shared FAQ package.

---

## Owner

Primary: System Architect / SA  
Reviewers: Release Integration, Mobile UX  

## Review Date

Re-evaluate when a third FAQ consumer appears or a shared `FaqAccordion` package is proposed.
