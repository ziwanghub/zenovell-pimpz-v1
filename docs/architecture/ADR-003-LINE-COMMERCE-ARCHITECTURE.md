# ADR-003: LINE Commerce Architecture

**Date**: 2026-07-06  
**Status**: APPROVED  
**Decision Makers**: Chief System Architect (in alignment with ADR-001, ADR-002, M11 Architecture Checkpoint)  
**Baseline**: v4.1.15-phase4d-cta-contract  
**Supersedes**: None (complements ADR-001 and ADR-002)  
**Related**: ADR-001, ADR-002, PHASE4-COMMERCE-FOUNDATION-BLUEPRINT.md, M11-ARCHITECTURE-CHECKPOINT.md

---

## Executive Summary

ADR-001 established the LINE-First Commerce Landing Platform, where the website's role ends at qualified handoff to LINE OA.

ADR-002 defined the Acquisition Architecture (how traffic is acquired and funneled).

This ADR-003 defines the **LINE Commerce Architecture** — the complete operating model for everything that happens after a user becomes a LINE OA Friend.

The website is the acquisition and qualification layer. LINE OA is the commerce execution layer.

This ADR governs:
- Welcome flows, intent classification, conversation architecture
- Sales pipeline, human/AI handoff
- CRM, tagging, Rich Menu, broadcast, re-engagement
- Repeat purchase and VIP journey
- Data ownership, measurement, and attribution from the LINE side
- Channel Abstraction Layer for future non-LINE channels
- Operational SLAs
- Conversation Outcome Model
- Offline Conversion Feedback loop

**Final Review Additions (this update)**:
- Introduced explicit Channel Abstraction Layer to ensure Commerce Context remains channel-independent.
- Defined measurable SLAs for the end-to-end LINE flow.
- Established standard Conversation Outcome Model for analytics.
- Documented Offline Conversion Feedback architecture for full-funnel attribution.
- Performed consistency review against ADR-001, ADR-002, M11, and Phase 4 Roadmap (no conflicts found).

Together with ADR-001 and ADR-002, this completes the end-to-end architecture. Status changed to APPROVED.

**Core Principle**: The primary KPI is LINE OA Friend Acquisition, but the actual value is created inside LINE (consultation → sale → repeat). The architecture is designed to be channel-agnostic for long-term scalability.

---

## 1. Business Objective

Maximize revenue and customer lifetime value by converting qualified LINE OA Friends into buyers and repeat customers through efficient, personalized, and scalable commerce processes inside LINE OA.

The website delivers the Friend. LINE delivers the revenue.

---

## 2. LINE Responsibilities

LINE OA is the primary commerce and relationship platform:

- Receive and act on Commerce Context from the website.
- Conduct consultation and education.
- Qualify purchase intent and handle objections.
- Close sales (order taking, payment coordination, confirmation).
- Manage fulfillment coordination.
- Handle customer service and retention.
- Drive repeat purchases and upsells.
- Build long-term customer relationships.

LINE is not just a chat tool — it is the CRM, sales channel, and customer success platform.

---

## 3. Website Responsibilities

The website's responsibilities end at the handoff:

- Acquire traffic (Hot/Warm/Cold/Returning).
- Educate and build initial trust.
- Qualify intent and surface interest.
- Capture and pass rich Commerce Context.
- Drive to LINE with pre-filled, context-aware messages.
- Never attempt to replicate sales, consultation, or post-sale processes.

The website must not optimize for on-site checkout or direct purchase as primary outcomes.

---

## 4. Commerce Context Handoff

All website-to-LINE handoffs must carry the official Commerce Context defined in ADR-001 and Phase 4B:

Minimum fields:
- product (slug)
- sku
- campaign
- source
- utm (source, medium, campaign, content)
- landingPage
- entrySurface
- intent
- timestamp

This context must be:
- Passed in the pre-filled LINE message.
- Stored in LINE user profile / tags / notes upon add friend.
- Available to both AI and human agents.
- Used for routing, personalization, measurement, and attribution.

The LINE Message Builder (Phase 4C) is the canonical way to generate the initial message using this context.

---

## 5. LINE Welcome Flow

When a user adds the OA as a friend:

1. **Immediate Welcome** (automated):
   - Acknowledge the source (e.g., "ขอบคุณที่สนใจ NICKY PIMPZ BOSS จากเว็บไซต์").
   - Confirm received context (product/sku/intent).
   - Present clear next steps (consult, view info, order).
   - Offer quick replies based on intent.

