# Phase B2.7 — Section 11 Mobile UX Audit

**Document type:** Read-only Mobile UX / Footer / Trust / Accessibility audit  
**Date:** 2026-07-18  
**Branch:** `phase-b2-7/section-11-mobile-audit`  
**Base:** `main` @ `e971ecb`  
**Mode:** AUDIT ONLY · NO SOURCE MODIFICATION · NO IMPLEMENTATION  
**Authority viewport:** Mobile primary **390px** · boundary 375 / 430 · desktop **1280** observe only  
**Scope:** Section 11 Footer only (+ S10 → S11 transition observation)  
**Implementation:** **NOT AUTHORIZED** by this document  

---

## 1. Executive Summary

Section 11 is a **visually complete, brand-consistent homepage footer** with clear contact grouping, LINE entry points that resolve to the live OA URL, trust/guarantee strips, payment badges, and a 3-column sitemap. On mobile, users can find **LINE / phone / email / company** within a few seconds inside the contact card.

However, the footer is **not yet safe as a system-wide Footer Authority**:

| Risk | Severity |
|---|---|
| **22 / 27** footer links are `href="#"` placeholders (nav, products, legal, social) | **MUST_FIX** (pre-production) |
| Footer content is **duplicated** vs `content/site-navigation.ts` (hrefs, phone, LINE) | **MUST_FIX** (shared-surface) |
| Phone number **diverges** (`092-956-5523` in footer vs `[OBSOLETE_PHONE_REMOVED_PG01_CLOSED]` in `siteContacts`) | **MUST_FIX** (trust) |
| Social + Privacy/Terms are dead links | **MUST_FIX** / **LEGAL** |
| Nav column touch targets ~**17px** height (below ~44px) | **SHOULD_POLISH** |
| Platform product / knowledge / information pages **do not** mount this footer | **FUTURE** / authority gap |
| Copyright year **© 2025** while audit date is 2026 | **SHOULD_POLISH** |

**LINE conversion path is the strength:** contact LINE + “ให้คำปรึกษา” + “การสั่งซื้อผ่าน LINE” resolve to `https://lin.ee/syjmYE2` and call `activateLineCta`.

```text
SECTION_11_AUDIT: COMPLETE
FOOTER_AUTHORITY: PARTIAL
SECTION_11_IMPLEMENTATION: NOT_AUTHORIZED
SECTION_11_STATUS: AUDITED_PENDING_SA_TRIAGE
```

| Metric | Count |
|---:|
| BLOCKER | **0** |
| MUST_FIX | **5** |
| SHOULD_POLISH | **5** |
| ACCEPT | **6** |
| FUTURE | **3** |

---

## 2. Footer Authority Review

### Question

Should Section 11 become **FOOTER COMPONENT AUTHORITY** for the platform?

### Comparison matrix

| Surface | Present? | Same component? | Same content authority? |
|---|---|---|---|
| Homepage footer (`app/page.tsx`) | **Yes** | `Section11Footer` | `content/section-11-footer.ts` |
| Shared layout footer | **No** | — | — |
| Product / knowledge / information pages | **No footer** | — | — |
| `content/site-navigation.ts` | Nav + contacts + socials defined | **Not consumed by S11** | Parallel authority |
| Header / drawer | Uses `siteNavigationGroups` + `ctaDestinations` | Different | Partially aligned labels only |

### Design review dimensions

| Dimension | Observation | Authority impact |
|---|---|---|
| Information hierarchy | Clear: heading → 3-col nav → contact → social → privacy → guarantee → brand/legal → payments | **Strong pattern candidate** |
| Contact grouping | LINE → phone → email → address in one card | **Reusable** |
| Icon consistency | Pink outline icons; custom LINE + social SVGs | **Reusable** (prefer shared `LineIcon` later) |
| Spacing / typography | Dense mobile 11.5–14px; readable contact values | **Reusable** with polish |
| Legal grouping | Privacy/Terms only as nav items (dead); no dedicated legal row | **Incomplete** |
| Social grouping | 4 icon buttons, aria-labels present | **Reusable** after real URLs |
| LINE entry point | Contact card + 2 service links + sticky header CTA | **Strong**; already uses `LINE_OA_URL` / `activateLineCta` |

### Recommendation

