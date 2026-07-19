# ZZ-02-V1 — Independent Section 2 Trust Bar Verification

**Phase:** ZZ-02-V1  
**Date:** 2026-07-19  
**Role:** Independent Browser Verification · Trust-Surface QA · Checkpoint Readiness Auditor  
**Mode:** READ-ONLY · NO SOURCE / CSS / ASSET MODIFICATION  
**Preview:** `http://localhost:3001`  
**Evidence:** `screenshot/Desktop-screenshot/zz-02-v1-independent/`  
**Raw metrics:** `screenshot/Desktop-screenshot/zz-02-v1-independent/zz02-v1-verify.json`

```text
SOURCE_CHANGED_DURING_VERIFICATION: NO
CSS_CHANGED_DURING_VERIFICATION: NO
ASSETS_CHANGED_DURING_VERIFICATION: NO
COMMIT: NO
PUSH: NO
PR: NO
DEPLOY: NO
```

---

## 1. Executive Summary

Independent verification of uncommitted **ZZ-02** confirms all locked requirements pass. Mobile Section 2 remains frozen; Tablet/Desktop hide the Section 2 LINE CTA via CSS `display:none` with no layout void and no keyboard reachability; Trust Card widths match the SA ladder exactly; Section 2 → Section 3 rhythm is controlled; conversion hierarchy is improved.

**ZZ-01** coexists cleanly in the same worktree (Hero desktop asset on ≥690, mobile asset below). No third runtime file. Static validation passes.

```text
ZZ_02_V1_STATUS: PASS
ZZ_02_FINAL_DECISION: ACCEPT
COMBINED_CHECKPOINT_DECISION: READY_WITH_DOCUMENTED_DEBT
READY_FOR_CHECKPOINT_COMMIT: YES_WITH_CONDITIONS
```

Conditions: include ZZ-01 Hero network dual-load debt in commit body / release notes; authorized runtime files only + approved reports.

---

## 2. Repository and Diff State

| Field | Value |
|---|---|
| Path | `/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active` |
| Branch | `ui/desktop-image-balance-d5` |
| HEAD | `97aab201955698a936e0305915539c9597c110ab` |
| HEAD message | `feat(desktop): homepage wide canvas authority (DWC-02A)` |

### Changed runtime files (exactly 2)

| File | Phase | Diff |
|---|---|---|
| `sections/hero/hero-section.tsx` | ZZ-01 | part of `+123 / −55` combined |
| `sections/section-2-trust-bar/section-2-trust-bar.tsx` | ZZ-02 | part of combined |

```text
git diff --stat:
 sections/hero/hero-section.tsx                     | 111 +++++++++++++--------
 sections/section-2-trust-bar/section-2-trust-bar.tsx |  67 ++++++++++---
 2 files changed, 123 insertions(+), 55 deletions(-)
```

### Untracked documentation

- `docs/reports/desktop/ZZ-01-HERO-RESPONSIVE-BACKGROUND.md`
- `docs/reports/desktop/ZZ-01-HERO-INDEPENDENT-VERIFICATION.md`
- `docs/reports/desktop/ZZ-02-SECTION-2-TRUST-BAR-REFINEMENT.md`
- `docs/reports/desktop/ZZ-02-SECTION-2-INDEPENDENT-VERIFICATION.md` (this file)
- Other pre-existing untracked desktop/phase6 docs (DAF, DWC-01, RC1)

### Scope confirmation

| Check | Result |
|---|---|
| ZZ-01 = one Hero file | **PASS** |
| ZZ-02 = one Section 2 file | **PASS** |
| No third runtime modified | **PASS** |
| No app/globals, shells, content, lib CTA/analytics | **PASS** |

```text
SOURCE_SCOPE: PASS
```

---

## 3. Static Validation

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

## 4. Mobile Freeze Verification

Viewports: **375 · 390 · 414 · 430**

### Measured

| Viewport | CTA vis | CTA h×w | Card w | mx | gap | secH | Overflow | Tab S2 CTA |
|---:|---|---|---:|---|---:|---:|---|---|
| 375 | **yes** | 56×343 | 343 | 16/16 | 6px | 516 | no | yes |
| 390 | **yes** | 56×358 | 358 | 16/16 | 6px | 516 | no | yes |
| 414 | **yes** | 56×382 | 382 | 16/16 | 6px | 516 | no | yes |
| 430 | **yes** | 56×398 | 398 | 16/16 | 6px | 514 | no | yes |

