# Phase C1 — Production Readiness Review + Gap Closure

**Date:** 2026-07-19  
**Base main (pre-C1 merge):** `9025fca`  
**Mode:** Production engineering · verified gap closure · **no UI redesign** · **no Desktop phase**  
**SA business decision:** Phone authority **CONFIRMED** · `092-956-5523`  

---

## 1. Executive Summary

Mobile landing on integrated main is **functionally production-candidate**. Phase C1 closes the official business data gate (phone) and upgrades Privacy/Terms from English stubs to **Thai production drafts** with PDPA-oriented wording and canonical contact channels.

| Area | Verdict |
|---|---|
| Business data (phone/email/LINE/company) | **PASS** (phone CONFIRMED) |
| Legal pages (routes + content draft) | **PASS_WITH_COUNSEL_NOTE** |
| Analytics schema / GTM presence on beta | **PASS schema** · **PARTIAL runtime** |
| Deployment automation | **NOT_CONFIGURED** in GitHub CI |
| SEO baseline | **PASS** |
| Accessibility (production final) | **PASS_WITH_KNOWN_POLISH** |
| Security / external links | **PASS** |
| **PRODUCTION_READY** | **NO** — deploy identity + ops gates open |
| **ADS_READY** | **NO** |
| **READY_FOR_RELEASE_CANDIDATE** | **YES_WITH_OPS_GATES** |

```text
PRODUCTION_REVIEW: COMPLETE
PRODUCTION_BLOCKERS: LISTED
DESKTOP_PHASE: NOT_STARTED
```

---

## 2. Checklist

### 2.1 Business data

| Item | Canonical source | Value | Status |
|---|---|---|---|
| Phone | `siteContacts` | **092-956-5523** · `tel:0929565523` | **CONFIRMED** |
| Hours | `siteContacts` | 10:00–22:00 น. | PASS |
| Email | `siteContacts` | support@zenovell.com | PASS |
| LINE handle | `siteContacts` | @zenovell | PASS |
| LINE OA URL | `LINE_OA_URL` | https://lin.ee/syjmYE2 | PASS |
| Company | `siteContacts` address | บริษัท เซโนเวลล์ จำกัด · กรุงเทพฯ | PASS |
| Obsolete phone | — | **Removed from active code & scrubbed from repo text** | PASS |

```text
PHONE_AUTHORITY: CONFIRMED
CANONICAL_PHONE: 092-956-5523
BUSINESS_DATA_GATE: CLOSED
```

### 2.2 Legal

| Page | Route | Pre-C1 | C1 action | Status |
|---|---|---|---|---|
| Privacy | `/information/privacy` | English stub | **Thai PDPA-oriented production draft** | Draft PASS |
| Terms | `/information/terms` | English stub | **Thai production draft** | Draft PASS |
| Footer legal links | `/information/privacy` · `/information/terms` | Wired | Unchanged wiring | PASS |
| Counsel certification | — | — | **Not claimed** | Open (recommended) |

### 2.3 Analytics

| Check | Evidence | Status |
|---|---|---|
| GTM container on beta HTML | `GTM-P7MSP66X` present | PASS |
| LINE URL in markup | `lin.ee/syjmYE2` present (many surfaces) | PASS |
| Event family | `line_cta_click` via `activateLineCta` + bridge | Schema PASS |
| Runtime parameter contract | surface / source / intent / link_url | Unchanged |
| Click → dataLayer observation | Requires browser+GTM session | **PARTIAL / ops** |

**No analytics schema changes in C1.**

### 2.4 Deployment

| Item | Status |
|---|---|
| GitHub CI validate (lint/typecheck/build) | PASS on main integration |
| Deploy job in `.github/workflows/ci.yml` | **NOT_CONFIGURED** |
| Hostinger deploy of SHA | **Ops manual** |
| Cache purge | **Ops manual** (long `s-maxage` observed historically) |

#### Deploy runbook (Hostinger) — required for RC

1. Build artifact from main (include C1 merge commit).  
2. Deploy to beta.zenovell.com.  
3. Purge Hostinger / CDN / Next cache.  
4. Verify HTML markers: no obsolete footer badge, year dynamic, privacy Thai title, phone 092 only.  
5. Record SHA ↔ deploy timestamp in release notes.

### 2.5 SEO

| Item | Status |
|---|---|
| `metadataBase` / title template | PASS (`app/layout.tsx`) |
| Homepage OG/Twitter | PASS (basic) |
| `public/robots.txt` | PASS · Sitemap URL set |
| `app/sitemap.ts` | PASS · products/information/knowledge |
| `public/llms.txt` | PASS · contact updated with phone |
| JSON-LD Organization | PASS · `sameAs` still empty (socials deferred) |

### 2.6 Accessibility (production final)

