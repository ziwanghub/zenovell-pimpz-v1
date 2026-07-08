# PRE-WP00A — PHASE 6C BATCH 2: COMMERCE CONTEXT STANDARDIZATION

**Phase**: 6C Batch 2  
**Type**: PRE-WP00A (Strategy Definition)  
**Date**: 2026-07-08  
**Status**: PASS  
**Authority**: PRE-WP00 report + PHASE6C-CTA-CONTRACT-STANDARDIZATION-SCOPE-LOCK.md

## Objective
Define the canonical Commerce Context merge policy before any implementation.

## Locked Canonical Merge Policy

### 1. Current Interaction Ownership
Fields that MUST always be owned by the current click / current CTA:
- entrySurface
- landingPage
- intent
- product
- sku
- timestamp

### 2. Persisted Context Contribution
Fields that persisted context MAY contribute only when missing from current context:
- source
- campaign
- utm fields supported by the current CommerceContext shape

medium/referrer are deferred unless represented inside existing utm metadata.

### 3. Prohibited Behavior
Persisted context must NOT override:
- current product
- current sku
- current entrySurface
- current intent
- current landingPage
- current timestamp

### 4. Canonical Helper Design
- Name: `mergeCommerceContext(baseContext, persistedContext)`
- Location: `lib/commerce/context.ts`

### 5. cta-activation.ts Boundary
Must use the helper while remaining orchestration-only.

### 6. Platform Alignment Boundary
Platform component migration deferred to Batch 4. Batch 2 must NOT touch platform components.

### 7. Persistence Lifetime
- save → handoff → clear remains unchanged.
- Return continuity remains Future Enhancement.
- No session lifetime changes in Batch 2.

### 8. Scope Recommendation
- In Scope: context.ts + cta-activation.ts (policy only)
- Out of Scope: platform components, persistence behavior, UI, routing, Product Authority, analytics runtime.

## Decision
**SA_FINAL_APPROVAL_GRANTED**

**Next**: READY_FOR_BATCH_2_BLUEPRINT

---

**End of PRE-WP00A-PHASE6C-BATCH2-COMMERCE-CONTEXT.md**