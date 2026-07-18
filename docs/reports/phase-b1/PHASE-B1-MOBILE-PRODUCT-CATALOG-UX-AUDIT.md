# Phase B1 — Mobile Product Catalog UX Audit

**Document type:** Read-only UX / conversion density audit  
**Date:** 2026-07-18  
**Authority:** Mobile primary 390px · boundary 375 / 430 · desktop 1280 observation only  
**Source:** `main` @ `dcc6d44` (local runtime)  
**Scope:** Section 4 only (+ S3→S4 transition observation)  
**Implementation:** NOT AUTHORIZED by this document  

---

## 1. Executive summary

Section 4 is **functionally solid and brand-consistent**, but on mobile 2-column layout it creates **high cognitive load and conversion competition**. Product imagery is strong; name/benefit/feature chips are dense; every card has its own LINE CTA plus PLP entry points, plus a final section LINE CTA.

| Metric | Count |
|---|---:|
| MUST_FIX | **2** |
| SHOULD_POLISH | **5** |
| ACCEPT | **4** |
| FUTURE | **3** |

**Strongest finding:** Six parallel “สั่งซื้อผ่าน LINE” CTAs in a 2-col grid compete with each other and with image/title PLP links, reducing clear primary path and increasing scroll fatigue.

```text
PHASE_B1: COMPLETE
PHASE_B1_AUDIT: AUDIT_COMPLETE_MUST_FIX_FOUND
PHASE_B1X: AUTHORIZED_WITH_LOCKED_SCOPE
```

### SA triage (final)

| Finding | Original | Final SA decision | Notes |
|---|---|---|---|
| **B1-F01** | MUST_FIX | **APPROVED_LIMITED_HIERARCHY_POLISH** | Keep all 6 product LINE CTAs + final CTA; hierarchy only; no deletion |
| **B1-F02** | MUST_FIX | **APPROVED_MUST_FIX** | Chip readability/density |
| **B1-F03** | SHOULD_POLISH | **DEFERRED** | Re-evaluate after density/hierarchy |
| **B1-F04** | SHOULD_POLISH | **APPROVED_SHOULD_POLISH** | Subtitle wrap/clamp |
| **B1-F05** | SHOULD_POLISH | **DEFERRED_TO_CONTENT_REVIEW** | Not presentation-only |
| **B1-F06** | SHOULD_POLISH | **APPROVED_SHOULD_POLISH** | Trust-strip type |
| **B1-F07** | SHOULD_POLISH | **APPROVED_MUST_FIX** | Card CTA ≥ ~44px |

### Approved MUST_FIX

- B1-F02 Feature-chip readability and density  
- B1-F07 Product card CTA touch-target height  

### Approved limited polish

- B1-F01 CTA hierarchy only (no surface removal)  
- B1-F04 Product subtitle wrapping  
- B1-F06 Trust-strip micro typography  

### Deferred

- B1-F03 Scroll fatigue  
- B1-F05 Male SKU content differentiation  
- NAV-001, TECH-DEBT-POSTCSS-001, header residual, DRAWER_CLOSE, S02 monitor  

### Protected contracts (B1.x)

- `activateLineCta` behavior  
- Surfaces `product-grid-card`, `product-grid-final`  
- Product slug/SKU authority · `/products/[slug]`  
- `https://lin.ee/syjmYE2`  
- Analytics event names/payload schema  
- Header / Drawer / Footer  
- No new packages

---

## 2. Scope and authority

| Item | Value |
|---|---|
| Primary viewport | **390px** |
| Boundary | 375 · 430 |
| Optional safety | 1280 observation only |
| In scope | Section 4 Product Catalog + S3→S4 transition |
| Out of scope | Header/Drawer/Footer redesign, NAV-001, S5–11, desktop redesign, analytics/commerce/routing, deps |

---

## 3. Browser evidence

| Asset | Path |
|---|---|
| Full S4 390 | `screenshot/Mobile-screenshot/phase-b1-section4/b1-s4-full-390.png` |
| Full S4 375 / 430 | `b1-s4-full-375.png`, `b1-s4-full-430.png` |
| First card 390 | `b1-s4-first-card-390.png` |
| Mid catalog 390 | `b1-s4-mid-390.png` |
| End CTA 390 | `b1-s4-end-cta-390.png` |
| S3→S4 transition 390 | `b1-s3-s4-transition-390.png` |

