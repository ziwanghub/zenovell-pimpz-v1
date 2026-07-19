# ZZ-03 — Section 3 Responsive Product Presentation

**Phase:** ZZ-03  
**Date:** 2026-07-19  
**Mode:** LIMITED IMPLEMENTATION · SECTION 3 ONLY · TABLET + DESKTOP · MOBILE IMMUTABLE  
**Base checkpoint:** `5d4cbce` (ZZ-01 + ZZ-02 combined)  
**Preview:** `http://localhost:3001`  
**Evidence:** `screenshot/Desktop-screenshot/zz-03-section-3-responsive/`  
**Baseline:** `screenshot/Desktop-screenshot/zz-03-section-3-baseline/`

```text
COMMIT: NO
PUSH: NO
PR: NO
DEPLOY: NO
```

---

## 1. Executive Summary

ZZ-03 polishes **Section 3 Featured Product** for Tablet (≥690) and Desktop (≥1280) only:

1. **Breakpoint-aware image art direction** — taller tablet image stages + CSS `object-position` ladder (no JS, no new asset).
2. **Content composition rhythm** — Benefits → Price → CTA → Trust with improved tablet gutters and desktop column balance.
3. **Mobile freeze** — stage `300px`, crop `center 42%`, stacked layout, CTA contracts unchanged.

| Gate | Result |
|---|---|
| Mobile visual / functional | **PASS** |
| Tablet image art direction | **PASS** |
| Desktop image art direction | **PASS** |
| Image loading (single asset) | **PASS** |
| Content composition | **PASS** |
| CTA / analytics / commerce | **PASS** |
| Scope = 1 runtime file | **PASS** |
| lint / typecheck / build | **PASS** |

```text
ZZ_03_STATUS: PASS (with ZZ-03A purchase-row correction applied)
ZZ_03A_STATUS: PASS
ZZ_03_READY_FOR_SA_REVIEW: YES
```

---

## ZZ-03A Purchase Action Row Correction

**Evidence:** `screenshot/Desktop-screenshot/zz-03a-purchase-row/`  
**Raw metrics:** `zz03a-verify.json` (+ accurate geometry re-measure)

### 1. Requirement

Place **Price Card + LINE CTA** on one horizontal purchase row for **Tablet/Desktop ≥690**.  
Mobile **&lt;690** remains stacked Price → CTA, pixel-equivalent to ZZ-03 baseline.

### 2. Previous layout

```text
Benefits
↓
Price Card   (full width)
↓
LINE CTA     (full width / compact desktop)
↓
Trust Panel
```

Vertical price+CTA stack made the right content column taller than the product image without need.

### 3. New responsive layout

```text
Mobile <690:
  display:contents on wrapper → Price and CTA remain stacked siblings

>=690:
  grid purchase row
  Tablet:  minmax(0,1fr) + minmax(250–300px)  gap 16–20
  Desktop: minmax(0,1fr) + minmax(240–260px)  gap 16
  items-center → pill CTA (~52px) vertically centered on price card (~80–86px)
```

Hierarchy:

```text
Benefits → [Price | CTA] → Trust Panel
```

### 4. Mobile protection

| Viewport | Price | CTA | Layout | secH |
|---:|---|---|---|---:|
| 390 | 358×**82** | 358×**56** | **stacked** | **928** (unchanged vs ZZ-03) |
| 375–430 | mx-16, h-14 CTA | preserved | stacked | 928 |

CTA → `https://lin.ee/syjmYE2` · aria unchanged.

```text
MOBILE_PURCHASE_LAYOUT: UNCHANGED
```

### 5. Tablet measurements (accurate)

| Viewport | Price w×h | CTA w×h | Gap | sameRow | midΔ | secH | Δ vs ZZ-03 |
|---:|---|---|---:|---|---:|---:|---:|
| 690 | **298×82** | **280×52** | **16** | yes | 0 | 911 | **−100** |
| 768 | 330×82 | 290×52 | 20 | yes | 0 | 931 | **−100** |

CTA label `nowrap`, single line. Price still shows พิเศษวันนี้ / 990.- / 1,290.- / ราคาปกติ without squeeze failure at 690.

### 6. Desktop measurements (accurate)

