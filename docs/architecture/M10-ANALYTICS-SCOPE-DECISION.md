# M10 — Analytics Scope Decision

**Date**: 2026-07-06  
**Phase**: M10 Foundation Hardening  
**Status**: ACTIVE  
**Governance**: Lightweight Z-MOS Style Governance  
**Release Baseline**: v4.1.5-m10-p3d-2-ga4-adapter

## 1. Purpose

This decision record exists to establish a clear, permanent boundary for the scope of analytics work within M10. The purpose is to prevent scope creep, protect the frozen mobile-first baseline, and distinguish between completing a solid Web Analytics Foundation versus attempting to build a full Omnichannel Commerce Analytics system within the current phase.

## 2. Current Scope of M10

M10 Analytics is strictly limited to delivering a **Web Analytics Foundation** for the existing ZENOVELL-PIMPZ-V4-Active platform.

This foundation consists of:
- Vendor-neutral event taxonomy and payload contract
- Analytics utility and dispatcher
- Instrumentation of current web surfaces
- Vendor adapter infrastructure (starting with GA4)

M10 does not extend the platform into true omnichannel commerce analytics.

## 3. Supported Platforms

During M10, analytics supports only:

- Website (Next.js SPA)
- PWA
- Next.js runtime (client-side)
- GA4 (implemented)
- GTM (permitted within M10 if explicitly approved via future patch)
- Meta Pixel (permitted within M10 if explicitly approved)
- TikTok Pixel (permitted within M10 if explicitly approved)
- Other browser-based analytics vendors

All supported platforms must be deliverable through the current web runtime and existing adapter layer.

## 4. Deferred Platforms

The following are explicitly deferred beyond M10:

- LINE OA
- Shopee
- Lazada
- Marketplace APIs and pixels
- CRM integrations
- Server-side event delivery
- Cross-device / cross-platform identity resolution
- Unified attribution across channels
- Omnichannel reporting and dashboards
- Customer Data Platform capabilities

## 5. Architecture Boundary

M10 Analytics ends at the following boundary:

UI  
↓  
analytics.track()  
↓  
AnalyticsDispatcher  
↓  
AdapterRegistry  
↓  
Vendor Adapter

This is the complete and final architecture for M10. Any architecture that introduces additional layers (Channel Layer, Identity Layer, etc.) or changes the flow above belongs to future work.

## 6. Out of Scope

M10 explicitly does NOT include:

- Channel Layer abstraction
- Identity resolution layer
- Marketplace-specific adapters
- Order event orchestration across platforms
- Server-to-server tracking
- Attribution engine
- Unified customer profiles

These topics are reserved for a future Omnichannel Analytics & Commerce Blueprint.

## 7. Future Architecture

The following is reserved for a dedicated future document:

**Omnichannel Analytics & Commerce Blueprint**

This future blueprint is expected to introduce at minimum:

Dispatcher  
↓  
Channel Layer  
↓  
Vendor Adapter  
↓  
Delivery

This separation is necessary to handle fundamentally different platforms (messaging, marketplaces, social) that cannot be cleanly represented by the current web-centric surface and section model.

## 8. Governance Decision

No implementation work beyond the Web Analytics Foundation shall be introduced into M10 without explicit SA approval.

Any attempt to expand M10 into omnichannel capabilities, server-side tracking, or multi-channel identity must be rejected and redirected to the future Omnichannel Analytics & Commerce Blueprint.

## 9. References

- M10 Foundation Hardening Blueprint
- M10 Analytics Foundation
- Gemini Architecture Audit
- Grok Architecture Assessment

## 10. Decision

**Decision**: APPROVED

**Status**: ACTIVE

This document is the official scope authority for the remainder of M10. All future M10 patches must align with the boundaries defined herein.
