# WS-01 Shared UI Primitives Inventory & Blueprint

**Date**: 2026-07-06  
**Workstream**: WS-01 Shared UI Primitives  
**Phase**: M10 Foundation Hardening  
**Status**: INVENTORY & BLUEPRINT COMPLETE (No Implementation)  
**Baseline**: v4.1.8-m10-p4e-runtime-performance  
**Scope**: Audit-only per previous M10 governance pattern (Inventory → Audit → Scope Lock → Impl → Release)

## Executive Summary

Complete inventory of duplicated UI primitives across the 11 sections and layout components of the ZENOVELL landing page.

Primary duplications identified:
- LineIcon (SVG LINE logo) duplicated in 11 files
- SectionBadge duplicated in 10 files with identical implementation
- Icon wrappers (circular containers for lucide icons) with similar but varying styles in most sections
- CTA button shells (rounded pink buttons with icon circle, text, chevron) duplicated across 10+ CTAs (Hero, FAQ, Footer, Product, etc.), despite existence of unused shared Button component
- Card / Surface / Glow wrappers and Trust cards with repeated border + bg + shadow + gradient patterns
- Heading blocks and Section intros with near-identical typography and layout
- Other: Trust Row, Surface Panel, Glow Wrapper

No shared primitives currently used from components/ui except a Button that is not adopted in sections.

All findings classified. Extraction roadmap proposed in phases. No code changes made.

This follows the proven M10 pattern to protect Frozen Sections 1-11 and avoid visual drift.

## Files Reviewed

- sections/hero/hero-section.tsx
- sections/section-2-trust-bar/section-2-trust-bar.tsx
- sections/section-3-hero-product/section-3-hero-product.tsx
- sections/section-4-product-catalog/section-4-product-catalog.tsx
- sections/section-5-why-choose-us/section-5-why-choose-us.tsx
- sections/section-6-how-to-order/section-6-how-to-order.tsx
- sections/section-7-privacy-shipping/section-7-privacy-shipping.tsx
- sections/section-8-reviews/section-8-reviews.tsx
- sections/section-9-faq/section-9-faq.tsx
- sections/section-10-final-cta/section-10-final-cta.tsx
- sections/section-11-footer/section-11-footer.tsx
- components/layout/global-header.tsx
- components/layout/mobile-shell.tsx
- components/ui/button.tsx
- app/page.tsx, layout.tsx (for composition)

## Primitive Inventory

### 1. LineIcon
- **Name**: LineIcon
- **Files**: 11 (hero/hero-section.tsx, section-2/...,3,4,5,6,7,8,9,10, components/layout/global-header.tsx)
- **Occurrences**: 11 definitions + usages in CTAs/icons
- **Current ownership**: Duplicated local function in each file (slight size variation: 24 or 28)
- **Visual dependency**: Exact same SVG (green rounded rect + white LINE path)
- **Behavior dependency**: None (presentational)
- **Extraction difficulty**: Low
- **Regression risk**: Medium (if sizes differ in context)
- **Frozen section impact**: High (used in all major frozen sections)
- **Recommended destination**: components/ui/LineIcon.tsx or shared/icons/LineIcon
- **Recommended extraction order**: Phase 1 (highest duplication, simple)

### 2. SectionBadge
- **Name**: SectionBadge
- **Files**: 10 (sections 2,3,4,5,6,7,8,9,10,11)
- **Occurrences**: 10 definitions, used for sectionLabel in intros
- **Current ownership**: Duplicated identical component in each section
- **Visual dependency**: "inline-flex rounded-full bg-[#E91E8C] px-5 py-2 text-[11px] ... shadow-[0_0_14px_rgba(233,30,140,0.35)]"
- **Behavior dependency**: None
- **Extraction difficulty**: Low
- **Regression risk**: Low (identical)
- **Frozen section impact**: High
- **Recommended destination**: components/ui/SectionBadge.tsx
- **Recommended extraction order**: Phase 1

### 3. CTA Button Shell / Wrapper
- **Name**: CTA Button Shell (Hero CTA, FAQ CTA, Footer CTA, Product CTA, etc.)
- **Files**: 10+ (hero, 2,3,4,5,6,7,8,9,10,11, global-header)
- **Occurrences**: Multiple per file in some cases
- **Current ownership**: Custom Link/div + classes + inner white circle + text + Chevron in each
- **Visual dependency**: rounded-full, bg or border with pink, shadow glow, inner icon wrapper
- **Behavior dependency**: onClick for analytics + navigation (Link or a)
- **Extraction difficulty**: Medium (variations in padding, inner structure, some with backdropFilter)
- **Regression risk**: High (frozen visual identity of pink neon CTAs)
- **Frozen section impact**: Very High
- **Recommended destination**: components/ui/CTAButton.tsx (variants for hero/faq/etc) or extend existing Button
- **Recommended extraction order**: Phase 2 (after icons, high risk)
- Note: components/ui/button.tsx exists with cva variants but is NOT used in any section CTA.

