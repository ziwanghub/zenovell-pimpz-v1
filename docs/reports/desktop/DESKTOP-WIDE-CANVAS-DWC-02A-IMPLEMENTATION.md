# DWC-02A — Core Homepage Wide Canvas Implementation

**Phase:** DWC-02A  
**Date:** 2026-07-19  
**Mode:** Limited implementation · Evidence-based  
**Commit / Push / PR / Deploy:** **NO**  

**Baseline HEAD:** `167b385622beaba7f187b62bfdc42345c63380e4`  
**Working branch:** `ui/desktop-image-balance-d5` (same HEAD + local uncommitted DWC-02A)  
**Dev URL:** `http://localhost:3001`  

**Authority:**  
- `DESKTOP-WIDE-CANVAS-SPECIFICATION-LOCK.md`  
- `DESKTOP-WIDE-CANVAS-PRECHANGE-BASELINE.md`  

---

## 1. Executive Summary

DWC-02A implements **homepage-only** wide shell ownership and desktop composition for **Hero + Section 3 only**.

| Goal | Result |
|---|---|
| Homepage shell 1200→1280→1400→1440 ladder | **PASS** (measured) |
| Platform routes unchanged 1240/1320 | **PASS** (no marker) |
| Mobile / Adaptive unchanged | **PASS** |
| D3 reading measures | **PASS** (640 / 420 / 440–480) |
| Source files ≤5 | **4** |
| Header / Footer / S5–S10 | **untouched** |
| Assets / CTA / analytics code | **untouched** |
| lint / typecheck / build | **PASS** |

```text
DWC_02A_STATUS: PASS_WITH_WARNINGS
READY_FOR_SA_REVIEW: YES
READY_FOR_DWC_02B: YES_WITH_CONDITIONS
COMMIT: NO
```

Warnings: Hero/S3 image intrinsic limits (softness risk); local GTM still inactive; header intentionally not widened (deferred).

---

## 2. Repository State Before Change

| Field | Value |
|---|---|
| Branch | `ui/desktop-image-balance-d5` |
| HEAD | `167b385` (matches DWC-01B baseline) |
| Runtime dirty before impl | none |
| Untracked before | DWC docs + unrelated RC1 note only |

---

## 3. Files Changed

| # | File | Role |
|---|---|---|
| 1 | `components/layout/homepage-adaptive-shell.tsx` | Marker + class |
| 2 | `app/globals.css` | Homepage-scoped width ladder |
| 3 | `sections/hero/hero-section.tsx` | Outer max-w + image field composition |
| 4 | `sections/section-3-hero-product/section-3-hero-product.tsx` | Outer max-w + grid/image stage |

**Source file count:** **4** (within budget of 5)  
**Documentation (this report):** does not count toward source budget  

**Not changed:** GlobalHeader, Footer, S5, S6, S10, S4, MobileShell, PlatformAdaptiveShell component logic, unscoped platform shell tokens for non-homepage, assets, content, CTA/analytics libs.

---

## 4. Implementation Details

### 4.1 Homepage ownership marker

`HomepageAdaptiveShell` now wraps:

```tsx
<div data-homepage-wide-canvas className="w-full">
  <PlatformAdaptiveShell className="homepage-wide-canvas bg-[var(--color-page-bg)]">
    {children}
  </PlatformAdaptiveShell>
</div>
```

- Marker **only** on homepage tree  
- Platform layouts never set these attributes/classes  

### 4.2 Homepage-scoped CSS (`globals.css`)

Appended **after** global platform rules (higher cascade when equal media):

| Media | `.platform-adaptive-shell.homepage-wide-canvas` |
|---|---|
| (inherits ≥1280 global) | 1200px |
| ≥1366 | **1280px** |
| ≥1536 | **1400px** |
| ≥1920 | **1440px** |

**Does not** edit unscoped `--platform-shell-max-width` assignments for plain `.platform-adaptive-shell`.  
**Does not** widen `.platform-header-frame` (deferred per SA).

### 4.3 Hero

- Outer max-w ladder aligned to shell: 1200 / **1280** / **1400** / **1440**  
- Desktop image field shifted right (`left` 30%→42% by breakpoint) with `right: 0` (no full-bleed stretch to viewport edge)  
- `sizes` capped (~720–860px candidates) to reduce over-fetch / soften risk on 1536w asset  
- Text measures unchanged (subheadline still 440/480 max-w)  
- No markup duplication; CTA/copy untouched  

### 4.4 Section 3

- Outer max-w ladder: 1200 / **1280** / **1400** / **1440**  
- Grid **0.5 / 0.5** for slightly stronger image column balance  
- Stage min/max-height breathing room at ≥1536; inset-4 at large  
- Tagline remains `max-w-[420px]`  
- `sizes` capped at 560–640px  
- CTA / price / trust / product links untouched  

---

## 5. Homepage Width Results

