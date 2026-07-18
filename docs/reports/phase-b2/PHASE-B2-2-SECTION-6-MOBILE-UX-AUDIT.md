# Phase B2.2 — Section 6 Mobile UX Audit

**Document type:** Read-only UX / conversion / IA audit  
**Date:** 2026-07-18  
**Authority:** Mobile primary 390px · boundary 375 / 430 · desktop 1280 observation only  
**Source baseline:** `main` @ `e971ecb` (post Section 5 freeze)  
**Runtime evidence:** Local production build of main + visual screenshots  
**Branch:** `phase-b2-2/section-6-mobile-audit`  
**Scope:** Section 6 only  
**Implementation:** **NOT AUTHORIZED** by this document  

---

## 1. Executive summary

Section 6 (“สั่งซื้อ ง่าย ผ่าน LINE”) is a **how-to-order instructional timeline** that successfully communicates a complete LINE-first purchase path in roughly five seconds. The six-step sequence is **logical and scannable**, with a clear solid final CTA.

Primary risks are **length/density** (six steps + promo + trust ≈ **1045px**), **body type at 11px**, and **trust-message duplication** with Sections 5/7/10 (especially steps 5–6, promo, trust row).

| Severity | Count |
|---|---:|
| BLOCKER | **0** |
| MUST_FIX | **1** |
| SHOULD_POLISH | **5** |
| ACCEPT | **3** |
| FUTURE | **1** |
| DEFERRED | **1** |

**Strongest findings**

1. **B2.2-F01** — Step body text 11px / white/68 readability (MUST_FIX).  
2. **B2.2-F02** — Six-step + promo length delays Section 7; post-order steps overlap S7 (SHOULD_POLISH / conversion).  
3. **B2.2-F03** — Promo + trust row restate safety/privacy already covered in S5/S7 (CONTENT).  

```text
PHASE_B2_2_AUDIT: COMPLETE
SECTION_6_IMPLEMENTATION: NOT_AUTHORIZED
SECTION_6_STATUS: AUDITED_PENDING_SA_TRIAGE
NEXT_GATE: SA_TRIAGE
```

---

## 2. Repository baseline

| Item | Value |
|---|---|
| MAIN_HEAD | `e971ecb` |
| Section 4 | **FROZEN** |
| Section 5 | **FROZEN** (this closeout) |
| Section 6 app source | **READ-ONLY** this phase |
| Dependencies | **UNCHANGED** |
| Production / Ads | **NOT AUTHORIZED / NO-GO** |

---

## 3. Purpose review

| Question | Assessment |
|---|---|
| Business role | **How to order via LINE** — instructional conversion bridge |
| 5-second comprehension | **Yes** — heading + numbered steps 1→6 |
| Completeness | Tap LINE → chat → select → pay → ship private → receive |
| Purchase confidence | **Yes** — process transparency; payment options named in step 4 |
| Risk | Length + trust restatement may slow users who already understand LINE chat |

**Verdict:** Purpose is clear and correctly placed after “why us” and before privacy deep-dive.

---

## 4. Timeline review

| Step | Title | Role |
|---:|---|---|
| 1 | กดปุ่ม “ปรึกษาผ่าน LINE” | Entry action |
| 2 | แชทกับทีมงานของเรา | Human assist |
| 3 | เลือกสินค้าและจำนวน | Cart/order compose |
| 4 | ยืนยันการสั่งซื้อ | Payment confirm |
| 5 | จัดส่งแบบปกปิด | Fulfillment privacy |
| 6 | รับสินค้าอย่างมั่นใจ | Delivery close |

| Question | Assessment |
|---|---|
| Too many steps? | **Possibly** — 6 is on the high side for mobile; 1–4 are core order, 5–6 are post-order reassurance |
| Repetitive? | Steps 1–2 both “start LINE conversation”; 5 overlaps Section 7 packaging story |
| Logical? | **Yes** — chronological and correct |
| Improves understanding? | **Yes** — connector line + numbers create strong process mental model |

**Recommendation for SA (not implemented):** Consider merging 1+2 and/or shortening 5–6 into one “หลังยืนยัน” step **only if** scope-locked; do not remove instructional value.

---

## 5. Content review

### Clarity
- Titles are short and action-oriented.  
- Descriptions are one line each — good for scan, weak for detail.

### Redundancy vs other sections

