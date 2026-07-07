# PHASE5H-PILOT-VERIFICATION-SCOPE-LOCK.md (v1.0)

**Project:** ZENOVELL-PIMPZ-V4-Active  
**Phase:** 5H — Pilot Verification  
**Milestone:** Pilot Verification Scope Lock  
**Version:** v1.0  
**Status:** Locked  
**Date:** 2026-07-07  

---

## 1. Scope

This document locks the scope for Phase 5H Pilot Verification.

It ensures that all verification activities stay strictly within the boundaries defined in the approved PHASE5H-PILOT-VERIFICATION-BLUEPRINT.md and prevents scope creep.

**Core Objective (from Blueprint):**  
Pilot Verification of the integrated platform built in 5A–5G. Focus on evidence-based verification of user journeys, Commerce Context continuity, LINE handoff, SEO/AI SEO, mobile, accessibility, performance, and analytics — using verifiable evidence (screenshots, recordings, logs, etc.). This is not feature development or new implementation.

**In Scope (Locked):**
- Define and execute verification for the Test Case IDs listed below.
- Automated, Manual, Real Device, and Production-like verification as defined.
- Collection of evidence for all PASS items.
- Mapping of verification results to Production Readiness Gate inputs.
- All work follows Development Workflow v2.0 (Blueprint → Scope Lock → Verification Execution → Independent Implementation Audit → SA Final Review).

**Batch Size:** One controlled batch for Pilot Verification only.

---

## 2. Allowed Files

Only the following files and folders **MAY** be accessed or modified during Verification activities (for evidence collection or minor supporting updates). Any change outside this list is a scope violation.

```
# Core system files for inspection and verification (read access for evidence)
app/layout.tsx
app/page.tsx
app/(platform)/products/[slug]/page.tsx
app/(platform)/information/[slug]/page.tsx
app/(platform)/knowledge/[slug]/page.tsx

components/platform/product-hero.tsx
components/platform/information-cta.tsx
components/platform/knowledge-cta.tsx
components/platform/*-related*.tsx

lib/commerce/context.ts
lib/commerce/cta-contract.ts
lib/commerce/events.ts
lib/commerce/line-message-builder.ts
lib/commerce/persistence.ts

lib/platform/seo.ts
lib/platform/entity-loader.ts

# 5G SEO artifacts for verification
public/robots.txt
public/llms.txt
app/sitemap.ts

# Verification support (if any scripts or evidence collection tools are added, they must be in a dedicated verification/ dir and explicitly approved)
```

**Notes on Allowed:**
- All modifications must be for verification evidence collection or to fulfill the Blueprint's verification requirements.
- app/sitemap.ts and related getters may be inspected/verified but not altered unless necessary for verification setup (and only if listed).
- Changes must be traceable to specific Test Case IDs (e.g., PV-001, PV-009).
- Only additive or evidence-supporting changes. No modifications to core contracts or authorities.

---

## 3. Forbidden Files

The following are **strictly forbidden** to modify during this phase. Violations will cause immediate Scope Lock failure.

- `content/products.ts`
- `content/information.ts`
- `content/knowledge/**`
- `sections/**` (frozen homepage content)
- Any Authority data files
- Checkout, CRM, or new feature code
- lib/commerce core beyond verification inspection
- Phase 5G or earlier files outside listed Allowed
- New pages or surfaces
- Analytics adapters or external integrations (unless for verification logging only)
- Any files not explicitly listed in Allowed

**Additional Protection:**
- No changes to frozen homepage visual/DOM or content.
- No scope expansion into feature development.
- Strict read-only inspection where possible; modifications only for evidence support if approved.

---

## 4. Verification Matrix

The verification is structured around the Test Case IDs below, mapped to Blueprint categories.

**Test Case IDs (Mandatory):**

