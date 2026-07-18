# Phase B2.5 — Section 9 Mobile UX Audit

**Document type:** Read-only UX / FAQ usability / conversion audit  
**Date:** 2026-07-18  
**Authority:** Mobile primary 390px · boundary 375 / 430 · desktop 1280 observation only  
**Source baseline:** `main` @ `e971ecb`  
**Runtime:** Local production build of main  
**Branch:** `phase-b2-5/section-9-mobile-audit`  
**Scope:** Section 9 only  
**Implementation:** **NOT AUTHORIZED** by this document  

---

## 1. Executive summary

Section 9 (“คำถามที่พบบ่อย”) is a solid **decision-support / conversion confidence** layer after social proof. Within ~30 seconds users can open common purchase questions (safety, results, dosage, COD, privacy, shipping) via a working single-open accordion, then hand off to dual LINE CTAs.

Landing FAQ is **content-richer** (8 items + support row + final CTA). Product Detail FAQ is **accordion-cleaner** (progressive disclosure animation, simpler chrome, SKU-specific questions).

| Severity | Count |
|---|---:|
| BLOCKER | **0** |
| MUST_FIX | **0** |
| SHOULD_POLISH | **4** |
| ACCEPT | **4** |
| FUTURE | **2** |
| DEFERRED | **1** |

**Strongest findings**

1. **B2.5-F01 SHOULD_POLISH** — CTA `href` is `#line-primary` placeholder (runtime handoff works via `activateLineCta`).  
2. **B2.5-F02 SHOULD_POLISH** — Dual analytics tracks (`SUPPORT_CTA_CLICK` + LINE orchestration) risk double-count.  
3. **B2.5-F03 / Authority** — Recommend Product Detail FAQ as **accordion design authority**; Landing remains conversion composition consumer.  

```text
PHASE_B2_5_AUDIT: COMPLETE
FAQ_AUTHORITY: PRODUCT_DETAIL
SECTION_9_IMPLEMENTATION: NOT_AUTHORIZED
SECTION_9_STATUS: AUDITED_PENDING_SA_TRIAGE
```

---

## 2. Design authority comparison

| Dimension | Landing Section 9 | Product Detail FAQ | Winner for authority |
|---|---|---|---|
| Accordion structure | Plus/Minus, single-open, instant mount | Chevron rotate, grid-rows animation, single-open | **Product** (smoother disclosure) |
| Question hierarchy | 8 marketing funnel Qs | 4 SKU decision Qs | Landing (coverage) / Product (focus) |
| Answer typography | 14px / 1.55 / white/82 + side illustration | 14px / leading-5.5 / white/78 plain | Product (cleaner) |
| Spacing | `space-y-3`, card chrome heavy | `space-y-2.5`, lighter platform shell | Product |
| Disclosure pattern | Conditional render open panel | Always-mounted animated panel | **Product** |
| Disclaimer language | None explicit | Subtitle frames “ข้อมูลสินค้าจริง” | Product |
| CTA relationship | Support pill + final solid LINE | None in FAQ block | Landing (conversion) |

### Recommendation

**FAQ Design Authority = Product Detail FAQ** for:

- accordion disclosure pattern  
- trigger density / min height language  
- answer typography simplicity  
- header micro-label treatment  

**Landing Section 9 remains a consumer** that may keep:

- conversion CTAs  
- brand Q badge / shield illustration (page-specific)  
- broader funnel question set  

Do **not** force shared component extraction in this phase.

---

## 3. Purpose review

| Question | Assessment |
|---|---|
| Answer common purchase questions in 30s? | **Yes** — default open safety Q + 7 more |
| Decision support? | **Yes** — COD, privacy, shipping, meds, dosage |
| Proceed to final CTA confidently? | **Yes** — support + primary CTA after list |

---

## 4. Question hierarchy

| Order | Question (Landing) | Decision stage |
|---:|---|---|
| 1 | ปลอดภัยไหม? (default open) | Trust / safety |
| 2 | เห็นผลเมื่อไหร่? | Expectation |
| 3 | ทานวันละกี่แคปซูล? | Usage |
| 4 | ทานร่วมกับยาอื่น? | Risk |
| 5 | เหมาะกับใคร? | Fit |
| 6 | เก็บเงินปลายทาง? | Commerce |
| 7 | ข้อมูลปลอดภัยไหม? | Privacy |
| 8 | ส่งนานแค่ไหน? | Logistics |

**Verdict:** Order matches typical customer flow **ACCEPT**.  
**Gap (FUTURE):** No explicit “ของแท้/ปลอม” or “คืนเงิน/การันตี” if business offers those policies.

Product FAQ order: results → chronic disease safety → other meds → side effects (SKU-clinical focus).

---

## 5. Accordion UX

| Check | Landing | Notes |
|---|---|---|
| Expand/collapse | Works; single open | Confirmed via clicks |
| Touch targets | Button H ≈ **67px** @390 | PASS ≥44 |
| Icons | Plus/Minus consistent | PASS |
| Animation | Instant show/hide | Product smoother (grid-rows) |
| Expanded readability | Answer 14px good | Shield column costs width |
| Default open | Safety item | Good first answer |

