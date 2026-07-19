# DWC-02A-V1 — Independent Browser Comparison & DWC-02B Decision Gate

**Phase:** DWC-02A-V1  
**Date:** 2026-07-19  
**Mode:** READ-ONLY · Browser verification · Decision analysis  
**No source / CSS / asset / commit / push / PR / deploy**  

| Reference | Path / value |
|---|---|
| Spec lock | `docs/reports/desktop/DESKTOP-WIDE-CANVAS-SPECIFICATION-LOCK.md` |
| Pre-change baseline | `docs/reports/desktop/DESKTOP-WIDE-CANVAS-PRECHANGE-BASELINE.md` |
| Implementation report | `docs/reports/desktop/DESKTOP-WIDE-CANVAS-DWC-02A-IMPLEMENTATION.md` |
| Baseline HEAD | `167b385622beaba7f187b62bfdc42345c63380e4` |
| Preview | `http://localhost:3001` |
| Evidence | `screenshot/Desktop-screenshot/desktop-wide-canvas-dwc02a-v1/` |
| Measure JSON | `dwc02a-v1-verify.json` |

---

## 1. Executive Summary

Independent verification **confirms DWC-02A** as a successful limited homepage-wide canvas implementation.

| Gate | Verdict |
|---|---|
| Width ladder (≥1280 homepage only) | **PASS** |
| Mobile / Adaptive vs baseline | **PASS** (delta 0 at 390 / 1279) |
| Platform routes | **PASS** (1240@1440, 1320@1920, no marker) |
| D3 reading measures | **PASS** |
| Hero / S3 visual direction | **PASS_WITH_WARNINGS** (image soft risk) |
| Full-page consistency | **PASS_WITH_WARNINGS** (header lag cosmetic) |
| Scope budget | **PASS** (4 runtime files only) |
| Static validation | **PASS** |
| DWC-02B | **NOT_REQUIRED** (optional limited later if SA wants polish) |
| Checkpoint commit | **YES_WITH_CONDITIONS** |

**Core conclusion:** Hero + S3 + homepage shell deliver the intended premium wide visual authority. Lower sections inherit the wider shell outer width automatically while **reading measures stay locked**. No evidence forces S5/S6/S10 code changes in this gate.

---

## 2. Repository and Diff State

| Field | Value |
|---|---|
| Path | `.../PROJECTS/ZENOVELL-PIMPZ-V4-Active` |
| Branch | `ui/desktop-image-balance-d5` |
| HEAD | `167b385` (baseline) |
| Runtime files modified | **4** (DWC-02A only) |

### Runtime source (only)

```text
M app/globals.css
M components/layout/homepage-adaptive-shell.tsx
M sections/hero/hero-section.tsx
M sections/section-3-hero-product/section-3-hero-product.tsx
4 files changed, 48 insertions(+), 13 deletions(-)
```

### Untracked (docs / unrelated — not runtime)

```text
docs/reports/desktop/DESKTOP-WIDE-CANVAS-*.md
docs/reports/desktop/DWC-01-*.md
docs/reports/phase6/RC1-REDMI-CHROME-ENVIRONMENT-ISSUE.md  ← unrelated
```

```text
SOURCE_SCOPE: PASS
```

---

## 3. Static Validation

| Check | Result |
|---|---|
| `npm run lint` | **PASS** |
| `npm run typecheck` | **PASS** |
| `npm run build` | **PASS** |

```text
STATIC_VALIDATION: PASS
```

---

## 4. Width Ladder Verification

| VP | Shell w | maxW | Gutter L/R | Hero | S3 | Header | Footer | Overflow | Marker |
|---:|---:|---|---|---:|---:|---:|---:|---|---|
| 375–430 | =vp | 430 | 0 | =shell | =shell | =vp | =shell | false | true |
| 690 | 642 | none | 24 | 642 | 642 | 690 | 642 | false | true |
| 768–1024 | fluid | none | 32–48 | =shell | =shell | full frame | =shell | false | true |
| **1279** | **1183** | none | 48 | 1183 | 1183 | 1279 | 1183 | false | true |
| **1280** | **1200** | 1200 | 40 | 1200 | 1200 | 1200 | 1200 | false | true |
| **1366** | **1270** | 1280 | 48 | 1270 | 1270 | **1240** | 1270 | false | true |
| **1440** | **1280** | 1280 | 80 | 1280 | 1280 | **1240** | 1280 | false | true |
| **1536** | **1400** | 1400 | 68 | 1400 | 1400 | **1320** | 1400 | false | true |
| **1920** | **1440** | 1440 | 240 | 1440 | 1440 | **1320** | 1440 | false | true |

