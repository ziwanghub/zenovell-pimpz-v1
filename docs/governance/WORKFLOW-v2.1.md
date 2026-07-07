# WORKFLOW v2.1

**Version**: v2.1.0  
**Effective Date**: 2026-07-07  
**Status**: ACTIVE  
**Audience**: Human Developers, AI Agents, Future Projects (Z-MOS, ZENOVELL, GovMind, SaaS)  

---

## 1. Overview

Workflow v2.1 formalizes the separation between Development Lifecycle and Release Lifecycle.

**Core Principle**:
Development Complete ≠ Production Ready

This distinction prevents shipping code that passes CI but has never been verified in real browser, device, or production-like conditions.

The workflow is project-independent and designed for reuse.

---

## 2. Development Lifecycle

See [DEVELOPMENT-LIFECYCLE.md](./DEVELOPMENT-LIFECYCLE.md) for full details.

Key sequence (repeated per phase/spoke):

Discovery → PRE-WP00 → PRE-WP00A → Blueprint → Blueprint Audit → SA Final Approval → Scope Lock → Batch Implementation → Local Validation → Independent Implementation Audit → SA Final Review → Commit → Push → CI → Closeout → Development Complete (for the phase)

When all planned phases complete: **Development Complete**

---

## 3. Release Lifecycle

See [PRODUCTION-READINESS-GATE-v1.md](./PRODUCTION-READINESS-GATE-v1.md) for full details.

After Development Complete:

Production Readiness Gate v1
↓
Deploy (to production domain)
↓
Production Verification (Browser + Real Device + LINE OA)
↓
Evidence Collection + Audit
↓
Owner Sign-off
↓
**Production Ready**
↓
**Production Launch**

---

## 4. Decision Matrix

| State                    | Meaning                              | Can Ship to Prod? | Can Run Pilot? | Requires |
|--------------------------|--------------------------------------|-------------------|----------------|----------|
| Development In Progress  | Gates not yet passed                 | No                | No             | Continue gates |
| Development Complete     | All dev gates passed                 | No                | Limited        | Production Readiness Gate |
| Production Ready         | Gate passed + evidence + sign-off    | Yes               | Yes            | Launch |
| Production Launch        | Live on production                   | N/A               | N/A            | Monitoring + iteration |

---

## 5. Migration from Workflow v2.0

Workflow v2.0 was effective from Phase 5D.

v2.1 adds:
- Explicit separation of Development vs Release lifecycles
- Production Readiness Gate v1 as mandatory post-development checkpoint
- Stronger emphasis on evidence and real-device verification
- Reusable, project-independent artifacts

Existing projects on v2.0 should adopt v2.1 for any new phases or releases.

---

## 6. Version History

- v2.0 (2026-07): Introduced Blueprint-Driven model, PRE-WP00/A, One Batch = One Spoke.
- v2.1 (2026-07): Formalized Development Complete vs Production Ready split. Added Production Readiness Gate v1 and supporting lifecycle documents.

---

**Related Documents**
- [DEVELOPMENT-LIFECYCLE.md](./DEVELOPMENT-LIFECYCLE.md)
- [PRODUCTION-READINESS-GATE-v1.md](./PRODUCTION-READINESS-GATE-v1.md)
- [LEAN-REPORTING-POLICY.md](./LEAN-REPORTING-POLICY.md)
- [REPOSITORY-STRUCTURE-GUIDE.md](./REPOSITORY-STRUCTURE-GUIDE.md)

This document is Level A (Permanent Governance Record). It is the canonical reference for how development and release are governed across reusable initiatives.

---

**Governing Principles**
- Blueprint is Architectural Authority during development.
- Evidence is the currency of release decisions.
- One Batch = One Spoke (development).
- Verification is separate from development.
- Reusability over project-specific hacks.