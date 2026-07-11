# Analytics — GTM + GA4 Integration (Implementation Note)

**Date**: 2026-07-10
**Status**: **Analytics Integration COMPLETE** · **Infrastructure FROZEN / PRODUCTION BASELINE** (application + published GTM Version 2 + GA4 live Realtime).
**GTM Container**: GTM-P7MSP66X
**GTM Live Version**: **2 (PUBLISHED)**
**GA4 Measurement ID**: G-J8HYPV9S4N
**Closeout**: `docs/reports/phase6/ANALYTICS-INTEGRATION-CLOSEOUT.md`
**Deferred QA**: `docs/governance/backlog/QA-001-CTA-SURFACE-REGRESSION.md`

## Core Rules

- **GTM is the single tag-loading authority.**
- Application code loads **only** GTM via `NEXT_PUBLIC_GTM_ID`.
- **Never** install direct GA4 gtag.js or call `gtag('config', 'G-J8HYPV9S4N')` in source.
- GA4 Measurement ID lives exclusively inside the GTM dashboard (Google tag + event tags).
- `NEXT_PUBLIC_GA_ID` must not be introduced.

## Environment Contract

```env
NEXT_PUBLIC_GTM_ID=GTM-P7MSP66X
```

- Required on Hostinger for production / beta.
- **Validation**: Must match `^GTM-[A-Z0-9]+$` after trim. `GTM-P7MSP66X` is valid.
- Invalid/missing ID → script + noscript not rendered + adapter not activated (safe noop).

## Analytics Event Schema

```js
{
  event: "line_cta_click",
  event_version: 1,
  cta_location: "...",
  destination: "line_oa",
  page_path: "...",
  link_url: "https://lin.ee/syjmYE2",
  source: "...",
  intent: "...",
  // optional: product_slug, sku
}
```

## Implementation Summary

- `components/analytics/google-tag-manager.tsx` — GTM bootstrap.
- `components/analytics/analytics-bootstrap.tsx` — client GTMAdapter registration.
- `lib/analytics/adapters/gtm-adapter.ts` — `window.dataLayer.push`.
- Commerce `LINE_CLICK` → `line_cta_click` via `commerce-analytics-bridge.ts`.
- CTA surfaces use `activateLineCta()` / `performLineHandoff()`.

## Production Evidence (Closeout)

| Layer | Status |
|---|---|
| Application → dataLayer | VERIFIED |
| GTM Version 2 published | VERIFIED (Owner) |
| GA4 DebugView custom parameters (pre-publish) | VERIFIED (Owner) |
| GA4 Realtime `page_view` + `line_cta_click` (real mobile) | VERIFIED (Owner) |
| Full multi-surface CTA retest after publish | **DEFERRED (QA-001)** |

**No application source change required.**
**No GTM configuration change currently required.**

## Validation Commands

```bash
npm run lint
npm run typecheck
npm run build
# or
npm run validate
```

## Rollback

- Application: unset `NEXT_PUBLIC_GTM_ID` or revert analytics commits.
- GTM: roll back container version in GTM UI (Owner only).

## References

- Analytics Integration Closeout
- RC3 Parameter Contract Closure
- QA-001 CTA Surface Regression (deferred)
