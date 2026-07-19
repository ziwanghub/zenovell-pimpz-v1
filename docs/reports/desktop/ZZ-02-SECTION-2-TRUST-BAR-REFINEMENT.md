# ZZ-02 — Section 2 Tablet/Desktop Trust Bar Refinement

**Phase:** ZZ-02  
**Date:** 2026-07-19  
**Mode:** LIMITED IMPLEMENTATION · SECTION 2 ONLY · TABLET_AND_DESKTOP_ONLY · MOBILE IMMUTABLE  
**Preview:** `http://localhost:3001`  
**Evidence:** `screenshot/Desktop-screenshot/zz-02-section-2-trust-bar/`  
**Raw metrics:** `screenshot/Desktop-screenshot/zz-02-section-2-trust-bar/zz02-verify.json`

```text
COMMIT: NO
PUSH: NO
PR: NO
DEPLOY: NO
```

---

## 1. Executive Summary

ZZ-02 refines Section 2 Trust Bar for **Tablet and Desktop (≥690px)** only:

1. **Hide** the large Section 2 LINE CTA at `≥690px` via `min-[690px]:hidden` (Mobile CTA fully preserved).
2. **Expand** the trust card with a **Section-2-local** width ladder aligned to Homepage Wide Canvas gutters, replacing the previous Desktop `max-w-[920px]` bottleneck.
3. **Close** the empty CTA-sized gap so Section 2 → Section 3 rhythm stays premium and continuous.

| Gate | Result |
|---|---|
| Mobile visual freeze | **PASS** |
| Mobile CTA visible + LINE functional | **PASS** |
| Tablet/Desktop CTA hidden | **PASS** (`display:none`) |
| CTA not focusable when hidden | **PASS** |
| Trust card width ladder | **PASS** (measured) |
| Four items remain grouped | **PASS** |
| S2→S3 rhythm | **PASS** |
| Scope = 1 Section 2 runtime file | **PASS** |
| lint / typecheck / build | **PASS** |
| Global shell / Hero / S3 / analytics | **untouched** |

```text
ZZ_02_STATUS: PASS
READY_FOR_SA_REVIEW: YES
```

**Checkpoint note (SA guidance):** ZZ-01 (Hero) remains visually accepted with documented dual-network debt. Prefer a **combined ZZ-01 + ZZ-02 checkpoint** after SA review of this report — do not drop Hero dual-load debt from release notes.

---

## 2. Requirement Interpretation

| SA decision | Implementation |
|---|---|
| `HIDE_AT_690_AND_ABOVE` | CTA wrapper `min-[690px]:hidden` — no matchMedia, no DOM delete |
| Keep Mobile CTA | Base classes unchanged; hide only ≥690 |
| Expand trust card vs Hero canvas | Local max-width ladder 1120 → 1200 → 1280 → 1320 |
| Cap before 1440 full width | Hard cap **1320** at ≥1920; never 1440 full card |
| No redesign | Same 4 items, icons, copy, statement, micro row |
| Max 1 runtime file | Only `sections/section-2-trust-bar/section-2-trust-bar.tsx` |

---

## 3. Repository State

| Field | Value |
|---|---|
| Branch | `ui/desktop-image-balance-d5` |
| HEAD (checkpoint base) | `97aab20` — DWC-02A |
| ZZ-02 runtime change | `sections/section-2-trust-bar/section-2-trust-bar.tsx` |
| Coexisting uncommitted (out of ZZ-02 scope) | `sections/hero/hero-section.tsx` (ZZ-01) |
| ZZ-02 docs | this file (untracked until checkpoint) |

ZZ-02 **does not** modify Hero, shells, globals, CTA activation library, or content files.

---

## 4. Previous Section 2 Structure

```text
<section#section-2-trust-bar>
  Heading (H2) + description
  TrustCard
    - max-w 920px from 1280+
    - 4-col grid
    - footer trust statement
  SolidLineCTA  (visible all breakpoints)
  MicroTrustRow
```

Desktop card felt narrow against Wide Canvas Hero (1200–1440 shell ladder) because card stopped at **920px**.

Large pink LINE CTA after the trust card duplicated Hero + Section 3 conversion surfaces on wide viewports.

---

## 5. CTA Decision

```text
DECISION: HIDE_AT_690_AND_ABOVE
MECHANISM: CSS min-[690px]:hidden on CTA wrapper
NOT: remove DOM · matchMedia · conditional mount
```

### Why hide (not remove)

- Mobile still needs the CTA in the same component tree.
- `display: none` removes visual space **and** keyboard focus flow without hydration risk.
- Shared `activateLineCta` handler, LINE URL, analytics surface keys remain identical for Mobile.

### Wrapper (after)

```tsx
<div className="px-4 pt-5 min-[690px]:hidden">
  <SolidLineCTA ... />
</div>
```

Mobile retains `px-4 pt-5` exactly as before.

