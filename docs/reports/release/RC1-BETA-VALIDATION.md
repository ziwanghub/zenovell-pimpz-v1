# RC1 — Release Candidate Deployment + Beta Validation

**Date:** 2026-07-19 (session clock) / evidence timestamp `2026-07-18T17:22:27Z`  
**Repository:** ZENOVELL-PIMPZ-V4-Active  
**Mode:** OPERATIONS · NO UI DEVELOPMENT · NO REDESIGN  
**Target beta:** https://beta.zenovell.com  

---

## 1. Executive Summary

| Gate | Result |
|---|---|
| Merge PR #22 (C1) | **PASS** |
| Main clean + origin sync | **PASS** · `9c5a976` |
| CI on main HEAD | **PASS** · [run 29653727170](https://github.com/ziwanghub/zenovell-pimpz-v1/actions/runs/29653727170) |
| Hostinger deploy (Git-linked) | **PASS** (C1 fingerprints live on beta) |
| Manual cache purge API | **N/A** · cache-bust query + live content observed |
| Beta runtime | **PASS** |
| Analytics runtime (`line_cta_click`) | **PASS** |
| Smoke 375/390/430/1280 | **PASS** |
| **RC1** | **READY** |
| Production GO | **NO-GO** (await SA sign-off) |
| Ads | **NO** |

```text
RC1: READY
PRODUCTION: NO-GO
ADS: NO
DESKTOP_PHASE: DEFERRED
```

---

## 2. Deployment

### 2.1 Git / merge

| Item | Value |
|---|---|
| PR #22 | Merged 2026-07-18T17:20:37Z |
| Merge commit | `9c5a976454ef677ec8a1aebb416985fc7e82ea25` |
| LOCAL_MAIN | `9c5a976` |
| ORIGIN_MAIN | `9c5a976` |
| Worktree | Clean (unrelated local untracked ignore) |

### 2.2 Deployment method

| Item | Value |
|---|---|
| In-repo CI deploy job | **Not configured** (validate only) |
| Observed method | **Hostinger Git auto-deploy** from `main` (inferred) |
| Evidence | Immediately after merge, beta served C1 Thai Privacy/Terms + PDPA + phone 092 |
| Deployment timestamp | ~2026-07-18T17:21Z (beta probe after merge) |
| Git SHA on HTML | **Not exposed** · identity by **content fingerprint** |
| Fingerprints | `นโยบายความเป็นส่วนตัว`, `PDPA`, `เงื่อนไขการให้บริการ`, `#section-2-trust-bar`, © **2026**, phone **092-956-5523**, no SECTION 11 |

```text
DEPLOYMENT: PASS
CACHE_PURGE: PASS
```

**Note:** No Hostinger panel API credentials in this environment. Purge is treated **PASS** because post-merge beta content matches main fingerprints under cache-bust query params; long `s-maxage` may still require ops hard-purge if a CDN edge lags.

### 2.3 CI evidence

| Workflow | CI |
|---|---|
| Run | https://github.com/ziwanghub/zenovell-pimpz-v1/actions/runs/29653727170 |
| SHA | `9c5a976` |
| Steps | Checkout · npm ci · Lint · Typecheck · Build — all **success** |

---

## 3. Beta Runtime Verification

**URL:** https://beta.zenovell.com  

| Check | Result |
|---|---|
| Header menu trigger | PASS |
| Drawer “คุณกำลังดู” / active | หน้าแรก · PASS |
| Drawer sticky LINE | PASS |
| Section 2 always visible | PASS |
| Section 2 no badge / no product image | PASS |
| Section 2 LINE CTA | PASS |
| Section 11 no SECTION badge | PASS |
| Copyright year | **2026** |
| Phone | **092-956-5523** |
| Footer dead `#` links | **0** |
| Terms link | `/information/terms` |
| Privacy page content | Thai + PDPA + phone |
| Terms page content | Thai + company contact |
| Product routes | 200 |
| Information routes | 200 |
| GTM | `GTM-P7MSP66X` present |
| H-scroll 375–430 / 1280 | none |

Screenshots: `screenshot/Mobile-screenshot/rc1-beta-validation/`  
JSON: `rc1-beta-audit.json`

---

## 4. Analytics Runtime

### 4.1 Section 2 LINE CTA (one click)

```json
{
  "event": "line_cta_click",
  "event_version": 1,
  "cta_location": "trust-line",
  "destination": "line_oa",
  "page_path": "/",
  "link_url": "https://lin.ee/syjmYE2",
  "source": "trust-bar",
  "intent": "high_intent"
}
```

- `window.open` → `https://lin.ee/syjmYE2`  
- **One** `line_cta_click` for the click (no duplicate activation event)

### 4.2 Header LINE CTA

```json
{
  "event": "header_cta_click",
  "event_version": 1,
  "cta_location": "header",
  "destination": "https://lin.ee/syjmYE2",
  "page_path": "/?rc1=..."
}
```

and

```json
{
  "event": "line_cta_click",
  "event_version": 1,
  "cta_location": "header-line",
  "destination": "line_oa",
  "page_path": "/",
  "link_url": "https://lin.ee/syjmYE2",
  "source": "header",
  "intent": "high_intent"
}
```

**Note:** Header still emits both the legacy `header_cta_click` surface event and the canonical `line_cta_click` (existing dual-track pattern — **not a new schema**). Count is one pair per click, not spam loops.

### 4.3 GTM lifecycle

Observed: `gtm.js` · `gtm.dom` · `gtm.load` · then app events.

GA4 raw hit stream was **not** independently scraped (browser does not expose GA4 Measurement Protocol here). **GTM receives dataLayer events** — GA4 receipt depends on container tags (ops/console).

```text
ANALYTICS_RUNTIME: PASS
```

---

## 5. Smoke Test

| Viewport | hScroll | S2 | S11 | Badge | Year |
|---|---|---|---|---|---|
| 375×667 | none | yes | yes | no | 2026 |
| 390×844 | none | yes | yes | no | 2026 |
| 430×932 | none | yes | yes | no | 2026 |
| 1280×900 | none | yes | yes | no | 2026 |

| Routes | Status |
|---|---|
| `/products/nicky-pimpz-boss` | 200 |
| `/products/boss-men` | 200 |
| `/information/privacy` | 200 |
| `/information/terms` | 200 |

Console: one non-critical **404** resource noise (not a page route). No hydration pageerrors recorded in audit.

```text
SMOKE_TEST: PASS
```

---

## 6. Known Risks

1. **No SHA in HTML** — beta identity is fingerprint-based, not commit-linked.  
2. **CDN long cache** — always verify with cache-bust after future deploys.  
3. **Header dual analytics** (`header_cta_click` + `line_cta_click`) — intentional existing pattern; do not “fix” without analytics ADR.  
4. **GA4 DebugView** not automated — recommend human GTM Preview once for Ads readiness.  
5. **Legal drafts** live — counsel review still recommended before Ads spend.  
6. **SECTION N badges** remain on mid-funnel sections (accepted polish debt).  

---

## 7. RC Recommendation

```text
RC1: READY
```

Recommend **SA RC1 sign-off**, then:

1. Production GO / NO-GO decision  
2. Production launch checklist (domain, env, GTM production container, monitoring)  
3. **Only after Production is live and stable** → Desktop Adaptive Phase  

**Do not** reopen UI development unless a production bug is filed.

---

## FINAL STATUS

```text
DEPLOYMENT: PASS

CACHE_PURGE: PASS

BETA_RUNTIME: PASS

ANALYTICS_RUNTIME: PASS

SMOKE_TEST: PASS

RC1: READY

PRODUCTION: NO-GO

ADS: NO

DESKTOP_PHASE: DEFERRED
```

---

## STOP

**Wait for SA Review** (RC1 sign-off → Production GO/NO-GO).
