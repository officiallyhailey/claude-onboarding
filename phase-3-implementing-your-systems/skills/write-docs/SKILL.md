---
name: write-docs
description: Writes or updates project documentation (README, setup guide, architecture notes) that a new developer could actually follow. Use when the user says "write the README", "document this", "add setup docs", or "explain how this works" for a codebase.
---

# Write docs

Documentation is judged by one test: could a new developer follow it without you in the room?

## Read first
- The real code, scripts, and config being documented.
- `~/claude-context/config/stack.md` for accurate commands.
- `~/claude-context/brand/*` and `identity/voice.md` for public-facing tone.

## What a good README covers
1. What this is, in one or two sentences.
2. How to run it: exact commands from stack.md, copy-pasteable, in order.
3. How it is structured: the directory map and where to start reading.
4. How to test and deploy: the real commands.
5. Gotchas: the non-obvious things that would trip up a newcomer.

## Steps
1. Verify every command by tracing it to the real config; do not document a command you have not confirmed.
2. Write in plain prose, short sections, and code blocks for anything runnable.
3. Keep it honest about what is incomplete; a "known limitations" note is a feature.
4. For deeper material, link out rather than bloating the README.

## Definition of done
- A newcomer could set up, run, test, and deploy from the docs alone.
- Every command is real and verified.

## Hand-offs
- Delegate long doc generation to the `docs-writer` subagent.
- Pairs with `portfolio-update`.