| Viewport | Price w×h | CTA w×h | Gap | sameRow | midΔ | secH | Δ vs ZZ-03 |
|---:|---|---|---:|---|---:|---:|---:|
| 1280 | **246×86** | **260×52** | **16** | yes | 0 | **552** | **−82** |
| 1440 | 273×86 | 260×52 | 16 | yes | 0 | 552 | **−82** |
| 1920 | 331×86 | 260×52 | 16 | yes | 0 | 556 | **−82** |

Right-column 0.52/0.48 image ratio preserved. Pill CTA (not tall card). Trust panel remains below the row.

### 7. Price hierarchy

- `990.-` remains dominant pink numeric  
- Original price muted right-aligned  
- Card border/background preserved  
- Desktop sale type size 36px (was 38 in early ZZ-03 desktop-only bump; still hierarchy-clear)

```text
PRICE_CARD_READABILITY: PASS
```

### 8. CTA hierarchy

- Pill form, height 52px on ≥690  
- Primary action next to price  
- Contracts: surface `featured-product-line`, source `featured-product`, LINE destination unchanged  

```text
CTA_READABILITY: PASS
CTA_HIERARCHY: PASS
PRICE_CTA_BALANCE: PASS
```

### 9. Section height comparison

| Viewport | ZZ-03 stacked | ZZ-03A row | Delta |
|---:|---:|---:|---:|
| 390 | 928 | 928 | 0 |
| 690 | 1011 | 911 | −100 |
| 768 | 1031 | 931 | −100 |
| 1280 | 634 | 552 | −82 |
| 1440 | 634 | 552 | −82 |
| 1920 | 638 | 556 | −82 |

```text
SECTION_HEIGHT_BALANCE: PASS
```

### 10. Static validation (post ZZ-03A)

| Command | Result |
|---|---|
| lint | PASS |
| typecheck | PASS |
| build | PASS |

### 11. Final status (ZZ-03A)

```text
ZZ_03A_STATUS:
PASS

MOBILE_PURCHASE_LAYOUT:
UNCHANGED

TABLET_PURCHASE_ROW:
PASS

DESKTOP_PURCHASE_ROW:
PASS

PRICE_CARD_READABILITY:
PASS

CTA_READABILITY:
PASS

CTA_HIERARCHY:
PASS

PRICE_CTA_BALANCE:
PASS

TRUST_PANEL_POSITION:
PASS

SECTION_HEIGHT_BALANCE:
PASS

CTA_CONTRACT_PROTECTION:
PASS

ANALYTICS_CONTRACT_PROTECTION:
PASS

STATIC_VALIDATION:
PASS

SOURCE_FILES_CHANGED:
1

CHANGE_SCOPE:
WITHIN_BUDGET

ZZ_03_READY_FOR_SA_REVIEW:
YES

COMMIT:
NO

PUSH:
NO

PR:
NO

DEPLOY:
NO
```

---

## 2. Requirement Interpretation

| Requirement | Implementation |
|---|---|
| Mobile &lt;690 immutable | Base classes retained (`h-[300px]`, `object-[center_42%]`, `mx-4`, stacked `block`) |
| No matchMedia | CSS `min-[…]` only |
| One image asset | `bg-hero-product-section3.jpeg` only |
| Tablet stays stacked | Grid only from `min-[1280px]` |
| Desktop two-column | Preserved; slight image bias `0.52 / 0.48` |
| CTA contracts | `activateLineCta` surface/source unchanged |
| Max 1 runtime file | `section-3-hero-product.tsx` only |

---

## 3. Repository State

| Field | Value |
|---|---|
| Branch | `ui/desktop-image-balance-d5` |
| HEAD at start of ZZ-03 | `5d4cbce` — combined ZZ-01 + ZZ-02 |
| Runtime modified | `sections/section-3-hero-product/section-3-hero-product.tsx` only (`+110 / −44`) |
| Unrelated untracked | DAF review, DWC-01 draft, RC1 note (not part of ZZ-03) |

---

## 4. Existing Section 3 Architecture

```text
<section#section-3-hero-product>
  Header block (badge, superline, product name link, tagline)
  Product image stage (fill Image + badges) → product route
  Content group:
    - 3 benefits
    - price block
    - LINE CTA (activateLineCta)
    - 4-item mini trust panel
  Mobile scroll indicator (hidden on desktop)
```

