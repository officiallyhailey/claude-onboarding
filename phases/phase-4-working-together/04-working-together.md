# Phase 4 · Working Together

**Doc 4 of the junior-dev series. Phase 1 taught the pieces, Phase 2 told Claude who you are, Phase 3 installed your systems. This phase is the daily discipline of actually working with Claude well.**

The first three phases are setup, done once. This one is a practice you repeat. It is what separates a developer who *has* a Claude setup from one who *gets leverage* from it.

*Verified against Anthropic's official documentation in August 2026. "Phase 1/2/3" refer to the earlier docs in this package. Em dash avoided on purpose, per the author's standing rules.*

---

## Table of contents

| # | Part | Answers |
|---|---|---|
| 0 | [What this phase is](#0-what-this-phase-is) | Why is "working together" a skill of its own? |
| 1 | [The session loop](#1-the-session-loop) | How do I run one session well? |
| 2 | [Delegation judgment](#2-delegation-judgment) | Chat, skill, subagent, or workflow, in the moment? |
| 3 | [Verification and trust](#3-verification-and-trust) | How do I know the work is actually right? |
| 4 | [Reading the diff](#4-reading-the-diff) | How do I review a change I did not write? |
| 5 | [Plausible but wrong](#5-plausible-but-wrong) | What does a wrong answer look like when it looks right? |
| 6 | [Green that proves something](#6-green-that-proves-something) | How do I tell a real green from a hollow one? |
| 7 | [Code you cannot follow](#7-code-you-cannot-follow) | What do I do when I do not understand what Claude wrote? |
| 8 | [The feedback loop](#8-the-feedback-loop) | How does my system get better over time? |
| 9 | [The maintenance rhythm](#9-the-maintenance-rhythm) | What do I do daily, weekly, monthly? |
| 10 | [Working professionally with AI](#10-working-professionally-with-ai) | How do I stay honest and credible? |
| 11 | [Human-in-the-loop failure modes](#11-human-in-the-loop-failure-modes) | What do I get wrong, and how do I fix it? |

---

## 0. What this phase is

> A good setup does not make you effective. Using it with judgment does. This phase is the judgment.

By now you have the pieces (Phase 1), a machine that knows who you are (Phase 2), and a library of skills, subagents, hooks, and workflows (Phase 3). The failure mode from here is not a missing tool. It is using the tools without discipline: trusting output you did not verify, delegating work that should have stayed a conversation, or letting your memory and skills rot until they lie to you.

Everything below is a habit, not a file. The habits compound: a developer who verifies, captures, and prunes every day ends the month with a system that is sharper than it started. One who does not ends the month with a system that quietly misleads them.

---

## 1. The session loop

> Open, work, verify, close. The two ends (open and close) are where most leverage is lost, because they are the easy steps to skip.

| Step | Do | With |
|---|---|---|
| **Open** | Orient before touching code. What am I working on, and what is the one next action? | `plan-day` / `/ready` |
| **Work** | Build in the right container (Part 2), against a definition of done | `new-feature`, `debug-issue`, subagents |
| **Verify** | Prove it, do not assume it (Part 3) | quality gate, `self-review`, `code-reviewer` |
| **Close** | File what changed so nothing dies in chat history | `wrap-day` / `/wrap`, `learn-log` |

The open and close steps feel optional under time pressure. They are the opposite. Skipping open means you rediscover where you were every session, at the cost of the first ten minutes. Skipping close means every decision and lesson from the session evaporates, so tomorrow's session starts blind. The tools exist; the discipline is running them even when you are busy.

A healthy session has a shape: it starts by naming the goal and ends by reconciling against it. If you cannot say at the end what "done" was, the prompt was underspecified at the start (Phase 1 section 2).

---

## 2. Delegation judgment

> The most common beginner mistake is putting work in the wrong container (Phase 1 section 10). In practice this is a snap decision you make dozens of times a day. Here is the reflex to build.

Ask, in order:

1. **Do I want an answer, or an artifact?** An answer to read and react to is Chat. An artifact, or multi-step work you walk away from, is an agent (Cowork or Claude Code).
2. **Have I done this exact procedure before?** If yes and it is written down, invoke the skill. If yes and it is not, that is a signal to write one (Part 8).
3. **Is the work noisy and self-contained?** If it reads a lot and returns a little, delegate to a subagent so the noise never enters your context. If it needs back-and-forth with you, keep it in the main conversation.
4. **Is it the same pass over many items?** If it is a fan-out over dozens of files or issues, that is a dynamic workflow, not forty manual delegations.
5. **Must it happen every time, no exceptions?** That is not instruction at all. That is a hook.

Two judgment calls worth internalizing, because they are where juniors misfire:

- **Do not delegate chatty work to a subagent.** A subagent starts with an empty context, cannot ask you anything, and its result still costs your context when it returns (Phase 1 section 6). Delegate only self-contained, noisy work. If you find yourself wanting to clarify mid-task, it should have stayed a conversation.
- **Do not formalize a workflow you have run once.** You would lock in a process you have not finished learning, then maintain it forever. Wait for the third repetition (Phase 1 section 9).

---

## 3. Verification and trust

> Claude is fast and confident. Neither is the same as correct. Your job in the loop is to be the part that checks.

The single rule that prevents the most pain: **never trust "done" without evidence.** "Done" means the quality gate from `stack.md` is green, not that Claude said it finished. Green tests you did not read are worth less than one test you watched fail and then pass.

How to verify, cheapest first:

| Check | When |
|---|---|
| Read the diff, in full | Every change before you accept it. Not the files you remember touching, all of them |
| Run the quality gate | Before trusting any "done": typecheck, tests, build (Phase 3 `stack.md`) |
| Prove a test can fail | For anything important: break the code, confirm the test goes red, restore it |
| Independent review pass | For large or sensitive diffs: the `code-reviewer` subagent, whose fresh context catches what yours cannot |
| Ask for the uncertainty | "Flag anything you are not sure about" surfaces the weak points instead of hiding them |

That table is what to check. Parts 4 to 7 are how: reading a diff you did not write, the tells that something plausible is wrong, telling an honest green from a hollow one, and what to do with code you cannot follow.

On autonomy and safety: an agent trades predictability for reach (Phase 1 section 5). You buy the predictability back with constraints. Keep destructive git operations (`add`, `commit`, `push`) behind a prompt rather than blanket-allowed, let the `pre-commit-guard` hook enforce the absolutes, and never point a dynamic workflow at code you are not prepared to have edited, because its subagents auto-approve edits (Phase 1 section 9). The rule of thumb: automate the checkable, gate the irreversible.

---

## 4. Reading the diff

> Reviewing your own code and reviewing an agent's are different jobs. You wrote yours in the order it appears. For this one you have no map, so you need a reading order.

The instinct is to read from the top of the first file to the bottom of the last, at one speed. That is the slowest pass available and it spreads your attention evenly over code that deserves very different amounts of it. Read in this order instead, and stop the moment something does not add up rather than pressing on to the end.

1. **The file list, before a single line of code.** It answers one question: did this touch what you expected? A file you did not expect is the highest-value finding on the page and it costs five seconds.
2. **The deletions.** A removed line is behaviour you used to have. Deletions are also the part any summary explains least, because nothing is there to describe.
3. **Edits to code that already worked, line by line, slowly.** This is where regressions come from. New code that is wrong usually fails the first time you run it; a changed line in code that already worked can be wrong for weeks.
4. **New code you will own:** new functions, new state, new error branches, new dependencies. Normal speed, but all of it, because this is what you get asked about in review and what you will be debugging later.
5. **Everything mechanical, at a skim.** Renames, formatting, import order, generated files, lockfiles. You are checking the shape rather than the lines, and a rename that also changed twelve lines of logic is not a rename.

```bash
git diff --stat                       # what was touched, and by how much
git diff --diff-filter=D --name-only  # files removed outright
git diff main...HEAD                  # the whole branch, not the last edit
git diff -U15 src/api/auth.js         # one file, with more context
git diff --word-diff                  # what changed on a reflowed line
```

Three things a diff cannot tell you:

- **Whether anything is missing.** A diff shows what changed, never what should have changed and did not. Ask it directly: which callers of this function did not need updating, and why not? In React Native, did the other platform need the same edit? In Next.js, does the server-side path have the same problem? In Express, is there a second route doing this the old way?
- **Whether a test was removed or weakened.** A suite that goes green after a change which deleted test lines has not told you anything. Look at the test files in the stat line: lines gone with none added is the shape to catch.
- **Whether it runs.** A diff is text. Only the quality gate is evidence, and only if you watched it run rather than being told it passed.

Read it before you ask about it. Asking what changed gets you a summary written by the thing you are checking. It will be fluent, it will be mostly right, and it will not mention the part that is wrong, because it does not know which part that is.

---

## 5. Plausible but wrong

> Wrong output rarely looks wrong. It looks like the code you would have written yourself if you knew slightly less than you do. These are the tells.

None of these prove a bug. Each one is a reason to stop and check one specific thing, and that is what makes them worth memorising: they turn a vague unease into a two-minute check with an answer at the end.

| # | Signal | What it usually means | Check |
|---|---|---|---|
| 1 | An import, package or method you have never seen | A gap was filled with something that sounds like it ought to exist | `npm ls the-package`, then open the export in `node_modules` or the docs for the version you actually have |
| 2 | The code matches a different version of the library | Training data is not your lockfile, and React Native, Next.js and Express all move | Check the installed version, then that version's docs for the option or hook used |
| 3 | A magic number or a config key from nowhere | A plausible default was invented: a 3000ms timeout, five retries, an env var nothing else reads | `grep` the repo for it. If it appears exactly once, nothing agreed to it |
| 4 | The fix sits in the layer that was easiest to reach | A symptom was patched where it surfaced rather than where it started | Ask what the value is when it arrives at that line, and where it first became wrong |
| 5 | A `try`/`catch` that logs and carries on | The failure path was made quiet rather than handled | Decide what should happen when it fails, then confirm the code does that |
| 6 | The change is bigger than the request | An unrelated refactor rode along with the fix | Split it. A fix you can review on its own is a fix you can revert on its own |
| 7 | Tests were edited in the same change as the fix | The assertions may have been moved to fit the code | Read the test hunks before the source ones, and ask what they asserted before |
| 8 | The explanation is more certain than the code | Confidence is generated, not measured. It is not a signal about correctness | Ask what would have to be true for this to be wrong, then check that thing |

The question that catches the most: **why does this fix the problem?** If you cannot answer in one sentence that names a cause, you have a change that makes the symptom go away. That is a different thing, and it comes back.

Paste this before you read the diff:

```
Before I review this: what are you least sure about?

List anything you assumed about this codebase but could not
verify from the files you read, any API or option you used
without confirming it exists in the installed version, and any
case you know is not handled.

If there is nothing, say so plainly rather than filling the list.
```

**Done when:** you have a short list of specific things to check, and you check them yourself rather than taking the list as reassurance.

---

## 6. Green that proves something

> A passing suite tells you the code survived the inputs somebody chose. Whether those inputs could ever have failed is a different question, and it is the one that matters.

The risk with agent-written tests is not laziness, it is agreement. When one reading of the problem produces both the code and the tests, the two agree with each other whether or not either is right. A suite written from the implementation passes by construction, and it will keep passing while the bug ships.

**The check that settles it.** Tools call this mutation testing. Done by hand, on the one assertion you care about, it takes a minute.

1. Pick the assertion that would matter most if it were wrong.
2. Break the code underneath it, crudely: invert the condition, return a constant, delete the line, change `>=` to `>`.
3. Run the test. It has to go red, and the failure has to name the thing you broke. Red for an unrelated reason does not count.
4. Put the code back and run it again. Green.

If it stayed green at step three, that test does not test that. Fix it or delete it. A test that cannot fail is worse than no test at all, because it is confidence nobody earned.

**What a hollow test looks like:**

| Tell | Why it passes anyway |
|---|---|
| It only asserts `toBeDefined()`, `toBeTruthy()` or `not.toBeNull()` | Nearly any return value satisfies that, including the wrong one and an error object |
| The thing under test is mocked | A mocked `fetch` resolving your own fixture proves the fixture parses. Mock the boundary, never the subject |
| Every case is the happy path | Production is the empty list, the expired token, the 500 from upstream, and the second tap before the first finished |
| A snapshot test written after the code | A snapshot records what the code does today, bug included. It came from the output, not from the requirement |
| A stray `.only` or `.skip` | The suite is green because most of it never ran. Read the test count, not the colour |
| Coverage went up and nothing else changed | Coverage proves the lines executed. Nothing in it checks what they produced |

Weak, an Express route test that cannot fail:

```js
it("returns the user", async () => {
  const res = await get("/users/1");
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
});
```

It passes whether the body is the user, an empty object, or an error the route sent with a 200 by mistake. Break the handler and it stays green.

Strong:

```js
it("returns the user", async () => {
  const res = await get("/users/1");
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ id: 1, email: "ana@a.co" });
});

it("404s if missing", async () => {
  const res = await get("/users/99");
  expect(res.status).toBe(404);
});
```

It asserts the actual shape, and covers the branch that breaks in production, which is the row not being there. Change that 404 to a 200 and this goes red on the line that says so.

**For a bug, ask for the failing test first.** The cheapest verification in this phase. A test that failed before the fix and passes after it is evidence. A test written after the fix is a description of the code.

```
Do not fix this yet.

First write one test that reproduces it, and nothing else. No
source changes. Tell me the exact command to run it.

I will run it and confirm it fails for the right reason. Then
fix the code, change nothing but the fix, and we run it again.
```

**Done when:** you watched it fail, you watched it pass, and the only source change between the two is the fix.

---

## 7. Code you cannot follow

> Not following a change is normal and says nothing about you. Shipping it anyway is the problem, and asking for an explanation is only sometimes the fix.

The standing rule is that you stay responsible for what you ship (Part 10). That does not mean knowing every API in the diff before you start. It means not accepting a change you could not explain in review, or debug at nine on a Friday when it breaks. When a hunk will not resolve, work up this ladder and stop at the rung that answers it.

1. **Name the confusion in one sentence.** Not "I do not get this", but "I do not know why the dependency array is `[user.id]` rather than `[user]`". Writing that sentence answers it surprisingly often, and when it does not you are left holding a question worth asking.
2. **Ask for the why, not the what.** The code already says what. Ask what breaks if this line is removed, what the alternative was and why it lost, and what happens on the failure path.
3. **Check the answer against the source rather than the explanation.** Both came from the same place, so an explanation can be wrong in the same direction as the code and just as fluently. Open the installed version's docs, or its types in `node_modules`, and confirm the API does what you were told.
4. **Make the running code prove it.** Log the value, set a breakpoint, change an input and watch the output move. Behaviour on your machine is the one thing an explanation cannot fake.
5. **Ask for the version you could have written:** "rewrite this using only patterns already in this codebase, in the plainest form, even if it comes out longer". Clever code you cannot maintain is a worse outcome than verbose code you can.

Paste this with the hunk you are stuck on:

```
Explain this the way a reviewer would, not the way its author would.

For each hunk: what it does, why this way rather than the obvious
alternative, and what breaks if it is removed.

Then list what you are not certain about here, and anything that
depends on a version or a behaviour you cannot see from this repo.
Do not restate the code in prose.
```

**Done when:** you could take every hunk through a review out loud, and you know which parts are still unverified.

Two things worth keeping in mind. The moment you will actually need to understand this code is not now: it is when it breaks, in production, in a hurry, with someone waiting, and reading it for the first time then is the expensive version of reading it now. And there is always one answer available, which is to revert it and ask for it in smaller pieces. A change you cannot follow is one nobody reviewing your pull request can follow either, and the smaller version costs one more prompt.

---

## 8. The feedback loop

> A static system decays. The point of the private context and the skill library is that they learn from you. That only happens if you close the loop deliberately.

The loop has three moves: **correct, capture, promote.**

- **Correct.** When Claude gets something wrong, fix it in the moment, but also notice *why*. A wrong output usually traces to a missing fact (belongs in `memory/core.md` or a role file) or a missing procedure (belongs in a skill).
- **Capture.** At session end, `wrap-day` routes what changed to its home using the Phase 2 routing table. A correction that is not captured will be needed again tomorrow. `learn-log` captures the non-obvious things you figured out, with proof.
- **Promote.** When the same correction or lesson recurs three times, promote it: a recurring fact into memory, a recurring judgment into a skill, a recurring exact-right operation into a script inside that skill, a recurring fan-out into a workflow. This is how the library grows to fit you instead of staying generic.

The tell that the loop is working: you stop re-explaining things. The tell that it is broken: you keep correcting the same mistake, or your memory files describe a setup you no longer run.

---

## 9. The maintenance rhythm

> Setup is once. Upkeep is forever, but small. A little pruning keeps the system honest; neglect turns it into a pile of confident lies.

| Cadence | Do | With |
|---|---|---|
| **Daily** | Open with a plan, close with a reconcile and a learning entry | `plan-day`, `wrap-day`, `learn-log` |
| **Weekly** | Sweep the codebase, triage TODOs, audit deps before a release, empty the `inbox/` | `audit-repo`, `triage-todos`, `dep-auditor` |
| **Monthly** | Prune `memory/core.md` (cut any line that has not earned its place), reread `decisions.md`, confirm `stack.md` still matches your tooling | by hand, with Claude |
| **Quarterly** | Turn the quarter's shipped work into portfolio and profile updates | `portfolio-update` |

For anything on this list that should run whether or not you remember, use the scheduling primitives from Phase 1 section 9: **scheduled tasks** (Cowork, or Claude Code Desktop) and **routines** (Claude Code cloud) re-run a whole task on a cadence with your machine closed; a **hook** fires on an event; `/loop` repeats within a session. A weekly dependency audit or a Monday planning brief is a natural scheduled task. The distinction to remember: cloud schedules run without your laptop, desktop schedules can touch local files.

The monthly prune is the one people skip and regret. Imported context loads in every session, so a bloated `core.md` taxes all of your work, and a stale line (a renamed skill, a decision you reversed) is worse than a blank, because it points Claude wrong at the exact moment it is deciding what to do.

---

## 10. Working professionally with AI

> How you talk about AI-assisted work is part of the work. Credibility is easy to keep and hard to rebuild.

A few standing habits:

- **Claim only what you can defend.** `portfolio-update` and the job-seeker profile exist to keep your claims grounded in shipped, provable work. In an interview you will have to explain the code in the room; a defensible small claim beats an impressive one you cannot back up.
- **Understand what you ship.** Using Claude to write code does not remove your responsibility to understand it. Verify (Parts 3 to 7) not just that it works, but that you could explain and maintain it. The learning log is how using AI makes you a better engineer instead of a dependent one.
- **Keep private things private.** The Phase 2 split exists for this: identity, clients, and profile live in the git-ignored context layer, never in a repo you might publish. The `pre-commit-guard` hook is the backstop.
- **Be honest about the tool.** Overstating or hiding AI use both cost credibility. State it plainly when it matters, and let the quality of the verified work speak.

---

## 11. Human-in-the-loop failure modes

> The tools rarely fail on their own. The loop fails at the human. These are the ways, and the fixes.

| # | Failure | Why it hurts | Fix |
|---|---|---|---|
| 1 | Trusting "done" without reading the diff or running the gate | Confident, plausible, wrong code ships | Read every diff; green gate before you accept anything (Parts 3 and 4) |
| 2 | Accepting a green suite you never read | Tests written from the implementation agree with it whether or not it is right | Break the code under the assertion you care about and watch that test go red (Part 6) |
| 3 | Shipping a change you could not explain | The moment you need to understand it is the moment it breaks, in a hurry | Work up the ladder in Part 7, or revert it and ask for it in smaller pieces |
| 4 | Delegating chatty work to a subagent | It starts blank, cannot ask you, and still costs your context | Delegate only self-contained, noisy work; keep back-and-forth in the conversation |
| 5 | Skipping the close | Decisions and lessons die in chat history | Run `wrap-day` even when busy; that is when it matters most |
| 6 | Letting memory rot | Stale facts point Claude wrong at decision time | Prune `core.md` monthly; fix stale pointers when you find them |
| 7 | Formalizing too early | You maintain a process you had not finished learning | Wait for the third repetition before writing a skill or workflow |
| 8 | Over-automating the irreversible | An auto-approved destructive action you cannot undo | Gate writes and deploys; automate only the checkable |
| 9 | Never promoting corrections | You re-explain the same thing forever | Correct, capture, promote (Part 8); the loop is the whole point |

---

## Where this leaves you

Four phases: you understand the pieces, your machine knows who you are, your systems are installed, and you have the discipline to work with them. The setup is finished. The practice is not, and that is the right way round. Keep the loop turning: plan, build, verify, close, and every so often prune. The system is only as good as the habits that maintain it, and those are yours now.

---

## Sources

Verified against Anthropic's official documentation, August 2026.

- [Claude prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- [Steering Claude Code: CLAUDE.md, skills, hooks, and subagents](https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more)
- [Claude Code: sub-agents](https://code.claude.com/docs/en/sub-agents)
- [Claude Code: dynamic workflows](https://code.claude.com/docs/en/workflows)
- [Claude Code: scheduled tasks](https://code.claude.com/docs/en/scheduled-tasks)
- [Claude Code: hooks](https://code.claude.com/docs/en/hooks)
