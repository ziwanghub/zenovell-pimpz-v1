# DWC-01 — Desktop Wide Canvas Specification Lock

**Phase:** DWC-01  
**Document:** `docs/reports/desktop/DESKTOP-WIDE-CANVAS-SPECIFICATION-LOCK.md`  
**Date:** 2026-07-19  
**Repository:** `ZENOVELL-PIMPZ-V4-Active`  
**Inspected HEAD:** `167b385622beaba7f187b62bfdc42345c63380e4`  
**Branch (local inspect):** `ui/desktop-image-balance-d5`  
**Mode:** READ-ONLY · DOCUMENTATION-ONLY · EVIDENCE-BASED  
**Source implementation:** **NOT AUTHORIZED**  

```text
IMPLEMENTATION: NO
SOURCE_CODE_CHANGED: NO
COMMIT: NO
PUSH: NO
PR: NO
DEPLOY: NO
```

**Supersedes (content merge):** informal draft `DWC-01-DESKTOP-WIDE-CANVAS-SPECIFICATION-LOCK.md` if present — **this file is the SA gate authority**.

**Parent decisions:**  
- Feasibility audit: `DESKTOP-WIDE-CANVAS-FEASIBILITY-AUDIT.md`  
- SA Review: Architecture direction **Option 2 + Option 3** approved; implementation deferred  

**Static validation (read-only):** `npm run lint` PASS · `npm run typecheck` PASS  

---

## 1. Executive Summary

Desktop Wide Canvas is **implementation-ready at the specification layer** under a strict isolation model:

| Decision | Lock |
|---|---|
| Architecture | **Option 2** (Homepage-only wide shell) **+ Option 3** (selective wide sections) |
| Global platform width expand | **REJECTED** |
| Desktop-native duplicate tree | **REJECTED** |
| Mobile / Adaptive | **UNCHANGED** |
| D3 reading measures | **IMMUTABLE** |
| Platform routes | **PROTECTED** (retain 1200 / 1240 / 1320 shell) |
| Implementation | **Blocked until SA accepts this lock + baseline checkpoint** |

**Core problem statement (validated):** Desktop already has a *contained* canvas (shell 1200→1320). The opportunity is **wider visual composition on homepage only**, not wider body copy or stretched cards.

**Highest technical risk:** `PlatformAdaptiveShell` / `.platform-header-frame` are **shared** with product, information, and knowledge routes. Any unscoped width edit is a platform architecture change — **prohibited**.

**Highest media risk:** Several homepage images are **below 2× retina needs** for 1400–1440 CSS shells (see §13). Treat as **PASS_WITH_WARNINGS**, not as authority to invent new assets without SA.

---

## 2. Repository Evidence

### 2.1 Homepage composition (exact)

| Layer | Path | Symbol / class |
|---|---|---|
| Homepage root | `app/page.tsx` | `Home()` → `<main>` + sections |
| Homepage shell | `components/layout/homepage-adaptive-shell.tsx` | `HomepageAdaptiveShell` |
| Shared adaptive shell | `components/layout/platform-adaptive-shell.tsx` | `PlatformAdaptiveShell` · class `platform-adaptive-shell` |
| Mobile shell | `components/layout/mobile-shell.tsx` | `MobileShell` · `[data-mobile-shell-root]` · markup `max-w-[430px]` |
| Header | `components/layout/global-header.tsx` | `GlobalHeader` · class `platform-header-frame` |
| Header mapper | `lib/global-header-mapper.ts` | `mapGlobalHeaderProps` |
| Platform header reuse | `components/platform/platform-page-header.tsx` | wraps `GlobalHeader` |
| Section chrome | `components/ui/section-header.tsx` | `SectionHeader` (homepage sections only) |
| Width CSS authority | `app/globals.css` `@layer components` | `--platform-shell-max-width`, gutters, header frame |

### 2.2 Current shell behavior (measured from source)

```css
.platform-adaptive-shell > [data-mobile-shell-root] {
  max-width: var(--platform-shell-max-width) !important;
}
```

| Band | `--platform-shell-max-width` | Gutter token |
|---|---|---|
| default | `430px` | `0px` |
| ≥690 | `none` | `--tablet-gutter-sm` → … |
| ≥1280 | **`1200px`** | `--desktop-gutter-md` (40px) |
| ≥1366 | **`1240px`** | `--desktop-gutter-lg` (48px) |
| ≥1536 | **`1320px`** | `--desktop-gutter-xl` (56px) |

