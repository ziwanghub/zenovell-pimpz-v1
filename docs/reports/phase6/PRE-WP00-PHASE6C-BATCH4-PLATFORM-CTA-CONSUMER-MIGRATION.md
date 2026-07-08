# PRE-WP00 — PHASE 6C BATCH 4: PLATFORM CTA CONSUMER MIGRATION

**Phase**: 6C — Batch 4  
**Milestone**: PRE-WP00 (Readiness Assessment)  
**Version**: 1.0  
**Date**: 2026-07-08  
**Status**: Complete  
**Authority**: Approved PRE-WP00A + Independent Audit Direction

## Executive Summary

This PRE-WP00 assesses the current state of Platform CTA implementations after Batches 1–3 have closed the Commerce Foundation (CTA Contract, canonical merge, thin activation, Analytics Bridge).

Key findings:
- The three Platform CTA components (product-hero, information-cta, knowledge-cta) still contain full duplicated orchestration logic.
- They perform their own loadCommerceContext, context creation + merge, payload/message building, commerceEventDispatcher.dispatch, save, open, and clear.
- Homepage surfaces already use the standardized `activateLineCta()` path.
- The Commerce Foundation is frozen and stable.
- The task for Batch 4 is Consumer Migration, not foundation redesign.

## Current Platform CTA State

All three components implement near-identical direct flows:
- Manual persisted context loading
- Manual base context creation (using old merge pattern)
- Direct use of builders or payload creation
- Direct dispatch to commerceEventDispatcher
- Direct persistence + LINE open + clear

This duplicates the logic now centralized in `cta-activation.ts` (which uses `mergeCommerceContext`, canonical builders, and `performLineHandoff`).

## Risks Identified

- Continued duplication increases maintenance surface and regression scope for Batch 5.
- Risk of drift between Homepage and Platform paths.
- Platform components currently own logic that should belong exclusively to the Commerce Foundation.

## Recommendation

Proceed to PRE-WP00A to lock:
- Consumer-only responsibility for Platform components
- "No Local Business Logic" rule
- Migration to `activateLineCta()` only
- Strict preservation of runtime behavior

**Decision**: READY_FOR_PRE_WP00A

---

**End of PRE-WP00-PHASE6C-BATCH4-PLATFORM-CTA-CONSUMER-MIGRATION.md**