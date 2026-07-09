# Navbar Blueprint Lite — Phase 6D

**Project:** ZENOVELL-PIMPZ-V4-Active  
**Phase:** 6D — UI/UX Polish  
**Target:** Navbar (Header + Mobile Drawer)  
**Version:** v1.0 Lite  
**Status:** READY FOR IMPLEMENTATION  
**Date:** 2026-07-09  
**Authority:** Phase 6D Official Declaration + Section 4 Closure

## 1. Executive Summary

Section 4 is COMPLETE and closed. Navbar is the next active target in Phase 6D.

Current implementation (global-header.tsx + mapper + content) is functionally sound and respects Architecture Freeze (uses `activateLineCta` only).

However, the mobile drawer UX lacks premium quality and consistency on narrow viewports.

This **Blueprint Lite** provides a concise, implementation-ready authority focused on:
- Visual premium quality
- Drawer UX consistency (width, hierarchy, treatment)
- Narrow-width comfort (344 / 360)
- Clean integration with completed sections (Hero, Trust, Hero Product, Product Catalog)

No changes to architecture, commerce, CTA behavior, analytics, routing, or completed sections.

## 2. Authority / Baseline Files

- `docs/PHASE6D-UI-UX-POLISH-OFFICIAL-DECLARATION.md`
- `components/layout/global-header.tsx` (current runtime baseline)
- `lib/global-header-mapper.ts`
- `content/site-header.ts`
- `content/site-navigation.ts`
- `app/page.tsx` (integration point inside MobileShell)

Higher authority documents override this lite blueprint if conflict arises.

## 3. Scope

**In Scope (Presentation Layer Only):**
- Header visual treatment and layout
- Mobile drawer UX, width, hierarchy, and visual treatment
- Menu item styling and grouping
- LINE CTA visual role and hierarchy
- Backdrop/overlay treatment
- Safe-area and sticky/scroll behavior
- Responsive behavior on listed mobile breakpoints
- Accessibility and touch comfort

**Out of Scope:**
- Any change to Section 4 or earlier completed sections
- Commerce Foundation, CTA contract/behavior, Analytics, Routing, Product Authority, Business Logic
- Shared architecture or components outside global-header
- New sections or page-level layout changes

## 4. Header Contract

- Container: `max-w-[430px]` (consistent with MobileShell), `fixed inset-x-0 top-0 z-[50]`
- Background: `#0A0A0A` with subtle bottom border `border-white/8`
- Height: `min-h-[60px]`
- Safe area: Respect `env(safe-area-inset-top)` when `visibility.safeAreaTop = true`
- Brand: Left-aligned
  - Wordmark: `text-[17px] font-extrabold tracking-[0.04em] text-[#E91E8C]`
  - Tagline: `text-[10px] leading-[1.4] text-white/50`
- LINE CTA: Right side, primary action (see CTA Hierarchy)
- Menu trigger: Icon button, `size-9` or larger for touch comfort

## 5. Drawer Contract

- Trigger: From header menu button
- Presentation: Right-slide panel via portal (outside MobileShell for layering)
- Background: `#0A0A0A`
- Border: Subtle left border `border-white/10`
- Shadow: `-18px 0 48px rgba(0,0,0,0.42)`
- Height: `h-[100svh]` with safe-area top padding on header area
- Close: X icon in top-right, backdrop click, Escape key

## 6. Drawer Width Rule

- **Locked:** `w-full max-w-[min(92vw, 380px)]`
- Internal horizontal padding: `px-4` (16px)
- Consistent across all mobile breakpoints (344–430)
- Right-aligned slide panel
- Never full-bleed to edges on narrow devices; maintains comfortable margins

## 7. Menu Hierarchy

Use existing `navigationGroups` from `site-navigation.ts`:

- **Main Menu** (primary)
- **Products**
- **Services** (or other groups as defined)

Visual treatment:
- Group headers (if used): uppercase, small, subtle
- Primary items: `min-h-[48px]`, `text-[15px]`, rounded-2xl, subtle border + light bg
- Clear active / focus state with ring
- No icons unless already provided without new assets
- Space-y-2 between items

## 8. CTA Hierarchy

- **Header LINE CTA:** Primary global action. Prominent pink pill/button. Must remain visually dominant.
- **Drawer CTA:** Optional and subordinate only. Must not compete with header CTA. If present, treat as supporting contact action.
- Drawer primarily for navigation. CTA in drawer (if added) should be secondary in visual weight.

## 9. Responsive Rules

Breakpoints to validate (mobile only):

- 344 × 882 (Galaxy Z Fold 5 folded)
- 360 × 740 (Samsung Galaxy S8+)
- 375 × 667 (iPhone SE)
- 390 × 844 (iPhone 12 Pro reference)
- 414 × 896
- 430 × 932 (max MobileShell)

Rules:
- No horizontal overflow at any breakpoint
- No clipped content or touch targets
- Safe-area collision avoided
- 390 × 844 is the visual comfort reference
- 344 and 360 must achieve equivalent rhythm and comfort without layout breakage

## 10. Accessibility Rules

- Full keyboard navigation and focus trap in drawer
- `aria-modal`, proper labels, Escape support
- Minimum touch target 44–48px
- Safe-area respected
- High contrast maintained (current dark theme baseline)
- Screen reader friendly structure

## 11. Protected Scope

**Strictly Forbidden during Navbar work:**

- Any modification to Section 4 (Product Catalog) or earlier completed sections
- Commerce Foundation, CTA Contract, CTA Activation, Analytics Bridge
- Product Authority (`content/products.ts`)
- Routing
- Business Logic
- Shared components outside `global-header.tsx`
- Changes to `activateLineCta` call signatures or behavior
- New sections or changes to page flow outside header

## 12. Implementation Handoff

Implementation must:
- Stay inside `components/layout/global-header.tsx` (and minimal mapper/content if purely visual)
- Follow the exact rules in this document
- Preserve all existing `activateLineCta` and analytics calls
- Produce clean, maintainable className changes only (no new runtime logic)
- Pass all listed acceptance criteria before browser validation

If ambiguity arises during implementation, stop and escalate to SA.

## 13. Acceptance Criteria

Navbar passes when all of the following are true:

- Drawer width locked to `min(92vw, 380px)` with 16px internal padding
- All menu items have minimum 48px touch height and premium dark treatment
- Visual hierarchy in drawer is clear (title → groups → items)
- Header LINE CTA remains the primary visual action
- No CTA in drawer competes with header CTA
- Safe-area, sticky, and scroll shadow behave correctly
- 344 / 360 / 375 / 390 / 414 / 430 all pass visual and touch checks with no overflow or clipping
- 390 × 844 is the comfort reference; narrower widths match its rhythm
- Architecture Freeze is fully respected (verified via code search)
- No regression to Hero, Trust, Hero Product, or Product Catalog

## 14. Ready for Implementation Decision

**Decision:** READY FOR IMPLEMENTATION

This lightweight blueprint provides sufficient guardrails for a focused, high-quality Navbar polish while keeping Phase 6D scope under control and protecting the frozen architecture.

---

**End of Navbar-Blueprint-Lite.md**