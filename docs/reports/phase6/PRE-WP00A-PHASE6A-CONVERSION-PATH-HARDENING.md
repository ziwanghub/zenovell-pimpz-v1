# PRE-WP00A-PHASE6A-CONVERSION-PATH-HARDENING.md

**Project:** ZENOVELL-PIMPZ-V4-Active  
**Phase:** 6A  
**Milestone:** PRE-WP00A — Conversion Path Hardening (Architecture Analysis)  
**Document Type:** Governance Gate Report — Read-only Architecture Analysis  
**Date:** 2026-07-07  
**Authority:** SA Team Official Direction — Phase 6 Development Roadmap (Phase 6A P0)  
**Role:** Implementation Analysis Agent (read-only)  
**Status:** Analysis Complete / Recommendations for Blueprint

---

## WORKSPACE VERIFICATION

```
=== WORKSPACE VERIFICATION ===
Project Root: /Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active
Git Root:     /Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active
Current Branch: main
Working Directory: /Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active
Git Status: 0 uncommitted changes (clean)
Node: v22.22.2
Next.js: 16.2.10
React: 19.2.4
Source Verified:
- app/page.tsx + (platform) routes
- sections/ (hero + 2–11)
- components/layout/global-header.tsx + ui
- content/ (products.ts + per-section + site-navigation.ts + ctaDestinations)
- lib/commerce/ (context.ts, cta-contract.ts, line-message-builder.ts, persistence.ts, events.ts)
- lib/analytics/ + lib/platform/entity-loader.ts + seo.ts
Mode: Read-only. No source changes, no commits, no pushes.
```

**Verification Result:** PASSED. Operating strictly inside Canonical Workspace. All analysis evidence taken from live frozen Phase 5 baseline.

---

## Executive Summary

PRE-WP00A executed as the required architecture design gate after PRE-WP00 (Conversion Path Hardening).

**Core Finding:**  
The Phase 5 baseline has delivered a **complete visual + structural homepage** (sections-driven, content authorities, platform routes for products/information/knowledge, rich product authority with 6 SKUs + linePayloadMetadata, and a full pure commerce contract layer in lib/commerce).  

However, **primary conversion paths remain non-functional placeholders**:
- All LINE-branded CTAs resolve to `#line-primary` (or `#`, internal anchors).
- Hero primary CTA is a non-interactive `<button>`.
- Commerce Context, CTA Contract, and LINE Message Builder exist but are **not wired** to any homepage CTA surface.
- No `window.open`, no prefilled LINE message execution, no context creation on click.

**Objective of this PRE-WP00A:** Define the **minimum architecture** required to harden every primary conversion path while preserving the frozen baseline, additive-only changes, and Governance v2.1.

**Verdict:**  
The contracts and authorities are sufficiently mature. Phase 6A can focus on **activation + wiring** of existing pure layers. A unified CTA contract (already prototyped) + context lifecycle + real LINE handoff can be activated with minimal surface changes.

**Recommendation:** Proceed to Blueprint with the proposals below.

---

## 1. Current CTA Architecture

### Inventory by Surface

**Header (GlobalHeader)**  
- **Component:** `components/layout/global-header.tsx` (client component with drawer)  
- **Content Authority:** `content/site-header.ts` (via `mapGlobalHeaderProps`) + `content/site-navigation.ts` (`ctaDestinations["header-line"]`)  
- **Current destination:** `lineCta.href` = `"#line-primary"` (kind: "placeholder", `placeholderSafe: true`)  
- **Current implementation:** `<Link href={...}>` + `onClick` → `analytics.track(HEADER_CTA_CLICK)`  
- **Current analytics:** `AnalyticsEvents.HEADER_CTA_CLICK` (surface, label, destination)  
- **Current Commerce Context:** None (no `createCommerceContext`, no payload)  
- **Current problems:** Placeholder only. No LINE activation. Analytics present but no commerce enrichment. Visual LINE pill is strong.

**Hero (Section 1)**  
- **Component:** `sections/hero/hero-section.tsx`  
- **Content Authority:** `content/hero.ts` (`heroContent.cta`)  
- **Current destination:** None (pure `<button type="button" aria-label=...>`)  
- **Current implementation:** Styled div-like button with LineIcon + text + chevron. No onClick, no href.  
- **Current analytics:** None on this element (trust strip below is static).  
- **Current Commerce Context:** None  
- **Current problems:** Highest visual conversion affordance is completely dead. Contradicts "Activate Hero CTA". TrustStrip and ScrollIndicator are presentational.

