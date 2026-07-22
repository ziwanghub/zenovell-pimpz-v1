# PRODUCT-DESKTOP-TABLET-LAYOUT-CONTRACT

**Document ID:** `P-PRODUCT-BP-01`
**Revision tasks:** `P-PRODUCT-BP-03` (v1.1) · `P-PRODUCT-BP-04` (docs freeze) · **`P-PRODUCT-TABLET-02` (v1.2 ADR)**
**Version:** `1.2`
**Date:** `2026-07-22`
**Status:** `SA_APPROVED_ENGINEERING_AUTHORITY` · **TABLET COMPOSITION REVISED (v1.2)**
**Final readiness:** `IMPLEMENTATION_READY`
**Authority freeze:** Product Mobile + Desktop sticky rules remain frozen; **tablet stack band SUPERSEDED**
**Mode:** Translate existing visual + system authority into implementable Desktop/Tablet Product layout
**Runtime change:** Authorized under `P-PRODUCT-TABLET-02` for product route only

```text
NOT A REDESIGN
NOT A NEW DESIGN SYSTEM
HOMEPAGE: UNTOUCHED
PRODUCT MOBILE <768px: FROZEN
HEADER / FOOTER: FROZEN
LINE / ANALYTICS / COMMERCE CONTRACTS: FROZEN (LINE-first)
```

---

## Lifecycle

```text
Draft
  → SA Review
  → Approved
  → Implementation
  → ZZ Visual Review
  → Frozen
  → Maintenance
```

**Current lifecycle state:**

```text
APPROVED → DOCS FROZEN → READY FOR RUNTIME IMPLEMENTATION
```

| Field | Value |
|-------|-------|
| v1.0 | Draft engineering authority (`DOCUMENT_READY_FOR_IMPLEMENTATION`) |
| v1.1 | SA-directed authority corrections (FAQ, reuse, crop, density) |
| v1.1 freeze | `P-PRODUCT-BP-04` — official Engineering Authority before Runtime |
| **v1.2** | **`P-PRODUCT-TABLET-02` ADR — Tablet uses Desktop composition from 768 (no stack, no sticky)** |
| Next | Field re-verification · SA merge gate · Product Freeze |
| Not yet | Product Desktop/Tablet Freeze · Production |

---

## 0. Document Purpose

This contract closes the Desktop/Tablet Product Page engineering gap identified in the Blueprint Engineering Readiness Audit.

It allows a developer to implement the **Product Page** at:

- Tablet `768–1279px`
- Desktop `≥1280px`

to match **composition** of the approved visual prototype **without guessing from the image**, while binding all **content and commerce** to existing ZENOVELL platform authorities.

**Supporting mobile engineering authority (frozen reference only):**
`DESIGN/Products-Blueprint-Design/Blueprint-Products-page.md` and mobile product section blueprints — **do not modify Mobile**.

---

## 1. Authority Map

| Layer | Authority | Role |
|-------|-----------|------|
| **Visual composition (primary)** | `DESIGN/Desktop-Blueprint-Design/desktop-prodects-page/desktop-prodects-page-ต้นแบบ.png` | Module placement, hierarchy, density, gallery/buy balance, info panel, reviews, related, bundle direction, **FAQ placement after Bundle** |
| **Regression / non-goal** | `…/desktop-prodects-page-ไม่ผ่าน.png` | Stretched single-column desktop = fail pattern |
| **Product UX** | `PRODUCT-UX-AUTHORITY.md` | Solution & commerce authority definition |
| **Product engineering** | `PRODUCT-DESIGN-ENGINEERING-BLUEPRINT.md` | Section tree, LINE-first model, component tree |
| **Mobile product engineering** | `Blueprint-Products-page.md` + mobile section blueprints | Frozen mobile baselines only |
| **Section purpose** | `section-blueprints/01–17` | Per-section intent; this doc adds Desktop/Tablet deltas |
| **Global tokens** | `Global-Design-Contract.md` | Color, typeface, radius, spacing scale |
| **Desktop shell numbers** | `DESKTOP-BREAKPOINT-CONTAINER-SHELL-LOCK.md` | Container / gutter ladder **reused as numeric authority** for product route |
| **Product data** | `PROJECTS/ZENOVELL-PIMPZ-V4-Active/content/products.ts` | Real SKU, prices, copy, reviews, FAQ |
| **Commerce / LINE** | `lib/commerce/*` (`activateLineCta`, CTA contract, context) | Only allowed conversion path |
| **Analytics** | Existing analytics events + GTM contracts | Unchanged |
| **Frozen surfaces** | Homepage all viewports · Product mobile · Header · Footer | **DO NOT MODIFY** |
| **Header metrics** | `GlobalHeader` + `globals.css` `--platform-header-offset` | Sticky offset reference (do not restyle header) |

