# Phase B2.1 — Section 5 Mobile UX Audit

**Document type:** Read-only UX / conversion audit  
**Date:** 2026-07-18  
**Authority:** Mobile primary 390px · boundary 375 / 430 · desktop 1280 observation only  
**Source baseline:** `main` @ `5bd7429` (post Section 4 freeze)  
**Runtime evidence:** https://beta.zenovell.com (Section 5 source untouched by PR #4)  
**Branch:** `phase-b2-1/section-5-mobile-audit`  
**Scope:** Section 5 only  
**Implementation:** **NOT AUTHORIZED** by this document  

---

## 1. Executive summary

Section 5 (“ทำไมต้องเลือกเรา?”) is a **trust / differentiation / reassurance** block placed after the product catalog and before the ordering flow. Visually it is **premium and stable** (no overflow, solid LINE CTA 58px, correct LINE OA). Its primary risks are **message duplication** with Sections 2/4/6/7 and **false interactivity cues** (chevrons on non-clickable benefit rows).

| Severity | Count |
|---|---:|
| BLOCKER | **0** |
| MUST_FIX | **1** |
| SHOULD_POLISH | **5** |
| ACCEPT | **3** |
| FUTURE | **1** |
| DEFERRED | **1** |

**Strongest findings**

1. **B2.1-F01** — Benefit cards show chevrons but are not interactive (MUST_FIX).  
2. **B2.1-F02** — High content overlap with S2 trust, S4 trust strip, S6/S7 privacy-shipping claims (SHOULD_POLISH / conversion).  
3. **B2.1-F03** — `sparkles` benefit renders `LineChart` instead of Sparkles (SHOULD_POLISH).  

```text
PHASE_B2_1_AUDIT: COMPLETE
SECTION_5_IMPLEMENTATION: NOT_AUTHORIZED
SECTION_5_STATUS: AUDITED_PENDING_SA_TRIAGE
NEXT_GATE: SA_TRIAGE
```

---

## 2. Repository baseline

| Item | Value |
|---|---|
| MAIN_HEAD | `5bd7429` |
| Section 4 | **FROZEN** (see `docs/reports/phase-b1/SECTION-4-MOBILE-FREEZE-RECORD.md`) |
| Section 5 app source | **READ-ONLY** this phase |
| Dependencies | **UNCHANGED** |
| Production / Ads | **NOT AUTHORIZED / NO-GO** |

---

## 3. Section 5 purpose

| Question | Assessment |
|---|---|
| Business role | **Trust + differentiation + reassurance** after product selection |
| User question answered | “Why should I buy from ZENOVELL rather than elsewhere?” |
| 3–5 second comprehension | **Yes** — heading “ทำไมต้องเลือกเรา?” is immediate |
| Purchase confidence | **Partial** — claims are clear but largely restated from earlier sections |
| Conversion journey | Soft LINE consult CTA; should **bridge** catalog → order steps, not re-sell the same trust stack |

---

## 4. Source architecture

| Layer | Path | Notes |
|---|---|---|
| Component | `sections/section-5-why-choose-us/section-5-why-choose-us.tsx` | Client component |
| Content authority | `content/section-5-why-choose-us.ts` | Benefits ×5, promo, finalCta, trustRow |
| Shared UI | `SectionBadge`, `IconWrapper`, `LineIcon` | Shared across many sections |
| CTA | `activateLineCta` surface `why-choose-us-line` | Uses `LINE_OA_URL` |
| Icons | `lucide-react` map + **special-case** `LineChart` when `iconName === "sparkles"` | See F03 |
| Assets | `/images/section-5/bg-why-choose-us-section5.jpeg` | Promo background |
| Adjacent | S4 catalog → S5 → S6 how-to-order | DOM ids present |

### Structure (render order)

1. `SectionBadge` (“SECTION 5”)  
2. `h2` heading + subtitle  
3. Benefit list (5 cards: icon 72px · title · body · ChevronRight)  
4. Promo image card  
5. Final solid LINE CTA (`h-[58px]`)  
6. Compact trust row (3 items)

### SHARED_SURFACE_RISK

| Shared piece | Also used in | Risk if edited without impact analysis |
|---|---|---|
| `SectionBadge` | S3, S5, S10, S11, … | Visual regression across frozen/unfrozen sections |
| `IconWrapper` / `LineIcon` | Most LINE CTAs | CTA chrome regression |
| `activateLineCta` / `LINE_OA_URL` | Global commerce | Analytics + destination contracts |
| Lucide icon names | Multiple sections | Icon semantics only if map shared (S5-local map today) |

