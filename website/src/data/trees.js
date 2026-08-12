// Every file tree on the site.
//
// A node is:
//   name      what is printed
//   dir       true for a directory
//   gloss     one clause, shown beside the name so a tree can be skimmed
//   def       the sentence shown when the row is hovered
//   note      the second paragraph in the popover: the consequence, the gotcha,
//             or where the thing is covered
//   phase     p1..p4, drawn as a badge on the whole-machine maps
//   children  nested nodes
//
// `def` is the field that matters. It is why these are trees on this site and
// code blocks in the source documents: a directory listing with a purpose on
// every row answers the question a reader actually has, and it does it without
// a trailing comment column that wraps on a phone.
//
// Everything here is also flattened into the appendix file map, so a path can
// be looked up by name when you cannot remember which tree drew it.

// ---------------------------------------------------------------------------
// The whole machine
// ---------------------------------------------------------------------------

export const machineTree = {
    title: "your machine, after both kits",
    wide: true,
    nodes: [
        {
            name: "~/.claude/",
            dir: true,
            gloss: "the always-loaded config surface",
            def: "Claude Code's personal configuration directory. Everything in here applies in every session, in every directory, whatever project you are in.",
            note: "Created by Claude Code on first run. Both kits install into it, and it is machine-local: nothing here is meant to be committed.",
            children: [
                {
                    name: "CLAUDE.md",
                    phase: "p2",
                    gloss: "your hard rules, plus the imports",
                    def: "Your personal context file. It holds your always and never rules inline, then pulls in the private context below with @import lines.",
                    note: "Loads in every session regardless of directory, so keep it short. Under about 200 lines of standing facts; long files get skimmed.",
                },
                {
                    name: "settings.json",
                    phase: "p3",
                    gloss: "permissions and hook registrations",
                    def: "Where permissions and hooks are declared. This is the enforcement layer: what it says happens whether or not the model remembers to.",
                    note: "The Phase 3 installer deliberately does not edit this. You merge the hook snippet in by hand, because a script guessing at your existing config is how configs get lost.",
                },
                {
                    name: "skills/",
                    dir: true,
                    phase: "p3",
                    gloss: "the procedures library",
                    def: "Your personal skills. Each subdirectory is one skill, and each has a SKILL.md that Claude loads only when its description matches what you asked for.",
                    note: "Phase 3 installs twelve. Until one is triggered it costs about 100 tokens, which is why the whole library can sit here without slowing anything down.",
                },
                {
                    name: "agents/",
                    dir: true,
                    phase: "p3",
                    gloss: "subagent definitions",
                    def: "Personal subagents. One Markdown file each, in the same format as an agent definition, invoked by the main agent rather than by you.",
                    note: "Must be a real directory. A dangling symlink here means no custom subagent loads and nothing tells you why.",
                },
                {
                    name: "workflows/",
                    dir: true,
                    phase: "p3",
                    gloss: "dynamic workflows",
                    def: "JavaScript files that orchestrate subagents at scale. Claude writes these; you describe the fan-out and save the run for reuse.",
                    note: "After saving, a workflow runs as a slash command by its own name.",
                },
                {
                    name: "hooks/",
                    dir: true,
                    phase: "p3",
                    gloss: "hook scripts",
                    def: "The scripts that hooks run. The script lives here; what fires it and when is declared in settings.json.",
                    note: "",
                },
                {
                    name: "commands/",
                    dir: true,
                    phase: "p2",
                    gloss: "/wrap, /ready, /kickoff",
                    def: "Slash commands. Each is a Markdown file whose body is a prompt, invoked by typing / and its filename.",
                    note: "The simplest thing in the whole setup to add to: drop a file in, and it is a command.",
                },
            ],
        },
        {
            name: "~/claude-context/",
            dir: true,
            gloss: "the private layer, never published",
            def: "Everything about you: identity, the memory that loads every session, your roles, your brand, your projects. Kept out of every repo on purpose.",
            note: "The Phase 2 installer adds this to your global gitignore, so it cannot be committed from any repo, not just the ones you remember to configure.",
            children: [
                {
                    name: "identity/",
                    dir: true,
                    phase: "p2",
                    gloss: "who you are and how you sound",
                    def: "Your snapshot, your writing voice, and your ready-to-paste bios and links.",
                    note: "Only who-i-am.md is imported into every session. The other two are read when something is being drafted as you.",
                },
                {
                    name: "memory/",
                    dir: true,
                    phase: "p2",
                    gloss: "core facts, decisions, people",
                    def: "Durable facts in core.md, a dated log of standing decisions in decisions.md, and collaborators in people.md.",
                    note: "Only core.md is imported every session. Keeping the journal out of it is what stops your memory taxing every task you run.",
                },
                {
                    name: "roles/",
                    dir: true,
                    phase: "p2",
                    gloss: "one file per hat you wear",
                    def: "The modes you work in. The engineer role carries your default stack, your musts and must-nots, and your definition of done.",
                    note: "Loaded when you put that hat on, rather than in every session. A second role should be one clear mode of work, not a catch-all.",
                },
                {
                    name: "brand/",
                    dir: true,
                    phase: "p2",
                    gloss: "positioning and visual tokens",
                    def: "Your positioning and messaging, plus the concrete visual tokens: hex colours and font names.",
                    note: "Pointing the dataviz and theme skills at visual.md is what makes generated charts and decks come out on-brand without being told each time.",
                },
                {
                    name: "projects/",
                    dir: true,
                    phase: "p2",
                    gloss: "one line per project, plus private narrative",
                    def: "An index linking each active project to its record in your tracker, and a folder per project for the narrative context a tracker does not hold.",
                    note: "Live task state does not belong here. One source of truth per fact: the tracker holds the records, this holds the why.",
                },
                {
                    name: "workflows/_index.md",
                    phase: "p2",
                    gloss: "the router, imported every session",
                    def: "One line per skill you actually use, and the situation that should trigger it. It rides in every session so Claude can route a request without being told the library exists.",
                    note: "Keep it to one line per entry. It is an index, and the moment it becomes documentation it starts costing you tokens in sessions that never needed it.",
                },
                {
                    name: "inbox/",
                    dir: true,
                    phase: "p2",
                    gloss: "capture now, file later",
                    def: "The place for anything you are not sure how to file. Capturing in the wrong place beats losing it.",
                    note: "Emptying this is on the weekly list in Phase 4. An inbox nobody drains is just a slower way of losing things.",
                },
                {
                    name: "config/stack.md",
                    phase: "p3",
                    gloss: "your stack, read by every skill",
                    def: "Your test, build, lint and deploy commands, in one file. Every skill in the Phase 3 library is stack-agnostic and reads its commands from here.",
                    note: "The library does nothing useful until this is filled in. It is the one manual step after the Phase 3 installer runs, and it is deliberately manual.",
                },
            ],
        },
    ],
};

