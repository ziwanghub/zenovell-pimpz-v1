# PRE-WP00A — PHASE 6C BATCH 3: ANALYTICS INTERFACE ALIGNMENT

**Phase**: 6C — Batch 3  
**Milestone**: PRE-WP00A (Strategy Definition)  
**Version**: 1.0  
**Date**: 2026-07-08  
**Status**: Complete  
**Authority**: SA Direction + Independent Audit Feedback

## Executive Summary

This PRE-WP00A defines the canonical strategy for aligning the Analytics Interface with the Commerce layer while preserving strict layering and ownership boundaries.

## 1. Analytics Ownership (Locked)

- **Analytics initialization**: Owned by `lib/analytics/adapters/initialize.ts`. Single call site only.
- **Analytics Dispatcher**: Owned by `lib/analytics/dispatcher.ts` (singleton `analytics`).
- **Adapter Registry**: Owned by `lib/analytics/adapters/adapter-registry.ts`.
- **Analytics Bridge**: Owned by the Analytics layer. This is the **only** module permitted to invoke the Analytics Dispatcher on behalf of commerce events.

## 2. Event Taxonomy Decision

**Recommendation**: Keep `AnalyticsEvents` and `CommerceEvents` as separate taxonomies.

**Justification**:
- AnalyticsEvents = UI interaction taxonomy
- CommerceEvents = Business/commerce conversion taxonomy (LINE_CLICK etc.)

The Analytics Bridge is responsible for any necessary mapping/translation.

## 3. Analytics Bridge Strategy

The Bridge must be the **sole translation layer**.

Recommended location: `lib/analytics/bridge/commerce-analytics-bridge.ts`

Rules:
- Commerce never calls `analytics.track()` directly.
- Only the Bridge may translate `CommerceEventPayload` → `AnalyticsPayload`.
- Bridge contains no business logic or persistence.

## 4. Initialization Strategy

**Canonical location**: `app/layout.tsx`

- Exactly one call.
- Use `initializeAnalyticsAdapters(["noop"])` only.
- Must be idempotent.
- No providers or runtime config expansion in Batch 3.

## 5. Batch 3 Boundary

**Allowed**:
- Analytics core files for interface alignment
- The dedicated Bridge
- `app/layout.tsx` for initialization
- `lib/commerce/events.ts` only if minimal dispatcher wiring to the Bridge is required

**Forbidden**:
- Any platform components
- Any UI changes
- Commerce Context or CTA Contract changes
- Real adapter configuration

## Decision

The strategy defined here forms the basis for the revised Blueprint.

**Decision**: READY_FOR_BATCH_3_BLUEPRINT_REVISION

---

**End of PRE-WP00A-PHASE6C-BATCH3-ANALYTICS-INTERFACE.md**