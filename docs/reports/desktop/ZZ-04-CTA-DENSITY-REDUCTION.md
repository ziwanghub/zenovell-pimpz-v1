# ZZ-04 — Tablet/Desktop CTA Density Reduction

**Phase:** ZZ-04  
**Date:** 2026-07-19  
**Mode:** LIMITED IMPLEMENTATION · SECTIONS 5 / 6 / 8 · TABLET+DESKTOP ONLY · MOBILE IMMUTABLE  
**Base HEAD:** `aa8059399c606f0353331c94b31f8e3096410ef0` (`aa80593`)  
**Branch:** `ui/desktop-image-balance-d5`  
**Evidence:** `screenshot/Desktop-screenshot/zz-04-cta-density/`  
**Raw metrics:** `zz04-verify.json`

```text
COMMIT: NO
PUSH: NO
PR: NO
DEPLOY: NO
```

---

## 1. Executive Summary

ZZ-04 reduces **generic pink LINE CTA density** on Tablet/Desktop (≥690px) in Sections **5, 6, and 8**, while freezing Mobile and preserving Section 8’s **contextual review CTA**.

| Gate | Result |
|---|---|
| Mobile S5 / S6 / S8 generic CTAs | **UNCHANGED** |
| S5 generic CTA ≥690 | **HIDDEN** |
| S6 generic CTA ≥690 | **HIDDEN** |
| S8 generic CTA ≥690 | **HIDDEN** |
| S8 contextual review CTA | **PRESERVED** all viewports |
| Focus / no flash | **PASS** |
| Section transitions | **PASS** |
| Conversion hierarchy | **IMPROVED** |
| Contracts / analytics | **PASS** |
| Scope = 3 runtime files | **PASS** |
| lint / typecheck / build | **PASS** |

```text
ZZ_04_STATUS: PASS
READY_FOR_SA_REVIEW: YES
```

---

## 2. Requirement Interpretation

| Intent | Implementation |
|---|---|
| Hide generic CTAs ≥690 | Wrapper `min-[690px]:hidden` (`display:none`) |
| No JS viewport gate | CSS only |
| Keep handlers | `activateLineCta` unchanged |
| S8 contextual keep | `MoreReviewsRow` untouched |
| No empty CTA gap | Hidden wrapper collapses; trust-row `pt` slightly increased ≥690 only |
| Max 3 runtime files | S5 + S6 + S8 only |

---

## 3. Repository State

| Field | Value |
|---|---|
| Path | `…/PROJECTS/ZENOVELL-PIMPZ-V4-Active` |
| Branch | `ui/desktop-image-balance-d5` |
| HEAD | `aa80593` — ZZ-03 checkpoint |
| Modified runtime | 3 section files (this phase) |
| Unrelated untracked | DAF / DWC-01 / RC1 docs (untouched) |

`HEAD_OK` · `BRANCH_OK`

---

## 4. Existing CTA Hierarchy (pre)

Desktop had large generic LINE pills in S5, S6, S8 **in addition to** Header, Hero, S3 purchase, S4 product CTAs, and S10 final CTA → flat conversion density and visual pink noise.

---

## 5. CTA Classification

| CTA | Section | Intent | ≥690 action |
|---|---|---|---|
| ปรึกษาผู้เชี่ยวชาญผ่าน LINE | 5 | Generic consult | **HIDE** |
| ปรึกษาหรือสั่งซื้อผ่าน LINE | 6 | Generic order/consult | **HIDE** |
| ปรึกษาหรือสั่งซื้อผ่าน LINE | 8 | Generic order/consult | **HIDE** |
| ดูรีวิวเพิ่มเติมใน LINE | 8 | **Contextual review** | **KEEP** |

---

## 6. Section 5 Change

**Target:** `FinalLineCTA` — `aria-label="ปรึกษาผู้เชี่ยวชาญเกี่ยวกับสินค้า ผ่าน LINE"`

```tsx
<div className="px-4 pt-3.5 min-[690px]:hidden">
  <FinalLineCTA {...content.finalCta} />
</div>
```

- Trust row: Mobile `pt-3` unchanged; `min-[690px]:pt-4` after promo when CTA gone  
- Content / image / handlers preserved  

