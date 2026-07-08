# PHASE6C-CTA-CONTRACT-STANDARDIZATION-SCOPE-LOCK.md (v1.0)

**Project:** ZENOVELL-PIMPZ-V4-Active  
**Phase:** 6C — CTA Contract Standardization  
**Milestone:** Scope Lock  
**Version:** v1.0  
**Status:** Locked  
**Date:** 2026-07-08  
**References:**
- PHASE6C-CTA-CONTRACT-STANDARDIZATION-BLUEPRINT.md (SA Approved)
- PRE-WP00-PHASE6C-CTA-CONTRACT-STANDARDIZATION.md (COMPLETE)
- PRE-WP00A-PHASE6C-CTA-CONTRACT-STANDARDIZATION.md (COMPLETE)
- docs/ROADMAP.md (LOCKED)
- WORKFLOW-v2.1.md (ACTIVE)
- DEVELOPMENT-LIFECYCLE.md (ACTIVE)
- SA Decision (2026-07-08): Phase 6C is Architecture Stabilization. Contract, Context, Persistence, and Analytics semantics must be standardized before 6D UI/UX or Production Readiness.

---

## 1. Executive Summary

This Scope Lock translates the approved Phase 6C Blueprint into a strict, executable implementation boundary.

Phase 6C is **exclusively** an **Architecture Stabilization Phase** for the CTA / Commerce contract layer.

**Core Rule (enforced):**  
Standardize contract semantics, merge policy, persistence policy, analytics initialization, and activation helper boundaries.  
**Do not** change any visible CTA behavior, routing, UI, Product Authority, or current runtime handoff semantics established in Phase 6A/6B.

This document locks the boundary so that implementation stays within the Contract Layer and does not leak into feature work or production activation.

---

## 2. In Scope (Locked)

- Standardize CTA Contract for product and non-product paths (extend or parallel contracts as defined in Blueprint).
- Define and enforce canonical Commerce Context merge policy (single source of truth, current visit semantics win for key fields).
- Define Persistence lifetime policy (document current save → handoff → clear behavior; return continuity as future only).
- Analytics runtime initialization strategy (interfaces + bootstrap init with noop; no production adapter activation).
- Enforce thin boundary on `cta-activation.ts` (orchestration only).
- Align platform CTA usage patterns to the standardized contract/helper/policy (additive, no behavior change).
- Clarify event taxonomy (UI events vs commerce events).
- Update documentation and add minimal contract tests / usage audit evidence.
- All changes must be additive and preserve existing runtime behavior.

---

## 3. Out of Scope (Locked)

- Any modification to existing CTA onClick handlers, labels, or activation calls in homepage sections or platform components.
- Any change to visible UI, layout, or behavior of CTAs.
- Any routing changes or addition of new navigation.
- Mutation or redesign of Product Authority.
- Production GA4 / Meta / TikTok / Ads adapter configuration or activation.
- Implementation of return continuity (future enhancement).
- UI/UX polish, motion, or section redesign (Phase 6D work).
- Production Readiness tasks (Phase 6E work).
- Backend systems (Phase 7 work).
- Any changes outside the contract / context / persistence / analytics layers.

---

## 4. Allowed Files

Only the following files **MAY** be created or modified. Any edit outside this list is a Scope Lock violation.

**Contract Layer**
- lib/commerce/cta-contract.ts
- lib/commerce/context.ts
- lib/commerce/persistence.ts
- lib/commerce/cta-activation.ts (boundary enforcement and thinness only; no policy growth)
- lib/commerce/events.ts (if taxonomy clarification needed)
- lib/commerce/line-message-builder.ts (if non-product standardization needed)

**Analytics Layer**
- lib/analytics/dispatcher.ts
- lib/analytics/events.ts
- lib/analytics/types.ts
- lib/analytics/adapters/adapter-registry.ts
- lib/analytics/adapters/initialize.ts
- lib/analytics/adapters/*.ts (lightweight alignment only)

**Bootstrap (minimal)**
- app/layout.tsx (call to initializeAnalyticsAdapters with ["noop"] only; no production config)

**Documentation & Evidence**
- docs/architecture/PHASE6C-CTA-CONTRACT-STANDARDIZATION-BLUEPRINT.md (reference updates)
- docs/architecture/PHASE6C-CTA-CONTRACT-STANDARDIZATION-SCOPE-LOCK.md (this file)
- docs/reports/phase6/ (evidence and audit artifacts)
- docs/ROADMAP.md (reference updates only)

**Notes on Allowed:**
- Edits are limited to contract interfaces, policy definitions, initialization calls, and documentation.
- No changes to any onClick, JSX, or CTA rendering code.
- Index files may only be touched if re-exports are absolutely required.

---

## 5. Forbidden Files

The following are **strictly forbidden**. Any change, creation, or deletion in these areas violates Scope Lock.

**All UI / Section Files**
- sections/**/*.tsx (all homepage sections)
- components/**/*.tsx (except minimal analytics init if absolutely required in bootstrap)

