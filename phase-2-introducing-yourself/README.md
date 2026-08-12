# Claude Ops kit

A template for a personal Claude operating system: the private context layer that
makes every session know who you are, plus the wiring that loads it.

This is the companion to the setup guide. Read `02-introducing-yourself.md` first;
it explains the why, the install, and how to populate everything with Claude.

## Install

```bash
./setup.sh --dry-run   # print what it would do, change nothing
./setup.sh             # do it
```

The installer is safe by design. It appends to `~/.claude/CLAUDE.md` (backing it
up first), never overwrites your own files (no-clobber), and adds the private
context folder to your global gitignore.

## What is in here

```
claude-ops-kit/
├── 02-introducing-yourself.md   the guide (start here)
├── setup.sh                    the installer
├── claude-context/             -> installs to ~/claude-context  (private, git-ignored)
└── dot-claude/                 -> parts for ~/.claude
    ├── CLAUDE.md.append        the @import block the installer adds
    ├── commands/               /wrap, /ready, /kickoff slash commands
    └── agents/                 sub-agents scaffold + how-to
```

Nothing here is filled in for you on purpose. The templates carry instructions
and interview prompts; the guide walks you through answering them with Claude.
