# Claude for Junior Developers: a complete onboarding package

A four-phase path that takes a developer who can code but has never worked with agents,
skills, or workflows, and leaves them with a personal Claude system they run every day.

Each phase has one guide to read and, for phases 2 and 3, a kit to install. Do them in
order; each builds on the one before.

---

## The four phases

| Phase | Name | Answers | Read | Install |
|---|---|---|---|---|
| 1 | **Understanding Claude** | What are all the pieces, and when do I use each? | `phase-1-understanding-claude/01-understanding-claude.md` | nothing |
| 2 | **Introducing Yourself** | How do I tell Claude who I am, so every session knows? | `phase-2-introducing-yourself/02-introducing-yourself.md` | the context kit |
| 3 | **Implementing Your Systems** | How do I install the skills, agents, hooks, and workflows I work with? | `phase-3-implementing-your-systems/03-implementing-your-systems.md` | the workflow kit |
| 4 | **Working Together** | How do I actually work with Claude well, day to day? | `phase-4-working-together/04-working-together.md` | nothing (habits) |

Phase 1 is understanding, phases 2 and 3 are setup (done once), and phase 4 is the daily
practice (repeated forever). The order matters: you cannot introduce yourself before you
know the pieces, and you cannot implement systems before your machine knows who you are.

---

## A note on the two kits

The two kits are two different layers, and it is worth being clear which is which:

- **Phase 2, Introducing Yourself, is the context layer.** It is *who you are*: identity,
  the memory that loads into every session, your roles, your brand. It installs to a
  private, git-ignored `~/claude-context`.
- **Phase 3, Implementing Your Systems, is the procedures layer.** It is *how you work*:
  skills, subagents, hooks, and dynamic workflows. It installs into `~/.claude`.

They interlock. The Phase 3 skills read from the Phase 2 context (your role, your stack)
and write back to it (the end-of-day wrap routes changes into your memory). That is why
Phase 2 comes first.

---

## How the layers sit on your machine

```
~/.claude/                    the always-loaded config surface
  ├─ CLAUDE.md                your rules + @imports of the context below   (Phase 2)
  ├─ settings.json            permissions + hooks                          (Phase 3 hooks)
  ├─ skills/                  the procedures library                       (Phase 3)
  ├─ agents/                  subagents                                    (Phase 3)
  ├─ workflows/               dynamic workflows                            (Phase 3)
  ├─ hooks/                   hook scripts                                 (Phase 3)
  └─ commands/                /wrap, /ready, /kickoff                      (Phase 2)

~/claude-context/             the private layer, never published           (Phase 2 + stack.md from Phase 3)
  ├─ identity/ memory/ roles/ brand/ projects/ workflows/ inbox/
  └─ config/stack.md          your stack, read by every Phase 3 skill
```

Facts load early and cheaply (CLAUDE.md, imported context). Procedures load only when
triggered (skills). Enforcement is not instruction at all (settings.json and hooks). Each
thing lives at the lowest-cost layer that can do its job.

---

## Install order

Phase 1 and Phase 4 are reading. Phases 2 and 3 install, in this order:

```bash
# Phase 2: introduce yourself (context)
cd phase-2-introducing-yourself
./setup.sh --dry-run      # preview
./setup.sh                # install
# then follow 02-introducing-yourself.md to fill in who-i-am, core memory, roles, brand

# Phase 3: implement your systems (procedures)
cd ../phase-3-implementing-your-systems
./setup-dev.sh --dry-run  # preview
./setup-dev.sh            # install
# then fill in ~/claude-context/config/stack.md and register the hooks
```

Or run both from the package root with `./install-all.sh` (previews, asks nothing
destructive). Both installers are additive and no-clobber: they never overwrite files you
have filled in, they back up `CLAUDE.md` before touching it, and they are safe to re-run.

After installing, the guides for phases 2 and 3 walk you through populating everything by
interview with Claude. Nothing personal is filled in for you, on purpose.

---

## Adopting into an existing setup

If you already have a `~/.claude` with memory and skills, you are not starting over. The
installers layer onto what you have, and Phase 2's guide covers migrating existing memory
into the new homes (move, then trim, so nothing loads twice). Your existing skills are not
touched; you simply index them in the router.

---

## For the person handing this off

This package is meant to be given to another developer. It is self-contained: the four
guides plus the two kits. Point them at this README, tell them to start at Phase 1, and
let them install Phases 2 and 3 when they reach them. The templates carry their own
instructions, so they can populate the system by talking to Claude rather than filling in
blanks alone.

---

## What is in the box

```
claude-onboarding/
├── README.md                              this file
├── install-all.sh                         runs both installers in order
├── phase-1-understanding-claude/
│   └── 01-understanding-claude.md
├── phase-2-introducing-yourself/
│   ├── 02-introducing-yourself.md
│   ├── setup.sh
│   ├── claude-context/                    the private context templates
│   └── dot-claude/                        commands + agents scaffold + CLAUDE.md imports
├── phase-3-implementing-your-systems/
│   ├── 03-implementing-your-systems.md
│   ├── setup-dev.sh
│   ├── config/stack.md
│   ├── skills/                            12 working skills
│   ├── agents/                            5 subagents
│   ├── hooks/                             2 hooks + settings snippet
│   └── workflows/                         2 dynamic workflows
└── phase-4-working-together/
    └── 04-working-together.md
```

---

## Reading it as a site

The four guides are also a website, which is the easier way in if you are reading
rather than installing:

**https://officiallyhailey.github.io/claude-onboarding/**

It is the same content, with two things the Markdown cannot do. Every directory
layout is a live tree rather than a picture of one, so each row tells you what
that file is for and what goes wrong when it is used for something else. And
every technical word carries a definition on hover, from one glossary of 116
entries that the appendix also renders as a list, so nothing can mean one thing
in a sentence and another at the back.

The site is also where this package came from: it offers the whole thing, and
each kit on its own, as a download.
