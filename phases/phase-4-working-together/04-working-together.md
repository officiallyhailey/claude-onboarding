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
| 4 | [The feedback loop](#4-the-feedback-loop) | How does my system get better over time? |
| 5 | [The maintenance rhythm](#5-the-maintenance-rhythm) | What do I do daily, weekly, monthly? |
| 6 | [Working professionally with AI](#6-working-professionally-with-ai) | How do I stay honest and credible? |
| 7 | [Human-in-the-loop failure modes](#7-human-in-the-loop-failure-modes) | What do I get wrong, and how do I fix it? |

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
2. **Have I done this exact procedure before?** If yes and it is written down, invoke the skill. If yes and it is not, that is a signal to write one (Part 4).
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

On autonomy and safety: an agent trades predictability for reach (Phase 1 section 5). You buy the predictability back with constraints. Keep destructive git operations (`add`, `commit`, `push`) behind a prompt rather than blanket-allowed, let the `pre-commit-guard` hook enforce the absolutes, and never point a dynamic workflow at code you are not prepared to have edited, because its subagents auto-approve edits (Phase 1 section 9). The rule of thumb: automate the checkable, gate the irreversible.

---

## 4. The feedback loop

> A static system decays. The point of the private context and the skill library is that they learn from you. That only happens if you close the loop deliberately.

The loop has three moves: **correct, capture, promote.**

- **Correct.** When Claude gets something wrong, fix it in the moment, but also notice *why*. A wrong output usually traces to a missing fact (belongs in `memory/core.md` or a role file) or a missing procedure (belongs in a skill).
- **Capture.** At session end, `wrap-day` routes what changed to its home using the Phase 2 routing table. A correction that is not captured will be needed again tomorrow. `learn-log` captures the non-obvious things you figured out, with proof.
- **Promote.** When the same correction or lesson recurs three times, promote it: a recurring fact into memory, a recurring judgment into a skill, a recurring exact-right operation into a script inside that skill, a recurring fan-out into a workflow. This is how the library grows to fit you instead of staying generic.

The tell that the loop is working: you stop re-explaining things. The tell that it is broken: you keep correcting the same mistake, or your memory files describe a setup you no longer run.

---

## 5. The maintenance rhythm

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

## 6. Working professionally with AI

> How you talk about AI-assisted work is part of the work. Credibility is easy to keep and hard to rebuild.

A few standing habits:

- **Claim only what you can defend.** `portfolio-update` and the job-seeker profile exist to keep your claims grounded in shipped, provable work. In an interview you will have to explain the code in the room; a defensible small claim beats an impressive one you cannot back up.
- **Understand what you ship.** Using Claude to write code does not remove your responsibility to understand it. Verify (Part 3) not just that it works, but that you could explain and maintain it. The learning log is how using AI makes you a better engineer instead of a dependent one.
- **Keep private things private.** The Phase 2 split exists for this: identity, clients, and profile live in the git-ignored context layer, never in a repo you might publish. The `pre-commit-guard` hook is the backstop.
- **Be honest about the tool.** Overstating or hiding AI use both cost credibility. State it plainly when it matters, and let the quality of the verified work speak.

---

## 7. Human-in-the-loop failure modes

> The tools rarely fail on their own. The loop fails at the human. These are the ways, and the fixes.

| # | Failure | Why it hurts | Fix |
|---|---|---|---|
| 1 | Trusting "done" without reading the diff or running the gate | Confident, plausible, wrong code ships | Read every diff; green gate before you accept anything (Part 3) |
| 2 | Delegating chatty work to a subagent | It starts blank, cannot ask you, and still costs your context | Delegate only self-contained, noisy work; keep back-and-forth in the conversation |
| 3 | Skipping the close | Decisions and lessons die in chat history | Run `wrap-day` even when busy; that is when it matters most |
| 4 | Letting memory rot | Stale facts point Claude wrong at decision time | Prune `core.md` monthly; fix stale pointers when you find them |
| 5 | Formalizing too early | You maintain a process you had not finished learning | Wait for the third repetition before writing a skill or workflow |
| 6 | Over-automating the irreversible | An auto-approved destructive action you cannot undo | Gate writes and deploys; automate only the checkable |
| 7 | Never promoting corrections | You re-explain the same thing forever | Correct, capture, promote (Part 4); the loop is the whole point |

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
