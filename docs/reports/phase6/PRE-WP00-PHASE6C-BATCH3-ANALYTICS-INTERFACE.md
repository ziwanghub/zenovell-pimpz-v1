# PRE-WP00 — PHASE 6C BATCH 3: ANALYTICS INTERFACE ALIGNMENT

**Phase**: 6C — Batch 3  
**Milestone**: PRE-WP00 (Readiness Assessment)  
**Version**: 1.0  
**Date**: 2026-07-08  
**Status**: Complete  
**Authority**: Independent Blueprint Audit + SA Direction

## Executive Summary

This PRE-WP00 assesses the current state of the Analytics Interface relative to the Commerce layer after Batch 1 (CTA Contract) and Batch 2 (Commerce Context) have closed.

Key findings:
- Analytics and Commerce layers remain disconnected.
- Two separate dispatchers exist (CommerceEventDispatcher and AnalyticsDispatcher).
- No initialization path in app/layout.tsx.
- No defined bridge or ownership for cross-layer translation.
- Risk of future direct coupling if not addressed in the Blueprint.

## Current State Assessment

### Analytics Architecture
- Dispatcher, Registry, and Adapters are in place (from M10 foundation).
- Currently only Noop behavior is active.
- No runtime wiring in the application root.

### Commerce Integration
- CommerceEvents (including LINE_CLICK) are defined and dispatched via NoopCommerceEventDispatcher.
- Events carry rich CommerceContext but have no path to analytics.

### Risks Identified
- P0: LINE conversion events will not be visible to analytics.
- P1: Duplicate event systems and potential naming conflicts.
- P2: Ambiguous ownership leading to future Blueprint revisions.

## Recommendation

Proceed to PRE-WP00A to define:
- Strict layered ownership
- Dedicated Analytics Bridge as the only translation point
- Clear initialization strategy
- Separation of AnalyticsEvents and CommerceEvents

**Decision**: READY_FOR_PRE_WP00A

---

**End of PRE-WP00-PHASE6C-BATCH3-ANALYTICS-INTERFACE.md**