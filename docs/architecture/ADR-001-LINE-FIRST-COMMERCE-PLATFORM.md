# ADR-001: LINE-First Commerce Landing Platform

**Date**: 2026-07-06  
**Status**: Approved  
**Decision Makers**: Lead System Architect (with convergence from Internal SA Review, Grok Architecture Review, Gemini Architecture Review, Gemini Pro Business Review, Architecture Evolution Review, Business Architecture Review)  
**Baseline**: v4.1.12-ws01-p1d-iconwrapper  
**Supersedes**: Implicit "Single Landing Page" model from initial project foundation.

---

## Executive Summary

This Architecture Decision Record (ADR) formally redefines the ZENOVELL-PIMPZ project from a traditional "Landing Page" to a **LINE-First Commerce Landing Platform**.

All independent architecture and business reviews have converged on the same strategic direction: the website is an acquisition, education, trust-building, and qualification layer whose primary output is a qualified LINE OA Friend. Actual commerce (consultation, sales, retention) occurs inside LINE OA.

The Product Authority (`content/products.ts`) is established as the Single Source of Truth. Future surfaces (Product Landing Pages, LINE Message Builder, attribution systems) must consume this authority and carry structured Commerce Context.

This decision provides the binding architectural authority for Phase 5 and all subsequent evolution.

---

## Business Vision

The business model separates responsibilities cleanly:

**Website (Acquisition Platform)**
- Acquire qualified traffic via ads and organic
- Educate users about products
- Build trust through information, social proof, and certifications
- Qualify intent
- Convert visitors into LINE OA Friends

**LINE OA (Commerce & Relationship Platform)**
- Conduct consultation
- Build personal relationship
- Execute sales
- Handle retention and repeat purchase
- Manage post-sale service

**Primary Business KPI**: LINE OA Friend Acquisition (not immediate website purchase or checkout).

This model aligns with:
- Thai market behavior for high-consideration wellness products
- LINE OA as the dominant conversational commerce channel
- Sales team + automation workflow inside LINE

---

## Architecture Decision

**Official Redefinition**

From: "Landing Page" (single-page direct-to-LINE conversion surface)

To: **"LINE-First Commerce Landing Platform"**

The platform consists of:
- A high-velocity main Landing Page (frozen Sections 1–11 baseline preserved)
- Hero as direct fast-path to LINE
- Product Cards routing to dedicated Product Landing Pages
- Supporting information pages (FAQ, About, Privacy, Shipping, Quality/Certification, Contact)
- All surfaces feeding into LINE OA as the commerce execution layer

Product Landing Pages are not simple "detail" pages. They are **Mini Landing Pages** designed to educate, build trust, and drive LINE conversion for specific products.

---

## Business Responsibilities

| Layer       | Responsibility                          | Primary Output              |
|-------------|-----------------------------------------|-----------------------------|
| Website     | Acquire, Educate, Trust, Qualify        | LINE OA Friend              |
| LINE OA     | Consult, Sell, Retain, Repeat           | Order / Revenue             |
| Sales Team  | Human relationship + automation         | Closed orders               |

The website must never be optimized for "add to cart" or direct purchase. Its success metric is the quality and volume of LINE Friends acquired.

---

## Website Responsibilities

The website must fulfill:
1. **Acquisition** — Serve as effective landing surface for Google Ads, Meta, TikTok, and organic traffic.
2. **Education** — Deliver product information, benefits, ingredients, usage, manufacturing, and certifications.
3. **Trust Building** — Present reviews, social proof, quality signals, privacy/shipping policies, and regulatory compliance (FDA / อย.).
4. **Qualification** — Use Intent Classification and Commerce Context to understand user state.
5. **Conversion to LINE Friend** — Every primary CTA must result in a pre-contextualized handoff to LINE OA.

Hero provides the fast conversion path. Product Landing Pages provide the deep consideration path.

---

## LINE Responsibilities

LINE OA is the official commerce execution environment:
- Receive pre-filled Commerce Context from the website
- Enable human sales team + LINE automation
- Handle full sales cycle, order confirmation, payment coordination, and follow-up
- Own customer relationship and repeat purchase

The website must never attempt to replicate LINE's relationship or sales capabilities.

---

## Commerce Funnel

```
Ads (Google / Meta / TikTok / Organic)
        ↓
Main Landing Page
   ├── Hero CTA
   │        ↓
   │      Direct LINE (High-Intent / Fast Path)
   │
   └── Product Cards
            ↓
      Product Landing Pages (Mini Landing Pages)
            ↓
         LINE OA (with Commerce Context)
            ↓
      Add Friend (Primary KPI)
            ↓
      Sales Team + Automation (LINE)
            ↓
      Order / Revenue
```