### Baseline delta (shell)

| VP | Baseline | Now | Delta |
|---:|---:|---:|---:|
| 390 | 390 | 390 | **0** |
| 1279 | 1183 | 1183 | **0** |
| 1280 | 1200 | 1200 | **0** |
| 1440 | 1240 | 1280 | **+40** (intended) |
| 1536 | 1320 | 1400 | **+80** (intended) |
| 1920 | 1320 | 1440 | **+120** (intended) |

### 1366 ≈ 1270 note

`max-width: 1280` on MobileShell is limited by parent padding-inline (48×2). Available content width `1366 − 96 = 1270`. **Accept as safe-gutter geometry, not failure.**

```text
WIDTH_LADDER_VERIFICATION: PASS
```

---

## 5. Hero Before / After Review

| Criterion | Finding |
|---|---|
| Premium vs merely enlarged | **Yes** — wider field + constrained image column (not full-bleed stretch) |
| Copy not stretched | Subheadline **480px** max retained |
| Bottle/product prominence | Visual field stronger; composition shifted right |
| Crop / focal | object-position ~80–96% center by breakpoint |
| Sharpness @1536/1920 | natural **1536w**, rendered ~835w @1920 (1× OK; **2× soft risk**) |
| CTA hierarchy | Single hero root; CTA still primary |
| Relation to S2 | S2 remains full shell outer with controlled trust density |

```text
HERO_VISUAL_VERIFICATION: PASS_WITH_WARNINGS
```

---

## 6. Section 3 Before / After Review

| Criterion | Finding |
|---|---|
| Authority over S4 | Maintained (featured stage + name scale) |
| Description measure | **420px** at 1280–1920 |
| Image scale | rendered ~600×388 @1920; natural 941 — within limits |
| CTA / price / trust connected | Present; product link `/products/nicky-pimpz-boss` |
| Gap / balance | 50/50 grid; not disconnected |
| S2 → S3 → S4 transition | Acceptable |

```text
SECTION_3_VISUAL_VERIFICATION: PASS
```

---

## 7. D3 Reading Width Verification

@1440 / @1920 measured:

| Surface | maxW / rendered |
|---|---|
| Hero sub | **480px** |
| S3 desc | **420px** |
| S5 / S6 / S7 / S9 / S10 intros | **640px** |
| S4 card copy | local (not full shell prose) |

No meaningful widen of S7–S9 reading.

```text
D3_READING_WIDTH_PROTECTION: PASS
```

---

## 8. Mobile and Adaptive Regression

| VP | Shell delta vs baseline | Visual intent |
|---|---|---|
| 390 | 0 | Unchanged |
| 430–1024 | matches pre-DWC fluid pattern | Unchanged |
| **1279** | 0 | Unchanged |

```text
MOBILE_PROTECTION: PASS
ADAPTIVE_PROTECTION: PASS
```

---

## 9. Platform Route Protection

| Route | 1440 shell | 1920 shell | Marker | Overflow |
|---|---:|---:|---|---|
| product | **1240** | **1320** | false | false |
| information | **1240** | **1320** | false | false |
| knowledge | **1240** | **1320** | false | false |

```text
PLATFORM_ROUTE_PROTECTION: PASS
```

---

## 10. Functional Verification

| Check | Result |
|---|---|
| Drawer open | true |
| Header links | present (hash + LINE) |
| Hero LINE open | `https://lin.ee/syjmYE2` |
| S3 product link | `/products/nicky-pimpz-boss` |
| S3 LINE control | present |
| S4 product links | 12 |
| FAQ toggle | works |
| Footer links | 22 |
| Hero roots | **1** (no duplicate) |
| S3 roots | **1** |