| Theme | S6 location | Also in |
|---|---|---|
| ปลอดภัย / ส่งไว | Subtitle | S4 trust, S5, S7, S10 |
| จัดส่งปกปิด | Step 5 + trust | S2, S4, S5, S7 |
| ข้อมูลลับ | Trust row | S2, S5, S7, S8… |
| ปรึกษา/สั่ง LINE | Step 1 + final CTA | Nearly every section |
| Promo safety/privacy | Promo card | S5 (prior), S7 (next) |

### Unique value of S6
- **Process steps 1–4** (especially payment options in step 4) are the differentiated content.  
- Steps 5–6 and promo mainly reinforce claims that Section 7 will expand.

**Do not rewrite in this audit.**

---

## 6. Typography

| Element | Size (390) | Notes | Verdict |
|---|---|---|---|
| Heading | 26px extrabold | “ผ่าน LINE” accent pink | PASS |
| Subtitle | 14px white/65 | Trust-ish, not pure how-to | ACCEPT / polish |
| Step title | 15px extrabold | Clear | PASS |
| Step body | **11px** white/68 · lh 1.45 | Harder on 375 | **MUST_FIX** |
| CTA label | 17px bold | Strong | PASS |
| Trust micro | 11px white/62 | Weak residual | ACCEPT |

No clipping observed. Long titles wrap cleanly (step 1 quotes).

---

## 7. Card layout / density

| Metric @390 | Value |
|---|---|
| Steps | 6 |
| Card height | **96px** (min-h floor; uniform rhythm) |
| Number circle | 54px · 22px type |
| In-card icon box | 54px |
| Gap | `space-y-2.5` |
| Section height | **~1045px** |

**Strengths:** Excellent vertical rhythm; equal card heights; timeline connector readable.  
**Issues:** Number + icon + title + body is **double iconography** (dense but premium). Section tall for an intermediate instructional block.

---

## 8. CTA review

| Check | Result |
|---|---|
| Label | ปรึกษาหรือสั่งซื้อผ่าน LINE |
| Height | **56px** (≥44) |
| Treatment | Solid `#E91E8C` |
| Destination | `https://lin.ee/syjmYE2` |
| Surface | `how-to-order-line` via `activateLineCta` |
| Hierarchy | Stronger than step cards (non-interactive) |
| Role | Primary conversion after instruction |
| Repetition | Expected LINE-first pattern; matches journey |
| content.href | `#` unused — runtime uses `LINE_OA_URL` |

**Do not modify CTA in this phase.** CTA quality is a strength.

---

## 9. Accessibility

| Check | Result |
|---|---|
| Section aria-label | Present |
| List semantics | `<ol>` for steps — **good** |
| Heading | `h2` + step `h3` |
| CTA | Native `<a>` + aria-label + focus-visible |
| Touch targets | CTA 56px PASS; steps not interactive |
| False affordance | **None** on steps (no chevrons) |
| Contrast | Body 11px/68 borderline for readability |
| Icons | Decorative `aria-hidden` |

---

## 10. Transition review

### Section 5 → 6
| Factor | Assessment |
|---|---|
| Narrative | Why us → how to order — **correct funnel** |
| Spacing | Continuous dark stack (gap ≈ 0) |
| Density | Benefit list → numbered process — natural shift |
| CTA continuity | S5 consult CTA → S6 process → S6 order CTA |

### Section 6 → 7
| Factor | Assessment |
|---|---|
| Narrative | How to order → privacy/shipping deep-dive |
| Overlap risk | Step 5 / promo / trust **preview** claims S7 will detail |
| Visual | Continuous; S7 badge “SECTION 7” visible after S6 end |

**Verdict:** Transitions are structurally sound; content continuity is slightly too continuous on privacy themes.

---

## 11. Browser evidence

**Evidence dir:** `screenshot/Mobile-screenshot/phase-b2-2-section6/`  
**Metrics:** `s6-audit-metrics.json`  
**Runtime:** Local `next start` of `main` @ `e971ecb`

| Viewport | Section H | Steps | Body | Card H | CTA H | Overflow |
|---|---:|---:|---|---:|---:|---|
| 375 | 1045 | 6 | 11px | 96 | 56 | no |
| 390 | 1045 | 6 | 11px | 96 | 56 | no |
| 430 | 1045 | 6 | 11px | 96 | 56 | no |
| 1280 | 811 | 6 | 11px | 128 | 56 (w 1200) | no |

