# M11 — Architecture Checkpoint: LINE-First Commerce Platform

**Date**: 2026-07-06  
**Phase**: M11 Architecture Checkpoint  
**Status**: Review Complete  
**Current Baseline**: v4.1.15-phase4d-cta-contract  
**Review Scope**: Post Phase 4D (Product Authority, Commerce Context, LINE Message Builder, CTA Contract) + ADR-001  

---

## EXECUTIVE_SUMMARY

The project has successfully transitioned from a traditional single-page "Landing Page" to a **LINE-First Commerce Landing Platform** as formalized in ADR-001. The Commerce Foundation layers (4A–4D) are now in place as pure, additive contracts:

- Product Authority (content/products.ts)
- Commerce Context (lib/commerce/context.ts)
- LINE Message Builder (lib/commerce/line-message-builder.ts)
- CTA Contract (lib/commerce/cta-contract.ts)

The current runtime remains a frozen single-page experience inside MobileShell, with all CTAs still using placeholder hrefs ("#line-primary"). No Product Landing Pages or new routes have been implemented yet.

**Overall Assessment**: The foundation is solid and well-governed for its intended scope, but it is intentionally incomplete. Phase 4E (Analytics/Event Integration) and the full Product Landing Platform (Phase 5) are the critical next layers. The architecture is ready to scale into a multi-surface commerce platform, but several risks around content governance, attribution, and omnichannel readiness remain unaddressed.

**Key Recommendation**: Complete Phase 4E + a dedicated Commerce Verification Suite before launching ads at scale or building Product Landing Pages. Do not treat 4A–4D as "done" without 4E and verification.

---

## ARCHITECTURE_STATUS

**Current State**: Single-page landing + pure commerce contracts (no runtime wiring yet).

**Strengths**:
- Strict separation of concerns (Content / Contracts / UI).
- Product Authority as Single Source of Truth.
- Pure functions for context and message building (no side effects).
- Frozen visual baseline protected.
- Clear governance via ADR-001 + Scope Locks + Roadmap.

**Gaps**:
- 4E Commerce Events / Analytics not started.
- No actual Product Landing Pages (still single-page).
- No verification suite for the new contracts.
- CTAs still not producing real Commerce Context + LINE messages in production.
- Attribution and full funnel instrumentation incomplete.

**Maturity**: Foundation contracts are mature (post-4D). End-to-end platform is early (pre-4E / pre-Phase 5).

---

## FOUNDATION_REVIEW

**Is the foundation complete?**

**Partially.** 4A–4D deliver excellent contracts:

- Product data model with SKU, pricing, linePayloadMetadata.
- Commerce Context carrying product/sku/utm/surface/intent.
- Pure LINE Message Builder producing pre-filled text.
- CTA Contract (ICtaContract) that wires the above into payloads.

**Missing architectural layers**:
1. **Event & Analytics Layer (4E)**: Commerce events are defined in theory but not instrumented. No enrichment of existing analytics with full context.
2. **Verification / Test Layer**: No dedicated tests or suite for the commerce contracts (see Commerce Verification section).
3. **Channel Abstraction**: Everything is hard-wired toward LINE. No generic "Channel" or "Handoff" interface for future CRM/checkout.
4. **Attribution & Funnel Layer**: No clear model for tracking Website → LINE Click → Friend → Conversation → Sale across systems.
5. **Content Governance Layer**: Who owns and maintains the rich content that will live on future Product Landing Pages?

**Hidden coupling**:
- Current content files (section-*.ts) still duplicate some product data even after 4A migration.
- CtaDestinations in site-navigation.ts still use static placeholders; the new cta-contract is not yet consumed.
- UTM capture logic is mentioned in blueprints but not implemented in the current single-page app.
- The line-message-builder and cta-contract are not yet called from any surface, creating "dead" code risk until wired.

**Recommendation**: Treat 4A–4D as "contract complete" but not "foundation complete" until 4E + verification + minimal wiring on existing surfaces.

---

## COMMERCE_VERIFICATION_RECOMMENDATION

**Should a dedicated Commerce Verification Suite exist?**

**Yes. Strongly recommended.**

The contracts introduced in 4A–4D (Product, Context, Message Builder, CtaPayload) are the core of future revenue attribution and ad optimization. They must be verified independently of the visual landing page.

**Recommended placement**:
- **Phase 4F — Commerce Verification Suite** (preferred)