Header `.platform-header-frame` **mirrors** 1200 / 1240 / 1320 at the same breakpoints (**global**, not homepage-only).

### 2.3 HomepageAdaptiveShell today

Only applies `className="bg-[var(--color-page-bg)]"` to `PlatformAdaptiveShell`.  
**Does not** own a homepage-specific desktop width ladder yet.

### 2.4 Route consumers of PlatformAdaptiveShell

| Route | Layout path |
|---|---|
| `/` | `app/page.tsx` → `HomepageAdaptiveShell` |
| `/products/*` | `app/(platform)/products/layout.tsx` |
| `/information/*` | `app/(platform)/information/layout.tsx` |
| `/knowledge/*` | `app/(platform)/knowledge/layout.tsx` |

### 2.5 Section outer max-width already in TSX (examples)

| Section | File | Desktop outer / text |
|---|---|---|
| Hero | `sections/hero/hero-section.tsx` | outer `max-w-[1200/1240/1320]`; subheadline `440–480` |
| S3 | `sections/section-3-hero-product.tsx` | outer same ladder; tagline `420` |
| S2 | `section-2-trust-bar.tsx` | heading wrap `720`; desc `640`; trust card `920` |
| S9 | `section-9-faq.tsx` | list `768`; answers `560` |
| S10 | `section-10-final-cta.tsx` | clusters `1080`; prose `640` |
| SectionHeader | `section-header.tsx` | description `640` |

### 2.6 Contract evidence

| Contract | Path |
|---|---|
| LINE URL | `lib/commerce/cta-contract.ts` → `LINE_OA_URL` |
| CTA activation | `lib/commerce/cta-activation.ts` → `activateLineCta` |
| Analytics events | `lib/analytics/events.ts` → `LINE_CTA_CLICK: "line_cta_click"` |
| dataLayer push | `lib/analytics/adapters/gtm-adapter.ts` |
| Commerce bridge | `lib/analytics/bridge/commerce-analytics-bridge.ts` |

### 2.7 Tailwind / breakpoint conventions

- Desktop polish uses **`min-[1280px]:`** extensively (D1–D5).  
- Adaptive uses `min-[690px]`, `md:`, `min-[820px]`, etc.  
- Known hazard: `md:` can override plain `min-[1280px]:` (seen in D5) — wide-canvas must use **scoped CSS media** and/or careful `!` only when justified.

---

## 3. Architecture Decision (LOCKED)

| Option | Status |
|---|---|
| **Option 2 — Homepage-only Desktop Wide Shell** | **APPROVED / LOCKED** |
| **Option 3 — Selective Wide Section Wrappers** | **APPROVED / LOCKED** |
| Option 1 — Global platform width expand | **REJECTED** |
| Option 4 — Separate desktop-native tree | **REJECTED** |
| Wide content everywhere | **REJECTED** |
| Product card redesign | **REJECTED** |

**Model:**

```text
Full-width viewport background (already exists)
+
Homepage-only wide visual shell (new ownership)
+
Selective wide composition (Hero, S3, S5, S6, S10)
+
Header/Footer shell alignment (homepage-scoped only)
+
Controlled reading measure (D3 unchanged)
+
Keep-current sections (S2, S4, S7, S8, S9)
```

---

## 4. Width Authority Table (LOCKED)

### 4.1 Homepage outer visual shell

| Viewport (px) | Homepage shell max-width | Type | Owner (DWC-02) | Excluded routes |
|---:|---:|---|---|---|
| &lt;690 | Mobile authority (430 content) | max-width via existing shell | Mobile Authority | n/a |
| 690–1279 | Adaptive fluid (`none`) | max-width none + gutters | Adaptive Authority | n/a |
| **1280–1365** | **1200px** | `max-width` | Homepage marker CSS | products/info/knowledge |
| **1366–1535** | **1280px** | `max-width` | Homepage marker CSS | platform routes |
| **1536–1919** | **1400px** | `max-width` | Homepage marker CSS | platform routes |
| **≥1920** | **1440px** | `max-width` hard cap | Homepage marker CSS | platform routes |

**Why these values**

| Value | Rationale |
|---|---|
| 1200 @1280 | Matches current base; avoids change at the desktop gate |
| 1280 @1366–1535 | +80px vs platform 1240; more visual field without sparse gutters |
| 1400 @1536–1919 | Premium canvas; avoids 1440-at-1536 (~48px/side too tight for glow/bleed) |
| 1440 @≥1920 | Hard cap; prevents ultra-wide stretch |

