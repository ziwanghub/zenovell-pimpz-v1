# PHASE 6C — CTA CONTRACT STANDARDIZATION BLUEPRINT

**Date**: 2026-07-08  
**Phase**: Phase 6C — CTA Contract Standardization  
**Status**: Blueprint (Ready for Blueprint Audit)  
**Baseline**: Phase 6A Closed + Phase 6B Closed + Frozen Homepage Visual + Phase 5 Commerce / Platform Foundation + Governance v2.1  
**Governing Documents**:
- WORKFLOW-v2.1.md (ACTIVE)
- DEVELOPMENT-LIFECYCLE.md (ACTIVE)
- PHASE6A-CONVERSION-PATH-HARDENING-BLUEPRINT.md (CLOSED)
- PHASE6A-CONVERSION-PATH-HARDENING-SCOPE-LOCK.md (CLOSED)
- PHASE6B-PLATFORM-ROUTING-BLUEPRINT.md (CLOSED)
- PHASE6B-PLATFORM-ROUTING-SCOPE-LOCK.md (CLOSED)
- ADR-001-LINE-FIRST-COMMERCE-PLATFORM.md (APPROVED)
- ADR-003-LINE-COMMERCE-ARCHITECTURE.md (APPROVED)
- COMMERCE-CONTEXT-PERSISTENCE-BLUEPRINT.md (APPROVED REFERENCE)
- M10-P3-ANALYTICS-FOUNDATION.md (APPROVED REFERENCE)
- Phase 6C PRE-WP00 (PASS)
- Phase 6C PRE-WP00A (PASS)
- SA Decision (2026-07-08): Phase 6C is an Architecture Stabilization Phase, not a feature phase.

**Objective**: Define the minimum additive architecture work required to standardize CTA contract semantics across homepage and platform surfaces, unify contract usage patterns, and stabilize governance boundaries for Commerce Context, persistence, analytics readiness, and activation orchestration — without changing UI behavior, routing behavior, Product Authority, or runtime conversion semantics.

---

## 1. Executive Summary

Phase 6C is a **Contract Layer Standardization** phase.

It is not:
- a UI redesign
- a routing redesign
- a Product Authority redesign
- a persistence behavior redesign
- an analytics production activation phase

Current state after Phase 6A and 6B:
- Homepage CTAs are functional and stable.
- Homepage product discovery now routes to `/products/[slug]` where approved.
- Platform CTAs and homepage CTAs both use the same Commerce Foundation, but usage patterns remain uneven across product and non-product surfaces.
- `activateLineCta()` is currently the thin orchestration point, but policy boundaries need to be made explicit before future phases expand CTA coverage and production readiness.
- Analytics foundation and adapter architecture exist, but production runtime activation remains a separate concern.

Phase 6C will standardize the CTA contract layer so future work can extend safely without mutating runtime semantics already approved in Phase 6A/6B.

This phase should be treated as an **Architecture Stabilization Phase** rather than a feature phase.

---

## 2. Objectives

Phase 6C will:
- Standardize how CTA surfaces map into the CTA Contract and Commerce Context layers.
- Make migration compatibility explicit across homepage, platform, and future surfaces.
- Define a canonical contract boundary so future implementation does not leak policy into UI handlers.
- Clarify analytics runtime boundaries so interface readiness does not become accidental production activation.
- Clarify persistence boundaries so current runtime semantics remain unchanged.
- Protect the `activateLineCta()` helper from becoming a policy layer.

Phase 6C will not:
- change visible CTA behavior
- change homepage or platform routing behavior
- change Product Authority data shape
- change persistence runtime semantics
- introduce production analytics vendor activation

---

## 3. Current Foundation

