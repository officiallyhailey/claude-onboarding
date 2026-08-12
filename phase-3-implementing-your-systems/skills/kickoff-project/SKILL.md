---
name: kickoff-project
description: Founds a new codebase from nothing, settling the stack and scope before any code, then scaffolding the repo with a project context file and first commit. Use when the user says "new project", "start a repo", "kick off", "scaffold a new app", or "build X from scratch".
---

# Kickoff a project

The senior move is to settle decisions before writing code, so the first commit is a real foundation, not a guess.

## Read first
- `~/claude-context/config/stack.md` for default tooling.
- `~/claude-context/roles/engineer.md` for musts and must-nots.

## Steps
1. Settle the essentials in a short interview: what it is, who it is for, the stack (default from stack.md), and the top 3 musts and must-nots. Do not skip this to start faster.
2. Confirm the quality gate from stack.md (typecheck + tests + build) will exist from commit one.
3. Scaffold: init the repo, add the toolchain, a minimal passing test, a README stub, and a `.gitignore` that excludes secrets and editor/agent files.
4. Create the project record: add a row to `~/claude-context/projects/_index.md` and a `projects/<name>/context.md` from the template.
5. Make the first commit only after the quality gate passes on the empty scaffold.

## Definition of done
- Repo runs, the empty quality gate is green, README and context.md exist.
- One clean first commit. No secrets or machine paths tracked.

## Hand-offs
- Use `new-feature` for the first real feature.
- Delegate a stack sanity check to the `dep-auditor` subagent if pulling many deps.
