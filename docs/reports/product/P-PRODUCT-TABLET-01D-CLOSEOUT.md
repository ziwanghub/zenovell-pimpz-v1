# P-PRODUCT-TABLET-01D — iPad Mini and iPad Air Field Correction

**Task:** P-PRODUCT-TABLET-01D  
**Date:** 2026-07-22  
**Mode:** Investigation + minimal corrective implementation  
**Project:** ZENOVELL-PIMPZ-V4-Active  
**Branch:** `feature/product-tablet-01`  
**PR:** #37  
**Base commit:** `53fbc67`  
**Authority:** `PRODUCT-DESKTOP-TABLET-LAYOUT-CONTRACT.md` v1.1  
**Prior gate:** P-PRODUCT-TABLET-01B automated `TABLET_BROWSER_PASS` → **REJECTED_BY_FIELD_EVIDENCE**  
**Evidence:** `docs/reports/product/evidence/p-product-tablet-01d/`

---

## 1. Executive Summary

Field evidence on **iPad Mini portrait (768×1024)** and **iPad Air portrait (820×1180)** overrode the automated 01B pass. Root cause was **not** a wrong breakpoint for the BTF tree; it was **ATF gallery still rendering mobile composition** across the entire tablet-stack band (`768–899`):

| Contract (stack §6) | Before (53fbc67) | After (01D) |
|---------------------|------------------|-------------|
| Stage aspect **1:1** | **1.56** (mobile) | **1.0** |
| Stage max-h **380** | **~450–478** | **380** |
| `object-fit` **contain** | **cover** | **contain** |
| Buy / title in portrait viewport | Often crowded / buy deep below fold at 768×1024 | Title + buy recoverable in ATF |

Minimal product-only correction applied. Mobile `<768` and Desktop `≥1280` preserved. Full W×H matrix after fix: **ALL_PASS** including both primary devices.

```text
FINAL_VERDICT
TABLET_FIELD_CORRECTION_READY_FOR_REVIEW

PR #37
HOLD — DO NOT MERGE (awaits P-PRODUCT-TABLET-01E independent re-verification)

Product Freeze
NOT AUTHORIZED
```

---

## 2. Field Failure Reproduction

| Device | CSS viewport | Orientation | Band (width) | Field complaint | Reproduced |
|--------|-------------:|-------------|--------------|-----------------|:----------:|
| iPad Mini | **768 × 1024** | portrait | tablet-stack | Not acceptable Tablet | **YES** |
| iPad Air | **820 × 1180** | portrait | tablet-stack | Not acceptable Tablet | **YES** |

### What “not Tablet” meant (measured pre-fix)

| Symptom | 768×1024 | 820×1180 |
|---------|----------|----------|
| Mobile composition still on ATF gallery | **Yes** (aspect 1.56, cover) | **Yes** |
| Incorrect section width / shell | No (shell already full-width ≥690) | No |
| Oversized mobile gallery stage | **Yes** (stage ~702×450) | **Yes** (~746×478) |
| Gallery too tall for portrait ATF | **Yes** (gallery outer ~638px; buyY ~746 → buy mostly below fold on Mini) | Tall but more room |
| CTA composition | Single CTA (allowed for stack) | Same |
| Breakpoint not activating (BTF) | **No** — tablet BTF tree was already active | Same |
| Sticky leakage | **No** | **No** |
| Horizontal overflow | **No** | **No** |
| JS width detection failure | **N/A** — layout is pure CSS | N/A |

### Media-query / viewport inspection (pre- and post-fix)

| Query | 768×1024 | 820×1180 |
|-------|:--------:|:--------:|
| `min-width: 768px` | true | true |
| `min-width: 900px` | false | false |
| `min-width: 1280px` | false | false |
| CSS viewport | matches device profile | matches |
| Visual viewport | matches in headless profile | matches |

No device-pixel-ratio or zoom anomaly required to reproduce.

---

## 3. Root Cause

### Primary defect

**Contract non-compliance on gallery for tablet stack `768–899`.**

Contract §6:

```text
Tablet stack 768–899
  aspect: 1:1
  min/max stage h: 280 / 380
  crop default: contain
```

Implementation before 01D applied mobile tokens until **900**:

```text
aspect-[1.56/1]          // until min-[900px]
object-cover             // until min-[900px]
// no max-h 380 on stack band
```