// ---------------------------------------------------------------------------
// Phase 1: how the blocks nest, and the shape of a skill
// ---------------------------------------------------------------------------

export const nestingTree = {
    title: "how the building blocks nest",
    nodes: [
        {
            name: "Agent",
            dir: true,
            gloss: "the loop: model plus tools plus a goal",
            def: "The outer thing. A model that observes the result of each action and chooses the next one, until it decides it is done.",
            note: "Claude Code and Cowork are both agents in this sense. Everything below is something the loop reaches for.",
            children: [
                {
                    name: "project context",
                    gloss: "read at the start of every session",
                    def: "CLAUDE.md. Standing facts about this repo, loaded before anything happens, whether or not they turn out to be needed.",
                    note: "Cheap to read and expensive to bloat, which is the whole argument for keeping procedures out of it.",
                },
                {
                    name: "Skills",
                    dir: true,
                    gloss: "loaded when their description matches",
                    def: "Packaged procedures. Their names and descriptions are always in context; the instructions arrive only when one is triggered.",
                    note: "This is progressive disclosure, and it is why a large library is not a tax.",
                    children: [
                        {
                            name: "Scripts",
                            gloss: "run by bash; only the output returns",
                            def: "Deterministic code a skill runs instead of describing. Claude never reads the source, only what it prints.",
                            note: "Write one when being wrong is worse than being slow. Anything with a right answer belongs here.",
                        },
                    ],
                },
                {
                    name: "Sub-agents",
                    gloss: "fresh context window, returns a summary",
                    def: "Specialists the main agent hands a self-contained job to. They work in their own context and only the summary comes back.",
                    note: "The cost that surprises people: their context starts empty. Anything they need has to be in the delegation message.",
                },
                {
                    name: "Workflows",
                    dir: true,
                    gloss: "orchestrate subagents by the dozen",
                    def: "A saved script that holds the plan and fans work out. This is what coordinates more agents than one conversation can track.",
                    note: "The inversion: with skills and subagents Claude holds the plan. With a workflow the script does.",
                    children: [
                        {
                            name: "Plugins",
                            gloss: "package any of the above for a team",
                            def: "A shareable, versioned bundle of skills, subagents, connectors and hooks, installed once and namespaced.",
                            note: "The answer to a whole team needing the same setup.",
                        },
                    ],
                },
            ],
        },
    ],
};