### Mobile base parity (source vs HEAD)

Unchanged mobile tokens still present:

- Card: `mx-4 … p-4`, grid `gap-[6px]`
- CTA button: `h-14 w-full`
- CTA wrapper base: `px-4 pt-5` (+ `min-[690px]:hidden` only affects ≥690)

### Functional

| Check | Result |
|---|---|
| Destination | `https://lin.ee/syjmYE2` |
| Accessible name | `ปรึกษาผู้เชี่ยวชาญผ่าน LINE` |
| Keyboard focus | **reachable** (`activeIsBtn: true`) |
| H2 | `ความมั่นใจของคุณคือสิ่งที่เราปกป้อง` |
| 4 items | yes |
| Hero coexistence | mobile asset `bg-ph6d-section-1-hero-v2.jpeg` |

Screenshot: `v1-s2-390.png`

```text
MOBILE_VISUAL_PROTECTION: PASS
MOBILE_CTA_PROTECTION: PASS
```

---

## 5. Tablet CTA Verification

| Viewport | parentDisplay | CTA box | In tab order | Programmatic focus | Card w | L/R gutter | secH |
|---:|---|---|---|---|---:|---|---:|
| 690 | **none** | 0×0 | **false** | denied | 594 | 48/48 | 426 |
| 768 | **none** | 0×0 | **false** | denied | 640 | 64/64 | 426 |
| 820 | **none** | 0×0 | **false** | denied | 676 | 72/72 | 426 |
| 912 | **none** | 0×0 | **false** | denied | 752 | 80/80 | 426 |
| 1024 | **none** | 0×0 | **false** | denied | 832 | 96/96 | 426 |
| 1279 | **none** | 0×0 | **false** | denied | 1087 | 96/96 | 426 |

- CTA-sized empty gap: **none** (section height drops from ~516 mobile → ~426 tablet).
- Mechanism: CSS `min-[690px]:hidden` — no matchMedia.

```text
TABLET_CTA_VISIBILITY: HIDDEN
CTA_FOCUS_PROTECTION: PASS
```

---

## 6. Tablet Trust Card Matrix

| Viewport | Card w | Item w | Gap | 4-col readable | Density | Class |
|---:|---:|---:|---:|---|---|---|
| 690 | 594 | 129 | 12 | yes (titles wrap as designed) | tight–balanced | **PASS** |
| 768 | 640 | 141 | 12 | yes | balanced | **PASS** |
| 820 | 676 | 147 | 16 | yes | balanced | **PASS** |
| 912 | 752 | 166 | 16 | yes | balanced | **PASS** |
| 1024 | 832 | 186 | 16 | yes | balanced | **PASS** |
| 1279 | 1087 | 249 | 16 | yes | slightly airy, still one card | **PASS** |

Visual (690): four columns remain a single trust group; bottom divider + wellness message connected; micro row present; no overflow.  
Screenshots: `v1-s2-690.png`, `v1-s2-768.png`, `v1-s2-1024.png`

```text
TABLET_TRUST_CARD: PASS
```

---

## 7. Desktop Width Matrix

| Viewport | Expected | Measured card w | max-w CSS | pl | gap | Item w | L/R | Match |
|---:|---:|---:|---|---:|---:|---:|---|---|
| 1280 | 1120 | **1120** | 1120px | 32 | 24 | 246 | 80/80 | **exact** |
| 1366 | 1200 | **1200** | 1200px | 40 | 32 | 256 | 83/83 | **exact** |
| 1440 | 1200 | **1200** | 1200px | 40 | 32 | 256 | 120/120 | **exact** |
| 1536 | 1280 | **1280** | 1280px | 40 | 32 | 276 | 128/128 | **exact** |
| 1920 | 1320 | **1320** | 1320px | 40 | 32 | 286 | 300/300 | **exact** |

Cohesion judgment:

