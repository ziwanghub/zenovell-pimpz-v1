# PHASE 5 — COMMERCE EXPERIENCE PLATFORM SCOPE LOCK

**Date**: 2026-07-07
**Phase**: Phase 5 — Commerce Experience Platform
**Workstream**: Commerce Experience Platform
**Status**: ACTIVE
**Governance**: Lightweight Z-MOS Style Governance
**Release Baseline**: v4.1.15-phase4d-cta-contract
**Prerequisite**:
- docs/architecture/ADR-001-LINE-FIRST-COMMERCE-PLATFORM.md (APPROVED)
- docs/architecture/ADR-002-ACQUISITION-ARCHITECTURE.md (APPROVED)
- docs/architecture/ADR-003-LINE-COMMERCE-ARCHITECTURE.md (APPROVED)
- docs/architecture/COMMERCE-FOUNDATION-COMPLETE.md (APPROVED)
- docs/architecture/PHASE5-COMMERCE-EXPERIENCE-BLUEPRINT.md (APPROVED)
- docs/architecture/COMMERCE-CONTEXT-PERSISTENCE-BLUEPRINT.md (APPROVED)
- docs/architecture/PRODUCTION-READINESS-GATE-v1.md (ACTIVE)
- docs/architecture/RELEASE-STRATEGY.md (ACTIVE)
- Independent Audit of Phase 5 Blueprint (PASS)
- Independent Audit of Commerce Context Persistence Blueprint (PASS)

---

## 1. Purpose

This Scope Lock document formally authorizes and bounds the implementation of Phase 5 — Commerce Experience Platform for the ZENOVELL-PIMPZ LINE-First Commerce Landing Platform.

It locks the architecture defined in the Phase 5 Blueprint, ADRs 001-003, Commerce Foundation Complete, the Commerce Context Persistence Blueprint, the V1 Production Readiness Gate, and the Release Strategy so that implementation can proceed safely, predictably, and without scope creep.

The lock protects:
- The frozen visual, DOM, and behavioral baseline of Sections 1–11 (Homepage)
- Existing MobileShell and GlobalHeader contracts
- All Commerce Foundation contracts (Product Authority, Commerce Context, LINE Message Builder, CTA Contract, Commerce Events)
- The LINE-First principle (website = acquisition/qualification; LINE OA = commerce execution)
- Channel independence of Commerce Context
- Entity-driven architecture powered by Product Authority as Single Source of Truth

All Phase 5 implementation work **must** stay within the boundaries defined here. Any deviation requires a new Scope Lock amendment or ADR.

---

## 2. Objectives

Phase 5 transforms the current single-page LINE-First Landing Page into a multi-surface **Commerce Experience Platform** while strictly preserving the frozen homepage and all prior architectural decisions.

Specific objectives:
- Enable dedicated Product Landing Pages (Mini Landing Pages) for consideration traffic.
- Introduce Information Pages and Knowledge Pages for trust, SEO, and AI SEO.
- Establish entity-driven routing and content architecture.
- Preserve and extend Commerce Context across all surfaces.
- Optimize for SEO, AI SEO, Google Ads, Meta Ads, and TikTok Ads.
- Maintain 100% backward compatibility with the existing frozen homepage.
- Prepare (but not activate) infrastructure for future Commerce Context persistence.

Phase 5 does **not** move commerce execution out of LINE OA. LINE remains the primary channel for consultation, sales, and retention.

---

## 3. In Scope (Allowed)

The following sub-phases are explicitly authorized. Work is strictly limited to the "Allowed Work" listed for each. No work outside these is permitted.

### Phase 5A — Platform Structure
**Allowed Work**:
- Create directory and basic file structure for new surfaces under app/ (e.g., products/, information/, knowledge/).
- Define shared layout primitives or page shells that respect Mobile First and existing design system (no changes to existing MobileShell or GlobalHeader).
- Establish entity loading patterns that consume Product Authority (`content/products.ts`) as the Single Source of Truth.
- Create basic page skeletons (empty or placeholder components) for routing tests.
- Prepare (but do not implement or activate) placeholders for Commerce Context persistence (e.g., file structure or interface stubs only).
- Update sitemap generation skeleton and basic metadata helpers (no actual SEO implementation yet).

**Explicitly Forbidden in 5A**:
- Any implementation of dynamic routes or [slug] pages.
- Any wiring of Commerce Context, persistence, or events.
- Any changes to homepage (app/page.tsx or sections/).
- Any CTA, navigation, or runtime changes.

### Phase 5B — Dynamic Routing
**Allowed Work**:
- Implement dynamic route files using Next.js App Router (e.g., app/products/[slug]/page.tsx, app/information/[slug]/page.tsx, app/knowledge/[slug]/page.tsx).
- Create routing logic that maps slugs to Product Authority entities.
- Implement basic generateStaticParams or server-side data fetching for known products.
- Ensure routes can receive and read (but not yet persist or write) Commerce Context from URL or future persistence layer (preparation only).
- Add basic error handling for unknown slugs.

