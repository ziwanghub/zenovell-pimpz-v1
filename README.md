# ZENOVELL PIMPZ V4 Active Workspace

Lightweight production-ready Next.js workspace for the ZENOVELL V4 mobile-first landing page.

Current status:
- Bootstrap complete
- Hero Section 1 implemented and frozen baseline
- Section 2 Trust Bar implemented and frozen baseline
- Section 3 Hero Product implemented and ready for SA visual freeze review
- Visual polish deferred to final site-wide polish phase
- Next active task: Section 4 only after Section 3 approval
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
- Section 3 Hero Product is implemented and pending SA freeze decision
- Visual polish items are intentionally deferred to the final site-wide polish phase
- Next implementation task is Section 4 only after Section 3 approval
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

- Sections 1 and 2 serve as frozen implementation baselines
- Section 3 is implemented and awaiting SA freeze review
- Do not modify frozen sections unless explicitly instructed by SA
- Defer Hero visual polish to the final site-wide polish phase
- Keep content outside presentation components as sections are built
- Optimize for working browser output over unnecessary abstraction
