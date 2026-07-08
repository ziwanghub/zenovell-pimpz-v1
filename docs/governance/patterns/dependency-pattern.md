# Dependency Matrix Pattern

## Purpose
Make "who may depend on whom" explicit and enforceable.

## When to Use
- Layered architecture with strict boundaries.
- Preventing unwanted coupling.

## When NOT to Use
- Flat architectures.

## Structure
Matrix showing Allowed Imports vs Forbidden Imports per layer.

## Example
Commerce may depend on Analytics Bridge only. Analytics may not depend on Commerce internals.

## Anti-pattern
Cyclic dependencies or direct cross-layer imports that bypass the Bridge.

**Status**: Required in Dependency Matrix Standard.