export const skillAnatomy = {
    title: "the shape of one skill",
    nodes: [
        {
            name: "my-skill/",
            dir: true,
            gloss: "one directory, one procedure",
            def: "A skill is a directory. Its name is what you will see in the library, and it should say what the skill does rather than what kind of thing it is.",
            note: "Avoid filler names. `helper`, `utils` and `tools` all describe the folder rather than the job.",
            children: [
                {
                    name: "SKILL.md",
                    gloss: "required: frontmatter plus instructions",
                    def: "The only required file. YAML frontmatter carrying at minimum a name and a description, then the instructions themselves.",
                    note: "Keep it under 500 lines. Past that, split the detail into reference files beside it and link them from here.",
                },
                {
                    name: "reference.md",
                    gloss: "optional: detailed lookup material",
                    def: "Detail the skill needs sometimes but not every time: schemas, API shapes, table layouts. Loaded only when Claude actually reads it.",
                    note: "Keep references one level deep from SKILL.md, and give any file over 100 lines a table of contents.",
                },
                {
                    name: "examples.md",
                    gloss: "optional",
                    def: "Worked examples, kept out of SKILL.md so they cost nothing until they are wanted.",
                    note: "Three to five relevant, diverse, structurally consistent examples steer format more reliably than describing it.",
                },
                {
                    name: "scripts/",
                    dir: true,
                    gloss: "optional: the deterministic parts",
                    def: "Code the skill runs rather than describes. The convention is this directory; a plugin uses bin/ instead.",
                    note: "Only the output enters context, so a hundred lines of validation logic costs you one line of findings. Write them in whatever the project already uses; there is no reason to reach for a second language.",
                    children: [
                        {
                            name: "check.mjs",
                            gloss: "exits non-zero when it finds something",
                            def: "A worked example of the pattern: it checks one thing, prints findings in a stable format, and exits non-zero on failure.",
                            note: "Plain Node, no dependencies. Silent failure is the worst outcome inside an agent loop, and an exit code is how the loop finds out.",
                        },
                    ],
                },
            ],
        },
    ],
};

// ---------------------------------------------------------------------------
// Phase 2: the context kit
// ---------------------------------------------------------------------------

