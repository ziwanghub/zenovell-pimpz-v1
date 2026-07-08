# PHASE 6C — ANALYTICS INTERFACE ALIGNMENT BLUEPRINT

**Date**: 2026-07-08  
**Phase**: Phase 6C — Analytics Interface Alignment (Batch 3)  
**Status**: Blueprint (Ready for Blueprint Audit)  
**Baseline**: Phase 6C Batch 1 CLOSED + Phase 6C Batch 2 CLOSED + PRE-WP00-PHASE6C-BATCH3-ANALYTICS-INTERFACE PASS + PRE-WP00A-PHASE6C-BATCH3-ANALYTICS-INTERFACE PASS + Phase 6A/6B Closed + Governance v2.1  
**Governing Documents**:
- WORKFLOW-v2.1.md (ACTIVE)
- DEVELOPMENT-LIFECYCLE.md (ACTIVE)
- docs/ROADMAP.md (LOCKED)
- PHASE6C-CTA-CONTRACT-STANDARDIZATION-BLUEPRINT.md (CLOSED)
- PHASE6C-CTA-CONTRACT-STANDARDIZATION-SCOPE-LOCK.md (LOCKED)
- PHASE6C-COMMERCE-CONTEXT-STANDARDIZATION-BLUEPRINT.md (CLOSED)
- PHASE6C-COMMERCE-CONTEXT-STANDARDIZATION-SCOPE-LOCK.md (LOCKED)
- docs/reports/phase6/PRE-WP00-PHASE6C-BATCH3-ANALYTICS-INTERFACE.md (PASS)
- docs/reports/phase6/PRE-WP00A-PHASE6C-BATCH3-ANALYTICS-INTERFACE.md (PASS)
- SA Decision (2026-07-08): Phase 6C is an Architecture Stabilization Phase. The Analytics Interface must be aligned in a layered, agnostic manner before Platform Alignment (Batch 4) or Production Readiness.

**Objective**: Define the minimum additive architecture work required to align the Analytics Interface with the Commerce layer through a dedicated Bridge, ensuring Commerce remains analytics-agnostic and Analytics remains commerce-agnostic, while establishing canonical initialization and contracts.

---

## 1. Executive Summary

Phase 6C Batch 3 is an **Analytics Interface Alignment** phase.

After Batch 1 (CTA Contract) and Batch 2 (Commerce Context), the foundation layers are stable. However, the Analytics layer (built during M10) and Commerce events remain disconnected, with duplicate dispatchers and no defined translation path.

Current problems:
- Commerce uses its own `NoopCommerceEventDispatcher` for `LINE_CLICK` etc.
- Analytics uses a separate `AnalyticsDispatcher` + `AdapterRegistry` (currently noop-only).
- No initialization in `app/layout.tsx`.
- No bridge between `CommerceEventPayload` and `AnalyticsPayload`.
- Direct coupling risk if UI components or commerce code start calling `analytics.track()` directly.

**Clarification (governance recovery):**
- Existing UI analytics.track() calls for AnalyticsEvents remain permitted.
- Batch 3 does not refactor existing UI analytics instrumentation.
- Restriction applies **only** to Commerce-originated analytics emission.
- No Commerce module may call analytics.track() directly.
- Commerce-originated analytics must pass exclusively through the dedicated Analytics Bridge.
- Only the dedicated Analytics Bridge may invoke the Analytics Dispatcher on behalf of Commerce.

Batch 3 will:
- Lock the layered architecture with an explicit **Analytics Bridge** as the sole translation point.
- Keep `AnalyticsEvents` (UI taxonomy) and `CommerceEvents` (business taxonomy) separate.
- Define contracts for Dispatcher and Bridge.
- Establish single initialization point in `app/layout.tsx` (noop only).
- Ensure Commerce never knows about adapters, and Analytics never knows about CommerceContext semantics.

This phase is strictly **Interface Alignment / Stabilization**. It does not implement real vendor adapters, platform CTA changes, or any UI/routing work.

---

## 2. Objectives

