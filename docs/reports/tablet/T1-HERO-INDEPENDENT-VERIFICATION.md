# T1C — Hero Tablet Independent Verification

**Task ID:** `T1C-HERO-INDEPENDENT-VERIFICATION`
**Mode:** `INDEPENDENT_VERIFICATION` · `READ_ONLY` · `NO_IMPLEMENTATION` · `NO_SOURCE_EDIT` · `NO_COMMIT` · `NO_PUSH` · `NO_PR` · `NO_DEPLOY` · `NO_T2`
**Date:** 2026-07-19
**Verifier role:** Independent (does not own T1B implementation decisions)
**Runtime under test:** `http://127.0.0.1:3001` · `next build` + `next start` (production) from T1B worktree
**Independent evidence:** `screenshot/Tablet-screenshot/t1-hero/independent/`
**T1B report treated as claim only:** `docs/reports/tablet/T1-HERO-TABLET-OPTIMIZATION.md` (not modified)

---

## 1. Executive Summary

Independent verification **reproduced** the material T1B claims against live production build, source diff vs `origin/main@7cd9cc0`, compiled CSS utilities, and a full viewport matrix including mandatory boundaries.

| Gate | Independent result |
|------|--------------------|
| Branch / base authority | **MATCHED** — `ui/tablet-hero-t1`, HEAD = base, 0 commits ahead |
| Runtime source scope | **PASS** — only `sections/hero/hero-section.tsx` |
| Tablet range isolation (689/690, 1279/1280) | **PASS** (runtime computed styles) |
| Mobile regression | **NONE** (390/430 exact baseline match) |
| Desktop regression | **NONE** (1280 content 520, CTA 242×52 pink, H≈674) |
| Headline 768–1024 | **2 lines** at all tablet widths (T1A claimed 3 → 2) |
| CTA / Analytics contracts | **PRESERVED** (no handler diff) |
| Image request regression | **NONE** beyond pre-existing dual-request debt |
| Static lint / typecheck / build | **PASS** (re-run independently) |
| Visual tablet quality | **IMPROVED** (layout, product, couple balance, CTA) |

```text
T1C_STATUS: PASS_WITH_WARNINGS
READY_FOR_CHECKPOINT: YES
DEFECTS_BLOCKER: 0
DEFECTS_MAJOR: 0
DEFECTS_MINOR: 4
```

No implementation edits were made during T1C. No commit / push / deploy.

---

## 2. Verification Independence

| Control | Status |
|---------|--------|
| Did not implement T1B in this phase | CONFIRMED |
| Did not edit `hero-section.tsx` during T1C | CONFIRMED (`git status` still only that M + docs/screenshots) |
| Did not rewrite T1B report | CONFIRMED |
| Did not overwrite T1B screenshots | CONFIRMED (new dir `independent/`) |
| Re-ran lint / typecheck / build | CONFIRMED |
| Re-measured all mandatory viewports | CONFIRMED |
| Used production `next start` (not trusting T1B numbers alone) | CONFIRMED |

```text
VERIFICATION_INDEPENDENCE: CONFIRMED
```

---

## 3. Repository Authority

**Worktree path:**
`/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-T1B`

| Check | Observed | Expected | Result |
|-------|----------|----------|--------|
| Branch | `ui/tablet-hero-t1` | `ui/tablet-hero-t1` | PASS |
| HEAD | `7cd9cc0f1f0958e2cfb2ced368f008faa0c0eb28` | base commit | PASS |
| `origin/main` (after fetch) | `7cd9cc0…` | same | PASS |
| merge-base HEAD origin/main | `7cd9cc0…` | base | PASS |
| Commits ahead of origin/main | **0** | 0 (no commit authorized) | PASS |
| Staged files | none | none | PASS |
| Unstaged tracked | `sections/hero/hero-section.tsx` only | 1 runtime | PASS |
| Untracked | `docs/reports/tablet/*`, `screenshot/Tablet-screenshot/t1-hero/**` | report + evidence | PASS |
| Remote branch `ui/tablet-hero-t1` | not required / not pushed | consistent with no-push | PASS |
| Parent Active worktree | `ui/desktop-image-balance-d5@b4829d4` | not used for T1 | INFO |

```text
BASE_AUTHORITY: MATCHED
WORKING_BRANCH: ui/tablet-hero-t1
HEAD_STATE: UNCOMMITTED_IMPLEMENTATION
```

---

## 4. Changed File Audit

### Against `origin/main` (tracked)

| File | Classification |
|------|----------------|
| `sections/hero/hero-section.tsx` | **AUTHORIZED_RUNTIME** |

