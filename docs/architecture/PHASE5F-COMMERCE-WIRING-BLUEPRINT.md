# PHASE 5F — COMMERCE WIRING BLUEPRINT

**Date**: 2026-07-07  
**Phase**: Phase 5F — Commerce Wiring  
**Status**: Blueprint (SA Final — Ready for Blueprint Audit)  
**Baseline**: v2.0 Development Workflow + Phase 5E Knowledge Experience Complete  
**Governing Documents**:
- DEVELOPMENT-WORKFLOW-v2.md (OFFICIAL)
- PHASE5-COMMERCE-EXPERIENCE-BLUEPRINT.md (APPROVED)
- PHASE5D-INFORMATION-EXPERIENCE-BLUEPRINT.md (APPROVED)
- PHASE5E-KNOWLEDGE-EXPERIENCE-BLUEPRINT.md (APPROVED)
- ADR-001: LINE-First Commerce Landing Platform (APPROVED)
- ADR-002: Acquisition Architecture (APPROVED)
- ADR-003: LINE Commerce Architecture (APPROVED)
- Phase 5F PRE-WP00 (PASS)
- Phase 5F PRE-WP00A (PASS)
- REPOSITORY-STRUCTURE-GUIDE.md
- LEAN-REPORTING-POLICY.md

**Objective**: Define the minimal, additive Commerce Wiring strategy that connects the existing Product, Information, and Knowledge surfaces into a consistent Commerce Context flow, activates the foundation contracts, and ensures reliable handoff to LINE — without creating new systems, mutating authorities, or expanding beyond wiring.

---

## 1. Executive Summary

Phase 5F is not about building new surfaces or new commerce features. It is about wiring the three existing surfaces (Product, Information, Knowledge) so that Commerce Context flows reliably from entry to LINE across the entire platform.

Current state (post-5E):
- CommerceContext contract, CTA Contract, LINE Message Builder, Events, and Persistence skeleton exist but are used inconsistently or not at all.
- Each surface creates context manually in its CTA.
- Product uses the builder; Information and Knowledge use ad-hoc messages.
- Persistence and events are dormant.
- No cross-surface continuity.

Phase 5F will standardize usage of existing contracts, activate persistence, wire events on key interactions, and ensure context continuity — all as additive changes.

---

## 2. Commerce Wiring Objectives

- Make every surface build and pass enriched CommerceContext.
- Standardize LINE handoff using the canonical builder where possible.
- Activate and use persistence for continuity.
- Wire events on view and CTA actions.
- Ensure context flows from Homepage → any surface → LINE.
- Achieve consistent attribution without changing existing authorities or contracts.

Primary KPI remains qualified LINE OA Friend acquisition with rich context.

---

## 3. CommerceContext Architecture

CommerceContext (defined in lib/commerce/context.ts) remains the single source of truth for context.

Recommended usage:
- Always create via `createCommerceContext(partial)` or `createContextFromProduct(productData, partial)`.
- Never construct raw objects except inside the create helpers.
- Required field: timestamp (provided by helpers).
- Enrich progressively: base context → product enrichment → surface enrichment → CTA enrichment.

---

## 4. Context Lifecycle

**Capture**
- On page load (server or client): create base context with source, landingPage, entrySurface, intent.
- Capture from URL query params if present (additive helper).
- Load persisted context on entry and merge (highest priority for continuity).

**Enrichment**
- Merge with Product Authority data using createContextFromProduct when product is known.
- Add surface-specific fields (intent defaults: "inquiry" for Product, "research" for Information/Knowledge).
- Enrich at CTA time with exact surface and any UTM.

**Persistence**
- Activate the existing SessionStorage skeleton.
- Save enriched context on every CTA click (and optionally on page view for research surfaces).
- Load on every surface entry and merge into new context.
- Clear on successful LINE handoff or explicit reset.

**Consumption**
- Pass to LINE Message Builder.
- Attach to CtaPayload.
- Include in CommerceEvent payloads.
- Make available to future LINE welcome flow (out of scope for 5F).

---

## 5. CTA Contract Strategy

Use the existing CTA Contract (lib/commerce/cta-contract.ts) as the standard for all product-related CTAs.

- Product surfaces: use `createCtaPayload(product, context, surface)` or the default contract.
- Information and Knowledge: create a thin additive helper (e.g. `createNonProductCtaPayload`) that produces an equivalent CtaPayload shape using the same context + custom message builder.
- Every CTA must return a CtaPayload containing the final enriched commerceContext and lineMessage.

This ensures consistency without breaking the existing Product implementation.

---

## 6. LINE Message Strategy

**Product surfaces**
- Always use `buildLineMessage(product, context, { includePrice: true, includeIntent: true })`.
- Enrich context with product data first.

**Information and Knowledge surfaces**
- Use a consistent thin formatter that includes:
  - Page/Topic title
  - landingPage
  - intent, source, entrySurface, timestamp
  - Optional related product slug if present
- Keep message structure human-readable and context-rich for LINE agents.

Do not duplicate the builder logic. Add a small additive helper in lib/commerce if needed for non-product messages.

---

## 7. Event Strategy

Wire events using existing contracts on all surfaces:

- Page View: buildCommerceEvent("product_view" or equivalent surface view) on mount where appropriate.
- CTA Click: buildCommerceEvent("line_click") or "conversion_start" using buildEventFromCtaPayload when CTA is clicked.
- LINE Click: always dispatch before opening the lineUrl.

Use the existing Noop dispatcher for now. Real adapters come later (Phase 5H scope).

Events must carry the full commerceContext when available.

---

## 8. Persistence Strategy

Activate the existing Session Storage implementation (lib/commerce/persistence.ts):

