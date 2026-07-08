# Layer Contract Pattern

## Purpose
Make responsibilities, interfaces, and boundaries of a layer explicit and auditable.

## When to Use
- Multi-layer architecture.
- Need clear ownership and dependency control.
- Preparing for future layers or teams.

## When NOT to Use
- Very simple single-layer applications.

## Structure
See LAYER-CONTRACT-STANDARD.md

## Example
Commerce Context Layer, Analytics Dispatcher Layer.

## Anti-pattern
Implicit contracts described only in code comments or tribal knowledge.

**Status**: Required for all significant layers in post-6C projects.