| Screenshot | File |
|---|---|
| Full @390 | `s6-full-390.png` / `01-section6-full-390.png` |
| Timeline close-up | `s6-timeline-390.png` / `02-…` |
| CTA close-up | `s6-cta-390.png` / `03-…` |
| S5→S6 | `s5-to-s6-390.png` / `04a-…` |
| S6→S7 | `s6-to-s7-390.png` / `04b-…` |
| Desktop 1280 | `s6-desktop-1280.png` / `05-…` |

---

## 12. Findings register

### B2.2-F01 — Step body type too small (11px)

| Field | Value |
|---|---|
| Type | VISUAL_DEFECT / ACCESSIBILITY |
| Severity | **MUST_FIX** |
| Viewport | 375 critical; 390/430 |
| Evidence | Measured bodyFs **11px**, color white/68, leading 1.45 |
| Impact | Harder to read payment/fulfillment details under time pressure |
| Recommended action | Raise to ~12–12.5px and slightly improve leading/opacity (S6-local), same pattern as B2.1-F04 |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.2-F02 — Six-step length + post-order density

| Field | Value |
|---|---|
| Type | UX_DEFECT / CONVERSION |
| Severity | **SHOULD_POLISH** |
| Viewport | Mobile (~1045px section) |
| Evidence | 6 equal 96px cards + promo + CTA + trust |
| Impact | Extra scroll before privacy section and next LINE opportunities |
| Recommended action | SA options: (a) merge steps 1–2; (b) merge 5–6; (c) keep 6 but compress spacing/promo only |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.2-F03 — Promo + trust restate safety/privacy

| Field | Value |
|---|---|
| Type | CONTENT_DEFECT |
| Severity | **SHOULD_POLISH** |
| Viewport | All |
| Evidence | Promo “มั่นใจในความปลอดภัยและความเป็นส่วนตัว”; trust row identical pattern to S5 |
| Impact | Fatigue immediately before/after process; weakens unique how-to role |
| Recommended action | Reframe promo to order-process benefit (e.g. chat-assisted, easy confirm) **or** shorten; leave deep privacy to S7 |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.2-F04 — Steps 5–6 overlap Section 7 narrative

| Field | Value |
|---|---|
| Type | CONTENT_DEFECT / CONVERSION |
| Severity | **SHOULD_POLISH** |
| Viewport | All (content) |
| Evidence | Step 5 จัดส่งแบบปกปิด; Step 6 ปลอดภัย; S7 full privacy-shipping section follows |
| Impact | Users hear packaging privacy twice in a row |
| Recommended action | Keep one lightweight fulfillment mention; defer detail to S7 **or** accept as intentional preview |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.2-F05 — Dual iconography (number + icon box)

| Field | Value |
|---|---|
| Type | UX_DEFECT / OBSERVATION |
| Severity | **ACCEPT** (or FUTURE if density pass) |
| Viewport | Mobile |
| Evidence | 54px number circle + 54px icon tile per row |
| Impact | Premium but heavy horizontal load on 375 |
| Recommended action | Optional: reduce icon tile size or rely on numbers only if density locked |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.2-F06 — Subtitle is trust claim, not process claim

| Field | Value |
|---|---|
| Type | CONTENT_DEFECT |
| Severity | **SHOULD_POLISH** |
| Viewport | All |
| Evidence | “ไม่ยุ่งยาก ส่งไว ปลอดภัย 100%” |
| Impact | Sets expectation as trust block rather than how-to |
| Recommended action | Prefer process-oriented subtitle (e.g. ทำตาม 6 ขั้นตอนง่าย ๆ) without new claims |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.2-F07 — Step 1 vs 2 icon similarity

| Field | Value |
|---|---|
| Type | VISUAL_DEFECT |
| Severity | **SHOULD_POLISH** |
| Viewport | All |
| Evidence | MessageCircleMore vs MessageSquareMore — both chat bubbles |
| Impact | Low differentiation between start and chat steps |
| Recommended action | Distinct icons (e.g. pointer/hand for step 1, chat for step 2) — local map only |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.2-F08 — content `finalCta.href` is `#`

