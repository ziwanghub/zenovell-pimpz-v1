# Bridge Pattern

## Purpose
Provide a dedicated translation layer between two otherwise-agnostic domains.

## When to Use
- When two layers must exchange data but should not depend on each other's internals.
- When translation logic needs to be isolated and owned by one side.

## When NOT to Use
- For simple data passing inside the same layer.
- When direct coupling is acceptable and intentional.

## Structure
- Thin module (ideally one file).
- Pure functions for translation.
- No business logic, no persistence.

## Example
`lib/analytics/bridge/commerce-analytics-bridge.ts`

## Anti-pattern
Putting translation logic inside the Commerce layer or inside the Dispatcher.

**Status**: Core pattern for Phase 6C-style layered architecture.