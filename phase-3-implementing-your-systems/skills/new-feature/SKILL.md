---
name: new-feature
description: Specs and builds a feature inside an existing codebase by reading the real code first, naming what must not break, and defining acceptance criteria before writing. Use when the user says "add a feature", "implement", "build the X page/endpoint", or describes new behavior for an existing app.
---

# New feature

Read the real code before proposing the change. A feature spec grounded in the actual codebase beats one grounded in assumptions.

## Read first
- The relevant existing code and tests (do not guess the shape of the code).
- `~/claude-context/config/stack.md` and `~/claude-context/roles/engineer.md`.

## Steps
1. Restate the feature as an outcome and its acceptance criteria (checkable, not vague).
2. Name what this change must not break (public APIs, existing tests, data shapes).
3. Sketch the smallest design that satisfies the criteria. Prefer editing existing patterns over inventing new ones.
4. Write tests for the acceptance criteria first where practical, then implement.
5. Run the quality gate from stack.md. Fix until honestly green.
6. Self-review before opening a PR (hand off to `self-review`).

## Definition of done
- Acceptance criteria met and covered by tests.
- Quality gate green. Nothing on the must-not-break list broke.

## Hand-offs
- Delegate deep review to the `code-reviewer` subagent.
- Delegate test authoring to the `test-author` subagent.
- Finish with `self-review`, then `open-pr`.
