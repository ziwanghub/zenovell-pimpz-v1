# M10-P4B HERO LCP AUDIT + SAFE IMAGE OPTIMIZATION (Clean Baseline Reimplementation)

Date: `2026-07-06`
Phase: `M10 Foundation Hardening`
Workstream: `WS-04 Performance Hardening`
Patch: `M10-P4B`
Status: `IMPLEMENTED (Clean Baseline)`
Governance: `Lightweight Z-MOS Style Governance`
Release Baseline: `main @ 76f0646 (post M10-R0 normalization)`

## 1. Executive Summary

Re-implemented M10-P4B Hero LCP Safe Optimization on the clean normalized baseline (post M10-R0 repository normalization commit 76f0646).

The previously approved safe optimization was re-applied in isolation:

- Added explicit `fetchPriority="high"` to the Hero background `<Image>` component in `sections/hero/hero-section.tsx`.

This strengthens the LCP preload signal for the critical hero image without any layout, visual, spacing, color, typography, or frozen section changes.

All other aspects of the Hero remain visually and structurally identical.

No architecture changes, no "use client" removal, no MobileShell/GlobalHeader modifications, no analytics, no tokens, no other workstreams touched.

Validations: PASS. Preload with fetchPriority confirmed in build output.

## 2. Scope (Strict Adherence)

**Allowed and Performed:**
- Hero LCP audit confirmation (LCP candidate is the background Image with priority).
- Re-apply safe image delivery optimization: explicit `fetchPriority="high"`.
- Verify Next.js generates `<link rel="preload" as="image" ... fetchPriority="high" />`.
- Confirm no visual/layout/runtime/hydration changes.
- Update this report for clean baseline reimplementation.

**Forbidden (Strictly Avoided):**
- No Hero redesign or layout changes.
- No MobileShell, GlobalHeader, or other sections modified.
- No analytics, design tokens, primitives, bundle, hydration, CSS, or other optimizations.
- No documentation outside this P4B report.

## 3. Implementation Details

**File Changed:**
- `sections/hero/hero-section.tsx`

**Change (minimal, isolated):**
```diff
 <Image
   src={BACKGROUND_IMAGE_SRC}
   alt=""
   aria-hidden="true"
   fill
   priority
+  fetchPriority="high"
   sizes="(max-width: 430px) 100vw, 430px"
   ...
 />
```

This matches the previously approved safe optimization from the initial M10-P4B patch.

## 4. Verification

**Preload Generation (post-build):**
- Confirmed in `.next/server/app/index.html`:
  `<link rel="preload" as="image" ... imageSizes="(max-width: 430px) 100vw, 430px" fetchPriority="high"/>`
- `<img ... fetchPriority="high" ... />` for the hero bg.

**Validations:**
- npm run lint: PASS
- npm run typecheck: PASS
- npm run build: PASS
- npm run validate: PASS

**Regression Checks:**
- No CLS (prop-only change, no layout impact).
- No hydration warnings (build clean).
- Visual identical: same image, scrims, content, CTA, etc.
- Only the LCP hint attribute added.

## 5. Report Updates
This report updated to document clean reimplementation on normalized baseline (after M10-R0).

Previous failed release attempt history is superseded by this clean application.

## 6. Readiness for Independent Audit
READY_FOR_INDEPENDENT_AUDIT: YES

Implementation is minimal, isolated, scope-compliant, and fully validated on clean baseline.
