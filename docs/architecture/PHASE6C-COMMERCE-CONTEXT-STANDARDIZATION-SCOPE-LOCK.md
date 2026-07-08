# PHASE6C-COMMERCE-CONTEXT-STANDARDIZATION-SCOPE-LOCK.md (v1.0)

**Project:** ZENOVELL-PIMPZ-V4-Active  
**Phase:** 6C — Commerce Context Standardization (Batch 2)  
**Milestone:** Scope Lock  
**Version:** v1.0  
**Status:** Locked  
**Date:** 2026-07-08  
**References:**
- docs/architecture/PHASE6C-COMMERCE-CONTEXT-STANDARDIZATION-BLUEPRINT.md (SA Approved)
- docs/reports/phase6/PRE-WP00-PHASE6C-BATCH2-COMMERCE-CONTEXT.md (COMPLETE)
- docs/reports/phase6/PRE-WP00A-PHASE6C-BATCH2-COMMERCE-CONTEXT.md (COMPLETE)
- docs/ROADMAP.md (LOCKED)
- WORKFLOW-v2.1.md (ACTIVE)
- docs/governance/DEVELOPMENT-LIFECYCLE.md (ACTIVE)
- SA Decision (2026-07-08): Phase 6C is Architecture Stabilization. The canonical Commerce Context merge policy must be implemented before any further expansion of context usage or platform alignment.

---

## 1. Executive Summary

This Scope Lock translates the approved Phase 6C Batch 2 Blueprint into a strict, executable implementation boundary.

Phase 6C Batch 2 is **exclusively** an **Architecture Stabilization Phase** for the Commerce Context merge policy.

**Core Rule (enforced):**  
Define and implement a single canonical `mergeCommerceContext()` in `lib/commerce/context.ts`. Update `cta-activation.ts` to use it while remaining orchestration-only. Remove any inline merge policy from the activation helper.

**Do not** change any visible UI behavior, CTA labels, routing, LINE handoff sequence, persistence lifetime (`save → handoff → clear`), or Product Authority.

This document locks the boundary so that implementation stays strictly within the allowed files and does not leak into UI, platform components, or other batches.

**SA Final Approval:** GRANTED

---

## 2. Scope (Locked)

- Define and implement the canonical `mergeCommerceContext(baseContext, persistedContext?)` function in `lib/commerce/context.ts` as the single owner of merge policy.
- Update `cta-activation.ts` to call the canonical helper (orchestration only). Remove all inline merge logic and outdated comments claiming "persisted has highest priority".
- Establish clear policy: Current interaction owns `entrySurface`, `landingPage`, `intent`, `product`, `sku`, `timestamp`. Persisted context may contribute `source`, `campaign`, and utm fields supported by the current CommerceContext shape **only when missing** from current context. medium/referrer are deferred unless represented inside existing utm metadata.
- Produce evidence demonstrating the exact measurable merge examples defined in the Blueprint.
- Update documentation and traceability references.
- All changes must be additive within the Contract Layer and preserve existing end-to-end CTA flows.

---

## 3. Out of Scope (Locked)

- Any modification to platform components (`components/platform/*`).
- Any changes to homepage sections (`sections/**`).
- Any direct CTA handlers outside `cta-activation.ts`.
- Changes to `lib/commerce/persistence.ts` (lifetime or behavior).
- Changes to `lib/commerce/cta-contract.ts`.
- Any UI, layout, label, or visual changes.
- Any routing or navigation changes.
- Mutation or redesign of Product Authority (`content/products.ts` and related).
- Production analytics runtime activation or initialization (Batch 3 work).
- Implementation of return continuity (future enhancement).
- Any work outside the Contract Layer.
- Touching `lib/analytics/**`.

---

## 4. Allowed Files

Only the following files **MAY** be created or modified. Any edit outside this list is a Scope Lock violation.

**Contract Layer (Batch 2 only)**
- lib/commerce/context.ts (canonical merge policy and helper)
- lib/commerce/cta-activation.ts (orchestration-only updates; remove inline policy)