### 4.2 Platform shell (UNCHANGED)

| Breakpoint | Platform shell / header max-width |
|---|---|
| ≥1280 | 1200px |
| ≥1366 | 1240px |
| ≥1536 | 1320px |

### 4.3 Homepage header frame

| Band | max-width | Type | Owner |
|---|---|---|---|
| Same as homepage shell ladder | equals shell | `max-width` on `.platform-header-frame` **scoped under homepage marker** | Homepage CSS scope |

### 4.4 Homepage footer frame

| Band | Outer | Inner text |
|---|---|---|
| Desktop wide shell | tracks shell width | description **640px**; legal/helper compact measures |

### 4.5 Reading measures (IMMUTABLE)

| Role | Desktop max-width | Type | Owner |
|---|---|---|---|
| Primary prose | **640px** | max-width | SectionHeader + section locals (D3) |
| Secondary description | **560px** | max-width | D3 locals |
| Compact support/privacy | **420–480px** | max-width | D3 locals |
| FAQ list | **768px** | max-width | S9 |
| FAQ answers | **560px** | max-width | S9 |

### 4.6 Safe desktop gutters

| Shell width | Min side gutter intent @ viewport |
|---|---|
| 1200 @1280 | ~40px (existing desktop-gutter-md) |
| 1280 @1366 | ≥43px |
| 1400 @1536 | ≥68px |
| 1440 @1920 | ≥240px (acceptable; do not chase full bleed) |

**Rule:** Decorative glow must not cause `scrollWidth > clientWidth`.

### 4.7 Image columns (composition, not crop redesign)

| Section | Image field | Constraint |
|---|---|---|
| Hero | Desktop bg column / field | Expand with shell; keep text column measures |
| S3 | ~48% grid column | Scale with shell; tagline 420 |
| S5/S6 promo | Full band inside shell | Height/balance per D5; not full-bleed text |
| S10 | object-contain stage | Keep CTA hierarchy |

---

## 5. Component Ownership

### 5.1 Principle

```text
Homepage owns homepage-wide behavior.
Platform routes retain platform shell authority.
```

### 5.2 Recommended ownership boundary

| Piece | New/Existing | Parent | Children | Route scope | Public? |
|---|---|---|---|---|---|
| **Homepage marker** `homepage-wide-canvas` / `data-homepage-wide-canvas` | **New attribute/class on existing** | `HomepageAdaptiveShell` | PlatformAdaptiveShell tree | `/` only | Internal |
| **Scoped shell width vars** | New CSS under marker | `globals.css` | MobileShell root | `/` only | CSS |
| **Scoped header frame** | New CSS under marker | `globals.css` | `.platform-header-frame` | `/` only | CSS |
| **Section outer ladders** (Hero/S3) | Existing components | Sections | Media + copy | `/` only | Internal |
| **PlatformAdaptiveShell** | Existing | layouts | MobileShell | All platform + homepage | Shared — **do not change default width** |
| **MobileShell** | Existing | PlatformAdaptiveShell | page content | All | Shared — **do not change** |
| **GlobalHeader** | Existing | page / PlatformPageHeader | nav, CTA, drawer | Shared | Behavior freeze; width via **scope only** |

### 5.3 Cleanest implementation shape (chosen)

**Primary:** Extend `HomepageAdaptiveShell` with a homepage marker + **homepage-scoped CSS** that overrides `--platform-shell-max-width` / header frame **only under that marker**.

**Complementary:** Section-level outer max-width sync for Hero/S3 (and optional S5/S6/S10 frames) where hardcoded ladders would otherwise lag the shell.

**Not chosen as primary:** Global PlatformAdaptiveShell edit; new shared public width prop on GlobalHeader without scoping (leakage risk unless default remains platform).

### 5.4 Optional prop path (acceptable fallback)

If CSS descendant targeting proves brittle for fixed header:

- Add optional `layoutScope?: "homepage-wide" | "platform"` to GlobalHeader **defaulting to platform**  
- Homepage only passes `homepage-wide`  
- Platform layouts omit prop  

Still **must not** change unscoped global CSS max-width tokens as the only lever.

---

## 6. Exact File Scope

### A. Files expected to change (DWC-02)

