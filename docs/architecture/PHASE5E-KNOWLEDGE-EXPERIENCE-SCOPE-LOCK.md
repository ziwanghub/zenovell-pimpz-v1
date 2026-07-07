# PHASE5E-KNOWLEDGE-EXPERIENCE-SCOPE-LOCK.md (v1.0)

**Project:** ZENOVELL-PIMPZ-V4-Active  
**Phase:** 5E — Knowledge Experience  
**Milestone:** Knowledge Experience Scope Lock  
**Version:** v1.0  
**Status:** Locked  
**Date:** 2026-07-07  

---

## 1. Scope

This document locks the scope for Phase 5E Knowledge Experience.

It ensures that all implementation stays strictly within the boundaries defined in the approved PHASE5E-KNOWLEDGE-EXPERIENCE-BLUEPRINT.md and prevents scope creep.

**Core Objective (from Blueprint):**  
Implement the Knowledge Experience surfaces as the third spoke in the Hub-and-Spoke model. Provide educational, long-tail SEO and AI-SEO optimized content at `/knowledge/[slug]` for the 6 core topics using an entity-driven architecture with a separate Knowledge Authority.

**In Scope (Locked):**
- Knowledge Authority definition using Option C storage (content/knowledge/ directory).
- Knowledge Entity Contract with expanded KnowledgeSection types and full metadata.
- Reusable Knowledge page template and platform components.
- SEO / structured data extensions (knowledge-specific).
- Basic Commerce Context support in the template and primary CTA (read + enrich for LINE handoff).
- generateStaticParams, generateMetadata, notFound handling for the 6 slugs.
- Safe fallbacks and empty states.
- Cross-linking to related products and related information (read-only).
- All work follows Development Workflow v2.0 (Blueprint → Scope Lock → Batch Implementation → Validation → Independent Implementation Audit → SA Final Review).

**Batch Size:** One controlled batch for the entire Knowledge Experience spoke only.

---

## 2. Allowed Files

Only the following files and folders **MAY** be created or modified during Batch Implementation. Any change outside this list is a scope violation.

```
app/(platform)/knowledge/**
  - layout.tsx (enhancements only)
  - [slug]/page.tsx (full template implementation)

content/knowledge/
  - index.ts
  - ingredient-guide.ts
  - product-usage-guide.ts
  - buying-guide.ts
  - safe-purchase-education.ts
  - line-ordering-guide.ts
  - wellness-education.ts

components/platform/
  - knowledge-hero.tsx
  - knowledge-article.tsx
  - knowledge-takeaways.tsx
  - knowledge-related.tsx
  - knowledge-cta.tsx

lib/platform/
  - entity-loader.ts (extensions only: loadKnowledgeBySlug, getAllKnowledge, update loadEntity)
  - seo.ts (additions only: generateKnowledgeMetadata, generateKnowledgeJsonLd, generateKnowledgeStructuredData, etc.)

# Optional type definitions if colocated (e.g. types/knowledge.ts)
# No other new files or directories outside the above without explicit Scope Lock update.
```

**Notes on Allowed:**
- Edits to existing skeletons (page.tsx, layout.tsx, entity-loader.ts, seo.ts) are permitted **only** for Phase 5E Knowledge functionality.
- New files must follow the exact naming and Option C directory structure above.
- All changes must be traceable to a specific Blueprint section.

---

## 3. Forbidden Files

The following are **strictly forbidden** to modify, delete, or create changes in during this phase. Violations will cause immediate Scope Lock failure.

- `app/page.tsx`
- `sections/**` (all homepage sections — FROZEN)
- `content/products.ts` (Product Authority — untouched)
- `content/information.ts` (Information Authority — untouched)
- `components/sections/**`
- `app/(platform)/products/**`
- `app/(platform)/information/**`
- `lib/commerce/**` (any core commerce contracts)
- `components/platform/product-*.tsx` (existing Phase 5C components)
- `components/platform/information-*.tsx` (existing Phase 5D components)
- Any other completed Phase 5C or Phase 5D implementation files
- Any files under `lib/platform/` not explicitly listed in Allowed
- Any changes that introduce new dependencies, new route groups, or affect frozen areas
- Direct modifications to shared UI primitives that would impact homepage, products, or information

**Additional Protection:**
- No changes to Commerce Context contracts or LINE Message Builder (basic usage only via existing patterns).
- No performance/SEO expansion beyond the knowledge page metadata (5G is separate phase).
- No cross-spoke work.

---

## 4. Deliverables Matrix

Every deliverable defined in the PHASE5E-KNOWLEDGE-EXPERIENCE-BLUEPRINT.md must map to implementation artifacts. The following matrix locks the traceability:

