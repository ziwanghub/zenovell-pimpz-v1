# REPOSITORY STRUCTURE & GOVERNANCE GUIDE
**ZENOVELL-PIMPZ-V4-Active Official Team Standard**

**Version**: v1.0.0  
**Effective Date**: 2026-07-07  
**Status**: ACTIVE  
**Audience**: Human Developers, Grok CLI, Grok Heavy, Gemini, ChatGPT, Future AI Agents  

---

## 1. Purpose
This document serves as the single canonical reference for the file layout, architecture, and governance rules of the `ZENOVELL-PIMPZ-V4-Active` project. 

All team members—including human software engineers and AI developers—**must** read and verify their workspace against this guide before initiating any architectural discussion, planning, or code implementation. Strict adherence ensures repository hygiene, prevents configuration drift, protects frozen assets, and enforces Z-MOS style lightweight governance.

---

## 2. Canonical Workspace
The only official, authorized working directory for this project is:
`/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active`

All terminal processes, linting commands, typechecks, compilation servers, and file-write commands must run with this directory set as the Working Directory. Under no circumstances may an agent perform development or references inside sibling repositories (such as `ZENOVELL-V1-PIMPZ`) or archive directories.

> **See also:** [PROJECT-WORKSPACE-HIERARCHY.md](PROJECT-WORKSPACE-HIERARCHY.md) for the distinction between Workspace Root and Canonical Project Workspace.

---

## 3. Workspace Structure
The workspace root at `/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/` is partitioned into distinct high-level directories:

*   **`DESIGN/`**: Contains core branding visual assets, Figma specifications, and design engineering guides (e.g. typography token rules). No code belongs here.
*   **`CORE/`**: Contains part-wide runtimes, SDK platforms, and scripts (e.g., `zmos-clean-runtime`) shared across the enterprise structure.
*   **`ARCHIVE/`**: Stores read-only historical codebases of past project releases. Useful only for regression checking and diff reference.
*   **`PROJECTS/`**: Houses the active projects. Currently contains the active working codebase: `PROJECTS/ZENOVELL-PIMPZ-V4-Active/`.

---

## 4. Project Structure
The active project `ZENOVELL-PIMPZ-V4-Active/` contains the following directories:

*   **`app/`**: Route definitions using Next.js App Router.
*   **`sections/`**: The visual sections (Sections 1–11) rendering the Landing Page.
*   **`components/`**: Reusable design tokens, layouts, and primitives.
*   **`content/`**: Static metadata config files and local database entities (Product Authority).
*   **`lib/`**: Domain packages containing pure code (Commerce) and structural logic (Platform).
*   **`public/`**: Static assets, images, icons, and SEO configuration details.
*   **`docs/`**: Governing records, ADRs, blueprints, and independent audit reports.

---

## 5. Folder Responsibilities

### `app/(platform)/`
- **Purpose**: Defines route handlers, layout parameters, and dynamic route files for platform landing spokes.
- **Owner**: Platform Architect
- **Allowed Changes**: Structural route creation, static generation bindings (`generateStaticParams`).
- **Forbidden Changes**: Visual component styling definitions, hardcoding of product texts.
- **Typical Contents**: `[slug]/page.tsx`, `layout.tsx`.

### `sections/`
- **Purpose**: Houses the 11 visual sections rendering the core Landing Page.
- **Owner**: Presentation Architect
- **Allowed Changes**: **None (FROZEN)**.
- **Forbidden Changes**: Any visual style modifications, DOM restructurings, or anchor mutations.
- **Typical Contents**: Component files like `sections/hero/` and `sections/section-2-trust-bar/`.

### `content/`
- **Purpose**: Single Source of Truth for product parameters, navigation metadata, and translations.
- **Owner**: Content Manager / Product Owner
- **Allowed Changes**: Pricing corrections, SKU definitions, translation text adjustments.
- **Forbidden Changes**: React components, CSS files, DOM selectors.
- **Typical Contents**: `content/products.ts` (Product Authority), config files.

### `lib/commerce/`
- **Purpose**: Implements core, pure commerce contracts (attributions, LINE CTA compiling, event dispatchers).
- **Owner**: Lead Solution Architect
- **Allowed Changes**: Additive pure TypeScript utilities under approved ADRs.
- **Forbidden Changes**: Imports of React, Tailwind styles, or any DOM APIs.
- **Typical Contents**: `context.ts`, `line-message-builder.ts`, `events.ts`.

---

## 6. Architecture Layers & Dependency Flow
The codebase implements a strict unidirectional dependency structure:

```text
[ Presentation Layer ] (app/, sections/, components/ui/)
         ↓
[ Platform Layer ] (lib/platform/)
         ↓
[ Commerce Layer ] (lib/commerce/)
         ↓
[ Content Layer / Data ] (content/)
```

### Dependency Rules:
1. **Presentation** may depend on **Platform** loaders and **Commerce** contracts.
2. **Platform** may depend on **Commerce** abstractions and **Content** static data.
3. **Commerce** must remain **pure**. It cannot import anything from the Presentation or Platform layers.
4. **Circular references** between layers are strictly prohibited.

---

## 7. Folder Classification Table

