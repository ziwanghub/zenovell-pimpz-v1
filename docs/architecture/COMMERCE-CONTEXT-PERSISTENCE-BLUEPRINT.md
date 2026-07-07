# COMMERCE CONTEXT PERSISTENCE BLUEPRINT

**Date**: 2026-07-07  
**Phase**: Pre-Phase 5 Architecture Extension  
**Status**: Blueprint (Ready for Independent Audit)  
**Baseline**: v4.1.15-phase4d-cta-contract (Commerce Foundation COMPLETE) + PHASE5-COMMERCE-EXPERIENCE-BLUEPRINT.md (APPROVED)  
**Governing Documents**: ADR-001, ADR-002, ADR-003, M11 Architecture Checkpoint, COMMERCE-FOUNDATION-COMPLETE.md, Phase 5 Blueprint  
**Objective**: Define a channel-independent, secure, and future-proof strategy for persisting Commerce Context across multiple pages in the Commerce Experience Platform, ensuring no loss of acquisition data during navigation while maintaining strict separation from runtime implementation.

---

## 1. Executive Summary

The Commerce Foundation (4A–4E) and the three ADRs establish that **Commerce Context** is the critical data thread that carries product, SKU, campaign, UTM, source, landing page, entry surface, intent, and timestamp from the website into LINE (and future channels).

In the current single-page architecture, Commerce Context is created in-memory and immediately consumed for LINE handoff. This works because there is no client-side navigation between distinct pages.

Phase 5 introduces a multi-surface platform:

- Homepage (frozen hub)
- Product Landing Pages (`/products/[slug]`)
- Information Pages
- Knowledge Pages

Navigation between these surfaces will cause loss of in-memory Commerce Context unless persistence is designed.

**Why this Blueprint now (Critical per Architecture Health Audit)**:
- Without persistence, Commerce Context captured on the Homepage (or via ads) will be lost when the user clicks through to a Product Landing Page.
- This breaks:
  - Pre-filled LINE messages with accurate context
  - Attribution back to specific ad/landing surface/intent
  - Personalization and qualification data for the sales team
  - Future offline conversion feedback loops
- Fixing this after Phase 5 implementation begins would require expensive refactoring of routing, templates, and handoff logic.

This Blueprint defines the **persistence model** at the architecture level only. It does **not** prescribe implementation details (no hooks, no code, no storage libraries). It provides the contract, lifecycle, ownership, security, failure handling, and future compatibility so that Phase 5A can prepare the skeleton safely, with actual wiring deferred until after audit and scope lock.

---

## 2. Architecture Goals

The persistence strategy must support the full Commerce Experience Platform while remaining aligned with the LINE-First principle and channel independence:

**Supported Surfaces**:
- Homepage (acquisition hub)
- Product Landing Pages (consideration layer)
- Information Pages (trust/compliance)
- Knowledge Pages (education/SEO)
- LINE OA (primary handoff target)
- Future Checkout (if/when enabled)
- Future CRM / external systems
- Offline Conversion feedback to ad platforms (Google, Meta, TikTok, etc.)

**Non-Functional Goals**:
- **No Context Loss**: Once captured on any surface, the context must survive client-side navigation to other surfaces within the same tab/session.
- **Channel Independence**: Persistence must work identically regardless of whether the final destination is LINE, native checkout, or a future marketplace.
- **Context Integrity**: The same Commerce Context object (or faithful replica) must be readable by the LINE Message Builder, CTA Contract, and future event/analytics layers.
- **Minimal Surface Impact**: Homepage (frozen) and early Phase 5 pages must not require behavior changes to support persistence.
- **Auditability & Debuggability**: Context must be inspectable (e.g., via dev tools) at every stage.
- **Future-Proof**: Design must accommodate server-side rendering, cookies, or server sessions in Phase 6+ without breaking Phase 5 consumers.

**Primary Success Metric**: Every Commerce Context captured on the Homepage or a Product Landing Page must be fully available and accurate when the user reaches the LINE handoff CTA on any surface.

---

## 3. Commerce Context Lifecycle

Commerce Context follows a defined lifecycle that must be supported by the persistence layer:

1. **Capture**  
   Created on the Homepage (via Hero or Product Card interaction) or on a Product Landing Page using `createCommerceContext()` or `createContextFromProduct()`. Enriched with UTM, entrySurface, intent, etc.

2. **Validate**  
   Immediately after creation: verify required fields (product or sku, timestamp) and that the referenced product exists in Product Authority.

3. **Persist**  
   Store the validated context so it survives navigation to other pages.

4. **Read**  
   On any subsequent page (PLP, Information, Knowledge), retrieve the context for use in rendering, personalization, or CTA enrichment.

5. **Update**  
   Allow enrichment as the user navigates (e.g., change entrySurface from "product-card" to "plp-hero", add or override intent based on on-page behavior). Updates must be merged, not overwritten.

