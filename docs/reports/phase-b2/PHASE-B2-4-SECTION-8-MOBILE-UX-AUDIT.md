# Phase B2.4 — Section 8 Mobile UX Audit

**Document type:** Read-only UX / social-proof / conversion audit  
**Date:** 2026-07-18  
**Authority:** Mobile primary 390px · boundary 375 / 430 · desktop 1280 observation only  
**Source baseline:** `main` @ `e971ecb`  
**Runtime:** Local production build of main  
**Branch:** `phase-b2-4/section-8-mobile-audit`  
**Scope:** Section 8 only  
**Implementation:** **NOT AUTHORIZED** by this document  

---

## 1. Executive summary

Section 8 (“รีวิวจากลูกค้าจริง”) is a strong **social-proof / conversion layer**. Within ~5 seconds users see **4.9 score**, **1,246 reviews**, star distribution, and three concrete customer cards with product chips. Visual design matches Sections 4–7 language.

Primary risk is **conversion correctness**: the “ดูรีวิวเพิ่มเติมใน LINE” row looks interactive and LINE-bound but uses `href="#"` and **does not** call `activateLineCta`. Secondary polish: badge monotony (all “ซื้อซ้ำแล้ว”), section length (~1321px @390), and score visual dominance.

| Severity | Count |
|---|---:|
| BLOCKER | **0** |
| MUST_FIX | **1** |
| SHOULD_POLISH | **4** |
| ACCEPT | **4** |
| FUTURE | **1** |
| DEFERRED | **1** |

**Strongest findings**

1. **B2.4-F01 MUST_FIX** — More-reviews row is a false/broken LINE path (`href="#"` · no analytics).  
2. **B2.4-F02 SHOULD_POLISH** — All 3 cards share identical purchase badge.  
3. **B2.4-F03 SHOULD_POLISH** — Dual post-review CTAs: secondary row vs final solid CTA hierarchy.  

```text
PHASE_B2_4_AUDIT: COMPLETE
SECTION_8_IMPLEMENTATION: NOT_AUTHORIZED
SECTION_8_STATUS: AUDITED_PENDING_SA_TRIAGE
NEXT_GATE: SA_TRIAGE
```

---

## 2. Repository baseline / source architecture

| Layer | Path |
|---|---|
| Component | `sections/section-8-reviews/section-8-reviews.tsx` |
| Content | `content/section-8-reviews.ts` |
| Shared UI | `SectionHeader`, `IconWrapper`, `LineIcon` |
| CTA | Final: `activateLineCta` surface `reviews-final-line` + `LINE_OA_URL` |
| More-reviews row | Local `<a href={content.href}>` — content `href: "#"` |

### Structure (render order)

1. SectionHeader  
2. ReviewSummaryCard (score + distribution)  
3. Review cards ×3  
4. MoreReviewsRow  
5. FinalLineCTA  
6. Trust row  

### SHARED_SURFACE_RISK

| Shared piece | Risk if edited globally |
|---|---|
| `SectionHeader` / `SectionBadge` | Header rhythm across frozen sections |
| `IconWrapper` / `LineIcon` | All LINE CTAs |
| `activateLineCta` / `LINE_OA_URL` | Commerce + analytics contracts |
| Trust-row micro pattern | Same residual as S5–S7 |

**Prefer Section 8–local fixes. Do not redesign shared components.**

---

## 3. Purpose review

| Question | Assessment |
|---|---|
| Real customer reviews? | **Yes** — 3 named cards with meta + product |
| Trust level clear? | **Yes** — 4.9 + 1,246 + distribution |
| Review quality readable? | **Yes** — body **14px** strong |
| Average rating clear? | **Yes** within 2 seconds |

**Verdict:** Purpose is clear and correctly placed after privacy (S7) and before FAQ (S9).

---

## 4. Rating review

| Element | Measured @390 | Verdict |
|---|---|---|
| Score | **4.9** · **60px** pink | Extremely clear; slightly dominant |
| Stars | 5 filled | PASS |
| Count | จาก 1,246 รีวิว | PASS |
| Distribution | 5★ 92% … with % labels | PASS · understandable |

**Hierarchy:** Rating → cards → CTAs is correct. Score competes mildly with first card but remains acceptable for social-proof impact.

---

## 5. Review cards review

| Element | Assessment |
|---|---|
| Avatar (initial) | Clear, brand-consistent |
| Name / age / location | Readable 16px / 12px |
| Purchase badge | Present but **identical on all 3** |
| Stars + date | Clear hierarchy |
| Review text | **14px** · good contrast white/86 |
| Product chip | Strong product attribution |
| Density | Premium; cards ~247–268px tall |
| Count | 3 on mobile — adequate sample |

---

## 6. Typography

| Element | Size | Verdict |
|---|---|---|
| Heading | 26px | PASS |
| Subtitle | 14px | PASS |
| Score | 60px | ACCEPT (dominant by design) |
| Distribution labels | 14px | PASS |
| Reviewer name | 16px | PASS |
| Review body | **14px** | PASS (stronger than S6/S7 bodies) |
| Meta / date | 12px white/62 | ACCEPT |
| Trust micro | 11px | ACCEPT residual |