export const contextKit = {
    title: "~/claude-context, what Phase 2 installs",
    wide: true,
    nodes: [
        {
            name: "identity/",
            dir: true,
            gloss: "who you are",
            def: "Three files about you. Only the first loads in every session.",
            note: "",
            children: [
                {
                    name: "who-i-am.md",
                    gloss: "imported every session; keep short",
                    def: "Your role, your stack, what you are optimising for, and how you want answers written. The file that makes a cold session know you.",
                    note: "Under 30 lines. It loads in every session, so every line in it is paid for in every task you run, including the ones it has nothing to do with.",
                },
                {
                    name: "voice.md",
                    gloss: "how you sound when Claude drafts as you",
                    def: "Your writing voice: rhythm, vocabulary, what you never say. Read when something is being drafted in your name.",
                    note: "Not imported every session. Drafting is a minority of sessions, and this is the layer where that distinction saves you money.",
                },
                {
                    name: "bios.md",
                    gloss: "ready-to-paste bios and links",
                    def: "Your standard bios at each length, plus the links you keep retyping.",
                    note: "The test of whether this file is pulling its weight: you have stopped rewriting your own bio.",
                },
            ],
        },
        {
            name: "memory/",
            dir: true,
            gloss: "what to remember",
            def: "The durable facts, the decisions, and the people. Split three ways because they have different lifespans and only one of them can afford to load every time.",
            note: "",
            children: [
                {
                    name: "core.md",
                    gloss: "imported every session; durable facts only",
                    def: "The always-remember list. Facts and preferences that are true across all of your work and do not change week to week.",
                    note: "The most common way this file goes wrong is becoming a journal. Dated entries belong in decisions.md; this one is taxed on every session.",
                },
                {
                    name: "decisions.md",
                    gloss: "dated log of standing decisions",
                    def: "What you decided, when, and what it replaced. A log rather than a state file, so a reversal is visible instead of silent.",
                    note: "Reread monthly. A decision you reversed and never logged is worse than no note at all, because it points Claude wrong with confidence.",
                },
                {
                    name: "people.md",
                    gloss: "collaborators, clients, mentors",
                    def: "Who the people around your work are and what context each one needs.",
                    note: "Private by design. This is exactly the content a publish-time privacy check exists to keep out of a repo.",
                },
            ],
        },
        {
            name: "roles/",
            dir: true,
            gloss: "the hats you wear",
            def: "One file per mode of work. Loaded when you are in that mode rather than always.",
            note: "",
            children: [
                {
                    name: "engineer.md",
                    gloss: "the building-software hat",
                    def: "Your default stack, your musts and must-nots, how you like code delivered, and the quality gate that defines done.",
                    note: "Done when it has a quality gate you would actually trust. If you would not accept work on the strength of it, it is not finished.",
                },
                {
                    name: "role-template.md",
                    gloss: "copy this to add a hat",
                    def: "The blank a second role starts from: writer, operator, researcher, whatever you actually switch into.",
                    note: "A second role should be one clear mode of work. The moment it becomes a catch-all it stops being loadable at the right time.",
                },
                {
                    name: "job-seeker/profile.md",
                    gloss: "the grounded source of truth for claims",
                    def: "Everything you can defend about your own experience, in one place, so nothing invented ever reaches an application.",
                    note: "Filling this in by hand is the trap. Let Claude interview you, so you never end up defending a claim you made up.",
                },
            ],
        },
        {
            name: "brand/",
            dir: true,
            gloss: "how public work looks and sounds",
            def: "Positioning and messaging, plus the concrete visual tokens anything public-facing should use.",
            note: "",
            children: [
                {
                    name: "brand.md",
                    gloss: "positioning and messaging",
                    def: "Who the work is for, what it claims, and how it is described.",
                    note: "",
                },
                {
                    name: "visual.md",
                    gloss: "colours and type",
                    def: "Real hex values and real font names, with a note on which pairs clear WCAG AA.",
                    note: "Done when a chart or a deck can be generated on-brand without you restating the palette. That is the whole test.",
                },
                {
                    name: "assets/",
                    dir: true,
                    gloss: "logos, headshots",
                    def: "The binary side of the brand.",
                    note: "",
                },
            ],
        },
        {
            name: "projects/",
            dir: true,
            gloss: "the map of your work",
            def: "An index of active projects, and a folder each for private narrative context.",
            note: "",
            children: [
                {
                    name: "_index.md",
                    gloss: "one line per project, pointing at its tracker",
                    def: "Each active project and where its structured record lives: Airtable, Linear, Notion, GitHub Projects.",
                    note: "A link, not a copy. The moment you paste a task list in here you have a second, stale version of your tracker.",
                },
                {
                    name: "_TEMPLATE/context.md",
                    gloss: "copy per project",
                    def: "The narrative a tracker does not hold: why the project exists, what was tried, what the constraints really are.",
                    note: "",
                },
            ],
        },
        {
            name: "workflows/_index.md",
            gloss: "the router, imported every session",
            def: "One line per skill and the situation that should fire it.",
            note: "This is the file that lets a cold session route a request correctly. It is short on purpose: it rides along in every session you run.",
        },
        {
            name: "inbox/",
            dir: true,
            gloss: "capture zone",
            def: "Dump anything here that you cannot file yet.",
            note: "",
        },
    ],
};

