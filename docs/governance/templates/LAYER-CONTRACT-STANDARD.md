# LAYER-CONTRACT-STANDARD

**Version**: 1.0  
**Purpose**: Provide a reusable template for defining responsibilities and boundaries of each architectural layer.

## Template

### Layer Name
[Name of the layer, e.g., Commerce Context Layer]

### Owner
- Primary Owner: [Team / Role]
- Backup: [Team / Role]

### Responsibilities
- [Max 7 bullet points describing what this layer owns]

### Public Interface
- Methods / Types exposed to other layers
- Example signatures

### Internal Interface
- What this layer uses internally but does not expose

### Entry Point
- How external code enters this layer (e.g., `mergeCommerceContext()`)

### Exit Point
- How this layer produces output for consumers

### Data Ownership
- What data this layer "owns" vs "consumes" or "enriches"

### Lifecycle
- When initialized
- When cleaned up
- Idempotency requirements

### Allowed Dependencies
- List of layers/modules this layer may depend on

### Forbidden Dependencies
- Explicit list of what this layer **must never** depend on

### Usage Examples
```ts
// 2-3 canonical usage examples
```

### Architecture Notes
- Invariants that must never be violated
- "This layer must never..."
- "Only this layer may..."

**Status**: Must be referenced or included in every Blueprint that involves multiple layers.