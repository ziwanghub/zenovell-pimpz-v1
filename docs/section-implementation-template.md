# Section Implementation Template

This template defines the standard implementation shape for each landing-page section in the active workspace.

## Standard Section Folder Structure

Each section should use:

```text
sections/<section-name>/
  index.ts
  <section-name>.tsx
```

Section-specific helper components may live inside the same section folder when needed.

## Required Files Per Section

Minimum required files for a new section:

- `sections/<section-name>/index.ts`
- `sections/<section-name>/<section-name>.tsx`
- `content/<section-name>.ts`

Required asset folder when runtime images exist:

- `public/images/<section-folder>/`

## Naming Convention

- Section folder: kebab-case
- Main section file: same as folder name
- Content file: same as section name in `content/`
- Runtime image folder: numeric or section-specific folder approved by blueprint
- Export name: PascalCase section component

Examples:

- `sections/hero/hero-section.tsx`
- `sections/section-2-trust-bar/section-2-trust-bar.tsx`
- `sections/section-3-hero-product/section-3-hero-product.tsx`
- `content/section-2-trust-bar.ts`
- `content/section-3-hero-product.ts`

## Content File Rule

- Business copy must live in `content/*.ts`
- Section components must receive typed content props
- Do not hard-code business copy in JSX
- Prices, CTA labels, aria labels, benefit text, and trust text belong in the section content file

## Asset Folder Rule

- Runtime images must live under `public/images/`
- Reference images from design authority are not runtime UI
- Use `next/image` for meaningful section artwork
- Use descriptive `alt` text for meaningful images
- Use `alt=""` and `aria-hidden` only for decorative imagery

## Screenshot / Report Rule

Every section implementation must produce:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- browser runtime check
- `390px × 844px` screenshot evidence
- screenshot comparison against Design Authority

Screenshot artifacts should be stored under:

- `docs/reports/`

Implementation reports must include:

- `WHAT_DONE`
- `FILES_CHANGED`
- `CONTENT_CHANGED`
- `ASSETS_ADDED`
- `VALIDATION_RESULT`
- `SCREENSHOT_EVIDENCE`
- `RISKS`
- `READY_FOR_SA_REVIEW`