**Trust Bar (Section 2)**  
- **Component:** `sections/section-2-trust-bar/section-2-trust-bar.tsx`  
- **Content Authority:** `content/section-2-trust-bar.ts` (has `cta`)  
- **Current destination:** None  
- **Current implementation:** `SolidLineCTA` → `<button type="button">` with LineIcon (no handler)  
- **Current analytics:** None  
- **Current Commerce Context:** None  
- **Current problems:** Strong visual CTA surface with zero behavior. "Activate Header LINE CTA" and similar scope items apply.

**Featured Product (Section 3 - Hero Product)**  
- **Component:** `sections/section-3-hero-product/section-3-hero-product.tsx`  
- **Content Authority:** `content/section-3-hero-product.ts` (references `featuredProduct.cta`)  
- **Current destination:** Content-defined (likely anchor or placeholder)  
- **Current implementation:** Product showcase + badge + benefits + mini trust + CTA element (from content)  
- **Current analytics:** Limited / product_click patterns in other surfaces  
- **Current Commerce Context:** None  
- **Current problems:** Reserved "detailed conversion block". Needs hardening per scope. Uses Product Authority indirectly via content.

**Product Grid (Section 4 - Product Catalog)**  
- **Component:** `sections/section-4-product-catalog/section-4-product-catalog.tsx` ("use client")  
- **Content Authority:** `content/section-4-product-catalog.ts` (array of `Section4ProductCard` with `cta: {label, ariaLabel, href}` + `finalCta`)  
- **Current destination:** `cta.href` (from content; examples resolve to `#` or section anchors in practice)  
- **Current implementation:** `ProductCardCTA` = `<a href={cta.href} onClick={analytics...}>` + `FinalLineCTA` `<a>` with analytics (`SUPPORT_CTA_CLICK` / product)  
- **Current analytics:** `product_click`, support cta tracking  
- **Current Commerce Context:** None (hrefs static)  
- **Current problems:** Cards have visual CTAs but point to placeholders or in-page. "Activate Product Grid CTA" incomplete. Strong candidate for product authority + real context.

**Why Choose Us (Section 5), How To Order (Section 6), Privacy & Shipping (Section 7), Reviews (Section 8)**  
- **Components:** Respective `sections/section-*-*.tsx`  
- **Content Authority:** Per-section `.ts` files  
- **Current destination:** Mostly none or internal `#section-*` / footer links  
- **Current implementation:** Informational cards, steps, testimonials, policy text. Occasional secondary CTAs or none.  
- **Current analytics:** Sparse (some footer_click / faq patterns)  
- **Current Commerce Context:** None  
- **Current problems:** Not primary conversion surfaces per 6A P0. Some may receive micro CTAs later (6D+). Preserve as-is for now.

**FAQ (Section 9)**  
- **Component:** `sections/section-9-faq/section-9-faq.tsx`  
- **Content Authority:** `content/section-9-faq-content.ts` (items + `primaryCta: {label, ariaLabel, destinationId}` + support cards with `ctaLabel`)  
- **Current destination:** `resolvedHref = ctaDestinations.find(...)?.href || "#"` (mostly "#line-primary")  
- **Current implementation:** `<a href=... onClick=analytics>` for support + `FinalLineCTA`  
- **Current analytics:** `SUPPORT_CTA_CLICK`  
- **Current Commerce Context:** None  
- **Current problems:** Good structure + accessibility (accordion). Activation missing.

**Final CTA (Section 10)**  
- **Component:** `sections/section-10-final-cta/section-10-final-cta.tsx`  
- **Content Authority:** `content/section-10-final-cta.ts` (`primaryCta: {label, description, ariaLabel, href}`, benefits, trust)  
- **Current destination:** `primaryCta.href` (content value, typically placeholder)  
- **Current implementation:** `FinalLineCta` renders `<a href=...>` (or button wrapper) with LineIcon + strong styling  
- **Current analytics:** Likely support/line events  
- **Current Commerce Context:** None  
- **Current problems:** Highest-intent closing surface. Must be activated.