| Folder Path | Type | Responsibility | Owner |
|-------------|------|----------------|-------|
| `app/` | Platform | Dynamic routes and routing structure | Platform Architect |
| `sections/` | Presentation | Visual landing sections (FROZEN) | Presentation Architect |
| `components/ui/` | Presentation | Atomic layout and style primitives | UI Lead |
| `content/` | Data | Product details, configurations (SSOT) | Content Manager |
| `lib/platform/` | Platform | Entity loader and metadata wrappers | Platform Architect |
| `lib/commerce/` | Domain | Pure commerce business rules | Lead SA |
| `docs/architecture/` | Governance | Decision records, blueprints, locks | Chief Architect |
| `docs/reports/` | Governance | Historical audit records (Read-Only) | Independent Auditor |

---

## 8. Governance Hierarchy
Decisions are governed by a strict hierarchy of authority. Lower levels cannot override decisions locked in higher levels:

```text
  [ Owner Direction (ZZ) ]                ← Ultimate Authority
            ↓
  [ Architectural Decision Record (ADR) ]
            ↓
  [ Milestone Blueprint ]
            ↓
  [ Phase Scope Lock ]
            ↓
  [ Production Readiness Gate / Release Strategy ]
            ↓
  [ Work Package Implementation Plan ]    ← Lowest Authority
```

---

## 9. Current State vs. Target State
To prevent development errors, agents must clearly distinguish implemented code (Current State) from planned architecture (Target State):

*   **Product Authority**:
    *   *Current State*: Static TypeScript database `content/products.ts` acting as the Single Source of Truth for 6 products.
    *   *Target State*: Dynamic Headless CMS API mapping (not implemented; deferred to Phase 5.5+).
*   **Commerce Context Persistence**:
    *   *Current State*: `SessionStorage` skeleton structure (`lib/commerce/persistence.ts`).
    *   *Target State*: Global `CommerceContextProvider` component wrapping the root layout (planned for Phase 5F).

*Rule*: Never import or call target state skeletons as if they are active runtime systems.

---

## 10. Frozen Areas
During Phase 5 development, the following areas are **strictly frozen** and must not be altered:
- **Homepage Visuals**: `app/page.tsx` and all folders under `sections/` (Sections 1–11).
- **Core Primitives**: UI tokens extracted in workstream WS-01.
- **MobileShell**: The responsive viewport shell.
- **Commerce Foundation Contracts**: `lib/commerce` files from Phase 4 (Context, CTA, LINE Builder) cannot be modified without ADR approval.

---

## 11. Working Rules for Agents
Every agent must execute this checklist at startup:
1.  **Workspace Verification**: Run git diagnostics to confirm the working directory matches the canonical workspace.
2.  **Verify Phase**: Query `docs/architecture/` to confirm the active milestone phase.
3.  **Read the Scope Lock**: Inspect `PHASE5-COMMERCE-EXPERIENCE-SCOPE-LOCK.md` to identify allowed vs forbidden changes.
4.  **Validate**: Run `npm run validate` before starting work to confirm a green baseline.

---

## 12. Repository Modification Rules
-   **Prohibited**: Direct edits to frozen landing sections, direct React imports in commerce libraries, or modifying logs in `docs/reports/`.
-   **Requires Approval**: Creating new routes under `app/`, adding fields to `content/products.ts`, or extending metadata helpers.
-   **Safe for Implementation**: Adding presentational components under new spoke pages (e.g. `/products/[slug]`).

---

## 13. Common Mistakes to Avoid
-   **Wrong Directory**: Committing changes inside sibling folders (e.g., `ZENOVELL-V1-PIMPZ`).
-   **Scope Lock Bypass**: Implementing features (like motion libraries or CMS interfaces) that are explicitly deferred.
-   **Context Loss**: Navigating between routes without passing the `CommerceContext` query payload.
-   **Mixing States**: Implementing layout designs before component contracts are established.

---

## 14. Agent Responsibilities
-   **Grok CLI (Implementation Agent)**: Implements code strictly within the active work package limits. Reports changed files.
-   **Grok Heavy (Architecture Reviewer)**: Reviews strategy, validates dependency rules, and challenges design assumptions. Does not write code.
-   **Gemini (Audit Agent)**: Audits implementation against ADRs, Scope Locks, and gates. Produces independent audit logs.
-   **Project Owner (ZZ)**: The final sign-off authority for all milestones, blueprints, and code releases.

---

## 15. Team Standard
**No workspace verification, no implementation.** Every task, prompt, and execution session begins with the Workspace Verification block. No exceptions are tolerated.

---

## 16. Related Governance Standards
*   **Onboarding**: [AI-ONBOARDING.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/AI-ONBOARDING.md)
*   **Startup Checklist**: [AGENT-STARTUP-CHECKLIST.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/AGENT-STARTUP-CHECKLIST.md)
*   **Authority Model**: [REPOSITORY-AUTHORITY-GUIDE.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/REPOSITORY-AUTHORITY-GUIDE.md)
*   **Decision Matrix**: [REPOSITORY-DECISION-MATRIX.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/REPOSITORY-DECISION-MATRIX.md)

---
**End of REPOSITORY-STRUCTURE-GUIDE.md**
