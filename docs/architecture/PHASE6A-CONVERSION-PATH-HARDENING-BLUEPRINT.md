# PHASE 6A — CONVERSION PATH HARDENING BLUEPRINT

**Date**: 2026-07-07  
**Phase**: Phase 6A — Conversion Path Hardening (P0)  
**Status**: Blueprint (Ready for Blueprint Audit)  
**Baseline**: Phase 5 Development Complete + Frozen Homepage + Governance v2.1  
**Governing Documents**:
- WORKFLOW-v2.1.md (ACTIVE)
- DEVELOPMENT-LIFECYCLE.md (ACTIVE)
- docs/reports/phase6/PRE-WP00A-PHASE6A-CONVERSION-PATH-HARDENING.md (COMPLETE)
- Codex PRE-WP00A Audit: PASS_WITH_RECOMMENDATIONS
- SA Decision (2026-07-07): 6A narrowly scoped to CTA / LINE / Commerce Context activation
- ADR-001: LINE-First Commerce Platform
- ADR-003: LINE Commerce Architecture
- lib/commerce/cta-contract.ts, context.ts, line-message-builder.ts, persistence.ts (Phase 5 contracts)
- Phase 5 frozen visual + section baseline (homepage sections + global-header)

**Objective**: Define the minimal, additive mechanics to activate every primary conversion path on the homepage so that LINE CTAs create proper Commerce Context, build LINE pre-filled messages via the canonical builders, and perform real handoff — without touching platform routing, redesigning visuals, or expanding scope into 6B.

---

## 1. Executive Summary

Phase 6A is strictly **Conversion Path Hardening**. It is not a routing project, not a content project, and not a mobile UX refinement project.

