# Phase B2.7 — Section 11 Limited Implementation

**Date:** 2026-07-18  
**Branch:** `phase-b2-7/section-11-limited-implementation`  
**Base:** `main` @ `e971ecb` (+ cherry-picked audit doc)  
**Mode:** LOCKED_SCOPE · NO_REDESIGN · EVIDENCE_FIRST  
**Freeze:** **NOT_YET**  
**ADR-007:** **NOT_CREATED**  

---

## 1. Executive Summary

Section 11 homepage footer now **consumes canonical site navigation and contacts**, removes dead `href="#"`, wires real product and legal routes, hides unverified social icons, improves touch targets, uses dynamic copyright year, Thai aria-label, and removes the user-facing “SECTION 11” badge.

| Goal | Result |
|---|---|
| P0 Canonical navigation | **DONE** · footer maps `siteNavigationGroups` |
| P0 Product routes | **DONE** · `/products/{slug}` · all HTTP 200 |
| P0 Canonical contacts | **DONE** · `siteContacts` · phone preserved as runtime 092 |
| P0 LINE protection | **DONE** · `https://lin.ee/syjmYE2` + `activateLineCta` |
| P0 Legal destinations | **DONE** · `/information/privacy` · `/information/terms` |
| P1 Social | **DONE** · all unverified → **hidden** |
| P1 Touch targets | **DONE** · nav `min-h-11` (~44px) |
| P1 Copyright year | **DONE** · dynamic `new Date().getFullYear()` → **2026** |
| P1 Thai a11y labels | **DONE** |
| P1 Development badge | **DONE** · removed from production render |
| FOOTER_AUTHORITY | **PARTIAL** (unchanged) |
| ADR-007 | **NOT_CREATED** |

```text
SECTION_11_IMPLEMENTATION: COMPLETE
SECTION_11_BROWSER: PASS
READY_FOR_SA_VISUAL_REVIEW: YES
SECTION_11_FREEZE: NOT_YET
```

---

## 2. Baseline

| Item | Value |
|---|---|
| Pre-impl audit | `PHASE-B2-7-SECTION-11-MOBILE-UX-AUDIT.md` |
| Pre-impl issues | 22/27 dead `#` links · dual phone · dual nav authority · social/legal placeholders · SECTION 11 badge · © 2025 |
| Runtime verify | `next start` :3002 · production build |

---

## 3. Scope Implemented

### P0

| ID | Work |
|---|---|
| P0.1 | Footer nav columns built from `siteNavigationGroups` (footer surface only) |
| P0.2 | All 6 product links → verified Product Authority routes |
| P0.3 | Contacts from `siteContacts`; phone aligned to homepage runtime **092-956-5523** with **PHONE_AUTHORITY: BLOCKED** pending owner confirm |
| P0.4 | LINE uses `LINE_OA_URL` + existing `activateLineCta` surfaces |
| P0.5 | Privacy / Terms → existing information routes |

### P1

| ID | Work |
|---|---|
| P1.1 | Social icons hidden (no verified URLs in repo) |
| P1.2 | Nav links `min-h-11` (~44px measured) |
| P1.3 | Dynamic copyright year |
| P1.4 | Thai footer `aria-label` |
| P1.5 | “SECTION 11” badge not rendered |

### Explicitly not done

- ADR-007 / FOOTER_AUTHORITY freeze  
- Platform page global footer  
- Sections 4–10 edits  
- Social URL invention  
- Legal content rewrite  
- Desktop redesign  
- Merge / deploy / freeze  

---

## 4. Files Changed

| File | Change |
|---|---|
| `content/site-navigation.ts` | Product routes, shipping/payment anchors, privacy/terms routes, LINE contact, footer-line CTA, phone runtime preserve + docs |
| `content/section-11-footer.ts` | Presentation-only content (no nav/contact/social authority) |
| `sections/section-11-footer/section-11-footer.tsx` | Consume canonical sources; a11y/touch/year/badge/social handling |
| `docs/reports/phase-b2/PHASE-B2-7-SECTION-11-IMPLEMENTATION.md` | This report |