2. **Context Confirmation**:
   - Display or reference the product they came from.
   - Ask clarifying questions if intent is unclear.

3. **Routing Decision**:
   - Research → Educational content + AI assistant.
   - High Intent / Ready to Buy → Fast human handoff or order flow.
   - Returning → Personalized history + offers.

The welcome flow must feel personalized from the first message using Commerce Context.

---

## 6. Customer Intent Classification

Extend and operationalize the classification from ADR-001 inside LINE:

- **Research**: Seeking information, ingredients, comparisons, certifications. Route to AI + knowledge content.
- **Consultation**: Needs advice, has questions about suitability. AI first, human if needed.
- **Ready To Buy**: Clear purchase intent, specific product. Fast track to order.
- **Returning Customer**: Previous buyer. Access history, loyalty offers, re-order.
- **VIP / High Value**: High LTV or frequent buyer. Priority human support + special offers.

Intent can be:
- Inferred from website context.
- Updated during conversation.
- Used for routing, broadcast targeting, and measurement.

---

## 7. Conversation Architecture

**Recommended flow**:

AI Layer (first response / qualification)
↓ (when complex or high intent)
Human Sales Layer
↓
Order Confirmation & Payment Coordination
↓
Fulfillment Follow-up
↓
Post-purchase Care & Re-engagement
↓
Repeat Purchase Nurturing

Rules:
- AI handles initial triage, education, and simple queries.
- Human takes over for high-intent, objections, customization, or relationship building.
- Clear escalation triggers and handoff notes (using Commerce Context).
- Every conversation should aim to move the customer forward in the journey.

---

## 8. Sales Pipeline

Stages inside LINE:

1. New Friend (with context)
2. Engaged (replied or viewed content)
3. Qualified (intent confirmed, product interest clear)
4. Proposal / Order Discussion
5. Order Placed
6. Paid
7. Shipped / Delivered
8. Post-purchase (satisfaction, review request)
9. Repeat Opportunity

Each stage should have defined actions, SLAs, and content (messages, rich menus, broadcasts).

---

## 9. CRM Model

LINE OA serves as the primary CRM:

- User profile stores Commerce Context + tags + notes + purchase history.
- Tagging system for segmentation (intent, product interest, lifecycle stage, value tier).
- Notes for human agents to record conversation outcomes.
- Integration points for order data (even if manual initially).

Future: Link to external CRM for advanced automation while keeping LINE as the customer-facing layer.

---

## 10. Tagging Strategy

Recommended core tags (extensible):

- Source: website, organic, google-ads, meta, tiktok, returning
- Product: nicky-pimpz-boss, boss-men, etc. (use SKU)
- Intent: research, high-intent, promotion, returning
- Lifecycle: new-friend, engaged, qualified, customer, repeat, vip
- Value Tier: based on order value or frequency
- Campaign: from utm_campaign or context

Tags must be applied automatically where possible using Commerce Context, and manually by agents.

---

## 11. Rich Menu Strategy

Rich Menu should be context-aware and dynamic where possible:

- Default menu for new friends.
- Product-specific quick actions after context is known (e.g., "สั่งซื้อ [SKU]", "ดูส่วนผสม", "ปรึกษาเพิ่ม").
- Lifecycle menus (new friend vs existing customer vs VIP).

Keep it simple initially: Consult, Order, Info, Contact.

---

## 12. Broadcast Strategy

- **Segmented broadcasts** based on tags (product interest, intent, lifecycle).
- **Triggered broadcasts** after key events (e.g., after friend add, after order).
- **Value-first content**: Education, tips, new product info, success stories — not just promotions.
- Frequency control to avoid fatigue.

Use Commerce Context to make broadcasts relevant.

---

## 13. Re-engagement Strategy

For dormant friends:

- Time-based triggers (e.g., 30/60/90 days no interaction).
- Personalized based on previous interest (product, intent).
- Offer value (tips, limited promotion tied to their product).
- Clear re-entry to conversation.

Avoid spammy behavior. Focus on re-igniting genuine interest.

---

## 14. Repeat Purchase Strategy