**Product Authority**
- content/products.ts
- content/section-*-*.ts (any mutation of cta or data shape)

**Platform Pages**
- app/(platform)/** (no functional changes; reference only for alignment verification)

**Other Commerce / Analytics**
- Any expansion that adds business logic into cta-activation.ts
- Production adapter configs or keys

**General**
- Any file not listed in "Allowed Files".
- Any change that alters current CTA runtime behavior, routing, or Product Authority.
- Any Production Readiness or 6D/6E work.

---

## 6. Batch Plan

**One Batch = One Spoke** (per Workflow v2.1 and Blueprint).

**Recommended Batches:**

**Batch 1: CTA Contract Standardization**
- Extend CTA contract for product + non-product paths.
- Standardize CtaSurface taxonomy and payload shapes.
- Update withCommerceContext if needed.
- Evidence: Contract diff + compatibility matrix verification.

**Batch 2: Commerce Context Standardization**
- Define and implement canonical merge policy in context.ts (current visit wins for entrySurface/landingPage/intent/source; persisted contributes UTM/campaign only).
- Update activation helper and platform examples to use the policy.
- Evidence: Policy doc + before/after merge behavior.

**Batch 3: Analytics Interface Alignment**
- Add runtime initialization call (noop) in app/layout.tsx.
- Clarify event taxonomy separation (UI PRODUCT_CLICK vs commerce LINE_CLICK).
- Ensure dispatcher-registry connection is clean.
- Evidence: Initialization code + event usage audit.

**Batch 4: Platform CTA Alignment**
- Update platform direct CTA patterns (product-hero, information-cta, knowledge-cta) to use standardized contract/helper/policy.
- Preserve exact current runtime behavior and LINE handoff.
- Evidence: Alignment diff + side-by-side behavior confirmation.

**Batch 5: Validation + Evidence**
- Full regression of all existing CTA surfaces (homepage + platform).
- Verify no behavior change in 6A/6B LINE flows.
- Verify contract usage consistency.
- Run full validate + manual contract audit.
- Collect evidence package.

No large multi-section batches.

---

## 7. Validation Requirements

**Per Batch (mandatory):**
- `npm run lint`
- `npm run typecheck`
- `npm run build`

**Final Validation (after Batch 5):**
```bash
npm run validate
```

**Manual Evidence Required for Audit:**
- Homepage CTA behavior unchanged (screenshots + event logs).
- Platform CTA behavior unchanged.
- Contract Compatibility Matrix matches implementation.
- No nested policy in activation helper.
- Analytics init present (noop) with no production side-effects.
- Persistence policy documented and current clear-after-handoff behavior preserved.

---

## 8. Audit Acceptance Criteria

- Blueprint compliance verified.
- Scope Lock respected (only allowed files touched).
- CTA Preservation: zero changes to existing onClick / activateLineCta calls or labels.
- Contract semantics standardized (product + non-product).
- Merge policy is single and canonical.
- Analytics initialization is runtime-ready (noop) without production activation.
- Activation helper remains thin.
- Platform alignment is additive only.
- All success criteria measurable and evidenced.
- Risks and mitigations addressed.
- No leakage of 6D/6E/Production work.

---

## 9. Success Criteria

Phase 6C is successful only when:
- All existing homepage and platform CTA surfaces continue to function exactly as they did after Phase 6A/6B.
- CTA Contract, Context merge policy, Persistence policy, and Analytics initialization are standardized and documented.
- Future surfaces can be added through the contract layer without drift.
- `cta-activation.ts` remains thin orchestration.
- `npm run validate` passes.
- Evidence package demonstrates unchanged runtime behavior + standardized contracts.

---

## 10. Risks

- Accidental modification of CTA onClick or labels (high — must be audited per batch).
- Analytics init introducing unexpected side-effects (mitigate by noop-only in 6C).
- Platform alignment work touching UI (forbidden — strict file scope).
- Over-expansion of activation helper (enforce boundary in every batch).
- Policy changes affecting future return continuity expectations (document as future).

---

## 11. Explicit Non-Goals

- NO changes to any existing CTA button behavior, labels, or activation calls.
- NO UI, layout, animation, or visual changes.
- NO routing or navigation changes.
- NO Product Authority changes.
- NO production analytics adapter activation.
- NO return continuity implementation.
- NO Phase 6D/6E/Phase 7 work.
- NO new CTA surfaces or features.

---

**Scope Lock Status:** LOCKED

**Prepared by:** Grok CLI (Documentation Only)  
**Next:** Codex Scope Lock Audit → SA Approval → Batch Implementation (starting with Batch 1)

**End of PHASE6C-CTA-CONTRACT-STANDARDIZATION-SCOPE-LOCK.md**