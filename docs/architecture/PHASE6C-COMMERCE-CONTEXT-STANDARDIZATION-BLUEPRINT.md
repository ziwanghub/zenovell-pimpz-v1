# PHASE 6C — COMMERCE CONTEXT STANDARDIZATION BLUEPRINT

**Date**: 2026-07-08  
**Phase**: Phase 6C — Commerce Context Standardization  
**Status**: Blueprint (Ready for Blueprint Audit)  
**Baseline**: Phase 6C Batch 1 CLOSED + PRE-WP00 PASS + PRE-WP00A PASS + Phase 6A/6B Closed + Governance v2.1  
**Governing Documents**:
- WORKFLOW-v2.1.md (ACTIVE)
- DEVELOPMENT-LIFECYCLE.md (ACTIVE)
- PHASE6C-CTA-CONTRACT-STANDARDIZATION-BLUEPRINT.md (CLOSED)
- PHASE6C-CTA-CONTRACT-STANDARDIZATION-SCOPE-LOCK.md (LOCKED)
- docs/reports/phase6/PRE-WP00-PHASE6C-BATCH2-COMMERCE-CONTEXT.md (PASS)
- docs/reports/phase6/PRE-WP00A-PHASE6C-BATCH2-COMMERCE-CONTEXT.md (PASS)
- SA Decision (2026-07-08): Phase 6C is an Architecture Stabilization Phase. Canonical merge policy must be locked before implementation.

**Objective**: Define the minimum additive architecture work required to establish a single canonical Commerce Context merge policy in `lib/commerce/context.ts`, update the thin activation helper to consume it, and document clear boundaries.

Batch 2 guarantees:
- No UI behavior change
- No CTA label change
- No routing change
- No LINE handoff sequence change
- No persistence lifetime change (`save → handoff → clear` remains identical)
- No Product Authority change

Commerce Context merge semantics are intentionally standardized. Homepage merge behavior may change for context ownership/attribution fields (source, campaign, utm, etc.) to match the approved canonical policy. This is an approved architecture stabilization change, not a UI or end-to-end runtime flow change.

---

## 1. Executive Summary

Phase 6C Batch 2 is a **Context Layer Standardization** phase focused exclusively on the Commerce Context merge policy.

After Batch 1 (CTA Contract Standardization), the contract layer is stable, but the merge logic between current interaction context and persisted context remains inconsistent and duplicated.

Current state:
- Two conflicting merge strategies exist in the codebase.
- `cta-activation.ts` (used by all homepage CTAs) and platform components implement merge differently.
- No single source of truth for merge policy exists in `context.ts`.
- This creates risk of attribution drift and makes future platform alignment (Batch 4) unsafe.

Batch 2 will:
- Lock the canonical merge policy per PRE-WP00A.
- Introduce a single pure helper `mergeCommerceContext()` in `lib/commerce/context.ts`.
- Update `cta-activation.ts` to use the helper while remaining orchestration-only.
- Establish governance principles that prevent future UI components from owning merge logic.

This phase is **Architecture Stabilization only**. It does not fix platform duplication (deferred to Batch 4). End-to-end user flows (labels, routing, LINE handoff sequence) remain unchanged. Only internal Commerce Context merge semantics for attribution/ownership fields are standardized to the canonical policy.

---

## 2. Objectives

Batch 2 will:
- Define and lock a single canonical merge policy for Commerce Context.
- Place the merge logic in exactly one location (`lib/commerce/context.ts`).
- Update the activation helper (`cta-activation.ts`) to consume the canonical policy.
- Document clear ownership boundaries between current interaction and persisted data.
- Establish principles that all future surfaces (including Batch 4) must follow.
- Produce auditable policy documentation and before/after evidence.

Batch 2 will not:
- Change current `save → handoff → clear` persistence behavior.
- Implement return continuity.
- Touch platform components (product-hero, information-cta, knowledge-cta).
- Introduce new fields, UTM auto-capture, or analytics activation.
- Alter homepage or platform CTA end-to-end flow (UI labels, routing, handoff sequence).

---

## 3. Existing Foundation

- **Commerce Context** (`lib/commerce/context.ts`): Defines `CommerceContext` shape and creation helpers (`createCommerceContext`, `createContextFromProduct`). No merge logic.
- **Persistence** (`lib/commerce/persistence.ts`): SessionStorage save/load/clear. Clear after handoff.
- **cta-activation.ts**: Contains one merge implementation (base first, then persisted). Used by all homepage sections.
- **Platform components**: Contain duplicate merge logic (persisted first, then base). Bypass `activateLineCta`.
- **cta-contract.ts** (Batch 1): Enriches context with `entrySurface` and product data when building payloads.
- **line-message-builder.ts** and **events.ts**: Consume `CommerceContext` but do not own merge policy.
- PRE-WP00 and PRE-WP00A have identified the inconsistency and locked the target policy.

---

## 4. Problem Statement

The Commerce Context layer lacks a single source of truth for merge policy.

