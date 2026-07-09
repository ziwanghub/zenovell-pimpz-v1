# PHASE 6D — SECTION 4 PRODUCT DISCOVERY & DECISION LAYER SCOPE LOCK

## Document Metadata

- **Project**: ZENOVELL-PIMPZ-V4-Active
- **Phase**: Phase 6D — UI/UX Polish
- **Batch**: 1
- **Target Section**: Section 4
- **Official Name**: Product Discovery & Decision Layer
- **Status**: LOCKED
- **Version**: v1.0
- **Date**: 2026-07-08
- **Purpose**: Final implementation authority for Section 4 Phase 6D work

---

## Authority Chain

This Scope Lock is governed by the following authority chain, in descending order:

1. `docs/PHASE6D-UI-UX-POLISH-OFFICIAL-DECLARATION.md`
2. `docs/phase-6d/PHASE6D-SECTION-4-PRODUCT-DISCOVERY-AND-DECISION-LAYER-DELTA-BLUEPRINT.md`
3. `DESIGN/Blueprint-Design-Engineering-Specification/src/imports/00-section-pages/section-4-Product-Catalog/section-4-Blueprint-Design.md`
4. Current implementation baseline:
   - `sections/section-4-product-catalog/section-4-product-catalog.tsx`

If any lower authority conflicts with a higher authority, the higher authority wins.

---

## Implementation Objective

Implement Section 4 Phase 6D improvements strictly within presentation-layer scope so that Section 4 performs as a Product Discovery & Decision Layer while preserving Architecture Freeze and all existing runtime behavior.

---

## Strategic Mission

Section 4 must help users:

- discover products quickly
- compare products quickly
- identify a likely-fit product
- choose confidently
- take the next action with low friction

Section 4 must reduce decision fatigue, not increase it.

---

## Business Objectives

- Improve product discovery clarity
- Improve product comparison speed
- Improve product selection confidence
- Improve decision support
- Preserve conversion readiness
- Preserve SEO-visible product entities and internal product links
- Improve paid-traffic landing clarity without changing business logic

---

## UX Objectives

- Faster scan within 3–5 seconds
- Lower cognitive load
- Clearer “who this product is for” signaling
- Stronger CTA hierarchy
- Better premium simplicity
- Better readability and comfort across breakpoints

---

## Presentation Objectives

- Improve layout
- Improve spacing
- Improve typography
- Improve visual hierarchy
- Improve responsive composition
- Improve accessibility comfort
- Improve micro-interaction quality where useful
- Improve CTA presentation only
- Improve trust-strip presentation only

---

## Allowed Scope

Section 4 implementation may change only presentation-layer concerns inside the Section 4 surface:

- section layout
- section spacing
- section typography
- section hierarchy
- section responsive behavior
- section accessibility treatment
- section-local motion / micro-interaction
- CTA presentation only
- trust-strip presentation only
- content display hierarchy only

No behavioral or architectural redesign is permitted.

---

## Forbidden Scope

The following are explicitly forbidden:

- Commerce Foundation changes
- CTA behavior changes
- Analytics behavior changes
- Analytics Bridge changes
- Product Authority changes
- Commerce Context changes
- CTA Contract changes
- routing changes
- canonical CTA flow changes
- business logic changes
- backend work
- SEO infrastructure redesign
- Knowledge Layer implementation
- changes to unrelated sections
- design-system-wide architecture changes outside explicit Section 4 presentation needs

---

## Architecture Freeze Protection

Architecture Freeze is active.

The following layers are frozen and protected:

- Commerce Foundation
- CTA Contract
- Commerce Context
- CTA Activation
- Analytics Bridge
- Product Authority
- Routing Architecture
- Canonical CTA Flow
- Business Logic

Any change that directly or indirectly modifies these layers is out of scope and prohibited.

---

## Files Allowed To Modify

Only the minimum files required to implement Section 4 presentation updates may be modified.

### Primary Allowed File

- `sections/section-4-product-catalog/section-4-product-catalog.tsx`

### Conditionally Allowed Files

Only if strictly necessary for Section 4 presentation-only implementation:

- `sections/section-4-product-catalog/index.ts`
- section-local supporting files created under:
  - `sections/section-4-product-catalog/`

### Notes

- New section-local helper or presentational component files are allowed only if they remain local to Section 4 and do not change shared architecture.
- If Section 4 work can be completed in the existing main section file, prefer that path.

---

## Files Forbidden To Modify

The following must not be modified:

### Commerce / CTA / Analytics / Routing / Product Authority

- `lib/commerce/**`
- `lib/analytics/**`
- `content/products.ts`
- `content/**` if used to redefine business/product authority
- `app/**`

### Shared Architecture / Shared Business Logic

- `components/platform/**`
- `components/layout/**`
- `lib/**` shared runtime modules
- `sections/**` outside Section 4

### Other Sections

- `sections/hero/**`
- `sections/section-2-trust-bar/**`
- `sections/section-3-hero-product/**`
- `sections/section-5-why-choose-us/**`
- `sections/section-6-how-to-order/**`
- `sections/section-7-privacy-shipping/**`
- `sections/section-8-reviews/**`
- `sections/section-9-faq/**`
- `sections/section-10-final-cta/**`
- `sections/section-11-footer/**`

