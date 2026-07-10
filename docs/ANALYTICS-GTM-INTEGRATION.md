# Analytics — GTM + GA4 Integration (Implementation Note)

**Date**: 2026-07-10  
**Status**: Implemented (pre-deployment)  
**GTM Container**: GTM-P7MSP66X (beta.zenovell.com)  
**GA4 Measurement ID**: G-J8HYPV9S4N (configured in GTM only)

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

## Post-Deploy Manual Steps (Owner)

1. Set `NEXT_PUBLIC_GTM_ID=GTM-P7MSP66X` in Hostinger environment for the beta site.
2. Redeploy.
3. Open GTM Preview → connect https://beta.zenovell.com
4. Verify container loads once, correct ID, LINE CTAs emit `line_cta_click`.
5. In GTM (later):
   - Add Google tag → Measurement ID = G-J8HYPV9S4N
   - Create GA4 Event tag for `line_cta_click` with Data Layer variables for parameters.
6. Validate via Tag Assistant + GA4 Realtime / DebugView.
7. Publish GTM container version **only after** successful preview.

## Rollback

- Remove or unset `NEXT_PUBLIC_GTM_ID` → reverts to noop.
- Revert the few changed files listed in the implementation report.
- No impact on LINE handoff or UI.

## References

- Previous Audit: GA4_GTM_AUDIT_RESULT
- GTM as authority per Google guidance (no parallel gtag.js)
- Existing analytics abstraction preserved.
