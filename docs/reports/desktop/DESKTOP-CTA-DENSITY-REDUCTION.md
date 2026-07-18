# Desktop CTA Density Reduction — Limited Implementation

**Date:** 2026-07-19  
**Branch:** `ui/desktop-cta-density-reduction`  
**Base:** `main` @ `9c5a976`  
**Mode:** LIMITED_DESKTOP_ONLY · `min-[1280px]:hidden` · NO_MOBILE_CHANGE · NO_REDESIGN  
**Merge:** NO · **Deploy:** NO  

---

## 1. Executive Summary

Mid-page full-width LINE CTAs are **hidden on Desktop ≥1280px only** for Sections **2, 5, 6, and 7**, while **Section 10 Final CTA (ADR-006)** remains visible and dominant on all viewports.

| Goal | Result |
|---|---|
| Reduce Desktop CTA competition | **DONE** |
| Preserve Mobile 375/390/430 | **PASS** |
| Preserve Adaptive 690–1279 | **PASS** (verified at 1279) |
| Preserve S10 Final CTA | **PASS** |
| Analytics / LINE URL | **UNCHANGED** |

```text
READY_FOR_SA_VISUAL_REVIEW: YES
```

---

## 2. CTA Source Mapping

| ID | Section | Component | File | aria-label | Decision |
|---|---|---|---|---|---|
| **CTA_1** | Section 2 Trust | `SolidLineCTA` | `sections/section-2-trust-bar/section-2-trust-bar.tsx` | ปรึกษาผู้เชี่ยวชาญผ่าน LINE | **HIDE ≥1280** |
| **CTA_2** | Section 5 Why Choose Us | `FinalLineCTA` | `sections/section-5-why-choose-us/section-5-why-choose-us.tsx` | ปรึกษาผู้เชี่ยวชาญเกี่ยวกับสินค้า ผ่าน LINE | **HIDE ≥1280** |
| **CTA_3** | Section 6 How to Order | `FinalLineCTA` | `sections/section-6-how-to-order/section-6-how-to-order.tsx` | ปรึกษาหรือสั่งซื้อสินค้าผ่าน LINE | **HIDE ≥1280** |
| **CTA_4** | Section 7 Privacy/Shipping | `FinalLineCTA` + support pill | `sections/section-7-privacy-shipping/section-7-privacy-shipping.tsx` | ปรึกษาหรือสั่งซื้อสินค้าผ่าน LINE · support: ปรึกษาผ่าน LINE กับทีมงานแบบเป็นส่วนตัว | **HIDE ≥1280** (both CTAs) |
| **CTA_5** | Section 10 Final CTA | Primary CTA block | `sections/section-10-final-cta/section-10-final-cta.tsx` | ปรึกษาหรือสั่งซื้อผ่าน LINE กับทีมงานผู้เชี่ยวชาญ | **KEEP** |

```text
CTA_SOURCE_MAPPING: COMPLETE
FOURTH_CTA_OWNER: SECTION_7
```

---

## 3. Approved Hide/Keep Matrix

| Surface | Mobile/Adaptive | Desktop ≥1280 |
|---|---|---|
| Header LINE | keep | keep |
| Hero CTA | keep | keep |
| S2 Trust CTA | keep | **hidden** |
| S3 product CTA | keep | keep |
| S4 product cards | keep | keep |
| S5 Why CTA | keep | **hidden** |
| S6 How-to CTA | keep | **hidden** |
| S7 support pill | keep | **hidden** |
| S7 final CTA | keep | **hidden** |
| S7 “help” copy row | keep | keep (title/description) |
| S10 Final CTA | keep | **keep** |
| Footer LINE | keep | keep |

---

## 4. Files Changed

