#!/usr/bin/env bash
#
# Claude Ops kit installer.
#
# Safe by design:
#   - appends to ~/.claude/CLAUDE.md, never overwrites (and backs it up first)
#   - copies context files with no-clobber, so a re-run never wipes your content
#   - idempotent: run it as many times as you like
#
# Usage:
#   ./setup.sh --dry-run   # print what it would do, change nothing
#   ./setup.sh             # do it
#
set -euo pipefail

KIT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_HOME="${HOME}/.claude"
CONTEXT_DIR="${HOME}/claude-context"
GIT_IGNORE="${HOME}/.config/git/ignore"
CLAUDE_MD="${CLAUDE_HOME}/CLAUDE.md"
MARKER=">>> claude-ops context imports >>>"

DRY_RUN=0
if [ "${1:-}" = "--dry-run" ]; then DRY_RUN=1; fi

say()  { printf '%s\n' "$*"; }
step() { printf '\n== %s\n' "$*"; }
do_() { if [ "$DRY_RUN" -eq 1 ]; then say "  would: $*"; else eval "$*"; fi; }

say "Claude Ops kit installer"
say "  kit:     ${KIT_DIR}"
say "  context: ${CONTEXT_DIR}"
say "  config:  ${CLAUDE_HOME}"
[ "$DRY_RUN" -eq 1 ] && say "  MODE:    dry run (nothing will change)"

# BSD cp, which is what macOS ships, exits 1 when -n skips a file that already
# exists. GNU cp exits 0. Skipping is the whole point of a no-clobber install, so
# under `set -e` that status would abort the script: every re-run died at the
# first copy, and install-all.sh never reached the second phase. The `|| true` on
# each copy below is what makes "safe to re-run" actually true on a Mac.

# 1. Private context tree (no-clobber protects anything you have already filled in)
step "1. Install private context tree -> ${CONTEXT_DIR}"
do_ "mkdir -p '${CONTEXT_DIR}'"
do_ "cp -Rn '${KIT_DIR}/claude-context/.' '${CONTEXT_DIR}/' || true"

# 2. Global gitignore so the private context never lands in a repo
step "2. Ensure ${GIT_IGNORE} ignores the private context"
do_ "mkdir -p '$(dirname "${GIT_IGNORE}")'"
if [ "$DRY_RUN" -eq 1 ]; then
  say "  would: ensure 'claude-context/' is present in ${GIT_IGNORE}"
else
  touch "${GIT_IGNORE}"
  grep -qxF "claude-context/" "${GIT_IGNORE}" || printf '%s\n' "claude-context/" >> "${GIT_IGNORE}"
fi

# 3. Commands and agents scaffold into ~/.claude (no-clobber)
step "3. Install slash commands and agents scaffold -> ${CLAUDE_HOME}"
do_ "mkdir -p '${CLAUDE_HOME}/commands' '${CLAUDE_HOME}/agents'"
do_ "cp -Rn '${KIT_DIR}/dot-claude/commands/.' '${CLAUDE_HOME}/commands/' || true"
do_ "cp -Rn '${KIT_DIR}/dot-claude/agents/.' '${CLAUDE_HOME}/agents/' || true"

# 4. Wire @imports into the personal CLAUDE.md (append once, after a backup)
step "4. Wire @imports into ${CLAUDE_MD}"
if [ ! -f "${CLAUDE_MD}" ]; then
  say "  note: ${CLAUDE_MD} does not exist yet; it will be created"
  do_ "mkdir -p '${CLAUDE_HOME}'"
  do_ "touch '${CLAUDE_MD}'"
fi
if [ "$DRY_RUN" -eq 0 ] && grep -qF "${MARKER}" "${CLAUDE_MD}" 2>/dev/null; then
  say "  imports already present; skipping (safe to re-run)"
else
  if [ "$DRY_RUN" -eq 1 ]; then
    say "  would: back up CLAUDE.md, then append the import block"
  else
    cp "${CLAUDE_MD}" "${CLAUDE_MD}.bak.$(date +%Y%m%d%H%M%S)"
    cat "${KIT_DIR}/dot-claude/CLAUDE.md.append" >> "${CLAUDE_MD}"
    say "  appended import block (original backed up as CLAUDE.md.bak.<timestamp>)"
  fi
fi

step "Done"
say "Next: open 02-introducing-yourself.md and start at Stage 1."
say "Nothing personal is filled in yet; that is what the guide walks you through."
