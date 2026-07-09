# PHASE 6D — SECTION 4 MOBILE DESIGN CONTRACT V2

## Executive Summary

This document defines the engineering-grade mobile design contract for Section 4 V2.

Its purpose is to convert the approved Mobile Unified Refinement Strategy into explicit layout, hierarchy, typography, spacing, responsive, and decision-architecture rules so Blueprint V2 can be authored without interpretation.

This contract is mobile only.

This contract is presentation only.

This contract does not authorize implementation.

Architecture Freeze remains active.

The Section 4 Mobile V2 objective is:

- reduce cognitive load
- improve product-fit recognition
- improve comparison speed
- improve decision confidence
- preserve high-intent conversion readiness
- preserve LINE conversion behavior
- increase premium clarity through structure, not added persuasion

---

## Engineering Design Contract

### 1. Design Principles

#### Recognition Before Reading

- Users must identify likely-fit products before reading full subtitles or benefit rows.
- Layout effect:
  - fit signal must appear above or at the first readable decision layer
  - subtitle cannot behave like low-priority filler
  - benefit row cannot be the main source of product understanding

#### Fit Before Features

- Product-role recognition must happen before users parse supporting benefit details.
- Layout effect:
  - fit line receives stronger visual presence than individual benefit items
  - benefit block becomes confirmation, not discovery

#### Confidence Before CTA

- CTA must feel psychologically appropriate only after fit, difference, and price are understood.
- Layout effect:
  - CTA remains visible
  - but pre-CTA content must reduce hesitation first
  - CTA zone must not visually overpower unclear cards

#### Comparison Before Persuasion

- The section must help users compare options quickly before pushing generalized action.
- Layout effect:
  - card-level decision content outranks bottom CTA and trust strip
  - trust and consultation layers remain supportive, not dominant

#### One Dominant Decision At A Time

- Each card should answer one main question at a time:
  - what is it
  - who is it for
  - why is it different
  - what does it cost
  - what do I do next
- Layout effect:
  - no region may compete equally with all others

#### Reduce Cognitive Load

- Small-width mobile cannot sustain dense multi-layer evaluation.
- Layout effect:
  - spacing must separate decision layers clearly
  - support text must be tightly controlled
  - every visible element must justify its cost

#### Premium Through Clarity

- Premium mobile commerce must feel controlled and easy.
- Layout effect:
  - cleaner rhythm
  - fewer competing accents
  - stronger structure
  - less visual noise at the end of the section

---

### 2. Mobile Card Contract

The card is the primary decision unit.

#### Card Structural Priority

1. Product fit / subtitle block
2. Product title
3. Price
4. CTA
5. Product image
6. Benefit row

#### Card Region Contract

##### 360 Width Contract

- card width: `156px`
- card height: `344px`
- image height: `132px`
- image ratio: approximately `1.18:1`
- image crop policy: center-weighted, product container must remain fully recognizable, no aggressive crop of packaging edge or bottle top
- title area min height: `44px`
- subtitle / fit area min height: `36px`
- benefit area min height: `46px`
- price area min height: `34px`
- CTA area height: `40px`

##### 375 Width Contract

- card width: `164px`
- card height: `348px`
- image height: `136px`
- image ratio: approximately `1.21:1`
- image crop policy: same as `360`
- title area min height: `44px`
- subtitle / fit area min height: `36px`
- benefit area min height: `46px`
- price area min height: `34px`
- CTA area height: `40px`

##### 390 Width Contract

- card width: `172px`
- card height: `352px`
- image height: `140px`
- image ratio: approximately `1.23:1`
- image crop policy: same as `360`
- title area min height: `44px`
- subtitle / fit area min height: `36px`
- benefit area min height: `48px`
- price area min height: `34px`
- CTA area height: `40px`

##### 414 Width Contract

- card width: `184px`
- card height: `356px`
- image height: `146px`
- image ratio: approximately `1.26:1`
- image crop policy: same as `360`
- title area min height: `44px`
- subtitle / fit area min height: `38px`
- benefit area min height: `48px`
- price area min height: `34px`
- CTA area height: `40px`

##### 430 Width Contract

- card width: `192px`
- card height: `360px`
- image height: `150px`
- image ratio: approximately `1.28:1`
- image crop policy: same as `360`
- title area min height: `44px`
- subtitle / fit area min height: `38px`
- benefit area min height: `48px`
- price area min height: `34px`
- CTA area height: `40px`

#### Card Internal Spacing Contract

- card internal padding: `12px` at `360/375`, `14px` at `390/414/430`
- image to title spacing: `10px`
- title to subtitle spacing: `6px`
- subtitle to benefit spacing: `10px`
- benefit to price spacing: `10px`
- price to CTA spacing: `10px`

#### Visual Priority By Region

- highest priority: subtitle / fit + title cluster
- high priority: price row
- high priority: CTA row
- medium priority: image
- lower priority: benefits