**Do not change shared components without impact analysis. Prefer Section 5-local classes/content.**

---

## 5. Browser evidence

**Evidence dir:** `screenshot/Mobile-screenshot/phase-b2-1-section5/`  
**Metrics:** `s5-audit-metrics.json`

| Viewport | Section H | Heading | Body (cards) | Cards | CTA H | Overflow | Faux chevrons |
|---|---:|---|---|---:|---:|---|---:|
| 375 | 1069 | 26px | 11px | 5 | 58 | no | 5 |
| 390 | 1063 | 28px | 11.5px | 5 | 58 | no | 5 |
| 430 | 1053 | 28px | 11.5px | 5 | 58 | no | 5 |
| 1280 | 845 | 34px | 11.5px | 5 | 58 (width 1200) | no | 5 |

| Check | Result |
|---|---|
| LINE href on S5 CTA | `https://lin.ee/syjmYE2` |
| CTA label | ปรึกษาผู้เชี่ยวชาญผ่าน LINE |
| aria-label | present |
| S4 / S6 adjacency | present; offset gaps ≈ 0–1px (continuous stack) |
| Critical console (S5-specific) | none observed in audit pass |

Screenshots: `s5-375.png`, `s5-390.png`, `s5-390-fullsection.png`, `s5-430.png`, `s5-1280.png`, `s4-to-s5-390.png`, `s5-to-s6-390.png`.

---

## 6. Visual hierarchy assessment

**Strengths**

- Clear badge → heading → subtitle → list → promo → CTA → micro-trust sequence.  
- Benefit titles (15–16px extrabold) dominate card body.  
- Final CTA is the only true interactive conversion surface in-section — solid pink, strong glow.

**Issues**

- Chevron affordance implies drill-down that does not exist (F01).  
- 72px icon circles are large relative to 11–11.5px body; premium but heavy (F08).  
- Promo restates “คุณภาพ / มาตรฐาน / ความเป็นส่วนตัว” already covered by cards (F02/F09).

**Scan path on mobile:** Heading OK → five near-equal cards require full vertical scan → promo → CTA. No progressive disclosure.

---

## 7. Typography assessment

| Element | Size (390) | Color / weight | Verdict |
|---|---|---|---|
| Heading | 28px extrabold | white | PASS |
| Subtitle | 14px | white/65 | PASS |
| Card title | 16px extrabold | white | PASS |
| Card body | **11.5px** | white/68 | **Borderline** — dense Thai lines (F04) |
| Trust row | 11px | white/62 | Weak micro (F06) |
| CTA label | 16–17px bold | white on `#E91E8C` | PASS |

No clipping observed. Wrapping on long titles (“เห็นผลจริง จากประสบการณ์ผู้ใช้”) is acceptable but adds card height variance (~106–116px).

---

## 8. Card-density assessment

| Metric (390) | Value |
|---|---|
| Benefit cards | 5 |
| Card height | ~106–116px |
| Icon outer | 72px |
| Gap between cards | `space-y-3` (12px) |
| Section total height | **~1063px** |

**Verdict:** Density is **moderate-to-high for an intermediate trust section** after a long catalog. Five full rows + promo + CTA create scroll length that may delay Section 6 (ordering). Not a layout defect; conversion pacing concern (F05).

---

## 9. Content duplication assessment

Repeated themes vs other sections (content sources compared; no rewrites performed):

| Theme | S5 | Also in |
|---|---|---|
| ปลอดภัย / มาตรฐาน | Benefit 1 + trust “ปลอดภัย 100%” | S2, S3 features, S4 trust, S6 subtitle, S7, S8/S9/S10 trust |
| ข้อมูลลับ / เป็นส่วนตัว | Benefit 3 + trust | S2, S4, S6, S7 |
| จัดส่งรวดเร็ว / ปกปิด | Benefit 4 | S2 packages, S4 trust, S6, S7 |
| ปรึกษาฟรี / ผู้เชี่ยวชาญ | Benefit 5 + final CTA | S2 CTA, S3, S4 trust/final, S6–S10 |
| คุณภาพ / มาตรฐาน promo | Promo title/highlight | S2 trust statement |

**Unique-ish value in S5:** “เห็นผลจริง จากประสบการณ์ผู้ใช้” (social-proof bridge) is the clearest **non-duplicated** benefit frame — ironically paired with wrong icon (F03).

