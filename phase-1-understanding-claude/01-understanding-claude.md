# AI Tooling for Junior Full-Stack Developers

**A working reference for developers who can code but have never built with agents, skills, or workflows.**

Anchored on Claude Code and Claude Cowork, with brief cross-platform notes. Every section stands on its own — skim any one of them without reading the others.

*Verified against Anthropic's official documentation in August 2026. Anything that could not be confirmed is marked with ⚠️ and collected in [Appendix: Verification notes](#appendix-verification-notes).*

---

## Table of contents

| # | Section | Answers |
|---|---|---|
| 1 | [Orientation](#1-orientation) | How do all the pieces fit together? |
| 2 | [Prompting fundamentals](#2-prompting-fundamentals) | What does any good prompt contain? |
| 3 | [Prompting for Claude Chat](#3-prompting-for-claude-chat) | How do I ask well in a conversation? |
| 4 | [Prompting for Cowork](#4-prompting-for-cowork) | How do I brief an agent that plans and executes? |
| 5 | [Agents](#5-agents) | What is an agent and when do I define one? |
| 6 | [Sub-agents](#6-sub-agents) | When is delegation worth the cost? |
| 7 | [Skills](#7-skills) | When does packaged knowledge beat a prompt? |
| 8 | [Scripts](#8-scripts) | When do I want code instead of instructions? |
| 9 | [Workflows](#9-workflows) | How do I orchestrate work at scale, and schedule it? |
| 10 | [Decision guide](#10-decision-guide) | Which one should I reach for? |
| 11 | [Cross-platform notes](#11-cross-platform-notes) | What are these called elsewhere? |
| 12 | [Glossary](#12-glossary) | What does this word mean? |

---

## 1. Orientation

> Building with AI means moving work out of the chat window and into artifacts you can version, share, and re-run — and the whole discipline is deciding which artifact a given piece of work belongs in.

### The mental model

As a full-stack developer you already know a version of this problem. You don't paste the same shell command into your terminal fifty times — you put it in a `Makefile`. You don't re-explain your API contract in every code review — you write it down. Working with AI tooling is the same instinct applied to instructions.

Every piece of guidance you give a model lives somewhere on a spectrum:

| Where it lives | Lifespan | Example |
|---|---|---|
| A message you type | One turn | "Rename this variable" |
| A conversation | One session | "For this whole session, use British spellings" |
| A file in your repo | Forever, for this project | Build commands, code conventions |
| A packaged capability | Forever, across projects and people | Your team's PR review checklist |

The building blocks below are just names for points on that spectrum. Choosing badly is the most common beginner mistake — repeating yourself when you should have written a skill, or writing a skill for something you'll do once.

### The three Claude surfaces

These are different products, not different models. Anthropic describes Chat as *"a conversation you steer turn by turn"* and Cowork as *"a delegation: you describe the goal, Claude works across your files and tools, and you come back to a finished result."*

| Surface | Best for | How it runs |
|---|---|---|
| **Claude Chat** | A conversation you steer turn by turn | You send a message, Claude replies, you react |
| **Claude Cowork** | Multi-step work you delegate: research, analysis, file organization, finished deliverables | You describe an outcome, it plans and executes; sessions run in a cloud sandbox by default and keep working when you close your laptop |
| **Claude Code** | Building software | Runs in your terminal/IDE with access to your file system and dev tools |

Anthropic states that Cowork and Claude Code "run on the same engine. Both are Claude Code underneath." Cowork is scoped to folders you explicitly share; Claude Code runs directly in your project.

Two practical consequences for you:

- **Cowork is not "Chat but slower."** It plans, breaks work into subtasks, runs code and shell commands in an isolated environment, and can coordinate parallel workstreams. That changes what you should put in the prompt (see §4).
- **Skills you write for one surface do not automatically appear on the others.** Custom Skills do not sync across claude.ai, the API, and Claude Code.

### The building-block map

| Block | One-line definition | Lives as | Typical lifespan |
|---|---|---|---|
| **Prompt** | A single instruction you type | A message | One turn |
| **Project context file** | Standing facts about *this* repo | `CLAUDE.md` | Every session in this project |
| **Skill** | Packaged instructions + resources Claude loads when relevant | `SKILL.md` in a directory | Forever, reusable |
| **Script** | Deterministic code a skill runs instead of describing | A file in `scripts/` | Forever, reusable |
| **Agent** | A model in a loop with tools, working toward a goal | The product you're using, or a definition file | Per session |
| **Sub-agent** | A specialized agent the main agent delegates to | `.claude/agents/*.md` | Per delegated task |
| **Workflow** | A script that orchestrates many sub-agents at scale | `.claude/workflows/*.js`, written by Claude | Forever, re-runnable |
| **Plugin** | A shareable bundle of skills, sub-agents, connectors, and hooks | A directory with a manifest | Installed once, used by a team |

### How they nest

```
Agent  (the loop: model + tools + goal)
 ├── reads project context (CLAUDE.md)
 ├── loads Skills when their description matches your request
 │    └── Skills may run Scripts (output enters context; code does not)
 ├── delegates to Sub-agents (fresh context window, returns a summary)
 └── Workflows orchestrate sub-agents by the dozen, from a saved script
      └── Plugins package any of the above so a team can install them
```

**Read next:** if you're new, §2 → §3 → §10. If you're about to build something reusable, jump to §7.

---

## 2. Prompting fundamentals

> A good prompt is a brief for a competent stranger: role, objective, constraints, success criteria, format, and examples — with nothing left implied.

Anthropic's own analogy is the useful one: *"Think of Claude as a brilliant but new employee who lacks context on your norms and workflows."* The golden test they publish: **show your prompt to a colleague with minimal context and ask them to follow it. If they'd be confused, Claude will be too.**

This section is tool-agnostic. It applies to Chat, Cowork, Claude Code, the API, and every competitor product.

### The six ingredients

| Ingredient | What it does | Weak | Strong |
|---|---|---|---|
| **Role** | Sets voice, depth, and default assumptions | *(omitted)* | "You are a senior backend engineer reviewing a junior's PR." |
| **Objective** | States the outcome, not the activity | "Look at my code" | "Find bugs that would cause a 500 in production." |
| **Context** | Supplies what the model can't see or infer | *(omitted)* | "This is an Express API behind Cloudflare; `req.user` is set by middleware." |
| **Constraints** | Bounds the solution space | *(omitted)* | "Don't change the public API. Don't add dependencies." |
| **Success criteria** | Makes "done" checkable | "Make it good" | "Done when every handler has an error path and tests pass." |
| **Format** | Removes guesswork about the output shape | *(omitted)* | "Return a Markdown table: file, line, severity, fix." |

Two more that pay for themselves whenever the task is fuzzy:

| Ingredient | What it does | Note |
|---|---|---|
| **Examples** | Steers format, tone, and structure more reliably than description | Anthropic recommends **3–5 examples**; make them relevant, diverse, and structurally consistent |
| **Not-doing list** | Prevents the obvious wrong turn | State what to do rather than what not to do wherever you can |

### Techniques worth knowing

These are the officially documented techniques, condensed. Anthropic now keeps them on a single living page, *Claude prompting best practices*, rather than one page per technique.

| Technique | One line |
|---|---|
| Be clear and direct | Say exactly what you want; assume no shared context |
| Add context — the *why* | Explaining the reason lets Claude generalize correctly to cases you didn't list |
| Use examples (few-shot) | 3–5 relevant, diverse, structurally consistent examples |
| Structure with XML tags | Wrap each content type in its own tag (`<instructions>`, `<context>`, `<input>`) to prevent misreading |
| Give Claude a role | One sentence in the system prompt measurably focuses behavior and tone |
| Long-context ordering | Put long documents **at the top**, query at the bottom; ask Claude to quote relevant passages before answering |
| Control the output format | Say what to do, not what not to do; show the shape you want |
| Ask Claude to self-check | "Before you finish, verify your answer against [criteria]" |
| Chain complex prompts | Split into stages when you need to inspect intermediate output; the common pattern is draft → review → refine |
| Balance autonomy and safety | For agentic work, ask Claude to confirm before irreversible or destructive actions |

⚠️ **Two techniques you may find in older tutorials are no longer current.** *Prefilling the **final** assistant turn* returns a 400 error on Claude 4.6 and later — assistant messages earlier in the conversation are unaffected, and pre-4.6 models still support prefill. *Manual chain-of-thought* ("think step by step") is now documented as a **fallback for when thinking is off** — current models use adaptive thinking and decide how much to reason on their own.

### Key details to include when writing any prompt

| ✅ Include | Why |
|---|---|
| The outcome, stated as a finished thing | "A migration file" beats "help with the database" |
| Everything the model cannot see | File contents, error text, versions, constraints from your team |
| The definition of done | Otherwise you get plausible work you can't evaluate |
| The output format | Table, file, diff, JSON — pick one |
| What is out of scope | Cheapest way to prevent a 20-minute wrong turn |
| Examples, if format matters | The single highest-leverage addition for consistency |

### Example

```text
Role: You are a senior TypeScript reviewer.
Objective: Find correctness bugs in the diff below that tests wouldn't catch.
Context: Node 22, Express 5. `db.query` returns null (not [] ) when no rows match.
Constraints: Don't propose refactors. Don't suggest new libraries.
Done when: Every issue names a file, a line, and a one-line fix.
Format: Markdown table — file | line | severity | fix.

<diff>
...
</diff>
```

---

## 3. Prompting for Claude Chat

> In Chat you are steering turn by turn, so front-load context and format, and let iteration do the rest — you'll see the result before anything is committed.

### What it is

**Claude Chat** is the conversational surface: you send a message, you read the reply, you correct course. Nothing happens to your files or systems unless you use a tool or connector. The feedback loop is short and cheap, which is exactly what you should exploit.

### When to use it

| Use Chat when | Not Chat when |
|---|---|
| You want to understand something | The task takes twenty steps and produces files |
| You're drafting, exploring, or comparing options | You want to walk away and come back to finished work |
| You'll judge the answer yourself and iterate | The work needs to touch your file system or run for a while |
| The output is text you'll read, not artifacts you'll ship | You'd have to babysit every step to keep it on track |

### How it differs from talking to an agent

| | Chat | Agent (Cowork / Claude Code) |
|---|---|---|
| Unit of work | One reply | One completed task |
| Who decides the steps | You | The agent plans and decomposes |
| Cost of a bad prompt | One rewrite | Wasted execution — possibly file changes |
| What you must supply | Context and format | Context, format, **plus** success criteria, scope boundaries, and permissions |
| Correction | Next message | Ideally before it starts |

The practical rule: **in Chat you can be under-specified and recover; with an agent you pay for it.**

### Key details to include when writing a Chat prompt

| ✅ Include | Notes |
|---|---|
| The actual artifact you're working with | Paste the code, error, or text — don't describe it |
| What you've already tried | Prevents the answer you already ruled out |
| Your level and stack | "I'm new to Rust" changes the entire response |
| The output format | Table, bullet list, code block, essay |
| One question at a time | Multi-question prompts get shallow answers to each |
| A verification ask, if it matters | "Flag anything you're unsure about" |

### Example: weak vs. strong

**Weak**

```text
my auth is broken can you help
```

**Strong**

```text
Express 5 + jsonwebtoken. Login works, but every request to a protected
route 401s. I've confirmed the token is present in the Authorization header
and that JWT_SECRET matches between sign and verify.

Middleware:
[paste 15 lines]

Give me the 3 most likely causes, ranked, each with the one-line check
that would confirm or rule it out. Flag anything you can't tell from this
snippet alone.
```

The strong version names the stack, rules out two dead ends, pastes the real code, caps the output at three items, and asks for falsifiable checks rather than a rewrite.

---

## 4. Prompting for Cowork

> Cowork plans and executes before you see anything, so a Cowork prompt is a work order — objective, done-criteria, scope boundaries, and deliverable — not a question.

### What it is

**Claude Cowork** is Anthropic's agentic surface for multi-step work. Officially: *"Instead of responding to prompts one at a time, Claude can take on complex, multi-step tasks and execute them on your behalf… describe an outcome, step away, and come back to finished work."*

What it does with your request, per Anthropic's documentation:

1. Analyzes the request and creates a plan
2. Breaks complex work into subtasks when needed
3. Runs code and shell commands in an isolated environment on Anthropic's servers
4. Coordinates multiple workstreams in parallel if appropriate
5. Delivers finished outputs to your session for preview and download

It's available on paid plans (Pro, Max, Team, Enterprise) on Claude Desktop for macOS and Windows, and is in beta on web and mobile for Max, Team, and Enterprise, rolling out to Pro. Sessions run in the cloud by default, so work continues when you close your laptop. It uses more of your usage allocation than chatting does.

### When to use it

| Use Cowork when | Use Chat instead when |
|---|---|
| The task has many steps and a clear finish line | You want to think out loud |
| The deliverable is files: documents, spreadsheets, decks, organized folders | The deliverable is an answer |
| You'd otherwise supervise a long sequence of small asks | You want to react to each step |
| You want it to run on a schedule | It's a one-off |

### What changes about the prompt

Because Cowork commits to a plan before you see output, three ingredients move from "nice" to "load-bearing":

| Ingredient | Why it matters more here |
|---|---|
| **Done-when criteria** | The agent decides when to stop. If you don't define done, it guesses |
| **Not-doing list** | Cheaply prevents scope creep that costs real execution time |
| **Deliverable + destination** | "A Markdown file in the outputs folder" is checkable; "a summary" isn't |
| **Permission posture** | Cowork has Manual / Auto / Skip approval modes. Say up front what it may do unattended |
| **Assumptions, stated** | Write your assumptions down and invite correction, rather than leaving gaps for it to fill silently |

### Key details to include when writing a Cowork task

| ✅ Include | Example phrasing |
|---|---|
| Role / frame | "You are a technical writer producing onboarding docs." |
| Objective, as an outcome | "Produce a single reference document that…" |
| Done-when checklist | "Done when it (1)… (2)… (3)…" |
| Not-doing list | "Do not build the website. Do not invent product features." |
| Source of truth | "Verify against docs.claude.com; flag anything you can't confirm." |
| Deliverable + format | "One Markdown file, plus an optional HTML version." |
| Assumptions to correct | "Assuming reference depth, junior-readable. Adjust if wrong." |
| Verification step | "Fact-check every product claim before writing." |

### Example: weak vs. strong

**Weak**

```text
research AI agent tools and write something up for our juniors
```

**Strong**

```text
Role: senior engineer writing onboarding docs for junior full-stack devs.
Objective: one Markdown reference explaining agents, sub-agents, skills,
scripts, and workflows, anchored on Claude Code and Cowork.

Done when: every block has a definition, a "when to use it", a checklist of
what to include when authoring one, and a short example; and there's a
decision table mapping situations to blocks.

Not doing: no marketing tone, no vendor API internals, no website build.
Verify product claims against docs.claude.com and flag anything unconfirmed.

Deliver: one .md file in the outputs folder + a 3-sentence summary.
```

The strong version is a brief: it fixes the audience, the shape, the stopping condition, the boundaries, the source of truth, and the artifact. Note that it reads like a ticket, not a question — that's the tell.

---

## 5. Agents

> An agent is a model running in a loop with tools and a goal — it decides its own next step, which is exactly what makes it powerful and exactly what makes scope discipline mandatory.

### What it is

An **agent** is not a special model. It's a model plus three things:

| Component | What it means |
|---|---|
| **A goal** | The outcome it's working toward |
| **Tools** | Things it can actually do — read files, run bash, search the web, call an API |
| **A loop** | It observes the result of each action and chooses the next one, until done |

Claude Cowork and Claude Code are both agents in this sense. In Claude Code you can also *define* named agents in files, which become selectable personalities with their own tools and permissions.

### When to use it

| Reach for an agent when | Don't when |
|---|---|
| The number of steps isn't knowable in advance | You know the exact three commands to run — just run them |
| Each step depends on the last step's output | The work is a single transformation |
| The work spans tools (files + shell + web + a connector) | A plain prompt gets you there |
| You're willing to define "done" precisely | You can't articulate what success looks like |

**The honest tradeoff:** an agent trades predictability for reach. It will find paths you didn't think of, and it will occasionally take one you didn't want. Constraints are how you buy the predictability back.

### Key details to include when defining one

For a Claude Code agent definition (`.claude/agents/<name>.md`), the fields you'll reach for most — the full reference documents 18:

| Field | Required | What it does |
|---|---|---|
| `name` | **Yes** | Lowercase and hyphens. Cannot contain `:` (reserved for plugin namespacing) |
| `description` | **Yes** | When Claude should delegate to it — this is what triggers selection |
| `tools` | No | Allowlist. Inherits all available tools if omitted |
| `disallowedTools` | No | Denylist; subtracted from the inherited or `tools`-specified list |
| `model` | No | `sonnet` / `opus` / `haiku` / `fable` / a full model ID / `inherit` (default) |
| `permissionMode` | No | How much it may do without asking |
| `maxTurns` | No | Hard cap on agentic turns — a useful safety rail |
| `effort` | No | How hard it thinks: `low` → `max` |
| `skills` | No | Preload specific skills at startup |
| `memory` | No | Persistent memory scope (`user` / `project` / `local`) for cross-session learning |
| `isolation` | No | `worktree` runs it in a temporary git worktree — useful for risky edits |
| `background` | No | `true` always runs it in the background |
| `color` | No | Cosmetic; helps you tell agents apart in output |

Everything after the frontmatter is the agent's system prompt.

Beyond the file format, a definition is only good if it answers:

| ✅ Must answer | Why |
|---|---|
| What is this agent's single job? | Agents with two jobs do both badly |
| What may it touch, and what is off-limits? | Encode this in `tools` / `disallowedTools`, not just prose |
| What does it return to the caller? | "A ranked list of findings" — be specific |
| When should it stop or escalate? | Give it an explicit "if X, stop and report" rule |
| What must it never do? | Destructive operations, force-pushes, credential access |

### Example

```markdown
---
name: migration-reviewer
description: Reviews database migration files for destructive or
  non-reversible operations. Use before any migration is merged.
tools: Read, Grep, Glob
model: sonnet
---

You review SQL migrations for safety only. You do not write or fix them.

For each migration file:
1. Flag DROP, TRUNCATE, and non-nullable ADD COLUMN without a default.
2. Confirm a documented rollback exists.

Return a table: file | risk (high/med/low) | reason | required change.
If no down-migration exists, mark the file high risk and stop.
```

Note what makes this a good definition: one job, read-only tools so it *cannot* edit anything, a fixed output shape, and an explicit stop condition.

---

## 6. Sub-agents

> A sub-agent is a specialist the main agent hands a self-contained job to — it works in its own fresh context window and returns only a summary, which is the whole point and also the whole cost.

### What it is

A **sub-agent** is an agent invoked *by* another agent rather than by you. In Claude Code it's a Markdown file in `.claude/agents/` (project) or `~/.claude/agents/` (personal) — the same file format as §5. The difference is not the file; it's the relationship.

### How it differs from an agent

| | Agent (main session) | Sub-agent |
|---|---|---|
| Who invokes it | You | The main agent (or you, by name) |
| Context window | Your full conversation | **Fresh and isolated** — no conversation history, no files already read, no previously loaded skills |
| What it starts with | Everything so far | Its own system prompt, the task message, your `CLAUDE.md`, and a git status snapshot |
| What comes back | The work itself | A summary — the intermediate reasoning stays in its context, not yours |
| Good for | Iterative work you steer | Self-contained work with verbose intermediate output |

### When delegation is worth it

Anthropic's documented guidance is unusually direct here, so here it is as a table:

| Stay in the main conversation when | Delegate to a sub-agent when |
|---|---|
| You need frequent back-and-forth | The work produces verbose output you don't need to read |
| Phases share significant context | You want to enforce tool or permission restrictions |
| It's a quick, targeted change | The task is self-contained and returns a summary |
| Latency matters | *(inference, not documented guidance:)* you want several independent investigations running in parallel |

The mental model: **delegate when the ratio of noise to signal is high.** A sub-agent that reads forty files and returns five findings is a great trade. A sub-agent that needs three clarifying rounds with you is a bad one — it can't ask you anything mid-task, and each result it returns still costs context in your main conversation.

**Cost that surprises juniors:** the sub-agent's fresh context is *empty*. It has not seen the file you were just discussing. If you don't put the relevant facts in the delegation message, it will go find them again — or guess.

### Key details to include when defining one

| ✅ Include | Why it matters more than for a top-level agent |
|---|---|
| A `description` that says *when to delegate* | This is what the main agent matches against to decide |
| The complete task context in the delegation | It starts blank; nothing is inherited from your conversation |
| A tool allowlist | The main reason to delegate is often containment |
| An explicit return contract | "Return a table with these four columns" — vague returns waste the round trip |
| A turn cap for open-ended work | `maxTurns` stops a research agent from spiraling |
| Whether parallelism is safe | Two sub-agents editing the same file will conflict |

Documented limits worth knowing: sub-agents can nest about three layers deep by default, up to roughly twenty can run concurrently, and background sub-agents get a reduced built-in tool set. ⚠️ These numbers are version-gated in the Claude Code docs — check `/doctor` and your version rather than treating them as fixed.

### Example

```markdown
---
name: dep-auditor
description: Audits a lockfile for known-vulnerable or unmaintained
  dependencies. Use proactively before a release.
tools: Read, Grep, Glob, WebSearch
model: haiku
maxTurns: 15
---

Audit the lockfile you are given. You may read files and search the web.
You may not edit anything.

Return ONLY this table, max 10 rows, highest severity first:
package | installed | issue | recommended action

If you cannot verify a CVE from an official advisory, say "unverified"
in the issue column rather than guessing.
```

This is a good delegation candidate: it reads a lot, searches a lot, and returns ten rows.

---

## 7. Skills

> A skill is a folder of instructions Claude loads only when your request matches its description — it's how you stop re-explaining the same procedure in every conversation.

### What it is

Officially: *"Agent Skills are modular capabilities that extend Claude's functionality. Each Skill packages instructions, metadata, and optional resources (scripts, templates) that Claude uses automatically when relevant."*

The mechanism that makes skills cheap is **progressive disclosure** — content loads in three stages:

| Level | When loaded | Cost | Content |
|---|---|---|---|
| **1. Metadata** | Always, at startup | ~100 tokens per skill | `name` and `description` only |
| **2. Instructions** | When the skill is triggered | Under ~5k tokens | The body of `SKILL.md` |
| **3. Resources** | Only when accessed | Nothing until read | Bundled files; scripts run via bash and only their *output* enters context |

That's why you can install many skills without a context penalty: until one is triggered, it costs you a name and a sentence.

### When a skill beats a plain prompt

| Write a skill when | A prompt is fine when |
|---|---|
| You've explained the same procedure three times | You'll do it once |
| The procedure has steps that must happen in order | It's a single ask |
| It needs reference material (schemas, templates, API docs) | Everything fits in one message |
| Other people on your team need it too | It's personal and ad hoc |
| Correctness matters more than flexibility | Exploration matters more than consistency |

Compare it to the sibling concepts:

| | CLAUDE.md | Skill | Sub-agent |
|---|---|---|---|
| Loaded | Every session, always | Only when triggered | Only when delegated to |
| Runs in | Your context | Your context | Its own fresh context |
| Best for | Standing facts about the repo | A procedure you invoke | Self-contained noisy work |
| Cost when unused | Full token cost, every time | ~100 tokens | Zero |

**Rule of thumb:** if it's a *fact about this project*, it belongs in `CLAUDE.md`. If it's a *procedure*, it belongs in a skill.

### Anatomy of a skill

```
my-skill/
├── SKILL.md          # required: frontmatter + instructions
├── reference.md      # optional: detailed lookup material
├── examples.md       # optional
└── scripts/
    └── validate.py   # optional: deterministic operations
```

Where the directory lives:

| Scope | Path |
|---|---|
| Personal (Claude Code) | `~/.claude/skills/<name>/SKILL.md` |
| Project (Claude Code) | `.claude/skills/<name>/SKILL.md` |
| Plugin | `<plugin>/skills/<name>/SKILL.md` |
| claude.ai / Cowork | Uploaded as a ZIP via **Customize → Skills**, or installed from the skills directory |

### Key details to include when authoring one

| ✅ Element | Requirement | Notes |
|---|---|---|
| `name` | Required in the portable format | Max 64 chars, lowercase/numbers/hyphens, no "claude" or "anthropic" |
| `description` | Required | Max 1024 chars. Must say **what it does AND when to use it** |
| Instructions body | The substance | Keep `SKILL.md` **under 500 lines**; split when it grows |
| Reference files | Optional | Keep references **one level deep** from `SKILL.md`; add a table of contents to any file over 100 lines |
| Scripts | Optional | Use for fragile, deterministic steps; list required packages |
| Consistent terminology | Strongly recommended | Pick one term per concept and use it throughout |
| A checklist for complex tasks | Recommended | Copyable checklists outperform prose for multi-step work |

⚠️ **Portability trap:** Claude Code supports many extra frontmatter fields (`allowed-tools`, `model`, `argument-hint`, and more). Outside Claude Code — claude.ai uploads and the Skills API — only `name`, `description`, `license`, `compatibility`, `metadata`, and `allowed-tools` are legal, and anything else is a hard error. Write portable skills unless you know they're Claude Code-only.

### What makes a `description` trigger reliably

This is the single highest-leverage thing in the whole file, because it's what Claude matches your request against. The documented rules:

| Rule | Do | Don't |
|---|---|---|
| **Third person, always** | "Processes Excel files and generates reports." | "I can help you with spreadsheets." |
| **Say what AND when** | "…Use when the user mentions PDFs, forms, or extraction." | "Handles PDFs." |
| **Include concrete triggers** | File extensions, tool names, the phrases users actually type | Abstract category words |
| **Be specific** | Claude may be choosing among 100+ skills | "Helps with documents" |
| **Avoid filler names** | `processing-pdfs` | `helper`, `utils`, `tools` |

Anthropic's own model description:

```yaml
description: Extract text and tables from PDF files, fill forms, merge
  documents. Use when working with PDF files or when the user mentions
  PDFs, forms, or document extraction.
```

### Example

```markdown
---
name: writing-migrations
description: Writes and reviews Postgres migration files for this repo,
  including up/down pairs and safe column changes. Use when the user
  mentions migrations, schema changes, ALTER TABLE, or new columns.
---

# Writing migrations

## Rules
1. Every migration has a matching down-migration. No exceptions.
2. New columns are nullable OR have a default. Never both-null-and-required.
3. Renames ship as add → backfill → switch reads → drop, across releases.

## Steps
1. Read `reference/schema.md` for current table shapes.
2. Write the up migration, then the down migration.
3. Run `scripts/check_migration.py <file>` and fix anything it reports.
```

Why this works: the description names concrete trigger phrases, the rules are standing (not one-time) instructions, and the fragile check is a script rather than a paragraph of prose.

---

## 8. Scripts

> A script is the part of a skill you don't want the model improvising — deterministic code that runs the same way every time and costs you only its output, not its source.

### What it is

A **script** is executable code bundled with a skill (conventionally in `scripts/`) that Claude runs via bash rather than reading into context. Anthropic's framing: *"Executable scripts… that Claude runs using bash, providing deterministic operations without loading their code into context."*

⚠️ **Naming note:** "Script" is not a separate top-level Anthropic primitive with its own file format the way skills and sub-agents are. It's the code-bundling capability *inside* a skill (or a plugin's `bin/` directory). Treat it as a pattern, not a product feature.

### How it differs from a one-off prompt

| | One-off prompt | Reusable script |
|---|---|---|
| Determinism | Varies run to run | Identical every time |
| Context cost | The whole thing, every time | Only its output |
| Verifiable | By reading the answer | By reading its exit code and tests |
| Good for | Judgment, synthesis, ambiguity | Validation, parsing, formatting, math |
| Fails by | Being subtly wrong | Being loudly wrong |

The rule: **write a script when being wrong is worse than being slow.** Anything with a right answer — checksum validation, schema checks, date math, file renaming by pattern — is script territory. Anything requiring taste stays in instructions.

### Key details to include when writing one

| ✅ Include | Why |
|---|---|
| A one-line docstring saying what it does and what it returns | Claude decides whether to run it based on this |
| Explicit, non-zero exit codes on failure | Silent failure is the worst outcome in an agent loop |
| Real error handling — solve, don't defer | Documented guidance: handle errors explicitly rather than swallowing them |
| No unexplained constants | Every magic number needs a comment saying where it came from |
| Required packages, listed | The runtime may not have what you assume |
| Forward-slash paths only | Windows-style paths are explicitly discouraged |
| Deterministic output format | Claude parses this; keep it stable |
| A statement in `SKILL.md` of *when* to run it | Otherwise it sits unused |

⚠️ **Runtime differences matter.** Skills in Claude Code have full network access. Skills on the Claude API have **no network access and no runtime package installation**. On claude.ai, network access varies by user and admin settings. Write scripts that work in the environment you're actually targeting.

### Example

```python
#!/usr/bin/env python3
"""Check a migration file for unsafe operations.
Prints one finding per line; exits 1 if any HIGH finding is present.
Requires: none (stdlib only)."""
import re, sys

UNSAFE = {r"\bDROP\s+TABLE\b": "HIGH", r"\bTRUNCATE\b": "HIGH",
          r"\bDROP\s+COLUMN\b": "MED"}

sql = open(sys.argv[1]).read().upper()
findings = [f"{lvl}: {p}" for p, lvl in UNSAFE.items() if re.search(p, sql)]
print("\n".join(findings) or "OK")
sys.exit(1 if any(f.startswith("HIGH") for f in findings) else 0)
```

The skill then says: *"Run `scripts/check_migration.py <file>` and fix anything it reports."* Claude never reads the regexes — it reads `HIGH: DROP TABLE` and acts.

---

## 9. Workflows

> In Claude Code, a **dynamic workflow** is a JavaScript script — written by Claude, not by you — that orchestrates dozens or hundreds of sub-agents in the background while your session stays responsive.

⚠️ **"Workflow" is an overloaded word.** In Claude Code it means one specific feature (below). In LangGraph it means "predetermined code paths, as opposed to an agent." In GitHub it means a CI job. In casual speech it means "the way I do a thing." Say **dynamic workflow** on first use when you mean Claude Code's feature.

### What it is

Officially: *"A dynamic workflow is a JavaScript script that orchestrates subagents at scale. Claude writes the script for the task you describe, and a runtime executes it in the background while your session stays responsive."*

The key inversion: with skills and sub-agents, **Claude holds the plan** and decides step by step. With a workflow, **the script holds the plan** — which is what lets it coordinate far more agents than one conversation can track.

| | Skill / sub-agent | Dynamic workflow |
|---|---|---|
| Who holds the plan | Claude, turn by turn | The script |
| Scale | A few delegated tasks per turn | Dozens to hundreds of agents per run |
| Authored by | You (Markdown) | Claude (JavaScript), from your description |
| Runs | In your turn | In the background |

You don't hand-write the script. You describe the task and ask for a workflow (or use the `ultracode` keyword / `/effort ultracode`), Claude writes it, and you can then save that run for reuse — after which it's just `/<name>`.

### When to formalize one

| Reach for a workflow when | Something simpler is better when |
|---|---|
| The task needs more agents than one conversation can coordinate | A few delegations will do — use sub-agents |
| You want the orchestration codified as a script you can read and re-run | The steps are judgment calls, not fan-out — use a skill |
| The same fan-out happens repeatedly (audit every file, triage every issue) | It's a one-off |
| You want it running in the background while you keep working | You need to intervene mid-run — workflows take no user input once started |

**The cost:** a saved workflow is code you now maintain, and formalizing too early locks in a process you haven't finished learning. Three repetitions is a reasonable trigger.

### Where they live and what they look like

| Scope | Path |
|---|---|
| Project (shared via repo) | `.claude/workflows/` |
| Personal | `~/.claude/workflows/` |
| Plugin | `workflows/` at the plugin root; invoked namespaced, e.g. `/acme:release-audit` |

The runtime gives the script three globals: `agent(prompt, opts)` spawns one sub-agent, `pipeline(list, fn)` runs one per item, and `args` carries whatever you passed in.

### Key details to include when building one

| ✅ Element | Notes |
|---|---|
| **Trigger** | The saved name it runs as, plus what `args` it accepts |
| **Inputs** | What must exist before it starts; fail loudly if it doesn't |
| **Fan-out unit** | What one agent handles — one file, one issue, one package |
| **Per-agent return contract** | Use the `schema` option so results are structured, not prose |
| **A reduce step** | What turns N agent results into one deliverable |
| **Failure behavior** | `agent()` returns `null` on stop or unrecoverable error — filter for it |
| **Scale sanity** | Caps are 16 concurrent agents and 1,000 agents per run |
| **The deliverable** | Exactly what the script returns |

⚠️ **Permission gotcha worth memorizing:** sub-agents spawned by a workflow always run in `acceptEdits` mode regardless of your session's permission mode. **File edits are auto-approved.** Don't point a workflow at code you aren't prepared to have modified.

### Example

```javascript
export const meta = {
  name: "audit-migrations",
  description: "Audits every migration file for unsafe operations."
};

const files = await agent(
  "List every file under db/migrations/ changed since the last tag.",
  { schema: { files: ["string"] }, label: "collect" }
);

const findings = await pipeline(files.files, (f) =>
  agent(`Audit ${f} for DROP, TRUNCATE, or non-nullable ADD COLUMN.`,
        { schema: { file: "string", risk: "string", reason: "string" } })
);

return findings.filter(Boolean).filter((r) => r.risk !== "low");
```

One agent collects the work, one agent per file does the audit in parallel, results come back structured, and `.filter(Boolean)` drops any agent that failed.

### The neighbours: hooks, routines, and scheduled tasks

Workflows handle *fan-out*. Three other mechanisms handle *when things run* — juniors routinely confuse them:

| Mechanism | What it does | Where |
|---|---|---|
| **Hooks** | Fire a command automatically at a lifecycle event (e.g. before a tool runs). Deterministic enforcement, not instruction-following | Claude Code |
| **Scheduled tasks** | Re-run a whole task on a cadence — hourly, daily, weekly, weekdays, or manually | Cowork; also Claude Code Desktop |
| **Routines** | A saved prompt + repos + connectors, run on Anthropic's cloud with your laptop closed; triggered by schedule, API call, or GitHub event *(research preview)* | Claude Code |
| **`/loop`** | Re-run a prompt on an interval **within the current session** | Claude Code |

The distinction that matters: Cowork scheduled tasks and Claude Code routines run in the cloud without your machine; Desktop scheduled tasks run locally so they can touch local files; `/loop` only lives as long as your session does.

---

## 10. Decision guide

> Most beginner pain comes from picking the wrong container for the work — this table is the shortcut.

### Which should I use?

| Situation | Reach for | Why |
|---|---|---|
| "Explain this error to me" | **Chat** | You want understanding, not artifacts |
| "Compare three approaches" | **Chat** | Judgment task with a short loop |
| "Reorganize these 200 files and produce a summary doc" | **Cowork** | Multi-step, produces artifacts, worth walking away from |
| "Research this and give me a written report" | **Cowork** | Long-running; plan-and-execute is the point |
| "Fix this bug in my repo" | **Claude Code** | Needs your real file system and dev tools |
| "Every session should know our build commands" | **CLAUDE.md** | A standing fact, not a procedure |
| "I've explained this procedure three times" | **Skill** | Package it once, trigger it by description |
| "This step must be exactly right every time" | **Script** (inside a skill) | Determinism beats instructions |
| "This produces 40 files of output and I need 5 findings" | **Sub-agent** | High noise-to-signal — contain it |
| "I want three independent investigations at once" | **Sub-agents in parallel** | Isolated contexts, no interference |
| "Audit all 300 files in this repo" | **Dynamic workflow** | More agents than one conversation can coordinate |
| "This must run every Monday at 9am" | **Scheduled task** (Cowork) or **routine** (Claude Code) | Runs in the cloud, device-independent |
| "This must happen automatically before every commit" | **Hook** (Claude Code) | Deterministic enforcement, not instruction-following |
| "My whole team needs this setup" | **Plugin** | Versioned, installable, namespaced |

### Common mistakes and their fixes

| # | Mistake | Why it hurts | Fix |
|---|---|---|---|
| 1 | **Writing a Cowork prompt like a Chat message** | The agent plans and commits before you see anything; a vague brief buys a confidently wrong deliverable | Add done-when criteria, a not-doing list, and the exact deliverable. Write a ticket, not a question |
| 2 | **Putting everything in `CLAUDE.md`** | It loads in *every* session, so bloat there is a tax on all your work — and long files get ignored | Keep it under ~200 lines of standing facts; move procedures into skills |
| 3 | **Vague skill `description`s** | The description is the *only* thing Claude matches against. "Helps with data" never triggers | Third person, say what AND when, include the literal phrases and file types users mention |
| 4 | **Delegating chatty work to a sub-agent** | It starts with an empty context, can't ask you anything, and its result still costs your context | Delegate only self-contained, noisy work that returns a summary |
| 5 | **Formalizing a workflow you've run once** | You lock in a process you haven't finished learning, then maintain it forever | Wait for the third repetition, then write it down |
| 6 | **Asking prose to do a script's job** | "Check the date is valid" varies run to run; `validate.py` doesn't | If there's a right answer, write code and let Claude read the output |

---

## 11. Cross-platform notes

> Most of these concepts now have cross-vendor standards rather than vendor synonyms — `SKILL.md`, `AGENTS.md`, and MCP are the three that travel.

The single most useful thing to know: **three of these are cross-vendor standards, not one company's features.**

| Standard | What it covers | Governance |
|---|---|---|
| **MCP** (Model Context Protocol) | How agents connect to tools and data | Created by Anthropic; donated to the Agentic AI Foundation (Linux Foundation) in December 2025 |
| **`AGENTS.md`** | Project-level instructions for coding agents | Agentic AI Foundation (Linux Foundation) |
| **Agent Skills** (`SKILL.md`) | Packaged reusable instructions | Anthropic-originated spec released as an open standard at agentskills.io; no independent steward, but adopted by OpenAI, Google, GitHub/VS Code, Cursor, and LangChain |

### Vocabulary map

| Concept | Anthropic | OpenAI | Google | GitHub Copilot | Cursor | LangChain / LangGraph |
|---|---|---|---|---|---|---|
| **Agent** | Claude Code, Cowork; `.claude/agents/` | Agent (Agents SDK); Codex | Agent (Gemini CLI); ADK `Agent` | Agent role; cloud agent | Agent; Cloud Agents | `create_agent` |
| **Sub-agent** | Sub-agent (`.claude/agents/`) | Handoff, agents-as-tools; Codex subagents (`.codex/agents/`) | Subagents (`.gemini/agents/`) | Subagents | Subagents (`.cursor/agents/`) | Subagents, handoffs; subgraphs |
| **Skill** | Skill (`SKILL.md`) | Skill (`.agents/skills/`) | Agent Skills (`.gemini/skills/`, also `.agents/skills/`) | Agent Skills (`.github/skills/`) | Skills (`.cursor/skills/`, also `.agents/skills/`) | Skills (`deepagents`) |
| **Reusable prompt** | Skill (commands are legacy) | Custom prompts — **deprecated** in favor of skills | Custom commands (`.gemini/commands/*.toml`) | Prompt files (`*.prompt.md`) | Commands (`.cursor/commands/`) | `PromptTemplate` |
| **Workflow** | Dynamic workflows (`.claude/workflows/*.js`); plus hooks, routines, scheduled tasks | Agents SDK orchestration; scheduled tasks | ADK workflow agents (`SequentialAgent`, `ParallelAgent`, `LoopAgent`) | GitHub Actions; Agentic Workflows | Hooks, Automations | **Workflow vs Agent** is the core documented distinction |
| **Project context file** | `CLAUDE.md` | `AGENTS.md` | `GEMINI.md` (configurable to `AGENTS.md`) | `.github/copilot-instructions.md`, `AGENTS.md` | `.cursor/rules/*.mdc`, `AGENTS.md` | None in core |
| **Tools** | Tools + MCP connectors | Tools; function calling | Tools | Tools | Tools | Tools |

### False friends

| Trap | Reality |
|---|---|
| **Custom GPTs / Gems ≠ Skills** | Those are chat-app personas configured in a web UI. No file format, no path, not portable |
| **Copilot "skillsets" ≠ Agent Skills** | Skillsets belonged to the retired GitHub App-based Copilot Extensions, sunset in Nov 2025 |
| **"Workflow" means four different things** | Claude Code: a JS sub-agent orchestration script. LangGraph: predetermined code paths (as opposed to an agent). GitHub: a CI job. Everyone else: "the way I do a thing." Always qualify it |
| **Cursor "Composer"** | Named a UI mode in 2025, then reused for Cursor's own model. Ambiguous — ask which one someone means |

**Direction of travel:** several vendors are consolidating reusable-prompt features into Skills. OpenAI has formally deprecated custom prompts in favor of skills; Copilot and Cursor both ship migration tooling pointing the same way. Learning the `SKILL.md` format is the highest-transfer investment on this page.

---

## 12. Glossary

| Term | Definition |
|---|---|
| **Adaptive thinking** | Current Claude models decide when and how much to reason internally, rather than you setting a token budget |
| **Agent** | A model running in a loop with tools and a goal, choosing its own next action until done |
| **`AGENTS.md`** | A cross-vendor standard file holding project-level instructions for coding agents |
| **Agent Skills** | The open standard (agentskills.io) defining the `SKILL.md` packaged-instructions format |
| **Artifact** | Substantial standalone content Claude produces in its own window — a document, app, diagram, or component |
| **Chain of thought** | Asking a model to reason step by step; now a fallback for when adaptive thinking is off |
| **`CLAUDE.md`** | Claude Code's project context file — standing facts loaded at the start of every session |
| **Claude Chat** | The conversational surface, steered turn by turn |
| **Claude Code** | Anthropic's agentic coding tool, running in your terminal or IDE with file system access |
| **Claude Cowork** | Anthropic's agentic surface for multi-step knowledge work; plans and executes, runs in a cloud sandbox |
| **Connector** | An external service (via MCP) an agent can call — Slack, Drive, a database |
| **Context window** | The total text a model can consider at once; every loaded file and result competes for it |
| **Done-when criteria** | An explicit, checkable definition of task completion — the load-bearing part of an agent prompt |
| **Few-shot prompting** | Steering output by showing 3–5 examples rather than describing the format |
| **Hook** | A command that fires automatically at a lifecycle event, giving deterministic enforcement |
| **Live artifact** | A persistent interactive HTML dashboard in Cowork that refreshes with current connector data (desktop only) |
| **MCP (Model Context Protocol)** | The open standard for connecting agents to tools and data; described as "a USB-C port for AI applications" |
| **Permission mode** | How much an agent may do unattended — in Cowork: Manual, Auto, or Skip |
| **Plugin** | A shareable, versioned bundle of skills, sub-agents, connectors, and hooks |
| **Progressive disclosure** | Loading skill content in stages — metadata always, instructions on trigger, resources on demand |
| **Prompt** | An instruction given to a model |
| **Role prompting** | Setting a persona in the system prompt to focus behavior and tone |
| **Routine** | A saved Claude Code prompt, repos, and connectors that run on Anthropic's cloud with your machine off, triggered by schedule, API call, or GitHub event (research preview) |
| **Scheduled task** | A task that re-runs on a cadence — hourly, daily, weekly, weekdays, or manually. Available in Cowork and in Claude Code Desktop |
| **Script** | Deterministic code bundled with a skill; runs via bash, and only its output enters context |
| **`SKILL.md`** | The required file in a skill directory: YAML frontmatter plus instructions |
| **Skill** | A folder of instructions and resources Claude loads when your request matches its description |
| **Sub-agent** | An agent invoked by another agent, running in a fresh isolated context and returning a summary |
| **System prompt** | Standing instructions that frame a model's behavior for a whole session |
| **Tool** | A capability an agent can invoke — read a file, run bash, search the web, call an API |
| **Trigger** | The `description` text Claude matches your request against to decide whether to load a skill |
| **Workflow (dynamic workflow)** | In Claude Code: a JavaScript script, written by Claude, that orchestrates sub-agents at scale in the background. Note the word means different things in LangGraph and GitHub |
| **XML tags** | Delimiters like `<context>` and `<instructions>` used to keep parts of a prompt unambiguous |

---

## Appendix: Verification notes

Everything above was checked against Anthropic's official documentation. The following points are flagged because they could not be fully confirmed, or because the official sources disagree with each other.

| # | Item | Status |
|---|---|---|
| 1 | **"Script" as a primitive** | Not an independent Anthropic primitive. It's the code-bundling pattern inside a skill (`scripts/`) or a plugin (`bin/`). §8 is written as a pattern, not a product feature |
| 2 | **Version-gated Claude Code numbers** | Sub-agent nesting depth (~3 layers), concurrency (~20), and workflow caps (16 concurrent agents, 1,000 per run) are all explicitly version-gated in the docs. Treat as version-dependent, not constants |
| 3 | **Skill `description` max length** | Platform docs say 1024 characters; a support article says 200. Unresolved conflict in Anthropic's own docs. The doc uses 1024 and flags it here |
| 4 | **`SKILL.md` vs `skill.md` casing** | Platform docs say `SKILL.md`; one support article says `skill.md`. Unresolved. The doc uses `SKILL.md` |
| 5 | **Sub-agent delegation guidance (§6)** | The first three "delegate when" rows are verbatim documented guidance; the parallel-investigation row is our inference and is marked as such inline |
| 6 | **Skills plan availability** | Support docs list Free through Enterprise; platform docs say Pro, Max, Team, and Enterprise. The doc avoids stating a plan list for skills |
| 7 | **Cowork launch date and original announcement** | The original research-preview announcement no longer resolves. The doc cites the current product and support pages only |
| 8 | **Invoking Cowork scheduled tasks** | A `/schedule` command is mentioned in one support article but absent from the dedicated scheduling article. The doc describes scheduled tasks without naming an invocation command. Note `/schedule` in the Claude Code CLI creates a **routine**, which is a different thing |
| 9 | **Claude Chat "Styles"** | No longer has a dedicated support article; the personalization article now documents Skills in its place. Deliberately not taught in this doc |
| 10 | **Routines** | Documented as a **research preview**. Behavior and availability may change; re-verify before teaching |
| 11 | **Cross-platform product names in §11** | Verified against vendor docs in Aug 2026, but this area changes fast. Several items in that table are recently renamed or recently deprecated; re-verify before republishing |

**Sources:** [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) · [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) · [Claude prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) · [Claude Code: sub-agents](https://code.claude.com/docs/en/sub-agents) · [Claude Code: skills](https://code.claude.com/docs/en/skills) · [Claude Code: dynamic workflows](https://code.claude.com/docs/en/workflows) · [Claude Code: routines](https://code.claude.com/docs/en/routines) · [Claude Code: scheduled tasks](https://code.claude.com/docs/en/scheduled-tasks) · [Claude Code: memory](https://code.claude.com/docs/en/memory) · [Claude Code: hooks](https://code.claude.com/docs/en/hooks) · [Claude Code: plugins](https://code.claude.com/docs/en/plugins) · [Get started with Claude Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork) · [Cowork architecture overview](https://support.claude.com/en/articles/14479288-claude-cowork-architecture-overview) · [Schedule recurring tasks in Cowork](https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork) · [What are Skills?](https://support.claude.com/en/articles/12512176-what-are-skills) · [Use plugins in Claude](https://support.claude.com/en/articles/13837440-use-plugins-in-claude) · [Cowork product page](https://claude.com/product/cowork) · [agentskills.io](https://agentskills.io) · [agents.md](https://agents.md) · [modelcontextprotocol.io](https://modelcontextprotocol.io)