- Post-purchase follow-up (thank you, usage tips, review request).
- Replenishment reminders for consumables (based on typical usage cycle).
- Loyalty / VIP program messaging.
- Personalized recommendations using purchase history.
- Easy re-order path (pre-filled message with previous SKU).

Goal: Turn one-time buyers into repeat customers with minimal friction.

---

## 15. Customer Journey Authority

**Official Journey Stages** (from Acquisition through LINE):

Cold (research / problem aware)
↓
Warm (product aware)
↓
Hot (high intent)
↓
Friend (added LINE OA)
↓
Customer (first purchase)
↓
Repeat Customer
↓
VIP / Loyal

Each stage has:
- Expected behaviors and content needs.
- Measurement points.
- Handoff rules between website and LINE.
- Automation vs human responsibilities.

The website owns up to "Friend". LINE owns from "Friend" onward.

---

## 16. Data Ownership Matrix

| Area                  | Primary Owner     | Supporting          | Notes |
|-----------------------|-------------------|---------------------|-------|
| Product data (SKU, pricing, features) | Product / Content | Engineering | Single Source of Truth in products.ts |
| Website content & UX  | Marketing / Product | Engineering | Homepage + PLPs |
| Commerce Context      | Engineering       | Marketing / Sales | Passed from website to LINE |
| LINE Welcome & Flows  | Sales / CRM       | Marketing | Uses context |
| Conversation / Sales  | Sales Team        | AI Automation | Human + AI |
| Customer tags & CRM   | Sales / CRM       | Marketing | Based on context + behavior |
| Broadcasts & Re-engagement | Marketing / CRM | Sales | Segmented by tags |
| Order data            | Operations / Sales| CRM | Linked back to context |
| Measurement & Attribution | Analytics / Engineering | All teams | Full context required |

---

## 17. Measurement

**Key LINE-side Metrics** (layered on top of website metrics):

- Friend Add rate from website (by source, surface, intent, product)
- First message engagement rate
- Conversation start rate
- Time from Friend to first human response
- Conversation → Qualified → Order conversion rates
- AOV and LTV by acquisition source + intent
- Repeat purchase rate and time between purchases
- VIP conversion rate
- Re-engagement success rate

All events should carry Commerce Context for proper attribution.

---

## 18. Business Risks

- Over-reliance on LINE as the only commerce channel (policy, algorithm, or user behavior risk).
- Poor handoff experience if Commerce Context is incomplete or not used.
- Sales team capacity not scaling with Friend volume.
- Automation (AI) quality issues damaging trust.
- Attribution gaps between website and LINE leading to mis-optimized acquisition.
- Customer fatigue from too many broadcasts or poor re-engagement.

---

## 19. Architecture Risks

- No clear Channel Abstraction if we ever need to add other commerce channels (Shopee, Lazada, own checkout).
- Tight coupling between website context format and LINE implementation.
- Lack of unified customer profile across website and LINE if not governed.
- "Dead" contracts (Context, Builder, CTA) if not fully wired and measured.
- Scaling complexity when moving from single-product focus to full catalog.

---

## 20. Decision

**Adopt this LINE Commerce Architecture** as the binding model for all work inside LINE OA.

Key principles:
- Website ends at qualified, context-rich handoff.
- LINE owns the full commerce lifecycle (consult → sale → repeat).
- Commerce Context is the thread that connects acquisition to sales.
- Clear ownership, measurement, and journey stages prevent fragmentation.
- All future LINE features (flows, automation, CRM, broadcasts) must align with this model.

This ADR completes the architectural foundation together with ADR-001 and ADR-002.

No major changes to the LINE commerce model should be made without updating this ADR or creating a superseding one.

---

*ADR-003 defines the post-handoff commerce engine. Combined with ADR-001 (platform definition) and ADR-002 (acquisition), it provides complete end-to-end architectural governance for the LINE-First Commerce Landing Platform.*

---

## Channel Abstraction

The architecture must not permanently couple commerce execution to LINE OA.

**Future Channel Abstraction Layer** (to be implemented in later phases):

A generic `Channel` interface / abstraction that the Commerce Context and sales flows can target:

- **LINE OA** (current primary)
- **Native Checkout** (on-site or web checkout)
- **CRM / External Systems** (direct CRM handoff)
- **Marketplace** (Shopee, Lazada, etc.)
- **Future Messaging Channels** (WhatsApp, Facebook Messenger, etc.)