### 4. Icon Wrapper
- **Name**: Icon Wrapper (circular container for lucide icons)
- **Files**: Most sections (hero,2,3,4,5,6,7,8,9,10,11, global-header)
- **Occurrences**: 20+
- **Current ownership**: Inline div with varying size (38px,46px), border, bg (solid or radial), shadow
- **Visual dependency**: High (brand pink border/glow)
- **Behavior dependency**: None
- **Extraction difficulty**: Medium (variations)
- **Regression risk**: Medium
- **Frozen section impact**: High
- **Recommended destination**: components/ui/IconWrapper.tsx (with size/variant props)
- **Recommended extraction order**: Phase 1-2

### 5. Trust Card / Trust Row
- **Name**: Trust Card, Trust Row / Micro Trust
- **Files**: section-2-trust-bar (main), also hero TrustStrip, section-3,5, etc have similar trust elements
- **Occurrences**: Multiple definitions
- **Current ownership**: Per-section card with icon + lines
- **Visual dependency**: Icon wrapper + text layout
- **Behavior dependency**: None
- **Extraction difficulty**: Low-Medium
- **Regression risk**: Medium
- **Frozen section impact**: High (trust is key frozen element)
- **Recommended destination**: components/ui/TrustCard.tsx , TrustRow.tsx
- **Recommended extraction order**: Phase 2

### 6. Heading Block / Section Intro
- **Name**: Section Heading Block, Section Intro / Description
- **Files**: Most sections (2,3,4,5,6,7,8,9,10,11)
- **Occurrences**: Duplicated h2 text-[26px] font-extrabold + p text-[14px] leading text-white/65
- **Current ownership**: Local components or inline (e.g. SectionHeading in section-2)
- **Visual dependency**: Typography scale, tracking, color
- **Behavior dependency**: None
- **Extraction difficulty**: Low
- **Regression risk**: Low
- **Frozen section impact**: High
- **Recommended destination**: components/ui/SectionHeading.tsx , SectionDescription.tsx or SectionIntro
- **Recommended extraction order**: Phase 1

### 7. Card Shell / Surface Panel / Glow Wrapper
- **Name**: Card Shell, Surface Panel, Glow Wrapper
- **Files**: 9,10,11,7, etc (many)
- **Occurrences**: Repeated rounded + border + bg-[#130D11] or gradient + shadow-[0_0_16px...]
- **Current ownership**: Inline in each card
- **Visual dependency**: High (glassmorphic pink glow cards)
- **Behavior dependency**: Some have hover transitions
- **Extraction difficulty**: Medium (variations in padding, nested elements)
- **Regression risk**: High
- **Frozen section impact**: High
- **Recommended destination**: components/ui/Card.tsx (with glow/surface variants)
- **Recommended extraction order**: Phase 2-3

### 8. Other Noted
- Hero CTA specific (with backdropFilter, custom boxShadow) - special case of CTA shell
- Divider / small accent lines with shadows
- Product feature / review cards with similar structures
- Avatar or badge rings in final-cta

## Classification Result

**READY** (low risk, high value, clear dupe):
- LineIcon
- SectionBadge
- Heading Block / Section Intro / Description
- Icon Wrapper (core versions)

**READY_AFTER** (after tokens or scope lock):
- CTA Button Shell (needs design token alignment for glows)
- Trust Card / Trust Row
- Card Shell / Surface Panel (after some visual standardization)

**HOLD** (high regression risk on frozen visuals):
- Glow Wrapper / specific shadow values (brand identity)
- Hero CTA special styling (P4B frozen)
- Full CTA wrapper if it affects multiple frozen sections without audit

**DO_NOT_EXTRACT**:
- None identified as fundamentally non-reusable, but some variations may stay if they are one-offs.

## Extraction Roadmap

**Phase 1: Foundational Icons & Badges (lowest risk)**
- LineIcon
- SectionBadge
- Core Icon Wrapper
- Heading / Description blocks

**Phase 2: Interactive Surfaces (CTAs, Cards)**
- CTA Button Shell (create variants, migrate gradually)
- Trust Card / Row
- Card Shell / Surface Panel / Glow Wrapper (base + glow variant)

**Phase 3: Specialized / High-Impact**
- Hero-specific and product-specific variations
- Any remaining badge/icon wrappers

**Phase 4: Polish & Adoption**
- Update all call sites
- Deprecate locals
- Add to shared exports
- Full regression across frozen sections

Extraction must be done one primitive at a time, with visual regression checks at 375/390/414/430, after independent audit for each.

## Validation Result

- npm run lint: PASS
- npm run typecheck: PASS
- npm run build: PASS
- npm run validate: PASS

No code changes; baseline health unchanged.

## Readiness for Independent Audit

READY_FOR_INDEPENDENT_AUDIT: YES

Complete inventory with counts, dependencies, risks, and phased roadmap. All per strict "no implementation" rule. Ready for Gemini or SA review before any extraction work begins.

Next (after this inventory + audit + possible scope lock): phased implementation starting Phase 1.