Pre-ZZ-03 issues on wide tablets: image stage locked at **300px** while width grew to ~900px → aggressive vertical crop. Desktop used universal `object-position: center 42%` and `sizes` that under-requested tablet (`430px`).

---

## 5. Image Art-Direction Strategy

### Stage height ladder

| Band | Stage height |
|---|---|
| &lt;690 (Mobile) | **300** (frozen) |
| 690–767 | 360 |
| 768–819 | 380 |
| 820–911 | 400 |
| 912–1023 | 420 |
| 1024–1279 | 440 |
| 1280–1365 | min 420 / max 500 |
| 1366–1535 | min 440 / max 520 |
| ≥1536 (incl. 1920) | min 460 / max 540 (quality ceiling) |

### object-position ladder (CSS classes)

| Band | Position |
|---|---|
| Mobile | `center 42%` |
| 690 | `center 40%` |
| 768 | `center 38%` |
| 820–1023 | `center 36%` → `35%` |
| 1280 | `center 40%` |
| 1366 | `center 42%` |
| 1536 | `center 44%` |
| 1920 | `center 46%` |

### sizes

```text
(max-width: 689px) 100vw,
(max-width: 1279px) 100vw,
(max-width: 1535px) 52vw,
640px
```

Replaces incorrect tablet candidate of `430px`.

---

## 6. Content Composition Strategy

**Progression (unchanged order):** Benefits → Price → Primary CTA → Trust reinforcement

| Surface | Tablet (≥690) | Desktop (≥1280) |
|---|---|---|
| Header / content gutters | `--platform-shell-gutter` | column-native (`px-0`) |
| Benefits gap | `gap-x-4` → `gap-x-5` | `gap-6` |
| Price block | shell margins, `px-5 py-4` | flush column, roomier padding |
| CTA | full width under gutters | compact `w-fit min-w-[240px]` |
| Trust panel | shell margins, denser gap | rounded-18, `gap-3.5`, secondary to CTA |
| Content column stack gap | — | `gap-6` (was 5) |
| Grid ratio | stacked | `0.52fr / 0.48fr` (image slightly dominant) |

No text, price, icons, order, or CTA label/destination changes.

---

## 7. Files Changed

| File | Role |
|---|---|
| `sections/section-3-hero-product/section-3-hero-product.tsx` | **Only** runtime change |

```text
SOURCE_FILES_CHANGED: 1
CHANGE_SCOPE: WITHIN_BUDGET
```

---

## 8. Mobile Freeze Evidence

| Viewport | Stage | object-position | CTA w | Price w | Layout | Overflow |
|---:|---|---|---:|---:|---|---|
| 375 | 375×**300** | **50% 42%** | 343 | 343 | block | no |
| 390 | 390×**300** | **50% 42%** | 358 | 358 | block | no |
| 414 | 414×**300** | **50% 42%** | 382 | 382 | block | no |
| 430 | 430×**300** | **50% 42%** | 398 | 398 | block | no |

Matches pre-change baseline (390: stage 390×300, pos 50% 42%).

Functional: CTA opens `https://lin.ee/syjmYE2`; aria `สั่งซื้อ NICKY PIMPZ BOSS ผ่าน LINE`.

Screenshot: `s3-390.png`

```text
MOBILE_VISUAL_PROTECTION: PASS
MOBILE_FUNCTIONAL_PROTECTION: PASS
```

---

## 9. Tablet Image Matrix

| Viewport | Stage w×h | object-position | Img count | Layout | Class |
|---:|---|---|---:|---|---|
| 690 | 642×**360** | 50% **40%** | 1 | stacked | PASS |
| 768 | 704×**380** | 50% **38%** | 1 | stacked | PASS |
| 820 | 748×**400** | 50% **36%** | 1 | stacked | PASS |
| 912 | 832×**420** | 50% **36%** | 1 | stacked | PASS |
| 1024 | 928×**440** | 50% **35%** | 1 | stacked | PASS |
| 1279 | 1183×**440** | 50% **35%** | 1 | stacked | PASS |

