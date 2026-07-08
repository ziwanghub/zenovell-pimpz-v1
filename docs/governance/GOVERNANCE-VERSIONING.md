# GOVERNANCE-VERSIONING

**Version**: 1.0

## Purpose
Define how governance standards evolve and maintain compatibility.

## Current Versions (at activation)

- Governance Standard: v1.0
- Blueprint Standard: v2.0
- Layer Contract Standard: v1.0
- Architecture Vocabulary: v1.0
- ADR Standard: v1.0

## Compatibility Rules

- Minor version bumps are backward compatible.
- Major version bumps require migration notes and may break compatibility.
- All active projects must declare which governance version they follow in their project charter or README.

## Deprecation Policy

- Old versions are supported for at least 2 major releases after deprecation announcement.
- Deprecated versions must not be used for new projects.
- Migration guides must be provided when deprecating a major version.

## Change Process

1. Propose change via ADR.
2. Update the relevant standard document.
3. Bump version.
4. Announce in governance review.
5. Update all templates and checklists.

**Status**: All governance artifacts must follow this versioning scheme.