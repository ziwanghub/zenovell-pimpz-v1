# Section 2 — Mobile Trust Flow Production Polish

**Date:** 2026-07-18  
**Branch:** `ui/section-2-mobile-trust-production-polish`  
**Base:** `main` (post PR #18)  
**Mode:** LIMITED · LOCKED SCOPE · NO REDESIGN · EVIDENCE FIRST  
**Merge:** NO · **Deploy:** NO  

---

## 1. Executive Summary

Section 2 was converted from a **collapsed developer inspection surface** into an always-visible **Trust Builder**.

| Goal | Result |
|---|---|
| Remove collapsible control | **DONE** |
| Always-visible trust content | **DONE** |
| Remove “SECTION 2” badge | **DONE** |
| Remove product illustration | **DONE** |
| Preserve trust copy / cards / CTA | **DONE** |
| Preserve LINE analytics surface | **DONE** (`trust-line` / `high_intent` / `trust-bar`) |
| Sections 1, 3–11, Header, Footer | **UNCHANGED** |

```text
SECTION_2_IMPLEMENTATION: COMPLETE
READY_FOR_SA_VISUAL_REVIEW: YES
```

---

## 2. SA Decision (implemented)

```text
SECTION_2_COLLAPSIBLE: REMOVE
SECTION_2_ALWAYS_EXPANDED: APPROVED
SECTION_2_DEVELOPER_BADGE: REMOVE
SECTION_2_PRODUCT_IMAGE: REMOVE
SECTION_2_ROLE: TRUST_BUILDER
CHANGE_CLASS: LIMITED_PRODUCTION_POLISH
```

---

## 3. Before-State Problems

1. **Content started collapsed** (`useState(false)`) — users had to click “SECTION 2” to see trust.  
2. **Developer badge** was the only visible chrome until expand.  
3. **Product illustration** (`bg-trust-section2.jpeg`) repeated product storytelling after Hero/S3.  
4. Collapsible state forced a client component for UI that is not conversion logic.  
5. Section 2 was longer than needed as a Trust Builder, delaying Section 3.

---

## 4. Root Cause

| Concern | Implementation |
|---|---|
| Collapse | **Local only** in `section-2-trust-bar.tsx` — not shared SectionBadge |
| Badge | Custom pink pill button using `content.sectionLabel` |
| Image | Local `ProductArtwork` + `content.artwork` |
| Client component | Required for `useState` collapse **and** LINE CTA (`activateLineCta`) |

Shared-surface risk: **none** for badge (not using shared `SectionBadge` consumers).  
Image consumer count for `bg-trust-section2.jpeg`: **Section 2 only** (file preserved).

---

## 5. Files Changed

| File | Change |
|---|---|
| `sections/section-2-trust-bar/section-2-trust-bar.tsx` | Always render trust stack; remove collapse/image; spacing rebalance |
| `content/section-2-trust-bar.ts` | Drop `artwork`; optional unused `sectionLabel` |
| `docs/reports/phase-b3/SECTION-2-MOBILE-TRUST-PRODUCTION-POLISH.md` | This report |

---

## 6. Collapsible Removal

Removed:

- `useState` expanded state  
- Toggle button  
- `aria-expanded` / `aria-controls`  
- Conditional `{isExpanded ? … : null}`  
- `SECTION_2_COLLAPSIBLE_CONTENT_ID`  

Content now mounts in normal document order on first paint — no flash of empty trust.

---

## 7. Development Badge Removal

- No “SECTION 2” button  
- No replacement badge (PRIVACY / TRUST / etc.)  
- Real `h2` heading remains the only section title  

---

## 8. Image Removal

- Removed `ProductArtwork` component and `next/image` import  
- Removed `content.artwork`  
- Network audit: **0** requests to `bg-trust-section2.jpeg`  
- Physical file: **`public/images/section-2/bg-trust-section2.jpeg` PRESERVED** (safe default)

```text
IMAGE_ASSET_FILE: PRESERVED
```

---

## 9. Layout and Spacing Rebalance

- Compact top padding (`pt-6` / desktop `pt-8`) without badge block  
- Heading + description always visible (including ≥1280; previously desktop-hidden)  
- Trust card max-width on large screens (`max-w-[920px]`) to avoid over-stretch  
- CTA max-width (`max-w-[520px]`) for balanced desktop  
- Removed image-only vertical gap  
- Micro-trust row retained  

Visual order:

```text
Heading → Description → Trust cards → Statement → LINE CTA → Micro-trust → Section 3
```

---

## 10. Accessibility Results

| Check | Result |
|---|---|
| No obsolete aria-expanded/controls | Pass |
| Trust content always in DOM | Pass |
| Heading order (`h2`) | Pass |
| Section `aria-label` Thai | Pass |
| CTA keyboard accessible | Pass |
| Image alt removed with image | Pass |
| No orphan collapsible IDs | Pass |

```text
ACCESSIBILITY: PASS
```

---

## 11. CTA and Analytics Protection

```text
surface: trust-line
source: trust-bar
intent: high_intent
destination: LINE_OA_URL (https://lin.ee/syjmYE2)
```

- CTA wording unchanged: `ปรึกษาผู้เชี่ยวชาญผ่าน LINE`  
- Analytics schema: **UNCHANGED**  
- Runtime fire not instrumented in this evidence pass (activation path unchanged)

```text
SECTION_2_CTA: PASS
LINE: PASS
ANALYTICS_SCHEMA: UNCHANGED
ANALYTICS_RUNTIME: NOT_OBSERVED
```

---

## 12. Performance / DOM Observations

| Observation | Value |
|---|---|
| Section 2 height @390 (after) | **~516px** |
| Image requests (section) | **0** |
| Collapse state | **Removed** |
| Client component still required | **Yes** (LINE CTA only) |
| Unsupported claims | None (no Lighthouse run) |

Previous collapsed empty state was ~badge-only height; expanded state previously included large artwork (~1400px-class asset). Avoided transfer of that image on homepage.

---

## 13. Browser Matrix

Runtime: `next start` :3002 · production build.

| Viewport | Result |
|---|---|
| 375 | PASS · no badge · no image · no h-scroll |
| 390 | PASS · primary evidence |
| 430 | PASS |
| 768 | PASS · adaptive |
| 1280 | PASS · heading + CTA + cards · no empty image column |

One console 404 observed (unrelated resource; **not** trust image).

---

## 14. Regression Results

| Surface | Result |
|---|---|
| Section 1 Hero source | UNCHANGED |
| Section 3 source | UNCHANGED |
| Sections 4–11 source | UNCHANGED |
| Global Header Drawer | UNCHANGED |
| Footer | UNCHANGED |
| site-navigation / active-section map | UNCHANGED (S2 not a drawer item) |
| lint / typecheck / build | **PASS** |

---

## 15. Before / After Evidence

After directory:

`screenshot/Mobile-screenshot/section-2-production-polish/`

| # | File |
|---|---|
| 1 | `01-s1-s2-transition-390.png` |
| 2 | `02-section-2-full-390.png` |
| 3 | `03-trust-cards-390.png` |
| 4 | `04-cta-reassurance-390.png` |
| 5 | `05-s2-s3-transition-390.png` |
| 6 | `06-section-2-full-375.png` |
| 7 | `07-section-2-full-430.png` |
| 8 | `08-section-2-adaptive-768.png` |
| 9 | `09-section-2-desktop-1280.png` |
| — | `audit-390.json` · `functional.json` |

---

## 16. Deferred Items

- Physical deletion of `bg-trust-section2.jpeg` (optional cleanup)  
- Removing residual English chips elsewhere  
- Hiding “SECTION N” badges on other sections (separate SA scope)  
- Production Readiness Review (next program phase after merge)

---

## 17. Final Recommendation

**Approve SA Visual Review → merge → integrated mobile regression → Production Readiness Review.**

Section 2 now reads as a short Trust Builder and advances Section 3 sooner without redesigning the funnel.

---

## FINAL STATUS

```text
SECTION_2_IMPLEMENTATION: COMPLETE

SECTION_2_COLLAPSIBLE: REMOVED

SECTION_2_ALWAYS_VISIBLE: PASS

SECTION_2_BADGE: REMOVED

SECTION_2_PRODUCT_IMAGE: REMOVED

IMAGE_ASSET_FILE: PRESERVED

TRUST_CONTENT: UNCHANGED

TRUST_CARDS: PASS

SECTION_2_CTA: PASS

LINE: PASS

ANALYTICS_SCHEMA: UNCHANGED

ANALYTICS_RUNTIME: NOT_OBSERVED

ACCESSIBILITY: PASS

MOBILE_375: PASS

MOBILE_390: PASS

MOBILE_430: PASS

ADAPTIVE_SAFETY: PASS

DESKTOP_SAFETY: PASS

SECTION_1: UNCHANGED

SECTION_3: UNCHANGED

SECTIONS_4_TO_11: UNCHANGED

GLOBAL_HEADER_DRAWER: UNCHANGED

FOOTER: UNCHANGED

STATIC_VALIDATION: PASS

BROWSER_VALIDATION: PASS

READY_FOR_SA_VISUAL_REVIEW: YES

MERGE: NO

DEPLOY: NO

PRODUCTION: NOT_AUTHORIZED

ADS: NO-GO
```

---

## STOP

**Wait for SA Visual Review.**
