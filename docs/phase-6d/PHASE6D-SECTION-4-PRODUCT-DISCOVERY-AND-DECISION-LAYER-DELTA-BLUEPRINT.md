# PHASE 6D — SECTION 4 PRODUCT DISCOVERY & DECISION LAYER DELTA BLUEPRINT

## 1. Document Metadata

- **Project**: ZENOVELL-PIMPZ-V4-Active
- **Phase**: Phase 6D — UI/UX Polish
- **Section**: Section 4
- **Official Phase 6D Name**: Product Discovery & Decision Layer
- **Status**: Draft — Ready for SA Review
- **Source Design Authority**: `DESIGN/Blueprint-Design-Engineering-Specification/src/imports/00-section-pages/section-4-Product-Catalog/section-4-Blueprint-Design.md`
- **Phase 6D Governance Authority**: `docs/PHASE6D-UI-UX-POLISH-OFFICIAL-DECLARATION.md`
- **Version**: v1.0
- **Prepared by**: Codex
- **Date**: 2026-07-08

---

## 2. Authority Model

This document does not replace the original Section 4 design blueprint.

- The original blueprint remains the **immutable design baseline**.
- This delta blueprint is the **Phase 6D strategic UX authority** for Section 4 improvements.
- The original blueprint continues to own:
  - visual baseline
  - asset map
  - content inventory
  - structural implementation reference
- This delta blueprint owns:
  - strategic reframe
  - decision-efficiency goals
  - hierarchy improvements
  - responsive experience goals
  - accessibility comfort goals
  - pass criteria for Phase 6D quality

Implementation must not begin from this document alone.

- **Next mandatory artifact after approval**: Section 4 Scope Lock
- **Implementation start condition**: Scope Lock approved
- **Final merge-back rule**: Any accepted Phase 6D improvements become durable design authority only after Section 4 passes audit and reaches Section Freeze.

---

## 3. Architecture Freeze Boundary

Architecture Freeze is active and non-negotiable.

### Forbidden Layers

The following must not be modified, redesigned, or behaviorally changed:

- Commerce Foundation
- CTA Contract
- Commerce Context
- CTA Activation
- Analytics Bridge
- Product Authority
- Routing Architecture
- Canonical CTA Flow
- Business Logic

### Allowed Presentation-Only Scope

Section 4 work may improve only:

- layout
- spacing
- typography
- visual hierarchy
- responsive behavior
- accessibility
- motion / micro-interaction
- CTA presentation only
- trust strip presentation only
- content display hierarchy only

---

## 4. Strategic Reframe

### Old Framing

Section 4 was originally defined as:

**Product Catalog**

### New Phase 6D Framing

Section 4 is now defined as:

**Product Discovery & Decision Layer**

### Why This Reframing Matters

The old framing is inventory-oriented.
The new framing is decision-oriented.

Section 4 must not merely show products. It must help users:

- discover what is available
- compare options quickly
- understand who each product is for
- choose confidently
- act without decision fatigue

The primary goal is no longer image replication.
The primary goal is:

- decision efficiency
- decision confidence
- premium simplicity
- conversion clarity

---

## 5. Section Mission

Section 4 exists to turn broad curiosity into structured product choice.

It is the first section where users are expected to:

- evaluate multiple product options in parallel
- narrow choice based on fit
- decide whether to view more detail or convert immediately

This section must reduce uncertainty, not increase it.

---

## 6. Business Purpose

### Primary Functions

- Product discovery
- Product comparison
- Product selection
- Decision support
- Conversion

### Secondary Functions

- Product education
- SEO support
- AI SEO support
- Ads landing relevance
- Trust reinforcement

---

## 7. User Intent Model

Section 4 must serve multiple user states without changing business logic.

### First-Time Visitor

Needs:

- immediate overview of available products
- fast understanding of differences
- low reading burden

### Returning Visitor

Needs:

- quick route back to the product they already recognize
- pricing confirmation
- low-friction CTA visibility

### High-Intent Visitor

Needs:

- fast confirmation
- clear CTA
- minimal distraction

### Low-Intent Visitor

Needs:

- clearer product-role framing
- more confidence in which option fits their need
- less dense comparison burden

---

## 8. Decision Model

Section 4 must reduce:

- cognitive load
- comparison friction
- decision fatigue

Section 4 must increase:

- discovery speed
- product understanding
- decision confidence
- purchase readiness

This means the visual system must help the user answer quickly:

- What products exist?
- What is different about each one?
- Which one is right for me?
- What should I do next?

Anything that does not support those answers should be reduced, merged, moved, or de-emphasized.

---

## 9. Business KPI / UX KPI

Phase 6D does not introduce analytics redesign. These are UX evaluation targets for review, usability testing, and audit.

### UX Goals

- Discovery speed improves
- Comparison speed improves
- Product understanding improves
- Decision confidence improves
- CTA clarity improves
- Reading effort is reduced
- Premium perception improves
- Accessibility comfort improves