---

## 6. Typography

| Element | Size @390 | Verdict |
|---|---|---|
| Heading | 26px (SectionHeader) | PASS |
| Description | 14px | PASS |
| Question | 16px | PASS |
| Answer | **14px** / 1.55 | PASS |
| Support title | 18px | Strong; may compete with CTA slightly |
| Trust micro | 11px | ACCEPT residual |

---

## 7. Accessibility

| Check | Result |
|---|---|
| `aria-expanded` / `aria-controls` / `role="region"` | Present |
| Focus ring on triggers | Present |
| Heading | SectionHeader `h2` |
| Keyboard | Buttons native — OK |
| Contrast | Answers readable; trust micro weaker |
| Semantic list | `<ul>` of items | PASS |

Product FAQ also has proper ARIA; landing matches baseline.

---

## 8. Transition review

| Transition | Assessment |
|---|---|
| S8 → S9 | Reviews → FAQ · correct residual-objection flow |
| S9 → S10 | FAQ → Final CTA section · natural close |
| Narrative | Social proof → answers → conversion climax |

---

## 9. CTA relationship

| Control | href attr | Runtime | Surface |
|---|---|---|---|
| Support “ปรึกษาผ่าน LINE” | `#line-primary` | `activateLineCta` works | `support-line` + `SUPPORT_CTA_CLICK` |
| Primary final CTA | `#line-primary` | `activateLineCta` works | `faq-line` + `SUPPORT_CTA_CLICK` |

**Verdict:** Conversion handoff works, but **href is not canonical LINE OA** (progressive enhancement gap). Final solid CTA remains stronger than support pill (44 vs 56 height) — hierarchy OK.

---

## 10. Shared surface risks

| Piece | Used by S9 | Risk if changed |
|---|---|---|
| `SectionHeader` | Yes | Frozen sections |
| `IconWrapper` / `LineIcon` | Final CTA | Global LINE chrome |
| `activateLineCta` | Both CTAs | Commerce contract |
| `ctaDestinations` | href resolution | Placeholder `#line-primary` |
| Product `ProductFAQ` | Not shared with landing | Separate component — low coupling |
| Shared accordion package | **None** | Low |

**Prefer local fixes. Do not edit Product FAQ during Landing implementation without impact analysis.**

---

## 11. Browser evidence

**Dir:** `screenshot/Mobile-screenshot/phase-b2-5-section9/`  
**Metrics:** `s9-audit-metrics.json`

| Viewport | Section H | Items | Open | Btn H | Answer FS | Overflow |
|---|---:|---:|---:|---:|---|---|
| 375 | 1250 | 8 | 1 | 67 | 14px | no |
| 390 | 1177 | 8 | 1 | 67 | 14px | no |
| 430 | 1148 | 8 | 1 | 67 | 14px | no |
| 1280 | 1219 | 8 | 1 | 64 | 14px | no |

| Shot | File |
|---|---|
| Full 390 | `s9-full-390.png` / `01-…` |
| Expanded | `s9-expanded-closeup-390.png` / `02-…` |
| S8→S9 | `s8-to-s9-390.png` / `03a-…` |
| S9→S10 | `s9-to-s10-390.png` / `03b-…` |
| Product FAQ | `product-faq-ref-390.png` / `04-…` |
| Desktop | `s9-desktop-1280.png` / `05-…` |

---

## 12. Strengths

- Clear FAQ purpose and default-open safety answer.  
- Broad funnel coverage (8 questions).  
- Accordion semantics + analytics expand/collapse hooks.  
- LINE handoff works via orchestration despite placeholder href.  
- Solid final CTA after FAQ.  
- No overflow; desktop max-width stack is stable.  
- Good answer typography (14px).

---

## 13. Findings register

### B2.5-F01 — CTA href is placeholder `#line-primary`

| Field | Value |
|---|---|
| Type | FUNCTIONAL / UX |
| Severity | **SHOULD_POLISH** (runtime OK via `activateLineCta`) |
| Evidence | Measured both CTAs `href="#line-primary"` from `ctaDestinations` |
| Impact | Middle-click / no-JS / open-in-new-tab without click handler fails; progressive enhancement debt |
| Recommendation | Bind `href={LINE_OA_URL}` like other fixed sections; keep `activateLineCta` |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.5-F02 — Dual analytics on FAQ CTAs

| Field | Value |
|---|---|
| Type | ANALYTICS / OBSERVATION |
| Severity | **SHOULD_POLISH** |
| Evidence | `analytics.track(SUPPORT_CTA_CLICK)` then `activateLineCta` → `line_cta_click` |
| Impact | Possible double conversion counting in GTM |
| Recommendation | SA/analytics owner: keep one primary event path |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.5-F03 — Expanded answer layout density (shield column)

| Field | Value |
|---|---|
| Type | VISUAL / UX |
| Severity | **SHOULD_POLISH** |
| Evidence | `grid-cols-[88px_1fr]` with large shield illustration when open |
| Impact | Answer text width reduced on 375–390 |
| Recommendation | Optional smaller illustration or text-first expand (authority lean product) |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.5-F04 — Support title vs CTA competition

