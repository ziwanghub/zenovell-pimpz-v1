# QA-001 — CTA Surface Regression Test

| Field | Value |
|---|---|
| ID | **QA-001** |
| Title | CTA Surface Regression Test |
| Status | **DEFERRED** |
| Priority | Release gate (pre–zenovell.com) |
| Owner | Production Integration / QA |
| Analytics infrastructure blocker? | **NO** |

## Context

Analytics Integration (RC1–RC4C) is **COMPLETE**, including published GTM Version 2 and live GA4 Realtime reception of `line_cta_click` from real mobile usage.

A full matrix of every CTA surface after UI/UX changes is **not** required to declare analytics infrastructure complete. It **is** required before final production domain release.

## Trigger

Run **after UI/UX Freeze** and **before** final `zenovell.com` production release.

Do not block Search Console prep, Ads prep, or design freeze on this item.

## Scope

Verify each production-facing LINE / conversion CTA, including:

- Header CTA
- Drawer CTA
- Hero CTA
- Trust CTA
- Hero Product CTA
- Product Catalog CTA
- Why Choose Us CTA
- How To Order CTA
- Privacy CTA
- Reviews CTA
- FAQ CTA
- Final CTA
- Footer CTA
- Product detail CTA
- Information CTA
- Knowledge CTA
- **Any CTA added or altered during UI/UX work**

## Acceptance Criteria

For each surface:

1. Correct LINE destination (canonical `https://lin.ee/syjmYE2` / OA `@362lupso` via official redirect)
2. One click → exactly one `line_cta_click`
3. Correct `cta_location`
4. Correct `source`
5. Correct `intent`
6. Correct product context (`product_slug` / `sku`) where applicable
7. No duplicate conversion events
8. No critical console errors

## Evidence Required

- Device / browser note
- dataLayer and/or GA4 DebugView / Realtime evidence per surface (or sampling plan approved by Owner if matrix is large)
- Pass/fail matrix attached to release evidence pack

## Non-goals

- Rebuilding analytics architecture
- Republishing GTM unless a defect is proven
- Backend / checkout / CRM testing

## Exit

When all in-scope surfaces meet acceptance criteria (or Owner-approved residual risk is recorded), mark QA-001 **COMPLETE** and allow production domain switch gate to proceed.
