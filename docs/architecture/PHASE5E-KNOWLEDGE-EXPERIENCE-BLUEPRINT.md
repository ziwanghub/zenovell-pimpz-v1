# PHASE 5E — KNOWLEDGE EXPERIENCE BLUEPRINT

**Date**: 2026-07-07  
**Phase**: Phase 5E — Knowledge Experience  
**Status**: Blueprint (SA Final — Ready for Blueprint Audit)  
**Baseline**: v2.0 Development Workflow + Phase 5D Information Experience Complete  
**Governing Documents**:
- DEVELOPMENT-WORKFLOW-v2.md (OFFICIAL)
- PHASE5-COMMERCE-EXPERIENCE-BLUEPRINT.md (APPROVED)
- PHASE5D-INFORMATION-EXPERIENCE-BLUEPRINT.md (APPROVED)
- ADR-001: LINE-First Commerce Landing Platform (APPROVED)
- ADR-002: Acquisition Architecture (APPROVED)
- ADR-003: LINE Commerce Architecture (APPROVED)
- Phase 5E PRE-WP00 (PASS)
- Phase 5E PRE-WP00A (PASS_WITH_RECOMMENDATIONS)
- REPOSITORY-STRUCTURE-GUIDE.md
- LEAN-REPORTING-POLICY.md

**Objective**: Define the complete architecture for the Knowledge Experience surfaces (/knowledge/[slug]) as educational, long-tail SEO and AI-SEO optimized content. These pages serve research and top-of-funnel traffic, providing in-depth guides that build authority and feed qualified users toward Product Landing Pages or LINE.

---

## 1. Executive Summary

Following the successful closure of Phase 5D (Information Experience), Phase 5E introduces Knowledge Pages as the third spoke in the Hub-and-Spoke model.

Knowledge Pages deliver authoritative, educational content optimized for organic search and AI answer engines. They are distinct from:

- Product Authority (commerce data)
- Information Authority (trust, compliance, brand facts)

All content remains entity-driven, context-aware, and LINE-first. The homepage and prior surfaces remain untouched.

This Blueprint follows PRE-WP00 and PRE-WP00A governance gates and incorporates all SA recommendations from PRE-WP00A.

---

## 2. Knowledge Authority

Knowledge Authority is a **separate educational authority**.

- Single Source of Truth for long-form educational content.
- Focus: deep dives, how-to guides, buying advice, ingredient education, wellness topics.
- Owned at platform level.
- Core facts and rich narrative live here.
- Must not mutate Product Authority or Information Authority.
- Supports SEO/AI-SEO for research queries that convert to qualified LINE Friends.

Knowledge Authority augments but never overrides Product or Information facts.

---

## 3. Knowledge Entity Contract

```ts
export type KnowledgeSectionType =
  | 'text'
  | 'list'
  | 'highlight'
  | 'steps'
  | 'faq'
  | 'image'
  | 'quote'
  | 'table'
  | 'warning';

export interface KnowledgeSection {
  type: KnowledgeSectionType;
  title?: string;
  body?: string;
  items?: string[];
  imageSrc?: string;
  imageAlt?: string;
  quote?: string;
  author?: string;
  rows?: Array<Record<string, string>>;
  level?: 'info' | 'warning' | 'critical';
}

export interface KnowledgeMetadata {
  readingTime: number;        // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  audience: string[];         // e.g. ['new-users', 'existing-customers']
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published';
  version: string;
}

export interface Knowledge {
  id: string;
  slug: string;
  title: string;
  description?: string;
  category: string;
  summary: string;
  content: KnowledgeSection[];
  keyTakeaways: string[];
  relatedProducts?: string[];
  relatedInformation?: string[];
  relatedKnowledge?: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  structuredDataType: 'Article' | 'HowTo' | 'FAQPage' | 'WebPage';
  cta: {
    label: string;
  };
  metadata: KnowledgeMetadata;
}
```

---

## 4. Knowledge Content Layer

Knowledge uses a dedicated content layer separate from all other authorities.

- Pure educational narrative and guides.
- Rich, scannable, entity-linked.
- Authoritative tone focused on education, not sales or policy.
- Must support internal linking to products and information pages (read-only).

---

## 5. Storage Strategy

**SA Recommended: Option C (Hybrid directory model)**

```
content/knowledge/
  index.ts                 // exports all, types, getters
  ingredient-guide.ts
  product-usage-guide.ts
  buying-guide.ts
  safe-purchase-education.ts
  line-ordering-guide.ts
  wellness-education.ts
```

- Each topic is a self-contained module exporting a Knowledge object.
- index.ts aggregates and provides load functions.
- Enables future per-file versioning or CMS migration while keeping type safety today.
- Consistent with v2.0 principles and PRE-WP00A recommendation.

---

## 6. Template Architecture

Thin page at:
`app/(platform)/knowledge/[slug]/page.tsx`

Responsibilities:
- Load Knowledge entity.
- generateMetadata + structured data.
- Compose platform components.
- Support Commerce Context.
- generateStaticParams for the 6 core topics.
- notFound handling.

Template structure (per master blueprint):
- Hero / Title
- In-depth article or guide (rich, scannable)
- Key takeaways
- Related products / related knowledge / related information
- LINE CTA
- Structured data

---

## 7. Platform Components

New components (following information and product patterns):

- knowledge-hero.tsx
- knowledge-article.tsx (renders rich KnowledgeSection[])
- knowledge-takeaways.tsx
- knowledge-related.tsx (combined products + information + knowledge)
- knowledge-cta.tsx

**Rules**:
- Accept typed Knowledge + CommerceContext.
- Safe empty states.
- Mobile-first.
- Reuse shared UI primitives.
- No direct homepage or product component imports that would create coupling.

