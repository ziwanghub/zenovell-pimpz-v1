# Desktop Wide Canvas — Architecture Feasibility Audit

**Date:** 2026-07-19  
**Repository:** `ZENOVELL-PIMPZ-V4-Active`  
**Mode:** **READ-ONLY** · Architecture + Feasibility only  
**Implementation:** NO · **Commit:** NO · **Push:** NO · **PR:** NO · **Deploy:** NO  
**Inspected branch (local):** `ui/desktop-image-balance-d5` @ `167b385` (D5 present; D1–D5 work represented on/near mainline trajectory)  

---

## 1. Executive Summary

The homepage **can** support a wider Desktop “full-screen composition” **without** rewriting Mobile or Adaptive — **if and only if** width expansion is **homepage-scoped** and **section-selective**, and **D3 reading measures stay locked**.

| Finding | Evidence-based conclusion |
|---|---|
| Current model | Full-viewport page background + **controlled shell max-width** + section-local containers + narrow text measure (D3) |
| Desktop gate | **`min-width: 1280px`** (CSS vars) + widespread `min-[1280px]:` utilities |
| Width ownership | **Central shell** in `globals.css` **and** **scattered section max-widths** |
| Critical coupling | `PlatformAdaptiveShell` + `.platform-adaptive-shell` used by **homepage AND product/information/knowledge** |
| GlobalHeader | Shared component; width via **global** `.platform-header-frame` |
| Safest path | **Option 2 + Option 3**: homepage-only wide shell + selective visual section wrappers |
| Unsafe path | **Option 1** (global max-width bump) → hits platform routes + shared header |
| Target model SA prefers | Compatible with repo evidence |

```text
CURRENT_SYSTEM_SUPPORTS_WIDE_CANVAS: YES_WITH_LIMITS
RECOMMENDED_OPTION: OPTION_2 + OPTION_3 (documented as hybrid)
IMPLEMENTATION: NO (this audit only)
```

---

## 2. Current Layout Architecture

### 2.1 Composition tree (homepage)

```text
app/page.tsx
└─ <main>  (full-viewport bg token)
   └─ HomepageAdaptiveShell
      └─ PlatformAdaptiveShell.platform-adaptive-shell
         └─ MobileShell [data-mobile-shell-root]
            ├─ GlobalHeader  (.platform-header-frame)
            ├─ HeroSection
            ├─ Section2 … Section11
```

### 2.2 Shell roles

| Component | File | Role |
|---|---|---|
| `MobileShell` | `components/layout/mobile-shell.tsx` | Base wrapper `max-w-[430px]` in markup; **overridden** by parent CSS var on adaptive/desktop |
| `PlatformAdaptiveShell` | `components/layout/platform-adaptive-shell.tsx` | Applies `platform-adaptive-shell` class + optional `className` |
| `HomepageAdaptiveShell` | `components/layout/homepage-adaptive-shell.tsx` | Homepage-only wrapper; currently **only** sets page bg — **no unique width tokens** |
| CSS authority | `app/globals.css` `@layer components` | Defines `--platform-shell-max-width`, gutters, header frame max-width |

### 2.3 How width is actually enforced

```css
.platform-adaptive-shell > [data-mobile-shell-root] {
  max-width: var(--platform-shell-max-width) !important;
}
```

| Breakpoint | `--platform-shell-max-width` | Header `.platform-header-frame` |
|---|---|---|
| default (mobile) | `430px` | `430px` |
| ≥690px (adaptive) | `none` | `none` |
| ≥1280px | **`1200px`** | **`1200px`** |
| ≥1366px | **`1240px`** | **`1240px`** |
| ≥1536px | **`1320px`** | **`1320px`** |

**Body / main** already paint full viewport; “canvas” emptiness outside shell is page background — not a second layout tree.

### 2.4 Dual width system (important)

Desktop content width is **not** owned by one place only:

1. **Shell** — hard cap via `!important` on MobileShell root  
2. **Section-local** — e.g. Hero / S3 `min-[1280px]:max-w-[1200px]` … `1320px`  
3. **Reading measure (D3)** — `max-w-[640|560|420|480px]` on text blocks  
4. **Sub-containers** — S9 `768px`, S10 `1080px`, S2 trust `920px`