---

## 6. Trust Card Width Strategy

Section-2-local ladder (no global shell token edits):

| Viewport | Strategy | Target max | Measured card width |
|---:|---|---:|---:|
| &lt;690 | Mobile frozen (`mx-4`, no max-w) | — | 343–398 |
| 690–1279 | Adaptive width + `--platform-shell-gutter` | shell−2×gutter | 594–1087 |
| 1280–1365 | Desktop cap | **1120** | **1120** @1280 |
| 1366–1535 | Desktop cap | **1200** | **1200** @1366/1440 |
| 1536–1919 | Desktop cap | **1280** | **1280** @1536 |
| ≥1920 | Hard cap | **1320** | **1320** @1920 |

Supporting refinements (Tablet/Desktop only):

- Horizontal padding `px-5` (≥690) → `px-8` / `px-10` (Desktop)
- Grid gap ladder: `6px` (mobile) → `12/16` (tablet) → `24/32` (desktop)
- Footer message max-width `720` → `800` at 1536+ (was 560)
- Micro-row / section padding tightened after CTA hide

---

## 7. Files Changed

| File | Role |
|---|---|
| `sections/section-2-trust-bar/section-2-trust-bar.tsx` | **Only** ZZ-02 runtime change |

```text
SOURCE_FILES_CHANGED: 1
CHANGE_SCOPE: WITHIN_BUDGET
```

Not modified: `globals.css`, shells, Hero, Section 3, shared CTA component, analytics, content.

---

## 8. Mobile Freeze Evidence

Viewports: **375 · 390 · 414 · 430**

| Viewport | CTA visible | CTA h×w | Card w | Card mx | Gap | Overflow |
|---:|---|---|---:|---|---:|---|
| 375 | **yes** | 56×343 | 343 | 16/16 | 6px | no |
| 390 | **yes** | 56×358 | 358 | 16/16 | 6px | no |
| 414 | **yes** | 56×382 | 382 | 16/16 | 6px | no |
| 430 | **yes** | 56×398 | 398 | 16/16 | 6px | no |

Screenshot `s2-390.png`: heading, trust card, pink CTA, micro trust row, then Section 3 — baseline hierarchy intact.

```text
MOBILE_VISUAL_PROTECTION: PASS
MOBILE_CTA_PROTECTION: PASS
```

---

## 9. Tablet Verification Matrix

| Viewport | CTA | Card w | Gutter L/R | Item w | Gap | Overflow | Class |
|---:|---|---:|---:|---:|---:|---|---|
| 690 | **hidden** | 594 | 48/48 | 129 | 12 | no | PASS |
| 768 | **hidden** | 640 | 64/64 | 141 | 12 | no | PASS |
| 820 | **hidden** | 676 | 72/72 | 147 | 16 | no | PASS |
| 912 | **hidden** | 752 | 80/80 | 166 | 16 | no | PASS |
| 1024 | **hidden** | 832 | 96/96 | 186 | 16 | no | PASS |
| 1279 | **hidden** | 1087 | 96/96 | 249 | 16 | no | PASS |

Screenshot `s2-768.png`: no CTA, no empty CTA band; micro row sits under card; Section 3 follows cleanly.

```text
TABLET_CTA_VISIBILITY: HIDDEN
TABLET_TRUST_CARD: PASS
```

---

## 10. Desktop Verification Matrix

| Viewport | CTA | Card w | max-w CSS | Gutter L/R | Item w | Sec H | Class |
|---:|---|---:|---|---:|---:|---:|---|
| 1280 | **hidden** | **1120** | 1120px | 80/80 | 246 | 468 | PASS |
| 1366 | **hidden** | **1200** | 1200px | 83/83 | 256 | 468 | PASS |
| 1440 | **hidden** | **1200** | 1200px | 120/120 | 256 | 468 | PASS |
| 1536 | **hidden** | **1280** | 1280px | 128/128 | 276 | 468 | PASS |
| 1920 | **hidden** | **1320** | 1320px | 300/300 | 286 | 468 | PASS |

All within SA envelopes (≤1120 / ≤1200 / ~1280 / ~1320). Card does not stretch to full 1440 shell — group cohesion retained.

Screenshot `s2-1440.png`: expanded single trust card, four columns balanced, no S2 LINE CTA, micro row compact, Section 3 product CTA remains the next conversion surface.

```text
DESKTOP_CTA_VISIBILITY: HIDDEN
DESKTOP_TRUST_CARD: PASS
TRUST_CARD_WIDTH_STRATEGY: PASS
```

---

## 11. Section Rhythm Comparison

### Before (Desktop)

```text
Heading → narrow 920 card → large LINE CTA → micro row → Section 3
```

CTA duplicated Hero conversion and competed with Section 3 product CTA.

### After (Desktop / Tablet)

```text
Heading → expanded trust card → micro row → Section 3
```

