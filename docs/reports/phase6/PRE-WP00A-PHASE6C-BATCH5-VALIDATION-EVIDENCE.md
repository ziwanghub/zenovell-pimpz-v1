# PRE-WP00A — PHASE 6C BATCH 5: VALIDATION & EVIDENCE

**Phase**: 6C — Batch 5  
**Milestone**: PRE-WP00A (Strategy Definition)  
**Version**: 1.0  
**Date**: 2026-07-08  
**Status**: Complete  
**Authority**: Phase 6C Batches 1–4 CLOSED + PRE-WP00 for Batch 5 (COMPLETE)

---

## Executive Summary

Batch 5 is the **final Validation & Evidence** batch of Phase 6C.

Its sole purpose is to verify and prove that the architecture and consumer migration completed in Batches 1–4 are complete, correct, and ready for Phase 6C Closeout and Architecture Freeze.

Batch 5 **must remain strictly**:
- Validation + Regression + Evidence only.
- No redesign.
- No new architecture.
- No feature work.
- No Phase 6D work.

This PRE-WP00A locks the strategy, ownership, scope, and success criteria for Batch 5 before any Blueprint is drafted.

---

## Batch 5 Strategy

Batch 5 is the **Verification Gate** before Architecture Freeze.

Strategy:
- Treat Batches 1–4 as the completed and frozen baseline.
- Perform comprehensive regression to prove that **all CTA surfaces** (Homepage + Platform) now use the single canonical path.
- Collect conclusive evidence that no behavior changes occurred as a result of the stabilization work.
- Prove that the Commerce Foundation is stable and that all consumers are properly aligned.
- Prepare the final evidence package required for Phase 6C Closeout and Architecture Freeze.

Batch 5 does **not** introduce new architecture. Any discovered issues (e.g., missed bypasses) are treated as defect corrections within the existing frozen foundation, not as opportunities for redesign.

---

## Validation Ownership

**Batch 5 owns**:
- Running and documenting all mandatory validation commands (lint, typecheck, build, validate).
- Verifying that the implementation from Batches 1–4 still passes all quality gates.
- Confirming that no new technical debt was introduced during consumer migration.

**Batch 5 does NOT own**:
- Redesigning or improving the foundation.
- Adding new validation mechanisms beyond what is required to prove the current state.

---

## Regression Ownership

**Batch 5 owns**:
- Full regression of **all CTA surfaces**:
  - Homepage: Hero, Product Catalog (grid + final), Featured Product, Trust Bar, FAQ, Final CTA, Footer.
  - Platform: Product Hero (all products), Information CTA, Knowledge CTA.
- Verification that **every** CTA surface invokes `activateLineCta()` (or approved thin wrapper) as the only orchestration entry point.
- Confirmation that no local business logic (load/merge/save/clear/window.open/manual dispatch) remains in any consumer.
- Side-by-side or automated comparison proving functional equivalence of `CommerceContext`, LINE payloads, persistence behavior, and Commerce-originated analytics between Homepage and Platform paths.

**Batch 5 does NOT own**:
- Changing how the canonical path works.
- Adding new CTA surfaces.

---

## Evidence Ownership

**Batch 5 owns**:
- Architecture evidence (code search proving no local business logic, single canonical path).
- Runtime evidence (CommerceContext, payloads, persistence, analytics).
- Validation evidence (full `npm run validate` + manual regression results).
- Traceability evidence (links back to Batches 1–4 artifacts).
- Freeze readiness evidence (checklist confirming all stabilization objectives are met).
- Final SA Review for Phase 6C Closeout readiness.

Evidence must be sufficient to support the decision to proceed to Architecture Freeze.

---

## Canonical Path Verification Strategy

Batch 5 must prove that the following single path is used by **all** CTA surfaces:

```
Any CTA Surface (Homepage or Platform)
        │
        ▼
activateLineCta(...)
        │
        ▼
Commerce Foundation (mergeCommerceContext + canonical builders)
        │
        ▼
Analytics Bridge
        │
        ▼
LINE (handoff + persistence + commerce event)
```

Verification methods:
- Code search across all relevant files for `activateLineCta` usage.
- Confirmation that no surface bypasses it.
- Execution traces or logs showing the path is taken for both Homepage and Platform actions.

---

## CTA Surface Coverage Strategy

Batch 5 must explicitly cover and document coverage for:

**Homepage surfaces**:
- Hero section
- Product catalog (grid cards + final CTA)
- Featured product
- Trust bar
- FAQ
- Final CTA
- Footer (line-order + line)

**Platform surfaces**:
- Product Hero (for all products)
- Information CTA
- Knowledge CTA

For each surface, Batch 5 must produce evidence that it uses the canonical path and that behavior matches the frozen baseline.

---

## Runtime Preservation Strategy

Batch 5 must prove (via evidence) that the following remain functionally equivalent for identical user actions before vs after Batches 1–4:

- `CommerceContext` values (entrySurface, source, campaign, utm, intent, etc.)
- LINE message content
- Persistence sequence and timing (`save → handoff → clear`)
- Commerce-originated analytics payloads and events
- Handoff behavior (window.open to LINE)

No user-visible or conversion-impacting changes are acceptable.

---

## Freeze Readiness Strategy

Batch 5 must produce a clear **Freeze Readiness Checklist** covering:

- All CTA surfaces use the canonical path.
- No local business logic remains in any consumer.
- Commerce Foundation (Contract + Context + Activation + Bridge) is stable.
- All prior Success Criteria from Batches 1–4 are still met.
- No behavior changes from the stabilization work.
- Evidence package is complete and auditable.

Successful completion of Batch 5 + this checklist enables Phase 6C Closeout and Architecture Freeze.

---

## Out of Scope

Batch 5 **does not own**:
- New architecture or redesign of any layer.
- Changes to Commerce Foundation, Analytics Bridge, Context, CTA Contract, or Persistence.
- UI/UX changes (Phase 6D).
- Production Readiness work (Phase 6E).
- Adding new CTA surfaces or features.
- Redesigning the canonical path.

Any discovered issues must be fixed as **defect corrections** using the existing frozen foundation, not as opportunities for new design.

---

## Risks

**P0**: Undiscovered CTA surfaces or entry points that still bypass `activateLineCta()`, leading to inconsistent behavior or attribution after Architecture Freeze.

**P1**: Incomplete regression fails to detect subtle differences in `CommerceContext`, payloads, or analytics between Homepage and Platform.

**P2**: Evidence package is insufficient or poorly structured, making it difficult to support Architecture Freeze or future maintenance.

---

## Decision

**READY_FOR_BATCH_5_BLUEPRINT**

Batch 5 is ready to proceed to Blueprint drafting. The strategy is locked as **pure validation, regression, and evidence collection** against the frozen baseline from Batches 1–4. No new architecture is permitted.

**STOP.**  
Read-only strategy definition only. No implementation. No commits. No pushes.