- **Commerce Context** exists in `lib/commerce/context.ts` and is the canonical contract for CTA context enrichment.
- **CTA Contract** exists in `lib/commerce/cta-contract.ts` and can produce product-aware CTA payloads.
- **Activation Helper** exists in `lib/commerce/cta-activation.ts` and currently orchestrates context creation, persistence save, message build, event dispatch, LINE handoff, and post-handoff clear.
- **LINE Builder** exists in `lib/commerce/line-message-builder.ts` for product and non-product message creation.
- **Persistence** exists in `lib/commerce/persistence.ts`.
- **Commerce Events** exist in `lib/commerce/events.ts`.
- **Analytics Foundation** exists in `lib/analytics/*` with adapter readiness and runtime-neutral interfaces.
- **Homepage** and **Platform** both have working CTA surfaces, but contract usage still reflects phase-by-phase growth rather than a fully standardized pattern.

---

## 4. Problem Statement

The architecture is now functionally complete enough that contract inconsistency has become a bigger long-term risk than missing features.

Without Phase 6C:
- CTA semantics may drift between homepage and platform.
- Future CTA surfaces may bypass the contract layer or overload `activateLineCta()`.
- Persistence, attribution, and analytics policy may be pushed into the wrong layer.
- Production readiness work may accidentally expand runtime behavior under the wrong phase.
- Governance may weaken as more surfaces adopt similar-but-not-identical CTA patterns.

The problem is not that the current system is failing.  
The problem is that the current system needs a standardized contract boundary before future expansion.

---

## 5. Phase Positioning

Phase 6C is an **Architecture Stabilization Phase**.

Its goal is to make Contract, Context, and Governance semantics consistent before:
- Phase 6D (Premium UI / UX)
- Production Readiness
- broader commerce expansion

This means Phase 6C prioritizes:
- semantic consistency
- compatibility
- contract boundaries
- migration safety

over:
- new UI
- new flows
- new business features

---

## 6. In Scope

- Standardization of CTA contract semantics across homepage and platform surfaces.
- Compatibility mapping between current CTA usage patterns and target contract usage patterns.
- Documentation and implementation planning for canonical CTA flow through:
  - CTA Contract
  - Commerce Context
  - Persistence boundary
  - LINE Message Builder
  - Commerce Events
  - Analytics boundary
  - LINE handoff
- Clarification of runtime analytics activation boundaries.
- Clarification of persistence behavior boundaries.
- Clarification of `activateLineCta()` orchestration-only boundary.
- Additive helper/module planning where policy must be moved out of the activation helper in future implementation.

---

## 7. Out of Scope

- Any homepage visual changes
- Any platform visual changes
- Any CTA label changes
- Any CTA routing changes
- Any Product Authority mutation
- Any new product or non-product surfaces
- Any production GA4 / Meta / TikTok / Ads runtime activation
- Any changes to current persistence runtime semantics
- Any redesign of `activateLineCta()` into a policy-heavy architecture layer
- Any changes to Phase 6A or 6B approved behavior

---

## 8. Contract Compatibility Matrix

The following matrix defines migration compatibility from current patterns to the target standardized pattern.

| Component | Current Pattern | Target Pattern | Migration Strategy |
|-----------|-----------------|----------------|-------------------|
| Homepage Product CTA | Surface handler calls `activateLineCta({ product, surface, ... })` directly using existing product-aware data | Product CTA flows through canonical CTA Contract semantics with product-aware payload shape and explicit context boundary | Preserve runtime behavior first. Standardize contract semantics under existing helper entry path. No label, routing, or UI changes. |
| Homepage Non-product CTA | Surface handler calls `activateLineCta({ title, surface, ... })` directly using non-product title/message path | Non-product CTA uses standardized non-product contract semantics parallel to product CTA semantics | Keep existing message/runtime behavior unchanged. Introduce documented target pattern and migrate by additive helper/contract module, not by UI rewrite. |
| Platform Product CTA | Product CTA uses existing product-aware contract/helper flow with page-specific context enrichment | Platform Product CTA aligns to the same canonical product CTA contract semantics used by homepage product CTAs | Preserve page behavior and routing. Normalize semantics and naming only. No UI changes. |
| Platform Non-product CTA | Information / Knowledge CTA behavior uses current approved page-level logic with context + LINE activation | Platform non-product CTA adopts the same canonical non-product contract semantics used by homepage non-product CTAs | Keep current runtime behavior stable. Standardize payload semantics and helper boundary only. |
| Future CTA Surfaces | Likely to follow ad-hoc surface-specific handlers unless constrained | Every future CTA surface enters through canonical CTA contract semantics before activation orchestration | Require future surfaces to map into compatibility-safe contract modules first. No direct policy growth inside `activateLineCta()`. |

