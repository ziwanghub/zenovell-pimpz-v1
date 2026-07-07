# PHASE5C-IMPLEMENTATION-PLAN.md

**Project:** ZENOVELL-PIMPZ-V4-Active  
**Phase:** 5C  
**Milestone:** Product Landing Page Template  
**Document Type:** Implementation Execution Plan (Planning Only)  
**Authority References:**  
- ADR-001  
- ADR-002  
- ADR-003  
- Phase 5 Blueprint  
- PHASE5-COMMERCE-EXPERIENCE-SCOPE-LOCK.md  
- PHASE5C-PRODUCT-LANDING-BLUEPRINT.md  
- PHASE5C-PRODUCT-LANDING-PAGE-SCOPE-LOCK.md (v1.1)  
- Product Authority  
- Commerce Foundation  
- Production Readiness Gate v1  
- RELEASE-STRATEGY.md  

**Status:** READY (Planning Phase)  
**Governance Note:** This is documentation and planning only. All work packages must pass Independent Audit + ZZ approval before any implementation begins. PRE-WP00 must complete successfully before WP-01 may start.

---

## 1. Executive Summary

This Implementation Plan converts the approved Phase 5C Blueprint and Scope Lock (v1.1) into a granular, executable roadmap.

Phase 5C delivers the official **Product Landing Page Template** for entity-driven product pages (primary: `/products/[slug]`).

The template consists of exactly 10 sections driven by Product Authority data:

- Product Hero
- Benefits
- Ingredients
- How To Use
- Trust Signals
- Reviews
- FAQ
- Related Products
- LINE CTA

The homepage remains completely frozen. All work is delta-only.

The plan is divided into 11 small, independently verifiable Work Packages (WP-01 to WP-11) plus PRE-WP00.

**New Governance Additions:**
- **PRE-WP00: Product Authority Completeness Check** — Mandatory preparation milestone before WP-01.
- **Visual Consistency Gate** — Post-WP-11 governance gate.
- **Performance Budget** — Defined measurable guardrails.

**Overall Status:** READY for planning audit.

---

## 2. Implementation Overview

**Current Baseline:**
- Next.js 16 App Router
- Product Authority as SST
- Commerce Foundation (pure contracts)
- Homepage frozen

**Phase 5C Deliverable:**
- Fully composed, contract-driven Product Landing Page Template
- 10 sections
- Full integration with entity loader + Product data
- LINE CTA using pure builder
- SEO complete

**Explicitly Out of Scope:**
- Any modification to frozen homepage
- Full commerce flows
- Phase 5D+ surfaces

---

## 3. Implementation Principles

1. **Contract First**
2. **Entity-Driven Only**
3. **Pure Foundation**
4. **Delta-Only**
5. **Independently Verifiable & Rollback-able**
6. **SSG + Performance First**
7. **Mobile-First + Accessible**
8. **SEO/AI-SEO Native**
9. **Governance Strict**
10. **Production Readiness Alignment**
11. **Visual & Performance Guardrails**

---

## PRE-WP00: Product Authority Completeness Check

**Purpose:** Mandatory preparation milestone before WP-01.

**Strict Rules:**
- DO NOT populate any data.
- DO NOT modify Product Authority.
- Only define the verification process.

**Minimum Fields to Verify Coverage (by Section):**

| Section            | Required Data Shape / Fields |
|--------------------|------------------------------|
| Hero               | name, shortDescription, heroImage(s), displayPrice / pricing, badge, accent / visualLabel, primary CTA entry |
| Benefits           | benefits: string[] or BenefitItem[] |
| Ingredients        | ingredients: Ingredient[] |
| How To Use         | howToUse: HowToUseStep[] |
| Trust Signals      | trustSignals |
| Reviews            | reviews: Review[] |
| FAQ                | faqs: FAQItem[] |
| Related Products   | relatedSkus or derivation rule |
| LINE Payload       | linePayloadMetadata |
| SEO Metadata       | title, description, canonical, openGraph, twitter, structured data |

**Verification Process:**
1. Export current Product interface.
2. Produce Required Fields Checklist for each section.
3. Cross-reference.
4. Produce PRE-WP00 Evidence Report.
5. Independent audit + ZZ approval.

**Expected Output:** 
- Evidence report in docs/reports/phase5/

**Acceptance Criteria for PRE-WP00:**
- Completeness matrix covers all sections.
- Zero modifications to Product Authority.
- Explicit approval recorded.

---

## 4. Work Package Breakdown

