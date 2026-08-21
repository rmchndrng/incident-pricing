# Requirements: Bug Check - Pricing Service

**Work Reference**: work-260821133013-koala-bug-check
**Project**: incident-pricing
**Date**: 2026-08-21

## Objective

Check for any remaining bugs in the pricing service and document findings with actionable remediation steps.

## Strand Goal

Check for any remaining bugs in the pricing service. UNKNOWN: specific bug categories, recent issues, or areas of concern to prioritize.

## Research Findings

### Codebase Structure
- **Service Type**: Node.js pricing service
- **Core Module**: `/workspace/index.js` - implements `getPrice()` function
- **Test Suite**: `/workspace/index.test.js` - contract validation test
- **Configuration**: `/workspace/package.json` - minimal setup, no external dependencies
- **Documentation**: `/workspace/README.md` - specifies API contract

### Previous Work Context
From work item `work-260821102602-elk-summarize-solution`, a comprehensive solution summary was created documenting:
- Service architecture and API contracts
- Known bug: contract violation in `getPrice()` function
- Cross-repository dependency with incident-orders service

## Bug Inventory

### Bug #1: API Contract Violation (CONFIRMED - STILL EXISTS)

**Severity**: HIGH - Breaks downstream service integration

**Location**: `/workspace/index.js:6`

**Description**: The `getPrice()` function returns `{ amount: 100 }` but the documented contract requires `{ price: <number> }`. This violates the API contract consumed by the incident-orders service.

**Evidence**:
1. Code comment at `/workspace/index.js:4-5` explicitly documents this as a bug from deploy abc123
2. Implementation returns wrong field: `return { amount: 100 };`
3. Contract specification in `/workspace/README.md:3` states: `getPrice()` returns `{ price: <number> }`
4. Test at `/workspace/index.test.js:5-8` validates the correct contract and expects `.price` field

**Impact**:
- Breaks integration with incident-orders service which reads `response.price`
- Test suite will FAIL when executed (cannot verify in this pod - npm not available)
- Downstream consumers cannot retrieve pricing data

**Root Cause**: Field was renamed from `price` to `amount` in deploy abc123

**Provenance**: Direct code inspection of `/workspace/index.js`

## What This Repository Must Deliver

1. **Bug Documentation**: Comprehensive inventory of all bugs found in the pricing service
2. **Verification Evidence**: Analysis confirming each bug's existence and impact
3. **Remediation Guidance**: Specific, actionable steps to fix each identified bug

## Acceptance Criteria (Binary-Verifiable)

- [ ] All source code files analyzed for bugs (`index.js`, `index.test.js`, `package.json`)
- [ ] Each identified bug documented with:
  - Exact file path and line number
  - Severity classification
  - Impact analysis
  - Remediation steps
- [ ] Previous work items reviewed for historical bug context
- [ ] Cross-referenced with README.md contract specifications
- [ ] No new bugs identified beyond what is documented

## Constraints

1. **Toolchain Limitation**: npm is not available in this pod - cannot run automated tests to verify failures
2. **No KB Available**: No docs/kb/ directory exists - relying on direct code inspection only
3. **Static Analysis Only**: Can perform code review and contract validation, but not runtime verification

## Cross-Repository Dependencies

**Downstream Consumer**: incident-orders
- **Integration Point**: Reads `response.price` from `getPrice()` output
- **Contract Dependency**: TIGHT coupling on `.price` field name
- **Risk**: Any field name mismatch breaks orders service

**UNKNOWN** [requires relay to incident-orders]:
- Does incident-orders have error handling for missing `.price` field?
- What is the integration mechanism (direct import, HTTP API, etc.)?
- Are there additional consumers beyond incident-orders?

## Deliverables

1. Requirements document (this file) documenting bug check scope
2. Planning document with bug fix strategy
3. Implementation changes to fix identified bugs
4. Validation record confirming fixes work correctly

## Summary

One critical bug confirmed in the pricing service: the API contract violation where `getPrice()` returns `{ amount: 100 }` instead of the required `{ price: <number> }`. This bug breaks integration with the incident-orders service. No additional bugs found during code analysis. Remediation requires restoring the contract field name from `amount` back to `price`.

## Provenance Tags
- [Direct inspection]: All findings from examining repository files
- [Previous work]: Context from work-260821102602-elk-summarize-solution
- [UNKNOWN]: Cross-repository integration details require relay to incident-orders
