# M10-P4B Hero LCP Safe Optimization Release Report

**Date**: 2026-07-06
**Patch**: M10-P4B
**Release Baseline**: v4.1.5-m10-p3d-2-ga4-adapter
**New Baseline Target**: v4.1.6-m10-p4b-hero-lcp
**Status**: PROMOTED
**Workstream**: WS-04 Performance Hardening

## Executive Summary

M10-P4B completes the first performance hardening patch under WS-04: Hero LCP Audit + Safe Image Optimization.

A minimal, safe optimization was applied to the Hero background image (the LCP candidate): explicit `fetchPriority="high"` was added to the Next.js `<Image>` component alongside the existing `priority` prop.

This strengthens the preload signal for the critical hero background without any layout, visual, spacing, color, typography, or frozen section changes. All other aspects of the Hero (scrims, content, CTA, TrustStrip, ScrollIndicator) remain visually and structurally identical.

No architecture changes, no runtime redesign, no removal of "use client", no MobileShell or GlobalHeader modifications.

Gemini Independent Audit: PASS.

## Scope

Strictly limited to approved WS-04 P4B per M10-P4-PERFORMANCE-SCOPE-LOCK.md:

- Audit of Hero image loading and LCP candidate.
- Review of next/image configuration, priority, fetchPriority, decoding, sizes, loading behavior.
- Safe optimization of image delivery (explicit fetchPriority only).
- Review of Hero overlay/scrim paint cost (left unchanged — visually required).
- Review of CSS affecting Hero paint performance (already minimal).
- Before/after documentation and regression verification.

Forbidden items explicitly not performed:
- No Hero redesign or layout changes.
- No Server Component conversion.
- No shared component extraction or token normalization.
- No changes to frozen Sections 1–11 visuals or behavior.
- No MobileShell / GlobalHeader behavior changes.
- No CTA, spacing, or style modifications.

## Files Changed

- sections/hero/hero-section.tsx (safe addition of `fetchPriority="high"` on the LCP `<Image>`)
- docs/reports/m10-performance/M10-P4B-HERO-LCP.md (implementation audit report)
- docs/reports/releases/M10-P4B-hero-lcp.md (this release report)

## Hero LCP Summary

**LCP Candidate**: Full-bleed background image rendered via `next/image` with `fill`, `priority`, `sizes="(max-width: 430px) 100vw, 430px"`, `object-cover` + slight scale and custom object-position.

**Asset**: `public/images/hero/bg-hero-section1.jpeg` (365 KB, 941×1672 JPEG). Next.js + sharp handles optimization and responsive srcset in production.

**Pre-patch**:
- `priority` prop present (triggers eager + internal high priority preload).
- No explicit `fetchPriority`.

**Optimization Applied (safe only)**:
- Added `fetchPriority="high"` (explicit).

**Result** (verified in build output):
- `<link rel="preload" as="image" ... fetchPriority="high" ... />`
- `<img ... fetchPriority="high" decoding="async" ... />`

This is a zero-visual, zero-layout, preload-hint-only change. Reduces risk of priority demotion for the Hero LCP element.

Scrim layers (3 absolute gradients) and other paint costs reviewed — left identical as required for visual parity.

## Validation Summary

All commands executed from project root after change and before release:

- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run build`: PASS (Next 16.2.10, static generation successful, image optimization paths emitted correctly)
- `npm run validate`: PASS (full chain)

Browser widths considered (per spec): 375 / 390 / 414 / 430 — no layout impact possible from attribute-only change.

## Independent Audit Summary

- Gemini Independent Audit: PASS (as stated in current status).
- Confirmed: change is isolated to a single safe prop on the LCP image.
- No scope violations, no visual drift risk, no frozen UI impact.
- Implementation follows "safe optimizations only" rule from scope lock.
- Report (M10-P4B-HERO-LCP.md) documents current LCP analysis, image audit, before/after, risks, and regression verification.

## Regression Summary

- Visual result: identical (photo crop/position, text overlays, gradients/scrims, CTA, benefits, trust strip, scroll indicator all unchanged).
- No layout shift.
- No hydration issues (client component prop addition only).
- No console errors.
- Build output preserves exact same structure and content for frozen sections.
- Prior QA screenshots at target widths remain valid references.
- All other sections (2–11), GlobalHeader, MobileShell, analytics, navigation contracts untouched by this patch.

## Architecture Compliance

- Fully compliant with M10-P4-PERFORMANCE-SCOPE-LOCK.md and M10 Foundation Hardening Blueprint.
- Change is measurement/audit + minimal safe opt only.
- Respects frozen baseline (Sections 1–11 visually identical).
- next/image usage remains standard and correct (priority + explicit fetchPriority is recommended pattern for LCP heroes).
- No overlap with WS-01 (primitives), WS-02 (tokens), or deferred items.

## Release Decision

APPROVED

M10-P4B Hero LCP Safe Optimization is promoted to the official release baseline as v4.1.6-m10-p4b-hero-lcp.

This completes the first incremental step of WS-04 Performance Hardening using only safe, reversible, non-visual optimizations.

Next planned (per scope and blueprint, not started here):
1. M10-P4C — Bundle & Shared Dependency Audit
2. M10-P4D — CSS / Paint Cost Audit
3. M10-P4E — Runtime Performance Verification
... followed by WS-01 / WS-02 / WS-07 as scheduled.

All SA governance rules observed: release promotion only. No implementation, no scope expansion.