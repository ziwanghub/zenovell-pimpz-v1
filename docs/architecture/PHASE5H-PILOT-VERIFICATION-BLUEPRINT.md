# PHASE 5H — PILOT VERIFICATION BLUEPRINT

**Date**: 2026-07-07  
**Phase**: Phase 5H — Pilot Verification  
**Status**: Blueprint (SA Final — Ready for Blueprint Audit)  
**Baseline**: v2.0 Development Workflow + Phase 5G SEO / AI SEO Complete  
**Governing Documents**:
- DEVELOPMENT-WORKFLOW-v2.md (OFFICIAL)
- PHASE5-COMMERCE-EXPERIENCE-BLUEPRINT.md (APPROVED)
- PHASE5G-SEO-AISEO-BLUEPRINT.md (APPROVED)
- Phase 5H PRE-WP00 (PASS)
- Phase 5H PRE-WP00A (PASS)
- REPOSITORY-STRUCTURE-GUIDE.md
- LEAN-REPORTING-POLICY.md

**Objective**: Define the complete Pilot Verification architecture and strategy to prove that the integrated Commerce Experience Platform (5A–5G) works end-to-end in real conditions. This is not feature development; it is evidence-based verification to support Production Readiness decisions.

This Blueprint is the single Architectural Authority for Phase 5H.

---

## 1. Pilot Verification Objectives

- Verify that all completed capabilities from 5A–5G function together as an integrated system.
- Prove Commerce Context continuity across user journeys.
- Confirm reliable LINE handoff with enriched context.
- Validate discoverability and authority signals for SEO/AI SEO.
- Assess real-world mobile, browser, and device compatibility.
- Establish measurable evidence for Production Readiness Gate.
- Identify and mitigate operational risks before public exposure.

Primary goal: Generate verifiable evidence (not opinions) that the platform is ready for limited pilot campaigns and attribution measurement.

---

## 2. Verification Scope

In-scope:
- All surfaces and flows built in 5C–5G: Product Experience, Information Experience, Knowledge Experience, Commerce Wiring, SEO/AI SEO.
- End-to-end journeys starting from Homepage (frozen) through surfaces to LINE.
- Commerce Context capture, enrichment, persistence, and consumption.
- LINE message construction and handoff.
- Site-level SEO artifacts (robots, sitemap, llms.txt, structured data).
- Mobile-first rendering, basic accessibility, and performance under real conditions.
- Event generation for key interactions (views, clicks, handoffs).

Out-of-scope (per master blueprint):
- New features or content.
- On-site checkout/payment.
- Full CRM or retention logic.
- Production analytics adapters (focus on contracts and dispatch).
- Large-scale content or ad campaigns (limited pilot only).

---

## 3. Verification Categories

1. Functional (core behaviors per surface and wiring)
2. User Journey (complete flows from entry to LINE)
3. Commerce Context (continuity and enrichment)
4. LINE Handoff (message accuracy and context delivery)
5. SEO / AI SEO (discoverability and signals)
6. Mobile (rendering and interaction on devices)
7. Accessibility (basic compliance and usability)
8. Performance (Core Web Vitals on real networks)
9. Analytics (event generation and payload correctness)
10. Error Handling (graceful degradation and recovery)

---

## 4. Test Matrix

**Automated Verification** (CI / Build / Static):
- Build, lint, typecheck, generateStaticParams for all routes.
- Metadata generation and structured data validity.
- Sitemap/robots/llms.txt generation and content correctness.
- Evidence: Build logs, generated sitemap XML, JSON-LD validation output.

**Manual Verification** (Code + Content Review):
- Review of context flow logic in CTAs and pages.
- Content accuracy and tone in surfaces.
- Internal linking and navigation consistency.
- Evidence: Screenshots of code, annotated reviews, exported page source.

**Real Device Verification** (Physical Devices + LINE App):
- iPhone (Safari + LINE)
- Android (Chrome + LINE)
- Desktop (Chrome + Safari)
- Evidence: Screen recordings, device logs, actual LINE message screenshots.