Current state after Phase 5:
- Homepage visual baseline is frozen and complete (sections-driven via app/page.tsx + sections/* + content/*).
- Rich contracts exist: CommerceContext factories, CTA Contract (defaultCtaContract + createCtaPayload), buildLineMessage + buildNonProductLineMessage, persistence skeleton, analytics events.
- Platform surfaces (products, information, knowledge) already demonstrate working patterns (create context → build message → window.open to line.me/R/msg/text + save/clear persistence + dispatch events).
- Homepage CTAs are non-functional placeholders:
  - All ctaDestinations point to "#line-primary" (placeholderSafe).
  - Header uses <Link> + analytics only.
  - Hero CTA is a bare <button type="button"> with no handler.
  - Product cards, Trust Bar, FAQ, Final CTA, Footer use <a> or <button> that only track analytics or scroll.
- No Commerce Context is created or persisted from homepage CTAs.
- No real LINE pre-filled message is generated or handed off from homepage.

Phase 6A will wire the existing contracts into the homepage CTA surfaces using the proven activation pattern from platform components. All changes are additive. Visual design, section structure, and current internal anchors (#section-*) remain untouched.

Primary goal: Every primary LINE-branded CTA on the homepage becomes a working entry point that carries rich context into LINE.

---

## 2. Objective

Activate the full primary conversion funnel on the homepage:

Homepage entry surfaces → Commerce Context creation + enrichment → LINE pre-filled message via canonical builder → Real handoff (window.open) → Persistence for continuity (future platform pages) → Clear on success.

Deliver a functional conversion path from every listed CTA surface to LINE while strictly preserving the Phase 5 frozen baseline.

---

## 3. Current Problem

1. **Placeholder destinations everywhere**: ctaDestinations and most CTA hrefs are "#line-primary" or "#". No actual LINE OA target is reached.
2. **No contract usage on homepage**: lib/commerce/* machinery is dormant for homepage surfaces (only partially used in platform).
3. **Dead or analytics-only CTAs**:
   - Hero primary CTA: decorative button.
   - Header LINE: Link that only tracks.
   - Product Grid cards + final, Trust Bar, FAQ support/primary, Final CTA, Footer LINE: either scroll or track only.
4. **Missing context lifecycle**: No createCommerceContext / createContextFromProduct at CTA time. No save/load/clear.
5. **Inconsistent with platform**: Platform CTAs already do context + build + open + persist + events. Homepage does not.
6. **Risk of scope bleed**: Product cards have rich product data; it is tempting to also wire full /products/[slug] routing here. Explicitly deferred to 6B.

---

## 4. In-Scope

- Activation of **primary conversion CTAs** on homepage only (see section 6).
- Use of existing contracts:
  - createCommerceContext / createContextFromProduct
  - defaultCtaContract or createCtaPayload (or direct equivalent)
  - buildLineMessage (for product-aware) or buildNonProductLineMessage
  - saveCommerceContext / load / clear
  - commerce events dispatch
- Real LINE handoff using the proven pattern: `https://line.me/R/msg/text/?${encodeURIComponent(message)}`
- Analytics enrichment with context on LINE clicks.
- Minimal shared activation helper (additive, e.g. lib/commerce/cta-activation.ts or inline per surface if smaller).
- Updates to content data only where needed to supply product refs or intent for context (no content redesign).
- Accessibility: ensure handlers preserve or improve existing aria-labels, focus, keyboard.
- For Product Grid: activate existing card CTAs and final CTA to perform LINE handoff with product context from the card data. **Do not change card hrefs to platform routes or introduce routing logic.**

All changes must be additive and preserve exact visual baseline (colors, spacing, radii, shadows, typography, icons, layout).

---

## 5. Out-of-Scope

- Any routing changes: no `/products/[slug]`, no Link to platform pages from homepage CTAs or cards.
- Product Grid redesign, new cards, or full "Homepage → PLP" navigation model (6B).
- New surfaces, new sections, or content expansion.
- Mobile micro-interactions, density, sticky affordances, or readability (6D).
- Full CTA Contract standardization or shared component extraction (6C).
- Accessibility sweep beyond what is required for the activation handlers.
- Performance, images, bundle, desktop layout (6F/6G).
- Production Readiness items (real LINE OA verification, domain, etc.).
- Changes to platform pages or their existing wiring.
- Non-primary CTAs in informational sections (Why Choose Us, How To Order, Privacy, Reviews) unless they are explicitly listed LINE CTAs.

---

## 6. CTA Surfaces Covered

Primary surfaces to harden (from PRE-WP00A + SA direction):

1. **Header** — GlobalHeader LINE CTA (header-line)
2. **Hero** — Primary CTA button (hero-line)
3. **Trust Bar (Section 2)** — SolidLineCTA
4. **Featured Product (Section 3)** — CTA within hero-product section
5. **Product Grid (Section 4)** — Individual product card CTAs + FinalLineCTA (use card product data for context; no routing)
6. **FAQ (Section 9)** — Primary CTA + support card CTAs (support-line)
7. **Final CTA (Section 10)** — Primary LINE CTA (final-cta / section-line)
8. **Footer (Section 11)** — LINE Official / contact line CTAs (footer-line)

Internal navigation anchors (#section-*, #hero, drawer links) remain unchanged.

Non-conversion elements (menu button, social placeholders, tel/mailto) remain out unless they are LINE.

---

## 7. CTA Contract Direction

Adopt the existing `lib/commerce/cta-contract.ts` (ICtaContract, defaultCtaContract, CtaPayload, CtaSurface) as the canonical mechanism.

**Direction**:
- Extend CtaSurface union if needed for homepage surfaces (header-line, hero-line, product-grid-card, etc.) — additive.
- Homepage components should obtain a CtaPayload (via createCtaPayload or equivalent) or directly call the factories at click time.
- Payload carries: id, label, ariaLabel, lineMessage, commerceContext, surface.
- For product cards in grid: pass the product shape (slug, sku, title, linePayloadMetadata) from the card data + content/products.ts authority.
- For generic consult CTAs (no specific product): use buildNonProductLineMessage + base context.

Keep the contract pure. Activation (side effects) lives in thin client handlers.

---

## 8. Commerce Context Direction

Use the existing `lib/commerce/context.ts`:

- `createCommerceContext(partial)`
- `createContextFromProduct({slug, sku, title}, partial)`

**Recommended enrichment at CTA**:
- landingPage: '/'
- entrySurface: one of the CtaSurface values (e.g. "hero-line", "product-grid-card")
- intent: "high_intent" or "inquiry" for conversion CTAs; "research" where appropriate
- source / campaign / utm: from URL if present (additive helper if not already)
- Merge with persisted context when available (highest priority for return visitors)

Persistence (lib/commerce/persistence.ts):
- Activate the existing sessionStorage skeleton on CTA click (save before handoff).
- Load on any future platform entry (already demonstrated in platform).
- Clear after successful handoff (or on explicit reset).

All context creation must go through the helpers — never raw object literals.

---

## 9. LINE Handoff Direction

Standardize on the proven pattern already used in platform components:

```ts
const message = buildLineMessage(product, context) || buildNonProductLineMessage(title, context);
saveCommerceContext(context);
// dispatch event
const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(message)}`;
window.open(lineUrl, '_blank');
clearCommerceContext();
```

- Target: https://line.me/R/msg/text/ (works for both mobile app and web)
- Fallback: if JS disabled, the original href behavior (or a safe static LINE profile link) can remain as progressive enhancement.
- For header (currently <Link>): convert the interaction to onClick handler that performs the above (prevent default navigation if necessary). Preserve the visual Link-like appearance.
- For bare <button>s (Hero, Trust Bar): attach onClick that performs activation. Optionally wrap or change to <a role="button"> if better for a11y, without visual change.

All handoffs must carry the enriched message.

---

## 10. Analytics Direction

- Continue using existing AnalyticsEvents (HEADER_CTA_CLICK, hero_cta / line_click patterns, PRODUCT_CLICK, SUPPORT_CTA_CLICK, etc.).
- Enrich dispatched commerce events with full context snapshot (as demonstrated in platform knowledge-cta).
- Use lib/commerce/events.ts + dispatcher where appropriate for consistency with Phase 5F wiring.
- Ensure every activated CTA surface tracks at minimum: surface, label, destination (or "line"), and key context fields.

Do not introduce new event taxonomy in 6A unless strictly required for the activation.

---

## 11. Accessibility Direction

- Preserve or improve all existing aria-label, aria-describedby, focus-visible styles, and keyboard operability.
- Handlers must not break existing focus management (e.g. header drawer).
- For converted buttons: ensure they remain focusable, have proper role if changed to links, and announce intent ("opens LINE with pre-filled message").
- Skip link and existing a11y baseline in MobileShell / layout remain untouched.

---

## 12. Files Likely Involved

**Core (read + additive changes only):**

- `app/page.tsx` — composition (no logic change expected)
- `components/layout/global-header.tsx` — header LINE CTA handler
- `sections/hero/hero-section.tsx` — hero primary CTA activation
- `sections/section-2-trust-bar/section-2-trust-bar.tsx` — trust CTA
- `sections/section-3-hero-product/section-3-hero-product.tsx` — featured CTA
- `sections/section-4-product-catalog/section-4-product-catalog.tsx` — card CTAs + final CTA (product data only for context)
- `sections/section-9-faq/section-9-faq.tsx` — primary + support CTAs
- `sections/section-10-final-cta/section-10-final-cta.tsx` — final CTA
- `sections/section-11-footer/section-11-footer.tsx` — footer LINE CTAs

**Data / Contracts (mostly read, minimal updates for product refs/intent):**

- `content/site-navigation.ts` — ctaDestinations (may deprecate placeholder hrefs or keep as fallback)
- `content/hero.ts`, `content/section-*-*.ts` (relevant ones) — supply product refs or cta metadata where missing
- `content/products.ts` — Product Authority for context (read-only usage)
- `lib/global-header-mapper.ts`

**Commerce (read + possible thin additive layer):**

- `lib/commerce/context.ts`
- `lib/commerce/cta-contract.ts`
- `lib/commerce/line-message-builder.ts` (already has buildLineMessage + buildNonProductLineMessage)
- `lib/commerce/persistence.ts` (activate skeleton)
- `lib/commerce/events.ts`
- New (minimal): `lib/commerce/cta-activation.ts` (recommended thin shared handler for consistency; or per-component if scope stays tiny)

**Supporting (no change or read-only):**

- `lib/analytics/*`
- `components/ui/*` (LineIcon, etc.)
- MobileShell, layout, globals.css (visual baseline)

No changes to:
- app/(platform)/**
- lib/platform/**
- Most informational section components (5-8)

---

## 13. Risks

- Scope creep into routing when wiring Product Grid cards (mitigation: explicit rule — only CTA activation + context from existing card data).
- Changing <Link> / <a> to onClick handlers may affect default browser behavior or prefetch (mitigation: keep fallback href where possible; test navigation).
- Message length or encoding issues in LINE prefill (mitigation: use existing builder which is already validated in platform).
- Persistence side effects on homepage (mitigation: clear after handoff; test with future platform loads).
- Visual regression if handler attachment changes DOM or styles (mitigation: Blueprint + Implementation Audit must verify pixel + interaction parity).
- Inconsistent activation if some CTAs stay on Link while others use handlers (mitigation: standardize on the context + handoff pattern).

---

## 14. Success Criteria

- Every listed CTA surface, when clicked, performs:
  1. Commerce Context creation (with entrySurface, product if applicable, intent, etc.).
  2. LINE message built via canonical builder.
  3. Event dispatched.
  4. Context saved.
  5. Real window.open to line.me prefilled.
  6. Context cleared.
- No visual or layout changes to any section or global header.
- All existing internal anchors and non-conversion navigation continue to work exactly as before.
- Typecheck, lint, and build pass.
- The activation is traceable to the CTA Contract and Commerce Context contracts.
- Product Grid CTAs use product data for context but do not route or link to /products/*.
- Evidence package (screenshots, console logs of context + message, network for line open) available for audit.

---

## 15. Implementation Sequence (One Batch = One Spoke)

Follow v2.1 strictly. Suggested spoke order (small, reviewable batches):

1. **Spoke 1**: Shared activation pattern + context + handoff utility (lib/commerce if new helper, or reference implementation).
2. **Spoke 2**: Header LINE CTA activation (highest visibility).
3. **Spoke 3**: Hero primary CTA (convert button behavior).
4. **Spoke 4**: Trust Bar + Featured Product CTAs.
5. **Spoke 5**: Product Grid card CTAs + final CTA (product context only).
6. **Spoke 6**: FAQ CTAs.
7. **Spoke 7**: Final CTA + Footer LINE CTAs.
8. **Validation spoke**: Full homepage smoke + evidence collection.

Each spoke: implement → local validate (lint/type/build + manual CTA test) → independent audit if required per workflow.

No large multi-surface batch.

---

## 16. Audit Acceptance Criteria

For Blueprint Audit (Codex) and later Implementation Audit:

- Blueprint scope exactly matches SA constraints (6A = CTA/LINE/Context activation only; 6B routing excluded).
- All 8 CTA surfaces listed have defined activation mechanics.
- Contracts (context, cta-contract, builders, persistence) are referenced correctly and used via their public APIs.
- Visual baseline preservation is explicitly called out with verification steps.
- No references to changing card destinations to platform routes.
- Files list is accurate and minimal.
- Risks and mitigations are addressed.
- Success criteria are measurable and evidence-based.
- Sequence respects "One Batch = One Spoke".

---

## 17. Deferred to 6B / 6C / 6D

- **6B Platform Routing**: Homepage Product Cards / Featured → /products/[slug] navigation, cross-platform consistency, SEO wiring for entry from homepage.
- **6C CTA Contract Standardization**: Full shared component, policy for product vs non-product, analytics schema finalization, accessibility matrix.
- **6D Premium Mobile Experience**: Hero density, grid usability, touch target refinements, micro-interactions, sticky conversion, reviews scrolling.
- Later: Performance, desktop, new authorities, full production verification.

---

## Validation

After Blueprint approval and before any implementation batch:

```bash
npm run validate
```

Must pass: lint + typecheck + build with zero errors.

Manual evidence collection per activated surface (context shape, generated message, LINE URL) will be required in implementation closeout.

---

**Blueprint prepared by**: Grok CLI (Implementation Agent, documentation-only mode)  
**References**: PRE-WP00A report, SA constraints, existing Phase 5 contracts and platform activation patterns, frozen baseline.  
**Next gate**: Independent Blueprint Audit → SA Final Approval → Scope Lock.

**End of PHASE6A-CONVERSION-PATH-HARDENING-BLUEPRINT.md**