export const importTree = {
    title: "how a session gets primed",
    nodes: [
        {
            name: "~/.claude/CLAUDE.md",
            dir: true,
            gloss: "loads in every session, every directory",
            def: "The one file that is always read. It stays short and does two jobs: it carries your hard rules inline, and it imports the private context below.",
            note: "The rules go above the imports. That ordering is not cosmetic: the highest-authority instructions should be the ones nothing else can push out of sight.",
            children: [
                {
                    name: "(your always and never rules)",
                    gloss: "kept inline, above the imports",
                    def: "Short imperative lines. Attribution, formatting, tools, privacy: the things that must hold in every session whatever you are doing.",
                    note: "For any rule a hook could enforce deterministically, note it as a future hook. An instruction can be missed; a hook cannot.",
                },
                {
                    name: "@~/claude-context/identity/who-i-am.md",
                    gloss: "imported",
                    def: "Pulled in whole, in every session, regardless of what directory you started in.",
                    note: "",
                },
                {
                    name: "@~/claude-context/memory/core.md",
                    gloss: "imported",
                    def: "Your always-remember list, pulled in the same way.",
                    note: "",
                },
                {
                    name: "@~/claude-context/workflows/_index.md",
                    gloss: "imported",
                    def: "The router, so every session knows which skills exist and what should trigger each one.",
                    note: "",
                },
            ],
        },
    ],
};

// ---------------------------------------------------------------------------
// Phase 3: the library
// ---------------------------------------------------------------------------

const skill = (name, gloss, def, note) => ({
    name: `${name}/`,
    dir: true,
    gloss,
    def,
    note,
    children: [
        {
            name: "SKILL.md",
            gloss: "frontmatter plus the procedure",
            def: `The skill file for ${name}: its description, the files it reads first, its ordered checklist, and its definition of done.`,
            note: "Stack-agnostic. Its commands come from ~/claude-context/config/stack.md rather than being written in.",
        },
    ],
});