| VP | Shell w | maxW | Hero w | S3 w | Gutter ~ | Overflow |
|---:|---:|---|---:|---:|---:|---|
| 390 | 390 | 430 | 390 | 390 | 0 | false |
| 430 | 430 | 430 | 430 | 430 | 0 | false |
| 690 | 642 | none | 642 | 642 | 24 | false |
| 768 | 704 | none | 704 | 704 | 32 | false |
| 1024 | 928 | none | 928 | 928 | 48 | false |
| **1279** | **1183** | none | 1183 | 1183 | 48 | false |
| **1280** | **1200** | 1200px | 1200 | 1200 | 40 | false |
| **1366** | **1270** | 1280px | 1270 | 1270 | 48 | false |
| **1440** | **1280** | 1280px | 1280 | 1280 | 80 | false |
| **1536** | **1400** | 1400px | 1400 | 1400 | 68 | false |
| **1920** | **1440** | 1440px | 1440 | 1440 | 240 | false |

### Notes on 1366 → 1270

Shell `max-width: 1280px` is applied to `[data-mobile-shell-root]`, but parent `.platform-adaptive-shell` still has `padding-inline: 48px` (desktop-gutter-lg).  
Available content box = `1366 − 96 = 1270` → shell renders **1270**, not full 1280.  
This is **expected geometry**, not a failed override. At 1440, available width exceeds 1280 so shell hits **1280** cleanly.

**Baseline comparison (pre → post):**

| VP | Before | After |
|---:|---:|---:|
| 1280 | 1200 | 1200 |
| 1440 | 1240 | **1280** (+40) |
| 1536 | 1320 | **1400** (+80) |
| 1920 | 1320 | **1440** (+120) |

```text
HOMEPAGE_WIDE_SHELL: PASS
```

---

## 6. Hero Before / After Analysis

| Aspect | Before | After |
|---|---|---|
| Outer @1440 | 1240 | **1280** |
| Outer @1920 | 1320 | **1440** |
| Subheadline measure @desktop | 440–480 | **unchanged** |
| Image field | bleed past shell (`right: calc((100vw-100%)/-2)`) | **contained to section**, starts further right |
| sizes | up to 60vw | **capped ~720–860px** |
| CTA / copy | — | **unchanged** |

**Intent:** wider composition frame without stretching the 1536w asset across full shell/viewport.

```text
HERO_COMPOSITION: PASS_WITH_WARNINGS
```

Warning: intrinsic 1536w still SOFT_WARNING on retina; mitigated via composition, not replacement.

---

## 7. Section 3 Before / After Analysis

| Aspect | Before | After |
|---|---|---|
| Outer @1440 / 1920 | 1240 / 1320 | **1280 / 1440** |
| Grid | 0.48 / 0.52 | **0.5 / 0.5** |
| Tagline | 420 max | **420 max** |
| Image stage | min-h 400 / max 460 | + breathing at 1536 |
| Product links / LINE CTA | — | **unchanged** |
| S4 | not modified | **unchanged** |

```text
SECTION_3_COMPOSITION: PASS
```

---

## 8. Mobile and Adaptive Protection

| VP | Shell after | Match baseline intent |
|---:|---|---|
| 390 | 390 / 430 | yes |
| 430 | 430 | yes |
| 690–1024 | fluid + gutters | yes |
| **1279** | **1183 / none** | yes (no desktop ladder) |

No new rules below 1280.

```text
MOBILE_PROTECTION: PASS
ADAPTIVE_PROTECTION: PASS
```

---

## 9. Platform Route Protection

| Route | 1440 shell | 1920 shell | Marker |
|---|---:|---:|---|
| `/products/nicky-pimpz-boss` | **1240** | **1320** | **false** |
| `/information/about` | **1240** | **1320** | **false** |
| `/knowledge/buying-guide` | **1240** | **1320** | **false** |

Overflow: false on all sampled.

```text
PLATFORM_ROUTE_PROTECTION: PASS
```

---

## 10. D3 Reading Width Protection

| Surface | Desktop measure after |
|---|---|
| Hero subheadline | maxW **440px** @1280 / **480px** @≥1366 |
| S3 description | maxW **420px** |
| SectionHeader-class intros (unchanged code) | remain **640** |

Shell widened; prose caps unchanged.

```text
D3_READING_WIDTH_PROTECTION: PASS
```

---

## 11. Functional Verification

| Check | Result |
|---|---|
| Mobile drawer | opens |
| Hero LINE CTA | `window.open` → `https://lin.ee/syjmYE2` |
| S3 product link present | true |
| S3 CTA present | true |

FAQ/footer not re-broken by this patch (DOM outside changed sections).

---

## 12. Analytics / CTA Protection

| Contract | Status |
|---|---|
| LINE URL | unchanged |
| `activateLineCta` / analytics libs | **not edited** |
| No duplicate Hero/S3 markup | confirmed |
| Local GTM | still inactive without env → **PASS_WITH_WARNINGS** (same as baseline) |

```text
CTA_CONTRACT_PROTECTION: PASS
ANALYTICS_CONTRACT_PROTECTION: PASS_WITH_WARNINGS
COMMERCE_CONTRACT_PROTECTION: PASS
```

