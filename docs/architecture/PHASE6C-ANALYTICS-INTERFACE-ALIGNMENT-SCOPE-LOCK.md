# PHASE6C-ANALYTICS-INTERFACE-ALIGNMENT-SCOPE-LOCK.md (v1.0)

**Project:** ZENOVELL-PIMPZ-V4-Active  
**Phase:** 6C — Analytics Interface Alignment (Batch 3)  
**Milestone:** Scope Lock  
**Version:** v1.0  
**Status:** Locked  
**Date:** 2026-07-08  
**References:**
- docs/architecture/PHASE6C-ANALYTICS-INTERFACE-ALIGNMENT-BLUEPRINT.md (SA Approved)
- docs/reports/phase6/PRE-WP00-PHASE6C-BATCH3-ANALYTICS-INTERFACE.md (COMPLETE)
- docs/reports/phase6/PRE-WP00A-PHASE6C-BATCH3-ANALYTICS-INTERFACE.md (COMPLETE)
- docs/ROADMAP.md (LOCKED)
- WORKFLOW-v2.1.md (ACTIVE)
- docs/governance/DEVELOPMENT-LIFECYCLE.md (ACTIVE)
- SA Decision (2026-07-08): Phase 6C is Architecture Stabilization. The Analytics Interface must be aligned in a layered, agnostic manner before Platform Alignment (Batch 4) or Production Readiness.

---

## 1. Executive Summary

This Scope Lock translates the approved Phase 6C Batch 3 Blueprint into a strict, executable implementation boundary.

Phase 6C Batch 3 is **exclusively** an **Architecture Stabilization Phase** for the Analytics Interface Alignment.

**Core Rule (enforced):**  
Establish a dedicated Analytics Bridge as the sole translation layer between Commerce Event Dispatcher and Analytics Dispatcher. Add runtime initialization (noop only) in app/layout.tsx. Ensure clean separation of UI AnalyticsEvents and CommerceEvents. Commerce-originated analytics must pass exclusively through the Bridge. No Commerce module may call analytics.track() directly.

**Do not** change any visible UI behavior, CTA labels, routing, LINE handoff sequence, persistence lifetime (`save → handoff → clear`), or Product Authority. Existing UI analytics.track() calls for AnalyticsEvents remain permitted and are not part of this batch.

This document locks the boundary so that implementation stays strictly within the allowed files and does not leak into UI, platform components, or other batches.

**SA Final Approval:** GRANTED

---

## 2. Scope (Locked)

- Add runtime initialization call (noop only) in app/layout.tsx.
- Create and integrate the dedicated Analytics Bridge (`lib/analytics/bridge/commerce-analytics-bridge.ts`) as the only module that translates CommerceEventPayload to AnalyticsPayload and invokes the Analytics Dispatcher on behalf of Commerce.
- Update lib/commerce/events.ts (bridge wiring only) so that Commerce Event Dispatcher can delegate to the Bridge for relevant events.
- Align lib/analytics/dispatcher.ts, events.ts, initialize.ts, and adapter-registry.ts only if needed for clean interface (no commerce logic).
- Produce evidence demonstrating the Bridge is the sole translation point and that Commerce remains analytics-agnostic.
- Clarify that restriction applies only to Commerce-originated analytics emission. Existing UI instrumentation is out of scope.
- Update documentation and traceability references.
- All changes must be additive within the allowed boundaries and preserve existing end-to-end CTA flows and UI analytics behavior.

---

## 3. Out of Scope (Locked)

- Any modification to platform components (`components/platform/*`).
- Any changes to homepage sections (`sections/**`).
- Any direct CTA handlers outside the allowed wiring in events.ts.
- Changes to `lib/commerce/persistence.ts` (lifetime or behavior).
- Changes to `lib/commerce/cta-contract.ts`.
- Any UI, layout (except the single init call), label, or visual changes.
- Any routing or navigation changes.
- Mutation or redesign of Product Authority (`content/products.ts` and related).
- Production analytics runtime activation, real vendor config, or consent handling.
- Implementation of return continuity (future enhancement).
- Any work outside the Analytics Interface Alignment.
- Refactoring existing UI analytics.track() instrumentation.
- Batch 4 Platform CTA Alignment work.
- Phase 6E Production Readiness work.

---

## 4. Allowed Files

Only the following files **MAY** be created or modified. Any edit outside this list is a Scope Lock violation.

**Contract / Interface Layer (Batch 3 only)**
- app/layout.tsx (initialization call with ["noop"] only)
- lib/commerce/events.ts (bridge wiring only)
- lib/analytics/bridge/commerce-analytics-bridge.ts (new, sole translation)
- lib/analytics/dispatcher.ts (only if needed for interface alignment)
- lib/analytics/events.ts (only if needed for interface alignment)
- lib/analytics/adapters/initialize.ts (only if needed)
- lib/analytics/adapters/adapter-registry.ts (only if needed)

