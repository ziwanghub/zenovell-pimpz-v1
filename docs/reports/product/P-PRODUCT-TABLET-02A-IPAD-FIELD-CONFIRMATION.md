# P-PRODUCT-TABLET-02A — iPad Field Confirmation

**Task:** P-PRODUCT-TABLET-02A  
**Date:** 2026-07-22  
**Mode:** Verification only (no code / no commit / no merge)  
**Project:** ZENOVELL-PIMPZ-V4-Active  
**Branch:** `feature/product-tablet-01`  
**PR:** #37  
**Head commit:** `328da1c`  
**Authority:** `PRODUCT-DESKTOP-TABLET-LAYOUT-CONTRACT.md` v1.2  
**Evidence:** `docs/reports/product/evidence/p-product-tablet-02a/`

---

## 1. Executive Summary

Independent field confirmation of the **v1.2 Tablet = Desktop composition (no sticky)** authority on the two primary devices that originally failed under tablet-stack:

| Device | Viewport | Result |
|--------|----------|:------:|
| iPad Mini portrait | **768 × 1024** | **PASS** |
| iPad Air portrait | **820 × 1180** | **PASS** |

All secondary orientation + regression viewports also **PASS**. No page errors. No horizontal overflow.

```text
FINAL_VERDICT
TABLET_IPAD_FIELD_PASS

Merge recommendation
AUTHORIZED — proceed P-PRODUCT-TABLET-02B
```

---

## 2. Authority and Commit

| Field | Value |
|-------|-------|
| Contract | v1.2 — `768–1279` Desktop composition, no sticky |
| Architecture | SA approved (P-PRODUCT-TABLET-02) |
| Head under test | **`328da1c`** |
| Runtime | Production build (`npm run build` + `start :3000`) |
| Tool | Playwright exact CSS viewport W×H (device profiles as named dimensions) |

```text
390–767     Mobile frozen
768–1279    Desktop composition · reduced density · NO sticky
≥1280       Desktop + Sticky Buy
```

---

## 3. iPad Mini Portrait Result — 768 × 1024

| Check | Result |
|-------|--------|
| CSS viewport | 768 × 1024 |
| Layout band | `tablet-desktop-composition` |
| Two-column | **yes** — gallery left, buy right |
| Gallery left | **yes** (stage ~294×294 @ x33) |
| Product info right | **yes** (buy @ x344) |
| Title without scroll | **yes** |
| Price without scroll | **yes** |
| Primary CTA in initial viewport | **yes** |
| Dual LINE CTA | **2** (ปรึกษา / สั่งซื้อ) |
| Trust row | under dual CTA (3 cards) |
| Sticky | **false** |
| object-fit | **contain** |
| Gallery dominates viewport | **false** |
| Mobile composition leak | **none** |
| Horizontal overflow | **none** |
| Final CTA | **absent** (mobile-only) |
| BTF order | info → reviews → related → bundle → faq |
| Result | **PASS** |

Evidence: `ipad-mini-portrait-atf.png` · `-btf.png` · `-full.png`

---

## 4. iPad Air Portrait Result — 820 × 1180

| Check | Result |
|-------|--------|
| CSS viewport | 820 × 1180 |
| Layout band | `tablet-desktop-composition` |
| Two-column | **yes** |
| Gallery left | **yes** (~333×333 @ x37) |
| Product info right | **yes** (buy @ x391) |
| Title / price / CTA ATF | **all yes** |
| Dual CTA | **2** |
| Sticky | **false** |
| object-fit | **contain** |
| Gallery dominates | **false** |
| Overflow X | **none** |
| Final CTA | **absent** |
| BTF order | contract order |
| Result | **PASS** |

Evidence: `ipad-air-portrait-atf.png` · `-btf.png` · `-full.png`

---

## 5. Landscape Results

| Device | Viewport | 2-col | Sticky | Dual CTA | Fit | Result |
|--------|----------|:-----:|:------:|:--------:|:---:|:------:|
| iPad Mini landscape | 1024 × 768 | yes | no | 2 | contain | **PASS** |
| iPad Air landscape | 1180 × 820 | yes | no | 2 | contain | **PASS** |

---

## 6. Mobile Regression

| Viewport | 2-col | Sticky | CTA | Fit | Final CTA | Result |
|----------|:-----:|:------:|:---:|:---:|:---------:|:------:|
| 390 × 844 | no | no | 1 | cover | yes | **PASS** |
| 430 × 932 | no | no | 1 | cover | yes | **PASS** |

---

## 7. Desktop Regression

| Viewport | 2-col | Sticky | Dual CTA | Fit | Result |
|----------|:-----:|:------:|:--------:|:---:|:------:|
| 1280 × 800 | yes | **yes** | 2 | contain | **PASS** |
| 1440 × 900 | yes | **yes** | 2 | contain | **PASS** |
| 1920 × 1080 | yes | **yes** | 2 | contain | **PASS** |

Sticky **only** at ≥1280. No sticky leakage on tablet band.

---

## 8. Homepage Regression

| Viewport | S3 present | Overflow | Result |
|----------|:----------:|:--------:|:------:|
| 390 × 844 | yes | no | **PASS** |
| 1280 × 800 | yes | no | **PASS** |

---

## 9. Console and Overflow Results

| Check | Result |
|-------|--------|
| Page errors | **none** |
| Horizontal overflow (all product viewports) | **none** |
| CTA overlap | **none** |
| Gallery/buy column overlap | **none** |

Additional intermediate tablet refs (900 / 1112 / 1279): **PASS**

---

## 10. Evidence Index

Root: `docs/reports/product/evidence/p-product-tablet-02a/`

| Artifact | Purpose |
|----------|---------|
| `results.json` | Full matrix + MQ + geometry + pass flags |
| `ipad-mini-portrait-{atf,btf,full}.png` | Primary Mini |
| `ipad-air-portrait-{atf,btf,full}.png` | Primary Air |
| `ipad-*-landscape-*.png` | Landscape secondary |
| `mobile-*.png` | Mobile regression |
| `tablet-*.png` | Intermediate / boundary tablet |
| `desktop-*.png` | Desktop sticky regression |
| `homepage-*.png` | Homepage regression |

---

## 11. Merge Recommendation

```text
TABLET_IPAD_FIELD_PASS
```

Field gate for PR #37 is **satisfied**. Proceed immediately to:

```text
P-PRODUCT-TABLET-02B — Merge Closeout
```

Do **not** declare Product Freeze until merge lands on `main` and main CI is green.

---

## Final Verdict

# **TABLET_IPAD_FIELD_PASS**
