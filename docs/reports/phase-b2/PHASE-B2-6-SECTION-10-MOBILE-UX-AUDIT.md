# Phase B2.6 — Section 10 Mobile UX Audit

**Document type:** Read-only UX / conversion / CTA authority audit  
**Date:** 2026-07-18  
**Authority:** Mobile primary 390px · boundary 375 / 430 · desktop 1280 observation only  
**Source baseline:** `main` @ `e971ecb`  
**Runtime:** Local production build of main  
**Branch:** `phase-b2-6/section-10-mobile-audit`  
**Scope:** Section 10 only  
**Implementation:** **NOT AUTHORIZED** by this document  

---

## 1. Executive summary

Section 10 is the **final conversion climax**: multi-line headline, product art + benefit list, social proof strip, money-back guarantee card, **primary LINE CTA block**, 4-up trust grid, and closing reassurance. Purpose is immediately clear.

Runtime LINE handoff **works** (`activateLineCta` surface `final-cta` → `line_cta_click`). Content `href` remains **`#`** (progressive-enhancement debt, same class as earlier CTA fixes).

| Severity | Count |
|---|---:|
| BLOCKER | **0** |
| MUST_FIX | **1** |
| SHOULD_POLISH | **3** |
| ACCEPT | **4** |
| FUTURE | **2** |
| DEFERRED | **1** |

**CTA Authority recommendation:** **PARTIAL → YES for primary conversion CTA pattern** (full-width solid block with label + subcopy + LINE icon). Mid-funnel section pills remain page-composition variants, not replaced by Section 10 chrome.

```text
PHASE_B2_6_AUDIT: COMPLETE
CTA_AUTHORITY: PARTIAL
SECTION_10_IMPLEMENTATION: NOT_AUTHORIZED
SECTION_10_STATUS: AUDITED_PENDING_SA_TRIAGE
```

---

## 2. CTA Authority Review

### Inventory (landing LINE CTAs)

| Surface | Location | Pattern | Label family |
|---|---|---|---|
| `hero-line` | Hero | Solid pill + LINE icon | ปรึกษา… LINE |
| `featured-product-line` | S3 | Solid product CTA | สั่งซื้อ/ปรึกษา LINE |
| `product-grid-card` | S4 | Outline secondary | สั่งซื้อผ่าน LINE |
| `product-grid-final` | S4 | Solid section final | ปรึกษาหรือสั่งซื้อ… |
| `why-choose-us-line` | S5 | Solid full-width pill | ปรึกษาผู้เชี่ยวชาญ… |
| `how-to-order-line` | S6 | Solid full-width pill | ปรึกษาหรือสั่งซื้อ… |
| `privacy-*-line` | S7 | Solid pills | ปรึกษา… |
| `reviews-*-line` | S8 | Secondary quiet + solid final | ดูรีวิว / ปรึกษาหรือสั่งซื้อ… |
| `faq-*-line` | S9 | Support pill + solid final | ปรึกษา… |
| **`final-cta`** | **S10** | **Solid block · label + description · large touch** | **ปรึกษาหรือสั่งซื้อผ่าน LINE** |

### Comparison

| Dimension | Mid-section solid pills | Section 10 Final CTA |
|---|---|---|
| Visual emphasis | Strong | **Strongest** (72px H @390, full bleed block) |
| Structure | Single line label | Label + supporting line |
| Iconography | LINE + chevron | LINE in white circle + chevron |
| Analytics surface | section-specific | **`final-cta`** (clear terminal name) |
| Intent | high_intent / inquiry | **high_intent** |
| Wording | Variant family | Canonical “ปรึกษาหรือสั่งซื้อผ่าน LINE” |

### Recommendation

| Decision | Scope |
|---|---|
| **CTA_AUTHORITY: PARTIAL (recommend elevating to YES for terminal CTA)** | Section 10 defines **primary conversion CTA block** language for climax actions |
| Mid-funnel CTAs | Keep section-local composition (outline cards, support pills) under existing solid-pill family |
| Do not | Force every CTA to copy S10 block layout |

If SA accepts: draft **ADR-006 CTA Component Authority** in implementation phase (not this audit).

---

## 3. Purpose review

| Question | Assessment |
|---|---|
| Clear final action? | **Yes** — solid pink CTA dominates lower half |
| Why act now? | Benefits + social proof + guarantee |
| 5-second scan | Headline → art/benefits → proof → CTA |

---

## 4. Hierarchy

