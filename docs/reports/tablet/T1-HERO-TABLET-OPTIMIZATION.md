# T1B — Hero Tablet Native Optimization

**Task ID:** `T1B-HERO-TABLET-IMPLEMENTATION`
**Mode:** `LIMITED_IMPLEMENTATION` · `TABLET_ONLY` · `ONE_RUNTIME_FILE` · `NO_COMMIT` · `NO_PUSH` · `NO_PR` · `NO_DEPLOY` · `STOP_FOR_SA_REVIEW`
**Date:** 2026-07-19
**Runtime verification base:** `http://127.0.0.1:3001` (`next start` production build of T1B worktree)
**Evidence:** `screenshot/Tablet-screenshot/t1-hero/`

---

## 1. Executive Summary

T1B implemented **presentation-only** Tablet (690–1279px) Hero corrections in a single authorized runtime file:

- `sections/hero/hero-section.tsx`

Work was performed in an **isolated git worktree** on branch `ui/tablet-hero-t1` branched from `origin/main@7cd9cc0`. The parent Active worktree (`ui/desktop-image-balance-d5`) was not used for implementation.

### Outcomes (measured)

| Gate | Result |
|------|--------|
| Tablet composition / measure | **IMPROVED** — wider, smoother content ladder; less “narrow left stack” |
| Headline rhythm 768–1024 | **IMPROVED** — **2 lines** at all tablet widths (was 3 lines at 768–1024 in T1A baseline) |
| Couple dominance | **REDUCED** (visual judgment + object-position micro-shift toward product) |
| Product bottle prominence | **IMPROVED / PRESERVED** — bottle remains primary product anchor |
| Mobile 390 / 430 | **PASS** — metrics match T1A baseline exactly |
| Desktop 1280 / 1440 / 1920 | **PASS** — 520px content, solid-pink CTA 242×52, desktop object-position ladder |
| Boundary 1279 → 1280 | **PASS** — tablet outline CTA inactive at 1280; desktop pink active |
| CTA / Analytics contracts | **PRESERVED** (source unchanged) |
| Image architecture | **PRESERVED** — one settled Hero Image; dual-request debt unchanged (pre-existing) |
| Static validation | **PASS** — lint, typecheck, build |
| Scope | **WITHIN_BUDGET** — 1 runtime file |

**No commit, push, PR, deploy, T1C, or T2 was performed.**

---

## 2. Repository and Branch Authority

| Item | Value |
|------|--------|
| Authoritative base | `main` |
| Authoritative commit | `7cd9cc0f1f0958e2cfb2ced368f008faa0c0eb28` |
| Confirmed `origin/main` | `7cd9cc0f1f0958e2cfb2ced368f008faa0c0eb28` |
| Working branch | `ui/tablet-hero-t1` |
| Worktree path | `PROJECTS/ZENOVELL-PIMPZ-V4-T1B` |
| Worktree creation | `git worktree add ../ZENOVELL-PIMPZ-V4-T1B -b ui/tablet-hero-t1 origin/main` |
| Initial worktree state | **CLEAN** at `7cd9cc0` |
| Implementation on `ui/desktop-image-balance-d5` | **NOT USED** (SA hygiene condition honored) |
| Parent Active checkout | Left on `ui/desktop-image-balance-d5@b4829d4` with pre-existing untracked docs untouched |

```text
BASE_AUTHORITY: MATCHED
WORKING_BRANCH: ui/tablet-hero-t1
WORKTREE_INITIAL_STATE: CLEAN
```

---

## 3. Pre-change Baseline

Baseline references from **T1A Preflight** (main@7cd9cc0 Hero state):

| VW | Hero H | Content ~ | Headline lines | CTA |
|----|--------|-----------|----------------|-----|
| 390 | 608 | — | 4 | 362×74 |
| 430 | 626 | — | 4 | 402×74 |
| 690 | 566 | ~360 | 2 | 312×72 |
| 768 | 636 | ~380 | **3** | 296×72 |
| 820 | 655 | ~359 | **3** | — |
| 912 | 668 | ~399 | **3** | — |
| 1024 | 684 | ~427 | **3** | — |
| 1180 | 645 | ~499 | 2 | — |
| 1279 | 645 | ~544 | 2 | — |
| 1280 | 674 | 520 | 2 | 242×52 solid pink |