- PV-001 Homepage (basic load, navigation, frozen sections)
- PV-002 Homepage → Product (journey start, context capture)
- PV-003 Product → LINE (handoff with full context, CTA contract, builder)
- PV-004 Homepage → Information (journey, research intent)
- PV-005 Information → LINE (handoff, non-product message, context)
- PV-006 Homepage → Knowledge (journey, educational content)
- PV-007 Knowledge → Product (cross-surface link, context carry)
- PV-008 Knowledge → LINE (handoff, context in message)
- PV-009 Commerce Context Continuity (load/save/merge/clear across journeys)
- PV-010 Sitemap (generation, content, entity getters usage)
- PV-011 robots.txt (presence, content, sitemap reference)
- PV-012 llms.txt (presence, content accuracy)
- PV-013 Structured Data (JSON-LD validity for all types: Organization, WebSite, Product, Article, HowTo, FAQPage, BreadcrumbList)
- PV-014 Mobile Safari (iPhone rendering, touch, LINE)
- PV-015 Chrome Mobile (Android rendering, touch, LINE)
- PV-016 Accessibility (ARIA, lang, contrast, keyboard)
- PV-017 Lighthouse (Core Web Vitals, SEO, a11y scores)
- PV-018 Regression (no breakage on prior 5A-5G functionality)

Each test case must be executed per the Test Matrix and produce required evidence.

---

## 5. Browser Verification Matrix

- **Automated / CI**: Chrome (headless for build, metadata, sitemap generation, Lighthouse CI if configured).
- **Manual Desktop**: Chrome, Safari (desktop) for journey review, source inspection, console.
- **Real Mobile**:
  - iPhone (Safari + LINE app)
  - Android (Chrome + LINE app)
- **Production-like**: Simulate UTM params in browsers, inspect network for context, verify sitemap/robots/llms.txt in browser dev tools.

All real device tests must use actual hardware where possible.

---

## 6. Test Case Matrix

For each PV-XXX, the following must be defined (to be detailed in execution):

**Example structure for all (full details in execution plan):**

- **PV-001 Homepage**
  - Objective: Verify frozen homepage loads, basic navigation, and entry points to surfaces.
  - Method: Manual load on desktop/mobile, click sections/links.
  - Expected Result: Homepage renders correctly, links to products/info/knowledge work.
  - Evidence Required: Screenshot of homepage, screenshot of clicked link landing, console log (no errors).
  - PASS/FAIL Criteria: No JS errors, correct navigation, frozen sections intact.

(Repeat for all 18 with specifics from Blueprint.)

Full matrix will map:
- Automated: PV-010, PV-011, PV-012, PV-013, PV-017, PV-018 (build + generation)
- Manual: PV-001 to PV-009, PV-016 (journey review, content)
- Real Device: PV-014, PV-015 (device + LINE)
- Production-like: PV-002 to PV-008 (with UTM simulation), PV-009 (persistence across), PV-010 to PV-013 (SEO artifacts in prod-like)

---

## 7. Evidence Requirements

For every test case and every PASS item, the following evidence is **mandatory**:

- Screenshot (with timestamp and URL visible)
- Browser Console log (full, no critical errors)
- Network Log (for context/requests if applicable)
- Lighthouse Report (for PV-017)
- JSON-LD Verification (copy of script or validator output for PV-013)
- Metadata Verification (view source or dev tools for title/desc/OG)
- LINE URL Verification (full opened URL and message text for PV-003,005,008)
- Screen Recording (for real device journeys PV-014,015)
- Persistence inspection (localStorage/sessionStorage dump for PV-009)

All evidence must be time-stamped, labeled with Test Case ID, and stored in a verifiable location (e.g., shared drive or repo docs/evidence/5h/).

---

## 8. Deliverables Matrix

