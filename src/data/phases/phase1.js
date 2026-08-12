import { nestingTree, skillAnatomy } from "../trees";

// Phase 1, the building-blocks reference.
//
// Content as data; Blocks.jsx draws it. Every string runs through rich(), so
// [[glossary]] words are hoverable wherever they appear.
//
// Two things are deliberately different from the source document. Directory
// layouts are file trees rather than fenced blocks, so each row carries what it
// is for. Code samples are FileCards, so the name of the file is a control that
// answers what it is and where it goes before you read a line of it.

export const phase1 = {
    n: 1,
    slug: "understanding-claude",
    kind: "Read only",
    title: "Understanding Claude",
    blurb: "What are all the pieces, and when do I use each?",
    lede: "A working reference for developers who can code but have never built with agents, skills, or workflows. Every section stands on its own.",
    stamp: "Verified against Anthropic's official documentation in August 2026. Anything that could not be confirmed is flagged and collected in the appendix.",
    tags: ["12 sections", "glossary", "decision guide"],

    sections: [
        // ---------------------------------------------------------------
        {
            id: "orientation",
            num: "01",
            title: "Orientation",
            heading: "How do all the pieces fit together?",
            blocks: [
                {
                    t: "thesis",
                    x: "Building with AI means moving work out of the chat window and into artifacts you can version, share, and re-run. The whole discipline is deciding which artifact a given piece of work belongs in.",
                },
                { t: "sub", x: "The mental model" },
                {
                    t: "p",
                    x: "You already do this every day, without calling it anything. You do not paste the same nav markup into every page, you build it once as a component and import it. You do not retype `node --watch server.js` a hundred times, you add it to the scripts in `package.json` and run `npm run dev`. Working with AI tooling is the same instinct, applied to instructions instead of code.",
                },
                {
                    t: "p",
                    x: "Every piece of guidance you give a model lives somewhere on a spectrum:",
                },
                {
                    t: "table",
                    head: ["Where it lives", "Lifespan", "Example"],
                    rows: [
                        ["A message you type", "One turn", "Rename this variable"],
                        [
                            "A conversation",
                            "One session",
                            "For this whole session, use British spellings",
                        ],
                        [
                            "A file in your repo",
                            "Forever, for this project",
                            "Build commands, code conventions",
                        ],
                        [
                            "A packaged capability",
                            "Forever, across projects and people",
                            "Your team's PR review checklist",
                        ],
                    ],
                },
                {
                    t: "p",
                    x: "The building blocks below are just names for points on that spectrum. Choosing badly is the most common beginner mistake: repeating yourself when you should have written a [[skill]], or writing a skill for something you will do once.",
                },
                { t: "sub", x: "The three Claude surfaces" },
                {
                    t: "p",
                    x: "These are different products, not different models. Anthropic describes Chat as a conversation you steer turn by turn, and Cowork as a delegation where you describe the goal, Claude works across your files and tools, and you come back to a finished result.",
                },
                {
                    t: "table",
                    head: ["Surface", "Best for", "How it runs"],
                    rows: [
                        [
                            "[[Claude Chat]]",
                            "A conversation you steer turn by turn",
                            "You send a message, Claude replies, you react",
                        ],
                        [
                            "[[Claude Cowork]]",
                            "Multi-step work you delegate: research, analysis, file organisation, finished deliverables",
                            "You describe an outcome, it plans and executes. Sessions run in a cloud sandbox by default and keep working when you close your laptop",
                        ],
                        [
                            "[[Claude Code]]",
                            "Building software",
                            "Runs in your terminal or IDE with access to your file system and dev tools",
                        ],
                    ],
                },
                {
                    t: "p",
                    x: "Anthropic states that Cowork and Claude Code run on the same engine: both are Claude Code underneath. Cowork is scoped to folders you explicitly share; Claude Code runs directly in your project.",
                },
                {
                    t: "note",
                    lab: "Two consequences for you",
                    x: [
                        "Cowork is not Chat but slower. It plans, breaks work into subtasks, runs code and shell commands in an isolated environment, and can coordinate parallel workstreams. That changes what you should put in the prompt, which is section 4.",
                        "Skills you write for one surface do not automatically appear on the others. Custom skills do not sync across claude.ai, the API, and Claude Code.",
                    ],
                },
                { t: "sub", x: "The building-block map" },
                {
                    t: "table",
                    head: ["Block", "One-line definition", "Lives as", "Typical lifespan"],
                    mono: [2],
                    rows: [
                        ["[[prompt|Prompt]]", "A single instruction you type", "A message", "One turn"],
                        [
                            "Project context file",
                            "Standing facts about this repo",
                            "CLAUDE.md",
                            "Every session in this project",
                        ],
                        [
                            "[[skill|Skill]]",
                            "Packaged instructions and resources Claude loads when relevant",
                            "SKILL.md in a directory",
                            "Forever, reusable",
                        ],
                        [
                            "[[script|Script]]",
                            "Deterministic code a skill runs instead of describing",
                            "A file in scripts/",
                            "Forever, reusable",
                        ],
                        [
                            "[[agent|Agent]]",
                            "A model in a loop with tools, working toward a goal",
                            "The product you are using, or a definition file",
                            "Per session",
                        ],
                        [
                            "[[sub-agent|Sub-agent]]",
                            "A specialised agent the main agent delegates to",
                            ".claude/agents/*.md",
                            "Per delegated task",
                        ],
                        [
                            "[[dynamic workflow|Workflow]]",
                            "A script that orchestrates many sub-agents at scale",
                            ".claude/workflows/*.js, written by Claude",
                            "Forever, re-runnable",
                        ],
                        [
                            "[[plugin|Plugin]]",
                            "A shareable bundle of skills, sub-agents, connectors, and hooks",
                            "A directory with a manifest",
                            "Installed once, used by a team",
                        ],
                    ],
                },
                { t: "sub", x: "How they nest" },
                {
                    t: "p",
                    x: "Each row below sits inside the one above it. Hover or tap any of them for what it actually is.",
                },
                { t: "tree", tree: nestingTree },
                {
                    t: "note",
                    lab: "Read next",
                    x: "If you are new, take sections 2, 3, and 10 in that order. If you are about to build something reusable, jump to section 7.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "fundamentals",
            num: "02",
            title: "Prompting fundamentals",
            heading: "What does any good prompt contain?",
            blocks: [
                {
                    t: "thesis",
                    x: "A good prompt is a brief for a competent stranger: role, objective, constraints, success criteria, format, and examples, with nothing left implied.",
                },
                {
                    t: "p",
                    x: "Anthropic's own analogy is the useful one: think of Claude as a brilliant but new employee who lacks context on your norms and workflows. The golden test they publish is to show your prompt to a colleague with minimal context and ask them to follow it. If they would be confused, Claude will be too.",
                },
                {
                    t: "p",
                    x: "This section is tool-agnostic. It applies to Chat, Cowork, Claude Code, the API, and every competitor product.",
                },
                { t: "sub", x: "The six ingredients" },
                {
                    t: "table",
                    head: ["Ingredient", "What it does", "Weak", "Strong"],
                    rows: [
                        [
                            "Role",
                            "Sets voice, depth, and default assumptions",
                            "(omitted)",
                            "You are a senior backend engineer reviewing a junior's PR.",
                        ],
                        [
                            "Objective",
                            "States the outcome, not the activity",
                            "Look at my code",
                            "Find bugs that would cause a 500 in production.",
                        ],
                        [
                            "Context",
                            "Supplies what the model cannot see or infer",
                            "(omitted)",
                            "This is an Express API behind Cloudflare; `req.user` is set by middleware.",
                        ],
                        [
                            "Constraints",
                            "Bounds the solution space",
                            "(omitted)",
                            "Do not change the public API. Do not add dependencies.",
                        ],
                        [
                            "[[done-when criteria|Success criteria]]",
                            "Makes done checkable",
                            "Make it good",
                            "Done when every handler has an error path and tests pass.",
                        ],
                        [
                            "Format",
                            "Removes guesswork about the output shape",
                            "(omitted)",
                            "Return a Markdown table: file, line, severity, fix.",
                        ],
                    ],
                },
                {
                    t: "p",
                    x: "Two more that pay for themselves whenever the task is fuzzy:",
                },
                {
                    t: "table",
                    head: ["Ingredient", "What it does", "Note"],
                    rows: [
                        [
                            "[[few-shot prompting|Examples]]",
                            "Steers format, tone, and structure more reliably than description",
                            "Anthropic recommends three to five examples. Make them relevant, diverse, and structurally consistent",
                        ],
                        [
                            "[[not-doing list|Not-doing list]]",
                            "Prevents the obvious wrong turn",
                            "State what to do rather than what not to do wherever you can",
                        ],
                    ],
                },
                { t: "sub", x: "Techniques worth knowing" },
                {
                    t: "p",
                    x: "These are the officially documented techniques, condensed. Anthropic keeps them on a single living page rather than one page per technique.",
                },
                {
                    t: "table",
                    head: ["Technique", "One line"],
                    rows: [
                        ["Be clear and direct", "Say exactly what you want; assume no shared context"],
                        [
                            "Add context, the why",
                            "Explaining the reason lets Claude generalise correctly to cases you did not list",
                        ],
                        [
                            "Use examples",
                            "Three to five relevant, diverse, structurally consistent examples",
                        ],
                        [
                            "Structure with [[XML tags]]",
                            "Wrap each content type in its own tag so it cannot be misread",
                        ],
                        [
                            "[[role prompting|Give Claude a role]]",
                            "One sentence in the system prompt measurably focuses behaviour and tone",
                        ],
                        [
                            "Long-context ordering",
                            "Put long documents at the top, query at the bottom; ask Claude to quote relevant passages before answering",
                        ],
                        [
                            "Control the output format",
                            "Say what to do, not what not to do; show the shape you want",
                        ],
                        [
                            "Ask Claude to self-check",
                            "Before you finish, verify your answer against these criteria",
                        ],
                        [
                            "Chain complex prompts",
                            "Split into stages when you need to inspect intermediate output; draft, review, refine",
                        ],
                        [
                            "Balance autonomy and safety",
                            "For agentic work, ask Claude to confirm before irreversible or destructive actions",
                        ],
                    ],
                },
                {
                    t: "note",
                    kind: "warn",
                    lab: "Two techniques in older tutorials are no longer current",
                    x: [
                        "Prefilling the final assistant turn returns a 400 error on Claude 4.6 and later. Assistant messages earlier in the conversation are unaffected, and pre-4.6 models still support prefill.",
                        "Manual [[chain of thought]], think step by step, is now documented as a fallback for when thinking is off. Current models use [[adaptive thinking]] and decide how much to reason on their own.",
                    ],
                },
                { t: "sub", x: "What to include in any prompt" },
                {
                    t: "table",
                    head: ["Include", "Why"],
                    rows: [
                        [
                            "The outcome, stated as a finished thing",
                            "A working /login route beats help with auth",
                        ],
                        [
                            "Everything the model cannot see",
                            "File contents, error text, versions, constraints from your team",
                        ],
                        [
                            "The definition of done",
                            "Otherwise you get plausible work you cannot evaluate",
                        ],
                        ["The output format", "Table, file, diff, JSON. Pick one"],
                        ["What is out of scope", "The cheapest way to prevent a twenty-minute wrong turn"],
                        [
                            "Examples, if format matters",
                            "The single highest-leverage addition for consistency",
                        ],
                    ],
                },
                { t: "sub", x: "The shape, all together" },
                {
                    t: "file",
                    name: "a prompt with all six ingredients",
                    path: "prompt.txt",
                    kind: "example",
                    def: "Not a file you save anywhere. It is the shape of a message, laid out so each of the six ingredients is visible as its own line.",
                    note: "The tell that it is complete: a colleague with no context could act on it without asking you a question first.",
                    code: `Role: You are a senior TypeScript reviewer.
Objective: Find correctness bugs in the diff below that tests would not catch.
Context: Node 22, Express 5. db.query returns null (not []) when no rows match.
Constraints: Do not propose refactors. Do not suggest new libraries.
Done when: Every issue names a file, a line, and a one-line fix.
Format: Markdown table, file | line | severity | fix.

<diff>
...
</diff>`,
                    why: "The XML tag around the diff is doing real work: it makes the boundary between the instructions and the input unambiguous, so a line of code that reads like a request cannot be taken as one.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "chat",
            num: "03",
            title: "Prompting for Chat",
            heading: "How do I ask well in a conversation?",
            blocks: [
                {
                    t: "thesis",
                    x: "In Chat you are steering turn by turn, so front-load context and format, and let iteration do the rest. You see the result before anything is committed.",
                },
                {
                    t: "p",
                    x: "[[Claude Chat]] is the conversational surface: you send a message, you read the reply, you correct course. Nothing happens to your files or systems unless you use a tool or [[connector]]. The feedback loop is short and cheap, which is exactly what you should exploit.",
                },
                {
                    t: "table",
                    head: ["Use Chat when", "Not Chat when"],
                    rows: [
                        [
                            "You want to understand something",
                            "The task takes twenty steps and produces files",
                        ],
                        [
                            "You are drafting, exploring, or comparing options",
                            "You want to walk away and come back to finished work",
                        ],
                        [
                            "You will judge the answer yourself and iterate",
                            "The work needs to touch your file system or run for a while",
                        ],
                        [
                            "The output is text you will read, not artifacts you will ship",
                            "You would have to babysit every step to keep it on track",
                        ],
                    ],
                },
                { t: "sub", x: "How it differs from talking to an agent" },
                {
                    t: "table",
                    head: ["", "Chat", "Agent (Cowork or Claude Code)"],
                    rows: [
                        ["Unit of work", "One reply", "One completed task"],
                        ["Who decides the steps", "You", "The agent plans and decomposes"],
                        [
                            "Cost of a bad prompt",
                            "One rewrite",
                            "Wasted execution, possibly file changes",
                        ],
                        [
                            "What you must supply",
                            "Context and format",
                            "Context, format, plus success criteria, scope boundaries, and permissions",
                        ],
                        ["Correction", "Next message", "Ideally before it starts"],
                    ],
                },
                {
                    t: "note",
                    lab: "The practical rule",
                    x: "In Chat you can be under-specified and recover. With an agent you pay for it.",
                },
                { t: "sub", x: "What to include in a Chat prompt" },
                {
                    t: "table",
                    head: ["Include", "Notes"],
                    rows: [
                        [
                            "The actual artifact you are working with",
                            "Paste the code, error, or text. Do not describe it",
                        ],
                        ["What you have already tried", "Prevents the answer you already ruled out"],
                        ["Your level and stack", "I am new to Rust changes the entire response"],
                        ["The output format", "Table, bullet list, code block, essay"],
                        ["One question at a time", "Multi-question prompts get shallow answers to each"],
                        ["A verification ask, if it matters", "Flag anything you are unsure about"],
                    ],
                },
                { t: "sub", x: "Weak against strong" },
                {
                    t: "versus",
                    weak: {
                        text: "my auth is broken can you help",
                        why: "No stack, no code, no ruled-out causes, and no shape for the answer. Every reply to this starts by asking three questions.",
                    },
                    strong: {
                        // No hard wrapping inside a paragraph. The box wraps at
                        // its own width, so a line break written in here lands
                        // as a second, ragged wrap on top of that one.
                        text: `Express 5 + jsonwebtoken. Login works, but every request to a protected route 401s. I have confirmed the token is present in the Authorization header and that JWT_SECRET matches between sign and verify.

Middleware:
[paste 15 lines]

Give me the 3 most likely causes, ranked, each with the one-line check that would confirm or rule it out. Flag anything you cannot tell from this snippet alone.`,
                        why: "Names the stack, rules out two dead ends, pastes the real code, caps the output at three items, and asks for falsifiable checks rather than a rewrite.",
                    },
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "cowork",
            num: "04",
            title: "Prompting for Cowork",
            heading: "How do I brief an agent that plans and executes?",
            blocks: [
                {
                    t: "thesis",
                    x: "Cowork plans and executes before you see anything, so a Cowork prompt is a work order: objective, done-criteria, scope boundaries, and deliverable. Not a question.",
                },
                {
                    t: "p",
                    x: "[[Claude Cowork]] is Anthropic's agentic surface for multi-step work. Officially: instead of responding to prompts one at a time, Claude can take on complex, multi-step tasks and execute them on your behalf. Describe an outcome, step away, and come back to finished work.",
                },
                { t: "sub", x: "What it does with your request" },
                {
                    t: "ol",
                    steps: true,
                    items: [
                        "Analyses the request and creates a plan",
                        "Breaks complex work into subtasks when needed",
                        "Runs code and shell commands in an isolated environment on Anthropic's servers",
                        "Coordinates multiple workstreams in parallel if appropriate",
                        "Delivers finished outputs to your session for preview and download",
                    ],
                },
                {
                    t: "p",
                    x: "It is available on paid plans on Claude Desktop for macOS and Windows, and is in beta on web and mobile for Max, Team, and Enterprise, rolling out to Pro. Sessions run in the cloud by default, so work continues when you close your laptop. It uses more of your usage allocation than chatting does.",
                },
                {
                    t: "table",
                    head: ["Use Cowork when", "Use Chat instead when"],
                    rows: [
                        ["The task has many steps and a clear finish line", "You want to think out loud"],
                        [
                            "The deliverable is files: documents, spreadsheets, decks, organised folders",
                            "The deliverable is an answer",
                        ],
                        [
                            "You would otherwise supervise a long sequence of small asks",
                            "You want to react to each step",
                        ],
                        ["You want it to run on a schedule", "It is a one-off"],
                    ],
                },
                { t: "sub", x: "What changes about the prompt" },
                {
                    t: "p",
                    x: "Because Cowork commits to a plan before you see output, several ingredients move from nice to load-bearing.",
                },
                {
                    t: "table",
                    head: ["Ingredient", "Why it matters more here"],
                    rows: [
                        [
                            "[[done-when criteria|Done-when criteria]]",
                            "The agent decides when to stop. If you do not define done, it guesses",
                        ],
                        [
                            "[[not-doing list|Not-doing list]]",
                            "Cheaply prevents scope creep that costs real execution time",
                        ],
                        [
                            "Deliverable and destination",
                            "A Markdown file in the outputs folder is checkable; a summary is not",
                        ],
                        [
                            "[[permission mode|Permission posture]]",
                            "Cowork has Manual, Auto, and Skip approval modes. Say up front what it may do unattended",
                        ],
                        [
                            "Assumptions, stated",
                            "Write your assumptions down and invite correction, rather than leaving gaps for it to fill silently",
                        ],
                    ],
                },
                { t: "sub", x: "What to include in a Cowork task" },
                {
                    t: "table",
                    head: ["Include", "Example phrasing"],
                    rows: [
                        ["Role or frame", "You are a technical writer producing onboarding docs."],
                        ["Objective, as an outcome", "Produce a single reference document that..."],
                        ["Done-when checklist", "Done when it (1)... (2)... (3)..."],
                        ["Not-doing list", "Do not build the website. Do not invent product features."],
                        [
                            "Source of truth",
                            "Verify against docs.claude.com; flag anything you cannot confirm.",
                        ],
                        ["Deliverable and format", "One Markdown file, plus an optional HTML version."],
                        ["Assumptions to correct", "Assuming reference depth, junior-readable. Adjust if wrong."],
                        ["Verification step", "Fact-check every product claim before writing."],
                    ],
                },
                { t: "sub", x: "Weak against strong" },
                {
                    t: "versus",
                    weak: {
                        text: "research AI agent tools and write something up for our juniors",
                        why: "No audience, no shape, no stopping condition, no boundaries, and no artifact. The agent will produce something, and you will have no basis for saying it is wrong.",
                    },
                    strong: {
                        text: `Role: senior engineer writing onboarding docs for junior full-stack devs.

Objective: one Markdown reference explaining agents, sub-agents, skills, scripts, and workflows, anchored on Claude Code and Cowork.

Done when: every block has a definition, a "when to use it", a checklist of what to include when authoring one, and a short example; and there is a decision table mapping situations to blocks.

Not doing: no marketing tone, no vendor API internals, no website build. Verify product claims against docs.claude.com and flag anything unconfirmed.

Deliver: one .md file in the outputs folder, plus a 3-sentence summary.`,
                        why: "It fixes the audience, the shape, the stopping condition, the boundaries, the source of truth, and the artifact. Note that it reads like a ticket rather than a question. That is the tell.",
                    },
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "agents",
            num: "05",
            title: "Agents",
            heading: "What is an agent, and when do I define one?",
            blocks: [
                {
                    t: "thesis",
                    x: "An agent is a model running in a loop with tools and a goal. It decides its own next step, which is exactly what makes it powerful and exactly what makes scope discipline mandatory.",
                },
                {
                    t: "p",
                    x: "An [[agent]] is not a special model. It is a model plus three things:",
                },
                {
                    t: "table",
                    head: ["Component", "What it means"],
                    rows: [
                        ["A goal", "The outcome it is working toward"],
                        [
                            "[[tool|Tools]]",
                            "Things it can actually do: read files, run bash, search the web, call an API",
                        ],
                        [
                            "A loop",
                            "It observes the result of each action and chooses the next one, until done",
                        ],
                    ],
                },
                {
                    t: "p",
                    x: "Claude Cowork and Claude Code are both agents in this sense. In Claude Code you can also define named agents in files, which become selectable personalities with their own tools and permissions.",
                },
                {
                    t: "table",
                    head: ["Reach for an agent when", "Do not when"],
                    rows: [
                        [
                            "The number of steps is not knowable in advance",
                            "You know the exact three commands to run. Just run them",
                        ],
                        ["Each step depends on the last step's output", "The work is a single transformation"],
                        [
                            "The work spans tools: files, shell, web, a connector",
                            "A plain prompt gets you there",
                        ],
                        [
                            "You are willing to define done precisely",
                            "You cannot articulate what success looks like",
                        ],
                    ],
                },
                {
                    t: "note",
                    lab: "The honest tradeoff",
                    x: "An agent trades predictability for reach. It will find paths you did not think of, and it will occasionally take one you did not want. Constraints are how you buy the predictability back.",
                },
                { t: "sub", x: "The fields in a definition" },
                {
                    t: "p",
                    x: "For a Claude Code agent definition, these are the fields you will reach for most. The full reference documents eighteen.",
                },
                {
                    t: "table",
                    head: ["Field", "Required", "What it does"],
                    mono: [0],
                    rows: [
                        [
                            "name",
                            "Yes",
                            "Lowercase and hyphens. Cannot contain a colon, which is reserved for plugin namespacing",
                        ],
                        [
                            "description",
                            "Yes",
                            "When Claude should delegate to it. This is what triggers selection",
                        ],
                        ["tools", "No", "Allowlist. Inherits all available tools if omitted"],
                        [
                            "disallowedTools",
                            "No",
                            "Denylist, subtracted from the inherited or allowlisted set",
                        ],
                        ["model", "No", "sonnet, opus, haiku, fable, a full model ID, or inherit"],
                        ["permissionMode", "No", "How much it may do without asking"],
                        ["maxTurns", "No", "Hard cap on agentic turns. A useful safety rail"],
                        ["effort", "No", "How hard it thinks, from low to max"],
                        ["skills", "No", "Preload specific skills at startup"],
                        [
                            "memory",
                            "No",
                            "Persistent memory scope (user, project, or local) for cross-session learning",
                        ],
                        [
                            "isolation",
                            "No",
                            "worktree runs it in a temporary git worktree, useful for risky edits",
                        ],
                        ["background", "No", "true always runs it in the background"],
                        ["color", "No", "Cosmetic; helps you tell agents apart in output"],
                    ],
                },
                {
                    t: "p",
                    x: "Everything after the frontmatter is the agent's [[system prompt]].",
                },
                {
                    t: "p",
                    x: "Beyond the file format, a definition is only good if it answers five questions:",
                },
                {
                    t: "vocab",
                    items: [
                        [
                            "What is this agent's single job?",
                            "Agents with two jobs do both badly. If you cannot say the job in one sentence, it is two agents.",
                        ],
                        [
                            "What may it touch, and what is off-limits?",
                            "Encode this in the tools and disallowedTools lists, not just in prose. A read-only reviewer that is only asked nicely not to edit will eventually edit.",
                        ],
                        [
                            "What does it return to the caller?",
                            "Be specific: a ranked list of findings, a table with these four columns. A vague return wastes the whole round trip.",
                        ],
                        [
                            "When should it stop or escalate?",
                            "Give it an explicit rule: if X, stop and report. Without one it will keep going and produce its best guess.",
                        ],
                        [
                            "What must it never do?",
                            "Destructive operations, force-pushes, credential access. Name them.",
                        ],
                    ],
                },
                {
                    t: "file",
                    name: "route-reviewer",
                    path: ".claude/agents/route-reviewer.md",
                    kind: "agent definition",
                    def: "An agent definition file. The frontmatter declares what it is called, when to delegate to it, and what it may touch; everything below is its system prompt.",
                    note: "Project scope, because it encodes this repo's route conventions. The same file at ~/.claude/agents/ would apply everywhere instead.",
                    code: `---
name: route-reviewer
description: Reviews Express route handlers for missing error handling,
  unvalidated input, and routes that are missing auth. Use before any
  PR that adds or changes a route.
tools: Read, Grep, Glob
model: sonnet
---

You review Express routes for safety only. You do not write or fix them.

For each route handler:
1. Flag any async handler with no try/catch and no error middleware.
2. Flag any handler that reads req.body or req.params without validating it.
3. Flag any non-public route with no auth check.

Return a table: file | route | risk (high/med/low) | required change.
If a route touches user data and has no auth check, mark it high risk
and stop.`,
                    why: "One job, read-only tools so it cannot edit anything, a fixed output shape, and an explicit stop condition. All four of those are structural rather than polite requests.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "subagents",
            num: "06",
            title: "Sub-agents",
            heading: "When is delegation worth the cost?",
            blocks: [
                {
                    t: "thesis",
                    x: "A sub-agent is a specialist the main agent hands a self-contained job to. It works in its own fresh context window and returns only a summary, which is the whole point and also the whole cost.",
                },
                {
                    t: "p",
                    x: "A [[sub-agent]] is an agent invoked by another agent rather than by you. In Claude Code it is a Markdown file in `.claude/agents/` for a project, or `~/.claude/agents/` for a personal one: the same file format as section 5. The difference is not the file, it is the relationship.",
                },
                {
                    t: "table",
                    head: ["", "Agent (main session)", "Sub-agent"],
                    rows: [
                        ["Who invokes it", "You", "The main agent, or you, by name"],
                        [
                            "[[context window|Context window]]",
                            "Your full conversation",
                            "Fresh and isolated: no conversation history, no files already read, no previously loaded skills",
                        ],
                        [
                            "What it starts with",
                            "Everything so far",
                            "Its own system prompt, the task message, your CLAUDE.md, and a git status snapshot",
                        ],
                        [
                            "What comes back",
                            "The work itself",
                            "A summary. The intermediate reasoning stays in its context, not yours",
                        ],
                        [
                            "Good for",
                            "Iterative work you steer",
                            "Self-contained work with verbose intermediate output",
                        ],
                    ],
                },
                { t: "sub", x: "When delegation is worth it" },
                {
                    t: "table",
                    head: ["Stay in the main conversation when", "Delegate to a sub-agent when"],
                    rows: [
                        [
                            "You need frequent back-and-forth",
                            "The work produces verbose output you do not need to read",
                        ],
                        [
                            "Phases share significant context",
                            "You want to enforce tool or permission restrictions",
                        ],
                        [
                            "It is a quick, targeted change",
                            "The task is self-contained and returns a summary",
                        ],
                        [
                            "Latency matters",
                            "((inference, not documented guidance|The first three rows are verbatim documented guidance. This one is an inference from how isolated contexts behave, and it is flagged in the appendix.)): you want several independent investigations running in parallel",
                        ],
                    ],
                },
                {
                    t: "note",
                    lab: "The mental model",
                    x: "Delegate when the ratio of noise to signal is high. A sub-agent that reads forty files and returns five findings is a great trade. A sub-agent that needs three clarifying rounds with you is a bad one: it cannot ask you anything mid-task, and each result it returns still costs context in your main conversation.",
                },
                {
                    t: "note",
                    kind: "warn",
                    lab: "The cost that surprises juniors",
                    x: "The sub-agent's fresh context is empty. It has not seen the file you were just discussing. If you do not put the relevant facts in the delegation message, it will go and find them again, or guess.",
                },
                { t: "sub", x: "What to include when defining one" },
                {
                    t: "table",
                    head: ["Include", "Why it matters more than for a top-level agent"],
                    rows: [
                        [
                            "A [[description]] that says when to delegate",
                            "This is what the main agent matches against to decide",
                        ],
                        [
                            "The complete task context in the delegation",
                            "It starts blank; nothing is inherited from your conversation",
                        ],
                        ["A tool allowlist", "The main reason to delegate is often containment"],
                        [
                            "An explicit return contract",
                            "Return a table with these four columns. Vague returns waste the round trip",
                        ],
                        ["A turn cap for open-ended work", "maxTurns stops a research agent from spiralling"],
                        ["Whether parallelism is safe", "Two sub-agents editing the same file will conflict"],
                    ],
                },
                {
                    t: "note",
                    kind: "warn",
                    lab: "Documented limits, all version-gated",
                    x: "Sub-agents can nest about three layers deep by default, up to roughly twenty can run concurrently, and background sub-agents get a reduced built-in tool set. These numbers are version-gated in the Claude Code docs. Check your version rather than treating them as fixed.",
                },
                {
                    t: "file",
                    name: "dep-auditor",
                    path: ".claude/agents/dep-auditor.md",
                    kind: "sub-agent definition",
                    def: "A sub-agent that reads your package-lock.json and the web, and returns at most ten rows. The archetype of a good delegation: high noise, low signal, no back-and-forth needed.",
                    note: "Phase 3 installs a version of this one. Note the maxTurns cap and the instruction to say unverified rather than guess.",
                    code: `---
name: dep-auditor
description: Audits package-lock.json for known-vulnerable or
  unmaintained dependencies. Use proactively before a release.
tools: Read, Grep, Glob, WebSearch
model: haiku
maxTurns: 15
---

Audit the package-lock.json you are given. You may read files and
search the web.
You may not edit anything.

Return ONLY this table, max 10 rows, highest severity first:
package | installed | issue | recommended action

If you cannot confirm a vulnerability from an official advisory, say
"unverified" in the issue column rather than guessing.`,
                    why: "It reads a lot, searches a lot, and returns ten rows. That ratio is the whole argument for delegating it.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "skills",
            num: "07",
            title: "Skills",
            heading: "When does packaged knowledge beat a prompt?",
            blocks: [
                {
                    t: "thesis",
                    x: "A skill is a folder of instructions Claude loads only when your request matches its description. It is how you stop re-explaining the same procedure in every conversation.",
                },
                {
                    t: "p",
                    x: "Officially: Agent Skills are modular capabilities that extend Claude's functionality. Each skill packages instructions, metadata, and optional resources that Claude uses automatically when relevant.",
                },
                { t: "sub", x: "Why they are cheap: progressive disclosure" },
                {
                    t: "table",
                    head: ["Level", "When loaded", "Cost", "Content"],
                    rows: [
                        ["1. Metadata", "Always, at startup", "About 100 tokens per skill", "name and description only"],
                        [
                            "2. Instructions",
                            "When the skill is triggered",
                            "Under about 5k tokens",
                            "The body of SKILL.md",
                        ],
                        [
                            "3. Resources",
                            "Only when accessed",
                            "Nothing until read",
                            "Bundled files. Scripts run via bash and only their output enters context",
                        ],
                    ],
                },
                {
                    t: "p",
                    x: "That is why you can install many skills without a context penalty. Until one is triggered, it costs you a name and a sentence.",
                },
                {
                    t: "table",
                    head: ["Write a skill when", "A prompt is fine when"],
                    rows: [
                        ["You have explained the same procedure three times", "You will do it once"],
                        ["The procedure has steps that must happen in order", "It is a single ask"],
                        [
                            "It needs reference material: schemas, templates, API docs",
                            "Everything fits in one message",
                        ],
                        ["Other people on your team need it too", "It is personal and ad hoc"],
                        [
                            "Correctness matters more than flexibility",
                            "Exploration matters more than consistency",
                        ],
                    ],
                },
                { t: "sub", x: "Against the sibling concepts" },
                {
                    t: "table",
                    head: ["", "CLAUDE.md", "Skill", "Sub-agent"],
                    rows: [
                        ["Loaded", "Every session, always", "Only when triggered", "Only when delegated to"],
                        ["Runs in", "Your context", "Your context", "Its own fresh context"],
                        [
                            "Best for",
                            "Standing facts about the repo",
                            "A procedure you invoke",
                            "Self-contained noisy work",
                        ],
                        ["Cost when unused", "Full token cost, every time", "About 100 tokens", "Zero"],
                    ],
                },
                {
                    t: "note",
                    lab: "Rule of thumb",
                    x: "If it is a fact about this project, it belongs in [[CLAUDE.md]]. If it is a procedure, it belongs in a skill.",
                },
                { t: "sub", x: "Anatomy of a skill" },
                { t: "tree", tree: skillAnatomy },
                {
                    t: "table",
                    head: ["Scope", "Path"],
                    mono: [1],
                    rows: [
                        ["Personal (Claude Code)", "~/.claude/skills/<name>/SKILL.md"],
                        ["Project (Claude Code)", ".claude/skills/<name>/SKILL.md"],
                        ["Plugin", "<plugin>/skills/<name>/SKILL.md"],
                        [
                            "claude.ai and Cowork",
                            "Uploaded as a ZIP via Customize, Skills, or installed from the skills directory",
                        ],
                    ],
                },
                { t: "sub", x: "What to include when authoring one" },
                {
                    t: "table",
                    head: ["Element", "Requirement", "Notes"],
                    mono: [0],
                    rows: [
                        [
                            "name",
                            "Required in the portable format",
                            "Max 64 chars, lowercase, numbers and hyphens. No claude or anthropic",
                        ],
                        [
                            "description",
                            "Required",
                            "Max 1024 chars. Must say what it does AND when to use it",
                        ],
                        [
                            "instructions body",
                            "The substance",
                            "Keep SKILL.md under 500 lines; split when it grows",
                        ],
                        [
                            "reference files",
                            "Optional",
                            "Keep references one level deep; add a table of contents to any file over 100 lines",
                        ],
                        ["scripts", "Optional", "Use for fragile, deterministic steps; list required packages"],
                        [
                            "terminology",
                            "Strongly recommended",
                            "Pick one term per concept and use it throughout",
                        ],
                        [
                            "a checklist",
                            "Recommended for complex tasks",
                            "Copyable checklists outperform prose for multi-step work",
                        ],
                    ],
                },
                {
                    t: "note",
                    kind: "warn",
                    lab: "Portability trap",
                    x: "Claude Code supports many extra frontmatter fields: allowed-tools, model, argument-hint, and more. Outside Claude Code, on claude.ai uploads and the Skills API, only name, description, license, compatibility, metadata, and allowed-tools are legal, and anything else is a hard error. Write portable skills unless you know they are Claude Code only.",
                },
                { t: "sub", x: "What makes a description trigger reliably" },
                {
                    t: "p",
                    x: "This is the single highest-leverage thing in the whole file, because it is what Claude matches your request against.",
                },
                {
                    t: "table",
                    head: ["Rule", "Do", "Do not"],
                    rows: [
                        [
                            "Third person, always",
                            "Processes Excel files and generates reports.",
                            "I can help you with spreadsheets.",
                        ],
                        [
                            "Say what AND when",
                            "...Use when the user mentions PDFs, forms, or extraction.",
                            "Handles PDFs.",
                        ],
                        [
                            "Include concrete triggers",
                            "File extensions, tool names, the phrases users actually type",
                            "Abstract category words",
                        ],
                        ["Be specific", "Claude may be choosing among 100+ skills", "Helps with documents"],
                        ["Avoid filler names", "processing-pdfs", "helper, utils, tools"],
                    ],
                },
                {
                    t: "file",
                    name: "adding-routes",
                    path: "~/.claude/skills/adding-routes/SKILL.md",
                    kind: "skill",
                    def: "A personal skill. The frontmatter is what Claude sees at startup; the body only loads once the description has matched something you asked for.",
                    note: "Personal scope, so it applies in every repo. Move it to .claude/skills/ inside a project if the rules only hold there.",
                    code: `---
name: adding-routes
description: Adds and reviews Express routes in this repo, including
  validation, error handling and tests. Use when the user mentions a
  route, an endpoint, req.body, or adding something to the API.
---

# Adding a route

## Rules
1. Every async handler has a try/catch. No exceptions.
2. Anything read off req.body or req.params is validated before it is used.
3. A handler returns one status code per outcome: 200, 400, 401, 500.

## Steps
1. Read reference/routes.md for the routes that already exist.
2. Write the route, then the test that proves its 400 path.
3. Run scripts/check-routes.mjs <file> and fix anything it reports.`,
                    why: "The description names the words you would actually type (route, endpoint, req.body), the rules are standing instructions rather than one-time ones, and the fragile check is a script rather than a paragraph of prose.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "scripts",
            num: "08",
            title: "Scripts",
            heading: "When do I want code instead of instructions?",
            blocks: [
                {
                    t: "thesis",
                    x: "A script is the part of a skill you do not want the model improvising: deterministic code that runs the same way every time and costs you only its output, not its source.",
                },
                {
                    t: "p",
                    x: "A [[script]] is executable code bundled with a skill, conventionally in `scripts/`, that Claude runs via bash rather than reading into context. Anthropic's framing: executable scripts that Claude runs using bash, providing deterministic operations without loading their code into context.",
                },
                {
                    t: "note",
                    kind: "warn",
                    lab: "Naming note",
                    x: "Script is not a separate top-level Anthropic primitive with its own file format the way skills and sub-agents are. It is the code-bundling capability inside a skill, or a plugin's bin/ directory. Treat it as a pattern, not a product feature.",
                },
                {
                    t: "table",
                    head: ["", "One-off prompt", "Reusable script"],
                    rows: [
                        ["Determinism", "Varies run to run", "Identical every time"],
                        ["Context cost", "The whole thing, every time", "Only its output"],
                        ["Verifiable", "By reading the answer", "By reading its exit code and tests"],
                        ["Good for", "Judgment, synthesis, ambiguity", "Validation, parsing, formatting, math"],
                        ["Fails by", "Being subtly wrong", "Being loudly wrong"],
                    ],
                },
                {
                    t: "note",
                    lab: "The rule",
                    x: "Write a script when being wrong is worse than being slow. Anything with a right answer, checksum validation, schema checks, date math, file renaming by pattern, is script territory. Anything requiring taste stays in instructions.",
                },
                { t: "sub", x: "What to include when writing one" },
                {
                    t: "table",
                    head: ["Include", "Why"],
                    rows: [
                        [
                            "A comment at the top saying what it does and what it returns",
                            "Claude decides whether to run it based on this",
                        ],
                        [
                            "Explicit, non-zero exit codes on failure",
                            "Silent failure is the worst outcome in an agent loop",
                        ],
                        [
                            "Real error handling: solve, do not defer",
                            "Documented guidance is to handle errors explicitly rather than swallowing them",
                        ],
                        [
                            "No unexplained constants",
                            "Every magic number needs a comment saying where it came from",
                        ],
                        ["Required packages, listed", "The runtime may not have what you assume"],
                        ["Forward-slash paths only", "Windows-style paths are explicitly discouraged"],
                        ["Deterministic output format", "Claude parses this; keep it stable"],
                        ["A statement in SKILL.md of when to run it", "Otherwise it sits unused"],
                    ],
                },
                {
                    t: "note",
                    kind: "warn",
                    lab: "Runtime differences matter",
                    x: "Skills in Claude Code have full network access. Skills on the Claude API have no network access and no runtime package installation. On claude.ai, network access varies by user and admin settings. Write scripts that work in the environment you are actually targeting.",
                },
                {
                    t: "file",
                    name: "check-routes.mjs",
                    path: "~/.claude/skills/adding-routes/scripts/check-routes.mjs",
                    kind: "script",
                    def: "The deterministic half of the adding-routes skill. Claude never reads these regexes; it reads the line the script prints and acts on it.",
                    note: "Plain Node, no dependencies, because the project already runs Node and a second language is a second thing to install and keep working. The comment at the top is not decoration: it is what Claude reads to decide whether running this is the right move at all.",
                    code: `#!/usr/bin/env node
// Check one Express route file for the three mistakes we keep making.
// Prints one finding per line; exits 1 if any HIGH finding is present.
// Requires: node 18+, no dependencies.
import { readFileSync } from "node:fs";

const src = readFileSync(process.argv[2], "utf8");

const CHECKS = [
  ["HIGH", /async\\s*\\([^)]*\\)\\s*=>/.test(src) && !/try\\s*{/.test(src),
    "async handler with no try/catch"],
  ["HIGH", /req\\.(body|params|query)/.test(src) && !/validate|zod|schema/i.test(src),
    "reads req input without validating it"],
  ["MED",  !/res\\.status\\(4\\d\\d\\)/.test(src),
    "no 4xx path: every handler needs one"],
];

const found = CHECKS.filter(([, hit]) => hit).map(([lvl, , msg]) => \`\${lvl}: \${msg}\`);
console.log(found.join("\\n") || "OK");
process.exit(found.some((f) => f.startsWith("HIGH")) ? 1 : 0);`,
                    why: "The skill then says: run scripts/check-routes.mjs <file> and fix anything it reports. Claude reads HIGH: async handler with no try/catch and acts on it. The regexes cost it nothing, because it never reads them.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "workflows",
            num: "09",
            title: "Workflows",
            heading: "How do I orchestrate work at scale, and schedule it?",
            blocks: [
                {
                    t: "thesis",
                    x: "In Claude Code, a dynamic workflow is a JavaScript script, written by Claude rather than by you, that orchestrates dozens or hundreds of sub-agents in the background while your session stays responsive.",
                },
                {
                    t: "note",
                    kind: "warn",
                    lab: "Workflow is an overloaded word",
                    x: "In Claude Code it means one specific feature. In LangGraph it means predetermined code paths, as opposed to an agent. In GitHub it means a CI job. In casual speech it means the way I do a thing. Say [[dynamic workflow]] on first use when you mean Claude Code's feature.",
                },
                {
                    t: "p",
                    x: "Officially: a dynamic workflow is a JavaScript script that orchestrates subagents at scale. Claude writes the script for the task you describe, and a runtime executes it in the background while your session stays responsive.",
                },
                {
                    t: "note",
                    lab: "The key inversion",
                    x: "With skills and sub-agents, Claude holds the plan and decides step by step. With a workflow, the script holds the plan, which is what lets it coordinate far more agents than one conversation can track.",
                },
                {
                    t: "table",
                    head: ["", "Skill or sub-agent", "Dynamic workflow"],
                    rows: [
                        ["Who holds the plan", "Claude, turn by turn", "The script"],
                        ["Scale", "A few delegated tasks per turn", "Dozens to hundreds of agents per run"],
                        ["Authored by", "You, in Markdown", "Claude, in JavaScript, from your description"],
                        ["Runs", "In your turn", "In the background"],
                    ],
                },
                {
                    t: "p",
                    x: "You do not hand-write the script. You describe the task and ask for a workflow, or use the `ultracode` keyword, Claude writes it, and you can then save that run for reuse. After that it is just a slash command.",
                },
                {
                    t: "table",
                    head: ["Reach for a workflow when", "Something simpler is better when"],
                    rows: [
                        [
                            "The task needs more agents than one conversation can coordinate",
                            "A few delegations will do. Use sub-agents",
                        ],
                        [
                            "You want the orchestration codified as a script you can read and re-run",
                            "The steps are judgment calls, not fan-out. Use a skill",
                        ],
                        [
                            "The same fan-out happens repeatedly: audit every file, triage every issue",
                            "It is a one-off",
                        ],
                        [
                            "You want it running in the background while you keep working",
                            "You need to intervene mid-run. Workflows take no user input once started",
                        ],
                    ],
                },
                {
                    t: "note",
                    lab: "The cost",
                    x: "A saved workflow is code you now maintain, and formalising too early locks in a process you have not finished learning. Three repetitions is a reasonable trigger.",
                },
                {
                    t: "table",
                    head: ["Scope", "Path"],
                    mono: [1],
                    rows: [
                        ["Project, shared via repo", ".claude/workflows/"],
                        ["Personal", "~/.claude/workflows/"],
                        ["Plugin", "workflows/ at the plugin root, invoked namespaced"],
                    ],
                },
                {
                    t: "p",
                    x: "The runtime gives the script three globals: `agent(prompt, opts)` spawns one sub-agent, `pipeline(list, fn)` runs one per item, and `args` carries whatever you passed in.",
                },
                { t: "sub", x: "What to include when building one" },
                {
                    t: "table",
                    head: ["Element", "Notes"],
                    rows: [
                        ["Trigger", "The saved name it runs as, plus what args it accepts"],
                        ["Inputs", "What must exist before it starts. Fail loudly if it does not"],
                        ["Fan-out unit", "What one agent handles: one file, one issue, one package"],
                        [
                            "Per-agent return contract",
                            "Use the schema option so results are structured, not prose",
                        ],
                        ["A reduce step", "What turns N agent results into one deliverable"],
                        [
                            "Failure behaviour",
                            "agent() returns null on stop or unrecoverable error. Filter for it",
                        ],
                        ["Scale sanity", "Caps are 16 concurrent agents and 1,000 agents per run"],
                        ["The deliverable", "Exactly what the script returns"],
                    ],
                },
                {
                    t: "note",
                    kind: "warn",
                    lab: "Permission gotcha worth memorising",
                    x: "Sub-agents spawned by a workflow always run in acceptEdits mode regardless of your session's permission mode. File edits are auto-approved. Do not point a workflow at code you are not prepared to have modified.",
                },
                {
                    t: "file",
                    name: "audit-routes",
                    path: "~/.claude/workflows/audit-routes.js",
                    kind: "dynamic workflow",
                    def: "A saved workflow. One agent collects the work list, one agent per file does the audit in parallel, and the results come back structured rather than as prose.",
                    note: "Written by Claude from a description, then saved. After saving it runs as /audit-routes.",
                    code: `export const meta = {
  name: "audit-routes",
  description: "Audits every Express route for missing error handling."
};

const files = await agent(
  "List every file under src/routes/ changed on this branch.",
  { schema: { files: ["string"] }, label: "collect" }
);

const findings = await pipeline(files.files, (f) =>
  agent(\`Audit \${f} for missing try/catch, unvalidated req.body, or a
         missing auth check.\`,
        { schema: { file: "string", risk: "string", reason: "string" } })
);

return findings.filter(Boolean).filter((r) => r.risk !== "low");`,
                    why: "The schema option is what makes the results usable: without it every agent returns a paragraph and the reduce step becomes guesswork. filter(Boolean) drops any agent that failed.",
                },
                { t: "sub", x: "The neighbours: hooks, routines, and scheduled tasks" },
                {
                    t: "p",
                    x: "Workflows handle fan-out. Three other mechanisms handle when things run, and juniors routinely confuse them.",
                },
                {
                    t: "table",
                    head: ["Mechanism", "What it does", "Where"],
                    rows: [
                        [
                            "[[hook|Hooks]]",
                            "Fire a command automatically at a lifecycle event. Deterministic enforcement, not instruction-following",
                            "Claude Code",
                        ],
                        [
                            "[[scheduled task|Scheduled tasks]]",
                            "Re-run a whole task on a cadence: hourly, daily, weekly, weekdays, or manually",
                            "Cowork; also Claude Code Desktop",
                        ],
                        [
                            "[[routine|Routines]]",
                            "A saved prompt, repos and connectors, run on Anthropic's cloud with your laptop closed; triggered by schedule, API call, or GitHub event (research preview)",
                            "Claude Code",
                        ],
                        ["[[/loop]]", "Re-run a prompt on an interval within the current session", "Claude Code"],
                    ],
                },
                {
                    t: "note",
                    lab: "The distinction that matters",
                    x: "Cowork scheduled tasks and Claude Code routines run in the cloud without your machine. Desktop scheduled tasks run locally so they can touch local files. /loop only lives as long as your session does.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "decision",
            num: "10",
            title: "Decision guide",
            heading: "Which one should I reach for?",
            blocks: [
                {
                    t: "thesis",
                    x: "Most beginner pain comes from picking the wrong container for the work. This table is the shortcut.",
                },
                {
                    t: "table",
                    head: ["Situation", "Reach for", "Why"],
                    rows: [
                        ["Explain this error to me", "Chat", "You want understanding, not artifacts"],
                        ["Compare three approaches", "Chat", "Judgment task with a short loop"],
                        [
                            "Reorganise these 200 files and produce a summary doc",
                            "Cowork",
                            "Multi-step, produces artifacts, worth walking away from",
                        ],
                        [
                            "Research this and give me a written report",
                            "Cowork",
                            "Long-running; plan and execute is the point",
                        ],
                        [
                            "Fix this bug in my repo",
                            "Claude Code",
                            "Needs your real file system and dev tools",
                        ],
                        [
                            "Every session should know our build commands",
                            "CLAUDE.md",
                            "A standing fact, not a procedure",
                        ],
                        [
                            "I have explained this procedure three times",
                            "Skill",
                            "Package it once, trigger it by description",
                        ],
                        [
                            "This step must be exactly right every time",
                            "Script, inside a skill",
                            "Determinism beats instructions",
                        ],
                        [
                            "This produces 40 files of output and I need 5 findings",
                            "Sub-agent",
                            "High noise-to-signal. Contain it",
                        ],
                        [
                            "I want three independent investigations at once",
                            "Sub-agents in parallel",
                            "Isolated contexts, no interference",
                        ],
                        [
                            "Audit all 300 files in this repo",
                            "Dynamic workflow",
                            "More agents than one conversation can coordinate",
                        ],
                        [
                            "This must run every Monday at 9am",
                            "Scheduled task, or a routine",
                            "Runs in the cloud, device-independent",
                        ],
                        [
                            "This must happen automatically before every [[commit]]",
                            "Hook",
                            "Deterministic enforcement, not instruction-following",
                        ],
                        ["My whole team needs this setup", "Plugin", "Versioned, installable, namespaced"],
                    ],
                },
                { t: "sub", x: "The six common mistakes" },
                {
                    t: "p",
                    x: "Each one below opens to why it hurts and what to do instead.",
                },
                {
                    t: "vocab",
                    items: [
                        [
                            "Writing a Cowork prompt like a Chat message",
                            "The agent plans and commits before you see anything, so a vague brief buys a confidently wrong deliverable. Fix: add done-when criteria, a not-doing list, and the exact deliverable. Write a ticket, not a question.",
                        ],
                        [
                            "Putting everything in CLAUDE.md",
                            "It loads in every session, so bloat there is a tax on all your work, and long files get ignored. Fix: keep it under about 200 lines of standing facts and move procedures into skills.",
                        ],
                        [
                            "Vague skill descriptions",
                            "The description is the only thing Claude matches against. Helps with data never triggers. Fix: third person, say what AND when, and include the literal phrases and file types users mention.",
                        ],
                        [
                            "Delegating chatty work to a sub-agent",
                            "It starts with an empty context, cannot ask you anything, and its result still costs your context. Fix: delegate only self-contained, noisy work that returns a summary.",
                        ],
                        [
                            "Formalising a workflow you have run once",
                            "You lock in a process you have not finished learning, then maintain it forever. Fix: wait for the third repetition, then write it down.",
                        ],
                        [
                            "Asking prose to do a script's job",
                            "Check the input is valid varies run to run; a six-line Node script does not. Fix: if there is a right answer, write the code and let Claude read its output.",
                        ],
                    ],
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "cross-platform",
            num: "11",
            title: "Cross-platform notes",
            heading: "What are these called elsewhere?",
            blocks: [
                {
                    t: "thesis",
                    x: "Most of these concepts now have cross-vendor standards rather than vendor synonyms. SKILL.md, AGENTS.md, and MCP are the three that travel.",
                },
                {
                    t: "p",
                    x: "The single most useful thing to know: three of these are cross-vendor standards, not one company's features.",
                },
                {
                    t: "table",
                    head: ["Standard", "What it covers", "Governance"],
                    rows: [
                        [
                            "[[MCP]]",
                            "How agents connect to tools and data",
                            "Created by Anthropic; donated to the Agentic AI Foundation (Linux Foundation) in December 2025",
                        ],
                        [
                            "[[AGENTS.md]]",
                            "Project-level instructions for coding agents",
                            "Agentic AI Foundation (Linux Foundation)",
                        ],
                        [
                            "[[Agent Skills]]",
                            "Packaged reusable instructions",
                            "Anthropic-originated spec released as an open standard at agentskills.io. No independent steward, but adopted by OpenAI, Google, GitHub, Cursor, and LangChain",
                        ],
                    ],
                },
                { t: "sub", x: "Vocabulary map" },
                {
                    // Seven columns will not sit on the reading measure, and
                    // scrolling it sideways is worse than using the margin the
                    // page has spare. This is the one table on the site that
                    // takes the width exception.
                    t: "table",
                    wide: true,
                    head: ["Concept", "Anthropic", "OpenAI", "Google", "GitHub Copilot", "Cursor", "LangChain"],
                    rows: [
                        [
                            "Agent",
                            "Claude Code, Cowork; .claude/agents/",
                            "Agent (Agents SDK); Codex",
                            "Agent (Gemini CLI); ADK Agent",
                            "Agent role; cloud agent",
                            "Agent; Cloud Agents",
                            "create_agent",
                        ],
                        [
                            "Sub-agent",
                            "Sub-agent (.claude/agents/)",
                            "Handoff, agents-as-tools; Codex subagents",
                            "Subagents (.gemini/agents/)",
                            "Subagents",
                            "Subagents (.cursor/agents/)",
                            "Subagents, handoffs; subgraphs",
                        ],
                        [
                            "Skill",
                            "Skill (SKILL.md)",
                            "Skill (.agents/skills/)",
                            "Agent Skills (.gemini/skills/)",
                            "Agent Skills (.github/skills/)",
                            "Skills (.cursor/skills/)",
                            "Skills (deepagents)",
                        ],
                        [
                            "Reusable prompt",
                            "Skill; commands are legacy",
                            "Custom prompts, deprecated in favour of skills",
                            "Custom commands (.gemini/commands/*.toml)",
                            "Prompt files (*.prompt.md)",
                            "Commands (.cursor/commands/)",
                            "PromptTemplate",
                        ],
                        [
                            "Workflow",
                            "Dynamic workflows; plus hooks, routines, scheduled tasks",
                            "Agents SDK orchestration; scheduled tasks",
                            "ADK workflow agents",
                            "GitHub Actions; Agentic Workflows",
                            "Hooks, Automations",
                            "Workflow against Agent is the core documented distinction",
                        ],
                        [
                            "Project context file",
                            "CLAUDE.md",
                            "AGENTS.md",
                            "GEMINI.md",
                            ".github/copilot-instructions.md",
                            ".cursor/rules/*.mdc",
                            "None in core",
                        ],
                    ],
                },
                { t: "sub", x: "False friends" },
                {
                    t: "vocab",
                    items: [
                        [
                            "Custom GPTs and Gems are not Skills",
                            "Those are chat-app personas configured in a web UI. No file format, no path, not portable.",
                        ],
                        [
                            "Copilot skillsets are not Agent Skills",
                            "Skillsets belonged to the retired GitHub App-based Copilot Extensions, sunset in November 2025.",
                        ],
                        [
                            "Workflow means four different things",
                            "Claude Code: a JS sub-agent orchestration script. LangGraph: predetermined code paths, as opposed to an agent. GitHub: a CI job. Everyone else: the way I do a thing. Always qualify it.",
                        ],
                        [
                            "Cursor Composer is ambiguous",
                            "Named a UI mode in 2025, then reused for Cursor's own model. Ask which one someone means.",
                        ],
                    ],
                },
                {
                    t: "note",
                    lab: "Direction of travel",
                    x: "Several vendors are consolidating reusable-prompt features into skills. OpenAI has formally deprecated custom prompts in favour of skills; Copilot and Cursor both ship tooling to move existing prompts across, pointing the same way. Learning the SKILL.md format is the highest-transfer investment on this page.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "sources-1",
            num: "12",
            title: "Sources",
            heading: "Where this was checked against",
            blocks: [
                {
                    t: "p",
                    x: "Everything on this page was verified against Anthropic's official documentation in August 2026. The eleven points that could not be fully confirmed are collected in the appendix, along with the glossary and the full file map.",
                },
                {
                    t: "sources",
                    items: [
                        [
                            "Agent Skills overview",
                            "https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview",
                        ],
                        [
                            "Skill authoring best practices",
                            "https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices",
                        ],
                        [
                            "Claude prompting best practices",
                            "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices",
                        ],
                        ["Claude Code: sub-agents", "https://code.claude.com/docs/en/sub-agents"],
                        ["Claude Code: skills", "https://code.claude.com/docs/en/skills"],
                        ["Claude Code: dynamic workflows", "https://code.claude.com/docs/en/workflows"],
                        ["Claude Code: routines", "https://code.claude.com/docs/en/routines"],
                        ["Claude Code: scheduled tasks", "https://code.claude.com/docs/en/scheduled-tasks"],
                        ["Claude Code: memory", "https://code.claude.com/docs/en/memory"],
                        ["Claude Code: hooks", "https://code.claude.com/docs/en/hooks"],
                        ["Claude Code: plugins", "https://code.claude.com/docs/en/plugins"],
                        [
                            "Get started with Claude Cowork",
                            "https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork",
                        ],
                        [
                            "Cowork architecture overview",
                            "https://support.claude.com/en/articles/14479288-claude-cowork-architecture-overview",
                        ],
                        ["What are Skills?", "https://support.claude.com/en/articles/12512176-what-are-skills"],
                        ["agentskills.io", "https://agentskills.io"],
                        ["agents.md", "https://agents.md"],
                        ["modelcontextprotocol.io", "https://modelcontextprotocol.io"],
                    ],
                },
            ],
        },
    ],
};