### Visual vs engineering split

| Controls | Owner |
|----------|--------|
| Module placement, visual hierarchy, relative density, gallery/buy balance, info panel, reviews, related, bundle look, **FAQ after Bundle** | **Visual prototype** (`desktop-prodects-page-ต้นแบบ.png`) |
| Exact breakpoints, measurements, sticky, a11y, reuse rules, commerce translation | **This contract** |

### Precedence (conflict resolution)

```text
1. Frozen surface + LINE / analytics / commerce contracts
2. This Layout Contract (Desktop/Tablet Product composition)
3. Visual prototype composition (when numbers unspecified or polish within ±8%)
4. Product UX / section blueprints (content purpose)
5. Existing product runtime patterns (implementation base)
```

If a numeric specification conflicts with the visual target:

1. Preserve frozen contracts first
2. Preserve LINE / platform authority
3. Then use the visual target and document the numeric adjustment during ZZ
4. **Do not redesign independently**

**Forbidden:** inventing cart/checkout, inventing Omega-3 product data, redesigning homepage or product mobile.

---

## 1A. Desktop/Tablet Section Order (locked)

```text
1. Hero / Gallery + Buy Module  (with breadcrumb above)
2. Product Information         (benefits / ingredients / usage tabs)
3. Reviews
4. Related Products
5. Bundle Promotion
6. FAQ                         ← REQUIRED on Desktop + Tablet
7. Footer                      (frozen shared shell)
```

**Mobile `<768`:** existing frozen section order and FAQ behavior remain unchanged by this document.

---

## 1B. Desktop/Tablet Component Reuse Contract

| Surface / Component | Authority | Action |
|---------------------|-----------|--------|
| **Primary LINE CTA** | Existing solid / product CTA pattern + `activateLineCta` | **Reuse or extend** without changing CTA/LINE contract |
| **Secondary LINE CTA** | Existing LINE activation path | **Reuse** with distinct `surface` / intent metadata |
| **FAQ Accordion** | Existing shared product FAQ component (`product-faq` or equivalent) | **Reuse; do not rebuild** |
| **Trust Item / Trust Row** | Homepage/product trust visual vocabulary | **Reuse** pattern where compatible |
| **Product Badge** | Existing badge / token language | **Reuse** |
| **Typography** | Global Design Contract | **Reuse as-is** |
| **Spacing** | Global spacing scale | **Reuse as-is** |
| **Header / Footer** | Frozen shared shell | **Reuse unchanged** |
| **Rating / Review Card** | Existing product or homepage review pattern | **Extend minimally** |
| **Related Product Card** | Existing product-card / related-products authority | **Extend minimally** |
| **Gallery** | Existing `product-gallery` runtime | **Extend** for Desktop/Tablet layout only |
| **Bundle** | Product-page local composition | **Implement from this contract** using existing tokens |
| **Buy module chrome** | Product hero / pricing patterns | Extend layout; no new commerce system |

### Reuse rules

1. **Reuse before creating** new components.
2. Do **not** fork frozen homepage components solely for cosmetic divergence.
3. **Section-local wrappers** allowed for product-route composition.
4. Shared contracts (LINE, analytics, commerce) **must not** be modified without separate authorization.
5. **No duplicated** business copy or second data source for product, FAQ, or prices.

---

## 2. Product Identity Translation

```text
VISUAL_REFERENCE_ONLY = true
```

| Field | Prototype (demo) | Runtime authority (required) |
|-------|------------------|------------------------------|
| Product | Zenovell Omega 3 Fish Oil 1,000 mg | **NICKY PIMPZ BOSS** |
| slug | n/a (demo) | `nicky-pimpz-boss` |
| SKU | n/a | `NPB-001` |
| Sale price | ฿890 (demo) | **`990.-`** from `products.ts` |
| Original price | ฿1,090 (demo) | **`1,290.-`** |
| Promo | ฿200 off (demo) | **`23%` / label from authority** |
| Rating aggregate | 4.9 / 2,847 (demo) | **Derive only from real `reviews[]`** |
| Description | Omega-3 claims (demo) | **`subtitle` + `mechanism` / authority fields only** |
| Ingredients / benefits / usage / FAQ | Omega-3 (demo) | **Nicky arrays in `products.ts` only** |
| Badge | BEST SELLER | **`badge.label`** |
| Gallery subjects | Omega bottle views (demo) | **Nicky packshot authority** (see §6) |
| Related / bundle SKUs | Demo supplements | **Other real products from catalog authority** |

### Rules