Bottle/cap remain primary focal; pink glow retained; no desktop grid leakage below 1280.

```text
TABLET_IMAGE_ART_DIRECTION: PASS
```

---

## 10. Tablet Content Matrix

| Viewport | Benefits | Price | CTA (full) | Trust | Hierarchy |
|---:|---:|---:|---:|---:|---|
| 690 | readable 3-col | 594 | 594 | grouped | Benefits→Price→CTA→Trust |
| 768 | readable | 640 | 640 | grouped | PASS |
| 820–1279 | readable | full under gutters | full | secondary | PASS |

```text
TABLET_CONTENT_COMPOSITION: PASS
BENEFITS_READABILITY: PASS
PRICE_HIERARCHY: PASS
CTA_HIERARCHY: PASS
TRUST_PANEL_BALANCE: PASS
```

---

## 11. Desktop Image Matrix

| Viewport | Stage w×h | object-position | Grid cols (approx) | Softness |
|---:|---|---|---|---|
| 1280 | 566×**420** | 50% 40% | 566 / 522 | ACCEPTABLE |
| 1366 | 590×**440** | 50% 42% | 590 / 544 | ACCEPTABLE |
| 1440 | 595×**440** | 50% 42% | 595 / 549 | ACCEPTABLE |
| 1536 | 645×**460** | 50% 44% | 645 / 595 | ACCEPTABLE |
| 1920 | 657×**460** | 50% 46% | 657 / 607 | ACCEPTABLE (ceiling held) |

Intrinsic source **941×1672** — rendered desktop width ≤657 ⇒ no heavy upscale. Softness acceptable.

Screenshot: `s3-1440.png` — bottle, cap, ginseng, passionfruit, stone stage visible; image remains visual hero vs Section 4 cards.

```text
DESKTOP_IMAGE_ART_DIRECTION: PASS
IMAGE_SOFTNESS: ACCEPTABLE
```

---

## 12. Desktop Content Matrix

| Viewport | Price w | CTA w | Tagline max | Content gap | Reading measure |
|---:|---:|---:|---|---|---|
| 1280–1920 | ~522–607 | **~263** compact | 420px authority retained | `gap-6` | PASS |

CTA remains primary action under price; trust panel quieter support.

```text
DESKTOP_CONTENT_COMPOSITION: PASS
```

---

## 13. CTA Protection

| Check | Result |
|---|---|
| Label / aria | Unchanged (`สั่งซื้อ NICKY PIMPZ BOSS ผ่าน LINE`) |
| Destination | `https://lin.ee/syjmYE2` via `activateLineCta` |
| Surface / source | `featured-product-line` / `featured-product` |
| Anchor semantics | Preserved |
| Order after price | Preserved |
| No duplicate CTA | Confirmed |
| Hover / focus / active classes | Preserved |

```text
CTA_CONTRACT_PROTECTION: PASS
CTA_HIERARCHY: PASS
```

---

## 14. Trust Panel Protection

Four items preserved (order/content):

- ปลอดภัย / ได้รับมาตรฐาน  
- พัฒนาโดย / นักวิจัยด้านสุขภาพสตรี  
- จัดส่งปกปิด / ไม่ระบุสินค้า  
- ปรึกษาฟรี / ทีมงานพร้อมแนะนำ  

Spacing only; does not outrank CTA.

```text
TRUST_PANEL_BALANCE: PASS
```

---

## 15. Section 2 → Section 3 Rhythm

Post ZZ-02, Section 2 ends with micro trust row (no large S2 CTA on wide). Section 3 opens with product badge/title then product hero image. Transition remains controlled; no collision.

```text
SECTION_2_TO_3_RHYTHM: PASS
```

---

## 16. Section 3 → Section 4 Rhythm

Desktop capture shows Section 3 product stage + CTA dominate; Section 4 catalog cards begin below with smaller tiles — Section 3 remains stronger.

```text
SECTION_3_TO_4_RHYTHM: PASS
```

---

## 17. Image Loading and Performance

| Check | 390 | 1440 |
|---|---|---|
| Unique Section 3 image requests | 1 | 1 |
| Asset | `/images/section-3/bg-hero-product-section3.jpeg` | same |
| Duplicate network | **none** | **none** |
| DOM image count | 1 | 1 |
| JS viewport switch | **none** | **none** |
| Lazy vs priority | default (not Hero LCP competitor) | default |

