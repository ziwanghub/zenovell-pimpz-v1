# PHASE 5G — SEO / AI SEO EXPERIENCE BLUEPRINT

**Date**: 2026-07-07  
**Phase**: Phase 5G — SEO / AI SEO Experience  
**Status**: Blueprint (SA Final — Ready for Blueprint Audit)  
**Baseline**: v2.0 Development Workflow + Phase 5F Commerce Wiring Complete  
**Governing Documents**:
- DEVELOPMENT-WORKFLOW-v2.md (OFFICIAL)
- PHASE5-COMMERCE-EXPERIENCE-BLUEPRINT.md (APPROVED)
- PHASE5D-INFORMATION-EXPERIENCE-BLUEPRINT.md (APPROVED)
- PHASE5E-KNOWLEDGE-EXPERIENCE-BLUEPRINT.md (APPROVED)
- PHASE5F-COMMERCE-WIRING-BLUEPRINT.md (APPROVED)
- ADR-001: LINE-First Commerce Landing Platform (APPROVED)
- ADR-002: Acquisition Architecture (APPROVED)
- ADR-003: LINE Commerce Architecture (APPROVED)
- Phase 5G PRE-WP00 (PASS)
- Phase 5G PRE-WP00A (PASS)
- REPOSITORY-STRUCTURE-GUIDE.md
- LEAN-REPORTING-POLICY.md

**Objective**: Define the complete site-level SEO and AI SEO architecture to make the existing Product, Information, and Knowledge surfaces discoverable, indexable, and authoritative for both traditional search engines and AI crawlers/LLMs — without adding new surfaces, mutating authorities, or touching the frozen homepage.

This Blueprint becomes the single Architectural Authority for Phase 5G.

---

## 1. Executive Summary

Phase 5G completes the platform capability layer by elevating the SEO and AI SEO posture of the existing three authorities (Product, Information, Knowledge) and the commerce-wired flows.

Current state (post-5F):
- Per-entity metadata, OpenGraph, Twitter cards, and structured data (Product, WebPage, Article/HowTo, Breadcrumb) are implemented via lib/platform/seo.ts helpers.
- All dynamic routes use generateStaticParams + generateMetadata + JSON-LD.
- No site-level SEO foundation (no robots.txt, no sitemap, root metadata is placeholder).
- No explicit AI SEO layer (no llms.txt, limited author/freshness signals).
- Internal linking exists but is not strategically optimized for crawl and entity authority.

Phase 5G will establish site-level SEO, AI SEO optimizations, consistent structured data, and strategic internal linking — all as additive, non-breaking changes that preserve authority separation and commerce context.

---

## 2. Objectives

- Establish strong site-level SEO foundation (robots, sitemap, root metadata, indexing policy).
- Optimize for AI search/LLMs (llms.txt, entity signals, authoritative content).
- Ensure consistent, rich structured data across all surfaces.
- Improve internal linking for crawl efficiency and authority flow.
- Maintain mobile-first, performance-friendly approach aligned with prior phases.
- Achieve better discoverability for research traffic (Information + Knowledge) and product long-tail (Products).

Primary outcome: The platform becomes the authoritative source for ZENOVELL wellness products and education in both traditional and AI-driven search.

---

## 3. SEO Architecture

**Root Metadata**
- Update app/layout.tsx with production-grade default title, description, keywords focused on brand + wellness.
- Use proper template for entity pages.
- Add applicationName, icons, and other core fields.

**Metadata Strategy**
- Continue per-entity dynamic metadata via existing generate*Metadata helpers.
- Ensure all surfaces (Product, Information, Knowledge) provide title, description, keywords, canonical.
- Homepage uses section-driven but with enhanced root metadata.

**Canonical Policy**
- Every entity page must declare self-canonical.
- Homepage as root canonical.
- No parameter duplication; use proper alternates.canonical in metadata helpers.

**OpenGraph**
- Consistent og:title, og:description, og:url, og:type=website or article.
- Include og:image where product or content images exist (leverage existing imageSrc in authorities).

