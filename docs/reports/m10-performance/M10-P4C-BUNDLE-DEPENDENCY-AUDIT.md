# M10-P4C Bundle & Dependency Performance Audit

**Date**: 2026-07-06  
**Phase**: M10 Foundation Hardening  
**Workstream**: WS-04 Performance Hardening  
**Patch**: M10-P4C  
**Status**: AUDIT COMPLETE (No Changes Made)  
**Authority**: M10-P4-PERFORMANCE-SCOPE-LOCK.md (ACTIVE)  
**Baseline**: v4.1.6-m10-p4b-hero-lcp (post M10-R0 normalization)

## Executive Summary

Audit-only review of bundle size, dependency weight, client component surface, and hydration risks on the clean post-P4B baseline.

Key findings (no actions taken):
- Several unused or suspicious dependencies in package.json (framer-motion, shadcn) — classify to WS-07.
- Significant code duplication of icon components (LineIcon in 11+ files) — classify to WS-01.
- 5 client components, mostly driven by analytics instrumentation (P3) or necessary interaction. Hero is now server.
- No large duplicated module imports detected.
- Lucide-react used broadly but likely tree-shaken; repeated per-file imports add minor overhead.
- Analytics lib (~540 LOC + adapters) is small but contributes to client bundles where used (header, faq, etc.).
- Build produces reasonable client chunks (~100-200k main); total static ~960k.
- No framer-motion, radix (minimal), or other heavy animation libs in active use beyond declared deps.

All findings classified per scope lock. No implementation performed. Validations passed. Ready for independent audit.

## Files Reviewed

