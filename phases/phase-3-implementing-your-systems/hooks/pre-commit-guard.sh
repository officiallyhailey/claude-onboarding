#!/usr/bin/env bash
#
# PreToolUse(Bash) guard: blocks risky git operations before they run.
#
# Claude Code calls this with the hook payload as JSON on stdin. It emits a
# permission decision as JSON on stdout and always exits 0. A denied call is
# visible and recoverable; a silently rewritten one is neither, so this denies
# rather than editing the command.
#
# This is a STARTING POINT. Tune the patterns to your project, and test it against
# real commands before trusting it. Hook payload and output schemas are version
# gated in Claude Code; if it does not fire, check your version's hook docs.
#
set -uo pipefail

payload="$(cat)"

# Pull the bash command out of the payload. Prefer jq; fall back to grep.
if command -v jq >/dev/null 2>&1; then
  cmd="$(printf '%s' "$payload" | jq -r '.tool_input.command // empty')"
else
  cmd="$(printf '%s' "$payload" | grep -o '"command"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*:[[:space:]]*"//; s/"$//')"
fi

# reason must be plain ASCII with no double quotes or backslashes.
deny() {
  printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"%s"}}\n' "$1"
  exit 0
}
allow() { printf '{}\n'; exit 0; }

# Only inspect git/gh write commands. Everything else passes untouched.
case "$cmd" in
  *"git commit"*|*"git add"*|*"gh pr create"*|*"gh pr edit"*) ;;
  *) allow ;;
esac

# 1. Absolute home paths leak your account name (a real name) into the repo.
if printf '%s' "$cmd" | grep -Eq '/(Users|home)/[A-Za-z0-9._-]+/'; then
  deny "Command contains an absolute home path, which leaks your account name. Use a relative path."
fi

# 2. Staging agent or editor working files.
if printf '%s' "$cmd" | grep -Eq '(^|[[:space:]])\.(claude|cursor|codex|aider|vscode|idea)(/|[[:space:]]|$)'; then
  deny "Command stages an agent or editor working file (.claude/.cursor/.codex/.vscode/.idea). These do not belong in the repo; use the global gitignore."
fi

# 3. Obvious secrets by filename.
if printf '%s' "$cmd" | grep -Eq '(\.env([^.a-zA-Z]|$)|id_rsa|\.pem([[:space:]]|$)|credentials|secrets?\.(json|ya?ml))'; then
  deny "Command appears to stage a secrets file (.env, key, credentials). Add it to .gitignore instead of committing it."
fi

allow