### Observable Evaluation Signals

- User can understand section purpose within 3–5 seconds
- User can distinguish products without reading every line
- User can identify a likely-fit product quickly
- User can identify the next action immediately
- User does not report the section as crowded or confusing

---

## 10. Existing Blueprint Delta Matrix

| Old Blueprint Section | Current Status | Phase 6D Action | Reason | Risk Level |
|---|---|---|---|---|
| Section Overview | Valid baseline | KEEP | Section role remains mid-funnel | P3 |
| Visual Hierarchy | Partially valid | UPDATE | Must prioritize decision speed over full replication | P1 |
| Canvas / Container Spec | Partially valid | KEEP | Mobile baseline remains useful | P3 |
| Layer Hierarchy | Valid | KEEP | Structural visual layers remain useful | P3 |
| Component Tree | Valid | KEEP | Reusable card model still appropriate | P2 |
| Auto Layout / Grid Rules | Partially valid | UPDATE | 2-column density must be reevaluated for readability | P1 |
| Typography | Partially valid | UPDATE | Small supporting text blocks are not yet comfort-grade | P1 |
| Design Token Delta | Mostly valid | KEEP | Existing tokens remain serviceable | P3 |
| Asset Map | Valid | DO NOT TOUCH | Asset authority remains unchanged | P0 |
| Icon Map | Partially valid | REDUCE | Feature-icon density is currently too heavy | P2 |
| Content Map | Partially valid | UPDATE | Content should be reprioritized for decision support | P1 |
| Interaction States | Valid | DO NOT TOUCH | CTA behavior must remain unchanged | P0 |
| Motion Blueprint | Partially valid | UPDATE | Motion should support clarity, not ornament | P2 |
| Responsive Rules | Partially valid | UPDATE | Tablet/desktop can no longer rely on passive mobile-shell assumption | P1 |
| Accessibility / SEO | Valid baseline | KEEP | Strong baseline; must be expanded to comfort/readability | P1 |
| Next.js Handoff | Valid | DO NOT TOUCH | Runtime structure is not being redesigned | P0 |
| Acceptance Criteria | Insufficient for Phase 6D | UPDATE | Must align to 9.0+ section gate and Phase 6D declaration | P1 |
| QA Checklist | Insufficient for Phase 6D | UPDATE | Needs strategic UX and freeze-validation checks | P1 |
| Risks / Open Questions | Partially valid | UPDATE | Must include density, fatigue, and responsive quality risks | P2 |

---

## 11. Information Priority Model

### P0 Must Show

These must remain immediately visible:

- product image
- product name
- product fit or intended use
- strongest differentiator
- price
- CTA

### P1 Should Show

- product subtitle if it improves fit clarity
- product type / form signal
- one to three highly scannable comparison cues
- detail-page path

### P2 Optional

- old price
- badge emphasis
- trust reinforcement below the catalog
- supporting footer note

### P3 De-emphasize / Hide / Remove

- low-value repeated reassurance
- feature language that requires too much reading
- decorative emphasis that competes with choice
- any content that slows scan speed without improving confidence

### Application Targets

- **Product Cards**: prioritize fit, difference, price, action
- **Trust Strip**: keep only if it adds net confidence without density penalty
- **Final CTA**: keep only as a clearly distinct section-level action
- **Footer Note**: de-emphasize unless it adds clear trust or brand value

---

## 12. Product Card Hierarchy

The intended card hierarchy in Phase 6D is:

1. Image
2. Product Name
3. Who / What it is for
4. Core Differentiator
5. Price
6. CTA

### Visually Secondary

The following should be visually subordinate:

- old price
- optional badge
- supporting micro-copy
- secondary feature details

The card must help the user compare at a glance before reading deeply.

---

## 13. Product Positioning Model

This is presentation-level positioning only.
It must not change Product Authority.

### Presentation Roles

- **Hero Recommendation**: already owned by Section 3, not Section 4
- **Recommended**: products that deserve first-scan confidence
- **Alternative**: products that provide a meaningful different fit
- **Specialized**: products that serve narrower or more specific needs

Section 4 should present product roles in a way that reduces uncertainty, while leaving the underlying product data untouched.

---

## 14. Comparison Strategy

Users should be able to compare products quickly using:

- key differentiator
- who it is for
- price
- form / product type
- action path

Comparison should not depend on reading long subtitles or dense feature blocks.

The section should guide a fast answer to:

- Which product category fits me?
- Which option is more premium / more practical / more specialized?
- Should I open detail or act now?

---

## 15. CTA Hierarchy

CTA behavior must not change.
Only CTA presentation and role clarity may change.

### Per-Card CTA Role

- immediate product-specific action
- strongest conversion path for users already ready to choose

### Product Detail Link Role

- deeper information path
- lower-friction route for users who need confirmation before action

### Bottom Section CTA Role

