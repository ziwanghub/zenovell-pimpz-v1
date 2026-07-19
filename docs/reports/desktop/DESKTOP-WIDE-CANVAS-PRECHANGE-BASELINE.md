# DWC-01B — Pre-change Desktop Baseline Checkpoint

**Phase:** DWC-01B  
**Date:** 2026-07-19  
**Repository:** `ZENOVELL-PIMPZ-V4-Active`  
**Mode:** READ-ONLY · Evidence capture only  
**Purpose:** Authoritative pre-DWC-02 comparison + rollback reference  

```text
SOURCE_CODE_CHANGED: NO
CSS_CHANGED: NO
ASSETS_CHANGED: NO
COMMIT: NO
PUSH: NO
PR: NO
DEPLOY: NO
```

**Evidence pack:**  
`screenshot/Desktop-screenshot/desktop-wide-canvas-baseline/`  
- `shell-width-baseline.json` (full machine measures)  
- `m390|e1279|d1280|d1440|d1536|d1920-top.png` + `-s3.png`  

**Locked architecture reference:**  
`docs/reports/desktop/DESKTOP-WIDE-CANVAS-SPECIFICATION-LOCK.md` (DWC-01 SA approved)

**Local runtime:** `http://localhost:3001` (`next dev`, branch below)

---

## 1. Executive Summary

Pre-change baseline for Desktop Wide Canvas is **captured successfully**.

| Domain | Result |
|---|---|
| Repository state | CAPTURED (docs-only untracked; **no runtime source dirty**) |
| Static validation | **PASS** (lint / typecheck / build) |
| Homepage width matrix | **CAPTURED** (13 viewports) |
| Reading width (D3) | **CAPTURED** — desktop intros **640px**, S3 tagline **420px**, hero sub **440–480px** |
| Images | **CAPTURED** with **softness warnings** (Hero 1536w, S6 692w) |
| Platform routes | **PASS** — shell 1240@1440 / 1320@1920 (matches global ladder) |
| Functional | **PASS** (drawer, FAQ, links, LINE URL) |
| Analytics | **PASS_WITH_WARNINGS** — LINE open OK; **GTM not loaded** on local (no `NEXT_PUBLIC_GTM_ID`) so dataLayer events empty |

**Current desktop reality (why DWC exists):** at 1920px shell stays **1320px** with **300px** side gutters — large empty black bands; reading measure already controlled.

```text
READY_FOR_DWC_02A: YES_WITH_CONDITIONS
```

Conditions: SA accepts baseline; DWC-02A limited to Core shell + Hero + S3; image replacement still NOT authorized; GTM-full analytics verify deferred to beta/host or local with GTM env.

---

## 2. Repository State

| Field | Value |
|---|---|
| Path | `/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active` |
| Branch | `ui/desktop-image-balance-d5` |
| HEAD | `167b385622beaba7f187b62bfdc42345c63380e4` |
| Message | `style(desktop): D5 image balance wrappers (≥1280)` |
| Node | v22.22.2 |
| npm | 10.9.7 |
| Tracking | branch up to date with `origin/ui/desktop-image-balance-d5` |

### Git status (unrelated / DWC docs only)

| Path | State | Notes |
|---|---|---|
| `docs/reports/desktop/DESKTOP-WIDE-CANVAS-FEASIBILITY-AUDIT.md` | untracked | DWC audit (docs) |
| `docs/reports/desktop/DESKTOP-WIDE-CANVAS-SPECIFICATION-LOCK.md` | untracked | DWC-01 lock (docs) |
| `docs/reports/desktop/DWC-01-DESKTOP-WIDE-CANVAS-SPECIFICATION-LOCK.md` | untracked | earlier draft (docs) |
| `docs/reports/phase6/RC1-REDMI-CHROME-ENVIRONMENT-ISSUE.md` | untracked | **unrelated** RC1 note — do not entangle |
| Runtime source | **clean** | no modified `.tsx/.css` in status |

**Diff summary:** no staged/unstaged runtime source diff vs HEAD.

---

## 3. Static Validation

| Check | Result |
|---|---|
| `npm run lint` | **PASS** |
| `npm run typecheck` | **PASS** |
| `npm run build` | **PASS** |
| Formatters / autofix | **Not run** |

```text
STATIC_VALIDATION: PASS
```

---

