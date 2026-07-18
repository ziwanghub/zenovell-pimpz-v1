# Phase B2.5 — Section 9 Limited Implementation

**Date:** 2026-07-18  
**Branch:** `phase-b2-5/section-9-limited-implementation`  
**Base:** `main` @ `e971ecb`  
**Mode:** LOCKED_SCOPE · NO_REDESIGN · EVIDENCE_FIRST  
**Freeze:** **NOT_YET**  

---

## 1. Executive summary

| Goal | Result |
|---|---|
| P0 Canonical LINE CTA href | **DONE** — `LINE_OA_URL` on support + final |
| P1 Analytics dual-event review | **LEGACY** — removed `SUPPORT_CTA_CLICK` dual-fire; conversion = `line_cta_click` only |
| P1 Answer panel density | **DONE** — mini shield + text-first; no 88px column |
| P1 Support heading weight | **DONE** — 15–16px semibold (was 18 extrabold) |
| P1 FAQ authority alignment | **PASS** — chevron disclosure, animated panel, product-like spacing/type |
| ADR-005 | **CREATED · ACCEPTED** |

```text
SECTION_9_IMPLEMENTATION: COMPLETE
SECTION_9_BROWSER: PASS
SECTION_9_LINE_CTA: PASS
SECTION_9_ANALYTICS: PASS
DUAL_EVENT_REVIEW: LEGACY
ADR-005: CREATED
FAQ_AUTHORITY_ALIGNMENT: PASS
READY_FOR_SA_VISUAL_REVIEW: YES
SECTION_9_FREEZE: NOT_YET
```

---

## 2. Files changed

| File | Role |
|---|---|
| `sections/section-9-faq/section-9-faq.tsx` | CTA, density, hierarchy, accordion language |
| `docs/architecture/ADR-005-FAQ-COMPONENT-AUTHORITY.md` | FAQ Design Authority |
| `docs/reports/phase-b2/PHASE-B2-5-SECTION-9-IMPLEMENTATION.md` | This report |

**Unchanged:** FAQ wording/order (8 items), Sections 4–8/10, Product FAQ source, analytics **schema**, packages.

---

## 3. Authority alignment

Product Detail FAQ is authority (ADR-005). Landing adopted:

- ChevronDown disclosure + rotate  
- Animated `grid-rows` open panel  
- `min-h-14` triggers · `space-y-2.5`  
- Answer `14px` / `leading-[1.55]` / `text-white/78`  
- Reduced decorative density (mini shield vs 88px column)  

Landing **preserved:** 8 questions, funnel order, support CTA, final solid CTA, brand Q badge (lighter).

---

## 4. ADR-005

**Path:** `docs/architecture/ADR-005-FAQ-COMPONENT-AUTHORITY.md`  
**Status:** ACCEPTED  
**Decision:** Product Detail FAQ = FAQ Design Authority for accordion language; landing may keep conversion composition.

---

## 5. Analytics dual-event assessment

| Event | Role | Decision |
|---|---|---|
| `faq_expand` / `faq_collapse` | Business UX accordion | **KEEP** |
| `support_cta_click` on FAQ CTAs | Legacy dual-fire alongside LINE | **REMOVED (client fire)** |
| `line_cta_click` via `activateLineCta` | Canonical conversion | **KEEP** |

**Verdict:** `DUAL_EVENT_REVIEW: LEGACY`  
Schema unchanged. Surfaces: support **`faq-support-line`**, final **`faq-line`**.

---

## 6. Functional CTA evidence

### Support CTA

```json
{
  "event": "line_cta_click",
  "cta_location": "faq-support-line",
  "destination": "line_oa",
  "link_url": "https://lin.ee/syjmYE2",
  "source": "faq-support",
  "intent": "inquiry"
}
```

### Final CTA

```json
{
  "event": "line_cta_click",
  "cta_location": "faq-line",
  "intent": "high_intent",
  "source": "faq",
  "link_url": "https://lin.ee/syjmYE2"
}
```

`window.open` → `https://lin.ee/syjmYE2` for both. Single-open accordion verified.

File: `screenshot/Mobile-screenshot/phase-b2-5-implementation/cta-analytics.json`

---

## 7. Before / after

| Check | Before | After |
|---|---|---|
| CTA href | `#line-primary` | `https://lin.ee/syjmYE2` |
| Support surface | `support-line` + dual track | **`faq-support-line`** only line_cta |
| Answer layout | 88px shield column | mini icon + text |
| Support title | 18px extrabold | **15–16px** semibold |
| Disclosure | Plus/Minus instant | Chevron + animated panel |
| Section H @390 | ~1177 | **~1146** |
| FAQ items / order | 8 | **8 unchanged** |

---

## 8. Browser matrix

| Viewport | Items | Btn H | Ans FS | Support FS | Support CTA | Final CTA | Overflow |
|---|---:|---:|---|---|---:|---:|---|
| 375 | 8 | 69 | 14px | 15px | 44 / LINE | 56 / LINE | no |
| 390 | 8 | 69 | 14px | 16px | 44 / LINE | 56 / LINE | no |
| 430 | 8 | 64 | 14px | 16px | 44 / LINE | 56 / LINE | no |
| 1280 | 8 | 64 | 14px | 16px | 44 / LINE | 56 / LINE | no |

lint / typecheck / build: **PASS**

---

## 9. Regression

| Surface | Result |
|---|---|
| Sections 4–8 / 10 source | **UNCHANGED** |
| FAQ wording & order | **UNCHANGED** |
| Analytics schema names | **UNCHANGED** |
| Product FAQ component | **UNCHANGED** |
| Final CTA stronger than support | **PASS** (56 vs 44 solid pink) |

---

## 10. Evidence

`screenshot/Mobile-screenshot/phase-b2-5-implementation/`

1. `s9-full-390.png`  
2. `s9-expanded-closeup-390.png`  
3. `s9-support-cta-390.png` / transition crop  
4. `s8-to-s9-390.png`  
5. `s9-to-s10-390.png`  
6. `s9-desktop-1280.png`  
+ `cta-analytics.json` · `impl-metrics.json`

---

## 11. Known risks

- FAQ_EXPAND still fires without GTM adapter if GTM ID missing (pre-existing adapter gate).  
- Product FAQ still cannot fully collapse (out of scope; authority surface residual).  
- Content claim “ไม่มี…ผลข้างเคียง” unchanged (legal/content FUTURE from audit).  

---

## 12. Recommendation

```text
READY_FOR_SA_VISUAL_REVIEW: YES
→ SA PASS → merge → freeze Section 9
→ Phase B2.6 Section 10 Mobile UX Audit
```

**STOP** — no freeze/merge/deploy without SA Visual Review.