Migration principle:

Current  
↓  
Target  
↓  
Migration

The migration path must remain additive and must not break approved behavior from earlier phases.

---

## 9. Commerce Contract Boundary Diagram

Phase 6C standardizes the **Contract Layer** only.

It does **not** redesign:
- UI
- Routing
- Product Authority

Canonical boundary flow:

```text
CTA Surface
  ↓
CTA Contract
  ↓
Commerce Context
  ↓
Persistence Policy
  ↓
LINE Message Builder
  ↓
Commerce Events
  ↓
Analytics
  ↓
LINE Handoff
```

Interpretation:
- **CTA Surface** owns only local interaction attachment.
- **CTA Contract** owns payload semantics and compatibility mapping.
- **Commerce Context** owns context structure.
- **Persistence Policy** owns persistence semantics.
- **LINE Message Builder** owns message composition semantics.
- **Commerce Events** owns commerce event payload construction.
- **Analytics** owns runtime-neutral analytics dispatch interfaces.
- **LINE Handoff** owns the final external handoff.

`activateLineCta()` sits as orchestration between these layers, not as the owner of their policies.

---

## 10. Standardization Strategy

Phase 6C should normalize semantics in this order:

1. Define canonical product CTA contract semantics.
2. Define canonical non-product CTA contract semantics.
3. Align homepage and platform usage patterns to those semantics.
4. Explicitly separate orchestration from policy.
5. Prevent future surfaces from bypassing the standard path.

The standardization target is **semantic consistency**, not implementation novelty.

---

## 11. Analytics Runtime Clarification

Phase 6C may define and stabilize:
- analytics interfaces
- runtime initialization strategy
- adapter readiness

Phase 6C must **not** deliver:
- production GA4 activation
- production Meta activation
- production TikTok activation
- ads production runtime integration

Those remain deferred to **Production Readiness**.

Policy rule:
- interface readiness is allowed
- runtime production activation is not

This boundary exists to prevent accidental runtime expansion under an architecture phase.

---

## 12. Persistence Clarification

Phase 6C must not change current persistence runtime behavior unless explicitly approved by SA.

Current approved runtime behavior remains:

```text
save → handoff → clear
```

This behavior remains unchanged during Phase 6C.

Return continuity is documented as:
- **Future Enhancement**
- **Not a Phase 6C implementation objective**

This means Phase 6C may clarify persistence ownership and semantics, but it must not silently alter runtime continuity behavior.

---

## 13. Activation Helper Boundary

`lib/commerce/cta-activation.ts` must remain:
- orchestration only
- no business rules
- no attribution policy
- no persistence policy
- no analytics policy
- no routing policy

The helper may:
- coordinate calls into existing contract modules
- sequence approved runtime actions
- remain the thin activation entry path

The helper must not:
- become the canonical place where policy decisions accumulate
- absorb contract semantics that belong in dedicated modules
- own migration logic that should live in contract helpers

If policy grows:
- move policy into dedicated contract/helper modules
- do **not** move policy into `activateLineCta()`

---

## 14. Relationship with Homepage

- Homepage behavior remains unchanged.
- Homepage CTA labels remain unchanged.
- Homepage CTA routing behavior remains unchanged.
- Homepage visual structure remains unchanged.
- Homepage product/non-product CTA standardization is semantic only.

Phase 6C is not allowed to repurpose homepage CTA behavior under the guise of standardization.

---

## 15. Relationship with Platform

