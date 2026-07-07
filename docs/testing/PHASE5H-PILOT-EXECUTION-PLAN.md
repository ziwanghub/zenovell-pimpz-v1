# PHASE 5H — PILOT EXECUTION PLAN

**Date**: 2026-07-07  
**Phase**: Phase 5H — Pilot Verification  
**Type**: Operational Runbook (NOT Architecture / NOT Blueprint / NOT Scope Lock)  
**Version**: v1.0  
**Status**: Ready for Execution  
**References**:
- PHASE5H-PILOT-VERIFICATION-BLUEPRINT.md (SA Final Approved)
- PHASE5H-PILOT-VERIFICATION-SCOPE-LOCK.md (Locked)
- DEVELOPMENT-WORKFLOW-v2.md (OFFICIAL)
- PHASE5-COMMERCE-EXPERIENCE-BLUEPRINT.md

**Purpose**: This is a repeatable operational runbook for Gemini (or designated verifier) to execute browser-based Pilot Verification. It provides step-by-step instructions, expected results, and mandatory evidence collection for each Test Case ID (PV-001 to PV-018). All activities are read-only inspection and browser execution on the production build. No code changes are authorized.

---

## 1. Objectives

- Execute all 18 mandatory Test Cases (PV-001 to PV-018) sequentially.
- Collect verifiable, time-stamped evidence for every PASS item.
- Prove end-to-end platform behavior from 5A–5G in real browser/device conditions.
- Verify Commerce Context continuity, LINE handoff, SEO/AI SEO artifacts, mobile experience, accessibility, performance, and analytics contracts.
- Produce an auditable evidence package for Phase 5H Closeout and Production Readiness Gate v1.
- Ensure all tests are repeatable with clear PASS/FAIL criteria.

---

## 2. Preconditions

- Production build must be used: `npm run build && npm run start` (or equivalent `next build && next start`).
- Local server running on http://localhost:3000 (or configured port).
- Clean browser profiles (no extensions that interfere with console/network).
- Test LINE Official Account ready (test user added as friend).
- Access to device lab: iPhone, Android phone, Desktop.
- Evidence storage directory created: `docs/evidence/phase5h/`
- All prior phases (5A-5G) committed and pushed; working tree clean before starting.
- No code changes during execution — read-only + browser interaction only.

---

## 3. Environment

- **Build**: Production build only (`next build && next start`).
- **Server**: Local production server at http://localhost:3000.
- **Browsers**:
  - Desktop: Chrome (latest stable), Safari (latest).
  - Mobile: Chrome on Android, Safari on iPhone.
- **Test Devices** (minimum):
  - Desktop (macOS or Windows).
  - iPhone (iOS latest + LINE app).
  - Android phone (latest Android + LINE app).
- **Network**: Real mobile networks or throttled (3G/4G simulation for performance).
- **Tools**:
  - Browser DevTools (Console, Network, Elements, Application for storage).
  - Lighthouse (via Chrome DevTools or CLI).
  - Screenshot tool (built-in or external with timestamps).
  - Text editor for copying logs/JSON.
  - LINE app on devices for message inspection.
- **Data**:
  - Test products from content/products.ts (e.g., nicky-pimpz-boss).
  - UTM examples: ?utm_source=google&utm_medium=cpc&utm_campaign=pilot5h
  - Clean sessionStorage before each major journey.

---

## 4. Execution Order

Execute strictly in sequence:

PV-001 → PV-002 → PV-003 → PV-004 → PV-005 → PV-006 → PV-007 → PV-008 → PV-009 → PV-010 → PV-011 → PV-012 → PV-013 → PV-014 → PV-015 → PV-016 → PV-017 → PV-018

Do not skip. Record start/end time for each.

If a test is BLOCKED, document reason and proceed only after mitigation (with note).

---

## 5. Test Case Runbook

For each Test Case ID below:

**PV-001 Homepage**

- **Objective**: Verify frozen homepage loads correctly with basic navigation and entry points to surfaces without breakage.
- **Preconditions**: Production server running. Clean browser.
- **Steps**:
  1. Open http://localhost:3000 in Desktop Chrome.
  2. Inspect page load (no errors in console).
  3. Scroll through frozen sections (Hero, Trust Bar, Product Catalog, etc.).
  4. Click a product card or navigation link to Information/Knowledge if present.
  5. Verify MobileShell and GlobalHeader render.
- **Expected Result**: Homepage renders fully. No JS errors. Links navigate to correct surfaces. Frozen sections intact.
- **Evidence Required**: Screenshot of full homepage with timestamp/URL. Console log export (clean). Screenshot of navigation to a surface.
- **PASS Criteria**: No console errors, correct navigation, sections visible and matching 5G+ content.
- **FAIL Criteria**: Any JS error, broken layout, missing content, or navigation failure.

**PV-002 Homepage → Product**