**Tablet/Desktop ending:** Support promo → micro trust → Section 6

---

## 7. Section 6 Change

**Target:** `FinalLineCTA` — `aria-label="ปรึกษาหรือสั่งซื้อสินค้าผ่าน LINE"`

```tsx
<div className="px-4 pt-[14px] min-[690px]:hidden">
  <FinalLineCTA {...content.finalCta} />
</div>
```

- Trust row: `min-[690px]:pt-5`  
- Six steps / promo / handlers preserved  

**Tablet/Desktop ending:** Order summary promo → micro trust → Section 7

---

## 8. Section 8 Change

| CTA | Code | ≥690 |
|---|---|---|
| Contextual | `MoreReviewsRow` | **visible** |
| Generic | `FinalLineCTA` wrapper `min-[690px]:hidden` | **hidden** |

Trust row: `min-[690px]:pt-5` after contextual CTA only.

---

## 9. Files Changed

| File | Δ |
|---|---|
| `sections/section-5-why-choose-us/section-5-why-choose-us.tsx` | wrapper hide + trust pt |
| `sections/section-6-how-to-order/section-6-how-to-order.tsx` | wrapper hide + trust pt |
| `sections/section-8-reviews/section-8-reviews.tsx` | generic hide; contextual kept |

```text
SOURCE_FILES_CHANGED: 3
CHANGE_SCOPE: WITHIN_BUDGET
```

Not modified: S1–4, S7, S9–11, header, shared CTA lib, globals, assets.

---

## 10. Mobile Freeze Evidence

| Viewport | S5 CTA | S6 CTA | S8 generic | S8 contextual | Overflow |
|---:|---|---|---|---|---|
| 375 | 58px visible | 56px | 56px | 58×343 | no |
| 390 | 58px visible | 56px | 56px | 58×358 | no |
| 414 | 58px visible | 56px | 56px | 58×382 | no |
| 430 | 58px visible | 56px | 56px | 58×398 | no |

Mobile focus: all four CTAs focusable.  
Mobile click → `https://lin.ee/syjmYE2` for S5, S6, S8 generic, S8 contextual.

```text
MOBILE_SECTION_5_CTA: UNCHANGED
MOBILE_SECTION_6_CTA: UNCHANGED
MOBILE_SECTION_8_GENERIC_CTA: UNCHANGED
```

---

## 11. Tablet Verification Matrix

| Viewport | S5 CTA | S6 CTA | S8 generic | S8 contextual | S8 tab order |
|---:|---|---|---|---|---|
| 690 | **hidden** 0×0 | **hidden** | **hidden** | visible 58×610 | contextual only |
| 768 | hidden | hidden | hidden | visible | contextual only |
| 820 | hidden | hidden | hidden | visible | contextual only |
| 1024 | hidden | hidden | hidden | visible | contextual only |

No overflow. Section heights drop vs Mobile (CTA band removed).

---

## 12. Desktop Verification Matrix

| Viewport | S5/S6/S8 generic | S8 contextual | Focus generic | Focus contextual |
|---:|---|---|---|---|
| 1280–1920 | **HIDDEN** | **PRESERVED** | denied | **reachable** |

Example 1440: S5 h≈705, S6 h≈773 after hide; contextual CTA h=62.

---

## 13. Focus and Accessibility Verification

| Case | Result |
|---|---|
| Mobile S5/S6/S8 generic focus | **active=true** |
| Mobile S8 contextual focus | **active=true** |
| Desktop 1440 S5/S6/S8 generic | **hid=true**, offsetParent false, active false |
| Desktop 1440 S8 contextual | **active=true** |
| Headings / content | unchanged |
| Handlers still in tree | yes (hidden, not deleted) |

```text
CTA_FOCUS_PROTECTION: PASS
ACCESSIBILITY_PROTECTION: PASS
```

---

## 14. Section Transition Review

| Transition | ≥690 | Result |
|---|---|---|
| S5 → S6 | Support + trust → education | **PASS** |
| S6 → S7 | Process + trust → privacy | **PASS** |
| S8 → S9 | Reviews + contextual CTA + trust → FAQ | **PASS** |