| File | Purpose | Change type | Risk | Shared-route impact | Est. lines |
|---|---|---|---|---|---|
| `components/layout/homepage-adaptive-shell.tsx` | Add marker class/data | additive class | Low | None if only homepage | 3–15 |
| `app/globals.css` | Homepage-scoped width ladder + header mirror | CSS media | Med | None if scoped correctly | 25–60 |
| `sections/hero/hero-section.tsx` | Sync outer max-w ladder; update `sizes` if needed | class/sizes | Med | None | 5–25 |
| `sections/section-3-hero-product/section-3-hero-product.tsx` | Sync outer max-w ladder | class | Med | None | 5–20 |

### B. Files that may change only if necessary

| File | Purpose | Risk | Est. lines |
|---|---|---|---|
| `sections/section-5-why-choose-us/section-5-why-choose-us.tsx` | Outer frame / promo balance | Med | 5–20 |
| `sections/section-6-how-to-order/section-6-how-to-order.tsx` | Outer frame / promo balance | Med | 5–20 |
| `sections/section-10-final-cta/section-10-final-cta.tsx` | Visual frame; keep prose 640 | Med | 5–25 |
| `sections/section-11-footer/section-11-footer.tsx` | Outer alignment | Low–Med | 5–15 |
| `components/layout/global-header.tsx` | Optional `layoutScope` prop only | Med | 10–40 |

### C. Files prohibited

| File / area | Reason |
|---|---|
| Unscoped `.platform-adaptive-shell` desktop max-width tokens | Platform leakage |
| Unscoped `.platform-header-frame` max-width | Shared header |
| `components/layout/mobile-shell.tsx` (contract/430) | Mobile Authority |
| `app/(platform)/**` layouts & product/platform UI redesign | Route protection |
| `lib/commerce/cta-contract.ts`, `cta-activation.ts` | CTA contract |
| `components/analytics/**`, GTM wiring | Analytics contract |
| S4 product card internals | Card freeze |
| S9 answer/list measure classes (widen) | Reading freeze |
| Drawer behavior blocks in GlobalHeader | Nav freeze |
| Image binaries (unless separate SA asset ticket) | Asset freeze |

### D. Documentation

| File | Action |
|---|---|
| `docs/reports/desktop/DESKTOP-WIDE-CANVAS-SPECIFICATION-LOCK.md` | **This file** (DWC-01) |
| `docs/reports/desktop/DESKTOP-WIDE-CANVAS-FEASIBILITY-AUDIT.md` | Reference (prior) |
| `docs/reports/desktop/DWC-02-DESKTOP-WIDE-CANVAS-IMPLEMENTATION.md` | Create in DWC-02 |
| Baseline evidence folder | `screenshot/Desktop-screenshot/desktop-wide-canvas-baseline/` (pre-change) |

---

## 7. Section Policy Matrix

| Section | Class | Outer wrapper | Inner content max-width | Grid/flex | Image | Text measure | Align | Desktop-only? | Mobile/Adaptive | Visual effect | Main risks |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **S1 Hero** | WIDE_VISUAL | Track homepage shell | content col ~520; subhead 440–480 | existing desktop layout | desktop bg expands with shell | **no widen** | left content / image field | Yes ≥1280 | unchanged | larger visual field | soft image @2×; LCP; CTA hierarchy |
| **S2 Trust** | KEEP | shell or local 920 card | 640/560 | 4-col trust | none critical | keep | center | no widen | unchanged | density preserved | empty stretch if forced wide |
| **S3 Featured** | WIDE_VISUAL | Track shell | tagline 420 | 48/52 grid | stage inset (D5) | no widen | left/right | Yes | unchanged | product authority | image 941w limit |
| **S4 Catalog** | KEEP | **Centered current-width frame inside wide canvas** (shell may be wider; catalog content keeps current card density / effective width feel) | card copy local | existing catalog grid | product thumbs | no widen | center | shell only ambient | unchanged | cards not sparse | redesign pressure |
| **S5 Why** | WIDE_VISUAL | full shell for grid/promo | intro 640 | 6-col benefits | promo band | no widen | center | Yes | unchanged | better split balance | promo soft image |
| **S6 Order** | WIDE_VISUAL | full shell for steps | step copy local | 3-col steps | promo band | no widen | center | Yes | unchanged | process+visual | steps too far apart |
| **S7 Privacy** | KEEP | shell ambient | 420–480 | cards | n/a | keep | center | no | unchanged | readable legal tone | line stretch |
| **S8 Reviews** | KEEP | shell ambient | body/disclaimer 640 | 3-col | chips D5 | keep | center | no | unchanged | social proof density | sparse cards |
| **S9 FAQ** | KEEP | list **768** | answers **560** | stack | n/a | keep | center | no | unchanged | reading comfort | widen FAQ fail |
| **S10 Final** | WIDE_VISUAL | shell; clusters ~1080 default | prose 640 | image+benefits | object-contain | keep | center | Yes | unchanged | conversion climax | empty space; CTA small feel |
| **Footer** | WIDE_SHELL | track shell | 640 desc; compact legal | multi-col | n/a | keep | mixed | Yes outer | unchanged | frame desktop | wide legal text |
| **Header** | WIDE_SHELL | track shell (scoped) | nav intrinsic | desktop grid nav | n/a | n/a | 3-zone | Yes outer | drawer unchanged | align with canvas | platform header leak |