## 4. Homepage Width Matrix

Measured: `[data-mobile-shell-root]` width / max-width; header `.platform-header-frame`; section outer widths; gutters = (viewport − shell) / 2 when centered.

| VP | Shell w | Shell maxW | Header w | Hero w | S3 w | S4 w | Gutter L/R | Overflow |
|---:|---:|---|---:|---:|---:|---:|---|---|
| 375 | 375 | 430px | 375 | 375 | 375 | 375 | 0/0 | false |
| 390 | 390 | 430px | 390 | 390 | 390 | 390 | 0/0 | false |
| 430 | 430 | 430px | 430 | 430 | 430 | 430 | 0/0 | false |
| 690 | 642 | none | 690* | 642 | 642 | 642 | 24/24 | false |
| 768 | 704 | none | 768* | 704 | 704 | 704 | 32/32 | false |
| 820 | 748 | none | 820* | 748 | 748 | 748 | 36/36 | false |
| 1024 | 928 | none | 1024* | 928 | 928 | 928 | 48/48 | false |
| **1279** | **1183** | **none** | 1279* | 1183 | 1183 | 1183 | 48/48 | false |
| **1280** | **1200** | **1200px** | **1200** | **1200** | **1200** | **1200** | 40/40 | false |
| **1366** | **1240** | **1240px** | **1240** | **1240** | **1240** | **1240** | 63/63 | false |
| **1440** | **1240** | **1240px** | **1240** | **1240** | **1240** | **1240** | **100/100** | false |
| **1536** | **1320** | **1320px** | **1320** | **1320** | **1320** | **1320** | 108/108 | false |
| **1920** | **1320** | **1320px** | **1320** | **1320** | **1320** | **1320** | **300/300** | false |

\*Header frame at adaptive may report full viewport width while content shell is gutter-padded — content shell is the homepage composition authority.

### Desktop post-DWC-02 targets (not implemented)

| VP | Current shell | Target shell (DWC-02) | Delta |
|---:|---:|---:|---:|
| 1280 | 1200 | 1200 | 0 |
| 1366–1535 | 1240 | **1280** | +40 |
| 1536–1919 | 1320 | **1400** | +80 |
| ≥1920 | 1320 | **1440** | +120 |

### Section widths @1440 (current)

| Section | Outer w |
|---|---:|
| S5 / S6 / S10 / Footer | 1240 (fill shell) |

No clipping or horizontal overflow observed on matrix.

```text
HOMEPAGE_WIDTH_BASELINE: CAPTURED
DESKTOP_BASELINE: PASS
```

---

## 5. Reading Width Matrix

Rendered measure (maxW when constrained):

| VP | Hero sub | S3 desc | S4/S6/S7/S9 intro (SectionHeader-class) |
|---|---|---|---|
| 390 | 146.9 (88%) | full content ~358 | full content ~358 |
| 1279 | 412.3 (92%) | full shell text block ~1151 | ~1151 (no D3 yet) |
| **1280** | **440 / 440px** | **420 / 420px** | **640 / 640px** |
| **1440+** | **480 / 480px** | **420 / 420px** | **640 / 640px** |

**Conclusion:** D3 reading measures are **isolated from shell width** on Desktop: shell grows 1200→1320 while prose stays **640** (S3 tagline **420**, hero sub **440–480**).

```text
READING_WIDTH_BASELINE: CAPTURED
```

---

## 6. Image Readiness Matrix

### Intrinsic (filesystem)

| Asset | Intrinsic | Bytes | Classification |
|---|---|---|---|
| `public/images/hero/desktop-section-01-hero-desktop.jpeg` | **1536×1024** | ~305KB | **SOFT_WARNING** (retina @1440 CSS wants ~2×) |
| `public/images/hero/bg-ph6d-section-1-hero-v2.jpeg` | 941×1672 | — | Mobile/hidden on desktop (rendered 0 @1440) |
| `public/images/section-3/bg-hero-product-section3.jpeg` | **941×1672** | ~291KB | **READY_WITH_LIMITS** |
| `public/images/section-5/bg-why-choose-us-section5.jpeg` | **1746×901** | ~246KB | **READY** / READY_WITH_LIMITS at 1400 band |
| `public/images/section-6/bg-how-to-order-section6.jpeg` | **692×359** | ~54KB | **SOFT_WARNING** |
| `public/images/section-10/bg-final-cta-section10.jpeg` | **1254×1254** | ~339KB | **READY** (object-contain) |

