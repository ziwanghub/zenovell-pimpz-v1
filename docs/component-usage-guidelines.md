# Component Usage Guidelines

This document defines how components should be used in the active workspace as Sections 1–3 establish the current implementation baseline.

## Follow Component Registry

- Always check `DESIGN/Component-Registry.md` before creating or reusing a component
- Design status and implementation status both matter
- If registry guidance and implementation convenience conflict, follow the registry and blueprint

## Keep Components Section-Local When

- The component is used by one section only
- The component exists as embedded implementation rather than shared implementation
- The blueprint defines the component as section-specific
- The API is still unstable or tightly coupled to one section layout

Section-local components belong inside:

- `sections/<section-name>/`

## Use `components/ui` When

- The component is already an approved shared UI primitive
- The component is part of `shadcn/ui`
- The component is reused across multiple sections and has already been approved for extraction

Do not place section-specific presentation components in `components/ui/`.

## Use `components/layout` When

- The component is a page or layout shell
- The component governs shared outer structure rather than section-specific UI

Current example:

- `components/layout/mobile-shell.tsx`

## When To Propose Shared Extraction

Propose extraction only when all of the following are true:

- the component has real reuse across multiple sections
- the API is stable
- the styling pattern is no longer section-coupled
- SA approval is available for extraction

## No Pre-Emptive Refactor Rule

- Do not extract early just because two sections look similar
- Do not refactor embedded components into shared files during section delivery unless explicitly instructed
- Do not promote a component during implementation by assumption alone

## Current Workflow Guidance

- Section 1 Hero is the frozen baseline
- Section 2 Trust Bar is the frozen baseline for post-hero reusable patterns
- Section 3 is implemented and under SA visual freeze review
- Future sections should prefer section-local implementation first, then follow registry promotion rules after approval
