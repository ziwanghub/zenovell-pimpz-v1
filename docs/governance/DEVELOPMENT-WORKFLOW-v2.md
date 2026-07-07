# DEVELOPMENT WORKFLOW v2.0

**ZENOVELL-PIMPZ-V4-Active Official Team Standard**

**Version**: v2.0.0  
**Effective Date**: Phase 5D  
**Status**: ACTIVE  
**Audience**: Human Developers, Grok CLI, Grok Heavy, Gemini, ChatGPT, Future AI Agents  

---

## 1. Purpose

This document defines the official engineering workflow for ZENOVELL-PIMPZ-V4-Active starting from Phase 5D onward.

After successful completion of Phase 5C (Product Landing Page Template) and establishment of the Platform Foundation (entity-driven routing, Commerce Context, LINE-first contracts, SEO layer), the project transitions from granular Work Package execution to a Blueprint-Driven model.

**Goals**:
- Reduce number of implementation cycles
- Lower token consumption
- Reduce unnecessary documentation overhead
- Maintain all critical Quality Gates
- Minimize scope drift
- Increase development velocity while preserving architectural integrity

The Blueprint is elevated to the single Architectural Authority for each phase.

---

## 2. Workflow

```
Discovery
    │
    ▼
PRE-WP00
    │
    ▼
PRE-WP00A
    │
    ▼
Blueprint (SA Draft)
    │
    ▼
Independent Architecture Audit
    │
    ▼
SA Final Blueprint
    │
    ▼
Scope Lock
    │
    ▼
━━━━━━━━━━━━━━━━━━━━━━━━━━
Batch Implementation
━━━━━━━━━━━━━━━━━━━━━━━━━━
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
```

All phases after 5C follow this sequence. Blueprint approval + Scope Lock are mandatory gates before any Batch Implementation begins.

---

## 3. Roles

### System Architect (ZZ)
- Owns architecture decisions
- Produces or approves Blueprints
- Issues Final Blueprint
- Approves Scope Lock
- Performs SA Final Review
- Grants Phase Closeout approval

**Blueprint becomes the Architectural Authority.**

### Implementation Agent
- Implements **exactly** according to the Approved Blueprint and Scope Lock
- No architecture redesign
- No scope expansion
- No interpretation outside the Blueprint
- Runs continuous Local Validation during batch
- Stops immediately on architectural conflicts

### Independent Audit Agent
**Before Implementation**:
- Architecture review
- Risk analysis
- Scope validation
- Gap analysis

**After Implementation**:
- Blueprint compliance verification
- Regression detection
- Contract validation
- Performance validation
- Produces recommendations only

**Audit does not redesign architecture or rewrite the Blueprint.**

### CI
- Executes automated validation on push
- Enforces clean working tree
- Reports pass/fail status for the batch

---

## 4. Blueprint Authority

The approved Blueprint is the **single architectural authority** for the phase.

- All implementation decisions must trace directly to the Blueprint.
- Any deviation requires a formal Blueprint Change Request (see Governance Rules).
- Scope Lock is derived from the Final Blueprint.
- Implementation Agent must treat the Blueprint as a binding contract.

---

## 5. Scope Lock Rules

After SA Final Blueprint approval:

**Allowed**:
- Only files and patterns explicitly listed in the Scope Lock document
- Changes that directly fulfill sections defined in the Blueprint
- Additive work within the defined entity (e.g. Information Pages for Phase 5D)

**Forbidden**:
- Architecture redesign
- Scope expansion beyond listed items
- Modifications to frozen areas (homepage `sections/`, core Product Authority fields without explicit approval)
- Cross-phase implementation
- Changes to unrelated spokes (e.g. touching `/products/` while implementing Information)

Scope Lock must contain an explicit file list or glob patterns.

---

## 6. Batch Implementation Rules

Instead of sequential WP-01, WP-02, … the Implementation Agent completes the entire Blueprint-defined scope in **one controlled batch**.

