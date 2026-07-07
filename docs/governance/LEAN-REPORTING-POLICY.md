# LEAN GOVERNANCE REPORTING POLICY
**ZENOVELL-PIMPZ-V4-Active Official Team Standard**

**Version**: v1.0.0  
**Effective Date**: 2026-07-07  
**Status**: ACTIVE  
**Audience**: Human Developers, Grok CLI, Grok Heavy, Gemini, ChatGPT, Future AI Agents  

---

## 1. Purpose & Core Principles
The `ZENOVELL-PIMPZ-V4-Active` project operates under a lightweight Z-MOS style governance model. While documenting key architectural and scoping decisions is essential, the generation of excessive markdown audit files for small incremental steps degrades developer velocity, inflates context window usage, and increases token cost.

This policy establishes a **Lean Reporting Standard** by defining three distinct reporting levels. It minimizes documentation overhead while preserving the integrity of permanent governance logs.

---

## 2. Reporting Levels

### LEVEL A: Permanent Governance Record (Markdown File Required)
**Criteria**: Architecture definitions, major milestones, security changes, scope freezes, and independent verification logs.  
*   **Requirements**: A permanent, versioned markdown (`.md`) file **must** be created inside the appropriate `docs/` subdirectory.
*   **Examples**:
    *   Architectural Decision Records (ADRs)
    *   Milestone Blueprints
    *   Phase Scope Locks
    *   Work Package Implementation Plans
    *   Independent Audits & Assessments
    *   Production Readiness Gates & Release Strategies
    *   Baseline Certifications & Onboarding Guides
*   **Actions**: Files must be staged and committed to the Git repository.

### LEVEL B: Development Report (Chat Only - File Prohibited)
**Criteria**: Intermediate work package completions, standard validation checks, and routine file refinements.  
*   **Requirements**: Do **not** create a markdown file. Report the status exclusively inside the chat interface using the **Level B Template**.
*   **Examples**:
    *   PRE-WP00 checks
    *   Individual WP implementations (WP-01, WP-02, etc.)
    *   Routine linting, typechecking, and local build validations
    *   Draft reviews and implementation summaries
*   **Level B Chat Template**:
    ```text
    Reported By: [Agent Name]
    Role: [Agent Role]
    Report Type: Work Package Summary
    Workspace: PASS (Verified /Users/zinwang/.../ZENOVELL-PIMPZ-V4-Active)
    
    Changed Files:
    - [file basename](file:///path/to/file)
    
    Validation:
    - lint: [PASS/FAIL]
    - typecheck: [PASS/FAIL]
    - build: [PASS/FAIL]
    
    Next Step: [Action Item]
    ```

### LEVEL C: Silent Operations (Action and Confirmation Only)
**Criteria**: Minor terminal queries, styling changes, code formatting, or simple commands.  
*   **Requirements**: Do **not** write report files. Provide only a brief, 1-2 sentence confirmation in chat.
*   **Examples**:
    *   `git status` or `git diff` queries
    *   Running formatter tools (Prettier, ESLint)
    *   Renaming or moving folders/files
    *   Running `npm install`
    *   Import statement cleanup or minor local code refactoring

---

## 3. Policy Rules & Execution

### Mandatory Reports
Markdown report files (Level A) are mandatory **only** when a milestone transition occurs, when a scope boundary is established or altered, or when an independent audit is officially requested by the Project Owner (ZZ).

### Prohibited Reports
Creating markdown report files for individual code files, single-section styling updates, or intermediate Work Packages is **strictly prohibited**. Agents that create unapproved Level B or Level C documentation files will be flagged for non-compliance.

---

## 4. Token Efficiency & Savings
By shifting intermediate task reports from files to chat:
*   **Context Window Preservation**: Avoids clogging the agent's context window with dozens of small audit logs.
*   **Expected Savings**: Reduction of ~40-60% in repository file volume and ~35% savings in token usage during active execution phases.

---

## 5. Risk Assessment & Mitigations

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Loss of Detail**: Important technical steps might go undocumented in chat-only logs. | **Low** | Focus on commit messages. All Level B chat reports are backed by highly descriptive git commits. |
| **Workspace Drift**: Inactive git verification due to silent commands. | **Medium** | The AGENT-STARTUP-CHECKLIST.md remains mandatory for all levels before any execution. |

---

## 6. Migration Strategy
1.  All active agents must read this policy immediately.
2.  Add a **Reporting Rule** to `docs/governance/AGENT-STARTUP-CHECKLIST.md` to enforce the Level check.
3.  Retain legacy Level A reports inside `docs/reports/` for historical audit purposes; do not delete them.

---
**End of LEAN-REPORTING-POLICY.md**