Widening only the shell **without** touching section-local caps leaves Hero/S3 at old widths.  
Widening only sections **without** shell leaves shell clipping at 1200–1320.

---

## 3. Responsive Authority Map

| Range | Authority | Shell max-width | Desktop polish tokens |
|---|---|---|---|
| **&lt;690px** | Mobile Design Authority (frozen) | 430px | Off |
| **690–1279** | Adaptive / transitional | `none` (fluid + gutters) | Off (`min-[1280px]` / `@media 1280`) |
| **≥1280** | Desktop refinement lane | 1200 → 1240 → 1320 | D1–D5 active |

### Isolation mechanism (verified)

- Desktop polish and most section desktop layout use **`min-[1280px]:`** utilities.  
- Shell desktop width uses **`@media (min-width: 1280px)`** on `.platform-adaptive-shell`.  
- Adaptive gutters step at 690 / 768 / 820 / 912 / 1024 **without** adopting desktop max-width until 1280.

**Edge 1279:** shell still `max-width: none` (adaptive fluid) — correct isolation from desktop tokens.

---

## 4. Container Ownership Map

| Layer | Owner | Desktop value | Scope |
|---|---|---|---|
| Page background | `body` / `<main>` | Full viewport | Global visual |
| Shell width | `globals.css` → MobileShell | 1200 / 1240 / 1320 | **All** `PlatformAdaptiveShell` consumers |
| Header width | `.platform-header-frame` | mirrors shell | **All** GlobalHeader instances |
| Hero outer | `hero-section.tsx` | 1200 / 1240 / 1320 | Homepage Hero only |
| S3 outer | `section-3-hero-product.tsx` | 1200 / 1240 / 1320 | Homepage S3 only |
| S4–S8, S11 grids | section files | fill shell (padding/grid) | Homepage sections |
| S9 list | `section-9-faq.tsx` | **768px** (narrow) | FAQ only |
| S10 blocks | `section-10-final-cta.tsx` | **1080px** inner | Final CTA only |
| Reading measure | SectionHeader + locals (D3) | **640 / 560 / 420–480** | Text, not shell |

---

## 5. Shared Component Dependency Map

| Surface | Used by | Width coupling | Wide-canvas risk |
|---|---|---|---|
| `PlatformAdaptiveShell` | Homepage, Products, Information, Knowledge | **High** — shared CSS class | Changing global tokens affects **all routes** |
| `MobileShell` | via PlatformAdaptiveShell | High (target of `!important` max-width) | Do not remove; override via scoped CSS only |
| `GlobalHeader` | Homepage + PlatformPageHeader (product/info/knowledge) | **High** — `.platform-header-frame` global | Must scope header max-width with homepage parent selector if homepage widens alone |
| `SectionHeader` | Homepage S4, S6, S7, S8, S9 only | Low for shell; owns description **640px** | Keep D3 measure; do not widen description with shell |
| `activateLineCta` / `LINE_OA_URL` | CTAs across landing | None for width | **Do not touch** for canvas work |
| GTM / analytics bootstrap | Root layout | None for width | **Do not touch** |
| Image `fill` wrappers | Section-local | Medium | D5 wrappers section-local; safe if unchanged |
| Product platform components | Product routes | Own layouts under same shell | Protect from global shell widen |

**SectionHeader is homepage-only today** (no product/info/knowledge imports found). Safe for homepage typography/measure; still must not be used as a “page widen” lever.

---

## 6. Section-by-Section Feasibility

