---
name: open-pr
description: Prepares a pull request with a clear description, a self-review pass, and a green quality gate before it is opened. Use when the user says "open a PR", "create a pull request", "ready to merge", or "ship this".
---

# Open a PR

A good PR is easy to review: small, green, and described so the reviewer knows what to look for.

## Read first
- The diff being proposed (read it in full).
- `~/claude-context/config/stack.md` for the quality gate and commit/branch conventions.

## Steps
1. Run the full quality gate. Do not open a PR on red.
2. Run `self-review` first. Fix what it finds.
3. Write the description: what changed and why, what it does not do, how to test it, and any risk or follow-up.
4. Keep it small. If the diff does two unrelated things, split it.
5. Follow branch and commit conventions from stack.md. Never write agent attribution or machine paths into the commit or PR (see your standing rules).
6. List anything the reviewer should look at closely.

## Definition of done
- Quality gate green, self-review done, description complete, scope single-purpose.

## Hand-offs
- Delegate a deeper independent pass to the `code-reviewer` subagent.
- After merge, consider `deploy-check` and `portfolio-update`.