Runtime: local `main@dcc6d44` · Section 4 height ≈ **1569px** at 390 (catalog-only segment).

---

## 4. Section architecture map

```text
SectionHeader (SECTION 4 / heading / subtitle)
  ↓
ul.grid grid-cols-2  [md:3] [min-1280:3 horizontal cards]
  └── ProductCatalogCard × 6
        ├── Link → /products/{slug}  (image + badge)
        ├── Link → /products/{slug}  (title)
        ├── subtitle (line-clamp-2)
        ├── features grid-cols-3 (icon + title + sub)
        ├── price sale + original
        └── ProductCardCTA → activateLineCta (product-grid-card)
  ↓
Trust strip (4 items)
  ↓
FinalLineCTA (mobile only, min-1280:hidden) → activateLineCta (product-grid-final)
  ↓
footerNote
```

| Authority | Path |
|---|---|
| UI | `sections/section-4-product-catalog/section-4-product-catalog.tsx` |
| Catalog content mapping | `content/section-4-product-catalog.ts` |
| Product / commerce truth | `content/products.ts` |
| Shared header primitive | `components/ui/section-header.tsx` |
| LINE orchestration | `lib/commerce/cta-activation.ts` · surfaces `product-grid-card` / `product-grid-final` |

---

## 5. Product comparison matrix (390 mobile)

| Product | Image | Name | Benefit | Price | CTA | Card height | Wrapping | Differentiation | Scan |
|---|---|---|---|---|---|---|---|---|---|
| NICKY PIMPZ BOSS | STRONG | STRONG | ACCEPTABLE | STRONG | STRONG | ACCEPTABLE | ACCEPTABLE | STRONG (badge) | **STRONG** |
| BOSS MEN | STRONG | STRONG | ACCEPTABLE | STRONG | STRONG | ACCEPTABLE | ACCEPTABLE | WEAK (vs NPB) | **ACCEPTABLE** |
| BOSS LADY | STRONG | STRONG | WEAK (long sub) | STRONG | STRONG | ACCEPTABLE | WEAK | ACCEPTABLE | **ACCEPTABLE** |
| NP GEL | STRONG | STRONG | ACCEPTABLE | STRONG | STRONG | ACCEPTABLE | ACCEPTABLE | STRONG (form) | **STRONG** |
| NP MEN'S WIPES | STRONG | ACCEPTABLE | WEAK (long sub) | STRONG | STRONG | ACCEPTABLE | WEAK | ACCEPTABLE | **ACCEPTABLE** |
| B21 | STRONG | STRONG | WEAK (generic) | STRONG | STRONG | ACCEPTABLE | ACCEPTABLE | WEAK (similar male energy) | **ACCEPTABLE** |

**Notes:**

- Image quality is consistently premium (strongest asset).  
- Prices 990/990/890/590/390/1190 read clearly with struck originals.  
- Feature chips use 8–9px text → scan cost high at 2-col width.  
- BOSS MEN vs NPB and B21 vs BOSS MEN differentiation is weak for a 6-product wall.

---

## 6. CTA inventory

| # | Surface | Label / control | Destination | Orchestration | Analytics (as coded) | Role | Competition risk |
|---|---|---|---|---|---|---|---|
| 1 | Card image | image link | `/products/{slug}` | Next `Link` | `PRODUCT_CLICK` | Research / PDP | Medium |
| 2 | Card title | product name | `/products/{slug}` | Next `Link` | `PRODUCT_CLICK` | Research / PDP | Medium |
| 3 | Card CTA | e.g. สั่งซื้อผ่าน LINE | `href="#"` + preventDefault | `activateLineCta` surface `product-grid-card` | `PRODUCT_CLICK` then `line_cta_click` via commerce bridge | High-intent LINE | **High** (×6) |
| 4 | Final CTA | ปรึกษาหรือสั่งซื้อผ่าน LINE | `href="#"` + preventDefault | `activateLineCta` surface `product-grid-final` | `PRODUCT_CLICK` + LINE bridge | Section-level LINE | Medium (after long scroll) |
| 5 | Header LINE (context) | ปรึกษาผ่าน LINE | OA | header activation | header events | Global | Always present |

