# M10-P4 Performance Scope Lock

**Date**: 2026-07-06
**Phase**: M10 Foundation Hardening
**Workstream**: WS-04 Performance Hardening
**Status**: ACTIVE
**Governance**: Lightweight Z-MOS Style Governance
**Release Baseline**: v4.1.5-m10-p3d-2-ga4-adapter

## 1. Purpose

This scope lock document exists to clearly define the boundaries of WS-04 Performance Hardening. It prevents overlap with WS-01 Shared UI Primitives, WS-02 Design Tokens, and WS-07 Technical Debt Reduction. It also protects the frozen M9 baseline and the M9.5 platform foundation decisions from premature or out-of-scope changes.

## 2. Current Authority

This document is subordinate to and references:
- M10 Foundation Hardening Blueprint
- Gemini Performance Workstream Scope Conflict Audit
- Current release baseline v4.1.5-m10-p3d-2-ga4-adapter

All implementation in WS-04 must respect these authorities.

## 3. WS-04 Allowed Scope

Allowed in WS-04:
- Hero LCP audit and optimization
- Hero image optimization
- Image loading audit
- Bundle audit
- Hydration audit
- Runtime scroll performance audit
- Paint-cost audit
- CSS duplication review as measurement/report only
- Shadow/scrim performance review as measurement/report only

All work must be measurement, audit, and safe optimization only. No structural or visual redesign.

## 4. WS-04 Forbidden Scope

Forbidden in WS-04:
- LineIcon deduplication
- SectionBadge deduplication
- shared utility extraction
- shared primitive extraction
- design token extraction
- radius normalization
- shadow/glow token normalization
- broad CSS token migration
- Framer Motion removal unless separately approved
- Hero to Server Component conversion
- broad use client reduction
- MobileShell mutation
- frozen section redesign

## 5. Deferred Workstream Mapping

Map deferred items:

- LineIcon deduplication → WS-01 Shared UI Primitives
- SectionBadge deduplication → WS-01 Shared UI Primitives
- Shared utility extraction → WS-01 Shared UI Primitives
- Shadow/radius/token normalization → WS-02 Design Tokens
- Framer Motion removal → WS-07 Technical Debt or separate SA decision
- Hero Server Component conversion → HOLD / future SA decision
- Broad use client reduction → HOLD / future SA decision

## 6. WS-04 Patch Sequence

Recommend:

P4B — Hero LCP Audit + Safe Image Optimization
P4C — Bundle Audit Only
P4D — Hydration Audit Only
P4E — Runtime Scroll / Paint Audit
P4F — Performance Closeout Report

## 7. Regression Rules

Require:
- no UI redesign
- no layout drift
- no frozen section visual changes
- before/after screenshots if any rendered output may be affected
- validation commands for every implementation patch

## 8. Validation

Every patch must run:
- npm run lint
- npm run typecheck
- npm run build
- npm run validate

## 9. Decision

**Decision**:
APPROVED

**Status**:
ACTIVE

This document is the active scope authority for WS-04 Performance Hardening until superseded by SA.
