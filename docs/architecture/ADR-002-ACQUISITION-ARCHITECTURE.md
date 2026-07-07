# ADR-002: Acquisition Architecture for the LINE-First Commerce Landing Platform

**Date**: 2026-07-06  
**Status**: Proposed  
**Decision Makers**: Chief System Architect (in alignment with M11 Architecture Checkpoint and prior reviews)  
**Baseline**: v4.1.15-phase4d-cta-contract  
**Supersedes**: None (builds upon ADR-001)  
**Related**: ADR-001, PHASE4-COMMERCE-FOUNDATION-BLUEPRINT.md, M11-ARCHITECTURE-CHECKPOINT.md, PHASE4-IMPLEMENTATION-ROADMAP.md

---

## Executive Summary

ADR-001 established the strategic shift from a traditional Landing Page to a **LINE-First Commerce Landing Platform**, where the website's primary output is a qualified LINE OA Friend rather than an on-site transaction.

This ADR-002 defines the **Acquisition Architecture** — the governing model for how the platform acquires, qualifies, educates, and converts traffic into LINE Friends. It covers traffic strategy, landing surfaces, navigation, SEO/AI-SEO, paid media (Google, Meta, TikTok), content governance, measurement, and attribution.

It provides the missing "Acquisition" counterpart to ADR-001's "Commerce" foundation, ensuring that Phase 5 (Product Landing Platform / Commerce Experience) and all future marketing efforts are built on a consistent, intentional model.

**Key Decision**: The website is a multi-surface **Acquisition + Qualification Platform** feeding a LINE-centric commerce engine. The main Landing Page remains the high-velocity hub, while Product Landing Pages (Mini Landing Pages) and Information/Knowledge Pages serve as spokes for consideration and trust.

---

## 1. Business Objective

Acquire high-intent, qualified users and convert them into LINE OA Friends at scale and at efficient cost, enabling the sales team (human + automation) inside LINE to close and retain customers.

The website exists to:
- Attract the right traffic (Hot / Warm / Cold / Returning)
- Educate and build trust
- Qualify intent and product interest
- Deliver pre-contextualized handoff to LINE

Sales, order, payment, and retention happen inside LINE OA.

---

## 2. Primary KPI

**LINE OA Friend Acquisition** (volume + quality)

Quality is measured by:
- Intent classification at acquisition (High Intent > Warm > Research)
- Product specificity (specific SKU vs generic)
- Downstream conversion rate to conversation and first order
- LTV of friends acquired via website

---

## 3. Secondary KPIs

- Cost per Qualified LINE Friend (by channel, surface, intent)
- Landing Page Experience (LPE) and Quality Score (Google Ads)
- Website → LINE Click rate (by surface)
- PDP → LINE Click rate (consideration conversion)
- Commerce Context completeness at handoff (% of clicks carrying full product + utm + intent)
- Time-to-First-Conversation and Conversation-to-Order rate for website-originated friends
- Repeat purchase rate by acquisition source

---

## 4. Acquisition Funnel

```
Ads (Google / Meta / TikTok / Organic)
        ↓
Main Landing Page (Hub)
   ├── Hero CTA → Direct LINE (Hot traffic)
   └── Product Cards / Discovery → Product Landing Pages (Warm/Cold)
            ↓
      Product Landing Pages (Mini Landing Pages)
            ↓
         LINE OA (with full Commerce Context)
            ↓
      Add Friend (Primary KPI)
            ↓
      Conversation (Sales team + automation)
            ↓
      Sale
            ↓
      Repeat Purchase
```

All surfaces must carry Commerce Context (product, sku, campaign, source, utm, landingPage, entrySurface, intent, timestamp) into LINE.

---

## 5. Traffic Classification

- **Hot**: High purchase intent, brand-aware or returning. Route primarily via Hero CTA directly to LINE.
- **Warm**: Product interest or category consideration. Route via Product Cards to Product Landing Pages.
- **Cold**: Research / problem-aware but low product specificity. Route to Information or Knowledge Pages, then to relevant PLP or LINE.
- **Returning**: Previously engaged (tracked via context or LINE data). Personalized experiences, direct LINE paths, or relevant PLP.

