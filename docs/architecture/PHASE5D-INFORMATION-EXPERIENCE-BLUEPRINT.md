# PHASE 5D — INFORMATION EXPERIENCE BLUEPRINT

**Date**: 2026-07-07  
**Phase**: Phase 5D — Information Experience  
**Status**: Blueprint (SA Final Approved — Ready for Scope Lock)  
**Baseline**: v2.0 Development Workflow + Phase 5C Product Landing Complete  
**Governing Documents**:
- DEVELOPMENT-WORKFLOW-v2.md (OFFICIAL)
- PHASE5-COMMERCE-EXPERIENCE-BLUEPRINT.md (APPROVED)
- ADR-001: LINE-First Commerce Landing Platform (APPROVED)
- ADR-002: Acquisition Architecture (APPROVED)
- ADR-003: LINE Commerce Architecture (APPROVED)
- PHASE5C-PRODUCT-LANDING-BLUEPRINT.md (APPROVED)
- Phase 5D Blueprint Audit (PASS_WITH_RECOMMENDATIONS)
- REPOSITORY-STRUCTURE-GUIDE.md
- LEAN-REPORTING-POLICY.md

**Objective**: Define the complete architecture for the Information Experience surfaces (/information/[slug]) as brand trust, compliance, and research pages. These are the second spoke in the Hub-and-Spoke model, supporting broad and research traffic while feeding qualified users toward Product Landing Pages or LINE.

---

## 1. Information Authority

Information Authority is a **separate brand-level authority** from Product Authority.

- Single Source of Truth for non-product information content.
- Covers corporate/brand trust and compliance topics.
- Owned at the platform governance level (not per-product).
- Core facts (titles, slugs, metadata, key claims) live here.
- Rich narrative and sections augment but do not override core facts.

This authority supports SEO/AI-SEO for brand, privacy, quality, and policy queries.

---

## 2. Information Entity

Extend the existing entity model:

```ts
export type EntityType = 'product' | 'information' | 'knowledge';

interface Information {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  sections: InformationSection[];   // structured blocks (hero, body, list, etc.)
  relatedProducts?: string[];       // slugs for cross-linking
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
  cta?: {
    label: string;
    linePayload?: Record<string, any>;
  };
}
```

- Slug-based lookup (e.g. "quality", "privacy").
- Loaded via extended `loadEntity('information', slug)` and dedicated `loadInformationBySlug`.
- Lightweight compared to Product (no pricing, no LINE payload core).

Entity loader must be extended to return real data for 'information' type (currently stub).

---

## 3. Content Layer

**Hybrid model** (consistent with Product Authority lessons from PRE-WP00 / Phase 5C):

- Core metadata + list: `content/information.ts` (or `content/information/index.ts`).
- Rich section content: Structured TypeScript objects (or future Markdown with frontmatter).
- Separate from:
  - `content/products.ts` (Product Authority — untouched)
  - `sections/*.ts` (frozen homepage content)
- No direct mutation of Product data.
- Content is static, version-controlled, and type-safe.

Core pages will be defined for the following slugs (initial set):

- about
- quality
- privacy
- shipping
- contact
- terms

---

## 4. Template Architecture

Thin page at:
`app/(platform)/information/[slug]/page.tsx`

Responsibilities:
- Load Information entity via entity-loader.
- Call generateMetadata using SEO helpers.
- Render reusable platform components.
- Inject structured data (JSON-LD).
- Support Commerce Context (read + enrich).
- Handle notFound() for unknown slugs.
- Use generateStaticParams() for the 6 core slugs.

Template composition (example order):
1. InformationHero
2. Main content blocks (rich text / lists / cards)
3. Trust / compliance highlights
4. Related Products (optional cross-link to PLP)
5. LINE CTA (context-aware)
6. Breadcrumbs / navigation

Follow the same patterns established in the Product Landing Page template (Hero → sections → Related → CTA + structured data).

---

## 5. Platform Components

New components under `components/platform/` (following product-* naming and contracts):

- information-hero.tsx
- information-content.tsx (or block primitives)
- information-trust.tsx
- information-related-products.tsx (reuses or adapts product-related logic)
- information-cta.tsx (or reuse/extend existing CTA patterns)

**Rules**:
- Pure presentation components.
- Accept typed props from Information entity + CommerceContext.
- Safe empty states when data is missing.
- Mobile-first, consistent with frozen homepage visual language where applicable.
- No direct imports of homepage sections.

Reuse shared UI primitives (from WS-01) where possible.

---

## 6. Routing Strategy

- Next.js App Router with `(platform)` route group.
- Path: `/information/[slug]`
- Shared layout: `app/(platform)/information/layout.tsx` (minimal skeleton exists; extend for navigation/context if needed).
- `generateStaticParams()`: Return the 6 core slugs for SSG.
- Dynamic fallback for future slugs (but core set is pre-rendered).
- All pages must accept and forward Commerce Context (query params or server enrichment).
- Consistent with `/products/[slug]` routing.

Homepage remains primary entry. Information pages serve research and brand traffic.

---

## 7. Storage Strategy

Hybrid (as defined in Phase 5 architecture):

- Authority data in TypeScript content files (`content/information.ts`).
- No database or external CMS in this phase.
- Entity loader acts as the access layer.
- Content is portable, type-checked at build, and easy to audit.
- Future migration path to headless CMS noted but out of scope for 5D.

This approach proved successful for Product Authority and homepage sections.

---

## 8. SEO Strategy

Extend existing SEO utilities:

- Add `generateInformationMetadata(info, baseUrl)`
- Add `generateInformationJsonLd(info)` (WebPage, AboutPage, or Organization as appropriate)
- Add breadcrumb support
- Combine into `generateInformationStructuredData`

