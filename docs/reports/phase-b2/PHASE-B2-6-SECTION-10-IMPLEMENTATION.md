# Phase B2.6 — Section 10 Limited Implementation

**Date:** 2026-07-18  
**Branch:** `phase-b2-6/section-10-limited-implementation`  
**Base:** `main` @ `e971ecb`  
**Mode:** LOCKED_SCOPE · NO_REDESIGN · EVIDENCE_FIRST  
**Freeze:** **NOT_YET**  

---

## 1. Executive summary

| Goal | Result |
|---|---|
| P0 `href` → `LINE_OA_URL` + `activateLineCta` | **DONE** · surface `final-cta` · intent `high_intent` |
| P1 Trust grid readability | **DONE** · title 12–13px · desc 11.5–12px |
| P1 Benefit description 12–13px | **DONE** |
| P1 Thai accessibility labels | **DONE** · section + CTA aria |
| ADR-006 Primary CTA Authority | **CREATED · ACCEPTED** |

```text
SECTION_10_IMPLEMENTATION: COMPLETE
SECTION_10_BROWSER: PASS
SECTION_10_LINE_CTA: PASS
SECTION_10_ANALYTICS: PASS
PRIMARY_CTA_AUTHORITY: PASS
ADR-006: CREATED
READY_FOR_SA_VISUAL_REVIEW: YES
SECTION_10_FREEZE: NOT_YET
```

---

## 2. Files changed

| File | Role |
|---|---|
| `sections/section-10-final-cta/section-10-final-cta.tsx` | LINE href, typography polish |
| `content/section-10-final-cta.ts` | Thai aria-labels · documented LINE href |
| `docs/architecture/ADR-006-PRIMARY-CTA-AUTHORITY.md` | Primary CTA authority |
| `docs/reports/phase-b2/PHASE-B2-6-SECTION-10-IMPLEMENTATION.md` | This report |

**Unchanged:** CTA visible wording, guarantee claim, Sections 4–9/11, analytics schema, packages.

---

## 3. Authority alignment (ADR-006)

**Decision:** Section 10 Final CTA is the **Primary Conversion CTA Authority** for high-intent climax surfaces only.

| Applies | Does not apply |
|---|---|
| Final CTA block | Hero / product / review / FAQ CTAs |
| surface `final-cta` | Context-specific surfaces |
| `high_intent` climax | Inquiry support CTAs |

---

## 4. Analytics evidence

```json
{
  "event": "line_cta_click",
  "cta_location": "final-cta",
  "destination": "line_oa",
  "page_path": "/",
  "link_url": "https://lin.ee/syjmYE2",
  "source": "final-cta",
  "intent": "high_intent"
}
```

- `window.open` → `https://lin.ee/syjmYE2`  
- Attribute `href` → `https://lin.ee/syjmYE2`  
- File: `screenshot/Mobile-screenshot/phase-b2-6-implementation/cta-analytics.json`

---

## 5. Before / after

| Check | Before | After |
|---|---|---|
| CTA href | `#` | **`https://lin.ee/syjmYE2`** |
| Section aria-label | `Final CTA` | **พร้อมเริ่มสั่งซื้อผ่าน LINE** |
| CTA aria-label | ปรึกษาหรือสั่งซื้อผ่าน LINE | **…กับทีมงานผู้เชี่ยวชาญ** |
| Benefit desc | 11px | **12px** (13px md+) |
| Trust title / desc | 11 / 10px | **12 / 11.5px** |
| Visible CTA label | unchanged | unchanged |
| Surface / intent | final-cta / high_intent | **unchanged** |

---

## 6. Browser matrix

| Viewport | CTA H | href LINE | Benefit desc | Trust desc | Overflow |
|---|---:|---|---|---|---|
| 375 | 72 | yes | 12px | 11.5px | no |
| 390 | 72 | yes | 12px | 11.5px | no |
| 430 | 72 | yes | 12px | 11.5px | no |
| 1280 | 80 | yes | 13px | 12px | no |

lint / typecheck / build: **PASS**

---

## 7. Regression

| Surface | Result |
|---|---|
| Sections 4–9 source | **UNCHANGED** |
| Section 11 | **UNCHANGED** |
| Guarantee / social proof copy | **UNCHANGED** |
| Analytics schema | **UNCHANGED** (`line_cta_click`) |
| CTA visible wording | **UNCHANGED** |

---

## 8. Evidence

`screenshot/Mobile-screenshot/phase-b2-6-implementation/`

1. `s10-full-390.png`  
2. `s10-cta-390.png`  
3. `s10-trust-grid-390.png`  
4. `s9-to-s10-390.png`  
5. `s10-to-s11-390.png`  
6. `s10-desktop-1280.png`  

---

## 9. Known risks

- Guarantee claim remains content/legal residual (not edited).  
- Avatar initials remain synthetic (not in authorized polish).  
- Desktop width tuning deferred.  

---

## 10. Recommendation

```text
READY_FOR_SA_VISUAL_REVIEW: YES
→ SA PASS → merge → freeze Section 10
→ Phase B2.7 Section 11 Mobile UX Audit
```

**STOP**