**Production-like Verification** (Simulated Live Conditions):
- UTM parameters from ad-like entry.
- Cross-surface navigation with persisted context.
- SEO crawling simulation (sitemap submission test, robots compliance).
- LINE OA test account with context inspection.
- Evidence: Network/console logs, LINE chat exports, analytics payload captures.

---

## 5. User Journey Matrix

1. **Hot / Direct**: Homepage Hero CTA → LINE (with basic context)
2. **Warm / Product**: Homepage → Product Card → Product Page → CTA → LINE (full product context + persist)
3. **Research / Information**: Homepage → Information (via nav/link) → Related Product or direct CTA → LINE (research intent + persist)
4. **Deep / Knowledge**: Homepage → Knowledge → Related Product/Info → CTA → LINE (educational context + persist)
5. **Cross-surface**: Product ↔ Information ↔ Knowledge via related links, with context carry-over.
6. **Error paths**: Invalid slugs, network issues during CTA.

Each journey must verify:
- Correct context fields populated.
- Message includes surface, intent, landingPage, timestamp.
- Persistence load/save works across steps.
- No breakage in frozen homepage or prior surfaces.

---

## 6. Commerce Context Verification

- Capture: Base context created at entry (homepage, surface load) using createCommerceContext / createContextFromProduct.
- Enrichment: Merge with product data, UTM, persisted values.
- Persistence: Save on CTA, load on next surface, clear after successful handoff or explicit reset.
- Consumption: Passed to CTA payload, LINE message builder, and events.
- Evidence: Console logs of context objects at each step, LINE message text, persistence storage inspection.

PASS/FAIL: All required fields present and correct; context survives navigation without loss or mutation.

---

## 7. LINE Handoff Verification

- Message construction: Uses buildLineMessage (product) or buildNonProductLineMessage (info/knowledge) with full context.
- Context in message: Includes landingPage, intent, source, entrySurface, timestamp, product info where applicable.
- Delivery: Opens correct LINE URL; message received in test OA.
- Attribution: Context available for downstream (simulated).
- Evidence: Full LINE message export, screenshot of chat, URL inspection.

PASS/FAIL: Message is human-readable, contains all context fields, opens without error.

---

## 8. SEO / AI SEO Verification

- robots.txt: Present, correct, references sitemap.
- sitemap: Dynamic, includes all surfaces + homepage, uses entity getters, valid XML.
- llms.txt: Present, accurate brand/entities/links.
- Metadata: Complete per entity (title, desc, keywords, OG, Twitter).
- Structured Data: Organization, WebSite, Product, WebPage/Article/HowTo/FAQPage, BreadcrumbList all present and valid.
- Evidence: Browser dev tools (view source), sitemap XML download, llms.txt content, JSON-LD validator results.

PASS/FAIL: All artifacts load correctly; no crawl blocks; rich signals present for AI.

---

## 9. Mobile / Browser Verification

- Devices: iPhone (latest Safari + LINE), Android (latest Chrome + LINE), Desktop (Chrome + Safari).
- Rendering: MobileShell, responsive layouts, no overflow or broken CTAs.
- Touch: CTA buttons, links, navigation functional.
- Performance: LCP, CLS under real mobile networks (3G/4G simulation).
- Evidence: Screen recordings per device/browser, Lighthouse reports (mobile), console error logs.

PASS/FAIL: No critical rendering or interaction issues; performance within acceptable thresholds.

---

## 10. Accessibility Verification

- Semantic HTML, lang="th", proper headings.
- Viewport and viewportFit correct.
- ARIA labels on CTAs and interactive elements.
- Keyboard navigation and focus states.
- Color contrast and text readability.
- Evidence: axe DevTools or WAVE reports, keyboard-only walkthrough video, contrast checker results.

PASS/FAIL: No critical accessibility violations; basic WCAG AA compliance on key flows.

---

## 11. Performance Verification

