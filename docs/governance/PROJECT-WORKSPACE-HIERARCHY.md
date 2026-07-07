# PROJECT-WORKSPACE-HIERARCHY.md

**Document Type:** Governance Clarification  
**Version:** 1.0  
**Effective Date:** 2026-07-07  
**Status:** ACTIVE  
**Audience:** All Human Developers and AI Agents (Grok CLI, Grok Heavy, Gemini, etc.)

---

## 1. Purpose

This document permanently clarifies the two-level workspace hierarchy to eliminate confusion between:

- **Workspace Root** (container level)
- **Canonical Project Workspace** (implementation level)

All agents must understand this distinction before executing any command, planning, or editing.

---

## 2. Workspace Root

**Path:**
`/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ`

**Purpose:**
This is the **container directory** for the entire ZENOVELL-V4-PIMPZ effort.

It contains high-level organizational folders:
- `DESIGN/`
- `CORE/`
- `ARCHIVE/`
- `PROJECTS/`

**Important:**
- This is **NOT** the implementation workspace.
- No project development, coding, documentation authoring for the active project, or governance work should occur at this level.
- This level is for high-level organization and cross-project references only.

---

## 3. Canonical Project Workspace

**Path:**
`/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active`

**Purpose:**
This is the **actual project repository** and the only valid working environment.

All of the following **must** occur here:
- Implementation work
- Code changes
- Documentation updates (architecture, governance, reports)
- Audits and validation
- Governance activities

This is the only location that contains the project's `.git` repository.

---

## 4. Folder Hierarchy

```
ZENOVELL-V4-PIMPZ/
├── DESIGN/
│   └── (Design assets, Figma references, visual guidelines)
├── CORE/
│   └── (Shared runtime, SDKs, zmos-clean-runtime)
├── ARCHIVE/
│   └── (Historical snapshots - read only)
└── PROJECTS/
    └── ZENOVELL-PIMPZ-V4-Active/   ← Canonical Project Workspace
        ├── app/
        ├── components/
        ├── content/
        ├── docs/
        ├── lib/
        ├── public/
        ├── sections/
        └── ...
```

---

## 5. Usage Rules

| Folder              | Purpose                              | Allowed Activities                     | Forbidden Activities                          |
|---------------------|--------------------------------------|----------------------------------------|-----------------------------------------------|
| `DESIGN/`           | Design reference only                | Reviewing design specs, tokens         | Writing code, editing project docs            |
| `CORE/`             | Shared runtime infrastructure        | Referencing shared SDKs                | Modifying project-specific logic              |
| `ARCHIVE/`          | Historical reference only            | Reading old code for comparison        | Making changes, treating as active            |
| `PROJECTS/`         | Container for active projects        | Navigation only                        | Working directly here                         |
| `PROJECTS/ZENOVELL-PIMPZ-V4-Active/` | **Canonical Project Workspace** | All implementation, docs, governance   | None (this is the only valid location)        |

---

## 6. Agent Rules

Every agent (including Grok CLI) **must** follow these rules:

- The Workspace Root (`ZENOVELL-V4-PIMPZ`) is **not** a Git root.
- The Canonical Project Workspace is the **only** valid Git root for this project.
- **Never** run implementation, create files, or edit files while the working directory is the Workspace Root.
- **Never** run implementation from sibling repositories (e.g., ZENOVELL-V1-PIMPZ).
- If your shell starts in the wrong location, **stop immediately** and either:
  - Ask ZZ to open a new session in the correct directory, or
  - Execute the correct `cd` command before doing any work.

**Startup Command (Mandatory):**

```bash
cd /Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active
```

Then immediately run Workspace Verification (see AGENT-STARTUP-CHECKLIST.md).

---

## 7. Related Documents

This document works together with the following:

- [REPOSITORY-STRUCTURE-GUIDE.md](REPOSITORY-STRUCTURE-GUIDE.md) — Detailed internal project structure
- [REPOSITORY-AUTHORITY-GUIDE.md](REPOSITORY-AUTHORITY-GUIDE.md) — Single Source of Truth definitions
- [REPOSITORY-DECISION-MATRIX.md](REPOSITORY-DECISION-MATRIX.md) — Decision ownership
- [AGENT-STARTUP-CHECKLIST.md](AGENT-STARTUP-CHECKLIST.md) — Mandatory startup process
- [AI-ONBOARDING.md](AI-ONBOARDING.md) — AI agent onboarding

---

**End of PROJECT-WORKSPACE-HIERARCHY.md**