---

### 3. Information Hierarchy Contract

| Element | Visual Priority | Reading Priority | Decision Priority | Contract |
|---|---|---|---|---|
| Product fit / subtitle | High | 1 | 1 | must be readable before benefit parsing |
| Product title | High | 2 | 2 | anchors product identity |
| Strongest differentiator | High | 3 | 3 | may be expressed via subtitle or top benefit cue |
| Price | High | 4 | 4 | must be recognized with low effort |
| CTA | High | 5 | 5 | action only after confidence forms |
| Image | Medium | 6 | 6 | supports recognition and desirability |
| Benefits | Medium-low | 7 | 7 | confirmation, not primary understanding |
| Old price | Low | 8 | 8 | secondary comparison cue only |
| Trust strip | Low | 9 | 9 | support layer after decision work |
| Bottom CTA | Low-medium | 10 | 10 | fallback action only |
| Footer note | Low | 11 | 11 | brand closure only |

---

## Decision Architecture Contract

### 4. Decision Hierarchy Contract

#### Within 1 Second

Users should understand:

- this is a product-selection section
- there are multiple options
- each card represents a different product choice

#### Within 2 Seconds

Users should understand:

- which products appear most relevant to them
- that price and action are available
- that the section supports direct choice, not just browsing

#### Within 3 Seconds

Users should understand:

- which one or two products deserve closer attention
- what the main difference is between candidates
- that tapping LINE is the next step only after a product feels right

#### Pre-CTA Psychological Requirement

Before tapping LINE, users should feel:

- I know what this product is
- I know why it may fit me
- I know roughly how it differs from the others
- I know the price
- I am not acting blind

---

### 5. Current Decision Logic vs V2 Decision Logic

#### Current Forced Logic

- see dramatic image
- notice title and price
- attempt to decode subtitle and benefits
- compare dense cards
- tap CTA with partial confidence or postpone choice

#### V2 Target Logic

- detect product choices
- recognize likely fit
- compare top candidates
- gain confidence
- choose one product
- tap LINE

---

### 6. Decision Psychology Mapping

#### Image

- purpose: recognition, emotional interest, desirability
- must not become the primary source of meaning

#### Product Title

- purpose: identity anchor
- must stabilize recall and quick verbal recognition

#### Subtitle / Fit Line

- purpose: product-role recognition
- this is the main hesitation-removal layer

#### Benefit Row

- purpose: confirmation and lightweight differentiation
- not full explanation

#### Price

- purpose: commitment signal
- marks seriousness and readiness

#### Per-card CTA

- purpose: product-specific action
- should feel like the next logical step after confidence

#### Trust Strip

- purpose: safety reassurance
- should lower purchase anxiety without adding heavy reading burden

#### Bottom CTA

- purpose: fallback help / generalized consultation path
- should not compete with confident card-level selection

---

## Responsive Contract

### 7. Breakpoint-Specific Contract

#### 360×740

- section horizontal padding: `12px`
- grid gap: `8px`
- card width: `156px`
- card height: `344px`
- title font: `14px`
- subtitle font: `11px`
- benefit title font: `9px`
- benefit support font: `8px`
- image height: `132px`
- CTA height: `40px`
- CTA text size: `12px`
- trust strip item font must remain compressed and strictly subordinate
- this breakpoint is the baseline constraint authority

#### 375×667

- section horizontal padding: `12px`
- grid gap: `10px`
- card width: `164px`
- card height: `348px`
- title font: `14px`
- subtitle font: `11px`
- benefit title font: `9px`
- benefit support font: `8px`
- image height: `136px`
- CTA height: `40px`
- CTA text size: `12px`

#### 390×844

- section horizontal padding: `16px`
- grid gap: `10px`
- card width: `172px`
- card height: `352px`
- title font: `15px`
- subtitle font: `12px`
- benefit title font: `9px`
- benefit support font: `8px`
- image height: `140px`
- CTA height: `40px`
- CTA text size: `13px`

#### 414×896

- section horizontal padding: `16px`
- grid gap: `12px`
- card width: `184px`
- card height: `356px`
- title font: `15px`
- subtitle font: `12px`
- benefit title font: `10px`
- benefit support font: `8px`
- image height: `146px`
- CTA height: `40px`
- CTA text size: `13px`

#### 430×932

- section horizontal padding: `16px`
- grid gap: `12px`
- card width: `192px`
- card height: `360px`
- title font: `15px`
- subtitle font: `12px`
- benefit title font: `10px`
- benefit support font: `8px`
- image height: `150px`
- CTA height: `40px`
- CTA text size: `13px`

#### Universal Mobile Responsive Rules

- grid remains `2 columns`
- no collapse to `1 column` in standard supported mobile widths
- equal-height cards remain mandatory
- fit line must not be truncated to invisibility
- CTA height may not drop below `40px`
- trust strip must remain visually lighter than the grid

