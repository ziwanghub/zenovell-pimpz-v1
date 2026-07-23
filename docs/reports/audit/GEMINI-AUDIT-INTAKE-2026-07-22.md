# ZENOVELL-AUDIT-00 — Gemini Audit Intake and Evidence Plan

**Document ID:** `ZENOVELL-AUDIT-00`
**Date:** 2026-07-22
**Mode:** Read-only audit planning
**Source:** Gemini Project Audit Report (2026-07-22)
**Active repo:** `PROJECTS/ZENOVELL-PIMPZ-V4-Active`
**Workspace:** `/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ`

```text
RUNTIME_MODIFIED: NO
PACKAGES_MODIFIED: NO
PR_35_MERGED: NO (explicitly out of scope for this ticket)
TABLET_STARTED: NO
VERDICT: AUDIT_REGISTER_READY_FOR_EXECUTION
```

---

## 0. Delivery baseline (at intake)

| Surface | Status | Evidence |
|---------|--------|----------|
| Homepage / Landing | **FROZEN** | Homepage freeze authority; sections 1–11 production baseline |
| Product Mobile `<768` | **FROZEN** | Product mobile freeze policy |
| Product Desktop ATF | **MERGED** | `main` includes PR #34 · merge `9e4b6b8` |
| Product Desktop BTF | **PR #35 OPEN** | Head `6e461a6` · READY_FOR_SA_MERGE_REVIEW (02A) · **not merged in this ticket** |
| Product Tablet | **NOT STARTED** | Roadmap |
| Production cutover | **NOT AUTHORIZED** | Governance |
| `origin/main` HEAD | `9e4b6b8` | Does **not** yet include BTF until #35 merges |

---

## 1. Classification taxonomy

| Code | Meaning |
|------|---------|
| **VERIFIED_DEFECT** | Confirmed against current source/runtime; needs fix before or at production gate |
| **VERIFIED_RISK** | Mechanism exists; impact not fully measured; needs dedicated audit |
| **FUTURE_CAPABILITY_GAP** | Correct observation about missing future capability; not a current defect |
| **TECHNICAL_DEBT** | Valid hygiene/structure debt; non-blocking if production works |
| **UNPROVEN_HYPOTHESIS** | Plausible but not evidenced at claimed severity |
| **INCORRECT_OR_OUTDATED** | Conflicts with current repository evidence |

---

## 2. Gemini claim validation (executive)

| Area | Gemini claim (summary) | Repo evidence | Classification |
|------|------------------------|---------------|----------------|
| Root structure | CORE/DESIGN/PROJECTS/screenshot/ARCHIVE separation | Present at workspace root | **VERIFIED** strength |
| Next/React/Tailwind versions | Next 16.2.10, React 19, TW4 | `package.json` | **VERIFIED** |
| Hero uses `useMinWidth(690)` for images | Performance pattern | **Still present** in `sections/hero/hero-section.tsx` (`useMinWidth` + `matchMedia`) | **VERIFIED_RISK** (hydration/LCP claim needs runtime audit; not “already fixed”) |
| Hydration from matchMedia | Medium risk | Hero + GlobalHeader + other `window` usage | **VERIFIED_RISK** → ZEN-AUDIT-02 |
| framer-motion / radix bloat | Medium risk | Both in `package.json`; framer used in `product-benefits.tsx`; radix `Slot` in `button.tsx` | **VERIFIED_RISK** → ZEN-AUDIT-03 |
| Placeholder / `#` links | Low–production risk | Multiple `href: "#"` / placeholders in `site-navigation.ts`, section content CTAs | **VERIFIED_DEFECT** (mapping incomplete) → ZEN-AUDIT-04 |
| Consent/PDPA missing | Low–compliance | GTM loads via layout; `setEnabled` exists for consent but **no Cookie Consent UI** found | **VERIFIED_DEFECT** (prod gate) → ZEN-AUDIT-05 |
| Analytics architecture | Custom dispatcher | `lib/analytics/*` + GTM adapter + bootstrap | **VERIFIED** strength; residual risk → ZEN-AUDIT-06 |
| Footer nav SSOT | Should unify | `section-11-footer.ts` **already** states nav from `site-navigation.ts` (B2.7) | **INCORRECT_OR_OUTDATED** as “still duplicated authority”; residual drift check → ZEN-AUDIT-07 |
| Omnichannel / NestJS channel layer | High urgency | No channel backend in Active repo | **FUTURE_CAPABILITY_GAP** → ZEN-AUDIT-08; **post-launch / business trigger** |
| Move `sections/` under `components/` | Cleanliness | Organization preference | **TECHNICAL_DEBT** → ZEN-AUDIT-09; **defer post-launch** |
| Project valuation 150k–300k THB | Commercial | No engineering defect | **UNPROVEN_HYPOTHESIS** / business only → ZEN-AUDIT-10 |

