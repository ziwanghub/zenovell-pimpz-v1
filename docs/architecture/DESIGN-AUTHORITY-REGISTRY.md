# Design Authority Registry v1

**Document type:** Design governance registry  
**Phase:** B3  
**Date:** 2026-07-18  
**Status:** **ACTIVE · v1**  
**Mode of creation:** Documentation only (no product redesign)  
**Scope:** Mobile-first Landing Platform (homepage + shared chrome)  

---

## 1. Purpose

This registry is the **single index of approved design authorities** for ZENOVELL-PIMPZ-V4.

It answers:

1. Which patterns are **canonical** for future surfaces?  
2. Who owns each authority?  
3. Who may consume it?  
4. Which ADR / freeze / evidence supports it?  
5. What is still **candidate / pending** and must not be treated as frozen?

This is **not** a component library dump and **not** a desktop design system.

---

## 2. Status legend

| Status | Meaning |
|---|---|
| **ACCEPTED** | SA-approved authority; ADR present; consumers must align |
| **PASS (shared surface)** | SA visual/UX pass; merge-ready or merged; freeze documented in this registry |
| **PARTIAL** | Strong candidate pattern; not freeze-ready as system-wide authority |
| **CANDIDATE** | Intentional future authority; no ADR freeze yet |
| **FUTURE** | Deferred until multi-consumer proof or Desktop phase |

---

## 3. Platform base authorities (commerce / architecture)

| Authority | ADR | Status | Owner | Notes |
|---|---|---|---|---|
| LINE-First Commerce Platform | ADR-001 | ACCEPTED | SA / Architecture | Platform binding decision |
| Acquisition Architecture | ADR-002 | ACCEPTED | SA / Growth | Funnel / channel model |
| LINE Commerce Architecture | ADR-003 | ACCEPTED | SA / Commerce | Handoff / messaging architecture |
| Product Authority (data) | Phase 4A · `content/products.ts` | ACCEPTED (data) | Commerce | SKU/slug/pricing/payload SSOT |

These are **architectural** authorities. Design component authorities below must not contradict them.

---

## 4. Approved design authorities

### 4.1 Review Component Authority

| Field | Value |
|---|---|
| **Authority** | Review Component Authority |
| **Canonical surface** | Product Detail Review (`components/platform/product-reviews.tsx`) |
| **Landing consumer** | Section 8 Reviews |
| **Owner** | System Architect / SA |
| **Reviewers** | Release Integration, Mobile UX |
| **Status** | **ACCEPTED** |
| **ADR** | `docs/architecture/ADR-004-REVIEW-COMPONENT-AUTHORITY.md` |
| **Consumers** | Landing S8 · Product Detail · future campaign review blocks |
| **Evidence** | Phase B2.4 Section 8 limited implementation + ADR-004 |
| **Notes** | Homepage may keep conversion-only composition (distribution bars, dual CTAs). Full shared package extraction deferred. |

### 4.2 FAQ Component Authority

| Field | Value |
|---|---|
| **Authority** | FAQ Component Authority |
| **Canonical surface** | Product Detail FAQ (`components/platform/product-faq.tsx`) |
| **Landing consumer** | Section 9 FAQ |
| **Owner** | System Architect / SA |
| **Reviewers** | Release Integration, Mobile UX |
| **Status** | **ACCEPTED** |
| **ADR** | `docs/architecture/ADR-005-FAQ-COMPONENT-AUTHORITY.md` |
| **Consumers** | Landing S9 · Product Detail FAQ · future FAQ surfaces |
| **Evidence** | Phase B2.5 Section 9 limited implementation + ADR-005 |
| **Notes** | Landing may keep funnel question set + conversion CTAs. Disclosure language aligns to Product FAQ. |

### 4.3 Primary CTA Authority

| Field | Value |
|---|---|
| **Authority** | Primary Conversion CTA Authority |
| **Canonical surface** | Section 10 Final CTA |
| **Owner** | System Architect / SA |
| **Reviewers** | Release Integration, Conversion Engineering |
| **Status** | **ACCEPTED** |
| **ADR** | `docs/architecture/ADR-006-PRIMARY-CTA-AUTHORITY.md` |
| **Consumers** | Landing S10 · future high-intent climax surfaces only |
| **Evidence** | Phase B2.6 Section 10 limited implementation + ADR-006 |
| **Notes** | Surface `final-cta` · intent `high_intent` · `LINE_OA_URL` · `activateLineCta`. Mid-funnel CTAs remain context-specific. |

### 4.4 Global Header Drawer (Mobile Navigation)