| Blueprint Section / Test Case | Target Verification Activities / Artifacts | Notes |
|-------------------------------|-------------------------------------------|-------|
| 5. User Journey Matrix (PV-001 to PV-008) | Manual + Real Device execution of journeys; screenshots, recordings, LINE messages | Map to cross-surface and context continuity |
| 6. Commerce Context Verification (PV-009) | Code review + real navigation with load/save/clear; console + storage dumps | Use create* helpers and persistence |
| 7. LINE Handoff Verification (PV-003,005,008) | Capture messages in test LINE OA; URL inspection | Use buildLineMessage or buildNonProductLineMessage |
| 8. SEO / AI SEO Verification (PV-010-013) | Validate files in browser/dev tools; sitemap XML, robots, llms.txt content | Confirm entity getters in sitemap |
| 9-11. Mobile/Browser, Accessibility, Performance (PV-014-017) | Real device tests + Lighthouse | Include touch, rendering, CWV |
| 12. Analytics Verification (PV-018 + events) | Inspect dispatched events and payloads | Confirm CommerceContext in events |
| 13. Evidence Requirements | All artifacts collected per case | Time-stamped, labeled |
| 14-15. Acceptance/Exit | Full evidence package + audit | Map to Production Readiness |

---

## 9. Acceptance Criteria

- All 18 Test Cases executed with required evidence.
- All journeys complete with correct context in LINE messages.
- SEO artifacts (robots, sitemap, llms, structured data) present and valid.
- Mobile/browser rendering and interactions work on required devices.
- Events generated with correct payloads.
- No critical accessibility or performance regressions.
- Evidence package complete and auditable.
- No breakage in 5A-5G functionality.

---

## 10. Exit Criteria

Phase 5H is complete only when:
- All Test Cases have PASS results with evidence.
- Independent Implementation Audit passes (evidence review).
- SA Final Review accepts the package.
- Outputs mapped to Production Readiness Gate v1 inputs.
- Working tree clean (governance docs only).

---

## 11. Production Readiness Gate Inputs

Phase 5H outputs (evidence package, test results, risk mitigations) become direct inputs to Production Readiness Gate v1. Specifically:

- Commerce Context continuity evidence → Attribution Readiness
- LINE Handoff verification → Conversion Readiness
- Mobile / Browser / Accessibility results → Device & Usability Compatibility
- SEO / AI SEO artifacts and verification → Search & AI Discoverability Readiness
- Analytics event verification → Measurement Readiness
- Overall journey success → End-to-End Operational Readiness

---

## 12. Risks

- Real LINE OA context delivery differs from code simulation.
- Context loss or mutation in real browser navigation (especially cross-device or from frozen homepage).
- Frozen homepage UX issues not caught in code review.
- Noop events prevent full attribution proof.
- Device/Safari quirks not reproducible in dev.
- SEO artifacts not yet live on production domain.

**Mitigations:**
- Use dedicated test LINE OA accounts; capture exact messages.
- Test persistence with full navigation sequences on real devices.
- Explicitly document frozen homepage limitations and test around it.
- Focus verification on payload correctness (contracts) vs. delivery.
- Test on minimum 2 iOS + 2 Android devices + desktop browsers.
- Verify artifacts via local server and document prod submission steps.

---

## 13. Mitigations

(Integrated above with Risks. Additional: Use time-stamped evidence; reproducible steps; clear PASS/FAIL binary criteria.)

---

**Change Control**

Any change to this Scope Lock requires:
- Version bump.
- Re-approval by System Architect.
- New iteration before continuing verification.

**Governing Documents:**
- PHASE5H-PILOT-VERIFICATION-BLUEPRINT.md (SA Final Approved)
- DEVELOPMENT-WORKFLOW-v2.0 (OFFICIAL)
- PHASE5-COMMERCE-EXPERIENCE-BLUEPRINT.md
- ADR-001, ADR-002, ADR-003
- REPOSITORY-STRUCTURE-GUIDE.md

**Status:** LOCKED — No verification execution may begin until this document is committed and pushed.

**Mandatory Rules:**
- app/sitemap.ts (if inspected) and related must align with entity getters.
- Only files explicitly listed may be modified (for verification support only).
- No modification to Product/Information/Knowledge Authorities, homepage sections, or Commerce Wiring.
- Every verification item must have: Objective, Method, Expected Result, Evidence Required, PASS/FAIL Criteria.
- Evidence must be collected and auditable for Production Readiness Gate v1.