# T1G — Hero Beta Verification and T1 Freeze

**Task ID:** `T1G-HERO-BETA-VERIFY-FREEZE`
**Mode:** `DEPLOYMENT_OBSERVATION` · `BETA_RUNTIME_VERIFICATION` · `FREEZE_DECISION` · `NO_SOURCE_EDIT` · `NO_NEW_COMMIT` · `NO_PUSH` · `NO_MANUAL_DEPLOY`
**Date:** 2026-07-19
**Beta URL:** https://beta.zenovell.com
**Expected main SHA:** `ce8876095763601abaf86214a846a35553863356`
**Merged checkpoint:** `8eed5540aa1ab7e2488b54937ee0d00d364bb7c8`
**Evidence:** `screenshot/Tablet-screenshot/t1-hero/beta/`
**Report committed:** NO · **Report pushed:** NO

---

## 1. Executive Summary

Independent verification of **Beta** (not localhost) confirms Hostinger-served Beta exposes the merged **T1 Hero** behavior with measurements that match T1C independent production matrix.

| Gate | Result |
|------|--------|
| origin/main authority | **MATCHED** `ce88760…` |
| PR #29 | **MERGED** |
| Checkpoint in main | **YES** |
| Main CI | **SUCCESS** |
| Beta HTTP | **200** on `https://beta.zenovell.com` |
| Beta T1 fingerprint | **MATCHED** (behavior-confirmed) |
| Mobile regression | **NONE** |
| Desktop regression | **NONE** |
| Tablet layout | **IMPROVED** |
| CTA + LINE | **PASS** (`https://lin.ee/syjmYE2`) |
| Analytics runtime | **PASS** (`hero_cta_click` + `line_cta_click`) |
| Image request regression | **NONE** |
| T1 freeze decision | **FROZEN** |

No manual deploy. Production not modified. No commit/push of this report in T1G. No T2.

---

## 2. Git and Main Authority

| Check | Observed |
|-------|----------|
| `origin/main` | `ce8876095763601abaf86214a846a35553863356` |
| Expected | same |
| Checkpoint ancestor | **YES** (`8eed5540…`) |
| PR #29 | MERGED · merge commit `ce88760…` · head `8eed5540…` |
| Main CI | run `29691128234` · **success** |
| Newer main commits after expected | **NONE** at verification time |

```text
MAIN_AUTHORITY: MATCHED
CHECKPOINT_IN_MAIN: YES
MAIN_CI: SUCCESS
```

---

## 3. Deployment Evidence

Hostinger auto-deploy observed via runtime only (no Hostinger panel login, no manual deploy).

| Indicator | Evidence |
|-----------|----------|
| Platform header | `platform: hostinger` |
| Edge | `server: hcdn` |
| App stack | `x-powered-by: Next.js` |
| HTTP | 200, stays on beta.zenovell.com (no prod redirect) |
| T1-unique layout | contentMax **60%** @690, object-position **86% 40%** (pre-T1 was 56% / 82% 42%) |
| Matrix parity | Beta metrics **equal** T1C independent matrix at 390/768/1280 |

**Classification:**

```text
BETA_DEPLOYMENT: STRONGLY_INFERRED
```

No public HTML build SHA exposed. Deployment is **behavior-confirmed** against T1 fingerprints and Hostinger headers, not SHA-proven from a build id tag.

---

## 4. Beta HTTP Availability

| Check | Result |
|-------|--------|
| HTTPS | PASS |
| Status | **200** |
| Final URL | `https://beta.zenovell.com/` (cache-bust query used) |
| Title | `ZENOVELL \| Premium Wellness Products` |
| Redirect to production | **NONE** |
| Document load | PASS |
| Navigable | PASS |

Key headers: `x-nextjs-cache: HIT`, `x-hcdn-cache-status: BYPASS`, `etag: "39nlaq0v5z6nrj"`, `cache-control: s-maxage=31536000`.

```text
BETA_HTTP: PASS
```