export const devKit = {
    title: "~/.claude, what Phase 3 installs",
    wide: true,
    folded: [
        "/skills//plan-day/",
        "/skills//kickoff-project/",
        "/skills//new-feature/",
        "/skills//write-tests/",
        "/skills//debug-issue/",
        "/skills//self-review/",
        "/skills//open-pr/",
        "/skills//deploy-check/",
        "/skills//learn-log/",
        "/skills//portfolio-update/",
        "/skills//write-docs/",
        "/skills//wrap-day/",
    ],
    nodes: [
        {
            name: "skills/",
            dir: true,
            gloss: "twelve procedures, one per moment in the day",
            def: "The procedures layer. Each subdirectory is one skill, triggered by its description rather than invoked by name.",
            note: "Verify the install by asking, in any repo: which of my skills would fire if I said add a login endpoint. It should name new-feature.",
            children: [
                skill(
                    "plan-day",
                    "start the session",
                    "Turns your project index and trackers into three ranked next actions, each with its next step, and one thing to skip.",
                    "Fires on: plan my day, what should I work on, standup."
                ),
                skill(
                    "kickoff-project",
                    "found a new codebase",
                    "Makes you settle stack and scope before scaffolding anything, then commits a green foundation to build from.",
                    "Fires on: new project, start a repo, scaffold."
                ),
                skill(
                    "new-feature",
                    "build in an existing repo",
                    "Reads the real code, writes acceptance criteria, names what must not break, and builds against a test.",
                    "Fires on: add a feature, implement, build the X."
                ),
                skill(
                    "write-tests",
                    "add coverage with judgment",
                    "Focused tests for behaviour and edges, written where you care what is covered rather than in bulk.",
                    "Fires on: write tests, add coverage, test this. Hands off to the test-author subagent when a whole module needs sweeping."
                ),
                skill(
                    "debug-issue",
                    "reproduce, then root cause",
                    "Hypothesis-driven debugging that walks from a reproduction to a root cause to a regression test, instead of guess and check.",
                    "Fires on: this is broken, failing test, why is X."
                ),
                skill(
                    "self-review",
                    "your own pass over your diff",
                    "A four-lens pass over your own changes before anyone else sees them.",
                    "Fires on: review my changes, ready to merge. Run it before the code-reviewer subagent, not instead of it: they catch different things."
                ),
                skill(
                    "open-pr",
                    "green gate, then a usable description",
                    "Refuses to proceed on a red quality gate, then writes a PR description a reviewer can actually act on.",
                    "Fires on: open a PR, ship this."
                ),
                skill(
                    "deploy-check",
                    "pre-deploy and smoke check",
                    "The pre-deploy checklist and the post-deploy smoke check, with a rollback path named up front rather than improvised.",
                    "Fires on: deploy, release, push live."
                ),
                skill(
                    "learn-log",
                    "capture the non-obvious thing",
                    "A dated, proof-linked entry for something you figured out, with a link to where you applied it.",
                    "Fires on: I learned, log this. When the same lesson recurs, that is the signal to promote it into a skill."
                ),
                skill(
                    "portfolio-update",
                    "shipped work into evidence",
                    "Turns finished work into skimmable, defensible portfolio material, and updates your job-seeker profile when it proves a claim.",
                    "Fires on: update my portfolio, write this up."
                ),
                skill(
                    "write-docs",
                    "a README a newcomer could follow",
                    "Documentation with every command actually verified rather than assumed.",
                    "Fires on: write the README, document this."
                ),
                skill(
                    "wrap-day",
                    "close the session",
                    "Routes everything that changed to its home using the Phase 2 routing table, so nothing worth keeping dies in chat history.",
                    "Fires on: wrap up, end of day, reconcile. The step people skip under time pressure, which is exactly when it matters most."
                ),
            ],
        },
        {
            name: "agents/",
            dir: true,
            gloss: "five specialists for noisy work",
            def: "Subagents. Each runs in a fresh context, so the forty files it reads never touch your conversation.",
            note: "Delegate when the ratio of noise to signal is high. A subagent that reads forty files and returns five findings is a good trade; one that needs three clarifying rounds is not.",
            children: [
                {
                    name: "code-reviewer.md",
                    gloss: "independent review pass, read-only",
                    def: "An independent pass over your diff in a fresh context, returning a ranked findings table.",
                    note: "Read-only by tool list, not by instruction. It cannot edit anything even if it decides it should.",
                },
                {
                    name: "test-author.md",
                    gloss: "bulk coverage for a module",
                    def: "Writes tests across a whole module when you do not need to watch each one appear. Returns the files plus a coverage summary.",
                    note: "The delegated counterpart to the write-tests skill. Judgment stays with you; the sweep is delegated.",
                },
                {
                    name: "dep-auditor.md",
                    gloss: "package-lock audit before a release",
                    def: "Audits package-lock.json for known-vulnerable or unmaintained dependencies and returns a ranked action table.",
                    note: "Read-only, capped turns, and told to say unverified rather than guess when it cannot confirm a vulnerability.",
                },
                {
                    name: "researcher.md",
                    gloss: "reads several sources, returns a brief",
                    def: "Investigates one focused technical question and returns a short grounded brief with its sources.",
                    note: "The classic delegation shape: reads a lot, returns a little.",
                },
                {
                    name: "docs-writer.md",
                    gloss: "verbose drafting, contained",
                    def: "Produces a documentation draft plus a list of anything it could not verify.",
                    note: "The unverifiable list is the useful half. It is what stops a confident draft from quietly inventing a command.",
                },
            ],
        },
        {
            name: "hooks/",
            dir: true,
            gloss: "two absolutes, enforced",
            def: "The scripts hooks run. What fires them is declared in settings.json, which is why registering them is a manual step.",
            note: "These are deliberately not skills. Never commit a secret is an absolute, and an absolute belongs where it cannot be skipped.",
            children: [
                {
                    name: "pre-commit-guard.sh",
                    gloss: "PreToolUse(Bash)",
                    def: "Blocks any commit that would stage a secret, a machine path, or an agent or editor working file.",
                    note: "Every pattern in it is there because something got through once. That is how the enforcement layer earns its keep.",
                },
                {
                    name: "post-edit-format.sh",
                    gloss: "PostToolUse(Edit/Write)",
                    def: "Best-effort formats the file that was just edited, so the tree stays tidy without anyone remembering to run a formatter.",
                    note: "",
                },
                {
                    name: "settings.snippet.json",
                    gloss: "merge this into your settings.json",
                    def: "The hook registrations, printed rather than applied. You add these keys into your existing hooks object by hand.",
                    note: "Do not replace settings.json with this. Merge the keys in, then restart Claude Code.",
                },
            ],
        },
        {
            name: "workflows/",
            dir: true,
            gloss: "two fan-outs",
            def: "Dynamic workflows: one agent per item, running in the background.",
            note: "The permission gotcha worth memorising: subagents spawned by a workflow always run in acceptEdits, so their file edits are auto-approved regardless of your session's mode.",
            children: [
                {
                    name: "audit-repo.js",
                    gloss: "args: glob, concern",
                    def: "One agent per file, each auditing for the concern you named, in parallel.",
                    note: "The weekly sweep. Point it at code you are prepared to have edited, because its subagents auto-approve edits.",
                },
                {
                    name: "triage-todos.js",
                    gloss: "no args",
                    def: "Finds every TODO and FIXME in the codebase and triages them into one ranked list.",
                    note: "",
                },
            ],
        },
    ],
};