---

## Architecture Layers

1. **Acquisition Layer** — Main Landing Page (preserved mobile-first baseline)
2. **Consideration Layer** — Product Landing Pages (per-product Mini Landing Pages)
3. **Handoff Layer** — Structured LINE entry points using Commerce Context
4. **Commerce Execution Layer** — LINE OA + Sales Team (outside website scope)
5. **Data Layer** — Product Authority + Commerce Context + Intent Classification

---

## Commerce Context

All future pages, components, analytics events, and LINE handoffs **must** carry official Commerce Context.

Minimum required fields:
- `product` (slug or id)
- `sku`
- `campaign`
- `utm` (source, medium, campaign, content)
- `source`
- `landingPage`
- `entrySurface` (hero, product-card, final-cta, etc.)
- `intent` (from Intent Classification)

Commerce Context must be preserved across page transitions and passed into the LINE Message Builder.

---

## Intent Classification

The platform shall classify visitor intent to enable better routing, messaging, and measurement.

Initial taxonomy (extensible):
- **Research** — User seeks information, ingredients, comparisons, certifications.
- **High Intent** — Direct purchase language, price-focused, ready to buy.
- **Promotion** — Responded to discount or limited-time offer.
- **Product** — Specific product interest (via card click or direct link).
- **Returning Customer** — Previously engaged, re-visiting for repeat or support.

Intent classification influences:
- Hero vs Product Card routing emphasis
- Pre-filled LINE message tone and content
- Ad creative and landing page matching
- Post-friend nurturing sequences

---

## Future Evolution

This architecture is designed to evolve naturally into a full LINE-First Commerce Platform:

- Product Landing Pages become rich, templated mini-landing pages
- LINE Message Builder consumes Commerce Context + Intent
- Ads attribution system uses full Commerce Context
- Additional surfaces (catalog browsing, comparison, subscription) can be added without changing the core funnel
- Potential future expansion to SaaS commerce or multi-channel while keeping LINE as primary relationship layer

The Single Source of Truth (`content/products.ts`) enables all future pages to stay consistent.

---

## Success KPIs

**Primary KPI (Business)**: LINE OA Friend Acquisition rate and quality (by source and intent).

**Marketing KPIs**:
- Cost per LINE Friend (by channel, by surface)
- ROAS at Friend-acquisition level

**Website KPIs**:
- Hero CTA → LINE conversion rate
- Product Card → Product Landing Page click rate
- Product Landing Page → LINE CTA conversion rate
- Commerce Context completeness on handoff

**LINE KPIs**:
- Friend add rate from website
- First-message engagement rate
- % of Friends receiving sales response within SLA
- Use of pre-filled Commerce Context

**Sales & Business KPIs**:
- Conversation-to-Order rate
- Average Order Value
- Time-to-First-Order
- Repeat purchase rate
- LTV by acquisition source

---

## Risks

- Added friction between Landing and Product Landing Pages may reduce overall volume (mitigated by preserving Hero direct path).
- Content maintenance burden for multiple Mini Landing Pages.
- Attribution complexity increases (requires disciplined Commerce Context passing).
- Risk of visual or experiential drift if Product Landing Pages are not strictly governed by the same design system and MobileShell constraints.
- Over-investment in website depth at the expense of LINE-side optimization.

All risks are acceptable provided the Hero fast-path remains protected and Product Landing Pages maintain high LINE conversion rates.

---

## Decision Status

**Approved**

This ADR is the binding architectural authority. All future work (Product Landing Pages implementation, LINE Message Builder, Commerce Context instrumentation, Intent Classification, ads attribution, and platform expansion) must reference and conform to this document.

---

## Approved By

- Lead System Architect
- Consensus from:
  - Internal SA Review
  - Grok Architecture Review
  - Gemini Architecture Review
  - Gemini Pro Business Review
  - Architecture Evolution Review
  - Business Architecture Review

---

## Referenced Reviews

- Phase 4 Commerce Foundation Blueprint
- Phase 4 Commerce Foundation Scope Lock
- All prior architecture and business reviews (2026-07) that converged on the LINE-First model

---

**End of ADR-001**

This document supersedes any prior implicit assumption that the project is "just a landing page." All subsequent design, implementation, and measurement decisions must treat the system as a LINE-First Commerce Landing Platform.