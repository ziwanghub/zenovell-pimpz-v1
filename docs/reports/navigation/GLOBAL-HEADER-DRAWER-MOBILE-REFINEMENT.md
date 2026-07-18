# Global Header Drawer — Mobile-First Navigation Refinement

**Date:** 2026-07-18  
**Branch:** `ui/global-header-drawer-mobile-refinement`  
**Base:** `main` @ `e971ecb`  
**Mode:** LIMITED IMPLEMENTATION · MOBILE FIRST · NO REDESIGN OF GLOBAL HEADER  
**PR:** (opened with this commit)

---

## 1. Executive Summary

Mobile drawer navigation was upgraded from a flat equal-weight link list to a **location-aware, hierarchical drawer** with:

1. Active section detection (`IntersectionObserver` + pathname heuristics)
2. “คุณกำลังดู / {label}” context strip
3. Primary nav only in the scroll region (heading **เมนูหลัก**)
4. Persistent bottom LINE actions (primary order + secondary consult)
5. Restrained active visual state + `aria-current="location"`
6. Improved body scroll lock / unlock with position restore
7. Hash navigation offset for sticky header

| Metric | Result |
|---|---|
| Static validation (lint / typecheck / build) | **PASS** |
| Active section (hero / S4 / reviews / FAQ / footer / product) | **PASS** |
| Location display | **PASS** |
| Hierarchy (nav ≠ LINE) | **PASS** |
| Sticky LINE actions on 375×667 | **PASS** |
| Body scroll lock cleanup | **PASS** |
| Analytics schema | **UNCHANGED** |
| Footer / Sections 4–11 source | **UNCHANGED** |

```text
GLOBAL_HEADER_DRAWER_IMPLEMENTATION: COMPLETE
READY_FOR_SA_VISUAL_REVIEW: YES
MERGE: NO
DEPLOY: NO
```

---

## 2. Before-State Problems

Evidence: `screenshot/Mobile-screenshot/01-header-menu/01-header-menu-list-ไม่ผ่าน.png`

| Problem | Impact |
|---|---|
| No active item / location awareness | User cannot tell which section they are in |
| Flat list mixed nav + LINE CTAs | Conversion and navigation compete |
| Dual LINE items same weight | Drawer length without hierarchy |
| CTAs at end of long scroll | Short viewports must scroll to convert |
| All items same pill CTA styling | No information hierarchy |

SA baseline score (qualitative): **~6.8/10** for mobile navigation.

---

## 3. UX Decision

| Decision | Choice |
|---|---|
| Redesign header chrome? | **No** — drawer panel only |
| Active detection | IntersectionObserver homepage + pathname routes |
| Location UI | Compact “คุณกำลังดู” block (not a large card) |
| LINE placement | Sticky footer of drawer with safe-area |
| Primary LINE copy (presentation) | `สั่งซื้อผ่าน LINE` |
| Secondary LINE copy (presentation) | `ปรึกษาทีมงาน` |
| Canonical nav labels | **Unchanged** in `site-navigation.ts` |
| Active color | Slim pink bar + tinted bg — not full pink pill |

---

## 4. Information Architecture

```text
Drawer Header (brand + close)
        ↓
Current Location Context  →  คุณกำลังดู / {active label}
        ↓
Scrollable Primary Navigation
  h2 เมนูหลัก
  - หน้าแรก
  - สินค้าทั้งหมด
  - เกี่ยวกับเรา
  - รีวิวลูกค้า
  - คำถามที่พบบ่อย
  - วิธีการสั่งซื้อ
  - ติดต่อเรา
        ↓
Persistent Bottom Action Area  (safe-area-inset-bottom)
  ต้องการคำแนะนำ?
  [ สั่งซื้อผ่าน LINE ]   primary
  [ ปรึกษาทีมงาน ]         secondary
```

---

## 5. Active-Section Architecture

### Mapping (homepage)

| Section ID | Nav id | Label |
|---|---|---|
| `hero` | `home` | หน้าแรก |
| `section-4-product-catalog` | `catalog` | สินค้าทั้งหมด |
| `section-5-why-choose-us` | `about` | เกี่ยวกับเรา |
| `section-6-how-to-order` | `ordering` | วิธีการสั่งซื้อ |
| `section-8-reviews` | `reviews` | รีวิวลูกค้า |
| `section-9-faq` | `faq` | คำถามที่พบบ่อย |
| `section-11-footer` | `contact` | ติดต่อเรา |

### Routes

| Path | Active |
|---|---|
| `/products/*` | สินค้าทั้งหมด |
| `/information/*` | ติดต่อเรา |
| `/knowledge/*` | สินค้าทั้งหมด (closest available primary item) |

### Implementation

- Hook: `lib/navigation/use-active-section.ts`
- Observer `rootMargin: -20% 0px -55% 0px` (band below sticky header)
- One active item; `aria-current="location"`
- No history rewrites; no assertive live region

---

## 6. Files Changed

| File | Role |
|---|---|
| `components/layout/global-header.tsx` | Drawer IA, sticky LINE, active styles, focus/lock/hash |
| `lib/navigation/use-active-section.ts` | **New** active-section hook |
| `docs/reports/navigation/GLOBAL-HEADER-DRAWER-MOBILE-REFINEMENT.md` | This report |