6. **Expire**  
   Automatically expire after a defined TTL (e.g., 30–60 minutes of inactivity or end of browser session/tab close). Expiration must be graceful.

7. **Clear**  
   Explicit clear on:
   - Successful LINE handoff (context has been consumed)
   - User explicitly resets or starts a new journey
   - Error states (invalid product, etc.)

The persistence mechanism must support all transitions without the consumer knowing the storage details.

---

## 4. Persistence Model

Four logical layers with clear responsibilities:

**Capture Layer**
- Responsible for initial creation and validation.
- Lives on pages where context can originate (Homepage, PLPs).
- Uses existing pure creators from Commerce Context module.
- Must attach the context to the persistence layer immediately after creation.

**Persistence Layer**
- The storage mechanism (see Storage Strategy).
- Must support read/write/update with the full `CommerceContext` shape.
- Must be the single place that knows the storage medium.
- Must handle TTL/expiration and cleanup.

**Consumption Layer**
- Any code that needs the context: LINE CTA rendering, pre-filling the Message Builder, enriching analytics events, personalizing page content, building structured data.
- Must read via a stable accessor (e.g., `getCurrentCommerceContext()`) that hides the storage details.
- Must treat the returned context as read-only or explicitly update via the persistence layer.

**Cleanup Layer**
- Responsible for expiration and explicit clearing.
- Can be time-based (TTL), event-based (successful handoff), or user-initiated.
- Must not leave stale contexts that could cause incorrect pre-fills on future visits.

This model ensures that Phase 5 pages can consume context without knowing whether it came from sessionStorage, a future cookie, or server session.

---

## 5. Storage Strategy

**Recommended for Phase 5: Session Storage**

**Rationale**:
- Survives client-side navigation within the same tab (required for Homepage → PLP flow).
- Automatically cleared when the tab/window is closed (good security and privacy hygiene; no long-term storage of even non-PII commerce metadata).
- Simple API, synchronous, no network.
- Sufficient for the Phase 5 scope (multi-page experience on one device/browser tab).
- Aligns with "no PII" and "commerce metadata only" constraints.
- Easy to implement as a thin wrapper around the existing `CommerceContext` type.

**Why not other options in Phase 5**:
- **localStorage**: Persists across tab closes and browser restarts — unnecessary and increases privacy surface for commerce intent data.
- **Cookies**: Better suited for future server-side needs or cross-tab sharing. Adds complexity (size limits, httpOnly considerations) not required for Phase 5 client-only navigation.
- **React Context alone**: Does not survive page navigation (unmounts on route change in SPA or full page load).
- **Server Session / Database**: Premature for Phase 5. Increases complexity, requires auth or anonymous session management, and is better reserved for Phase 6+ when actual user accounts or checkout may appear.
- **URL Parameters only**: Fragile for deep navigation, limited size, visible in address bar, not suitable as the sole mechanism for rich context.

**Migration Path**:
- Phase 5 uses Session Storage as the default persistence adapter.
- Future phases can introduce a `PersistenceAdapter` interface so the storage backend can be swapped (cookie, server session, etc.) without changing consumers.

The actual storage key should be namespaced and versioned (e.g., `zenovell_commerce_context_v1`) to allow clean upgrades.

---

## 6. Ownership

**Create**:
- Homepage (Hero CTA and Product Card interactions)
- Product Landing Pages (primary CTA or secondary actions)
- Potentially Information/Knowledge pages if they contain strong product CTAs

**Update**:
- Any surface that the user interacts with after initial capture (e.g., user changes product interest on a PLP, or intent is refined).
- The persistence layer must support safe merge/update.

**Consume**:
- LINE CTA components (to build pre-filled message via LINE Message Builder)
- Any personalization logic on PLPs or other pages
- Future event tracking (Commerce Events from 4E)
- Structured data generation
- Future checkout or CRM handoff

**Clear / Expire**:
- Successful LINE handoff (context has been consumed into the message)
- Explicit user action (e.g., "Start over")
- Expiration policy
- Error recovery (invalid context)

The Commerce Context module (from Phase 4B) remains the owner of the shape and creation logic. The persistence layer is only responsible for storing and retrieving instances of that shape.

---

## 7. Security

**Strict Constraints** (non-negotiable):

- **No PII**: Never store name, email, phone, address, or any personally identifiable information. Commerce Context contains only product, sku, campaign, source, utm, landingPage, entrySurface, intent, and timestamp.
- **No Authentication Data**: No tokens, session IDs, or login state.
- **No Payment Data**: No card details, order totals that could be sensitive, or payment methods.
- **Commerce Metadata Only**: The persisted object must be a faithful representation (or safe subset) of the `CommerceContext` interface defined in Phase 4B.

**Additional Protections**:
- Storage key should be obfuscated or namespaced to avoid easy inspection or collision by other scripts.
- On read, always re-validate against current Product Authority (the referenced product/sku must still exist and be active).
- Do not persist the entire raw `Product` object if it contains UI fields that could grow large; prefer lightweight references (slug + sku) and re-hydrate from Product Authority when needed.
- Expiration is mandatory; no indefinite storage.

