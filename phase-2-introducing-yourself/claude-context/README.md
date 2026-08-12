# ~/claude-context  (private, never published)

This is your personal context store: who you are, what to remember, your roles,
and your brand. It is the private counterpart to any skills repo you publish.

It is wired into every Claude session by `@import` lines in `~/.claude/CLAUDE.md`,
so the short files here (`identity/who-i-am.md`, `memory/core.md`,
`workflows/_index.md`) load everywhere, in every project.

Rules of the road:

- Never move personal facts into a repo you might publish. This is the folder
  that exists so you do not have to.
- The installer adds this folder to `~/.config/git/ignore`.
- Keep the three imported files short. They cost tokens in every session.

See the setup guide (`02-introducing-yourself.md`) for how to populate each file
with Claude, and for the routing table that keeps future updates landing here
instead of getting lost in a chat.