- **Objective**: Verify journey from homepage to Product page with context capture.
- **Preconditions**: Clean browser. UTM optional.
- **Steps**:
  1. Open homepage.
  2. Click a Product card (e.g., nicky-pimpz-boss).
  3. Verify Product page loads.
  4. Open DevTools → Application → Session Storage → inspect for persisted context (if any).
  5. Note context in console if logged.
- **Expected Result**: Product page loads with correct data. Context base created (source, landingPage, intent).
- **Evidence Required**: Screenshot of homepage click + Product page. Console log showing context creation. Session storage screenshot.
- **PASS Criteria**: Product page renders correctly. Context object contains required fields.
- **FAIL Criteria**: 404, missing content, or no context creation.

**PV-003 Product → LINE**

- **Objective**: Verify full Product → LINE handoff with enriched context using CTA Contract and builder.
- **Preconditions**: Product page loaded. Test LINE account.
- **Steps**:
  1. On Product page (e.g., /products/nicky-pimpz-boss), scroll to CTA.
  2. Click CTA.
  3. Inspect opened LINE URL and message.
  4. Check DevTools Console for dispatched event.
  5. Check Session Storage for saved context.
  6. In LINE app, verify message content.
- **Expected Result**: LINE opens with correct pre-filled message including product details, context fields (landingPage, intent, source, timestamp, price). Event dispatched. Context saved then cleared.
- **Evidence Required**: Screenshot of CTA. Full LINE URL and message text. Console log of event. Session storage before/after. LINE chat screenshot.
- **PASS Criteria**: Message contains all required context. Event payload complete. Context persisted and cleared.
- **FAIL Criteria**: Missing fields in message, no event, no persistence action.

**PV-004 Homepage → Information**

- **Objective**: Verify journey to Information page with research intent.
- **Preconditions**: Clean browser.
- **Steps**:
  1. Homepage.
  2. Navigate to an Information page (e.g., via nav or related if present, or direct /information/about).
  3. Verify page loads.
  4. Inspect context creation (research intent).
- **Expected Result**: Information page renders. Context created with intent=research.
- **Evidence Required**: Screenshots of navigation and page. Console/context log.
- **PASS Criteria**: Correct page, proper context.
- **FAIL Criteria**: Broken navigation or missing context.

**PV-005 Information → LINE**

- **Objective**: Verify Information → LINE with non-product message and context.
- **Preconditions**: Information page loaded.
- **Steps**:
  1. Click CTA on Information page.
  2. Capture LINE URL/message.
  3. Check console for event.
  4. Verify persistence.
- **Expected Result**: Context-rich message using buildNonProductLineMessage. Event dispatched.
- **Evidence Required**: LINE message screenshot, console, storage.
- **PASS Criteria**: Message includes page title, URL, intent, source, timestamp. Event present.
- **FAIL Criteria**: Incorrect message format or missing context.

**PV-006 Homepage → Knowledge**

- **Objective**: Verify journey to Knowledge page.
- **Preconditions**: Clean.
- **Steps**: Similar to PV-004 for a Knowledge topic (e.g., /knowledge/ingredient-guide).
- **Expected Result**: Knowledge page with rich content loads. Context with research intent.
- **Evidence Required**: Screenshots + context log.
- **PASS/FAIL**: As above.

**PV-007 Knowledge → Product**

- **Objective**: Verify cross-surface from Knowledge to Product with context carry.
- **Preconditions**: Knowledge page.
- **Steps**:
  1. Click related product link.
  2. Verify Product page.
  3. Check persisted context loaded.
- **Expected Result**: Navigation succeeds. Context from Knowledge carries or enriches.
- **Evidence Required**: Screenshots of link and target. Storage inspection.
- **PASS/FAIL**: Successful navigation with context continuity.

**PV-008 Knowledge → LINE**

- **Objective**: Verify Knowledge → LINE handoff.
- **Steps**: Similar to PV-005.
- **Expected Result**: Proper non-product message with context.
- **Evidence**: As above.

**PV-009 Commerce Context Continuity**

- **Objective**: Verify full lifecycle (load, create/enrich, save, clear) across journeys.
- **Preconditions**: Multiple surfaces.
- **Steps**:
  1. Start on one surface, trigger CTA (save).
  2. Navigate to another surface (load).
  3. Verify merge in console.
  4. After LINE, verify clear.
- **Expected Result**: Context persists and enriches correctly. Clear works.
- **Evidence Required**: Storage dumps before/after, console logs of load/save/clear.
- **PASS/FAIL**: No loss of fields; clear executes.

**PV-010 Sitemap**

- **Objective**: Verify dynamic sitemap generation and content using entity getters.
- **Preconditions**: Production build.
- **Steps**:
  1. Visit /sitemap.xml.
  2. Inspect XML.
  3. Confirm includes homepage + all slugs from getAll*.
- **Expected Result**: Valid XML with all 1 + 6 products + info + knowledge entries.
- **Evidence Required**: Full sitemap.xml content or screenshot. Grep for getters in source.
- **PASS/FAIL**: All entities present; uses correct getters.

**PV-011 robots.txt**