| Blueprint Deliverable                          | Target Files / Artifacts                                      | Notes |
|------------------------------------------------|---------------------------------------------------------------|-------|
| Knowledge Authority + Option C storage         | content/knowledge/index.ts + 6 topic .ts files                | Expanded section types + full metadata |
| Knowledge Entity Contract                      | content/knowledge/index.ts                                    | Includes relatedKnowledge, readingTime, difficulty, etc. |
| Knowledge Content Layer                        | content/knowledge/ (all files)                                | Separate from products.ts and information.ts |
| Template Architecture                          | app/(platform)/knowledge/[slug]/page.tsx                      | Thin page + composition + generateStaticParams + generateMetadata + notFound |
| Platform Components (5)                        | components/platform/knowledge-hero.tsx<br>knowledge-article.tsx<br>knowledge-takeaways.tsx<br>knowledge-related.tsx<br>knowledge-cta.tsx | Follow information/product contracts |
| Routing Strategy                               | app/(platform)/knowledge/** (page + layout)                   | generateStaticParams for 6 slugs |
| SEO / AI SEO / Structured Data                 | lib/platform/seo.ts                                           | Additive knowledge helpers |
| Commerce Context Support                       | app/(platform)/knowledge/[slug]/page.tsx + knowledge-cta.tsx  | Read + enrich for LINE CTA |
| Related links (Products + Information + Knowledge) | knowledge-related.tsx + topic files                           | Read-only slug references only |
| Structured Data per topic                      | lib/platform/seo.ts + page.tsx                                | Article / HowTo / FAQPage as appropriate |
| Initial 6 Topics                               | content/knowledge/*.ts                                        | ingredient-guide, product-usage-guide, buying-guide, safe-purchase-education, line-ordering-guide, wellness-education |
| Success Criteria / Risks / Audit notes         | This Scope Lock + post-implementation evidence                | Compliance Matrix required |

---

## 5. Batch Boundary

**One Batch = One Spoke**

- Phase 5E Knowledge Experience **only**.
- Explicitly excludes:
  - Any Phase 5F Commerce Wiring
  - Any Phase 5G SEO / Sitemap / global expansion
  - Homepage or sections changes
  - Modifications to Product or Information Authorities (except read-only cross-references)
  - Additional topics beyond the 6 defined
- Implementation Agent must complete the entire approved scope in one controlled batch.
- Continuous `npm run validate` required during development.
- Stop immediately on any architectural conflict or Scope Lock violation.

This boundary is per DEVELOPMENT-WORKFLOW-v2.0 Rule 3.

---

## 6. Validation Requirements

**Mandatory before any handoff or audit:**

```bash
npm run validate
```

Which executes:
- lint
- typecheck
- build

All must pass with zero errors. Validation must be clean at the start of Batch and before Independent Implementation Audit.

---

## 7. Audit Acceptance Criteria

The Independent Implementation Audit **must** verify and produce evidence for:

- **Blueprint Compliance Matrix** — Explicit mapping of every Blueprint section to delivered files/artifacts (use section 4 above as baseline).
- **Delta vs Blueprint** — Clear summary of implemented items, gaps (must be zero), and any deviations (must be zero or pre-approved).
- **Scope Lock Verification** — Confirmation that only Allowed Files were modified and no Forbidden Files were touched.
- **No Regression** — Existing product pages, information pages, entity loader for other entities, homepage (frozen), and build output remain unaffected.
- **Validation PASS** — Full `npm run validate` output included in audit evidence.

Audit produces **recommendations only**. It does not redesign or expand scope.

---

## 8. Exit Criteria

Phase 5E Scope Lock is released and Batch may proceed only after this document is approved. Phase 5E is considered complete only when **all** of the following are satisfied:

- Implementation Complete per Deliverables Matrix and Blueprint
- Validation PASS (`npm run validate`)
- Independent Implementation Audit PASS (including Compliance Matrix + Delta + Scope Verification + No Regression)
- SA Final Review (Accept)
- Git Commit
- GitHub Push
- CI PASS
- Working Tree CLEAN

Only then may the next phase be considered.

---

## 9. Risks

**Implementation Risks:**
- Content depth insufficient for AI/SEO value in initial 6 topics.
- Inconsistent component styling vs. established 5D patterns.
- Commerce Context not properly attached to CTAs on first pass.
- Entity loader extensions introducing type issues for knowledge.

**Scope Creep Risks:**
- Accidental inclusion of 5F/5G work or additional topics.
- Touching frozen homepage, Product Authority, or Information Authority while implementing cross-references.
- Expanding SEO helpers beyond knowledge-specific needs.
- Touching lib/commerce or prior Phase 5C/5D components.

**Mitigation:**
- Strict Allowed/Forbidden lists in this document.
- Continuous validation + stop-on-conflict rule.
- Blueprint Compliance Matrix enforced in Audit.
- All changes must reference specific Blueprint section numbers.
- Pre-audit git diff review against Scope Lock.

---

## 10. Success Criteria

Exactly as defined in the approved PHASE5E-KNOWLEDGE-EXPERIENCE-BLUEPRINT.md (Section 17):

- All 6 core topics render correctly via SSG.
- Knowledge Authority is the single source for educational content.
- SEO metadata, JSON-LD, and reading metadata are complete.
- Commerce Context flows to LINE CTA.
- Clear separation from Product and Information Authorities.
- No regression on existing surfaces.
- Validation (lint + typecheck + build) passes cleanly.
- Independent Implementation Audit can map every deliverable to this Blueprint.

---

## Change Control

Any change to this Scope Lock requires:
- Version bump of this document.
- Update to the parent Blueprint (if architectural).
- Re-approval by System Architect.
- New Scope Lock iteration before resuming or expanding Batch.

**Governing Documents:**
- PHASE5E-KNOWLEDGE-EXPERIENCE-BLUEPRINT.md (SA Final Approved)
- DEVELOPMENT-WORKFLOW-v2.0 (OFFICIAL)
- PHASE5-COMMERCE-EXPERIENCE-BLUEPRINT.md
- ADR-001, ADR-002, ADR-003
- REPOSITORY-STRUCTURE-GUIDE.md

This Scope Lock is the final gate before Batch Implementation under Workflow v2.0.

**Status:** LOCKED — No implementation may begin until this document is committed and pushed.