**Unchanged application sections:** 4–10 source files not modified.

---

## 5. Canonical Navigation Decision

| Question | Decision |
|---|---|
| Canonical navigation source? | **`content/site-navigation.ts` → `siteNavigationGroups`** |
| Footer ownership? | Presentation + mapping only · **no second nav list** |
| Grouping / visuals? | Preserved 3-column layout · titles from group labels · icons from footer presentation map |

Footer filters items with `visibility.surfaces.includes("footer")`.

---

## 6. Canonical Contact Decision

| Field | Authority | Value |
|---|---|---|
| LINE handle | `siteContacts` | `@zenovell` |
| LINE href | `LINE_OA_URL` / `siteContacts.line` | `https://lin.ee/syjmYE2` |
| Phone | `siteContacts` (runtime-preserved) | `092-956-5523` · `tel:0929565523` |
| Hours | `siteContacts` | `(10:00 - 22:00 น.)` |
| Email | `siteContacts` | `support@zenovell.com` |
| Address | `siteContacts` | บริษัท เซโนเวลล์ จำกัด · กรุงเทพฯ |

---

## 7. Phone Authority Evidence

| Source | Number | Notes |
|---|---|---|
| `siteContacts` pre-B2.7 | `099-124-4289` | Introduced M9.5 · **never rendered in UI** |
| Homepage footer pre-B2.7 | `092-956-5523` | Content update `4de2ed9` · **user-visible** |
| B2.7 single source | `092-956-5523` | Preserved runtime to avoid destructive flip |

```text
PHONE_AUTHORITY: BLOCKED
```

**Owner evidence still required before Ads/Production:**

1. Confirm official support phone with business owner.  
2. If real number is `099-…`, update `siteContacts` only (footer will follow).  
3. If real number is `092-…`, clear BLOCKED status after written confirmation.  

**No external/carrier verification exists in repository.**

---

## 8. Legal Route Status

| Label | Route | Exists? | Browser |
|---|---|---|---|
| ความเป็นส่วนตัว | `/information/privacy` | Yes (`content/information.ts`) | **200** |
| เงื่อนไขการให้บริการ | `/information/terms` | Yes | **200** |

```text
LEGAL_LINKS: PASS
LEGAL_ROUTE_STATUS: PASS
```

Note: legal page **content quality** is out of scope (stubs already existed). Creating policy copy not authorized.

---

## 9. Social Channel Status

| Channel | Verified URL in repo? | Treatment |
|---|---|---|
| Facebook | No (`href: "#"`, `placeholder`) | **Hidden** |
| Instagram | No | **Hidden** |
| TikTok | No | **Hidden** |
| YouTube | No | **Hidden** |

Social card section is omitted when zero verified channels remain.

```text
SOCIAL_LINKS: HIDDEN_UNAVAILABLE
```

---

## 10. Accessibility Changes

| Item | Before | After |
|---|---|---|
| Footer aria-label | `Footer` (EN) | `ส่วนท้ายเว็บไซต์ เมนูและช่องทางติดต่อ` |
| Nav link height | ~17px | **~44px** (`min-h-11`) |
| Contact rows | min-h-11 | preserved |
| Social | 48px (dead) | hidden |
| Articles placeholder | fake link `#` | non-interactive muted text |

---

## 11. Development Badge Treatment

| Decision | Remove from production render |
|---|---|
| Method | Do not render `SectionBadge` · `sectionLabel` omitted |
| Other sections | **Unchanged** (still show SECTION N) · out of scope |

```text
DEVELOPMENT_BADGE: REMOVED
```

---

## 12. Shared-Surface Risk Review

### Consumers of `site-navigation`

| Consumer | Impact |
|---|---|
| `app/page.tsx` header mapper | Drawer still uses same groups; product items are **footer-only** surface → **no header product menu change** |
| Platform page header | Same as above |
| Footer (new) | Primary consumer of groups + contacts + socials |

### Shared changes made