**Footer (Section 11)**  
- **Component:** `sections/section-11-footer/section-11-footer.tsx`  
- **Content Authority:** `content/section-11-footer.ts` + `ctaDestinations` + `siteContacts` (line as placeholder), socials  
- **Current destination:** Various (line → "#line-primary", tel:, mailto:, anchors, placeholders)  
- **Current implementation:** Contact list, columns (products/services), social icons, payment badges. Some interactive links with analytics.  
- **Current analytics:** `footer_click`, `line_click`, `contact_click`, `social_click`  
- **Current Commerce Context:** None  
- **Current problems:** Footer LINE entry exists in data but non-functional. "Activate Footer CTA".

**Cross-cutting observations:**
- Unified `ctaDestinations` (5 entries: header-line, hero-line, section-line, support-line, footer-line) all target `"#line-primary"`.
- `siteNavigationGroups` mix good internal anchors (`#section-*`, `#hero`) with many "line" / "placeholder".
- Product Authority (`content/products.ts`) has 6 full entries with `slug`, `sku`, `cta`, `linePayloadMetadata`.
- lib/commerce/* and entity-loader are present but **unused by homepage CTAs**.
- No real LINE URL construction or `window.open` / `navigator` handoff anywhere on homepage.

---

## 2. CTA Contract Proposal (One Unified Contract)

**Recommendation:** Adopt and slightly extend the existing `lib/commerce/cta-contract.ts` as the **single source of truth** for all conversion entry points.

### Proposed Unified CTA Contract (refined from existing)

```ts
export type CtaSurface =
  | "header-line" | "hero-line" | "featured-line" | "product-grid-card"
  | "product-grid-final" | "faq-support" | "faq-primary" | "final-cta"
  | "footer-line" | "footer-contact-line" | (string & {});

export interface CommerceContext { /* existing from context.ts */ }

export interface CtaPayload {
  id: string;                    // stable id for a11y/analytics
  label: string;
  ariaLabel: string;
  href: string;                  // final resolved (can be real line: or /products/slug)
  lineMessage?: string;          // prefilled text (when kind=line)
  commerceContext: CommerceContext;
  surface: CtaSurface;
  kind: "line" | "route" | "anchor" | "tel" | "external";
  analyticsEventKey?: string;
}

export interface ICtaContract {
  createPayload(params: {
    product?: { slug: string; sku: string; title: string; linePayloadMetadata?: any };
    surface: CtaSurface;
    base?: Partial<CtaDestinationShape>;
    intent?: Intent;
    landingPage?: string;
  }): CtaPayload;

  // Activation helper (pure until handoff)
  getLineHandoffUrl(payload: CtaPayload, oaId?: string): string;
}
```

**Fields explained (per query):**
- `destination`: resolved `href` or handoff URL.
- `action`: derived from `kind` + payload (open LINE, navigate route, scroll anchor).
- `payload`: full `CtaPayload` (includes lineMessage + commerceContext).
- `analytics`: `surface` + `analyticsEventKey` + enriched context.
- `commerce context`: always attached via `createContextFromProduct` + `entrySurface`.
- `fallback`: if no product, use non-product builder or generic support context.
- `accessibility`: `ariaLabel`, `role`, focus states inherited from design system.
- `extensibility`: `CtaSurface` union + string & {} ; options in LineMessageOptions.

**Usage (recommended for Blueprint):** Components receive `CtaPayload` or call `createCtaPayload(...)` on render/click. Activation layer (small hook or util) performs the handoff using payload.

This keeps UI dumb and contracts pure.

---

## 3. Commerce Context Flow (Recommended Lifecycle)

**Proposed Flow (additive on top of existing contracts):**

```
Homepage Load (Landing)
  └─> (optional) createCommerceContext({ landingPage: '/', source: 'direct' ... })

User interacts with CTA (Header / Hero / Card / FAQ / Final / Footer)
  ↓
createContextFromProduct(productFromAuthority, {
  entrySurface: "hero-line" | "product-grid-card" | ...,
  intent: "high_intent" | "research",
  campaign: ...,
  utm: parsed or default
})
  ↓
persist.saveCommerceContext(ctx)   // sessionStorage (skeleton exists)
  ↓
const payload = createCtaPayload(product, ctx, surface)
const lineText = buildLineMessage(product, ctx)   // or payload.lineMessage
  ↓
Handoff:
  - For LINE surfaces: window.open( getLineHandoffUrl(payload) )  // line:// or https://line.me/ti/p/@zenovell?text=...
  - For product surfaces (6B+): router.push(`/products/${slug}`) + context available on load
  ↓