Without Batch 2:
- Attribution (source, campaign, utm) and interaction semantics (entrySurface, intent) will continue to behave inconsistently between homepage and platform.
- Platform duplication will be copied by future surfaces.
- `activateLineCta()` risks becoming a policy container instead of thin orchestration.
- Batch 4 alignment will be forced to reconcile conflicting policies under time pressure.
- Analytics continuity (Batch 3+) will be unreliable.

The problem is not missing features — it is missing governance over the most important cross-surface data contract.

---

## 5. Canonical Merge Principles

1. Current Interaction is the Source of Truth for interaction semantics.
2. Persisted Context is an Attribution Fallback only.
3. Merge logic must exist in exactly one location.
4. All CTA surfaces must consume the same merge policy.
5. **No UI component may implement its own merge logic.**

The final principle is critical for Batch 4 and all future work.

---

## 6. Canonical Merge Policy

**Current Interaction Owns (always wins):**
- entrySurface
- landingPage
- intent
- product
- sku
- timestamp

**Persisted Context May Contribute (only when missing from current):**
- source
- campaign
- utm fields supported by the current CommerceContext shape (medium is represented inside utm)

medium and referrer are deferred unless represented inside existing utm metadata.

**Persisted Must Never Override:**
- current product / sku
- current entrySurface
- current intent
- current landingPage
- current timestamp

**Timestamp Rule:** Always use the current activation timestamp.

**Merge Precedence Rule:** Current context is the base. Persisted values are applied only for the attribution fallback fields when the current context does not provide them.

---

## Current vs Target Merge Behavior Matrix

| Field          | Current Homepage (cta-activation)          | Current Platform (direct handlers)         | Target Canonical Behavior                          | Reason for Target |
|----------------|--------------------------------------------|--------------------------------------------|----------------------------------------------------|-------------------|
| entrySurface   | base wins (current surface)                | base wins (current page)                   | Current always wins                                | Interaction semantics must reflect the actual CTA clicked |
| landingPage    | base wins                                  | base wins                                  | Current always wins                                | Must reflect the page/surface where the action occurred |
| intent         | base wins                                  | base wins                                  | Current always wins                                | Intent is determined at the moment of interaction |
| source         | persisted overrides base                   | base overrides persisted                   | Current wins; persisted fills only if missing      | Current surface should control primary attribution unless absent |
| campaign       | persisted overrides base                   | base overrides persisted                   | Current wins; persisted fills only if missing      | Same as source |
| medium         | persisted overrides base                   | base overrides persisted                   | Current wins; persisted fills only if missing (inside utm) | medium is represented inside utm; follows attribution fallback rule |
| utm            | persisted overrides base                   | base overrides persisted                   | Current wins; persisted fills only if missing      | Preserve full UTM object from current if present |
| product        | base wins                                  | base wins                                  | Current always wins                                | Product context must come from the clicked product |
| sku            | base wins                                  | base wins                                  | Current always wins                                | SKU must match the current product |
| timestamp      | base (current) always wins                 | base (current) always wins                 | Current base timestamp always wins                 | Timestamp must reflect the moment of this interaction |

**Summary**: The target policy enforces that **current interaction semantics win** for all interaction-specific fields. Persisted context serves only as an attribution fallback for historical marketing data (source/campaign/utm) when the current click does not supply it. This resolves the previous inconsistency where homepage and platform had opposite precedence.

---

## 7. mergeCommerceContext() Contract

**Location:** `lib/commerce/context.ts`

**Recommended Signature:**

```ts
export function mergeCommerceContext(
  baseContext: CommerceContext,
  persistedContext?: CommerceContext | null
): CommerceContext
```

**Contract:**
- Pure function (no side effects).
- Returns a new object; never mutates inputs.
- Always sets `timestamp` from `baseContext`.
- For fields in "Current Interaction Owns", `baseContext` value is used.
- For fields in "Persisted May Contribute", use `persistedContext` value only if the corresponding field in `baseContext` is missing/undefined.
- If no persistedContext, return a copy of baseContext with fresh timestamp enforcement.
- Must be the single implementation used by all consumers.

**Example Usage (future):**
```ts
const base = createContextFromProduct(...);
const merged = mergeCommerceContext(base, loadCommerceContext());
```

---

## 8. cta-activation Boundary

- `cta-activation.ts` is **orchestration only**.
- It must:
  - Build base context using official creation helpers.
  - Call `mergeCommerceContext(base, loadCommerceContext())`.
  - Use the merged context when calling `createCtaPayload` or message builders.
  - Delegate to `performLineHandoff`.
- It must **not** contain inline spread logic, attribution decisions, or merge policy.
- All previous comments claiming "persisted has highest priority" will be removed.

---

## 9. Persistence Boundary

- `saveCommerceContext` → handoff → `clearCommerceContext` remains the exact runtime contract.
- Return continuity is explicitly **Future Enhancement** (not in Phase 6C).
- No changes to storage key, lifetime, or adapter contract in Batch 2.
- Persistence layer owns only I/O — not merge policy.

---

## 10. Platform Alignment Boundary