| Change | Surfaces affected | Risk |
|---|---|---|
| Product footer hrefs → `/products/*` | Footer only | Low |
| Privacy/Terms routes | Footer only | Low |
| Shipping/payment anchors fixed | Footer only | Low |
| `siteContacts.phone` 099→092 | Footer (only consumer) | **Documented BLOCKED** · preserves prior homepage UI |
| `siteContacts.line` → `LINE_OA_URL` | Footer | Positive |
| `ctaDestinations.footer-line` → live | If any consumer uses it | Aligns with LINE authority |

### Regression checks (source)

| Surface | Status |
|---|---|
| Sections 4–10 app source | **UNCHANGED** |
| Analytics schema | **UNCHANGED** |
| LINE_OA_URL | **UNCHANGED** |
| Global header structure | Unchanged · drawer still maps from groups |

---

## 13. Browser Matrix

| Viewport | H-scroll | Footer render |
|---|---|---|
| 375 | None | Pass |
| 390 | None | Pass (primary) |
| 430 | None | Pass |
| 1280 | None | Pass (observe only) |

Runtime: `next start` :3002 · production build after impl.

---

## 14. Functional Link Matrix

| Visible label | Source authority | Final destination | Type | Browser | Status |
|---|---|---|---|---|---|
| หน้าแรก | siteNavigation | `#hero` | anchor | present | PASS |
| สินค้าทั้งหมด | siteNavigation | `#section-4-product-catalog` | anchor | present | PASS |
| เกี่ยวกับเรา | siteNavigation | `#section-5-why-choose-us` | anchor | present | PASS |
| รีวิวลูกค้า | siteNavigation | `#section-8-reviews` | anchor | present | PASS |
| คำถามที่พบบ่อย | siteNavigation | `#section-9-faq` | anchor | present | PASS |
| วิธีการสั่งซื้อ | siteNavigation | `#section-6-how-to-order` | anchor | present | PASS |
| บทความ | siteNavigation | — | **non-interactive** | no `<a>` | PASS (safe) |
| ติดต่อเรา | siteNavigation | `#section-11-footer` | anchor | present | PASS |
| Nicky Pimpz Boss | siteNavigation + products | `/products/nicky-pimpz-boss` | route | **200** | PASS |
| Boss Men | siteNavigation + products | `/products/boss-men` | route | **200** | PASS |
| Boss Lady | siteNavigation + products | `/products/boss-lady` | route | **200** | PASS |
| NP Gel | siteNavigation + products | `/products/np-gel` | route | **200** | PASS |
| NP Men's Wipes | siteNavigation + products | `/products/np-mens-wipes` | route | **200** | PASS |
| B21 | siteNavigation + products | `/products/b21` | route | **200** | PASS |
| ให้คำปรึกษา | siteNavigation + LINE_OA | `https://lin.ee/syjmYE2` | line + activateLineCta | href ok | PASS |
| การสั่งซื้อผ่าน LINE | siteNavigation + LINE_OA | `https://lin.ee/syjmYE2` | line + activateLineCta | href ok | PASS |
| การจัดส่ง | siteNavigation | `#section-7-privacy-shipping` | anchor | present | PASS |
| การชำระเงิน | siteNavigation | `#section-11-footer` | anchor | present | PASS |
| ความเป็นส่วนตัว | siteNavigation + information | `/information/privacy` | route | **200** | PASS |
| เงื่อนไขการให้บริการ | siteNavigation + information | `/information/terms` | route | **200** | PASS |
| LINE Official @zenovell | siteContacts + LINE_OA | `https://lin.ee/syjmYE2` | line + activateLineCta | href ok | PASS |
| โทรศัพท์ | siteContacts | `tel:0929565523` | tel | present | PASS (phone BLOCKED confirm) |
| อีเมล | siteContacts | `mailto:support@zenovell.com` | mailto | present | PASS |
| Social ×4 | siteSocialLinks | — | hidden | 0 icons | PASS |

**Dead `href="#"` in Section 11:** **0**

---

## 15. Regression Results

