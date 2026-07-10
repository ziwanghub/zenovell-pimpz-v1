# AI AGENT ONBOARDING GUIDE
**ZENOVELL-PIMPZ-V4-Active Official Team Standard**

**Version**: v1.0.0  
**Effective Date**: 2026-07-07  
**Status**: ACTIVE  

---

## 1. Welcome & Project Overview
Welcome to the `ZENOVELL-PIMPZ-V4-Active` repository.

### What is this repository?
This is a **LINE-First Commerce Landing Platform**. Its primary business goal is to acquire web traffic, build trust, and convert web visitors into **LINE OA (Official Account) Friends**. Commerce checkout, payments, and product consulting are handled downstream within the LINE OA itself.

### What this platform is NOT:
- A full-featured shopping cart system.
- An ERP/CRM backend.
- A database-backed checkout platform.

---

## 2. Core Repository Layout
All dynamic visual templates are structured as spokes around a pure core contract system:
- **`app/`**: Contains page routes. Product landing pages reside under `/products/[slug]`.
- **`sections/`**: Visual blocks (Sections 1–11) of the main homepage. **STRICTLY FROZEN**.
- **`content/`**: Single Source of Truth (SSOT) config files, including product features (`products.ts`).
- **`lib/`**: Domain contracts (`lib/commerce/`) and structural loaders (`lib/platform/`).

For more details, see [REPOSITORY-STRUCTURE-GUIDE.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/REPOSITORY-STRUCTURE-GUIDE.md) and [PROJECT-WORKSPACE-HIERARCHY.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/PROJECT-WORKSPACE-HIERARCHY.md) for workspace level clarification.

---

## 2.5 Mandatory Documentation Governance Reading Order

**Before reading any other documentation or implementation files, all AI agents and human contributors must follow this order:**

1. Read `DESIGN/Platform-Documentation-Architecture/AI-ENTRYPOINT.md`
2. Read `DESIGN/Platform-Documentation-Architecture/WORKSPACE-MANIFEST.md`
3. Read `DESIGN/Platform-Documentation-Architecture/DOCUMENT-MAP.md`
4. Read `DESIGN/Platform-Documentation-Architecture/DEPENDENCY-MAP.md`

Repository-wide searches should **not** be the default behavior. The Platform Documentation Architecture is the canonical governance layer for navigation and classification of ACTIVE, FROZEN, and REFERENCE documents.

See: [AI-ENTRYPOINT.md](/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/DESIGN/Platform-Documentation-Architecture/AI-ENTRYPOINT.md)

---

## 3. Mandatory Workspace Constraint
All development must occur exclusively within this workspace path:
`/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active`

Any references to files in sibling directories (like `ZENOVELL-V1-PIMPZ`) are invalid and violate project boundaries.

---

## 4. Work Flow & Governance Order
We implement a lightweight Z-MOS style governance model. Before writing any code, the development process follows a strict approval flow:

1.  **ZZ Approval**: The project owner approves the milestone goals.
2.  **ADR**: High-level designs are locked in Architectural Decision Records.
3.  **Blueprint**: Specific interface layouts and data schemas are mapped out.
4.  **Scope Lock**: Active code zones are opened, and frozen boundaries are set.
5.  **Implementation Plan**: Step-by-step Work Packages (WPs) are outlined.
6.  **Implementation**: Coding starts (Grok CLI).
7.  **Independent Audit**: Compliance checks are run (Gemini).
8.  **Closure**: The milestone is officially closed out and baseline frozen.

---

## 5. Standard Operating Checklist
Every time you spawn or execute a prompt, you must run the following steps:
1.  Verify the workspace directory via git.
2.  Consult the [REPOSITORY-DECISION-MATRIX.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/REPOSITORY-DECISION-MATRIX.md) before placing files.
3.  Inspect the active Scope Lock for frozen zones.
4.  Verify structural integrity by running `npm run validate`.

See the complete steps in [AGENT-STARTUP-CHECKLIST.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/AGENT-STARTUP-CHECKLIST.md).

---

## 6. Communication & Reporting Standards
When reporting milestone completions or audit results to the Project Owner (ZZ), you must adhere to the **Mandatory Chat Report Format**:

- **Header**:
  ```text
  Reported By: [Agent Name]
  Role: [Agent Role]
  Report Type: [Audit/Status/Implementation]
  Project: ZENOVELL-PIMPZ-V4-Active
  Current Phase: [Phase Name]
  Milestone: [Milestone Name]
  ```
- **Content**: Concise, markdown-formatted summaries linking to relevant files.
- **Footer**:
  ```text
  Overall Status: [PASS/FAIL/PASS_WITH_WARNINGS]
  Next Recommended Step: [Actions]
  ```

---

## 7. Related Standards
- [REPOSITORY-STRUCTURE-GUIDE.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/REPOSITORY-STRUCTURE-GUIDE.md)
- [REPOSITORY-AUTHORITY-GUIDE.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/REPOSITORY-AUTHORITY-GUIDE.md)
- [REPOSITORY-DECISION-MATRIX.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/REPOSITORY-DECISION-MATRIX.md)