```text
FOOTER_AUTHORITY: PARTIAL
```

**Meaning**

- **YES as pattern** for homepage mobile footer structure, visual system, contact + trust blocks.
- **NO as freeze-ready system authority** until:
  1. Single content source for links / contacts / socials (merge or map from `site-navigation` / shared contacts).
  2. Dead `href="#"` reduced to intentional placeholders only (or hidden).
  3. Phone / company identity reconciled.
  4. Optional extraction path for platform layouts (out of B2.7 limited scope; registry later).

**Do not implement extraction in limited S11 pass unless SA expands scope.** Prefer **content + href + a11y limited polish** first, then Design Authority Registry v1 documents FOOTER as official.

---

## 3. Information Architecture

```text
<footer id="section-11-footer" aria-label="Footer">
  SectionBadge "SECTION 11"
  h2 เมนูและช่องทางติดต่อ
  description เราพร้อมดูแลคุณ
  ── diamond divider ──
  nav[aria-label="เมนูส่วนท้าย"]
    col เมนูหลัก (8 items, mostly #)
    col ข้อมูลสินค้า (6 items, all #)
    col บริการของเรา (6 items; 2× LINE live, rest #)
  ── cards ──
  Contact card (LINE live · tel · mailto · address static)
  Social card (4× #)
  Privacy reassurance panel (no link)
  Guarantee strip
  Brand ZENOVELL + copyright / rights
  Secure SSL + payment badges (Visa / MC / JCB / PromptPay)
```

### Hierarchy scorecard

| Block | Discoverability (≤ few seconds) | Notes |
|---|---|---|
| LINE | **Pass** | First contact row; also services column |
| Contact (phone/email) | **Pass** | Large touch rows |
| Social | **Pass** (visible) / **Fail** (function) | Icons visible; destinations dead |
| Company | **Pass** | Address + brand name |
| Legal | **Weak** | Links exist but dead; no Privacy Policy page |
| Copyright | **Pass** | Present; year stale |

### Intended vs actual destinations

| Source of truth (intended) | Footer content actual |
|---|---|
| `siteNavigationGroups` anchors (`#section-4-product-catalog`, etc.) | All main-menu / product / most service `href: "#"` |
| `siteNavigationGroups` LINE services → `LINE_OA_URL` | Runtime override for `line-order` / `consulting` only |
| `siteContacts.phone` `[OBSOLETE_PHONE_REMOVED_PG01_CLOSED]` | Footer `092-956-5523` |
| `siteContacts.line` placeholder `#line-primary` | Footer resolves via `destinationId: "header-line"` → live OA |
| `siteSocialLinks` all `#` | Footer social all `#` (aligned but both incomplete) |
| `ctaDestinations.footer-line` still placeholder in nav file | Footer contact LINE bypasses via `header-line` id |

---

## 4. Trust Review

| Signal | Status | Note |
|---|---|---|
| Brand name + tagline | **Present** | ZENOVELL · Modern Intimate Wellness |
| Company entity | **Present** | บริษัท เซโนเวลล์ จำกัด · Bangkok |
| LINE OA handle | **Present** | @zenovell + live deep link |
| Support channels | **Present** | Phone + email interactive |
| Guarantee 7-day | **Present** | Aligns with funnel trust language |
| Privacy reassurance | **Present** | Copy-only; not a policy page |
| SSL / payments | **Present** | Visual trust only (static badges) |
| Copyright | **Present / stale year** | © 2025 |
| Contact consistency | **Fail** | Phone mismatch vs `siteContacts` |

Trust posture is **marketing-strong, compliance-light**: reassurance and guarantee are clear; **legal destinations and canonical contact data** are not production-grade.

---

## 5. Accessibility

