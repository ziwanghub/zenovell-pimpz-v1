# ZZ-04-V1 — Independent CTA Density Verification

**Phase:** ZZ-04-V1 (ZZ-04A Phase A)  
**Date:** 2026-07-19  
**Mode:** READ-ONLY BROWSER VERIFICATION  
**Base HEAD:** `aa8059399c606f0353331c94b31f8e3096410ef0`  
**Evidence:** `screenshot/Desktop-screenshot/zz-04-v1-independent/`  
**Raw:** `zz04-v1.json`

```text
SOURCE_CHANGED_DURING_VERIFICATION: NO
COMMIT: NO
```

---

## Executive Summary

Independent re-verification of uncommitted ZZ-04 confirms all required gates.

| Gate | Result |
|---|---|
| Mobile S5/S6/S8 generic CTAs | visible, focusable, LINE works |
| ≥690 S5/S6/S8 generic | **hidden** 0×0, not focusable |
| S8 contextual review CTA | **preserved** all widths |
| No flash @1440 DCL | generic already `display:none` |
| Overflow | none |
| lint / typecheck / build | PASS |
| Conversion hierarchy @1440 | IMPROVED (mid-page generic pills removed) |

```text
ZZ_04_V1_STATUS: PASS
READY_FOR_CHECKPOINT: YES
```

---

## Matrix (abbreviated)

| Viewport | S5 gen | S6 gen | S8 gen | S8 contextual |
|---:|---|---|---|---|
| 390 | 358×58 vis | 358×56 vis | 358×56 vis | 358×58 vis |
| 430 | vis | vis | vis | vis |
| 690 | **hid** | **hid** | **hid** | 610×58 vis |
| 768–1024 | hid | hid | hid | vis |
| 1280–1920 | hid | hid | hid | vis |

Mobile LINE: all four CTAs → `https://lin.ee/syjmYE2`

Desktop 1440 large pink CTAs remaining (visible): S3 purchase, one mid/header-class, S10 final — **not** S5/S6/S8 generic.

---

## Final Status

```text
ZZ_04_VERIFICATION: PASS
MOBILE_PROTECTION: PASS
TABLET_DESKTOP_HIDE: PASS
CONTEXTUAL_CTA: PRESERVED
FOCUS_PROTECTION: PASS
FLASH_PROTECTION: PASS
STATIC_VALIDATION: PASS
```