Batch 3 will:
- Define and document the canonical layered flow: Commerce Event Dispatcher → Analytics Bridge → Analytics Dispatcher → Adapter Registry → Adapters.
- Establish the Analytics Bridge as the only translation layer (CommerceEventPayload → AnalyticsPayload).
- Define clear ownership boundaries.
- Specify initialization strategy (single call site in `app/layout.tsx` with ["noop"]).
- Produce contracts, flow diagrams, and audit criteria.
- Guarantee that the system remains additive and both layers stay agnostic of each other.

Batch 3 will not:
- Change any UI behavior or refactor existing UI analytics.track() instrumentation (existing UI calls for AnalyticsEvents remain permitted).
- Modify Commerce Context, CTA Contract, or persistence.
- Implement real GA4/Meta configuration.
- Touch platform components (Batch 4 work).
- Expand runtime configuration or add providers.
- Allow any Commerce module to call analytics.track() directly (must go through Bridge).

---

## 3. Existing Foundation

**Analytics Layer (M10 foundation)**:
- `lib/analytics/dispatcher.ts` — `AnalyticsDispatcher` singleton with `track(event, payload)`. Delegates to `adapterRegistry.getAll()`.
- `lib/analytics/events.ts` — `AnalyticsEvents` (UI-focused: HERO_CTA_CLICK, PRODUCT_CLICK, etc.).
- `lib/analytics/types.ts` — `AnalyticsPayload`, `AnalyticsAdapter`.
- `lib/analytics/adapters/`:
  - `adapter-registry.ts` — Central registry with always-present NoopAdapter.
  - `initialize.ts` — `initializeAnalyticsAdapters(names = ["noop"])` (resets + registers via factory).
  - `adapter-factory.ts`, `noop-adapter.ts`, `ga4-adapter.ts`, `base-adapter.ts`.
- No call to `initializeAnalyticsAdapters` currently exists in `app/layout.tsx`.
- Analytics is used in some homepage sections for UI events only.

**Commerce Layer (Batch 1 + Batch 2)**:
- `lib/commerce/events.ts` — `CommerceEvents` (LINE_CLICK, PRODUCT_CLICK, etc.), `CommerceEventPayload`, `buildCommerceEvent`, `NoopCommerceEventDispatcher`, `commerceEventDispatcher`.
- `lib/commerce/cta-activation.ts` — Dispatches `LINE_CLICK` via commerce dispatcher, then performs `save → open → clear`.
- Platform components (product-hero, information-cta, knowledge-cta) also dispatch commerce events directly.
- No connection to `lib/analytics`.

**Current State**: Two parallel, disconnected event systems. Commerce events are intentionally noop. Analytics has no commerce awareness and is not initialized at runtime.

---

## 4. Problem Statement

Without a defined layered interface:
- Commerce code may start calling `analytics.track()` directly (tight coupling).
- Analytics will become aware of CommerceContext internals.
- Duplicate event taxonomies and dispatch logic will proliferate.
- When real adapters are enabled, LINE_CLICK conversions will have no path to analytics.
- Platform Alignment (Batch 4) will be unsafe because there is no stable interface to target.
- Production Readiness (Phase 6E) will require re-architecting the core event flow.

The problem is not missing features — it is the absence of a canonical, layered, agnostic Analytics Interface.

---

## 5. Architecture Principles

1. **Layered Architecture** — Commerce must never call analytics directly. All translation goes through the Analytics Bridge.
2. **Agnostic Layers** — Commerce is analytics-agnostic. Analytics is commerce-agnostic.
3. **Single Translation Point** — The Analytics Bridge is the only place that converts `CommerceEventPayload` → `AnalyticsPayload`.
4. **Separate Taxonomies** — `AnalyticsEvents` (UI) and `CommerceEvents` (business) remain distinct enums. The Bridge performs mapping.
5. **Single Initialization Owner** — `initializeAnalyticsAdapters()` is called once from `app/layout.tsx`.
6. **Safe Defaults** — NoopAdapter is always the fallback. Adapters must never throw.
7. **Additive Only** — All changes in Batch 3 must be additive or refactoring within allowed boundaries.
8. **One Batch = One Spoke** — Batch 3 owns only Analytics Interface Alignment.

