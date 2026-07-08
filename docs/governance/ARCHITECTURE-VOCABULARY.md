# ARCHITECTURE-VOCABULARY

**Version**: 1.0  
**Purpose**: Controlled vocabulary to eliminate semantic drift across governance documents and Blueprints.

## Terms

### invoke
**Definition**: Direct, synchronous call to a function or method.  
**Allowed usage**: "The Bridge invokes the Dispatcher."  
**Incorrect usage**: Using for delegation or event emission.  
**Example**: "Commerce must never invoke analytics.track() directly."

### delegate
**Definition**: Hand off responsibility to another component while retaining ownership of the outcome.  
**Allowed usage**: "The Dispatcher delegates to the Registry."  
**Incorrect usage**: Treating as a bridge or translation.  
**Example**: "The Commerce Dispatcher delegates translation to the Analytics Bridge."

### consume
**Definition**: Use output or service from another layer without owning its production or internals.  
**Allowed usage**: "The Adapter consumes the AnalyticsPayload."  
**Incorrect usage**: "The layer consumes the Bridge" (wrong ownership).

### produce
**Definition**: Originate data or events as the source of truth.  
**Allowed usage**: "The Commerce Layer produces CommerceEvents."

### provider
**Definition**: Supplies an interface or capability that others depend on.  
**Allowed usage**: "The Registry is the provider of adapter instances."

### consumer
**Definition**: Receives and acts on output without controlling how it is produced.  
**Allowed usage**: "The Analytics Dispatcher is a consumer of the Bridge output."

### bridge
**Definition**: Dedicated translation layer whose sole purpose is to convert between two otherwise-agnostic domains. The only allowed coupling point.  
**Allowed usage**: "The Analytics Bridge is the only module that may translate CommerceEventPayload to AnalyticsPayload."

### translate
**Definition**: Convert data or semantics from one domain representation to another (should be pure).  
**Allowed usage**: "The Bridge translates the payload."

### dispatch
**Definition**: Send an event or command to one or more registered handlers (often fire-and-forget).  
**Allowed usage**: "The Commerce Event Dispatcher dispatches LINE_CLICK."

### emit
**Definition**: Produce an event intended for downstream consumers (typically one-way).  
**Allowed usage**: "The UI emits HERO_CTA_CLICK."

### orchestrate
**Definition**: Coordinate a sequence of steps or layers without owning the internal logic of those steps.  
**Allowed usage**: "cta-activation.ts orchestrates context creation, merge, and handoff."

### owner
**Definition**: The layer or component that has final authority and responsibility for correctness and evolution of a concern.  
**Allowed usage**: "The Analytics layer owns the Dispatcher and Registry."

### boundary
**Definition**: Explicit line across which direct dependencies are controlled or forbidden.  
**Allowed usage**: "The Bridge is the boundary between Commerce and Analytics."

### contract
**Definition**: Formal definition of responsibilities, interfaces, and guarantees between layers.  
**Allowed usage**: "The Layer Contract defines the public interface."

### adapter
**Definition**: Implementation that conforms to a defined interface to provide specific behavior (e.g., vendor-specific).  
**Allowed usage**: "GA4Adapter is an implementation of AnalyticsAdapter."

### registry
**Definition**: Central component that manages the lifecycle and discovery of adapters or components.  
**Allowed usage**: "The AdapterRegistry guarantees a Noop fallback."

### dispatcher
**Definition**: Component responsible for receiving events/commands and routing them to appropriate handlers or adapters.  
**Allowed usage**: "The Analytics Dispatcher is the canonical entry point for tracking."

### facade
**Definition**: Simplified interface that hides complexity of a subsystem.  
**Allowed usage**: "The analytics singleton acts as a facade over the registry and adapters."

### bootstrap
**Definition**: One-time setup process that prepares the system for operation.  
**Allowed usage**: "Initialization is part of application bootstrap."

### initialization
**Definition**: The act of setting up components (adapters, registries, etc.) before they are used. Must be idempotent and centralized.  
**Allowed usage**: "initializeAnalyticsAdapters() performs initialization."

**Status**: This vocabulary is mandatory in all future governance documents and Blueprints.