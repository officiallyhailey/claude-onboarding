# ~/.claude/agents  (personal sub-agents)

Sub-agents are Markdown files here, one per specialist (Doc 1 section 6). This
folder being a REAL directory is what lets custom sub-agents load. If you point a
symlink at it, make sure the target actually exists, or none of them load and you
silently fall back to the built-in agent types.

Add a sub-agent by dropping `<name>.md` here:

```markdown
---
name: dep-auditor
description: When to delegate to it. This is what the main agent matches on.
tools: Read, Grep, Glob
model: haiku
maxTurns: 15
---

One job. A fixed return contract. An explicit stop rule.
```

See Doc 1 section 6 for the full field reference and a worked example, and
section 5 for the difference between a top-level agent and a sub-agent.
