# Analytics — GTM + GA4 Integration (Implementation Note)

**Date**: 2026-07-10
**Status**: Application + RC3 verification COMPLETE on Production Candidate (beta). GTM **publication** remains pending separate authorization.
**GTM Container**: GTM-P7MSP66X (beta.zenovell.com)
**GA4 Measurement ID**: G-J8HYPV9S4N (configured in GTM only)
**RC3 Closure**: `docs/reports/phase6/RC3-GTM-ANALYTICS-PARAMETER-CONTRACT-CLOSURE.md`

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
- Development: one console.warn for invalid ID.
- The ID is public (safe to commit in .env.example).

## Analytics Event Schema

All GTM/dataLayer payloads include:
```js
{
  event: "line_cta_click",
  event_version: 1,
  ...
}
```

`event_version` lives only at the analytics/dataLayer boundary. Commerce contracts are untouched.

## Development Diagnostics

When `NODE_ENV=development`:
- Successful pushes: `[Analytics:GTM] line_cta_click` + JSON payload
- No logs in production.
- Invalid ID: one concise `console.warn` (no throw, no render).

## Implementation Summary

- `components/analytics/google-tag-manager.tsx` — thin next/script + noscript wrapper.
- Root `app/layout.tsx` mounts `<GoogleTagManager />` exactly once.
- `lib/analytics/adapters/gtm-adapter.ts` — pushes to `window.dataLayer`.
- Adapter registration: `initializeAnalyticsAdapters(["gtm"])` when env present.
- Commerce `LINE_CLICK` is centrally mapped in `commerce-analytics-bridge.ts` → `line_cta_click`.
- All CTA surfaces continue to use `activateLineCta()` / `performLineHandoff()` (no per-component changes).
- `dataLayer` push is synchronous and non-blocking for LINE handoff.

## DataLayer Event (line_cta_click)

```js
window.dataLayer.push({
  event: "line_cta_click",
  cta_location: "hero-line" | "header-line" | "final-cta" | ...,
  destination: "line_oa",
  product_slug: "...",
  page_path: "...",
  link_url: "https://lin.ee/syjmYE2",
  // + safe attribution fields when present
});
```

Privacy: No PII, no message text, no phone, no user IDs, no full query strings.

## Validation Commands

```bash
npm run lint
npm run typecheck
npm run build
# or
npm run validate
```

## RC3 Verified State (2026-07-11)

Application (beta Production Candidate):

- Client analytics bootstrap registers GTM adapter in browser runtime.
- `line_cta_click` enters `window.dataLayer` once per click.
- Parameter contract verified for 14/14 LINE CTA surfaces.
- Canonical `link_url` = `https://lin.ee/syjmYE2`.

GTM / GA4 (Preview path — Owner evidence):

- Preview connected to beta.zenovell.com
- Google tag G-J8HYPV9S4N detected
- Trigger matched; GA4 Event tag fired for `line_cta_click`
- GA4 Realtime received `line_cta_click`

**Not completed in RC3:**

- GTM container **publish**
- Post-publish public conversion verification
- Final clearance of Ecommerce / pause / warning settings before publish

## Post-Deploy Manual Steps (Owner)

1. Set `NEXT_PUBLIC_GTM_ID=GTM-P7MSP66X` in Hostinger environment for the beta site.
2. Redeploy application when source changes require it.
3. Open GTM Preview → connect https://beta.zenovell.com
4. Verify container loads once, correct ID, LINE CTAs emit `line_cta_click`.
5. Confirm Google tag Measurement ID = G-J8HYPV9S4N and GA4 Event tag parameters map dataLayer fields.
6. Validate via Tag Assistant + GA4 Realtime / DebugView.
7. Before publish: verify Ecommerce toggles, tag pause, and warning state.
8. Publish GTM container version **only after** explicit Owner authorization (separate gate from RC3).

## Rollback

- Remove or unset `NEXT_PUBLIC_GTM_ID` → reverts to noop.
- Revert the few changed files listed in the implementation report.
- No impact on LINE handoff or UI.

## References

- Previous Audit: GA4_GTM_AUDIT_RESULT
- GTM as authority per Google guidance (no parallel gtag.js)
- Existing analytics abstraction preserved.