**Twitter Cards**
- summary_large_image for product-heavy pages; summary for information/knowledge.
- Consistent twitter:title, twitter:description, twitter:card.

---

## 4. Site-level SEO

**robots.txt**
- Create public/robots.txt allowing all relevant paths.
- Disallow only dev or admin paths if any.
- Reference sitemap.

**sitemap.xml**
- Implement dynamic sitemap (app/sitemap.ts or equivalent) including:
  - Homepage
  - All /products/[slug]
  - All /information/[slug]
  - All /knowledge/[slug]
- Include lastmod from content metadata (createdAt/updatedAt where available).
- Prioritize Knowledge and Information for research traffic.

**Indexing Policy**
- Allow indexing on all public surfaces.
- Use noindex only for error/not-found states.
- Leverage <meta name="robots" content="index, follow"> where needed.

**Crawl Policy**
- Ensure clean URLs, proper internal linking, and fast load times.
- Mobile-first (already in place).
- Submit sitemap via robots.txt.

---

## 5. AI SEO Strategy

**llms.txt**
- Create public/llms.txt (or equivalent) providing:
  - Brand overview
  - Key entities (products, topics)
  - Links to authoritative pages
  - Preferred citation format

**Entity Summaries**
- Use description + summary fields from authorities as clean entity summaries.
- Ensure Knowledge pages have clear "what this covers" at top.

**Author / Publisher Signals**
- Add author and publisher to Knowledge/Article schema (use "ZENOVELL" as publisher).
- Include in root Organization schema.

**createdAt / updatedAt**
- Expose via metadata (lastmod in sitemap) and schema (datePublished, dateModified).
- Pull from content metadata where present (as in Knowledge files).

**Authoritative Content Signals**
- Use clear headings, lists, tables, quotes, and FAQ in Knowledge.
- Structured data for HowTo/FAQPage where applicable.
- Internal links from high-authority pages (homepage → information/knowledge).
- Consistent entity naming (use slugs/SKUs from authorities).

---

## 6. Structured Data Strategy

Implement consistently:

- **Organization / WebSite**: At root layout or homepage for brand signals.
- **Product + Offer + Review**: On Product pages (already partial; enhance).
- **WebPage / Article**: On Information and Knowledge pages.
- **HowTo**: On usage/ordering Knowledge pages.
- **FAQPage**: Where FAQ sections exist (e.g., homepage sections or Knowledge).
- **BreadcrumbList**: On all dynamic surfaces (already present via helpers).

Use the existing generate*StructuredData functions and extend as needed additively.

Ensure all JSON-LD is in <script type="application/ld+json">.

---

## 7. Internal Linking Strategy

**Hierarchy**:
Homepage (brand + discovery)
  ↓
Information (trust, compliance, education basics)
  ↓
Knowledge (deep guides, HowTo, ingredients)
  ↓
Products (specific commerce)
  ↓
LINE (with enriched Commerce Context)

**Related Entity Rules**:
- Knowledge pages link to related products, information, and other knowledge.
- Information pages link to relevant knowledge and products.
- Product pages link to relevant information and knowledge.
- Use consistent "Related" components.
- Breadcrumbs: Home > [Surface] > Current Page (consistent across surfaces).

**Homepage**:
- Strategic links via existing sections to Information, Knowledge, and Products.
- Preserve frozen sections; enhance with better anchor text if needed (additive).

Goal: Improve crawl paths and authority flow from high-intent to commerce.

---

## 8. Relationship with Authorities & Homepage

**Product Authority**:
- Consume for Product schema, pricing in metadata, entity IDs (slugs/SKUs).
- 5G does not mutate Product Authority.

**Information Authority**:
- Consume for WebPage metadata, keywords, related links.
- No mutation.

**Knowledge Authority**:
- Primary beneficiary of AI SEO enhancements (rich content, schema, freshness).
- Consume metadata, sections for schema.
- No mutation.

