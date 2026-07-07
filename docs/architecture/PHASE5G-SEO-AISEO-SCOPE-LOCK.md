# PHASE5G-SEO-AISEO-SCOPE-LOCK.md (v1.0)

**Project:** ZENOVELL-PIMPZ-V4-Active  
**Phase:** 5G — SEO / AI SEO Experience  
**Milestone:** SEO / AI SEO Scope Lock  
**Version:** v1.0  
**Status:** Locked  
**Date:** 2026-07-07  

---

## 1. Scope

This document locks the scope for Phase 5G SEO / AI SEO Experience.

It ensures that all implementation stays strictly within the boundaries defined in the approved PHASE5G-SEO-AISEO-BLUEPRINT.md and prevents scope creep.

**Core Objective (from Blueprint):**  
Establish site-level SEO and AI SEO foundation to make the existing Product, Information, and Knowledge surfaces discoverable, indexable, and authoritative for both search engines and AI crawlers/LLMs. This includes root metadata, robots.txt, sitemap, llms.txt, consistent structured data, and strategic internal linking — all as additive, non-breaking changes.

**In Scope (Locked):**
- Update root metadata in app/layout.tsx.
- Create and implement public/robots.txt.
- Implement dynamic sitemap (app/sitemap.ts) using entity authority getters.
- Create public/llms.txt.
- Enhance structured data and metadata helpers in lib/platform/seo.ts (additive only for site-level and AI signals).
- Improve internal linking and breadcrumbs consistency (additive where applicable without touching frozen areas).
- All work follows Development Workflow v2.0 (Blueprint → Scope Lock → Batch Implementation → Validation → Independent Implementation Audit → SA Final Review).

**Batch Size:** One controlled batch for SEO / AI SEO Experience only.

---

## 2. Allowed Files

Only the following files and folders **MAY** be created or modified during Batch Implementation. Any change outside this list is a scope violation.

```
app/layout.tsx
app/sitemap.ts

public/robots.txt
public/llms.txt

lib/platform/seo.ts
```

**Notes on Allowed:**
- Edits limited to site-level SEO/AI SEO wiring points.
- app/sitemap.ts MUST use the same entity authority getters:
  - getAllProducts()
  - getAllInformation()
  - getAllKnowledge()
- Changes must be traceable to specific Blueprint sections (e.g. 3. SEO Architecture, 4. Site-level SEO, 5. AI SEO Strategy, 6. Structured Data Strategy, 7. Internal Linking Strategy).
- Only additive extensions. No modifications to core per-entity logic unless purely additive for site-level signals.
- No other files or directories.

---

## 3. Forbidden Files

The following are **strictly forbidden** to modify, delete, or create changes in during this phase. Violations will cause immediate Scope Lock failure.

- `app/page.tsx`
- `sections/**` (all homepage sections — FROZEN)
- `content/products.ts` (Product Authority — untouched)
- `content/information.ts` (Information Authority — untouched)
- `content/knowledge/**` (Knowledge Authority — untouched)
- Any Authority data files
- Checkout, CRM, or commerce logic changes
- Phase 5F Commerce Wiring files outside approved scope
- Analytics adapters or external dispatchers
- Major refactors or new surfaces
- Breaking changes to existing contracts or per-entity SEO helpers
- Any files not explicitly listed in Allowed

**Additional Protection:**
- No changes to frozen homepage visual/DOM or content.
- No scope expansion into full performance overhaul or Phase 5H pilots.
- Strict adherence to "no authority mutations".

---

## 4. Deliverables Matrix

Every deliverable defined in the PHASE5G-SEO-AISEO-BLUEPRINT.md must map to implementation artifacts. The following matrix locks the traceability:

| Blueprint Deliverable                          | Target Files / Artifacts                                      | Notes |
|------------------------------------------------|---------------------------------------------------------------|-------|
| 3. SEO Architecture (Root Metadata, Metadata Strategy, Canonical, OG, Twitter) | app/layout.tsx, lib/platform/seo.ts | Update root; enhance helpers additively |
| 4. Site-level SEO (robots.txt, sitemap.xml, indexing, crawl) | public/robots.txt, app/sitemap.ts | Dynamic sitemap using entity getters; reference sitemap in robots |
| 5. AI SEO Strategy (llms.txt, entity summaries, author/publisher, dates, authoritative signals) | public/llms.txt, lib/platform/seo.ts | Add llms.txt; enhance schema with dates/author |
| 6. Structured Data Strategy (Organization, WebSite, Product, Article, HowTo, FAQPage, BreadcrumbList) | lib/platform/seo.ts | Extend existing functions additively |
| 7. Internal Linking Strategy (Hierarchy, Related rules, Breadcrumbs, Homepage) | (Policy + additive in existing linking where allowed) | Use existing related components; no new files |
| 8-9. Relationships & Implementation Scope     | All listed Allowed files                                      | Consume only; one batch |
| 10-11. Out-of-Scope & Success Criteria        | This Scope Lock + post-audit evidence                         | Strict adherence |
| 12. Risks & Mitigations                       | This document + Implementation Checklist                      | As defined in Blueprint |
| 13-14. Sequence & Audit Criteria              | This Scope Lock                                               | Compliance Matrix required |

---

## 5. Batch Boundary

**One Batch = SEO / AI SEO Experience only.**

- Phase 5G SEO / AI SEO **only**.
- Explicitly excludes:
  - Any changes to Product, Information, or Knowledge Authority data.
  - Homepage or sections/** modifications (frozen).
  - Commerce Wiring (Phase 5F).
  - New pages, content creation, or major refactors.
  - Analytics adapters, Phase 5H pilots, or external systems.
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
  - Specifically verify: app/sitemap.ts uses getAllProducts(), getAllInformation(), getAllKnowledge().
- **No Regression** — Existing surfaces, authorities, frozen homepage, and commerce context remain unaffected.
- **Validation PASS** — Full `npm run validate` output included in audit evidence.

Audit produces **recommendations only**. It does not redesign or expand scope.

---

## 8. Exit Criteria

Phase 5G is considered complete only when **all** of the following are satisfied:

- Implementation Complete per Deliverables Matrix and Blueprint
- Validation PASS (`npm run validate`)
- Independent Implementation Audit PASS (including Compliance Matrix + Delta + Scope Verification + No Regression)
- SA Final Review (Accept)
- Git Commit
- GitHub Push
- CI PASS
- Working Tree CLEAN

---

## 9. Risks

**Implementation Risks:**
- Root metadata changes affecting current (dev) indexing if not tested.
- Sitemap generation errors if entity getters are not used correctly (must use getAll*()).
- Over-optimization for AI making content feel unnatural.
- Inconsistent date/author handling if not pulled from existing content metadata.

**Scope Creep Risks:**
- Touching Authority data or frozen homepage while "enhancing linking".
- Expanding into full performance or external systems.
- Modifying per-entity logic beyond site-level signals.

**Mitigation:**
- Strict Allowed/Forbidden lists in this document.
- Mandate use of entity getters in sitemap.
- Continuous validation + stop-on-conflict rule.
- Blueprint Compliance Matrix enforced in Audit.
- All changes must reference specific Blueprint section numbers.
- Pre-audit git diff review against this Scope Lock.

---

## 10. Success Criteria

Exactly as defined in the approved PHASE5G-SEO-AISEO-BLUEPRINT.md (Section 11):

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

## Change Control

Any change to this Scope Lock requires:
- Version bump of this document.
- Update to the parent Blueprint (if architectural).
- Re-approval by System Architect.
- New Scope Lock iteration before resuming or expanding Batch.

**Governing Documents:**
- PHASE5G-SEO-AISEO-BLUEPRINT.md (SA Final Approved)
- DEVELOPMENT-WORKFLOW-v2.0 (OFFICIAL)
- PHASE5-COMMERCE-EXPERIENCE-BLUEPRINT.md
- ADR-001, ADR-002, ADR-003
- REPOSITORY-STRUCTURE-GUIDE.md

This Scope Lock is the final gate before Batch Implementation under Workflow v2.0.

**Status:** LOCKED — No implementation may begin until this document is committed and pushed.

**Mandatory Rules:**
- app/sitemap.ts MUST use the same entity authority getters:
  - getAllProducts()
  - getAllInformation()
  - getAllKnowledge()
- Only files explicitly listed in this Scope Lock may be modified.
- No modification to Product Authority, Information Authority, Knowledge Authority, homepage sections, or Commerce Wiring outside the approved scope.