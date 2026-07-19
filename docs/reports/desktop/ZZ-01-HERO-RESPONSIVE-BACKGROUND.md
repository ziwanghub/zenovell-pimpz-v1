# ZZ-01 — Responsive Hero Background for Tablet and Desktop

**Phase:** ZZ-01  
**Date:** 2026-07-19  
**Mode:** Limited Hero implementation · Mobile immutable  
**Commit / Push / PR / Deploy:** **NO**  

| Field | Value |
|---|---|
| Branch | `ui/desktop-image-balance-d5` |
| Base checkpoint | `97aab20` (Desktop Authority Freeze candidate) |
| Runtime files changed | **1** (`sections/hero/hero-section.tsx`) |
| Preview | `http://localhost:3001` |
| Evidence | `screenshot/Desktop-screenshot/zz-01-hero-responsive-bg/` |

---

## 1. Executive Summary

ZZ-01 replaces Hero background for **Tablet (690–1279)** and **Desktop (≥1280)** with:

```text
/images/hero/desktop-section-01-hero-desktop.jpeg
```

as a **full Hero background composition**, with breakpoint-aware `object-position`.

**Mobile (&lt;690)** remains on:

```text
/images/hero/bg-ph6d-section-1-hero-v2.jpeg
```

with prior crop, layout, CTA, and typography **unchanged**.

| Gate | Result |
|---|---|
| Mobile visual / functional freeze | **PASS** |
| Tablet uses authorized asset | **PASS** |
| Desktop uses authorized asset | **PASS** |
| Responsive art direction | **PASS** (multi-step object-position) |
| Wide Canvas / D3 measures | **PASS** (shell + text max-w unchanged) |
| Single active DOM image | **PASS** (matchMedia mount) |
| Mobile downloads only mobile asset | **PASS** |
| Wide viewports SSR hydrate may request mobile then desktop | **PASS_WITH_WARNINGS** |
| lint / typecheck / build | **PASS** |
| Scope ≤2 files | **1 file** |

```text
ZZ_01_STATUS: PASS_WITH_WARNINGS
READY_FOR_SA_REVIEW: YES
COMMIT: NO
```

---

## 2. Requirement Interpretation

| Intent | Implementation |
|---|---|
| Mobile frozen | `<690` only mounts mobile Image + mobile scrims |
| Tablet + Desktop new asset | `>=690` mounts full-bleed `desktop-section-01-hero-desktop.jpeg` |
| Not path-only swap | Replaced right-field desktop layer with **full inset-0** background |
| Responsive art direction | Distinct `object-position` steps 690→1920 |
| No layout redesign | Content/CTA/width classes untouched |

---

## 3. Repository State

| Field | Value |
|---|---|
| HEAD before work | `97aab20` |
| Diff | only `sections/hero/hero-section.tsx` (+ report untracked) |
| Unrelated untracked | DAF freeze doc, draft DWC-01, RC1 note (untouched) |

---

## 4. Previous Image Architecture

| Layer | Visibility | Asset | Role |
|---|---|---|---|
| Mobile full | `&lt;1280` (was) | `bg-ph6d-section-1-hero-v2.jpeg` | Full bg including tablet |
| Desktop right field | `≥1280` | `desktop-section-01-hero-desktop.jpeg` | Right visual only |

---

## 5. New Image Architecture

| Layer | Visibility / mount | Asset | Role |
|---|---|---|---|
| Mobile full | **`!isTabletOrDesktop` (&lt;690 after hydrate; SSR mobile-first)** | `bg-ph6d-section-1-hero-v2.jpeg` | Mobile authority |
| Tablet/Desktop full | **`isTabletOrDesktop` (≥690)** | `desktop-section-01-hero-desktop.jpeg` | Full Hero bg |
| Mobile scrims | CSS `min-[690px]:hidden` | — | Frozen |
| Wide scrims | CSS `min-[690px]:block` | — | Text-safe left field |

`useMinWidth(690)` ensures **only one** `<Image>` is mounted after resolve (prevents dual desktop-layer duplication of the same file).

---

## 6. Files Changed

| File | Change |
|---|---|
| `sections/hero/hero-section.tsx` | Background authority split; full-bleed wide bg; art direction; load isolation |

**globals.css:** not modified.

```text
SOURCE_FILES_CHANGED: 1
CHANGE_SCOPE: WITHIN_BUDGET
```

---

## 7. Mobile Freeze Evidence

| VP | Visible asset | Requests | Overflow | Crop |
|---:|---|---|---|---|
| 375–430 (sample 390/430) | **bg-ph6d-section-1-hero-v2.jpeg only** | **mobile only** | false | `74% 18%` |

Layout/CTA/shell unchanged at mobile widths.

```text
MOBILE_ASSET: UNCHANGED
MOBILE_VISUAL_PROTECTION: PASS
MOBILE_FUNCTIONAL_PROTECTION: PASS
```