**Note:** All Work Packages below are authorized **only after** successful completion of PRE-WP00.

### WP-01: Component Contracts

**Objective:** Define pure TypeScript contracts for the Product Landing Page Template and all 10 sections.

**Scope:**
- Page composition interface
- One interface per section
- Supporting types
- Safe augmentation of Product type
- CTA usage contract

**Expected Files:**
- docs/architecture or lib/types for contracts (planning)
- Updates to Product Authority (additive only)

**Dependencies:** PRE-WP00, existing Product shape, Commerce CTA contract

**Validation:** typecheck, lint, no breaking changes

**Acceptance Criteria:**
- All 10 section prop interfaces defined
- Page composition contract defined
- Contracts contain no implementation

**Rollback Strategy:** Revert contract files and any additive fields.

### WP-02 to WP-10: Sections (Hero, Benefits, Ingredients, How To Use, Trust Signals, Reviews, FAQ, Related Products, LINE CTA)

Each section WP follows similar structure:
- Objective: Implement one section as prop-driven from contracts
- Scope: Component + integration to page using entity-loaded product
- Expected Files: Specific section component + minimal wiring in page
- Dependencies: WP-01 contracts, PRE-WP00 data readiness, preceding sections for order
- Validation: lint/typecheck/build, render check for products
- Acceptance Criteria: Content 100% from Product, correct order, pure, accessible, SSG compatible
- Rollback Strategy: Revert only that section's files and page diff

### WP-11: QA & Validation

**Objective:** Comprehensive cross-cutting verification.

**Scope:**
- Full automated gates
- Render audit for all products
- SEO/AI-SEO verification
- Accessibility audit
- Frozen baseline verification
- Evidence package

**Expected Files:** docs/reports/phase5/PHASE5C-QA-EVIDENCE.md

**Dependencies:** WP-01 to WP-10 + PRE-WP00

**Acceptance Criteria:**
- Zero lint/type errors
- Clean production build with all product routes SSG
- All sections populated from Product Authority
- LINE CTA correct
- SEO artifacts valid
- Homepage frozen verified
- Evidence document created

**Rollback Strategy:** Do not promote integrated state; revert final wiring.

---

## 5. Implementation Sequence

0. **PRE-WP00** Product Authority Completeness Check (mandatory gate)
1. **WP-01** Component Contracts
2-10. **WP-02 to WP-10** Individual sections (Hero → LINE CTA)
11. **WP-11** QA & Validation
12. **Visual Consistency Gate**
13. **Performance Budget Compliance Review**

**Parallelism Note:** After WP-01, some sections can be prepared in parallel but integration must be sequential.

---

## 6. Risk Assessment

**Per Work Package** (summarized):
- WP-01: Over/under-specification → Mitigate with PRE-WP00 and strict alignment to Blueprint
- Data sections: Missing data in Product Authority → Data population prerequisite via PRE-WP00
- LINE CTA: Incorrect payload → Test every product at build time
- Cross-cutting: Scope creep into homepage → Enforced by plan + git diff review

**Cross-Cutting Risks:**
- Scope creep
- Data model churn
- Build/perf regression

---

## 7. Validation Strategy

Every WP must pass:

- **lint**
- **typecheck**
- **build** (production, all product routes SSG)
- **validate** (compose with frozen baseline check)

**Gate Rule:**
- PRE-WP00 must pass before WP-01
- WP is not done until all four gates green + auditor + ZZ sign-off
- Visual and Performance gates part of final milestone

---

## 8. Milestone Completion Criteria

Phase 5C is complete only when **all** are true:

1. PRE-WP00 executed, audited, ZZ approved. Zero modifications to Product Authority.
2. WP-01 to WP-11 implemented, passed gates, audited, ZZ approved.
3. Product Landing Page Template fully rendered for every product via SSG.
4. All 10 sections present, correctly ordered, populated exclusively from Product Authority.
5. LINE CTA produces correct payloads.
6. SEO/AI-SEO requirements met.
7. Visual Consistency Gate passed.
8. Performance Budget respected and validated.
9. Zero modifications to frozen homepage.
10. Commerce foundation contracts pure.
11. Full validation clean.
12. Evidence package complete.
13. Compatible with RELEASE-STRATEGY.md.

---

**End of PHASE5C-IMPLEMENTATION-PLAN.md**

**Next Action (per governance):**  
Independent Audit → Grok Heavy Review → ZZ Approval → PRE-WP00 execution → WP-01 (only after gates).

Planning complete. No code changes performed in this document.