- Core Web Vitals on real devices (LCP < 2.5s target where possible).
- Image loading and optimization behavior.
- Bundle size and initial load.
- Evidence: Lighthouse / Web Vitals extension captures, network waterfall screenshots, console timing logs.

PASS/FAIL: No regressions vs prior CI baselines; mobile experience acceptable.

---

## 12. Analytics Verification

- Events generated: LINE_CLICK, page views, CTA interactions with full CommerceContext payload.
- Payload correctness: All required fields (product, context, intent, etc.).
- Dispatch: Calls to dispatcher present (even if Noop in this phase).
- Evidence: Console logs of built events, payload JSON exports, network requests if any.

PASS/FAIL: Events fire at correct points with complete, accurate payloads.

---

## 13. Evidence Requirements

For every test case:
- Objective (what is being proven)
- Method (how to execute)
- Expected Result (quantitative or qualitative)
- Evidence Required (specific artifacts: screenshots with timestamps, screen recordings, exported logs, LINE message text, JSON payloads, sitemap XML)
- PASS / FAIL Criteria (clear, binary, auditable)

All evidence must be time-stamped and reproducible.

---

## 14. Acceptance Criteria

- All defined journeys complete without breakage.
- Commerce Context is captured, persisted, enriched, and consumed correctly across surfaces and into LINE messages.
- All SEO/AI SEO artifacts (robots, sitemap, llms, structured data) are present, valid, and correct.
- Mobile/browser rendering and basic interactions work on required devices.
- Events are generated with correct payloads.
- No critical accessibility or performance regressions.
- Evidence package complete for every category.

---

## 15. Exit Criteria

Phase 5H complete only when:
- All test cases executed with required evidence.
- All Acceptance Criteria met (or documented exceptions with mitigation).
- Independent Implementation Audit passes.
- SA Final Review accepts the evidence.
- Working tree clean after any supporting docs.
- CI passes (build + any automated checks).

---

## 16. Risks

- Real LINE OA behavior differs from simulation (context not received as expected).
- Context loss in real browser sessions or cross-device.
- Frozen homepage introduces untested UX friction.
- Noop events mean attribution cannot be fully proven until adapters added.
- Device fragmentation (iOS vs Android, Safari quirks).
- SEO artifacts not yet submitted to real search engines/AI indexers.

**Mitigations**:
- Use test LINE accounts and document exact received messages.
- Test persistence with real navigation sequences.
- Explicitly note frozen homepage limitations in test reports.
- Focus 5H on contract correctness and payload; defer full delivery to later.
- Test on at least 2 iOS and 2 Android devices + desktop.
- Verify artifact URLs locally and document submission steps.

---

## 17. Implementation Sequence

1. Define detailed test cases per category with evidence templates.
2. Set up test accounts and device lab.
3. Execute automated checks (build, sitemap generation, metadata).
4. Perform manual code and content reviews.
5. Conduct real-device testing for all journeys.
6. Run production-like scenarios (UTM, SEO crawling simulation).
7. Collect and organize evidence package.
8. Run continuous validation on any supporting code/docs.
9. Prepare for Independent Implementation Audit.

---

## 18. Audit Acceptance Criteria

- Blueprint Compliance Matrix: every section and verification item mapped to executed tests + evidence.
- Delta vs Blueprint: no scope expansion; all planned verifications covered.
- Evidence completeness: every test case has the required artifacts.
- PASS/FAIL decisions are clear and justified.
- No regression on 5A–5G capabilities.
- Validation PASS.
- Risks have documented mitigations.
- Independent audit produces auditable evidence package suitable for Production Readiness Gate.

---

**Governing Principles** (per DEVELOPMENT-WORKFLOW-v2.0 and master blueprint):
- This is verification of what was built in 5A–5G, not new development.
- Evidence-first: every claim backed by reproducible artifacts.
- One Batch = Pilot Verification (design + execution planning).
- Preserve frozen homepage, authority separation, and LINE-first model.
- Focus on testability and measurable readiness for production.

This Blueprint, together with the Scope Lock, is the binding reference for all Phase 5H work.