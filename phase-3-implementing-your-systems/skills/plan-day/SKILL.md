---
name: plan-day
description: Plans a developer's working day by pulling active projects and ready tasks into a short, ordered focus list. Use at the start of a work session, or when the user says "plan my day", "what should I work on", "standup", or "where did I leave off".
---

# Plan the day

Turn "where do I start" into a short, ordered list you can act on, in under a minute.

## Read first
- `~/claude-context/projects/_index.md` for active projects and their trackers.
- `~/claude-context/memory/core.md` for what you are optimizing for right now.
- The last few entries of `~/claude-context/memory/decisions.md` if a recent decision changes priorities.

## Steps
1. List active projects from the index. For each, get the single next action from its tracker link.
2. Rank by what the user is optimizing for (core.md), not by what is easiest.
3. Produce a focus list: at most 3 items, each with one concrete next action and a rough size (S / M / L).
4. Name one thing to explicitly NOT do today, to protect the focus.
5. If a standup is needed, format the list as: yesterday / today / blockers.

## Definition of done
- 3 items or fewer, each with a next action, ordered by priority.
- One explicit "not today".
- Nothing started; this skill plans, it does not build.

## Hand-offs
- Pairs with the `/ready` command.
- Feeds `kickoff-project` or `new-feature` once you pick an item.
- Close the loop at day's end with `wrap-day`.
