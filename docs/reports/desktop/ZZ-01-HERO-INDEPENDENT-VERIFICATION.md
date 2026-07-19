# ZZ-01-V1 — Independent Hero Background Verification

**Phase:** ZZ-01-V1  
**Date:** 2026-07-19  
**Role:** Independent Browser Verification Agent · Responsive Hero QA · Next.js Image Loading Reviewer  
**Mode:** READ-ONLY · BROWSER VERIFICATION  
**Preview:** `http://localhost:3001`  
**Evidence:** `screenshot/Desktop-screenshot/zz-01-v1-independent/`  
**Raw metrics:** `screenshot/Desktop-screenshot/zz-01-v1-independent/zz01-v1-verify.json`

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

Independent cold-load verification of uncommitted ZZ-01 confirms:

| Domain | Result |
|---|---|
| Scope (runtime) | **Only** `sections/hero/hero-section.tsx` modified |
| Static validation | lint · typecheck · build **PASS** |
| Mobile visual freeze | **PASS** — mobile asset, crop, layout, CTA intact |
| Mobile network | **PASS** — only mobile Hero asset requested |
| Tablet visual | **PASS** — authorized desktop asset, coherent crop |
| Desktop visual | **PASS** — unified full-bleed composition; Wide Canvas measures intact |
| DOM image duplication | **NONE** (1 mounted `img` after hydrate) |
| Network image duplication | **PRESENT** on every viewport ≥690px |
| Hydration UI | Settles to desktop asset; dual transfer order mobile → desktop |
| CTA / a11y | **PASS** — H1, empty decorative alt, LINE CTA functional |

**Main residual risk (confirmed, not theoretical):** On Tablet/Desktop cold load with cache disabled, the browser requests and fully downloads:

1. `bg-ph6d-section-1-hero-v2.jpeg` (~276,075 bytes) — SSR / default `useMinWidth` false  
2. `desktop-section-01-hero-desktop.jpeg` (~312,292 bytes) — post-hydrate matchMedia ≥690  

SSR also emits a **preload for the mobile Hero image** on ≥690 viewports, then a second preload appears for the desktop asset after client mount.

This is a **performance debt on LCP surface**, not a visual composition failure.

```text
FINAL_DECISION: ACCEPT_WITH_PERFORMANCE_WARNING
READY_FOR_CHECKPOINT_COMMIT: YES_WITH_CONDITIONS
```

---

## 2. Repository State

| Field | Value |
|---|---|
| Branch | `ui/desktop-image-balance-d5` |
| HEAD | `97aab201955698a936e0305915539c9597c110ab` |
| HEAD message | `feat(desktop): homepage wide canvas authority (DWC-02A)` |
| Runtime modified | `sections/hero/hero-section.tsx` only (`+69 / -42`) |
| Untracked reports (docs only) | `DESKTOP-AUTHORITY-FREEZE-REVIEW.md`, `DWC-01-…`, `ZZ-01-HERO-RESPONSIVE-BACKGROUND.md`, phase6 RC1 note |
| Assets | Unchanged (desktop hero JPEG already in tree) |

### Scope gate

| Check | Result |
|---|---|
| Width ladder / globals shell | Not touched |
| Header / other sections | Not touched |
| CTA activation / analytics contracts | Not touched |
| Mobile layout classes for content | Not redesigned |
| Max 2 runtime files | **1 file** |

```text
SOURCE_SCOPE: PASS
```

---

## 3. Static Validation

| Command | Result |
|---|---|
| `npm run lint` | **PASS** (eslint clean) |
| `npm run typecheck` | **PASS** (`tsc --noEmit`) |
| `npm run build` | **PASS** (Next.js 16.2.10 Turbopack; 22 static routes) |

No autofix applied.

```text
STATIC_VALIDATION: PASS
```

---

## 4. Mobile Freeze Verification

Viewports: **375 · 390 · 414 · 430** (screenshots captured; network cold-load instrumented at 390 / 430).

### Expected authority

```text
src = /images/hero/bg-ph6d-section-1-hero-v2.jpeg
object-position = 74% 18%
```

### Observed (instrumented)