### Rendered @1440 (deviceScaleFactor 1)

| Image | natural | rendered | object-fit | object-position | loading |
|---|---|---|---|---|---|
| Hero desktop | 1536×1024 | **931×710** | cover | 92% 50% | auto/priority path |
| S3 | 941×1672 | **510×376** | cover | 50% 50% | lazy |
| S5 band | 1746×901 | **1238×184** | cover | 76% 50% | lazy |
| S6 band | 692×359 | **1238×208** | cover | 50% 50% | lazy |
| S10 | 1254×1254 | **653×356** | contain | 50% 50% | auto |

### Rendered @1920 (deviceScaleFactor 1)

| Image | rendered |
|---|---|
| Hero desktop | **1118×732** (still using 1536 source) |
| S3 | 537×376 |
| S5 / S6 bands | 1318×184 / 1318×208 |
| S10 | 699×356 |

**DWC-02 rule reminder:** do not force 692px S6 across full 1400 shell without composition constraint; no asset replacement in initial patch.

```text
IMAGE_BASELINE: CAPTURED
```

---

## 7. Platform Route Baseline

Routes: `/products/nicky-pimpz-boss`, `/information/about`, `/knowledge/buying-guide`

| Route | VP | Shell w / maxW | Header w / maxW | Overflow | Console errors |
|---|---:|---|---|---|---|
| product | 390 | 390 / 430 | 390 / 430 | false | none |
| product | 1024 | 928 / none | 1024 / none | false | none |
| product | **1440** | **1240 / 1240** | **1240 / 1240** | false | none |
| product | **1920** | **1320 / 1320** | **1320 / 1320** | false | none |
| information | 390 | 390 / 430 | 390 / 430 | false | none |
| information | 1440 | 1240 / 1240 | 1240 / 1240 | false | none |
| information | 1920 | 1320 / 1320 | 1320 / 1320 | false | none |
| knowledge | 390 | 390 / 430 | 390 / 430 | false | none |
| knowledge | 1440 | 1240 / 1240 | 1240 / 1240 | false | none |
| knowledge | 1920 | 1320 / 1320 | 1320 / 1320 | false | none |

**Authority to preserve in DWC-02:** platform desktop shell remains **1200→1240→1320**, never homepage 1280/1400/1440 ladder.

```text
PLATFORM_ROUTE_BASELINE: PASS
```

---

## 8. Functional Baseline

| Check | Result |
|---|---|
| Mobile drawer open | **opened: true**, links: 8 |
| FAQ toggle | button interacts (`aria-expanded` changes) |
| Header nav hrefs | `#hero`, catalog, why, reviews, FAQ, how-to-order, footer present |
| Product links on homepage | 20 |
| Footer links | 22 |
| LINE destination | `https://lin.ee/syjmYE2` |
| window.open after CTA click (stubbed) | **correct URL** `_blank` |
| LINE CTA count (anchors) | 13 |

```text
FUNCTIONAL_BASELINE: PASS
```

---

## 9. Analytics Baseline

| Observation | Value |
|---|---|
| `window.dataLayer` exists | yes (array) |
| GTM script / ID on this local process | **not present** (`NEXT_PUBLIC_GTM_ID` not set on running dev) |
| CTA click (Hero LINE control) | opens `https://lin.ee/syjmYE2` |
| dataLayer event push on click | **0 events** in this env (adapter/GTM inactive) |
| Expected production event | `line_cta_click` via `activateLineCta` → analytics bridge |

**Interpretation:** Local without GTM validates **commerce handoff URL**, not full GTM→GA pipeline. Full parameter matrix should be re-verified on beta or local with `NEXT_PUBLIC_GTM_ID=GTM-P7MSP66X`.

```text
ANALYTICS_BASELINE: PASS_WITH_WARNINGS
```

---

## 10. Console and Runtime Baseline

| VP | Console errors/warnings (captured) | Overflow |
|---|---|---|
| 390 | none | false |
| 1024 | none (homepage matrix) | false |
| 1440 | none | false |
| 1920 | none | false |
| Platform routes | none | false |

Hydration errors: **none observed** in capture window.  
Failed network: not exhaustively logged; page loads returned 200.

