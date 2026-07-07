# PHASE 5 — COMMERCE EXPERIENCE PLATFORM BLUEPRINT

**Date**: 2026-07-07  
**Phase**: Phase 5 — Commerce Experience Platform  
**Status**: Blueprint (Ready for Implementation Planning)  
**Baseline**: v4.1.15-phase4d-cta-contract (Commerce Foundation COMPLETE)  
**Governing Documents**: ADR-001, ADR-002, ADR-003, M11 Architecture Checkpoint, COMMERCE-FOUNDATION-COMPLETE.md  
**Objective**: Transform the current single-page LINE-First Landing Page into a full Commerce Experience Platform while preserving the frozen homepage baseline and maintaining strict LINE-first commerce model.

---

## 1. Executive Summary

The Commerce Foundation (4A–4E + ADRs 001–003) is complete. The project has evolved from a traditional single-page landing page into a **LINE-First Commerce Landing Platform**.

Phase 5 will expand this into a **Commerce Experience Platform** by introducing dedicated surfaces:

- Homepage (frozen high-velocity hub)
- Product Landing Pages (Mini Landing Pages per product/SKU)
- Information Pages (About, Quality, Privacy, Shipping, Contact)
- Knowledge Pages (educational content for SEO/AI-SEO)

All surfaces will be entity-driven (powered by Product Authority as Single Source of Truth), context-aware (Commerce Context flows end-to-end), and optimized for:

- User trust and conversion to LINE Friend
- SEO and AI SEO
- Google/Meta/TikTok Ads performance
- Future scalability (checkout, CRM, multi-channel)

The platform remains acquisition/qualification focused. Commerce execution (consultation, sales, retention) stays inside LINE OA.

This Blueprint provides the authoritative reference for Phase 5 implementation, ensuring consistency, governance, and alignment with the LINE-first principle.

---

## 2. Objectives

Transform the current architecture:

**From**:
- Single-page "Landing Page"
- Section-driven content
- All traffic funneled through one long scroll
- Placeholder CTAs
- Limited SEO/AI-SEO depth
- Basic ads targeting

**To**:
- **Commerce Experience Platform**
- Entity-driven (Product as core entity)
- Multi-surface experience (Hub + Spokes)
- Rich, dedicated Product Landing Pages (Mini LPs)
- Information and Knowledge Pages for trust and discovery
- Full Commerce Context flow from every surface
- Optimized for SEO, AI SEO, and paid media
- Scalable to future checkout/CRM while keeping LINE as primary commerce channel

Primary goal of Phase 5: Increase qualified LINE Friend acquisition through better relevance, trust, and experience depth — without changing the frozen homepage or moving commerce execution out of LINE.

---

## 3. Platform Architecture

The platform consists of layered surfaces:

**Homepage (Hub)**
- Frozen Sections 1–11 (visual/DOM baseline preserved per Scope Lock).
- High-velocity acquisition.
- Hero CTA: Direct to LINE (Hot traffic).
- Product Cards: Discovery → Product Landing Pages (Warm/Cold traffic).
- Information and Knowledge teasers.

**Product Landing Pages (Spokes / Mini Landing Pages)**
- One (or grouped) per product/SKU.
- Deep education and trust building.
- Consume Product Authority + rich content layer.
- Strong, context-aware LINE CTA.
- Related products, reviews, structured data.

**Information Pages**
- About, Quality/Certification, Privacy, Shipping, Contact.
- Brand trust and compliance.
- Support broad and research traffic.

**Knowledge Pages**
- Educational/long-tail content (e.g., ingredient deep-dives, buying guides, usage science).
- Optimized for SEO and AI search.
- Link to relevant products.

**Future Surfaces (Phase 6+)**
- Checkout (if/when decided — see Out of Scope).
- Account / Membership area.
- Comparison tools.
- Category browsing.

All surfaces feed into LINE OA with enriched Commerce Context.

---

## 4. Routing Strategy

Use Next.js App Router (already in place).

Proposed routes (entity-driven):

- `/` — Homepage (current app/page.tsx, frozen)
- `/products/[slug]` — Product Landing Page (e.g., /products/nicky-pimpz-boss)
- `/information/[slug]` — Information Pages (e.g., /information/quality, /information/privacy)
- `/knowledge/[slug]` — Knowledge Pages (e.g., /knowledge/ingredients-guide)
- Future:
  - `/checkout` (if enabled)
  - `/account`
  - `/compare`

Routing principles:
- Homepage remains the default entry for most ads and organic brand traffic.
- Product-specific ads and organic searches land directly on /products/[slug].
- Research traffic can land on /information or /knowledge.
- All pages must support Commerce Context via URL params or server-side enrichment for handoff.