| Check | Result |
|---|---|
| Landmark | `<footer>` + `aria-label` |
| Nav landmark | `nav aria-label="เมนูส่วนท้าย"` |
| Heading hierarchy | h2 → multiple h3 (columns, contact, social) — **acceptable** |
| Interactive contact min-height | `min-h-11` + measured **66–77px** — **Pass** |
| Social icons | **48×48** — **Pass** |
| Nav column links | measured height **~17px** — **Fail vs 44px** target |
| Focus rings | `focus-visible:outline` pink on links — **Pass pattern** |
| Decorative icons | `aria-hidden="true"` — **Pass** |
| Social icon-only links | `aria-label` present — **Pass** |
| Footer `aria-label` language | English `"Footer"` while UI is Thai — **Polish** |
| Color contrast (dark #0A0A0A + white / pink) | Large text **Pass**; muted white/56–72% microcopy **borderline** on small type |
| Horizontal scroll 375/390/430/1280 | **None** |

---

## 6. Transition Review — Section 10 → Section 11

**Evidence:** `screenshot/Mobile-screenshot/phase-b2-7-section11/04-transition-s10-s11-390.png`

```text
Section 10 Final CTA
  trust grid + primary LINE CTA + reassurance line
        ↓
sticky GlobalHeader remains
        ↓
Section 11 heading "เมนูและช่องทางติดต่อ"
  description "เราพร้อมดูแลคุณ"
  3-column footer nav
```

| Criterion | Assessment |
|---|---|
| Closing of conversion funnel | **Good** — S10 climax CTA then recovery/support footer |
| Tone continuity | **Good** — care / readiness language |
| Visual break | **Acceptable** — dark continuous; diamond divider re-introduces IA |
| Double LINE presence | **Accept** for funnel; S10 = high-intent CTA, S11 = utility contact |
| Desktop | S10 trust + S11 sit under wider shell; no overflow observed |

No transition redesign recommended for limited scope.

---

## 7. Desktop Safety (observe only)

**Evidence:** `05-desktop-safety-1280.png`  
**H-scroll:** none at 1280.

| Observation | Status |
|---|---|
| 3-col nav breathes with larger gap | Accept |
| Contact + social + privacy 2-col grid | Accept |
| Guarantee full width | Accept |
| Brand/legal + payments row | Accept; payment badges readable |
| No desktop redesign required for audit | **Yes** |

Desktop remains **DEFERRED** program-wide.

---

## 8. Source Inspection & Shared-Surface Risks

### Files in scope (read-only)

| File | Role |
|---|---|
| `sections/section-11-footer/section-11-footer.tsx` | UI + analytics + LINE activation |
| `content/section-11-footer.ts` | Section content authority (actual rendered data) |
| `content/site-navigation.ts` | Parallel nav / contacts / socials / ctaDestinations |
| `lib/commerce/cta-contract.ts` | `LINE_OA_URL` |
| `lib/commerce/cta-activation.ts` | `activateLineCta` |
| `app/page.tsx` | Only consumer of `Section11Footer` |

### Shared-surface risks

1. **Dual content authority** — footer does not import `siteNavigationGroups` / `siteContacts` / `siteSocialLinks`; labels are copy-pasted; hrefs diverged to `"#"`.  
2. **Phone identity split** — users may see different numbers if other surfaces later consume `siteContacts`.  
3. **ctaDestinations.footer-line** remains placeholder while runtime uses `header-line` for contact LINE — fragile indirection.  
4. **Platform pages lack footer** — FOOTER_AUTHORITY cannot be claimed system-wide.  
5. **Client component** forced by analytics `onClick` (known from M10 performance notes) — shared risk if extracted.  
6. **Legal placeholders** appear in both footer content and site-navigation with `placeholderSafe: true` — intentional pre-policy, but **not Ads / production ready**.

### LINE behavior (runtime evidence)

| Control | href attribute | Click behavior |
|---|---|---|
| Contact LINE | `https://lin.ee/syjmYE2` | `activateLineCta` + `preventDefault` · surface `footer-line` |
| Nav “การสั่งซื้อผ่าน LINE” | `https://lin.ee/syjmYE2` | `activateLineCta` · surface `footer-line` · intent `high_intent` |
| Nav “ให้คำปรึกษา” | `https://lin.ee/syjmYE2` | `activateLineCta` · surface `footer-consulting-line` · intent `inquiry` |
| Phone | `tel:0929565523` | native |
| Email | `mailto:support@zenovell.com` | native |

Also tracks `footer_cta_click` / `contact_click` / `social_click` via `AnalyticsEvents`.

---

## 9. Strengths

1. **Complete mobile footer IA** — nav, contact, social, trust, legal text, payments in one scrollable unit.  
2. **LINE discoverability** — multiple entry points; live OA URL.  
3. **Contact UX** — large rows, icons, subtext hours for phone.  
4. **Brand + trust language** aligned with funnel (privacy, guarantee, SSL).  
5. **No horizontal overflow** at 375 / 390 / 430 / 1280.  
6. **Semantic footer + labeled nav** and solid focus-visible treatment.  
7. **Payment + secure strip** closes the commercial trust story after S10.

---

## 10. Findings

### Summary table

| ID | Category | Severity | Title |
|---|---|---|---|
| S11-F01 | FUNCTIONAL / UX | **MUST_FIX** | Majority of footer nav links are dead (`href="#"`) despite live anchors existing in `site-navigation` |
| S11-F02 | TRUST / CONTENT | **MUST_FIX** | Phone number mismatch vs `siteContacts` |
| S11-F03 | CONTENT / SHARED | **MUST_FIX** | Dual content authority: `section-11-footer.ts` ⊄ `site-navigation` |
| S11-F04 | LEGAL / TRUST | **MUST_FIX** | Privacy & Terms destinations are placeholders |
| S11-F05 | FUNCTIONAL | **MUST_FIX** | Social links all `href="#"` |
| S11-F06 | ACCESSIBILITY | **SHOULD_POLISH** | Nav column link hit area ~17px tall |
| S11-F07 | CONTENT | **SHOULD_POLISH** | Copyright year © 2025 (audit year 2026) |
| S11-F08 | ACCESSIBILITY | **SHOULD_POLISH** | Footer `aria-label="Footer"` not Thai / not descriptive |
| S11-F09 | VISUAL / UX | **SHOULD_POLISH** | Internal badge “SECTION 11” exposed to end users |
| S11-F10 | UX | **SHOULD_POLISH** | “การชำระเงิน” / several product links have no real destination even in site-nav (placeholders or weak anchors) |
| S11-F11 | UX | **ACCEPT** | Dense 3-column mobile nav (readable at 390; tight but intentional) |
| S11-F12 | VISUAL | **ACCEPT** | Pink diamond divider + dark cards brand-consistent |
| S11-F13 | TRUST | **ACCEPT** | Guarantee + privacy panels as non-linked reassurance |
| S11-F14 | FUNCTIONAL | **ACCEPT** | LINE contact + service LINE paths live |
| S11-F15 | A11Y | **ACCEPT** | Contact/social touch targets ≥ 44px |
| S11-F16 | DESKTOP | **ACCEPT** | 1280 layout stable; no h-scroll |
| S11-F17 | ARCHITECTURE | **FUTURE** | Extract shared Footer for platform routes |
| S11-F18 | CONTENT | **FUTURE** | Real social URLs + JSON-LD `sameAs` |
| S11-F19 | LEGAL | **FUTURE** | Dedicated Privacy / Terms routes or modals |

---

### Finding detail

#### S11-F01 — Dead footer navigation hrefs

- **Category:** FUNCTIONAL / UX  
- **Severity:** MUST_FIX  
- **Evidence:** DOM audit — 22/27 links `href="#"`; content file all main/product items `"#"`; browser 390.  
- **Impact:** Users tapping “สินค้าทั้งหมด”, “รีวิวลูกค้า”, “FAQ”, etc. get no navigation; undermines footer purpose and pre-Ads trust.  
- **Recommendation:** Map existing anchors from `siteNavigationGroups` (e.g. `#section-4-product-catalog`, `#section-8-reviews`, `#section-9-faq`, `#section-6-how-to-order`, `#section-7` / privacy-shipping id, `#section-11-footer` for contact). Keep true placeholders only where no surface exists (articles, some SKUs).  
- **Implementation:** NOT AUTHORIZED (await SA Scope Lock).

#### S11-F02 — Phone number divergence

- **Category:** TRUST / CONTENT  
- **Severity:** MUST_FIX  
- **Evidence:** `content/section-11-footer.ts` → `092-956-5523`; `content/site-navigation.ts` `siteContacts` → `[OBSOLETE_PHONE_REMOVED_PG01_CLOSED]`.  
- **Impact:** Conflicting company identity; support risk; Ads/compliance risk.  
- **Recommendation:** Single canonical phone in one contacts authority; both surfaces consume it. SA must pick canonical number.  
- **Implementation:** NOT AUTHORIZED.

#### S11-F03 — Dual content authority

- **Category:** CONTENT / SHARED-SURFACE  
- **Severity:** MUST_FIX (architecture for limited polish)  
- **Evidence:** Footer renders only `section11FooterContent`; does not read `siteNavigationGroups` / `siteContacts` / `siteSocialLinks` despite parallel structure.  
- **Impact:** Any nav fix in one file silently leaves the other wrong (current state). Blocks FOOTER_AUTHORITY = YES.  
- **Recommendation:** Limited scope option A — re-sync footer content hrefs/contacts to match navigation; Option B — derive columns from navigation (larger change). Prefer A for limited implementation.  
- **Implementation:** NOT AUTHORIZED.

#### S11-F04 — Privacy & Terms dead

- **Category:** LEGAL / TRUST  
- **Severity:** MUST_FIX (before production / ads); may **defer** if SA accepts “placeholderSafe until legal pages exist” with hidden or non-linked treatment.  
- **Evidence:** `href: "#"` for privacy + terms in footer content; same in site-navigation with `placeholderSafe: true`.  
- **Impact:** Legal discoverability fake; compliance gap.  
- **Recommendation:** Either ship minimal Privacy/Terms destinations or temporarily demote to non-link text until pages exist (avoid fake links).  
- **Implementation:** NOT AUTHORIZED.

#### S11-F05 — Social dead links

- **Category:** FUNCTIONAL  
- **Severity:** MUST_FIX (or hide until URLs ready)  
- **Evidence:** Four social anchors `href="#"` with analytics `social_click`.  
- **Impact:** Broken expectation; empty clicks pollute analytics.  
- **Recommendation:** Wire real profiles or hide icons until available; align with SEO `sameAs` later.  
- **Implementation:** NOT AUTHORIZED.

#### S11-F06 — Nav touch targets

- **Category:** ACCESSIBILITY  
- **Severity:** SHOULD_POLISH  
- **Evidence:** Measured nav link boxes ~102×17 / 94×17.  
- **Impact:** Harder taps on mobile; fails common 44×44 guidance.  
- **Recommendation:** Increase py / min-h on column links without redesigning 3-col grid.  
- **Implementation:** NOT AUTHORIZED.

#### S11-F07 — Copyright year

- **Category:** CONTENT  
- **Severity:** SHOULD_POLISH  
- **Evidence:** “© 2025 ZENOVELL…” on 2026-07-18 audit.  
- **Impact:** Minor trust/freshness.  
- **Recommendation:** Update to 2026 or dynamic year.  
- **Implementation:** NOT AUTHORIZED.

#### S11-F08 — Footer aria-label language

- **Category:** ACCESSIBILITY  
- **Severity:** SHOULD_POLISH  
- **Evidence:** `ariaLabel: "Footer"` in content.  
- **Impact:** Screen reader inconsistency with Thai UI.  
- **Recommendation:** e.g. `ส่วนท้ายเว็บไซต์` / `เมนูและช่องทางติดต่อ`.  
- **Implementation:** NOT AUTHORIZED.

#### S11-F09 — “SECTION 11” badge

- **Category:** VISUAL / UX  
- **Severity:** SHOULD_POLISH  
- **Evidence:** SectionBadge label in content.  
- **Impact:** Internal numbering leaks to customers (same pattern as other sections).  
- **Recommendation:** SA call — hide badge on footer or replace with customer-facing label; may defer to cross-section consistency.  
- **Implementation:** NOT AUTHORIZED.

#### S11-F10 — Incomplete product / payment destinations

- **Category:** UX  
- **Severity:** SHOULD_POLISH  
- **Evidence:** Product SKUs without PLP anchors; payment points to weak/mismatched ids in site-nav (`#section-11` vs `#section-11-footer`).  
- **Impact:** Partial sitemap.  
- **Recommendation:** Link available products to `/products/[slug]` where authority exists; payment → payments strip id or S7.  
- **Implementation:** NOT AUTHORIZED.

---

## 11. Recommended Limited Scope (for SA Scope Lock)

**Goal:** Make Section 11 production-honest for mobile funnel close — without redesign, without platform extraction.

### Proposed IN (limited implementation candidate)

| Priority | Item | Finding |
|---|---|---|
| P0 | Wire main-menu + shipping/contact anchors that already exist | F01 |
| P0 | Canonical phone + email/address from single source | F02, F03 |
| P0 | Confirm LINE contact continues on `LINE_OA_URL` + `activateLineCta` | F14 protect |
| P1 | Nav link min touch height polish | F06 |
| P1 | Copyright year + Thai footer aria-label | F07, F08 |
| P1 | Social: real URLs **or** hide until ready | F05 |
| P1 | Privacy/Terms: real route **or** non-interactive label | F04 |

### Proposed OUT (unless SA expands)

- Full shared Footer extraction to layouts  
- Desktop/tablet redesign  
- New legal page content writing (unless short stubs approved)  
- Analytics schema changes  
- Header/drawer redesign  
- Section 4–10 changes  
- ADR freeze of FOOTER_AUTHORITY = YES before content single-source

### Protected contracts

- `https://lin.ee/syjmYE2` / `LINE_OA_URL`  
- `activateLineCta` surfaces `footer-line`, `footer-consulting-line`  
- Analytics event names currently used  
- No new packages  
- No production / ads authorization  

---

## 12. Risk Assessment

| Risk | Level | If unfixed |
|---|---|---|
| Dead-link footer at Ads go-live | **High** | Bounce / distrust / policy review |
| Wrong support phone | **High** | Failed contact / brand damage |
| Dual authority drift | **Medium–High** | Recurring regressions |
| Fake legal links | **High** (compliance) | Ads / store / legal exposure |
| Platform pages without footer | **Medium** | Incomplete FOOTER_AUTHORITY |
| Small nav taps | **Low–Medium** | Mobile usability friction |

**Production / Ads:** remains **NOT_AUTHORIZED / NO-GO** until at least F01–F05 triaged.

---

## 13. Browser Evidence Index

| # | Asset | Path |
|---|---|---|
| 1 | Section 11 full @390 | `screenshot/Mobile-screenshot/phase-b2-7-section11/01-section-11-full-390.png` |
| 2 | Footer close-up (nav) @390 | `.../02-footer-closeup-390.png` |
| 3 | Contact / social @390 | `.../03-contact-social-390.png` |
| 4 | Transition S10 → S11 @390 | `.../04-transition-s10-s11-390.png` |
| 5 | Desktop safety @1280 | `.../05-desktop-safety-1280.png` |
| 6 | Footer nav columns evidence | `.../06-footer-nav-columns-390.png` |
| — | DOM link audit | `.../dom-audit.json` |
| — | Placeholder summary | `.../placeholder-summary.json` |

Runtime: local Next dev `:3001` · `main` @ `e971ecb` · footer scroll height ≈ **1450px** @390.

---

## 14. Final Decision

```text
SECTION_11_AUDIT: COMPLETE

FOOTER_AUTHORITY: PARTIAL

SECTION_11_IMPLEMENTATION: NOT_AUTHORIZED

SECTION_11_STATUS: AUDITED_PENDING_SA_TRIAGE

SECTION_4: UNCHANGED
SECTION_5: UNCHANGED
SECTION_6: UNCHANGED
SECTION_7: UNCHANGED
SECTION_8: UNCHANGED
SECTION_9: UNCHANGED
SECTION_10: UNCHANGED

PRODUCTION: NOT_AUTHORIZED
ADS: NO-GO
DESKTOP: DEFERRED
```

### FOOTER_AUTHORITY rationale (short)

**PARTIAL** — Section 11 is the best current homepage footer pattern and the natural candidate for FOOTER COMPONENT AUTHORITY, but content dual-source, dead links, contact inconsistency, and absence on platform pages prevent a clean **YES** freeze.

### Next step (roadmap)

```text
Section 11 Audit  ← YOU ARE HERE (complete)
        │
        ▼
SA Scope Lock
        │
        ▼
Section 11 Limited Implementation
        │
        ▼
SA Visual Review
        │
        ▼
Freeze Section 11
        │
        ▼
Phase B3 — Design Authority Registry v1
        │
        ▼
Cross-Section Consistency Review
        │
        ▼
Production Readiness Review
        │
        ▼
Desktop / Tablet Phase
```

---

## STOP

**Wait for SA Scope Lock** before any Section 11 source modification.
