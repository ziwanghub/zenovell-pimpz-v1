# M10-P4D CSS & Paint Cost Audit Release Report

**Date**: 2026-07-06
**Patch**: M10-P4D
**Release Baseline**: v4.1.6-m10-p4b-hero-lcp
**Status**: PROMOTED
**Workstream**: WS-04 Performance Hardening

## Executive Summary

M10-P4D CSS & Paint Cost Audit successfully completed and promoted on clean baseline.

This was an audit-only patch:
- Full inventory of paint costs: shadows, gradients, blurs, animations, overlays.
- Classified findings per M10-P4-PERFORMANCE-SCOPE-LOCK.md
- No implementation or changes made.
- All validations passed.
- Report created in m10-performance/ and this release summary.

Prepares for P4E and future WS-01/07 work on deferred items (e.g. duplicated glow styles, unused deps).

## Scope

Audit only:
- CSS rendering and browser paint costs.
- Inventory of backdrop-filter, shadows, gradients, animations across Hero, sections, header, etc.
- Scope classification of findings.

No code changes, no optimizations.

## Files Reviewed (Audit)

- app/globals.css
- sections/hero/hero-section.tsx and all other sections
- components/layout/global-header.tsx
- Build artifacts for verification
- Prior reports and scope lock

## Key Audit Findings (Summary)

- Dominant cost: 57+ custom pink glow shadows (soft, repeated).
- 36+ custom gradients (radial/linear overlays, stacked in cards and Hero).
- Hero: 3 large scrim gradients + image scale + CTA backdrop-blur.
- Animations: hero-bob infinite on indicators; many hover transitions on CTAs.
- Limited blurs: only 3 instances.
- Many findings classified to WS-01 (duplication), WS-02 (tokens), WS-07 (debt), WS-04 (core paint audit).

## Validation Summary

- npm run lint: PASS
- npm run typecheck: PASS
- npm run build: PASS
- npm run validate: PASS

## Release Decision

PROMOTED

M10-P4D is now part of the official baseline.

This is pure documentation of the audit. No runtime or UI impact.

Next per blueprint: P4E, then WS-01/02/07 for deferred.

## Promotion Details

- Commit: docs(performance): promote M10-P4D css paint audit
- Tag: v4.1.7-m10-p4d-css-paint-audit
- Only the release report and audit documentation promoted.
