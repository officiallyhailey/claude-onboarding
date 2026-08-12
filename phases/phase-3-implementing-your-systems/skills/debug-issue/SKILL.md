---
name: debug-issue
description: Debugs a failing test, error, or unexpected behavior with a hypothesis-driven method instead of guess-and-check edits. Use when the user pastes an error, says "this is broken", "why is X happening", "failing test", or "it works locally but not in prod".
---

# Debug an issue

Reproduce, isolate, hypothesize, test one variable at a time. Random edits fix symptoms and hide causes.

## Read first
- The exact error text, the failing test, and the code path involved.
- `~/claude-context/config/stack.md` for how to run one test in isolation.

## Steps
1. Reproduce reliably. If you cannot reproduce it, that is the first problem to solve.
2. Isolate: shrink to the smallest failing case. Use `test-one` to run just the failing test.
3. Form a ranked list of the 3 most likely causes, each with the single check that confirms or rules it out.
4. Test one hypothesis at a time. Change one variable per step; revert anything that did not help.
5. Once found, write a test that locks the bug down (hand off to `write-tests`) before fixing.
6. Fix the cause, not the symptom. Run the full quality gate.

## Definition of done
- Root cause named, a regression test added, quality gate green.

## Hand-offs
- Pairs with `write-tests` (regression test) and `self-review`.
- Note the lesson via `learn-log` if it was non-obvious.