**Explicitly Forbidden in 5B**:
- Wiring any CTA or LINE handoff logic.
- Implementing full templates or rich content.
- Modifying frozen homepage or existing sections.
- Activating any persistence mechanism.

### Phase 5C — Product Landing Page Template
**Allowed Work**:
- Build the reusable Product Landing Page (Mini LP) template with required sections:
  - Hero
  - Benefits
  - Ingredients
  - How to Use
  - Certifications
  - Reviews
  - FAQ
  - LINE CTA (using existing LINE Message Builder contract only — no new wiring)
  - Related Products
  - Structured Data (JSON-LD skeleton)
- Consume Product Authority for core data (title, sku, pricing, linePayloadMetadata, etc.).
- Consume Commerce Context for personalization of CTAs and content (read-only).
- Ensure template is mobile-first and uses existing design system primitives.
- Create supporting components that are purely presentational.

**Explicitly Forbidden in 5C**:
- Any changes to homepage sections or Hero.
- Implementing persistence or writing Commerce Context.
- Adding analytics events or pixels.
- Changing any existing CTA behavior on the homepage.

### Phase 5D — Information Pages
**Allowed Work**:
- Create templates and pages for core Information content (About, Quality/Certification, Privacy, Shipping, Contact).
- Use entity-driven pattern where applicable.
- Include appropriate LINE CTAs that can consume Commerce Context (read-only).
- Add basic structured data and SEO metadata (title, description, canonical).
- Link appropriately to homepage and relevant PLPs.

**Explicitly Forbidden in 5D**:
- Any modification to frozen homepage.
- Full Commerce Context persistence wiring.
- Ads or analytics integration.

### Phase 5E — Knowledge Pages
**Allowed Work**:
- Create initial Knowledge Page templates for high-value educational content.
- Entity-driven consumption of Product Authority for related products.
- Strong focus on semantic HTML, headings, and structured content suitable for SEO/AI SEO.
- Include contextual LINE CTAs.
- Internal linking strategy to PLPs and Information pages.

**Explicitly Forbidden in 5E**:
- Changes to frozen sections.
- Any runtime or CTA wiring beyond read of context.

### Phase 5F — Commerce Wiring
**Allowed Work**:
- Wire Commerce Context reading (via persistence or URL) into PLPs, Information, and Knowledge pages for CTA enrichment.
- Use existing LINE Message Builder and CTA Contract to generate context-aware messages (no modification to those contracts).
- Ensure all new surfaces can pass Commerce Context to LINE handoff.
- Prepare (but do not activate in production) persistence layer hooks as defined in the Persistence Blueprint (skeleton only).
- Add basic event emission points using Commerce Events contract (from 4E) for future Phase 5G/H.

**Explicitly Forbidden in 5F**:
- Any changes to homepage CTAs or behavior.
- Implementation of analytics adapters or pixels.
- Full persistence activation or server-side sessions.
- Checkout or payment logic.

### Phase 5G — SEO / AI SEO
**Allowed Work**:
- Implement full metadata, JSON-LD (Product, Offer, Review, FAQPage, Breadcrumb, Organization), canonicals, and sitemaps for all new surfaces.
- Internal linking strategy across Homepage, PLPs, Information, and Knowledge.
- Optimize for Core Web Vitals and mobile performance.
- Ensure entity-rich, semantic content suitable for AI search.
- Use Product Authority data for consistent structured data.

**Explicitly Forbidden in 5G**:
- Any visual or DOM changes to frozen homepage.
- Ads implementation.

### Phase 5H — Pilot Ads Validation
**Allowed Work**:
- Limited, controlled pilot campaigns (Google, Meta, TikTok) using the new surfaces.
- Verification that Commerce Context is correctly passed from website surfaces to LINE.
- Validation of full attribution loop (ad click → surface → LINE Friend → (future) sale).
- Measurement of LPE, Quality Score, and conversion rates by surface.
- Documentation of learnings for full rollout (no full scale).

**Explicitly Forbidden in 5H**:
- Production-scale ad spend.
- Any changes to contracts or frozen areas.
- Implementation of full Commerce Verification Suite (deferred per M11 recommendation).

---

## 4. Out of Scope (Forbidden)

The following are **explicitly forbidden** throughout all of Phase 5:

- Homepage redesign or any visual/DOM changes to Sections 1–11.
- Hero redesign or changes to frozen section contracts.
- Modification of MobileShell, GlobalHeader, or shared layout primitives beyond what is strictly necessary for new pages.
- Any changes to Product Authority contracts, Commerce Context contracts, CTA Contract, LINE Message Builder, or Commerce Events.
- Analytics adapter implementation, production pixels (Google, Meta, TikTok), or full event wiring beyond skeleton preparation.
- Checkout, payment, or direct e-commerce flows on the website.
- CRM integration, authentication, database, CMS, or server APIs.
- LINE Automation, Rich Menu changes, or any LINE-side implementation (governed by ADR-003).
- Marketplace or omnichannel connectors.
- Any work that violates the LINE-First principle or channel independence of Commerce Context.

