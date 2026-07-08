# GOVERNANCE-METRICS

**Version**: 1.0

## Purpose
Provide objective KPIs to measure governance maturity and effectiveness over time.

## Core Metrics

### Blueprint Revision Count
- **Definition**: Number of times a Blueprint is revised before final approval.
- **Collection**: Count revisions during Blueprint Audit process.
- **Target**: < 3 revisions per batch.

### Critical Findings Count
- **Definition**: Number of Critical audit findings.
- **Target**: 0

### Major Findings Count
- **Definition**: Number of Major audit findings.
- **Target**: ≤ 2, with mitigation plan.

### Ownership Findings
- **Definition**: Count of issues related to ambiguous or incorrect ownership.
- **Target**: Decreasing trend.

### Boundary Findings
- **Definition**: Count of issues related to unclear layer boundaries or coupling.
- **Target**: Decreasing trend.

### Traceability Coverage
- **Definition**: Percentage of key decisions linked to ADRs, PRE reports, and Blueprints.
- **Target**: ≥ 95%

### Scope Leakage Count
- **Definition**: Number of items implemented that were declared Out of Scope.
- **Target**: 0

### Audit Duration
- **Definition**: Number of days from first Blueprint draft to sign-off.
- **Target**: Reduce over time.

### Batch Cycle Time
- **Definition**: Days from PRE-WP00 start to official Closeout.
- **Target**: Track and optimize.

### Closeout Delay
- **Definition**: Days between "Implementation complete" and formal Closeout.
- **Target**: < 3 days.

## Review Cadence
- Per batch during Closeout.
- Quarterly governance health review.

## Success Thresholds
- All Critical = 0
- Major findings trend downward
- Traceability Coverage > 90% within 2 batches of adoption

**Status**: Must be tracked starting from the first batch after Governance Evolution activation.