So at iPad Mini/Air **portrait widths** the page correctly used:

- tablet **BTF** tree (`≥768`)
- **stack** ATF (not 2-col until 900)

…but ATF **gallery still looked like blown-up Mobile**, which field reviewers correctly rejected as “not Tablet.”

### Secondary densification gap

Sale price remained **mobile 48px** until 900; contract tablet scale is intermediate (~34–36). Corrected to **36px from 768**.

### Not the root cause

- Dual BTF trees / `useId`
- Sticky desktop rules
- Bundle authority
- Homepage shell
- Viewport-height as primary breakpoint (not used, not needed)
- User-agent / iPad-only hacks

---

## 4. Why Automated Verification Produced a False Pass

P-PRODUCT-TABLET-01B harness scored tablet-stack **PASS** when:

```text
twoCol === false
sticky === false
finalCta === false
bundle === true
order === info→reviews→related→bundle→faq
overflowX === false
```

It treated `objectFit === 'cover'` as acceptable for stack and **did not assert**:

- stage aspect ≈ 1
- stage height ≤ 380
- full **height** of device profile (only width was authoritative)

Width-only structural checks ≠ field-acceptable Tablet ATF.  
Addendum recorded in `P-PRODUCT-TABLET-01B-BROWSER-VERIFICATION.md` without erasing original evidence.

---

## 5. Files Changed

| File | Change |
|------|--------|
| `components/platform/product-gallery.tsx` | Tablet stack 768–899: 1:1 stage, max 380, contain; thumbs contain from 768; mobile `<768` frozen |
| `components/platform/product-hero.tsx` | Sale price densify `min-[768px]:text-[36px]` (mobile 48px frozen) |
| `docs/reports/product/P-PRODUCT-TABLET-01B-BROWSER-VERIFICATION.md` | SA addendum: false positive + `TABLET_BROWSER_CORRECTION_REQUIRED` |
| `docs/reports/product/evidence/p-product-tablet-01d/*` | Field correction evidence (W×H) |
| `docs/reports/product/P-PRODUCT-TABLET-01D-CLOSEOUT.md` | This report |

**Not changed:** Homepage, Header, Footer, Analytics, Metadata, JSON-LD, routes, Bundle pairing, Desktop sticky thresholds, 900 2-col grid, content.

---

## 6. Minimal Correction

### Gallery (primary)

```text
<768   frozen: aspect 1.56 · cover · full-bleed mobile stage
768–899 contract stack:
        aspect-square · min-h 280 · max-h 380 · max-w min(100%,380) centered
        object-contain · no mobile zoom (!scale-100)
900–1279 2-col stage: max-w none · min/max 300–420 · contain
≥1280 desktop: min/max 360–520 · contain
```

### Hero (secondary)

```text
Sale price: 48px <768 · 36px ≥768 · 34px ≥900 · 38px ≥1280
```

No UA detection. No height-primary breakpoints. No redesign.

---

## 7. iPad Mini Result

| Metric | Before | After |
|--------|--------|-------|
| Viewport | 768×1024 | 768×1024 |
| Band | tablet-stack | tablet-stack |
| Stage | ~702×450 · aspect 1.56 · cover | **380×380 · aspect 1 · contain** |
| Price | 48px | **36px** |
| Sticky | false | false |
| Final CTA | false | false |
| Bundle / BTF order | tablet order | tablet order |
| Overflow X | none | none |
| Result | FIELD FAIL | **PASS** |

Evidence: `ipad-mini-portrait-atf.png` · `-btf.png` · `-full.png`

---

## 8. iPad Air Result

| Metric | Before | After |
|--------|--------|-------|
| Viewport | 820×1180 | 820×1180 |
| Band | tablet-stack | tablet-stack |
| Stage | ~746×478 · aspect 1.56 · cover | **380×380 · aspect 1 · contain** |
| Price | 48px | **36px** |
| Sticky | false | false |
| Final CTA | false | false |
| Result | FIELD FAIL | **PASS** |

Evidence: `ipad-air-portrait-atf.png` · `-btf.png` · `-full.png`

---

## 9. Landscape Result

| Device | Viewport | Band | 2-col | Sticky | Fit | Result |
|--------|----------|------|:-----:|:------:|:---:|:------:|
| iPad Mini landscape | 1024×768 | tablet-2col | yes | no | contain | **PASS** |
| iPad Air landscape | 1180×820 | tablet-2col | yes | no | contain | **PASS** |

