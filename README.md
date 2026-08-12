# Claude Onboarding

A four-phase path that takes a developer who can code but has never worked with agents,
skills, or workflows, and leaves them with a personal Claude system they run every day.

**Read it: https://officiallyhailey.github.io/claude-onboarding/**

The site is the guide and the delivery mechanism at once. It carries all four phases,
a glossary of 116 terms on hover, and a download for the kits that phases 2 and 3
install.

---

## The four phases

| Phase | Name | Answers | Installs |
|---|---|---|---|
| 1 | **Understanding Claude** | What are all the pieces, and when do I use each? | nothing |
| 2 | **Introducing Yourself** | How do I tell Claude who I am, so every session knows? | the context kit, to `~/claude-context` |
| 3 | **Implementing Your Systems** | How do I install the skills, agents, hooks, and workflows I work with? | the workflow kit, into `~/.claude` |
| 4 | **Working Together** | How do I actually work with Claude well, day to day? | nothing (habits) |

Phase 1 is understanding, phases 2 and 3 are setup done once, and phase 4 is the daily
practice. [`phases/README.md`](phases/README.md) is the package's own map, and it ships
inside the download.

---

## Installing without the site

Download the zip from the site, or clone this repo and run the installers from
`phases/`:

```bash
cd phases
./install-all.sh --dry-run   # preview, changes nothing
./install-all.sh
```

Both installers are additive and no-clobber: they never overwrite a file you have
filled in, they back up `CLAUDE.md` before touching it, and they are safe to re-run.
One step is left manual on purpose, and the installer prints it: the Phase 3 hooks are
registered by merging `hooks/settings.snippet.json` into your `~/.claude/settings.json`.

---

## Repository layout

```
.
├── index.html            the site
├── src/                  its source; SITE.md explains how the content is authored
├── public/               fonts, and the download zips that scripts/build-kits.sh writes
├── scripts/
│   └── build-kits.sh     packs phases/ into the zips the site offers
├── phases/               the package itself: four guides and two installable kits
└── .github/workflows/    builds and publishes the site on every push to main
```

The zips are never committed. They are packed from `phases/` before every build, so a
change to a guide or a skill ships in the site and in the download from one commit.

---

## Running the site locally

```bash
npm install
npm run dev        # http://localhost:5175
```

`npm run build` produces `dist/`, which opens from a folder or any static host with no
server configuration. Both commands pack the download zips first.

[`SITE.md`](SITE.md) covers how the content is structured, how to add a glossary
definition or a file tree, and the theme the site is built in.

---

## Licence

MIT. See [LICENSE](LICENSE).
