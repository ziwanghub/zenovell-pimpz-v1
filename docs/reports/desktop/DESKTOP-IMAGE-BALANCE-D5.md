# Desktop Polish — Phase D5  
## Image Balance

**Date:** 2026-07-19  
**Branch:** `ui/desktop-image-balance-d5`  
**Base:** `main` post-D4 merge (`66988bf` / PR #27)  
**Mode:** `DESKTOP_ONLY` · wrapper / ratio / whitespace only  
**Breakpoint authority:** `min-[1280px]` only  
**Merge:** NO · **Deploy:** NO · **Await:** SA Visual Review  

---

## 1. Executive Summary

D5 rebalances **image visual weight vs surrounding content** on Desktop without replacing artwork or redesigning sections.

| Goal | Result |
|---|---|
| Image wrapper sizing / breathing room | **DONE** |
| Image-to-content ratio polish | **DONE** (S5 text↑, S6 image↑) |
| No image file / crop / artwork change | **DONE** |
| No Hero / CTA / typography / grid change | **DONE** |
| Mobile / Adaptive protected | **DONE** |

```text
IMAGE_SCOPE: PASS
READY_FOR_SA_VISUAL_REVIEW: YES
MERGE: NO
DEPLOY: NO
```

---

## 2. Visual Weight Audit

| Section | Pre-D5 Desktop issue (SA) | Direction |
|---|---|---|
| **Hero (S1)** | Balanced | Verify only — **no change** |
| **S3 Product** | Product stage slightly tall / edge-tight | Slightly reduce stage height; inset image |
| **S5 Promo** | Image strip **dominant** over copy | Lower strip height; widen text panel 44%→50% |
| **S6 Promo** | Image **light** vs step content | Raise strip height; text panel 62%→48% |
| **S8 Reviews** | Product thumbs underweight vs body | Chip thumb 28→36px desktop |
| **S10 Final** | Artwork tall vs CTA stack | Stage **380px** + horizontal/vertical inset |
| **Footer** | No imagery imbalance | Verify only — **no change** |

---

## 3. Sections Reviewed

| Section | Action |
|---|---|
| S1 Hero | Verified only |
| S3 | Wrapper balance |
| S5 | Promo band balance |
| S6 | Promo band balance |
| S8 | Thumbnail weight |
| S10 | Final artwork vs benefits/CTA |
| Footer | Verified only |

**Files changed (5):**

```text
sections/section-3-hero-product/section-3-hero-product.tsx
sections/section-5-why-choose-us/section-5-why-choose-us.tsx
sections/section-6-how-to-order/section-6-how-to-order.tsx
sections/section-8-reviews/section-8-reviews.tsx
sections/section-10-final-cta/section-10-final-cta.tsx
```

---

## 4. Image Balance Changes

### S3 — Product stage

| Token | Before (≥1280) | After |
|---|---|---|
| Stage min-height | 440px | **400px** (max 460) |
| Image frame | full bleed of stage | **inset-3** inner frame + rounded |

No grid-column ratio change. No artwork change.

### S5 — Promo band (image was dominant)

| Token | Before | After |
|---|---|---|
| Band min-height | 200px | **184px** |
| Text panel max-width | 44% | **50%** |
| Text padding | px-7 | **px-8 py-5** |

### S6 — Promo band (image was light)

| Token | Before | After |
|---|---|---|
| Band min-height | 176px | **208px** |
| Text panel max-width | 62% (md wins) | **48%** (`!` to beat `md:`) |
| Text padding | md px-5 | **px-6 py-5** desktop |

### S8 — Review product chips

| Token | Before | After |
|---|---|---|
| Thumb size | 28px (`size-7`) | **36px** (`size-9`) desktop |
| Chip padding | compact | slightly more air desktop |

### S10 — Final artwork

| Token | Before | After |
|---|---|---|
| Stage height | intended 440 (md 312 often won) | **380px** forced at ≥1280 |
| Image inset | none | **inset-x-4 inset-y-3** |
| `sizes` hint | stale 223px | up to **520px** desktop |

Note: Tailwind `md:min-h` can override plain `min-[1280px]:min-h`; desktop uses `!h` / `!min-h` so ≥1280 wins without breaking Adaptive `md:min-h-[312px]`.

---

## 5. Mobile Protection

| Viewport | S3 h | S5 h | S6 h | S10 h | Chip |
|---|---|---|---|---|---|
| 390 | **300** | **150** | **128** | **268** | **28** |

All pre-desktop values preserved. Overflow **false**.

---

## 6. Adaptive Protection

| Viewport | S3 | S5 text maxW | S6 text maxW | S10 h |
|---|---|---|---|---|
| 820 | 300 | 54% | 62% | 312 |
| 1279 | 300 | 54% | 62% | 312 |

D5 desktop tokens inactive below 1280.

---

## 7. Desktop Validation

| Viewport | S3 h | S5 h / text maxW | S6 h / text maxW | S10 h | Chip | Overflow |
|---|---|---|---|---|---|---|
| **1280** | 400 | 186 / **50%** | 210 / **48%** | **380** | 36 | false |
| **1440** | 400 | 186 / 50% | 210 / 48% | 380 | 36 | false |
| **1920** | 400 | 186 / 50% | 210 / 48% | 380 | 36 | false |

Evidence:

```text
screenshot/Desktop-screenshot/desktop-image-balance-d5/
  m390-*.png  e1279-*.png  d1280-*.png  d1440-*.png  d1920-*.png
  image-balance-audit.json
```

---

## 8. Static Validation

| Check | Result |
|---|---|
| `npm run lint` | **PASS** |
| `npm run build` | **PASS** |
| No `public/` image asset edits | **PASS** |
| No Hero / CTA / typography / grid-template edits | **PASS** |

---

## 9. Recommendation

| Item | Action |
|---|---|
| SA visual | Compare 1280/1440 S5 (less image dominance) vs S6 (more image presence) |
| Merge D5 | After SA PASS |
| Next | **D6 Desktop Consistency Audit** → **Desktop Design Authority Freeze** |
| Open D1/D2 | Still independent stack candidates |

```text
NEXT: SA Review → D6 Consistency Audit
```

---

## FINAL STATUS

```text
IMAGE_SCOPE: PASS
SECTION_3: PASS
SECTION_5: PASS
SECTION_6: PASS
SECTION_8: PASS
SECTION_10: PASS
FOOTER: PASS
MOBILE_PROTECTION: PASS
ADAPTIVE_PROTECTION: PASS
DESKTOP_1280: PASS
DESKTOP_1440: PASS
DESKTOP_1920: PASS
STATIC_VALIDATION: PASS
READY_FOR_SA_VISUAL_REVIEW: YES
MERGE: NO
DEPLOY: NO
```

**STOP** — Wait for SA Review.
