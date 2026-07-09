# PHASE 6D — SECTION 4 MOBILE WIREFRAME AUTHORITY V2

## 1. Executive Summary

This document defines the structural composition authority for Section 4 Mobile.

It exists because Layout Authority V2 defines how the section should behave as a decision layer, but Blueprint V2 still requires one additional layer that explains how the section is visually organized before any measurements, styling, or implementation logic are introduced.

This document defines:

- structural composition
- visual region order
- card structure order
- reading path
- eye movement expectations
- dominance relationships
- grouping logic
- alignment philosophy
- whitespace philosophy
- density logic
- decision-stage mapping

This document does not define:

- measurements
- spacing values
- typography sizes
- implementation rules
- runtime behavior

Its role is to remove interpretation before Blueprint V2 is authored.

---

## 2. Section Structural Tree

```text
Section 4 Mobile
├── Intro Region
│   ├── Section Label
│   ├── Section Heading
│   └── Section Purpose Line
│
├── Product Grid Region
│   ├── Card 1
│   ├── Card 2
│   ├── Card 3
│   ├── Card 4
│   ├── Card 5
│   └── Card 6
│
├── Trust Region
│   └── Trust Items Group
│
├── Bottom CTA Region
│   └── Section-level LINE Entry
│
└── Footer Region
    └── Brand Closure Note
```

### Structural Rules

- The section is a linear mobile decision sequence.
- The grid is the main decision workspace.
- Trust exists after the grid because it supports product choice rather than initiating it.
- The bottom CTA exists after trust because it serves unresolved users, not users already ready to choose a card.
- The footer exists as a quiet closure only.

---

## 3. Visual Region Map

### Intro Region

- Purpose: orientation and decision framing
- Function: prepares users to think in terms of choosing, not merely browsing
- Structural role: opening guidance layer

### Grid Region

- Purpose: primary product evaluation space
- Function: presents multiple options in parallel
- Structural role: core decision layer

### Card Region

- Purpose: individual decision unit
- Function: moves users from recognition to action readiness
- Structural role: smallest meaningful choice surface

### Trust Region

- Purpose: reassurance after product evaluation begins
- Function: lowers risk perception
- Structural role: support layer

### CTA Region

- Purpose: fallback section-level action path
- Function: catches users who want guidance or general consultation
- Structural role: secondary conversion layer

### Footer Region

- Purpose: quiet brand closure
- Function: end-of-section finish
- Structural role: lowest-priority visual conclusion

---

## 4. Card Structural Map

The internal card order is:

Image

↓

Fit

↓

Title

↓

Difference

↓

Benefits

↓

Price

↓

CTA

### Why This Order Exists

#### Image

- opens recognition and attention
- signals product identity quickly

#### Fit

- immediately answers relevance
- determines whether the user continues evaluating

#### Title

- confirms identity
- stabilizes what the user is looking at

#### Difference

- distinguishes the card from nearby options
- supports early comparison

#### Benefits

- confirm the product story
- support the difference layer rather than replace it

#### Price

- introduces commitment logic
- transitions from understanding to choice

#### CTA

- completes the card journey
- only becomes psychologically appropriate after meaning and price are understood

---

## 5. Reading Path

The intended reading path is:

Intro

↓

Top row of cards

↓

Second row of cards

↓

Trust region

↓

Bottom CTA

↓

Footer

### Card Reading Path

Within each card, reading should move:

recognition

↓

relevance

↓

identity

↓

difference

↓

confirmation

↓

commitment

↓

action

### Reading Path Rules

- Users should not need to decode the whole card to know whether it matters.
- Reading should become deeper only after relevance is established.
- Support layers must not interrupt the card evaluation flow.

---

## 6. Eye Movement Map

Expected eye movement through the section:

Intro

↓

Top Left Card

↓

Top Right Card

↓

Middle Left Card

↓

Middle Right Card

↓

Bottom Left Card

↓

Bottom Right Card

↓

Trust Region

↓

Bottom CTA