**Do not rewrite copy in B2.1.** SA must decide reduction vs accept repetition as brand mantra.

---

## 10. Touch-target assessment

| Surface | Height | Interactive? | Verdict |
|---|---:|---|---|
| Final LINE CTA | **58** | Yes | PASS ≥44 |
| Benefit cards | ~106–116 | **No** | Faux affordance (F01) |
| Promo card | 154 | No | OK if no chevron (no chevron on promo) |
| Trust row | micro | No | OK |

No sub-44 interactive control inside Section 5.

---

## 11. Accessibility baseline

| Check | Result |
|---|---|
| Section `aria-label` | Present (“ทำไมต้องเลือกเรา”) |
| Heading level | `h2` + card `h3` — reasonable |
| CTA `aria-label` | Present |
| Icon meaning | Decorative `aria-hidden` — OK; meaning relies on text |
| Focus | CTA is native `<a>` — focus-visible outline classes present |
| Contrast | Body white/68 on `#0A0A0A` likely OK numerically but small type hurts readability |
| Faux controls | **Issue** — chevrons suggest buttons/links without roles (F01) |
| Screen reader | Benefit list is static text — acceptable if chevrons removed or cards made real links |

---

## 12. Conversion role

| Question | Assessment |
|---|---|
| Increases confidence? | **Yes, incrementally** — but much is already said |
| Interrupts product exploration? | Mild — user just left catalog |
| Repeats prior claims? | **Yes — high** |
| Delays ordering section? | **Yes — ~1060px** before S6 |
| Recommended posture | Keep section; **tighten density / remove faux chrome / reduce duplicate claims** only if SA locks scope |

**Not recommended in this phase:** full redesign, removal of LINE CTA, shared CTA system changes.

---

## 13. Section 4 → 5 transition

| Factor | Assessment |
|---|---|
| Spacing | Continuous stack (offset gap ≈ 0) |
| Background | Both dark `#0A0A0A` family — seamless |
| Density change | Catalog grid → single-column benefit list — natural pause |
| Continuity | Trust strip at end of S4 echoes S5 themes (duplication starts immediately) |

**Verdict:** Transition is **visually natural**; content continuity is **too continuous** (same claims).

---

## 14. Section 5 → 6 transition

| Factor | Assessment |
|---|---|
| Spacing | Continuous |
| Heading rhythm | S5 “why us” → S6 “how to order via LINE” — correct funnel logic |
| Conversion | S5 CTA (consult) → S6 instructional + CTA — roles distinguishable |
| Visual pause | Promo + CTA provide soft close before steps |

**Verdict:** Funnel order is correct. S5 should not grow; prefer shortening before opening S6 work.

---

## 15. Findings register

### B2.1-F01 — Non-interactive benefit rows with chevron affordance

| Field | Value |
|---|---|
| Type | UX_DEFECT / ACCESSIBILITY_ISSUE |
| Severity | **MUST_FIX** |
| Viewport | 375 / 390 / 430 / 1280 |
| Evidence | All 5 cards render `ChevronRight`; `fauxClickableCards: 5`; no wrapping `<a>`/`<button>` |
| User impact | Users tap expecting detail/expand; nothing happens → trust friction |
| Business impact | Undermines premium precision; wasted taps before LINE CTA |
| Recommended action | Remove chevrons **or** make rows intentional links (only if product/FAQ targets exist and are authorized) |
| Proposed scope | Section 5 component local only |
| Protected contracts | Do not change `activateLineCta` surfaces; do not invent routes without authority |
| Implementation authorized | **NO — PENDING SA TRIAGE** |

### B2.1-F02 — Trust message duplication across journey

| Field | Value |
|---|---|
| Type | CONTENT_DEFECT / CONVERSION_ISSUE |
| Severity | **SHOULD_POLISH** |
| Viewport | All (content) |
| Evidence | S5 benefits/trust vs S2, S4 trust strip, S6, S7 content strings (ปลอดภัย, ปกปิด, ปรึกษา, ส่วนตัว) |
| User impact | Fatigue; “already told me” after catalog |
| Business impact | Weakens differentiation; delays order section without new info |
| Recommended action | SA content triage: keep 2–3 unique proofs; demote rest to shorter strip **or** accept brand mantra |
| Proposed scope | Content-only in `content/section-5-why-choose-us.ts` (if authorized later) |
| Protected contracts | Do not rewrite other frozen sections to “fix” S5 |
| Implementation authorized | **NO — PENDING SA TRIAGE** |

