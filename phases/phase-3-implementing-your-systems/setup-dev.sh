#!/usr/bin/env bash
#
# Claude developer workflow kit installer (Doc 3).
#
# Additive and safe, like the context kit:
#   - copies skills, agents, workflows, and hook scripts with no-clobber
#   - installs stack.md into your private context store (no-clobber)
#   - does NOT touch ~/.claude/settings.json; it prints the hook snippet for you
#     to merge by hand, because settings edits are format-sensitive
#
# Usage:
#   ./setup-dev.sh --dry-run   # print what it would do
#   ./setup-dev.sh             # do it
#
set -euo pipefail

KIT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_HOME="${HOME}/.claude"
CONTEXT_DIR="${HOME}/claude-context"

DRY_RUN=0
[ "${1:-}" = "--dry-run" ] && DRY_RUN=1

say()  { printf '%s\n' "$*"; }
step() { printf '\n== %s\n' "$*"; }
do_()  { if [ "$DRY_RUN" -eq 1 ]; then say "  would: $*"; else eval "$*"; fi; }

say "Claude developer workflow kit installer"
say "  kit:     ${KIT_DIR}"
say "  config:  ${CLAUDE_HOME}"
[ "$DRY_RUN" -eq 1 ] && say "  MODE:    dry run (nothing will change)"

# Each no-clobber copy below ends in `|| true`.
#
# BSD cp, which macOS ships, exits 1 when -n skips a file that already exists.
# GNU cp exits 0 for the same thing. Skipping existing files is the intended
# behaviour of this installer, so under `set -e` that exit status would stop the
# script partway through on any run where the files are already in place.

step "1. Skills -> ${CLAUDE_HOME}/skills"
do_ "mkdir -p '${CLAUDE_HOME}/skills'"
do_ "cp -Rn '${KIT_DIR}/skills/.' '${CLAUDE_HOME}/skills/' || true"

step "2. Subagents -> ${CLAUDE_HOME}/agents"
do_ "mkdir -p '${CLAUDE_HOME}/agents'"
do_ "cp -Rn '${KIT_DIR}/agents/.' '${CLAUDE_HOME}/agents/' || true"

step "3. Dynamic workflows -> ${CLAUDE_HOME}/workflows"
do_ "mkdir -p '${CLAUDE_HOME}/workflows'"
do_ "cp -Rn '${KIT_DIR}/workflows/.' '${CLAUDE_HOME}/workflows/' || true"

step "4. Hook scripts -> ${CLAUDE_HOME}/hooks"
do_ "mkdir -p '${CLAUDE_HOME}/hooks'"
do_ "cp -Rn '${KIT_DIR}/hooks/'*.sh '${CLAUDE_HOME}/hooks/' || true"
do_ "chmod +x '${CLAUDE_HOME}/hooks/'*.sh"

step "5. Stack config -> ${CONTEXT_DIR}/config/stack.md"
do_ "mkdir -p '${CONTEXT_DIR}/config'"
do_ "cp -n '${KIT_DIR}/config/stack.md' '${CONTEXT_DIR}/config/stack.md' || true"

step "Done"
say "Two manual steps remain (on purpose):"
say "  1. Fill in ${CONTEXT_DIR}/config/stack.md with your real commands."
say "  2. Register the hooks: merge hooks/settings.snippet.json into"
say "     ${CLAUDE_HOME}/settings.json (add the keys into your existing 'hooks'"
say "     object; do not replace the file). Then restart Claude Code."
say ""
say "Next: open 03-implementing-your-systems.md for the map of what fires when."
