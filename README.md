# ZENOVELL PIMPZ V4 Active Workspace

Lightweight production-ready Next.js workspace for the ZENOVELL V4 mobile-first landing page.

Current status:
- Bootstrap complete
- Hero Section 1 implemented and frozen baseline
- Section 2 Trust Bar implemented and frozen baseline
- Section 3 Hero Product implemented and frozen baseline
- Section 4 Product Catalog implemented and frozen baseline
- Section 5 Why Choose Us implemented and frozen baseline
- Visual polish deferred to final site-wide polish phase
- Next active task: Section 6
- Section-by-section delivery flow prepared

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- next/image
- next/font/google
- Framer Motion
- clsx
- tailwind-merge
- lucide-react

## Getting Started

Install dependencies if needed:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Validation Commands

```bash
npm run lint
npm run typecheck
npm run build
npm run validate
```

`npm run validate` runs lint, typecheck, and build in sequence.

## Approval Rules

- Engineering pass requires lint, typecheck, and build success
- UI approval also requires a browser screenshot review
- Screenshot evidence is mandatory before claiming a section is visually approved
- Section 1 Hero is implemented and frozen as the current baseline
- Section 2 Trust Bar is implemented and frozen as the current baseline
- Section 3 Hero Product is implemented and frozen as the current baseline
- Section 4 Product Catalog is implemented and frozen as the current baseline
- Section 5 Why Choose Us is implemented and frozen as the current baseline
- Visual polish items are intentionally deferred to the final site-wide polish phase
- Next implementation task is Section 6
- Do not implement future sections together

## Workspace Structure

```text
app/
components/
content/
docs/
lib/
public/
sections/
```

## Reference Documents

- `docs/project-charter.md`
- `docs/engineering-rules.md`
- `docs/section-implementation-template.md`
- `docs/component-usage-guidelines.md`
- `../../DESIGN/Blueprint-Design-Engineering-Specification.md`

## Notes

- Sections 1, 2, 3, 4, and 5 serve as frozen implementation baselines
- Do not modify frozen sections unless explicitly instructed by SA
- Defer Hero visual polish to the final site-wide polish phase
- Keep content outside presentation components as sections are built
- Optimize for working browser output over unnecessary abstraction

## Current Baseline

- `Section 1` Hero
- `Section 2` Trust Bar
- `Section 3` Hero Product
- `Section 4` Product Catalog
- `Section 5` Why Choose Us

## Next Active Implementation

- `Section 6`
