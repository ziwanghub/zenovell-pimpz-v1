# RELEASE STRATEGY

**Date**: 2026-07-07  
**Version**: v1.0  
**Status**: ACTIVE  
**Governing Documents**: ADR-001, ADR-002, ADR-003, COMMERCE-FOUNDATION-COMPLETE.md, PHASE5-COMMERCE-EXPERIENCE-SCOPE-LOCK.md, PRODUCTION-READINESS-GATE-v1.md  
**Purpose**: Define how the ZENOVELL-PIMPZ LINE-First Commerce Landing Platform will be released to production, separating the long-term architectural Roadmap from the actual production launch and incremental delivery plan.

---

## 1. Core Principle: Roadmap ≠ Release Plan

**Roadmap** (Phases 1–8):
- Long-term architectural development path.
- Describes the evolution from single-page Landing Page → full Commerce Experience Platform → Premium Experience → Production Intelligence → AI Readiness.
- Includes all sub-phases (5A–5H, Phase 6, 7, 8).
- Not a release schedule. It is the vision.

**Release Plan**:
- When and how production is launched.
- Production can launch when the **V1 Production Readiness Gate** is satisfied.
- After v1 launch, Phase 5 work continues as **incremental releases**.
- Each increment can be deployed independently after passing its own gate/audit.

**Key Rule**:
Do not delay production launch waiting for the entire long-term roadmap to be complete. Launch early with a stable core, then deliver roadmap items incrementally.

---

## 2. Release Philosophy

- **Production First**: Deliver a production-ready Landing Platform as early as practical to start acquiring real LINE OA Friends and validate assumptions with live traffic.
- **Incremental Delivery**: After v1, continue Phase 5 sub-phases (and later phases) as separate, auditable releases.
- **Governance Discipline**: Every release (v1 and increments) must follow the team workflow:
  - Scope definition / Scope Lock
  - Independent Audit (Gemini)
  - Implementation (within approved scope only)
  - Independent Audit
  - Release Report
  - Commit + Push
  - CI (success required)
  - Tag
  - Promotion / Deployment
- **Frozen Areas Protected**: The homepage (Sections 1–11) and Commerce Foundation contracts remain protected across all releases.
- **Risk Reduction**: Small, gated increments reduce the blast radius of any issue.

---

## 3. Version 1 (v1) Release Strategy

**Trigger**: V1 Production Readiness Gate is fully satisfied (see PRODUCTION-READINESS-GATE-v1.md).

**Scope of v1**:
- Stable frozen Homepage with all current functionality.
- LINE OA CTAs fully functional with Commerce Context.
- Commerce Context Persistence (minimum viable for homepage → LINE).
- Basic Commerce Events emitting.
- SEO / AI SEO foundation on homepage.
- Ads tracking readiness (UTM + context).
- Mobile/Tablet/Desktop + PWA verified.
- Production deployment pipeline ready.
- Pilot Product Landing Pages (1–3 products) if they can be delivered without delaying the Gate (Should Have).

**What v1 is NOT**:
- Full Phase 5 (5A–5H complete).
- All Information or Knowledge Pages.
- Premium motion or advanced design system work.
- Full attribution or advanced analytics.
- Any checkout, payment, CRM, or backend systems.
- Large-scale ad campaigns (pilot only).

**Deployment**:
- Production environment goes live.
- Monitoring and rollback plan active.
- Traffic can be gradually increased.
- Real user feedback and LINE Friend data collection begins.

**Post-v1 Communication**:
- Clearly communicate to all stakeholders (ZZ, marketing, sales, external) that v1 is the production Launch of the Landing Platform, and Phase 5 work will continue incrementally.

---

## 4. Incremental Release Strategy (Post-v1)

After v1 launch, Phase 5 work proceeds as a series of independent, gated releases:

Example sequence (can be adjusted based on priorities):

1. **v1 Launch** (Production Gate satisfied)
2. **5B / 5C Increment**: Dynamic routing + first pilot Product Landing Pages (1–3 products) + basic Commerce Wiring.
   - New release tag (e.g., v1.1 or semantic).
   - Full audit + CI.
3. **5D / 5E Increment**: Core Information Pages + initial Knowledge Pages.
4. **5G Increment**: Full SEO / AI SEO / structured data rollout across surfaces.
5. **5F / 5H Increment**: Commerce wiring completion + Pilot Ads validation and attribution tuning.
6. Continue with remaining roadmap items (Phase 6 Premium Experience, Phase 7 Intelligence, Phase 8 Optimization) as separate increments.

**Rules for Increments**:
- Each increment must have its own clear scope (can reference sub-phases).
- Must pass Independent Audit against the Phase 5 Scope Lock and this Release Strategy.
- Must not regress the frozen homepage or previously released functionality.
- Can be deployed as soon as it passes its gate (no need to wait for "all of Phase 5").
- Marketing and sales teams are informed in advance of each increment's impact on traffic, CTAs, and LINE handoff.

---

## 5. Governance & Communication

**For every release / increment**:
- Scope Lock (or delta update) approved by ZZ.
- Independent Audit (Gemini) performed and issues resolved.
- Validation (lint, typecheck, build, validate) PASS.
- CI green.
- Release note describing what changed, what is new for users/marketing/sales, and rollback plan.
- Tag created (e.g., v1.0.0, v1.1.0, etc.).

**Communication Cadence**:
- Before each increment: Brief to ZZ + marketing + sales on expected changes and benefits.
- After deployment: Confirmation + metrics (LINE Friend volume, engagement, any issues).

**Rollback**:
- Every release must have a documented, tested rollback path.
- Rollback decision authority: ZZ (with technical input from Implementation Agent).

---

## 6. Relationship to Long-Term Roadmap

This strategy does **not** cut or reduce the Roadmap.

- Roadmap remains the full vision (Phase 5A–5H + Phase 6 + 7 + 8).
- Release Plan uses the Roadmap as a backlog of increments.
- Production can (and should) go live with v1 while many roadmap items are still in progress.
- Later increments deliver the remaining roadmap items safely on top of a live production platform.

Example:
- v1 launches with stable Homepage + pilot PLPs.
- 5G (SEO/AI SEO) can be released later as an increment that improves existing surfaces.
- Phase 6 (Premium Experience) comes after the platform is live and stable.

---

## 7. Success Criteria for This Strategy

- Production launch happens at the earliest responsible moment (when Gate is met).
- Each subsequent increment adds clear value (better SEO, more trust, better ads performance, more qualified Friends) without destabilizing production.
- Frozen areas remain protected throughout.
- Attribution and measurement improve incrementally with each release.
- Team maintains discipline: no scope creep, no skipping audits, clear communication.

---

**End of RELEASE STRATEGY**

This document, together with the V1 Production Readiness Gate and Phase 5 Scope Lock, provides the complete framework for separating long-term architectural ambition from practical production delivery. All team members (ZZ, GPT, Grok Heavy, Grok CLI, Gemini) must internalize:

**Roadmap is the destination. The Release Strategy is how we get there safely, one validated increment at a time.**