### B2.1-F03 — Sparkles benefit uses LineChart icon

| Field | Value |
|---|---|
| Type | VISUAL_DEFECT |
| Severity | **SHOULD_POLISH** |
| Viewport | All |
| Evidence | Source: `iconName === "sparkles"` renders `<LineChart />` not `Sparkles`; screenshot shows chart glyph on “เห็นผลจริง…” |
| User impact | Semantic mismatch (analytics chart ≠ proven results) |
| Business impact | Small credibility nick on the most unique benefit |
| Recommended action | Render `Sparkles` (or a dedicated results icon) for that item |
| Proposed scope | S5 component local map only |
| Protected contracts | None beyond visual |
| Implementation authorized | **NO — PENDING SA TRIAGE** |

### B2.1-F04 — Card body type 11–11.5px at white/68

| Field | Value |
|---|---|
| Type | VISUAL_DEFECT / ACCESSIBILITY_ISSUE |
| Severity | **SHOULD_POLISH** |
| Viewport | 375 critical; 390/430 |
| Evidence | Measured bodyFs 11px @375, 11.5px @390; color white/68 |
| User impact | Harder reading of multi-line Thai claims |
| Business impact | Reduced claim comprehension |
| Recommended action | Bump body toward 12–13px and/or raise opacity slightly; keep title hierarchy |
| Proposed scope | S5 local classes |
| Protected contracts | No global type token changes without impact analysis |
| Implementation authorized | **NO — PENDING SA TRIAGE** |

### B2.1-F05 — Section length delays ordering flow

| Field | Value |
|---|---|
| Type | CONVERSION_ISSUE |
| Severity | **SHOULD_POLISH** |
| Viewport | 390 primary (~1063px section height) |
| Evidence | Metrics sectionH ≈ 1053–1069 mobile |
| User impact | Extra scroll between products and how-to-order |
| Business impact | Longer path to LINE order instruction |
| Recommended action | After F01/F02: compact cards, shorter copy, or collapse promo if redundant |
| Proposed scope | S5 only; no S6 changes |
| Protected contracts | Keep final LINE CTA unless SA removes |
| Implementation authorized | **NO — PENDING SA TRIAGE** |

### B2.1-F06 — Compact trust row low emphasis

| Field | Value |
|---|---|
| Type | VISUAL_DEFECT |
| Severity | **ACCEPT** |
| Viewport | Mobile |
| Evidence | 11px white/62; duplicates card themes |
| User impact | Low; decorative close |
| Business impact | Minimal |
| Recommended action | Leave unless F02 shortens cards and trust row becomes primary residual claims |
| Proposed scope | Optional polish |
| Protected contracts | Claims text unchanged without content review |
| Implementation authorized | **NO — PENDING SA TRIAGE** |

### B2.1-F07 — Content `finalCta.href` is `#` while runtime uses `LINE_OA_URL`

| Field | Value |
|---|---|
| Type | OBSERVATION |
| Severity | **ACCEPT** |
| Viewport | n/a (source) |
| Evidence | `content/section-5-why-choose-us.ts` href `"#"`; component binds `href={LINE_OA_URL}` |
| User impact | None at runtime |
| Business impact | Content authority drift risk for future editors |
| Recommended action | Align content field with `LINE_OA_URL` or document field as unused |
| Proposed scope | Content comment / field sync only |
| Protected contracts | Must remain `https://lin.ee/syjmYE2` at runtime |
| Implementation authorized | **NO — PENDING SA TRIAGE** |

### B2.1-F08 — Large icon vs text balance

| Field | Value |
|---|---|
| Type | UX_DEFECT / ENHANCEMENT |
| Severity | **ACCEPT** (or FUTURE if density pass) |
| Viewport | Mobile |
| Evidence | Icon outer 72px vs body 11.5px |
| User impact | Premium but heavy rows |
| Business impact | Contributes to F05 height |
| Recommended action | Optional icon 56–64px if density locked |
| Proposed scope | S5 local |
| Protected contracts | Do not change shared IconWrapper defaults for all sections |
| Implementation authorized | **NO — PENDING SA TRIAGE** |

### B2.1-F09 — Promo card restates quality/privacy