---

## 3. Audit register (findings)

### F-A00-01 — Workspace separation of concerns

| Field | Value |
|-------|--------|
| **Finding ID** | F-A00-01 |
| **Gemini claim** | Root CORE/DESIGN/PROJECTS/ARCHIVE/screenshot is enterprise-grade separation |
| **Repository evidence** | Workspace listing confirms `CORE/`, `DESIGN/`, `PROJECTS/`, `ARCHIVE/`, `screenshot/` |
| **Runtime evidence available?** | N/A (structure) |
| **Classification** | Strength (not a defect) |
| **Severity** | Info |
| **Production impact** | None (positive) |
| **Recommended audit ticket** | ZEN-AUDIT-01 |
| **Implementation authorization** | **REJECTED** for refactor; **AUDIT_ONLY** |
| **SA decision required?** | No |
| **Notes** | Git root is **Active project only**; DESIGN lives outside git → dual-location risk for contracts (see F-A00-02) |

---

### F-A00-02 — Design authority dual location

| Field | Value |
|-------|--------|
| **Finding ID** | F-A00-02 |
| **Gemini claim** | DESIGN is canonical architecture hub |
| **Repository evidence** | Canonical contracts under `DESIGN/…`; product freeze also mirrored in Active `docs/reports/product/PRODUCT-DESKTOP-TABLET-LAYOUT-CONTRACT.md` |
| **Runtime evidence available?** | Partial |
| **Classification** | **VERIFIED_RISK** (authority drift if mirrors diverge) |
| **Severity** | Medium (process) |
| **Production impact** | Does not block runtime; can block agent correctness |
| **Recommended audit ticket** | ZEN-AUDIT-01 |
| **Implementation authorization** | **AUDIT_ONLY** — no folder moves |
| **SA decision required?** | Yes if declaring single canonical path |
| **Notes** | Active git cannot track full DESIGN tree unless mirrored |

---

### F-A00-03 — Hero `matchMedia` / `useMinWidth` still present

| Field | Value |
|-------|--------|
| **Finding ID** | F-A00-03 |
| **Gemini claim** | Hero optimizes LCP via `useMinWidth(690)` mobile/desktop image split |
| **Repository evidence** | `sections/hero/hero-section.tsx`: `useMinWidth` + `window.matchMedia`; initial state `false` then effect |
| **Runtime evidence available?** | Not measured in this intake (needs browser) |
| **Classification** | **VERIFIED_RISK** (hydration/LCP behavior unproven at severity) |
| **Severity** | Medium |
| **Production impact** | **May block** if console hydration errors or CLS observed |
| **Recommended audit ticket** | ZEN-AUDIT-02 |
| **Implementation authorization** | **WAITING_ON_DEPENDENCY** — after Product Desktop BTF merge + Product Tablet freeze preferred, or parallel **read-only** audit on main |
| **SA decision required?** | Yes before any Hero change (Homepage Hero **FROZEN**) |
| **Notes** | Prior H1 freeze docs described picture/`getImageProps` path; **current main Hero still uses exclusive matchMedia mounting** — Gemini claim is more accurate than “already picture-fixed” narrative |

---

### F-A00-04 — Global window usage outside Hero

| Field | Value |
|-------|--------|
| **Finding ID** | F-A00-04 |
| **Gemini claim** | Browser API usage risks SSR hydration mismatch |
| **Repository evidence** | `global-header.tsx` (scroll/matchMedia/keydown); `use-active-section.ts`; commerce `window.open`; analytics adapters |
| **Runtime evidence available?** | Not measured |
| **Classification** | **VERIFIED_RISK** |
| **Severity** | Medium |
| **Production impact** | Conditional |
| **Recommended audit ticket** | ZEN-AUDIT-02 |
| **Implementation authorization** | **AUDIT_ONLY** first |
| **SA decision required?** | Yes for Header/Hero fixes (frozen surfaces) |

