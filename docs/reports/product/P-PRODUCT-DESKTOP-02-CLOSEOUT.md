# P-PRODUCT-DESKTOP-02 — Desktop Below-the-Fold Closeout

**Task:** P-PRODUCT-DESKTOP-02 (+ **02A** authority/safety gate)
**Date:** 2026-07-22
**Branch:** `feature/product-desktop-btf-02`
**Base:** `main` @ `9e4b6b8`
**PR:** #35 — **HOLD MERGE** until SA re-review after 02A
**Status:** `READY_FOR_SA_MERGE_REVIEW` (after 02A corrections)

## Authority

| Role | Reference |
|------|-----------|
| Engineering | Layout Contract v1.1 DOCS_FROZEN |
| Visual | `desktop-prodects-page-ต้นแบบ.png` |
| ATF | P-PRODUCT-DESKTOP-01 frozen on main |

---

## P-PRODUCT-DESKTOP-02A — Bundle authority

| Field | Value |
|-------|--------|
| **Paired product** | **BOSS MEN** (`boss-men` / BSM-002) |
| **Authority source** | `content/products.ts` → `products[nicky-pimpz-boss].bundle.pairedProductSlug` |
| **Shape** | `bundle?: { pairedProductSlug; label?; description? }` on `Product` |
| **First-related derivation removed?** | **Yes** — page resolves only via explicit slug + catalog lookup |
| **Deterministic?** | **Yes** |
| **Invented discount/promo?** | **No** — neutral co-use copy; prices shown as individual list prices only |
| **Copy** | label: `แนะนำให้ใช้ร่วมกัน` · description explains co-use + LINE, no fake bundle savings |

---

## P-PRODUCT-DESKTOP-02A — Dual-tree safety

| Check | Result |
|-------|--------|
| Implementation | Dual BTF trees: `data-btf-tree="mobile"` / `"desktop"` with CSS `display:none` on inactive tree |
| Duplicate IDs **before** | Static `product-reviews-title`, `related-products-title` (and risk of collision across trees) |
| Duplicate IDs **after** | **0** in `#product-page-content` and full document (verified 390–1920) |
| Correction | `useId()` for reviews/related/bundle headings; knowledge/FAQ/expectation already used `useId` per instance |
| ARIA refs (product root) | **0 broken** |
| Hidden focusable | **Cannot focus** controls inside `display:none` trees |
| Keyboard tabs (desktop) | **PASS** |
| Keyboard FAQ (desktop) | **PASS** |
| JSON-LD | Single pair (product + breadcrumb) — not duplicated by BTF trees |
| Hydration | No pageerror observed in audit run |
| Analytics | Bundle/Final CTA only on their visible trees; no double-render of Final CTA on desktop |

### Viewport matrix (02A audit)

| Width | Bundle visible | Order | prodDups | hiddenFocus | Result |
|------:|:--------------:|-------|:--------:|:-----------:|--------|
| 390–1279 | no | mobile tree | 0 | false | PASS |
| 1280 / 1440 / 1920 | yes | info→reviews→related→bundle→faq | 0 | false | PASS |

Evidence: `docs/reports/product/evidence/p-product-desktop-02/dom-safety-audit.json`

---

## Reuse map (unchanged intent)

Knowledge tabs, problem, expectation, reviews, related, FAQ accordion, LINE activation, catalog entities.
**New:** `ProductBundle` + optional `Product.bundle` field.

## Desktop order

```text
ATF → Information → Reviews → Related → Bundle → FAQ → Footer
Final CTA: mobile tree only
```

## Mobile / &lt;1280

Preserved mobile-era order and Final CTA. Bundle not shown.

## Quality gates (02A)

| Gate | Result |
|------|--------|
| Lint | PASS |
| Typecheck | PASS |
| Build | PASS |

## Known warnings

1. Dual trees still duplicate **content nodes** (not IDs); inactive tree `display:none`
2. Frozen GlobalHeader may have drawer `aria-controls` when panel unmounted — **out of BTF scope** (not product-root)
3. Tablet compact layout still pending
4. Bundle is co-use recommendation, not a priced promotional bundle SKU

## Files touched in 02A

- `content/products.ts` — `bundle` type + Nicky explicit pair
- `app/(platform)/products/[slug]/page.tsx` — explicit pair resolve
- `product-bundle.tsx` — authority guard + neutral copy
- `product-reviews.tsx` / `product-related-products.tsx` — unique IDs
- closeout + `dom-safety-audit.json`