| Section | Classification | Justification |
|---|---|---|
| **S1 Hero** | **WIDE_VISUAL_CANDIDATE** | Already dual-mode desktop composition; outer max-w mirrors shell; subheadline measure locked; SA allows; **Hero Authority — layout width only, no typography/CTA redesign** |
| **S2 Trust** | **KEEP_CURRENT_WIDTH** | Trust/editorial; already local caps 720/640/920; widening shell alone is enough or keep denser trust band |
| **S3 Featured Product** | **WIDE_VISUAL_CANDIDATE** | Two-column product stage; own max-w ladder; image balance (D5) local — can step outer width with shell |
| **S4 Catalog** | **KEEP_CURRENT_WIDTH** / **DO_NOT_CHANGE** (cards) | Product cards + grid; full-width stretch of cards is **redesign risk**; keep under shell or mild shell widen only — **no card redesign** |
| **S5 Why Choose** | **WIDE_VISUAL_CANDIDATE** | Feature grid + promo band; benefits from wider canvas; text intro stays 640 |
| **S6 How to order** | **WIDE_VISUAL_CANDIDATE** | 3-col steps + promo; width helps composition; step copy measure stays local |
| **S7 Privacy** | **KEEP_CURRENT_WIDTH** | Text/privacy dense; D3 support widths 420–480; avoid billboard stretch |
| **S8 Reviews** | **KEEP_CURRENT_WIDTH** | 3-col cards OK at current shell; body measure/disclaimer 640; thumb D5 local |
| **S9 FAQ** | **KEEP_CURRENT_WIDTH** | Intentionally **768** list — reading UX; **do not widen answers to shell** |
| **S10 Final CTA** | **WIDE_VISUAL_CANDIDATE** | Visual + CTA climax; inner 1080 may step up modestly; description **640** stays |
| **S11 Footer** | **WIDE_SHELL_ONLY** | Can track homepage shell for columns; body description **640**; no full-bleed text |
| **GlobalHeader** | **WIDE_SHELL_ONLY** (homepage-scoped) | Must align with homepage shell; implement via **parent-scoped CSS**, not unscoped header token change |
| **Mobile drawer** | **DO_NOT_CHANGE** | Drawer widths `max-w-[min(92vw,380px)]` etc. independent; protect |

### Classification legend (as used)

- **KEEP_CURRENT_WIDTH** — do not expand section content beyond current intent  
- **WIDE_VISUAL_CANDIDATE** — may use wider outer composition at ≥1280  
- **WIDE_SHELL_ONLY** — track shell; no full-width copy  
- **DO_NOT_CHANGE** — frozen behavior / high regression  
- **REQUIRES_REDESIGN** — **none required** for preferred model  

---

## 7. Mobile and Adaptive Protection Analysis

### 7.1 Mobile (&lt;690, esp. 375–430)

| Risk | Status | Notes |
|---|---|---|
| Shell 430 | Protected | Default CSS + MobileShell |
| `min-[1280px]:` leakage | **Low** if implementation stays gated | Audit shows D1–D5 follow this |
| Shared header drawer | Independent of desktop max-w | Do not alter drawer for canvas |
| MobileShell markup `max-w-[430px]` | Overridden only via parent CSS var | Do not delete MobileShell |

### 7.2 Adaptive (690–1279)

| Risk | Status | Notes |
|---|---|---|
| Shell `max-width: none` | Fluid by design | Wider desktop tokens must **not** activate at 1024/1279 |
| Gutters 24–48px | Separate CSS vars | Leave tablet gutter ladder alone |
| `md:` conflicts | Known (D5 S6/S10) | Future canvas work must prefer `min-[1280px]:` / important-safe patterns |

### 7.3 Explicit mobile/adaptive protection rules for any future impl

1. No changes to MobileShell **unless** purely additive data-attribute.  
2. No reduction of Adaptive isolation (do not set shell max-width below 1280).  
3. Homepage-only class must not apply width rules outside `@media (min-width: 1280px)`.  
4. Prohibit editing product card internal grids for “fill wide canvas”.

**MOBILE_ISOLATION:** PASS (architecture supports isolation)  
**ADAPTIVE_ISOLATION:** PASS (with discipline on `md:` vs `min-[1280px]`)  
**DESKTOP_BREAKPOINT_ISOLATION:** PASS  

---

## 8. Route Impact Analysis

| Route group | Shell | Header | Impact of **global** shell widen | Impact of **homepage-only** shell |
|---|---|---|---|---|
| `/` homepage | HomepageAdaptiveShell → PlatformAdaptiveShell | GlobalHeader | Direct | Intended |
| `/products/[slug]` | PlatformAdaptiveShell | PlatformPageHeader → GlobalHeader | **Unintended widen** | **None** (if scoped) |
| `/information/*` | PlatformAdaptiveShell | same | **Unintended** | **None** |
| `/knowledge/*` | PlatformAdaptiveShell | same | **Unintended** | **None** |

