---
name: wrap-day
description: Ends a work session by reconciling what changed and filing each item in the right place (memory, decisions, project context, or the task tracker). Use at the end of a session, or when the user says "wrap up", "end of day", "reconcile", or "log what I did".
---

# Wrap the day

Stop losing decisions to chat history. Route what changed to its home before the session ends.

## Read first
- The routing table in `02-introducing-yourself.md` (Doc 2).
- `~/claude-context/workflows/_index.md`.

## Steps
1. Summarize what changed this session: files, decisions, project state, anything learned.
2. Route each item:
   - durable fact or preference -> `~/claude-context/memory/core.md`
   - dated decision or reversal -> `~/claude-context/memory/decisions.md`
   - a person -> `~/claude-context/memory/people.md`
   - project narrative -> `~/claude-context/projects/<name>/context.md`
   - live tasks / status -> the project's tracker (never a markdown file)
   - unsure where it goes -> `~/claude-context/inbox/` with a one-line note
3. Flag stale pointers found along the way (renamed skills, dead links).
4. If anything worth remembering was learned, hand off to `learn-log`.
5. Show the diff of every file you propose to change before writing.

## Definition of done
- Every change from the session has a home or is parked in `inbox/`.
- No fact left duplicated in two files.
- The user approved the diffs.

## Hand-offs
- Backs the `/wrap` command.
- Feeds `learn-log` and `portfolio-update`.
