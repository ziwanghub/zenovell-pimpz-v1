# Phase B2.1 — Section 5 Limited Implementation

**Date:** 2026-07-18  
**Branch:** `phase-b2-1/section-5-limited-implementation`  
**Base:** `main` @ `5bd7429`  
**Mode:** LOCKED_SCOPE · NO_REDESIGN · EVIDENCE_FIRST  
**Freeze:** **NOT** performed — awaiting SA visual review  

---

## 1. Executive summary

Implemented only SA-approved Section 5 findings (P0–P2). Design language, CTA architecture, LINE contracts, analytics, and adjacent frozen sections were preserved.

| Finding | Priority | Result |
|---|---|---|
| B2.1-F01 Remove false chevrons | P0 | **DONE** |
| B2.1-F03 Correct “เห็นผลจริง” icon | P1 | **DONE** (Sparkles) |
| B2.1-F04 Body readability | P1 | **DONE** (12 / 12.5px, leading 1.58, white/72) |
| B2.1-F02 / F09 Reduce duplication | P2 | **DONE** (shortened benefits + promo reframe) |
| B2.1-F05 Density | P2 | **DONE** (tighter gaps; section H 390: **991** vs audit **1063**) |

```text
SECTION_5_IMPLEMENTATION: COMPLETE
SECTION_5_BROWSER: PASS
SECTION_5_REGRESSION: PASS
SECTION_4: UNCHANGED
SECTION_6: UNCHANGED
CTA: UNCHANGED
ANALYTICS: UNCHANGED
READY_FOR_SA_VISUAL_REVIEW: YES
```

---

## 2. Files changed

| File | Change |
|---|---|
| `sections/section-5-why-choose-us/section-5-why-choose-us.tsx` | Chevrons removed; Sparkles mapping; body type; spacing density |
| `content/section-5-why-choose-us.ts` | Benefit descriptions shortened; promo reframe (why-us journey) |
| `docs/reports/phase-b2/PHASE-B2-1-SECTION-5-IMPLEMENTATION.md` | This report |

**Not changed:** Section 4, Section 6, Header, Drawer, Footer, shared UI components, analytics modules, CTA activation API, dependencies, routes, product data.

---

## 3. Findings implemented

### P0 — B2.1-F01 False chevrons
- Removed `ChevronRight` from benefit rows.
- Grid now `grid-cols-[72px_minmax(0,1fr)]` (no trailing chevron column).
- CTA retains its own chevron (real interactive control).

### P1 — B2.1-F03 Icon mismatch
- Removed `LineChart` special-case override for `sparkles`.
- Local map uses Lucide `Sparkles` for “เห็นผลจริง จากประสบการณ์ผู้ใช้”.

### P1 — B2.1-F04 Body readability
- Body: `text-[12px]` / `min-[390px]:text-[12.5px]` (was 11 / 11.5).
- `leading-[1.58]`, `text-white/72`, slightly reduced title→body gap (`mt-1`).
- Headings **not** enlarged.

### P2 — B2.1-F02 / F09 Duplication
- Benefit descriptions shortened; privacy/shipping wording less package-detail heavy.
- Promo reframed from “คุณภาพ / มาตรฐาน / ความเป็นส่วนตัว” → journey framing:  
  **เราอยู่ข้างคุณทุกขั้นตอน / จากคำปรึกษาถึงผลลัพธ์**.
- Titles of five benefits retained (same meaning).
- Trust-row labels retained (ACCEPT residual from audit).

### P2 — B2.1-F05 Density
- Header/section padding reduced slightly.
- Card gap `space-y-2.5`, card `py-3.5`, promo/CTA/trust vertical spacing tightened.
- Cards retained (5); layout not redesigned.

---

## 4. Before / after (measured)

| Metric @390 | Before (audit) | After |
|---|---:|---:|
| Section height | ~1063px | **991px** (−72) |
| Benefit chevrons | 5 | **0** |
| Body font | 11.5px | **12.5px** |
| Card height | ~106–116 | **~102** |
| Final CTA height | 58 | **58** |
| LINE href | lin.ee/syjmYE2 | **same** |
| Surface | `why-choose-us-line` | **same** |
| S4 outline card CTAs | 6 × 44px | **6 × 44px** |

---

## 5. Regression check

| Surface | Result |
|---|---|
| Section 4 source / outline CTAs / 44px | **UNCHANGED** |
| Section 6 heading present | **UNCHANGED** |
| S5 final LINE CTA label / solid pink / 58px | **UNCHANGED** |
| `activateLineCta` surface `why-choose-us-line` | **UNCHANGED** |
| `LINE_OA_URL` | **UNCHANGED** |
| Header / Drawer / Footer | **UNTOUCHED** |
| Horizontal overflow 375/390/430/1280 | **none** |
| Critical product console errors | **none** (375 had non-blocking 404 resource noise) |

---

## 6. Browser matrix

| Viewport | Section H | Cards | Chevrons | Body | CTA | Overflow | S4 outline |
|---|---:|---:|---:|---|---:|---|---:|
| 375 | 988 | 5 | 0 | 12px | 58 | no | 6 |
| 390 | 991 | 5 | 0 | 12.5px | 58 | no | 6 |
| 430 | 991 | 5 | 0 | 12.5px | 58 | no | 6 |
| 1280 | 785 | 5 | 0 | 12.5px | 58 | no | 6 |

Runtime: local production `next start` after `npm run build` (implementation branch).

---

## 7. Static validation

| Check | Result |
|---|---|
| `npm run lint` | **PASS** |
| `npm run typecheck` | **PASS** |
| `npm run build` | **PASS** |
| Diff scope | Section 5 component + content + this report only |

---

## 8. Known risks / residuals

- Trust row still echoes ปลอดภัย / ข้อมูลลับ / จัดส่งปกปิด (accepted residual; not expanded).
- Benefit themes still touch safety/privacy/shipping at title level by design (why-us pillars); body shortened only.
- Desktop CTA remains full content width (F10 deferred to Desktop Phase).
- Do **not** freeze Section 5 until SA visual PASS.

---

## 9. Evidence

Directory (monorepo, external to Active git root):

`screenshot/Mobile-screenshot/phase-b2-1-implementation/`

| # | File | Purpose |
|---|---|---|
| 1 | `s5-full-390.png` / `01-section5-full-390.png` | Section 5 full @390 |
| 2 | `s5-closeup-390.png` / `02-section5-closeup-390.png` | Close-up (heading + first cards, Sparkles, no chevrons) |
| 3 | `s5-to-s6-390.png` / `03-transition-s5-to-s6-390.png` | Transition S5 → S6 |
| 4 | `s5-desktop-1280.png` / `04-section5-desktop-1280.png` | Desktop safety 1280 |
| — | `impl-metrics.json` | Measurement dump |

---

## 10. Final decision

```text
SECTION_5_IMPLEMENTATION: COMPLETE
SECTION_5_BROWSER: PASS
SECTION_5_REGRESSION: PASS
SECTION_4: UNCHANGED
SECTION_6: UNCHANGED
CTA: UNCHANGED
ANALYTICS: UNCHANGED
READY_FOR_SA_VISUAL_REVIEW: YES
SECTION_5_FREEZE: NOT_YET
NEXT: SA visual review → PASS freeze / MINOR FIX / FAIL
```

**STOP** — no Section 5 freeze; no Phase B2.2 until SA decides.