- Uses Desktop space effectively vs prior 920 cap.
- Remains a single grouped card (not four islands).
- **1320 @ 1920** does not feel sparse; item width ~286 with 32px gap is still unified.
- Stays below homepage 1440 hard shell — correct.

Screenshots: `v1-s2-1280.png`, `v1-s2-1440.png`, `v1-s2-1920.png`

```text
DESKTOP_TRUST_CARD: PASS
DESKTOP_CTA_VISIBILITY: HIDDEN
TRUST_CARD_WIDTH_VERIFICATION: PASS
```

---

## 8. Section 2 → Section 3 Rhythm

Reviewed at 768 · 1024 · 1280 · 1440 · 1536 · 1920 (plus transition captures at 1440/1920).

| Observation | Verdict |
|---|---|
| No CTA-sized void after hide | PASS |
| Micro trust row closes Section 2 | PASS |
| Section 3 starts as next conversion surface | PASS |
| Section 2 not incomplete without large CTA | PASS (trust card is the body) |
| Section 2 not overly compressed | PASS (secH 426 tablet / 468 desktop) |
| Section 3 not abrupt collision | PASS |
| Hero → Trust → Featured Product hierarchy | **clear** |

Full-page evidence: `v1-hero-s2-s3-1440.png`, `v1-hero-s2-s3-1920.png`

```text
SECTION_2_TO_3_RHYTHM: PASS
```

---

## 9. Conversion Hierarchy Review

Tablet/Desktop observed flags (all wide viewports):

| Surface | Present |
|---|---|
| Header LINE | yes |
| Hero LINE (primary) | yes |
| Section 2 large CTA | **hidden** |
| Section 3 product LINE CTA | yes |

Verdict: removing Section 2 CTA on wide viewports **reduces duplication**, improves premium trust-section rhythm, and keeps a clear path (Header / Hero / Section 3). No dead zone.

```text
CONVERSION_HIERARCHY: IMPROVED
```

---

## 10. Accessibility Verification

| Check | Result |
|---|---|
| Heading `H2` | PASS |
| Trust items = 4 list items | PASS |
| Decorative icons `aria-hidden` | PASS (sampled) |
| ≥690 Tab order excludes S2 CTA | PASS (`s2CtaInTabOrder: false`) |
| ≥690 `display:none` chain | PASS |
| Mobile Tab includes S2 CTA | PASS |
| Mobile accessible name valid | PASS |
| No duplicate heading/CTA | PASS |
| No focus trap observed | PASS |

```text
ACCESSIBILITY_PROTECTION: PASS
```

---

## 11. Functional and Contract Protection

| Contract | Result |
|---|---|
| Mobile CTA → `https://lin.ee/syjmYE2` | **PASS** |
| `activateLineCta` surface `trust-line` / source `trust-bar` | Unchanged in source (diff is layout classes only + hide wrapper) |
| No `lib/commerce` / analytics file edits | **PASS** (not in diff) |
| No Section 3 source change | **PASS** |
| No global shell / globals.css | **PASS** |
| LINE URL not altered | **PASS** |

```text
CTA_CONTRACT_PROTECTION: PASS
ANALYTICS_CONTRACT_PROTECTION: PASS
CONTENT_PROTECTION: PASS
```

---

## 12. Runtime Results

Instrumented viewports: 390 · 690 · 768 · 1024 · 1280 · 1440 · 1920 (full matrix also run).

| Topic | Result |
|---|---|
| Horizontal overflow | **none** all viewports |
| Hydration warnings | **none** related to Section 2 |
| Console | isolated 404 on 375 only (unrelated asset); no S2 errors |
| CTA flash on Tablet/Desktop | **none** — at `DOMContentLoaded` @1440 parent already `display:none` |
| CSS hide is paint-time (no JS gate) | **PASS** |
| ZZ-01 coexistence | mobile hero asset &lt;690; desktop hero asset ≥690; single hero DOM img |

```text
RUNTIME_VERIFICATION: PASS
```

---

## 13. Risks and Warnings

| Item | Level | Notes |
|---|---|---|
| ZZ-01 Hero dual network load ≥690 | **MEDIUM** (documented) | ~276KB mobile + ~312KB desktop cold load — **not a ZZ-02 defect** |
| 1279 card ~1087px | Low | Still one cohesive card |
| Combined commit must not omit debt | Process | Release notes must retain dual-load warning |
| Untracked DAF/DWC/RC1 docs | Process | Include only if SA wants; not required for ZZ runtime checkpoint |

