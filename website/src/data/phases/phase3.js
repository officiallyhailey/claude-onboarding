import { devKit } from "../trees";

// Phase 3, the procedures layer.
//
// The catalog in the source document is three tables of names. Here it is the
// installed tree, so a reader can see the whole library in the shape it will
// actually have on disk, and get each piece's job and trigger phrase by
// hovering it. That is the same information in the form it is used in.

export const phase3 = {
    n: 3,
    slug: "implementing-your-systems",
    kind: "Installs the workflow kit",
    title: "Implementing Your Systems",
    blurb: "How do I install the skills, agents, hooks, and workflows I work with?",
    lede: "Twelve skills, five subagents, two hooks and two workflows, organised around a developer's day. Every one of them is stack-agnostic.",
    stamp: "Verified against Anthropic's official documentation in August 2026. Phase 2's context kit has to be installed first, because the skills read from it.",
    tags: ["12 skills", "5 subagents", "2 hooks", "2 workflows"],

    sections: [
        // ---------------------------------------------------------------
        {
            id: "before-3",
            num: "00",
            title: "Before you start",
            heading: "What must be in place first?",
            blocks: [
                {
                    t: "thesis",
                    x: "This is the [[procedures layer]]. It assumes the [[context layer]] from Phase 2 is already installed, because the skills read from it.",
                },
                {
                    t: "table",
                    head: ["Need", "Why"],
                    rows: [
                        [
                            "Phase 2's context kit installed at ~/claude-context",
                            "Skills read roles/engineer.md, write to memory/ and projects/, and route through the same homes",
                        ],
                        [
                            "~/claude-context/config/stack.md filled in",
                            "Every skill is stack-agnostic and reads its commands (test, build, lint, deploy) from this one file",
                        ],
                    ],
                },
                {
                    t: "note",
                    kind: "warn",
                    lab: "Order is not optional",
                    x: "If you have not done Phase 2, do it first. Then fill in stack.md. The library does nothing useful until it knows your stack.",
                },
                {
                    t: "p",
                    x: "This library maps onto the four building blocks from Phase 1: [[skill|skills]] for procedures, [[subagent|subagents]] for noisy self-contained work, [[hook|hooks]] for deterministic enforcement, and [[dynamic workflow|dynamic workflows]] for fan-out at scale. If those words are fuzzy, reread Phase 1 sections 5 through 9.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "glance",
            num: "01",
            title: "The library at a glance",
            heading: "What is in here, mapped to my day?",
            blocks: [
                {
                    t: "thesis",
                    x: "Twelve skills, five subagents, two hooks, two workflows, organised around the developer's day: plan, build, ship, and grow.",
                },
                {
                    t: "table",
                    head: ["Moment in the day", "Reach for", "Kind"],
                    mono: [1],
                    rows: [
                        ["Start the session, decide what to work on", "plan-day (+ /ready)", "skill"],
                        ["Found a new codebase", "kickoff-project", "skill"],
                        ["Build a feature in an existing repo", "new-feature", "skill"],
                        ["Add or improve test coverage", "write-tests, then test-author", "skill + subagent"],
                        ["Chase down a bug or failing test", "debug-issue", "skill"],
                        ["Check your own diff before review", "self-review", "skill"],
                        ["Get an independent review pass", "code-reviewer", "subagent"],
                        ["Open a pull request", "open-pr", "skill"],
                        ["Ship it", "deploy-check", "skill"],
                        ["Audit before a release", "dep-auditor, audit-repo", "subagent + workflow"],
                        ["Clear scattered TODOs", "triage-todos", "workflow"],
                        ["Research a package or an error", "researcher", "subagent"],
                        ["Write or update docs", "write-docs, then docs-writer", "skill + subagent"],
                        ["Capture what you learned", "learn-log", "skill"],
                        ["Turn shipped work into portfolio material", "portfolio-update", "skill"],
                        ["End the session, file what changed", "wrap-day (+ /wrap)", "skill"],
                        ["Keep secrets and machine paths out of commits", "pre-commit-guard", "hook"],
                        ["Keep the tree formatted after edits", "post-edit-format", "hook"],
                    ],
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "install-3",
            num: "02",
            title: "Install",
            heading: "How do I set it up safely?",
            blocks: [
                {
                    t: "shell",
                    x: `cd phase-3-implementing-your-systems
./setup-dev.sh --dry-run   # print what it would do
./setup-dev.sh             # do it`,
                },
                {
                    t: "p",
                    x: "Additive and [[no-clobber]], exactly like Phase 2's installer. It places skills in `~/.claude/skills`, subagents in `~/.claude/agents`, workflows in `~/.claude/workflows`, hook scripts in `~/.claude/hooks`, and stack.md in `~/claude-context/config`.",
                },
                { t: "sub", x: "Two steps stay manual on purpose" },
                {
                    t: "ol",
                    steps: true,
                    items: [
                        "Fill in stack.md. The skills are only as good as the commands you give them.",
                        "Register the hooks. Merge hooks/settings.snippet.json into your existing ~/.claude/settings.json by adding the keys into your hooks object, do not replace the file, then restart Claude Code. Editing settings.json by hand is safer than a script guessing at your existing config.",
                    ],
                },
                {
                    t: "note",
                    lab: "Verify",
                    x: "Ask, in any repo: which of my skills would fire if I said add a login endpoint? It should name new-feature. That confirms the descriptions are triggering, which is the only part of a skill that can silently fail.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "layer",
            num: "03",
            title: "Which layer, and why",
            heading: "Skill, subagent, hook, or workflow?",
            blocks: [
                {
                    t: "thesis",
                    x: "The single most common beginner mistake is putting work in the wrong container. Here is the rule applied to this library.",
                },
                {
                    t: "table",
                    head: ["If the work is...", "Use a...", "Because"],
                    rows: [
                        [
                            "A procedure you repeat, with steps and judgment",
                            "skill",
                            "Loads only when its description matches; keeps your context clean until then",
                        ],
                        [
                            "Noisy and self-contained, returns a summary",
                            "subagent",
                            "Runs in a fresh context; the forty files it reads never touch your conversation",
                        ],
                        [
                            "Something that must happen every time, no exceptions",
                            "hook",
                            "Enforcement, not instruction. A hook cannot be talked out of firing",
                        ],
                        [
                            "The same pass over dozens or hundreds of items",
                            "dynamic workflow",
                            "More agents than one conversation can coordinate; runs in the background",
                        ],
                    ],
                },
                { t: "sub", x: "Two pairings that show the split" },
                {
                    t: "ul",
                    items: [
                        "`self-review` is a skill: your structured pass over your own diff. `code-reviewer` is a subagent: an independent pass in a fresh context. You run both, in that order, because they catch different things.",
                        "`write-tests` is a skill: you writing tests with judgment about what matters. `test-author` is a subagent: a delegated sweep when a whole module needs coverage and you do not need to watch each test appear.",
                    ],
                },
                {
                    t: "note",
                    kind: "rule",
                    lab: "Why the guard is not a skill",
                    x: "pre-commit-guard is a hook, because never commit a secret is an absolute, and an absolute belongs where it cannot be skipped.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "day",
            num: "04",
            title: "A day with the library",
            heading: "How does it feel in practice?",
            blocks: [
                {
                    t: "thesis",
                    x: "Nothing below is required in order. This is just how the pieces connect on a normal day.",
                },
                { t: "sub", x: "Morning" },
                {
                    t: "p",
                    x: "You run `plan-day`, or `/ready`. It reads your project index and trackers and hands you three items with next actions, and one thing to skip. You pick one.",
                },
                { t: "sub", x: "Building" },
                {
                    t: "p",
                    x: "For a new app you run `kickoff-project`, which makes you settle stack and scope before scaffolding, then commits a green foundation. For work in an existing repo you run `new-feature`, which reads the real code, writes acceptance criteria, names what must not break, and builds against a test. When a whole module needs tests, you delegate to `test-author`. When something breaks, `debug-issue` walks you from reproduce to root cause to regression test, instead of guess and check.",
                },
                { t: "sub", x: "Shipping" },
                {
                    t: "p",
                    x: "Before review you run `self-review` over your own diff across four lenses, then delegate an independent pass to `code-reviewer`. You run `open-pr`, which refuses to proceed on a red [[quality gate]] and writes a description a reviewer can actually use. The whole time, `pre-commit-guard` sits underneath, blocking any commit that would leak a secret or a machine path, and `post-edit-format` keeps the tree tidy. When it is time to release, `deploy-check` runs the pre-deploy list and the post-deploy smoke check, with a rollback path named up front.",
                },
                { t: "sub", x: "Growing" },
                {
                    t: "p",
                    x: "You run `learn-log` to capture the non-obvious thing you figured out, with a link to where you applied it. When a project ships, `portfolio-update` turns it into skimmable, defensible portfolio material, and updates your job-seeker profile if it demonstrates a claim you can back up. `write-docs`, or the `docs-writer` subagent, leaves a README a newcomer could follow.",
                },
                { t: "sub", x: "Weekly" },
                {
                    t: "p",
                    x: "You run the `audit-repo` workflow to sweep the codebase for a concern in parallel, `dep-auditor` before a release, and `triage-todos` to turn scattered code notes into a ranked list.",
                },
                { t: "sub", x: "End of day" },
                {
                    t: "p",
                    x: "You run `wrap-day`, or `/wrap`. It routes everything that changed to its home using the Phase 2 [[routing table]], so nothing worth keeping dies in chat history.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "catalog",
            num: "05",
            title: "The catalog",
            heading: "What does each piece do?",
            blocks: [
                {
                    t: "thesis",
                    x: "The whole library, in the shape it has on disk. Hover or tap any row for what that piece does and the phrases that fire it.",
                },
                {
                    t: "p",
                    x: "The twelve skill directories are folded shut so the four kinds of thing fit on one screen. Open one to see its SKILL.md, or leave them shut and point at the directory itself, which is where each skill's job and trigger phrases live.",
                },
                { t: "tree", tree: devKit },
                {
                    t: "note",
                    kind: "warn",
                    lab: "The one thing to memorise on this page",
                    x: "Subagents spawned by a workflow always run in acceptEdits mode regardless of your session's [[permission mode]]. Their file edits are auto-approved. Do not point audit-repo at code you are not prepared to have modified.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "extending",
            num: "06",
            title: "Extending it",
            heading: "How do I grow the library as I grow?",
            blocks: [
                {
                    t: "thesis",
                    x: "The library is a starting point, not a finished thing. It should grow as you do.",
                },
                {
                    t: "vocab",
                    items: [
                        [
                            "Add a skill on the third explanation",
                            "When you have explained the same procedure three times, package it. Copy the shape of the skills here: a description that says what AND when with concrete triggers, a read-first list, an ordered checklist, a definition of done, and hand-offs.",
                        ],
                        [
                            "Promote a lesson when it recurs",
                            "When learn-log shows the same lesson coming back, that is the signal. Recurring judgment becomes a skill; a recurring exact-right operation becomes a script inside one.",
                        ],
                        [
                            "Write a workflow only on the third repetition",
                            "Formalising too early locks in a process you have not finished learning. And remember the permission gotcha: workflow subagents auto-approve file edits, so do not point one at code you are not ready to have changed.",
                        ],
                        [
                            "Tune the hooks as you get bitten",
                            "The guard patterns and the formatter are starting points. As something new gets through, a file type that leaked, a path that should have been blocked, add the pattern. That is how the enforcement layer earns its keep: every rule in it is there because something got through once.",
                        ],
                        [
                            "Keep stack.md honest",
                            "When your tooling changes, update the one file. Every skill follows, because none of them hardcode a command.",
                        ],
                    ],
                },
                { t: "sub", x: "Sources" },
                {
                    t: "sources",
                    items: [
                        ["Claude Code: skills", "https://code.claude.com/docs/en/skills"],
                        ["Claude Code: sub-agents", "https://code.claude.com/docs/en/sub-agents"],
                        ["Claude Code: hooks", "https://code.claude.com/docs/en/hooks"],
                        ["Claude Code: dynamic workflows", "https://code.claude.com/docs/en/workflows"],
                        [
                            "Agent Skills: authoring best practices",
                            "https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices",
                        ],
                        [
                            "Steering Claude Code",
                            "https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more",
                        ],
                    ],
                },
            ],
        },
    ],
};
