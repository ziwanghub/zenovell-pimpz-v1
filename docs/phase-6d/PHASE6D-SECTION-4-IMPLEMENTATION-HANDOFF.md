# PHASE 6D — SECTION 4 IMPLEMENTATION HANDOFF

## Purpose

This document is the concise implementation authority handoff for Grok CLI.

It does not replace the declaration, delta blueprint, or scope lock.
It summarizes only the implementation-relevant instructions.

---

## Authority Chain

Implementation must follow exactly:

1. `docs/PHASE6D-UI-UX-POLISH-OFFICIAL-DECLARATION.md`
2. `docs/phase-6d/PHASE6D-SECTION-4-PRODUCT-DISCOVERY-AND-DECISION-LAYER-DELTA-BLUEPRINT.md`
3. `docs/phase-6d/PHASE6D-SECTION-4-PRODUCT-DISCOVERY-AND-DECISION-LAYER-SCOPE-LOCK.md`
4. `DESIGN/Blueprint-Design-Engineering-Specification/src/imports/00-section-pages/section-4-Product-Catalog/section-4-Blueprint-Design.md`

If any ambiguity or conflict exists, stop and escalate.

---

## Mission

Implement Section 4 presentation-layer improvements so the section performs as a:

**Product Discovery & Decision Layer**

The section must help users:

- see products quickly
- compare quickly
- identify likely fit
- choose confidently
- act clearly

---

## Business Objective

- Improve product discovery clarity
- Improve comparison speed
- Improve selection confidence
- Preserve conversion readiness
- Preserve product links and product entities

---

## UX Objective

- Faster 3–5 second scan
- Lower cognitive load
- Clearer product fit signaling
- Stronger CTA hierarchy
- Better premium simplicity
- Better cross-breakpoint readability

---

## Allowed Scope

Allowed:

- section layout
- section spacing
- section typography
- section visual hierarchy
- section responsive behavior
- section accessibility treatment
- section-local motion / micro-interaction
- CTA presentation only
- trust strip presentation only
- content display hierarchy only

---

## Forbidden Scope

Forbidden:

- Commerce Foundation changes
- CTA behavior changes
- analytics changes
- analytics bridge changes
- Product Authority changes
- routing changes
- Commerce Context changes
- CTA Contract changes
- canonical CTA flow changes
- business logic changes
- changes to unrelated sections
- shared architecture redesign

---

## Files Allowed

Primary allowed file:

- `sections/section-4-product-catalog/section-4-product-catalog.tsx`

Conditionally allowed only if strictly necessary:

- `sections/section-4-product-catalog/index.ts`
- section-local supporting files under `sections/section-4-product-catalog/`

---

## Files Forbidden

Do not modify:

- `lib/commerce/**`
- `lib/analytics/**`
- `content/products.ts`
- `app/**`
- `components/layout/**`
- `components/platform/**`
- `sections/**` outside Section 4
- any governance authority file during implementation

---

## Architecture Freeze Reminder

Architecture Freeze is ACTIVE.

Do not touch:

- Commerce Foundation
- CTA Contract
- Commerce Context
- CTA Activation
- Analytics Bridge
- Product Authority
- Routing Architecture
- Canonical CTA Flow
- Business Logic

---

## Required Improvements

Implementation must improve:

- discovery speed
- comparison speed
- “who this product is for” clarity
- hierarchy between image, name, fit, price, and CTA
- reduction of decision fatigue
- premium visual simplicity
- mobile / tablet / desktop presentation quality
- accessibility comfort

---

## Explicit Do-Not-Assume Policy

Do not assume:

- permission to redesign UX beyond approved scope
- permission to reinterpret business goals
- permission to modify CTA behavior
- permission to modify routing
- permission to modify product authority
- permission to expand into other sections
- permission to create shared architecture changes

Only implement what is explicitly supported by authority documents.

---

## Stop-and-Escalate Rules

Stop implementation immediately if:

- a change appears to affect frozen architecture
- the blueprint or scope lock is ambiguous
- a required improvement cannot be achieved within allowed files
- a change seems to require product-authority updates
- a change seems to require CTA behavior changes
- a change seems to require routing or analytics changes

If stopped:

- report the ambiguity
- request SA clarification
- do not continue on assumption

---

## Validation Requirements

Mandatory:

- Build PASS
- Typecheck PASS
- Lint PASS
- Responsive PASS
- Accessibility PASS
- Architecture Freeze PASS
- ZZ Usability PASS
- Independent Audit PASS

Score thresholds:

- Minimum: **9.0**
- Target: **9.5+**

---

## Completion Checklist

- Section 4 implementation completed within allowed files only
- No forbidden files changed
- Product discovery improved
- Comparison clarity improved
- CTA hierarchy improved
- Responsive quality improved
- Accessibility improved or preserved
- Architecture Freeze preserved
- Validation complete
- Implementation report prepared

---

## Required Deliverables

At completion, implementation package should include:

- implementation diff
- validation results
- responsive notes
- accessibility notes
- implementation report
- handoff for independent audit

---

## Expected Report Format

Implementation report should include:

- WHAT_CHANGED
- FILES_MODIFIED
- HOW_SCOPE_LOCK_WAS_RESPECTED
- HOW_ARCHITECTURE_FREEZE_WAS_PRESERVED
- UX_IMPROVEMENTS_DELIVERED
- RESPONSIVE_IMPROVEMENTS_DELIVERED
- ACCESSIBILITY_IMPROVEMENTS_DELIVERED
- VALIDATION_RESULTS
- OPEN_ISSUES
- READY_FOR_TECHNICAL_VALIDATION

---

**Status**: Implementation Handoff Ready

**Decision**: READY FOR IMPLEMENTATION AGENT

**End of PHASE6D-SECTION-4-IMPLEMENTATION-HANDOFF.md**
