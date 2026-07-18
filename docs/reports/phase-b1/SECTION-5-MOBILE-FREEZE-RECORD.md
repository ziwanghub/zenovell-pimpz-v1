# Section 5 Mobile Freeze Record

**Document type:** Formal section freeze  
**Date:** 2026-07-18  
**Authority:** Mobile primary 390px · boundary 375 / 430 · desktop 1280 safety  
**Phase:** B2.1 closeout  

---

## 1. Section identity

| Field | Value |
|---|---|
| Section | Section 5 — Why Choose Us |
| DOM id | `section-5-why-choose-us` |
| Source | `sections/section-5-why-choose-us/section-5-why-choose-us.tsx` |
| Content authority | `content/section-5-why-choose-us.ts` |
| Role | Trust / differentiation / reassurance after catalog; LINE consult CTA |

---

## 2. Final source commit

| Field | Value |
|---|---|
| **MAIN_HEAD (freeze)** | `e971ecb` |
| Merge subject | Merge PR #6: Section 5 B2.1 limited mobile UX implementation |
| Implementation commit | `512172c` |
| Prior main | `5bd7429` (Section 4 freeze baseline) |

---

## 3. PR and merge references

| PR | Role | Result |
|---|---|---|
| [PR #6](https://github.com/ziwanghub/zenovell-pimpz-v1/pull/6) | B2.1 limited Section 5 implementation | **MERGED** `e971ecb` |

CI on merge: **SUCCESS** (`validate`).

---

## 4. Approved findings completed

| Finding | SA decision | Status |
|---|---|---|
| B2.1-F01 | Remove false chevrons | **DONE** |
| B2.1-F03 | Correct Sparkles icon | **DONE** |
| B2.1-F04 | Body readability | **DONE** (12 / 12.5px) |
| B2.1-F02 / F09 | Reduce duplicated messaging | **DONE** (shortened benefits + promo reframe) |
| B2.1-F05 | Mild density tighten | **DONE** (section H@390 ≈ 991) |

---

## 5. Deferred / residual

| Item | Status |
|---|---|
| Trust-row micro claims | **ACCEPT** residual |
| Desktop CTA width | **DEFERRED** (Desktop Phase) |
| Content href `#` field vs runtime `LINE_OA_URL` | **ACCEPT** (runtime correct) |

---

## 6. Protected contracts

| Contract | Status at freeze |
|---|---|
| Final LINE CTA | **RETAINED** solid pink · H≈58 |
| Surface `why-choose-us-line` | **UNCHANGED** |
| `LINE_OA_URL` `https://lin.ee/syjmYE2` | **UNCHANGED** |
| Five benefit cards | **RETAINED** |
| Section 4 | **UNTOUCHED / FROZEN** |
| Header / Drawer / Footer | **UNTOUCHED** |
| Analytics schema / GTM | **UNCHANGED** |
| Dependencies | **UNCHANGED** |

---

## 7. Static validation

| Check | Result |
|---|---|
| lint / typecheck / build (implementation) | PASS |
| CI on PR #6 and main merge | PASS |

---

## 8. Local browser evidence

See implementation report: `docs/reports/phase-b2/PHASE-B2-1-SECTION-5-IMPLEMENTATION.md`  
Evidence: `screenshot/Mobile-screenshot/phase-b2-1-implementation/`

| Viewport | Chevrons | Body | CTA | Overflow |
|---|---:|---|---:|---|
| 375/390/430 | 0 | 12–12.5px | 58 | none |
| 1280 | 0 | 12.5px | 58 | none |

---

## 9. Beta browser evidence

**Target:** https://beta.zenovell.com  
**Evidence:** `screenshot/Mobile-screenshot/phase-b2-1-beta-s5/`  
**Deploy identity:** **PROBABLE** (behavioral fingerprint; host SHA unconfirmed)

| Check @390 | Result |
|---|---|
| Section H | 991 |
| Chevrons | 0 |
| Body | 12.5px |
| Promo “เราอยู่ข้างคุณทุกขั้นตอน” | present |
| CTA solid + lin.ee/syjmYE2 | PASS |
| Overflow | none |

```text
BETA_SMOKE_SECTION_5: PASS
```

---

## 10. Known acceptable residuals

- Trust-row still lists ปลอดภัย / ข้อมูลลับ / จัดส่งปกปิด.
- Benefit titles still touch safety/privacy/shipping pillars by design.
- Desktop full-width CTA deferred.

---

## 11. Change-control rule

**No further Section 5 changes** without one of:

1. Verified regression  
2. Legal or compliance requirement  
3. Analytics evidence  
4. Owner-approved change request  
5. Cross-section integration defect  

---

## 12. Final freeze decision

```text
SECTION_5_MOBILE: FROZEN
PHASE_B2_1: MERGED_AND_VERIFIED
SECTION_5_PROTECTED_CONTRACTS: PASS
PRODUCTION: NOT_AUTHORIZED
ADS: NO-GO
DESKTOP: DEFERRED
```

**Next:** Phase B2.2 Section 6 audit only → SA triage → locked implementation (not in this freeze).
