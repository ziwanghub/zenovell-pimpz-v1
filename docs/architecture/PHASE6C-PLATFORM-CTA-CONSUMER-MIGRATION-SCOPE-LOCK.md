# PHASE6C-PLATFORM-CTA-CONSUMER-MIGRATION-SCOPE-LOCK.md (v1.0)

**Project:** ZENOVELL-PIMPZ-V4-Active  
**Phase:** 6C — Platform CTA Consumer Migration (Batch 4)  
**Milestone:** Scope Lock  
**Version:** v1.0  
**Status:** Locked  
**Date:** 2026-07-08  
**References:**
- docs/architecture/PHASE6C-PLATFORM-CTA-CONSUMER-MIGRATION-BLUEPRINT.md (SA Approved)
- docs/reports/phase6/PRE-WP00-PHASE6C-BATCH4-PLATFORM-CTA-CONSUMER-MIGRATION.md (APPROVED)
- docs/reports/phase6/PRE-WP00A-PHASE6C-BATCH4-PLATFORM-CTA-CONSUMER-MIGRATION.md (APPROVED)
- docs/ROADMAP.md (LOCKED)
- WORKFLOW-v2.1.md (ACTIVE)
- docs/governance/DEVELOPMENT-LIFECYCLE.md (ACTIVE)
- SA Decision (2026-07-08): Phase 6C is Architecture Stabilization. After Batch 1–3, the Commerce Foundation is frozen. Batch 4 is strictly Consumer Migration only.

---

## 1. Executive Summary

This Scope Lock translates the approved Phase 6C Batch 4 Blueprint into a strict, executable implementation boundary.

Phase 6C Batch 4 is **Platform CTA Consumer Migration**.

**NOT** Platform CTA Refactoring.

**Core Rule (enforced):**  
Platform components become pure consumers of the already-approved, frozen Commerce Foundation. They may invoke **only** `activateLineCta(...)`.

Commerce Foundation (CTA Contract, canonical merge, thin activation, Analytics Bridge) is **frozen**.

**Do not:**
- Redesign Commerce
- Change `activateLineCta`, `mergeCommerceContext`, `performLineHandoff`, CTA Contract, Context, Persistence, or Analytics Bridge
- Introduce new features, UI changes, or routing
- Touch Product Authority

**No runtime behavior changes** are permitted. All existing CTA behavior, labels, payloads, persistence lifetime (`save → handoff → clear`), and Commerce-originated analytics behaviour must remain functionally equivalent for identical user actions.

This document locks the boundary so that implementation stays strictly within the allowed files and does not leak into UI, platform components beyond the three listed, or other batches.

**SA Final Approval:** GRANTED

---

## 2. Scope (Locked)

Batch 4 owns **only** Consumer Migration of the following Platform CTA surfaces:

- Product Hero CTA
- Information CTA
- Knowledge CTA

Platform components must invoke **only**:

`activateLineCta(...)`

All local business logic must be removed. They become pure consumers that:
- Collect page-specific input
- Prepare arguments for `activateLineCta()`
- Invoke `activateLineCta()`

---

## 3. Out of Scope (Locked)

The following are **strictly forbidden**:

- Commerce redesign
- CTA Contract changes
- `mergeCommerceContext` changes
- `performLineHandoff` changes
- Analytics Bridge changes
- Context changes
- Persistence changes
- Homepage changes
- Product Authority changes
- Routing
- UI redesign
- Batch 5 validation work
- Phase 6E work
- Any new features or behavior changes

---

## 4. Allowed Files

Only the following files **MAY** be created or modified. Any edit outside this list is a Scope Lock violation.

**Platform Consumer Components (Batch 4 only)**
- components/platform/product-hero.tsx
- components/platform/information-cta.tsx
- components/platform/knowledge-cta.tsx