---

## Typography Contract

### 8. Typography Contract

#### Section Intro

- section badge:
  - font size: `11px`
  - line height: `1`
  - weight: `700`
- section heading:
  - `360/375`: `40px / 1.1 / 800`
  - `390/414/430`: `44px / 1.1 / 800`
- section subtitle:
  - `360/375`: `15px / 1.35 / 500`
  - `390/414/430`: `16px / 1.35 / 500`

#### Card Content

- product title:
  - `360/375`: `14px / 1.2 / 800`
  - `390/414/430`: `15px / 1.2 / 800`
  - max lines: `2`
  - wrap policy: wrap allowed
  - truncation policy: avoid truncation unless overflow prototype proves unavoidable
- subtitle / fit:
  - `360/375`: `11px / 1.3 / 500`
  - `390/414/430`: `12px / 1.3 / 500`
  - max lines: `2`
  - wrap policy: wrap allowed
  - truncation policy: do not truncate core fit meaning
- benefit title:
  - `360/375/390`: `9px / 1.15 / 600`
  - `414/430`: `10px / 1.15 / 600`
  - max lines: `2`
- benefit support:
  - `360/375/390/414/430`: `8px / 1.15 / 400`
  - max lines: `2`
- sale price:
  - `360/375`: `20px / 1 / 800`
  - `390/414/430`: `22px / 1 / 800`
- old price:
  - `360/375`: `11px / 1 / 400`
  - `390/414/430`: `12px / 1 / 400`
- card CTA:
  - `360/375`: `12px / 1 / 700`
  - `390/414/430`: `13px / 1 / 700`

#### Trust Strip

- trust item title:
  - `360/375`: `9px / 1.2 / 600`
  - `390/414/430`: `10px / 1.2 / 600`
- trust item subtitle:
  - `360/375/390/414/430`: `8px / 1.15 / 400`

#### Footer Note

- font size:
  - `360/375`: `10px / 1.3 / 500`
  - `390/414/430`: `11px / 1.3 / 500`

#### Minimum Text Block Heights

- title block: `44px`
- subtitle block: `36px` on `360/375`, `38px` on `390/414/430`
- benefit block: `46px` on `360/375`, `48px` on `390/414/430`

---

## Measurement Planning

### 9. Measurement Planning Strategy

#### Already Locked

- 2-column mobile grid model
- equal-height card requirement
- per-card CTA remains primary product action
- bottom CTA remains fallback action
- trust strip remains subordinate support layer
- fit recognition must outrank benefit reading

#### Needs Adjustment

- exact image crop framing per product asset
- exact subtitle block height if copy expansion exceeds current estimate
- exact benefit block compression threshold at `360`
- exact gap between trust strip and final CTA
- exact footer de-emphasis spacing

#### Requires Prototype Validation

- whether `360` subtitle and benefit density is sustainable without overflow
- whether `8px` support text remains acceptable once fit hierarchy is strengthened
- whether image height can reduce further without hurting product recognition
- whether old price remains useful or becomes low-value visual noise on the smallest width

---

## Acceptance Criteria

### 10. Acceptance Criteria

- users understand the section as product selection within `2 seconds`
- likely-fit recognition occurs before full benefit reading
- comparison is faster than current mobile runtime
- perceived density is lower than current runtime at `360` and `375`
- card CTA remains clear without overwhelming the decision layer
- bottom CTA reads as fallback, not competing primary action
- trust strip reduces risk perception without acting as a second dense block
- no horizontal scroll across `360`, `375`, `390`, `414`, `430`
- equal-height cards remain stable across supported mobile widths
- premium rhythm is preserved through clearer spacing and calmer attention flow

### 11. Success Metrics

- first-scan understanding target: `<= 2–3 seconds`
- fit recognition target: faster than current runtime baseline
- comparison effort target: visibly lower than current runtime
- confidence target: sufficient before CTA exposure becomes dominant
- section quality target: `>= 9.0`

---

## Open Questions

- Does current approved mobile content require copy shortening to fully satisfy the `360` contract, or can hierarchy alone solve the density issue?
- Should old price remain visible at equal emphasis across all mobile widths, or become further subordinated at `360/375`?
- Is the benefit support line still valuable at `360`, or should it become conditional in Blueprint V2 design exploration?
- Does trust strip spacing need a stronger separation rule from the final CTA to fully restore reading rhythm?

---

## Final Recommendation

Section 4 Mobile V2 should be treated as a decision-clarity redesign within presentation scope, not as a visual refresh.

This contract is ready for SA review as the planning authority for Blueprint V2.

The next stage should be:

- SA review this contract
- resolve open measurement questions
- generate Mobile Blueprint V2 directly from this contract

Implementation must remain blocked until Blueprint V2 and the next scope artifact are approved.
