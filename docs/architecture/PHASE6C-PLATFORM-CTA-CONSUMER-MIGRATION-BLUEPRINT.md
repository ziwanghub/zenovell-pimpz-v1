# PHASE 6C — PLATFORM CTA CONSUMER MIGRATION BLUEPRINT

**Date**: 2026-07-08  
**Phase**: Phase 6C — Platform CTA Consumer Migration (Batch 4)  
**Status**: Blueprint Ready for Independent Audit  
**Baseline**: Phase 6C Batch 1 CLOSED + Phase 6C Batch 2 CLOSED + Phase 6C Batch 3 CLOSED + PRE-WP00-PHASE6C-BATCH4-PLATFORM-CTA-CONSUMER-MIGRATION (APPROVED) + PRE-WP00A-PHASE6C-BATCH4-PLATFORM-CTA-CONSUMER-MIGRATION (APPROVED) + Phase 6A/6B Closed + Governance v2.1  
**Governing Documents**:
- WORKFLOW-v2.1.md (ACTIVE)
- DEVELOPMENT-LIFECYCLE.md (ACTIVE)
- docs/ROADMAP.md (LOCKED)
- PHASE6C-CTA-CONTRACT-STANDARDIZATION-BLUEPRINT.md (CLOSED)
- PHASE6C-CTA-CONTRACT-STANDARDIZATION-SCOPE-LOCK.md (LOCKED)
- PHASE6C-COMMERCE-CONTEXT-STANDARDIZATION-BLUEPRINT.md (CLOSED)
- PHASE6C-COMMERCE-CONTEXT-STANDARDIZATION-SCOPE-LOCK.md (LOCKED)
- PHASE6C-ANALYTICS-INTERFACE-ALIGNMENT-BLUEPRINT.md (CLOSED)
- PHASE6C-ANALYTICS-INTERFACE-ALIGNMENT-SCOPE-LOCK.md (LOCKED)
- docs/reports/phase6/PRE-WP00-PHASE6C-BATCH4-PLATFORM-CTA-CONSUMER-MIGRATION.md (APPROVED)
- docs/reports/phase6/PRE-WP00A-PHASE6C-BATCH4-PLATFORM-CTA-CONSUMER-MIGRATION.md (APPROVED)
- SA Decision (2026-07-08): Phase 6C is an Architecture Stabilization Phase. After Batch 1–3, the Commerce Foundation (CTA Contract, canonical merge, thin activation, and Analytics Bridge) is frozen. Batch 4 is strictly Consumer Migration.

**Objective**: Migrate all Platform CTA surfaces to become pure consumers of the already-approved, frozen Commerce Foundation by invoking only `activateLineCta(...)`. No redesign of Commerce, Context, Contract, Persistence, or Analytics is permitted.

---

## 1. Executive Summary

Phase 6C Batch 4 is **Platform CTA Consumer Migration**.

After Batches 1–3, the following are complete and frozen:

- CTA Contract (Batch 1)
- Canonical Commerce Context merge policy (Batch 2)
- Analytics Interface Alignment with dedicated Bridge (Batch 3)

The Platform layer (product-hero, information-cta, knowledge-cta) still contains duplicated orchestration logic that duplicates what is now centralized in the Commerce Foundation.

Batch 4 does **not** refactor or redesign the Commerce layer.  
It migrates the **consumers** (Platform CTAs) onto the canonical consumer interface: `activateLineCta()`.

This ensures a single, consistent orchestration path across Homepage and Platform:

Platform → activateLineCta() → Commerce Foundation (merge + contract + builders) → Analytics Bridge → LINE

All user-visible behavior, labels, payloads, persistence lifetime, and Commerce-originated analytics behaviour and emitted payloads must remain functionally equivalent for identical user actions.

---

## 2. Objectives

Batch 4 will:
- Migrate the three Platform CTA surfaces to invoke only `activateLineCta()`.
- Remove all local business logic (load, merge, save, open, clear, manual dispatch, manual payload creation) from Platform components.
- Ensure Platform components become pure consumers with page-specific input only.
- Guarantee that Homepage and Platform now share the identical canonical orchestration path.
- Preserve 100% of existing runtime behavior, labels, LINE messages, persistence sequence, and Commerce-originated analytics behaviour and emitted payloads (functionally equivalent for identical user actions).

Batch 4 will not:
- Modify any Commerce Foundation code.
- Change `activateLineCta`, `mergeCommerceContext`, `performLineHandoff`, CTA Contract, Context, or the Analytics Bridge.
- Introduce new features, UI changes, or routing.
- Touch Product Authority.

