# PHASE 6D — SECTION 4 MOBILE PROTOTYPE VALIDATION PLAN

## 1. Document Metadata

- **Project**: ZENOVELL-PIMPZ-V4-Active
- **Phase**: Phase 6D — UI/UX Polish
- **Section**: Section 4
- **Device Scope**: Mobile only
- **Status**: READY FOR PROTOTYPE EXECUTION
- **Version**: v1.0
- **Date**: 2026-07-08
- **Purpose**: Official validation plan for Section 4 Mobile Blueprint V2 before Blueprint Freeze

---

## 2. Validation Scope

Prototype validation must verify that Blueprint V2 performs correctly as a Product Discovery & Decision Layer on mobile before freeze.

Validation scope includes:

1. Card Layout Validation
2. Image Validation
3. Typography Validation
4. Decision Flow Validation
5. Trust Layer Validation
6. CTA Validation
7. Accessibility Validation
8. Responsive Validation
9. Freeze Gate Review

---

## 3. Authority Basis

This validation plan is governed by:

1. `docs/PHASE6D-UI-UX-POLISH-OFFICIAL-DECLARATION.md`
2. `docs/phase-6d/PHASE6D-SECTION-4-PRODUCT-DISCOVERY-AND-DECISION-LAYER-SCOPE-LOCK.md`
3. `DESIGN/Blueprint-Design-Engineering-Specification/src/imports/00-section-pages/section-4-Product-Catalog/section-4-Blueprint-Design-V2.md`
4. `docs/phase-6d/Section4-Mobile-Design-Contract-V2.md`
5. `docs/phase-6d/Section4-Mobile-Layout-Authority-V2.md`
6. `docs/phase-6d/Section4-Mobile-Wireframe-Authority-V2.md`
7. `docs/phase-6d/Section4-Mobile-Visual-Priority-Authority-V2.md`

No validation result may be used to justify architecture change.

---

## 4. Card Layout Validation

Validate at:

- `360`
- `375`
- `390`
- `414`
- `430`

### Must Validate

- density
- overflow
- balance
- equal card height
- readability
- hierarchy clarity
- internal card rhythm

### PASS Criteria

- no text overflow or clipping in title, fit line, benefits, price, or CTA
- all six cards preserve equal-height visual contract
- fit and title dominate more than benefits
- price and CTA remain visible without crowding
- cards feel less dense than current runtime baseline
- card interiors remain readable without zoom-level strain

### FAIL Criteria

- any card content clips, wraps unpredictably, or breaks rhythm
- one or more cards become visually taller due to content instability
- benefits compete equally with fit/title
- price and CTA collide visually with preceding content
- `360` or `375` cards still feel like high-density catalog blocks rather than decision units

---

## 5. Image Validation

Validate all six product images:

- Nicky Pimpz Boss
- Boss Men
- Boss Lady
- NP Gel
- NP Men’s Wipes
- B21

### Must Validate

- crop
- recognition
- packaging visibility
- visual consistency

### PASS Criteria

- product container remains fully recognizable
- no aggressive crop cuts off critical packaging identity
- each card image feels consistent with the shared card contract
- image supports recognition without dominating decision meaning

### FAIL Criteria

- packaging is cropped in a way that harms recognition
- some cards feel more image-heavy than others in a way that breaks comparison fairness
- dramatic crop overwhelms fit/title meaning

---

## 6. Typography Validation

Validate:

- title
- fit line
- benefit text
- price
- old price
- CTA

### PASS Criteria

- title remains readable and stable within its allowed line behavior
- fit line is understandable before deep card reading
- benefit text remains legible and subordinate
- price reads clearly at first glance
- old price remains secondary and does not distract from sale price
- CTA text remains readable and actionable on all supported widths

### FAIL Criteria

- fit line becomes visually weak or semantically unclear
- benefit text becomes illegible or overly dominant
- title wrapping destabilizes card rhythm
- price loses clarity
- CTA text becomes cramped or visually compressed

---

## 7. Decision Flow Validation

The prototype must validate this flow:

Discover

↓

Recognize

↓

Compare

↓

Gain Confidence

↓

Choose

↓

Tap LINE

### PASS Criteria