- CTA band fully collapsed (`display:none` → zero height).
- Micro-row uses `pt-5 pb-5` (≥690) / `pt-5 pb-3` (≥1280) — no CTA-sized void.
- Section heights: Mobile ~516 (with CTA); Tablet ~426; Desktop ~468 — not oversized.
- `gapToNext` measured 0 (adjacent siblings; internal padding provides breathing room).

```text
SECTION_2_TO_3_RHYTHM: PASS
```

---

## 12. Functional Protection

| Check | Result |
|---|---|
| Mobile CTA opens `https://lin.ee/syjmYE2` | **PASS** (`window.open` captured) |
| CTA label / aria-label unchanged | **PASS** — `ปรึกษาผู้เชี่ยวชาญผ่าน LINE` |
| `activateLineCta` surface / source | **PASS** — `trust-line` / `trust-bar` |
| No shared CTA component edit | **PASS** |
| No analytics utility edit | **PASS** |
| No duplicate CTA introduced | **PASS** |
| Hero / Section 3 CTAs unaffected | **PASS** (not modified) |

```text
CTA_CONTRACT_PROTECTION: PASS
ANALYTICS_CONTRACT_PROTECTION: PASS
```

---

## 13. Accessibility Protection

| Check | Result |
|---|---|
| Heading remains `H2` | **PASS** |
| Hidden CTA `display:none` | **PASS** — parentDisplay `none` ≥690 |
| Focus programmatically on hidden CTA | **FAIL to focus** (desired) — `canReceiveFocus: false`, `offsetParent: false` |
| Trust list still 4 `li` items | **PASS** |
| Decorative icons `aria-hidden` | **PASS** (sampled `true`) |
| Trust copy not hidden | **PASS** |
| Heading hierarchy unchanged | **PASS** |

```text
CTA_FOCUS_PROTECTION: PASS
ACCESSIBILITY_PROTECTION: PASS
CONTENT_PROTECTION: PASS
```

---

## 14. Static Validation

| Command | Result |
|---|---|
| `npm run lint` | **PASS** |
| `npm run typecheck` | **PASS** |
| `npm run build` | **PASS** (Next.js 16.2.10) |

No autofix.

```text
STATIC_VALIDATION: PASS
```

---

## 15. Risks and Warnings

| Risk | Severity | Notes |
|---|---|---|
| At 1279, card ~1087 / item ~249 — wide but still one card | Low | 4-col retained per SA; not sparse failure |
| Combined uncommitted stack includes ZZ-01 Hero | Process | SA prefers single checkpoint after V reviews |
| ZZ-01 Hero dual network debt | Documented | Must stay in release notes if combined commit |
| Platform gutter CSS var depends on shell context | Low | Measured gutters correct on homepage |

No blockers found.

---

## 16. Rollback Instructions

```bash
# From repo root (ZENOVELL-PIMPZ-V4-Active)
git checkout HEAD -- sections/section-2-trust-bar/section-2-trust-bar.tsx
```

Or reverse only ZZ-02 hunks if co-editing with ZZ-01 Hero file still desired.

No asset or global CSS rollback required.

---

## 17. Final Status

```text
ZZ_02_STATUS:
PASS

MOBILE_VISUAL_PROTECTION:
PASS

MOBILE_CTA_PROTECTION:
PASS

TABLET_CTA_VISIBILITY:
HIDDEN

DESKTOP_CTA_VISIBILITY:
HIDDEN

CTA_FOCUS_PROTECTION:
PASS

TABLET_TRUST_CARD:
PASS

DESKTOP_TRUST_CARD:
PASS

TRUST_CARD_WIDTH_STRATEGY:
PASS

SECTION_2_TO_3_RHYTHM:
PASS

CONTENT_PROTECTION:
PASS

CTA_CONTRACT_PROTECTION:
PASS

ANALYTICS_CONTRACT_PROTECTION:
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

## Appendix A — Combined checkpoint recommendation (SA)

```text
PENDING_COMBINED_CHECKPOINT:
  ZZ-01 Hero responsive background (visual accept + NETWORK dual-load debt)
  ZZ-02 Section 2 trust bar refinement (this phase)

ZZ_01_NETWORK_DEBT:
  DOM_IMAGE_DUPLICATION: NONE
  NETWORK_IMAGE_DUPLICATION: PRESENT (~276KB mobile + ~312KB desktop on ≥690 cold load)

DO_NOT:
  Drop dual-network debt from release notes
  Commit/push/deploy until SA authorizes combined or staged checkpoint
```

## Appendix B — Evidence paths

```text
screenshot/Desktop-screenshot/zz-02-section-2-trust-bar/s2-{375..1920}.png
screenshot/Desktop-screenshot/zz-02-section-2-trust-bar/zz02-verify.json
docs/reports/desktop/ZZ-02-SECTION-2-TRUST-BAR-REFINEMENT.md
```
