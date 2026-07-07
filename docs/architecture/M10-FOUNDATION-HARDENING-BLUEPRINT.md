# M10 Foundation Hardening Blueprint

Date: `2026-07-06`
Phase: `M10 Foundation Hardening`
Status: `Architecture Blueprint`
Governance: `Lightweight Z-MOS Style Governance`
Release Baseline: `v4.1.0-m9.5-platform-foundation`

## 1. Executive Summary

`M10` exists to harden the platform foundation established in `M9.5` before broader functional completion and future product expansion. `M9.5` solved ownership, runtime placement, navigation/header contracts, drawer foundation, and legacy cleanup. `M10` exists because the platform is now structurally stable enough to improve shared consistency, accessibility, observability, runtime discipline, and implementation quality without reopening the frozen section design baselines.

The purpose of `M10` is not to redesign Sections `1–11`, add new product features, or expand scope into desktop navigation. Its purpose is to reduce future delivery risk by strengthening the shared foundation that now sits under the frozen mobile-first baseline.

## 2. Current Architecture Snapshot

### GlobalHeader

- Shared runtime component lives outside Hero ownership.
- Mounted above Section 1 inside `MobileShell`.
- Uses `site-header.ts` and `site-navigation.ts` through `global-header-mapper.ts`.
- Supports a portal-based mobile drawer.

### Drawer

- Portal-based fixed overlay.
- Supports open/close state, backdrop close, `Escape` close, focus return, and body scroll lock.
- Mobile-first only.
- No animation polish or desktop behavior is part of the current foundation.

### MobileShell

- Remains unchanged since the platform foundation freeze.
- Provides mobile-width containment and `overflow-hidden`.
- Is intentionally protected from M10 structural mutation unless a future SA decision reopens it.

### Hero

- Section 1 now renders Hero body only.
- Header ownership has been removed from Hero runtime.
- Hero content authority remains in `content/hero.ts`.

### Footer

- Section-local runtime and section-local content authority remain intact.
- Footer navigation has not yet been migrated to shared navigation consumption.
- Footer remains frozen visually and structurally.

### Navigation Authority

- `content/site-navigation.ts` owns:
  - navigation groups
  - CTA destinations
  - contacts
  - social links
  - analytics/link taxonomy

### Header Authority

- `content/site-header.ts` owns:
  - brand contract
  - header CTA reference
  - menu trigger metadata
  - header visibility behavior
  - extraction status metadata

## 3. Technical Debt Inventory

### P0

- Accessibility verification remains concentrated in header/drawer paths and has not yet been systematized across all shared interactive patterns.
- Analytics contracts exist conceptually, but runtime event instrumentation is not yet implemented.
- Runtime consistency remains dependent on section-local patterns that may drift without shared primitive authority.

### P1

- Duplicated visual primitives exist across frozen sections:
  - LINE CTA visual treatments
  - section intro badge/heading/description patterns
  - trust-row and trust-card variants
  - repeated rounded card surfaces
- Icon usage is duplicated in section-local files rather than normalized through shared primitives or shared icon wrappers.
- Glow and shadow treatments are repeated inline and may drift in opacity, blur, and emphasis.
- Utility-level styling duplication exists in button shells, card borders, focus rings, and small visual accents.
- Performance risk remains around repeated inline styling, repeated icon declarations, and image-heavy sections without a consolidated audit layer.

### P2

- Historical architecture docs and release reports now contain phased migration references that are accurate but not yet normalized into a simplified steady-state engineering reference.
- Some shared contracts still carry transition-oriented metadata that may later be simplified after further hardening.

## 4. Workstreams

### WS-01 Shared UI Primitives

- Purpose:
  - reduce repeated shared UI implementations that now sit underneath multiple frozen sections
- Scope:
  - identify and blueprint safe shared primitives for repeated non-visual-identity structures
  - normalize extraction candidates such as CTA wrappers, section intro primitives, and shared icon/button shells
- Out of scope:
  - redesigning section visuals
  - forced rewrites of frozen section internals in one pass
- Dependencies:
  - current frozen registry
  - M9.5 stable header foundation
- Risk:
  - accidental visual drift if primitive extraction is done before parity rules are explicit
- Acceptance Criteria:
  - shared primitive candidates are clearly classified
  - extraction sequence does not require reopening frozen baselines unnecessarily

### WS-02 Design Tokens

- Purpose:
  - reduce style drift by strengthening token-level consistency without redesigning sections
- Scope:
  - spacing, radius, border, opacity, glow/shadow, and focus treatment normalization
- Out of scope:
  - new branding
  - visual redesign
- Dependencies:
  - inventory of repeated style fragments
- Risk:
  - token centralization can unintentionally alter frozen sections if rollout is too broad
- Acceptance Criteria:
  - token deltas are documented and mapped before implementation
  - frozen section parity is preserved

### WS-03 Accessibility Hardening

- Purpose:
  - make accessibility behavior consistent and auditable across shared and section-local interaction surfaces
- Scope:
  - landmark review
  - heading hierarchy audit
  - focus management review
  - aria consistency audit
  - keyboard behavior review
- Out of scope:
  - visual redesign
  - content rewrite for marketing purposes
- Dependencies:
  - current interaction inventory
  - GlobalHeader/drawer foundation
- Risk:
  - small semantics changes can ripple into frozen sections if not isolated carefully
- Acceptance Criteria:
  - critical shared interaction paths are accessible and documented
  - known accessibility gaps are classified and closed or explicitly deferred