### Special requirements (locked intent)

**Hero:** Widen visual field only; preserve headline/CTA hierarchy; verify asset (see §13); protect LCP (`priority` already on hero images).  

**S3:** Product authority over S4; do not weaken image; no text line length expansion.  

**S5:** Wider only where balance improves; benefits remain readable.  

**S6:** Preserve step sequence; do not disconnect process.  

**S10:** CTA remains dominant; avoid empty climax.  

**S4:** Confirm sits as **current-width card system** inside homepage canvas (do not redesign cards to fill 1400–1440).  

**S7–S9:** Reading width frozen.

---

## 8. Header / Footer Isolation

### 8.1 Header

| Question | Answer |
|---|---|
| Does GlobalHeader support route-specific width today? | **No** — only global `.platform-header-frame` |
| Safest approach | **Homepage CSS scope** under `.homepage-wide-canvas .platform-header-frame` |
| Acceptable fallback | Optional prop `layoutScope="homepage-wide"` default platform |
| Mobile drawer | **Unchanged** — drawer uses `max-w-[min(92vw,380px)]` etc., independent of shell ladder |
| Platform headers | **Unchanged** — no homepage marker in platform layouts |
| Nav content / CTA labels | **Do not change** |

### 8.2 Footer

| Rule | Detail |
|---|---|
| Outer | May expand with homepage shell |
| Text columns | Keep max-width / measure constraints |
| Legal | Must not full-bleed |
| Product links | Avoid excessive column gap |
| Mobile footer | Unchanged |

---

## 9. CSS / Tailwind Implementation Strategy

### 9.1 Recommendation (single approach)

**Homepage-scoped CSS custom properties + media queries** (in `globals.css`), activated by marker on `HomepageAdaptiveShell`, **plus** minimal section Tailwind outer max-w sync where sections hardcode 1200/1240/1320.

### 9.2 Comparison

| Approach | Maintainability | Leakage | Readability | Reuse | Build safety | Fit to repo |
|---|---|---|---|---|---|---|
| Tailwind utilities only on every section | Low (duplication) | Low | Medium | Poor | Good | Partial |
| **Homepage-scoped CSS + vars** | **High** | **Low if scoped** | High | High for shell | Good | **Best** (shell already CSS-var based) |
| Global shell token edit | High | **Critical** | High | Accidental | Good | **Forbidden** |
| New public shared wrapper component | Medium | Medium | Medium | Over-reuse risk | Good | Optional later |
| Context/prop on every section | Low | Low | Low | Poor | Good | Heavy |

### 9.3 Why not Tailwind-only

Shell enforcement uses **`!important`** via CSS variable on MobileShell child. Section utilities alone cannot raise the shell ceiling if the shell still caps at 1200–1320. Homepage-scoped **override of the same variable** is the correct lever.

### 9.4 Tailwind v4 note

Prefer explicit `@media (min-width: …)` for shell ladder under homepage marker. Avoid relying on `md:` for canvas width.

---

## 10. Mobile / Adaptive Protection Matrix

| Viewport | Outer width authority | Gutters | Wide canvas active? | Header | Section wrappers | Overflow |
|---:|---|---|---|---|---|---|
| 375 | Mobile 430 shell | pad 16 pattern | **No** | mobile bar + drawer | mobile | none |
| 390 | Mobile | same | **No** | same | same | none |
| 414 | Mobile | same | **No** | same | same | none |
| 430 | Mobile | same | **No** | same | same | none |
| 690 | Adaptive fluid | 24 | **No** | adaptive | adaptive | none |
| 768 | Adaptive | 32 | **No** | adaptive | adaptive | none |
| 820 | Adaptive | 36 | **No** | adaptive | adaptive | none |
| 912 | Adaptive | 40 | **No** | adaptive | adaptive | none |
| 1024 | Adaptive | 48 | **No** | adaptive | adaptive | none |
| **1279** | Adaptive fluid | 48 | **No** | adaptive | **must match baseline** | none |
| **1280** | Homepage shell **1200** | ~40 | **Yes** | frame 1200 | wide candidates | none |
| **1366** | **1280** | ≥43 | **Yes** | 1280 | wide candidates | none |
| **1440** | **1280** | ≥80 | **Yes** | 1280 | wide candidates | none |
| **1536** | **1400** | ≥68 | **Yes** | 1400 | wide candidates | none |
| **1920** | **1440** cap | ≥240 | **Yes** | 1440 | wide candidates | none |