| Field | Value |
|---|---|
| **Authority** | Mobile Navigation / Global Header Drawer |
| **Canonical surface** | `components/layout/global-header.tsx` (drawer panel) |
| **Owner** | System Architect / SA · Mobile UX |
| **Status** | **PASS · MERGED** (PR #18 · `883f6cf`) |
| **ADR** | No separate ADR number; governed by this registry + navigation report |
| **Consumers** | Homepage · platform pages using GlobalHeader |
| **Evidence** | `docs/reports/navigation/GLOBAL-HEADER-DRAWER-MOBILE-REFINEMENT.md` · SA score **9.2/10** |
| **Freeze** | **MOBILE_NAVIGATION_FROZEN** for drawer IA (location strip, primary nav vs sticky LINE, active state) |
| **Notes** | Future enhancements (product name in location, indicator animation) are non-blocking. Desktop mega-menu deferred. |

---

## 5. Candidate authorities (not freeze-ready)

### 5.1 Footer Component Authority

| Field | Value |
|---|---|
| **Authority** | Footer Component Authority |
| **Canonical surface (candidate)** | Homepage Section 11 (`sections/section-11-footer/`) |
| **Owner** | SA / Mobile UX |
| **Status** | **PARTIAL / CANDIDATE** |
| **ADR** | **ADR-007 NOT CREATED** |
| **Consumers today** | Homepage only |
| **Evidence** | Phase B2.7 audit + limited implementation (feature branch) |
| **Notes** | Pattern is strong (contact, trust, payments, LINE). Phone authority CONFIRMED (`092-956-5523` via `siteContacts`). Not system-wide until platform pages mount the same footer. |

### 5.2 Product Card Authority

| Field | Value |
|---|---|
| **Authority** | Product Card Authority |
| **Canonical surface (candidate)** | Section 4 catalog card / Product Authority UI extensions |
| **Status** | **FUTURE** |
| **ADR** | None |
| **Notes** | Multi-consumer proof required (homepage grid vs PLP related products). |

### 5.3 Hero Authority

| Field | Value |
|---|---|
| **Authority** | Hero / Above-the-fold Authority |
| **Canonical surface (candidate)** | `sections/hero/` + Section 3 featured product |
| **Status** | **FUTURE** |
| **ADR** | None |
| **Notes** | Desktop adaptive phase will revisit. Do not invent secondary hero authorities without SA. |

---

## 6. Shared primitives (supporting, not full authorities)

| Primitive | Path | Status | Notes |
|---|---|---|---|
| `SectionBadge` | `components/ui/section-badge.tsx` | Supporting | Used across sections; S11 may omit for production UX |
| `SectionHeader` | `components/ui/section-header.tsx` | Supporting | Prefer for section titles |
| `LineIcon` | `components/ui/line-icon.tsx` | Supporting | Shared LINE icon |
| `IconWrapper` | `components/ui/icon-wrapper.tsx` | Supporting | WS01 inventory |
| Site navigation | `content/site-navigation.ts` | Canonical **data** for nav/contacts/socials | Footer/header consumers |
| LINE OA | `LINE_OA_URL` in `lib/commerce/cta-contract.ts` | Canonical destination | `https://lin.ee/syjmYE2` |
| CTA activation | `activateLineCta` | Canonical orchestration | Do not invent parallel handoffs |

---

## 7. Mobile section freeze map (program status)

| Surface | Program status (SA) | Notes |
|---|---|---|
| Header Drawer | **PASS / MERGED / FROZEN (mobile nav IA)** | PR #18 |
| Section 4 | FROZEN | DO_NOT_MODIFY without SA |
| Section 5 | FROZEN | DO_NOT_MODIFY without SA |
| Section 6 | FROZEN | DO_NOT_MODIFY without SA |
| Section 7 | FREEZE_READY | Closeout pending merge stack |
| Section 8 | FREEZE_READY | Review authority ACCEPTED |
| Section 9 | FREEZE_READY | FAQ authority ACCEPTED |
| Section 10 | FREEZE_READY | Primary CTA authority ACCEPTED |
| Section 11 | FREEZE_READY | Footer authority still PARTIAL |
| Desktop / Tablet | DEFERRED | Adaptive phase later |

**Repository note:** Several Phase B2 implementation PRs may still be unmerged relative to `main`. Program freeze status (SA) is authoritative for roadmap; merge hygiene remains a release task.

---

## 8. Authority decision rules (v1)

1. **One authority per concern** — no competing review/FAQ/primary-CTA languages without ADR supersession.  
2. **Page composition is allowed** — authorities define language, not pixel-identical clones.  
3. **Data authorities beat presentation** — Product Authority / LINE_OA_URL / site-navigation win conflicts.  
4. **No new analytics schema** without analytics foundation ADR update.  
5. **Shared extraction is optional** until multi-consumer + regression review.  
6. **Desktop is not in scope** of these freezes.  
7. **Production / Ads remain gated** by Production Readiness Review.

---

## 9. Gap list for Production Readiness (from registry view)

| ID | Gap | Severity |
|---|---|---|
| REG-G01 | Phone authority | **CLOSED (C1)** — CONFIRMED `092-956-5523` |
| REG-G02 | Footer not on platform pages | Medium |
| REG-G03 | Social URLs missing / icons hidden | Medium brand |
| REG-G04 | Legal pages content quality | **Reduced (C1)** — Thai PDPA/Terms production draft published; legal counsel sign-off still recommended |
| REG-G05 | ADR-004/005/006 historically lived on feature branches — now indexed here | Process (addressed in B3) |
| REG-G06 | Unmerged B2 section stacks vs `main` hygiene | **CLOSED** (integrated main `9025fca`+) |
| REG-G07 | Desktop adaptive incomplete | Deferred by design |
| REG-G08 | Hostinger deploy SHA identity + cache purge | High for RC (ops) |
| REG-G09 | Analytics runtime observation on beta | Medium before Ads |

---

## 10. Next registry actions (not in this document’s implementation)

1. Production Readiness Review (whole product gate).  
2. After S11 formal freeze: decide ADR-007 Footer Authority YES / PARTIAL.  
3. Cross-Section Consistency Review companion report (Phase B3 Part 2).  
4. Desktop Adaptive Phase — new authorities only with SA Scope Lock.

---

## 11. Document control

| Version | Date | Change |
|---|---|---|
| v1 | 2026-07-18 | Initial registry · Phase B3 · after PR #18 merge |
| v1.1 | 2026-07-19 | Phase C1 · phone CONFIRMED · legal draft upgrade · gap status refresh |

**Supersession:** Future ADR-00x that conflicts with this registry must update this file in the same PR.