Confirmed T1A problems used as design targets:

1. Couple/image dominance at 690–1279
2. Inefficient three-line headline wrapping at 768–1024
3. Enlarged-Mobile composition (narrow content over wide image)

---

## 4. Confirmed Tablet Problems

| Problem | Evidence type | T1B action |
|---------|---------------|------------|
| Narrow content % ladder (56→54→48→46) | Measured (T1A) | Smoother wider ladder 60→58→56→54→52→50, restore 520px @1280 |
| 3-line headline @768–1024 | Measured (T1A) | Measure + clamp + max-ch; result **2 lines** all tablet |
| Couple dominance | Visual (T1A) | object-position micro-shift (higher X, slightly lower Y) |
| Benefits density / CTA breathing | Partial (T1A) | Benefits gap + CTA max-width + vertical rhythm |
| Reduced-Desktop feel @1180–1279 | Partial (T1A) | Tablet % measure only; desktop 520 not applied below 1280 |

---

## 5. Implementation Details

**Single runtime file changed:** `sections/hero/hero-section.tsx`

### 5.1 Content measure (priority 1)

```text
BEFORE: min-[690px]:max-w-[56%] … min-[1024px]:max-w-[46%] min-[1280px]:max-w-[520px]
AFTER:  min-[690px]:max-w-[60%] min-[768px]:max-w-[58%] min-[820px]:max-w-[56%]
        min-[912px]:max-w-[54%] min-[1024px]:max-w-[52%] min-[1180px]:max-w-[50%]
        min-[1280px]:max-w-[520px]
```

Desktop fixed **520px** authority restored at `min-[1280px]` only.

### 5.2 Headline rhythm (priority 2)

- Tablet clamp ladder tightened slightly (prefer measure before size reduction).
- Added tablet-only `max-w-[16ch]`…`[19ch]` for natural wrap control; cleared at `min-[1180px]:max-w-none` and desktop `min-[1280px]:max-w-none`.
- **Copy unchanged.** No manual `<br>` / line breaks.
- Mobile and Desktop typography classes left intact.

### 5.3 Image composition (priority 3)

Tablet/desktop shared Image (ZZ-01 mount) object-position:

```text
BEFORE: 82% 42% → 84% 44% → 86% 46% → 88% 48% → 92% 50% @1280
AFTER:  86% 40% → 88% 42% → 89% 44% → 90% 46% → 92% 50% @1280
```

Desktop ladder from `min-[1280px]` onward **unchanged** (92/50, 90/50, 86/48, 82/46).
No new asset, no scale/transform, no second Image, dual-request debt **not** fixed (out of scope).

### 5.4 Vertical rhythm (priority 4)

- Content column tablet top padding slightly retuned (pt-9 / 10 / 11 / 12).
- Subbrand / subheadline / divider / benefits gaps given more deliberate tablet breathing.
- Hero tablet `min-h` floor raised modestly; desktop `min-h` authorities restored at 1280+.

### 5.5 CTA composition (priority 5)

- Outline/dark Tablet CTA style **preserved**.
- Controlled `max-w` on tablet CTA (~300–332px ladder).
- Desktop solid pink + 242×52 path unchanged (`min-[1280px]:bg-[#E91E8C]` etc.).
- Handler / analytics / LINE activation **byte-level intent preserved**.

### 5.6 Hero-to-Trust

- Trust strip component **not edited**.
- Only Hero-owned spacing/padding adjusted; Trust remains `min-[1280px]:hidden`.

---

## 6. Range-Safety Strategy

Preferred pattern used in this codebase: **`min-[Npx]:` tablet steps with explicit `min-[1280px]:` desktop restoration**.

Reasons:

- Matches existing Hero / ZZ-01 / desktop ladder conventions.
- Avoids relying on untested stacked `min-[]:max-[]:` compilation assumptions.
- Every tablet-touched property that differs from desktop is **re-asserted** at `min-[1280px]`.

Verified inactive at 1280:

