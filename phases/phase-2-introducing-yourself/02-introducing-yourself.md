# Phase 2 · Introducing Yourself to Claude

**Doc 2 of the junior-dev series. Doc 1 taught you what the pieces are; this one puts them on your machine and makes every session know who you are.**

Anchored on Claude Code, with notes for Cowork. This is a hands-on setup guide: you install a small kit, then populate it with Claude using the prompts in Part 3. Every section stands on its own.

*Verified against Anthropic's official documentation in August 2026. Where this doc says "Doc 1", it means the building-blocks reference (`AI Tooling for Junior Full-Stack Developers`).*

*Typography note: this doc avoids the em dash on purpose, to match the author's standing rules. That is a style choice, not a requirement of the setup.*

---

## Table of contents

| # | Part | Answers |
|---|---|---|
| 0 | [Before you start](#0-before-you-start) | What do I need in place first? |
| 1 | [The map: three layers on your machine](#1-the-map-three-layers-on-your-machine) | Where does everything live, and why three places? |
| 2 | [Install the kit](#2-install-the-kit) | How do I stand up the structure safely? |
| 3 | [Populate it with Claude](#3-populate-it-with-claude) | How do I fill each file, with prompts I can paste? |
| 4 | [The routing table](#4-the-routing-table) | When I learn something new, where does it go? |
| 5 | [Level-ups](#5-level-ups) | Commands, a session-start hook, sub-agents |
| 6 | [Common mistakes](#6-common-mistakes) | What goes wrong, and the fix |

---

## 0. Before you start

> The goal of this doc is a machine where every Claude session already knows who you are, what you always want remembered, and where new information should go, without you re-explaining it.

You should have read Doc 1, or at least skimmed its section 10 decision guide. This doc uses the same vocabulary (prompt, `CLAUDE.md`, skill, sub-agent, script, dynamic workflow, hook) without redefining it.

You need three things:

| Need | Check |
|---|---|
| Claude Code installed | Run `claude` in a terminal. If it starts, you are set |
| A `~/.claude` directory | Claude Code creates it on first run. It is your personal (user-level) config |
| Git installed | The installer touches your global gitignore; that is all |

One distinction Doc 1 left implicit and this doc leans on: **`CLAUDE.md` exists at two scopes.**

| Scope | Path | Loads |
|---|---|---|
| Project | `./CLAUDE.md` in a repo | In sessions inside that repo (this is the one Doc 1 describes) |
| Personal / user | `~/.claude/CLAUDE.md` | In **every** session, in every directory |

Your personal ops system rides on the second one. That is the file that can carry "who I am" into every session regardless of what you are working on.

---

## 1. The map: three layers on your machine

> A personal Claude setup is not one folder. It is three layers with different jobs and different trust levels, wired so the private one loads automatically.

### The three layers

| Layer | Path | What it holds | Trust |
|---|---|---|---|
| **Config surface** | `~/.claude/` | Rules, permissions, hooks, slash commands, sub-agents, and the imports that pull in the layer below | Machine-local |
| **Private context** | `~/claude-context/` | Who you are, what to always remember, your roles, your brand | **Private, never published** |
| **Publishable skills** | e.g. `~/claude-skills/` | Reusable procedures (`SKILL.md`), the kind of thing a team could install | Shareable |

The single most important idea in this doc:

> **Your identity, brand, roles, and personal memory can never live in a skills repo you might publish.** They are exactly what a publish-time privacy check exists to keep out. So they get their own private layer, and that layer is loaded into every session on purpose.

Most beginner setups only ever build the skills layer, or dump everything into one `CLAUDE.md` until it is too long to be read. Separating the private context from the publishable procedures, then auto-loading the private context, is the move that makes the whole thing feel like it "knows you."

### How a session gets primed

Your personal `CLAUDE.md` stays short. It holds your hard rules inline, then uses `@import` lines to pull in the short files from your private context. Imports in a `CLAUDE.md` load in every session regardless of directory, which is exactly what you want for identity and core memory.

```
~/.claude/CLAUDE.md
   ├─ (your hard "always / never" rules, kept inline)
   ├─ @~/claude-context/identity/who-i-am.md
   ├─ @~/claude-context/memory/core.md
   └─ @~/claude-context/workflows/_index.md      # the router, in context every session
```

Load order, lowest authority first, highest last:

```
1. ~/.claude/CLAUDE.md         your rules + @imports of private context   (every session)
2. ~/claude-context/*          identity, core memory, router              (via @import)
3. project ./CLAUDE.md         facts about the repo you are in            (when in that repo)
4. ~/.claude/settings.json     permissions + hooks                        (enforced by the harness)
5. the SKILL.md that fires     the procedure for the task at hand         (only when triggered)
```

Note the split Doc 1 section 7 drew: **facts** load early and cheaply (`CLAUDE.md`, imported context), **procedures** load only when triggered (skills), and **enforcement** is not instruction at all (`settings.json` and hooks). Put each thing at the lowest-cost layer that can do the job.

### The tree the kit installs

```
~/.claude/                       the config surface
├── CLAUDE.md                    your rules + @imports (installer appends the imports)
├── settings.json                permissions + hooks (yours; the kit does not touch it)
├── commands/                    /wrap, /ready, /kickoff        (from the kit)
└── agents/                      personal sub-agents            (scaffold from the kit)

~/claude-context/                the private layer (git-ignored)   [THE KIT]
├── identity/
│   ├── who-i-am.md              imported every session; keep short
│   ├── voice.md                 how you sound when Claude drafts as you
│   └── bios.md                  ready-to-paste bios and links
├── memory/
│   ├── core.md                  imported every session; durable facts only
│   ├── decisions.md             dated log of standing decisions
│   └── people.md                collaborators, clients, mentors
├── roles/
│   ├── engineer.md              the "building software" hat
│   ├── role-template.md         copy this to add a hat
│   └── job-seeker/profile.md    source of truth for job-search work
├── brand/
│   ├── brand.md                 positioning + messaging
│   ├── visual.md                colors + type (feeds dataviz / theme-factory)
│   └── assets/                  logos, headshots
├── projects/
│   ├── _index.md                one line per project -> its tracker record
│   └── _TEMPLATE/context.md     copy per project for private narrative context
├── workflows/_index.md          the router, imported every session
└── inbox/                       capture zone: dump now, file later
```

Structured project and task state does **not** live here. That belongs in your tracker (Airtable, Linear, Notion, GitHub Projects). This layer holds who you are and the private narrative around your work; the tracker holds the live records. One source of truth per fact.

---

## 2. Install the kit

> The installer only ever adds. It appends to your `CLAUDE.md` after backing it up, refuses to overwrite files you have already filled in, and is safe to run more than once.

From the unzipped kit folder:

```bash
./setup.sh --dry-run   # print exactly what it would do, change nothing
./setup.sh             # do it
```

What it does, in order:

1. Copies `claude-context/` to `~/claude-context/` with **no-clobber**, so re-running never wipes content you have added.
2. Adds `claude-context/` to `~/.config/git/ignore`, so the private layer can never be committed to any repo.
3. Copies the slash commands and the sub-agents scaffold into `~/.claude/`.
4. Backs up `~/.claude/CLAUDE.md`, then appends the `@import` block once (guarded by a marker, so a second run is a no-op).

If you prefer to do it by hand, the four steps above are all it is: copy a folder, add one gitignore line, copy two folders, and paste the contents of `dot-claude/CLAUDE.md.append` at the bottom of your personal `CLAUDE.md`.

**Verify** by starting a fresh session in any directory and asking: *"What do you know about me from my imported context?"* If the imports are wired, it will answer from `who-i-am.md` and `core.md` even though they are still mostly blank. That confirms the plumbing before you pour anything into it.

---

## 3. Populate it with Claude

> Do not fill these in by hand in an editor. Each stage below is a prompt you paste into Claude Code, running from your home directory, and answer by conversation. Claude writes the file; you supply the truth.

Each stage names its goal, gives a copy-paste prompt, and tells you what "done" looks like. Do them in order; later stages assume earlier ones exist. Two files (`identity/who-i-am.md` and `brand/*`) are deliberately interview-driven, because their content has to be yours and not invented.

### Stage 1: identity and core memory

Goal: the two files that load in every session are true and short.

```text
Read ~/claude-context/identity/who-i-am.md and ~/claude-context/memory/core.md.
Interview me one question at a time to fill them in. Keep who-i-am.md under 30
lines and core.md a short list; these load in every session and cost tokens.
Durable facts and preferences only. If something is a hard "always/never" rule,
propose it for ~/.claude/CLAUDE.md instead. Write the files when we are done and
show me the diff. Do not invent anything about me.
```

Done when: both files read true, contain no placeholders, and nothing in them changes week to week.

### Stage 2: your hard rules

Goal: the "always / never" rules live where they carry the most weight, inline in your personal `CLAUDE.md`.

```text
Read ~/.claude/CLAUDE.md. Interview me for my hard rules: things you must always
or never do (attribution, formatting, tools, privacy). Add them ABOVE the
claude-ops imports block as short imperative lines. For any rule a script or hook
could enforce deterministically (see Doc 1 section 9), tell me so, and note it as
a future hook. Show the diff before writing.
```

Done when: your rules are a short, inline list above the import block, and you know which of them are only instruction (can be missed) versus enforceable later by a hook.

### Stage 3: roles

Goal: at least the engineer hat, plus any other mode you work in.

```text
Read ~/claude-context/roles/engineer.md and role-template.md. Interview me to
fill engineer.md: default stack, musts, must-nots, how I like code delivered, and
my "definition of done" quality gate. Then ask if I want another role (writer,
operator, researcher); if so, copy role-template.md and fill it. Write and diff.
```

Done when: `engineer.md` has a real quality gate you would actually trust, and any second role is one clear mode of work, not a catch-all.

### Stage 4: brand

Goal: anything public-facing comes out on-brand without you restating it.

```text
Read ~/claude-context/brand/brand.md and visual.md. Interview me for positioning
and messaging, then for concrete visual tokens: hex colors and font names. Note
which color pairs pass WCAG AA. Write both files. Then tell me how to point the
dataviz and theme-factory skills at visual.md instead of placeholder palettes.
```

Done when: `visual.md` has real hex values and fonts, and you know how to make a chart or deck use them.

### Stage 5: projects and the router

Goal: a map of your active work, and a router that rides in every session.

```text
Read ~/claude-context/projects/_index.md and workflows/_index.md. Ask me for my
active projects and where each one's structured record lives (my tracker), and
fill _index.md. Then update workflows/_index.md so it lists the skills I actually
use and the situations that should trigger each. Keep the router to one line per
entry. Write and diff.
```

Done when: `_index.md` links each project to its tracker (not a task list pasted into the file), and the router names your real skills.

### Stage 6: capture the habit

Goal: you stop losing decisions to chat history.

```text
From now on, at the end of a working session, I will run /wrap. Confirm you can
see ~/.claude/commands/wrap.md and walk me through what it will do, using the
routing table in 02-introducing-yourself.md. Do not change anything yet.
```

Done when: `/wrap` is recognized and you have run it once end to end.

---

## 4. The routing table

> This is the part you keep. When you learn or decide something, this table says which file it belongs in, so updates land in the right place instead of scrolling out of a chat.

Keep this open while you work, or teach `/wrap` to apply it for you.

| When you have... | It goes in | Why there |
|---|---|---|
| A durable fact or preference true across all work | `memory/core.md` | Loaded every session; this is the always-remember list |
| A hard "always / never" rule | `~/.claude/CLAUDE.md` (rules block) | Highest authority; a hook can enforce the machine-checkable half |
| A dated decision or a reversal | `memory/decisions.md` | A log with dates, so changes are visible not silent |
| A person (client, collaborator, mentor) | `memory/people.md` | Keeps names and context private and in one place |
| A bio, blurb, or standard link | `identity/bios.md` | Stop rewriting these |
| A change to how you sound in writing | `identity/voice.md` | The voice file drafts pull from |
| A stack default or a build must / must-not | `roles/engineer.md` | Role content, loaded when you put that hat on |
| Anything about job hunting or resume claims | `roles/job-seeker/profile.md` | Single grounded source of truth; private by design |
| Positioning, audience, or messaging | `brand/brand.md` | Public-facing work reads from here |
| Colors, fonts, logo rules | `brand/visual.md` | So generated visuals are on-brand by default |
| Narrative context for one project | `projects/<name>/context.md` | The "why" a tracker does not hold |
| Live tasks, status, structured records | your tracker (link it in `projects/_index.md`) | One source of truth; do not duplicate into a file |
| A reusable procedure you have explained 3+ times | a skill in your skills layer (Doc 1 section 7) | Package once, trigger by description |
| A step that must be exactly right every time | a script inside that skill (Doc 1 section 8) | Determinism beats instructions |
| A fan-out over dozens of items | a dynamic workflow (Doc 1 section 9) | More agents than one conversation can track |
| Something automatic before a commit or on an event | a hook in `settings.json` (Doc 1 section 9) | Enforcement, not instruction |
| Anything you are unsure how to file | `inbox/` | Capture now, triage later; better than losing it |

The distinction to internalize: **facts and context go into the private layer, procedures go into skills, enforcement goes into settings and hooks.** If you find yourself pasting a task list or live status into a markdown file, stop and put it in your tracker instead; link to it from `projects/_index.md`.

---

## 5. Level-ups

> Once the base is in place, three additions remove the most friction. None are required; add them when the pain shows up.

### Slash commands (installed)

The kit ships three, in `~/.claude/commands/`:

| Command | Does |
|---|---|
| `/wrap` | End-of-session reconcile: routes what changed to the right file using the table above |
| `/ready` | Lists the top few things ready to pick up next |
| `/kickoff <name>` | Creates a project's private context folder and index row |

A slash command is just a Markdown file whose body is a prompt (Doc 1 calls these reusable prompts). Add your own by dropping a file in `commands/`.

### A session-start hook

Nothing runs at the start of a session by default, so every session opens with Claude working out where it is. A `SessionStart` hook that prints your ready queue removes that. Hooks are deterministic (Doc 1 section 9): they fire on lifecycle events whether or not the model "remembers" to.

```text
Help me add a SessionStart hook to ~/.claude/settings.json that runs my /ready
logic and prints the top 3 things to pick up. Show me the settings.json change
and the command it runs before applying it.
```

### Sub-agents

When you have noisy, self-contained work (audit forty files, return five findings), define a sub-agent in `~/.claude/agents/` (Doc 1 section 6). The kit puts a `README.md` there with the file format. Keep each one to a single job, a read-only tool list where possible, and an explicit stop rule.

---

## 6. Common mistakes

| # | Mistake | Why it hurts | Fix |
|---|---|---|---|
| 1 | Putting everything in `CLAUDE.md` | It loads in every session, so bloat is a tax on all your work, and long files get skimmed | Keep it to rules plus a few imports; move facts to `core.md`, procedures to skills |
| 2 | Personal facts in a publishable repo | One push leaks identity | Keep identity, brand, roles, and profile in `~/claude-context`, which is git-ignored |
| 3 | Turning `core.md` into a journal | It loads every session; a journal there taxes every task | Durable facts only; dated entries go to `decisions.md` |
| 4 | Tracking tasks in markdown files | You get a second, stale copy of your tracker | Keep live state in the tracker; link it from `projects/_index.md` |
| 5 | A dangling `agents` symlink | If the target is missing, no custom sub-agent loads and you never get told | Make `~/.claude/agents` a real directory, or point the symlink at something that exists |
| 6 | Filling templates by hand and inventing content | You end up defending claims you made up, especially in the job-seeker profile | Use the Stage prompts; let Claude interview you and write only what is true |
| 7 | Never reconciling at session end | Decisions live and die in chat history | Run `/wrap`; let the routing table put each thing in its home |

---

## Sources

Verified against Anthropic's official documentation, August 2026, and consistent with Doc 1's source set.

- [Claude Code: memory and CLAUDE.md imports](https://code.claude.com/docs/en/memory)
- [Steering Claude Code: when to use CLAUDE.md, skills, hooks, and subagents](https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more)
- [Claude Code: skills](https://code.claude.com/docs/en/skills)
- [Claude Code: sub-agents](https://code.claude.com/docs/en/sub-agents)
- [Claude Code: hooks](https://code.claude.com/docs/en/hooks)
- [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
