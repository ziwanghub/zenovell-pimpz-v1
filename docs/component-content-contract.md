# Component & Content Contract

This contract defines the minimum implementation rules for landing-page sections in the ZENOVELL V4 active workspace.

## 1. Section Component Rule

- One section = one deliverable
- Each section lives in `sections/<section-name>/`
- Each section exports a reusable component
- Section components must accept typed props
- No section may depend on another section unless explicitly approved

## 2. Content Separation Rule

- Business copy must live in `content/*.ts`
- Do not hard-code business content directly inside JSX
- Content objects must be typed or inferable
- Hero content currently belongs in `content/hero.ts`

## 3. Presentation Rule

- JSX components handle layout and presentation only
- Styling uses Tailwind utilities and approved tokens
- Complex glow/clamp styles may use documented inline style exceptions only when Tailwind cannot express them cleanly

## 4. Shared Component Rule

- `components/ui/` is for shadcn/ui or reusable UI primitives
- `components/layout/` is for layout shells
- Section-specific components stay inside `sections/<section-name>/`
- Do not extract into shared components until reused or clearly stable

## 5. Asset Rule

- Images used by Next.js must be placed under `public/images/` or otherwise imported in an approved Next.js-compatible way
- Use `next/image` for production image rendering
- Hero background must use priority loading
- Decorative images must use `alt=""` and `aria-hidden` when appropriate

## 6. SEO / Accessibility Rule

- Section text must remain crawlable DOM text
- One H1 for the page
- Lists must use `ul/li` when semantically a list
- Interactive elements must have accessible names
- Do not place meaningful text only inside images

## 7. Validation Rule

- Browser screenshot at `390px × 844px` is required for visual approval
- `lint`, `typecheck`, and `build` are required but not enough for approval
- No section is approved without screenshot comparison against Design Authority

## 8. Scope Rule

- Implement only the current section
- No Section 2 work during Hero
- No new package installation without owner/SA approval
- No redesign or design reinterpretation
- If blueprint and implementation conflict, stop and report

## 9. Report Format

Each implementation task must report:

- WHAT_DONE
- FILES_CHANGED
- CONTENT_CHANGED
- VALIDATION_RESULT
- SCREENSHOT_EVIDENCE
- RISKS
- READY_FOR_SA_REVIEW
