# ZENOVELL Production Integration Profile

Profile ID:
ZENOVELL_PRODUCTION_INTEGRATION_PROFILE

Status:
ACTIVE

Authority:
Owner / Z-Z + SA Team

Effective Stage:
Production Integration and Client Delivery

Review / Expiry:
Review immediately after client handoff or before Backend / Platform Expansion.

## Business Objective

Complete client delivery readiness and safely begin real traffic acquisition.

## Core Principles

Mandatory and non-bypassable:

- Truth-first
- Evidence before claim
- Explicit authority
- Scope control
- Traceability
- Recoverability
- Externalized state
- Verification before publish
- Git as code truth

## Mandatory Gates

- Git state must be known before work begins.
- Current objective and next safe action must be known.
- External-service status must be recorded.
- No item may be marked VERIFIED without evidence.
- Any code change must pass repository validation.
- Any integration change must pass live browser verification.
- GTM must not be published before required Preview and GA4 checks pass.
- LINE handoff must remain immediate and must not be blocked by analytics.
- Every RC1.x patch must have evidence and a narrow scope.
- Any P0/P1 issue must be assessed before client delivery.

## Optional Gates

- Full runtime trace verification
- Multi-agent independent audit for low-risk changes
- New ADR for small RC patches
- Full lifecycle report for documentation-only changes
- Full Z-MOS runtime command execution when runtime is unavailable

## Deferred Gates

- Full Z-MOS runtime restoration
- Runtime distribution proof
- Agent lane coordination
- Backend governance
- NestJS / PostgreSQL governance
- Admin Dashboard governance
- Platform Expansion gates
- Fresh-clone automation

## Allowed RC1.x Changes

- proven bug fixes
- analytics repair
- GTM/GA4 configuration correction
- LINE integration correction
- browser compatibility fix
- SEO configuration correction
- minor copy correction
- minor spacing correction
- evidence and handoff documentation
- production verification tooling with narrow scope

## Prohibited Changes

- major redesign
- new large sections
- Desktop Authority expansion
- Tablet Authority expansion
- backend implementation
- member system
- CRM
- checkout
- payment
- order management
- speculative architecture refactor
- Z-MOS core redesign during delivery sprint

## Evidence Requirements

For each issue or patch record:

- observed behavior
- expected behavior
- environment
- reproduction steps
- screenshot/log/network evidence
- business impact
- technical impact
- root-cause status
- validation result
- closure evidence

## Stop Conditions

Stop and report when:

- Git state is unclear
- scope exceeds RC1.x
- GTM tag shows a malware warning
- required GA4 event is not verified
- LINE URL authority is inconsistent
- tracking blocks LINE navigation
- documentation claims conflict with runtime evidence
- truth verdict is unsafe
- external-service configuration cannot be verified
- production change has no rollback or recovery path

## Reporting Policy

Use delta-only reports.

Do not repeat complete project history unless required.