---

### F-A00-05 — Dependency cost (framer-motion, radix-ui, shadcn)

| Field | Value |
|-------|--------|
| **Finding ID** | F-A00-05 |
| **Gemini claim** | framer-motion + radix-ui bloat TTI on mobile |
| **Repository evidence** | Dependencies present; framer import in `product-benefits.tsx` only (quick scan); radix `Slot` in `button.tsx`; `shadcn` CLI in prod deps (security tree noise) |
| **Runtime evidence available?** | No bundle analyzer run in intake |
| **Classification** | **VERIFIED_RISK** / measurement needed |
| **Severity** | Medium |
| **Production impact** | Block **only if** performance budget fails (ZEN-AUDIT-03) |
| **Recommended audit ticket** | ZEN-AUDIT-03 |
| **Implementation authorization** | **DEFERRED_POST_LAUNCH** for removals unless budget fail |
| **SA decision required?** | Yes for dependency removal (risk regressions) |
| **Notes** | Do **not** `npm audit fix --force` (known Next/shadcn downgrade hazard from P10A) |

---

### F-A00-06 — Placeholder and hash links

| Field | Value |
|-------|--------|
| **Finding ID** | F-A00-06 |
| **Gemini claim** | Many `#` / placeholder links hurt conversion if shipped |
| **Repository evidence** | `content/site-navigation.ts`: multiple `kind: "placeholder"`, `href: "#"`, `href: "#line-primary"`; section CTAs in section-3/4/5/6/7 content with `href: "#"` |
| **Runtime evidence available?** | Static only |
| **Classification** | **VERIFIED_DEFECT** (incomplete destination authority) |
| **Severity** | **High for production cutover** |
| **Production impact** | **Production blocker** until mapped or explicitly marked non-interactive |
| **Recommended audit ticket** | ZEN-AUDIT-04 |
| **Implementation authorization** | **AUTHORIZED_NOW** as **audit**; fix implementation after audit matrix (can parallel Product Tablet) |
| **SA decision required?** | Yes for each destination class (LINE vs route vs remove) |
| **Notes** | Homepage frozen — link fixes may need SA if they change frozen UI chrome |

---

### F-A00-07 — Consent / PDPA vs GTM bootstrap

| Field | Value |
|-------|--------|
| **Finding ID** | F-A00-07 |
| **Gemini claim** | Analytics runs without consent banner → PDPA risk |
| **Repository evidence** | `GoogleTagManager` + `AnalyticsBootstrap` in `app/layout.tsx`; dispatcher `setEnabled` documents consent hook; **no** ConsentBanner component found |
| **Runtime evidence available?** | Partial (script load path exists) |
| **Classification** | **VERIFIED_DEFECT** (missing consent integration for prod compliance) |
| **Severity** | **High for production** (legal), lower for beta engineering |
| **Production impact** | **Production blocker** for public launch |
| **Recommended audit ticket** | ZEN-AUDIT-05 |
| **Implementation authorization** | **AUDIT_ONLY** now; implement only after SA legal/product policy |
| **SA decision required?** | **Yes** (legal + product) |
| **Notes** | Do not invent consent UX without policy |

---

### F-A00-08 — Analytics architecture

| Field | Value |
|-------|--------|
| **Finding ID** | F-A00-08 |
| **Gemini claim** | Custom dispatcher/adapters are high-value architecture |
| **Repository evidence** | `lib/analytics/dispatcher.ts`, adapters GTM/GA4/noop, events, bootstrap |
| **Runtime evidence available?** | Needs GTM preview validation |
| **Classification** | Strength + residual **VERIFIED_RISK** if adapters misconfigured |
| **Severity** | Medium residual |
| **Production impact** | Block if critical events fail on beta |
| **Recommended audit ticket** | ZEN-AUDIT-06 |
| **Implementation authorization** | **AUDIT_ONLY** |
| **SA decision required?** | No for audit; yes for contract changes |

---

### F-A00-09 — Footer navigation SSOT

