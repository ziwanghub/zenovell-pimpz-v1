# M10-P3 Analytics Foundation Architecture

Date: `2026-07-06`
Phase: `M10 Foundation Hardening`
Workstream: `WS-05 Analytics Foundation`
Status: `Architecture Only`
Governance: `Lightweight Z-MOS Style Governance`
Release Baseline: `v4.1.1-m10-p2-runtime-consistency`

## 1. Executive Summary

This document establishes the Analytics Foundation Architecture for the ZENOVELL V4 platform. Following the completion of M9.5 Platform Foundation and M10-P1/P2 hardening, the system now has stable shared runtime (GlobalHeader, Drawer, contracts) over frozen sections.

The goal is to define a vendor-neutral, maintainable analytics layer that can be instrumented in future phases (P3B+) without altering frozen UI or architecture.

Key principles:
- Use existing content authorities (site-navigation.ts, site-header.ts) for events.
- Keep instrumentation separate from UI components.
- Support current surfaces only (no new features).
- Enable future expansion to multi-product/platform.

## 2. Current Interaction Inventory

Based on runtime surfaces (GlobalHeader, Hero, Sections 2-11, Footer):

### Header (GlobalHeader)
- LINE CTA click (header-line)
- Menu button click (drawer_open)
- Drawer close (X button, ESC, backdrop) (drawer_close)
- Drawer navigation link click (navigation_click)

### Hero (Section 1)
- Primary CTA click (hero_cta)
- Scroll indicator (decorative, no event)

### Trust Bar / Product / Catalog / Why Choose Us / How to Order / Privacy / Reviews
- Product CTA clicks (product_click)
- Section-specific CTAs (section_cta_click)
- Trust item interactions (if any, mostly static)

### FAQ (Section 9)
- FAQ item expand (faq_expand)
- FAQ item collapse (faq_collapse)
- Support CTA click (support_line_click or line_click)
- Final LINE CTA click (section_line_click or line_click)

### Footer (Section 11)
- Navigation link clicks (footer_click, navigation_click)
- Contact clicks (contact_click) — LINE, phone, email
- Social icon clicks (social_click)
- Payment badges (static, no event)

### Global
- Page view (page_view)
- Skip link activation (if tracked)

Total unique interactions: ~15-20 core events.

## 3. Event Taxonomy

Standardized, kebab-case, descriptive, vendor-neutral names based on existing AnalyticsEventKey in site-navigation.ts and extended:

- page_view
- header_cta_click (for LINE in header)
- drawer_open
- drawer_close
- navigation_click (general nav links)
- hero_cta_click
- product_click
- faq_expand
- faq_collapse
- support_cta_click
- footer_cta_click
- contact_click
- social_click
- menu_open (alias for drawer_open if needed)
- menu_click (for nav in drawer)

Events are prefixed by surface where ambiguous (e.g., header_ vs footer_).

## 4. Event Ownership Matrix

| Event                | Runtime Owner              | Content Authority          | Future Instrumentation Location |
|----------------------|----------------------------|----------------------------|---------------------------------|
| page_view           | app/page.tsx              | N/A                        | Root layout or page wrapper    |
| header_cta_click    | GlobalHeader              | site-header.ts (lineCta) + site-navigation.ts | GlobalHeader component         |
| drawer_open         | GlobalHeader              | site-header.ts (menuTrigger) | GlobalHeader                   |
| drawer_close        | GlobalHeader              | N/A                        | GlobalHeader                   |
| navigation_click    | GlobalHeader (drawer) + Footer + Nav in sections | site-navigation.ts (groups) | GlobalHeader + Section components |
| hero_cta_click      | HeroSection               | content/hero.ts (cta) + site-navigation.ts (hero-line) | HeroSection                    |
| product_click       | Section 4 / Catalog       | content/section-4-*.ts + site-navigation.ts | Product components             |
| faq_expand          | Section9Faq               | content/section-9-faq-content.ts | FaqItemRow                     |
| faq_collapse        | Section9Faq               | content/section-9-faq-content.ts | FaqItemRow                     |
| support_cta_click   | Section9Faq + Footer      | site-navigation.ts         | Support card components        |
| footer_cta_click    | Section11Footer           | site-navigation.ts + section-11-footer.ts | Footer components              |
| contact_click       | Section11Footer           | site-navigation.ts (contacts) | ContactItem                    |
| social_click        | Section11Footer           | site-navigation.ts (socials) | FooterSocialIconLink           |

## 5. Event Payload Contract (Vendor-Neutral)

Recommended standard payload (JSON-like):

```json
{
  "event": "string",           // e.g. "hero_cta_click"
  "surface": "string",         // "header" | "hero" | "drawer" | "faq" | "footer" | "section"
  "section": "string",         // "1" | "9" | "11" | "global" | id
  "destination": "string",     // resolved href or destinationId
  "label": "string",           // visible text or aria
  "value": "string|number",    // optional, e.g. product id
  "timestamp": "ISO8601",
  "page_url": "string",
  "user_agent": "string"       // optional, server-side
}
```

Keep minimal for privacy. Extend per event.

## 6. Analytics Layer Architecture

Proposed layers (to be implemented in P3B+):

1. **UI Components** (frozen or shared)
   - Emit events via interface (no direct vendor calls)
   - e.g. onClick={() => analytics.track('hero_cta_click', payload)}

2. **Analytics Interface** (contract layer)
   - Type-safe track(event: string, payload: Payload)
   - Defined in lib/analytics or similar (future)

3. **Analytics Dispatcher**
   - Central hub that routes events
   - Applies filters, enrichment (e.g. add section context)

4. **Vendor Adapter Layer**
   - Pluggable adapters for GA4, Meta, TikTok, Custom
   - Each adapter maps neutral payload to vendor format

5. **Initialization**
   - In root layout or _app equivalent
   - Config-driven (env, feature flags)

This decouples UI from vendors.

## 7. Vendor Independence Strategy

- All events defined in neutral taxonomy (extend AnalyticsEventKey).
- Payload is abstract; adapters translate.
- No direct window.gtag or fbq calls in components.
- Support multiple vendors simultaneously or A/B.
- Fallback to console or custom endpoint for development.

## 8. Rollout Plan

- **P3B**: Analytics utility / interface + dispatcher skeleton (no vendors).
- **P3C**: Instrument core events in GlobalHeader, Hero, FAQ, Footer using the interface.
- **P3D**: Add vendor adapters (GA4 first), config, and production wiring.
- Defer: Product clicks, advanced params until functional completion.

## 9. Risk Analysis

- **Over-instrumentation**: Mitigate by strict event taxonomy and ownership matrix.
- **Privacy**: Payload minimal; respect consent (future).
- **Performance**: Dispatcher lightweight; lazy load adapters.
- **Frozen sections**: Instrumentation only in shared or via props; no direct edits.
- **Drift**: Central event model in contracts.

## 10. Validation Strategy

- Architecture review + approval before P3B.
- After instrumentation: npm validate + browser QA at 4 viewports.
- Event firing verified (console or test endpoint).
- No impact on frozen visuals or performance baseline.

## 11. Definition of Done

- Architecture doc approved.
- Event taxonomy + matrix complete.
- Payload contract defined.
- Layered architecture diagram + rollout plan documented.
- No code changes in this phase (pure architecture).

This foundation enables safe, consistent analytics rollout without affecting the mobile-first frozen experience.