// ---------------------------------------------------------------------------
// The package itself
// ---------------------------------------------------------------------------

export const packageTree = {
    title: "claude-junior-dev-onboarding/",
    wide: true,
    nodes: [
        {
            name: "README.md",
            gloss: "the four phases, and the install order",
            def: "The map of the package: what each phase answers, which two install, and the order they have to be done in.",
            note: "This site is that README and the four guides, made navigable.",
        },
        {
            name: "install-all.sh",
            gloss: "runs both installers in order",
            def: "Runs the Phase 2 installer and then the Phase 3 one. Previews first and asks nothing destructive.",
            note: "The order is not optional. Phase 3's skills read from the context layer Phase 2 creates.",
        },
        {
            name: "phase-1-understanding-claude/",
            dir: true,
            phase: "p1",
            gloss: "reading only, nothing installs",
            def: "The building-blocks reference. What every piece is, when to use each, and the decision table that maps a situation to a container.",
            note: "Nothing to install. The point of Phase 1 is that you can name the pieces before you start moving them around.",
            children: [
                {
                    name: "01-understanding-claude.md",
                    gloss: "twelve sections and an appendix",
                    def: "Prompting fundamentals, the three surfaces, agents, subagents, skills, scripts, workflows, the decision guide, cross-platform names, and the glossary.",
                    note: "",
                },
            ],
        },
        {
            name: "phase-2-introducing-yourself/",
            dir: true,
            phase: "p2",
            gloss: "the context kit",
            def: "The guide and the kit that install your private context layer and wire it into every session.",
            note: "Installs to ~/claude-context, which the installer adds to your global gitignore.",
            children: [
                {
                    name: "02-introducing-yourself.md",
                    gloss: "the guide; start here",
                    def: "The three layers, the install, six interview prompts to populate everything, and the routing table.",
                    note: "",
                },
                {
                    name: "setup.sh",
                    gloss: "the installer; --dry-run first",
                    def: "Copies the context templates, adds the gitignore line, copies the commands and agents scaffold, and appends the import block to your CLAUDE.md after backing it up.",
                    note: "Additive and no-clobber. Safe to run twice, and it never overwrites a file you have filled in.",
                },
                {
                    name: "claude-context/",
                    dir: true,
                    gloss: "installs to ~/claude-context",
                    def: "The private context templates. Nothing is filled in for you, on purpose: the templates carry interview prompts instead.",
                    note: "",
                },
                {
                    name: "dot-claude/",
                    dir: true,
                    gloss: "installs into ~/.claude",
                    def: "The slash commands, the subagents scaffold, and the CLAUDE.md import block.",
                    note: "",
                },
            ],
        },
        {
            name: "phase-3-implementing-your-systems/",
            dir: true,
            phase: "p3",
            gloss: "the workflow kit",
            def: "The guide and the kit that install the working library: twelve skills, five subagents, two hooks, two workflows.",
            note: "Do not run this before Phase 2. Every skill in it reads from the context layer Phase 2 creates.",
            children: [
                {
                    name: "03-implementing-your-systems.md",
                    gloss: "the guide; start here",
                    def: "The library mapped to a developer's day, which layer each piece belongs in and why, and the full catalog.",
                    note: "",
                },
                {
                    name: "setup-dev.sh",
                    gloss: "the installer; --dry-run first",
                    def: "Places the skills, subagents, workflows and hook scripts into ~/.claude, and stack.md into your private context.",
                    note: "It deliberately does not touch settings.json. Registering the hooks is a manual merge.",
                },
                {
                    name: "config/stack.md",
                    gloss: "fill this in first",
                    def: "Your stack's commands. Every skill reads them from here rather than assuming a toolchain.",
                    note: "The first move after install, and the reason the library works whatever you build in.",
                },
            ],
        },
        {
            name: "phase-4-working-together/",
            dir: true,
            phase: "p4",
            gloss: "habits, nothing installs",
            def: "The daily practice: the session loop, delegation judgment, verification, the feedback loop, and the maintenance rhythm.",
            note: "The first three phases are setup, done once. This one is repeated forever, and it is what separates having a setup from getting leverage from one.",
            children: [
                {
                    name: "04-working-together.md",
                    gloss: "the practice",
                    def: "Eight parts on how to actually work with the system you just built, including the seven ways the loop fails at the human.",
                    note: "",
                },
            ],
        },
    ],
};

