---
name: write-tests
description: Writes focused tests for existing code, prioritizing behavior and edge cases over coverage numbers. Use when the user says "write tests", "add test coverage", "test this function/endpoint", or when a feature lacks tests before merge.
---

# Write tests

Test behavior and the edges, not lines. A test that cannot fail teaches nothing.

## Read first
- The code under test and any existing tests (match their style).
- `~/claude-context/config/stack.md` for the test and test-one commands.

## Steps
1. List the behaviors worth protecting: the happy path, the boundaries, and the failure modes.
2. For each, write the smallest test that would fail if the behavior broke.
3. Cover edge cases explicitly: empty input, nulls, limits, error paths, and any bug this test is meant to lock down.
4. Run the suite with the `test` command. Confirm the new tests pass, and confirm at least one fails when you deliberately break the code (then restore it).
5. Keep tests independent and fast. No shared mutable state between tests.

## Definition of done
- New tests pass and are proven able to fail.
- Edge cases and the specific bug (if any) are covered.

## Hand-offs
- Delegate large test-writing sweeps to the `test-author` subagent.
- Pairs with `new-feature` and `debug-issue`.