---

## 3. Existing Foundation

**Commerce Foundation (Frozen)**:
- `lib/commerce/cta-activation.ts` — Thin orchestration entry point (`activateLineCta`).
- `lib/commerce/context.ts` — `mergeCommerceContext()` (canonical policy from Batch 2).
- `lib/commerce/cta-contract.ts` — `createCtaPayload` / `createNonProductCtaPayload`.
- `lib/commerce/events.ts` + Bridge — Commerce events (including LINE_CLICK) are dispatched and bridged to analytics.
- `performLineHandoff` — Owns dispatch + save + open + clear.

**Platform Layer (Current State)**:
- `components/platform/product-hero.tsx`
- `components/platform/information-cta.tsx`
- `components/platform/knowledge-cta.tsx`

These still implement their own full orchestration:
- Load persisted context
- Manual context creation + old merge logic
- Direct payload/message building
- Direct `commerceEventDispatcher.dispatch`
- Direct `saveCommerceContext` + `window.open` + `clearCommerceContext`

Homepage surfaces already use `activateLineCta()` (canonical path).

---

## 4. Problem Statement

Platform components duplicate orchestration logic that now belongs exclusively in the Commerce Foundation. This creates:
- Maintenance burden (logic duplicated in 3+ places)
- Risk of drift between Homepage and Platform
- Inconsistent use of canonical merge policy and Analytics Bridge
- Violation of the "thin consumer" model established in Batches 1–3

Without migration, Batch 5 regression becomes unnecessarily complex, and future changes will require touching multiple places.

---

## 5. Architecture Principles

1. **Consumer Migration, Not Refactoring** — Batch 4 migrates consumers onto the frozen foundation. The foundation itself is not changed.
2. **Consumer Responsibility** — Platform components may only collect page-specific data and call `activateLineCta()`.
3. **No Local Business Logic** — All orchestration, merge, persistence, message building, dispatch, and handoff logic must be removed from Platform components.
4. **Single Canonical Path** — After Batch 4, all CTAs (Homepage + Platform) must flow through `activateLineCta()` → Commerce Foundation → Bridge.
5. **Behavior Preservation** — Zero user-visible or runtime changes. Labels, payloads, persistence, analytics, and handoff sequence must remain identical.

---

## 6. Responsibility Matrix (Consumer)

| Responsibility                          | Platform Components | Commerce Foundation |
|-----------------------------------------|---------------------|---------------------|
| Collect page-specific input (product, slug, info, knowledge, etc.) | Owner | — |
| Prepare arguments for `activateLineCta()` | Owner | — |
| Invoke `activateLineCta()`              | Owner | — |
| `mergeCommerceContext()`                | Forbidden | Owner |
| Persistence (load/save/clear)           | Forbidden | Owner |
| LINE message / payload generation       | Forbidden | Owner |
| CommerceEvent dispatch                  | Forbidden | Owner |
| Analytics Bridge emission               | Forbidden | Owner |
| `performLineHandoff` + cleanup          | Forbidden | Owner |

Platform components **must not** own any of the Commerce Foundation responsibilities.

---

## 7. Canonical Orchestration Flow (Locked)

```
Platform CTA
    │
    ▼
activateLineCta({ product or title, surface, landingPage, intent, ... })
    │
    ▼
Commerce Foundation
  (create base → mergeCommerceContext → createCtaPayload / buildNonProductLineMessage)
    │
    ▼
Analytics Bridge (CommerceEventPayload → AnalyticsPayload)
    │
    ▼
LINE (handoff + persistence + commerce event)
```

Homepage follows the identical path. After Batch 4 there is only one orchestration path.

---

## 8. Scope

- Migrate the three Platform CTA components to use `activateLineCta()` exclusively.
- Remove all duplicated local business logic from those components.
- Ensure Platform CTAs become pure consumers.
- Preserve exact runtime behavior, labels, payloads, persistence, and Commerce-originated analytics behaviour and emitted payloads (functionally equivalent for identical user actions).

---

## 9. Out of Scope

- Any modification to Commerce Foundation (`cta-activation.ts`, `context.ts`, `cta-contract.ts`, `events.ts`, `performLineHandoff`, etc.).
- Any modification to the Analytics Bridge.
- Any changes to Product Authority (`content/products.ts` or related).
- UI, visual, label, or routing changes.
- Homepage sections (already migrated).
- Persistence lifetime or `save → handoff → clear` sequence.
- Real analytics vendor configuration.
- Batch 5 validation work.

---

## 10. Allowed Files

Only the following may be modified:

- `components/platform/product-hero.tsx`
- `components/platform/information-cta.tsx`
- `components/platform/knowledge-cta.tsx`

Minimal interface adjustments (if any) are permitted only where they are direct, unavoidable consequences of switching to `activateLineCta()` arguments (e.g., passing the correct surface or landingPage). No new contracts or logic may be added.

---

## 11. Forbidden Files

The following are strictly out of bounds:

- Any file under `lib/commerce/` (except for reference when preparing `activateLineCta()` arguments)
- `lib/analytics/bridge/commerce-analytics-bridge.ts`
- `lib/commerce/context.ts`
- `lib/commerce/cta-contract.ts`
- `lib/commerce/persistence.ts`
- `content/products.ts` and all Product Authority files
- All Homepage sections (`sections/**`)
- Real vendor analytics configuration files

UI files are forbidden except the three Platform CTA consumer components explicitly listed in Allowed Files.

`app/(platform)/**` remains forbidden except the three approved CTA consumer components if they reside within that scope.

---

## 12. Migration Strategy

**Target Components**:
1. Product Hero CTA (`product-hero.tsx`)
2. Information CTA (`information-cta.tsx`)
3. Knowledge CTA (`knowledge-cta.tsx`)

**Migration Steps (per component)**:
1. Replace the entire `handleLineCta` implementation with a call to `activateLineCta()` using the exact same values currently computed for context fields.
2. For product surfaces: pass `product` shape.
3. For non-product surfaces: pass `title`.
4. Remove all local `loadCommerceContext`, merge, `saveCommerceContext`, `window.open`, `clearCommerceContext`, manual dispatch, and manual message building.
5. Preserve exact argument values so that `CommerceContext`, LINE message, persistence, and analytics payload remain identical.

**Preservation Guarantees**:
- Runtime behavior (user experience and conversion) must be identical.
- `CommerceContext` values must be identical.
- LINE message content must be identical.
- Persistence (`save → handoff → clear`) timing and data must be identical.
- Analytics payload reaching the Bridge must be identical.

---

## 13. Risks & Mitigations

- **Risk**: Incorrect argument mapping changes `CommerceContext` or LINE message.
  - **Mitigation**: Use the exact values currently computed in the existing code when calling `activateLineCta()`. Validate payloads before/after.

- **Risk**: Residual local logic remains after migration.
  - **Mitigation**: Explicit "No Local Business Logic" rule + code search in Audit Acceptance Criteria.

- **Risk**: Future developers re-introduce duplication.
  - **Mitigation**: Consumer Responsibility Matrix and "No Local Business Logic" rule become permanent architectural constraints.

---

## 14. Success Criteria

- All three Platform CTA components invoke **only** `activateLineCta()` (or an approved thin argument-preparation wrapper).
- Zero occurrences of local `loadCommerceContext`, custom merge, `saveCommerceContext`, `window.open`, `clearCommerceContext`, manual `commerceEventDispatcher.dispatch`, or manual payload/message creation in Platform components.
- Homepage and Platform now share the **identical** canonical orchestration path.
- `CommerceContext`, LINE messages, persistence sequence, and Commerce-originated analytics behaviour and emitted payloads are functionally equivalent to pre-migration for identical user actions.
- No changes to Product Authority, CTA Contract, Context, or the Analytics Bridge.

---

## 15. Audit Acceptance Criteria

- Code search confirms no forbidden local business logic remains in the three platform files.
- `activateLineCta` is the only orchestration entry point from those files.
- Side-by-side or automated comparison of emitted `CommerceContext`, LINE messages, persistence events, and analytics payloads shows no difference.
- No modifications were made to any Forbidden files.
- Behavior preservation is demonstrated for Product Hero, Information CTA, and Knowledge CTA.
- Consumer Responsibility Matrix is respected in the final code.

---

## 16. Batch Boundary

**Batch 4 owns**:
- Consumer Migration of the three Platform CTA components onto `activateLineCta()`.
- Removal of duplicated local business logic from those components.
- Verification that Platform now follows the canonical flow.

**Batch 5 owns**:
- Full regression of all CTA surfaces (Homepage + Platform).
- Verification of no behavior change from Batches 1–4.
- Collection of final evidence package.
- Confirmation of single canonical path across the entire application.

Batch 4 must not perform any validation or evidence work that belongs to Batch 5.

---

**Status**: Blueprint Ready for Independent Audit

**Next**: Independent Audit → SA Approval → Scope Lock → Implementation (Batch 4)

**End of PHASE6C-PLATFORM-CTA-CONSUMER-MIGRATION-BLUEPRINT.md**