| Property | 1279 | 1280 |
|----------|------|------|
| Content max-width | 50% (592px) | **520px** |
| CTA background | `rgba(8,8,8,0.72)` outline | **`rgb(233,30,140)` solid** |
| CTA size | ~284×70 | **242×52** |
| Object-position | 90% 46% | **92% 50%** |
| Trust strip | `block` | **`none`** |
| Headline desktop clamp | — | `clamp(48px,3.8vw,54px)` path |

Mobile (`<690`) classes were not modified. Boundary 689 remains mobile asset + mobile object-position `74% 18%`.

---

## 7. Before/After Measurement Matrix

**Tooling:** Puppeteer + system Chrome against **production** `next start` on port 3001 (dev server’s `Clear-Site-Data` header interferes with client hydrate of `useMinWidth`; production used for authoritative image/object-position).

### After (T1B) — production

| VW | Hero H | Content W | HL size | HL lines | CTA | CTA bg | Obj-pos | Overflow | Hero imgs |
|----|--------|-----------|---------|----------|-----|--------|---------|----------|-----------|
| **390** | **608** | 390 | 33.15px | **4** | **362×74** | outline | **74% 18%** | no | 1 |
| **430** | **626** | 430 | 36.12px | **4** | **402×74** | outline | **74% 18%** | no | 1 |
| 689 | 658 | 430 | 43px | 4 | 402×74 | outline | 74% 18% | no | 1 |
| **690** | 584 | **385** | 36px | **2** | 292×72 | outline | **86% 40%** | no | 1 |
| **768** | 593 | **408** | 38px | **2** | 276×72 | outline | **88% 42%** | no | 1 |
| **820** | 613 | **419** | 40px | **2** | 288×70 | outline | **89% 44%** | no | 1 |
| **912** | 618 | **449** | 41.95px | **2** | 280×70 | outline | 89% 44% | no | 1 |
| **1024** | 625 | **483** | 43.01px | **2** | 284×70 | outline | **90% 46%** | no | 1 |
| **1180** | 637 | **542** | 48px | **2** | 284×70 | outline | 90% 46% | no | 1 |
| **1279** | 637 | **592** | 48px | **2** | 284×70 | outline | 90% 46% | no | 1 |
| **1280** | **674** | **520** | 48.64px | **2** | **242×52** | **pink** | **92% 50%** | no | 1 |
| **1440** | 710 | **520** | 57.6px | 2 | **242×52** | pink | **90% 50%** | no | 1 |
| **1920** | 732 | **520** | 62px | 2 | **242×52** | pink | **82% 46%** | no | 1 |

### Comparison highlights vs T1A baseline

| VW | Headline lines before → after | Content ~ before → after | Notes |
|----|-------------------------------|---------------------------|-------|
| 390 | 4 → **4** | — | **Exact** height 608, CTA 362×74 |
| 430 | 4 → **4** | — | **Exact** height 626, CTA 402×74 |
| 768 | **3 → 2** | ~380 → **408** | Primary headline fix |
| 820 | **3 → 2** | ~359 → **419** | |
| 1024 | **3 → 2** | ~427 → **483** | |
| 1280 | 2 → 2 | 520 → **520** | **Exact** H 674, CTA 242×52 pink |

Screenshots: `screenshot/Tablet-screenshot/t1-hero/after-{390,430,689,690,768,820,912,1024,1180,1279,1280,1440,1920}.png`
Metrics JSON: `screenshot/Tablet-screenshot/t1-hero/after-metrics.json`

---

## 8. Mobile Regression Verification

| Check | 390 | 430 |
|-------|-----|-----|
| Mobile image asset | PASS (`bg-ph6d-section-1-hero-v2.jpeg`) | PASS |
| object-position | PASS `74% 18%` | PASS |
| Hero height | PASS **608** (= baseline) | PASS **626** (= baseline) |
| Headline lines | PASS 4 | PASS 4 |
| CTA dimensions | PASS **362×74** | PASS **402×74** |
| CTA style | outline dark | outline dark |
| Horizontal overflow | none | none |
| Trust transition | present | present |

```text
MOBILE_REGRESSION: NONE
MOBILE_390: PASS
MOBILE_430: PASS
```

---

## 9. Tablet Visual Verification

