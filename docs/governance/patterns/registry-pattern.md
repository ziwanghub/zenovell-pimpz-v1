# Registry Pattern

## Purpose
Central component that manages registration, discovery, and lifecycle of pluggable components (adapters) while guaranteeing safe defaults.

## When to Use
- Need dynamic registration of implementations.
- Must guarantee at least one safe fallback (Noop).
- Want to avoid direct instantiation of concrete adapters throughout the codebase.

## When NOT to Use
- Fixed, small number of implementations known at compile time.

## Structure
- Singleton registry.
- register / unregister / getAll / reset methods.
- Always starts with Noop.

## Example
`lib/analytics/adapters/adapter-registry.ts`

## Anti-pattern
Scattering adapter instances across the codebase.

**Status**: Core for adapter management.