| Field | Value |
|---|---|
| Type | OBSERVATION |
| Severity | **ACCEPT** |
| Evidence | Content field unused; runtime `LINE_OA_URL` |
| Impact | None at runtime; editor drift risk |
| Recommended action | Align documentation/field later |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.2-F09 — Desktop CTA full content width

| Field | Value |
|---|---|
| Type | OBSERVATION |
| Severity | **DEFERRED** |
| Viewport | 1280 · CTA width 1200 |
| Recommended action | Desktop Phase |
| Implementation | **NOT AUTHORIZED** |

### B2.2-F10 — Non-blocking 404 resource noise @375

| Field | Value |
|---|---|
| Type | FUNCTIONAL / OBSERVATION |
| Severity | **FUTURE** / environment |
| Evidence | Console 404 once @375 local (same class as prior beta noise) |
| Impact | Not section-layout breaking |
| Recommended action | Track separately if asset path identified |
| Implementation | **NOT AUTHORIZED** |

---

## 13. Accepted strengths

- Clear how-to purpose within 5 seconds.  
- Chronological 6-step model with visible connector.  
- Semantic `<ol>` structure.  
- Uniform card rhythm (96px mobile).  
- Strong solid LINE CTA (56px) with correct OA URL and analytics surface.  
- No false chevrons / false affordance on steps.  
- No horizontal overflow 375–1280.  
- Desktop 3-column grid remains stable.  
- Funnel placement S5 → S6 → S7 is correct.

---

## 14. Shared surface risks

| Shared piece | Used in S6 | Also used | Risk |
|---|---|---|---|
| `SectionHeader` / `SectionBadge` | Header | S4, S7, S8, S9… | SHARED_SURFACE_RISK — do not restyle globally |
| `IconWrapper` / `LineIcon` | Final CTA | Most LINE CTAs | CTA chrome regression |
| `activateLineCta` / `LINE_OA_URL` | Final CTA | Global commerce | Analytics + destination contracts |
| Lucide icons | Step icons | Many sections | Prefer S6-local map edits only |
| Timeline pattern | S6-local | Not a shared package today | Prefer keep local |

**Do not change shared components without impact analysis.**

---

## 15. Recommended limited implementation scope (NOT AUTHORIZED)

Candidate **locked scope for SA approval only**:

| Priority | Item | Finding |
|---|---|---|
| P0 | Body type readability bump (S6-local) | F01 |
| P1 | Promo / subtitle reframe away from pure privacy mantra | F03, F06 |
| P1 | Optional step compression (1+2 and/or 5+6) **only if SA locks** | F02, F04 |
| P2 | Differentiate step 1 vs 2 icons | F07 |
| P2 | Mild spacing tighten if steps kept at 6 | F02, F05 |
| P3 | Content href field hygiene | F08 |
| — | Desktop CTA width | F09 DEFERRED |

**Explicitly out of scope unless separate authority**

- Redesign of timeline system  
- Removal of final LINE CTA  
- Changes to Header/Drawer/Footer  
- Shared `SectionHeader` defaults  
- Section 5 / Section 7 edits  
- Production / Ads  

---

## 16. Risk assessment

| Risk | Level | Mitigation |
|---|---|---|
| Scope creep into step deletion redesign | High | SA must lock step count |
| Content changes inventing new claims | Medium | Shorten/reframe only; no new marketing |
| Shared header/CTA edits | Medium | Local classes only |
| Implementing before SA | High | Hard stop |

---

## 17. Final audit decision

```text
PHASE_B2_2_AUDIT: COMPLETE
SECTION_6_IMPLEMENTATION: NOT_AUTHORIZED
SECTION_6_STATUS: AUDITED_PENDING_SA_TRIAGE
SECTION_5: FROZEN (unchanged by this audit)
SECTION_4: FROZEN (unchanged)
CTA: UNCHANGED
ANALYTICS: UNCHANGED
APP_SOURCE_CHANGED_DURING_B2_2: NO
NEXT_GATE: SA_TRIAGE
```

**Owner / SA must review**

1. B2.2-F01 MUST_FIX body type — approve.  
2. Whether 6 steps stay or compress (F02/F04).  
3. Promo/subtitle/trust duplication posture (F03/F06).  
4. Icon differentiation F07 — polish yes/no.  
5. Confirm no shared-component edits in any future B2.2 implementation.

**Recommended path after triage**

SA triage → lock B2.2 implementation scope → implement Section 6 only → verify → freeze Section 6 → then open next section.
