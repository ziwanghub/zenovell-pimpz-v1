# M10-P1A Accessibility Audit

Date: `2026-07-06`
Phase: `M10 Foundation Hardening`
Patch: `M10-P1A Accessibility Audit Only`
Status: `CLOSED`
Governance: `Lightweight Z-MOS Style Governance`
Release Baseline: `v4.1.0-m9.5-platform-foundation`

## 1. Executive Summary

This audit reviewed the frozen `v4.1.0-m9.5-platform-foundation` runtime for accessibility risk without making any runtime changes. The platform already has a solid baseline in shared structure: a single `main`, stable section ordering, a shared `GlobalHeader`, explicit drawer dialog semantics, and FAQ disclosure controls that use real `button` elements.

The main accessibility risk is not architectural. It is actionability. The current runtime exposes multiple primary or high-importance controls that either do not perform an action or resolve to placeholder destinations. That creates a gap for keyboard and screen-reader users because several controls are announced as actionable but do not complete the promised task.

Result:

- `P0`: `1`
- `P1`: `3`
- `P2`: `4`

`M10-P1B` can proceed because the identified fixes are contained to current runtime semantics and destination wiring. No redesign, `MobileShell` mutation, or broad frozen-section refactor is required.

## 2. Audit Scope

Audited surfaces:

1. `app/page.tsx`
2. `components/layout/global-header.tsx`
3. `sections/hero/hero-section.tsx`
4. `sections/section-9-faq/section-9-faq.tsx`
5. `sections/section-11-footer/section-11-footer.tsx`
6. Shared interactive destination/content authorities used by those surfaces

Out of scope:

- source code fixes
- ARIA changes
- runtime behavior changes
- analytics
- design tokens
- shared primitive extraction
- runtime consistency implementation

## 3. Files Reviewed

- [app/page.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/app/page.tsx)
- [components/layout/global-header.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/components/layout/global-header.tsx)
- [sections/hero/hero-section.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/sections/hero/hero-section.tsx)
- [sections/section-9-faq/section-9-faq.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/sections/section-9-faq/section-9-faq.tsx)
- [sections/section-11-footer/section-11-footer.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/sections/section-11-footer/section-11-footer.tsx)
- [content/hero.ts](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/content/hero.ts)
- [content/site-navigation.ts](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/content/site-navigation.ts)
- [content/section-11-footer.ts](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/content/section-11-footer.ts)
- [docs/architecture/M10-FOUNDATION-HARDENING-BLUEPRINT.md](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/architecture/M10-FOUNDATION-HARDENING-BLUEPRINT.md)
- [docs/reports/m9.5c-header-extraction/M9.5C-CLOSEOUT.md](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/reports/m9.5c-header-extraction/M9.5C-CLOSEOUT.md)
- [docs/reports/m9.5d-legacy-cleanup/M9.5D-LEGACY-CLEANUP.md](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/reports/m9.5d-legacy-cleanup/M9.5D-LEGACY-CLEANUP.md)

## 4. Methodology

- Static semantic audit of scoped files.
- Review of content authority wiring for CTA and link destinations.
- Requested validation commands:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run validate`
- Attempted browser QA on `375px`, `390px`, `414px`, and `430px`.

Runtime QA limitation:

- The local app was started successfully at `http://localhost:3001`.
- The in-app browser automation surface was not available for localhost in this session, so live keyboard-path verification could not be completed inside the browser tool.
- Findings below therefore combine static audit, content-contract review, and existing M9.5 browser QA history, but do not claim fresh full manual keyboard proof for all four widths.

## 5. Findings by Surface

### App / Page Structure

Status:

- `PASS` main landmark presence
- `PASS` section ordering remains stable and frozen
- `PASS` shared header mounted outside Hero ownership as required by M9.5
- `RISK` no skip-link path was found for bypassing the fixed header to main content

Notes:

- `main` exists at [app/page.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/app/page.tsx:40).
- Section order remains sequential and consistent with the frozen baseline.

### GlobalHeader + Drawer

Status:

- `PASS` menu trigger is a real `button`
- `PASS` `aria-expanded` is present
- `PASS` `aria-controls` is present
- `PASS` drawer uses `role="dialog"` and `aria-modal="true"`
- `PASS` close button exists
- `PASS` `Escape` close path exists in code
- `PASS` backdrop close path exists in code
- `RISK` focus restoration logic is over-broad and may force focus to the menu button whenever the drawer is closed, including initial mount
- `RISK` primary LINE CTA resolves through shared destinations, but the current target points to a missing in-page anchor

References:

- [global-header.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/components/layout/global-header.tsx:170)
- [global-header.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/components/layout/global-header.tsx:203)
- [global-header.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/components/layout/global-header.tsx:70)
- [content/site-navigation.ts](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/content/site-navigation.ts:481)

### Hero Section

Status:

- `PASS` Hero uses a single `h1`
- `PASS` decorative background image is hidden with empty alt
- `PASS` decorative scroll arrows are individually `aria-hidden`
- `P0` primary Hero CTA is rendered as a `button` with no activation behavior and no destination authority

References:

- [hero-section.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/sections/hero/hero-section.tsx:189)
- [hero-section.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/sections/hero/hero-section.tsx:229)
- [content/hero.ts](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/content/hero.ts:21)

### FAQ Section

Status:

- `PASS` FAQ triggers are real `button` elements
- `PASS` `aria-expanded` and `aria-controls` are present
- `PASS` answer panel uses `role="region"` and `aria-labelledby`
- `RISK` currently open item cannot be collapsed by activating the same control again, which weakens expected disclosure behavior
- `RISK` FAQ support CTA and final CTA currently resolve to `#line-primary`, which has no runtime target in this baseline

References:

- [section-9-faq.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/sections/section-9-faq/section-9-faq.tsx:187)
- [section-9-faq.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/sections/section-9-faq/section-9-faq.tsx:220)
- [section-9-faq.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/sections/section-9-faq/section-9-faq.tsx:271)
- [content/site-navigation.ts](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/content/site-navigation.ts:508)

### Footer

Status:

- `PASS` footer uses a `footer` landmark
- `PASS` footer nav uses `nav`
- `PASS` contact and social controls have accessible names
- `P1` footer link columns and social/contact placeholders expose many actionable links that currently resolve to `#`
- `RISK` payment methods container has only an `aria-label` on a plain `div`, not a stronger list/group semantic

References:

- [section-11-footer.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/sections/section-11-footer/section-11-footer.tsx:323)
- [section-11-footer.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/sections/section-11-footer/section-11-footer.tsx:339)
- [section-11-footer.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/sections/section-11-footer/section-11-footer.tsx:469)
- [section-11-footer.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/sections/section-11-footer/section-11-footer.tsx:283)
- [content/section-11-footer.ts](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/content/section-11-footer.ts:79)

### Shared Interactive Elements

Status:

- `P0/P1` action semantics are inconsistent across major CTA surfaces
- `PASS` visible focus styling exists on many interactive controls
- `RISK` several text styles are small and use reduced-opacity white, creating contrast risk that should be measured in M10-P1B
- `RISK` Hero scroll animation does not show any reduced-motion handling in the current code

## 6. P0 Findings

### P0-01 Hero primary CTA is inert

Severity:

- `P0`

Why it matters:

- The Hero primary CTA is a major top-of-page action and is exposed as an interactive `button`, but there is no `onClick`, destination, or action contract behind it.
- Keyboard and screen-reader users are told there is an actionable control, but activation does not complete any task.

Evidence:

- [hero-section.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/sections/hero/hero-section.tsx:229)
- [content/hero.ts](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/content/hero.ts:49)

Contained fix scope for `M10-P1B`:

- yes
- likely fix path is to wire this CTA to an existing authority-backed destination or convert it to the correct semantic control without changing layout

## 7. P1 Findings

### P1-01 Header/FAQ/Footer expose placeholder or missing CTA destinations

Why it matters:

- Several high-importance links announce meaningful actions but currently route to `#` or `#line-primary`, and no `line-primary` target was found in runtime code.
- This is misleading for keyboard and assistive-technology users because the control is announced as actionable but does not transport them to the promised destination.

Evidence:

- [content/site-navigation.ts](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/content/site-navigation.ts:481)
- [content/section-11-footer.ts](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/content/section-11-footer.ts:79)
- [section-11-footer.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/sections/section-11-footer/section-11-footer.tsx:283)

### P1-02 Drawer focus return logic may steal focus unexpectedly

Why it matters:

- The drawer effect restores focus to the menu button on every closed state, not only after an actual drawer-close interaction.
- That creates risk of unexpected focus jumps on mount or on any future rerender path that re-enters the closed branch.

Evidence:

- [global-header.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/components/layout/global-header.tsx:70)

### P1-03 FAQ disclosure cannot collapse the currently open item

Why it matters:

- FAQ buttons expose accordion semantics through `aria-expanded`, but re-activating the open item does not collapse it.
- This is not a structural failure, but it is a meaningful usability gap for keyboard and assistive-technology users who expect a disclosure control to toggle its own state.

Evidence:

- [section-9-faq.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/sections/section-9-faq/section-9-faq.tsx:271)

## 8. P2 Findings

### P2-01 No skip-link path was found for bypassing the fixed header

Evidence:

- [app/page.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/app/page.tsx:40)

### P2-02 Footer payment methods use a plain labelled `div` instead of stronger list/group semantics

Evidence:

- [section-11-footer.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/sections/section-11-footer/section-11-footer.tsx:469)

### P2-03 Reduced-motion handling is not evident for the animated Hero scroll indicator

Evidence:

- [hero-section.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/sections/hero/hero-section.tsx:124)

### P2-04 Multiple small, low-opacity text treatments should be contrast-checked during implementation

Examples:

- header tagline
- footer legal text
- security microcopy
- FAQ support description

Evidence:

- [global-header.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/components/layout/global-header.tsx:153)
- [section-11-footer.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/sections/section-11-footer/section-11-footer.tsx:444)
- [section-9-faq.tsx](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/sections/section-9-faq/section-9-faq.tsx:100)

## 9. Recommended M10-P1B Fix Plan

Recommended order:

1. Fix the inert Hero CTA by aligning semantic control type and destination behavior.
2. Replace placeholder or missing high-priority CTA destinations with valid current-runtime targets, starting with shared LINE pathways and footer high-traffic links.
3. Narrow drawer focus restoration so it runs only on true close events.
4. Make FAQ disclosure behavior fully toggleable while preserving current visual baseline.
5. Add low-risk semantic enhancements such as skip-link support, payment group semantics, and reduced-motion handling.
6. Measure and correct any confirmed contrast failures.

Guardrails:

- no redesign
- no `MobileShell` changes
- no section reordering
- no visual changes beyond what is needed to satisfy accessibility semantics and focus visibility

## 10. Non-Goals

- analytics implementation
- runtime consistency beyond accessibility scope
- shared primitives
- design tokens
- Footer migration to shared navigation
- desktop navigation expansion

## 11. Validation / QA Notes

Validation commands:

- `npm run lint` PASS
- `npm run typecheck` PASS
- `npm run build` PASS
- `npm run validate` PASS

Browser QA notes:

- local app launched successfully on `http://localhost:3001`
- attempted in-app browser session for localhost QA
- browser automation surface was unavailable in this session, so fresh live checks for `375px`, `390px`, `414px`, and `430px` could not be completed

Because of that limitation:

- keyboard-order conclusions are based on code-path review, not fresh recorded browser interaction
- horizontal overflow was not freshly re-measured in this audit pass
- M9.5 historical QA evidence remains positive, but this audit does not count it as new manual proof

## 12. Go / No-Go for M10-P1B

Decision:

- `GO`

Reason:

- the `P0` and `P1` items are real, but they are contained
- all required fixes fit within current architecture authorities
- no redesign or broad frozen-section refactor is required to address them