On Product / Platform Page Load
  └─> loadCommerceContext() | hydrate from persisted
      use for personalized messaging, attribution, related, analytics

Return / Clear (or timeout)
  └─> persistence.clearCommerceContext()   // on thank-you, explicit close, or session end
```

**Responsibilities:**
- **lib/commerce/context.ts**: pure factories only (`create*`).
- **lib/commerce/cta-contract.ts + line-message-builder.ts**: pure payload + message generation. No side effects.
- **lib/commerce/persistence.ts**: thin sessionStorage wrapper (expand skeleton with load/clear + expiry).
- **lib/commerce/events.ts**: optional event emission for analytics dispatcher.
- **Homepage sections / GlobalHeader**: call contract on user gesture (click), obtain payload, delegate to small activation util (e.g. `activateCta(payload)`).
- **Platform pages**: read persisted context (non-blocking), enrich local UI/SEO if needed.
- **Analytics**: enrich events with `commerceContext` snapshot (via adapter).
- **No direct imports** of window in pure libs — activation layer lives in client components or a thin `lib/commerce/activation.ts` (new, minimal).

This matches existing skeleton and "Preserve Commerce Context".

---

## 4. Homepage → Platform Routing (Recommended Model)

**Current:** Homepage is a single marketing surface using internal `#section-*` and `#line-primary` anchors. Product cards preview data but do not deep-link.

**Recommended Model (additive, Phase 6A + 6B boundary):**

```
Homepage (app/page.tsx)
  - Composed of <GlobalHeader />, <HeroSection />, <SectionN ... />
  - Internal anchors for same-page UX (#hero, #section-4, #section-9, etc.) — KEEP for nav/scroll.
  - Conversion CTAs (LINE branded) → activate via Commerce + LINE handoff (6A).
  - Product / Featured cards → (in 6A) can stay # or become `/products/slug` progressively.
    Recommended: Featured + Grid cards resolve to real routes using Product Authority slugs.

↓ (user clicks product surface or "ดูทั้งหมด")

Product Authority (content/products.ts + lib/platform/entity-loader.ts)
  - getAllProducts(), loadProductBySlug(slug), static generation

Platform Routes (already exist)
  /products/[slug]   → full PLP (hero, benefits, ingredients, how-to, trust, reviews, faq, related, LINE CTA)
  /information/[slug]
  /knowledge/[slug]

Boundaries:
- Homepage = discovery + primary conversion funnels + light previews. No full entity content.
- Platform = authoritative deep content + SEO (structured data already wired) + secondary conversions.
- Cross links: use `<Link href={`/products/${slug}`}>` from grid/featured (additive, no breaking current visual).
- Preserve all current # anchors for non-product nav.
- Sitemap / robots already reference platform.

This enables "Homepage becomes the true entry point" (6B) without breaking 6A.

---

## 5. LINE Integration Strategy

**Current:** Zero real integration. All point to placeholder `#line-primary`. `line-message-builder.ts` is pure and ready.

**Recommended Architecture:**

- **Target OA:** `@zenovell` (from content/siteContacts).
- **Prefill mechanism (6A primary):** Use `buildLineMessage(product, context)` → `https://line.me/ti/p/@zenovell?text=${encodeURIComponent(message)}` (or `line://msg/text/...` for app).
- **Add Friend:** Static deep link or QR in future (footer / trust). Not primary for 6A.
- **Message (text prefill):** Core of 6A. Every LINE surface uses the contract + builder.
- **OA Account features:** Rich Menu, broadcast — out of scope for 6A (platform ops).
- **LIFF / Mini-app:** Future (post-launch, after Production Readiness Gate). Requires real domain + LINE OA approval.

**Phase 6A scope for LINE:**
- Activate the 5 ctaDestinations + surface-specific CTAs (header, hero, grid cards/final, faq, final-cta, footer-line) to perform real prefilled open.
- Non-product generic support message builder (additive helper if not present).
- Keep all visual + a11y identical.
- Fallback: if JS disabled or error, graceful href to a safe LINE profile URL.

**Out of 6A:** Rich menu design, LIFF flows, OA admin verification, attribution server-side.

---

## 6. Minimal Scope Recommendation (Phase 6A)

**In Phase 6A (P0 — Conversion Path Hardening):**