- users can tell this is a product-choice section immediately
- likely-fit product candidates become apparent quickly
- comparison feels easier than current runtime
- confidence builds before CTA becomes psychologically dominant
- CTA feels like the next step after understanding

### FAIL Criteria

- users still need to read too much before product differences become clear
- likely-fit recognition remains slow
- CTA appears more ready than user confidence
- section still behaves more like a dense product wall than a guided decision layer

---

## 8. Trust Layer Validation

Validate:

Grid

↓

Trust

↓

Bottom CTA

↓

Footer

### PASS Criteria

- trust appears after comparison and feels supportive
- trust does not compete with the product grid
- bottom CTA reads as fallback consultation layer
- footer remains quiet and detached from decision pressure
- post-grid rhythm feels calm and controlled

### FAIL Criteria

- trust feels like a second dense information wall
- bottom CTA competes equally with card CTA behavior
- footer pulls unnecessary attention
- post-grid sequence still feels compressed or noisy

---

## 9. CTA Validation

Validate:

- per-card CTA
- bottom CTA
- action hierarchy

### PASS Criteria

- per-card CTA remains the primary product-level action
- bottom CTA reads as secondary fallback
- users do not confuse the two action roles
- action hierarchy supports both high-intent and uncertain users

### FAIL Criteria

- bottom CTA visually competes with resolved product choice
- card CTA feels too weak after improved fit/price hierarchy
- both CTA layers appear to ask for the same decision at the same time

---

## 10. Accessibility Validation

Check:

- touch targets
- readable text
- contrast
- DOM text

### PASS Criteria

- meaningful text remains DOM text
- interactive targets remain touch-friendly
- key copy remains readable across supported widths
- contrast remains adequate for the decision-critical layers
- improved hierarchy also improves accessibility comfort

### FAIL Criteria

- support text becomes unreadable in practice
- touch targets feel compressed
- hierarchy improvements depend on low-contrast nuance
- meaningful content is visually present but practically unreadable

---

## 11. Responsive Validation

Validate separately at:

- `360`
- `375`
- `390`
- `414`
- `430`

### PASS / FAIL Matrix Rules

Each breakpoint must record:

- `PASS`
- `FAIL`
- notes

### Breakpoint PASS Criteria

#### `360`

- card contract remains stable
- no overflow
- fit recognition remains viable
- density is meaningfully improved from current baseline

#### `375`

- inherits `360` stability without unresolved compression
- hierarchy remains calm

#### `390`

- blueprint baseline remains visually balanced
- no reintroduction of catalog-density feel

#### `414`

- wider viewport improves comfort without changing structure

#### `430`

- section feels most relaxed while preserving exact same decision logic

### Breakpoint FAIL Criteria

- any breakpoint introduces layout instability
- any breakpoint requires reinterpretation of hierarchy
- larger devices redefine structure rather than inherit it

---

## 12. Freeze Gate

Blueprint Freeze may proceed only if all of the following conditions pass:

- Card Layout Validation PASS
- Image Validation PASS
- Typography Validation PASS
- Decision Flow Validation PASS
- Trust Layer Validation PASS
- CTA Validation PASS
- Accessibility Validation PASS
- Responsive Validation PASS across `360 / 375 / 390 / 414 / 430`
- Architecture Freeze remains intact
- No prototype result requires business-logic or CTA-behavior change

If any condition fails:

- Blueprint Freeze is blocked
- implementation remains blocked
- revision must occur at blueprint / prototype layer only

---

## 13. Prototype Execution Notes

Prototype execution should be judged against:

- current runtime baseline
- Blueprint V2 authority
- all Mobile V2 authority layers

Validation should prioritize:

1. smallest-width stability first
2. fit recognition second
3. comparison speed third
4. post-grid rhythm fourth

The prototype is not approved merely because it looks cleaner.

It passes only if it behaves more clearly as a mobile decision layer.

---

## 14. Architecture Freeze Confirmation

This validation plan confirms:

- no runtime changes
- no React changes
- no Tailwind changes
- no blueprint edits in this phase
- no implementation
- no CTA behavior changes
- no analytics changes
- no routing changes
- no Commerce Foundation changes
- no Product Authority changes

This is a read-only validation planning artifact.
