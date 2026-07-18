# Phase B2.4 — Section 8 Limited Implementation

**Date:** 2026-07-18  
**Branch:** `phase-b2-4/section-8-limited-implementation`  
**Base:** `main` @ `e971ecb`  
**Mode:** LOCKED_SCOPE · NO_REDESIGN · EVIDENCE_FIRST  
**Freeze:** **NOT_YET** — awaiting SA Visual Review  

---

## 1. Executive summary

Implemented SA-approved Section 8 scope only:

| Item | Result |
|---|---|
| P0 B2.4-F01 Secondary LINE CTA fix | **DONE** — `LINE_OA_URL` + `activateLineCta` surface `reviews-more-line` |
| P1 B2.4-F03 Secondary vs final hierarchy | **DONE** — secondary de-emphasized; final solid remains strongest |
| P1 B2.4-F02 Badge content safety | **UNCHANGED** — no evidence-safe alternatives in content authority |
| P1 SA-01 Product Review authority alignment | **PARTIAL/PASS** — local card/metadata/star/disclaimer language aligned; homepage conversion composition retained |
| ADR-004 Review Component Authority | **CREATED · ACCEPTED** |

```text
SECTION_8_IMPLEMENTATION: COMPLETE
SECTION_8_BROWSER: PASS
SECTION_8_SECONDARY_LINE_CTA: PASS
SECTION_8_ANALYTICS: PASS
REVIEW_AUTHORITY_ADR: CREATED
PRODUCT_REVIEW_AUTHORITY_ALIGNMENT: PASS
READY_FOR_SA_VISUAL_REVIEW: YES
SECTION_8_FREEZE: NOT_YET
```

---

## 2. Repository baseline

| Item | Value |
|---|---|
| MAIN_HEAD base | `e971ecb` |
| Product authority route | `/products/nicky-pimpz-boss` → `ProductReviews` |
| Landing consumer | `sections/section-8-reviews/section-8-reviews.tsx` |
| CTA helper | `lib/commerce/cta-activation.ts` → `activateLineCta` |
| LINE OA | `https://lin.ee/syjmYE2` |

---

## 3. Files changed

| File | Role |
|---|---|
| `sections/section-8-reviews/section-8-reviews.tsx` | Functional CTA fix, hierarchy, authority alignment (local) |
| `content/section-8-reviews.ts` | Document LINE destinations on content fields (badges unchanged) |
| `docs/architecture/ADR-004-REVIEW-COMPONENT-AUTHORITY.md` | Design authority ADR |
| `docs/reports/phase-b2/PHASE-B2-4-SECTION-8-IMPLEMENTATION.md` | This report |

**Not modified:** Sections 4–7, 9, Product Detail `ProductReviews`, Header/Drawer/Footer, analytics schema, shared UI packages.

---

## 4. ADR created

**Path:** `docs/architecture/ADR-004-REVIEW-COMPONENT-AUTHORITY.md`  
**Status:** ACCEPTED  

**Decision:** Product Detail Review is the canonical Review Design Authority. Landing Section 8 is a consumer with page-specific conversion composition allowed.

---

## 5. Source inspection

| Surface | Path | Notes |
|---|---|---|
| Landing S8 | `section-8-reviews.tsx` + `content/section-8-reviews.ts` | Converted secondary row to LINE orchestration |
| Product reviews | `components/platform/product-reviews.tsx` | Authority: author/date/rating metadata, yellow stars, 13px body, disclaimer |
| CTA | `activateLineCta` / `LINE_OA_URL` | Canonical; no new tracking path |
| Shared review package | **None** | Local implementation preferred |

### Shared-surface assessment

| Shared piece | Action |
|---|---|
| `SectionHeader`, `IconWrapper`, `LineIcon` | Used as-is |
| `ProductReviews` | **Not modified** |
| Analytics event schema | **Unchanged** (`line_cta_click`) |

---

## 6. Authority alignment (SA-01)

| Element | Product authority | Landing after |
|---|---|---|
| Metadata | author → date → rating | name → meta → stars + **N จาก 5 ดาว** + date |
| Stars | yellow ★ | yellow Lucide stars |
| Body | 13px / leading-5 / white~84% | **13px / leading-5 / white/84** |
| Product id | (SKU page context) | product chip retained (neutral border) |
| Disclaimer | average-from-shown-reviews | added local sample disclaimer |
| Score hero / distribution | n/a | **kept** (landing conversion role) |
| Final solid CTA | n/a | **kept** |

**Not copied:** horizontal carousel, wholesale platform shell, product page data model.

---

## 7. Findings implemented