**Homepage**:
- Remains frozen (Sections 1–11).
- 5G enhances root metadata and strategic internal linking without visual/DOM changes.
- Homepage serves as entry for brand terms; defers to surfaces for long-tail.

All surfaces continue to carry Commerce Context.

---

## 9. Implementation Scope

- Add/update root metadata in app/layout.tsx.
- Create public/robots.txt.
- Implement dynamic sitemap (app/sitemap.ts or equivalent).
- Add public/llms.txt.
- Enhance structured data (Organization/WebSite, additional FAQ/HowTo where fitting).
- Add/update author, publisher, dates in schema and sitemap.
- Improve internal linking and breadcrumbs consistency (additive).
- Update metadata helpers if needed for site-level signals (additive).
- One controlled batch per Scope Lock.

---

## 10. Out of Scope

- New pages or content creation.
- Changes to frozen homepage sections.
- Mutations to Product, Information, or Knowledge Authorities.
- Full performance overhaul (only SEO-impacting aspects).
- Analytics platform integration or Phase 5H pilots.
- Checkout, CRM, or commerce logic changes.
- Major refactors or new surfaces.
- Backend indexing submission (Google Search Console etc.).

---

## 11. Success Criteria

- Root metadata is production-grade and brand-focused.
- robots.txt and sitemap.xml are present, correct, and reference all surfaces.
- All entity pages have complete, rich metadata + structured data (including dates, author where applicable).
- llms.txt exists and points to authoritative content.
- Internal linking follows the defined hierarchy with consistent breadcrumbs.
- Knowledge and Information pages show strong signals for AI (structured, fresh, entity-rich).
- No regression on existing functionality or authorities.
- Validation (lint + typecheck + build) passes cleanly.
- Independent audit can map every deliverable to this Blueprint.

---

## 12. Risks

- Root metadata changes could affect current (dev) indexing if not careful.
- Sitemap generation must handle dynamic slugs correctly to avoid broken links.
- Over-optimizing for AI could make content feel unnatural if not balanced with user value.
- Inconsistent date handling across authorities if not standardized.
- Crawl budget waste if internal linking is not cleaned up.

**Mitigations**:
- Use additive changes only.
- Test sitemap/robots locally.
- Keep content authoritative and user-first.
- Pull dates from existing content metadata where present.
- Strict Scope Lock with explicit file list.

---

## 13. Implementation Sequence

1. Update root metadata in app/layout.tsx (title, description, keywords, OG).
2. Create public/robots.txt.
3. Implement app/sitemap.ts (dynamic, including all entities + homepage).
4. Create public/llms.txt with brand + key entity links.
5. Enhance structured data: add Organization/WebSite, ensure dates/author in Knowledge/Product.
6. Standardize breadcrumbs and internal linking patterns.
7. Add any thin metadata enhancements in seo.ts (additive).
8. Run continuous validation.
9. Prepare for Independent Implementation Audit.

---

## 14. Audit Acceptance Criteria

- Blueprint Compliance Matrix: every section mapped to delivered files/changes.
- Delta vs Blueprint: zero gaps, zero over-implementation.
- Scope Lock Verification: only allowed files touched.
- No regression on Product/Information/Knowledge pages, frozen homepage, or commerce context.
- robots.txt and sitemap present and correct.
- llms.txt present.
- Structured data complete per strategy.
- Validation PASS.
- Independent audit produces clear evidence package.

---

## 15. Governing Principles

- This Blueprint is the single Architectural Authority for Phase 5G (per v2.0).
- One Batch = One Spoke (SEO / AI SEO Experience).
- Reuse and extend existing per-entity SEO helpers (additive only).
- Preserve frozen homepage, authority separation, and Commerce Context flow.
- Focus on making existing rich content discoverable and authoritative for both search engines and AI systems.
- Strict adherence to out-of-scope list.
- All changes must be traceable to this document.

This document, combined with the Scope Lock, governs all Phase 5G work.