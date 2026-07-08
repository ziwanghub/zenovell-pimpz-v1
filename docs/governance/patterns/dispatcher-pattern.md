# Dispatcher Pattern

## Purpose
Centralized component that receives events and routes them to registered handlers/adapters while maintaining a safe default.

## When to Use
- Multiple consumers of the same events.
- Need to support pluggable backends (adapters).
- Want to guarantee at least one safe handler (Noop).

## When NOT to Use
- Single hardcoded handler.
- Simple function calls.

## Structure
- Singleton or central instance.
- `track` / `dispatch` method.
- Delegates to a Registry.

## Example
`lib/analytics/dispatcher.ts`

## Anti-pattern
Each UI component directly calling different adapters.

**Status**: Foundational for analytics and event systems.