---

## 8. Tablet Art-Direction Matrix

| VP | Visible asset | object-position | Rendered ~ |
|---:|---|---|---|
| 690 | desktop-section-01… | **82% 42%** | 642×566 |
| 768 | same | **84% 44%** | 704×636 |
| 820 | same | **86% 46%** | 748×655 |
| 1024 | same | **88% 48%** | 928×684 |
| 1279 | same | **88% 48%** | 1183×645 |

```text
TABLET_BACKGROUND: PASS
```

---

## 9. Desktop Art-Direction Matrix

| VP | Shell | Sub max | Asset | object-position | Rendered ~ |
|---:|---:|---|---|---|---|
| 1280 | 1200 | 440px | desktop-section-01… | **92% 50%** | 1200×674 |
| 1440 | 1280 | 480px | same | **90% 50%** | 1280×710 |
| 1536 | 1400 | 480px | same | **86% 48%** | 1400×727 |
| 1920 | 1440 | 480px | same | **82% 46%** | 1440×732 |

Wide Canvas ladder preserved (1200→1280→1400→1440).

```text
DESKTOP_BACKGROUND: PASS_WITH_WARNINGS
RESPONSIVE_ART_DIRECTION: PASS
WIDTH_AUTHORITY_PROTECTION: PASS
```

Warning: cover @1440 CSS width uses full 1536 intrinsic → soft on 2× retina possible (known asset limit).

---

## 10. Image Loading and Performance

| Viewport class | Network hero assets after settle |
|---|---|
| Mobile 390/430 | **mobile only** |
| Tablet/Desktop | **desktop asset** (final DOM); **SSR may also request mobile first** then swap on hydrate |

| Metric | Result |
|---|---|
| Duplicate same desktop file in DOM | **NONE** |
| Dual different assets requested on wide | **PRESENT** (SSR mobile → hydrate desktop) |
| Mobile loads desktop | **NO** |

```text
IMAGE_DUPLICATION: NONE
IMAGE_LOADING: PASS_WITH_WARNINGS
PERFORMANCE_RISK: MEDIUM
```

---

## 11. Text and CTA Readability

| Check | Result |
|---|---|
| Left scrim ≥690 | active |
| Hero sub measure desktop | 440/480 preserved |
| CTA visible | yes |
| No copy/CTA contract edits | yes |

```text
TEXT_READABILITY: PASS
CTA_PROTECTION: PASS
```

---

## 12. Accessibility Protection

- No heading/landmark/CTA name changes  
- No duplicate Hero section  
- Decorative images remain `aria-hidden`  
- Background swap only  

```text
ACCESSIBILITY_PROTECTION: PASS
```

---

## 13. Static Validation

| Check | Result |
|---|---|
| lint | **PASS** |
| typecheck | **PASS** |
| build | **PASS** |

```text
STATIC_VALIDATION: PASS
```

---

## 14. Browser Verification

Evidence under `zz-01-hero-responsive-bg/` (`zz01-verify-final.json`, `hero-*-final.png`).

| Band | Result |
|---|---|
| Mobile freeze | PASS |
| Tablet new bg | PASS |
| Desktop new bg + DWC | PASS |
| Overflow all sampled | false |
| Console @390/1440 | clean in final capture |

---

## 15. Risks and Warnings

| ID | Item | Severity |
|---|---|---|
| W1 | Wide viewports: brief SSR mobile image request before hydrate | Low–Med |
| W2 | 1536×1024 asset soft on retina at large cover sizes | Medium |
| W3 | First paint on tablet may flash mobile bg until hydrate | Low |

No blockers for SA visual review.

---

## 16. Rollback Instructions

```bash
git checkout -- sections/hero/hero-section.tsx
```

Restores pre-ZZ-01 dual-layer Hero (mobile&lt;1280 + desktop right field).

---

## 17. Final Status

```text
ZZ_01_STATUS:
PASS_WITH_WARNINGS

AUTHORIZED_ASSET:
desktop-section-01-hero-desktop.jpeg

MOBILE_ASSET:
UNCHANGED

MOBILE_VISUAL_PROTECTION:
PASS

MOBILE_FUNCTIONAL_PROTECTION:
PASS

TABLET_BACKGROUND:
PASS

DESKTOP_BACKGROUND:
PASS_WITH_WARNINGS

RESPONSIVE_ART_DIRECTION:
PASS

TEXT_READABILITY:
PASS

CTA_PROTECTION:
PASS

WIDTH_AUTHORITY_PROTECTION:
PASS

IMAGE_DUPLICATION:
NONE

IMAGE_LOADING:
PASS_WITH_WARNINGS

PERFORMANCE_RISK:
MEDIUM

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

**STOP** — Awaiting SA Review. No commit/push/PR/deploy.