Intent Classification (from ADR-001) overlays this: Research, High Intent, Promotion, Product, Returning Customer.

---

## 6. Landing Strategy

- **Homepage (Main Landing Page)**: High-velocity acquisition hub. Preserves frozen Sections 1–11. Serves Hot traffic (Hero) and discovery for Warm traffic (Product Cards). Fast load, strong trust signals, clear LINE CTAs.
- **Product Landing Pages (Mini Landing Pages)**: Consideration layer per product (or small groups). Rich content: benefits, ingredients, usage, certifications, reviews, comparisons. Strong LINE CTA with pre-filled context. Consume Product Authority as source of truth.
- **Information Pages**: Trust & compliance (About, Quality/Certification, Privacy, Shipping, Contact). Support brand search and AI SEO.
- **Knowledge Pages**: Deeper educational content for long-tail SEO and AI search (e.g., "how to choose intimate wellness products", ingredient deep-dives).

Homepage remains the primary ad and organic landing for broad/brand terms. PLPs become primary for product-specific and consideration ads.

---

## 7. Navigation Strategy

Mobile-first, constrained within MobileShell (max-w-[430px]).

- **Homepage**: Section anchors + prominent global LINE CTAs. Product discovery via cards leading to PLPs.
- **PLPs**: Clear "Back to all products" or homepage link. Related products. Persistent LINE CTA.
- **Information/Knowledge Pages**: Breadcrumbs or hub navigation back to homepage. Cross-links to relevant products.
- Global elements (header, footer, sticky elements) provide consistent LINE entry points without forcing every click to LINE.
- No desktop navigation expansion yet (per frozen baseline).

Future: When Product Landing Platform matures, consider lightweight category navigation or search while staying mobile-first.

---

## 8. SEO Strategy

- Homepage: Brand + broad terms, core trust signals.
- Product Landing Pages: Primary for product + long-tail (e.g., "Nicky Pimpz Boss ราคา", "B21 stamina review", specific SKUs + benefits).
- Information Pages: Brand + compliance (FDA, อย., shipping policy).
- Knowledge Pages: Educational long-tail for top-of-funnel.

Use Product Authority data for consistent titles, descriptions, structured data (Product, Offer, Review).

Technical: Proper canonicals, internal linking from homepage → PLPs → related, sitemaps covering all surfaces, mobile-first indexing.

---

## 9. AI SEO Strategy

Leverage the depth that single-page cannot provide:

- Entity-rich PDPs and Knowledge Pages (ingredients, manufacturing, certifications, usage protocols, comparisons).
- Structured data + clear Commerce Context signals.
- Authoritative, regularly updated content owned via Content Governance.
- Answer-oriented pages (Knowledge) that directly address buyer questions AI engines surface.

Goal: Become the canonical source for these specific wellness products in Thai and English AI search results.

---

## 10. Google Ads Strategy

- **Hot / Brand / High Intent**: Land on Homepage or direct LINE (protect Quality Score and speed).
- **Product / Consideration**: Land on dedicated Product Landing Page with matching creative and strong LINE CTA.
- **Research / Broad**: Information or Knowledge pages, then nurture to relevant PLP or LINE.
- Use Commerce Context for better attribution and remarketing audiences (e.g., "viewed Nicky PDP but no LINE click").
- Landing Page Experience (LPE) is a core Quality Score driver — dedicated relevant pages dramatically outperform single-page for non-exact-match traffic.

---

## 11. Meta Strategy

- Story and consideration-focused creative → Product Landing Pages.
- Retargeting based on specific product interest or surface (e.g., "viewed Boss Men PDP").
- Advantage+ and broad audiences benefit from strong post-click experiences on PLPs.
- Use full Commerce Context for offline conversion tracking (LINE Friend + Sale).

---

## 12. TikTok Strategy

- Short-form video creative (problem → solution → social proof) → relevant Product Landing Page or direct high-intent LINE.
- Younger / discovery audience often benefits from PLP education before LINE.
- Strong creative-to-page relevance important for algorithm and LPE-like signals.
- Commerce Context passed for attribution.

---

## 13. Commerce Experience Platform