---

## 5. T1 Runtime Fingerprint

| Indicator | Expected T1 | Beta observed |
|-----------|-------------|---------------|
| Content max @690 | 60% | **60%** |
| Content max @768 | 58% | **58%** |
| Content max @1024 | 52% | **52%** |
| Content max @1279 | 50% | **50%** |
| Content @1280 | 520px | **520px** |
| HL lines 768–1024 | 2 | **2** |
| Obj-pos @690 | 86% 40% | **86% 40%** |
| Obj-pos @768 | 88% 42% | **88% 42%** |
| Obj-pos @1280 | 92% 50% | **92% 50%** |
| CTA @1279 | outline dark | **outline** |
| CTA @1280 | solid pink 242×52 | **pink 242×52** |
| Hero H @390 | 608 | **608** |
| Hero H @1280 | ~674 | **674.4** |

```text
BETA_T1_FINGERPRINT: MATCHED
```

Not stale pre-T1 (would show narrower % ladder and 3-line mid-tablet).

---

## 6. Browser Matrix

**Tooling:** Puppeteer + system Chrome · cache-bust query · hydrate wait for image authority
**Metrics:** `screenshot/Tablet-screenshot/t1-hero/beta/beta-metrics.json`
**Shots:** `beta-{w}.png` (17 viewports)

| VW | Hero H | Content W | maxW | HL size | Lines | CTA | CTA style | Obj-pos | Overflow | Imgs |
|----|--------|-----------|------|---------|-------|-----|-----------|---------|----------|------|
| 390 | **608** | 390 | none | 33.15 | **4** | **362×74** | outline | 74% 18% | no | 1 |
| 430 | **626.4** | 430 | none | 36.12 | **4** | **402×74** | outline | 74% 18% | no | 1 |
| 689 | 658.3 | 430 | none | 43 | 4 | 402×74 | outline | 74% 18% | no | 1 |
| 690 | 584.2 | 385.2 | **60%** | 36 | **2** | 292×72 | outline | **86% 40%** | no | 1 |
| 768 | 593.1 | 408.3 | **58%** | 38 | **2** | 276×72 | outline | **88% 42%** | no | 1 |
| 820 | 612.8 | 418.9 | 56% | 40 | **2** | 288×70 | outline | 89% 44% | no | 1 |
| 912 | 617.5 | 449.3 | 54% | 41.95 | **2** | 280×70 | outline | 89% 44% | no | 1 |
| 1024 | 624.8 | 482.5 | 52% | 43.01 | **2** | 284×70 | outline | 90% 46% | no | 1 |
| 1180 | 636.5 | 542 | 50% | 48 | **2** | 284×70 | outline | 90% 46% | no | 1 |
| 1279 | 636.5 | 591.5 | 50% | 48 | **2** | 284×70 | outline | 90% 46% | no | 1 |
| 1280 | **674.4** | **520** | **520px** | 48.64 | **2** | **242×52** | **pink** | **92% 50%** | no | 1 |
| 1440 | 709.8 | **520** | 520px | 57.6 | 2 | **242×52** | pink | 90% 50% | no | 1 |
| 1920 | 731.8 | **520** | 520px | 62 | 2 | **242×52** | pink | 82% 46% | no | 1 |

Parity with T1C independent matrix: **exact** at 390, 768, 1280 (heights and widths).

---

## 7. Mobile Freeze Verification

| Metric | Baseline | Beta 390 | Beta 430 |
|--------|----------|----------|----------|
| Hero H | 608 / ~626 | **608** | **626.4** |
| HL lines | 4 / 4 | **4** | **4** |
| CTA | 362×74 / 402×74 | **match** | **match** |
| Asset | mobile v2 | **bg-ph6d…v2** | same |
| Obj-pos | 74% 18% | **74% 18%** | **74% 18%** |
| Overflow | none | none | none |

```text
MOBILE_REGRESSION: NONE
MOBILE_390: PASS
MOBILE_430: PASS
```