- package.json / package-lock.json (high-level)
- next.config.ts
- app/page.tsx, app/layout.tsx, app/dev-cache-guard.tsx
- components/layout/global-header.tsx, components/ui/button.tsx
- All sections/*/*.tsx (11 sections)
- lib/analytics/** (dispatcher, events, types, adapters/*)
- globals.css (brief)
- Build artifacts in .next (for size info)
- Cross-referenced with prior P3C/P3D reports and M10-P4 scope lock.

## Dependency Audit

**Used / Core:**
- next, react, react-dom
- tailwindcss ecosystem (tailwind-merge, clsx, class-variance-authority, @tailwindcss/postcss)
- lucide-react (icons across sections)
- radix-ui (Slot only in button)
- next/font (Sarabun)

**Unused / Suspicious (in dependencies but no source imports found):**
- framer-motion ^12: zero usage. Previously declared, never imported in current tree. Heavy animation lib (~50-100k+ gzipped potential if used).
- shadcn ^4: appears to be CLI artifact; no runtime imports or usage. Should not be in dependencies.
- tw-animate-css: declared but no direct references in source or obvious in globals.

**Other Notes:**
- No @types in prod (correctly in dev).
- package-lock present (normal).
- No obvious dev-only in prod deps.

**Size Impact (qualitative):** framer-motion is the largest unused risk. Lucide is used but per-icon imports in Next are efficient.

## Bundle Risk Analysis

**Largest Likely Contributors (from build .next/static):**
- ~222k, 147k, 110k chunks (Next runtime + React + app code + styles).
- Total .next/static ~960k (includes all chunks, css, etc.).
- Server chunks similar (Next internals).

**Duplication Risks:**
- LineIcon (SVG) duplicated in 11 files (hero, 10 sections, global-header). Slight variations in size prop. Pure code duplication.
- Icon maps repeated per section (benefitIconByName etc using lucide).
- Similar patterns in many sections (server components with icon maps + Image).

**Repeated Imports:**
- lucide-react imported in 11+ section files + header (one import per file for used icons).
- No evidence of importing entire lib.
- analytics imported in client surfaces only.

**Client-Only Bundles:**
- The 5 "use client" files contribute to hydrated JS.
- Global header always loaded at top.
- Analytics code (events, dispatcher) bundled where used.

**Analytics Footprint:**
- lib/analytics ~540 LOC total.
- Adapters dir (P3D): registry, ga4-adapter, base, noop, factory, initialize. GA4 is small and safe-noop.
- Included only in client components that track (not global bundle).

No major unused code paths or obvious tree-shake failures detected without analyzer.

## Client Component Inventory

1. **app/dev-cache-guard.tsx** ("use client")
   - Why: useEffect to unregister SW and clear caches in dev only.
   - Necessary: Yes, for clean dev experience.
   - Risk: None in prod (returns null, early return if not dev).
   - WS-04 note: Dev-only, low cost.

2. **components/layout/global-header.tsx** ("use client")
   - Why: useState (drawer, scroll), useEffect (scroll listener), useRef (focus), createPortal, analytics.track on clicks/menu.
   - Necessary: Yes, for drawer UX, scroll shadow, a11y focus trap, tracking.
   - Risk: Adds JS to every page load (top of shell). State/effects on scroll.
   - WS-04 / P3: Approved from P3C instrumentation + header extraction. Hydration cost present but required for functionality.

3. **sections/section-9-faq/section-9-faq.tsx** ("use client")
   - Why: useState (openItemId), useId, analytics on expand/collapse/support/final CTA, dynamic resolvedHref.
   - Necessary: Yes, for accordion behavior and tracking.
   - Risk: State + clicks; larger than pure static.
   - WS-04 / P3: Core of P3C FAQ instrumentation.

4. **sections/section-4-product-catalog/section-4-product-catalog.tsx** ("use client")
   - Why: analytics.track on product CTA clicks.
   - Necessary: For tracking (per P3). UI itself could be server + links.
   - Risk: Makes whole catalog section client-hydrated.
   - WS-04 / P3: P3C product clicks.

5. **sections/section-11-footer/section-11-footer.tsx** ("use client")
   - Why: analytics on footer links (onClick).
   - Necessary: Only for tracking.
   - Risk: Footer (bottom) becomes client unnecessarily if tracking not critical.
   - WS-04 / P3: P3C footer instrumentation.

**Hero & Others:** Server components (no "use client", no hooks/state). Good for LCP (P4B).

## Hydration Cost Analysis

**Client Components Hydrated on Every Load:**
- Global header (always visible, scroll + drawer state).
- FAQ (stateful accordion).
- Product catalog (click tracking).
- Footer (link tracking).

**Static Sections That Are Server (Positive):**
- Hero (P4B LCP image + content, now server).
- Trust bar, hero-product, why-choose, how-to-order, privacy, reviews, final-cta: pure presentational + images + server links.

**Analytics-Driven Client Cost:**
- Several sections (4,9,11, header) became client primarily for onClick analytics.track + destination resolution (post P3).
- This increases initial JS and hydration surface for tracking that could theoretically be server + middleware, but per approved analytics architecture (P3A/B/C), this is the design.
- No evidence of unnecessary "use client" for non-interactive reasons.

**Notes:**
- No large forms or heavy client logic.
- Dev guard is conditional.
- No framer-motion animations forcing client.

Do not convert; classify only.

## Scope Classification

**WS-04 Performance (Audit Focus):**
- Bundle size contributors (lucide repeated, analytics, client chunks).
- Unused heavy dep (framer-motion).
- Client component surface for hydration (header, faq, catalog, footer).
- Hydration cost from P3 analytics on static-ish sections.
- Build payload / route analysis.

**WS-01 Shared UI Primitives:**
- Duplicated LineIcon SVG component (11+ locations).
- Repeated icon mapping patterns per section.
- Potential for shared Icon or LineIcon primitive.

**WS-02 Design Tokens:**
- (None directly; button variants use some custom, but no token normalization found in audit.)

**WS-07 Technical Debt:**
- shadcn declared in dependencies (no usage; CLI leftover).
- framer-motion declared but completely unused.
- tw-animate-css (unclear usage).
- Overall dep hygiene (should be audited/cleaned in debt work).

**HOLD / SA Decision:**
- Any conversion of client sections to server (would break analytics tracking).
- Removal of lucide per-file imports (tree-shaking works today).

## Findings by Priority (Audit, No Action)

High (for future patches):
1. framer-motion unused in deps → remove (WS-07).
2. Duplicated LineIcon across 11 files → extract to shared (WS-01).
3. shadcn in prod deps → move/remove (WS-07).

Medium:
- Analytics forcing client on footer/catalog (consider data attrs or defer, but WS-05/04).
- Broad lucide imports (consolidate icons? WS-01).
- Client header always hydrated (expected for chrome).

Low:
- Dev cache guard (fine).
- Small analytics size.

## Deferred Items

- All implementation (P4C is audit).
- Any WS-01/02/07 work (e.g. icon dedup, dep cleanup).
- Hero/server conversions (forbidden in P4C).
- Package.json edits.

## Recommended Patch Sequence (per Scope Lock)

1. M10-P4C (this): Audit complete.
2. M10-P4D: CSS / Paint Cost Audit (deferred).
3. M10-P4E: Runtime Performance Verification.
4. Then WS-01 (primitives for icons/dupe), WS-07 (unused deps like framer), WS-02 if needed.
5. Future P4F closeout.

## Validation Result

- npm run lint: PASS
- npm run typecheck: PASS
- npm run build: PASS
- npm run validate: PASS

Build inspected: client static ~960k, main chunks 50-222k. No errors.

## Readiness for Independent Audit

READY_FOR_INDEPENDENT_AUDIT: YES

Audit is read-only, classifications respect M10-P4 scope lock boundaries, no modifications made, all validations green. Findings clearly separated into allowed WS-04 vs deferred WS-01/02/07.

Next authorized work: P4D or WS-01 per blueprint.