| Viewport | Active asset | object-position | natural | rendered | overflow | dual network |
|---|---|---|---|---|---|---|
| 390 | `bg-ph6d-section-1-hero-v2.jpeg` | `74% 18%` | 941×1672 | 390×608 | no | **false** |
| 430 | `bg-ph6d-section-1-hero-v2.jpeg` | `74% 18%` | 941×1672 | 430×626 | no | **false** |

### Visual (390)

- Classic mobile portrait composition retained (product + couple crop).
- Left scrim keeps Thai headline readable.
- CTA “ปรึกษาผู้เชี่ยวชาญ ผ่าน LINE” dominant and unchanged.
- Trust strip and scroll chevrons present as before.
- No desktop asset visible; no horizontal overflow.

### Network (390 cold, cache disabled)

| Request | Bytes | Status |
|---|---|---|
| `bg-ph6d-section-1-hero-v2.jpeg` | 276,075 | 200 |
| `desktop-section-01-hero-desktop.jpeg` | — | **not requested** |

Preload includes mobile Hero image only (plus unrelated S10 CTA preload).

### Mobile gates

| Gate | Result |
|---|---|
| Active asset mobile | PASS |
| Crop / object-position | PASS (`74% 18%`) |
| Hero height / content width | PASS (no layout redesign observed) |
| CTA | PASS |
| Typography | PASS |
| Horizontal overflow | PASS |
| Desktop image request | **NONE** |
| Hydration flicker to desktop | **NONE** on mobile |

```text
MOBILE_VISUAL_PROTECTION: PASS
MOBILE_NETWORK_PROTECTION: PASS
```

---

## 5. Tablet Verification Matrix

Authorized asset for ≥690:

```text
/images/hero/desktop-section-01-hero-desktop.jpeg
```

| Viewport | DOM img count | Visible asset | object-position | rendered | shellW | heroH | overflow | dual network | Class |
|---|---|---|---|---|---|---|---|---|---|
| 690 | 1 | desktop | `82% 42%` | 642×566 | 642 | 566 | no | **true** | PASS_WITH_WARNINGS |
| 768 | 1 | desktop | `84% 44%` | 704×636 | 704 | 636 | no | **true** | PASS_WITH_WARNINGS |
| 820 | 1 | desktop | `86% 46%` | 748×655 | 748 | 655 | no | **true** | PASS_WITH_WARNINGS |
| 912 | 1 | desktop | `86% 46%` | (desktop) | — | — | no | **true** | PASS_WITH_WARNINGS |
| 1024 | 1 | desktop | `88% 48%` | 928×684* | — | — | no | **true** | PASS_WITH_WARNINGS |
| 1279 | 1 | desktop | `88% 48%` | (desktop) | — | — | no | **true** | PASS_WITH_WARNINGS |

\*1024 rendered dimensions from hydration pass.

### Visual notes (768 screenshot)

- Unified full-bleed scene (not split “bg + right product column”).
- Bottle dominant; cap and pink splash clear.
- Couple faces readable as emotional context (not primary crop victim).
- Left scrim keeps headline/benefits high contrast.
- CTA contrast strong.
- Crop quality coherent from 690→1024 with stepped `object-position`.

No console hydration warnings recorded on tablet cold loads.

```text
TABLET_VISUAL_VERIFICATION: PASS_WITH_WARNINGS
```

(Warnings = network dual-load only; visual composition **PASS**.)

---

## 6. Desktop Verification Matrix

| Viewport | Visible asset | object-position | shellW | text max-w / measure | overflow | dual network | Class |
|---|---|---|---|---|---|---|---|
| 1280 | desktop | `92% 50%` | 1200 | sub max **440px**, w≈440 | no | **true** | PASS_WITH_WARNINGS |
| 1366 | desktop | `90% 50%` | — | sub max **480px** | no | **true** | PASS_WITH_WARNINGS |
| 1440 | desktop | `90% 50%` | **1280** | sub max **480px**, w=480 | no | **true** | PASS_WITH_WARNINGS |
| 1536 | desktop | `86% 48%` | **1400** | sub max **480px** | no | **true** | PASS_WITH_WARNINGS |
| 1920 | desktop | `82% 46%` | **1440** | sub max **480px** | no | **true** | PASS_WITH_WARNINGS |

