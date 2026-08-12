#!/usr/bin/env bash
#
# Runs both phase installers in order: Phase 2 (context), then Phase 3 (procedures).
# Both are additive and no-clobber. Pass --dry-run to preview without changing anything.
#
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ARG="${1:-}"

echo "### Phase 2: Introducing Yourself (context) ###"
"${ROOT}/phase-2-introducing-yourself/setup.sh" ${ARG:+$ARG}

echo
echo "### Phase 3: Implementing Your Systems (procedures) ###"
"${ROOT}/phase-3-implementing-your-systems/setup-dev.sh" ${ARG:+$ARG}

echo
echo "Both phases processed."
echo "Next:"
echo "  1. Fill in ~/claude-context (see phase 2 guide) and config/stack.md (phase 3)."
echo "  2. Register the Phase 3 hooks in ~/.claude/settings.json."
echo "  3. Read phase 4 for how to work with it day to day."