| Layer | Content | Verdict |
|---|---|---|
| Badge | SECTION 10 | PASS |
| Heading | 2-line confidence transformation | PASS · pink highlight “ดีที่สุด” |
| Subtitle | Start today… | PASS |
| Art + benefits | 4 benefit rows | PASS · dense but scannable |
| Social proof | 1,246 / 5 stars | PASS · ties to S8 numbers |
| Guarantee | Refund + shipping | Strong trust · claim review FUTURE |
| **CTA** | Primary action | **PASS** · H≈72 |
| Trust grid | 4 items | Micro type weak |
| Reassurance | Closing line | PASS |

---

## 5. Trust review

| Element | Notes |
|---|---|
| Social proof avatars | Decorative initials + +1.2K — synthetic look **ACCEPT**/polish |
| 1,246 | Consistent with S8 review count narrative |
| Guarantee | “คืนเงินเต็มจำนวน ภายใน 7 วันไม่มีเงื่อนไข” — **legal/content FUTURE** |
| Shipping | ปกปิด / ไม่ระบุสินค้า — aligns S7 |
| Trust grid | ปลอดภัย / ข้อมูลลับ / จัดส่งเร็ว / ทีมงาน — residual mantra |

---

## 6. Analytics review

| Field | Value |
|---|---|
| Event | **`line_cta_click`** |
| `cta_location` | **`final-cta`** |
| `destination` | `line_oa` |
| `link_url` | `https://lin.ee/syjmYE2` |
| `intent` | `high_intent` |
| `source` | `final-cta` |
| Runtime open | `https://lin.ee/syjmYE2` |
| Attribute `href` | **`#`** (content) |

**Consistency:** Matches post-S8/S9 canonical event name and OA URL. Surface name `final-cta` is appropriate for terminal conversion.  
**Gap:** Progressive enhancement (`href="#"`) same class as pre-fix FAQ/review rows.

Evidence: `screenshot/Mobile-screenshot/phase-b2-6-section10/cta-analytics.json`

---

## 7. Accessibility

| Check | Result |
|---|---|
| Section aria-label | Present (“Final CTA” — English) |
| Heading | `h2` multi-line | PASS |
| CTA | native `<a>` + aria-label + focus ring | PASS |
| Touch height | **72px** | PASS |
| Contrast | CTA white on pink strong; trust 10px weak |
| Keyboard | Anchor focusable | PASS |
| Decorative avatars | aria-hidden | PASS |

---

## 8. Transition review

| Transition | Assessment |
|---|---|
| S9 → S10 | FAQ answers → final conversion · correct funnel climax |
| S10 → S11 | Conversion → footer utility · natural close |
| Density jump | FAQ list → rich conversion collage · intentional pause |

---

## 9. Strengths

- Unambiguous final action.  
- Strongest visual CTA on the page (H72 block).  
- Correct runtime LINE + analytics contract.  
- Social proof echoes S8 (1,246).  
- No horizontal overflow 375–1280.  
- Surface name `final-cta` is clean for GTM reporting.  

---

## 10. Findings register

### B2.6-F01 — Primary CTA content href is `#`

| Field | Value |
|---|---|
| Type | FUNCTIONAL / UX |
| Severity | **MUST_FIX** |
| Evidence | Measured `href="#"`; runtime `activateLineCta` opens OA |
| Impact | No-JS / middle-click / open-in-new-tab without handler fails |
| Recommendation | `href={LINE_OA_URL}`; keep `activateLineCta` + `e.preventDefault()` |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.6-F02 — Trust grid microcopy 10–11px

| Field | Value |
|---|---|
| Type | VISUAL / ACCESSIBILITY |
| Severity | **SHOULD_POLISH** |
| Evidence | Trust descriptions measured ~10px |
| Impact | Harder to read under CTA |
| Recommendation | Bump to ~11.5–12px / improve opacity (local) |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.6-F03 — Benefit row description micro type

| Field | Value |
|---|---|
| Type | VISUAL |
| Severity | **SHOULD_POLISH** |
| Evidence | Benefit descriptions `text-[11px]` |
| Impact | Secondary scan friction |
| Recommendation | Slight type/spacing polish only |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.6-F04 — Social proof avatars are synthetic initials

| Field | Value |
|---|---|
| Type | CONTENT / CONVERSION |
| Severity | **SHOULD_POLISH** / ACCEPT |
| Evidence | A/K/N avatars + +1.2K |
| Impact | May feel stock; still supports density of “many people” |
| Recommendation | Keep unless photo rights available; do not invent faces |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.6-F05 — Money-back guarantee absolute claim

| Field | Value |
|---|---|
| Type | CONTENT / LEGAL |
| Severity | **FUTURE** |
| Evidence | “คืนเงินเต็มจำนวน…ไม่มีเงื่อนไข” |
| Impact | Policy/legal risk if not operationally true |
| Recommendation | Content/legal verification — not pure UX |
| Implementation | **NOT AUTHORIZED** |

### B2.6-F06 — Section density / length