```text
MOBILE_BASELINE: PASS
ADAPTIVE_BASELINE: PASS
DESKTOP_BASELINE: PASS
```

---

## 11. Regression Reference

Use this baseline to detect DWC-02 regressions:

| Signal | Baseline | Fail if after DWC-02 |
|---|---|---|
| Shell @390 | 390 / max 430 | any change |
| Shell @1279 | 1183 / none | desktop max-width applied early |
| Shell @1280 | **1200** | ≠1200 without SA |
| Shell @1440 homepage | **1240** | becomes 1280 only after DWC-02A intentional |
| Shell @1920 homepage | **1320** | becomes 1440 only after DWC-02 intentional |
| Product @1440 shell | **1240** | changes to 1280/1400/1440 |
| Reading @desktop | 640 / 420 / 480 | prose max-width increases |
| Overflow any VP | false | true |
| LINE URL | lin.ee/syjmYE2 | any other |

---

## 12. Rollback Reference

| Item | Value |
|---|---|
| Baseline HEAD | `167b385622beaba7f187b62bfdc42345c63380e4` |
| Baseline branch | `ui/desktop-image-balance-d5` |
| Global shell tokens | 1200 / 1240 / 1320 in `app/globals.css` |
| Homepage shell today | **same as global** (no homepage marker yet) |
| DWC-02A expected files | `homepage-adaptive-shell.tsx`, `globals.css` (scoped), `hero-section.tsx`, `section-3-hero-product.tsx` |
| Rollback method | Revert DWC-02 commit(s) only; do not touch untracked RC1 doc or unrelated files |
| Instant kill switch (future) | Remove homepage marker class / data attribute |

**Commands (do not run now):**

```bash
git log --oneline -5
git show 167b385 --stat
# after DWC-02: git revert <dwc02-sha>
```

---

## 13. Risks and Warnings

| ID | Warning | Severity |
|---|---|---|
| W1 | Hero desktop source 1536w vs rendered ~930–1118 CSS (soft @2×) | Medium |
| W2 | S6 source 692w stretched across shell band | Medium |
| W3 | Local analytics incomplete without GTM env | Low for layout; Medium for full contract |
| W4 | Untracked RC1 doc in worktree | Process — ignore for DWC |
| W5 | Branch is D5 feature branch, not necessarily `main` | Note when merging DWC stack |

No baseline **BLOCKED** findings for layout authority capture.

---

## 14. Final Status

```text
DWC_01B_STATUS:
PASS_WITH_WARNINGS

REPOSITORY_BASELINE:
CAPTURED

HOMEPAGE_WIDTH_BASELINE:
CAPTURED

READING_WIDTH_BASELINE:
CAPTURED

IMAGE_BASELINE:
CAPTURED

PLATFORM_ROUTE_BASELINE:
PASS

FUNCTIONAL_BASELINE:
PASS

ANALYTICS_BASELINE:
PASS_WITH_WARNINGS

MOBILE_BASELINE:
PASS

ADAPTIVE_BASELINE:
PASS

DESKTOP_BASELINE:
PASS

STATIC_VALIDATION:
PASS

READY_FOR_DWC_02A:
YES_WITH_CONDITIONS

SOURCE_CODE_CHANGED:
NO

CSS_CHANGED:
NO

ASSETS_CHANGED:
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

### Conditions before DWC-02A

1. SA accepts this baseline report.  
2. DWC-02A scope remains **Core only**: homepage marker + scoped CSS + Hero + S3.  
3. No asset replacement in 02A.  
4. Platform route shell must remain 1200/1240/1320 after 02A.  
5. Prefer GTM-enabled local or beta for post-impl analytics confirmation.

**STOP** — Pre-change baseline captured. No implementation performed.

---

## Appendix A — Machine evidence index

```text
screenshot/Desktop-screenshot/desktop-wide-canvas-baseline/shell-width-baseline.json
screenshot/Desktop-screenshot/desktop-wide-canvas-baseline/*-top.png
screenshot/Desktop-screenshot/desktop-wide-canvas-baseline/*-s3.png
```

## Appendix B — Capture environment

```text
URL: http://localhost:3001
Tool: Chrome headless via puppeteer-core
deviceScaleFactor: 1 (layout CSS px baseline)
capturedAt: (see JSON capturedAt field)
```