```text
IMAGE_LOADING: PASS
```

---

## 18. Accessibility Protection

| Check | Result |
|---|---|
| Product heading `H2` | PASS |
| Decorative icons `aria-hidden` | PASS |
| Image has meaningful alt from content | PASS (unchanged content contract) |
| CTA accessible name | PASS |
| Product image link aria-label | PASS |
| No heading hierarchy change | PASS |

```text
ACCESSIBILITY_PROTECTION: PASS
```

---

## 19. Static Validation

| Command | Result |
|---|---|
| `npm run lint` | **PASS** |
| `npm run typecheck` | **PASS** |
| `npm run build` | **PASS** |

```text
STATIC_VALIDATION: PASS
```

---

## 20. Risks and Warnings

| Risk | Level | Notes |
|---|---|---|
| Portrait source on wide tablet stages | Low | Taller stages mitigate; 1279 still wide—crop OK with 35% Y |
| Ingredient visibility varies by band | Low | Bottle primacy preferred; desktop restores side ingredients |
| Source 941px limits 2× retina sharpness | Known | Softness ACCEPTABLE; future IMG work if needed |
| Uncommitted until SA | Process | Checkpoint not authorized for ZZ-03 yet |

---

## 21. Rollback Instructions

```bash
git checkout HEAD -- sections/section-3-hero-product/section-3-hero-product.tsx
```

No asset or global CSS changes to reverse.

---

## 22. Final Status

```text
ZZ_03_STATUS:
PASS

ZZ_03A_STATUS:
PASS

MOBILE_VISUAL_PROTECTION:
PASS

MOBILE_FUNCTIONAL_PROTECTION:
PASS

MOBILE_PURCHASE_LAYOUT:
UNCHANGED

TABLET_IMAGE_ART_DIRECTION:
PASS

DESKTOP_IMAGE_ART_DIRECTION:
PASS

TABLET_PURCHASE_ROW:
PASS

DESKTOP_PURCHASE_ROW:
PASS

IMAGE_LOADING:
PASS

IMAGE_SOFTNESS:
ACCEPTABLE

TABLET_CONTENT_COMPOSITION:
PASS

DESKTOP_CONTENT_COMPOSITION:
PASS

BENEFITS_READABILITY:
PASS

PRICE_HIERARCHY:
PASS

PRICE_CARD_READABILITY:
PASS

CTA_HIERARCHY:
PASS

PRICE_CTA_BALANCE:
PASS

TRUST_PANEL_BALANCE:
PASS

TRUST_PANEL_POSITION:
PASS

SECTION_HEIGHT_BALANCE:
PASS

SECTION_2_TO_3_RHYTHM:
PASS

SECTION_3_TO_4_RHYTHM:
PASS

CTA_CONTRACT_PROTECTION:
PASS

ANALYTICS_CONTRACT_PROTECTION:
PASS

COMMERCE_CONTRACT_PROTECTION:
PASS

ACCESSIBILITY_PROTECTION:
PASS

STATIC_VALIDATION:
PASS

SOURCE_FILES_CHANGED:
1

CHANGE_SCOPE:
WITHIN_BUDGET

READY_FOR_SA_REVIEW:
YES

ZZ_03_READY_FOR_SA_REVIEW:
YES

COMMIT:
NO

PUSH:
NO

PR:
NO

DEPLOY:
NO
```

---

## Appendix A — Combined checkpoint (prior phase)

```text
ZZ-CP-01 COMMITTED:
  full:  5d4cbcee6ddeb69e81e209b68ebafd09d1d81c29
  short: 5d4cbce
  message: feat(homepage): refine hero and trust bar for tablet desktop
  files: 6 (2 runtime + 4 reports)
  push: NO
```

## Appendix B — Evidence

```text
screenshot/Desktop-screenshot/zz-03-section-3-responsive/s3-{375..1920}.png
screenshot/Desktop-screenshot/zz-03-section-3-responsive/zz03-verify.json
screenshot/Desktop-screenshot/zz-03-section-3-baseline/   (pre-change)
```