| Field | Value |
|---|---|
| Type | UX / CONVERSION |
| Severity | **SHOULD_POLISH** |
| Evidence | Support title 18px extrabold beside 44px pill CTA |
| Impact | Mild visual competition before final 56px CTA |
| Recommendation | Slight title de-emphasis or spacing only if locked later |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.5-F05 — Accordion single-open behavior

| Field | Value |
|---|---|
| Type | UX |
| Severity | **ACCEPT** |
| Evidence | Only one `aria-expanded=true` at a time |
| Impact | Positive — reduces scroll explosion |
| Recommendation | Keep |

### B2.5-F06 — Question line-clamp-2

| Field | Value |
|---|---|
| Type | VISUAL |
| Severity | **ACCEPT** |
| Evidence | `line-clamp-2` on question span |
| Impact | Low for current lengths |
| Recommendation | Revisit if questions lengthen |

### B2.5-F07 — Trust strip residual

| Field | Value |
|---|---|
| Type | OBSERVATION |
| Severity | **ACCEPT** |
| Evidence | Same ปลอดภัย / ข้อมูลลับ / จัดส่งปกปิด pattern |
| Recommendation | Leave |

### B2.5-F08 — Strong safety answer claim

| Field | Value |
|---|---|
| Type | CONTENT / LEGAL_COMPLIANCE (observation) |
| Severity | **FUTURE** |
| Evidence | “ไม่มีสารอันตราย ไม่ก่อให้เกิดผลข้างเคียง” |
| Impact | Absolute claim risk if not legally reviewed |
| Recommendation | Content/legal review — not UX implementation |
| Implementation | **NOT AUTHORIZED** |

### B2.5-F09 — Missing policy FAQs

| Field | Value |
|---|---|
| Type | CONTENT / CONVERSION |
| Severity | **FUTURE** |
| Evidence | No refund/guarantee/authenticity explicit Q |
| Recommendation | Content owner if policy exists |
| Implementation | **NOT AUTHORIZED** |

### B2.5-F10 — Desktop observation

| Field | Value |
|---|---|
| Type | OBSERVATION |
| Severity | **DEFERRED** |
| Viewport | 1280 · max-w 768 stack |
| Recommendation | Desktop Phase only |

### B2.5-F11 — Product FAQ cannot fully collapse

| Field | Value |
|---|---|
| Type | FUNCTIONAL (Product surface) |
| Severity | **OBSERVATION** (out of Landing S9 scope) |
| Evidence | Product toggle sets open index only (no null collapse) |
| Recommendation | If Product becomes authority, fix there under Product scope — not Landing S9 |
| Implementation | **NOT AUTHORIZED** (wrong surface) |

---

## 14. Recommended limited implementation scope (NOT AUTHORIZED)

| Priority | Item | Finding |
|---|---|---|
| P0/P1 | CTA `href` → `LINE_OA_URL` | F01 |
| P1 | Analytics dual-track triage | F02 |
| P1 | Optional answer-panel density (shield) if SA wants authority lean | F03 |
| P2 | Support title weight | F04 |
| — | Content/legal claims | F08–F09 FUTURE |
| — | FAQ Authority ADR (docs only) | Authority decision |

**Out of scope:** redesign accordion to Product copy wholesale; remove CTAs; edit S8/S10; shared component extraction without impact analysis.

---

## 15. Risk assessment

| Risk | Level | Mitigation |
|---|---|---|
| Treating absolute safety claims as UX-only | Medium | Defer to content/legal |
| Shared CTA destination table edits | Medium | Prefer local LINE_OA_URL like S8 |
| Scope creep into Product FAQ | High | Keep Product work separate |
| Double analytics | Medium | SA + analytics owner |

---

## 16. Final audit decision

```text
PHASE_B2_5_AUDIT: COMPLETE
FAQ_AUTHORITY: PRODUCT_DETAIL
SECTION_9_IMPLEMENTATION: NOT_AUTHORIZED
SECTION_9_STATUS: AUDITED_PENDING_SA_TRIAGE
SECTION_4: UNCHANGED
SECTION_5: UNCHANGED
SECTION_6: UNCHANGED
SECTION_7: UNCHANGED
SECTION_8: UNCHANGED
SECTION_10: UNCHANGED
CTA: UNCHANGED
ANALYTICS: UNCHANGED
APP_SOURCE_CHANGED_DURING_B2_5: NO
NEXT_GATE: SA_TRIAGE
```

**Owner / SA must review**

1. Accept **Product Detail FAQ** as FAQ Design Authority (accordion language).  
2. Authorize F01 href fix + F02 analytics policy.  
3. Decide whether F03 shield density enters limited implementation.  
4. Route F08 safety claim to content/legal, not mobile polish.  
5. Confirm no shared accordion package this phase.

**Recommended path**

SA triage → lock B2.5 implementation scope → implement Section 9 only → verify → freeze Section 9 → then Section 10.
