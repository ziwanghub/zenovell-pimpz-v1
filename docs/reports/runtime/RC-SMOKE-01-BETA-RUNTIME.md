# RC-SMOKE-01 — Beta Release Candidate Smoke Test

**Task:** RC-SMOKE-01  
**Mode:** Read-only · No implementation · No commit · No PR  
**Date:** 2026-07-22  
**Environment:** https://beta.zenovell.com  
**Repository:** ZENOVELL-PIMPZ-V4-Active  
**Git `main` tip (local origin):** `096107d`  
**Evidence:** `docs/reports/runtime/evidence/rc-smoke-01/`  
**Machine results:** `docs/reports/runtime/evidence/rc-smoke-01/results.json`

```text
NOT A FEATURE AUDIT
NOT A REDESIGN
EVIDENCE ONLY
```

---

## Final Verdict

```text
FAIL
```

**Reason:** **2 × High** blocking defects (missing production-referenced assets).  
**Critical:** 0  

| Severity | Count |
|----------|------:|
| Critical | 0 |
| High | **2** |
| Medium | 3 |
| Low | 1 |

When High assets are fixed and re-smoked with **0 Critical / 0 High**, this environment is eligible for SA path: Owner Field Test + ZEN-AUDIT-04/05/11.

---

## 1. Deployment