- Platform behavior remains unchanged.
- Existing platform routes remain unchanged.
- Existing platform CTA behavior remains unchanged.
- Product detail routing and approved platform flows remain untouched.

Phase 6C must align contract semantics without introducing page-behavior drift.

---

## 16. Relationship with Product Authority

- Product Authority remains read-only in effect.
- No Product Authority mutation is part of Phase 6C.
- No field redesign is part of Phase 6C.
- CTA standardization must consume current authority shapes, not redesign them.

If future field normalization is needed, that belongs to a later dedicated authority phase, not 6C.

---

## 17. Relationship with Analytics Foundation

- Analytics foundation remains interface-led and adapter-ready.
- CTA standardization may clarify which payload semantics are required for analytics consistency.
- Runtime production activation stays out of scope.
- CTA semantics should remain compatible with existing analytics event names and payload expectations.

Phase 6C protects the interface boundary so future production activation has a stable contract to plug into.

---

## 18. Risks

- **Helper policy creep**: `activateLineCta()` may attract attribution or persistence policy if boundaries are not enforced.
- **Silent runtime drift**: standardization work may accidentally alter current CTA behavior if semantics are changed too aggressively.
- **Homepage / platform divergence**: product and non-product CTA paths may standardize differently if migration strategy is incomplete.
- **Analytics scope bleed**: runtime adapter activation may slip into Phase 6C if analytics wording is vague.
- **Persistence scope bleed**: return continuity improvements may be introduced without explicit SA approval.
- **Authority drift**: attempts to “clean up” Product Authority during contract work would violate the phase boundary.

---

## 19. Mitigations

- Treat `activateLineCta()` as orchestration only.
- Require explicit compatibility mapping before any contract implementation batch.
- Freeze runtime semantics for CTA behavior, persistence semantics, and routing semantics.
- Keep analytics activation documentation separate from production activation.
- Keep Product Authority explicitly out of scope.
- Require Blueprint-to-Batch traceability for every contract normalization step.

---

## 20. Success Criteria

Phase 6C is successful only when the blueprint and later implementation can prove:

- Homepage behavior unchanged
- Platform behavior unchanged
- Contract semantics standardized
- No UI changes
- No routing changes
- No Product Authority mutation
- No analytics production integration
- No persistence semantic changes

In addition:
- product and non-product CTA semantics are clearly mapped into a common contract strategy
- compatibility migration is explicit and non-breaking
- `activateLineCta()` remains thin and policy-free

---

## 21. Implementation Direction

Implementation must follow:
- Blueprint
- Blueprint Audit
- SA Final Approval
- Scope Lock
- one-batch = one-spoke

Suggested implementation direction:

1. Standardize contract taxonomy and compatibility-safe helper boundaries.
2. Normalize homepage CTA semantic usage without changing visible behavior.
3. Normalize platform CTA semantic usage without changing visible behavior.
4. Validate analytics / persistence / activation boundary integrity.
5. Produce evidence showing unchanged runtime behavior.

This is intentionally stabilization-first, not feature-first.

---

## 22. Audit Acceptance Criteria

Blueprint Audit must verify:
- Workflow v2.1 alignment
- Traceability to Phase 6A and 6B closed baselines
- Contract Compatibility Matrix completeness
- Commerce Contract Boundary Diagram clarity
- Explicit analytics runtime clarification
- Explicit persistence clarification
- Explicit activation helper boundary
- No hidden UI/routing/authority redesign
- Success criteria are measurable and non-ambiguous
- Risks and mitigations are sufficient

Implementation Audit must later verify:
- homepage behavior unchanged
- platform behavior unchanged
- contract semantics standardized as documented
- no analytics production activation
- no persistence semantic change
- no authority mutation

---

## 23. Deferred Items

- Production GA4 activation
- Production Meta / TikTok / Ads activation
- Return continuity redesign
- Product Authority redesign
- CTA label redesign
- UI redesign
- Routing redesign
- Premium UX / motion / layout work
- Production Readiness implementation tasks