↓

Footer

### Why This Eye Path Exists

- Mobile users move top-down by default.
- In a two-column grid, the first comparison sweep happens across the top row.
- Users then continue row by row rather than reading every card fully before moving.
- Trust should enter only after the grid because it works best as reassurance after comparison.
- Bottom CTA should come after trust because it resolves uncertainty, not discovery.

---

## 7. Dominance Relationship

### Primary

- Grid Region
- Card decision content
- Fit layer
- Title layer
- Difference layer

### Secondary

- Price layer
- Card CTA layer
- Image region

### Support

- Benefit region
- Trust region
- Bottom CTA region

### Background

- Footer region
- decorative emphasis that does not assist choice

### Dominance Rules

- Primary regions drive choice.
- Secondary regions complete commitment.
- Support regions reduce hesitation.
- Background regions must never compete with decision work.

---

## 8. Region Grouping Rules

### Must Feel Grouped Together

- Fit + Title
- Difference + Benefits
- Price + Card CTA
- Trust items as one reassurance block

### Must Feel Separated

- Intro from Grid
- Grid from Trust
- Trust from Bottom CTA
- Bottom CTA from Footer

### Grouping Logic

- Meaning layers should feel internally connected.
- Decision layers should feel distinct from support layers.
- The section should visually communicate where evaluation ends and fallback action begins.

---

## 9. Alignment Philosophy

Alignment must support:

- balance
- comparison
- rhythm
- premium control

### Alignment Rules

- Cards should feel structurally equivalent so comparison feels fair.
- Internal card content should align in a way that supports scanning between sibling cards.
- Region edges should feel deliberate rather than improvised.
- The section should feel composed, not compressed.

### Comparison Alignment Goal

Users should feel they are comparing like with like, not decoding six unrelated visual blocks.

---

## 10. White Space Philosophy

Whitespace in Section 4 Mobile is not decorative.

It exists to create:

- decision recovery
- visual breathing
- separation of mental tasks
- confidence through calm

### White Space Rules

- Intro must breathe enough to frame the section before decision work begins.
- Cards must breathe enough internally to separate meaning from action.
- Trust must have enough separation to feel like reassurance, not spillover.
- Bottom CTA must feel like a new layer, not the last row of the trust block.
- Footer must feel quiet and detached from conversion pressure.

---

## 11. Information Density Rules

### Information That Should Dominate

- fit
- title
- difference
- price
- card CTA

### Information That Should Support Quietly

- benefits
- trust
- bottom CTA
- footer

### Density Rules

- The card must not require full-text reading to become useful.
- Supporting information must not equal the weight of decision-critical information.
- Every additional visible detail must reduce uncertainty, not add effort.

---

## 12. Decision Layer Map

### Discover

- Structural region: Intro + first impression of grid

### Recognize

- Structural region: image + fit + title

### Compare

- Structural region: difference + benefits + neighboring cards

### Confidence

- Structural region: price + trust region

### Choose

- Structural region: card CTA

### LINE

- Structural region: card CTA or bottom CTA depending on user certainty state

### Decision Map Rule

The structure must let users move from broad awareness to narrow commitment without losing orientation.

---

## 13. Blueprint Handoff Rules

Blueprint V2 inherits from this document:

- full section structural tree
- visual region definitions
- card structural order
- reading path
- eye movement model
- dominance relationships
- grouping logic
- alignment philosophy
- whitespace philosophy
- density logic
- decision layer mapping

Blueprint V2 must add:

- measurements
- spacing rules
- typography values
- responsive numeric behavior
- render-ready design decisions

Blueprint V2 must not reinterpret the structural logic defined here.

---

## 14. Architecture Freeze Confirmation

This document confirms:

- no runtime changes
- no React changes
- no Tailwind changes
- no Blueprint generation
- no implementation
- no measurements
- no behavior changes
- no CTA logic changes
- no analytics changes
- no routing changes
- no commerce changes
- no product authority changes

This is a presentation-only authority document.