### P0 — B2.4-F01
- `MoreReviewsRow` now uses `href={LINE_OA_URL}`
- `onClick` → `activateLineCta({ surface: "reviews-more-line", intent: "inquiry", source: "reviews", ... })`
- `e.preventDefault()` preserves single handoff (no double navigation)

### P1 — B2.4-F03
- Secondary row: lighter border/bg, 14px title, smaller icon, reduced glow
- Touch height still ~58px (`min-h-11`)
- Final CTA unchanged: solid pink, h-14, surface `reviews-final-line`

### P1 — B2.4-F02
- Inspected content authority: all three cards only declare `purchaseBadge: "ซื้อซ้ำแล้ว"`
- Product Detail reviews have **no** purchase badges
- **No inventable alternative** without fabricating social proof  
- **Badges retained unchanged** · limitation reported

---

## 8. Functional CTA fix + analytics verification

### Runtime secondary click evidence

```json
{
  "event": "line_cta_click",
  "cta_location": "reviews-more-line",
  "destination": "line_oa",
  "page_path": "/",
  "link_url": "https://lin.ee/syjmYE2",
  "source": "reviews",
  "intent": "inquiry"
}
```

- `window.open` → `https://lin.ee/syjmYE2` (`_blank`)  
- Final CTA evidence: `cta_location: "reviews-final-line"`, `intent: "high_intent"`  
- No duplicate open on single click  
- Event schema name remains **`line_cta_click`**  

File: `screenshot/Mobile-screenshot/phase-b2-4-implementation/secondary-cta-analytics.json`

---

## 9. Before / after

| Check | Before | After |
|---|---|---|
| More-reviews href | `#` | `https://lin.ee/syjmYE2` |
| More-reviews analytics | none | `reviews-more-line` / `line_cta_click` |
| Secondary visual weight | competes | quieter outline |
| Final CTA | solid 56 | **unchanged** |
| Score / 1,246 / distribution | present | **unchanged data** |
| Badges | ซื้อซ้ำแล้ว ×3 | **unchanged** (safety) |
| Stars | magenta | yellow (authority) |

---

## 10. Browser matrix

| Viewport | Overflow | Cards | More href LINE | Final solid | S4 outline |
|---|---|---:|---|---|---:|
| 375 | no | 3 | yes | yes | 6 |
| 390 | no | 3 | yes | yes | 6 |
| 430 | no | 3 | yes | yes | 6 |
| 1280 | no | 3 | yes | yes | 6 |

---

## 11. Static validation

| Check | Result |
|---|---|
| lint | PASS |
| typecheck | PASS |
| build | PASS |

---

## 12. Regression check

| Surface | Result |
|---|---|
| Section 4–7 source | **UNCHANGED** |
| Section 9 present | **UNCHANGED** |
| Rating 4.9 / 1,246 / distribution | **UNCHANGED** |
| Review copy order | **UNCHANGED** |
| Final CTA wording/surface | **UNCHANGED** (`reviews-final-line`) |
| Analytics schema | **UNCHANGED** |
| Product Detail Review source | **UNCHANGED** |

---

## 13. Known risks / residuals

- Badges still uniform (content evidence insufficient for diversification).  
- Landing retains distribution + dual CTAs (allowed page composition).  
- Local GTM adapter requires valid `NEXT_PUBLIC_GTM_ID` to push dataLayer (production config already owns this).  

---

## 14. Evidence

`screenshot/Mobile-screenshot/phase-b2-4-implementation/`

| # | File |
|---|---|
| 1 | `s8-full-390.png` |
| 2 | `s8-rating-first-390.png` |
| 3 | `s8-secondary-cta-390.png` |
| 4 | `s8-to-s9-390.png` |
| 5 | `product-review-ref-390.png` |
| 6 | `s8-desktop-1280.png` |
| — | `secondary-cta-analytics.json` · `impl-metrics.json` |

---

## 15. Final decision

```text
SECTION_8_IMPLEMENTATION: COMPLETE
SECTION_8_BROWSER: PASS
SECTION_8_SECONDARY_LINE_CTA: PASS
SECTION_8_ANALYTICS: PASS
REVIEW_AUTHORITY_ADR: CREATED
PRODUCT_REVIEW_AUTHORITY_ALIGNMENT: PASS
SECTION_4: UNCHANGED
SECTION_5: UNCHANGED
SECTION_6: UNCHANGED
SECTION_7: UNCHANGED
SECTION_9: UNCHANGED
FINAL_CTA: UNCHANGED
ANALYTICS_SCHEMA: UNCHANGED
READY_FOR_SA_VISUAL_REVIEW: YES
SECTION_8_FREEZE: NOT_YET
```

**STOP** — do not merge/deploy/freeze until SA Visual Review.
