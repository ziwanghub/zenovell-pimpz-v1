# Phase B2.2 — Section 6 Limited Implementation

**Date:** 2026-07-18  
**Branch:** `phase-b2-2/section-6-limited-implementation`  
**Base:** `main` @ `e971ecb`  
**Mode:** LOCKED_SCOPE · NO_REDESIGN · EVIDENCE_FIRST  
**Freeze:** **NOT** performed — awaiting SA visual review  

---

## 1. Executive summary

Implemented only SA-approved Section 6 findings (P0–P1). Timeline remains **six steps**. Design language, CTA architecture, analytics surface, and LINE contracts were preserved. Sections 4, 5, and 7 were not modified.

| Finding | Priority | Result |
|---|---|---|
| B2.2-F01 Body readability | P0 | **DONE** — 12 / 12.5px · leading 1.55 · white/72 |
| B2.2-F03 Promo trust duplication | P1 | **DONE** — ordering-confidence promo |
| B2.2-F04 Step 5 / 6 clarity | P1 | **DONE** — delivery process vs receive confidently |
| B2.2-F06 Subtitle how-to | P1 | **DONE** — process-oriented subtitle |
| B2.2-F07 Step 2 icon | P1 | **DONE** — Headphones (distinct from step 1 chat) |

```text
SECTION_6_IMPLEMENTATION: COMPLETE
SECTION_6_BROWSER: PASS
SECTION_6_REGRESSION: PASS
SECTION_4: UNCHANGED
SECTION_5: UNCHANGED
SECTION_7: UNCHANGED
CTA: UNCHANGED
ANALYTICS: UNCHANGED
READY_FOR_SA_VISUAL_REVIEW: YES
```

---

## 2. Files changed

| File | Change |
|---|---|
| `sections/section-6-how-to-order/section-6-how-to-order.tsx` | Body type; step icon map (`headphones`); promo icon MessageCircleMore |
| `content/section-6-how-to-order.ts` | Subtitle, steps 5–6, promo copy; icon type `headphones` |
| `docs/reports/phase-b2/PHASE-B2-2-SECTION-6-IMPLEMENTATION.md` | This report |

**Not changed:** Section 4/5/7, Header/Drawer/Footer, shared components (except local imports already used), analytics modules, dependencies, routes.

---

## 3. Findings implemented

### P0 — B2.2-F01 Body readability
- Body: `text-[12px]` / `min-[390px]:text-[12.5px]`
- `leading-[1.55]`, `text-white/72`
- Card `min-h-[96px]` retained — measured card heights remain **96** uniform on mobile

### P1 — B2.2-F03 Promo messaging
- Before: มั่นใจในความปลอดภัย / และความเป็นส่วนตัว  
- After: **สั่งง่ายผ่าน LINE** / **ทีมงานช่วยทุกขั้นตอน** / เริ่มจากปุ่มเดียว จนจบการสั่งซื้อ  
- Promo leading icon: `MessageCircleMore` (order path) instead of `ShieldCheck`

### P1 — B2.2-F04 Steps 5 & 6
| Step | Before | After |
|---|---|---|
| 5 | จัดส่งแบบปกปิด · แพ็กเกจปกปิด… | **ดำเนินการจัดส่ง** · หลังยืนยันออเดอร์ ทีมงานจัดส่งตามขั้นตอนที่ตกลง |
| 6 | รับสินค้าอย่างมั่นใจ · …รวดเร็วและปลอดภัย | **รับสินค้าอย่างมั่นใจ** · สินค้าถึงมือคุณตามรอบจัดส่งที่แจ้งไว้ |

Six steps retained; not merged.

### P1 — B2.2-F06 Subtitle
- Before: ไม่ยุ่งยาก ส่งไว ปลอดภัย 100%  
- After: **ทำตาม 6 ขั้นตอนง่าย ๆ ตั้งแต่กดปุ่มจนถึงรับสินค้า**

### P1 — B2.2-F07 Step 2 icon
- Step 1 remains chat (`MessageCircleMore` / `line-message`)
- Step 2 uses **`Headphones`** via local map key `headphones`

