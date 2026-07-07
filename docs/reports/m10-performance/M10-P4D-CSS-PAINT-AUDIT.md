# M10-P4D CSS & Paint Cost Audit

**Date**: 2026-07-06
**Patch**: M10-P4D
**Workstream**: WS-04 Performance Hardening
**Status**: AUDIT COMPLETE (Read-only)
**Authority**: M10-P4-PERFORMANCE-SCOPE-LOCK.md
**Baseline**: v4.1.6-m10-p4b-hero-lcp

## Executive Summary

Audit-only review of CSS rendering and browser paint costs on the normalized post-P4B baseline.

No changes made. All findings classified per scope lock.

Key observations:
- Heavy use of custom `shadow-[0_0_XXpx_rgba(233,30,140,0.XX)]` pink glows (57+ instances) across cards, CTAs, icons. These are soft shadows that can trigger repaints.
- Multiple stacked linear/radial gradients for overlays and cards (36+ instances), often absolute-positioned on top of images or other layers.
- Limited backdrop-filter/blur: only 1 `backdrop-blur-sm` + 1 `blur(4px)` inline (Hero CTA) + 1 `blur-md`.
- 2 infinite `animate-[hero-bob]` on small chevrons (scroll indicators); many hover `transition` + brightness/shadow/filter on CTAs (interaction-triggered).
- Hero has 1 scaled image + 3 full-viewport linear-gradient scrim divs (high layer count).
- Body has base radial + linear gradient.
- No will-change, content-visibility, or extreme filters found.
- Many effects are brand glows and glassmorphic cards; paint cost is by design but measurable risk on low-end devices/scroll.

All paint-heavy items in Hero were previously reviewed in P4B (left unchanged per visual parity rule).

## Files Reviewed

- app/globals.css
- sections/hero/hero-section.tsx (primary LCP + scrims)
- sections/section-*/section-*.tsx (all 11 sections)
- components/layout/global-header.tsx
- components/layout/mobile-shell.tsx
- components/ui/button.tsx
- app/layout.tsx, app/page.tsx
- Cross-checked with build output and prior audits (P4B, P4C).

## Paint Cost Inventory

**Backdrop / Blur / Filter:**
- Hero CTA: `backdropFilter: 'blur(4px)'` + Webkit (inline style on ctaButtonStyle)
- section-4 badge: `backdrop-blur-sm`
- section-7: one `blur-md` on small element
- No heavy `filter()` or large-radius blurs.
- One `drop-shadow` on icons in final-cta, section-10 etc.

**Box-shadow / Glows:**
- ~57 custom `shadow-[0_0_XXpx_rgba(233,30,140,0.XX)]` (pink brand glows)
- Examples: CTAs `shadow-[0_0_20px_rgba(233,30,140,0.4)]`, cards `shadow-[0_0_22px...]`, icons `shadow-[0_0_10px...]`
- Header drawer: `shadow-[-18px_0_48px_rgba(0,0,0,0.42)]`
- Many combined with inset shadows or borders for "glass" effect.
- These soft outer shadows are paint expensive when layered or animated on hover.

**Large / Stacked Gradients & Overlays:**
- Hero: 3 full absolute linear-gradient scrims (left fade, top, bottom 220px) + background image (scale 1.05)
- Multiple sections use `bg-[radial-gradient(circle_at_center,rgba(233,30,140,0.XX),rgba(10,10,10,0.98)_72%)]` for cards (FAQ, final-cta, etc.)
- Overlays: absolute inset gradients in section-5,6,7 (e.g. `bg-[linear-gradient(90deg,rgba(22,11,17,0.96)_0%,...)]`)
- Body: `radial-gradient` + `linear-gradient` base.
- Nested: many cards have gradient bg + shadow + border + inner elements with more gradients.

**Other Paint Triggers:**
- `scale-[1.05]` on hero image (transform, may create layer).
- `opacity-80/35` on animated chevrons.
- `mix-blend` not heavily used.
- Many `hover:brightness-[1.XX] hover:shadow-[...]` + `active:scale` on CTAs (repaint on interaction).

## Gradient Inventory

36+ instances, mostly:
- Radial for "glow card" backgrounds (pink tint to dark).
- Linear for scrims/overlays (dark fades for text contrast).
- Stacked in final-cta, section-10,11,7,5,6,4,9.
- Often paired with soft shadows and borders for depth.

High cost areas: Hero (3 large + image), multiple card gradients in scrollable areas.

## Shadow Inventory

