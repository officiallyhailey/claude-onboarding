# Claude developer workflow kit

The procedures layer for a full-stack developer: working skills, subagents, hooks,
and dynamic workflows, organized around what you actually do day to day. Pairs with
the context kit (who you are) from Doc 2. Read `03-implementing-your-systems.md`
first.

## Install

```bash
./setup-dev.sh --dry-run   # print what it would do
./setup-dev.sh             # do it
```

Additive and no-clobber, like the context kit. It installs skills, subagents,
workflows, and hook scripts into `~/.claude`, and `stack.md` into your private
context. It does not edit `settings.json`; it prints the hook snippet for you to
merge by hand.

## What is in here

```
claude-dev-kit/
├── 03-implementing-your-systems.md   the guide (start here)
├── setup-dev.sh                      the installer
├── config/stack.md                   your stack, referenced by every skill
├── skills/                           12 working skills across the day
├── agents/                           5 subagents (specialists)
├── hooks/                            2 hook scripts + settings snippet
└── workflows/                        2 dynamic workflows (fan-out)
```

## First move after install

Fill in `~/claude-context/config/stack.md`. Every skill reads its commands from
there, so the library does nothing useful until it knows your stack.