---

## 8. Tablet T1 Verification

Visual + measured (Beta screenshots `beta-690`…`beta-1279`):

| Viewport band | Layout | Headline | Product | Couple | CTA |
|---------------|--------|----------|---------|--------|-----|
| 690–768 | Intentional tablet measure | **2 lines** | Bottle primary | Reduced | Outline controlled |
| 820–1024 | Stable, not enlarged-mobile | **2 lines** | Strong | Secondary | Outline |
| 1180–1279 | Tablet not premature Desktop | 2 lines | Strong | Present | Outline (not pink) |

```text
TABLET_LAYOUT: IMPROVED
PRODUCT_COMPOSITION: IMPROVED
HEADLINE_RHYTHM: IMPROVED
TABLET_690–1279: PASS (all mandatory)
```

---

## 9. Desktop Freeze Verification

| Check | 1280 | 1440 | 1920 |
|-------|------|------|------|
| Content 520 | **520** | **520** | **520** |
| Hero H | **674.4** | 709.8 | 731.8 |
| CTA pink 242×52 | **YES** | YES | YES |
| Obj-pos ladder | 92% 50% | 90% 50% | 82% 46% |
| Trust | hidden | hidden | hidden |
| Tablet leak | **NONE** | NONE | NONE |

```text
DESKTOP_REGRESSION: NONE
DESKTOP_1280: PASS
DESKTOP_1440: PASS
DESKTOP_1920: PASS
```

---

## 10. Boundary 689 / 690

| | 689 | 690 |
|--|-----|-----|
| Image | mobile | desktop asset |
| Obj-pos | 74% 18% | 86% 40% |
| Content max | none | 60% |
| HL lines | 4 | 2 |
| CTA | 402×74 | 292×72 |

```text
BOUNDARY_689_690: PASS
```

---

## 11. Boundary 1279 / 1280

| | 1279 | 1280 |
|--|------|------|
| Content max | 50% (591.5) | **520px** |
| CTA bg | outline | **solid pink** |
| CTA size | 284×70 | **242×52** |
| Obj-pos | 90% 46% | **92% 50%** |
| Hero H | 636.5 | **674.4** |
| Trust | block | **none** |

```text
BOUNDARY_1279_1280: PASS
```

---

## 12. CTA Runtime

One controlled click @768 on Beta:

| Check | Result |
|-------|--------|
| aria-label | `ปรึกษาผู้เชี่ยวชาญผ่าน LINE` |
| tag / type | BUTTON / button |
| dataLayer events | `hero_cta_click`, `line_cta_click` |
| link_url | **`https://lin.ee/syjmYE2`** |
| source / intent | `hero` / `high_intent` |
| LINE handoff | popup → `https://line.me/R/ti/p/@362lupso?...` (OA path from lin.ee) |
| localhost destination | **NONE** |

```text
CTA_RUNTIME: PASS
CTA_DESTINATION: PRESERVED
```

---

## 13. Analytics Runtime

Observed on `window.dataLayer` after one click:

1. `hero_cta_click` (cta_location / page_path present)
2. `line_cta_click` with `source=hero`, `intent=high_intent`, `link_url=https://lin.ee/syjmYE2`

GA collect requests may abort in headless (`net::ERR_ABORTED`) — does not invalidate dataLayer contract.

```text
ANALYTICS_RUNTIME: PASS
```

---

## 14. Image and Performance

| Check | 390 | 768 |
|-------|-----|-----|
| Settled `#hero img` | **1** | **1** |
| Hero network requests | **1** mobile | **2** mobile+desktop (pre-existing dual debt) |
| New asset | NONE | NONE |
| LCP candidate | Hero image | Hero image |

```text
IMAGE_REQUEST_REGRESSION: NONE
LCP_RISK: UNCHANGED
```

---

## 15. Console and Network

| Class | Count / notes |
|-------|----------------|
| pageerror | **0** |
| console error | 1× unspecific `Failed to load resource: 404` |
| requestfailed | GA `g/collect` `ERR_ABORTED` (headless/analytics transport) |

