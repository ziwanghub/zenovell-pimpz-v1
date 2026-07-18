# Desktop Polish — Phase D3  
## Reading Width & Content Measure Optimization

**Date:** 2026-07-19  
**Branch:** `ui/desktop-reading-width-d3`  
**Base:** `main` @ `9c5a976` (post PR #22)  
**Mode:** `DESKTOP_ONLY` · `NO REDESIGN` · `NO MOBILE CHANGE` · `NO TABLET CHANGE`  
**Breakpoint authority:** `min-[1280px]` only  
**Merge:** NO · **Deploy:** NO · **Await:** SA Visual Review  

---

## 1. Executive Summary

D3 tightens **local reading measure** on Desktop (≥1280px) so body/description copy no longer stretches edge-to-edge of the content shell.

| Goal | Result |
|---|---|
| Prefer local `max-width` on paragraphs / descriptions | **DONE** |
| Do **not** widen page / section containers | **DONE** |
| Do **not** change grids, cards, images, CTAs | **DONE** |
| Do **not** change Mobile / Adaptive | **DONE** |
| Comfortable ~60–75ch desktop measure | **DONE** (primary intros **640px**) |
| Hero untouched | **DONE** (pre-existing hero measure kept) |

**Strategy:** reduce over-wide description measure (was often **760px** or unconstrained full content width) to a tighter primary measure of **640px**, with supporting copy at **420–560px**. All constraints gated with `min-[1280px]:`.

```text
READING_SCOPE: PASS
READY_FOR_SA_VISUAL_REVIEW: YES
MERGE: NO
DEPLOY: NO
```

---

## 2. Reading Width Audit

### 2.1 Problem (pre-D3)

At 1280–1920px, many centered intros still read as “mobile stretched”:

| Surface | Pre-D3 desktop measure |
|---|---|
| Shared `SectionHeader` description | `max-w-[760px]` |
| S5 / S10 / Footer intro copy | `max-w-[760px]` |
| S2 description | **no max-width** (full content width ≈ 1151px @ 1279 edge, full shell @ ≥1280) |
| S3 product tagline | `max-w-[460px]` (slightly wide for product col) |
| Supporting notes (S4 footer note, S7 notes, S8 disclaimer, S9 answers) | unconstrained or wide |

Cards/grids were already balanced — **out of scope**.

### 2.2 Target measure (post-D3)

| Role | Desktop `max-width` | Rationale |
|---|---|---|
| Primary section intro / description | **640px** | ~65–70ch at 15px; comfortable scan |
| Heading wrap (S2 only) | **720px** | slightly wider than body; not full shell |
| Trust / strip / short notes | **560px** | secondary measure |
| Compact support / privacy notes | **420–480px** | dense supporting copy |
| S3 product tagline | **420px** | product-column reading line |
| FAQ answer body | **560px** (via parent) | long-form answer comfort |

### 2.3 Scope discipline

| Allowed | Not allowed |
|---|---|
| Local `min-[1280px]:max-w-[…]` | Page / container widen |
| `min-[1280px]:mx-auto` for centering | Grid / card / image changes |
| Measure on paragraphs & description blocks | Heading size / font family / weight |
| | CTA density / analytics (D1 separate) |
| | Spacing rhythm (D2 separate) |
| | Mobile / Adaptive / md / lg tokens |

---

## 3. Sections Updated

| Section | What changed | Mechanism |
|---|---|---|
| **Shared SectionHeader** (S4, S6, S7, S8, S9 intros) | description `760 → 640` | `components/ui/section-header.tsx` |
| **S2 Trust** | description `640`; trust highlight `560`; heading wrap `760 → 720` | local classes |
| **S3 Hero product** | tagline `460 → 420` | local class |
| **S4 Catalog** | footer note + `max-w-[560px]` + center | local class |
| **S5 Why choose** | subtitle `760 → 640` | local class |
| **S6 How to order** | intro via **SectionHeader** only | no card/step layout change |
| **S7 Privacy** | privacy note `420`; support row `480` | local classes |
| **S8 Reviews** | intro via SectionHeader; disclaimer `640` centered | local class |
| **S9 FAQ** | intro via SectionHeader; answers parent `560`; support desc `420` | local classes |
| **S10 Final CTA** | description `760 → 640`; reassurance + `640` | local classes |
| **Footer (S11)** | company description `760 → 640` | local class |
| **Hero (S1)** | **untouched** | pre-existing `440/480` measure kept |

**Files changed (10):**

```text
components/ui/section-header.tsx
sections/section-2-trust-bar/section-2-trust-bar.tsx
sections/section-3-hero-product/section-3-hero-product.tsx
sections/section-4-product-catalog/section-4-product-catalog.tsx
sections/section-5-why-choose-us/section-5-why-choose-us.tsx
sections/section-7-privacy-shipping/section-7-privacy-shipping.tsx
sections/section-8-reviews/section-8-reviews.tsx
sections/section-9-faq/section-9-faq.tsx
sections/section-10-final-cta/section-10-final-cta.tsx
sections/section-11-footer/section-11-footer.tsx
```

---

## 4. Before / After Measurements

Runtime evidence:  
`screenshot/Desktop-screenshot/desktop-reading-width-d3/reading-width-audit.json`  
(local prod `next start` on port **3002**, Chrome headless).

### 4.1 Primary intro description width (px)

| Viewport | S2 / S4–S10 intro (typical) | Constraint active? |
|---|---|---|
| 390 | **358** (content − padding) | No (`maxW: none`) |
| 768 | **672** | No |
| 1024 | **896** | No |
| **1279** | **1151** | **No** (edge before Desktop) |
| **1280** | **640** | **Yes** (`640px`) |
| **1440** | **640** | Yes |
| **1920** | **640** | Yes |

Pre-D3 Desktop primary intros that already used `max-w-[760px]` would have rendered **760px** at ≥1280. D3 reduces those to **640px** (−120px / ~16%). Surfaces without a prior max-width (e.g. S2 description) drop from full content shell to **640px**.

### 4.2 Supporting measures (Desktop ≥1280)

| Element | Measured width | CSS max-width |
|---|---|---|
| S2 trust highlight | 560 | `560px` |
| S3 product tagline | 420 | `420px` |
| S4 footer note | 560 | `560px` |
| S7 support copy | 480 | `480px` |
| S8 disclaimer | 640 | `640px` |
| S9 FAQ answers | 560 | parent `560px` |
| S10 reassurance | 640 | `640px` |
| Hero subheadline | 440 @1280 / 480 @≥1366 | **unchanged** (Hero lock) |

### 4.3 Before / After (conceptual Desktop 1440+)

| Surface | Before | After |
|---|---|---|
| SectionHeader description | 760px | **640px** |
| S5 / S10 / Footer intro | 760px | **640px** |
| S2 description | ~full shell | **640px** |
| S3 tagline | 460px | **420px** |
| Page shell / grids | — | **unchanged** |

---

## 5. Mobile Protection

| Check | Result |
|---|---|
| All D3 classes use `min-[1280px]:` only | **PASS** |
| 375 / 390 / 430: no `withMaxW` constraints from D3 | **PASS** (0 constrained intros) |
| Overflow at mobile | **PASS** (`scrollW === clientW`) |
| Card / step / image layout | **unchanged** |

Mobile intro widths remain content-padding width (e.g. **358px** @ 390).

---

## 6. Adaptive Protection

| Viewport | Intro maxW | Constrained count | Overflow |
|---|---|---|---|
| 690 | none | 0 | false |
| 768 | none | 0 | false |
| 820 | none | 0 | false |
| 1024 | none | 0 | false |
| **1279** | none | **0** | false |

Desktop tokens must **not** activate below 1280. Edge **1279** confirmed unconstrained (intro ≈ **1151px** full shell minus padding).

---

## 7. Desktop Validation

| Viewport | Intro measure | Overflow | Notes |
|---|---|---|---|
| 1280 | 640 | false | Desktop gate first true |
| 1366 | 640 | false | Stable |
| 1440 | 640 | false | Stable |
| 1536 | 640 | false | Stable |
| 1920 | 640 | false | Stable; no page widen |

Screenshots (repo monorepo path):

```text
screenshot/Desktop-screenshot/desktop-reading-width-d3/
  m390-*.png
  e1279-*.png
  d1280-*.png
  d1440-*.png
  d1920-*.png
  reading-width-audit.json
```

Section spot-checks: S2, S5, S8, S10 tops at key widths.

---

## 8. Static Validation

| Check | Result |
|---|---|
| `npm run lint` | **PASS** |
| TypeScript (`next build` / tsc) | **PASS** |
| `npm run build` | **PASS** |
| Horizontal overflow 375–1920 | **PASS** |
| No CTA / analytics edits in this branch | **PASS** |
| No grid / card / image structural edits | **PASS** |

---

## 9. Known Warnings

1. **D1 not merged** — mid-page LINE CTAs (S2/S5/S6/S7) still visible on Desktop in this branch base. D3 intentionally does not hide them.  
2. **D2 not merged** — vertical rhythm tokens from D2 may be absent on this branch; D3 does not re-apply spacing.  
3. **Footer brand description** is short (`เราพร้อมดูแลคุณ`) — `max-w-[640px]` is applied but visual effect is minimal until copy length grows.  
4. **S3 tagline** is left-aligned in product column (no `mx-auto`); measure is column-local, which is correct.  
5. **FAQ answer width** uses parent `max-w-[560px]`; computed style on child `p` may report `maxW: none` while rendered width is 560.  
6. **Hero** intentionally out of scope; existing desktop measure retained.  
7. Screenshots live under monorepo `screenshot/` (outside Active app tree) — not committed with this PR unless SA requests.

---

## 10. Recommendation

| Item | Recommendation |
|---|---|
| SA visual review | **YES** — focus 1280 / 1440 / 1920 reading measure on S2, S5, S8–S10 intros |
| Merge D3 alone | Safe standalone (independent of D1/D2) after SA PASS |
| Preferred merge order | D1 → D2 → **D3** (stack polish layers) then D4 Typography |
| D4 next | Typography polish only — do **not** re-open measure unless SA rejects 640 |
| Production / Ads | Still **NO-GO** until full Desktop program + SA Production gate |

```text
NEXT: SA Review → (optional stack merge D1/D2/D3) → D4 Typography Polish
```

---

## FINAL STATUS

```text
READING_SCOPE: PASS
SECTION_2: PASS
SECTION_3: PASS
SECTION_4: PASS
SECTION_5: PASS
SECTION_6: PASS
SECTION_7: PASS
SECTION_8: PASS
SECTION_9: PASS
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