### Visual notes (1440 / 1920)

- BEST SELLER badge balanced upper-right; does not steal bottle focus.
- Bottle remains visually dominant; faces not unintentionally hard-cropped.
- CTA solid pink desktop treatment readable.
- Wide Canvas ladder intact (1200 → 1280 → 1400 → 1440 shell widths).
- Hero text measure remains **440 / 480** authority (D3 protected).
- Source asset is **1536×1024** (~312 KB). At 1920 with shell 1440 rendered, image is acceptable but not tack-sharp — known **softness risk** (IMG-01 debt), not a layout defect.
- Composition is clearly better than prior right-field dual-layer model.

```text
DESKTOP_VISUAL_VERIFICATION: PASS_WITH_WARNINGS
WIDTH_AUTHORITY_PROTECTION: PASS
TEXT_READABILITY: PASS
```

---

## 7. Network Request Matrix

Method: Puppeteer Chromium · **cache disabled** · hard navigation · `networkidle2` · Hero URL filter `/images/hero/`.

### Required cold loads

| Viewport | Hero requests (order) | Bytes transferred | Both assets? | Unused finished? | Wrong preload? |
|---|---|---|---|---|---|
| **390** | mobile only | 276,075 | no | n/a | no (mobile correct) |
| **768** | mobile → desktop | 276,075 + 312,292 | **YES** | yes (mobile unused after swap) | **YES** — mobile preloaded on ≥690 |
| **1024** | mobile → desktop | 276,075 + 312,292 | **YES** | yes | **YES** |
| **1440** | mobile → desktop | 276,075 + 312,292 | **YES** | yes | **YES** |
| **1920** | mobile → desktop | 276,075 + 312,292 | **YES** | yes | **YES** |

Additional cold loads **690 · 820 · 912 · 1279 · 1280 · 1366 · 1536** all showed the same dual-request pattern.

### Classification

```text
DOM_IMAGE_DUPLICATION: NONE
NETWORK_IMAGE_DUPLICATION: PRESENT
```

### Root cause (code review, no modification)

```ts
const [matches, setMatches] = useState(false); // SSR + first client paint → mobile branch
// useEffect matchMedia → true on ≥690 → unmount mobile Image, mount desktop Image
```

SSR HTML always paints the **mobile** `next/image` with `priority` + `fetchPriority="high"`, which:

1. Starts mobile image network fetch on Tablet/Desktop  
2. Emits `link rel=preload as=image` for the mobile Hero path  
3. After hydrate, desktop image mounts with its own priority/preload  

Mobile is correctly **single-request**. Tablet/Desktop always pay **~276 KB wasted** on cold load under disable-cache conditions.

Desktop asset was **not** observed double-fetched as two desktop URLs; duplication is **mobile + desktop**, not desktop×2.

---

## 8. Hydration Behavior

Instrumented at **768 · 1024 · 1440** with 1.5 Mbps throttle.

| Viewport | Early DOM (after networkidle2) | Late DOM | Request order | Console hydration error |
|---|---|---|---|---|
| 768 | desktop | desktop | mobile → desktop | none |
| 1024 | desktop | desktop | mobile → desktop | none |
| 1440 | desktop | desktop | mobile → desktop | none |

Interpretation:

- By `networkidle2`, client hydrate has already swapped to desktop (early === late desktop).
- Network order still proves mobile was requested **first**.
- On very slow devices / CPU, a short **mobile paint then swap** remains possible before React commits desktop branch.
- No React hydration mismatch errors observed in console.
- Layout shift of content stack not measured as catastrophic; image crop jump possible if mobile portrait paints before landscape desktop.

```text
HYDRATION_BEHAVIOR: MINOR_FLASH
```

(Not `VISIBLE_SWAP` as dominant UX on local LAN after settle; not `HYDRATION_FAILURE`.)

---

## 9. Image Performance Assessment

