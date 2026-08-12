// The glossary.
//
// This file is the site's single definition of every word it uses. Writing
// [[skill]] in any page's text turns that word into something a reader can
// hover for the definition below, and [[SKILL.md|the skill file]] shows the
// second half while looking up the first.
//
// The appendix renders this same object as a list, so a word cannot mean one
// thing in a sentence and something else in the list at the back.
//
// Two fields, and both earn their place. `def` is what the word means on its
// own, in one sentence. `note` is what it means inside this package: which
// phase it turns up in, or the practical consequence a junior developer keeps
// getting caught by. A reader meeting the word cold and a reader checking it
// mid-task want different answers, and the popover has room for both.
//
// `term` is only set where the display form differs from the lookup key, which
// is the lowercase one.

export const TERMS = {
    // ---------- the surfaces ----------
    "claude chat": {
        term: "Claude Chat",
        def: "The conversational surface, steered turn by turn.",
        note: "Nothing touches your files unless you use a tool or connector. Phase 1 section 3 is how to prompt it.",
        auto: true,
    },
    "claude code": {
        term: "Claude Code",
        def: "Anthropic's agentic coding tool, running in your terminal or IDE with access to your file system.",
        note: "Everything the four phases install lives on the machine Claude Code runs on. It is the surface this package is anchored to.",
        auto: true,
    },
    "claude cowork": {
        term: "Claude Cowork",
        def: "Anthropic's agentic surface for multi-step knowledge work. It plans, executes, and runs in a cloud sandbox.",
        note: "Cowork and Claude Code run on the same engine. The difference is scope: Cowork sees folders you share, Claude Code sees your project.",
        auto: true,
    },
    surface: {
        def: "One of the products Claude is used through, as opposed to one of the models behind it.",
        note: "Chat, Cowork and Claude Code are three surfaces. A skill written for one does not automatically appear on the others.",
    },

    // ---------- the building blocks ----------
    prompt: {
        def: "An instruction given to a model.",
        note: "The shortest-lived building block: one turn. Phase 1 section 2 is what a good one contains.",
        auto: true,
    },
    agent: {
        def: "A model running in a loop with tools and a goal, choosing its own next action until it is done.",
        note: "Not a special model. A goal, plus tools, plus a loop. It trades predictability for reach, and constraints are how you buy the predictability back.",
        auto: true,
    },
    "sub-agent": {
        term: "Sub-agent",
        def: "An agent invoked by another agent, running in a fresh isolated context and returning a summary.",
        note: "Its context starts empty. It has not seen the file you were just discussing, so anything it needs has to be in the delegation message.",
        auto: true,
    },
    subagent: {
        term: "Subagent",
        def: "An agent invoked by another agent, running in a fresh isolated context and returning a summary.",
        note: "Same thing as a sub-agent; the docs spell it both ways. Phase 3 installs five of them.",
        auto: true,
    },
    skill: {
        def: "A folder of instructions and resources Claude loads when your request matches its description.",
        note: "The answer to having explained the same procedure three times. Until it is triggered it costs you about 100 tokens.",
        auto: true,
    },
    "skill.md": {
        term: "SKILL.md",
        def: "The required file in a skill directory: YAML frontmatter plus instructions.",
        note: "Keep it under 500 lines. The frontmatter needs a name and a description; the description is what decides whether the skill ever fires.",
        auto: true,
    },
    script: {
        def: "Deterministic code bundled with a skill. It runs via bash, and only its output enters context.",
        note: "Not an independent Anthropic primitive. It is the code-bundling pattern inside a skill, so treat it as a pattern rather than a product feature.",
        auto: true,
    },
    workflow: {
        def: "In Claude Code: a JavaScript script, written by Claude, that orchestrates sub-agents at scale in the background.",
        note: "An overloaded word. LangGraph means predetermined code paths, GitHub means a CI job. Say dynamic workflow on first use.",
        auto: true,
    },
    "dynamic workflow": {
        def: "The Claude Code feature: a script that holds the plan and fans work out across dozens of sub-agents.",
        note: "The inversion that matters is who holds the plan. With skills and sub-agents Claude does, turn by turn. With a workflow the script does.",
        auto: true,
    },
    hook: {
        def: "A command that fires automatically at a lifecycle event, giving deterministic enforcement.",
        note: "Not instruction. A hook cannot be talked out of firing, which is why absolutes belong in one and not in a rules file.",
        auto: true,
    },
    plugin: {
        def: "A shareable, versioned bundle of skills, sub-agents, connectors and hooks.",
        note: "What you reach for when a whole team needs the same setup rather than one person.",
        auto: true,
    },
    "claude.md": {
        term: "CLAUDE.md",
        def: "Claude Code's context file: standing facts loaded at the start of every session.",
        note: "It exists at two scopes. A project one loads inside that repo; ~/.claude/CLAUDE.md loads in every session in every directory.",
        auto: true,
    },
    "agents.md": {
        term: "AGENTS.md",
        def: "A cross-vendor standard file holding project-level instructions for coding agents.",
        note: "Governed by the Agentic AI Foundation. It is what CLAUDE.md is called nearly everywhere else.",
        auto: true,
    },
    "agent skills": {
        term: "Agent Skills",
        def: "The open standard at agentskills.io defining the SKILL.md packaged-instructions format.",
        note: "Anthropic-originated, released as an open standard, and adopted by OpenAI, Google, GitHub, Cursor and LangChain. The highest-transfer thing on the page to learn.",
        auto: true,
    },

    // ---------- mechanics ----------
    "progressive disclosure": {
        def: "Loading skill content in stages: metadata always, instructions on trigger, resources on demand.",
        note: "It is why you can install many skills without a context penalty. Until one fires it costs a name and a sentence.",
        auto: true,
    },
    "context window": {
        def: "The total text a model can consider at once. Every loaded file and result competes for it.",
        note: "The reason bloat in CLAUDE.md is a tax on all of your work rather than on one session.",
        auto: true,
    },
    trigger: {
        def: "The description text Claude matches your request against to decide whether to load a skill.",
        note: "The single highest-leverage thing in a skill file. Third person, say what AND when, and name the phrases people actually type.",
    },
    description: {
        def: "The frontmatter field that says what a skill does and when to use it.",
        note: "Max 1024 characters on the platform docs. It is the only thing Claude sees before deciding to load the skill.",
    },
    tool: {
        def: "A capability an agent can invoke: read a file, run bash, search the web, call an API.",
        note: "Restricting the tool list is the cheapest way to make an agent safe. A reviewer given only Read and Grep cannot edit anything.",
    },
    connector: {
        def: "An external service, reached over MCP, that an agent can call. Slack, Drive, a database.",
        note: "",
        auto: true,
    },
    mcp: {
        term: "MCP",
        def: "Model Context Protocol: the open standard for connecting agents to tools and data.",
        note: "Described as a USB-C port for AI applications. Created by Anthropic and donated to the Agentic AI Foundation in December 2025.",
        auto: true,
    },
    "permission mode": {
        def: "How much an agent may do unattended.",
        note: "Cowork offers Manual, Auto and Skip. Worth memorising: sub-agents spawned by a workflow always run in acceptEdits, so their file edits are auto-approved.",
        auto: true,
    },
    artifact: {
        def: "Substantial standalone content Claude produces in its own window: a document, app, diagram or component.",
        note: "",
        auto: true,
    },
    "live artifact": {
        def: "A persistent interactive HTML dashboard in Cowork that refreshes with current connector data.",
        note: "Desktop only.",
        auto: true,
    },
    "system prompt": {
        def: "Standing instructions that frame a model's behaviour for a whole session.",
        note: "Everything after the frontmatter in an agent definition file is that agent's system prompt.",
        auto: true,
    },

    // ---------- prompting ----------
    "done-when criteria": {
        def: "An explicit, checkable definition of task completion.",
        note: "The load-bearing part of any agent prompt. If you do not define done, the agent guesses, and it guesses before you see anything.",
        auto: true,
    },
    "few-shot prompting": {
        def: "Steering output by showing three to five examples rather than describing the format.",
        note: "The single highest-leverage addition when format consistency matters. Make them relevant, diverse and structurally consistent.",
        auto: true,
    },
    "role prompting": {
        def: "Setting a persona in the system prompt to focus behaviour and tone.",
        note: "One sentence measurably changes what you get back.",
        auto: true,
    },
    "chain of thought": {
        def: "Asking a model to reason step by step.",
        note: "Now documented as a fallback for when thinking is off. Current models use adaptive thinking and decide how much to reason on their own.",
        auto: true,
    },
    "adaptive thinking": {
        def: "Current Claude models deciding when and how much to reason internally, rather than you setting a token budget.",
        note: "",
        auto: true,
    },
    "xml tags": {
        term: "XML tags",
        def: "Delimiters like <context> and <instructions> used to keep the parts of a prompt unambiguous.",
        note: "Wrap each content type in its own tag so the model cannot misread where one ends and the next begins.",
        auto: true,
    },
    "not-doing list": {
        def: "The part of a brief that names the obvious wrong turn so the agent does not take it.",
        note: "The cheapest way to prevent a twenty-minute detour. State what to do rather than what not to do wherever you can.",
        auto: true,
    },

    // ---------- scheduling ----------
    "scheduled task": {
        def: "A task that re-runs on a cadence: hourly, daily, weekly, weekdays, or manually.",
        note: "Available in Cowork and in Claude Code Desktop. Cloud schedules run without your laptop; desktop ones can touch local files.",
        auto: true,
    },
    routine: {
        def: "A saved Claude Code prompt, repos and connectors that run on Anthropic's cloud with your machine off.",
        note: "Triggered by schedule, API call or GitHub event. Documented as a research preview, so re-verify before relying on it.",
        auto: true,
    },
    "/loop": {
        def: "Re-runs a prompt on an interval within the current session.",
        note: "It only lives as long as your session does, which is the difference between it and a scheduled task.",
        auto: true,
    },

    // ---------- the machine this package builds ----------
    "context layer": {
        def: "The private half of a personal setup: who you are, what to always remember, your roles and your brand.",
        note: "Phase 2 installs it at ~/claude-context, git-ignored, so it can never end up in a repo you publish.",
        auto: true,
    },
    "procedures layer": {
        def: "The half of a personal setup that holds how you work: skills, subagents, hooks and workflows.",
        note: "Phase 3 installs it into ~/.claude. It reads from the context layer and writes back to it.",
        auto: true,
    },
    "routing table": {
        def: "The table that says which file a new fact, decision or person belongs in.",
        note: "The part of Phase 2 you keep. It is what stops decisions dying in chat history.",
        auto: true,
    },
    "session loop": {
        def: "Open, work, verify, close.",
        note: "The two ends are where most leverage is lost, because they are the easy steps to skip.",
        auto: true,
    },
    "no-clobber": {
        def: "An installer that refuses to overwrite a file that already exists.",
        note: "Why both kits in this package are safe to run twice. They add; they never replace what you have filled in.",
        auto: true,
    },

    // ---------- git and the repo ----------
    worktree: {
        def: "A second working copy of the same repository, checked out to its own folder.",
        note: "An agent given `isolation: worktree` edits that copy instead of yours, so a risky change cannot touch the files you are working in. Delete the folder and the change is gone.",
        auto: true,
    },
    diff: {
        def: "The lines a change added, removed or altered, shown against what was there before.",
        note: "Reading it in full before accepting anything is the single habit Phase 4 asks for most. Not the files you remember touching: all of them.",
        auto: true,
    },
    hunk: {
        def: "One contiguous block of changed lines in a diff, with a few unchanged lines either side for context.",
        note: "The unit to review one at a time. If you cannot say what a hunk is for, that is the one to ask about rather than the file it sits in.",
        auto: true,
    },
    regression: {
        def: "Something that used to work and does not any more.",
        note: "Why edits to existing code deserve a slower read than new code. New code that is wrong usually fails the first time you run it; a changed line in code that already worked can be wrong for weeks.",
        auto: true,
    },
    commit: {
        def: "One saved point in a repository's history, with a message saying what changed and why.",
        note: "The pre-commit-guard hook runs before one is made, which is the last moment a secret can still be stopped.",
        // Manual, because "Cowork commits to a plan" is the verb and has nothing
        // to do with git. The auto pass cannot tell the two apart, so this one
        // is written [[commit]] where the git sense is the one intended.
        auto: false,
    },
    "pull request": {
        def: "A request to merge one branch into another, with somewhere to review the change first.",
        note: "The open-pr skill refuses to make one while the quality gate is red, so a broken branch cannot quietly become someone else's problem.",
        auto: true,
    },
    "force push": {
        def: "Overwriting a branch's history on the remote, discarding whatever was there.",
        note: "One of the operations worth keeping behind a prompt rather than blanket-allowing. It can destroy work that was only ever pushed, never pulled.",
        auto: true,
    },
    gitignore: {
        def: "A list of paths git refuses to track, so they can never be committed by accident.",
        note: "Phase 2 adds the private context folder to your GLOBAL gitignore rather than one repo's, so it is covered in every repo instead of only the ones you remember to configure.",
        auto: true,
    },
    symlink: {
        def: "A file that is really a pointer to another file or folder somewhere else.",
        note: "Worth knowing because of one specific failure: if ~/.claude/agents is a symlink whose target is missing, no custom subagent loads and nothing tells you why.",
        auto: true,
    },
    scaffold: {
        def: "The starting skeleton of a project: the folders, config and empty files, before any feature exists.",
        note: "kickoff-project makes you settle stack and scope BEFORE this, because a scaffold encodes decisions that are annoying to undo later.",
        auto: true,
    },

    // ---------- file formats ----------
    frontmatter: {
        def: "A short block of settings at the very top of a Markdown file, fenced by three dashes.",
        note: "In a skill or an agent it is the part Claude reads first, and in a skill it is the only part loaded until the skill is triggered.",
        auto: true,
    },
    yaml: {
        term: "YAML",
        def: "A plain-text format for settings, written as `key: value` and indented rather than braced.",
        note: "It is what frontmatter is written in. Indentation is significant, so a stray space is a real error rather than a style choice.",
        auto: true,
    },
    manifest: {
        def: "A file that declares what a package contains and how it should be installed.",
        note: "`package.json` is the one you already use. A plugin has one too, which is what lets a team install it by name.",
        auto: true,
    },
    schema: {
        def: "A description of the shape data must have: which fields exist and what type each one is.",
        note: "In a workflow, passing a schema is what makes each agent return a structured object instead of a paragraph, which is the difference between a usable result and one you have to parse by hand.",
        auto: true,
    },

    // ---------- shell and runtime ----------
    bash: {
        def: "The shell that runs your terminal commands.",
        note: "It is how a skill runs a script: Claude calls bash, the script runs, and only what it printed comes back into context.",
        auto: true,
    },
    cli: {
        term: "CLI",
        def: "Command-line interface: a program you drive by typing commands rather than clicking.",
        note: "Claude Code is one. So is npm.",
        auto: true,
    },
    "exit code": {
        def: "The number a program returns when it finishes. Zero means success, anything else means failure.",
        note: "This is how a script tells an agent loop that something is wrong. A script that finds a problem and still exits 0 has failed silently, which is the worst outcome inside a loop.",
        auto: true,
    },
    "dry run": {
        def: "Running something in a mode where it reports what it would do and changes nothing.",
        note: "Both installers in this package take `--dry-run`. Doing that first is free, and it is how you find out an installer was pointed at the wrong home directory.",
        auto: true,
    },
    runtime: {
        def: "The environment a piece of code actually executes in, and what is available to it there.",
        note: "It matters here because it differs: skills in Claude Code have full network access, skills on the API have none and cannot install packages.",
        auto: true,
    },
    sandbox: {
        def: "An isolated environment where code can run without reaching the rest of a machine.",
        note: "Cowork sessions run in one on Anthropic's servers, which is why they keep going after you close your laptop.",
        auto: true,
    },
    harness: {
        def: "The program around the model: it runs the loop, calls the tools, and enforces permissions.",
        note: "Worth separating from the model itself. A hook fires because the harness fires it, not because the model decided to, which is why a hook cannot be talked out of it.",
        auto: true,
    },

    // ---------- permissions and safety ----------
    allowlist: {
        def: "A list of what IS permitted, with everything else refused by default.",
        note: "An agent's `tools` field is one. Safer than a denylist, because anything you forgot to think of is refused rather than allowed.",
        auto: true,
    },
    denylist: {
        def: "A list of what is NOT permitted, with everything else allowed.",
        note: "`disallowedTools` is one. It is subtracted from whatever the agent would otherwise inherit.",
        auto: true,
    },
    "lifecycle event": {
        def: "A moment the harness reaches every time, like just before a tool runs or just after a file is edited.",
        note: "Hooks attach to these. That is what makes them deterministic: the moment arrives whether or not anyone remembered it.",
        auto: true,
    },
    rollback: {
        def: "A prepared way to put things back as they were if a change goes wrong.",
        note: "deploy-check names the rollback path up front, before deploying, because the moment you need one is the worst moment to start designing it.",
        auto: true,
    },
    namespaced: {
        def: "Prefixed with the name of whatever it came from, so two things with the same name cannot collide.",
        note: "A plugin's commands arrive namespaced, which is why an agent name cannot contain a colon.",
        auto: true,
    },

    // ---------- quality ----------
    typecheck: {
        def: "Checking that the types in your code agree, without running it.",
        note: "One third of the quality gate in stack.md, alongside tests and the build.",
        auto: true,
    },
    lint: {
        def: "An automated check for style and likely mistakes, separate from whether the code runs.",
        note: "",
        auto: true,
    },
    "regression test": {
        def: "A test written to prove a specific bug is fixed, kept so it cannot come back unnoticed.",
        note: "debug-issue ends with one. Without it a fix is a claim; with it the fix is enforced.",
        auto: true,
    },
    coverage: {
        def: "How much of your code the tests actually execute.",
        note: "High coverage proves the lines ran, not that they are correct. Phase 4's answer is to break the code and watch a test go red.",
        auto: true,
    },
    assertion: {
        def: "The line in a test that states what must be true, and fails the test when it is not.",
        note: "A test whose only assertion is that something is defined cannot fail for the reason you care about. It is the first thing Phase 4 part 6 teaches you to spot.",
        auto: true,
    },
    "mutation testing": {
        def: "Deliberately breaking the code to check that a test notices.",
        note: "Tools automate it, but the version that matters takes a minute by hand: break the code under one assertion, watch the test go red, put it back. It is the difference between a green suite and a green suite that means something.",
        auto: true,
    },
    "happy path": {
        def: "The run where everything goes right: valid input, the record exists, the network answers.",
        note: "The easiest path to test and the least likely to break. A suite where every case is one of these has not been near the code that fails in production.",
        auto: true,
    },
    "snapshot test": {
        def: "A test that records the output of a component or function and fails when it changes.",
        note: "Worth treating carefully when it was written after the code: it records what the code does today, bug included, because it came from the output rather than from the requirement.",
        auto: true,
    },
    "magic number": {
        def: "A bare literal sitting in code with no name and no explanation: a timeout, a limit, a retry count.",
        note: "Worth a second look in generated code, because a plausible default is easy to invent and hard to notice. grep for it: if it appears exactly once, nothing agreed to it.",
        auto: true,
    },
    "smoke check": {
        def: "A quick test after a deploy that the main paths still work at all.",
        note: "Not thorough on purpose. It is there to catch the deploy that took the whole thing down, in the first minute rather than the first support message.",
        auto: true,
    },
    "acceptance criteria": {
        def: "The checkable conditions that say a piece of work is finished.",
        note: "The same idea as done-when criteria, written before the work rather than after.",
        auto: true,
    },
    "root cause": {
        def: "The thing that actually caused a bug, as opposed to the symptom you noticed.",
        note: "debug-issue walks reproduce, then root cause, then regression test, in that order, because fixing a symptom usually just moves it.",
        auto: true,
    },
    reproduce: {
        def: "To make a bug happen again reliably, on demand.",
        note: "The first step of debug-issue, and the one people skip. A bug you cannot reproduce is a bug you cannot prove you fixed.",
        auto: true,
    },

    // ---------- web, for the newest reader ----------
    middleware: {
        def: "A function that runs on every request before your route handlers see it.",
        note: "In Express it is what fills in `req.body`, checks auth, or logs. The route-reviewer example flags handlers that rely on error middleware that is not actually there.",
        auto: true,
    },
    endpoint: {
        def: "One address on a server that handles one kind of request.",
        note: "Used interchangeably with route in this package.",
        auto: true,
    },
    "status code": {
        def: "The number on a response saying how the request went.",
        note: "200 worked, 400 the request was wrong, 401 not authorised, 500 the server was. The adding-routes skill asks for one per outcome.",
        auto: true,
    },
    validation: {
        def: "Checking that incoming data is the shape you expected before you use it.",
        note: "Anything read off `req.body` or `req.params` is data a stranger sent you. The route-reviewer example flags handlers that trust it.",
        auto: true,
    },

    // ---------- agent mechanics ----------
    "fan-out": {
        def: "Splitting one job into many independent pieces and running them at the same time.",
        note: "The thing dynamic workflows exist for. One agent per file, per issue, per package.",
        auto: true,
    },
    "reduce step": {
        def: "The part of a workflow that turns many agent results into one deliverable.",
        note: "Without it a workflow returns a pile. It is the difference between three hundred findings and a ranked list.",
        auto: true,
    },
    "fresh context": {
        def: "A context window that starts empty, with none of the conversation so far in it.",
        note: "What a subagent gets, and both why it is useful and why it surprises people: it has not seen the file you were just discussing.",
        auto: true,
    },
    "return contract": {
        def: "What you have told a subagent its answer must look like.",
        note: "Return a table with these four columns. A vague return wastes the whole round trip, because you cannot use the result without reading all of it.",
        auto: true,
    },
    "turn cap": {
        def: "A hard limit on how many steps an agent may take before it has to stop.",
        note: "`maxTurns`. The rail that stops an open-ended research task from spiralling.",
        auto: true,
    },
    concurrency: {
        def: "How many things are allowed to run at the same time.",
        note: "Capped at 16 agents at once inside a workflow, with the rest queued. Version-gated, so check yours.",
        auto: true,
    },
    orchestrate: {
        def: "To coordinate many separate pieces of work: what runs, in what order, and what happens to the results.",
        note: "In a workflow the script does this rather than Claude, which is what lets it handle more agents than one conversation could track.",
        auto: true,
    },
    triage: {
        def: "Sorting a pile of issues by what actually needs attention first.",
        note: "The triage-todos workflow does it to every TODO in a codebase at once.",
        auto: true,
    },
    deterministic: {
        def: "Gives the same result every time, for the same input.",
        note: "The property a script has and a prompt does not. It is the whole argument for writing code when there is a right answer.",
        auto: true,
    },
    "research preview": {
        def: "A feature released early, with the behaviour and availability still liable to change.",
        note: "Routines are one. Re-verify before relying on it, and before teaching it to anyone else.",
        auto: true,
    },
    "slash command": {
        def: "A saved prompt you run by typing / and its name.",
        note: "Just a Markdown file in ~/.claude/commands whose body is the prompt. The easiest thing in the whole setup to add to.",
        auto: true,
    },
    token: {
        def: "The unit a model reads and writes in. Roughly a short word or a piece of one.",
        note: "Everything loaded competes for the same context window, which is why an unused skill costing about 100 tokens is the number that makes a large library practical.",
        auto: true,
    },

    // ---------- words this package uses in a specific sense ----------
    turn: {
        def: "One message from you and the reply to it.",
        note: "The shortest unit anything here lives for. A prompt lasts one turn; that is what makes it the cheapest and the most forgettable place to put an instruction.",
        auto: false,
    },
    scope: {
        def: "How widely something applies: this project only, or everywhere you work.",
        note: "The recurring choice in Phases 2 and 3. A project file lives in the repo and travels with it; a personal one lives in ~/.claude and applies to everything.",
        auto: false,
    },
    stack: {
        def: "The set of tools and frameworks a project is built on.",
        note: "Written down once in ~/claude-context/config/stack.md, so every skill in the Phase 3 library reads its commands from one place instead of assuming a toolchain.",
        auto: false,
    },

    // ---------- the vocabulary phases 2 to 4 lean on ----------
    session: {
        def: "One continuous conversation with Claude, from opening it to closing it.",
        note: "The unit almost everything in this package is measured against. Loading in every session is what makes CLAUDE.md expensive, and closing a session properly is what Phase 4 keeps asking you to do.",
        auto: true,
    },
    import: {
        def: "A line in CLAUDE.md that pulls another file in whole, as if it had been pasted there.",
        note: "Written `@~/claude-context/memory/core.md`. Imports in a personal CLAUDE.md load in every session in every directory, which is exactly what you want for identity and exactly what makes a long imported file costly.",
        auto: true,
    },
    tracker: {
        def: "Wherever your live project and task records actually live: Airtable, Linear, Notion, GitHub Projects.",
        note: "Deliberately not part of this setup. The rule is one source of truth per fact, so the private layer links to it rather than copying it, and a task list pasted into a markdown file is a second, stale copy.",
        auto: true,
    },
    router: {
        def: "The one-line-per-skill index that rides in every session so a cold conversation knows which skills exist.",
        note: "It is `workflows/_index.md`, and it is short on purpose: it is an index, and the moment it becomes documentation it starts costing tokens in sessions that never needed it.",
        auto: true,
    },
    kit: {
        def: "One of the two installable halves of this package.",
        note: "The context kit is Phase 2 and installs who you are. The workflow kit is Phase 3 and installs how you work. Both are additive and safe to re-run.",
        auto: true,
    },
    library: {
        def: "The set of skills, subagents, hooks and workflows installed on your machine.",
        note: "Phase 3 installs a starting one and Phase 4 is about growing it. A skill sitting unused costs about 100 tokens, which is why a large library is not a tax.",
        auto: true,
    },
    loop: {
        def: "A cycle that repeats: observe the result, choose the next action, act, look again.",
        note: "Two senses here, and both matter. An agent runs in one. So do you: Phase 4's open, work, verify, close is the loop this whole package is trying to make turn.",
        auto: false,
    },
    "quality gate": {
        def: "The typecheck, tests and build that all have to pass before work counts as done.",
        note: "Written once in stack.md and read by every skill. Done means this is green, not that Claude said it finished.",
        auto: true,
    },
    "definition of done": {
        def: "The checkable statement of when a piece of work is actually finished.",
        note: "If you cannot say at the end of a session what done was, the prompt was underspecified at the start.",
        auto: true,
    },
    promote: {
        def: "To move a recurring correction up into something permanent, so it stops having to be repeated.",
        note: "The third move in Phase 4's loop, after correct and capture. A recurring fact becomes memory, a recurring judgment becomes a skill, a recurring exact-right operation becomes a script.",
        auto: true,
    },
    prune: {
        def: "To delete the lines in your memory files that have stopped earning their place.",
        note: "The monthly job people skip. A stale line is worse than a blank one, because it points Claude wrong at the exact moment it is deciding what to do.",
        auto: true,
    },
    capture: {
        def: "To write something down at the moment you learn it, before the session that produced it closes.",
        note: "The second move in Phase 4's loop. A correction that is not captured will be needed again tomorrow.",
        auto: false,
    },
    reconcile: {
        def: "To go through what changed and put each piece where it belongs.",
        note: "What /wrap does at the end of a session, using the Phase 2 routing table. It is the step that stops decisions dying in chat history.",
        auto: true,
    },
    acceptedits: {
        term: "acceptEdits",
        def: "A permission mode in which file edits are approved automatically, without asking.",
        note: "The one to memorise: subagents spawned by a workflow always run in it, whatever your session is set to. Do not point a workflow at code you are not prepared to have changed.",
        auto: true,
    },
    sessionstart: {
        term: "SessionStart",
        def: "The lifecycle event that fires when a session opens.",
        note: "Nothing runs there by default, so every session begins with Claude working out where it is. A hook on this event is the cheapest fix in Phase 2.",
        auto: true,
    },
    "wcag aa": {
        term: "WCAG AA",
        def: "The accessibility standard for text contrast: at least 4.5:1 against its background for body text.",
        note: "Worth recording which of your brand colour pairs actually clear it, because a palette chosen on a bright monitor routinely does not.",
        auto: true,
    },
    "machine-local": {
        def: "Lives on this computer only, and is not meant to travel with a repo.",
        note: "Everything in ~/.claude is machine-local, which is why an absolute path from it in a committed file leaks the account name of whoever ran it.",
        auto: true,
    },
    "git-ignored": {
        def: "Listed in a gitignore, so git refuses to track it and it cannot be committed.",
        note: "The private context layer is git-ignored globally rather than per repo, so it is covered everywhere instead of only where you remembered to configure it.",
        auto: true,
    },
    "home directory": {
        def: "Your user folder, written `~`. On a Mac that is /Users/yourname.",
        note: "Both installers write here rather than into a project, which is what makes the setup apply in every repo you open.",
        auto: true,
    },
    lens: {
        def: "One angle you deliberately review something from, so a pass does not just find whatever you happened to notice.",
        note: "self-review uses four. Reviewing without them means reading the same diff four times and finding the same thing.",
        auto: true,
    },
    verify: {
        def: "To prove something is true rather than accept that it is.",
        note: "Phase 4 part 3 is the principle and parts 4 to 7 are the method. Green tests you did not read are worth less than one test you watched fail and then pass.",
        auto: true,
    },
};

// Terms are written in prose however the sentence needs them, so the lookup is
// case insensitive and tolerates a trailing s.
export function lookupTerm(word) {
    const key = String(word).trim().toLowerCase();
    if (TERMS[key]) return TERMS[key];
    if (key.endsWith("s") && TERMS[key.slice(0, -1)]) return TERMS[key.slice(0, -1)];
    return null;
}

/** The glossary as a sorted list, for the appendix. */
export function glossaryList() {
    return Object.entries(TERMS)
        .map(([key, entry]) => ({ key, label: entry.term || key, ...entry }))
        .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));
}

/**
 * The terms that mark themselves up, longest first so a phrase always wins over
 * a shorter term inside it.
 *
 * `auto` is opt-in per entry rather than on by default, because a word like
 * `scope`, `stack` or `turn` carries an everyday meaning as well as this
 * package's one, and linking those on sight would define the wrong sense half
 * the time. Anything ambiguous stays manual, written [[like this]] where the
 * technical reading is the one intended.
 */
export const AUTO_TERMS = Object.entries(TERMS)
    .filter(([, entry]) => entry.auto)
    .map(([key]) => key)
    .sort((a, b) => b.length - a.length);