**Key Principle**:
- Commerce Context (defined in Phase 4B) must remain **channel-independent**.
- The context carries product, sku, intent, utm, source, etc., without assuming the downstream channel.
- Channel-specific adapters will translate the context into the appropriate format (pre-filled message for LINE, order payload for checkout, etc.).

This ensures the website and acquisition layers do not need changes when new commerce channels are added.

---

## SLA Model

Recommended operational SLAs for the LINE commerce flow:

**Minimum Flow & Targets** (measured from the moment the user adds the OA as Friend, using Commerce Context timestamp where applicable):

- Friend Added → Welcome Message: **< 5 seconds** (automated)
- Welcome Message → AI Response (if applicable): **< 30 seconds**
- AI Response → Human Handoff (for high-intent/qualified): **< 5 minutes** (during business hours)
- Human Response (first meaningful reply): **< 15 minutes** (target for high-intent)
- Order Follow-up (after order placed): **< 1 hour** (confirmation + next steps)
- Repeat Follow-up: Triggered based on product usage cycle (e.g., 25-30 days for consumables), with reminder sent **within 48 hours** of trigger.

**Additional SLAs**:
- Context completeness check upon add friend: **100%** of new friends should have Commerce Context attached.
- First human response SLA breach rate: Target **< 10%** for high-intent friends.
- Post-purchase follow-up: Within **24 hours** of delivery confirmation.

These SLAs will be tracked in the future Commerce Verification Suite and LINE analytics.

---

## Conversation Outcome Model

Standard, trackable conversation outcomes (to support analytics, optimization, and attribution):

- **Research**: User primarily seeking information; no purchase intent expressed.
- **Qualified**: Intent confirmed, product interest clear, but not yet ordered.
- **Sold**: Order successfully placed (first purchase).
- **Follow-up**: Post-purchase or nurturing conversation; no immediate sale.
- **No Response**: Friend added but no reply to initial outreach.
- **Lost**: Conversation ended without purchase; no further engagement.
- **Wrong Product**: User was directed to incorrect product; context mismatch.
- **Blocked / Spam**: User blocked or marked as spam.

These outcomes must be logged with full Commerce Context for future analysis (e.g., which website surfaces + intents lead to "Sold" vs "Lost").

---

## Offline Conversion Feedback

**Future Feedback Loop Architecture**:

```
Ads (Google / Meta / TikTok / ...)
  ↓
Website (Acquisition + Context capture)
  ↓
LINE OA (Commerce Context received)
  ↓
Friend → Conversation → Sale
  ↓
Offline Conversion Event (order data + Commerce Context)
  ↓
Google Ads (offline conversion import)
  ↓
Meta (offline / custom events)
  ↓
Future Platforms (TikTok, etc.)
```

**How Commerce Context Enables Attribution**:

The Commerce Context captured on the website (product, sku, utm_*, source, entrySurface, intent, campaign, landingPage, timestamp) is passed to LINE and then attached to the order.

When the sale occurs:
- The order record includes the original Commerce Context.
- This data is sent back to ad platforms as offline conversions.
- Allows proper attribution of sales back to the specific ad click, landing surface, and intent — even though the final transaction happens inside LINE.

This is critical for accurate ROAS calculation and optimization once Phase 4E events and full measurement are in place.

---

## Consistency Review

**Reviewed against**:
- **ADR-001**: Fully consistent. Reinforces website ends at handoff; LINE owns commerce. Channel abstraction addition strengthens the "future evolution" section of ADR-001 without conflict.
- **ADR-002**: Consistent. Acquisition feeds into the LINE model defined here. Commerce Context is the bridge. No conflicts in funnel or KPI definitions.
- **M11 Architecture Checkpoint**: Aligns with recommendations. Adds the missing LINE-side details that M11 noted as incomplete (Channel Abstraction, measurement, risks). Supports the call for verification and proper attribution.
- **Phase 4 Roadmap**: Consistent with 4A–4D contracts feeding into LINE. The handoff, context, and builder from earlier phases are referenced and extended. No deviation from the "contracts first" approach. 4E remains the next step for events.

**Conclusion**: No conflicts found. ADR-003 complements and completes the architecture defined in prior documents. Status changed to APPROVED.

---

*This completes the final review of ADR-003. The document now includes Channel Abstraction, SLA Model, Conversation Outcome Model, Offline Conversion Feedback, and explicit consistency confirmation.*