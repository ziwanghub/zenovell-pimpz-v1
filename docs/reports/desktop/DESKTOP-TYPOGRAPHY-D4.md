# Desktop Polish — Phase D4  
## Typography Polish

**Date:** 2026-07-19  
**Branch:** `ui/desktop-typography-d4`  
**Base:** `main` @ post-D3 merge (`e959ae1` / PR #26)  
**Mode:** `DESKTOP_ONLY` · `NO REDESIGN` · Quality over size  
**Breakpoint authority:** `min-[1280px]` only  
**Merge:** NO · **Deploy:** NO · **Await:** SA Visual Review  

---

## 1. Executive Summary

D4 refines **Desktop reading quality** without changing visual identity:

| Goal | Result |
|---|---|
| Line-height polish (body / description) | **DONE** — primary intros **1.65** |
| Heading rhythm (badge → title → desc) | **DONE** — open spacing + slight tracking |
| Paragraph / multi-line spacing | **DONE** — `mt` / `space-y` desktop bumps |
| Muted / secondary / helper hierarchy | **DONE** — opacity tuning only |
| No font family / global size system change | **DONE** |
| Hero / CTA / Product Card typography | **UNTOUCHED** |
| Mobile / Adaptive | **UNTOUCHED** |

```text
TYPOGRAPHY_SCOPE: PASS
READY_FOR_SA_VISUAL_REVIEW: YES
MERGE: NO
DEPLOY: NO
```

**Depends on:** D3 reading measure (640 / 560 / 420–480) already on `main`.

---

## 2. Typography Audit

### 2.1 Pre-D4 issues (Desktop)

| Area | Observation |
|---|---|
| Body intros | Many already `leading-[1.6]` post-D3, but hierarchy spacing (title→desc) still tight (`mt-2`–`mt-3`) |
| Multi-line bodies (FAQ, reviews, privacy) | `space-y-1` / `1.5` felt dense at wide measure |
| Headlines | `leading-[1.14–1.18]` + `tracking-[-0.01em]` slightly cramped at 34px |
| Helper / muted | Inconsistent opacities (`/42`, `/45`, `/55`, `/60`, `/70`) |
| S2 description | D3 measure only — still `leading-[1.5]` at Desktop |

### 2.2 Design rules applied (Desktop ≥1280)

| Role | Desktop treatment |
|---|---|
| Section H2 | `leading-[1.2]` · `tracking-[-0.015em]` |
| Primary description | `leading-[1.65]` · `mt-3.5` from title |
| Secondary body (reviews, support, steps) | `leading-[1.6–1.65]` · slightly more title→body gap |
| Multi-paragraph blocks | `space-y-1.5` → `space-y-2` (FAQ answers, privacy lines) |
| Helper / disclaimer | `leading-[1.5–1.55]` · muted opacity ~`/48–/55` |
| Secondary text | ~`/70–/78` (no theme / hue change) |

---

## 3. Line-height Changes

| Surface | Mobile (unchanged) | Desktop ≥1280 |
|---|---|---|
| Shared `SectionHeader` description | `1.5` @14px → 21px | **1.65** @15px → **24.75px** |
| S2 description | `1.5` → 21px | **1.65** → **23.1px** |
| S3 product tagline | `1.5` | **1.65** |
| S5 / S6 feature & step copy | `1.55–1.58` | **1.65** |
| S7 privacy / support | `1.45–1.52` | **1.6–1.65** |
| S8 review body | `leading-5` (20px) | **1.65** (~21.45px) |
| S9 FAQ answers | `1.55` | **1.65** + `space-y-2` |
| S10 description | `1.5` | **1.65** |
| S10 reassurance | `1.4–1.45` | **1.6** |
| Footer intro | `1.45` | **1.65** |
| Helper / legal / security | various | **1.45–1.55** |

Measured evidence (`typography-audit.json` on dev `:3001`):

| Viewport | S4/S5/S10 intro `lh` | S2 intro `lh` | Overflow |
|---|---|---|---|
| 390 | 21px | 21px | false |
| 1279 | 21px | 21px | false |
| **1280+** | **24.75px** | **23.1px** | false |

---

## 4. Hierarchy Review

### 4.1 Heading → description rhythm

| Section | Desktop change |
|---|---|
| `SectionHeader` | H2 leading **1.2** + tracking **-0.015em**; desc **mt-3.5** |
| S2 | H2 leading/tracking polish; desc wrap **mt-3.5** |
| S5 | H2 **mt-4**, leading **1.2**; subtitle **mt-3.5** / **1.65** |
| S10 | H2 leading **1.2**; line-gap **mt-1.5**; desc **mt-3.5** / **1.65** |
| Footer H2 | leading **1.2** + tracking; desc **mt-3.5** / **1.65** |
| S3 | Superline → name → tagline gaps opened; tagline **1.65** secondary `/78` |

### 4.2 Text color hierarchy (opacity only)

| Tier | Desktop target | Examples |
|---|---|---|
| Secondary | `/70–/78` | S3 tagline, S10 reassurance, S2 trust label |
| Muted helper | `/48–/62` | S4 footer note, S4 trust sub, S8 disclaimer, legal |
| Security / fine print | `/52–/55` | Footer legal rights, security desc |

No brand magenta / background theme changes.

### 4.3 Explicitly not changed

| Surface | Reason |
|---|---|
| Hero (`sections/hero`) | Authority — out of scope |
| CTA labels / sizes | NO CTA CHANGE |
| Product card title / price / SKU copy (S4 cards) | NO CARD / product card typography |
| Font family | Identity lock |
| Global type scale | Quality ≠ size bump |

S3 product **name** size tokens left as pre-existing Desktop values; only surrounding rhythm / tagline quality adjusted.

---

## 5. Mobile Protection

| Check | Result |
|---|---|
| All D4 tokens gated `min-[1280px]:` | **PASS** |
| 375–430: intro lh remains pre-desktop (e.g. 21px @14px) | **PASS** |
| Overflow mobile | **PASS** |
| Hero mobile metrics unchanged | **PASS** |

---

## 6. Adaptive Protection

| Viewport | D4 line-height active? | Overflow |
|---|---|---|
| 690–1024 | No (mobile-class metrics) | false |
| **1279** | **No** (edge) | false |

Desktop polish starts strictly at **1280**.

---

## 7. Desktop Validation

| Viewport | Intro lh improved | Hierarchy spacing | Overflow |
|---|---|---|---|
| 1280 | PASS | PASS | false |
| 1366 / 1440 | PASS | PASS | false |
| 1536 / 1920 | PASS | PASS | false |

Screenshots:

```text
screenshot/Desktop-screenshot/desktop-typography-d4/
  m390-*.png  e1279-*.png  d1280-*.png  d1440-*.png  d1920-*.png
  typography-audit.json
```

---

## 8. Static Validation

| Check | Result |
|---|---|
| `npm run lint` | **PASS** |
| `npm run build` | **PASS** |
| Diff scope 11 files (shared header + S2–S11) | **PASS** |
| No analytics / CTA / image / grid structure edits | **PASS** |

---

## 9. Recommendation

| Item | Action |
|---|---|
| SA visual review | Focus 1280 / 1440 / 1920 — body air + hierarchy, not size |
| Compare 390 vs 1280 | Confirm mobile identical |
| Merge D4 | After SA PASS; stack after D3 (already on main) |
| Open D1 / D2 | Still independent; preferred full stack D1→D2→D3→D4 |
| Next | **D5 Image Balance** then **D6 Consistency Audit** → Desktop Authority Freeze |

```text
NEXT: SA Review → D5 Image Balance
```

---

## FINAL STATUS

```text
TYPOGRAPHY_SCOPE: PASS
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
