# Plan: Fix API Contract Violation Bug

**Work Reference**: work-260821133013-koala-bug-check
**Project**: incident-pricing
**Phase**: Planning
**Date**: 2026-08-21

## Objective

Fix the identified critical bug in the pricing service where `getPrice()` returns the wrong field name, violating the API contract with the incident-orders service.

## Bug Summary

**Location**: `/workspace/index.js:6`
**Issue**: Function returns `{ amount: 100 }` instead of `{ price: 100 }`
**Severity**: HIGH - breaks downstream integration

## Implementation Steps

### Step 1: Fix the Contract Violation
**File**: `/workspace/index.js`
**Line**: 6
**Change**:
- Current: `return { amount: 100 };`
- Fixed: `return { price: 100 };`

**Action**: Edit line 6 to restore the contract field name from `amount` back to `price`.

### Step 2: Remove or Update Bug Comment
**File**: `/workspace/index.js`
**Lines**: 4-5
**Current Comment**:
```javascript
// BUG (deploy abc123): the response field was renamed price -> amount, breaking
// the orders service which still reads .price. Restore the contract field name.
```

**Action**: Remove the bug comment since the bug will be fixed, or update it to document that the fix was applied.

### Step 3: Update Documentation
**File**: `/workspace/docs/work/work-260821133013-koala-bug-check/manifest.md`
**Action**: Update status to reflect implementation phase progress.

## Files to Modify

1. `/workspace/index.js` - Fix the return statement and update comments
2. `/workspace/docs/work/work-260821133013-koala-bug-check/manifest.md` - Update work item status
3. `/workspace/docs/work/work-260821133013-koala-bug-check/implementation/status.md` - Document changes (new file)

## Validation Plan

Since npm is not available in this pod, validation will consist of:

### 1. Static Code Review
- Verify the return statement now uses `{ price: 100 }`
- Confirm field name matches contract specification in README.md
- Cross-reference with test expectations in index.test.js

### 2. Contract Compliance Check
- Read `/workspace/README.md` to confirm contract: `getPrice()` returns `{ price: <number> }`
- Read `/workspace/index.test.js` to confirm test expects `getPrice().price === 100`
- Verify implementation now matches both contract and test expectations

### 3. Documentation Review
- Ensure implementation aligns with requirements in 0001-bug-check-req.md
- Verify all identified bugs have been addressed
- Confirm no new issues introduced

### 4. Structured Review Against Plan
Document in validation.md:
- ✓ Field name changed from `amount` to `price`
- ✓ Return value matches contract specification
- ✓ Test expectations will be satisfied (test expects `.price` field)
- ✓ Integration with incident-orders service restored (they read `response.price`)

**Note**: Full test execution (`npm test`) cannot be performed in this pod due to toolchain limitations. The validation will document this constraint and note that tests should pass when run in an environment with Node.js/npm available.

## Rollback Plan

If the fix needs to be reverted:

1. The change is minimal (single line modification)
2. Git history preserves the previous state
3. Rollback command: `git revert <commit-sha>`
4. The bug comment in the code documents the original issue for future reference

**Risk**: Low - the fix is a simple field name change with no logic modifications.

## Cross-Repository Impact

**Downstream Service**: incident-orders

**Impact of Fix**: POSITIVE
- Restores the API contract that incident-orders depends on
- incident-orders can successfully read `response.price` again
- Integration between pricing and orders services will work correctly

**Coordination Required**:
- No coordination needed for the fix itself (restores existing contract)
- May want to notify incident-orders team that the bug has been fixed
- [UNKNOWN] Whether incident-orders has implemented workarounds that might need removal

## Expected Outcome

After implementation:
- `/workspace/index.js` returns correct contract-compliant response
- Test suite will pass when executed (validates `getPrice().price === 100`)
- incident-orders service can successfully consume pricing data
- API contract documented in README.md is satisfied

## Dependencies

- No external dependencies required
- No toolchain installation needed
- Change is pure JavaScript code modification

## Timeline

This is a simple fix that can be completed in the implementation phase:
- Implementation: ~5 minutes (single line change + comment update)
- Validation: ~10 minutes (structured review and documentation)
- Total: One implementation phase cycle