- On CTA click (before or after building message): saveCommerceContext(enrichedContext)
- On every surface page load: loadCommerceContext() and merge into base context.
- Provide a small platform helper (additive) to getEnrichedContext(base) that loads and merges.
- Clear after successful handoff if desired.

This provides cross-surface and cross-page continuity without new storage mechanisms.

---

## 9. Cross-Surface Flow

**Homepage (frozen)**
- Can capture initial context from ads/UTM and persist on product card click or hero CTA.
- Pass context via links or persistence.

**Product → LINE**
- Capture/enrich at hero and other CTAs.
- Use full builder + persist.

**Information / Knowledge → Product or LINE**
- Load any persisted context on entry.
- Create research-intent context.
- On related product link or CTA: enrich and persist before navigation.
- On direct LINE CTA: use non-product message path + persist.

**LINE**
- Receives rich context in the pre-filled message (as per ADR-003).
- (Storage into LINE profile is out of 5F scope.)

Goal: any user who enters via any surface carries usable context all the way to LINE.

---

## 10. Relationship with Product Authority

- CommerceContext and CTA Contract already depend on Product Authority for product/sku/linePayload.
- 5F only consumes (never mutates) Product Authority.
- Product data remains the single source of truth for commerce facts.

---

## 11. Relationship with Information Authority

- Information pages create "research" context.
- Can reference and enrich with persisted product context when linking to products.
- No mutation of Information Authority.
- Cross-links must carry context via persistence or query params (additive).

---

## 12. Relationship with Knowledge Authority

- Same pattern as Information.
- Knowledge pages are high-value research entry points.
- Must consistently create and persist context.
- Can link to products or information while carrying context.

---

## 13. Relationship with Homepage

- Homepage remains completely frozen (Sections 1–11).
- Non-breaking links and product cards may initiate context capture.
- Any initial UTM/source context captured on homepage should be persisted for downstream surfaces.
- No visual or code changes to homepage.

---

## 14. Implementation Scope

- Standardize context creation across all three surfaces using create* helpers.
- Activate persistence (save on CTA, load on entry).
- Wire events on page view (where sensible) and CTA/LINE click.
- Make Information and Knowledge use consistent message formatting (thin additive helper).
- Update existing CTA components to use CTA Contract where product data is present.
- Ensure context flows from entry → surface → LINE for all surfaces.
- Add minimal platform helpers only if they are thin and reusable.
- One controlled batch following Scope Lock.

---

## 15. Out-of-Scope

- Any changes to Product, Information, or Knowledge Authority data.
- Homepage visual or structural changes.
- Full CommerceContextProvider or global state.
- Real analytics adapters or external dispatchers.
- Checkout, order placement, CRM, or retention logic.
- Phase 5G SEO/sitemap work.
- Phase 5H ad pilots or full attribution verification.
- New surfaces or major UX changes.
- Breaking changes to any existing contract.

---

## 16. Success Criteria

- All three surfaces create context using the official create* helpers.
- Persistence is active and context survives navigation between surfaces.
- Every LINE CTA (product, information, knowledge) carries a rich, consistent context in the message.
- Events are dispatched on view and CTA actions using existing builders.
- CTA Contract is the standard path for product CTAs.
- No regression on existing product, information, or knowledge behavior.
- Validation (lint + typecheck + build) passes cleanly.
- Independent audit can map every change to this Blueprint and the Scope Lock.

---

## 17. Risks & Mitigations

**Risks**
- Inconsistent context if surfaces continue manual object creation.
- Context bloat or stale data if persistence is not cleared appropriately.
- Event noise if too many events are wired without clear value.
- Divergence in LINE message quality between product and non-product surfaces.

**Mitigations**
- Mandate use of create* helpers in Scope Lock.
- Keep persistence simple (session only) and document clear/clear-on-handoff.
- Start with minimal events (view + line_click) only.
- Define a single non-product message template and enforce it.
- Strict "additive only" rule in Scope Lock and audit.

---

## 18. Recommended Implementation Sequence

1. Update all surfaces to use createCommerceContext / createContextFromProduct.
2. Activate persistence: load on page entry, save on CTA.
3. Standardize CTA components to produce CtaPayload (use contract for product, thin helper for others).
4. Wire buildLineMessage consistently (product) and equivalent for non-product.
5. Add event dispatch on key actions using buildCommerceEvent.
6. Add thin cross-surface enrichment helpers if needed.
7. Update generateStaticParams / pages only if context capture from URL is required.
8. Run continuous validation.
9. Prepare for Independent Implementation Audit.

---

## 19. Audit Acceptance Criteria

Independent Implementation Audit must verify:

- Blueprint Compliance Matrix (every section mapped to delivered artifacts).
- Delta vs Blueprint (zero gaps, zero over-implementation or scope creep).
- Scope Lock Verification (only allowed files modified).
- All surfaces now use create* helpers instead of raw objects.
- Persistence is called on CTA and loaded on entry.
- Events are dispatched on at least view and line click.
- Information and Knowledge produce consistent context-rich messages.
- No mutation of any Authority.
- No forbidden files touched.
- Validation PASS.
- No regression on Product, Information, or Knowledge surfaces.

---

## 20. Governing Principles

- Reuse existing contracts (CommerceContext, CTA Contract, LINE Builder, Events, Persistence) as the primary path.
- Additive extensions only. No breaking changes.
- One Batch = One Spoke (Commerce Wiring).
- Context is the thread that connects Homepage → Product/Information/Knowledge → LINE.
- LINE remains the commerce execution layer. The website only qualifies and hands off with rich context.
- Strict adherence to Phase 5 out-of-scope list (no checkout, no CRM, no full analytics adapters).

This Blueprint, together with the Scope Lock, is the binding Architectural Authority for Phase 5F implementation.