1. Do **not** copy Omega-3 title, prices, review counts, ingredients, or health claims into runtime.
2. Do **not** create a new product entity for Omega-3 in this phase.
3. Display strings must come from `loadProductBySlug` / product authority only.
4. Visual prototype guides **placement and rhythm**; engineering contract guides **breakpoints and measurements**.

---

## 3. Commerce Translation Contract

### Platform truth

```text
COMMERCE_MODE = LINE_FIRST
CART_RUNTIME = FORBIDDEN (this phase)
CHECKOUT_RUNTIME = FORBIDDEN
INVENTORY_RUNTIME = FORBIDDEN
QUANTITY_STATE = FORBIDDEN (no cart qty mutation)
```

### Prototype UI → Platform mapping

| Prototype UI | Visual treatment allowed? | Runtime behavior |
|--------------|---------------------------|------------------|
| **Buy now** (solid pink, right) | Yes — primary action position | **Primary LINE order CTA** via `activateLineCta` + product context · label from `product.cta` |
| **Add to cart** (dark/bordered, left) | Yes — secondary action position | **Secondary LINE CTA** — consult/support · same LINE OA · distinct `surface` / intent · **not** cart |
| **Quantity − 1 +** | Optional **display-only** or hide | **No quantity state**, no price multiply |
| **Cart icon** (header) | **Do not add** | Frozen header LINE CTA only |
| **Search** (prototype header) | **Do not add** | Frozen header |
| Trust mini | Yes | Authority-backed trust only — no fake stock/shipping/refund claims |

### CTA token and behavior alignment

| Rule | Spec |
|------|------|
| Styling authority | **Reuse existing platform / Homepage CTA token language** — do not invent independent CTA skin system |
| Height / priority | Preserve **visual priority** from product prototype; primary is strongest |
| Primary | Solid pink platform CTA pattern · order intent · LINE |
| Secondary | Dark bordered / outline platform secondary pattern · consult intent · LINE |
| Analytics / LINE activation | **Unchanged contracts only** |
| Cart / qty / checkout | **Forbidden** |

### CTA layout by viewport

| Viewport | Layout |
|----------|--------|
| Desktop `≥1280` | **Two equal-width** CTA slots when composition matches prototype; gap `12–14px`; height **`52px`** |
| Tablet `900–1279` | Two columns when readable; **stack** if either label truncates or hit target &lt; 44px |
| Tablet `768–899` | **Stacked** or full-width per component fit |
| Mobile `&lt;768` | **FROZEN** — do not change |

### Explicit forbid list

```text
❌ shopping cart store
❌ add-to-cart API
❌ quantity stepper mutating total
❌ buy-now checkout page
❌ stock counters / warehouse inventory
❌ payment gateway
❌ new commerce contracts or analytics event schemas
```

---

## 4. Responsive Layout Contract

### 4.1 Mobile — FROZEN

| Band | Rule |
|------|------|
| **`<768px`** | **FROZEN** — Product Mobile Authority |
| Changes | **Forbidden** unless SA/ZZ critical ticket |
| FAQ | Mobile FAQ **frozen** — content shared; **presentation/layout not altered** by this work |
| This document | **Does not authorize** mobile layout edits |

### 4.2 Tablet — **v1.2 ADR (P-PRODUCT-TABLET-02)**

```text
PREVIOUS (v1.1) — SUPERSEDED
  768–899  Stack (mobile composition)
  900–1279 Compact two-column

CURRENT (v1.2) — APPROVED BY SA FIELD EVIDENCE
  390–767  Mobile (frozen)
  768–1279 Desktop composition · reduced density · NO sticky
  ≥1280    Desktop + Sticky Buy (frozen)
```

**Rationale:** Field evidence (iPad Mini 768×1024, iPad Air 820×1180) showed stack composition wastes portrait ATF — gallery dominates, price/CTA below fold. Tablet has sufficient width for Desktop composition; tablet differs by **density only**, not hierarchy.

| Band | Composition | Grid |
|------|-------------|------|
| **`768–1279px`** | **Desktop composition** (same hierarchy) | Gallery **LEFT** · Buy module **RIGHT** |
| **Sticky** | **None** (see §5) | — |
| **Density** | Reduced vs desktop (type, gap, gallery max-h) | — |

#### Tablet container / gutters

| Viewport | Content max-width | Horizontal gutter (L/R) |
|----------|------------------:|------------------------:|
| `768–819` | `100%` of viewport | `24px` |
| `820–899` | `100%` | `32px` |
| `900–1023` | `100%` | `36px` |
| `1024–1279` | `100%` | `40–48px` progressive |

Outer canvas: `#050505` / panel `#0A0A0A`.
Product route may exit `430px` MobileShell for **tablet/desktop product composition only**.

#### Tablet two-column (`768–1279`) — desktop composition

