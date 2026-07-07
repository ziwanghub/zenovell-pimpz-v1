# PHASE5F-COMMERCE-WIRING-SCOPE-LOCK.md (v1.0)

**Project:** ZENOVELL-PIMPZ-V4-Active  
**Phase:** 5F — Commerce Wiring  
**Milestone:** Commerce Wiring Scope Lock  
**Version:** v1.0  
**Status:** Locked  
**Date:** 2026-07-07  

---

## 1. Scope

This document locks the scope for Phase 5F Commerce Wiring.

It ensures that all implementation stays strictly within the boundaries defined in the approved PHASE5F-COMMERCE-WIRING-BLUEPRINT.md and prevents scope creep.

**Core Objective (from Blueprint):**  
Commerce Wiring only. Standardize and activate the existing Commerce Context, CTA Contract, LINE Message Builder, Events, and Persistence across the three existing surfaces (Product, Information, Knowledge) so that context flows reliably from entry to LINE. This is additive wiring of foundation contracts — no new systems, no authority mutations, no checkout, no CRM.

**In Scope (Locked):**
- Standardize context creation using createCommerceContext() and createContextFromProduct() across all surfaces.
- Activate and use the existing persistence skeleton (save on CTA, load on entry, clear conditions).
- Wire events on page view and CTA/LINE click using existing buildCommerceEvent.
- Standardize LINE handoff: use buildLineMessage for Product; thin additive non-product formatter for Information/Knowledge.
- Update CTA components to use CTA Contract where applicable (product) or consistent payload for non-product.
- Ensure cross-surface context continuity via persistence.
- All work follows Development Workflow v2.0 (Blueprint → Scope Lock → Batch Implementation → Validation → Independent Implementation Audit → SA Final Review).

**Batch Size:** One controlled batch for Commerce Wiring only.

---

## 2. Allowed Files

Only the following files and folders **MAY** be created or modified during Batch Implementation. Any change outside this list is a scope violation.

```
lib/commerce/**
  (additive changes only: helpers, activation of persistence, event wiring)

components/platform/
  - product-hero.tsx
  - information-cta.tsx
  - knowledge-cta.tsx

app/(platform)/
  - products/[slug]/page.tsx
  - information/[slug]/page.tsx
  - knowledge/[slug]/page.tsx

# Minimal platform helpers only if explicitly required by Blueprint for context enrichment/persistence (e.g. small additive in lib/platform/)
# No other files.
```

**Notes on Allowed:**
- Edits limited to wiring points: context creation, persistence calls, event dispatch, CTA standardization.
- Changes must be traceable to specific Blueprint sections (e.g. 4. Context Lifecycle, 5. CTA Contract Strategy, 7. Event Strategy, 8. Persistence Strategy).
- Only additive extensions. No modifications to core contract interfaces unless purely additive.

---

## 3. Forbidden Files

The following are **strictly forbidden** to modify, delete, or create changes in during this phase. Violations will cause immediate Scope Lock failure.

- `app/page.tsx`
- `sections/**` (all homepage sections — FROZEN)
- `content/products.ts` (Product Authority — untouched)
- `content/information.ts` (Information Authority — untouched)
- `content/knowledge/**` (Knowledge Authority — untouched)
- Any Authority data files
- Checkout, order placement, payment, or CRM logic
- Analytics platform adapters or external dispatchers
- Phase 5G features (SEO/sitemap/global)
- Homepage or sections visual/structural changes
- Any files not explicitly listed in Allowed
- Breaking changes to existing contracts (CommerceContext, CTA Contract, LINE Builder, Events, Persistence)

**Additional Protection:**
- No new global providers or state management.
- No scope expansion into full attribution verification or external systems.

---

## 4. Deliverables Matrix

Every deliverable defined in the PHASE5F-COMMERCE-WIRING-BLUEPRINT.md must map to implementation artifacts. The following matrix locks the traceability:

| Blueprint Deliverable                          | Target Files / Artifacts                                      | Notes |
|------------------------------------------------|---------------------------------------------------------------|-------|
| 3. CommerceContext Architecture                | lib/commerce/context.ts (use create* helpers); cta components | Mandate createCommerceContext / createContextFromProduct |
| 4. Context Lifecycle (Capture/Enrichment/Persistence/Consumption) | lib/commerce/persistence.ts; cta components; surface pages | Activate save/load/merge; clear on handoff |
| 5. CTA Contract Strategy                       | lib/commerce/cta-contract.ts; product-hero.tsx, *-cta.tsx   | Use for product; thin additive for non-product |
| 6. LINE Message Strategy (Product / Info / Knowledge) | lib/commerce/line-message-builder.ts (additive helper); cta components | Full builder for Product; consistent formatter for others |
| 7. Event Strategy (View / CTA / LINE Click)    | lib/commerce/events.ts; cta components; pages                 | Dispatch on key actions using build* |
| 8. Persistence Strategy                        | lib/commerce/persistence.ts; cta components                   | Activate skeleton with clear conditions |
| 9. Cross-Surface Flow                          | surface pages + ctas; persistence                             | Persist on CTA, load on entry, enrich on navigation |
| 10-13. Relationships with Authorities & Homepage | (Policy only — no code changes)                               | Consume only; no mutations; frozen homepage protected |
| 14. Implementation Scope                       | All listed Allowed files                                      | One batch, additive only |
| 15-16. Out-of-Scope & Success Criteria         | Scope Lock + post-audit evidence                              | Strict adherence |
| 17. Risks & Mitigations                        | This document + Implementation Checklist                      | SessionStorage lifecycle, consistency |
| 18-19. Sequence & Audit Criteria               | This Scope Lock                                               | Compliance Matrix required |