| Field | Value |
|-------|--------|
| **Finding ID** | F-A00-09 |
| **Gemini claim** | Footer may duplicate menu vs site-navigation |
| **Repository evidence** | `content/section-11-footer.ts` header comment: nav/contacts/social **from** `site-navigation.ts`; B2.7 removed duplicate footer nav authority |
| **Runtime evidence available?** | Code-level yes; visual drift unproven |
| **Classification** | **INCORRECT_OR_OUTDATED** as open SSOT failure; residual **TECHNICAL_DEBT** if presentation columns drift |
| **Severity** | Low |
| **Production impact** | Non-blocking if links resolve |
| **Recommended audit ticket** | ZEN-AUDIT-07 |
| **Implementation authorization** | **AUDIT_ONLY** |
| **SA decision required?** | Only if drift found |

---

### F-A00-10 — Omnichannel / channel layer

| Field | Value |
|-------|--------|
| **Finding ID** | F-A00-10 |
| **Gemini claim** | High risk: no LINE/Shopee/TikTok server conversion path |
| **Repository evidence** | LINE-first web CTAs only; no NestJS channel layer in Active |
| **Runtime evidence available?** | N/A |
| **Classification** | **FUTURE_CAPABILITY_GAP** |
| **Severity** | High **only after** marketplace/OA server events are business-required |
| **Production impact** | **Does not block** current web production |
| **Recommended audit ticket** | ZEN-AUDIT-08 |
| **Implementation authorization** | **DEFERRED_POST_LAUNCH** / business trigger |
| **SA decision required?** | Yes before any backend build |
| **Notes** | Do **not** start NestJS/webhook work on critical path |

---

### F-A00-11 — `sections/` folder location

| Field | Value |
|-------|--------|
| **Finding ID** | F-A00-11 |
| **Gemini claim** | Move `sections/` under `components/sections/` |
| **Repository evidence** | Root `sections/` is intentional freeze surface for homepage |
| **Runtime evidence available?** | N/A |
| **Classification** | **TECHNICAL_DEBT** / preference |
| **Severity** | Low |
| **Production impact** | None |
| **Recommended audit ticket** | ZEN-AUDIT-09 |
| **Implementation authorization** | **DEFERRED_POST_LAUNCH** / **REJECTED** during freeze |
| **SA decision required?** | Yes if ever authorized (touches frozen homepage paths) |

---

### F-A00-12 — Project valuation

| Field | Value |
|-------|--------|
| **Finding ID** | F-A00-12 |
| **Gemini claim** | 150k–300k THB market value |
| **Repository evidence** | No engineering metric validates commercial pricing |
| **Runtime evidence available?** | No |
| **Classification** | **UNPROVEN_HYPOTHESIS** (commercial) |
| **Severity** | N/A engineering |
| **Production impact** | None |
| **Recommended audit ticket** | ZEN-AUDIT-10 |
| **Implementation authorization** | **REJECTED** for runtime work |
| **SA decision required?** | Owner/business only |

---

### F-A00-13 — Product dual-tree / Desktop BTF (context, not Gemini core)

| Field | Value |
|-------|--------|
| **Finding ID** | F-A00-13 |
| **Gemini claim** | (Not primary Gemini; current delivery risk) |
| **Repository evidence** | PR #35 dual composition + explicit `bundle` authority (02A) |
| **Runtime evidence available?** | Yes on feature branch |
| **Classification** | Delivery in progress — **not** Gemini defect |
| **Severity** | — |
| **Production impact** | Product page incomplete on main until merge + Tablet |
| **Recommended audit ticket** | Complete Product track first |
| **Implementation authorization** | Merge #35 = SA; Tablet = separate |
| **SA decision required?** | **Yes — merge #35** |

---

## 4. Production blockers vs non-blocking

### Production blockers (must clear before Production Cutover)

| ID | Topic | Ticket |
|----|--------|--------|
| F-A00-06 | Link/placeholder destinations | ZEN-AUDIT-04 → fix wave |
| F-A00-07 | Consent/PDPA technical policy + implementation | ZEN-AUDIT-05 → fix wave |
| (Delivery) | Product Desktop BTF merge + Product Tablet + Product Freeze | Product track |
| (Ops) | Beta = main authority, smoke, legal pages | Production readiness |

### May become blockers after measurement

| ID | Topic | Ticket |
|----|--------|--------|
| F-A00-03/04 | Hydration / matchMedia defects if proven | ZEN-AUDIT-02 |
| F-A00-05 | Bundle/TTI over budget if proven | ZEN-AUDIT-03 |
| F-A00-08 | Critical analytics event failure | ZEN-AUDIT-06 |

### Non-blocking / defer

