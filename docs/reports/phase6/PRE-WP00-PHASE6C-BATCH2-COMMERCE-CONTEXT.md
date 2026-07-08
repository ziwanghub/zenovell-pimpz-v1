# PRE-WP00 — PHASE 6C BATCH 2: COMMERCE CONTEXT STANDARDIZATION

**Phase**: 6C Batch 2  
**Type**: PRE-WP00 (Read-only Analysis)  
**Date**: 2026-07-08  
**Status**: PASS  
**Authority**: PHASE6C-CTA-CONTRACT-STANDARDIZATION-SCOPE-LOCK.md (Batch 2 section)

## Objective
Perform read-only architecture assessment of the Commerce Context layer to determine readiness for Batch 2.

## Files Inspected
- lib/commerce/context.ts
- lib/commerce/persistence.ts
- lib/commerce/cta-activation.ts
- components/platform/product-hero.tsx
- components/platform/information-cta.tsx
- components/platform/knowledge-cta.tsx
- sections/* (homepage CTA usage via activateLineCta)

## Key Findings

### Current Context Creation
- Centralized creators exist: `createCommerceContext()` and `createContextFromProduct()`.
- Always inject fresh `timestamp`.

### Persisted Context Loading
- `loadCommerceContext()` from sessionStorage.
- Only basic validation (timestamp presence).

### Merge Policy
Two conflicting implementations discovered:

**Homepage (cta-activation.ts)**:
```ts
const context = persisted 
  ? { ...baseContext, ...persisted, timestamp: baseContext.timestamp } 
  : baseContext;
```
Comment claims persisted has highest priority.

**Platform (all three components)**:
```ts
const context = persisted 
  ? { ...persisted, ...base, timestamp: base.timestamp } 
  : base;
```
Current page data wins.

### Duplicated Logic
High duplication of load + create + merge + save + dispatch + open + clear across 4 locations.

### Risks Identified
- P0: Inconsistent attribution between homepage and platform surfaces.
- P1: Documented intent in code does not match actual platform implementation.
- P2: Future batches will amplify the problem.

## Conclusion
Batch 2 is required to standardize the merge policy into a single canonical location. It is **standardizing existing (but conflicting) policy**, not introducing entirely new behavior.

**Decision**: READY_FOR_PRE_WP00A

---

**End of PRE-WP00-PHASE6C-BATCH2-COMMERCE-CONTEXT.md**