Diffstat: `1 file changed, 15 insertions(+), 11 deletions(-)`

### Untracked artifacts

| Path | Classification |
|------|----------------|
| `docs/reports/tablet/T1-HERO-TABLET-OPTIMIZATION.md` | AUTHORIZED_REPORT |
| `docs/reports/tablet/T1-HERO-INDEPENDENT-VERIFICATION.md` | AUTHORIZED_REPORT (this file) |
| `screenshot/Tablet-screenshot/t1-hero/after-*` | AUTHORIZED_EVIDENCE (T1B) |
| `screenshot/Tablet-screenshot/t1-hero/independent/*` | AUTHORIZED_EVIDENCE (T1C) |

### Forbidden paths (explicitly checked unchanged)

| Path | Status |
|------|--------|
| `app/page.tsx` | UNCHANGED |
| `content/hero.ts` | UNCHANGED |
| `app/globals.css` | UNCHANGED |
| `package.json` / `package-lock.json` | UNCHANGED |
| `components/layout/homepage-adaptive-shell.tsx` | UNCHANGED |
| `lib/analytics/**` | not in diff |
| `lib/commerce/**` | not in diff |
| `public` assets | not in diff |

```text
SOURCE_SCOPE: PASS
AUTHORIZED_RUNTIME_FILE_ONLY: YES
```

---

## 5. Source Diff Review

### Categories of change (presentation only)

1. **Hero min-height floor (tablet steps)** — raised 520→540 … 580→600; desktop `min-[1280px]:min-h-[580px]` unchanged.
2. **object-position ladder (shared tablet/desktop Image)** — tablet steps shifted; **desktop from 1280 identical** to base:
   `92% 50% → 90% 50% → 86% 48% → 82% 46%`.
3. **Content wrapper max-width ladder** — wider smoother % steps; **`min-[1280px]:max-w-[520px]` restored**.
4. **Content column tablet padding / subbrand mb** — rhythm only; desktop pt-0 / max-w 520 restored.
5. **Headline tablet clamp + max-ch** — mobile prefix **byte-equal** to base; desktop clamp/leading/tracking restored at 1280.
6. **Subheadline / divider / benefits / CTA block max-width & spacing** — tablet-only; desktop values reasserted.
7. **CTA max-width tablet steps** — outline style unchanged; `min-[1280px]:bg-[#E91E8C]` + size path unchanged.
8. Comment only (T1B note).

### Explicitly NOT in diff

- `useMinWidth` body (string-equal to base)
- Image `src` constants, `priority`, `fetchPriority`, `sizes`
- `onClick` / `HERO_CTA_CLICK` / `activateLineCta` payload
- TrustStrip / ScrollIndicator structure
- Mobile image `object-[74%_18%]`

### Desktop properties indirectly at risk?

| Property | Desktop reasserted in source? | Runtime at 1280? |
|----------|-------------------------------|------------------|
| content max-width 520px | YES | YES 520px |
| solid pink CTA | YES | YES `rgb(233,30,140)` |
| CTA ~242×52 | YES (min-h 52, max-w-none) | YES 242×52 |
| object-position ladder | YES identical from 1280 | YES 92% 50% |
| headline desktop clamp | YES | YES ~48.64px |
| Trust hidden | YES `min-[1280px]:hidden` | YES `display:none` |

**Conclusion:** No accidental Desktop property mutation found. Desktop cascade wins at 1280.

---

## 6. Tablet Range Isolation

### Mechanism (source + compiled CSS)

T1B uses **`min-[Npx]:` steps without `max-[1279px]`** (same pattern as pre-existing Hero). Isolation is via **later `min-[1280px]:` overrides**, not exclusive media ranges.

Compiled CSS (production `.next/static/chunks/*.css`) contains utilities such as:

- `.min-\[690px\]\:max-w-\[60\%\]{max-width:60%}`
- `.min-\[1280px\]\:max-w-\[520px\]{max-width:520px}`
- `.object-\[86\%_40\%\]{object-position:86% 40%}`
- `.min-\[1280px\]\:object-\[92\%_50\%\]{object-position:92% 50%}`

### Runtime proof (computed styles)

| VW | content maxWidth | content W | CTA bg | CTA size | object-position | image | trust |
|----|------------------|-----------|--------|----------|-----------------|-------|-------|
| **689** | `none` | 430 | outline `rgba(8,8,8,0.72)` | 402×74 | **74% 18%** | **mobile** | block |
| **690** | **60%** | 385 | outline | 292×72 | **86% 40%** | **desktop asset** | block |
| **1279** | **50%** | 591.5 | outline | 284×70 | **90% 46%** | desktop asset | block |
| **1280** | **520px** | **520** | **pink `rgb(233,30,140)`** | **242×52** | **92% 50%** | desktop asset | **none** |