// ---------------------------------------------------------------------------
// The flat map, for the appendix
// ---------------------------------------------------------------------------

export const ALL_TREES = [
    { id: "machine", label: "Your machine, after both kits", tree: machineTree },
    { id: "package", label: "The package itself", tree: packageTree },
    { id: "context", label: "The Phase 2 context kit", tree: contextKit },
    { id: "dev", label: "The Phase 3 library", tree: devKit },
    { id: "skill", label: "The shape of one skill", tree: skillAnatomy },
    { id: "nesting", label: "How the building blocks nest", tree: nestingTree },
    { id: "imports", label: "How a session gets primed", tree: importTree },
];

function collect(nodes, prefix, source, out) {
    for (const node of nodes) {
        // A directory name already carries its own trailing slash, so joining is
        // just concatenation. Nodes that are conceptual rather than filesystem
        // paths (the nesting map) still read correctly this way.
        const path = prefix ? `${prefix}${node.name}` : node.name;
        out.push({
            path,
            name: node.name,
            dir: !!node.dir,
            def: node.def,
            note: node.note,
            source,
        });
        if (node.children) {
            collect(node.children, node.dir ? path : `${path}/`, source, out);
        }
    }
    return out;
}

/**
 * Every row from every tree, flattened, for the appendix file map.
 *
 * The nesting map is left out: its rows are concepts drawn as a tree, not paths
 * on disk, and putting them in a listing of files would be a lie about what
 * they are.
 */
export function fileMap() {
    const out = [];
    for (const { id, label, tree } of ALL_TREES) {
        if (id === "nesting") continue;
        collect(tree.nodes, "", label, out);
    }
    return out;
}
