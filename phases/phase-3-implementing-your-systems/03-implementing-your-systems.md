# Phase 3 · Implementing Your Systems

**Doc 3 of the junior-dev series. Doc 1 taught the building blocks; Doc 2 set up your machine and your private context; this doc installs the working library of skills, subagents, hooks, and workflows that run your day.**

Anchored on Claude Code. Every skill here is stack-agnostic: it reads your commands from `stack.md`, so the same library works whatever you build in.

*Verified against Anthropic's official documentation in August 2026. "Doc 1" is the building-blocks reference; "Doc 2" is the machine-setup guide. Em dash avoided on purpose, per the author's standing rules.*

---

## Table of contents

| # | Part | Answers |
|---|---|---|
| 0 | [Before you start](#0-before-you-start) | What must be in place first? |
| 1 | [The library at a glance](#1-the-library-at-a-glance) | What is in here, mapped to my day? |
| 2 | [Install](#2-install) | How do I set it up safely? |
| 3 | [Which layer, and why](#3-which-layer-and-why) | Skill, subagent, hook, or workflow? |
| 4 | [A day with the library](#4-a-day-with-the-library) | How does it feel in practice? |
| 5 | [The catalog](#5-the-catalog) | What does each piece do? |
| 6 | [Extending it](#6-extending-it) | How do I grow the library as I grow? |

---

## 0. Before you start

> This is the procedures layer. It assumes the context layer from Doc 2 is already installed, because the skills read from it.

You need two things in place:

| Need | Why |
|---|---|
| Doc 2's context kit installed (`~/claude-context`) | Skills read `roles/engineer.md`, write to `memory/` and `projects/`, and route through the same homes |
| `~/claude-context/config/stack.md` filled in | Every skill is stack-agnostic and reads its commands (test, build, lint, deploy) from this one file |

If you have not done Doc 2, do it first. Then fill in `stack.md`; the library does nothing useful until it knows your stack.

This library maps onto the four building blocks from Doc 1: **skills** (procedures), **subagents** (specialists for noisy self-contained work), **hooks** (deterministic enforcement), and **dynamic workflows** (fan-out at scale). If those words are fuzzy, reread Doc 1 sections 5 through 9.

---

## 1. The library at a glance

> Twelve skills, five subagents, two hooks, two workflows, organized around the developer's day: plan, build, ship, and grow.

| Moment in the day | Reach for | Kind |
|---|---|---|
| Start the session, decide what to work on | `plan-day` (+ `/ready`) | skill |
| Found a new codebase | `kickoff-project` | skill |
| Build a feature in an existing repo | `new-feature` | skill |
| Add or improve test coverage | `write-tests` -> `test-author` | skill + subagent |
| Chase down a bug or failing test | `debug-issue` | skill |
| Check your own diff before review | `self-review` | skill |
| Get an independent review pass | `code-reviewer` | subagent |
| Open a pull request | `open-pr` | skill |
| Ship it | `deploy-check` | skill |
| Audit before a release | `dep-auditor`, `audit-repo` | subagent + workflow |
| Clear scattered TODOs | `triage-todos` | workflow |
| Research a library or error | `researcher` | subagent |
| Write or update docs | `write-docs` -> `docs-writer` | skill + subagent |
| Capture what you learned | `learn-log` | skill |
| Turn shipped work into portfolio material | `portfolio-update` | skill |
| End the session, file what changed | `wrap-day` (+ `/wrap`) | skill |
| Keep secrets and machine paths out of commits | `pre-commit-guard` | hook |
| Keep the tree formatted after edits | `post-edit-format` | hook |

---

## 2. Install

```bash
./setup-dev.sh --dry-run   # print what it would do
./setup-dev.sh             # do it
```

Additive and no-clobber, exactly like Doc 2's installer. It places skills in `~/.claude/skills`, subagents in `~/.claude/agents`, workflows in `~/.claude/workflows`, hook scripts in `~/.claude/hooks`, and `stack.md` in `~/claude-context/config`.

Two steps stay manual on purpose:

1. **Fill in `stack.md`.** The skills are only as good as the commands you give them.
2. **Register the hooks.** Merge `hooks/settings.snippet.json` into your existing `~/.claude/settings.json` (add the keys into your `hooks` object; do not replace the file), then restart Claude Code. Editing `settings.json` by hand is safer than a script guessing at your existing config.

Verify by asking, in any repo: *"Which of my skills would fire if I said 'add a login endpoint'?"* It should name `new-feature`. That confirms the descriptions are triggering.

---

## 3. Which layer, and why

> The single most common beginner mistake (Doc 1) is putting work in the wrong container. Here is the rule applied to this library.

| If the work is... | Use a... | Because |
|---|---|---|
| A procedure you repeat, with steps and judgment | **skill** | Loads only when its description matches; keeps your context clean until then |
| Noisy and self-contained, returns a summary | **subagent** | Runs in a fresh context; the forty files it reads never touch your conversation |
| Something that must happen every time, no exceptions | **hook** | Enforcement, not instruction; a hook cannot be talked out of firing |
| The same pass over dozens or hundreds of items | **dynamic workflow** | More agents than one conversation can coordinate; runs in the background |

Two concrete pairings in this kit show the split:

- `self-review` (skill) is *your* structured pass over your own diff. `code-reviewer` (subagent) is an *independent* pass in a fresh context. You run both, in that order, because they catch different things.
- `write-tests` (skill) is you writing tests with judgment about what matters. `test-author` (subagent) is a delegated sweep when a whole module needs coverage and you do not need to watch each test appear.

And the enforcement layer is deliberately not a skill: `pre-commit-guard` is a **hook**, because "never commit a secret" is an absolute, and an absolute belongs where it cannot be skipped (Doc 1 section 9).

---

## 4. A day with the library

> Nothing below is required in order. This is just how the pieces connect on a normal day.

**Morning.** You run `plan-day` (or `/ready`). It reads your project index and trackers and hands you three items with next actions, and one thing to skip. You pick one.

**Building.** For a new app you run `kickoff-project`, which makes you settle stack and scope before scaffolding, then commits a green foundation. For work in an existing repo you run `new-feature`, which reads the real code, writes acceptance criteria, names what must not break, and builds against a test. When a whole module needs tests, you delegate to `test-author`. When something breaks, `debug-issue` walks you from reproduce to root cause to regression test, instead of guess-and-check.

**Shipping.** Before review you run `self-review` over your own diff across four lenses, then delegate an independent pass to `code-reviewer`. You run `open-pr`, which refuses to proceed on a red quality gate and writes a description a reviewer can actually use. The whole time, `pre-commit-guard` sits underneath, blocking any commit that would leak a secret or a machine path, and `post-edit-format` keeps the tree tidy. When it is time to release, `deploy-check` runs the pre-deploy list and the post-deploy smoke check, with a rollback path named up front.

**Growing.** You run `learn-log` to capture the non-obvious thing you figured out, with a link to where you applied it. When a project ships, `portfolio-update` turns it into skimmable, defensible portfolio material, and updates your job-seeker profile if it demonstrates a claim you can back up. `write-docs` (or the `docs-writer` subagent) leaves a README a newcomer could follow.

**Weekly.** You run the `audit-repo` workflow to sweep the codebase for a concern in parallel, `dep-auditor` before a release, and `triage-todos` to turn scattered code notes into a ranked list.

**End of day.** You run `wrap-day` (or `/wrap`). It routes everything that changed to its home using the Doc 2 routing table, so nothing worth keeping dies in chat history.

---

## 5. The catalog

### Skills (`~/.claude/skills`)

| Skill | What it does | Fires when you say |
|---|---|---|
| `plan-day` | Turns projects + trackers into 3 ranked next actions | "plan my day", "what should I work on", "standup" |
| `kickoff-project` | Founds a repo: settle scope, scaffold, green first commit | "new project", "start a repo", "scaffold" |
| `new-feature` | Specs and builds a feature grounded in the real code | "add a feature", "implement", "build the X" |
| `write-tests` | Focused tests for behavior and edges | "write tests", "add coverage", "test this" |
| `debug-issue` | Hypothesis-driven debugging to a root cause + regression test | "this is broken", "failing test", "why is X" |
| `self-review` | Four-lens pass over your own diff before review | "review my changes", "ready to merge" |
| `open-pr` | Green gate, self-review, and a usable PR description | "open a PR", "ship this" |
| `deploy-check` | Pre-deploy checklist + post-deploy smoke check | "deploy", "release", "push live" |
| `learn-log` | Dated, proof-linked capture of what you learned | "I learned", "log this" |
| `portfolio-update` | Shipped work into skimmable, defensible portfolio material | "update my portfolio", "write this up" |
| `write-docs` | A README a newcomer could follow, every command verified | "write the README", "document this" |
| `wrap-day` | Routes what changed to its home before the session ends | "wrap up", "end of day", "reconcile" |

### Subagents (`~/.claude/agents`)

| Subagent | Delegate when | Returns |
|---|---|---|
| `code-reviewer` | You want an independent review pass | A ranked findings table (read-only) |
| `test-author` | A module needs coverage written in bulk | Test files + a coverage summary |
| `dep-auditor` | Before a release or after adding deps | A ranked dependency action table (read-only) |
| `researcher` | A question needs reading several sources | A short brief with source links |
| `docs-writer` | Docs are verbose to produce | A verified draft + unverifiable notes |

### Hooks (`~/.claude/hooks`, registered in `settings.json`)

| Hook | Event | Does |
|---|---|---|
| `pre-commit-guard` | PreToolUse(Bash) | Blocks commits that stage secrets, machine paths, or agent/editor files |
| `post-edit-format` | PostToolUse(Edit/Write) | Best-effort formats the file just edited |

### Dynamic workflows (`~/.claude/workflows`)

| Workflow | Does | Args |
|---|---|---|
| `audit-repo` | One agent per file audits for a concern in parallel | `glob`, `concern` |
| `triage-todos` | Finds and triages every TODO/FIXME into a ranked list | none |

---

## 6. Extending it

> The library is a starting point, not a finished thing. It should grow as you do.

**Add a skill** when you have explained the same procedure three times (Doc 1 section 7). Use the `skill-creator` skill, and copy the shape of the skills here: a `description` that says what AND when with concrete triggers, a read-first list, an ordered checklist, a definition of done, and hand-offs.

**Promote a lesson.** When `learn-log` shows the same lesson recurring, that is the signal to turn it into a skill or a script. Recurring judgment becomes a skill; a recurring exact-right operation becomes a script inside one (Doc 1 section 8).

**Write a workflow** only on the third repetition of the same fan-out (Doc 1 section 9). Formalizing too early locks in a process you have not finished learning. When you do, remember the permission gotcha: workflow subagents auto-approve file edits, so do not point one at code you are not ready to have changed.

**Tune the hooks.** The guard patterns and the formatter are starting points. As you get bitten by something new (a file type that leaked, a path that should be blocked), add the pattern. That is how the enforcement layer earns its keep: every rule in it is there because something got through once.

**Keep `stack.md` honest.** When your tooling changes, update the one file. Every skill follows.

---

## Sources

Verified against Anthropic's official documentation, August 2026.

- [Claude Code: skills](https://code.claude.com/docs/en/skills)
- [Claude Code: sub-agents](https://code.claude.com/docs/en/sub-agents)
- [Claude Code: hooks](https://code.claude.com/docs/en/hooks)
- [Claude Code: dynamic workflows](https://code.claude.com/docs/en/workflows)
- [Agent Skills: authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [Steering Claude Code: CLAUDE.md, skills, hooks, and subagents](https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more)