**Documentation & Evidence**
- docs/evidence/phase6c/*
- docs/architecture/PHASE6C-ANALYTICS-INTERFACE-ALIGNMENT-BLUEPRINT.md (reference updates only)
- docs/architecture/PHASE6C-ANALYTICS-INTERFACE-ALIGNMENT-SCOPE-LOCK.md (this file)
- docs/reports/phase6/PRE-WP00-PHASE6C-BATCH3-ANALYTICS-INTERFACE.md
- docs/reports/phase6/PRE-WP00A-PHASE6C-BATCH3-ANALYTICS-INTERFACE.md

**Notes on Allowed:**
- Edits are limited to interface alignment, bridge creation, and the single initialization call.
- No changes to any onClick, JSX, or CTA rendering code.
- The Analytics Bridge must be the only place invoking the Analytics Dispatcher for commerce events.

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
- app/(platform)/**
- lib/commerce/context.ts
- lib/commerce/persistence.ts
- lib/commerce/cta-contract.ts
- lib/analytics/adapters/ga4-adapter.ts (no config changes)

**General**
- Any file not listed in "Allowed Files".
- Any change that alters current end-to-end CTA behavior, labels, routing, UI analytics instrumentation, or Product Authority.
- Any Production Readiness, real analytics config, or Batch 4 work.
- Direct `analytics.track()` calls from commerce modules.

---

## 6. Deliverables Matrix

| Deliverable                        | Location                                      | Owner          | Evidence Required                          |
|------------------------------------|-----------------------------------------------|----------------|--------------------------------------------|
| Initialization call                | app/layout.tsx                                | Analytics      | Single call with ["noop"], idempotent      |
| Analytics Bridge                   | lib/analytics/bridge/commerce-analytics-bridge.ts | Analytics   | Pure translation, only place invoking dispatcher for commerce |
| Commerce Event Dispatcher wiring   | lib/commerce/events.ts                        | Commerce       | Calls Bridge only, no analytics logic      |
| Dispatcher / Registry alignment    | lib/analytics/* (if needed)                   | Analytics      | Clean delegation, no commerce knowledge    |
| Evidence package                   | docs/evidence/phase6c/*                       | Documentation  | Bridge is sole point, measurable examples  |

---

## 7. One Batch = One Spoke

Per Workflow v2.1 and the locked Roadmap:

**Batch 3 is strictly limited to:**
- Analytics Interface Alignment (Bridge, initialization, dispatcher/registry alignment for clean separation).

**Platform CTA Alignment is explicitly deferred to Batch 4.**

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
- Verify that only the dedicated Analytics Bridge invokes the Analytics Dispatcher for Commerce-originated events.
- No Commerce module calls analytics.track() directly.
- Existing UI analytics.track() for AnalyticsEvents remain unchanged.
- Initialization is exactly one call with noop in app/layout.tsx.
- `save → handoff → clear` and `activateLineCta` behavior unchanged.
- `npm run validate` passes.

---

## 9. Audit Acceptance Criteria

- Blueprint compliance verified.
- Scope Lock respected (only allowed files touched).
- Analytics Bridge is the sole translation point and the only module invoking the Analytics Dispatcher on behalf of Commerce.
- No direct analytics.track() from Commerce.
- Commerce remains analytics-agnostic; Analytics remains commerce-agnostic for this path.
- Existing UI analytics instrumentation is untouched.
- Initialization follows the strict rules (one call, noop, app/layout.tsx only).
- No platform components, UI, routing, or Product Authority were modified.
- Persistence lifetime and handoff sequence are unchanged.
- `npm run validate` passes.

---

## 10. Success Criteria

Batch 3 is successful only when:
- The dedicated Analytics Bridge exists and is the only translation layer for CommerceEventPayload → AnalyticsPayload.
- Only the Bridge invokes the Analytics Dispatcher for commerce events.
- No Commerce module calls analytics.track() directly.
- Initialization with ["noop"] is present exactly once in app/layout.tsx.
- All existing CTA surfaces and UI analytics behavior continue to function exactly as before.
- `npm run validate` passes.
- Evidence package demonstrates the layered, agnostic architecture.

---

## 11. Risks & Mitigations

- **Risk**: Commerce code bypasses the Bridge (direct analytics.track()).
  - **Mitigation**: Strict Scope Lock + only Bridge is allowed to invoke dispatcher for commerce. Audit will verify.
- **Risk**: UI analytics changes accidentally included.
  - **Mitigation**: Explicitly out of scope and forbidden. Existing calls permitted.
- **Risk**: Initialization in wrong place or with wrong args.
  - **Mitigation**: Explicit rules in Scope Lock (app/layout.tsx only, noop only).
- **Risk**: Platform components (Batch 4) still bypass the interface.
  - **Mitigation**: Deferred to Batch 4; Batch 3 focuses only on interface readiness.

---

## 12. Exit Criteria

Batch 3 may exit Scope Lock and proceed to Implementation only after:
- This Scope Lock is approved.
- SA Final Approval is recorded.
- `npm run validate` passes.
- All teams acknowledge the Allowed/Forbidden boundaries and the Bridge-only rule for Commerce-originated analytics.

After successful Implementation + Independent Audit + Closeout, the project proceeds to Batch 4.

---

**Scope Lock Status:** LOCKED

**SA Final Approval:** GRANTED (2026-07-08)

**Prepared by:** System Architect (Governance Recovery Mode)  
**Next:** Implementation (Batch 3) → Validation → Independent Audit → Batch 3 Closeout

**End of PHASE6C-ANALYTICS-INTERFACE-ALIGNMENT-SCOPE-LOCK.md**