**Rule:** Mobile/adaptive computed layout **identical** to pre-DWC baseline unless a verified defect is filed separately.

---

## 11. Route Protection Matrix

| Route | Verify | Pass criteria |
|---|---|---|
| `/` | shell, header, sections, overflow | Homepage ladder §4.1 |
| `/products/[slug]` (all published slugs) | shell, header, typography, layout | Platform ladder §4.2; **no** 1280/1400/1440 homepage values |
| `/information/*` | same | Platform ladder |
| `/knowledge/*` | same | Platform ladder |
| Header nav links | click targets | Correct hrefs; no homepage-only class on platform |
| Mobile drawer | open/close/focus | Unchanged |
| Footer links | products/info/legal | Unchanged behavior |

**Leak test:** Search built CSS/DOM for homepage marker on platform routes → must be **absent**.

---

## 12. Contract Protection Matrix

| Contract | Must not modify | Indirect DOM risk | Mitigation |
|---|---|---|---|
| LINE destination | `https://lin.ee/syjmYE2` | none if handlers untouched | Do not edit cta-contract / activation |
| CTA labels | copy strings | none | No content edits |
| Event name | `line_cta_click` | wrapper re-mount double-fire | No new click handlers; don’t nest anchors |
| dataLayer payload / 7 params | surface, destination, intent, source, page_path, link_url, product fields as defined | structure change of parents | Keep CTA components; only outer layout wrappers |
| Commerce persistence | context merge/clear | none | No commerce lib edits |
| Product entities / prices / slugs | content SSOT | none | No content/product model edits |
| Metadata / SSG | app routes | none | No metadata edits |
| Legal content | privacy/terms text | none | No legal edits |

---

## 13. Image and Performance Assessment

### 13.1 Assets (sips metadata)

| Asset | Pixels | Bytes | Used by |
|---|---|---|---|
| `public/images/hero/desktop-section-01-hero-desktop.jpeg` | **1536×1024** | ~305KB | Hero desktop bg (`DESKTOP_BACKGROUND_IMAGE_SRC`) |
| `public/images/hero/bg-ph6d-section-1-hero-v2.jpeg` | (mobile path) | — | Hero mobile |
| `public/images/section-3/bg-hero-product-section3.jpeg` | **941×1672** | ~291KB | S3 artwork |
| `public/images/section-5/bg-why-choose-us-section5.jpeg` | **1746×901** | ~246KB | S5 promo |
| `public/images/section-5/why-choose-us-promo-couple.png` | **235×175** | ~42KB | (if used) **low-res warning** |
| `public/images/section-6/bg-how-to-order-section6.jpeg` | **692×359** | ~54KB | S6 promo **low-res warning** |
| `public/images/section-10/bg-final-cta-section10.jpeg` | **1254×1254** | ~339KB | S10 artwork |

### 13.2 Implementation patterns

| Section | API | fill | object-fit | sizes (current) | priority |
|---|---|---|---|---|---|
| Hero desktop | `next/image` | yes | cover (bg) | `(max-width:1279px) 0px, (max-width:1535px) 56vw, 60vw` | yes |
| S3 | `next/image` | yes | cover | up to 50vw | no (default) |
| S5/S6 promo | `next/image` | yes | cover | up to 1200px hint | no |
| S10 | `next/image` | yes | contain | needs desktop refresh | priority on S10 art |

### 13.3 Readiness

| Item | Status |
|---|---|
| Can widen **without replacing assets**? | **Yes**, with quality warnings |
| Hero @1440 CSS ×2 ≈ 2880px needed | Source **1536** → **WARNING** softness on retina |
| S6 promo @1400 shell | Source **692** → **WARNING** |
| S3 column ~500–600 CSS | 941 width → **OK ~1×**, soft at 2× |
| S5 band 1746 | **OK** for many desktop widths |
| S10 1254 contain | **OK** for half-column |

