// Phase 4, the daily practice.
//
// Nothing installs here, so there are no trees. The page is habits, and the two
// tables that carry it are the session loop and the maintenance rhythm.

export const phase4 = {
    n: 4,
    slug: "working-together",
    kind: "Habits, nothing installs",
    title: "Working Together",
    blurb: "How do I actually work with Claude well, day to day?",
    lede: "The first three phases are setup, done once. This one is a practice you repeat, and it is what separates having a Claude setup from getting leverage from one.",
    stamp: "Verified against Anthropic's official documentation in August 2026.",
    tags: ["session loop", "verification", "maintenance"],

    sections: [
        // ---------------------------------------------------------------
        {
            id: "what",
            num: "00",
            title: "What this phase is",
            heading: "Why is working together a skill of its own?",
            blocks: [
                {
                    t: "thesis",
                    x: "A good setup does not make you effective. Using it with judgment does. This phase is the judgment.",
                },
                {
                    t: "p",
                    x: "By now you have the pieces from Phase 1, a machine that knows who you are from Phase 2, and a library of skills, subagents, hooks and workflows from Phase 3. The failure mode from here is not a missing tool. It is using the tools without discipline: trusting output you did not verify, delegating work that should have stayed a conversation, or letting your memory and skills rot until they lie to you.",
                },
                {
                    t: "note",
                    lab: "Why it compounds",
                    x: "A developer who verifies, captures and prunes every day ends the month with a system that is sharper than it started. One who does not ends the month with a system that quietly misleads them.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "loop",
            num: "01",
            title: "The session loop",
            heading: "How do I run one session well?",
            blocks: [
                {
                    t: "thesis",
                    x: "Open, work, verify, close. The two ends are where most leverage is lost, because they are the easy steps to skip.",
                },
                {
                    t: "table",
                    head: ["Step", "Do", "With"],
                    mono: [2],
                    rows: [
                        [
                            "Open",
                            "Orient before touching code. What am I working on, and what is the one next action?",
                            "plan-day, /ready",
                        ],
                        [
                            "Work",
                            "Build in the right container, against a definition of done",
                            "new-feature, debug-issue, subagents",
                        ],
                        [
                            "Verify",
                            "Prove it, do not assume it",
                            "quality gate, self-review, code-reviewer",
                        ],
                        [
                            "Close",
                            "File what changed so nothing dies in chat history",
                            "wrap-day, /wrap, learn-log",
                        ],
                    ],
                },
                {
                    t: "p",
                    x: "The open and close steps feel optional under time pressure. They are the opposite. Skipping open means you rediscover where you were every session, at the cost of the first ten minutes. Skipping close means every decision and lesson from the session evaporates, so tomorrow's session starts blind. The tools exist; the discipline is running them even when you are busy.",
                },
                {
                    t: "note",
                    lab: "The shape of a healthy session",
                    x: "It starts by naming the goal and ends by reconciling against it. If you cannot say at the end what done was, the prompt was underspecified at the start.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "delegation",
            num: "02",
            title: "Delegation judgment",
            heading: "Chat, skill, subagent, or workflow, in the moment?",
            blocks: [
                {
                    t: "thesis",
                    x: "The most common beginner mistake is putting work in the wrong container. In practice this is a snap decision you make dozens of times a day. Here is the reflex to build.",
                },
                {
                    t: "ol",
                    steps: true,
                    items: [
                        "Do I want an answer, or an artifact? An answer to read and react to is Chat. An artifact, or multi-step work you walk away from, is an agent.",
                        "Have I done this exact procedure before? If yes and it is written down, invoke the [[skill]]. If yes and it is not, that is a signal to write one.",
                        "Is the work noisy and self-contained? If it reads a lot and returns a little, delegate to a [[subagent]] so the noise never enters your context. If it needs back-and-forth with you, keep it in the main conversation.",
                        "Is it the same pass over many items? If it is a fan-out over dozens of files or issues, that is a [[dynamic workflow]], not forty manual delegations.",
                        "Must it happen every time, no exceptions? That is not instruction at all. That is a [[hook]].",
                    ],
                },
                { t: "sub", x: "Two calls where juniors misfire" },
                {
                    t: "note",
                    kind: "warn",
                    lab: "Do not delegate chatty work to a subagent",
                    x: "A subagent starts with an empty context, cannot ask you anything, and its result still costs your context when it returns. Delegate only self-contained, noisy work. If you find yourself wanting to clarify mid-task, it should have stayed a conversation.",
                },
                {
                    t: "note",
                    kind: "warn",
                    lab: "Do not formalise a workflow you have run once",
                    x: "You would lock in a process you have not finished learning, then maintain it forever. Wait for the third repetition.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "verify",
            num: "03",
            title: "Verification and trust",
            heading: "How do I know the work is actually right?",
            blocks: [
                {
                    t: "thesis",
                    x: "Claude is fast and confident. Neither is the same as correct. Your job in the loop is to be the part that checks.",
                },
                {
                    t: "note",
                    kind: "rule",
                    lab: "The single rule that prevents the most pain",
                    x: "Never trust done without evidence. Done means the [[quality gate]] from stack.md is green, not that Claude said it finished. Green tests you did not read are worth less than one test you watched fail and then pass.",
                },
                {
                    t: "table",
                    head: ["Check", "When"],
                    rows: [
                        [
                            "Read the diff, in full",
                            "Every change before you accept it. Not the files you remember touching, all of them",
                        ],
                        [
                            "Run the quality gate",
                            "Before trusting any done: typecheck, tests, build, from stack.md",
                        ],
                        [
                            "Prove a test can fail",
                            "For anything important: break the code, confirm the test goes red, restore it",
                        ],
                        [
                            "Independent review pass",
                            "For large or sensitive diffs: the code-reviewer subagent, whose fresh context catches what yours cannot",
                        ],
                        [
                            "Ask for the uncertainty",
                            "Flag anything you are not sure about surfaces the weak points instead of hiding them",
                        ],
                    ],
                },
                { t: "sub", x: "On autonomy and safety" },
                {
                    t: "p",
                    // "behind a prompt" meant a confirmation dialog, which is a
                    // second sense of a word this package spends twelve sections
                    // defining as an instruction to a model. Reworded rather
                    // than left for the reader to disambiguate.
                    x: "An agent trades predictability for reach. You buy the predictability back with constraints. Keep destructive git operations behind a confirmation rather than blanket-allowed, let the pre-commit-guard hook enforce the absolutes, and never point a dynamic workflow at code you are not prepared to have edited, because its subagents auto-approve edits.",
                },
                {
                    t: "note",
                    lab: "The rule of thumb",
                    x: "Automate the checkable. Gate the irreversible.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "feedback",
            num: "04",
            title: "The feedback loop",
            heading: "How does my system get better over time?",
            blocks: [
                {
                    t: "thesis",
                    x: "A static system decays. The point of the private context and the skill library is that they learn from you, and that only happens if you close the loop deliberately.",
                },
                {
                    t: "p",
                    x: "The loop has three moves: correct, capture, promote.",
                },
                {
                    t: "vocab",
                    items: [
                        [
                            "Correct",
                            "When Claude gets something wrong, fix it in the moment, but also notice why. A wrong output usually traces to a missing fact, which belongs in memory/core.md or a role file, or a missing procedure, which belongs in a skill.",
                        ],
                        [
                            "Capture",
                            "At session end, wrap-day routes what changed to its home using the Phase 2 routing table. A correction that is not captured will be needed again tomorrow. learn-log captures the non-obvious things you figured out, with proof.",
                        ],
                        [
                            "Promote",
                            "When the same correction or lesson recurs three times, promote it: a recurring fact into memory, a recurring judgment into a skill, a recurring exact-right operation into a script inside that skill, a recurring fan-out into a workflow. This is how the library grows to fit you instead of staying generic.",
                        ],
                    ],
                },
                {
                    t: "note",
                    lab: "How to tell whether it is working",
                    x: "The tell that the loop is working: you stop re-explaining things. The tell that it is broken: you keep correcting the same mistake, or your memory files describe a setup you no longer run.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "rhythm",
            num: "05",
            title: "The maintenance rhythm",
            heading: "What do I do daily, weekly, monthly?",
            blocks: [
                {
                    t: "thesis",
                    x: "Setup is once. Upkeep is forever, but small. A little pruning keeps the system honest; neglect turns it into a pile of confident lies.",
                },
                {
                    t: "table",
                    head: ["Cadence", "Do", "With"],
                    mono: [2],
                    rows: [
                        [
                            "Daily",
                            "Open with a plan, close with a reconcile and a learning entry",
                            "plan-day, wrap-day, learn-log",
                        ],
                        [
                            "Weekly",
                            "Sweep the codebase, triage TODOs, audit deps before a release, empty the inbox",
                            "audit-repo, triage-todos, dep-auditor",
                        ],
                        [
                            "Monthly",
                            "Prune memory/core.md by cutting any line that has not earned its place, reread decisions.md, confirm stack.md still matches your tooling",
                            "by hand, with Claude",
                        ],
                        [
                            "Quarterly",
                            "Turn the quarter's shipped work into portfolio and profile updates",
                            "portfolio-update",
                        ],
                    ],
                },
                {
                    t: "p",
                    x: "For anything on this list that should run whether or not you remember, use the scheduling primitives: [[scheduled task|scheduled tasks]] in Cowork or Claude Code Desktop, and [[routine|routines]] in the Claude Code cloud, re-run a whole task on a cadence with your machine closed. A [[hook]] fires on an event. [[/loop]] repeats within a session. A weekly dependency audit or a Monday planning brief is a natural scheduled task.",
                },
                {
                    t: "note",
                    kind: "warn",
                    lab: "The monthly prune is the one people skip and regret",
                    x: "Imported context loads in every session, so a bloated core.md taxes all of your work. A stale line, a renamed skill or a decision you reversed, is worse than a blank one, because it points Claude wrong at the exact moment it is deciding what to do.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "professional",
            num: "06",
            title: "Working professionally with AI",
            heading: "How do I stay honest and credible?",
            blocks: [
                {
                    t: "thesis",
                    x: "How you talk about AI-assisted work is part of the work. Credibility is easy to keep and hard to rebuild.",
                },
                {
                    t: "vocab",
                    items: [
                        [
                            "Claim only what you can defend",
                            "portfolio-update and the job-seeker profile exist to keep your claims grounded in shipped, provable work. In an interview you will have to explain the code in the room; a defensible small claim beats an impressive one you cannot back up.",
                        ],
                        [
                            "Understand what you ship",
                            "Using Claude to write code does not remove your responsibility to understand it. Verify not just that it works, but that you could explain and maintain it. The learning log is how using AI makes you a better engineer instead of a dependent one.",
                        ],
                        [
                            "Keep private things private",
                            "The Phase 2 split exists for this: identity, clients and profile live in the git-ignored context layer, never in a repo you might publish. The pre-commit-guard hook is the backstop.",
                        ],
                        [
                            "Be honest about the tool",
                            "Overstating or hiding AI use both cost credibility. State it plainly when it matters, and let the quality of the verified work speak.",
                        ],
                    ],
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "failures",
            num: "07",
            title: "Failure modes",
            heading: "What do I get wrong, and how do I fix it?",
            blocks: [
                {
                    t: "thesis",
                    x: "The tools rarely fail on their own. The loop fails at the human. These are the ways, and the fixes.",
                },
                {
                    t: "numtable",
                    head: ["Failure", "Why it hurts", "Fix"],
                    rows: [
                        [
                            "Trusting done without reading the diff or running the gate",
                            "Confident, plausible, wrong code ships",
                            "Read every diff; green gate before you accept anything",
                        ],
                        [
                            "Delegating chatty work to a subagent",
                            "It starts blank, cannot ask you, and still costs your context",
                            "Delegate only self-contained, noisy work; keep back-and-forth in the conversation",
                        ],
                        [
                            "Skipping the close",
                            "Decisions and lessons die in chat history",
                            "Run wrap-day even when busy. That is when it matters most",
                        ],
                        [
                            "Letting memory rot",
                            "Stale facts point Claude wrong at decision time",
                            "Prune core.md monthly; fix stale pointers when you find them",
                        ],
                        [
                            "Formalising too early",
                            "You maintain a process you had not finished learning",
                            "Wait for the third repetition before writing a skill or workflow",
                        ],
                        [
                            "Over-automating the irreversible",
                            "An auto-approved destructive action you cannot undo",
                            "Gate writes and deploys; automate only the checkable",
                        ],
                        [
                            "Never promoting corrections",
                            "You re-explain the same thing forever",
                            "Correct, capture, promote. The loop is the whole point",
                        ],
                    ],
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "leaves",
            num: "08",
            title: "Where this leaves you",
            heading: "The setup is finished. The practice is not.",
            blocks: [
                {
                    t: "p",
                    x: "Four phases: you understand the pieces, your machine knows who you are, your systems are installed, and you have the discipline to work with them. The setup is finished. The practice is not, and that is the right way round.",
                },
                {
                    t: "p",
                    x: "Keep the loop turning: plan, build, verify, close, and every so often prune. The system is only as good as the habits that maintain it, and those are yours now.",
                },
                { t: "sub", x: "Sources" },
                {
                    t: "sources",
                    items: [
                        [
                            "Claude prompting best practices",
                            "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices",
                        ],
                        [
                            "Steering Claude Code",
                            "https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more",
                        ],
                        ["Claude Code: sub-agents", "https://code.claude.com/docs/en/sub-agents"],
                        ["Claude Code: dynamic workflows", "https://code.claude.com/docs/en/workflows"],
                        ["Claude Code: scheduled tasks", "https://code.claude.com/docs/en/scheduled-tasks"],
                        ["Claude Code: hooks", "https://code.claude.com/docs/en/hooks"],
                    ],
                },
            ],
        },
    ],
};