| Check | Result |
|---|---|
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run build` | PASS |
| Product routes 200 | PASS (6/6) |
| Legal routes 200 | PASS (2/2) |
| LINE href preserved | PASS |
| Sections 4–10 source | UNCHANGED |
| Analytics schema | UNCHANGED |
| No h-scroll 375/390/430/1280 | PASS |
| S10 → S11 transition | Intact (screenshot) |

---

## 16. Screenshots and Evidence

| # | Asset |
|---|---|
| 1 | `screenshot/Mobile-screenshot/phase-b2-7-implementation/01-section-11-full-390.png` |
| 2 | `.../02-footer-nav-390.png` |
| 3 | `.../03-contact-line-390.png` |
| 4 | `.../04-legal-copyright-390.png` |
| 5 | `.../05-transition-s10-s11-390.png` |
| 6 | `.../06-section-11-full-430.png` |
| 7 | `.../07-desktop-safety-1280.png` |
| — | `.../dom-audit.json` · `functional.json` |

---

## 17. Known Risks

1. **PHONE_AUTHORITY BLOCKED** — runtime preserved at 092; owner must confirm before Ads.  
2. **Social completely hidden** — less brand presence until official URLs provided.  
3. **Articles** remains non-interactive until Knowledge index route exists.  
4. **Legal pages** are existing stubs — not production legal review.  
5. **FOOTER_AUTHORITY still PARTIAL** — platform pages lack this footer.  
6. Payment link scrolls to footer (payment badges), not a dedicated payment policy page.

---

## 18. Deferred Items

| Item | Defer to |
|---|---|
| Owner phone confirmation | Business / SA |
| Real social URLs | Content ops → re-enable icons |
| Knowledge index for บทความ | Platform routing |
| Global footer on product/knowledge/information | After Freeze S11 + Design Authority Registry |
| ADR-007 Footer Authority | After SA Visual Review + Freeze |
| DESIGN-AUTHORITY-REGISTRY.md | After Freeze S11 |
| Legal copy quality review | Compliance |

### Design Authority note (not a registry)

| Authority | Status |
|---|---|
| Review Authority | ADR-004 |
| FAQ Authority | ADR-005 |
| Primary CTA Authority | ADR-006 |
| Footer Authority | **Pending / Partial** |

---

## 19. Footer Authority Status

```text
FOOTER_AUTHORITY: PARTIAL
ADR-007: NOT_CREATED
```

Homepage footer is the candidate pattern and now uses canonical navigation/contacts, but platform pages are not unified and full cross-route authority is out of phase.

---

## 20. Recommendation for SA Review

**Recommend:** SA Visual Review → approve → merge → beta verify → **Freeze Section 11**.

### SA checklist

- [ ] Confirm visual integrity (no redesign regressions)  
- [ ] Confirm dead-link elimination acceptable  
- [ ] Confirm social hide acceptable  
- [ ] Confirm phone 092 acceptable **or** provide canonical replacement  
- [ ] Confirm legal stubs acceptable for freeze  
- [ ] Approve Freeze readiness  

---

## FINAL STATUS

```text
SECTION_11_IMPLEMENTATION: COMPLETE

SECTION_11_BROWSER: PASS

FOOTER_NAVIGATION: PASS

CANONICAL_CONTACT: PASS

PHONE_AUTHORITY: BLOCKED

LINE: PASS

LEGAL_LINKS: PASS

SOCIAL_LINKS: HIDDEN_UNAVAILABLE

TOUCH_TARGETS: PASS

ACCESSIBILITY: PASS

DEVELOPMENT_BADGE: REMOVED

COPYRIGHT: DYNAMIC

FOOTER_AUTHORITY: PARTIAL

ADR-007: NOT_CREATED

SECTION_4: UNCHANGED
SECTION_5: UNCHANGED
SECTION_6: UNCHANGED
SECTION_7: UNCHANGED
SECTION_8: UNCHANGED
SECTION_9: UNCHANGED
SECTION_10: UNCHANGED

ANALYTICS_SCHEMA: UNCHANGED

READY_FOR_SA_VISUAL_REVIEW: YES

SECTION_11_FREEZE: NOT_YET

PRODUCTION: NOT_AUTHORIZED

ADS: NO-GO
```

---

## STOP

**Wait for SA Visual Review.**  
Do not merge / deploy / freeze from this agent turn.
