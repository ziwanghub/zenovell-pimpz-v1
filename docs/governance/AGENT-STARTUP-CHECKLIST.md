# AGENT STARTUP CHECKLIST
**ZENOVELL-PIMPZ-V4-Active Official Team Standard**

**Version**: v1.0.0  
**Effective Date**: 2026-07-07  
**Status**: ACTIVE  

---

## 1. Objective
Before any developer or AI agent (Grok CLI, Grok Heavy, Gemini, etc.) executes terminal commands, drafts plans, or edits files, they **must** run through and verify this checklist. No exceptions are allowed.

---

## 2. Startup Checklist Sequence

### Step 1: Workspace Verification
Verify that the project root, git repository, and current working directory map to the canonical workspace path.
*   **Target Directory**: `/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active`
*   **Verification Command**:
    ```bash
    echo "=== WORKSPACE VERIFICATION ===" && echo "Project Root: $(pwd)" && echo "Working Directory: $(pwd)" && echo "Current Branch: $(git branch --show-current)"
    ```

**Fail-Fast Rule**: If Workspace Verification fails (Project Root, Git Root, or Working Directory does not match the canonical exactly), the agent **MUST STOP IMMEDIATELY**. The agent must not create files, edit files, run implementation, or continue using absolute paths from the wrong workspace. Report "WRONG WORKSPACE" and halt.

> **Clarification**: See [PROJECT-WORKSPACE-HIERARCHY.md](PROJECT-WORKSPACE-HIERARCHY.md) for the difference between Workspace Root (`ZENOVELL-V4-PIMPZ`) and the Canonical Project Workspace.

### Step 2: Read Repository Structure Guide
Read [REPOSITORY-STRUCTURE-GUIDE.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/REPOSITORY-STRUCTURE-GUIDE.md) to understand the location and responsibilities of each folder.

### Step 3: Read Repository Authority Guide
Read [REPOSITORY-AUTHORITY-GUIDE.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/REPOSITORY-AUTHORITY-GUIDE.md) to locate the Single Source of Truth (SSOT) for the data you intend to consume or modify.

### Step 4: Read Current Scope Lock
Locate and read the active Scope Lock document for the current phase under `docs/architecture/` (e.g. `PHASE5-COMMERCE-EXPERIENCE-SCOPE-LOCK.md`). Ensure the task does not violate any frozen boundaries.

### Step 5: Read Development Workflow v2.0
Read [DEVELOPMENT-WORKFLOW-v2.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/DEVELOPMENT-WORKFLOW-v2.md). This is the binding process for all phases starting from Phase 5D. Confirm whether the current task follows PRE-WP00 / Blueprint / Batch / Audit gates.

### Step 6: Read Current Blueprint
Read the blueprint associated with the active phase under `docs/architecture/` (e.g. `PHASE5C-PRODUCT-LANDING-BLUEPRINT.md`) to align with the visual and data requirements.

### Step 7: Verify Current Phase
Confirm the active milestone phase from the project logs or recent audit records to prevent implementing forward-looking tasks out of order.

### Step 8: Verify Frozen Areas
Confirm that no code or design changes are planned for frozen areas, such as the homepage (`sections/` 1-11) or core UI primitives.

### Step 9: Verify Allowed Scope
Verify that your task complies with the allowed modifications listed in the active Implementation Plan and doesn't introduce scope drift (like backend mutations or external CMS integrations).

### Step 10: Run Validation Baseline
Run the verification suite to ensure the repository builds and passes typechecks and linters in a clean state:
```bash
npm run validate
```

### Step 11: Verify Reporting Level
Consult [LEAN-REPORTING-POLICY.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/LEAN-REPORTING-POLICY.md) before creating any report. If the active task is classified as Level B (Intermediate Work Package) or Level C (Silent / Terminal Operations), creating a new markdown documentation file is **strictly prohibited**. Report progress only via the specified chat template.

### Step 12: Begin Work
Proceed with planning, documentation, or implementation according to the Work Package directions.

---

## 3. Related Standards
- [REPOSITORY-STRUCTURE-GUIDE.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/REPOSITORY-STRUCTURE-GUIDE.md)
- [REPOSITORY-AUTHORITY-GUIDE.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/REPOSITORY-AUTHORITY-GUIDE.md)
- [REPOSITORY-DECISION-MATRIX.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/REPOSITORY-DECISION-MATRIX.md)
- [AI-ONBOARDING.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/AI-ONBOARDING.md)
- [LEAN-REPORTING-POLICY.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/LEAN-REPORTING-POLICY.md)
- [DEVELOPMENT-WORKFLOW-v2.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/DEVELOPMENT-WORKFLOW-v2.md)