**Conclusion:** Homepage-only implementation is **FEASIBLE** and **required** for route protection.  
Global width change is **NOT_RECOMMENDED**.

Platform product content often assumes compact columns (`max-w-[430px]` in some product blocks) nested in a shell that already opens at adaptive/desktop — further global widen increases empty margin risk on product pages without design pass.

---

## 9. CTA and Analytics Protection Analysis

| Contract | Location | Canvas coupling |
|---|---|---|
| `LINE_OA_URL` | `lib/commerce/cta-contract.ts` | None |
| `activateLineCta` | `lib/commerce/cta-activation.ts` | None |
| GTM | `components/analytics/*`, root layout | None |
| D1 mid-page CTA hide | section wrappers `min-[1280px]:hidden` | Orthogonal to width — **do not reverse** when widening |
| Header LINE CTA | GlobalHeader | Layout only; keep analytics handlers |

**CTA_CONTRACT_PROTECTION:** PASS (if impl avoids CTA markup/handler edits)  
**ANALYTICS_CONTRACT_PROTECTION:** PASS (if GTM/activation files untouched)

---

## 10. Option Comparison

| Option | Description | Mobile/Adaptive | Platform routes | D1–D5 | Maintainability | Verdict |
|---|---|---|---|---|---|---|
| **1** Global desktop max-width | Raise `--platform-shell-max-width` + header in `globals.css` | OK if ≥1280 only | **HIT** product/info/knowledge | Mostly OK | Simple but **coupled** | **NOT_RECOMMENDED** |
| **2** Homepage-only wide shell | Class on `HomepageAdaptiveShell` + scoped CSS | Strong | Protected | Strong | Clean SSOT for homepage canvas | **RECOMMENDED core** |
| **3** Selective section wrappers | Adjust Hero/S3/S5/S6/S10 outer max-w only | Strong | Protected | Strong | Needed where section caps &lt; shell | **RECOMMENDED complement** |
| **4** Separate Desktop Native tree | Duplicate composition | Risky dual maintenance | Isolatable | High rewrite cost | **LARGE** | **NOT_RECOMMENDED** now |

### Hybrid (recommended)

```text
Option 2: Homepage-only wide desktop shell
+
Option 3: Selective wide wrappers (S1, S3, S5, S6, S10; header/footer shell-aligned)
+
Preserve D3 reading measure (640/560/420–480)
+
No change below 1280px
+
No global PlatformAdaptiveShell token bump
```

This matches SA’s preferred direction and repository evidence.

---

## 11. Recommended Architecture