`line-clamp-2` on mobile review lines may truncate longer proof — mostly OK for current short lines.

---

## 7. Layout

| Metric @390 | Value |
|---|---:|
| Section height | **~1321px** |
| Review cards | 3 |
| Card heights | 268 / 247 / 247 |
| Overflow | **none** |
| Desktop | 3-col cards · stable |

Section is long (expected for social proof). Not a defect unless SA prioritizes scroll budget.

---

## 8. CTA review

| Control | Behavior | Verdict |
|---|---|---|
| MoreReviewsRow “ดูรีวิวเพิ่มเติมใน LINE” | `href="#"` · **no** `activateLineCta` · H≈66 | **MUST_FIX** path |
| FinalLineCTA | `LINE_OA_URL` · solid · H**56** · surface `reviews-final-line` | PASS · do not weaken |
| Trust strip | Non-interactive residual claims | ACCEPT |

**Relationship to S9:** Final CTA closes proof; FAQ follows for remaining objections — correct funnel.

**Do not modify final CTA architecture in this audit phase.**

---

## 9. Accessibility

| Check | Result |
|---|---|
| Section aria-label | Present |
| Heading | `h2` + card `h3` names |
| Stars | decorative `aria-hidden` (score/count carry meaning) |
| Final CTA | native `<a>` + aria-label + focus ring |
| More-reviews row | Looks actionable; destination `#` is **misleading** |
| Contrast | Review body good; meta weaker but acceptable |
| Touch | Final 56px; more-row ~66px height |

---

## 10. Transition review

| Transition | Assessment |
|---|---|
| S7 → S8 | Privacy deep-dive → social proof · natural trust escalation |
| S8 → S9 | Reviews → FAQ · standard conversion residual questions |
| Spacing | Continuous dark stack |
| Narrative | Privacy confidence → peer proof → objections |

---

## 11. Conversion journey

| Question | Assessment |
|---|---|
| Increases confidence? | **Yes** — score + repeat buyers + product-linked quotes |
| Sufficient social proof? | **Yes for mobile sample** (3 cards + stats) |
| Encourage LINE? | Final CTA strong; secondary row **broken** |
| Delay conversion? | Mild (~1321px); acceptable for proof layer |

---

## 12. Browser evidence

**Dir:** `screenshot/Mobile-screenshot/phase-b2-4-section8/`  
**Metrics:** `s8-audit-metrics.json`

| Viewport | Section H | Score FS | Cards | Body | Final CTA | More href | Overflow |
|---|---:|---|---:|---|---:|---|---|
| 375 | 1334 | 54px | 3 | 14px | 56 | `#` | no |
| 390 | 1321 | 60px | 3 | 14px | 56 | `#` | no |
| 430 | 1282 | 60px | 3 | 14px | 56 | `#` | no |
| 1280 | 884 | 60px | 3 | 14px | 56 | `#` | no |

| Shot | File |
|---|---|
| Full 390 | `s8-full-390.png` / `01-…` |
| Rating | `s8-rating-390.png` / `02-…` |
| Cards | `s8-cards-390.png` / `03-…` |
| S7→S8 | `s7-to-s8-390.png` / `04a-…` |
| S8→S9 | `s8-to-s9-390.png` / `04b-…` |
| Desktop | `s8-desktop-1280.png` / `05-…` |

---

## 13. Findings register

### B2.4-F01 — More-reviews row does not open LINE

| Field | Value |
|---|---|
| Type | FUNCTIONAL / CONVERSION / ACCESSIBILITY |
| Severity | **MUST_FIX** |
| Viewport | All |
| Evidence | Measured `href: "#"`, absHref ends with `/#`; no `activateLineCta`; label claims LINE |
| Impact | Dead end after social proof; trust damage if user expects LINE reviews |
| Recommended action | Wire to `LINE_OA_URL` + `activateLineCta` with dedicated surface (e.g. `reviews-more-line`) **or** demote to non-link if intentional |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.4-F02 — Identical purchase badge on all cards

| Field | Value |
|---|---|
| Type | CONTENT / CONVERSION |
| Severity | **SHOULD_POLISH** |
| Viewport | All |
| Evidence | All three: “ซื้อซ้ำแล้ว” |
| Impact | Pattern looks templated; weakens authenticity |
| Recommended action | Vary badges (e.g. ผู้ซื้อครั้งแรก / ซื้อซ้ำ / ซื้อคู่) without inventing false facts — content owner review |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.4-F03 — Secondary CTA vs final CTA hierarchy

| Field | Value |
|---|---|
| Type | UX / CONVERSION |
| Severity | **SHOULD_POLISH** |
| Viewport | Mobile |
| Evidence | Outline more-reviews row (H66) immediately above solid final CTA (H56) |
| Impact | Two consecutive conversion surfaces; secondary should not out-compete final |
| Recommended action | Keep both if F01 fixed; ensure visual weight final > secondary (already solid vs outline) |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.4-F04 — Score block visual dominance