---

## 6. Ownership Matrix (Locked)

| Concern                    | Owner                                      | Responsibility |
|----------------------------|--------------------------------------------|--------------|
| CommerceEvent production   | Commerce Layer                             | Produces CommerceEvents; owns CommerceContext |
| Commerce Event Dispatcher  | lib/commerce/events.ts                     | Dispatches CommerceEvents only; owns no analytics logic |
| Analytics Bridge           | lib/analytics/bridge/commerce-analytics-bridge.ts | **Sole owner of ALL translation**. Only module allowed to invoke Analytics Dispatcher from commerce path. Pure CommerceEventPayload → AnalyticsPayload mapping. No business logic. No persistence. |
| Analytics Dispatcher       | lib/analytics/dispatcher.ts                | Canonical analytics interface. Delegates only to Adapter Registry. |
| Adapter Registry           | lib/analytics/adapters/adapter-registry.ts | Owns adapter lifecycle only. Guarantees safe Noop fallback. |
| Adapters                   | lib/analytics/adapters/*                   | Vendor-specific mapping only. |
| Initialization             | app/layout.tsx                             | Single call site. |

**Locked Rule**:  
"No Commerce module except the dedicated Analytics Bridge may invoke the Analytics Dispatcher."  
Commerce Layer and Commerce Event Dispatcher **never** import or call `analytics.track()`, Adapter Registry, or any adapter directly.

---

## 7. Analytics Bridge Contract (Locked)

**Preferred (and locked) Location**:  
`lib/analytics/bridge/commerce-analytics-bridge.ts`

**Rationale**: 
- The Bridge belongs to the **Analytics layer**.
- Commerce depends only on an abstract dispatcher contract.
- Analytics owns the responsibility of translating commerce payloads into its own payload shape.
- This prevents any analytics dependency leaking into the Commerce layer.

**Contract**:
```ts
// lib/analytics/bridge/commerce-analytics-bridge.ts
export function bridgeCommerceEventToAnalytics(
  commerceEvent: CommerceEventPayload
): AnalyticsPayload {
  // Pure translation ONLY.
  // Maps CommerceEventPayload (incl. CommerceContext) → AnalyticsPayload.
  // No business logic.
  // No persistence.
  // No UI knowledge.
}
```

**Locked Rules**:
- The Analytics Bridge is the **only** module allowed to invoke the Analytics Dispatcher for commerce events.
- No Commerce module (except this Bridge) may import or call the Analytics Dispatcher, `analytics.track()`, or Adapter Registry.

---

## 8. Dispatcher Contract

**Analytics Dispatcher** (`lib/analytics/dispatcher.ts` — already mostly correct):
- `track(event: AnalyticsEvent, payload?: Partial<AnalyticsPayload>): void`
- Enriches safe fields (timestamp, path).
- Delegates exclusively to `adapterRegistry.getAll()`.
- Never contains commerce-specific logic.

**Commerce Event Dispatcher** remains in commerce layer (current `NoopCommerceEventDispatcher` or future real one). 
It **must** delegate translation to the Analytics Bridge if analytics emission is required. It must never call the Analytics Dispatcher directly.

---

## 9. Adapter Registry Contract

Already implemented in `lib/analytics/adapters/adapter-registry.ts`:
- Always guarantees at least one adapter (Noop).
- `register`, `unregister`, `getAll`, `reset`, `hasRealAdapters`.
- Used by both `initializeAnalyticsAdapters` and the dispatcher.
- Must remain free of commerce or business logic.

---

## 10. Initialization Strategy (Locked)

**Canonical and Only Location**: `app/layout.tsx` (RootLayout).

**Requirements (must be followed exactly)**:
- Exactly **one** initialization call in the entire application.
- Must be called from `app/layout.tsx` only.
- Must pass `["noop"]` only during Batch 3.
- The `initializeAnalyticsAdapters()` function must be idempotent.
- No React providers, no context providers, no runtime configuration expansion.
- Must be safe for Next.js App Router lifecycle (works in both server and client boundaries without side effects on first render).

**Recommended Pattern** (to be added in Batch 3):
```tsx
import { initializeAnalyticsAdapters } from "@/lib/analytics/adapters";

// In RootLayout
initializeAnalyticsAdapters(["noop"]);
```

Any other placement (providers, bootstrap modules, per-page, etc.) is explicitly forbidden for Batch 3.

---

## 11. Event Flow Diagram

```
UI Component / CTA Surface
        │
        ▼  (UI events)
AnalyticsEvents (e.g. HERO_CTA_CLICK)
        │
        ▼
analytics.track(...)  →  Analytics Dispatcher
                                      │
                                      ▼
                               Adapter Registry
                                      │
                                      ▼
                               Noop / GA4 / ...

Commerce CTA (activateLineCta)
        │
        ▼
buildCommerceEvent(CommerceEvents.LINE_CLICK, { context, ... })
        │
        ▼
Commerce Event Dispatcher
        │
        ▼  (via Analytics Bridge)
bridgeCommerceEventToAnalytics(...)
        │
        ▼
analytics.track(CommerceEvents.LINE_CLICK or mapped, payload)
        │
        ▼
Analytics Dispatcher → Adapter Registry → Adapters
```

Key: Commerce never imports adapters. Bridge is the only coupling point.

---

## 12. Scope

- Define and document the layered Analytics Interface (Dispatcher + Bridge + Registry contracts).
- Specify the Analytics Bridge as the sole translation layer.
- Define initialization strategy and call site.
- Align event taxonomy separation + mapping rules.
- Produce evidence of agnostic layers.
- Update relevant documentation references only.

---

## 13. Out of Scope

- Any changes to platform components (Batch 4).
- Modification of Commerce Context or CTA Contract.
- Adding real GA4/Meta configuration or keys.
- UI, routing, or label changes.
- Persistence or return continuity work.
- Production analytics deployment.

## Batch Boundary (Measurable Acceptance Criteria)

Batch 3 **must not** leak into Batch 4 work. The following are explicit, verifiable acceptance criteria:

- No files under `components/platform/**` or `sections/**` are modified.
- No changes to `content/products.ts` or any Product Authority files.
- No changes to `lib/commerce/context.ts`.
- No changes to `lib/commerce/cta-contract.ts`.
- `activateLineCta` API and behavior remain 100% unchanged.
- `saveCommerceContext` / `clearCommerceContext` lifetime and sequence remain unchanged.
- No new analytics configuration beyond `["noop"]` in initialization.
- Any work outside Analytics Interface Alignment.

---

## 14. Allowed Files (Aligned with Locked Architecture)

Only these may be created or modified:

**Analytics Layer**
- lib/analytics/dispatcher.ts (alignment only)
- lib/analytics/events.ts (taxonomy clarification / mapping support)
- lib/analytics/adapters/initialize.ts (minor improvements)
- lib/analytics/adapters/adapter-registry.ts (alignment only)

**Analytics Bridge (Locked Location)**
- lib/analytics/bridge/commerce-analytics-bridge.ts   ← Preferred and locked implementation location

**Commerce Layer (if integration required)**
- lib/commerce/events.ts   ← Explicitly allowed **only** for wiring the Commerce Event Dispatcher to the Analytics Bridge. All actual translation logic must live in the Bridge.

**Runtime Wiring**
- app/layout.tsx (exactly one call: `initializeAnalyticsAdapters(["noop"])`)

**Documentation**
- This Blueprint and reference updates.

**Note**: Dispatcher wiring in `lib/commerce/events.ts` (if needed) is limited to calling the Bridge. No analytics logic may be added directly in commerce files.

---

## 15. Forbidden Files

- sections/**
- components/** (including platform)
- app/(platform)/**
- content/**
- lib/commerce/context.ts, cta-contract.ts, persistence.ts, line-message-builder.ts
- lib/analytics/adapters/ga4-adapter.ts (no config changes)
- Any direct `analytics.track()` calls from commerce modules outside the dedicated Bridge.
- Any placement of initialization outside `app/layout.tsx`.

---

## 16. Risks & Mitigations

- **Risk**: Developers bypass the Bridge and call analytics.track() directly from commerce code.
  - **Mitigation**: Strict Scope Lock + Blueprint principles + code review gates. Bridge is the only documented path.
- **Risk**: Initialization placed in wrong location causing timing or double-init issues.
  - **Mitigation**: Single documented owner (app/layout.tsx). Make initialize idempotent.
- **Risk**: Event name collision between AnalyticsEvents and CommerceEvents.
  - **Mitigation**: Keep enums separate. Bridge explicitly maps (or namespaces) commerce events.
- **Risk**: Bridge grows business logic.
  - **Mitigation**: Contract explicitly states "No business logic. Pure translation only."

---

## 17. Success Criteria

Batch 3 succeeds when:
- The layered architecture (Commerce Dispatcher → Bridge → Analytics Dispatcher → Registry → Adapters) is documented and implemented.
- Commerce layer produces events without any knowledge of analytics adapters or `analytics.track`.
- Analytics layer receives events via the Bridge without any knowledge of `CommerceContext` internals.
- `initializeAnalyticsAdapters(["noop"])` is called from `app/layout.tsx`.
- `AnalyticsEvents` and `CommerceEvents` remain separate.
- Noop is the guaranteed default.
- All changes are additive.
- `npm run validate` passes.
- Evidence demonstrates both layers are agnostic.

**Measurable Architecture Criteria** (must be verifiable):
✓ Commerce imports no Analytics Dispatcher.
✓ Commerce imports no Adapter Registry.
✓ Analytics Bridge (`lib/analytics/bridge/commerce-analytics-bridge.ts`) is the **only** module translating `CommerceEventPayload`.
✓ Dispatcher imports no `CommerceContext`.
✓ Registry imports no Commerce modules.
✓ No direct `analytics.track()` calls outside the Analytics Dispatcher and the dedicated Analytics Bridge.
✓ No platform CTA files are modified.
✓ No Product Authority changes.
✓ No Commerce Context or CTA Contract changes.
✓ No `activateLineCta` behavior changes.
✓ No persistence lifetime or sequence changes.

---

## 18. Audit Acceptance Criteria

Blueprint Audit must verify:
- Layered architecture with explicit Bridge is defined and justified.
- Ownership Matrix is clear and matches the diagrams (especially the locked "No Commerce module except the Bridge..." rule).
- AnalyticsEvents and CommerceEvents remain separate with defined mapping rules.
- Initialization is documented as single point in `app/layout.tsx` only, with all required constraints (idempotent, noop-only, no providers).
- Bridge is locked at `lib/analytics/bridge/commerce-analytics-bridge.ts`.
- Allowed/Forbidden lists are strict and match One Batch = One Spoke.
- No hidden coupling between Commerce and Analytics.
- Batch Boundary measurable criteria are present and clear.
- Success criteria are measurable.

Implementation Audit must later verify:
- No direct `analytics.track()` calls from commerce or UI for LINE_CLICK outside the Bridge.
- Bridge is the only translation point.
- Initialization call exists and uses only ["noop"].
- Dispatcher delegates exclusively to Registry.
- No UI, routing, or Product Authority changes occurred.
- `npm run validate` passes.

---

## 19. Future Migration Notes

- Batch 4 (Platform Alignment) will migrate platform CTAs to use the canonical activation path, which will then flow through the Bridge.
- When real adapters are enabled (Phase 6E), only the Registry + Adapters change. Commerce, Bridge, and Dispatcher contracts remain stable.
- If a unified event taxonomy is ever desired, it can be achieved by extending the Bridge mapping — never by merging the two enums.
- The Bridge can later support additional consumers (e.g. internal logging, future attribution systems) without changing Commerce or Analytics.

---

**Status**: Blueprint Complete

**Next**: Blueprint Audit → SA Approval → Scope Lock → Implementation (Batch 3)

**End of PHASE6C-ANALYTICS-INTERFACE-ALIGNMENT-BLUEPRINT.md**