| Factor | Observation | Risk |
|---|---|---|
| LCP candidate | Hero background Image with priority | High sensitivity |
| Duplicate transfer ≥690 | ~276 KB mobile + ~312 KB desktop ≈ **588 KB** Hero bytes | Material |
| Mobile bandwidth | Mobile only ~276 KB Hero | Low |
| Tablet bandwidth | Dual full JPEGs on cold load | **Medium–High** on cellular |
| Preload priority | Mobile preloaded even when viewport ≥690 | Wrong active asset priority |
| `sizes` desktop | `(max-width: 1023px) 100vw, … 1280px, 1440px` | Reasonable after mount |
| Source dimensions | Desktop 1536×1024 into up to 1440-wide shell | Mild upscale / soft at 1920 |
| Layout shift | Single final DOM image; swap may shift crop | Low–Medium |
| Decoded size | natural 1536×1024 desktop | OK for shell ≤1440 |

```text
PERFORMANCE_RISK: MEDIUM
IMAGE_READINESS: PASS_WITH_WARNINGS
```

**Why not HIGH:** Mobile path is clean; waste is one extra ~276 KB JPEG (not multi-MB); DOM never double-renders long-term; visual LCP still lands on correct desktop asset after hydrate on typical desktop broadband.

**Why not LOW:** Hero is LCP; dual full downloads + wrong preload on every tablet/desktop first visit is architecturally avoidable and harms tablet-on-cellular most.

---

## 10. Visual Composition Assessment

Independent judgment:

| Question | Answer |
|---|---|
| Does new Tablet/Desktop background improve Hero quality? | **Yes** — single continuous composition |
| Crop coherent across Tablet widths? | **Yes** — stepped object-position 82%→88% |
| Desktop better than prior right-field model? | **Yes** — bottle + couple + splash read as one scene |
| Any breakpoint visibly weaker? | **1920** mild softness (source 1536); not composition fail |
| Background overpower text/CTA? | **No** — left scrim sufficient |
| Softness acceptable? | **Yes for checkpoint** with IMG-01 deferred |

Screenshots: `v1-hero-{375,390,414,430,690,768,820,1024,1279,1280,1440,1536,1920}.png`

```text
RESPONSIVE_ART_DIRECTION: PASS
```

---

## 11. CTA and Accessibility Protection

| Check | Result |
|---|---|
| Hero heading is `H1` | **PASS** — `ปลุกความมั่นใจให้กลับมาเป็นคุณ` |
| Decorative bg `alt=""` + `aria-hidden` | **PASS** |
| CTA accessible name | **PASS** — `aria-label="ปรึกษาผู้เชี่ยวชาญผ่าน LINE"` |
| CTA click functional | **PASS** — `window.open` → `https://lin.ee/syjmYE2` `_blank` |
| LINE destination unchanged | **PASS** |
| Duplicate CTA DOM | **PASS** — 1 primary CTA node |
| Duplicate Hero image in a11y tree | **PASS** — 1 decorative img after hydrate |
| Keyboard focus | Not fully automated; no new interactive layers on background |

```text
CTA_PROTECTION: PASS
ACCESSIBILITY_PROTECTION: PASS
```

---

## 12. Risks and Warnings

### Confirmed

1. **NETWORK_IMAGE_DUPLICATION PRESENT** on all ≥690 cold loads (~276 KB waste).  
2. **SSR preload targets mobile Hero** on Tablet/Desktop before hydrate swap.  
3. **Desktop source 1536×1024** may look soft on large shells (known IMG-01).  
4. **Potential brief mobile-frame flash** on slow CPU before matchMedia commit (classified MINOR_FLASH).

### Not observed / not blocking

- DOM dual-image after settle  
- Mobile downloading desktop asset  
- Horizontal overflow  
- CTA / LINE contract break  
- Width authority regression  
- Hydration React errors  
- Scope creep beyond Hero runtime file  

### Optional corrective directions (out of V1 scope — do not implement here)

| Option | Idea | Tradeoff |
|---|---|---|
| A | CSS-only dual `<Image>` with `media` / `picture` (if Next supports) | Avoid client JS gate |
| B | Default `useState` from `window` only in effect + accept no SSR image / placeholder | May delay LCP paint |
| C | Server hint cookie / ClientHints for ≥690 | Complexity |
| D | Accept debt; fix in production-perf pass | Fastest checkpoint |