```text
CONSOLE_CRITICAL_ERRORS: NONE
KNOWN_404: UNRELATED
```

(Unspecific 404 without a critical path; not attributed to T1 Hero. GA abort is environment-related.)

---

## 16. Warnings

Carried forward (non-blocking):

1. Dual Hero image request ≥690 (pre-existing)
2. Unbounded `min-*` utilities with 1280 override
3. Modest tablet headline clamp reduction
4. Unrelated / unresolved generic 404 log

No new blocker or major defect on Beta.

```text
DEFECTS_BLOCKER: 0
DEFECTS_MAJOR: 0
DEFECTS_MINOR: 4
```

---

## 17. Freeze Decision

All mandatory Beta gates passed.

```text
T1_FREEZE_DECISION: FROZEN
T1_AUTHORITY: TABLET_HERO_APPROVED
```

**Freeze meaning (status only — no freeze commit in T1G):**

- Section 1 Tablet Hero is **approved Tablet Authority** for 690–1279
- Further T1 visual changes require SA + explicit authorization
- Maintenance-only unless critical defect or approved improvement
- Mobile &lt;690 and Desktop ≥1280 remain frozen as previously established

**Not done in T1G:** freeze documentation commit, branch delete, worktree delete, T2.

```text
READY_FOR_T2_AUTHORIZATION: YES
```

(T2 still requires a **separate SA command**.)

---

## 18. Final Status

```text
T1G_STATUS: PASS_WITH_WARNINGS

MAIN_AUTHORITY: MATCHED
EXPECTED_MAIN_SHA: ce8876095763601abaf86214a846a35553863356
ACTUAL_MAIN_SHA: ce8876095763601abaf86214a846a35553863356
CHECKPOINT_IN_MAIN: YES
MAIN_CI: SUCCESS

BETA_URL: https://beta.zenovell.com
BETA_HTTP: PASS
BETA_DEPLOYMENT: STRONGLY_INFERRED
BETA_T1_FINGERPRINT: MATCHED

MOBILE_390: PASS
MOBILE_430: PASS
TABLET_690: PASS
TABLET_768: PASS
TABLET_820: PASS
TABLET_912: PASS
TABLET_1024: PASS
TABLET_1180: PASS
TABLET_1279: PASS
DESKTOP_1280: PASS
DESKTOP_1440: PASS
DESKTOP_1920: PASS
BOUNDARY_689_690: PASS
BOUNDARY_1279_1280: PASS

TABLET_LAYOUT: IMPROVED
PRODUCT_COMPOSITION: IMPROVED
HEADLINE_RHYTHM: IMPROVED

CTA_RUNTIME: PASS
CTA_DESTINATION: PRESERVED
ANALYTICS_RUNTIME: PASS
IMAGE_REQUEST_REGRESSION: NONE
LCP_RISK: UNCHANGED
CONSOLE_CRITICAL_ERRORS: NONE
KNOWN_404: UNRELATED

MOBILE_REGRESSION: NONE
DESKTOP_REGRESSION: NONE
DEFECTS_BLOCKER: 0
DEFECTS_MAJOR: 0
DEFECTS_MINOR: 4

T1_FREEZE_DECISION: FROZEN
T1_AUTHORITY: TABLET_HERO_APPROVED
READY_FOR_T2_AUTHORIZATION: YES

REPORT_CREATED: YES
REPORT_COMMITTED: NO
REPORT_PUSHED: NO
MANUAL_DEPLOY: NO
PRODUCTION_TOUCHED: NO
REMOTE_BRANCH_DELETE: NO
LOCAL_WORKTREE_DELETE: NO
T2_IMPLEMENTATION: NO
NEXT: WAIT_FOR_SA_REVIEW
```

---

*End of T1G. Stop for SA review. Next authorized phase after SA accept: T1H Freeze Documentation Commit + cleanup (separate command).*
