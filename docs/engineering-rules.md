# Engineering Rules

## Lightweight Z-MOS Style Governance

This project uses lightweight governance suitable for a mobile landing page, not heavyweight enterprise runtime control.

## Working Rules

- Implement only the approved section in scope
- Keep the workspace simple and browser-first
- Do not introduce extra packages without a clear UI need
- Do not build design abstractions before the Hero is proven
- Keep content outside rendering components where practical

## Development Cache Policy

- Development = Fresh every refresh
- Production = Optimize intentionally
- `npm run dev` must not rely on browser cache to show the latest UI state
- During development, disable service worker usage and clear stale browser caches
- During development, serve pages, images, JS, CSS, and API responses with `no-store`
- During production, optimization and caching may be enabled deliberately after review
- UI review must assume fresh assets on every reload without manual cache clearing

## Validation Rules

- Required: `npm run lint`
- Required: `npm run typecheck`
- Required: `npm run build`
- Required for UI approval: browser screenshot evidence
- Not sufficient alone: lint, typecheck, and build

## Deliverable Rules

- One section = one deliverable
- Report files changed
- Report commands run
- Report validation result
- Save screenshot evidence in `docs/reports/` or reference its location in the delivery report