Also probed **691 / 1278 / 1281** — no half-applied tablet/desktop mix.

```text
TABLET_RANGE_ISOLATION: PASS
```

**Warning (MINOR):** rules are not max-bounded to 1279 in CSS text; safety proven by override + runtime. Prefer `min-[]:max-[]:` in future tablets if the team wants exclusive ranges.

---

## 7. Browser Matrix

**Mode:** production `next start -p 3001`
**Chrome:** system Google Chrome via Puppeteer
**Screenshots:** `screenshot/Tablet-screenshot/t1-hero/independent/iv-{w}.png`
**Metrics:** `…/independent/iv-metrics.json`

| VW | Hero H | Content W | HL size | HL lines | CTA | CTA style | Obj-pos | Overflow | Imgs |
|----|--------|-----------|---------|----------|-----|-----------|---------|----------|------|
| 390 | **608** | 390 | 33.15 | **4** | **362×74** | outline | 74% 18% | no | 1 |
| 430 | **626.4** | 430 | 36.12 | **4** | **402×74** | outline | 74% 18% | no | 1 |
| 689 | 658.3 | 430 | 43 | 4 | 402×74 | outline | 74% 18% | no | 1 |
| 690 | 584.2 | 385.2 | 36 | **2** | 292×72 | outline | 86% 40% | no | 1 |
| 768 | 593.1 | 408.3 | 38 | **2** | 276×72 | outline | 88% 42% | no | 1 |
| 820 | 612.8 | 418.9 | 40 | **2** | 288×70 | outline | 89% 44% | no | 1 |
| 912 | 617.5 | 449.3 | 41.95 | **2** | 280×70 | outline | 89% 44% | no | 1 |
| 1024 | 624.8 | 482.5 | 43.01 | **2** | 284×70 | outline | 90% 46% | no | 1 |
| 1180 | 636.5 | 542 | 48 | **2** | 284×70 | outline | 90% 46% | no | 1 |
| 1279 | 636.5 | 591.5 | 48 | **2** | 284×70 | outline | 90% 46% | no | 1 |
| 1280 | **674.4** | **520** | 48.64 | **2** | **242×52** | **pink** | 92% 50% | no | 1 |
| 1440 | 709.8 | **520** | 57.6 | 2 | **242×52** | pink | 90% 50% | no | 1 |
| 1920 | 731.8 | **520** | 62 | 2 | **242×52** | pink | 82% 46% | no | 1 |

Console: one non-blocking **404 resource** log observed (not a Hero contract failure; see §17).

---

## 8. Mobile Regression Results

Compared to T1A baseline authority:

| Metric | Baseline | Independent after | Match |
|--------|----------|-------------------|-------|
| 390 Hero H | 608 | **608** | YES |
| 390 HL lines | 4 | **4** | YES |
| 390 CTA | 362×74 | **362×74** | YES |
| 390 image | mobile v2 | **bg-ph6d…v2** | YES |
| 390 object-position | 74% 18% | **74% 18%** | YES |
| 430 Hero H | 626 | **626.4** | YES (≤0.5px) |
| 430 CTA | 402×74 | **402×74** | YES |
| Overflow | none | none | YES |
| Mobile class prefix (headline) | — | **equal to base** (source) | YES |

Visual (iv-390): 4-line stacked headline, full-width outline CTA, bottle + couple composition, Trust strip — **mobile authority preserved**.

```text
MOBILE_REGRESSION: NONE
MOBILE_390: PASS
MOBILE_430: PASS
```

---

## 9. Tablet Visual Results

Independent visual judgments (not copied from T1B). Confidence based on production screenshots + metrics.

### 690 (`iv-690.png`)

| Criterion | Observation | Judgment | Confidence |
|-----------|-------------|----------|------------|
| Composition | Content left ~60%, product+couple right | Intentional tablet | High |
| Headline | 2 lines, extrabold 36px | Readable | High |
| Product | Bottle full, cap/base visible | Strong anchor | High |
| Couple | Present upper-right, not covering bottle | Reduced dominance | Medium-High |
| CTA | Outline, controlled width | Balanced | High |
| Trust | Clear strip below hero | Stable | High |

### 768 (`iv-768.png`) — critical former 3-line band

| Criterion | Observation | Judgment | Confidence |
|-----------|-------------|----------|------------|
| Headline | **2 lines** continuous Thai | **IMPROVED** vs T1A 3-line | High |
| Balance | Wider text column vs T1A ~380 | Improved | High |
| Product | Large, sharp bottle | Improved/strong | High |
| Couple | Faces visible, no hard crop | OK | High |
| CTA | Not full-bleed column | Improved | High |

