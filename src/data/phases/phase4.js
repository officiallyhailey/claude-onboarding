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
                {
                    t: "p",
                    x: "That table is what to check. The four parts after this one are how: reading a [[diff]] you did not write, the tells that something plausible is wrong, telling an honest green from a hollow one, and what to do with code you cannot follow.",
                },
                { t: "sub", x: "On autonomy and safety" },
                {
                    t: "p",
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
        // The four parts that follow are the how of verification. Section 03
        // is the principles and it used to be the whole answer, which meant a
        // reader who wanted the method had nowhere to go.
        {
            id: "diff",
            num: "04",
            title: "Reading the diff",
            heading: "How do I review a change I did not write?",
            blocks: [
                {
                    t: "thesis",
                    x: "Reviewing your own code and reviewing an agent's are different jobs. You wrote yours in the order it appears. For this one you have no map, so you need a reading order.",
                },
                {
                    t: "p",
                    x: "The instinct is to read from the top of the first file to the bottom of the last, at one speed. That is the slowest pass available and it spreads your attention evenly over code that deserves very different amounts of it. Read in this order instead, and stop the moment something does not add up rather than pressing on to the end.",
                },
                {
                    t: "ol",
                    steps: true,
                    items: [
                        "The file list, before a single line of code. It answers one question: did this touch what you expected? A file you did not expect is the highest-value finding on the page and it costs five seconds.",
                        "The deletions. A removed line is behaviour you used to have. Deletions are also the part any summary explains least, because nothing is there to describe.",
                        "Edits to code that already worked, line by line, slowly. This is where [[regression|regressions]] come from. New code that is wrong usually fails the first time you run it; a changed line in code that already worked can be wrong for weeks.",
                        "New code you will own: new functions, new state, new error branches, new dependencies. Normal speed, but all of it, because this is what you get asked about in review and what you will be debugging later.",
                        "Everything mechanical, at a skim. Renames, formatting, import order, generated files, lockfiles. You are checking the shape rather than the lines, and a rename that also changed twelve lines of logic is not a rename.",
                    ],
                },
                {
                    t: "shell",
                    x: `git diff --stat                        what was touched, and by how much
git diff --diff-filter=D --name-only   files removed outright
git diff main...HEAD                   the whole branch, not the last edit
git diff -U15 src/api/auth.js          one file, with more context
git diff --word-diff                   what changed on a reflowed line`,
                },
                { t: "sub", x: "Three things a diff cannot tell you" },
                {
                    t: "vocab",
                    items: [
                        [
                            "Whether anything is missing",
                            "A diff shows what changed, never what should have changed and did not. Ask it directly: which callers of this function did not need updating, and why not? In React Native, did the other platform need the same edit? In Next.js, does the server-side path have the same problem? In Express, is there a second route doing this the old way?",
                        ],
                        [
                            "Whether a test was removed or weakened",
                            "A suite that goes green after a change which deleted test lines has not told you anything. Look at the test files in the stat line: lines gone with none added is the shape to catch.",
                        ],
                        [
                            "Whether it runs",
                            "A diff is text. Only the [[quality gate]] is evidence, and only if you watched it run rather than being told it passed.",
                        ],
                    ],
                },
                {
                    t: "note",
                    kind: "rule",
                    lab: "Read it before you ask about it",
                    x: "Asking what changed gets you a summary written by the thing you are checking. It will be fluent, it will be mostly right, and it will not mention the part that is wrong, because it does not know which part that is.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "plausible",
            num: "05",
            title: "Plausible but wrong",
            heading: "What does a wrong answer look like when it looks right?",
            blocks: [
                {
                    t: "thesis",
                    x: "Wrong output rarely looks wrong. It looks like the code you would have written yourself if you knew slightly less than you do. These are the tells.",
                },
                {
                    t: "p",
                    x: "None of these prove a bug. Each one is a reason to stop and check one specific thing, and that is what makes them worth memorising: they turn a vague unease into a two-minute check with an answer at the end.",
                },
                {
                    t: "numtable",
                    head: ["Signal", "What it usually means", "Check"],
                    rows: [
                        [
                            "An import, package or method you have never seen",
                            "A gap was filled with something that sounds like it ought to exist",
                            "`npm ls the-package`, then open the export in `node_modules` or the docs for the version you actually have",
                        ],
                        [
                            "The code matches a different version of the library",
                            "Training data is not your lockfile, and React Native, Next.js and Express all move",
                            "Check the installed version, then that version's docs for the option or hook used",
                        ],
                        [
                            "A [[magic number]] or a config key from nowhere",
                            "A plausible default was invented: a 3000ms timeout, five retries, an env var nothing else reads",
                            "grep the repo for it. If it appears exactly once, nothing agreed to it",
                        ],
                        [
                            "The fix sits in the layer that was easiest to reach",
                            "A symptom was patched where it surfaced rather than where it started",
                            "Ask what the value is when it arrives at that line, and where it first became wrong",
                        ],
                        [
                            "A `try`/`catch` that logs and carries on",
                            "The failure path was made quiet rather than handled",
                            "Decide what should happen when it fails, then confirm the code does that",
                        ],
                        [
                            "The change is bigger than the request",
                            "An unrelated refactor rode along with the fix",
                            "Split it. A fix you can review on its own is a fix you can revert on its own",
                        ],
                        [
                            "Tests were edited in the same change as the fix",
                            "The [[assertion|assertions]] may have been moved to fit the code",
                            "Read the test [[hunk|hunks]] before the source ones, and ask what they asserted before",
                        ],
                        [
                            "The explanation is more certain than the code",
                            "Confidence is generated, not measured. It is not a signal about correctness",
                            "Ask what would have to be true for this to be wrong, then check that thing",
                        ],
                    ],
                },
                {
                    t: "note",
                    lab: "The question that catches the most",
                    x: "Why does this fix the problem? If you cannot answer in one sentence that names a cause, you have a change that makes the symptom go away. That is a different thing, and it comes back.",
                },
                {
                    t: "prompt",
                    lab: "Paste before you read the diff",
                    x: `Before I review this: what are you least sure about?

List anything you assumed about this codebase but could not
verify from the files you read, any API or option you used
without confirming it exists in the installed version, and any
case you know is not handled.

If there is nothing, say so plainly rather than filling the list.`,
                    done: "You have a short list of specific things to check, and you check them yourself rather than taking the list as reassurance.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "tests",
            num: "06",
            title: "Green that proves something",
            heading: "How do I tell a real green from a hollow one?",
            blocks: [
                {
                    t: "thesis",
                    x: "A passing suite tells you the code survived the inputs somebody chose. Whether those inputs could ever have failed is a different question, and it is the one that matters.",
                },
                {
                    t: "p",
                    x: "The risk with agent-written tests is not laziness, it is agreement. When one reading of the problem produces both the code and the tests, the two agree with each other whether or not either is right. A suite written from the implementation passes by construction, and it will keep passing while the bug ships.",
                },
                { t: "sub", x: "The check that settles it" },
                {
                    t: "p",
                    x: "Tools call this [[mutation testing]]. Done by hand, on the one [[assertion]] you care about, it takes a minute.",
                },
                {
                    t: "ol",
                    steps: true,
                    items: [
                        "Pick the assertion that would matter most if it were wrong.",
                        "Break the code underneath it, crudely: invert the condition, return a constant, delete the line, change `>=` to `>`.",
                        "Run the test. It has to go red, and the failure has to name the thing you broke. Red for an unrelated reason does not count.",
                        "Put the code back and run it again. Green.",
                    ],
                },
                {
                    t: "p",
                    x: "If it stayed green at step three, that test does not test that. Fix it or delete it. A test that cannot fail is worse than no test at all, because it is confidence nobody earned.",
                },
                { t: "sub", x: "What a hollow test looks like" },
                {
                    t: "table",
                    head: ["Tell", "Why it passes anyway"],
                    rows: [
                        [
                            "It only asserts `toBeDefined()`, `toBeTruthy()` or `not.toBeNull()`",
                            "Nearly any return value satisfies that, including the wrong one and an error object",
                        ],
                        [
                            "The thing under test is mocked",
                            "A mocked `fetch` resolving your own fixture proves the fixture parses. Mock the boundary, never the subject",
                        ],
                        [
                            "Every case is the [[happy path]]",
                            "Production is the empty list, the expired token, the 500 from upstream, and the second tap before the first finished",
                        ],
                        [
                            "A [[snapshot test]] written after the code",
                            "A snapshot records what the code does today, bug included. It came from the output, not from the requirement",
                        ],
                        [
                            "A stray `.only` or `.skip`",
                            "The suite is green because most of it never ran. Read the test count, not the colour",
                        ],
                        [
                            "[[coverage|Coverage]] went up and nothing else changed",
                            "Coverage proves the lines executed. Nothing in it checks what they produced",
                        ],
                    ],
                },
                {
                    t: "versus",
                    weak: {
                        text: `it("returns the user", async () => {
  const res = await get("/users/1");
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
});`,
                        why: "Passes whether the body is the user, an empty object, or an error the route sent with a 200 by mistake. Break the handler and it stays green.",
                    },
                    strong: {
                        text: `it("returns the user", async () => {
  const res = await get("/users/1");
  expect(res.status).toBe(200);
  expect(res.body).toEqual({
    id: 1, email: "ana@a.co"
  });
});

it("404s if missing", async () => {
  const res = await get("/users/99");
  expect(res.status).toBe(404);
});`,
                        why: "Asserts the actual shape, and covers the branch that breaks in production, which is the row not being there. Change that 404 to a 200 and this goes red on the line that says so.",
                    },
                },
                {
                    t: "note",
                    kind: "rule",
                    lab: "For a bug, ask for the failing test first",
                    x: "The cheapest verification in this phase. A test that failed before the fix and passes after it is evidence. A test written after the fix is a description of the code.",
                },
                {
                    t: "prompt",
                    lab: "Paste when you report a bug",
                    x: `Do not fix this yet.

First write one test that reproduces it, and nothing else. No
source changes. Tell me the exact command to run it.

I will run it and confirm it fails for the right reason. Then
fix the code, change nothing but the fix, and we run it again.`,
                    done: "You watched it fail, you watched it pass, and the only source change between the two is the fix.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "understand",
            num: "07",
            title: "Code you cannot follow",
            heading: "What do I do when I do not understand what Claude wrote?",
            blocks: [
                {
                    t: "thesis",
                    x: "Not following a change is normal and says nothing about you. Shipping it anyway is the problem, and asking for an explanation is only sometimes the fix.",
                },
                {
                    t: "p",
                    x: "The standing rule is that you stay responsible for what you ship. That does not mean knowing every API in the diff before you start. It means not accepting a change you could not explain in review, or debug at nine on a Friday when it breaks. When a [[hunk]] will not resolve, work up this ladder and stop at the rung that answers it.",
                },
                {
                    t: "ol",
                    steps: true,
                    items: [
                        "Name the confusion in one sentence. Not I do not get this, but I do not know why the dependency array is `[user.id]` rather than `[user]`. Writing that sentence answers it surprisingly often, and when it does not you are left holding a question worth asking.",
                        "Ask for the why, not the what. The code already says what. Ask what breaks if this line is removed, what the alternative was and why it lost, and what happens on the failure path.",
                        "Check the answer against the source rather than the explanation. Both came from the same place, so an explanation can be wrong in the same direction as the code and just as fluently. Open the installed version's docs, or its types in `node_modules`, and confirm the API does what you were told.",
                        "Make the running code prove it. Log the value, set a breakpoint, change an input and watch the output move. Behaviour on your machine is the one thing an explanation cannot fake.",
                        "Ask for the version you could have written: rewrite this using only patterns already in this codebase, in the plainest form, even if it comes out longer. Clever code you cannot maintain is a worse outcome than verbose code you can.",
                    ],
                },
                {
                    t: "prompt",
                    lab: "Paste with the hunk you are stuck on",
                    x: `Explain this the way a reviewer would, not the way its author would.

For each hunk: what it does, why this way rather than the obvious
alternative, and what breaks if it is removed.

Then list what you are not certain about here, and anything that
depends on a version or a behaviour you cannot see from this repo.
Do not restate the code in prose.`,
                    done: "You could take every hunk through a review out loud, and you know which parts are still unverified.",
                },
                {
                    t: "note",
                    kind: "warn",
                    lab: "When you will actually need to understand it",
                    x: "Not now. When it breaks, in production, in a hurry, with someone waiting. Reading it for the first time at that moment is the expensive version of reading it at this one.",
                },
                {
                    t: "note",
                    lab: "The answer that is always available",
                    x: "Revert it and ask for it in smaller pieces. A change you cannot follow is one nobody reviewing your [[pull request]] can follow either, and the smaller version costs one more prompt.",
                },
            ],
        },

        // ---------------------------------------------------------------
        {
            id: "feedback",
            num: "08",
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
            num: "09",
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
            num: "10",
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
            num: "11",
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
                            "Accepting a green suite you never read",
                            "Tests written from the implementation agree with it whether or not it is right",
                            "Break the code under the assertion you care about and watch that test go red",
                        ],
                        [
                            "Shipping a change you could not explain",
                            "The moment you need to understand it is the moment it breaks, in a hurry",
                            "Work up the ladder, or revert it and ask for it in smaller pieces",
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
            num: "12",
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