**Competition pattern:** In one viewport, users see **6× card LINE** + **2× PLP entries per card** + **final LINE** + sticky header LINE.

**Analytics note (type 6, not B1.x unless Owner expands):** Card LINE fires `PRODUCT_CLICK` with destination `#` before LINE handoff — naming may confuse Phase E matrix (not a visual defect).

---

## 7. Findings register

### MUST_FIX

#### B1-F01 — Excessive parallel LINE CTAs in catalog grid

| Field | Value |
|---|---|
| ID | **B1-F01** |
| Viewport | 390 (also 375/430) |
| Location | Each ProductCardCTA |
| Type | **4. Conversion issue** |
| Severity | **MUST_FIX** |
| Confidence | **HIGH** |
| Observed | Six identical-weight “สั่งซื้อผ่าน LINE” buttons in 2-col grid |
| Why it matters | Dilutes primary path; increases decision time; competes with final CTA and header |
| Evidence | `b1-s4-full-390.png` |
| Likely root cause | Card template treats LINE as equal primary on every SKU |
| Suggested direction | SA choice: (a) demote card CTA visual weight, (b) primary CTA only on hero SKU + secondary on others, (c) keep LINE but single final CTA more dominant — **do not invent without SA** |
| Protected contracts | Keep `activateLineCta` + product context if product-aware CTA remains |
| Implementation risk | Medium (template change affects all cards) |
| SA decision required | **YES** — conversion hierarchy policy |

#### B1-F02 — Feature-chip density illegible at 2-col mobile width

| Field | Value |
|---|---|
| ID | **B1-F02** |
| Viewport | 375 / 390 / 430 |
| Location | `.grid-cols-3` feature row · `text-[9px]` / `text-[8px]` |
| Type | **2. UX defect** (+ Visual) |
| Severity | **MUST_FIX** |
| Confidence | **HIGH** |
| Observed | Three feature columns per card; Thai labels wrap / micro type |
| Why it matters | Users cannot scan benefits quickly; wastes vertical space without clarity |
| Evidence | First card + full grid screenshots |
| Likely root cause | Desktop-era 3-up chip layout forced into half-width cards |
| Suggested direction | Mobile: 1–2 benefits max, larger type, or icon+one line; restore density at md/1280 if needed |
| Protected contracts | Do not invent product claims; use existing feature copy |
| Implementation risk | Low–medium (layout classes + optional content subset) |
| SA decision required | YES — which benefits to keep per SKU if subset |

### SHOULD_POLISH

#### B1-F03 — 2-column grid increases scroll fatigue for 6 products

| Field | Value |
|---|---|
| ID | B1-F03 |
| Type | **4. Conversion issue** / UX |
| Severity | **SHOULD_POLISH** |
| Confidence | HIGH |
| Observed | S4 ~1569px tall at 390; 3 rows × 2 |
| Why it matters | Long path before final CTA; drop-off risk |
| Suggested direction | Optional: highlight top 3 + “see all”, or alternate layout — **only after hierarchy policy** |

#### B1-F04 — Subtitle truncation / wrapping inconsistency

| Field | Value |
|---|---|
| ID | B1-F04 |
| Type | **2. UX defect** / Content |
| Severity | **SHOULD_POLISH** |
| Confidence | MEDIUM |
| Observed | `line-clamp-2` + long subtitles (BOSS LADY, WIPES) |
| Why it matters | Uneven card text density; truncated meaning |
| Suggested direction | Shorter mobile subtitle in content mapping (content approval) |

#### B1-F05 — Weak SKU differentiation (male energy cluster)

| Field | Value |
|---|---|
| ID | B1-F05 |
| Type | **4. Conversion issue** / Content |
| Severity | **SHOULD_POLISH** |
| Confidence | MEDIUM |
| Observed | NPB / BOSS MEN / B21 similar “พลัง/มั่นใจ” language |
| Why it matters | Comparison paralysis |
| Suggested direction | Positioning line per SKU (content), not UI chrome |

#### B1-F06 — Trust strip microcopy (8–9px)

| Field | Value |
|---|---|
| ID | B1-F06 |
| Type | **2. UX defect** |
| Severity | **SHOULD_POLISH** |
| Confidence | HIGH |
| Observed | Trust titles ~9px, subs ~8px |
| Why it matters | Trust fails to reassure at mobile |
| Suggested direction | Larger type or 2-col trust on mobile |