---

## 24. Target Architecture After Phase 6

After Phase 6A–6C are complete, the platform architecture is considered **Stable** in the following areas:

- **Architecture** is Stable
- **Homepage** is Stable
- **Commerce Foundation** is Stable
- **Platform Routing** is Stable
- **Product Authority** is Stable
- **CTA Contract** is Stable

**Target Architecture Flow (Post-Phase 6):**

```
Homepage
        │
        ▼
Product Discovery
        │
        ▼
Platform Product Pages
        │
        ▼
LINE Conversion
        │
        ▼
Commerce Context
        │
        ▼
CTA Contract
        │
        ▼
Commerce Events
        │
        ▼
Analytics Interface
        │
        ▼
Platform Foundation
```

After Phase 6, the architecture is locked. No major changes to the above layers will be made without a new ADR approved by SA. Future work will focus on stabilization, production readiness, data-driven iteration, and backend systems (Phase 7+) rather than re-architecting the core flow.

---

## 25. Transition to Production Readiness

After Phase 6, the development focus shifts from **Architecture First** to **Production Readiness**.

Production Readiness is **not** Feature Development and **not** UI Redesign. It is the mandatory gate to ensure the platform is ready for real users and real operations.

**Key Production Readiness Objectives (Post-Phase 6):**

- Analytics Runtime (initialization and basic event delivery)
- SEO Verification (on-page, structured data, sitemap)
- Metadata Verification (titles, descriptions, OG, Twitter cards)
- Search Console setup and verification
- Google Analytics (or equivalent) basic tracking and goals
- Error Monitoring (Sentry or equivalent)
- VPS / Hosting stability
- Domain configuration
- SSL / HTTPS enforcement
- LINE OA verification and basic integration
- Performance Audit (Core Web Vitals, load times)
- Security Audit (basic headers, dependencies)
- Operational Checklist (backups, logging, alerting, runbooks)

Only after passing Production Readiness Gate v1 will the platform be considered eligible for public exposure or paid traffic.

---

## 26. Future Development Policy

After the platform reaches Production and has real usage data, all future development must transition to **Data Driven Development**.

**Data Driven Development means:**

- Decisions are driven by actual user behavior and business metrics:
  - Conversion Rate
  - Scroll Depth
  - Heatmap / Clickmap data
  - Product Interest signals
  - LINE Leads volume and quality
  - CTR on discovery surfaces
  - SEO performance and search queries
  - Retention and repeat behavior

**Not Opinion Driven Development:**

- No major UI/UX, CTA, or flow changes based on personal preference or unvalidated assumptions.
- Every proposed change after Production must be justified by data or a clear hypothesis that can be measured.

This policy protects the stable architecture established in Phase 6 and ensures resources are spent on high-impact improvements.

---

## 27. Phase 7 Entry Criteria

Phase 7 (Backend Systems: Admin, CRM, Order, Inventory, Reporting, Backoffice) will only begin after the following conditions are met:

**Mandatory Phase 7 Entry Criteria:**

- Production is Stable (no critical incidents, consistent uptime)
- Real usage data is available (traffic, sessions, conversions)
- Continuous sales / orders are occurring
- Clear business justification exists for backend systems
- Sufficient data exists to design meaningful Dashboards and Reports
- Sufficient data exists to design CRM and customer lifecycle flows
- Real Order Flow data is available (not simulated)
- The platform has passed Production Readiness Gate v1

**Phase 7 will not start based on assumptions or "future needs."** It will start only when the data from a live, stable production system demonstrates the need and provides the requirements.

Until the above criteria are met, backend development remains out of scope.

---

**Blueprint prepared by**: Codex (Documentation Only)  
**Phase classification**: Architecture Stabilization Phase  
**Next gate**: Independent Blueprint Audit → SA Final Approval → Scope Lock

**End of PHASE6C-CTA-CONTRACT-STANDARDIZATION-BLUEPRINT.md**