```text
FUNCTIONAL_PROTECTION: PASS
```

---

## 11. CTA and Analytics Protection

| Item | Result |
|---|---|
| LINE URL | `https://lin.ee/syjmYE2` |
| No duplicate markup | confirmed |
| Handler libs | not modified in diff |
| Local GTM | still unavailable without env |

```text
CTA_CONTRACT_PROTECTION: PASS
ANALYTICS_CONTRACT_PROTECTION: PASS_WITH_WARNINGS
```

---

## 12. Console and Runtime Results

| VP | Errors |
|---|---|
| 375 | intermittent 404 noise (same class as prior baseline noise) |
| 390–1920 homepage | clean in capture |
| Platform routes | no console errors |

No hydration failures observed.

---

## 13. Image and Performance Assessment

| Image | natural | rendered @1920 | Note |
|---|---|---|---|
| Hero desktop | 1536×1024 | **835×732** | SOFT_WARNING @2× |
| S3 | 941×1672 | **600×388** | READY_WITH_LIMITS |

`sizes` caps reduce over-download risk vs prior 60vw.

```text
IMAGE_READINESS: PASS_WITH_WARNINGS
PERFORMANCE_RISK: MEDIUM
```

---

## 14. Full-page Consistency Review

**Important:** Outer section blocks (S2–S11) all measure **ratio 1.0** to shell — they sit *inside* the wide homepage shell. “Keep current width” for S2/S4/S7–S9 means **content density / reading measure / card systems**, not a second outer shell.

| Section | Classification | Notes |
|---|---|---|
| S1 Hero | **BALANCED** | Primary wide visual win |
| S2 Trust | **ACCEPTABLE_CONTAINED** | Trust card density local; do not billboard |
| S3 Featured | **BALANCED** | Authority preserved |
| S4 Catalog | **ACCEPTABLE_CONTAINED** | Cards retain density on wider shell |
| S5 Why | **ACCEPTABLE_CONTAINED** | Outer already full shell; intro 640; promo OK without code change |
| S6 Order | **ACCEPTABLE_CONTAINED** | Same; S6 image soft if over-emphasized |
| S7–S9 | **DO_NOT_CHANGE** (reading) | Measures protected |
| S10 Final | **ACCEPTABLE_CONTAINED** | Full shell outer; climax OK; optional polish only |
| Footer | **ACCEPTABLE_CONTAINED** | Outer tracks shell |

**Mismatch risk:** Header lag vs shell at ≥1440 is the main visible language gap; content sections below Hero do **not** appear “stuck at 1240” — they already use the wide shell.

```text
FULL_PAGE_CONSISTENCY: PASS_WITH_WARNINGS
```

---

## 15. Header Decision

| VP | Shell | Header | vsShell |
|---:|---:|---:|---:|
| 1366 | 1270 | 1240 | ~0.98 |
| 1440 | 1280 | 1240 | 0.969 |
| 1536 | 1400 | 1320 | 0.943 |
| 1920 | 1440 | 1320 | 0.917 |

SA top-of-page evidence: no reason to force header change now. Lag is **cosmetic**, shared-component risk not justified for 02A.

```text
HEADER_DECISION: KEEP_CURRENT
```

(Optional later candidate only if SA reopens after freeze planning — not required for 02B.)

---

## 16–19. Extension Decisions

| Surface | Decision | Rationale |
|---|---|---|
| **Section 5** | **NOT_REQUIRED** | Outer width already = shell; intro 640; no material “too narrow after DWC” evidence |
| **Section 6** | **NOT_REQUIRED** | Same; avoid enlarging 692px asset |
| **Section 10** | **NOT_REQUIRED** | Climax remains valid; optional only if SA wants stronger close |
| **Footer** | **NOT_REQUIRED** | Outer already tracks shell; legal measures intact |

```text
SECTION_5_DECISION: NOT_REQUIRED
SECTION_6_DECISION: NOT_REQUIRED
SECTION_10_DECISION: NOT_REQUIRED
FOOTER_DECISION: NOT_REQUIRED
```

---

