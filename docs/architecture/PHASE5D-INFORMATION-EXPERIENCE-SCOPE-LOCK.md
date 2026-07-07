# PHASE5D-INFORMATION-EXPERIENCE-SCOPE-LOCK.md (v1.0)

**Project:** ZENOVELL-PIMPZ-V4-Active  
**Phase:** 5D — Information Experience  
**Milestone:** Information Experience Scope Lock  
**Version:** v1.0  
**Status:** Locked  
**Date:** 2026-07-07  

---

## 1. Scope

This document locks the scope for Phase 5D Information Experience.

It ensures that all implementation stays strictly within the boundaries defined in the approved PHASE5D-INFORMATION-EXPERIENCE-BLUEPRINT.md and prevents scope creep.

**Core Objective (from Blueprint):**  
Implement the Information Experience surfaces as a second spoke in the Hub-and-Spoke model. Provide brand trust, compliance, and research pages at `/information/[slug]` for the following core slugs using an entity-driven architecture with a separate Information Authority.

**In Scope (Locked):**
- Information Authority definition and population for 6 core pages.
- Extension of the entity model for 'information' type.
- Reusable Information page template and platform components.
- Hybrid content layer (`content/information.ts`).
- SEO / structured data extensions (information-specific).
- Basic Commerce Context support in the template and primary CTA (read + enrich for LINE handoff).
- generateStaticParams, generateMetadata, notFound handling for the 6 slugs.
- Safe fallbacks and empty states.
- Cross-linking to related products (read-only from Product Authority).
- All work follows Development Workflow v2.0 (Blueprint → Scope Lock → Batch Implementation → Validation → Independent Implementation Audit → SA Final Review).

**Batch Size:** One controlled batch for the entire Information Experience spoke only.

---

## 2. Allowed Files

Only the following files and folders **MAY** be created or modified during Batch Implementation. Any change outside this list is a scope violation.

```
app/(platform)/information/**
  - layout.tsx (enhancements only)
  - [slug]/page.tsx (full template implementation)

content/information.ts

components/platform/
  - information-hero.tsx
  - information-content.tsx
  - information-trust.tsx
  - information-related-products.tsx
  - information-cta.tsx

lib/platform/
  - entity-loader.ts (extensions only: loadInformationBySlug, getAllInformation, update loadEntity)
  - seo.ts (additions only: generateInformationMetadata, generateInformationJsonLd, generateInformationStructuredData, etc.)

# Optional type definitions if colocated (recommended to keep in content/information.ts or minimal interface addition)
# No other new files or directories outside the above without explicit Scope Lock update.
```

**Notes on Allowed:**
- Edits to existing skeletons (page.tsx, layout.tsx, entity-loader.ts, seo.ts) are permitted **only** for Phase 5D Information functionality.
- New files must follow the exact naming and locations above.
- All changes must be traceable to a specific Blueprint section.

---

## 3. Forbidden Files

The following are **strictly forbidden** to modify, delete, or create changes in during this phase. Violations will cause immediate Scope Lock failure.

- `app/page.tsx`
- `sections/**` (all homepage sections — FROZEN)
- `content/products.ts` (Product Authority — untouched)
- `components/sections/**`
- `app/(platform)/products/**`
- `lib/commerce/**` (any core commerce contracts)
- `components/platform/product-*.tsx` (existing Phase 5C components — no modifications)
- Any other completed Phase 5C implementation files (product template, existing platform components, product SEO functions beyond additive information helpers)
- `app/(platform)/knowledge/**`
- Any files under `lib/platform/` not explicitly listed in Allowed
- Any changes that introduce new dependencies, new route groups, or affect frozen areas
- Direct modifications to shared UI primitives that would impact homepage or products

**Additional Protection:**
- No changes to Commerce Context contracts or LINE Message Builder (basic usage only via existing patterns).
- No performance/SEO expansion beyond the information page metadata (5G is separate phase).

---

## 4. Deliverables Matrix

Every deliverable defined in the PHASE5D-INFORMATION-EXPERIENCE-BLUEPRINT.md must map to implementation artifacts. The following matrix locks the traceability:

| Blueprint Deliverable                          | Target Files / Artifacts                                      | Notes |
|------------------------------------------------|---------------------------------------------------------------|-------|
| Information Authority + core data              | content/information.ts                                        | 6 core slugs with minimal viable structured content |
| Information Entity (type + loader)             | lib/platform/entity-loader.ts + content/information.ts        | Extend EntityType usage and add loadInformationBySlug / getAllInformation |
| Content Layer (Hybrid)                         | content/information.ts                                        | Separate from products.ts and sections/ |
| Template Architecture                          | app/(platform)/information/[slug]/page.tsx                    | Thin page + composition of components + generateStaticParams + generateMetadata + notFound |
| Platform Components (5)                        | components/platform/information-hero.tsx<br>components/platform/information-content.tsx<br>components/platform/information-trust.tsx<br>components/platform/information-related-products.tsx<br>components/platform/information-cta.tsx | Follow product-* contracts and patterns |
| Routing Strategy                               | app/(platform)/information/** (page + layout)                 | generateStaticParams for 6 slugs, (platform) group |
| Storage Strategy (Hybrid)                      | content/information.ts                                        | TS content files, no DB |
| SEO Strategy                                   | lib/platform/seo.ts                                           | Additive: generateInformationMetadata, generateInformationJsonLd, generateInformationStructuredData + usage in page |
| Homepage relationship                          | (No files changed — policy only)                              | Non-breaking links only; frozen homepage protected |
| Product Authority relationship                 | (Read-only usage in related + content)                        | No mutations to content/products.ts or product components |
| Commerce Context support                       | app/(platform)/information/[slug]/page.tsx + information-cta.tsx | Read + enrich for LINE CTA (basic per Blueprint section 13) |
| Structured Data + Metadata                     | lib/platform/seo.ts + page.tsx                                | JSON-LD script + generateMetadata |
| Core slugs                                     | content/information.ts + generateStaticParams                 | about, quality, privacy, shipping, contact, terms |
| Success Criteria / Risks / Audit notes         | This Scope Lock + post-implementation evidence                | Compliance Matrix required |

---

## 5. Batch Boundary

**One Batch = One Spoke**

- Phase 5D Information Experience **only**.
- Explicitly excludes:
  - Knowledge pages (Phase 5E)
  - Full Commerce Wiring (Phase 5F)
  - SEO / AI SEO / Sitemap expansion (Phase 5G)
  - Pilot Ads & Analytics (Phase 5H)
  - Any cross-spoke work
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
- **No Regression** — Existing product pages, entity loader for products, homepage (frozen), and build output remain unaffected.
- **Validation PASS** — Full `npm run validate` output included in audit evidence.

Audit produces recommendations only. It does not redesign or expand scope.

---

## 8. Exit Criteria

Phase 5D Scope Lock is released and Batch may proceed only after this document is approved. Phase 5D is considered complete only when **all** of the following are satisfied:

- Implementation Complete per Deliverables Matrix and Blueprint
- Validation PASS (`npm run validate`)
- Independent Implementation Audit PASS (including Compliance Matrix + Delta + Scope Verification + No Regression)
- SA Final Review (Accept)
- Git Commit
- GitHub Push
- CI PASS
- Working Tree CLEAN

Only then may the next phase (or 5E) be considered.

---

## 9. Risks

**Implementation Risks:**
- Insufficient depth in the 6 core pages resulting in weak SEO value.
- Inconsistent component styling vs. established product template patterns.
- Commerce Context not properly attached to CTAs on first pass.
- Entity loader extensions introducing type issues.

**Scope Creep Risks:**
- Accidental inclusion of Knowledge content or advanced features.
- Modifying frozen homepage or Product Authority while implementing cross-references.
- Expanding SEO helpers beyond information-specific needs.
- Touching lib/commerce or Phase 5C product components.

**Mitigation:**
- Strict Allowed/Forbidden lists in this document.
- Continuous validation + stop-on-conflict rule.
- Blueprint Compliance Matrix enforced in Audit.
- All changes must reference specific Blueprint section numbers.
- Pre-audit git diff review against Scope Lock.

---

## 10. Success Criteria

Exactly as defined in the approved PHASE5D-INFORMATION-EXPERIENCE-BLUEPRINT.md (Section 14):

- All 6 core slugs (about, quality, privacy, shipping, contact, terms) render correctly via SSG.
- Information Authority data is the single source for page content.
- SEO metadata and JSON-LD are present and valid.
- Commerce Context flows through to LINE CTA (basic support).
- No regression on existing product pages or frozen homepage.
- Pages are mobile-first, accessible, and follow established component contracts.
- Validation (lint + typecheck + build) passes cleanly.
- Independent Implementation Audit can map every deliverable to this Blueprint and the parent Blueprint.

---

## Change Control

Any change to this Scope Lock requires:
- Version bump of this document.
- Update to the parent Blueprint (if architectural).
- Re-approval by System Architect.
- New Scope Lock iteration before resuming or expanding Batch.

**Governing Documents:**
- PHASE5D-INFORMATION-EXPERIENCE-BLUEPRINT.md (SA Final Approved)
- DEVELOPMENT-WORKFLOW-v2.0 (OFFICIAL)
- PHASE5-COMMERCE-EXPERIENCE-BLUEPRINT.md
- ADR-001, ADR-002, ADR-003
- REPOSITORY-STRUCTURE-GUIDE.md

This Scope Lock is the final gate before Batch Implementation under Workflow v2.0.

**Status:** LOCKED — No implementation may begin until this document is committed and pushed.
