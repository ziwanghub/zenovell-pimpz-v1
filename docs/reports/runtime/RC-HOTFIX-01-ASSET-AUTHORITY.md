# RC-HOTFIX-01 — Production Asset Authority Fix

**Task:** RC-HOTFIX-01  
**Date:** 2026-07-22  
**Mode:** Production quality fix only (no redesign / no feature work)  
**Repository:** ZENOVELL-PIMPZ-V4-Active  
**Branch:** `main`  
**Fix commit:** `98e7571`  
**Source defects:** RC-SMOKE-01 High ×2  
**Post-fix smoke evidence:** `docs/reports/runtime/evidence/rc-hotfix-01/`

---

## Final Verdict

```text
PASS_WITH_WARNINGS
```

| Severity | Count (post re-smoke) |
|----------|----------------------:|
| Critical | **0** |
| High | **0** |
| Medium | 3 (pre-existing SEO notes) |
| Low | 0 |

**RC-SMOKE gate for High defects:** **CLOSED**

---

## 1. Files Changed

| File | Action |
|------|--------|
| `public/images/og-default.jpg` | **Added** — 1200×630 JPEG (~110 KB) |
| `public/images/logo.png` | **Added** — 512×512 PNG (~364 KB) |

**Not changed:** layouts, responsive, analytics, commerce, CTAs, metadata path strings (they already pointed to the canonical paths).

Metadata / JSON-LD references (unchanged, now resolve):

| Consumer | Path |
|----------|------|
| `app/layout.tsx` Open Graph | `/images/og-default.jpg` |
| `app/layout.tsx` Organization JSON-LD | `${baseUrl}/images/logo.png` |
| `lib/platform/seo.ts` `generateOrganizationJsonLd` | `${baseUrl}/images/logo.png` |

---

## 2. Reason

RC-SMOKE-01 on `https://beta.zenovell.com` reported:

1. **High** — `/images/og-default.jpg` → HTTP 404  
2. **High** — `/images/logo.png` → HTTP 404  

Repository search confirmed both files were **missing** under `public/images/` while still referenced by root metadata and Organization structured data.

---

## 3. Authority Decision

No alternate filenames existed at the canonical paths. Assets were **created** from existing brand photography already in `public/`:

| Target | Source material | Processing |
|--------|-----------------|------------|
| `og-default.jpg` | `public/images/hero/desktop-section-01-hero-desktop.jpeg` | Cover-scale + center-crop to **1200×630** JPEG q≈82 |
| `logo.png` | `public/images/section-4/products/nicky-pimpz-product3.jpeg` | Center-square crop → **512×512** PNG on dark canvas |

This preserves Product / brand visual authority without redesign.

---

## 4. Validation

| Gate | Result |
|------|--------|
| `npm run lint` | **PASS** (via `npm run validate`) |
| `npm run typecheck` | **PASS** |
| `npm run build` | **PASS** |
| Broken ref scan for `og-default` / `logo.png` | Paths consistent; assets present |

---

## 5. Git / Deployment

| Item | Value |
|------|-------|
| Commit | **`98e7571`** `fix(assets): add production OG default and Organization logo` |
| Push | `main` → `origin/main` |
| CI | **GREEN** (run for asset fix commit) |
| Beta deploy | Polled until `/images/og-default.jpg` + `/images/logo.png` returned **200** |

---

## 6. Post-Deploy Smoke (RC-SMOKE retest)

Environment: `https://beta.zenovell.com`  
Evidence: `docs/reports/runtime/evidence/rc-hotfix-01/results.json`

| Check | Result |
|-------|--------|
| `/images/og-default.jpg` | **200** `image/jpeg` |
| `/images/logo.png` | **200** `image/png` |
| DOM `og:image` | `https://zenovell.com/images/og-default.jpg` (prod host authority) |
| JSON-LD Organization.logo | `https://zenovell.com/images/logo.png` |
| Beta path for both assets | **200** |
| Product mobile 390 | stack, no sticky — **PASS** |
| Product tablet 768 | 2-col, no sticky — **PASS** |
| Product desktop 1280 | 2-col + sticky — **PASS** |
| LINE CTA | OA deep link **PASS** |
| GTM / `line_cta_click` | **PASS** |

### Remaining Medium (acceptable for gate)

| Item | Note |
|------|------|
| `/search` 404 | SearchAction target still missing (not introduced by hotfix) |
| robots.txt Sitemap → `zenovell.com` | Production SEO authority |
| sitemap absolute prod URLs | Production SEO authority |

---

## 7. Evidence Index

| Path | Purpose |
|------|---------|
| `public/images/og-default.jpg` | Fixed OG default |
| `public/images/logo.png` | Fixed Organization logo |
| `evidence/rc-hotfix-01/results.json` | Re-smoke machine result |
| `evidence/rc-hotfix-01/home-1280.png` | Homepage after deploy |
| `evidence/rc-hotfix-01/product-{390,768,1280}.png` | Responsive regression |

---

## 8. Smoke Result Summary

```text
Critical = 0
High     = 0
Medium   = 3
Low      = 0

Verdict  = PASS_WITH_WARNINGS
```

Compared to RC-SMOKE-01:

| Metric | Before | After |
|--------|--------|-------|
| High missing OG | FAIL | **CLOSED** |
| High missing logo | FAIL | **CLOSED** |
| Product v1.2 bands | PASS | **PASS** |
| LINE OA | PASS | **PASS** |

---

## 9. Next Gates (authorized by SA sequence)

With Critical/High = 0 on beta smoke:

1. **Owner Field Test** on `beta.zenovell.com`  
2. **ZEN-AUDIT-04** Link Authority  
3. **ZEN-AUDIT-05** Consent / PDPA  
4. **ZEN-AUDIT-11** Asset Authority (full inventory)  
5. GA4 + GTM + Ads integration verification  
6. Soft Launch readiness  

---

## Final Verdict

# **PASS_WITH_WARNINGS**