No implementation outside the explicitly allowed work per sub-phase is permitted.

---

## 5. Frozen Areas

The following are protected and may not be modified without a new Scope Lock or ADR:

- ADR-001, ADR-002, ADR-003 (all APPROVED)
- COMMERCE-FOUNDATION-COMPLETE.md
- Homepage (app/page.tsx and all Sections 1–11 visual, DOM, and behavioral contracts)
- MobileShell and GlobalHeader contracts
- Shared Design System / UI Primitives (WS-01)
- Product Authority (content/products.ts and its contracts)
- Commerce Context (lib/commerce/context.ts)
- LINE Message Builder (lib/commerce/line-message-builder.ts)
- CTA Contract (lib/commerce/cta-contract.ts)
- Commerce Events (lib/commerce/events.ts)
- Existing single-page routing and placeholder CTA behavior on the homepage
- Content separation model and frozen section content structures (unless explicitly extended per allowed work)

---

## 6. Dependencies

Phase 5 depends on (and must not break):
- Commerce Foundation (4A–4E complete)
- Commerce Context Persistence Blueprint (APPROVED)
- ADR-001, ADR-002, ADR-003 (all APPROVED)
- M11 Architecture Checkpoint (PASSED)
- Frozen homepage baseline and existing contracts

Phase 5 must preserve all of the above. Any new work must be additive or strictly within the entity-driven, context-aware, LINE-first model.

---

## 7. Deliverables

For each sub-phase, the following are expected (minimum):

- **5A**: Platform directory structure, basic page skeletons, entity loading pattern documentation, persistence skeleton stubs (no activation).
- **5B**: Working dynamic routes for /products/[slug], /information/[slug], /knowledge/[slug]; routing logic tied to Product Authority; error handling for unknown entities.
- **5C**: Complete, reusable Product Landing Page template with all required sections; integration points for Commerce Context (read-only); JSON-LD skeleton.
- **5D**: Information Page templates and core pages with appropriate CTAs and basic SEO.
- **5E**: Knowledge Page templates and initial high-value pages optimized for SEO/AI SEO.
- **5F**: Commerce Context reading and enrichment wired into all new surfaces; LINE handoff using existing contracts; basic event emission points.
- **5G**: Full metadata, JSON-LD, canonicals, sitemaps, internal linking, performance optimizations, semantic content.
- **5H**: Pilot campaign documentation, attribution verification results, LPE/QS measurements, lessons learned report.

All deliverables must pass the Validation Requirements below.

---

## 8. Validation Requirements

For every sub-phase and at every release checkpoint:

- `npm run lint` — PASS (zero new warnings treated as errors)
- `npm run typecheck` — PASS
- `npm run build` — PASS (production build)
- `npm run validate` — PASS

Additional:
- No visual, DOM, or behavioral changes to the frozen homepage (manual + automated regression where possible).
- All new pages must be mobile-first and respect existing design tokens.
- Commerce Context must be readable (when prepared) without breaking existing in-memory behavior on the homepage.

---

## 9. Exit Criteria

Phase 5 is considered complete only when:

- All sub-phases 5A–5H have been implemented, independently audited, released, and promoted via CI.
- The Commerce Experience Platform (Homepage + PLPs + Information + Knowledge) is live and passing validation.
- Full Commerce Context flow from every surface to LINE is verified (via pilot or simulation).
- SEO / AI SEO / structured data is implemented and measurable.
- Pilot ads show improved LPE, Quality Score, and attribution using the new surfaces.
- All deliverables listed above are complete and documented.
- The platform remains 100% compliant with ADRs 001–003, frozen homepage, and all Architecture Principles.
- Independent audit of the full Phase 5 has passed.
- Commerce Foundation + Phase 5 is formally declared complete before any Phase 6 work.

---

## 10. Architecture Principles (Must Preserve)

All Phase 5 work must strictly preserve:

- LINE-First (website acquires and qualifies; LINE executes commerce)
- Entity Driven (Product Authority as Single Source of Truth)
- Product Authority, Commerce Context, CTA Contract, LINE Message Builder, Commerce Events contracts (no modifications)
- Channel Independence of Commerce Context
- Mobile First
- Hub and Spoke model (Homepage as hub, PLPs/Information/Knowledge as spokes)
- SEO First and AI SEO Ready
- Ads Ready (surface mapping for relevance)
- Pure Contracts (no runtime coupling in foundation layers)
- Frozen homepage and all prior Scope Locks / ADRs

---

**End of Scope Lock**

This document is binding. Implementation outside the explicitly allowed work per sub-phase, or any violation of Frozen Areas or Architecture Principles, is not permitted. All future Phase 5 work must reference this Scope Lock, the Phase 5 Blueprint, and the three ADRs.

Next authorized step after approval of this Scope Lock and Independent Audit: Phase 5A Platform Structure only.