| Field | Value |
|---|---|
| Type | CONTENT_DEFECT |
| Severity | **SHOULD_POLISH** |
| Viewport | All |
| Evidence | Promo “เราใส่ใจในคุณภาพ / มาตรฐาน และความเป็นส่วนตัว” after five trust cards |
| User impact | Another restatement before CTA |
| Business impact | Scroll without new info |
| Recommended action | SA: repurpose promo to unique proof (lab, users, guarantee) **or** remove/shorten |
| Proposed scope | Content + optional layout |
| Protected contracts | Asset path may stay; no brand rewrite without owner |
| Implementation authorized | **NO — PENDING SA TRIAGE** |

### B2.1-F10 — Desktop final CTA full content width (1200)

| Field | Value |
|---|---|
| Type | OBSERVATION |
| Severity | **DEFERRED** (Desktop Phase) |
| Viewport | 1280 |
| Evidence | CTA width measured 1200 |
| User impact | Desktop only |
| Business impact | Low for mobile program |
| Recommended action | Desktop adaptive later; do not block mobile B2.1 |
| Proposed scope | Desktop phase |
| Protected contracts | n/a |
| Implementation authorized | **NO — PENDING SA TRIAGE** |

---

## 16. Accepted strengths

- Clear purpose heading within 3 seconds.  
- Premium dark + magenta system consistent with brand.  
- Single primary LINE CTA with strong solid treatment and 58px height.  
- Correct LINE destination and `activateLineCta` surface naming.  
- Stable layout: no overflow, no critical runtime errors in audit.  
- Logical funnel position between catalog and how-to-order.  
- Heading structure (`h2`/`h3`) sensible.  
- Desktop remains stable (no mobile-only breakage observed).

---

## 17. Protected contracts (must hold if implementation later authorized)

| Contract | Rule |
|---|---|
| LINE URL | `https://lin.ee/syjmYE2` only via `LINE_OA_URL` |
| Analytics | Do not change schema / GTM; keep meaningful surface id |
| Header / Drawer / Footer | Untouched |
| Section 4 | **FROZEN** — no drive-by edits |
| Section 6+ | Out of scope until S5 frozen |
| Dependencies | No package adds |
| Shared components | No change without impact analysis |

---

## 18. Proposed limited implementation scope (NOT AUTHORIZED)

Candidate **locked scope for SA approval only**:

| Priority | Item | Finding |
|---|---|---|
| P0 | Remove faux chevrons (or authorize real targets) | F01 |
| P1 | Fix sparkles → correct icon | F03 |
| P1 | Optional body type readability bump (S5-local) | F04 |
| P2 | Content duplication triage (shorten / unique proofs) | F02, F09 |
| P2 | Density / length reduction if content shortened | F05, F08 |
| P3 | Align content href field documentation | F07 |
| — | Desktop CTA width | F10 DEFERRED |

**Explicitly out of scope unless separate authority**

- Redesign of Section 5 visual system  
- Removal of final LINE CTA  
- Changes to Header/Drawer/Footer  
- Shared `SectionBadge` / global CTA chrome  
- Opening Section 6 implementation  
- Production / Ads  

---

## 19. Deferred items

| Item | Status |
|---|---|
| Desktop CTA width / layout polish | DEFERRED to Desktop Phase |
| Full brand content rewrite | FUTURE / content owner |
| Cross-page trust claim governance | FUTURE (system-level content model) |

---

## 20. Risk assessment

| Risk | Level | Mitigation |
|---|---|---|
| Scope creep into redesign | High | SA lock + this document’s proposed scope |
| Shared component regression | Medium | Local-only class edits |
| Content edits without legal review | Medium | Owner/content authority for claim changes |
| Implementing before SA | High | **Hard stop** — implementation not authorized |
| Touching frozen Section 4 | High | Freeze record change-control |

---

## 21. Final audit decision

```text
PHASE_B2_1_AUDIT: COMPLETE
SECTION_5_IMPLEMENTATION: NOT_AUTHORIZED
SECTION_5_STATUS: AUDITED_PENDING_SA_TRIAGE
NEXT_GATE: SA_TRIAGE
APP_SOURCE_CHANGED_DURING_B2_1: NO
```

**Owner / SA must review**

1. B2.1-F01 MUST_FIX (chevrons) — approve remove vs linkify.  
2. B2.1-F02 / F09 duplication — accept, shorten, or content rewrite authority.  
3. B2.1-F03 icon fix — approve as limited polish.  
4. Whether F04/F05 enter the same locked implementation batch.  
5. Confirm no shared-component edits in any authorized B2.1 implementation.

**Recommended path after triage**

SA triage → lock B2.1 implementation scope → implement Section 5 only → verify → freeze Section 5 → **then and only then** open Section 6.