Use dynamic segments with generateStaticParams for SSG where possible (products list is small and known).

---

## 5. Entity Driven Architecture

**Shift from Section-driven to Entity-driven.**

Current (pre-Phase 5):
- Content is organized by sections (hero.ts, section-4-product-catalog.ts, etc.).
- Product data is duplicated or partially centralized.

Future (Phase 5+):
- **Core Entity**: Product (from Product Authority `content/products.ts` — Single Source of Truth).
- **Content Layer**: Separate rich content per entity (markdown, JSON, or dedicated content files per product/information/knowledge).
- **Templates**: Reusable React components that consume entity + content.
- **Pages**: Thin route handlers that fetch the entity and render the template.

Benefits:
- Consistent data across homepage, PLPs, ads, LINE messages, SEO.
- Easy to scale to 20/100/1000 SKUs.
- Clear ownership (Product team owns data; Content team owns narrative).

Product data (slug, sku, title, pricing, linePayloadMetadata, etc.) drives:
- URLs
- Metadata
- LINE messages (via builder)
- Structured data (JSON-LD)
- Related product logic

Rich content augments but never overrides core facts.

---

## 6. Product Landing Page Template

Each PLP is a **Mini Landing Page** (not a thin detail page).

Required sections (in logical order, mobile-optimized):

1. **Hero** — Product hero image/video, headline, subheadline, primary LINE CTA (pre-filled via builder + context).
2. **Benefits** — Key benefits (consume or extend from Product features).
3. **Ingredients / Composition** — Detailed if applicable (rich content layer).
4. **How to Use** — Clear instructions, dosage, tips.
5. **Certifications & Quality** — FDA, อย., manufacturing standards, clinical notes.
6. **Reviews** — User reviews + social proof (curated or dynamic).
7. **FAQ** — Product-specific FAQs (entity-driven).
8. **LINE CTA** — Prominent, context-aware CTA (use LINE Message Builder).
9. **Related Products** — Cross-sell using Product Authority.
10. **Structured Data** — JSON-LD for Product, Offer, Review, FAQPage.

Additional principles:
- Fast load (optimize images, lazy load, minimal client JS).
- Trust signals prominent.
- Mobile-first (consistent with MobileShell constraints where possible; new pages may extend the shell).
- All CTAs carry/enrich Commerce Context.

---

## 7. Information Page Template

Purpose: Build brand trust and handle compliance/research traffic.

Typical structure:
- Hero / Intro
- Main content (About the brand, Quality standards, Privacy policy, Shipping details, Contact)
- Trust badges / Certifications
- Related products or "Learn more" links to PLPs/Knowledge
- LINE CTA (contextual if possible)
- Structured data (Organization, WebPage, etc.)

Keep tone authoritative, transparent, and reassuring.

---

## 8. Knowledge Page Template

Purpose: Educational content for SEO, AI SEO, and top-of-funnel acquisition.

Structure:
- Hero / Title
- In-depth article or guide (rich, scannable, entity-linked)
- Key takeaways
- Related products (with CTAs)
- Related knowledge / information pages
- LINE CTA
- Structured data (Article, HowTo, FAQ if applicable)

Content should be authoritative, up-to-date, and answer real user questions.

---

## 9. Navigation Model

**Mobile-First** (preserve MobileShell discipline where it makes sense; new pages may use an extended shell or consistent layout primitives).

Core navigation:
- Homepage as hub.
- From homepage: direct links/anchors + Product Cards → PLPs.
- Within PLP: "Back to products", related products, Information/Knowledge links.
- Global: Persistent LINE CTA (context-aware when possible).
- Breadcrumbs on deeper pages.
- Footer links to Information pages.
- Search (future) that surfaces Products + Knowledge.

Avoid deep nesting. Prioritize discoverability and quick path to LINE.

---

## 10. SEO Strategy