```text
┌─────────────────────────────────────────────────────────┐
│  Viewport / body background (already full-width)        │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Homepage shell (NEW scoped max-width ≥1280)       │  │
│  │  Header frame (scoped to match shell)             │  │
│  │  ┌─ Visual sections (wide candidates) ──────────┐ │  │
│  │  │ Hero / S3 / S5 / S6 / S10  outer composition │ │  │
│  │  └──────────────────────────────────────────────┘ │  │
│  │  ┌─ Controlled sections ────────────────────────┐ │  │
│  │  │ S2 / S4 / S7 / S8 / S9  keep density         │ │  │
│  │  └──────────────────────────────────────────────┘ │  │
│  │  Text blocks: D3 max-width unchanged               │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Desired width study (compatibility only — **not implemented**)

| Viewport | Target content width | vs current shell | Rating |
|---|---|---|---|
| **1280** | 1120–1180 | Current **1200** already ≥ target band | **SAFE** (already satisfied; further widen unnecessary at 1280) |
| **1440** | 1200–1280 | Current **1240** (from 1366 token) mid-band | **SAFE** |
| **1920** | 1320–1440 | Current cap **1320** | **SAFE_WITH_LIMITS** (step to ~1400–1440 homepage-only; avoid &gt;1440 without design) |

**Not recommended:** content width tracking full 1920 viewport (full-bleed cards/text).

Suggested **homepage-only** ladder (for future SA approval — illustrative):

| Breakpoint | Current (global) | Future homepage-only (example) |
|---|---|---|
| 1280 | 1200 | **1200** (hold) |
| 1366–1440 | 1240 | **1280–1320** |
| 1536+ | 1320 | **1400–1440** max |

Section-local Hero/S3 ladders must be updated **in lockstep** with homepage shell or remain ≤ shell.

---

## 12. Files That May Be Modified

*(Only after SA GO — not in this audit)*

| File | Purpose |
|---|---|
| `components/layout/homepage-adaptive-shell.tsx` | Add homepage scope class / data attribute |
| `app/globals.css` | Homepage-scoped `@media (min-width: 1280px+)` shell + header frame max-width |
| `sections/hero/hero-section.tsx` | Outer max-w ladder only (optional sync) |
| `sections/section-3-hero-product/section-3-hero-product.tsx` | Outer max-w ladder only (optional sync) |
| `sections/section-5-why-choose-us/section-5-why-choose-us.tsx` | Optional outer container if needed |
| `sections/section-6-how-to-order/section-6-how-to-order.tsx` | Optional outer container if needed |
| `sections/section-10-final-cta/section-10-final-cta.tsx` | Optional raise of **1080** inner cap only |
| `sections/section-11-footer/section-11-footer.tsx` | Shell alignment only |
| Future: `docs/reports/desktop/DESKTOP-WIDE-CANVAS-*.md` | Implementation report |

---

## 13. Files That Must Not Be Modified

*(For a Wide Canvas phase — freeze list)*

| File / area | Reason |
|---|---|
| `components/layout/mobile-shell.tsx` logic/430 contract | Mobile Authority |
| Global `.platform-adaptive-shell` desktop tokens **unscoped** | Would hit platform routes |
| Global `.platform-header-frame` desktop tokens **unscoped** | Shared header |
| `lib/commerce/cta-contract.ts` / `cta-activation.ts` | CTA contract |
| Analytics / GTM components | Analytics contract |
| Product card internals (S4 card components) | No card redesign |
| FAQ answer measure (560) / SectionHeader description (640) | D3 Authority |
| Hero **typography / CTA structure** | Hero Authority (width shell only if needed) |
| Drawer markup/behavior | Mobile nav freeze |
| `app/(platform)/**` product/info/knowledge content redesign | Route protection |
| Image **assets** / crop files | Asset freeze |
| Below-1280 utilities as primary levers (`md:` mass edits) | Adaptive protection |

---

## 14. Risk Matrix

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Global shell widen breaks product pages | High if Option 1 | High | Homepage-only CSS scope |
| Header misaligned vs content | High if shell≠header | Medium | Scope `.platform-header-frame` under homepage class |
| Hero/S3 stay narrow inside wide shell | Medium | Low–Med | Option 3 sync outer max-w |
| Text lines re-stretch (undo D3) | Medium if naive | High | Never raise 640/560 text caps |
| S4 cards look sparse / stretched | Medium | High | KEEP_CURRENT_WIDTH; no grid redesign |
| Adaptive `md:` override bugs | Medium | Medium | Prefer `min-[1280px]:` / verified cascade |
| 1920 ultra-wide empty gutters | Medium if &gt;1440 | Medium | Cap homepage shell ~1440 |
| CTA/analytics regression | Low | Critical | No handler edits |
| Mobile drawer regression | Low | High | Do not touch drawer |

---

## 15. Validation Plan

*(For future implementation phase — not run as code change in this audit)*

### Viewport matrix

`375 · 390 · 430 · 690 · 768 · 820 · 1024 · 1279 · 1280 · 1366 · 1440 · 1536 · 1920`

### Must confirm

| Check | Pass criteria |
|---|---|
| Mobile identical | Pixel/layout parity vs pre-change on 390 |
| Adaptive identical | 768/1024/1279 unchanged shell behavior |
| Desktop shell width | Homepage matches approved ladder only |
| Platform routes | Product/info/knowledge shell **unchanged** |
| D3 measures | Descriptions still 640; FAQ 560; support 420–480 |
| D1 CTA density | Mid-page hide still ≥1280 |
| Header alignment | Header max-w equals homepage shell |
| Overflow | `scrollWidth === clientWidth` all matrix |
| CTA | `activateLineCta` + LINE URL unchanged |
| Analytics | `dataLayer` event names/params unchanged |

### Route smoke

- `/` desktop widen visual  
- `/products/[slug]` desktop = baseline  
- `/information/*`, `/knowledge/*` desktop = baseline  

---

## 16. Go / No-Go Recommendation

| Decision | Recommendation |
|---|---|
| **Architecture GO for design exploration?** | **YES** |
| **Implementation GO now?** | **NO** — wait SA decision on width ladder + section list |
| **Preferred approach** | Homepage-only shell (**Option 2**) + selective visual sections (**Option 3**) |
| **Reject** | Global max-width only (**Option 1**); full Desktop Native rewrite (**Option 4**) for this phase |
| **Sequence** | Optional complete **D6 Consistency Audit** first or fold Wide Canvas as post-D5 controlled phase after SA width lock |
| **Scope estimate** | **MEDIUM** (CSS scope + header align + 4–6 section outer caps; no redesign) |

### Answers to primary questions (A–F condensed)

**A. Structural feasibility**  
Yes — widen homepage canvas without changing MobileShell structure; max-width is central **and** scattered; selective wrappers independent; backgrounds already full-width; D3 can remain intact.

**B. Mobile protection**  
Desktop classes are isolatable at ≥1280; leakage risk is shared **unscoped** CSS and `md:` conflicts — mitigated by homepage scope + freeze list.

**C. Desktop design compatibility**  
Hero/S3/S5/S6/S10 are candidates; S4/S7/S8/S9 keep controlled; S4 cards must not be redesigned for stretch.

**D. Shared surface risk**  
Header and PlatformAdaptiveShell **are** shared with platform routes; SectionHeader is homepage-only; image wrappers mostly section-local; CSS vars are global — **must namespace homepage**.

**E. Strategy**  
Recommend **2+3**, not 1 or 4.

**F. Regression surface**  
Highest risk: unscoped global CSS, header desync, undoing D3, sparse S4 cards, platform route widen.

---

## FINAL STATUS

```text
ARCHITECTURE_AUDIT:
PASS

CURRENT_SYSTEM_SUPPORTS_WIDE_CANVAS:
YES_WITH_LIMITS

MOBILE_ISOLATION:
PASS

ADAPTIVE_ISOLATION:
PASS

DESKTOP_BREAKPOINT_ISOLATION:
PASS

HOMEPAGE_ONLY_IMPLEMENTATION:
FEASIBLE

SELECTIVE_SECTION_WIDTH:
FEASIBLE

GLOBAL_WIDTH_CHANGE:
NOT_RECOMMENDED

PRODUCT_ROUTE_PROTECTION:
RISK
(with Option 1) / PASS (with Option 2+3)

INFORMATION_ROUTE_PROTECTION:
RISK
(with Option 1) / PASS (with Option 2+3)

KNOWLEDGE_ROUTE_PROTECTION:
RISK
(with Option 1) / PASS (with Option 2+3)

CTA_CONTRACT_PROTECTION:
PASS

ANALYTICS_CONTRACT_PROTECTION:
PASS

D1_D5_PROTECTION:
PASS

RECOMMENDED_OPTION:
OPTION_2
(+ OPTION_3 selective wrappers)

IMPLEMENTATION_SCOPE_ESTIMATE:
MEDIUM

READY_FOR_SA_DECISION:
YES

IMPLEMENTATION:
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

**STOP** — Wait for SA Review.

---

### SA-oriented one-liner

> ระบบรองรับ Desktop Wide Canvas ได้แบบมีเงื่อนไข: ต้องเป็น **homepage-only shell + selective visual sections** และคง D3 reading measure — **ห้าม** ขยาย `--platform-shell-max-width` แบบ global เพราะ `PlatformAdaptiveShell` / `GlobalHeader` ใช้ร่วมกับ Product / Information / Knowledge