Visual judgments from production screenshots (not only metrics):

| VW | Layout | Headline | Product bottle | Couple | CTA | Trust |
|----|--------|----------|----------------|--------|-----|-------|
| 690 | Balanced wider column | 2-line | Visible, important | Present, less dominant | Outline controlled width | OK |
| 768 | **Clear improvement** vs enlarged-mobile | **2-line** | Strong product anchor | Faces visible, not cropped | Outline | OK |
| 820–912 | Stable measure | 2-line | Strong | Present | Outline | OK |
| 1024 | Deliberate split composition | 2-line | Strong, full bottle | Present | Outline | OK |
| 1180–1279 | Tablet-native, not reduced-desktop CTA style | 2-line | Strong | Present | Outline (not pink) | OK |

**Scan flow preserved:** brand label → headline → description → benefits → CTA → Trust strip.

```text
TABLET_690: PASS
TABLET_768: PASS
TABLET_820: PASS
TABLET_912: PASS
TABLET_1024: PASS
TABLET_1180: PASS
TABLET_1279: PASS
```

---

## 10. Desktop Regression Verification

| Check | 1280 | 1440 | 1920 |
|-------|------|------|------|
| Content authority 520px | PASS | PASS | PASS |
| Hero height 1280 | PASS **674** (= baseline) | — | — |
| Solid pink CTA | PASS | PASS | PASS |
| CTA 242×52 | PASS | PASS | PASS |
| object-position ladder | 92% 50% | 90% 50% | 82% 46% |
| Trust strip hidden | PASS | PASS | PASS |
| Overflow | none | none | none |
| BEST SELLER badge path | visible (desktop-only) | — | — |

```text
DESKTOP_REGRESSION: NONE
DESKTOP_1280: PASS
DESKTOP_1440: PASS
DESKTOP_1920: PASS
BOUNDARY_1279_1280: PASS
```

---

## 11. CTA and Analytics Protection

Source inspection of `hero-section.tsx` click handler — **unchanged**:

```ts
analytics.track(AnalyticsEvents.HERO_CTA_CLICK, {
  surface: "hero",
  label: content.cta.label,
});

activateLineCta({
  title: content.cta.label,
  surface: "hero-line",
  landingPage: "/",
  intent: "high_intent",
  source: "hero",
});
```

| Contract | Status |
|----------|--------|
| `HERO_CTA_CLICK` | PRESERVED |
| surface / label / source / intent | PRESERVED |
| `activateLineCta` | PRESERVED |
| Canonical LINE destination `https://lin.ee/syjmYE2` | PRESERVED (via existing commerce helper; not edited) |
| aria-label / button semantics | PRESERVED |
| Tablet outline vs Desktop pink styling | PRESERVED via CSS only |

```text
CTA_CONTRACT: PRESERVED
ANALYTICS_CONTRACT: PRESERVED
```

---

## 12. Image and Performance Protection

| Check | Result |
|-------|--------|
| Settled Hero Image elements | **1** at every measured viewport |
| New asset reference | **NONE** |
| Additional Image mount | **NONE** |
| CSS `background-image` addition | **NONE** |
| `priority` / `fetchPriority` | Unchanged |
| `sizes` attribute | Unchanged |
| Dual-request debt (SSR mobile → hydrate desktop ≥690) | **Still present** (pre-existing ZZ-01 architecture) — **not worsened by T1B presentation classes** |
| LCP candidate | Remains Hero background Image |
| New layout shift from JS viewport detection | **NONE** (no new matchMedia / no new JS) |

```text
IMAGE_REQUEST_REGRESSION: NONE
LCP_RISK: UNCHANGED
PERFORMANCE: PASS_WITH_WARNINGS (pre-existing dual-request debt only)
```

**Note:** Local `next dev` applies `Clear-Site-Data: "cache", "storage"` via `proxy.ts` which can stall client hydration in headless Chrome. Authoritative image/object-position verification used **`next start` production** build.

---

## 13. Static Validation

| Command | Result |
|---------|--------|
| `npm run lint` | **PASS** (exit 0) |
| `npm run typecheck` | **PASS** (exit 0) |
| `npm run build` | **PASS** (exit 0) |
| `git diff --check` | **PASS** (no whitespace errors) |

