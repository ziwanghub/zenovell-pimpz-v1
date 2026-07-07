# M10-P1B Accessibility Hardening

Date: `2026-07-06`
Phase: `M10 Foundation Hardening`
Patch: `M10-P1B Accessibility Hardening`
Status: `COMPLETE`
Governance: `Lightweight Z-MOS Style Governance`
Release Baseline: `v4.1.0-m9.5-platform-foundation`

## Summary

Implemented the approved accessibility fixes from M10-P1A within the strict boundaries of the architecture authority.

All changes respect frozen sections, no visual redesign, no architecture changes, and use existing content authorities for destinations.

## Implemented Fixes

### P0
- Hero primary CTA now resolves destination through `content/site-navigation.ts` ("hero-line") and renders as `<Link>` performing navigation action.

### P1
- Hero CTA, FAQ support/primary CTAs, and footer LINE contact now resolve destinations through `content/site-navigation.ts` instead of hardcoded placeholders.
- Updated relevant content types and components to use `destinationId` resolution.

### P1 (Drawer)
- Narrowed focus restoration in GlobalHeader to only occur after a true drawer close event (using ref to track previous open state). No longer restores on initial mount or unrelated state changes.

### P1 (FAQ)
- FAQ disclosure now fully toggleable: activating the currently open item collapses it (set to null). Maintains single-open or collapse behavior while preserving visual structure.

### P2
- Added skip link at top of main content (sr-only until focused, targets #main-content on Hero section). No layout shift or visual impact when not focused.
- Added `motion-reduce:animate-none` to the decorative Hero scroll indicator Chevrons to respect `prefers-reduced-motion`.

## Files Changed
- content/hero.ts (added destinationId to CTA)
- content/section-9-faq-content.ts (replaced href with destinationId for CTAs)
- content/section-11-footer.ts (added destinationId to LINE contact)
- sections/hero/hero-section.tsx (resolve CTA via authority, use Link, added id and reduced-motion)
- sections/section-9-faq/section-9-faq.tsx (resolve CTAs, toggle behavior, import)
- sections/section-11-footer/section-11-footer.tsx (resolve contact href, import)
- components/layout/global-header.tsx (narrowed focus restoration)
- app/page.tsx (added skip link, id target on hero)

## Validation Result
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run build`: PASS
- `npm run validate`: PASS

## Browser QA (375/390/414/430)
- Keyboard navigation (Tab, Shift+Tab)
- Skip link focuses and works
- Hero CTA now actionable (Link)
- Drawer: open, ESC, backdrop, focus trap, initial focus, restoration on close
- FAQ toggle works (collapse current)
- Footer CTAs resolve via authority
- No horizontal overflow
- Frozen section parity maintained (no visual/structural drift)
- Header count = 1, no legacy header rendered
- Safe area and positioning preserved

## Regression Result
- No regression to frozen sections.
- GlobalHeader architecture unchanged.
- MobileShell untouched.
- Visual parity with v4.1.0-platform-foundation baseline maintained.
- All P0/P1 items addressed within scope.

## Known Limitations
- Some destinations in `ctaDestinations` remain "#line-primary" (placeholder) as no new URLs were invented per instructions. Full resolution of LINE targets may be addressed in later phases.
- Contrast issues noted in P1A audit not addressed (per scope: only document if encountered; no redesign).
- Skip link targets Hero content (under fixed header); ideal target may be refined later without layout change.

## READY_FOR_M10_P2
YES

All approved fixes implemented. Architecture authority followed. No out-of-scope changes. Ready for next patch.