**Unchanged:** `content/site-navigation.ts`, footer, sections 4–11, analytics schema, packages.

---

## 7. Analytics Protection

| Surface | Behavior |
|---|---|
| Menu open | `menu_open` · surface header |
| Drawer close | `drawer_close` · surface header (single track; close button no longer double-fires) |
| Primary nav | `navigation_click` · surface drawer |
| LINE order | `navigation_click` + `activateLineCta` surface **`drawer-line-order`** · intent **`high_intent`** |
| LINE consult | `navigation_click` + `activateLineCta` surface **`drawer-consulting`** · intent **`inquiry`** |
| Header bar CTA | unchanged · `header-line` |

```text
ANALYTICS_SCHEMA: UNCHANGED
LINE URL: https://lin.ee/syjmYE2
```

---

## 8. Accessibility Review

| Check | Result |
|---|---|
| `role="dialog"` + `aria-modal="true"` | Pass |
| `aria-labelledby` → drawer title | Pass |
| Nav labelled via `เมนูหลัก` heading | Pass |
| Close aria-label Thai | Pass |
| `aria-current="location"` on active | Pass (browser evidence) |
| Touch targets primary ≥ 44px | Pass (measured 44) |
| LINE primary min-h-12 | Pass |
| Focus trap Tab cycle | Pass (existing + extended) |
| Escape closes | Pass |
| Focus returns to menu trigger | Pass |
| No assertive live region on scroll | Pass |

---

## 9. Browser Matrix

Runtime: `next start` :3002 · production build after impl.

| Viewport | Scenario | Result |
|---|---|---|
| 390×844 | Hero / S4 / Reviews / FAQ / Footer | Active + location correct |
| 375×667 | Bottom CTA visible without nav scroll for short list | Pass |
| 430×932 | Drawer layout | Pass |
| 768×1024 | Drawer still available (&lt;1280) | Pass |
| 390 | Product route | Active = สินค้าทั้งหมด |

Body lock while open: `position: fixed` + `overflow: hidden`.  
After Escape: styles cleared.

---

## 10. Regression Results

| Surface | Result |
|---|---|
| Desktop header (≥1280 nav) | Unchanged structure · optional active text emphasis only |
| Header LINE CTA outside drawer | Unchanged |
| Footer navigation | Unchanged (no site-navigation edits) |
| Sections 4–11 source | Unchanged |
| LINE OA URL | Unchanged |
| Analytics schema / event names | Unchanged |
| lint | PASS |
| typecheck | PASS |
| build | PASS |

---

## 11. Before / After Evidence

### Before

`screenshot/Mobile-screenshot/01-header-menu/01-header-menu-list-ไม่ผ่าน.png`

### After

Directory: `screenshot/Mobile-screenshot/01-header-menu/drawer-refinement-after/`

| # | File |
|---|---|
| 1 | `01-drawer-hero-390.png` |
| 2 | `02-drawer-section4-390.png` |
| 3 | `03-drawer-reviews-390.png` |
| 4 | `04-drawer-faq-390.png` |
| 5 | `05-drawer-footer-390.png` |
| 6 | `06-drawer-375x667-bottom-cta.png` |
| 7 | `07-drawer-430.png` |
| 8 | `08-drawer-768.png` |
| 9 | `09-active-state-closeup-390.png` |
| 10 | `10-drawer-product-route-390.png` |
| 11 | `11-keyboard-focus-390.png` |
| — | `audit.json` |

---

## 12. Known Limitations

1. Section 10 has no dedicated primary nav item (falls through to nearest observer section).  
2. Section 7 not mapped to a primary drawer item (by SA mapping list).  
3. Knowledge routes map to “สินค้าทั้งหมด” as closest available primary item (no articles drawer item).  
4. Desktop mega-menu not in scope.  
5. Active state does not use a live region (by design).  
6. Hash scroll offset uses fixed `72px` constant aligned with header; extreme safe-area devices may need future token.

---

## 13. Recommendation

**Recommend SA Visual Review → approve → merge** before final Section 11 freeze/closeout, because Global Header Drawer is a shared surface that affects the whole mobile funnel.

### SA Visual Checklist

- [ ] Location strip clarity  
- [ ] Active item restraint (not competing with pink CTA)  
- [ ] Sticky LINE hierarchy (order vs consult)  
- [ ] 375×667 CTA reachability  
- [ ] No footer/desktop regressions  

---

## FINAL STATUS

```text
GLOBAL_HEADER_DRAWER_IMPLEMENTATION: COMPLETE

MOBILE_NAVIGATION: PASS

ACTIVE_SECTION: PASS

CURRENT_LOCATION_DISPLAY: PASS

NAVIGATION_HIERARCHY: PASS

PERSISTENT_LINE_ACTIONS: PASS

DRAWER_SCROLL: PASS

BODY_SCROLL_LOCK: PASS

FOCUS_MANAGEMENT: PASS

ACCESSIBILITY: PASS

LINE: PASS

ANALYTICS_SCHEMA: UNCHANGED

FOOTER_NAVIGATION: UNCHANGED

SECTIONS_4_TO_11: UNCHANGED

STATIC_VALIDATION: PASS

BROWSER_VALIDATION: PASS

READY_FOR_SA_VISUAL_REVIEW: YES

MERGE: NO

DEPLOY: NO
```

---

## STOP

**Wait for SA Visual Review.**