**Documentation & Evidence**
- docs/evidence/phase6c/*
- docs/reports/phase6/* (Batch 4 specific)
- docs/architecture/PHASE6C-PLATFORM-CTA-CONSUMER-MIGRATION-BLUEPRINT.md (reference updates only)
- docs/architecture/PHASE6C-PLATFORM-CTA-CONSUMER-MIGRATION-SCOPE-LOCK.md (this file)

**Notes on Allowed:**
- Edits are limited to removing local business logic and invoking `activateLineCta()` with correct arguments.
- No new contracts, logic, or features may be added.
- The three components are the **only** UI files permitted in this batch.

---

## 5. Forbidden Files

The following are **strictly forbidden**. Any change, creation, or deletion in these areas violates Scope Lock.

**Commerce Foundation**
- lib/commerce/** (all files — read-only for reference only)

**Analytics**
- lib/analytics/** (except read-only reference to the Bridge)

**All Other UI / Section Files**
- sections/**
- components/** (except the three explicitly allowed above)

**Product Authority**
- content/products.ts
- content/*.ts (any mutation)

**Platform & App (except allowed)**
- app/**
- app/(platform)/** (except the three approved CTA consumer components if located there)

**General**
- Any file not listed in "Allowed Files".
- Any change that alters current CTA behavior, labels, routing, or Product Authority.
- Any work belonging to Batch 5 or Phase 6E.

---

## 6. Deliverables Matrix

| Blueprint Requirement                  | Implementation File(s)                              | Evidence Required                          | Audit Method                          |
|----------------------------------------|-----------------------------------------------------|--------------------------------------------|---------------------------------------|
| Migrate Product Hero CTA to consumer   | components/platform/product-hero.tsx                | Before/after code + behavior diff          | Code search + payload comparison     |
| Migrate Information CTA to consumer    | components/platform/information-cta.tsx             | Before/after code + behavior diff          | Code search + payload comparison     |
| Migrate Knowledge CTA to consumer      | components/platform/knowledge-cta.tsx               | Before/after code + behavior diff          | Code search + payload comparison     |
| Remove all local business logic        | The three platform files                            | Zero occurrences of forbidden patterns     | Automated code search                |
| Single canonical path (activateLineCta)| The three platform files + cta-activation.ts (read) | Unified call pattern                       | Code review + execution trace        |
| Runtime & behavior preservation        | All three files                                     | Identical CommerceContext, messages, persistence, analytics | Side-by-side / automated comparison  |

---

## 7. One Batch = One Spoke

Per Workflow v2.1 and the locked Roadmap:

**Batch 4 owns only Consumer Migration.**

- It owns making the three Platform components invoke `activateLineCta()` exclusively.
- It owns removal of duplicated local business logic from those components.

**Batch 5 owns Regression, Validation, and Evidence.**

- Full regression of all CTA surfaces.
- Verification of no behavior change.
- Final evidence package.

No large multi-section batches. No leakage between batches.

---

## 8. No Local Business Logic Rule

**Audit MUST verify zero remaining** of the following inside the three Platform components:

- `loadCommerceContext()`
- Any merge logic (custom or otherwise)
- `saveCommerceContext()`
- `clearCommerceContext()`
- `window.open()`
- Manual `commerceEventDispatcher.dispatch(...)`
- Manual payload or LINE message building

The **only** orchestration entry point permitted is:

`activateLineCta(...)`

This rule is permanent for all future platform consumers.

---

## 9. Validation Requirements

**Per Batch (mandatory):**
- `npm run lint`
- `npm run typecheck`
- `npm run build`

**Final Validation:**
```bash
npm run validate
```

**Manual Evidence Required for Audit:**
- Code search confirms `activateLineCta()` is the only orchestration call.
- Zero occurrences of forbidden local business logic patterns.
- No behavior changes (CommerceContext, LINE messages, persistence sequence, analytics payloads must be functionally equivalent).
- Homepage and Platform now share identical orchestration path.
- `npm run validate` passes.

---

## 10. Audit Acceptance Criteria

- Blueprint compliance verified.
- Scope Lock respected (only the three allowed platform components modified).
- `activateLineCta()` is the **only** orchestration entry point in the three files.
- No duplicated orchestration, merge, persistence, or dispatch logic remains in Platform components.
- Runtime behaviour is preserved (labels, payloads, handoff sequence, persistence lifetime).
- Commerce-originated analytics behaviour and emitted payloads are functionally equivalent for identical user actions.
- `CommerceContext` and Product Authority are unchanged.
- No files outside the Allowed list were modified.
- `npm run validate` passes.

---

## 11. Success Criteria

Batch 4 is successful only when:

- All three Platform CTA components invoke **only** `activateLineCta(...)`.
- Zero duplicated local business logic remains in Platform components.
- Homepage and Platform share the **identical** canonical orchestration path.
- Runtime behaviour, labels, LINE messages, persistence sequence, and Commerce-originated analytics payloads are functionally equivalent to pre-migration for identical user actions.
- `npm run validate` passes.
- Evidence package demonstrates successful consumer migration with no scope leakage.

---

## 12. Risks & Mitigations

- **P0 — Behavior drift** (High): Incorrect argument mapping or logic removal changes `CommerceContext`, LINE messages, or handoff for platform users.
  - **Mitigation**: Use identical argument values currently computed in existing code. Validate payloads and behaviour before/after with automated comparison.

- **P1 — Residual duplication** (Medium): Some local logic remains after migration.
  - **Mitigation**: Strict "No Local Business Logic" rule + mandatory code search in Audit Acceptance Criteria. Any remaining duplication is a Scope Lock violation.

- **P2 — Future consumer drift** (Medium): New platform surfaces or future changes re-introduce duplication.
  - **Mitigation**: Consumer Responsibility Matrix and "No Local Business Logic" rule become permanent architectural constraints. Future work must reference this Scope Lock.

---

## 13. Exit Criteria

Batch 4 may exit Scope Lock and proceed to Implementation only after:
- This Scope Lock is approved.
- SA Final Approval is recorded.
- `npm run validate` passes.
- All teams acknowledge the Allowed/Forbidden boundaries and the "No Local Business Logic" rule.

After successful Implementation + Independent Audit + Closeout, the project proceeds to Batch 5.

---

**Scope Lock Status:** LOCKED

**SA Final Approval:** GRANTED (2026-07-08)

**Prepared by:** System Architect  
**Next:** Implementation (Batch 4) → Validation → Independent Audit → Batch 4 Closeout → Batch 5

**End of PHASE6C-PLATFORM-CTA-CONSUMER-MIGRATION-SCOPE-LOCK.md**