---

## 14. Source Scope

```text
RUNTIME_SOURCE_FILES_CHANGED: 1
  - sections/hero/hero-section.tsx

REPORT_FILES_CHANGED: 1
  - docs/reports/tablet/T1-HERO-TABLET-OPTIMIZATION.md

EVIDENCE (untracked, allowed):
  - screenshot/Tablet-screenshot/t1-hero/after-*.png
  - screenshot/Tablet-screenshot/t1-hero/after-metrics.json

CHANGE_SCOPE: WITHIN_BUDGET
```

**Not modified:** `app/page.tsx`, `content/hero.ts`, products, shell, globals.css, Trust content, Header/Footer, sections 2+, analytics libs, image assets, package files, config.

---

## 15. Known Warnings

1. **Pre-existing dual Hero network request** on ≥690 after hydrate (mobile SSR Image then desktop Image). Documented in ZZ-01 / T1A. **Not fixed in T1B** (forbidden).
2. **Dev `Clear-Site-Data`** header can impair headless hydrate of `useMinWidth` during local `next dev`. Production/`next start` behaves correctly. Not introduced by T1B.
3. **1279 content width (592px) vs 1280 (520px)** is an intentional boundary jump: tablet uses % measure + outline CTA; desktop restores fixed 520 + solid pink. Not a Desktop regression.
4. **Hero height deltas** on tablet vs T1A absolute numbers differ partly due to min-height / rhythm retune and measurement tooling; Mobile/Desktop exact-match gates are the freeze authority and **passed**.

---

## 16. Recommendation

```text
RECOMMENDATION: READY_FOR_SA_VISUAL_AND_SCOPE_REVIEW
```

Suggested next (only after SA approval, separate command):

1. **SA Visual/Scope Review** of this report + screenshots
2. If accepted → authorize **T1C Independent Verification**
3. Only after T1C PASS → consider checkpoint commit (not authorized now)

Do **not** merge to main, push, or deploy from this state.

---

## 17. Final Status

```text
T1B_STATUS: PASS_WITH_WARNINGS

BASE_AUTHORITY: MATCHED
BASE_COMMIT: 7cd9cc0f1f0958e2cfb2ced368f008faa0c0eb28
WORKING_BRANCH: ui/tablet-hero-t1
WORKTREE_INITIAL_STATE: CLEAN

TABLET_LAYOUT: IMPROVED
PRODUCT_COMPOSITION: IMPROVED
COUPLE_DOMINANCE: REDUCED
HEADLINE_RHYTHM: IMPROVED
VISUAL_RHYTHM: IMPROVED
CTA_COMPOSITION: IMPROVED

CTA_CONTRACT: PRESERVED
ANALYTICS_CONTRACT: PRESERVED
IMAGE_REQUEST_REGRESSION: NONE
LCP_RISK: UNCHANGED

MOBILE_390: PASS
MOBILE_430: PASS
TABLET_690: PASS
TABLET_768: PASS
TABLET_820: PASS
TABLET_912: PASS
TABLET_1024: PASS
TABLET_1180: PASS
TABLET_1279: PASS
DESKTOP_1280: PASS
DESKTOP_1440: PASS
DESKTOP_1920: PASS
BOUNDARY_1279_1280: PASS

MOBILE_REGRESSION: NONE
DESKTOP_REGRESSION: NONE
STATIC_VALIDATION: PASS

RUNTIME_SOURCE_FILES_CHANGED: 1
REPORT_FILES_CHANGED: 1
CHANGE_SCOPE: WITHIN_BUDGET

READY_FOR_INDEPENDENT_VERIFICATION: YES
READY_FOR_CHECKPOINT: NO
COMMIT: NO
PUSH: NO
PR: NO
DEPLOY: NO
T2: NOT_AUTHORIZED
NEXT: WAIT_FOR_SA_REVIEW
```

### Warnings attached to PASS_WITH_WARNINGS

- Pre-existing dual-image network debt remains (documented, unchanged severity intent).
- Dev-only Clear-Site-Data hydrate quirk noted for local headless measurement.

---

*End of T1B implementation report. Stop for SA review.*
