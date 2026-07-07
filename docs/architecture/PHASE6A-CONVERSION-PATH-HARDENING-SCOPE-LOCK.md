# PHASE6A-CONVERSION-PATH-HARDENING-SCOPE-LOCK.md (v1.0)

**Project:** ZENOVELL-PIMPZ-V4-Active  
**Phase:** 6A — Conversion Path Hardening (P0)  
**Milestone:** Scope Lock  
**Version:** v1.0  
**Status:** Locked  
**Date:** 2026-07-07  
**References:**
- docs/architecture/PHASE6A-CONVERSION-PATH-HARDENING-BLUEPRINT.md (SA Approved)
- docs/reports/phase6/PRE-WP00A-PHASE6A-CONVERSION-PATH-HARDENING.md (COMPLETE)
- Codex Phase 6A Blueprint Audit: PASS_WITH_RECOMMENDATIONS
- WORKFLOW-v2.1.md (ACTIVE)
- DEVELOPMENT-LIFECYCLE.md (ACTIVE)
- Phase 5 Frozen Baseline (Homepage sections + visual + contracts)

---

## 1. Executive Summary

This Scope Lock translates the approved Phase 6A Blueprint into a strict, executable implementation boundary.

Phase 6A is **exclusively CTA / LINE / Commerce Context activation** on the homepage.

The goal is to make every primary LINE-branded CTA functional by wiring existing Phase 5 contracts (Commerce Context, CTA Contract, LINE Message Builders, Persistence, Events) using the activation pattern already proven on platform pages.

**Core Rule (enforced):** One Batch = One Spoke. All changes additive. Visual baseline frozen. **No routing whatsoever.**

This document locks the boundary so that implementation cannot bleed into Phase 6B (Platform Routing), 6C, 6D, or any other work.

---

## 2. Scope

### In Scope (Locked)

- Activation of the 8 primary homepage conversion CTA surfaces listed in the Blueprint and PRE-WP00A.
- Use of **existing** contracts only:
  - createCommerceContext / createContextFromProduct (lib/commerce/context.ts)
  - CTA Contract (lib/commerce/cta-contract.ts)
  - buildLineMessage / buildNonProductLineMessage (lib/commerce/line-message-builder.ts)
  - save/load/clearCommerceContext (lib/commerce/persistence.ts)
  - Event dispatch (lib/commerce/events.ts)
- Real LINE handoff using the established pattern: `https://line.me/R/msg/text/?${encodeURIComponent(message)}`
- Analytics enrichment on LINE clicks with context.
- Minimal additive activation helper (if created, must be in lib/commerce/).
- Updates to content data **only** to supply product references or intent metadata for context creation (no new copy, no redesign).
- Preservation and slight improvement of accessibility (aria, focus, keyboard) for the activated CTAs.
- Product Grid CTAs: use product data from the card/content for LINE context **only**. No href changes to platform routes.

All work must be directly traceable to the approved Blueprint sections.

### Out of Scope (Locked)

- Any changes that introduce or enable routing from homepage to platform pages.
- Any UI/visual/layout changes beyond what is strictly necessary for handler attachment.
- Work on informational sections (5-8) unless they contain explicit primary LINE CTAs.
- Any mutation or extension of Product / Information / Knowledge Authorities.
- New features, new sections, or content expansion.
- Mobile premium polish, micro-interactions, density, sticky elements.
- Performance, image strategy, bundle optimization.
- SEO / AI-SEO / structured data changes.
- Platform page modifications.
- Production Readiness, real device testing, LINE OA production verification.
- Any Phase 6B, 6C, 6D, 6E, 6F, 6G items.

---

## 3. Allowed Files

Only the following files **MAY** be created or modified. Any edit outside this list is a Scope Lock violation.

**Homepage Composition**
- app/page.tsx

**Header**
- components/layout/global-header.tsx
- lib/global-header-mapper.ts

**Homepage Sections (CTA activation points only)**
- sections/hero/hero-section.tsx
- sections/section-2-trust-bar/section-2-trust-bar.tsx
- sections/section-3-hero-product/section-3-hero-product.tsx
- sections/section-4-product-catalog/section-4-product-catalog.tsx
- sections/section-9-faq/section-9-faq.tsx
- sections/section-10-final-cta/section-10-final-cta.tsx
- sections/section-11-footer/section-11-footer.tsx

