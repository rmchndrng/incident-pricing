# Implementation Status: Bug Fix

**Work Reference**: work-260821133013-koala-bug-check
**Project**: incident-pricing
**Phase**: Implementation
**Date**: 2026-08-21

## Changes Made

### File: `/workspace/index.js`

**Lines Modified**: 4-5

**Change Type**: Bug fix - API contract violation

**Before**:
```javascript
  // BUG (deploy abc123): the response field was renamed price -> amount, breaking
  // the orders service which still reads .price. Restore the contract field name.
  return { amount: 100 };
```

**After**:
```javascript
  // FIXED (work-260821133013-koala-bug-check): restored contract field name from amount -> price
  return { price: 100 };
```

**Description**:
- Restored the contract-compliant field name from `amount` back to `price`
- Updated comment to reflect that the bug has been fixed
- Return value now matches the API contract: `{ price: <number> }`

## Files Touched

1. `/workspace/index.js` - Fixed return statement in `getPrice()` function
2. `/workspace/docs/work/work-260821133013-koala-bug-check/implementation/status.md` - This status document
3. `/workspace/docs/work/work-260821133013-koala-bug-check/manifest.md` - Will be updated to reflect implementation complete

## Implementation Details

### Bug Fixed
**Bug #1: API Contract Violation**
- **Location**: index.js:5 (was line 6 before edit)
- **Issue**: Function returned `{ amount: 100 }` violating contract
- **Fix**: Changed to `{ price: 100 }` to match contract specification
- **Status**: ✅ FIXED

### Contract Compliance Verification

**Contract Specification** (from README.md):
> `getPrice()` returns `{ price: <number> }`

**Test Expectation** (from index.test.js:5-8):
```javascript
assert.strictEqual(getPrice().price, 100,
  'pricing must expose { price } — the orders service reads response.price');
```

**Current Implementation** (index.js:5):
```javascript
return { price: 100 };
```

**Result**: ✅ Implementation now matches both contract and test expectations

### Consumer Impact

**Downstream Service**: incident-orders

**Impact**:
- ✅ Can now successfully read `response.price` from `getPrice()` output
- ✅ API contract restored to documented specification
- ✅ Integration between pricing and orders services repaired

## Deferred Items

None. All identified bugs have been fixed.

## Notes

- The fix was a single-line change with minimal risk
- No logic changes, only field name restoration
- Comment updated to document the fix and reference this work item
- Implementation follows the plan exactly as specified in phase-1.md

## Next Steps

Proceed to validation phase to verify the fix through structured code review.