---

## 5. Batch Boundary

**One Batch = Commerce Wiring only.**

- Phase 5F Commerce Wiring **only**.
- Explicitly excludes:
  - Any changes to Authority data (Product / Information / Knowledge)
  - Homepage or sections/**
  - Checkout / CRM / retention logic
  - Real analytics adapters
  - Phase 5G SEO/sitemap
  - Phase 5H pilots
  - New surfaces or major UX
- Implementation Agent must complete the entire approved scope in one controlled batch.
- Continuous `npm run validate` required.
- Stop immediately on architectural conflict or Scope Lock violation.

Per DEVELOPMENT-WORKFLOW-v2.0 Rule 3.

---

## 6. Validation Requirements

**Mandatory before any handoff or audit:**

```bash
npm run validate
```

Executes:
- lint
- typecheck
- build

Must pass with zero errors. Clean at start of Batch and before Independent Implementation Audit.

---

## 7. Audit Acceptance Criteria

The Independent Implementation Audit **must** verify and produce evidence for:

- **Blueprint Compliance Matrix** — Explicit mapping of every Blueprint section to delivered files/artifacts (use section 4 above as baseline).
- **Delta vs Blueprint** — Clear summary of implemented items, gaps (must be zero), deviations (must be zero or pre-approved).
- **Scope Lock Verification** — Only Allowed Files modified; no Forbidden Files touched.
- **No Regression** — Existing product/info/knowledge behavior, build, and routes unaffected.
- **Validation PASS** — Full `npm run validate` output included.

Audit produces recommendations only. Does not redesign or expand scope.

---

## 8. Exit Criteria

Phase 5F is considered complete only when **all** of the following are satisfied:

- Implementation Complete per Deliverables Matrix and Blueprint
- Validation PASS (`npm run validate`)
- Independent Implementation Audit PASS (Compliance Matrix + Delta + Scope Verification + No Regression)
- SA Final Review (Accept)
- Git Commit
- GitHub Push
- CI PASS
- Working Tree CLEAN

---

## 9. Risks

**Implementation Risks:**
- Inconsistent context if surfaces continue manual object literals instead of create* helpers.
- Stale context if SessionStorage lifecycle (clear conditions) is not properly implemented.
- Divergence in LINE message quality if non-product formatter is not standardized.

**Scope Creep Risks:**
- Touching Authority data while "enriching".
- Expanding into full event adapters or external analytics.
- Modifying frozen homepage or adding global providers.

**Mitigation:**
- Strict Allowed/Forbidden lists.
- Mandate create* helpers and clear conditions in implementation.
- Blueprint Compliance Matrix enforced in Audit.
- All changes must reference specific Blueprint section numbers.
- Pre-audit git diff review against this Scope Lock.

---

## 10. Success Criteria

Exactly as defined in the approved PHASE5F-COMMERCE-WIRING-BLUEPRINT.md (Section 16):

- All three surfaces create context using the official create* helpers.
- Persistence is active and context survives navigation between surfaces.
- Every LINE CTA (product, information, knowledge) carries a rich, consistent context in the message.
- Events are dispatched on view and CTA actions using existing builders.
- CTA Contract is the standard path for product CTAs.
- No regression on existing product, information, or knowledge behavior.
- Validation (lint + typecheck + build) passes cleanly.
- Independent audit can map every change to this Blueprint and the Scope Lock.

---

## Change Control

Any change to this Scope Lock requires:
- Version bump of this document.
- Update to the parent Blueprint (if architectural).
- Re-approval by System Architect.
- New Scope Lock iteration before resuming or expanding Batch.

**Governing Documents:**
- PHASE5F-COMMERCE-WIRING-BLUEPRINT.md (SA Final Approved)
- DEVELOPMENT-WORKFLOW-v2.0 (OFFICIAL)
- PHASE5-COMMERCE-EXPERIENCE-BLUEPRINT.md
- ADR-001, ADR-002, ADR-003
- REPOSITORY-STRUCTURE-GUIDE.md

This Scope Lock is the final gate before Batch Implementation under Workflow v2.0.

**Status:** LOCKED — No implementation may begin until this document is committed and pushed.
