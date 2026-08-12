---
name: learn-log
description: Captures what a developer learned in a dated, searchable log so skill growth compounds instead of evaporating. Use when the user says "I learned", "log this", "note this for later", "add to my learning log", or after solving a non-obvious problem.
---

# Learning log

Turn "I finally figured that out" into a durable entry you can find again and show off later.

## Where it goes
- Append to `~/claude-context/growth/learning-log.md` (create the file and folder if missing).
- Keep entries short and dated. This is a log: append, do not rewrite.

## Entry format
```
## YYYY-MM-DD  <one-line title>
Context: what I was doing.
Learned: the insight, in my own words.
Proof: link to the commit / PR / file where I applied it.
Reuse: is this a candidate for a skill, a snippet, or a portfolio note?
```

## Steps
1. Ask (or infer) the one-line title and the insight in the user's own words.
2. Attach proof: a real link to where it was applied. No proof means it is a note, not a lesson.
3. If the same lesson has now appeared three times, flag it as a candidate to promote into a skill (Doc 1 section 7).
4. If it is portfolio-worthy, tag it for `portfolio-update`.

## Definition of done
- A dated entry with a real proof link.
- Promotion flagged if the pattern has recurred.

## Hand-offs
- Feeds `portfolio-update`.
- Recurring lessons graduate into new skills via the `skill-creator` skill.