**Documentation & Evidence**
- docs/evidence/phase6c/*
- docs/architecture/PHASE6C-COMMERCE-CONTEXT-STANDARDIZATION-BLUEPRINT.md (reference updates only)
- docs/architecture/PHASE6C-COMMERCE-CONTEXT-STANDARDIZATION-SCOPE-LOCK.md (this file)

**Notes on Allowed:**
- Edits are limited to policy definition in context.ts and thin orchestration updates in cta-activation.ts.
- No changes to any onClick, JSX, or CTA rendering code.
- Index files may only be touched if re-exports are absolutely required for the helper.

---

## 5. Forbidden Files

The following are **strictly forbidden**. Any change, creation, or deletion in these areas violates Scope Lock.

**All UI / Section Files**
- sections/**
- components/** (including platform components)

**Product Authority**
- content/products.ts
- content/*.ts (any mutation of data shapes)

**Platform & App**
- app/**
- lib/commerce/persistence.ts
- lib/commerce/cta-contract.ts
- lib/analytics/**

**General**
- Any file not listed in "Allowed Files".
- Any change that alters current end-to-end CTA behavior, labels, routing, or Product Authority.
- Any Production Readiness or Batch 3/4/5 work.

---

## 6. Deliverables Matrix

| Deliverable | Location | Owner | Evidence Required |
|-------------|----------|-------|-------------------|
| Canonical merge policy | lib/commerce/context.ts | Context Layer | `mergeCommerceContext()` implementation + JSDoc |
| Orchestration update | lib/commerce/cta-activation.ts | Activation Layer | Calls canonical helper only; no inline merge |
| Policy evidence | docs/evidence/phase6c/ | Documentation | Before/after merge examples matching Blueprint |
| Blueprint reference | docs/architecture/...-BLUEPRINT.md | Documentation | Updated references |
| Scope Lock | docs/architecture/...-SCOPE-LOCK.md | Documentation | This document |

---

## 7. One Batch = One Spoke

Per Workflow v2.1 and the locked Roadmap:

**Batch 2 is strictly limited to:**
- Commerce Context merge policy standardization.
- Thin updates to the activation helper to consume the policy.

**Platform CTA alignment and removal of duplicated merge logic in platform components is explicitly deferred to Batch 4.**

This maintains "One Batch = One Spoke" discipline.

---

## 8. Validation Requirements

**Per Batch (mandatory):**
- `npm run lint`
- `npm run typecheck`
- `npm run build`

**Final Validation:**
```bash
npm run validate
```

**Manual Evidence Required for Audit:**
- Verify the exact measurable merge examples from the Blueprint (see Implementation Audit Requirements below).
- `save → handoff → clear` sequence remains identical.
- No changes to any CTA labels, onClick handlers, or end-to-end user flows.
- Homepage CTA behavior via `activateLineCta` remains consistent for users (only internal attribution fields follow canonical policy).

---

## 9. Audit Acceptance Criteria

- Blueprint compliance verified.
- Scope Lock respected (only allowed files touched).
- `mergeCommerceContext()` is the single owner of merge policy.
- `cta-activation.ts` is orchestration-only (no inline policy).
- All measurable merge examples from the Blueprint are correctly implemented and evidenced.
- No platform components, UI, routing, or Product Authority were modified.
- Persistence lifetime and `save → handoff → clear` behavior are unchanged.
- `npm run validate` passes.

---

## 10. Success Criteria

Batch 2 is successful only when:
- `mergeCommerceContext()` exists in `lib/commerce/context.ts` and implements the locked policy.
- All CTA surfaces that go through `cta-activation.ts` use the canonical helper.
- The following measurable behaviors are verified:
  - current product always wins over persisted product
  - current sku always wins over persisted sku
  - current entrySurface always wins over persisted entrySurface
  - current landingPage always wins
  - current intent always wins
  - persisted source fills only when current source is missing
  - persisted campaign fills only when current campaign is missing
  - persisted medium (inside utm) fills only when current medium/utm is missing (medium is represented inside utm)
  - persisted utm fills only when current utm is missing
  - timestamp always comes from current base context
- No UI behavior, labels, routing, or handoff sequence changed.
- `save → handoff → clear` is identical.
- Evidence package demonstrates the policy is centralized and auditable.

---

## 11. Risks & Mitigations

- **Risk**: Inline merge logic remains in cta-activation.ts or leaks into other files.
  - **Mitigation**: Strict Allowed/Forbidden list + Implementation Audit must verify removal.
- **Risk**: Platform duplication is accidentally "fixed" in Batch 2.
  - **Mitigation**: Explicitly forbidden in this Scope Lock. Deferred to Batch 4.
- **Risk**: Merge policy is implemented incorrectly (e.g. persisted overrides current product).
  - **Mitigation**: Blueprint defines exact measurable examples. Audit will test them.
- **Risk**: Attribution drift between homepage and future platform surfaces.
  - **Mitigation**: Canonical policy + "No UI component may implement its own merge logic" principle established in Blueprint.

---

## 12. Exit Criteria

Batch 2 may exit Scope Lock and proceed to Implementation only after:
- This Scope Lock is approved.
- SA Final Approval is recorded.
- `npm run validate` passes.
- All teams acknowledge the Allowed/Forbidden boundaries.

After successful Implementation + Independent Audit + Closeout, the project proceeds to Batch 3.

---

**Scope Lock Status:** LOCKED

**SA Final Approval:** GRANTED (2026-07-08)

**Prepared by:** System Architect (Governance Mode)  
**Next:** Implementation (Batch 2) → Validation → Independent Audit → Batch 2 Closeout

**End of PHASE6C-COMMERCE-CONTEXT-STANDARDIZATION-SCOPE-LOCK.md**