| Token | Value |
|-------|-------|
| Grid `768–819` | `grid-cols-[minmax(0,0.43fr)_minmax(0,0.57fr)]` · gap `16px` |
| Grid `820–1279` | `grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)]` · gap `20–24px` |
| Gallery / buy | Left / Right · **not sticky** |
| Gallery stage | 1:1 frame; max-h **smaller than desktop** (`min(42–48vh, 320–400px)` progressive) |
| Image fit | **contain** (crop protection) |
| Thumbs | 4-up under stage |
| CTA row | **Desktop dual LINE** (Secondary · Primary) — not mobile single CTA |
| Trust row | **3** cards under CTA (desktop hierarchy) |

### 4.3 Desktop `≥1280px`

| Token | Value |
|-------|-------|
| Activation | `min-width: 1280px` |
| Composition | **Two-column hero** — Gallery LEFT · Buy RIGHT |
| Align | `items-start` |

#### Desktop container ladder

| Viewport | Content max-width | Horizontal gutter |
|----------|------------------:|------------------:|
| `1280` | `1200px` | `40px` |
| `1366–1440` | `1240px` | `48px` |
| `1536–1920` | `1320px` | `56px` |
| Hard cap | **`1320px`** | — |

#### Desktop hero grid

| Token | Value |
|-------|-------|
| Grid | `grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)]` |
| Optional `≥1536` | `0.50 / 0.50` — gallery fr ≤ `0.52` |
| Column gap | `32px` (`1280–1439`) · `40px` (`≥1440`) |
| Above-the-fold goal | Stage + title + price + CTA + trust at `1280×800` when possible |

#### Breadcrumb (desktop/tablet)

- Above hero grid, full content width.
- Muted `12–13px`; Home → Products → **real product title**.

---

## 5. Sticky Contract

| Viewport | Gallery | Buy / info column |
|----------|---------|-------------------|
| `<768` Mobile | Frozen | Frozen |
| `768–1279` Tablet | **Not sticky** | **Not sticky** |
| `≥1280` Desktop | **Not sticky** | **Sticky** |

### Desktop sticky buy column

| Token | Value |
|-------|-------|
| Position | `position: sticky` on buy column only |
| `top` | `calc(var(--platform-header-offset, 74px) + 12px)` ≈ **86px** |
| `z-index` | **`10–20`** — **below** global header |
| Sticky stop | Inside hero two-column wrapper only — **must not** overlay Information / Reviews / Related / Bundle / FAQ |
| Max height | `calc(100vh - top - 16px)`; avoid inner scroll if possible |
| Dual sticky | **Forbidden** |

---

## 6. Gallery Contract

### Layout

| Token | Desktop `≥1280` | Tablet `768–1279` (v1.2) | Mobile `<768` |
|-------|-----------------|--------------------------|---------------|
| Main stage | Left column | Left column (same composition) | Full width stack |
| Aspect ratio | **1:1** stage frame | **1:1** | **1.56** frozen |
| Min / max stage h | `360` / `520` | **smaller** — progressive `240–280` / `320–400` | Frozen mobile |
| Corner radius | `18–22px` | `14–18px` | Frozen |
| Fit | **contain** | **contain** | **cover** frozen |
| Distortion | **Forbidden** | | |

### Crop-protection (product preservation) — required

**Default image-fit priority:**

```text
1. contain  — when full product / packaging must remain visible (DEFAULT for packshots)
2. cover    — only when source image has verified safe crop margins
3. never    — distort, stretch, or crop essential product identity,
              label, packaging, dosage text, or hero subject
```

| Rule | Spec |
|------|------|
| Silhouette & label | Must remain **fully visible** when source aspect ≠ stage |
| Letterboxing | **Acceptable** on dark stage |
| Lifestyle / background plates | `cover` only after **visual verification** |
| Browser validation widths | Main gallery at **`900` / `1024` / `1280` / `1440` / `1920`** |
| Mobile assets / behavior | **Untouched** |

### Thumbnails

| Token | Value |
|-------|-------|
| Count visible | **4** |
| Layout | Row under main stage |
| Size | Desktop `72–88px` · Tablet `64–72px` |
| Gap | `8–12px` |
| Active | **2px** `#E91E8C` border + optional ring |
| Inactive | `1px` `rgba(255,255,255,0.10)` |

### Navigation & a11y

| Control | Spec |
|---------|------|
| Arrows | Overlay stage; hit ≥ `40px` |
| Keyboard | ArrowLeft / ArrowRight when focused |
| Pointer | Thumb sets active index |
| A11y | `aria-label`; thumbs as buttons |

### Asset authority