Usage:
- `generateMetadata()` in the page
- Inline `<script type="application/ld+json">` for structured data

Keywords and descriptions optimized for trust, compliance, policy, and brand queries.

Follow the same structure as `lib/platform/seo.ts` product functions (do not duplicate core logic).

---

## 9. Relationship with Homepage

- Homepage (Sections 1–11) remains **completely frozen**.
- No visual, DOM, or section changes.
- Non-breaking links from homepage (nav, teasers, or existing content) to `/information/[slug]` are permitted.
- Information pages may link back to homepage or product catalog.
- Information pages support "research" traffic that homepage funnels into deeper trust content.

---

## 10. Relationship with Product Authority

- Strict separation of concerns.
- Information pages **may** reference products (e.g. "Quality standards apply to all products" with links to related PLPs).
- Product pages **may** link to shared information pages (e.g. shipping policy, privacy).
- Product Authority (`content/products.ts`) is never modified by Information work.
- No shared data mutation. Cross-linking only via slugs.

This preserves the Single Source of Truth model established in Phase 4/5C.

---

## 11. Implementation Scope

In-scope for Phase 5D Batch (per v2.0):

- Define Information type / interface.
- Create `content/information.ts` with the 6 core pages populated at minimum viable level.
- Extend `lib/platform/entity-loader.ts` (loadInformationBySlug, getAllInformation, update loadEntity).
- Implement Information page template (`app/(platform)/information/[slug]/page.tsx`).
- Create 4–6 new platform components (listed in section 5).
- Extend `lib/platform/seo.ts` with information helpers + JSON-LD.
- Add Commerce Context reading / enrichment in the template and CTA.
- Basic related products cross-linking.
- Structured data and metadata.
- generateStaticParams for the 6 core slugs.
- notFound handling.
- Safe fallbacks / empty states.

**Core slugs (required)**:
- about
- quality
- privacy
- shipping
- contact
- terms

Batch must be completed as one controlled unit under Scope Lock.

---

## 12. Out-of-Scope

- Knowledge pages (Phase 5E).
- Large-scale rich content population or full editorial CMS.
- Any changes to Product Authority or `/products/[slug]` pages.
- Any modifications to frozen homepage (`sections/`, app/page.tsx).
- Advanced search, filters, or information hub page.
- Checkout, accounts, or Phase 6+ surfaces.
- Major Commerce Context wiring (full 5F scope — basic support only in 5D).
- Performance / ads pilot work (5H).
- Sitemap / full internal linking (5G).

---

## 13. Commerce Context Support

Every Information page **must**:

- Accept Commerce Context (via URL params or server-side enrichment).
- Pass enriched context to LINE CTA (using existing line-message-builder patterns).
- Preserve context when linking to related Product pages or homepage.
- Include context in any analytics or event dispatch (when wired in later phases).

This ensures consistent attribution from research traffic through to LINE conversion.

Minimal requirement: Read context on load and attach to primary CTA. Full bidirectional wiring deferred to 5F.

---

## 14. Success Criteria

- All 6 core slugs render correctly via SSG.
- Information Authority data is the single source for page content.
- SEO metadata and JSON-LD are present and valid.
- Commerce Context flows through to LINE CTA.
- No regression on existing product pages or frozen homepage.
- Pages are mobile-first, accessible, and follow established component contracts.
- Validation (lint + typecheck + build) passes cleanly.
- Independent Implementation Audit can map every deliverable to this Blueprint.

---

## 15. Risks

- Insufficient content depth in initial 6 pages leading to thin SEO value.
- Inconsistent styling if new information components diverge from product template language.
- Missing Commerce Context on first implementation (breaking attribution).
- Over-expansion of scope into Knowledge or advanced features during Batch.
- Maintenance burden if core facts are duplicated instead of centralized in content/information.ts.

**Mitigations** (to be enforced in Scope Lock and Audit):
- Strict file list in Scope Lock.
- Explicit Commerce Context requirement in this Blueprint.
- Use of existing patterns and reuse where possible.
- Blueprint Compliance Matrix required in post-implementation audit.

---

## 16. Audit Recommendations Accepted

From Phase 5D Blueprint Audit (PASS_WITH_RECOMMENDATIONS):

- **Accepted**: Persist this Blueprint as Level A document in `docs/architecture/` before Scope Lock.
- **Accepted**: Explicitly require Commerce Context support in the template and CTA.
- **Accepted**: Add minimal Information entity type definition during implementation.
- **Accepted**: List exact core slugs in Scope Lock and this document.
- **Accepted**: Ensure generateStaticParams and SEO follow the established product page pattern.

No critical architectural issues were identified. All recommendations have been incorporated into this Final Blueprint.

---

## 17. Implementation Sequence (Recommended for Phase 5D Batch)

1. Define Information entity type and populate `content/information.ts` for 6 slugs.
2. Extend entity-loader with information loading functions.
3. Implement SEO helpers in lib/platform/seo.ts.
4. Build Information page template with Commerce Context support.
5. Create platform components (hero, content, trust, related, cta).
6. Add structured data and metadata.
7. Wire basic LINE CTA with context.
8. Run continuous validation.
9. Prepare for Independent Implementation Audit.

---

**Governing Principles**:
- Blueprint is the single Architectural Authority (per DEVELOPMENT-WORKFLOW-v2.0).
- One Batch = One Spoke (Information Experience).
- Homepage and Product Authority remain protected.
- All work must pass Validation, Independent Audit, and SA Final Review before Closeout.

This document supersedes any prior chat-only descriptions of Phase 5D Information Experience and serves as the official binding reference for Scope Lock and Batch Implementation.