- section-level fallback for users who want help choosing or want a generalized LINE entry point

The bottom CTA must not visually compete with every product card CTA unless its role is clearly differentiated.

---

## 16. Trust / Reassurance Strategy

Section 4 currently includes:

- trust strip below catalog
- bottom CTA
- footer note

Phase 6D must evaluate these based on decision value, not historical presence.

### Trust Strip

- Keep only if it helps conversion confidence without repeating too much earlier reassurance
- If retained, reduce visual heaviness

### Repeated Reassurance

- Repeated reassurance must be controlled
- Trust content should support the section, not dilute its core purpose

### Final CTA Support Copy

- Must reinforce confidence and next action
- Must not create another dense content block

---

## 17. Responsive Experience Goals

### Mobile

- fast scan
- lower density
- comfortable tap targets
- readable text without strain

### Tablet

- must not feel like an accidental mobile screenshot
- should use spacing, rhythm, and layout confidence better

### Desktop

- should feel intentionally composed
- must not depend on passive centered-mobile-shell assumptions unless explicitly accepted in Scope Lock

Responsive goals may improve visual composition, but must remain within presentation-layer scope.

---

## 18. Accessibility Requirements

Section 4 Phase 6D work must satisfy:

- readable text size
- adequate contrast
- touch-friendly CTA targets
- semantic list structure
- meaningful alt text
- meaningful aria-labels
- visible keyboard focus
- reduced-motion respect

Accessibility in Phase 6D means not only semantic correctness, but comfort and usability.

---

## 19. SEO / AI SEO / Ads Principles

Section 4 should support:

- internal linking to product detail pages
- clear product entity naming
- clear product role differentiation
- discoverability of multiple product options
- ad-landing clarity for users arriving with purchase intent

### SEO

- preserve product names in DOM text
- preserve internal links
- preserve readable product differentiation

### AI SEO

- make product roles easier to infer from visible hierarchy
- help machines and users understand entity differences more clearly

### Ads Landing Quality

- improve speed of relevance matching
- help users feel “I found the right place” quickly

---

## 20. Future Compatibility

Section 4 improvements should remain compatible with future:

- Business Knowledge Layer
- AI Agent guidance
- CRM-driven personalization
- Multi-brand platform growth
- 100+ product scenarios

This document does not implement any future capability.
It only requires that Section 4 presentation should not lock the project into a visually non-scalable model.

---

## 21. Allowed Scope

Allowed in Section 4 Phase 6D work:

- layout
- typography
- spacing
- visual hierarchy
- responsive behavior
- accessibility
- animation / micro-interaction
- CTA presentation only
- trust strip presentation only
- content display hierarchy only

---

## 22. Forbidden Scope

Forbidden in Section 4 Phase 6D work:

- Commerce Foundation changes
- `activateLineCta()` behavior changes
- analytics bridge changes
- Product Authority changes
- routing changes
- business logic changes
- new backend work
- SEO infrastructure redesign
- Knowledge Layer implementation

---

## 23. Risks

### P0

- Any change that alters CTA behavior, routing behavior, product authority, or canonical commerce flow

### P1

- Retaining current 2-column density without hierarchy improvements
- Failing to improve comparison speed
- Failing to clarify “who this product is for”
- Leaving tablet/desktop composition unresolved
- Preserving too-small supporting text

### P2

- Keeping bottom trust strip too heavy
- Keeping feature-icon density too visually busy
- Preserving repetitive support language
- Maintaining weak differentiation between card CTA and final CTA

### P3

- Over-retaining decorative emphasis
- Leaving footer note too visually strong
- Minor spacing, rhythm, or badge refinements

---

## 24. Section Pass Criteria

Section 4 passes only when all of the following are true:

- target score is **9.5+**
- minimum pass score is **9.0**
- ZZ usability test passes
- Independent Audit passes
- build passes
- typecheck passes
- lint passes
- responsive check passes
- accessibility check passes
- Architecture Freeze remains intact

In addition, the section must demonstrate:

- faster discovery
- easier comparison
- stronger selection confidence
- clearer CTA hierarchy
- lower cognitive load
- more premium visual simplicity

---

## 25. Blueprint Validation Checklist

Before Scope Lock, confirm:

- original design baseline reviewed
- delta actions explicit
- allowed scope explicit
- forbidden scope explicit
- product hierarchy defined
- CTA hierarchy defined
- trust strategy defined
- responsive goals defined
- accessibility requirements defined
- risks accepted
- no Architecture Freeze violation

---

## 26. Next Step

After this delta blueprint is approved:

- create Section 4 Scope Lock
- do not begin implementation before Scope Lock approval

---

**Status**: Delta Blueprint Draft Complete

**Decision**: READY FOR SCOPE LOCK REVIEW

**End of PHASE6D-SECTION-4-PRODUCT-DISCOVERY-AND-DECISION-LAYER-DELTA-BLUEPRINT.md**