| File | Change |
|---|---|
| `sections/section-2-trust-bar/section-2-trust-bar.tsx` | CTA wrapper `min-[1280px]:hidden` |
| `sections/section-5-why-choose-us/section-5-why-choose-us.tsx` | CTA wrapper `min-[1280px]:hidden` |
| `sections/section-6-how-to-order/section-6-how-to-order.tsx` | CTA wrapper `min-[1280px]:hidden` |
| `sections/section-7-privacy-shipping/section-7-privacy-shipping.tsx` | Final CTA wrapper + support `<a>` `min-[1280px]:hidden` |
| `docs/reports/desktop/DESKTOP-CTA-DENSITY-REDUCTION.md` | This report |

No shared CTA primitive was modified globally.

---

## 5. Breakpoint Strategy

```text
Desktop Authority: min-width 1280px
Technique: Tailwind min-[1280px]:hidden on section-local wrappers
```

- Not `md:` / `lg:`  
- Not JS viewport detection  
- Source CTAs remain in DOM for Mobile (display:none only at ≥1280)  

---

## 6. Mobile Protection Evidence

| Width | S2 CTA | S5 CTA | S10 Final |
|---|---|---|---|
| 375 | visible | visible | visible |
| 390 | visible | visible | visible |
| 430 | visible | visible | visible |

Shot: `screenshot/Mobile-screenshot/desktop-cta-density/mobile-390-s2-cta-present.png`

---

## 7. Adaptive Protection Evidence

| Width | Mid-page CTAs S2/5/6/7 | S10 |
|---|---|---|
| **1279** | **visible** | visible |

Desktop rule does **not** apply below 1280.

---

## 8. Desktop Visual Results

| Width | S2/5/6/7 mid CTAs | S7 support pill | S10 Final | Header |
|---|---|---|---|---|
| 1280 | hidden | hidden | **visible** | present |
| 1366 | hidden | hidden | **visible** | present |
| 1440 | hidden | hidden | **visible** | present |
| 1536 | hidden | hidden | **visible** | present |
| 1920 | hidden | hidden | **visible** | present |

Shots @1280: `screenshot/Desktop-screenshot/desktop-cta-density/desktop-1280-s{2,5,6,7,10}.png`  
Audit: `cta-density-audit.json`

---

## 9. Analytics Protection

- No changes to `activateLineCta`, event names, or LINE URL  
- Hidden Desktop CTAs are non-interactive → no events  
- Mobile click paths unchanged  

```text
ANALYTICS_SCHEMA: UNCHANGED
LINE_URL: UNCHANGED
```

---

## 10. Static Validation

```text
npm run lint       → PASS
npm run typecheck  → PASS
npm run build      → PASS
```

---

## 11. Known Warnings

1. S7 support row on Desktop still shows help text without the pill button (intentional per SA).  
2. S8/S9 mid CTAs not in this scope (not requested as the fourth CTA owner).  
3. No merge/deploy in this PR.

---

## 12. Final Recommendation

**Approve SA Visual Review → merge** as Desktop-only density polish.

Desktop conversion spine after this change:

```text
Header CTA → Hero CTA → Product CTAs → Final CTA (S10)
```

---

## FINAL STATUS

```text
CTA_SOURCE_MAPPING: COMPLETE
SECTION_2_DESKTOP_CTA: HIDDEN
SECTION_5_DESKTOP_CTA: HIDDEN
SECTION_6_DESKTOP_CTA: HIDDEN
FOURTH_CTA_OWNER: SECTION_7
FOURTH_MIDPAGE_DESKTOP_CTA: HIDDEN
SECTION_10_FINAL_CTA: PRESERVED
MOBILE_375: PASS
MOBILE_390: PASS
MOBILE_430: PASS
ADAPTIVE_690_TO_1279: PASS
DESKTOP_1280: PASS
DESKTOP_1366: PASS
DESKTOP_1440: PASS
DESKTOP_1536: PASS
DESKTOP_1920: PASS
ANALYTICS_SCHEMA: UNCHANGED
LINE_URL: UNCHANGED
STATIC_VALIDATION: PASS
BROWSER_VALIDATION: PASS
READY_FOR_SA_VISUAL_REVIEW: YES
MERGE: NO
DEPLOY: NO
```

---

## STOP

**Wait for SA Visual Review.**