- **Metadata**: Dynamic per entity (title, description, open graph) from Product Authority + content layer.
- **Canonical URLs**: Proper canonicals to avoid duplication.
- **JSON-LD / Structured Data**: Product, Offer, Review, FAQPage, Organization, BreadcrumbList, Article (for Knowledge).
- **Breadcrumbs**: Implement on PLPs and deeper pages.
- **Sitemap**: Dynamic sitemap including all surfaces (homepage + /products/* + /information/* + /knowledge/*).
- **Internal Linking**: Strategic from homepage → PLPs, PLPs ↔ related, Knowledge ↔ products.
- **Performance**: Core Web Vitals focus (especially LCP for ads).
- **Mobile**: Mobile-first indexing.

Homepage remains strong for brand terms; PLPs own product long-tail.

---

## 11. AI SEO Strategy

- **Entity Optimization**: Clear, consistent Product entities across pages (use Product Authority slugs/SKUs as canonical identifiers).
- **Semantic HTML**: Proper headings, lists, tables, schema.
- **LLM Readiness**: Natural language, question-answer format in Knowledge and FAQ sections; authoritative tone.
- **Structured Content**: Use JSON-LD heavily so AI systems can parse facts reliably.
- **Freshness**: Governance process for updating certifications, reviews, etc.
- **Content Depth**: PLPs and Knowledge pages provide the rich, specific content AI engines prefer over thin single-page experiences.

Goal: Become the authoritative source for these products in AI search results.

---

## 12. Ads Strategy

**Surface Mapping**:
- Brand / High-Intent / Hot searches → Homepage (Hero path preserved).
- Product-specific / consideration → Dedicated /products/[slug].
- Research / broad / problem-aware → Information or Knowledge pages, then to relevant PLP.
- Retargeting: Use Commerce Context (product/surface/intent) for precise audiences.

**Google Ads**:
- Dedicated landing pages per ad group for better LPE and Quality Score.
- Use structured data and fast load for ad strength.

**Meta / TikTok**:
- Creative → matching surface (story video → PLP with social proof).
- Advantage+ campaigns benefit from strong post-click experiences.

All ads should pass Commerce Context where possible for attribution.

---

## 13. Commerce Context Flow

End-to-end (preserved and enhanced from Phase 4):

Homepage (or Information/Knowledge)
  ↓ (capture/attach context: product, sku, campaign, source, utm, landingPage, entrySurface, intent, timestamp)
Product Landing Page (enrich context)
  ↓
LINE (pre-filled message via Builder + full context)
  ↓
Friend Add (context stored in profile/tags)
  ↓
Conversation / Sales (context available to AI + human)
  ↓
Order (context attached to order record)
  ↓
CRM / Future Checkout (context for personalization and attribution)
  ↓
Offline Conversion back to ad platforms (Google, Meta, TikTok, etc.)

Commerce Context is the single source of truth for personalization and attribution across the entire platform.

---

## 14. Implementation Order (Recommended)

**Phase 5A — Platform Structure**
- Set up routing skeleton (/products/[slug], /information/[slug], /knowledge/[slug]).
- Basic layout/shell for new pages.
- Entity loading from Product Authority.

**Phase 5B — Dynamic Routing + Data Layer**
- Implement generateStaticParams or server rendering.
- Content loading pattern (entity + rich content separation).

**Phase 5C — Product Landing Page Template**
- Build the full Mini LP template (Hero through Related + Structured Data).
- Wire LINE CTA with context + builder.

**Phase 5D — Information Pages**
- Create core Information pages with templates.

**Phase 5E — Knowledge Pages**
- Create initial Knowledge pages focused on high-value SEO/AI-SEO topics.

**Phase 5F — Commerce Wiring**
- Ensure all new surfaces properly build and pass Commerce Context.
- Wire events (from 4E) where appropriate.

**Phase 5G — SEO / AI SEO / JSON-LD / Sitemap**
- Full metadata, structured data, internal linking, sitemap, performance.

**Phase 5H — Pilot Ads & Analytics Verification**
- Launch limited campaigns using new surfaces.
- Verify full attribution loop (Context → LINE → Sale → Offline conversion).

This phased approach mirrors the successful 4A–4E pattern and allows audits at each step.

---

## 15. Out of Scope (Phase 5)

Explicitly **not** part of Phase 5 (defer to Phase 6+ or separate decisions):

- On-site Checkout / Payment flows (unless a future ADR decides otherwise; LINE remains primary).
- Full CRM system (LINE + context is the current model; deeper external CRM integration later).
- Membership / Subscription portal (beyond basic repeat via LINE).
- SaaS or multi-tenant features.
- Marketplace seller tools.
- Major desktop navigation overhaul (stay mobile-first).
- Large-scale content population for all products (focus on pilot products first).
- Any changes to frozen homepage Sections 1–11 visual/DOM.
- Direct e-commerce without LINE handoff.

These will be addressed only after Phase 5 stabilizes the experience layer and after proper Architecture Gate reviews.

---

**End of Blueprint**

This document, combined with the three ADRs and the Commerce Foundation Complete baseline, provides the complete architectural direction for Phase 5. Implementation must follow the phased order above and maintain strict adherence to entity-driven design, Commerce Context flow, and LINE-first principles.

Next step per user plan: Independent Blueprint Audit (by Gemini or equivalent), followed by Architecture Gate, then phased implementation starting with 5A.