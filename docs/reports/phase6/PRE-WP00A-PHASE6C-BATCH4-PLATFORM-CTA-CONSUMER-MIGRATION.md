# PRE-WP00A — PHASE 6C BATCH 4: PLATFORM CTA CONSUMER MIGRATION

**Phase**: 6C — Batch 4  
**Milestone**: PRE-WP00A (Strategy Definition)  
**Version**: 1.0  
**Date**: 2026-07-08  
**Status**: Complete  
**Authority**: Approved PRE analysis + SA Direction

## Executive Summary

This PRE-WP00A defines the canonical strategy for Phase 6C Batch 4 Platform CTA Alignment, reframed as "Platform CTA Consumer Migration".

## 1. Reframing as Consumer Migration

Batch 4 is defined as:

**Platform CTA Consumer Migration**

NOT

**Platform CTA Refactoring**

The purpose is NOT to redesign Commerce.

The purpose is to migrate all Platform CTA consumers onto the already-approved Commerce Foundation (CTA Contract, canonical merge, thin activation, Analytics Bridge).

This wording better reflects the architecture because the Commerce layer is already frozen and complete. Batch 4 owns only the migration of consumers.

## 2. Consumer Responsibility (Locked)

Platform components are consumers only.

Platform components may ONLY:
- collect page-specific input
- prepare activateLineCta() arguments
- invoke activateLineCta()

Platform components must NOT own:
- mergeCommerceContext
- persistence
- LINE message generation
- CommerceEvent dispatch logic
- Analytics Bridge logic
- performLineHandoff
- cleanup sequence

## Responsibility Matrix

| Responsibility                          | Platform Components | Commerce Foundation |
|-----------------------------------------|---------------------|---------------------|
| Collect page-specific input             | Owner               | —                   |
| Prepare activateLineCta() arguments     | Owner               | —                   |
| Invoke activateLineCta()                | Owner               | —                   |
| mergeCommerceContext                    | Forbidden           | Owner               |
| Persistence (load/save/clear)           | Forbidden           | Owner               |
| LINE message generation                 | Forbidden           | Owner               |
| CommerceEvent dispatch                  | Forbidden           | Owner               |
| Analytics Bridge logic                  | Forbidden           | Owner               |
| performLineHandoff + cleanup            | Forbidden           | Owner               |

## 3. "No Local Business Logic" Rule

After Batch 4 the following logic must disappear from Platform components:
- loadCommerceContext()
- merge logic
- saveCommerceContext()
- window.open()
- clearCommerceContext()
- manual CommerceEvent dispatch
- manual payload creation

The only remaining orchestration entry point must be:

activateLineCta(...)

## 4. Consumer Consistency (Canonical Flow)

Homepage
↓
activateLineCta()
↓
Commerce Foundation
↓
Analytics Bridge
↓
LINE

Platform
↓
activateLineCta()
↓
Commerce Foundation
↓
Analytics Bridge
↓
LINE

This consistency reduces maintenance risk and simplifies Batch 5 regression by providing a single canonical path.

## 5. Migration Strategy

Migrate the three components:
- Product Hero CTA
- Information CTA
- Knowledge CTA

Strategy:
- Replace full local orchestration with activateLineCta() call using identical argument values.
- Preserve exactly:
  - runtime behaviour
  - labels
  - payload
  - persistence
  - analytics
  - handoff sequence
- No user-visible changes.

## 6. Success Criteria

✓ Platform components invoke only activateLineCta()
✓ No duplicated orchestration remains
✓ No duplicated merge logic remains
✓ No duplicated persistence remains
✓ Homepage and Platform share identical orchestration path
✓ Runtime behaviour unchanged
✓ Analytics payload unchanged
✓ Commerce Context unchanged
✓ Product Authority unchanged

## 7. Architecture Risks

P0: Incorrect migration changing runtime behaviour.
P1: Residual duplicated orchestration.
P2: Future divergence between Homepage and Platform.

Mitigations: Strict adherence to PRE-WP00A rules, use of identical arguments, code review against Consumer Responsibility Matrix, and measurable acceptance criteria in Blueprint.

---

**Decision**: READY_FOR_BLUEPRINT

**Next**: Blueprint Draft → Independent Audit → Scope Lock → Implementation

---

**End of PRE-WP00A-PHASE6C-BATCH4-PLATFORM-CTA-CONSUMER-MIGRATION.md**