| Field | Value |
|---|---|
| Type | UX / CONVERSION |
| Severity | **ACCEPT** |
| Evidence | Section H ≈ 978px @390 |
| Impact | Acceptable for climax; more blocks than mid-sections |
| Recommendation | Do not strip without conversion evidence |

### B2.6-F07 — Star color vs Review authority (yellow)

| Field | Value |
|---|---|
| Type | OBSERVATION |
| Severity | **ACCEPT** / FUTURE cross-authority |
| Evidence | S10 uses pink filled stars; S8/Product reviews use yellow post-ADR-004 |
| Impact | Minor system consistency |
| Recommendation | Align if CTA/Review authorities coordinated later |
| Implementation | **NOT AUTHORIZED** |

### B2.6-F08 — aria-label section English “Final CTA”

| Field | Value |
|---|---|
| Type | ACCESSIBILITY |
| Severity | **SHOULD_POLISH** |
| Evidence | `ariaLabel: "Final CTA"` in content |
| Impact | Screen reader language mismatch (page is Thai) |
| Recommendation | Thai aria-label e.g. “พร้อมเริ่มสั่งซื้อผ่าน LINE” |
| Implementation | **NOT AUTHORIZED — PENDING SA TRIAGE** |

### B2.6-F09 — Desktop CTA width ~1048

| Field | Value |
|---|---|
| Type | OBSERVATION |
| Severity | **DEFERRED** |
| Viewport | 1280 |
| Recommendation | Desktop phase max-width tuning |

### B2.6-F10 — Non-blocking 404 @375

| Field | Value |
|---|---|
| Type | FUNCTIONAL / OBSERVATION |
| Severity | **FUTURE** |
| Evidence | One console 404 resource @375 |
| Recommendation | Track asset path separately |

---

## 11. Recommended limited implementation scope (NOT AUTHORIZED)

| Priority | Item | Finding |
|---|---|---|
| **P0** | `href={LINE_OA_URL}` on final CTA | F01 |
| P1 | Trust/benefit micro typography | F02, F03 |
| P1 | Thai section aria-label | F08 |
| P2 | Optional star color alignment | F07 |
| Docs | CTA Authority ADR if SA elevates S10 | Authority |
| — | Guarantee legal review | F05 FUTURE |

**Out of scope:** redesign climax layout; remove guarantee/social blocks; change CTA wording; analytics schema; edit S9/S11; invent photos.

---

## 12. Risk assessment

| Risk | Level | Mitigation |
|---|---|---|
| Leaving href `#` | Medium | P0 wire LINE_OA_URL |
| Treating guarantee as pure UX | High | Legal/content gate |
| Forcing all CTAs to S10 block | High | PARTIAL authority only |
| Shared CTA component extraction | Medium | Local fix first |

---

## 13. Browser evidence

| Viewport | Section H | CTA H | CTA href | Overflow |
|---|---:|---:|---|---|
| 375 | 1001 | 72 | `#` | no |
| 390 | 978 | 72 | `#` | no |
| 430 | 922 | 72 | `#` | no |
| 1280 | 991 | 80 | `#` | no |

**Dir:** `screenshot/Mobile-screenshot/phase-b2-6-section10/`

| Shot | File |
|---|---|
| Full | `s10-full-390.png` |
| CTA close-up | `s10-cta-closeup-390.png` |
| S9→S10 | `s9-to-s10-390.png` |
| S10→S11 | `s10-to-s11-390.png` |
| Desktop | `s10-desktop-1280.png` |
| Analytics | `cta-analytics.json` |

---

## 14. Final audit decision

```text
PHASE_B2_6_AUDIT: COMPLETE
CTA_AUTHORITY: PARTIAL
SECTION_10_IMPLEMENTATION: NOT_AUTHORIZED
SECTION_10_STATUS: AUDITED_PENDING_SA_TRIAGE
SECTION_4: UNCHANGED
SECTION_5: UNCHANGED
SECTION_6: UNCHANGED
SECTION_7: UNCHANGED
SECTION_8: UNCHANGED
SECTION_9: UNCHANGED
SECTION_11: UNCHANGED
CTA: UNCHANGED
ANALYTICS: UNCHANGED
APP_SOURCE_CHANGED_DURING_B2_6: NO
NEXT_GATE: SA_TRIAGE
```

**Owner / SA must review**

1. Elevate Section 10 as **primary conversion CTA authority** (PARTIAL → YES)?  
2. Authorize F01 `LINE_OA_URL` fix.  
3. Authorize micro-type polish F02/F03/F08.  
4. Route guarantee claim F05 to legal/content.  
5. Confirm no redesign of climax structure.

**Recommended path**

SA triage → lock B2.6 implementation scope → implement Section 10 only → verify → freeze Section 10 → Section 11 audit.