| Field | Value |
|---|---|
| Type | VISUAL |
| Severity | **ACCEPT** (or FUTURE density pass) |
| Viewport | 390 score **60px** |
| Evidence | Measured scoreFs 60px pink |
| Impact | Strong proof; can overshadow first review momentarily |
| Recommended action | Leave unless SA wants slight reduce (56→52) without redesign |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.4-F05 — Section length / scroll budget

| Field | Value |
|---|---|
| Type | UX / CONVERSION |
| Severity | **SHOULD_POLISH** / ACCEPT |
| Viewport | 390 · ~1321px |
| Evidence | Metrics sectionH |
| Impact | Extra scroll before FAQ; offset by proof value |
| Recommended action | Do **not** cut cards; optional tighten spacing only if locked later |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.4-F06 — Review line-clamp on mobile

| Field | Value |
|---|---|
| Type | CONTENT / UX |
| Severity | **ACCEPT** |
| Evidence | `line-clamp-2` per review line |
| Impact | Low for current short copy |
| Recommended action | Revisit only if copy lengthens |
| Implementation | **NOT AUTHORIZED** |

### B2.4-F07 — Trust-row residual claims

| Field | Value |
|---|---|
| Type | OBSERVATION |
| Severity | **ACCEPT** |
| Evidence | Same ปลอดภัย / ข้อมูลลับ / จัดส่งปกปิด pattern as S5–S7 |
| Impact | Brand mantra residual; not Section 8 unique value |
| Recommended action | Leave; do not rewrite |
| Implementation | **NOT AUTHORIZED** |

### B2.4-F08 — content finalCta/moreReviews href `#`

| Field | Value |
|---|---|
| Type | OBSERVATION |
| Severity | **ACCEPT** for final (runtime overrides); **linked to F01** for more-row |
| Evidence | content file hrefs are `#` |
| Impact | Final CTA OK via component; more-row uses content href literally |
| Recommended action | Align content authority with runtime for more-row when fixing F01 |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.4-F09 — Desktop CTA width / layout

| Field | Value |
|---|---|
| Type | OBSERVATION |
| Severity | **DEFERRED** |
| Viewport | 1280 |
| Recommended action | Desktop Phase |
| Implementation | **NOT AUTHORIZED** |

### B2.4-F10 — Non-blocking 404 console @375

| Field | Value |
|---|---|
| Type | FUNCTIONAL / OBSERVATION |
| Severity | **FUTURE** |
| Evidence | One 404 resource noise @375 |
| Recommended action | Track separately if asset path identified |
| Implementation | **NOT AUTHORIZED** |

---

## 14. Strengths

- Instant comprehension of rating + volume.  
- Review body typography already strong (14px).  
- Product chips attach reviews to real SKUs.  
- Final LINE CTA solid, correct OA, analytics surface present.  
- No overflow; desktop 3-col stable.  
- Funnel placement S7 → S8 → S9 is correct.  
- Visual language consistent with frozen mobile sections.

---

## 15. Recommended limited implementation scope (NOT AUTHORIZED)

Candidate **SA lock only**:

| Priority | Item | Finding |
|---|---|---|
| **P0** | Wire more-reviews row to LINE + analytics surface | F01 |
| P1 | Vary purchase badges (content-safe) | F02 |
| P1 | Confirm secondary vs final CTA visual order after F01 | F03 |
| P2 | Optional spacing tighten only if scroll budget locked | F05 |
| — | Score size / desktop | F04 ACCEPT / F09 DEFERRED |

**Explicitly out of scope unless separate authority**

- Redesign rating block  
- Remove review cards  
- Change final CTA architecture  
- Shared component restyle  
- Sections 4–7 / 9  
- Content rewrite inventing reviews  

---

## 16. Risk assessment

| Risk | Level | Mitigation |
|---|---|---|
| Leaving F01 unfixed | High | SA must authorize LINE wiring |
| Inventing fake badges/reviews | Medium | Content owner approval |
| Scope creep redesign | High | Limited lock only |
| Shared CTA chrome edits | Medium | Local row only |

---

## 17. Final audit decision

```text
PHASE_B2_4_AUDIT: COMPLETE
SECTION_8_IMPLEMENTATION: NOT_AUTHORIZED
SECTION_8_STATUS: AUDITED_PENDING_SA_TRIAGE
SECTION_4: UNCHANGED
SECTION_5: UNCHANGED
SECTION_6: UNCHANGED
SECTION_7: UNCHANGED
CTA: UNCHANGED (final intact; more-row broken — report only)
ANALYTICS: UNCHANGED
APP_SOURCE_CHANGED_DURING_B2_4: NO
NEXT_GATE: SA_TRIAGE
```

**Owner / SA must review**

1. B2.4-F01 MUST_FIX — authorize LINE wiring for more-reviews row.  
2. Whether badge diversification (F02) is content-authorized.  
3. Keep dual CTA structure after F01.  
4. Accept score dominance and section length.  
5. Confirm no shared-component redesign.

**Recommended path**

SA triage → lock B2.4 implementation scope → implement Section 8 only → verify → freeze Section 8 → then Section 9.