| Priority | Source |
|----------|--------|
| 1 | Real multi-angle product gallery when available |
| 2 | Fallback: repeat `imageSrc` packshot from `products.ts` |
| 3 | **Forbidden:** Omega-3 demo as production truth |
| 4 | **Forbidden:** changing mobile-frozen asset pipeline |

---

## 7. Buy Module Contract

### Vertical order (locked)

```text
1. Category / eyebrow (authority only — not demo Omega category unless real field)
2. Product title (H1) — NICKY PIMPZ BOSS
3. Format / pack cue (e.g. 30 แคปซูล)
4. Rating row (real reviews only)
5. Price row — sale · original · promo chip
6. Short description (clamp 2–3 lines)
7. Availability cue (truthful only)
8. Quantity treatment — display-only or omit
9. CTA row — Secondary LINE · Primary LINE  (platform tokens)
10. Trust row — 3 mini cards (Desktop/Tablet 2-col+)
```

### Typography / spacing (Desktop)

| Element | Spec |
|---------|------|
| Title | `32–36px` extrabold; tablet `28–32px` |
| Pack | `14px` muted |
| Rating | Stars `14–16px`; score `14px`; count `13px` muted |
| Sale price | `36–40px` extrabold `#E91E8C` |
| Original | `16px` strikethrough muted |
| Promo chip | Pink `11–12px` bold, radius `8px` |
| Description | `14–15px` / lh `1.55–1.65`; clamp **3** lines |
| CTA height | **`52px`** desktop · **`48–52px`** tablet |
| CTA gap | `12–14px` |
| CTA styling | **Platform CTA tokens** (see §3) — not independent skin |
| Trust cards | Equal 3-col; min-h `64–72px`; radius `12–14px` |
| Module gaps | `10–14px` blocks; `20–24px` before CTA |

### Alignment

- Text **left-aligned** in buy column.
- CTA row full width of buy column.

---

## 7A. Trust-row reuse clarification

| Rule | Spec |
|------|------|
| Visual vocabulary | Reuse existing trust language (icons, card chrome, pink accents) |
| Desktop / Tablet 2-col | **3** trust cards below CTA (prototype) |
| Product Mobile | **Frozen** — may keep current count/layout; **not forced identical** to Desktop |
| Copy | **Authority-backed only** — certification, shipping language, quality claims that exist in product or shared trust authority |
| Forbidden | False shipping, refund, stock, certification, or privacy claims |

---

## 8. Information Section Contract (below-the-fold)

### Scope (Desktop/Tablet)

```text
Tabs / panels (Product Information):
  - Benefits (ประโยชน์)
  - Ingredients (ส่วนประกอบสำคัญ)
  - Usage (วิธีรับประทาน)

FAQ:
  REQUIRED on Desktop + Tablet
  Position: AFTER Bundle Promotion, BEFORE Footer
  Component: existing shared FAQ accordion
  Content: single shared FAQ source from product authority
```

### Information tabs rules

| Rule | Detail |
|------|--------|
| Desktop tabs | **Equal-width** 3 tabs in one card surface |
| Tablet `900+` | Same 3 tabs |
| Tablet stack `768–899` | Tabs OK; full width |
| Content | `benefits` / `ingredients` / `usage` (+ steps) from product authority |
| Problem / knowledge / expectation | May remain if already in runtime; densify only |

### Card chrome (info)

- Surface `#1A1A1A` / `#111`, border `rgba(255,255,255,0.08)`, radius `16–18px`.
- Active tab: pink underline or pink text.
- Gap after hero: `32–40px` desktop · `24–32px` tablet.

### FAQ authority (Desktop / Tablet) — corrected v1.1

| Rule | Spec |
|------|------|
| Content | **Shared system content** — `product.faq` / same authority as mobile |
| Second FAQ source | **Forbidden** |
| Component | **Reuse** existing FAQ accordion — **do not rebuild or redesign global FAQ** |
| Product Mobile FAQ | **FROZEN** — do not delete, reorder, or alter mobile FAQ |
| Placement (D/T) | **After Bundle · before Footer** |
| Section title | Existing authority copy |
| Desktop accordion | **2-column** layout when width sufficient (e.g. `≥1280` or wide tablet if no overflow) |
| Tablet `900–1279` | **1 or 2 columns** based on width — **no overflow** |
| Tablet `768–899` | **Single-column** accordion |
| Default state | **Closed** unless shared component contract already opens one |
| Keyboard / ARIA | Preserve existing component behavior |

---

## 9. Review Contract (density)

### Content rules (all viewports in scope)

- Aggregate rating from **real** `reviews[]` only.
- **No** demo counts (e.g. 2,847).
- Verified badges **only** if data supports.
- **No** dead “ดูทั้งหมด” unless a real destination exists.
- Equal-height cards in a row.
- Horizontal carousel **only** if real card count exceeds visible capacity.

