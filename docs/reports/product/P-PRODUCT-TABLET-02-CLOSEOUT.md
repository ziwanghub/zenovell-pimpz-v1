# P-PRODUCT-TABLET-02 — Tablet Layout Authority Revision

**Task:** P-PRODUCT-TABLET-02  
**Date:** 2026-07-22  
**Mode:** Implementation (SA Architecture Revision)  
**Branch:** `feature/product-tablet-01` · PR #37  
**Authority:** `PRODUCT-DESKTOP-TABLET-LAYOUT-CONTRACT.md` **v1.2**  
**Evidence:** `docs/reports/product/evidence/p-product-tablet-02/`

---

## 1. Executive Summary

SA rejected the v1.1 **tablet-stack (768–899)** architecture after field evidence on iPad Mini / iPad Air. Stack composition was effectively **mobile ATF expanded** — gallery dominated portrait, price/CTA below the fold, right-side space unused.

**v1.2 ADR (approved):**

```text
390–767     Mobile (frozen)
768–1279    Desktop composition · reduced density · NO sticky
≥1280       Desktop + Sticky Buy (frozen)
```

Implemented on product route only. Automated W×H matrix: **ALL_PASS**.

```text
FINAL_VERDICT
TABLET_DESKTOP_LAYOUT_READY_FOR_SA_REVIEW

PR #37
HOLD — DO NOT MERGE (awaits SA field confirmation)

Product Freeze
NOT AUTHORIZED
```

---

## 2. Architecture Decision Record

| Item | Value |
|------|-------|
| ADR | Tablet Layout Authority Revision |
| Previous | `768–899` Stack · `900–1279` 2-col |
| Decision | **Rejected stack** — field UX failure |
| New | `768–1279` Desktop composition, no sticky, reduced density |
| Sticky | `≥1280` only (unchanged) |
| Status | **SA APPROVED · implemented** |

### Composition vs density

| Layer | Mobile | Tablet 768–1279 | Desktop ≥1280 |
|-------|--------|-----------------|---------------|
| Layout | Stack | **2-col L/R** | **2-col L/R** |
| Hierarchy | Mobile | **Desktop** | Desktop |
| CTA | Single | **Dual LINE** | Dual LINE |
| Trust | 4-col | **3-col** | 3-col |
| Gallery fit | cover | **contain** | contain |
| Sticky | no | **no** | **yes** |
| Density | mobile | **reduced** | full |

---

## 3. Files Changed

| File | Change |
|------|--------|
| `app/(platform)/products/[slug]/page.tsx` | ATF 2-col from **768** (43/57 → 46/54); sticky still ≥1280 |
| `components/platform/product-gallery.tsx` | Desktop-structure square stage from 768; reduced max-h; contain |
| `components/platform/product-hero.tsx` | Dual CTA + 3-trust + intermediate type from **768** |
| `components/platform/product-reviews.tsx` | 2-up grid from 768 |
| `components/platform/product-faq.tsx` | 2-col accordion from 768 |
| `components/platform/product-bundle.tsx` | 2-col tablet band from 768 |
| `docs/reports/product/PRODUCT-DESKTOP-TABLET-LAYOUT-CONTRACT.md` | **v1.2** ADR supersedes stack |
| Evidence + this closeout | `p-product-tablet-02/` |

**Unchanged:** Homepage, Header, Footer, Analytics, Bundle pairing authority, Metadata, JSON-LD, Routes, Information, Knowledge, Mobile `<768`.

---

## 4. Browser Verification (W×H)

| Viewport | Band | 2-col | Sticky | Dual CTA | Fit | Title+CTA ATF | Result |
|----------|------|:-----:|:------:|:--------:|:---:|:-------------:|:------:|
| **768×1024** | tablet | yes | no | 2 | contain | yes | **PASS** |
| **820×1180** | tablet | yes | no | 2 | contain | yes | **PASS** |
| 900×1200 | tablet | yes | no | 2 | contain | yes | **PASS** |
| 1024×1366 | tablet | yes | no | 2 | contain | yes | **PASS** |
| 1112×834 | tablet | yes | no | 2 | contain | yes | **PASS** |
| 1180×820 | tablet | yes | no | 2 | contain | yes | **PASS** |
| 1279×900 | tablet | yes | no | 2 | contain | yes | **PASS** |
| 390×844 | mobile | no | no | 1 | cover | yes | **PASS** |
| 430×932 | mobile | no | no | 1 | cover | yes | **PASS** |
| 1280×800 | desktop | yes | **yes** | 2 | contain | yes | **PASS** |
| 1440×900 | desktop | yes | yes | 2 | contain | yes | **PASS** |
| 1920×1080 | desktop | yes | yes | 2 | contain | yes | **PASS** |
| Homepage 390 / 1280 | — | — | — | — | — | — | **PASS** |

Primary geometry after fix:

| Device | Gallery | Buy |
|--------|---------|-----|
| 768×1024 | ~294×294 @ x33 (left) | buy @ x344 (right) |
| 820×1180 | ~333×333 @ x37 | buy @ x391 |

---

## 5. Quality Gates

| Gate | Result |
|------|--------|
| Lint | **PASS** |
| Typecheck | **PASS** |
| Build | **PASS** |

---

## 6. Relationship to prior phases

| Phase | Status |
|-------|--------|
| 01 implementation | Superseded for stack band |
| 01B automated pass | Rejected by field |
| 01D stack gallery fix | Superseded by **composition** change (01D still historically valid as interim) |
| 01E under old contract | **Do not run** — wrong authority |
| **02 ADR** | **This phase** |

---

## 7. Remaining Warnings

| Warning | Disposition |
|---------|-------------|
| Dual BTF trees | Accepted (useId) |
| Multi-angle assets interim | Asset audit |
| Real-device Safari chrome | SA field confirm recommended |
| ZZ polish | Post-launch |

---

## 8. PR / Merge Status

```text
PR #37 — HOLD
Do not merge without SA field confirmation of 768×1024 and 820×1180.

Next suggested:
  SA review screenshots in evidence/p-product-tablet-02/
  Optional: independent field re-verify on real iPad
  Then: Merge Closeout when SA authorizes
```

---

## Final Verdict

# **TABLET_DESKTOP_LAYOUT_READY_FOR_SA_REVIEW**