---

## 10. Mobile Regression

| Viewport | Stage | Fit | CTA | Final CTA | Bundle | Result |
|----------|-------|-----|-----|-----------|--------|:------:|
| 390×844 | aspect ~1.56 | cover | 1 | yes | no | **PASS** |
| 430×932 | aspect ~1.56 | cover | 1 | yes | no | **PASS** |
| 744×1133 (alt Mini CSS &lt;768) | mobile band | cover | 1 | yes | no | **PASS** (correctly **mobile**, not stack) |

---

## 11. Desktop Regression

| Viewport | 2-col | Sticky | Fit | Final CTA | Result |
|----------|:-----:|:------:|:---:|:---------:|:------:|
| 1280×800 | yes 48/52 | **yes** | contain | no | **PASS** |
| 1440×900 | yes | yes | contain | no | **PASS** |
| 1920×1080 | yes | yes | contain | no | **PASS** |

No sticky below 1280. Dual CTA retained ≥900.

---

## 12. Homepage Regression

| Viewport | S3 present | Overflow | Result |
|----------|:----------:|:--------:|:------:|
| 390×844 | yes | no | **PASS** |
| 1280×800 | yes | no | **PASS** |

---

## 13. Quality Gates

| Gate | Result |
|------|--------|
| `npm run lint` | **PASS** |
| `npm run typecheck` | **PASS** |
| `npm run build` | **PASS** |
| `git diff --check` | **PASS** |

---

## 14. Evidence Index

Root: `docs/reports/product/evidence/p-product-tablet-01d/`

| Artifact | Purpose |
|----------|---------|
| `results.json` | Full W×H matrix, MQ, DPR, stage geometry, pass flags |
| `ipad-mini-portrait-{atf,btf,full}.png` | Primary Mini portrait |
| `ipad-air-portrait-{atf,btf,full}.png` | Primary Air portrait |
| `ipad-mini-landscape-*.png` | Mini landscape |
| `ipad-air-landscape-*.png` | Air landscape |
| `ipad-mini-alt-744-*.png` | Alternate Mini CSS width (mobile band) |
| `ipad-pro11-portrait-*.png` | 834×1194 stack ref |
| `tablet-mid-810-*.png` | 810×1080 stack ref |
| `mobile-390/430-*.png` | Mobile regression |
| `tablet-2col-*-*.png` | 900 / 1024 / 1279 |
| `desktop-*-*.png` | 1280 / 1440 / 1920 |
| `homepage-390.png` / `homepage-1280.png` | Homepage regression |

Machine summary after correction:

```text
SUMMARY ALL_PASS primary=true
768×1024 stage=380×380@1 fit=contain price=36px
820×1180 stage=380×380@1 fit=contain price=36px
```

---

## 15. Remaining Warnings

| # | Warning | Severity | Disposition |
|---|---------|----------|-------------|
| 1 | Dual BTF trees | Low | Accepted (useId) |
| 2 | Multi-angle gallery assets interim | Low | Asset audit |
| 3 | ZZ pixel polish | Low | Post-launch |
| 4 | 01E independent field re-verification still required | **Gate** | Next phase |
| 5 | Real-device Safari chrome / dynamic toolbar not simulated in headless | Low | 01E should include real-device or DevTools device profile confirmation |

---

## 16. PR Status

```text
PR #37
HOLD — DO NOT MERGE

Branch
feature/product-tablet-01

Correction commit
(see git log after push)

Merge
NOT AUTHORIZED until P-PRODUCT-TABLET-01E TABLET_IPAD_FIELD_PASS
```

---

## 17. Merge Recommendation

```text
TABLET_FIELD_CORRECTION_READY_FOR_REVIEW
```

**Do not merge yet.** Open next gate:

```text
P-PRODUCT-TABLET-01E — Independent iPad Field Reverification
```

Merge path (unchanged SA policy):

```text
01D READY_FOR_REVIEW
  + 01E TABLET_IPAD_FIELD_PASS
  + Lint / Typecheck / Build PASS
  + Mobile / Desktop / Homepage regression PASS
  → P-PRODUCT-TABLET-01F Merge Closeout
  → then Product Freeze + Production Audits
```

---

## Final Verdict

# **TABLET_FIELD_CORRECTION_READY_FOR_REVIEW**