**Requirements**:
- Strictly follow the approved Blueprint
- Strictly follow the Scope Lock file list
- Run `npm run validate` (or equivalent) continuously during development
- Maintain clean separation between core changes and docs
- Stop and escalate immediately if architectural conflicts or Blueprint violations are discovered
- One Batch = One Spoke (see Governance Rules)

Batch Implementation is only authorized after Scope Lock.

---

## 7. Validation Rules

**Required before every major handoff and before Audit**:

- `lint`
- `typecheck`
- `build`
- `tests` (when applicable)

Command:
```bash
npm run validate
```

Validation must pass with zero errors before Independent Implementation Audit.

---

## 8. Audit Rules

The Independent Implementation Audit must verify:

### Blueprint Compliance Matrix
A table mapping every required deliverable from the Blueprint to actual implemented artifacts (files, components, data).

### Delta vs Blueprint
Explicit diff summary showing:
- What was implemented
- Any gaps
- Any over-implementation (scope drift)
- Any deviations (must be zero or pre-approved via change request)

### Scope Lock Verification
Confirmation that:
- Only allowed files were modified
- No forbidden areas were touched
- All listed scope items were addressed

Audit produces **recommendations only**. It does not rewrite the Blueprint or Scope Lock.

---

## 9. CI Rules

**Required for phase progression**:
- Git commit of approved changes
- GitHub Push to `origin main`
- CI pipeline must PASS
- Working tree must remain CLEAN after push (no uncommitted changes)

CI runs the same validation suite as local (`lint` + `typecheck` + `build`).

---

## 10. Phase Closeout Checklist

A phase is considered complete **only** when all of the following are satisfied:

- [ ] Blueprint Approved by System Architect
- [ ] Scope Lock respected (verified by Independent Audit)
- [ ] Batch Implementation completed per Blueprint
- [ ] Local Validation PASS (`npm run validate`)
- [ ] Independent Implementation Audit PASS
- [ ] SA Final Review completed (Accept)
- [ ] Git Commit executed
- [ ] GitHub Push executed
- [ ] CI PASS
- [ ] Working Tree CLEAN
- [ ] Phase Closeout documented (if required under Level A)

Only after Closeout may the next phase's Discovery / PRE-WP00 begin.

---

## 11. Governance Rules

### Rule 1: Blueprint Compliance Matrix
Every Implementation and Audit must produce or reference a Blueprint Compliance Matrix. This matrix is the primary evidence of fidelity to the architectural authority.

### Rule 2: Automated Scope Lock Verification
Where possible, Scope Lock should be expressed in machine-checkable form (file globs or explicit list). Implementation changes outside the lock are automatically invalid.

### Rule 3: One Batch = One Spoke
Each Batch Implementation is limited to a single platform spoke (e.g. Information Pages, Knowledge Pages). Cross-spoke work requires separate Blueprint + Scope Lock.

### Rule 4: Blueprint Change Request
Any required change to an approved Blueprint after Scope Lock must follow this process:
1. Implementation Agent or Auditor raises a change request with clear justification and impact.
2. System Architect reviews and either rejects, approves minor additive change, or issues a revised Blueprint.
3. If revised, a new Scope Lock iteration is required before resuming Batch.

No ad-hoc interpretation is permitted.

---

## 12. Effective Date

This workflow is effective starting **Phase 5D — Information Experience**.

All subsequent phases (5D, 5E, 5F, …) shall follow Development Workflow v2.0.

Previous granular WP-by-WP execution (used in Phase 5C) is superseded for new work.

---

**Related Documents**
- [LEAN-REPORTING-POLICY.md](./LEAN-REPORTING-POLICY.md)
- [REPOSITORY-STRUCTURE-GUIDE.md](./REPOSITORY-STRUCTURE-GUIDE.md)
- [AGENT-STARTUP-CHECKLIST.md](./AGENT-STARTUP-CHECKLIST.md)
- Phase Blueprints and Scope Locks under `docs/architecture/`

This document is Level A (Permanent Governance Record) per LEAN-REPORTING-POLICY.md.