| ID | Topic |
|----|--------|
| F-A00-09 | Footer SSOT residual |
| F-A00-10 | Omnichannel |
| F-A00-11 | sections/ refactor |
| F-A00-12 | Valuation |
| P10 security deps | After product freeze unless Critical |

---

## 5. Sequencing relative to Product Tablet

| Work | Timing |
|------|--------|
| **Merge PR #35** (BTF) | **AUTHORIZED_NOW** (SA merge review) — outside this audit ticket |
| **Product Tablet** | **AUTHORIZED_NOW** after #35 merge |
| **ZEN-AUDIT-04 Link Authority** | **Parallel** with Tablet (read-only then scoped fixes) |
| **ZEN-AUDIT-05 Consent/PDPA** | **Parallel** audit; implement after SA policy |
| **ZEN-AUDIT-02/03** | After Product Freeze preferred; read-only can start earlier on main |
| **ZEN-AUDIT-01/06/07** | Anytime **AUDIT_ONLY** |
| **ZEN-AUDIT-08/09/10** | **DEFERRED_POST_LAUNCH** / business |
| **sections/ refactor, force-audit deps, NestJS channel** | **REJECTED** on critical path |

---

## 6. Audit ticket map (execution queue)

| Ticket | Focus | Status |
|--------|--------|--------|
| **ZEN-AUDIT-01** | Repository / authority boundaries | **AUDIT_ONLY** |
| **ZEN-AUDIT-02** | Hydration / Browser API | **AUDIT_ONLY** (wait Product freeze if fixing frozen UI) |
| **ZEN-AUDIT-03** | Performance / dependency cost | **AUDIT_ONLY** |
| **ZEN-AUDIT-04** | Link authority | **AUTHORIZED_NOW** (audit → then SA-gated fixes) |
| **ZEN-AUDIT-05** | Consent / PDPA | **AUTHORIZED_NOW** (audit → SA legal) |
| **ZEN-AUDIT-06** | Analytics architecture runtime | **AUDIT_ONLY** |
| **ZEN-AUDIT-07** | Footer navigation drift | **AUDIT_ONLY** |
| **ZEN-AUDIT-08** | Omnichannel readiness | **DEFERRED_POST_LAUNCH** |
| **ZEN-AUDIT-09** | Folder refactor assessment | **DEFERRED_POST_LAUNCH** |
| **ZEN-AUDIT-10** | Valuation evidence | **REJECTED** for eng track |

---

## 7. Critical path recommendation (aligned with SA)

```text
1. SA merge review PR #35 (BTF 02A READY)
2. Product Tablet implementation
3. Parallel: ZEN-AUDIT-04 Link Authority
4. Parallel: ZEN-AUDIT-05 Consent/PDPA audit
5. Product Freeze (Desktop + Tablet)
6. ZEN-AUDIT-02 + ZEN-AUDIT-03 (measurement)
7. Production readiness closeout
8. Production cutover
9. Post-launch: debt, omnichannel when triggered
```

**Do not** start: `sections/` move, dependency force-upgrade, Channel Layer/NestJS, valuation as eng work.

---

## 8. Unproven or outdated Gemini statements (summary)

| Claim | Status |
|-------|--------|
| Footer still owns duplicate nav authority | **OUTDATED** (B2.7 SSOT to site-navigation) |
| Omnichannel is current production high severity defect | **Mis-scoped** as current defect — future gap |
| sections/ must move now | Preference, not defect |
| Hero already fully optimized without hydration concern | **Under-validated** — matchMedia still present |
| Valuation range as engineering fact | Commercial only |

---

## 9. Quality gates (this ticket)

| Gate | Result |
|------|--------|
| Runtime changes | **None** |
| Package changes | **None** |
| PR #35 merge | **Not performed** |
| Tablet start | **Not performed** |
| Documentation | This register only |

---

## 10. Final verdict

# **AUDIT_REGISTER_READY_FOR_EXECUTION**

```text
NEXT_PRODUCT: Merge PR #35 → Product Tablet
NEXT_AUDIT_PARALLEL: ZEN-AUDIT-04, ZEN-AUDIT-05
NEXT_SA_PLAN: ZEN-SA-PLAN-01 after ticket audits complete (optional)
REJECTED_NOW: Omnichannel impl, sections refactor, dependency force-clean
```

**End of ZENOVELL-AUDIT-00**
