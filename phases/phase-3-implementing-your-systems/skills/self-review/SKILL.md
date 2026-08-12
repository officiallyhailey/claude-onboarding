---
name: self-review
description: Runs a structured self-review of your own diff before you ask anyone (or any subagent) to review it, catching the obvious problems first. Use before opening a PR, when the user says "review my changes", "check this before I push", or "am I ready to merge".
---

# Self-review

Catch your own obvious mistakes before spending a reviewer's attention on them.

## Read first
- The full diff (not just the files you remember touching).
- `~/claude-context/roles/engineer.md` for your must-nots.

## Four lenses
Review the diff once per lens; do not blend them.
1. Correctness: does it do what it claims? Off-by-one, null/empty, error paths, async edges.
2. Security and privacy: no secrets, keys, tokens, or machine paths in the diff; inputs validated; no new data exposure.
3. Maintainability: names, dead code, duplication, comments that explain "why" not "what".
4. Scope: does the diff do exactly one thing? Anything unrelated should be split out.

## Steps
1. Read the diff top to bottom once for each lens above.
2. List findings as: file, line, severity, one-line fix.
3. Fix high-severity findings before proceeding. Note the rest.
4. Confirm the quality gate is green after fixes.

## Definition of done
- All four lenses applied, high-severity issues fixed, gate green, scope is single-purpose.

## Hand-offs
- For a genuinely independent pass, delegate to the `code-reviewer` subagent (fresh context catches what you cannot).
- Then `open-pr`.
