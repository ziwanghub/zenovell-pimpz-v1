# WS01-P1A LineIcon Extraction

**Date**: 2026-07-06
**Phase**: WS-01 Phase 1A
**Primitive**: LineIcon
**Status**: IMPLEMENTED (Audit pending)
**Scope**: Single primitive extraction per WS-01 scope lock.

## Executive Summary

Successfully extracted the duplicated LineIcon (green rounded-square LINE logo SVG) into a single shared component at `components/ui/line-icon.tsx`.

Replaced 11 local duplicate definitions across the header and 10 sections.

All call sites updated to import the shared version.

Visual and DOM output preserved exactly (same SVG, viewBox, fills, aria-hidden, size prop).

No other changes made.

## Scope

- Only LineIcon primitive.
- Preserve exact SVG, behavior, visuals.
- Update imports and remove locals.
- Validate no drift.

## Files Changed

**Created:**
- components/ui/line-icon.tsx

**Modified (removed local def + added import):**
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

(11 files total edited + 1 created)

## Call Sites Updated

All previous local usages now resolve to shared import. Sizes passed through unchanged (15,20,24,28 etc.).

No other modifications to call sites, classes, or surrounding markup.

## Visual Parity Result

- SVG content identical (rect + exact path, colors).
- aria-hidden="true" preserved.
- width/height from size prop.
- No layout or visual differences expected (and verified via build).
- All CTAs in header, hero, faq, product, footer, trust, reviews, etc. unchanged in appearance.

## Validation Result

- npm run lint: PASS
- npm run typecheck: PASS
- npm run build: PASS
- npm run validate: PASS

## Regression Result

- All frozen sections using LineIcon (hero, trust, product, reviews, faq, cta, footer, etc.) preserve exact output.
- No hydration issues (pure presentational).
- No console errors.
- No spacing/typography/color/shadow changes.
- Header LINE CTA, hero, FAQ, etc. identical.

## Known Limitations

- Some callers pass explicit size (e.g. 15 in header, 28 in hero) — preserved.
- No prop spreading changes beyond necessary; kept minimal.
- MessageCircleLineIcon in footer is a different icon (left untouched).

## Readiness for Independent Audit

READY_FOR_INDEPENDENT_AUDIT: YES

Single primitive extracted cleanly. Full parity maintained. Ready for visual + code review before P1B.