### WS-04 Performance Hardening

- Purpose:
  - reduce runtime risk before broader functional expansion
- Scope:
  - LCP and image loading audit
  - scroll and shadow behavior audit
  - bundle and shared dependency review
  - CSS/runtime duplication review
- Out of scope:
  - design changes
  - speculative optimization without measured value
- Dependencies:
  - current release baseline
- Risk:
  - premature micro-optimization may increase complexity without measurable gain
- Acceptance Criteria:
  - major measurable performance risks are identified and prioritized
  - no regression to current validated runtime

### WS-05 Analytics Foundation

- Purpose:
  - establish a consistent analytics layer before functional completion
- Scope:
  - event contract hardening
  - mapping event keys to interaction surfaces
  - blueprint for page, menu, CTA, FAQ, product, contact, and footer events
- Out of scope:
  - full production analytics vendor integration
  - ad-tech expansion
- Dependencies:
  - `site-navigation.ts` taxonomy
  - interaction inventory
- Risk:
  - analytics can create noisy or duplicate instrumentation if not centrally designed
- Acceptance Criteria:
  - event model is unified
  - instrumentation entry points are explicit and non-duplicative

### WS-06 Runtime Consistency

- Purpose:
  - ensure shared platform behavior stays stable across the whole page
- Scope:
  - scroll-lock consistency
  - focus restoration consistency
  - portal layering consistency
  - link semantics consistency
  - state ownership consistency
- Out of scope:
  - new product flows
  - footer migration
- Dependencies:
  - existing platform foundation runtime
- Risk:
  - inconsistency across shared and section-local paths can accumulate hidden regressions
- Acceptance Criteria:
  - critical shared runtime behaviors are standardized and verified

### WS-07 Technical Debt Reduction

- Purpose:
  - reduce medium-priority code debt without destabilizing the frozen UX baseline
- Scope:
  - dead-code follow-up
  - inline utility duplication inventory
  - documentation normalization
  - leftover transition metadata review
- Out of scope:
  - large-scale refactor for its own sake
- Dependencies:
  - successful completion of higher-priority hardening workstreams
- Risk:
  - broad cleanup without boundaries can reopen stable areas unnecessarily
- Acceptance Criteria:
  - debt items are reduced with explicit before/after scope control

## 5. Implementation Order

Recommended sequence:

1. `WS-03 Accessibility Hardening`
2. `WS-06 Runtime Consistency`
3. `WS-05 Analytics Foundation`
4. `WS-04 Performance Hardening`
5. `WS-01 Shared UI Primitives`
6. `WS-02 Design Tokens`
7. `WS-07 Technical Debt Reduction`

Rationale:

- Accessibility and runtime consistency come first because they reduce operational risk without requiring design changes.
- Analytics comes before larger shared primitive work so event ownership is attached to the current stable runtime first.
- Performance should be hardened before broader primitive extraction to avoid optimizing the wrong abstraction layer.
- Shared primitive and token work should follow only after behavior, semantics, and instrumentation are clearer.
- Technical debt reduction should be last because it benefits from the steady-state decisions made in the earlier workstreams.

## 6. Validation Strategy

Every workstream must end with:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run validate`
- browser QA for all changed surfaces

Required browser QA baseline:

- `375px`
- `390px`
- `414px`
- `430px`

When a workstream touches shared runtime behavior, QA must also include:

- header
- drawer
- footer presence
- no horizontal overflow
- frozen section parity checks for affected surfaces

## 7. Regression Strategy

- Sections `1–11` remain frozen by default.
- M10 work must prefer shared infrastructure outside section ownership wherever possible.
- Any change that might visually alter a frozen section requires explicit parity evidence.
- Shared primitive extraction must be staged, not sweeping.
- M10 implementation should proceed workstream by workstream with isolated change sets and QA evidence for each.

## 8. Rollback Strategy

### WS-01 Shared UI Primitives

- rollback by reverting primitive adoption commits while leaving section-local implementations intact where needed

### WS-02 Design Tokens

- rollback by reverting token changes and restoring prior explicit values

### WS-03 Accessibility Hardening

- rollback by reverting semantics/focus patches if they create regressions while preserving existing validated runtime

### WS-04 Performance Hardening

- rollback by reverting the specific optimization commit or configuration delta

### WS-05 Analytics Foundation

- rollback by disabling instrumentation hooks while keeping event contracts documented

### WS-06 Runtime Consistency

- rollback by reverting shared runtime behavior patches without reopening frozen section structure

### WS-07 Technical Debt Reduction

- rollback by reverting cleanup changes in small batches rather than bundling them into broad refactors

## 9. Success Criteria

`M10` is done when:

- shared runtime behavior is consistent and audited
- critical accessibility gaps are closed or explicitly deferred with rationale
- analytics foundation is architecturally ready
- measurable performance risks are classified and reduced
- shared primitive and token strategy is stabilized without reopening frozen design baselines
- technical debt is reduced in a way that lowers future delivery risk

## 10. M10 Exit Criteria

The following must be true before entering `M10A Functional Completion`:

- M10 workstreams completed with validation PASS
- no unresolved P0 hardening issues remain
- no unstable shared runtime behavior remains in header/drawer/navigation paths
- analytics event model is ready for implementation rollout
- accessibility baseline is stable enough for broader functional work
- performance risks are understood and acceptable for the next phase
- frozen section protection remains intact
- rollback paths for shared infrastructure changes remain clear