No CTA-sized voids (wrappers `display:none`). Adjacent sections remain distinct.

```text
SECTION_5_TO_6_RHYTHM: PASS
SECTION_6_TO_7_RHYTHM: PASS
SECTION_8_TO_9_RHYTHM: PASS
```

---

## 15. Conversion Hierarchy Comparison

**After ZZ-04 (Tablet/Desktop):**

| Surface | Role |
|---|---|
| Header | Persistent consult |
| Hero | Brand primary CTA |
| Section 3 | Featured purchase |
| Section 4 | Product-specific CTAs |
| Section 5 | Brand justification — **no large generic CTA** |
| Section 6 | Ordering education — **no large generic CTA** |
| Section 8 | Social proof + **contextual review CTA only** |
| Section 10 | Final conversion |

Large generic mid-page pills reduced by **3** on every ≥690 viewport. Conversion paths remain via Header / Hero / S3 / S4 / S8 contextual / S10.

```text
CONVERSION_HIERARCHY: IMPROVED
```

---

## 16. Functional and Analytics Protection

| Contract | Result |
|---|---|
| LINE URL | `https://lin.ee/syjmYE2` (mobile clicks) |
| Labels / aria-labels | Unchanged |
| Surfaces | `why-choose-us-line`, `how-to-order-line`, `reviews-final-line`, `reviews-more-line` |
| Intent / source | Unchanged |
| No shared CTA component edit | **PASS** |
| No analytics utility edit | **PASS** |

```text
CTA_CONTRACT_PROTECTION: PASS
ANALYTICS_CONTRACT_PROTECTION: PASS
COMMERCE_CONTRACT_PROTECTION: PASS
```

---

## 17. Static Validation

| Command | Result |
|---|---|
| lint | **PASS** |
| typecheck | **PASS** |
| build | **PASS** |

```text
STATIC_VALIDATION: PASS
```

---

## 18. Risks and Warnings

| Risk | Level | Notes |
|---|---|---|
| Users on tablet may need to scroll to Header/Hero/S3 for generic CTA | Low | Hierarchy intentional; S4/S8/S10 remain |
| Flash of visible CTA before CSS | None observed | DCL @1440 already `display:none` |
| Independent V1 still recommended | Process | Focus / rhythm at 690 / 1280 / 1440 |

```text
CTA_FLASH_PROTECTION: PASS
```

---

## 19. Rollback Instructions

```bash
git checkout HEAD -- \
  sections/section-5-why-choose-us/section-5-why-choose-us.tsx \
  sections/section-6-how-to-order/section-6-how-to-order.tsx \
  sections/section-8-reviews/section-8-reviews.tsx
```

---

## 20. Final Status

```text
ZZ_04_STATUS:
PASS

MOBILE_SECTION_5_CTA:
UNCHANGED

MOBILE_SECTION_6_CTA:
UNCHANGED

MOBILE_SECTION_8_GENERIC_CTA:
UNCHANGED

SECTION_5_CTA_TABLET_DESKTOP:
HIDDEN

SECTION_6_CTA_TABLET_DESKTOP:
HIDDEN

SECTION_8_GENERIC_CTA_TABLET_DESKTOP:
HIDDEN

SECTION_8_CONTEXTUAL_CTA:
PRESERVED

CTA_FOCUS_PROTECTION:
PASS

CTA_FLASH_PROTECTION:
PASS

SECTION_5_TO_6_RHYTHM:
PASS

SECTION_6_TO_7_RHYTHM:
PASS

SECTION_8_TO_9_RHYTHM:
PASS

CONVERSION_HIERARCHY:
IMPROVED

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
3

CHANGE_SCOPE:
WITHIN_BUDGET

READY_FOR_SA_REVIEW:
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

## Appendix — Evidence

```text
screenshot/Desktop-screenshot/zz-04-cta-density/
  section-5-why-choose-us-{390,690,1280,1440}.png
  section-6-how-to-order-{390,690,1280,1440}.png
  section-8-reviews-{390,690,1280,1440}.png
  zz04-verify.json
```

**Next (SA):** Independent Verification (ZZ-04-V1) before checkpoint — focus, flash, rhythm at 690 / 1280 / 1440.