## 20. DWC-02B Scope Recommendation

```text
DWC_02B_DECISION: NOT_REQUIRED
DWC_02B_RECOMMENDED_SCOPE: NONE
```

**Optional future (not required by this gate):**

- Homepage-scoped header frame alignment (if product requires pixel-perfect chrome)
- Asset readiness `DWC-IMG-01` if retina sharpness becomes a hard requirement

Do **not** open FULL_CANDIDATE_SET without new browser evidence.

---

## 21. Checkpoint Commit Recommendation

Requirements check:

| Requirement | Met? |
|---|---|
| Visual PASS / PASS_WITH_WARNINGS | Yes |
| Static PASS | Yes |
| Mobile / Adaptive / Platform / D3 | Yes |
| No critical runtime | Yes |
| Scope ≤5 files | Yes (4) |
| No Header/Footer/S5/S6/S10 edits | Yes |

```text
READY_FOR_CHECKPOINT_COMMIT: YES_WITH_CONDITIONS
```

**Conditions for commit (SA action, not this agent):**

1. SA accepts PASS_WITH_WARNINGS (images + header lag).  
2. Commit **only** the 4 runtime files (+ optionally the DWC report docs).  
3. **Exclude** `docs/reports/phase6/RC1-REDMI-CHROME-ENVIRONMENT-ISSUE.md`.  
4. Still **no push/PR/deploy** until SA says so.

This verification phase does **not** commit.

---

## 22. Risks and Warnings

| ID | Item | Severity |
|---|---|---|
| W1 | Hero 1536w soft on retina | Medium |
| W2 | Header narrower than shell ≥1440 | Low–Med cosmetic |
| W3 | Local analytics without GTM | Low for this gate |
| W4 | Unrelated RC1 untracked file in tree | Process hygiene |

---

## 23. Final Status

```text
DWC_02A_V1_STATUS:
PASS_WITH_WARNINGS

WIDTH_LADDER_VERIFICATION:
PASS

HERO_VISUAL_VERIFICATION:
PASS_WITH_WARNINGS

SECTION_3_VISUAL_VERIFICATION:
PASS

FULL_PAGE_CONSISTENCY:
PASS_WITH_WARNINGS

MOBILE_PROTECTION:
PASS

ADAPTIVE_PROTECTION:
PASS

PLATFORM_ROUTE_PROTECTION:
PASS

D3_READING_WIDTH_PROTECTION:
PASS

FUNCTIONAL_PROTECTION:
PASS

CTA_CONTRACT_PROTECTION:
PASS

ANALYTICS_CONTRACT_PROTECTION:
PASS_WITH_WARNINGS

IMAGE_READINESS:
PASS_WITH_WARNINGS

PERFORMANCE_RISK:
MEDIUM

ACCESSIBILITY_PROTECTION:
PASS

HEADER_DECISION:
KEEP_CURRENT

SECTION_5_DECISION:
NOT_REQUIRED

SECTION_6_DECISION:
NOT_REQUIRED

SECTION_10_DECISION:
NOT_REQUIRED

FOOTER_DECISION:
NOT_REQUIRED

DWC_02B_DECISION:
NOT_REQUIRED

DWC_02B_RECOMMENDED_SCOPE:
NONE

STATIC_VALIDATION:
PASS

SOURCE_SCOPE:
PASS

READY_FOR_CHECKPOINT_COMMIT:
YES_WITH_CONDITIONS

SOURCE_CODE_CHANGED_DURING_VERIFICATION:
NO

CSS_CHANGED_DURING_VERIFICATION:
NO

ASSETS_CHANGED_DURING_VERIFICATION:
NO

COMMIT:
NO

PUSH:
NO

PR:
NO

DEPLOY:
NO
```

**STOP** — Independent verification complete. Awaiting SA on checkpoint commit.

---

## Appendix — Evidence files

```text
screenshot/Desktop-screenshot/desktop-wide-canvas-dwc02a-v1/
  home-{390,1279,1280,1440,1536,1920}-*.png
  home-{1440,1536,1920}-full.png
  platform-product-{1440,1920}.png
  dwc02a-v1-verify.json
```
