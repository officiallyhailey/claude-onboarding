#!/usr/bin/env bash
#
# Packs the contents of phases/ into the zip files the site offers for download,
# and writes a manifest the download buttons read for their sizes.
#
# This runs before every dev server and every build, so the downloads are always
# the phases/ tree as it stands rather than a second copy that has to be kept in
# step by hand.
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="${ROOT}/phases"
OUT="${ROOT}/public/downloads"

# The folder name a reader ends up with after unzipping the whole package. The
# guides say `cd phase-2-introducing-yourself`, so the per-phase zips keep their
# own directory names and only this one is chosen here.
FULL="claude-onboarding"

rm -rf "${OUT}"
mkdir -p "${OUT}"

STAGE="$(mktemp -d)"
trap 'rm -rf "${STAGE}"' EXIT

# -X drops the extended attributes macOS would otherwise store, which are noise
# on any other machine. Unix permissions are kept, which is what carries the
# executable bit on the installers.
ZIP=(zip -qr -X)
EXCLUDE=(-x '*/.DS_Store' '*/__MACOSX/*' '*/node_modules/*')

cp -R "${SRC}" "${STAGE}/${FULL}"
(cd "${STAGE}" && "${ZIP[@]}" "${OUT}/${FULL}.zip" "${FULL}" "${EXCLUDE[@]}")

(cd "${SRC}" && "${ZIP[@]}" "${OUT}/phase-2-context-kit.zip" \
    "phase-2-introducing-yourself" "${EXCLUDE[@]}")

(cd "${SRC}" && "${ZIP[@]}" "${OUT}/phase-3-workflow-kit.zip" \
    "phase-3-implementing-your-systems" "${EXCLUDE[@]}")

# Sizes are read by the download buttons. A reader deciding whether to pull a
# file down wants to know how big it is before they click, and the number cannot
# be written by hand without going stale the first time a phase gains a skill.
size() { wc -c <"${OUT}/$1" | tr -d ' '; }

cat >"${OUT}/manifest.json" <<JSON
{
  "${FULL}.zip": $(size "${FULL}.zip"),
  "phase-2-context-kit.zip": $(size "phase-2-context-kit.zip"),
  "phase-3-workflow-kit.zip": $(size "phase-3-workflow-kit.zip")
}
JSON

echo "downloads written to public/downloads:"
ls -lh "${OUT}" | tail -n +2 | awk '{printf "  %-32s %s\n", $9, $5}'