### Desktop density

| Band | Spec |
|------|------|
| `1280–1439` | Summary + **3** review cards visible |
| `1440–1920` | Summary + **3** cards; optional **4th** only if real content **and** space allow |
| Fabrication | **Forbidden** to fill the row |

### Tablet density

| Band | Spec |
|------|------|
| `900–1279` | **2** cards per row **or** controlled horizontal carousel |
| `768–899` | **1-column stack** or mobile-derived carousel **without modifying Mobile runtime** |

### Card chrome

- Quote, stars, author, date; radius `14–16px`.

---

## 10. Related Products Contract (density)

### Content rules

- Real catalog products only (exclude self).
- Title, badge, price, destination from authority.
- **No cart button behavior.**
- Allowed actions: open product page and/or LINE under existing contracts.
- Equal height; image ~1:1; gap desktop `16–20px` · tablet `12–16px`.

### Desktop

| Token | Spec |
|-------|------|
| Visible cards | **4** |
| Mobile | **Frozen / untouched** |

### Tablet

| Band | Spec |
|------|------|
| `900–1279` | **2–3** visible cards |
| `768–899` | **2** visible cards **or** horizontal carousel |

---

## 11. Bundle Contract (layout measurement)

### Desktop structure (`≥1280`)

| Zone | Approx width | Role |
|------|-------------:|------|
| Left content | **38–42%** | Headline, supporting copy, price treatment |
| Product visual | **38–42%** | Pairing imagery (current + related) — dominant but must not obscure copy/CTA |
| CTA / action | **18–24%** | LINE-only CTA |
| Grid alternative | **5 / 5 / 2** or equivalent | Responsive implementation OK |

| Token | Spec |
|-------|------|
| Width | Full band inside product content container |
| Copy | Left-aligned |
| CTA | **LINE only** |
| Cart | **Forbidden** |
| Data | Real SKUs/images only; no Omega-3; no invented discount |
| Image fit | Crop-protection §6 applies |
| **Next section** | **FAQ** (required) |

### Tablet

| Band | Spec |
|------|------|
| `900–1279` | Two-column: content + product visual; CTA may sit **below** content |
| `768–899` | **Stacked** bundle |

If pairing incomplete: primary product + one related catalog product; do not invent SKUs.

---

## 12. Measurement Lock (concise)

### Breakpoints

| Name | Range | Product layout |
|------|-------|----------------|
| Mobile | `<768` | **FROZEN** |
| Tablet stack | `768–899` | Stacked |
| Tablet 2-col | `900–1279` | Compact 2-col |
| Desktop | `≥1280` | Full 2-col + sticky buy |

### Container / grid

| Token | 768–899 | 900–1279 | ≥1280 | ≥1440 | ≥1536 |
|-------|--------:|---------:|------:|------:|------:|
| Max content | 100% | 100% | 1200 | 1240 | 1320 |
| Gutter L/R | 24–32 | 36–48 | 40 | 48 | 56 |
| Col ratio G/B | — | 46/54 | 48/52 | 48/52 | 50/50 opt |
| Col gap | — | 20–24 | 32 | 40 | 40 |

### Above-the-fold

| Token | Tablet 2-col | Desktop |
|-------|-------------:|--------:|
| Stage aspect | 1:1 | 1:1 |
| Stage min-h / max-h | 300 / 420 | 360 / 520 |
| Title | 28–32px | 32–36px |
| Price sale | 32–36px | 36–40px |
| Body | 14px | 14–15px |
| CTA h | 48–52 | 52 |
| Trust cards (D/T 2-col) | 3 | 3 |
| Thumb | 64–72 | 72–88 |
| Hero → next section | 24–32 | 32–40 |

### Tokens (must reuse)

| Token | Value |
|-------|-------|
| Brand pink | `#E91E8C` |
| Pink deep | `#C2185B` |
| Panel | `#0A0A0A` |
| Canvas | `#050505` |
| Card | `#1A1A1A` |
| Font | Sarabun 400/600/700/800 |
| Spacing scale | 8 / 12 / 14 / 16 / 20 / 24 / 28 / 32 / 40 |

---

## 13. Explicit Out of Scope

```text
❌ Homepage / landing any viewport
❌ Product Mobile <768 layout or content structure changes
❌ Mobile FAQ modification (delete / reorder / restyle mobile FAQ)
❌ Header / Footer redesign or cart/search chrome
❌ New cart, checkout, inventory, payment
❌ Analytics contract / schema changes
❌ LINE OA contract changes
❌ Theme / design-language redesign / new design system
❌ Omega-3 product authority creation
❌ Fabricated reviews / prices
❌ Security dependency upgrades (separate phase)
❌ Independent CTA skin system (must use platform tokens)
```