**IMAGE_READINESS:** `PASS_WITH_WARNINGS`  
**Not a hard blocker** for layout implementation if SA accepts soft imagery risk; **blocker for “pixel-perfect premium photo” claims** without asset upgrade ticket.

### 13.4 Performance risk

| Factor | Level |
|---|---|
| Larger `sizes` → larger srcset picks | Medium |
| Dual hero images (mobile+desktop) already | Existing |
| No full-page 4K mandatory load | Controlled via `sizes` |
| LCP (Hero priority) | Monitor after width change |

**PERFORMANCE_RISK:** **MEDIUM**

---

## 14. Accessibility Assessment

| Concern | Impact of wrappers | Status |
|---|---|---|
| Heading order | Must not inject extra `h1`/`h2` in wrappers | Low if pure div frames |
| Landmarks | Keep single `main`; header/footer roles | Low |
| Skip link | `#main-content` / product skip in layouts | Ensure targets remain valid |
| Focus order | DOM order should match visual | Low if no reorder |
| CTA names | Unchanged aria-labels | Protected |
| Drawer focus trap | Do not touch drawer code | Protected |
| Keyboard nav | Unchanged | Low |
| Zoom / reflow | max-width shells reflow text | Low–Med; keep measures |
| Reduced motion | No new motion required | Low |

**ACCESSIBILITY_RISK:** **LOW** (if wrappers are non-semantic layout only)

---

## 15. Browser Verification Plan (DWC-02)

### A. Visual — PASS if

- Homepage shell widths match §4.1  
- Header frame equals shell  
- Gutters safe; no overflow  
- Reading measures still 640/560/420–480  
- S2/S4/S7/S8/S9 not sparsely stretched  
- Hero/S3/S5/S6/S10 composition improved or neutral  
- CTA hierarchy still clear  

### B. Functional — PASS if

- LINE CTAs open correct URL  
- Product links work  
- Drawer open/close  
- FAQ expand/collapse  
- Footer/nav links  

### C. Analytics — PASS if

- `line_cta_click` still fires once per click  
- Required params present  
- No duplicate events from wrapper nesting  

### D. Technical — PASS if

- No console/hydration errors  
- No horizontal overflow on matrix  
- LCP not catastrophically regressed (observe)  
- Responsive image requests sensible  

### Criteria labels

| Result | Meaning |
|---|---|
| **PASS** | All gates green |
| **FAIL** | Spec violation or regression |
| **BLOCKED** | Cannot verify (env) or hard leakage/contract break |

### Pre-change baseline (mandatory before DWC-02 code)

```text
screenshot/Desktop-screenshot/desktop-wide-canvas-baseline/
  + shell-width-baseline.json (390,1279,1280,1366,1440,1536,1920)
```

---

## 16. Rollback Plan

| Item | Definition |
|---|---|
| Feature boundary | Homepage marker + scoped CSS + optional section outer class sync |
| Smallest unit | Revert DWC-02 commit(s) / restore §6.A–B files only |
| Feature flag | **Not required** if marker+CSS fully isolated; optional `data-homepage-wide-canvas` removal is instant kill switch |
| Restore baseline | Compare to pre-change screenshots/JSON |
| Do not entangle | D1–D5, content, analytics, platform routes, assets |

---

## 17. Change Size Estimate

| Metric | Estimate |
|---|---|
| Source files | **4–8** |
| Documentation files | **2–3** (this lock + DWC-02 report + baseline notes) |
| Approx. lines | **40–150** |
| Complexity | Isolation + verification heavy |
| Regression risk | **MEDIUM** (LOW if scoped; HIGH if unscoped) |
| Implementation classification | **MEDIUM** |

---

## 18. D6 and Freeze Sequence (CONFIRMED)

Recommended sequence **confirmed** with repository reasons:

```text
1. Capture pre-change desktop baseline (screenshots + shell measures)
2. DWC-01 Specification Lock  ← THIS DOCUMENT (SA gate)
3. DWC-02 Limited homepage-only implementation
4. Independent browser verification matrix
5. Final D6 Desktop Consistency revalidation
6. Desktop Authority Freeze
```

**Why not freeze before Wide Canvas:** Freeze would certify the *contained* 1200–1320 canvas as final, then immediately invalidate it. Repo isolation evidence supports implementing Wide Canvas **before** Freeze, with baseline + D6 revalidation as governance.

