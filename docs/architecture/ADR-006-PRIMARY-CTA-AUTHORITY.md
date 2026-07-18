# ADR-006: Primary CTA Authority

**Date:** 2026-07-18  
**Status:** ACCEPTED  
**Decision Makers:** SA / Release Integration (Phase B2.6)  
**Related:** ADR-001, ADR-003, ADR-004, ADR-005, Phase B2.6 Section 10 Implementation  

---

## Context

The landing page uses multiple LINE CTA patterns:

| Family | Examples | Role |
|---|---|---|
| Hero / product / mid-section | `hero-line`, `product-grid-*`, section solid pills | Context-specific conversion |
| Support / secondary | FAQ support, reviews-more | Inquiry / soft handoff |
| **Primary conversion climax** | **Section 10 Final CTA** | Terminal high-intent action |

Without a primary-CTA authority, future high-intent surfaces risk inventing new button chrome, analytics surface names, or handoff paths.

---

## Decision

**Section 10 Final CTA is the canonical Primary Conversion CTA Authority.**

This authority applies only to **primary conversion / high-intent climax CTAs**, not to every LINE button on the page.

---

## Authority scope

- Primary conversion CTA visual treatment (full-width solid block, label + supporting line, LINE icon treatment)  
- Canonical orchestration: `activateLineCta` + `LINE_OA_URL`  
- Canonical analytics surface for terminal conversion: **`final-cta`**  
- Intent mapping: **`high_intent`** for primary conversion climax  
- Progressive enhancement: real `href` must be `LINE_OA_URL`  

### Explicitly out of scope

- Hero CTA  
- Product grid CTAs  
- Review secondary / final section pills  
- FAQ support / section CTAs  
- Footer LINE links  

Those remain **context-specific compositions** under the broader LINE-first contract (ADR-001 / ADR-003).

---

## Consumers

- Landing Section 10  
- Future high-intent climax surfaces (campaign landers, post-checkout prompts, etc.)  

---

## Rules

1. **Single Primary CTA language** for terminal high-intent conversion blocks.  
2. **Canonical orchestration only** — `activateLineCta` (no parallel handoff paths).  
3. **Canonical analytics contract** — `line_cta_click` with surface `final-cta` (or an explicitly approved primary-surface alias).  
4. **No duplicated primary CTA implementations** without SA justification.  
5. **Context CTAs may differ** in hierarchy (outline, support pill) without copying the Section 10 block.  
6. **Visible CTA wording is content-owned**; do not invent new conversion claims during polish.  

---

## Consequences

**Good**

- Clear terminal conversion pattern  
- Consistent analytics for climax actions  
- Safer progressive enhancement (`href` = OA URL)  

**Trade-offs**

- Mid-funnel CTAs intentionally remain varied  
- Shared component extraction is optional and requires regression review  

---

## Implementation note (B2.6)

Phase B2.6 wires Section 10 primary CTA to `LINE_OA_URL`, preserves surface `final-cta` / intent `high_intent`, and records this ADR. No shared component extraction was performed.

---

## Owner

Primary: System Architect / SA  
Reviewers: Release Integration, Conversion Engineering  

## Review Date

Re-evaluate when a second high-intent climax surface is introduced.
