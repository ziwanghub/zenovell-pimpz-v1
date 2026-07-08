# BLUEPRINT-STANDARD-v2

**Version**: 2.0  
**Effective**: Post-Phase 6C Architecture Freeze  
**Purpose**: Provide a mandatory, reusable template for all future Phase Blueprints to ensure consistency, completeness, and auditability.

## Instructions

Every Blueprint **MUST** follow this exact structure. Do not reorder or omit sections.

### 1. Executive Summary
- One-page overview of the batch.
- Current state vs target state.
- Key decisions and outcomes.

### 2. Objectives
- Clear, measurable objectives for this batch.
- Must be traceable to Roadmap and previous closeouts.

### 3. Existing Foundation
- What was delivered by prior batches.
- Current state of relevant layers.

### 4. Problem Statement
- Why this batch is necessary.
- Risks if not addressed.

### 5. Architecture Principles
- Invariant rules that govern decisions in this batch.

### 6. Ownership Matrix
- Table: Concern | Owner | Responsibility | Never Does

### 7. Layer Contract
- Reference to Layer Contract Standard for each involved layer.

### 8. Dependency Matrix
- Allowed vs Forbidden dependencies.

### 9. Allowed Files
- Explicit list with justification.

### 10. Forbidden Files
- Explicit list with rationale.

### 11. Scope
- What this batch owns.

### 12. Out of Scope
- Explicit deferrals with target batch.

### 13. Risks & Mitigations
- P0 / P1 / P2 risks.

### 14. Migration Notes
- Impact on future batches.

### 15. Success Criteria
- Measurable outcomes.

### 16. Acceptance Criteria
- What auditors must verify.

### 17. Traceability
- Links to PRE-WP00, PRE-WP00A, prior Blueprints, Scope Locks, ADRs.

### 18. Next Phase
- Explicit handoff and entry criteria for the following batch.

## Required Evidence
- Traceability to previous closeouts.
- Clear ownership and boundaries.
- Measurable success criteria.

## Common Mistakes
- Ambiguous ownership wording.
- Missing "No X may..." rules.
- Mixing implementation details into Blueprint.
- Forgetting to reference prior PRE reports.

## Review Checklist
- [ ] All 18 sections present in order.
- [ ] Ownership Matrix is unambiguous.
- [ ] Allowed/Forbidden lists are explicit and justified.
- [ ] Success Criteria are measurable and testable.
- [ ] Traceability section is complete.
- [ ] No leakage into future batches.

**Status**: Mandatory for all Blueprints after Phase 6C.