**D6 pre-change role:** Optional “baseline consistency snapshot” can run as part of step 1; full D6 **PASS** is after DWC-02, not before.

---

## 19. Risks and Blockers

| ID | Risk | Severity | Blocker? | Mitigation |
|---|---|---|---|---|
| R1 | Unscoped shell CSS leaks to platform | Critical | Yes if occurs | Homepage marker only; route tests |
| R2 | Header desync vs shell | High | No | Scoped header frame |
| R3 | Hero/S3 outer max-w lag shell | Medium | No | Sync ladders |
| R4 | Soft images at 1400–1440 retina | Medium | **No** (warn) | sizes + optional later asset ticket |
| R5 | S6/S5 low-res promo | Medium | **No** (warn) | Accept or SA asset upgrade |
| R6 | Sparse S4/S8 if forced full shell | High | Prevent via policy | KEEP_CURRENT_WIDTH |
| R7 | Undo D3 reading width | Critical | Yes if occurs | Immutable measures |
| R8 | CTA hierarchy weak on wide canvas | Medium | No | Visual QA S10/Hero |
| R9 | `md:` cascade bugs | Medium | No | Prefer media CSS |
| R10 | Open D1/D2 merge state variance | Low–Med | No | Note baseline branch |

**No absolute code-blocker** for DWC-02 layout work if SA accepts image warnings.

---

## 20. Final Recommendation

1. **Accept** this DWC-01 lock as implementation authority input.  
2. Capture **pre-change baseline** before any code.  
3. Authorize **DWC-02** only with:  
   - homepage marker + scoped CSS  
   - selective section outer sync  
   - zero global shell token edits  
   - full matrix + platform route verification  
4. Defer Desktop Authority Freeze until after DWC-02 + D6 revalidation.  
5. Open separate SA ticket for **asset upgrades** if retina quality is required.

---

## 21. SA Decision Gate

SA must explicitly accept:

| Gate item | Status requested |
|---|---|
| Width ladder §4.1 | LOCK |
| Section classification §7 | LOCK |
| Component ownership §5 | LOCK |
| File scope §6 | LOCK |
| Image warnings acceptable for DWC-02 | YES / NO |
| Proceed to baseline + DWC-02 | YES / NO |

```text
IF SA_ACCEPTS_DWC_01 AND SA_ACCEPTS_IMAGE_WARNINGS
  → READY_FOR_DWC_02 = YES_WITH_CONDITIONS
ELSE IF SA_REQUIRES_ASSET_UPGRADE_FIRST
  → READY_FOR_DWC_02 = NO (blocked on assets)
ELSE
  → READY_FOR_DWC_02 = NO
```

---

## FINAL STATUS (machine-readable)

```text
DWC_01_STATUS:
PASS_WITH_WARNINGS

ARCHITECTURE_DIRECTION:
OPTION_2_PLUS_OPTION_3

WIDTH_LADDER:
LOCKED

SECTION_CLASSIFICATION:
LOCKED

COMPONENT_OWNERSHIP:
LOCKED

EXACT_FILE_SCOPE:
DEFINED

MOBILE_PROTECTION:
PASS

ADAPTIVE_PROTECTION:
PASS

PLATFORM_ROUTE_PROTECTION:
PASS

CTA_CONTRACT_PROTECTION:
PASS

ANALYTICS_CONTRACT_PROTECTION:
PASS

COMMERCE_CONTRACT_PROTECTION:
PASS

IMAGE_READINESS:
PASS_WITH_WARNINGS

PERFORMANCE_RISK:
MEDIUM

ACCESSIBILITY_RISK:
LOW

IMPLEMENTATION_SCOPE:
MEDIUM

READY_FOR_DWC_02:
YES_WITH_CONDITIONS

IMPLEMENTATION:
NO

SOURCE_CODE_CHANGED:
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

**Conditions for READY_FOR_DWC_02:**  
(1) SA accepts this specification lock  
(2) SA accepts image softness warnings or schedules asset work  
(3) Pre-change baseline checkpoint completed before first DWC-02 commit  

**STOP** — No implementation, commit, push, PR, or deploy performed.

---

## Appendix — Validation run log

```text
git branch --show-current → ui/desktop-image-balance-d5
git rev-parse HEAD → 167b385622beaba7f187b62bfdc42345c63380e4
npm run lint → PASS
npm run typecheck → PASS
npm run build → not required for DWC-01 (lint/typecheck sufficient)
formatters → not run
source edits → none
commit → none
```