Reasons:
- It is still part of the "Commerce Foundation" milestone.
- It can be built purely (contract tests, snapshot tests for message output, context enrichment tests) without touching UI or creating new pages.
- It provides a safety net before Phase 5 (Product Landing Pages) and before heavy ad spend.
- It aligns with the "Production Readiness Checklist" already defined in the Phase 4 Blueprint.

**Alternative**: Fold into Phase 5 as "Platform Verification" — acceptable only if 4E is also moved into Phase 5. Not recommended because verification should gate the contracts themselves.

**What the suite should cover** (minimum):
- Product Authority completeness and SKU consistency.
- Commerce Context round-tripping (creation → enrichment → payload).
- Message Builder output fidelity (exact string matching against templates + context).
- CTA Contract payload correctness for all defined surfaces.
- Backward compatibility (existing landing page data unchanged).
- Edge cases (missing UTM, unknown intent, inactive products).

**Conclusion**: Add Phase 4F before proceeding to heavy implementation of Phase 5 surfaces.

---

## PRODUCT_PLATFORM_REVIEW

**Proposed Architecture** (per ADR-001 and reviews):
Landing (Hook + Routing)
  ├── Hero CTA → Direct LINE (Fast path)
  └── Product Cards → Product Landing Pages (Mini LPs)
        ↓
      LINE OA (with full Commerce Context)
        ↓
      CRM / Sales Team
        ↓
      Order + Repeat

**Evaluation**:

**Scalability**: Good. Product Landing Pages become independent surfaces that can grow with the catalog. The main landing stays lean as the "acquisition engine." Adding more products or categories does not bloat the hero experience.

**Maintainability**: Moderate to Good (if governed). Requires:
- Strong content governance (who writes ingredients, certifications, reviews?).
- Template system for Mini LPs to avoid duplication.
- Clear ownership between landing content vs PDP content.

Risk: Without governance, PDPs will become inconsistent or stale.

**Governance**: Currently weak. The Scope Lock and frozen-sections policy protect the main landing but say nothing about PDP quality or update cadence. A "PDP Governance Charter" will be needed in Phase 5.

**SEO**: Significant improvement over single-page. Each PDP can target long-tail keywords ("Nicky Pimpz Boss ingredients อย.", "B21 stamina review"). Proper structured data (Product, FAQPage, Review) becomes possible.

**AI SEO / Answer Engine Readiness**: Excellent potential. Rich, specific, authoritative content on PDPs (ingredients, manufacturing, certifications) is exactly what AI search engines reward. Current single-page is too shallow.

**Google Ads / Meta / TikTok**:
- Dramatically better Landing Page Experience and Quality Score when ads land on relevant PDPs instead of generic scroll.
- Allows creative-to-page relevance (e.g., "Boss Men" ad → Boss Men PDP).
- Enables better remarketing and audience building per product.

**Risks**:
- Friction increase if navigation between Landing ↔ PDP is not seamless.
- Duplicate content risk if PDP content is too similar to landing sections.
- Mobile performance budget must be managed (images, fonts on many pages).

**Overall**: The proposed model is the correct evolution. It is a "Hub-and-Spoke" where the main landing is the hub for acquisition and PDPs are spokes for conviction.

---

## ADS_REVIEW

**Current State**: Single-page with placeholder CTAs. All traffic (regardless of intent) lands on the same experience.

**Google Ads**:
- Current LPE is acceptable for high-intent brand searches but poor for consideration queries.
- Quality Score will improve significantly once relevant PDPs exist.
- Expect lower CPC and better ad rank after the architecture change.

**Meta Ads & TikTok Ads**:
- Benefit from story-telling and consideration content on PDPs.
- Video ads can drive to specific product pages with matching creative.
- Better post-click engagement metrics (time on page, scroll depth) that algorithms favor.

**Recommendation**: Do not scale paid spend aggressively until at least a pilot set of Product Landing Pages + proper Commerce Context on CTAs is live. Current setup wastes budget on mismatched traffic.

---

## SEO_REVIEW

**Current**: Single page with basic metadata. Limited indexable content depth.

**After Proposed Changes**:
- Strong improvement via dedicated PDPs + supporting pages (About, Quality, Shipping, etc.).
- Opportunity for proper internal linking, sitemaps, and canonicals.
- Each product can own its keyword cluster.

**Gaps Today**:
- No sitemap strategy for future pages.
- No structured data implementation yet.
- Content on current landing is duplicated across sections instead of being canonical on PDPs.

---