---

## 8. Routing Strategy

- Next.js App Router + (platform) group.
- `/knowledge/[slug]`
- Shared layout: `app/(platform)/knowledge/layout.tsx` (extend skeleton).
- generateStaticParams for the 6 core slugs (SSG).
- All pages must support Commerce Context enrichment.
- Consistent breadcrumbs and navigation with Information and Product surfaces.

---

## 9. SEO / AI SEO / Structured Data Strategy

Extend `lib/platform/seo.ts` with knowledge-specific functions (additive only):

- generateKnowledgeMetadata
- generateKnowledgeJsonLd (use Article, HowTo, FAQPage per structuredDataType)
- generateKnowledgeBreadcrumbJsonLd
- generateKnowledgeStructuredData

- Optimize for long-tail educational queries.
- Authoritative, up-to-date content.
- Internal linking from homepage → information → knowledge → products.
- Future sitemap inclusion (Phase 5G scope).

---

## 10. Commerce Context Support

Every Knowledge page must:

- Accept and enrich Commerce Context (research intent by default).
- Pass context to LINE CTA using existing patterns.
- Preserve context when linking to related products or information.
- Support attribution from research traffic to LINE.

Basic support required in 5E (full wiring in 5F).

---

## 11. Relationship with Product Authority

- Strict separation.
- Knowledge may reference products via relatedProducts (slugs only).
- Product pages may link to relevant knowledge guides.
- No mutation of Product Authority.
- Product data remains single source of truth for commerce facts.

---

## 12. Relationship with Information Authority

- Complementary.
- Knowledge may link to related information pages (e.g., usage guide linking to privacy policy).
- Information pages may reference knowledge for deeper education.
- Read-only cross-references only.
- No mutation of Information Authority.

---

## 13. Relationship with Homepage

- Homepage remains **completely frozen** (Sections 1–11).
- Non-breaking links from homepage or navigation to knowledge pages are permitted.
- Knowledge serves research traffic that homepage surfaces.
- No visual, DOM, or content changes to homepage.

---

## 14. Initial Knowledge Topics

Core 6 topics (as defined in PRE-WP00A):

1. ingredient-guide
2. product-usage-guide
3. buying-guide
4. safe-purchase-education
5. line-ordering-guide
6. wellness-education

Each topic must follow the Knowledge Entity Contract and include rich sections, key takeaways, related links, and proper SEO/structured data.

---

## 15. Implementation Scope

- Define Knowledge interface and metadata (expanded section types + new fields).
- Create content/knowledge/ directory with Option C structure (index.ts + 6 topic files).
- Extend entity-loader with knowledge loading functions.
- Implement full Knowledge template.
- Create 5 platform knowledge components.
- Extend seo.ts with knowledge helpers.
- Implement basic Commerce Context support.
- generateStaticParams + notFound for the 6 topics.
- Structured data per topic type.
- Safe fallbacks.

All work must be traceable to this Blueprint.

---

## 16. Out-of-Scope

- Any changes to Product Authority or Information Authority (except read-only references).
- Homepage or sections/** modifications.
- Full Phase 5F Commerce wiring.
- Phase 5G global SEO/sitemap work.
- CMS or dynamic content systems.
- Additional topics beyond the 6 initial.
- Knowledge search or hub page.
- Checkout or account features.

---

## 17. Success Criteria

- All 6 core topics render correctly via SSG.
- Knowledge Authority is the single source for educational content.
- SEO metadata, JSON-LD, and reading metadata are complete.
- Commerce Context flows to LINE CTA.
- Clear separation from Product and Information Authorities.
- No regression on existing surfaces.
- Validation (lint + typecheck + build) passes cleanly.
- Independent Audit can map every deliverable to this Blueprint.

---

## 18. Risks & Mitigations

**Risks**:
- Content depth insufficient for AI/SEO value.
- Overlap with Information pages (policy vs education).
- Inconsistent component styling with 5D.
- Commerce Context not carried through.

**Mitigations**:
- Strict Scope Lock with explicit file list.
- Clear authority boundaries documented here.
- Follow established information component patterns.
- Explicit Commerce Context requirement in template and CTA.
- Blueprint Compliance Matrix required in audit.

---

## 19. Implementation Sequence

1. Define Knowledge contract and metadata in content/knowledge/index.ts.
2. Populate the 6 topic files with minimum viable authoritative content.
3. Extend entity-loader (loadKnowledgeBySlug, getAllKnowledge, update loadEntity).
4. Extend lib/platform/seo.ts with knowledge functions.
5. Implement knowledge template page with full component composition + Commerce Context.
6. Create the 5 platform components.
7. Add structured data and metadata rendering.
8. Implement generateStaticParams and notFound.
9. Run continuous validation.
10. Prepare for Independent Implementation Audit.

---

## 20. Audit Acceptance Criteria

Independent Implementation Audit must verify:

- Blueprint Compliance Matrix (every section mapped to delivered artifacts).
- Delta vs Blueprint (zero gaps, zero over-implementation).
- Scope Lock Verification (only allowed files touched).
- No regression on Product, Information, or frozen homepage.
- Validation PASS.
- Commerce Context support present.
- Storage follows Option C exactly.
- KnowledgeSection uses full expanded type list.
- Metadata fields present on all topics.

---

**Governing Principles** (per DEVELOPMENT-WORKFLOW-v2.0):
- Blueprint is the single Architectural Authority.
- One Batch = One Spoke (Knowledge Experience).
- Knowledge Authority remains strictly separate.
- All surfaces carry Commerce Context.
- LINE remains the commerce execution channel.

This document is the binding reference for Phase 5E Scope Lock and Batch Implementation.
