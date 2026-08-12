---
name: deploy-check
description: Runs a pre-deploy checklist so a release does not ship broken, and confirms health after deploy. Use when the user says "deploy", "ship to prod", "release", or "push live".
---

# Deploy check

The cost of a bad deploy is highest here, so this is a checklist, not a vibe.

## Read first
- `~/claude-context/config/stack.md` for the deploy target, deploy command, and smoke check.

## Pre-deploy checklist
1. Quality gate green on the exact commit being deployed.
2. Migrations, if any, are reversible and have been reviewed (delegate to `dep-auditor` or `code-reviewer` for risky ones).
3. Env vars and secrets required by this release exist in the target, and are not committed.
4. A rollback path is known and stated in one sentence.
5. Nothing in the diff is a debug/temporary change (no leftover logging of secrets, no test bypasses).

## Deploy and verify
6. Deploy with the command/trigger from stack.md.
7. Run the smoke check from stack.md against the live target.
8. Watch for errors for a few minutes; if the smoke check fails, roll back immediately, do not debug in prod.

## Definition of done
- Deployed, smoke check passed, rollback path known, no secrets or debug code shipped.

## Hand-offs
- Log the release and any incident via `learn-log`.