No ZZ-02 visual/functional blockers.

---

## 14. ZZ-02 Decision

| Option | Selected |
|---|---|
| **ACCEPT** | **YES** |
| ACCEPT_WITH_WARNINGS | no (no residual ZZ-02 visual debt) |
| CORRECTION_REQUIRED | no |
| REJECT | no |

```text
ZZ_02_FINAL_DECISION: ACCEPT
```

---

## 15. Combined ZZ-01 + ZZ-02 Checkpoint Recommendation

| Factor | Assessment |
|---|---|
| ZZ-01 visual | Accepted (prior V1) |
| ZZ-01 network debt | Documented; MEDIUM; no forced fix for checkpoint |
| ZZ-02 independent V1 | **PASS / ACCEPT** |
| Runtime file set | Exactly 2 authorized files |
| Regression cross-impact | Hero asset swap coexists with S2 hide/expand; no conflict observed |

```text
COMBINED_CHECKPOINT_DECISION: READY_WITH_DOCUMENTED_DEBT
READY_FOR_CHECKPOINT_COMMIT: YES_WITH_CONDITIONS
```

### Recommended checkpoint contents (when SA authorizes)

**Runtime**

1. `sections/hero/hero-section.tsx` (ZZ-01)  
2. `sections/section-2-trust-bar/section-2-trust-bar.tsx` (ZZ-02)

**Reports (recommended)**

- `docs/reports/desktop/ZZ-01-HERO-RESPONSIVE-BACKGROUND.md`
- `docs/reports/desktop/ZZ-01-HERO-INDEPENDENT-VERIFICATION.md`
- `docs/reports/desktop/ZZ-02-SECTION-2-TRUST-BAR-REFINEMENT.md`
- `docs/reports/desktop/ZZ-02-SECTION-2-INDEPENDENT-VERIFICATION.md`

**Commit body must include**

```text
DEBT ZZ-01:
  DOM_IMAGE_DUPLICATION: NONE
  NETWORK_IMAGE_DUPLICATION: PRESENT on >=690
  (SSR mobile-first Image then hydrate swap to desktop asset;
   cold load may transfer both ~276KB + ~312KB)
  PERFORMANCE_RISK: MEDIUM
  Follow-up: optional image-loading micro-fix (not required for this checkpoint)
```

**Not authorized yet:** push · PR · deploy · Section 3 work

---

## 16. Final Status

```text
ZZ_02_V1_STATUS:
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

TRUST_CARD_WIDTH_VERIFICATION:
PASS

SECTION_2_TO_3_RHYTHM:
PASS

CONVERSION_HIERARCHY:
IMPROVED

CONTENT_PROTECTION:
PASS

CTA_CONTRACT_PROTECTION:
PASS

ANALYTICS_CONTRACT_PROTECTION:
PASS

ACCESSIBILITY_PROTECTION:
PASS

RUNTIME_VERIFICATION:
PASS

STATIC_VALIDATION:
PASS

SOURCE_SCOPE:
PASS

ZZ_02_FINAL_DECISION:
ACCEPT

COMBINED_CHECKPOINT_DECISION:
READY_WITH_DOCUMENTED_DEBT

READY_FOR_CHECKPOINT_COMMIT:
YES_WITH_CONDITIONS

SOURCE_CHANGED_DURING_VERIFICATION:
NO

CSS_CHANGED_DURING_VERIFICATION:
NO

ASSETS_CHANGED_DURING_VERIFICATION:
NO

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

## Appendix — Evidence inventory

```text
screenshot/Desktop-screenshot/zz-02-v1-independent/
  v1-s2-390.png
  v1-s2-690.png
  v1-s2-768.png
  v1-s2-1024.png
  v1-s2-1280.png
  v1-s2-1440.png
  v1-s2-1920.png
  v1-hero-s2-s3-1440.png
  v1-hero-s2-s3-1920.png
  zz02-v1-verify.json
```

**Stop:** verification complete. Await SA authorization for combined checkpoint commit.
