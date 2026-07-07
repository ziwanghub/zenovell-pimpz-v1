# WS-01 Shared UI Primitives Scope Lock

**Date**: 2026-07-06
**Workstream**: WS-01 Shared UI Primitives
**Phase**: M10 Foundation Hardening
**Status**: ACTIVE
**Governance**: Lightweight Z-MOS Style Governance
**Release Baseline**: v4.1.8-m10-p4e-runtime-performance
**Prerequisite**: WS-01 Primitive Inventory (docs/reports/m10-ui-primitives/WS01-PRIMITIVE-INVENTORY.md) + Independent Audit: PASS

## 1. Purpose

This scope lock document defines the exact boundaries for WS-01 Shared UI Primitives extraction.

It prevents overlap with:
- WS-02 Design Tokens
- WS-04 Performance Hardening (completed)
- WS-05 Analytics Foundation (completed)
- WS-07 Technical Debt Reduction

It protects the frozen M9/M10 baseline and all Sections 1–11 from visual drift or behavior changes during primitive extraction.

## 2. Current Authority

This document is subordinate to and references:
- M10 Foundation Hardening Blueprint
- WS-01 Primitive Inventory (WS01-PRIMITIVE-INVENTORY.md)
- M10-P4-PERFORMANCE-SCOPE-LOCK.md (for cross-workstream boundaries)
- All prior M10 scope locks and release reports

All implementation in WS-01 must respect these authorities.

## 3. WS-01 Allowed Scope (IN SCOPE)

Allowed in WS-01:
- Shared presentation primitives (visual-only components)
- Shared SVG wrappers (e.g. LineIcon)
- Shared badges (e.g. SectionBadge)
- Shared heading blocks and section intros (e.g. SectionHeader composite)
- Shared icon wrappers
- Shared layout wrappers (e.g. card shells, surface panels) **only where visual parity is 100% guaranteed** and no runtime or spacing changes

Extraction must be **pure ownership change**:
- Identical DOM output
- Identical spacing, typography, colors, shadows
- Identical runtime behavior
- No new props that alter visuals unless explicitly authorized

## 4. WS-01 Forbidden Scope (OUT OF SCOPE)

Explicitly forbidden in WS-01:
- Hero redesign or any Hero-specific styling changes
- MobileShell modifications
- GlobalHeader behavior or structure changes
- Any analytics, tracking, or runtime logic changes
- Design token normalization (WS-02)
- Technical debt cleanup unrelated to primitives (WS-07)
- CTA redesign (visual or behavior)
- Frozen section visual changes (Sections 1–11)
- Any change that introduces visual drift, layout shift, or behavior differences
- Brand glow / shadow / gradient redesign
- Any implementation outside the authorized Phase 1 primitives

## 5. Phase Lock

**Only Phase 1 is authorized at this time.**

### Phase 1 (Authorized)
- LineIcon
- SectionBadge
- SectionHeader (Composite: heading + description)
- IconWrapper

### Deferred (Everything Else)
All other primitives from the inventory are DEFERRED until:
- Phase 1 is fully implemented, audited, released, and regressed across frozen sections
- Subsequent phases are explicitly authorized by new scope decisions or updated locks

Deferred primitives include (but are not limited to):
- CTA Button Shell (all variants)
- Trust Card / Trust Row
- Card Shell / Surface Panel / Glow Wrapper
- Any Hero-specific or product-specific variations
- Additional icon containers or badges with variations

## 6. Frozen Section Policy

**Sections 1–11 remain visually and behaviorally frozen.**

Primitive extraction **must preserve**:
- Identical DOM semantics and structure
- Identical spacing and layout
- Identical typography (size, weight, tracking, line-height)
- Identical colors and opacity
- Identical shadows, borders, radii, and glows
- Identical runtime behavior (no new state, effects, or event handling changes)
- Identical responsiveness at 375/390/414/430 px
- Identical accessibility attributes (aria-*, roles, etc.)

**Only the implementation location/ownership may change.**

Any extraction that cannot guarantee the above for a frozen section is automatically out of scope.

## 7. Rollback Strategy

If any extraction introduces visual drift, layout shift, behavior change, or regression:

1. Immediately revert the extraction commit(s) for the affected primitive.
2. Do not attempt re-extraction of that primitive until:
   - Root cause is identified and documented
   - Updated scope decision or new inventory audit is produced
   - Independent re-audit confirms zero impact on frozen sections
3. All frozen sections must be manually + automated visually regressed at all four target widths before any re-attempt.
4. Rollback must be completed within one working day of detection.

Rollback authority: Any team member may trigger rollback on detection. SA must approve re-extraction.

## 8. Extraction Rules (When Authorized)

When a phase is unlocked:
- Extract one primitive at a time.
- Update all call sites in a single atomic change set.
- Run full validation + visual regression at 375/390/414/430 px.
- Produce a release report for that primitive.
- Independent audit required before next primitive.

No batch extraction of multiple primitives in one release.

## 9. Validation

Every phase must run (and pass):
- npm run lint
- npm run typecheck
- npm run build
- npm run validate

Plus visual + behavior parity checks on all frozen sections.

## 10. Decision

**Phase 1 primitives (LineIcon, SectionBadge, SectionHeader, IconWrapper) are now authorized for extraction under the strict rules above.**

All other primitives remain DEFERRED.

This document is the active scope authority for WS-01 until superseded by SA.

## 11. Readiness

This scope lock is ready for Phase 1 implementation to begin after SA confirmation.

No extraction work may start until this document is referenced in the first extraction commit.