Dominant pattern: custom Tailwind arbitrary `shadow-[0_0_14px_rgba(233,30,140,0.35)]` etc. for pink neon glow.
- CTAs: 0_0_20px to 0_0_32px
- Cards: 0_0_16px to 0_0_26px
- Icons/small: 0_0_10px
- Combined with inset for inner glow.
- Header uses black drop shadows for drawer/elevation.
- Total count high; each soft shadow can cause layer creation and repaint.

## Animation Inventory

- Primary: `animate-[hero-bob_2.1s_ease-in-out_infinite]` (and +150ms offset) on 2x ChevronDown in Hero and section-3-hero-product. Small elements, reduced-motion safe in some.
- Transitions: 20+ `transition-[transform,box-shadow,filter]` or `transition-colors` on CTAs, buttons, cards (duration-150).
- Hover effects trigger brightness + larger shadow (repaint).
- Scroll: header `transition-shadow` based on state.
- No long-running heavy anims or layout thrashing.
- `active:scale-[0.98]` on interactive elements.

## Backdrop Filter Inventory

Minimal:
- 1 `backdrop-blur-sm` (catalog badge)
- `blur(4px)` + webkit on Hero primary CTA (glass effect over image)
- 1 `blur-md` (privacy section small element)
- No `backdrop-filter` on large areas or multiple stacked.

This is relatively cheap compared to the shadow/gradient volume.

## Potential Browser Cost

- Hero: High layer count (image + 3 absolute gradients + content z-2). Scale transform + multiple gradients over photo = paint cost on load/resize. (Reviewed in P4B; left for visual identity.)
- Multiple cards with radial gradient + multiple shadows + borders during scroll = repeated paint.
- Hover on CTAs (many on page): shadow expansion + brightness = repaint.
- Body background gradient + panel + many overlays.
- Small continuous anim on bob (cheap but on every hero).
- Soft 0_0_ large radius shadows known to be GPU/paint heavy in some browsers, especially pink on dark.
- No obvious will-change or contain to optimize layers.
- On low-end mobile (target 375-430px), cumulative effect of gradients + shadows could impact scroll smoothness / battery.

No large fixed full-viewport blurs or extreme filters.

## Scope Classification

**WS-04 Performance (this audit):**
- Hero scrim gradients + image scale + CTA blur (paint on LCP area)
- Volume of custom shadows/gradients in scrollable content
- Hover transition repaint cost
- Body + multiple overlay gradients
- Small bob animation

**WS-01 Shared UI Primitives:**
- Repeated shadow/glow patterns (could be token or component)
- Duplicated card "glass" styles with gradient+shadow+border
- Icon glows and badge styles

**WS-02 Design Tokens:**
- Hardcoded rgba pink glows and gradient stops (brand colors)
- Arbitrary shadow values instead of token scale
- Gradient stops could be tokenized

**WS-07 Technical Debt:**
- Duplication of similar gradient/shadow classes across 10+ files
- Inline styles for complex gradients in Hero (maintainability)
- Many similar hover:brightness + shadow expansions (could be utility)

**HOLD / SA Decision:**
- Any reduction of glows/shadows/gradients (visual identity of brand "neon glass" on dark; frozen sections)
- Hero layer stack (P4B decision to preserve visual)

## Priority Matrix (for future, not this patch)

High (measurable paint):
- Hero multiple scrims + CTA blur (LCP area)
- High volume of soft shadows on scrollable cards

Medium:
- Hover effects on primary CTAs
- Stacked gradients in sections

Low:
- Small bob animation
- Body base gradient

Deferred to other WS per lock.

## Deferred Findings

- All implementation/optimization (P4D is audit only)
- Any changes to frozen visuals or brand effects
- WS-01 primitive extraction for glows/cards
- WS-02 tokenization of colors/shadows
- WS-07 dedup of repeated styles
- Hero specifically (P4B reviewed, visual locked)

## Recommended Patch Sequence (future)

Per scope lock:
- P4E Runtime Performance Verification (after P4D)
- Then WS-01 for shared card/glow primitives
- WS-07 debt cleanup (style duplication)
- WS-02 if tokens needed for shadows/grads

## Validation Result

- npm run lint: PASS
- npm run typecheck: PASS
- npm run build: PASS
- npm run validate: PASS

No code changes; audit confirms build health unchanged.

## Readiness for Independent Audit

READY_FOR_INDEPENDENT_AUDIT: YES

Full inventory provided with locations, counts, cost hypotheses, and strict scope classification. No implementation performed. All per M10-P4-PERFORMANCE-SCOPE-LOCK.md. Ready for review before any P4E or WS-01 work.