### Clarification (v1.1)

```text
FAQ on Desktop + Tablet: IN SCOPE (required after Bundle)
FAQ content source: SHARED (do not fork)
FAQ component: REUSE existing accordion
Mobile FAQ modification: OUT OF SCOPE / FORBIDDEN
```

---

## 14. Acceptance Criteria

Implementation passes when **all** hold without inventing layout or data:

### Identity & commerce

1. Only **NICKY PIMPZ BOSS** data from `products.ts`.
2. **LINE CTAs only**; dual-CTA mapping §3; no cart/qty/checkout runtime.
3. Platform CTA **tokens** reused; primary strongest.

### Responsive composition

4. Mobile `<768` **unchanged**.
5. Tablet stack `768–899` / compact 2-col `900–1279` / desktop 2-col `≥1280` match §4.
6. No Desktop 2-col leaking into `768–899` stack band.
7. **No page-level horizontal overflow** at checked widths.

### Desktop checks (`1280` / `1440` / `1920`)

8. Hero **2-column** gallery left / buy right.
9. Product image **not cropped** of essential identity (contain-first §6).
10. Buy column **sticky** without overlap of below-fold sections.
11. **3** trust cards under CTA.
12. Product information tabs present.
13. Review density matches §9.
14. **4** related-product cards.
15. Bundle matches §11 structure.
16. **FAQ after Bundle, before Footer.**
17. Gallery verified at `900` / `1024` / `1280` / `1440` / `1920`.

### Tablet checks (`768` / `820` / `900` / `1024` / `1279`)

18. Stack vs compact 2-col thresholds correct.
19. FAQ displays without overflow (1-col or 2-col per §8).
20. Gallery and buy data readable.
21. Related density §10.

### Frozen surfaces

22. Homepage, Header, Footer, Product Mobile **untouched**.
23. Must not regress to `desktop-prodects-page-ไม่ผ่าน.png` single-column stretch at ≥1280.

---

## 15. Implementation Order (locked)

```text
 1. Desktop ≥1280 hero two-column, gallery, buy module
 2. Desktop product information
 3. Desktop reviews
 4. Desktop related products
 5. Desktop bundle
 6. Desktop FAQ
 7. Desktop browser / visual verification
 8. Tablet 900–1279 compact two-column
 9. Tablet 768–899 stacked composition
10. Tablet FAQ and below-fold verification
11. ZZ visual review against approved prototype
12. SA final review
13. Product Desktop/Tablet Freeze
```

```text
Mobile work: NOT AUTHORIZED by this contract
```

---

## 16. Conflicts Found & Decisions Encoded

| Conflict | Decision encoded |
|----------|------------------|
| Omega-3 vs Nicky | **VISUAL_REFERENCE_ONLY** → Nicky runtime |
| Cart UI vs LINE-first | **Translate** to dual LINE CTAs; forbid cart |
| Homepage shell “platform exclusion” | Product route D/T composition **authorized**; homepage frozen |
| Section blueprints mobile-only | This doc is **Desktop/Tablet delta** |
| Multi-image gallery missing | Interim **repeat packshot** + crop-protection |
| **v1.0 FAQ optional vs system FAQ** | **v1.1: FAQ required on D/T after Bundle**; mobile FAQ frozen |
| Sticky both columns | **Buy sticky only** on desktop |
| Independent CTA styling | **v1.1: platform CTA tokens only** |
| Numeric vs visual | Precedence §1; ZZ may adjust within ±8% |

---

## 17. Remaining Non-Blocking Notes

| Item | Severity | Handling |
|------|----------|----------|
| Exact secondary CTA microcopy | Low | Prefer existing consult LINE wording |
| Bundle pair SKU choice | Low | Default: complementary catalog product excluding self |
| Multi-angle gallery assets | Medium polish | Repeat packshot + contain until assets land |
| 4th desktop review card | Low | Only if real data + space at ≥1440 |
| FAQ 2-col breakpoint fine-tune | Low | Prefer 2-col when no overflow; else 1-col |

None block layout implementation under this contract.

---

## 18. Files Inspected (evidence base)