| Item | Status |
|---|---|
| Header drawer a11y (Thai, aria-current, dialog) | PASS (frozen) |
| Section 2 always visible trust | PASS (frozen) |
| Footer landmark / Thai aria | PASS (frozen) |
| Residual English chips (e.g. Secure SSL) | Known polish · non-blocking |
| SECTION N badges on mid sections | Known polish · non-blocking |

### 2.7 Security

| Item | Status |
|---|---|
| External LINE links | Canonical OA only |
| No secrets in client content | PASS |
| CSP upgrade-insecure-requests (beta host) | Observed |
| Sensitive PII in analytics | Contract avoids PII |

---

## 3. Production gaps status (after C1)

| ID | Gap | Status after C1 |
|---|---|---|
| **PG-01** | Phone authority | **CLOSED** |
| **PG-02** | Privacy / Terms production content | **CLOSED (draft)** · counsel review recommended |
| **PG-03** | Deploy main + Hostinger cache purge | **OPEN (ops)** |
| **PG-04** | Analytics runtime on beta | **OPEN (ops verification)** |
| **PG-05** | Social URLs | **OPEN / deferred** (hidden until verified URLs) |

---

## 4. Risk matrix

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Beta serves stale cache after deploy | Medium | High (false RC confidence) | Mandatory purge + cache-bust probe |
| Legal draft needs counsel edits | Medium | Medium | Publish draft · schedule counsel pass before Ads |
| Analytics mis-configured in GTM UI | Medium | High for Ads | Runtime checklist on beta after deploy |
| Social `sameAs` empty | Low | Low SEO | Wait for official profiles |
| Footer not on platform pages | Medium | Medium UX | ADR-007 later · not RC blocker for homepage launch |

---

## 5. Blocking issues for Production GO / Ads GO

### Production GO blockers

1. **PG-03** Deploy + purge of integrated main (incl. C1) to the live beta/prod host with identity evidence.  
2. Post-deploy smoke: Header · S2 · S11 · Privacy · Terms · LINE.  
3. Optional but recommended: legal counsel review of Privacy/Terms.

### Ads GO blockers

1. All Production GO blockers.  
2. **PG-04** Confirmed `line_cta_click` runtime parameters in GTM/GA4 debug.  
3. Claim language / policy pages live and linked.  
4. Business data gate remains closed (phone CONFIRMED).

---

## 6. C1 implementation summary (this PR)

| Change | File(s) |
|---|---|
| Phone authority CONFIRMED comments · SSOT | `content/site-navigation.ts` |
| Privacy + Terms Thai production drafts | `content/information.ts` |
| llms.txt contact | `public/llms.txt` |
| Scrub obsolete phone from docs | historical phase-b2 / release docs |
| Registry gap refresh | `docs/architecture/DESIGN-AUTHORITY-REGISTRY.md` |
| This report | `docs/reports/phase-c1/PRODUCTION-READINESS-REVIEW.md` |

**Not done (by design):** UI redesign, Desktop phase, Hostinger deploy, GTM console changes, ADR-007.

---

## 7. Recommendations

1. **Merge C1 PR** after SA review.  
2. **Ops:** deploy main (post-merge SHA) → purge → beta verification checklist.  
3. **Analytics:** GTM preview on beta; capture one S2/S10/header LINE click each.  
4. **Legal:** counsel sign-off within 1–2 weeks if Ads timeline is near.  
5. **RC1** only after PG-03 closed with evidence.  
6. Keep Desktop Adaptive **blocked** until Production GO/NO-GO decision.

---

## 8. GO / NO-GO

| Decision | Value | Rationale |
|---|---|---|
| **PRODUCTION_READY** | **NO** | Deploy identity + purge not closed in-repo |
| **ADS_READY** | **NO** | Needs Production + analytics runtime proof |
| **READY_FOR_RELEASE_CANDIDATE** | **YES_WITH_OPS_GATES** | Code/content readiness for RC engineering after deploy |

---

## FINAL STATUS

```text
PRODUCTION_REVIEW: COMPLETE

PRODUCTION_BLOCKERS:
- PG-03 Hostinger deploy of integrated main + cache purge
- PG-04 Analytics runtime verification on beta (GTM/GA4)
- (Recommended) Legal counsel review of Privacy/Terms drafts

PRODUCTION_READY: NO

ADS_READY: NO

READY_FOR_RELEASE_CANDIDATE: YES_WITH_OPS_GATES

PHONE_AUTHORITY: CONFIRMED
CANONICAL_PHONE: 092-956-5523
BUSINESS_DATA_GATE: CLOSED

PG_01: CLOSED
PG_02: CLOSED_DRAFT
PG_03: OPEN
PG_04: OPEN
PG_05: DEFERRED

DESKTOP_PHASE: NOT_STARTED

STOP
```

---

## STOP

**Wait for SA Review** before treating RC1 as authorized or performing Production/Ads GO.
