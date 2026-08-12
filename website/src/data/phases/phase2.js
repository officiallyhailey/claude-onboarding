import { contextKit, importTree, machineTree } from "../trees";

// Phase 2, the context layer.
//
// The six stage prompts are the deliverable of this page, so they are rendered
// as prompts with a copy button and their own definition of done, rather than
// as fenced blocks the reader has to retype.

export const phase2 = {
    n: 2,
    slug: "introducing-yourself",
    kind: "Installs the context kit",
    title: "Introducing Yourself",
    blurb: "How do I tell Claude who I am, so every session knows?",
    lede: "A hands-on setup guide. You install a small kit, then populate it by talking to Claude rather than filling in blanks alone.",
    stamp: "Verified against Anthropic's official documentation in August 2026. Phase 1 is the building-blocks reference this page uses without redefining.",
    tags: ["~/claude-context", "6 prompts", "routing table"],

    sections: [
        // ---------------------------------------------------------------
        {
            id: "before",
            num: "00",
            title: "Before you start",
            heading: "What do I need in place first?",
            blocks: [
                {
                    t: "thesis",
                    x: "The goal is a machine where every Claude session already knows who you are, what you always want remembered, and where new information should go, without you re-explaining it.",
                },
                {
                    t: "p",
                    x: "You should have read Phase 1, or at least skimmed its decision guide. This page uses the same vocabulary, [[prompt]], [[CLAUDE.md]], [[skill]], [[sub-agent]], [[script]], [[dynamic workflow]], [[hook]], without redefining it. Every one of those words is hoverable here too.",
                },
                {
                    t: "table",
                    head: ["Need", "Check"],
                    rows: [
                        [
                            "Claude Code installed",
                            "Run `claude` in a terminal. If it starts, you are set",
                        ],
                        [
                            "A ~/.claude directory",
                            "Claude Code creates it on first run. It is your personal, user-level config",
                        ],
                        ["Git installed", "The installer touches your global gitignore; that is all"],
                    ],
                },
                {
                    t: "note",
                    lab: "One distinction Phase 1 left implicit",
                    x: "CLAUDE.md exists at two scopes, and this page leans on the second one.",
                },
                {
                    t: "table",
                    head: ["Scope", "Path", "Loads"],
                    mono: [1],
                    rows: [
                        [
                            "Project",
                            "./CLAUDE.md in a repo",
                            "In sessions inside that repo. This is the one Phase 1 describes",
                        ],
                        [
                            "Personal, user",
                            "~/.claude/CLAUDE.md",
                            "In every session, in every directory",
                        ],
                    ],
                },
                {
                    t: "p",
                    x: "Your personal ops system rides on the second one. That is the file that can carry who I am into every session regardless of what you are working on.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "map",
            num: "01",
            title: "The map",
            heading: "Where does everything live, and why three places?",
            blocks: [
                {
                    t: "thesis",
                    x: "A personal Claude setup is not one folder. It is three layers with different jobs and different trust levels, wired so the private one loads automatically.",
                },
                {
                    t: "table",
                    head: ["Layer", "Path", "What it holds", "Trust"],
                    mono: [1],
                    rows: [
                        [
                            "Config surface",
                            "~/.claude/",
                            "Rules, permissions, hooks, slash commands, sub-agents, and the imports that pull in the layer below",
                            "Machine-local",
                        ],
                        [
                            "[[context layer|Private context]]",
                            "~/claude-context/",
                            "Who you are, what to always remember, your roles, your brand",
                            "Private, never published",
                        ],
                        [
                            "Publishable skills",
                            "~/claude-skills/",
                            "Reusable procedures a team could install",
                            "Shareable",
                        ],
                    ],
                },
                {
                    t: "note",
                    kind: "rule",
                    lab: "The single most important idea on this page",
                    x: "Your identity, brand, roles, and personal memory can never live in a skills repo you might publish. They are exactly what a publish-time privacy check exists to keep out. So they get their own private layer, and that layer is loaded into every session on purpose.",
                },
                {
                    t: "p",
                    x: "Most beginner setups only ever build the skills layer, or dump everything into one CLAUDE.md until it is too long to be read. Separating the private context from the publishable procedures, then auto-loading the private context, is the move that makes the whole thing feel like it knows you.",
                },
                { t: "sub", x: "How a session gets primed" },
                {
                    t: "p",
                    x: "Your personal CLAUDE.md stays short. It holds your hard rules inline, then uses import lines to pull in the short files from your private context. Imports in a CLAUDE.md load in every session regardless of directory, which is exactly what you want for identity and core memory.",
                },
                { t: "tree", tree: importTree },
                {
                    t: "p",
                    x: "Load order, lowest authority first, highest last:",
                },
                {
                    t: "table",
                    head: ["", "What loads", "When"],
                    mono: [1],
                    rows: [
                        ["1", "~/.claude/CLAUDE.md", "Every session: your rules plus the imports"],
                        ["2", "~/claude-context/*", "Via those imports: identity, core memory, router"],
                        ["3", "project ./CLAUDE.md", "When you are in that repo: facts about it"],
                        ["4", "~/.claude/settings.json", "Enforced by the harness: permissions and hooks"],
                        ["5", "the SKILL.md that fires", "Only when triggered: the procedure for the task"],
                    ],
                },
                {
                    t: "note",
                    lab: "The split to internalise",
                    x: "Facts load early and cheaply, in CLAUDE.md and the imported context. Procedures load only when triggered, as skills. Enforcement is not instruction at all: it is settings.json and hooks. Put each thing at the lowest-cost layer that can do the job.",
                },
                { t: "sub", x: "The tree the kit installs" },
                {
                    t: "p",
                    x: "Hover or tap any row for what that file is for, and what goes wrong when it is used for the wrong thing.",
                },
                { t: "tree", tree: contextKit },
                {
                    t: "note",
                    kind: "warn",
                    lab: "What does not live here",
                    x: "Structured project and task state belongs in your tracker: Airtable, Linear, Notion, GitHub Projects. This layer holds who you are and the private narrative around your work; the tracker holds the live records. One source of truth per fact.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "install-2",
            num: "02",
            title: "Install the kit",
            heading: "How do I stand up the structure safely?",
            blocks: [
                {
                    t: "thesis",
                    x: "The installer only ever adds. It appends to your CLAUDE.md after backing it up, refuses to overwrite files you have already filled in, and is safe to run more than once.",
                },
                {
                    t: "shell",
                    x: `cd phase-2-introducing-yourself
./setup.sh --dry-run   # print exactly what it would do, change nothing
./setup.sh             # do it`,
                },
                { t: "sub", x: "What it does, in order" },
                {
                    t: "ol",
                    steps: true,
                    items: [
                        "Copies claude-context/ to ~/claude-context/ with [[no-clobber]], so re-running never wipes content you have added.",
                        "Adds claude-context/ to ~/.config/git/ignore, so the private layer can never be committed to any repo.",
                        "Copies the slash commands and the sub-agents scaffold into ~/.claude/.",
                        "Backs up ~/.claude/CLAUDE.md, then appends the import block once, guarded by a marker so a second run is a no-op.",
                    ],
                },
                {
                    t: "p",
                    x: "If you prefer to do it by hand, those four steps are all it is: copy a folder, add one gitignore line, copy two folders, and paste the contents of `dot-claude/CLAUDE.md.append` at the bottom of your personal CLAUDE.md.",
                },
                {
                    t: "note",
                    lab: "Verify before you pour anything in",
                    x: "Start a fresh session in any directory and ask: what do you know about me from my imported context? If the imports are wired, it will answer from who-i-am.md and core.md even though they are still mostly blank. That confirms the plumbing before you fill it.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "populate",
            num: "03",
            title: "Populate it with Claude",
            heading: "How do I fill each file?",
            blocks: [
                {
                    t: "thesis",
                    x: "Do not fill these in by hand in an editor. Each stage below is a prompt you paste into Claude Code, running from your home directory, and answer by conversation. Claude writes the file; you supply the truth.",
                },
                {
                    t: "p",
                    x: "Do them in order; later stages assume earlier ones exist. Two files, `identity/who-i-am.md` and the brand files, are deliberately interview-driven, because their content has to be yours and not invented.",
                },

                { t: "sub", x: "Stage 1: identity and core memory" },
                {
                    t: "p",
                    x: "Goal: the two files that load in every session are true and short.",
                },
                {
                    t: "prompt",
                    lab: "Stage 1",
                    x: `Read ~/claude-context/identity/who-i-am.md and ~/claude-context/memory/core.md.
Interview me one question at a time to fill them in. Keep who-i-am.md under 30
lines and core.md a short list; these load in every session and cost tokens.
Durable facts and preferences only. If something is a hard "always/never" rule,
propose it for ~/.claude/CLAUDE.md instead. Write the files when we are done and
show me the diff. Do not invent anything about me.`,
                    done: "Both files read true, contain no placeholders, and nothing in them changes week to week.",
                },

                { t: "sub", x: "Stage 2: your hard rules" },
                {
                    t: "p",
                    x: "Goal: the always and never rules live where they carry the most weight, inline in your personal CLAUDE.md.",
                },
                {
                    t: "prompt",
                    lab: "Stage 2",
                    x: `Read ~/.claude/CLAUDE.md. Interview me for my hard rules: things you must always
or never do (attribution, formatting, tools, privacy). Add them ABOVE the
imports block as short imperative lines. For any rule a script or hook could
enforce deterministically, tell me so, and note it as a future hook. Show the
diff before writing.`,
                    done: "Your rules are a short, inline list above the import block, and you know which of them are only instruction (can be missed) versus enforceable later by a hook.",
                },

                { t: "sub", x: "Stage 3: roles" },
                {
                    t: "p",
                    x: "Goal: at least the engineer hat, plus any other mode you work in.",
                },
                {
                    t: "prompt",
                    lab: "Stage 3",
                    x: `Read ~/claude-context/roles/engineer.md and role-template.md. Interview me to
fill engineer.md: default stack, musts, must-nots, how I like code delivered, and
my "definition of done" quality gate. Then ask if I want another role (writer,
operator, researcher); if so, copy role-template.md and fill it. Write and diff.`,
                    done: "engineer.md has a real quality gate you would actually trust, and any second role is one clear mode of work, not a catch-all.",
                },

                { t: "sub", x: "Stage 4: brand" },
                {
                    t: "p",
                    x: "Goal: anything public-facing comes out on-brand without you restating it.",
                },
                {
                    t: "prompt",
                    lab: "Stage 4",
                    x: `Read ~/claude-context/brand/brand.md and visual.md. Interview me for positioning
and messaging, then for concrete visual tokens: hex colors and font names. Note
which color pairs pass WCAG AA. Write both files. Then tell me how to point the
dataviz and theme-factory skills at visual.md instead of placeholder palettes.`,
                    done: "visual.md has real hex values and fonts, and you know how to make a chart or deck use them.",
                },

                { t: "sub", x: "Stage 5: projects and the router" },
                {
                    t: "p",
                    x: "Goal: a map of your active work, and a router that rides in every session.",
                },
                {
                    t: "prompt",
                    lab: "Stage 5",
                    x: `Read ~/claude-context/projects/_index.md and workflows/_index.md. Ask me for my
active projects and where each one's structured record lives (my tracker), and
fill _index.md. Then update workflows/_index.md so it lists the skills I actually
use and the situations that should trigger each. Keep the router to one line per
entry. Write and diff.`,
                    done: "_index.md links each project to its tracker, rather than holding a task list pasted into a file, and the router names your real skills.",
                },

                { t: "sub", x: "Stage 6: capture the habit" },
                {
                    t: "p",
                    x: "Goal: you stop losing decisions to chat history.",
                },
                {
                    t: "prompt",
                    lab: "Stage 6",
                    x: `From now on, at the end of a working session, I will run /wrap. Confirm you can
see ~/.claude/commands/wrap.md and walk me through what it will do, using the
routing table. Do not change anything yet.`,
                    done: "/wrap is recognised and you have run it once end to end.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "routing",
            num: "04",
            title: "The routing table",
            heading: "When I learn something new, where does it go?",
            blocks: [
                {
                    t: "thesis",
                    x: "This is the part you keep. When you learn or decide something, this table says which file it belongs in, so updates land in the right place instead of scrolling out of a chat.",
                },
                {
                    t: "table",
                    head: ["When you have...", "It goes in", "Why there"],
                    mono: [1],
                    rows: [
                        [
                            "A durable fact or preference true across all work",
                            "memory/core.md",
                            "Loaded every session; this is the always-remember list",
                        ],
                        [
                            "A hard always or never rule",
                            "~/.claude/CLAUDE.md",
                            "Highest authority; a hook can enforce the machine-checkable half",
                        ],
                        [
                            "A dated decision or a reversal",
                            "memory/decisions.md",
                            "A log with dates, so changes are visible rather than silent",
                        ],
                        [
                            "A person: client, collaborator, mentor",
                            "memory/people.md",
                            "Keeps names and context private and in one place",
                        ],
                        ["A bio, blurb, or standard link", "identity/bios.md", "Stop rewriting these"],
                        [
                            "A change to how you sound in writing",
                            "identity/voice.md",
                            "The voice file drafts pull from",
                        ],
                        [
                            "A stack default or a build must or must-not",
                            "roles/engineer.md",
                            "Role content, loaded when you put that hat on",
                        ],
                        [
                            "Anything about job hunting or resume claims",
                            "roles/job-seeker/profile.md",
                            "Single grounded source of truth; private by design",
                        ],
                        [
                            "Positioning, audience, or messaging",
                            "brand/brand.md",
                            "Public-facing work reads from here",
                        ],
                        [
                            "Colours, fonts, logo rules",
                            "brand/visual.md",
                            "So generated visuals are on-brand by default",
                        ],
                        [
                            "Narrative context for one project",
                            "projects/<name>/context.md",
                            "The why a tracker does not hold",
                        ],
                        [
                            "Live tasks, status, structured records",
                            "your tracker",
                            "One source of truth. Link it from projects/_index.md; do not duplicate it into a file",
                        ],
                        [
                            "A reusable procedure you have explained 3+ times",
                            "a skill",
                            "Package once, trigger by description",
                        ],
                        [
                            "A step that must be exactly right every time",
                            "a script inside that skill",
                            "Determinism beats instructions",
                        ],
                        [
                            "A fan-out over dozens of items",
                            "a dynamic workflow",
                            "More agents than one conversation can track",
                        ],
                        [
                            "Something automatic before a commit or on an event",
                            "a hook in settings.json",
                            "Enforcement, not instruction",
                        ],
                        [
                            "Anything you are unsure how to file",
                            "inbox/",
                            "Capture now, triage later. Better than losing it",
                        ],
                    ],
                },
                {
                    t: "note",
                    kind: "rule",
                    lab: "The distinction to internalise",
                    x: "Facts and context go into the private layer. Procedures go into skills. Enforcement goes into settings and hooks. If you find yourself pasting a task list or live status into a markdown file, stop and put it in your tracker instead, then link to it from projects/_index.md.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "levelups",
            num: "05",
            title: "Level-ups",
            heading: "Commands, a session-start hook, sub-agents",
            blocks: [
                {
                    t: "thesis",
                    x: "Once the base is in place, three additions remove the most friction. None are required. Add them when the pain shows up.",
                },
                { t: "sub", x: "Slash commands, already installed" },
                {
                    t: "table",
                    head: ["Command", "Does"],
                    mono: [0],
                    rows: [
                        [
                            "/wrap",
                            "End-of-session reconcile: routes what changed to the right file using the routing table above",
                        ],
                        ["/ready", "Lists the top few things ready to pick up next"],
                        ["/kickoff <name>", "Creates a project's private context folder and index row"],
                    ],
                },
                {
                    t: "p",
                    x: "A slash command is just a Markdown file whose body is a prompt. Add your own by dropping a file in `~/.claude/commands/`.",
                },
                { t: "sub", x: "A session-start hook" },
                {
                    t: "p",
                    x: "Nothing runs at the start of a session by default, so every session opens with Claude working out where it is. A SessionStart [[hook]] that prints your ready queue removes that. Hooks are deterministic: they fire on lifecycle events whether or not the model remembers to.",
                },
                {
                    t: "prompt",
                    lab: "Ask for the hook",
                    x: `Help me add a SessionStart hook to ~/.claude/settings.json that runs my /ready
logic and prints the top 3 things to pick up. Show me the settings.json change
and the command it runs before applying it.`,
                },
                { t: "sub", x: "Sub-agents" },
                {
                    t: "p",
                    x: "When you have noisy, self-contained work, audit forty files and return five findings, define a [[sub-agent]] in `~/.claude/agents/`. The kit puts a README there with the file format. Keep each one to a single job, a read-only tool list where possible, and an explicit stop rule.",
                },
                { t: "sub", x: "Where this leaves your machine" },
                {
                    t: "p",
                    x: "After Phase 2 the left-hand tree below is partly filled and the right-hand one is complete. Phase 3 fills in the rest.",
                },
                { t: "tree", tree: machineTree },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "mistakes-2",
            num: "06",
            title: "Common mistakes",
            heading: "What goes wrong, and the fix",
            blocks: [
                {
                    t: "p",
                    x: "Each row opens to why it hurts and what to do instead.",
                },
                {
                    t: "vocab",
                    items: [
                        [
                            "Putting everything in CLAUDE.md",
                            "It loads in every session, so bloat is a tax on all your work, and long files get skimmed. Fix: keep it to rules plus a few imports; move facts to core.md and procedures to skills.",
                        ],
                        [
                            "Personal facts in a publishable repo",
                            "One push leaks identity. Fix: keep identity, brand, roles, and profile in ~/claude-context, which the installer adds to your global gitignore.",
                        ],
                        [
                            "Turning core.md into a journal",
                            "It loads every session, so a journal there taxes every task. Fix: durable facts only; dated entries go to decisions.md.",
                        ],
                        [
                            "Tracking tasks in markdown files",
                            "You get a second, stale copy of your tracker. Fix: keep live state in the tracker and link it from projects/_index.md.",
                        ],
                        [
                            "A dangling agents symlink",
                            "If the target is missing, no custom sub-agent loads and you never get told. Fix: make ~/.claude/agents a real directory, or point the symlink at something that exists.",
                        ],
                        [
                            "Filling templates by hand and inventing content",
                            "You end up defending claims you made up, especially in the job-seeker profile. Fix: use the stage prompts and let Claude interview you, so only what is true gets written.",
                        ],
                        [
                            "Never reconciling at session end",
                            "Decisions live and die in chat history. Fix: run /wrap and let the routing table put each thing in its home.",
                        ],
                    ],
                },
                { t: "sub", x: "Sources" },
                {
                    t: "sources",
                    items: [
                        [
                            "Claude Code: memory and CLAUDE.md imports",
                            "https://code.claude.com/docs/en/memory",
                        ],
                        [
                            "Steering Claude Code",
                            "https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more",
                        ],
                        ["Claude Code: skills", "https://code.claude.com/docs/en/skills"],
                        ["Claude Code: sub-agents", "https://code.claude.com/docs/en/sub-agents"],
                        ["Claude Code: hooks", "https://code.claude.com/docs/en/hooks"],
                        [
                            "Agent Skills overview",
                            "https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview",
                        ],
                    ],
                },
            ],
        },
    ],
};