| Check | Result | Notes |
|-------|--------|-------|
| HTTPS beta responds | **PASS** | HTTP/2 200, `x-powered-by: Next.js`, Hostinger `hcdn` |
| Next prerender cache | **PASS** | `x-nextjs-cache: HIT`, `x-nextjs-prerender: 1` |
| Platform | Hostinger panel | `platform: hostinger` |
| GitHub `main` CI | **GREEN** | Latest main runs success (merge #37 + docs freeze) |
| Commit hash exposed on site | **NOT VERIFIED** | No build-id / commit meta in HTML; cannot cryptographically prove deploy == `096107d` |
| Static chunks present | **PASS** | `/_next/static/chunks/*` + Turbopack assets served |
| Bot / browser challenge | **OBSERVED → CLEARED** | First paint may show Hostinger “Checking your browser…”; clears within ~seconds for real UA |

**Deployment finding:** Cannot assert byte-level equality of deploy commit without Hostinger release log. Runtime behavior matches post-tablet freeze Product contract (v1.2 bands).

---

## 2. Homepage

| Section / check | Result |
|-----------------|--------|
| Load after challenge | **PASS** |
| Header | **PASS** |
| Footer | **PASS** |
| Section 3 hero-product (`#section-3-hero-product`) | **PASS** |
| Trust / catalog / why / order / reviews / FAQ / final CTA ids present | **PASS** (id pattern match) |
| LINE CTAs present | **PASS** (25 interactive LINE-related controls @1280) |
| Horizontal overflow @1280 | **PASS** (none) |
| Horizontal overflow @390 | **PASS** (none) |
| Screenshots | `home-1280.png`, `home-1280-full.png`, `home-390.png` |

---

## 3. Product (contract v1.2)

Page under test: `/products/nicky-pimpz-boss`

| Width | Band | 2-col | Sticky | Final CTA | Title+CTA ATF | Overflow | Images | Result |
|------:|------|:-----:|:------:|:---------:|:-------------:|:--------:|:------:|:------:|
| 390 | mobile | no | no | yes | yes | no | 15 ok | **PASS** |
| 430 | mobile | no | no | yes | yes | no | 15 ok | **PASS** |
| 768 | tablet | **yes** | no | no | yes | no | 15 ok | **PASS** |
| 820 | tablet | **yes** | no | no | yes | no | 15 ok | **PASS** |
| 1024 | tablet | **yes** | no | no | yes | no | 15 ok | **PASS** |
| 1280 | desktop | **yes** | **yes** | no | yes | no | 15 ok | **PASS** |
| 1440 | desktop | **yes** | **yes** | no | yes | no | 15 ok | **PASS** |
| 1920 | desktop | **yes** | **yes** | no | yes | no | 15 ok | **PASS** |

Additional:

| Check | Result |
|-------|--------|
| Gallery contain (desktop/tablet) | **PASS** (`object-fit: contain`) |
| Bundle present ≥768 | **PASS** |
| Canonical | `https://zenovell.com/products/nicky-pimpz-boss` (prod host in metadata — intentional authority) |
| Screenshots | `product-{390,430,768,820,1024,1280,1440,1920}.png` |

---

## 4. Navigation / Routes

HTTP status matrix (browser session after challenge clear):

| Route class | Status |
|-------------|--------|
| `/` | 200 |
| All 6 product slugs | 200 |
| All 6 information slugs | 200 |
| All 6 knowledge slugs | 200 |
| `/robots.txt` | 200 |
| `/sitemap.xml` | 200 |
| `/search` | **404** (Medium — structured-data target) |
| `/images/og-default.jpg` | **404** (**High**) |
| `/images/logo.png` | **404** (**High**) |

No redirect loops observed on primary routes.

---

## 5. LINE Commerce

| Check | Result |
|-------|--------|
| Product CTA label | `สั่งซื้อผ่าน LINE` |
| Product popup destination | `https://line.me/R/ti/p/@362lupso?...` |
| Homepage CTA destination | same OA destination |
| Maps to authority `https://lin.ee/syjmYE2` | **PASS** (OA short-link resolves to LINE OA deep link) |
| Unexpected destination | none |

---

## 6. Analytics

| Check | Result |
|-------|--------|
| GTM script present | **PASS** (after full load) |
| `dataLayer` array | **PASS** |
| Events after product LINE click | `gtm.js`, `gtm.dom`, `gtm.load`, **`line_cta_click`** |
| Analytics status | **PASS** (runtime) |

**Note:** First-pass tooling can miss GTM if measured during bot interstitial; re-measure after challenge clear.

---

## 7. SEO

| Check | Result | Notes |
|-------|--------|-------|
| robots.txt | **PASS** serve | `Allow: /` |
| Sitemap URL in robots | **WARNING** | Points to `https://zenovell.com/sitemap.xml` (prod) |
| sitemap.xml | **PASS** serve | Multiple `<loc>` entries |
| Sitemap host | **WARNING** | Absolute `https://zenovell.com/...` (not beta) — correct for production SEO authority |
| Product title / canonical | **PASS** | Title includes product; canonical prod host |
| JSON-LD present (home) | **PASS** | Organization / WebSite graph |
| SearchAction `/search` | **WARNING** | Route **404** |

---

## 8. Assets

| Asset | Repo `public/` | Beta HTTP | Severity |
|-------|----------------|-----------|----------|
| Product/gallery packshots used on PLP | present | load OK (15/15 after scroll) | — |
| `/images/og-default.jpg` | **MISSING** | **404** | **High** |
| `/images/logo.png` | **MISSING** | **404** | **High** |

`app/layout.tsx` references:

- OG default: `/images/og-default.jpg`
- JSON-LD logo: `https://zenovell.com/images/logo.png`

These are **real defects** (not smoke false positives): files do not exist in `public/images/`.

---

## 9. Runtime

| Check | Result |
|-------|--------|
| Page JS exceptions | **none** recorded after challenge clear |
| Console errors | residual 403/404 noise (challenge + missing assets) |
| Network 404 product UI images | **none** after load |
| Bot challenge | Can delay first paint / break naive bots |

---

## 10. Performance Baseline

| Metric | Result |
|--------|--------|
| Lighthouse | **NOT COLLECTED** (CLI/tooling failure against beta) |
| Classification | **Low** (measurement gap, not app defect) |

Owner should run Lighthouse manually in Chrome DevTools on beta for Performance / A11y / BP / SEO scores.

---

## 11. Responsive

| Surface | Result |
|---------|--------|
| Homepage 390 / 1280 | **PASS** structure + no overflow |
| Product contract matrix 390→1920 | **PASS** (see §3) |
| Tablet 768/820 ATF 2-col no sticky | **PASS** (v1.2) |

---

## 12. Known Production Audits (readiness only — not executed)

| Audit | Status |
|-------|--------|
| ZEN-AUDIT-04 Link Authority | **NOT RUN** — still required |
| ZEN-AUDIT-05 Consent / PDPA | **NOT RUN** — still required |
| ZEN-AUDIT-11 Asset Authority | **NOT RUN** — now **reinforced** by High missing OG/logo |

---

## 13. Findings Register

### High (blocking this smoke)

| ID | Area | Title | Detail |
|----|------|-------|--------|
| H1 | Assets | Missing `/images/og-default.jpg` | 404 on beta; referenced by root metadata OG |
| H2 | Assets | Missing `/images/logo.png` | 404 on beta; referenced by JSON-LD Organization.logo |

### Medium

| ID | Area | Title |
|----|------|-------|
| M1 | SEO | `/search` 404 while JSON-LD SearchAction targets it |
| M2 | SEO | robots.txt Sitemap points to production host |
| M3 | SEO | sitemap.xml absolute URLs use production host |

### Low

| ID | Area | Title |
|----|------|-------|
| L1 | Performance | Lighthouse baseline not collected in this run |

### Notes (not defects)

- Production host in canonical/sitemap is **intentional SEO authority** for `zenovell.com`.
- LINE destination is OA deep link (not raw `lin.ee` string in final URL) — **acceptable**.
- Hostinger browser check is environment behavior; real users pass; headless tools must wait.

---

## 14. Required Summary

| Domain | Status |
|--------|--------|
| Deployment | **PASS_WITH_NOTES** (commit hash not pin-verifiable from HTML) |
| Homepage | **PASS** |
| Product | **PASS** (v1.2 responsive) |
| Navigation / primary routes | **PASS** |
| LINE | **PASS** |
| Analytics | **PASS** (`line_cta_click` observed) |
| SEO | **WARNING** (SearchAction + prod sitemap host notes) |
| Assets | **FAIL** (OG + logo 404) |
| Runtime | **PASS** (no page exceptions) |
| Performance | **INCOMPLETE** |
| Responsive | **PASS** |
| Known risks | Audits 04/05/11 open; missing brand assets |
| Production readiness | **NOT READY** until High assets fixed + re-smoke |

---

## 15. Production Readiness

```text
RC smoke gate: FAIL

Blocking:
  - Ship OG default image and logo referenced by layout/JSON-LD
    (or remove/replace references to existing assets)

Non-blocking for smoke after High fix:
  - Medium SEO items (SearchAction /search; prod sitemap host)
  - Lighthouse manual baseline
  - ZEN-AUDIT-04 / 05 / 11
  - Owner Field Test on real devices/networks
```

### Recommended sequence after fix

```text
1. Add public/images/og-default.jpg + logo.png (or update references)
2. Re-run RC-SMOKE-01 (expect PASS_WITH_WARNINGS max)
3. Owner Field Test on beta (UX / real LINE / real mobile network)
4. ZEN-AUDIT-04 + ZEN-AUDIT-05 (+ 11)
5. Production Readiness Review
6. Soft launch zenovell.com + Ads
```

---

## Evidence Index

| Path | Purpose |
|------|---------|
| `evidence/rc-smoke-01/results.json` | Full machine matrix |
| `evidence/rc-smoke-01/home-1280.png` | Homepage ATF desktop |
| `evidence/rc-smoke-01/home-1280-full.png` | Homepage full page |
| `evidence/rc-smoke-01/home-390.png` | Homepage mobile |
| `evidence/rc-smoke-01/product-*.png` | Product viewports |

---

## Final Verdict (exact)

```text
FAIL
```

**Blocking defects:**

1. **High — Assets:** `/images/og-default.jpg` → HTTP 404 (missing in repo + beta)  
2. **High — Assets:** `/images/logo.png` → HTTP 404 (missing in repo + beta)

No Critical defects. Product responsive, LINE OA handoff, primary routes, and analytics `line_cta_click` are healthy on beta after bot challenge clear.