Must include (to deliver "fully functional conversion funnel"):
- Wire CTA contract + createContextFromProduct + buildLineMessage into:
  - Header LINE
  - Hero primary CTA (convert button → functional link or onClick handoff)
  - Trust Bar LINE (if conversion)
  - Featured Product CTA
  - Product Grid cards + final LINE CTA
  - FAQ primary/support LINE CTAs
  - Final CTA
  - Footer LINE / contact line
- Replace placeholder `#line-primary` (and similar) **only for conversion surfaces** with functional behavior (real handoff). Keep visual design frozen.
- Remove dead buttons: make Hero CTA actionable (or explicitly document as scroll + secondary).
- Introduce minimal activation utility (pure + thin client handoff).
- Ensure analytics events carry enriched commerce context.
- Use Product Authority for any product-aware CTAs.
- Preserve all current section structure, classNames, spacing, images, micro-interactions.
- Add `clear` to persistence skeleton if needed for lifecycle.
- Update only the affected content entries' `href` / kind where they represent live conversion (keep internal anchors).

**Must wait (explicitly out of 6A):**
- **6B Platform Routing:** Full replacement of product card destinations with `/products/[slug]`. Deep cross-surface nav consistency. (Can start small additive links in 6A if low risk.)
- **6C CTA Contract Standardization:** Full audit, shared component, policy for all surfaces, accessibility deep-dive, non-product vs product behavior matrix. (6A uses the contract but does not complete the standardization work.)
- **6D Premium Mobile Experience:** Hero density, grid usability, touch targets, micro-interactions, sticky affordances, reviews scroll, readability refinements.
- **6E Accessibility & Quality:** Skip-link (already present), full keyboard, ARIA sweep, mobile readability pass across all surfaces.
- **6F Performance:** Image strategy, lazy, LCP, bundle.
- **6G Desktop/Tablet:** Layout strategy, multi-column.
- New content, redesigns, additional authorities, production domain/LINE OA verification, real analytics wiring beyond client events, LIFF/Rich Menu.

**One Batch = One Spoke rule:** Group by surface or small related group (e.g. "header + hero", "product grid surfaces") per implementation batch.

---

## Gap Analysis (High Level)

- Contracts & authorities: **Mostly ready** (lib + content/products).
- Wiring & activation: **Missing** (core of 6A).
- Real destinations: **All placeholders**.
- Context lifecycle: **Skeleton present, zero usage on homepage**.
- Routing to platform: **Platform exists; homepage not yet linking to it for products**.
- Analytics: Partial coverage, enrichment missing.
- Visual fidelity: Excellent — must not regress.

---

## Risks

- Changing button → link or adding onClick may subtly affect current scroll/UX expectations (mitigate by preserving # fallbacks where sensible + testing).
- SessionStorage persistence may be cleared by user; document as best-effort.
- LINE prefill text length limits (builder must keep concise).
- If product data not passed correctly, generic non-product messages must work.
- Over-eager scope creep into 6B/6C during implementation (enforce via Scope Lock).
- Workspace canonical friction (previous reports) — all work must stay in this tree.

---

## Out-of-Scope (this PRE-WP00A)

- Any source edits or implementation.
- Full Blueprint (next gate).
- Independent audit / SA approval.
- Production Readiness items (domain, real devices, LINE OA prod, Lighthouse, etc.).
- Detailed component specs or prop interfaces (Blueprint territory).

---

## Decision

**PRE-WP00A Verdict: PASS — Architecture defined**

The minimum viable architecture for Phase 6A exists in the current baseline (contracts, authorities, platform, analytics). Hardening reduces to:
1. Consistent adoption of the CTA contract.
2. Context creation + persistence on click.
3. Real LINE handoff using the message builder.
4. Selective replacement of placeholder destinations for conversion surfaces.
5. Strict visual + section preservation.

**Next per Workflow v2.1:**  
PRE-WP00A complete → Blueprint (exact files, batch plan, activation util, updated content shapes if any) → Independent Audit → SA Approval → Scope Lock → Controlled Batch Implementation.

All recommendations are additive and respect "Platform Experience" as one continuous funnel ending at LINE Commerce.

---

**Reported By:** Grok CLI (Implementation Analysis Agent)  
**Role:** Read-only Architecture Analysis  
**Report Type:** PRE-WP00A Governance Gate  

**End of PRE-WP00A-PHASE6A-CONVERSION-PATH-HARDENING.md**

Project Status (post PRE-WP00A): **READY FOR BLUEPRINT**