- `DESIGN/Desktop-Blueprint-Design/desktop-prodects-page/desktop-prodects-page-ต้นแบบ.png`
- `DESIGN/Desktop-Blueprint-Design/desktop-prodects-page/desktop-prodects-page-ไม่ผ่าน.png`
- `DESIGN/Products-Blueprint-Design/Blueprint-Products-page.md`
- `DESIGN/Products-Blueprint-Design/PRODUCT-UX-AUTHORITY.md`
- `DESIGN/Products-Blueprint-Design/PRODUCT-DESIGN-ENGINEERING-BLUEPRINT.md`
- `DESIGN/Products-Blueprint-Design/PRODUCT-PAGE-READINESS-AUDIT.md`
- `DESIGN/Products-Blueprint-Design/PRODUCT-PAGE-DATA-MAP.md`
- `DESIGN/Products-Blueprint-Design/section-blueprints/*`
- `DESIGN/Global-Design-Contract.md`
- `DESIGN/Desktop-Blueprint-Design/DESKTOP-BREAKPOINT-CONTAINER-SHELL-LOCK.md`
- `DESIGN/Component-Registry.md`
- `PROJECTS/ZENOVELL-PIMPZ-V4-Active/content/products.ts`
- `PROJECTS/ZENOVELL-PIMPZ-V4-Active/lib/commerce/cta-activation.ts`
- `PROJECTS/ZENOVELL-PIMPZ-V4-Active/components/layout/global-header.tsx`
- `PROJECTS/ZENOVELL-PIMPZ-V4-Active/app/globals.css`
- `PROJECTS/ZENOVELL-PIMPZ-V4-Active/app/(platform)/products/[slug]/page.tsx`
- `PROJECTS/ZENOVELL-PIMPZ-V4-Active/components/platform/product-*.tsx`

---

## 19. Final Verdict

# **BLUEPRINT_FROZEN_READY_FOR_RUNTIME**

```text
DOCUMENT_STATUS: SA_APPROVED_ENGINEERING_AUTHORITY (v1.1) · DOCS_FROZEN
FINAL_READINESS: IMPLEMENTATION_READY
AUTHORITY_FREEZE: BLUEPRINT_FROZEN_READY_FOR_RUNTIME
LIFECYCLE: APPROVED → DOCS FROZEN → READY FOR RUNTIME
RUNTIME_MODIFIED: NO (by this freeze task)
PACKAGE_MODIFIED: NO
HOMEPAGE_MODIFIED: NO
PRODUCT_MOBILE_MODIFIED: NO
```

**This document is the official Engineering Authority for Product Desktop + Tablet.**
**Next:** Separate implementation ticket — Desktop Runtime first, then Tablet (see §15).
**Not yet:** Runtime · ZZ Visual Review · Product Desktop/Tablet Freeze.

---

## 20. Change Control

| Change type | Requires |
|-------------|----------|
| Numbers within ±8% visual polish | ZZ during implementation OK |
| Breakpoint threshold change (e.g. 900 → 920) | SA |
| Enable cart runtime | SA Change Request |
| Touch product mobile / homepage | SA + ZZ only |
| Mobile FAQ modification | Separate ticket — **forbidden** under this contract |
| Desktop/Tablet FAQ placement change | SA |
| New FAQ content source | SA (forbidden by default) |
| Amend frozen v1.1 contract text | SA Change Request (new doc revision) |

### Revision history / Change Log

| Version | Task | Summary |
|---------|------|---------|
| `1.0` | P-PRODUCT-BP-01 | Initial Desktop/Tablet layout contract |
| `1.1` | P-PRODUCT-BP-03 | FAQ Desktop/Tablet authority finalized; Component Reuse Contract added; Gallery crop protection added; Review density locked; Related product density locked; Bundle measurement locked; Acceptance Criteria expanded; Runtime scope protected |
| `1.1` freeze | **P-PRODUCT-BP-04** | **Official docs freeze** as Engineering Authority before Runtime implementation; no runtime changes |
| **`1.2`** | **`P-PRODUCT-TABLET-02`** | **SA ADR: reject tablet stack 768–899. Tablet 768–1279 uses Desktop composition (2-col), dual CTA, 3-trust, contain gallery, reduced density, no sticky. Stack band removed. Field-driven (iPad Mini/Air).** |

### P-PRODUCT-BP-03 revision detail (v1.1 content)

```text
Revision:     P-PRODUCT-BP-03
Version:      1.1
Summary:
  - FAQ Desktop/Tablet authority finalized
  - Component Reuse Contract added
  - Gallery crop protection added
  - Review density locked
  - Related product density locked
  - Bundle measurement locked
  - Acceptance Criteria expanded
  - Runtime scope protected
```

### P-PRODUCT-BP-04 freeze detail

```text
Revision:     P-PRODUCT-BP-04
Version:      1.1 (freeze — no content redesign)
Summary:
  - Blueprint v1.1 declared DOCS_FROZEN
  - Official Engineering Authority before Runtime
  - Mirrored into Active repository docs for git authority
  - Runtime / homepage / mobile / packages untouched
```

**End of P-PRODUCT-BP-01 Layout Contract v1.1 (FROZEN)**
