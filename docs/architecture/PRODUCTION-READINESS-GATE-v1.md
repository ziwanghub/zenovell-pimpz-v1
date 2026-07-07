# PRODUCTION READINESS GATE v1

**Date**: 2026-07-07  
**Version**: v1.0  
**Status**: ACTIVE (Prerequisite for Production Launch)  
**Governing Documents**: ADR-001, ADR-002, ADR-003, COMMERCE-FOUNDATION-COMPLETE.md, PHASE5-COMMERCE-EXPERIENCE-SCOPE-LOCK.md, RELEASE-STRATEGY.md  
**Purpose**: Define the minimum criteria for launching the first production version of the ZENOVELL-PIMPZ LINE-First Commerce Landing Platform. This Gate allows incremental release while the long-term Phase 5 roadmap continues.

---

## 1. Context and Principles

The long-term **Roadmap** (Phases 1–8) describes the full architectural evolution toward a mature Commerce Experience Platform, including full Product Landing Pages, Information Pages, Knowledge Platform, Premium Experience, Production Intelligence, and AI Readiness.

The **Release Plan** is separate: Production can and should launch as soon as the V1 Production Gate is satisfied, using an incremental approach.

**Core Principles**:
- Homepage (Sections 1–11) remains frozen and production-stable.
- Commerce Foundation contracts (4A–4E) are complete and must not be modified without ADR.
- Website role = Acquire, Educate, Build Trust, Qualify, Convert to LINE OA Friend.
- LINE OA = primary commerce channel (Consultation, Sales, Retention, Repeat).
- Primary KPI = Qualified LINE OA Friend Acquisition.
- Incremental releases are allowed and encouraged after V1 launch.
- Do not delay production for long-term roadmap items (e.g., full Phase 5A–5H, CMS, Checkout, AI features).

---

## 2. Must Have (Non-Negotiable for v1 Launch)

These items **must** be satisfied before any production deployment:

### Platform Stability
- Frozen Homepage (Sections 1–11) is visually, functionally, and behaviorally stable.
- Mobile / Tablet / Desktop rendering verified across target breakpoints.
- PWA readiness verified (manifest, service worker basics, installability).
- Performance baseline verified (Core Web Vitals targets met on key pages).
- Accessibility baseline verified (WCAG 2.1 AA minimum on homepage and critical flows).

### Commerce & Handoff
- LINE OA CTAs are functional and ready (pre-filled messages via LINE Message Builder).
- Commerce Context Persistence (minimum viable) is implemented and tested for Homepage → LINE handoff.
- Basic Commerce Events are emitting for key interactions (product_view, product_click, line_click, etc.).
- Commerce Context is passed correctly to LINE (product, sku, campaign, source, utm, entrySurface, intent, timestamp).

### SEO & AI SEO Foundation
- SEO metadata (title, description, canonical, Open Graph) implemented on Homepage.
- Basic structured data (JSON-LD for Organization, WebSite, Product where applicable) on Homepage.
- AI SEO foundation ready (semantic HTML, entity clarity, content structure suitable for LLMs on Homepage).
- Sitemap and robots.txt production-ready.

### Ads & Tracking Readiness
- Ads tracking readiness: UTM parameters captured and passed through Commerce Context.
- Event foundation ready for future pixel/adapter integration (no production pixels activated yet).
- Attribution basics via Commerce Context for LINE Friend events.

### Deployment & Operations
- Production deployment pipeline ready (CI/CD, environment separation, rollback capability).
- Monitoring and error tracking in place for production.
- Basic logging and alerting for critical paths (especially LINE CTAs and form submissions if any).

### Compliance & Quality
- Privacy policy and terms accessible.
- No PII leakage in Commerce Context or events.
- All validations pass: lint, typecheck, build, validate.
- Regression on frozen homepage confirmed PASS.

---

## 3. Should Have (Strongly Recommended for v1)

These items are highly recommended before launch but not blockers if the Must Haves are solid and risks are accepted:

- Pilot Product Landing Pages for 1–3 key products (using approved templates from Phase 5 Blueprint).
- Basic dynamic routing for pilot PLPs (`/products/[slug]`).
- Basic content governance process for pilot PLP content.
- Attribution validation in pilot (end-to-end from ad click → LINE Friend using Commerce Context).
- Initial Information Pages (e.g., About, Quality, Shipping) if they significantly improve trust/SEO.
- Performance and accessibility verified on pilot PLPs.
- Basic re-engagement or follow-up content strategy documented for LINE side (per ADR-003).

If these are not complete at launch, they should be prioritized immediately post-launch as incremental releases.

---

## 4. Future / Not Required for v1

Explicitly **not required** for initial production launch:

- Full set of Product Landing Pages (beyond pilot).
- Full Information Pages and Knowledge Platform.
- Premium Experience features (advanced motion, design system polish, accessibility beyond baseline).
- Behavior Intelligence / advanced analytics.
- AI features or LLM integrations.
- CMS or content management tooling.
- On-site Checkout, Payment, Inventory, or full e-commerce.
- CRM integration beyond LINE handoff.
- Marketplace or omnichannel connectors.
- Production-scale ad campaigns (pilot only).
- Server-side rendering optimizations beyond current needs.
- Authentication or user accounts.

These belong to later phases or post-v1 incremental work.

---

## 5. Production Gate Decision Process

1. Implementation team completes all Must Have items.
2. Independent Audit (Gemini or equivalent) verifies compliance.
3. ZZ (Owner) reviews and approves the Gate.
4. Production deployment is authorized.
5. Post-launch: Continue Phase 5 sub-phases as incremental releases (5B, 5C, etc.) with separate audits and gates.

**Rollback Criteria**: If critical issues in Must Have areas are discovered post-launch, a rollback plan must exist and be executable within 1 hour.

---

## 6. Relationship to Phase 5 Scope Lock and Roadmap

This V1 Gate is **orthogonal** to the full Phase 5 Scope Lock.

- Phase 5 Scope Lock defines the long-term architectural work (5A–5H).
- This Gate defines the minimum for safe production launch.
- Teams can launch v1 once the Gate is met, then continue delivering Phase 5 increments safely.

The Roadmap is not cut. Production launch is an early milestone on the roadmap.

---

**End of PRODUCTION READINESS GATE v1**

This document, together with the Phase 5 Scope Lock and Release Strategy, provides clear separation between long-term architecture evolution and production launch criteria. All agents and team members must reference this Gate when discussing "when can we launch".