These rules ensure that even if storage is compromised, only non-sensitive commerce intent data is exposed.

---

## 8. Failure Strategy

The persistence layer must handle common failure cases gracefully so that the user journey is never broken and the fallback still leads to a usable LINE handoff.

**Missing Context**:
- On a Product Landing Page or other surface, if no persisted context is found:
  - Fall back to URL parameters (if any were passed).
  - Or default to the product of the current page (for direct PLP access).
  - Still allow the user to reach a LINE CTA, but with reduced context (the message will be less personalized).

**Expired Context**:
- If timestamp is older than the defined TTL, treat as missing.
- Clear the storage.
- Fall back as above.
- Optionally show a non-intrusive message ("Your session has expired — we've pre-filled based on the product you're viewing").

**Invalid Product** (sku not found in Product Authority):
- Clear the invalid context.
- Fall back to current page's product or a safe default.
- Log for monitoring (in future instrumentation).

**Broken UTM / Partial Data**:
- Preserve whatever is valid.
- The LINE Message Builder and CTA Contract must tolerate partial context gracefully (they already do in Phase 4 design).

**General Principle**: Never block the user from reaching LINE because of a persistence failure. Degraded context is acceptable; a broken journey is not.

---

## 9. Future Compatibility

The persistence design must not paint the system into a corner for later phases.

**LINE**:
- Current primary consumer. Context must be fully available at the point the LINE CTA is clicked so the Message Builder can produce an accurate pre-filled message.

**Native Checkout (future)**:
- If on-site checkout is ever introduced, the persisted context must be available to pre-fill product selection, pricing, and source attribution.

**CRM**:
- When exporting or syncing to external CRM, the context (especially product/sku + original campaign/utm) must be exportable.

**Marketplace**:
- If the brand sells on Shopee/Lazada/etc., the original website acquisition context should be linkable to those orders for unified attribution.

**Other Messaging Platforms**:
- The same context shape must be usable if the handoff target changes or expands (e.g., WhatsApp, Messenger) via the Channel Abstraction in ADR-003.

**Technical Path**:
- Phase 5: Session Storage (client-only).
- Phase 6+: Introduce `PersistenceAdapter` abstraction. Possible backends: cookie (for server round-trips), server-side session (tied to anonymous or logged-in identity), or even URL + server reconstruction.
- All consumers continue to use the same read/update/clear interface.

---

## 10. Relationship with Existing Documents

**ADR-001 (LINE-First Commerce Platform)**:
- Reinforces that Commerce Context is the handoff payload.
- Persistence is the mechanism that keeps context alive until the handoff occurs across multiple pages.

**ADR-002 (Acquisition Architecture)**:
- Context is captured on the Homepage or PLPs (as defined in landing strategy).
- Persistence enables the multi-surface model without losing acquisition signals.

**ADR-003 (LINE Commerce Architecture)**:
- Context arrives at LINE intact.
- Channel Abstraction and Offline Conversion Feedback depend on the context surviving the full website journey.

**Commerce Foundation (4A–4E)**:
- Product Authority provides the product data.
- Commerce Context defines the shape.
- CTA Contract and Message Builder consume it at handoff time.
- Commerce Events will eventually carry the same context for analytics.

**Phase 5 Blueprint**:
- Explicitly calls out that Commerce Context must be preserved across Homepage ↔ PLP ↔ Information ↔ Knowledge navigation.
- This Blueprint is the detailed answer to that requirement.

Persistence is the "glue" that makes the multi-surface vision in Phase 5 actually work with the contracts built in Phase 4.

---

## 11. Out of Scope

This Blueprint is **architecture and contract definition only**. Explicitly excluded:

- Any implementation code (no React hooks, no `useEffect`, no storage wrappers).
- Actual storage code or library choices beyond the recommended strategy.
- Runtime wiring of persistence into CTAs, pages, or navigation.
- Analytics or event dispatch integration (Phase 4E events exist but are not connected here).
- Any changes to the frozen Homepage (Sections 1–11).
- Server-side rendering or authentication-related session management.
- Concrete TTL values or key naming (these are implementation details).
- Migration or backward-compatibility code for existing single-page behavior.

These items are intentionally deferred to the Scope Lock and implementation phases so that the architecture can be audited cleanly first.

---

**End of Blueprint**

This document closes the last identified critical architectural gap before Phase 5 begins. It ensures that the Commerce Context — the single most important data structure connecting acquisition to LINE commerce — survives the multi-page experience without loss of fidelity or violation of the channel-independent principle.

Next steps (per user guidance):
1. Independent Audit of this Blueprint.
2. Phase 5 Scope Lock (explicitly allowing preparation for persistence in 5A but forbidding actual wiring).
3. Then begin 5A Platform Structure safely.

All future surfaces must treat persisted Commerce Context as a first-class citizen equivalent to the in-memory version used in the current single-page flow.