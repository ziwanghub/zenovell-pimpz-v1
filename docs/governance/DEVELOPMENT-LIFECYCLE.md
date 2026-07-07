# DEVELOPMENT LIFECYCLE

**Version**: v2.1.0  
**Effective Date**: 2026-07-07  
**Status**: ACTIVE  
**Audience**: Human Developers, AI Agents, Future Projects (Z-MOS, ZENOVELL, GovMind, SaaS)  

---

## 1. Purpose

This document defines the standard Development Lifecycle for building production-ready software platforms. It ensures disciplined progression from idea to "Development Complete" through mandatory governance gates.

The lifecycle separates **Development** from **Release** to avoid confusing technical completeness with operational readiness.

---

## 2. Principles

- **Evidence First**: Every gate produces auditable artifacts (blueprints, matrices, logs, evidence packages).
- **Blueprint Authority**: Approved Blueprints are binding. Implementation must trace directly to them.
- **One Batch = One Spoke**: Controlled scope per increment.
- **Additive Only**: Extensions without breaking existing contracts or authorities.
- **Separation of Concerns**: Development Complete ≠ Production Ready.
- **Reusable**: Project-independent, applicable across Z-MOS style initiatives.
- **Lean but Permanent**: Level A artifacts for governance; Level B for interim reports.

---

## 3. Development Workflow

```
Discovery
    │
    ▼
PRE-WP00 (Readiness Assessment)
    │
    ▼
PRE-WP00A (Strategy & Authority Design)
    │
    ▼
Blueprint (SA Draft)
    │
    ▼
Independent Architecture Audit
    │
    ▼
SA Final Blueprint Approval
    │
    ▼
Scope Lock
    │
    ▼
Batch Implementation
    │
    ▼
Local Validation
    │
    ▼
Independent Implementation Audit
    │
    ▼
SA Final Review
    │
    ▼
Git Commit
    │
    ▼
GitHub Push
    │
    ▼
CI
    │
    ▼
Phase Closeout
    │
    ▼
Development Complete
```

All phases follow this sequence. Blueprint approval + Scope Lock are mandatory gates before Batch Implementation.

---

## 4. PRE-WP00 — Readiness Assessment

Mandatory discovery gate.

**Activities**:
- Review existing architecture, contracts, and implementation.
- Identify current readiness, missing pieces, and risks.
- Assess foundation for the upcoming phase (e.g., authorities, wiring, SEO).

**Output**: Report with:
- Existing Foundation
- Missing Foundation
- Architecture Risks
- Recommended Scope

**Decision**: READY_FOR_PRE-WP00A or BLOCKED

---

## 5. PRE-WP00A — Strategy & Authority Design

Design the minimum viable authority/contract/strategy before Blueprint.

**Activities**:
- Define recommended shapes (e.g., Knowledge Authority contract).
- Separate concerns between authorities.
- Identify initial scope (topics, flows).
- Recommend storage and extension strategy.
- Clarify overlaps and boundaries.

**Output**: Strategy document with recommended contract, scope, risks, and decision.

**Decision**: READY_FOR_BLUEPRINT or STOP

---

## 6. Blueprint

The single Architectural Authority for the phase.

**Must Define** (minimum):
- Executive Summary
- Objectives
- Architecture (entities, contracts, flows)
- Scope
- Out-of-Scope
- Success Criteria
- Risks & Mitigations
- Implementation Sequence
- Audit Acceptance Criteria
- Governing Principles

**Status**: SA Final Approved after Independent Audit.

---

## 7. Blueprint Audit

Independent review of the Blueprint.

**Verifies**:
- Alignment with prior artifacts and ADRs
- Completeness and clarity
- No scope creep
- Feasibility

**Decision**: PASS / PASS_WITH_RECOMMENDATIONS / FAIL

---

## 8. SA Approval

System Architect grants final approval.

Blueprint becomes binding.

---

## 9. Scope Lock

Explicit boundaries for the batch.

**Must Include**:
- Scope
- Allowed Files (explicit list)
- Forbidden Files
- Deliverables Matrix (Blueprint → files)
- Batch Boundary (One Batch = One Spoke)
- Validation Requirements
- Audit Acceptance Criteria
- Exit Criteria
- Risks & Mitigations
- Success Criteria

**Mandatory Rules** (examples):
- Use entity getters consistently (e.g., in sitemaps).
- Only listed files may be modified.
- No mutations to prior authorities or frozen areas.

---

## 10. Batch Implementation

One controlled batch per Scope Lock.

**Requirements**:
- Follow Blueprint + Scope Lock exactly.
- Use create* helpers and existing contracts.
- Run continuous validation.
- Stop on conflicts.
- Collect evidence where required (for verification phases).

---

## 11. Implementation Audit

Independent review after batch.

**Verifies**:
- Blueprint Compliance Matrix
- Delta vs Blueprint (zero gaps, zero drift)
- Scope Lock Verification
- No Regression
- Validation PASS
- Evidence completeness (for verification phases)

---

## 12. Closeout

Phase complete only when:
- Blueprint Approved
- Scope Lock respected
- Batch completed
- Validation PASS
- Implementation Audit PASS
- SA Final Review Accept
- Git Commit + Push
- CI PASS
- Working Tree CLEAN

---

## 13. Development Complete

The platform has passed all development gates.

**Not equivalent to**:
- Production Ready
- Launch Ready
- Publicly Usable

---

## 14. Roles & Responsibilities

**System Architect (SA)**:
- Architecture, Roadmap, Governance, ADRs, Blueprints, Scope, Risk, Final Approvals, Production Strategy.

**Implementation Agent**:
- Exact implementation per Blueprint + Scope Lock.
- Continuous validation.
- Evidence collection.
- No architecture decisions.

**Independent Audit Agent**:
- Read-only reviews.
- Compliance, regression, drift detection.
- Evidence audit.
- Recommendations only.

**CI**:
- Automated validation on push.
- Clean tree enforcement.

---

## 15. Development Quality Gates

Every phase must pass:
- PRE-WP00
- PRE-WP00A
- Blueprint + Audit + SA Approval
- Scope Lock
- Batch + Validation
- Implementation Audit
- SA Final Review
- Commit + Push + CI
- Closeout

Only then is the phase (and eventually Development Complete) declared.

---

**Related Documents**
- [DEVELOPMENT-WORKFLOW-v2.1.md](./WORKFLOW-v2.1.md)
- [PRODUCTION-READINESS-GATE-v1.md](./PRODUCTION-READINESS-GATE-v1.md)
- [LEAN-REPORTING-POLICY.md](./LEAN-REPORTING-POLICY.md)
- [REPOSITORY-STRUCTURE-GUIDE.md](./REPOSITORY-STRUCTURE-GUIDE.md)
- Phase-specific Blueprints and Scope Locks

This document is Level A (Permanent Governance Record) per LEAN-REPORTING-POLICY.md.

It is project-independent and intended for reuse.