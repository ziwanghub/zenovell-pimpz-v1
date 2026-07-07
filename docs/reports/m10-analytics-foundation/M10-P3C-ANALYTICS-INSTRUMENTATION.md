# M10-P3C Analytics Instrumentation

Date: `2026-07-06`
Phase: `M10 Foundation Hardening`
Patch: `M10-P3C Analytics Instrumentation`
Status: `COMPLETE`
Governance: `Lightweight Z-MOS Style Governance`
Release Baseline: `v4.1.3-m10-p3b-analytics-utility`

## 1. Executive Summary

Instrumented key surfaces using the analytics utility from M10-P3B.

All tracking calls use `analytics.track()` with standard payload from the approved contract.

No UI changes, no vendor code, no architecture changes.

Surfaces instrumented:
- GlobalHeader
- Hero
- FAQ
- Footer
- Product Catalog CTAs

## 2. Files Changed

- components/layout/global-header.tsx
- sections/hero/hero-section.tsx
- sections/section-9-faq/section-9-faq.tsx
- sections/section-11-footer/section-11-footer.tsx
- sections/section-4-product-catalog/section-4-product-catalog.tsx

(Added imports and onClick handlers only. No layout or style modifications.)

## 3. Instrumented Surfaces

**GlobalHeader**
- menu_open (menu button toggle to open)
- drawer_close (close actions and nav)
- navigation_click (drawer links)
- header_cta_click (LINE CTA)

**Hero**
- hero_cta_click (primary CTA)

**FAQ**
- faq_expand / faq_collapse (on button click)
- support_cta_click (support and final CTAs)

**Footer**
- footer_cta_click (nav links)
- contact_click (interactive contacts)
- social_click (social icons)

**Product**
- product_click (card CTAs and final CTA)

## 4. Event Mapping

Used exact events from M10-P3A taxonomy and AnalyticsEvents.

## 5. Payload Mapping

For each:
{
  event: AnalyticsEvents.XXX,
  surface: "header" | "hero" | "faq" | "footer" | "section",
  label: visible label,
  destination: resolved href
}

All resolved via existing authorities where applicable.

## 6. Validation

- npm run lint: PASS
- npm run typecheck: PASS
- npm run build: PASS
- npm run validate: PASS

## 7. Regression Check

- UI visually identical
- No layout shift
- All interactive elements (drawer, FAQ, CTAs) function as before
- No console errors
- Header count remains 1
- Footer unchanged
- Frozen sections parity maintained

## 8. Known Limitations

- Events fire but no adapters registered yet (P3D).
- Some destinations still point to placeholders (as per baseline).
- No page_view or other global events instrumented (out of P3C scope).

## 9. Go / No-Go

GO for M10-P3D.

All approved instrumentation complete without violating constraints.