---

## 13. Image and Performance Observations

| Asset | Intrinsic | Strategy in 02A |
|---|---|---|
| Hero desktop 1536×1024 | SOFT_WARNING | narrower image field + sizes cap |
| S3 941×1672 | READY_WITH_LIMITS | sizes ≤640; inset stage |

Performance risk remains **MEDIUM** (LCP hero still priority; sizes reduced vs prior 60vw).

```text
IMAGE_READINESS: PASS_WITH_WARNINGS
PERFORMANCE_RISK: MEDIUM
```

---

## 14. Accessibility Protection

- No duplicate sections  
- Semantic order preserved  
- Skip link / headings not altered  
- Drawer not modified  

```text
ACCESSIBILITY_PROTECTION: PASS
```

---

## 15. Static Validation

| Check | Result |
|---|---|
| `npm run lint` | **PASS** |
| `npm run typecheck` | **PASS** |
| `npm run build` | **PASS** |

```text
STATIC_VALIDATION: PASS
```

---

## 16. Browser Verification Matrix

Evidence: `screenshot/Desktop-screenshot/desktop-wide-canvas-dwc02a/`  
JSON: `dwc02a-verify.json`

| Check | Result |
|---|---|
| Homepage ladder active ≥1280 only | PASS |
| Target widths (with 1366 gutter note) | PASS |
| Platform isolation | PASS |
| Overflow | PASS (all false) |
| Console | mostly clean; one intermittent 404 noise @390 only |

---

## 17. Diff Summary

```text
4 files changed, 48 insertions(+), 13 deletions(-)
app/globals.css
components/layout/homepage-adaptive-shell.tsx
sections/hero/hero-section.tsx
sections/section-3-hero-product/section-3-hero-product.tsx
```

```text
SOURCE_FILES_CHANGED: 4
CHANGE_SCOPE: WITHIN_BUDGET
```

---

## 18. Risks and Warnings

| ID | Item | Severity |
|---|---|---|
| W1 | Hero asset softness on retina | Medium — deferred to DWC-IMG-01 if SA requires |
| W2 | Header still 1200–1320 platform ladder (misalign vs 1440 shell) | Low–Med — intentional deferral |
| W3 | 1366 shell 1270 vs ideal 1280 | Low — gutter geometry |
| W4 | Local analytics without GTM | Low for layout gate |
| W5 | S5/S6/S10 still baseline width feel under new shell | Expected until 02B |

---

## 19. Rollback Instructions

```bash
# From repo root Active project
git checkout -- \
  app/globals.css \
  components/layout/homepage-adaptive-shell.tsx \
  sections/hero/hero-section.tsx \
  sections/section-3-hero-product/section-3-hero-product.tsx
```

Or discard uncommitted DWC-02A hunk only.  
Instant conceptual kill: remove `homepage-wide-canvas` / `data-homepage-wide-canvas` (reverts shell ladder; section max-w classes would still need checkout).

Baseline compare: DWC-01B report + `desktop-wide-canvas-baseline/`.

---

## 20. Recommendation for DWC-02B

| Item | Recommendation |
|---|---|
| Proceed to S5/S6/S10? | **Only after SA visual review of 02A** |
| Header/Footer widen? | Consider if header lag at 1440/1920 feels broken in SA review |
| Asset upgrades | Separate `DWC-IMG-01` if softness unacceptable |
| Default if 02A sufficient | **DWC_02B: NOT_REQUIRED** until evidence needs it |

```text
READY_FOR_DWC_02B: YES_WITH_CONDITIONS
```

Condition: SA confirms visual need for S5/S6/S10 after comparing 02A screenshots.

---

## 21. Final Status

```text
DWC_02A_STATUS:
PASS_WITH_WARNINGS

HOMEPAGE_WIDE_SHELL:
PASS

HERO_COMPOSITION:
PASS_WITH_WARNINGS

SECTION_3_COMPOSITION:
PASS

MOBILE_PROTECTION:
PASS

ADAPTIVE_PROTECTION:
PASS

PLATFORM_ROUTE_PROTECTION:
PASS

D3_READING_WIDTH_PROTECTION:
PASS

CTA_CONTRACT_PROTECTION:
PASS

ANALYTICS_CONTRACT_PROTECTION:
PASS_WITH_WARNINGS

COMMERCE_CONTRACT_PROTECTION:
PASS

IMAGE_READINESS:
PASS_WITH_WARNINGS

PERFORMANCE_RISK:
MEDIUM

ACCESSIBILITY_PROTECTION:
PASS

STATIC_VALIDATION:
PASS

SOURCE_FILES_CHANGED: 4

CHANGE_SCOPE:
WITHIN_BUDGET

READY_FOR_SA_REVIEW:
YES

READY_FOR_DWC_02B:
YES_WITH_CONDITIONS

COMMIT:
NO

PUSH:
NO

PR:
NO

DEPLOY:
NO
```

**STOP** — Awaiting SA Review + Browser Comparison before DWC-02B or freeze path.
