#!/usr/bin/env bash
#
# PostToolUse(Edit|Write) hook: formats a file right after Claude edits it, so the
# working tree stays clean without you asking.
#
# Reads the hook payload JSON on stdin, formats the edited file if a formatter is
# available, and always exits 0 (a formatter failure must never block editing).
#
# This is a STARTING POINT. Set FORMAT_CMD to your project's formatter, or extend
# the per-extension logic below. It is intentionally best-effort and silent on
# success.
#
set -uo pipefail

payload="$(cat)"

if command -v jq >/dev/null 2>&1; then
  file="$(printf '%s' "$payload" | jq -r '.tool_input.file_path // .tool_input.path // empty')"
else
  file="$(printf '%s' "$payload" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*:[[:space:]]*"//; s/"$//')"
fi

[ -z "${file:-}" ] && exit 0
[ ! -f "$file" ] && exit 0

# Option A: one formatter for the whole project. Uncomment and set it.
# FORMAT_CMD="pnpm exec prettier --write"
# if [ -n "${FORMAT_CMD:-}" ]; then eval "$FORMAT_CMD \"$file\"" >/dev/null 2>&1 || true; exit 0; fi

# Option B: best-effort by extension, only if the tool is installed.
case "$file" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.css|*.md)
    command -v prettier >/dev/null 2>&1 && prettier --write "$file" >/dev/null 2>&1 || true ;;
  *.py)
    command -v ruff >/dev/null 2>&1 && ruff format "$file" >/dev/null 2>&1 || \
    command -v black >/dev/null 2>&1 && black "$file" >/dev/null 2>&1 || true ;;
  *.go)
    command -v gofmt >/dev/null 2>&1 && gofmt -w "$file" >/dev/null 2>&1 || true ;;
  *.rs)
    command -v rustfmt >/dev/null 2>&1 && rustfmt "$file" >/dev/null 2>&1 || true ;;
esac

exit 0