### Governance / Phase Artifacts

- No governance authority document may be changed during implementation unless separately authorized

---

## Component Scope

Allowed component work:

- Section 4 local card presentation
- Section 4 local image framing
- Section 4 local text hierarchy
- Section 4 local CTA presentation
- Section 4 local trust strip presentation
- Section 4 local footer-note treatment

Forbidden component work:

- Shared CTA behavior components
- Shared header/footer architecture
- Shared commerce components
- Shared platform components

---

## Design Scope

Allowed design changes:

- card density reduction
- hierarchy refinement
- typography refinement
- spacing refinement
- visual emphasis rebalancing
- product comparison clarity improvements
- premium simplification

Forbidden design changes:

- redesign of overall landing architecture
- new business messaging outside approved authority
- new product claims
- product reordering that changes business authority intent without approval

---

## Responsive Scope

Implementation must improve presentation quality for:

- mobile
- tablet
- desktop

Responsive work is allowed only as presentation treatment.

Responsive work must not:

- change routing
- change CTA behavior
- change content authority
- introduce logic branching that alters business behavior

---

## Accessibility Scope

Implementation must improve or preserve:

- readable text size
- adequate contrast
- clear focus-visible states
- touch-friendly targets
- semantic structure
- alt text preservation
- aria-label preservation
- reduced-motion support where motion is used

Accessibility degradation is not permitted.

---

## SEO / AI SEO Scope

Allowed:

- preserve or improve visible product clarity
- preserve internal links
- preserve readable product entity naming
- improve display hierarchy that helps users and machines infer product role

Forbidden:

- SEO infrastructure redesign
- metadata architecture changes
- schema/system changes outside the section presentation layer

---

## Motion Scope

Allowed:

- subtle presentation-layer motion
- hover/press polish
- reveal polish if lightweight and non-disruptive

Required:

- respect `prefers-reduced-motion`

Forbidden:

- motion that changes meaning of CTA behavior
- motion that reduces readability or accessibility

---

## Implementation Constraints

### IMPLEMENTATION AUTHORITY POLICY

Grok CLI is an Implementation Agent only.

Implementation shall follow exactly:

- Original Blueprint
- Phase 6D Delta Blueprint
- Approved Scope Lock

Grok CLI SHALL NOT:

- redesign UX
- redefine business objectives
- reinterpret Blueprint
- expand project scope
- modify architecture
- modify CTA behavior
- modify analytics
- modify routing
- modify product authority

If ambiguity exists:

- STOP IMPLEMENTATION
- Report ambiguity
- Request SA clarification

No implementation based on assumptions.

---

## Out Of Scope

The following are explicitly out of scope for Section 4 Batch 1:

- Batch 0 design-system foundation work
- any other section work
- any commerce improvement
- any analytics improvement
- any routing improvement
- any product-authority improvement
- any SEO infrastructure work
- any production-readiness work
- any backend or CRM work

---

## Acceptance Criteria

Section 4 implementation is acceptable only when it demonstrates:

- stronger product discovery
- faster comparison
- clearer “who this product is for”
- clearer hierarchy between image, name, fit, price, and CTA
- lower cognitive load
- reduced decision fatigue
- better premium simplicity
- preserved CTA behavior
- preserved product links
- preserved product authority
- preserved architecture freeze

---

## Technical Validation Requirements

Mandatory validation:

- Build PASS
- Typecheck PASS
- Lint PASS
- Responsive PASS
- Accessibility PASS
- Architecture Freeze PASS

No implementation is considered complete without all required passes.

---

## ZZ Usability Validation

Mandatory usability validation:

- ZZ usability validation completed
- Section purpose understandable within 3–5 seconds
- product comparison feels easier
- primary action visually obvious
- section feels more premium and less crowded

If ZZ usability fails, the section does not pass.

---

## Independent Audit Requirements

Independent audit must verify:

- implementation stayed within allowed files
- forbidden files remained untouched
- no architecture freeze violation occurred
- CTA behavior unchanged
- routing unchanged
- product authority unchanged
- business logic unchanged
- presentation improvements align to approved delta blueprint
- score threshold satisfied

---

## Section Pass Criteria

Section 4 passes only when all conditions are satisfied:

- Build PASS
- Typecheck PASS
- Lint PASS
- Responsive PASS
- Accessibility PASS
- Architecture Freeze PASS
- ZZ Usability PASS
- Independent Audit PASS
- Minimum score: **9.0**
- Target score: **9.5+**

The section must also demonstrate:

- stronger discovery speed
- stronger comparison speed
- improved decision confidence
- improved CTA clarity
- lower reading effort
- stronger premium feel

---

## Section Freeze Conditions

Once Section 4 passes:

- Section 4 is frozen
- no further modifications are allowed
- reopening requires explicit SA approval

No follow-up polish cycle is permitted outside the defined workflow.

---

**Status**: Scope Lock Complete

**Decision**: READY FOR IMPLEMENTATION AUTHORITY

**End of PHASE6D-SECTION-4-PRODUCT-DISCOVERY-AND-DECISION-LAYER-SCOPE-LOCK.md**
