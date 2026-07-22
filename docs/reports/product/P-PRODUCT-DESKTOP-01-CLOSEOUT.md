# P-PRODUCT-DESKTOP-01 — Desktop Above-the-Fold Closeout

**Task:** P-PRODUCT-DESKTOP-01
**Merge gate:** P-PRODUCT-DESKTOP-01A
**Date:** 2026-07-22
**Branch:** `feature/product-desktop-atf-01`
**Feature commit:** `d5e795c`
**SA decision:** APPROVE FOR MERGE

## Authority

| Role | Reference |
|------|-----------|
| Engineering | `docs/reports/product/PRODUCT-DESKTOP-TABLET-LAYOUT-CONTRACT.md` v1.1 · DOCS_FROZEN |
| Visual | `DESIGN/Desktop-Blueprint-Design/desktop-prodects-page/desktop-prodects-page-ต้นแบบ.png` |
| Runtime URL verified | `/products/nicky-pimpz-boss` |

## Scope delivered (runtime)

| File | Role |
|------|------|
| `app/(platform)/products/[slug]/page.tsx` | Desktop ≥1280 ATF 48/52 grid + sticky buy wrapper |
| `components/platform/product-gallery.tsx` | Desktop square stage, contain-first, keyboard |
| `components/platform/product-hero.tsx` | Dual LINE CTAs, desktop type, 3-card trust |

**Not in this phase:** tablet layout, below-the-fold densify, FAQ reorder, bundle, reviews/related densify, homepage, packages.

## Durable browser evidence

Evidence directory (committed):

```text
docs/reports/product/evidence/p-product-desktop-01/
  mobile-390.png
  desktop-1280.png
  desktop-1366.png
  desktop-1440.png
  desktop-1536.png
  desktop-1920.png
  results.json
```

Source of truth for metrics: completed Playwright production-server run recorded in `results.json` (local path at run time was `/tmp/p-product-desktop-atf/`; values below are copied from that run, not invented).

### Viewport matrix

| Viewport | Layout | object-fit | Sticky buy | LINE CTAs | Trust cards | Overflow X | Result |
|----------|--------|------------|------------|-----------|-------------|------------|--------|
| 390 | stack | cover | static | 1 | 4 | no | **PASS** |
| 1280 | two-col | contain | sticky | 2 | 3 | no | **PASS** |
| 1366 | two-col | contain | sticky | 2 | 3 | no | **PASS** |
| 1440 | two-col | contain | sticky | 2 | 3 | no | **PASS** |
| 1536 | two-col | contain | sticky | 2 | 3 | no | **PASS** |
| 1920 | two-col | contain | sticky | 2 | 3 | no | **PASS** |

### Required observations

| Observation | Result |
|-------------|--------|
| Desktop two-column layout (gallery left / buy right) | **PASS** (≥1280) |
| Product image crop protection (`contain` on desktop) | **PASS** |
| Sticky buy column (desktop only) | **PASS** |
| Dual LINE CTA (desktop) | **PASS** — ปรึกษา + สั่งซื้อ |
| Three-card Desktop trust row | **PASS** |
| No page-level horizontal overflow | **PASS** all verified widths |
| Homepage regression none | **PASS** — `#section-3-hero-product` present @1280 |
| Product Mobile regression none | **PASS** — stack, cover, 1 CTA, 4 trust @390 |

## Quality gates (implementation)

| Gate | Result |
|------|--------|
| Lint | PASS |
| Typecheck | PASS |
| Build | PASS |

## Known non-blocking warnings

1. Repeated packshot across gallery thumbs until multi-angle assets exist
2. Expected letterboxing from `contain` crop protection
3. Tablet compact 2-col pending
4. Below-the-fold structure pending (P-PRODUCT-DESKTOP-02)

## Status after merge target

```text
P-PRODUCT-DESKTOP-01: COMPLETE
Authority delivered:
  - Desktop Product ATF >=1280
  - Gallery
  - Buy module
  - Sticky buy column
  - Dual LINE CTA
  - Desktop trust row
```

## Next ticket (do not implement here)

```text
P-PRODUCT-DESKTOP-02
Desktop Below-the-Fold Runtime Implementation

Scope only (Desktop ≥1280):
  Product Information · Reviews · Related Products · Bundle · FAQ
Out of scope:
  Tablet · Product Mobile · Homepage
```

Baseline after merge: `main` tip containing ATF commit + this closeout evidence.
