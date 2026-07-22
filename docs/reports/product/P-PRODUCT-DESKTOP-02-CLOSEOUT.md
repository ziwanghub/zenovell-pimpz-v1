# P-PRODUCT-DESKTOP-02 — Desktop Below-the-Fold Closeout

**Task:** P-PRODUCT-DESKTOP-02
**Date:** 2026-07-22
**Branch:** `feature/product-desktop-btf-02`
**Base:** `main` @ `9e4b6b8` (P-PRODUCT-DESKTOP-01 merged)
**Status:** Implementation complete — **awaiting SA review / do not merge without approval**

## Authority

| Role | Reference |
|------|-----------|
| Engineering | `docs/reports/product/PRODUCT-DESKTOP-TABLET-LAYOUT-CONTRACT.md` v1.1 |
| Visual | `desktop-prodects-page-ต้นแบบ.png` |
| ATF frozen | P-PRODUCT-DESKTOP-01 on main |

## Reuse map

| Surface | Action |
|---------|--------|
| ProductKnowledgeTabs | Reuse + desktop densify (equal tabs) |
| ProductProblemSnapshot / Expectation | Reuse inside Information composition |
| ProductReviews | Reuse + desktop 3-col grid |
| ProductRelatedProducts | Reuse + desktop 4-col grid |
| ProductFAQ | Reuse + desktop 2-col + closed default on desktop |
| ProductFinalCta | Mobile/tablet only (`min-[1280px]:hidden`) |
| ProductBundle | **New** route-local component; LINE via `activateLineCta` |
| Product data | `products.ts` / entity loader only |
| Gallery / Hero | Unchanged (ATF frozen) |

## Desktop section order (after)

```text
ATF (Gallery | Buy)
→ Product Information (Problem + Knowledge tabs + Expectation)
→ Reviews
→ Related Products
→ Bundle Promotion
→ FAQ
→ Footer
```

Final CTA is **not** in Desktop sequence (Bundle carries LINE conversion).

## Mobile / &lt;1280 order (preserved)

```text
TrustSignals → Information modules → Reviews → FAQ → Related → Final CTA
```

Dual composition wrappers (`min-[1280px]:hidden` / `hidden min-[1280px]:block`).

## Browser evidence

`docs/reports/product/evidence/p-product-desktop-02/`

| Viewport | Result | Notes |
|----------|--------|-------|
| 1280–1920 | **PASS** | order info>reviews>related>bundle>faq; no Final CTA; sticky ATF; no overflow |
| 390–1279 | **PASS** | mobile-era order; Final CTA visible; bundle hidden |
| Homepage 1280 | **PASS** | S3 present |

Source metrics: `evidence/p-product-desktop-02/results.json`

## Quality gates

| Gate | Result |
|------|--------|
| Lint | PASS |
| Typecheck | PASS |
| Build | PASS |

## Known warnings

1. Dual composition duplicates markup trees for breakpoint-safe order (display:none hides inactive tree from a11y).
2. Related products = 4 real catalog SKUs excluding current.
3. Bundle pairs first related product (e.g. BOSS MEN) — no invented discount.
4. Review count is authority-backed (3 real reviews on pilot); desktop grid shows all real cards without fabrication.
5. Tablet compact 2-col still pending (not this task).
6. Gallery multi-angle assets still interim (ATF scope).

## Explicit non-goals confirmed

- Tablet implementation: **not done**
- Product Mobile changes: **not done**
- Homepage / Header / Footer: **not done**
- Packages / security: **not done**
- Cart/checkout: **not done**