## AI_SEO_REVIEW

**Current**: Weak. Single page lacks the depth and entity clarity AI engines prefer.

**Future Strength**:
- PDPs with ingredients, certifications (FDA/อย.), manufacturing, usage, reviews = high E-E-A-T signals.
- Structured Commerce Context (product + sku + intent) can feed knowledge graphs or structured data.
- Pre-filled LINE messages with SKU create clear transactional entities.

**Opportunity**: Position ZENOVELL as the authoritative source for these specific wellness products in Thai + English AI answers.

---

## BUSINESS_REVIEW

The current KPI model (Website → LINE Click → LINE Friend → Conversation → Sale → Repeat) is **correct and aligned** with the business reality:

- Sales happen inside LINE (human + automation).
- The website's job is acquisition + qualification, not transaction.

Strengths:
- Focuses on owned audience (LINE Friends) rather than one-time website conversion.
- Matches Thai market behavior for high-consideration items.

Weaknesses:
- Heavy dependency on LINE as the single channel.
- Attribution is difficult until full Commerce Context + events are wired.
- No visibility into post-friend funnel from the website side.

---

## KPI_RECOMMENDATION

**Core Model is Good. Add these layers:**

**Marketing / Acquisition**
- Cost per Qualified LINE Friend (by surface + intent)
- Landing Page Experience score (Google)
- Quality Score by campaign

**Website (Pre-Click)**
- Hero CTA → LINE Click rate (protect this)
- Product Card → PDP Click rate (new)
- PDP → LINE Click rate (new)
- Commerce Context completeness rate at handoff

**LINE Funnel**
- Add Friend rate from website
- First-message reply rate (using pre-filled context)
- Time from Friend to first sales response

**Sales / Revenue**
- Conversation → Order rate
- AOV by acquisition source + intent
- Repeat purchase rate by first-acquisition source
- LTV:CAC by channel

**Platform Health**
- % of orders carrying valid Commerce Context from website
- Message Builder coverage (all products have working templates)

---

## RISKS

**Architecture Risks**
- Missing Event Layer (4E) creates blind attribution.
- No Channel Abstraction → hard to add checkout/CRM later.
- Content governance gap for PDPs.

**Business Risks**
- Over-reliance on LINE as sole sales channel.
- Ads budget waste until PDPs + context are live.

**Scaling Risks**
- Mobile performance degradation with many image-heavy PDPs.
- Content maintenance burden as catalog grows.

**Operational Risks**
- No verification suite means contract drift between website and LINE data.
- Frozen sections policy does not yet extend to future PDPs.

**Missing Layers**
- Verification Suite (recommended as 4F)
- Attribution / Funnel model
- Channel abstraction
- PDP content governance

**Technical Debt**
- Duplicate product data still exists in some section content files.
- Placeholder CTAs have been in place for a long time; real handoff is overdue.
- UTM capture not yet implemented on the live site.

---

## PHASE_RECOMMENDATION

**Recommended Sequence (respecting current Roadmap)**:

1. Complete Phase 4E — Commerce Event Integration (critical for attribution and ads).
2. Add **Phase 4F — Commerce Verification Suite** (strongly recommended before Phase 5).
3. Phase 5 — Product Landing Platform (start with pilot products: hero + 1-2 high-volume).
4. Parallel: Begin light Google/Meta/TikTok campaigns on existing surfaces using Commerce Context once 4E is wired.
5. Only after verification and pilot PDPs: Consider on-site checkout / membership experiments.

Do **not** launch large ad budgets or build all 6 PDPs before 4E + verification.

---

## FINAL_DECISION

**The Commerce Foundation (4A–4D) is contractually mature but not operationally complete.**

**Proceed to Phase 4E immediately**, followed by a dedicated Commerce Verification effort (either as 4F or early Phase 5).

The Product Landing Platform direction in ADR-001 is the correct long-term architecture. It will significantly improve ads performance, SEO, AI search visibility, and user trust.

**Gate for Phase 5 start**: 
- 4E live
- Verification suite passing
- At least one pilot PDP with full Commerce Context handoff working end-to-end

The project has made excellent disciplined progress. This checkpoint confirms the direction is sound, but the next two steps (4E + Verification) are non-negotiable before scaling.

**M11 Checkpoint: PASSED WITH CONDITIONS** (complete 4E + add verification before Phase 5 execution).

---

*Prepared as M11 Architecture Checkpoint under Lightweight Z-MOS governance. Review only — no implementation.*