### 1024 (`iv-1024.png`)

| Criterion | Observation | Judgment | Confidence |
|-----------|-------------|----------|------------|
| Layout | Deliberate left stack / right visual | Medium-screen native | High |
| Headline | 2 lines @ ~43px weight 800 | Hierarchy intact | High |
| Product | Dominant product still | Improved | High |
| Couple | Visible, secondary to bottle | Reduced | High |

### 1180 / 1279 (`iv-1279.png`)

| Criterion | Observation | Judgment | Confidence |
|-----------|-------------|----------|------------|
| CTA style | Still outline dark — **not** solid pink | Range isolation | High |
| Content | % measure, not 520px | Correct tablet | High |
| Product / couple | Bottle primary; couple present | Good | High |
| Trust | Visible | Correct (<1280) | High |

### Aggregated classifications

```text
TABLET_LAYOUT: IMPROVED
PRODUCT_COMPOSITION: IMPROVED
COUPLE_DOMINANCE: REDUCED
HEADLINE_RHYTHM: IMPROVED
VISUAL_RHYTHM: IMPROVED
CTA_COMPOSITION: IMPROVED
```

**Headline hierarchy note:** Tablet clamp is modestly smaller than pre-T1B source (e.g. 690 floor 36 vs prior 38; 1024 ~43 vs prior clamp up to 54). Measured weight remains **800**. Visual hierarchy at 768–1024 is still premium and **more readable** due to 2-line measure. Not judged MAJOR hierarchy failure. Logged as **MINOR warning**.

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

## 10. Desktop Regression Results

| Check | 1280 | 1440 | 1920 |
|-------|------|------|------|
| Content 520px | **520** | **520** | **520** |
| Hero H ~674 @1280 | **674.4** | — | — |
| CTA solid pink | YES | YES | YES |
| CTA ~242×52 | **242×52** | **242×52** | **242×52** |
| object-position | 92% 50% | 90% 50% | 82% 46% |
| Trust strip | hidden | hidden | hidden |
| Outline tablet CTA leak | **NONE** | NONE | NONE |
| Overflow | none | none | none |
| BEST SELLER badge | present (desktop) | — | — |

Visual (`iv-1280.png`): desktop nav, solid pink CTA, 520 content, bottle+couple composition matches frozen desktop authority.

```text
DESKTOP_REGRESSION: NONE
DESKTOP_1280: PASS
DESKTOP_1440: PASS
DESKTOP_1920: PASS
```

---

## 11. Boundary 689 / 690

| Aspect | 689 | 690 |
|--------|-----|-----|
| Image authority | mobile jpeg | desktop jpeg |
| object-position | 74% 18% | 86% 40% |
| content maxWidth | none (mobile column) | 60% |
| Headline lines | 4 | 2 |
| CTA width | 402 | 292 |
| Overflow | no | no |
| Half-applied state | **not observed** | — |

```text
BOUNDARY_689_690: PASS
```

---

## 12. Boundary 1279 / 1280

| Aspect | 1279 | 1280 |
|--------|------|------|
| content maxWidth | 50% | **520px** |
| content width | 591.5 | **520** |
| CTA background | outline dark | **solid pink** |
| CTA size | 284×70 | **242×52** |
| object-position | 90% 46% | **92% 50%** |
| Hero height | 636.5 | **674.4** |
| Trust strip | block | **none** |
| Tablet style leak at 1280 | **NONE** | — |

```text
BOUNDARY_1279_1280: PASS
```

---

## 13. CTA and Analytics Contract

### Source

`git diff origin/main -U0 -- sections/hero/hero-section.tsx` contains **no** lines changing:

- `HERO_CTA_CLICK`
- `activateLineCta` arguments
- `surface` / `source` / `intent`
- `aria-label={content.cta.label}`
- `type="button"`

Runtime a11y sample @768:

- tag `BUTTON`, type `button`, tabIndex 0
- aria-label: `ปรึกษาผู้เชี่ยวชาญผ่าน LINE`
- focusable: **true** (document.activeElement after focus)
- outline / boxShadow focus ring present

### Destination

Canonical LINE URL still defined as:

`lib/commerce/cta-contract.ts` → `LINE_OA_URL = "https://lin.ee/syjmYE2"`

(Commerce helper file not modified by T1B.)

```text
CTA_CONTRACT: PRESERVED
ANALYTICS_CONTRACT: PRESERVED
```