The website is the front-end **Acquisition + Education + Qualification** layer of the overall LINE-First Commerce system.

All surfaces (Homepage, PLPs, Info, Knowledge) are designed to:
- Deliver the right depth for the traffic type.
- Capture and pass rich Commerce Context.
- Drive to LINE with pre-filled, personalized message.

It is not a traditional e-commerce storefront. It is the marketing and trust engine that feeds the LINE commerce engine.

---

## 14. Future Checkout Strategy

Primary path remains LINE (consultation + sales + payment coordination inside LINE or linked systems).

On-site checkout is a possible future layer for:
- Low-friction repeat purchases by existing LINE Friends.
- Specific promotions or bundles.

If implemented:
- Must still carry full Commerce Context.
- Should not replace the LINE handoff for first-time or high-consideration buyers.
- Decision will be governed by a future ADR or major roadmap update.

---

## 15. Content Governance

**Critical missing piece today.**

Recommended model:
- Product Authority owns core facts (title, sku, pricing, features, linePayloadMetadata).
- Dedicated content owners (or product managers + copywriters) own PDP narrative, ingredients details, usage guides, certifications language, reviews curation.
- Compliance/legal reviews for claims.
- Versioning and update cadence defined (especially for certifications, pricing changes, new reviews).
- Clear ownership between "Hub content" (homepage) and "Spoke content" (PDPs).

Without governance, PDPs will become inconsistent or outdated, harming trust and SEO/AI SEO.

---

## 16. Measurement Architecture

Layered measurement:

- **Ads Layer**: Impressions, clicks, CPC, Quality Score / LPE, ROAS at Friend level.
- **Website Layer**: Views, scroll depth, time on page, CTA clicks (with full Commerce Context attached).
- **Handoff Layer**: LINE Click → Friend Add rate, Context completeness %.
- **LINE Layer**: Friend adds, message opens/replies, first response SLA.
- **Sales Layer**: Conversation → Order, AOV, time-to-order.
- **Business Layer**: LTV, repeat rate, CAC by source/intent/surface, overall ROAS.

All website events and LINE handoffs must carry the Commerce Context defined in ADR-001 and Phase 4B.

---

## 17. Attribution Strategy

Use Commerce Context as the primary attribution carrier:
- product, sku, campaign, source, utm_*, landingPage, entrySurface, intent, timestamp.

Pass this context:
- In URL parameters where possible.
- In the pre-filled LINE message.
- Via pixels / server-side events to LINE and ad platforms (offline conversion import).

Multi-touch where feasible (ads click → website events → LINE events → sale).

Goal: Understand which surfaces, intents, and ad creatives produce the highest-quality (and highest-LTV) LINE Friends.

---

## 18. Business Risks

- Over-reliance on LINE as single commerce channel (platform risk, policy risk).
- Increased user friction if extra pages (PLPs) are not fast and relevant.
- Content maintenance cost and quality drift.
- Ad platform changes reducing effectiveness of current direct-LINE model.
- Attribution gaps leading to misallocation of marketing budget.

---

## 19. Architecture Risks

- Scope creep: Building full e-commerce features too early instead of strengthening the acquisition-to-LINE handoff.
- Inconsistent experiences across surfaces if governance is weak.
- Performance degradation on mobile if many image-heavy PDPs are added without optimization discipline.
- "Dead code" risk if contracts (Context, Builder, CTA) are not wired before Phase 5.
- Hidden coupling between homepage content and future PDP content.

---

## 20. Decision

**Adopt this Acquisition Architecture** as the binding model for all future work on traffic strategy, landing surfaces, navigation, SEO/AI-SEO, paid media, content, measurement, and attribution.

This ADR, together with ADR-001, defines the complete LINE-First Commerce Landing Platform:
- ADR-001 governs the Commerce side and primary KPI.
- ADR-002 governs the Acquisition side and how the platform feeds LINE.

All Phase 5 work (Product Landing Platform / Commerce Experience), ads strategy, and content development must align with both ADRs.

Deviations require a new ADR or explicit amendment.

---

*This document is the Acquisition counterpart to ADR-001. It is intended to align product, marketing, and sales teams on a single operating model for acquisition until the next major architectural evolution.*