---

## 4. Before / after (measured @390)

| Metric | Before (audit) | After |
|---|---:|---:|
| Step body font | 11px | **12.5px** |
| Card height | 96 | **96** (all six) |
| Step count | 6 | **6** |
| Section height | ~1045 | **1045** (no significant growth) |
| CTA height | 56 | **56** |
| LINE href | lin.ee/syjmYE2 | **same** |
| Surface | `how-to-order-line` | **same** |
| S4 outline CTAs | 6 | **6** |
| S5 chevrons | 0 | **0** |

---

## 5. Browser matrix

| Viewport | Section H | Steps | Body | Cards | CTA | Overflow | S4 outline | S5 ok | S7 present |
|---|---:|---:|---|---|---:|---|---:|---|---|
| 375 | 1045 | 6 | 12px | 96×6 | 56 | no | 6 | yes | yes |
| 390 | 1045 | 6 | 12.5px | 96×6 | 56 | no | 6 | yes | yes |
| 430 | 1045 | 6 | 12.5px | 96×6 | 56 | no | 6 | yes | yes |
| 1280 | 811 | 6 | 12.5px | 128×6 | 56 | no | 6 | yes | yes |

Runtime: local `next start` after `npm run build` on implementation branch.

Non-blocking: one 404 resource console noise @375 (same class as prior phases).

---

## 6. Static validation

| Check | Result |
|---|---|
| `npm run lint` | **PASS** |
| `npm run typecheck` | **PASS** |
| `npm run build` | **PASS** |
| Diff scope | Section 6 component + content + this report |

---

## 7. Regression check

| Surface | Result |
|---|---|
| Section 4 outline CTAs / frozen catalog | **UNCHANGED** |
| Section 5 chevrons=0 / B2.1 promo fingerprint | **UNCHANGED** |
| Section 7 heading present | **UNCHANGED** |
| S6 final CTA label / solid / 56px | **UNCHANGED** |
| `activateLineCta` surface `how-to-order-line` | **UNCHANGED** |
| `LINE_OA_URL` | **UNCHANGED** |
| Timeline step count | **6 retained** |
| Header / Drawer / Footer | **UNTOUCHED** |

---

## 8. Known risks / residuals

- Trust row still lists ปลอดภัย / ข้อมูลลับ / จัดส่งปกปิด (not in authorized polish set; left as ACCEPT residual).  
- Desktop CTA full width remains (deferred Desktop Phase).  
- Do **not** freeze Section 6 until SA visual PASS.

---

## 9. Evidence

Directory: `screenshot/Mobile-screenshot/phase-b2-2-implementation/`

| # | File | Purpose |
|---|---|---|
| 1 | `s6-full-390.png` / `01-…` | Section 6 full @390 |
| 2 | `s6-timeline-390.png` / `02-…` | Timeline close-up (steps 1–4 + headphones icon) |
| 3 | `s6-steps-5-6-390.png` / `03-…` | Steps 5–6 clarified |
| 4 | `s6-cta-390.png` / `04-…` | Promo + CTA close-up |
| 5 | `s6-to-s7-390.png` / `05-…` | Transition S6 → S7 |
| 6 | `s6-desktop-1280.png` / `06-…` | Desktop safety |
| — | `impl-metrics.json` | Measurement dump |

---

## 10. Final decision

```text
SECTION_6_IMPLEMENTATION: COMPLETE
SECTION_6_BROWSER: PASS
SECTION_6_REGRESSION: PASS
SECTION_4: UNCHANGED
SECTION_5: UNCHANGED
SECTION_7: UNCHANGED
CTA: UNCHANGED
ANALYTICS: UNCHANGED
READY_FOR_SA_VISUAL_REVIEW: YES
SECTION_6_FREEZE: NOT_YET
NEXT: SA visual review → PASS freeze / MINOR FIX / FAIL
```

**STOP** — no Section 6 freeze; no Phase B2.3 until SA decides.