---

## 13. Commit Recommendation

### Independent decision matrix (required choice)

| Option | Selected? | Rationale |
|---|---|---|
| A. ACCEPT_ZZ_01 | No | Would imply full image-loading PASS — dual network fails that bar |
| **B. ACCEPT_WITH_PERFORMANCE_WARNING** | **YES** | Visual/mobile/scope/static all green; dual load confirmed and documented |
| C. CORRECT_IMAGE_LOADING_BEFORE_COMMIT | No | Valid if SA requires zero dual-byte waste before checkpoint; not required for visual accept |
| D. CORRECT_VISUAL_COMPOSITION_BEFORE_COMMIT | No | Composition approved and re-confirmed |
| E. REJECT_AND_ROLLBACK | No | No visual or mobile regression warranting rollback |

### Checkpoint conditions

Checkpoint **allowed** only if SA accepts:

1. Status block below committed as truth (DOM none / NETWORK present).  
2. Follow-up ticket optional: **ZZ-01-PERF** (or fold into production readiness) for SSR-safe single-asset load on ≥690.  
3. Softness at 1536/1920 remains **IMG-01**, not ZZ-01 layout fix.  
4. No push / PR / deploy with this checkpoint unless separately authorized.

```text
READY_FOR_CHECKPOINT_COMMIT: YES_WITH_CONDITIONS
```

---

## 14. Final Status

```text
ZZ_01_V1_STATUS:
PASS_WITH_WARNINGS

MOBILE_VISUAL_PROTECTION:
PASS

MOBILE_NETWORK_PROTECTION:
PASS

TABLET_VISUAL_VERIFICATION:
PASS_WITH_WARNINGS

DESKTOP_VISUAL_VERIFICATION:
PASS_WITH_WARNINGS

RESPONSIVE_ART_DIRECTION:
PASS

DOM_IMAGE_DUPLICATION:
NONE

NETWORK_IMAGE_DUPLICATION:
PRESENT

HYDRATION_BEHAVIOR:
MINOR_FLASH

TEXT_READABILITY:
PASS

CTA_PROTECTION:
PASS

WIDTH_AUTHORITY_PROTECTION:
PASS

ACCESSIBILITY_PROTECTION:
PASS

IMAGE_READINESS:
PASS_WITH_WARNINGS

PERFORMANCE_RISK:
MEDIUM

STATIC_VALIDATION:
PASS

SOURCE_SCOPE:
PASS

FINAL_DECISION:
ACCEPT_WITH_PERFORMANCE_WARNING

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

## Appendix A — Implementation snapshot (read-only)

- Breakpoint gate: `useMinWidth(690)` default `false`  
- Mobile mount: `!isTabletOrDesktop` → `bg-ph6d-section-1-hero-v2.jpeg`  
- Wide mount: `isTabletOrDesktop` → `desktop-section-01-hero-desktop.jpeg`  
- Desktop object-position ladder: `82% 42%` → `84% 44%` → `86% 46%` → `88% 48%` → `92% 50%` → `90% 50%` → `86% 48%` → `82% 46%`  
- Mobile scrims: `min-[690px]:hidden`  
- Wide scrims: `hidden min-[690px]:block`

## Appendix B — Evidence paths

```text
screenshot/Desktop-screenshot/zz-01-v1-independent/zz01-v1-verify.json
screenshot/Desktop-screenshot/zz-01-v1-independent/v1-hero-*.png
docs/reports/desktop/ZZ-01-HERO-INDEPENDENT-VERIFICATION.md  (this file)
docs/reports/desktop/ZZ-01-HERO-RESPONSIVE-BACKGROUND.md     (implementation self-report)
```

## Appendix C — Stop condition

ZZ-01-V1 stops after this report. No source/CSS/asset mutation. No commit. Await SA decision on:

1. Checkpoint commit under **YES_WITH_CONDITIONS**, or  
2. Limited **image-loading corrective patch** before commit (option C path).