**Content (data only for context/intent)**
- content/hero.ts
- content/section-2-trust-bar.ts
- content/section-3-hero-product.ts
- content/section-4-product-catalog.ts
- content/section-9-faq-content.ts
- content/section-10-final-cta.ts
- content/section-11-footer.ts
- content/site-navigation.ts
- content/products.ts   (read-only reference for product shape in context; no mutation allowed)

**Commerce Contracts (activation wiring)**
- lib/commerce/context.ts
- lib/commerce/cta-contract.ts
- lib/commerce/events.ts
- lib/commerce/line-message-builder.ts
- lib/commerce/persistence.ts

**Optional Additive Helper (if created per Blueprint)**
- lib/commerce/cta-activation.ts   (new file allowed only if it is a thin pure+client wrapper for the activation pattern; must not become new architecture)

**Notes:**
- Only the minimal changes required to attach context creation + LINE handoff.
- Index files (*.ts exports) may be touched only if required for re-exports.
- No other files anywhere in the repository.

---

## 4. Forbidden Files

The following are **strictly forbidden**. Any change, creation, or deletion in these areas violates Scope Lock.

**Routing (absolute prohibition)**
- app/(platform)/**
- app/(platform)/products/[slug]/page.tsx (or any routing changes)
- app/(platform)/information/[slug]/page.tsx
- app/(platform)/knowledge/[slug]/page.tsx
- Any addition of `<Link href="/products/...">` or `router.push` from homepage CTAs or cards.

**Authorities (no mutation)**
- content/products.ts (beyond read for context shape)
- content/information.ts
- content/knowledge/**
- Any other authority or data model files

**Visual / UX Redesign (frozen)**
- All homepage section visual structure, classes, spacing, colors, shadows, typography.
- components/ui/* (except if purely required for handler, which is not expected)
- globals.css
- MobileShell, layout.tsx (except minimal prop passing if unavoidable)

**Other Phases & Non-Goals**
- Any work on sections 5, 6, 7, 8 unless they contain primary LINE CTAs explicitly listed.
- Performance optimization, image strategy, lazy loading changes.
- SEO / AI-SEO / sitemap / metadata changes.
- Desktop or tablet layout work.
- Production Readiness Gate items.
- Any Phase 6B (routing), 6C (CTA standardization), 6D (mobile premium), 6E (a11y sweep), 6F, 6G items.

**General**
- Any file not listed in "Allowed Files".
- New major contracts or architecture layers.
- Breaking changes to existing Phase 5 contracts.

---

## 5. Implementation Batches

**One Batch = One Spoke** (per Workflow v2.1 and Blueprint).

Each batch must be small, focused, and independently auditable.

**Recommended Batches:**

**Batch 1: Shared Activation Pattern**  
- Introduce or finalize thin activation logic (in lib/commerce/cta-activation.ts or equivalent).  
- Ensure all later batches reuse the same pattern for consistency.  
- Validate contracts are used via helpers only.

**Batch 2: Header LINE CTA**  
- Activate the header LINE button (currently Link + analytics only).  
- Implement full context + message + handoff + persist/clear.

**Batch 3: Hero Primary CTA**  
- Convert the decorative <button> in hero-section.tsx into a functional CTA.  
- Use hero-line surface + appropriate context.

**Batch 4: Trust Bar + Featured Product CTA**  
- Activate SolidLineCTA in Trust Bar.  
- Activate CTA in Section 3 (Featured / Hero Product).

**Batch 5: Product Grid CTAs + Product Grid Final CTA**  
- Activate all product card CTAs and the FinalLineCTA in section-4.  
- **CRITICAL:** Use product data from the card / content/section-4-product-catalog.ts + content/products.ts **for LINE context only**.  
- **NO** changes to href, no links to /products/[slug], no routing logic of any kind.

**Batch 6: FAQ CTAs**  
- Activate primary CTA and support card CTAs in section-9-faq.

**Batch 7: Final CTA + Footer LINE CTAs**  
- Activate primary CTA in section-10.  
- Activate LINE entries in section-11-footer (using footer-line / footer-contact-line surfaces).

**Batch 8: Validation + Evidence**  
- Full homepage CTA smoke test across all surfaces.  
- Evidence collection (context objects, generated messages, LINE URLs).  
- Run final `npm run validate`.  
- Prepare for Independent Implementation Audit.

Batches must be executed sequentially with validation after each.

---

## 6. Validation Requirements

**Per Batch (mandatory before considering batch complete):**
- `npm run lint`
- `npm run typecheck`
- `npm run build` (or full validate)

**Final Validation (after Batch 8):**
```bash
npm run validate
```
Must pass cleanly (lint + typecheck + build).

Manual evidence for each activated CTA surface is required for audit.

---

## 7. Audit Acceptance Criteria

The following must be verified in Scope Lock Audit and later Implementation Audits:

- **Blueprint Compliance Matrix**: Every change traces to a specific section of the approved PHASE6A Blueprint.
- **Scope Lock Verification**: Implementation stayed 100% inside Allowed Files and respected all Forbidden items.
- **No Routing Verification**: Zero references to /products/[slug], /information, /knowledge routes from homepage CTAs. Product Grid uses data for context only.
- **No Visual Redesign Verification**: Side-by-side or diff review shows zero drift in layout, colors, spacing, typography, shadows, or component structure.
- **Frozen Baseline Preservation**: app/page.tsx section order and all section components retain original structure and props usage.
- **Commerce Context Verification**: All context created exclusively via `createCommerceContext()` or `createContextFromProduct()`. No raw objects.
- **LINE Handoff Verification**: All primary LINE CTAs use canonical builders + the established `https://line.me/R/msg/text/?...` pattern + window.open.
- **Analytics/Event Verification**: Relevant commerce events dispatched with enriched context on every activated CTA.
- **Accessibility Basic Verification**: Existing aria-labels, focus states, and keyboard behavior preserved or improved for activated elements.
- **Regression Check**: Internal anchors (#section-*, drawer, etc.) and non-primary elements continue to function exactly as before.

---

## 8. Success Criteria

The phase is successful only when:

- All 8 listed CTA surfaces are activated and perform full context → message → handoff.
- No dead primary LINE CTA remains on the homepage.
- No placeholder-only primary LINE CTA remains (href="#line-primary" or equivalent is replaced by real behavior).
- Commerce Context is always created via the official helpers.
- LINE messages are generated via the canonical builders (buildLineMessage or buildNonProductLineMessage).
- Context is saved before handoff and cleared after (per Phase 5 persistence contract).
- Commerce events are dispatched for the LINE actions.
- Zero visual or layout drift from the Phase 5 frozen baseline.
- Zero routing changes of any kind.
- `npm run validate` passes.
- Evidence package (per surface) exists for audit.

---

## 9. Risks

- **Scope bleed into 6B routing**: Especially tempting on Product Grid cards because they already display product data. Mitigation: explicit "NO routing" rule + Batch 5 has special IMPORTANT note + audit verification.
- **Helper becoming new architecture layer**: If lib/commerce/cta-activation.ts grows beyond a thin wrapper. Mitigation: Scope Lock limits it; keep logic in the per-surface handlers if helper risks expansion.
- **Product Grid behavior ambiguity**: Cards currently link somewhere. Mitigation: only change the activation side-effect; keep original href as fallback if possible.
- **Hydration / JS handler risk**: Converting <Link> or <a> to onClick may affect prefetch or SSR. Mitigation: use client-side handlers carefully; test build + manual.
- **LINE URL encoding issue**: Long messages or special characters. Mitigation: reuse the exact pattern already working in platform components.
- **Visual regression**: Adding onClick or slight DOM adjustment. Mitigation: strict "no visual change" rule + audit visual verification.
- **Context persistence side effects**: Saving on homepage may affect future platform loads. Mitigation: clear after handoff; follow existing clear logic from platform.

---

## 10. Explicit Non-Goals

These are repeated for absolute clarity. They are **permanently out** for Phase 6A:

- NO ROUTING (no /products/[slug], no platform links from homepage)
- NO UI REDESIGN (visual baseline is frozen)
- NO PLATFORM PAGE CHANGES (app/(platform)/** is forbidden)
- NO PRODUCT AUTHORITY MUTATION (content/products.ts read-only)
- NO INFORMATION AUTHORITY MUTATION
- NO KNOWLEDGE AUTHORITY MUTATION
- NO 6B (Platform Routing)
- NO 6C (CTA Contract Standardization)
- NO 6D (Premium Mobile Experience)
- NO 6E / 6F / 6G work
- NO PERFORMANCE OPTIMIZATION
- NO SEO / AI SEO EXPANSION
- NO PRODUCTION READINESS work

Any attempt to do the above is a direct violation of this Scope Lock.

---

**Scope Lock Status:** LOCKED

**Prepared by:** Grok CLI (Documentation Only)  
**Next:** Codex Scope Lock Audit → SA Approval → Batch Implementation (starting with Batch 1)

**End of PHASE6A-CONVERSION-PATH-HARDENING-SCOPE-LOCK.md**