- **Objective**: Verify robots.txt presence and content.
- **Steps**: Visit /robots.txt.
- **Expected Result**: Contains Allow: / and Sitemap reference.
- **Evidence**: Screenshot or content dump.
- **PASS/FAIL**: Correct content, no blocks.

**PV-012 llms.txt**

- **Objective**: Verify llms.txt for AI SEO.
- **Steps**: Visit /llms.txt.
- **Expected Result**: Contains brand, entities, links.
- **Evidence**: Content capture.
- **PASS/FAIL**: Accurate and complete.

**PV-013 Structured Data**

- **Objective**: Verify JSON-LD for Organization, WebSite, Product, Article/HowTo, FAQPage, BreadcrumbList.
- **Steps**: On each surface, inspect <script type="application/ld+json">.
- **Expected Result**: Valid per type, includes required fields (dates, author where applicable).
- **Evidence Required**: JSON-LD validator output or copy of scripts.
- **PASS/FAIL**: All required schemas present and valid.

**PV-014 Mobile Safari**

- **Objective**: Verify on iPhone Safari + LINE.
- **Steps**: Load journeys on device. Click CTAs. Inspect LINE.
- **Expected Result**: Renders correctly, touch works, context correct.
- **Evidence**: Screen recordings + LINE screenshots.
- **PASS/FAIL**: No rendering/touch issues.

**PV-015 Chrome Mobile**

- **Objective**: Verify on Android Chrome + LINE.
- **Same as above**.
- **Evidence**: Recordings + logs.

**PV-016 Accessibility**

- **Objective**: Basic a11y on key flows.
- **Steps**: Keyboard nav, inspect ARIA, contrast.
- **Expected Result**: No critical violations.
- **Evidence**: axe/WAVE report or manual notes + screenshots.
- **PASS/FAIL**: Basic compliance.

**PV-017 Lighthouse**

- **Objective**: Core Web Vitals + SEO + a11y scores.
- **Steps**: Run Lighthouse on key pages (mobile + desktop).
- **Expected Result**: Acceptable scores (LCP, etc.).
- **Evidence**: Full Lighthouse reports.
- **PASS/FAIL**: No critical failures vs baselines.

**PV-018 Regression**

- **Objective**: No breakage on 5A-5G functionality.
- **Steps**: Run all journeys; check previous features (e.g., related links, metadata).
- **Expected Result**: No new errors.
- **Evidence**: Console logs, screenshots.
- **PASS/FAIL**: Zero regressions.

---

## 6. Evidence Collection Rules

- Create directory structure before starting:
  ```
  docs/evidence/phase5h/
    PV-001/
    PV-002/
    ...
    PV-018/
  ```
- Every file must be named with timestamp and Test ID, e.g., `PV-003-2026-07-07T10-30-00-console.log`
- Required for every PASS:
  - At least 1 Screenshot (URL + timestamp visible)
  - Console log export
  - Network log (if relevant)
  - For real device: Screen recording (at least key steps)
  - LINE URL + message text
  - For PV-013: JSON-LD or validator output
  - For PV-017: Full Lighthouse report
- Store all evidence in the repo under docs/evidence/phase5h/ or linked externally with clear paths.
- Time-stamp all evidence.

---

## 7. Browser Matrix

- Desktop Chrome (latest)
- Desktop Safari (latest)
- Mobile Chrome (Android)
- Mobile Safari (iPhone)
- LINE App on iOS and Android (for handoff verification)

Test all journeys on at least Desktop Chrome + one mobile + LINE.

---

## 8. Production-like Verification

- Apply UTM params on homepage entry (e.g., ?utm_source=google&utm_medium=cpc...).
- Verify context captures UTM and persists through journey.
- Simulate cross-surface navigation (e.g., from Product to Knowledge via related).
- Verify LINE message contains full context.
- Inspect /robots.txt, /sitemap.xml, /llms.txt directly in browser.
- Confirm no 404s or crawl blocks.

---

## 9. Reporting Template

For each Test Case in final report:

**PV-XXX: [Name]**

- Status: PASS / FAIL / BLOCKED
- Date/Time: ...
- Browser/Device: ...
- Evidence Links: [list files]
- Notes: ...
- PASS/FAIL Justification: ...

Aggregate into summary table at end.

---

## 10. Exit Checklist

Before declaring Phase 5H complete:
- [ ] All 18 PV executed with evidence.
- [ ] Evidence package complete and organized.
- [ ] All Acceptance Criteria met.
- [ ] Independent Audit completed.
- [ ] SA Final Review passed.
- [ ] Working tree clean (governance only).
- [ ] CI passed.
- [ ] Evidence ready for Production Readiness Gate v1.

---

**Important Notes**:
- Always start with clean browser session (clear storage/cookies).
- Document any deviations immediately.
- If BLOCKED, log reason and prerequisite fix (without code change).
- This plan ensures repeatability and auditability.

**Governing Principle**: Evidence-first. No claim without artifact. All tests must be binary and reproducible.