---

## 14. Image and Network Results

| Viewport | Settled `#hero img` | Hero network requests (filtered) | Notes |
|----------|---------------------|----------------------------------|-------|
| 390 | **1** | **1** mobile | PASS |
| 768 | **1** | **2** (mobile SSR + desktop hydrate) | Pre-existing ZZ-01 debt |
| 1280 | **1** | **2** (same dual pattern) | Pre-existing |

No new asset paths. No CSS `background-image` Hero. `priority` / `fetchPriority` / `sizes` / `useMinWidth` unchanged in diff.

```text
IMAGE_REQUEST_REGRESSION: NONE
LCP_RISK: UNCHANGED
```

**Warning:** dual-request debt remains (known). Not a T1C failure per authorization.

---

## 15. Accessibility and Interaction

| Check | Result |
|-------|--------|
| CTA keyboard focusable | PASS |
| Focus indicator visible | PASS (outline + brand shadow) |
| Accessible name | PASS (unchanged aria-label) |
| Button semantics | PASS |
| No new pointer-only gate | PASS |
| No new animation dependency | PASS |
| Contrast / hierarchy | No material worsening observed on dark premium field |

```text
ACCESSIBILITY: PASS
```

---

## 16. Static Validation

Re-run independently in T1B worktree:

| Command | Exit | Result |
|---------|------|--------|
| `npm run lint` | 0 | **PASS** |
| `npm run typecheck` | 0 | **PASS** |
| `npm run build` | 0 | **PASS** |
| `git diff --check origin/main` | 0 | **PASS** |

```text
STATIC_LINT: PASS
STATIC_TYPECHECK: PASS
STATIC_BUILD: PASS
```

---

## 17. Defects and Warnings

### BLOCKER — none

### MAJOR — none

### MINOR

1. **Unbounded tablet `min-[*]` utilities** (no exclusive `max-[1279px]`). Mitigated by desktop reassert + runtime boundary proof. Future hardening optional.
2. **Tablet headline clamp slightly reduced** vs pre-T1B source floors; hierarchy still extrabold + 2-line readable. Not a freeze-range regression.
3. **Pre-existing dual Hero network request** on ≥690 (document only).
4. **One console 404** resource during crawl (unrelated to Hero contract; non-blocking).

### Discrepancies vs T1B report

- T1B absolute tablet Hero heights differ from this independent matrix in places (tooling / min-height retune). **Mobile/Desktop freeze numbers match.** Tablet heights are not frozen authority.
- T1B network counts sometimes counted non-hero “hero” path segments; this report filters `images/hero/*` specifically.

---

## 18. Checkpoint Recommendation

Independent verification supports advancing to **SA Checkpoint Authorization (T1D)** for:

- `sections/hero/hero-section.tsx`
- `docs/reports/tablet/T1-HERO-TABLET-OPTIMIZATION.md`
- `docs/reports/tablet/T1-HERO-INDEPENDENT-VERIFICATION.md`
- `screenshot/Tablet-screenshot/t1-hero/**`

**Still not authorized by this report alone:** commit execution, push, PR, merge, deploy, T2.

```text
READY_FOR_CHECKPOINT: YES
COMMIT: NO
PUSH: NO
PR: NO
DEPLOY: NO
T2: NOT_AUTHORIZED
NEXT: WAIT_FOR_SA_REVIEW
```

---

## 19. Final Status

```text
T1C_STATUS: PASS_WITH_WARNINGS

VERIFICATION_INDEPENDENCE: CONFIRMED
BASE_AUTHORITY: MATCHED
WORKING_BRANCH: ui/tablet-hero-t1
HEAD_STATE: UNCOMMITTED_IMPLEMENTATION

SOURCE_SCOPE: PASS
AUTHORIZED_RUNTIME_FILE_ONLY: YES
TABLET_RANGE_ISOLATION: PASS

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
ACCESSIBILITY: PASS

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
BOUNDARY_689_690: PASS
BOUNDARY_1279_1280: PASS

MOBILE_REGRESSION: NONE
DESKTOP_REGRESSION: NONE

STATIC_LINT: PASS
STATIC_TYPECHECK: PASS
STATIC_BUILD: PASS

DEFECTS_BLOCKER: 0
DEFECTS_MAJOR: 0
DEFECTS_MINOR: 4

READY_FOR_CHECKPOINT: YES
COMMIT: NO
PUSH: NO
PR: NO
DEPLOY: NO
T2: NOT_AUTHORIZED
NEXT: WAIT_FOR_SA_REVIEW
```

---

*End of T1C independent verification. Stop for SA review. No implementation changes performed.*