#### B1-F07 — Card CTA height 40px (h-10) below 44px guideline

| Field | Value |
|---|---|
| ID | B1-F07 |
| Type | **2. UX defect** / a11y |
| Severity | **SHOULD_POLISH** |
| Confidence | HIGH |
| Observed | `h-10` on ProductCardCTA mobile |
| Why it matters | Tap comfort; consistency with a11y guidance |
| Suggested direction | `min-h-11` if hierarchy policy keeps card CTAs |

### ACCEPT

| ID | Item | Why ACCEPT |
|---|---|---|
| B1-A01 | Premium product imagery | Strong brand; do not replace without asset authority |
| B1-A02 | Price hierarchy sale vs original | Clear pink sale / struck original |
| B1-A03 | BEST SELLER badge on NPB | Useful primary cue |
| B1-A04 | Section heading clarity | “สินค้าแนะนำทั้งหมด” readable |

### FUTURE

| ID | Item | Notes |
|---|---|---|
| B1-U01 | Desktop card horizontal layout refinement | Out of mobile B1 |
| B1-U02 | Product order / merchandising experiment | Needs business rules |
| B1-U03 | Analytics rename PRODUCT_CLICK on LINE | Phase E |

---

## 8. Must-fix shortlist

1. **B1-F01** — Conversion hierarchy: too many equal LINE CTAs  
2. **B1-F02** — Feature-chip density / micro-typography on 2-col mobile  

---

## 9. Should-polish shortlist

- B1-F03 Scroll fatigue / density  
- B1-F04 Subtitle wrapping  
- B1-F05 Differentiation copy  
- B1-F06 Trust strip type size  
- B1-F07 Card CTA min height  

---

## 10. Accepted behavior

- 2-col mobile grid as baseline layout pattern (not inherently a FAIL; density *inside* is the issue)  
- Mapping from Product Authority for prices/features  
- Final LINE CTA mobile-only (desktop relies on other surfaces)  
- PLP deep links via image/title  

---

## 11. Deferred items

| Item | Target |
|---|---|
| NAV-001 footer dead links | F2 / pre-Ads |
| Header 40px residual | Monitor |
| DRAWER_CLOSE double analytics | Phase E |
| S02 collapsed conversion | Monitor |
| PostCSS override debt | TECH-DEBT-POSTCSS-001 |

---

## 12. Protected contracts (B1.x must not break)

- `activateLineCta` product path with real slug/sku when product-aware  
- Surfaces `product-grid-card` / `product-grid-final` (unless SA renames with analytics plan)  
- Product slugs and `/products/[slug]`  
- `LINE_OA_URL` / OA destination  
- Product Authority as price/claim source  
- No new packages  
- No Header/Drawer/Footer edits in B1.x  
- No analytics schema redesign  

---

## 13. Recommended maximum implementation surface (proposal only)

| Allowed (if SA approves) | Paths |
|---|---|
| Catalog UI classes / structure | `sections/section-4-product-catalog/section-4-product-catalog.tsx` |
| Optional content mapping tweaks | `content/section-4-product-catalog.ts` only if approved |
| Read-only product data | `content/products.ts` — edit only with content Owner |

**Rollback:** `main` @ `dcc6d44`

**Proposed B1.x acceptance (if opened):**

- 390: feature chips readable without micro 8px reliance  
- Clear primary conversion hierarchy (SA policy documented)  
- No overflow / no shell regression  
- LINE product context retained where product CTA kept  
- lint/typecheck/build PASS  

---

## 14. Final audit decision

```text
AUDIT_COMPLETE_MUST_FIX_FOUND
PHASE_B1: COMPLETE
PHASE_B1X: AUTHORIZED_WITH_LOCKED_SCOPE
```

SA triage complete (see Executive summary).  
**B1.x may implement only approved items.** Deferred findings must not be implemented in B1.x.

---

## 15. Summary counts

| Severity | Count |
|---|---:|
| MUST_FIX | 2 |
| SHOULD_POLISH | 5 |
| ACCEPT | 4 |
| FUTURE | 3 |

**Strongest finding:** B1-F01 multi-CTA competition + B1-F02 feature-chip density on 2-col mobile.

---

**Report status:** DRAFT on disk — **not committed** pending Owner approval.  
**Application source changed:** NONE  
