# WS01-P1A LineIcon Primitive Release Report

**Date**: 2026-07-06
**Patch**: WS01-P1A
**Release Baseline**: v4.1.8-m10-p4e-runtime-performance
**Status**: PROMOTED
**Workstream**: WS-01 Shared UI Primitives

## Executive Summary

WS01 Phase 1A successfully extracted and promoted the shared LineIcon primitive.

- Single primitive: LineIcon (green LINE logo SVG)
- Extracted to components/ui/line-icon.tsx
- Replaced 11 local duplicate implementations
- All call sites updated
- Visual, DOM, SVG parity preserved 100%
- Independent Audit: PASS
- Validation: PASS
- Regression: PASS (no drift in frozen sections)
- WS-01 P1A complete

This is the first primitive in WS-01, following strict scope lock.

## Scope

- Only LineIcon primitive
- Preserve exact SVG, sizes, aria-hidden, behavior
- Update all usages
- No other primitives extracted
- No UI, CSS, runtime, or other changes

## Files Changed

**New:**
- components/ui/line-icon.tsx

**Updated (removed local defs, added import):**
- components/layout/global-header.tsx
- sections/hero/hero-section.tsx
- sections/section-2-trust-bar/section-2-trust-bar.tsx
- sections/section-3-hero-product/section-3-hero-product.tsx
- sections/section-4-product-catalog/section-4-product-catalog.tsx
- sections/section-5-why-choose-us/section-5-why-choose-us.tsx
- sections/section-6-how-to-order/section-6-how-to-order.tsx
- sections/section-7-privacy-shipping/section-7-privacy-shipping.tsx
- sections/section-8-reviews/section-8-reviews.tsx
- sections/section-9-faq/section-9-faq.tsx
- sections/section-10-final-cta/section-10-final-cta.tsx

(11 source files + 1 new)

## Validation

- npm run lint: PASS
- npm run typecheck: PASS
- npm run build: PASS
- npm run validate: PASS

## Independent Audit

PASS (see WS01-P1A-INDEPENDENT-AUDIT.md)

- Exact SVG parity
- No visual/layout drift
- Call sites correct
- No scope violation

## Regression

- All frozen sections using LineIcon: identical output
- Header CTA, Hero, FAQ, Product, Footer, etc.: no change
- No layout shift, hydration issues, or errors
- Sizes and aria preserved

## Release Decision

PROMOTED

WS01-P1A LineIcon is now part of the official baseline.

Next per plan: WS01-P1B (after this release and closeout steps).

## Release Baseline

v4.1.9-ws01-p1a-lineicon

## Next Workstream

After WS-01 Phase 1A promotion and any required closeout, proceed to P1B SectionBadge when authorized.