- Platform components (product-hero.tsx, information-cta.tsx, knowledge-cta.tsx, etc.) currently duplicate merge logic.
- **Batch 2 will not touch these files.**
- Platform CTA alignment (migrating them to use the canonical helper via `activateLineCta` or direct canonical call) is deferred to **Batch 4**.
- This blueprint records the debt explicitly so future audits understand the staging.

---

## 11. Scope

- Add `mergeCommerceContext()` to `lib/commerce/context.ts` with full policy documentation.
- Update `cta-activation.ts` to use the canonical helper (orchestration only).
- Add unit-testable policy evidence (before/after merge behavior).
- Update related JSDoc and comments.
- Produce this Blueprint and supporting evidence.

---

## 12. Out of Scope

- Any changes to `components/platform/*` or direct platform CTA handlers.
- Changes to persistence lifetime or `save/clear` behavior.
- Implementation of return continuity.
- UTM auto-capture from URL parameters.
- New `CommerceContext` fields.
- Analytics runtime initialization (Batch 3).
- Any UI, routing, label, or Product Authority changes.
- Touching homepage section files (they already correctly use `activateLineCta`).

---

## 13. Risks & Mitigations

- **Risk**: Incorrect merge precedence chosen, causing attribution loss on return visits.
  - **Mitigation**: Policy explicitly locked in PRE-WP00A and this Blueprint. Current visit semantics win for interaction fields.
- **Risk**: Platform duplication left unaddressed leads to future confusion.
  - **Mitigation**: Future Migration Note (Section 17) makes the staging explicit.
- **Risk**: `cta-activation.ts` grows policy again.
  - **Mitigation**: Strict boundary definition + "No UI component may implement its own merge logic" principle.
- **Risk**: Audit believes Batch 2 should have fixed platform.
  - **Mitigation**: Scope and Future Migration Note are clear.

---

## 14. Success Criteria

Batch 2 succeeds when:
- A single canonical `mergeCommerceContext()` exists in `context.ts`.
- `cta-activation.ts` uses only the canonical helper.
- All 5 Merge Principles are documented.
- PRE-WP00A policy is implemented exactly (current owns listed fields; persisted is fallback only).
- No platform components were modified.
- `save → handoff → clear` persistence lifetime and sequence is unchanged.
- Evidence (policy doc + before/after) is produced.
- `npm run validate` passes.

**Measurable Merge Examples (must be verifiable in implementation):**
- When persisted has `product="old-product"` and current base has `product="nicky-pimpz-boss"` → result must use `"nicky-pimpz-boss"`.
- When persisted has `sku="OLD-001"` and current base has `sku="NPB-001"` → result must use `"NPB-001"`.
- When persisted has `entrySurface="footer"` and current base has `entrySurface="product-grid-card"` → result must use `"product-grid-card"`.
- When current base has no `source` and persisted has `source="google"` → result may use `source="google"`.
- When current base has `campaign="summer2026"` and persisted has `campaign="old-campaign"` → result must keep `"summer2026"`.
- When current base has no `utm` and persisted has `utm={source: "meta"}` → result may include the persisted `utm`.
- `timestamp` in result must always equal the `timestamp` from the current base context (never from persisted).

These examples will be used during Implementation Audit to verify correct policy application.

---

## 15. Implementation Direction

1. Add `mergeCommerceContext()` to `lib/commerce/context.ts` as a pure function implementing the locked policy.
2. Add comprehensive JSDoc including the 5 Merge Principles.
3. Refactor `cta-activation.ts` to build base context, call the helper, then proceed with orchestration.
4. Remove inline merge logic and outdated comments from `cta-activation.ts`.
5. Add minimal evidence (test or documented before/after cases) showing correct merge behavior.
6. Update this Blueprint's traceability references.

All changes must be additive or refactoring within the allowed files only.

---

## 16. Audit Acceptance Criteria

Blueprint Audit must verify:
- Workflow v2.1 and Roadmap alignment.
- PRE-WP00 + PRE-WP00A policy is faithfully transcribed.
- Canonical helper contract is clear and matches locked rules.
- Boundaries for `cta-activation`, persistence, and platform are explicit.
- "No UI component may implement its own merge logic" principle is stated.
- Scope is narrow and does not leak into Batch 4 work.
- Success criteria are measurable.
- Risks and Future Migration Note are present.

Implementation Audit must later verify:
- Only `lib/commerce/context.ts` and `lib/commerce/cta-activation.ts` were modified.
- Merge behavior matches the documented policy.
- End-to-end homepage CTA behavior (labels, routing, LINE handoff sequence) via `activateLineCta` is unchanged. Only internal merge attribution fields follow the new canonical policy.
- No platform components were edited.
- Persistence lifetime is identical.
- `npm run validate` passes.

---

## 17. Future Migration Note

Current platform components still contain duplicated merge logic.

This duplication is accepted temporarily and will be removed during Batch 4 Platform CTA Alignment.

Batch 2 establishes the canonical merge policy only.

---

**Status**: Blueprint Complete

**Next**: Blueprint Audit → SA Approval → Scope Lock → Implementation (Batch 2)

**End of PHASE6C-COMMERCE-CONTEXT-STANDARDIZATION-BLUEPRINT.md**