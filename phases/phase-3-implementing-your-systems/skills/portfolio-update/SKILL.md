---
name: portfolio-update
description: Turns shipped work into portfolio and README material a hiring manager can skim, grounded only in what actually shipped. Use when the user says "update my portfolio", "add this to my README", "write up this project", or after a feature or project ships.
---

# Portfolio update

Shipping is only half the value for a junior dev; the other half is being able to show it. Ground every claim in real, shipped work.

## Read first
- The merged PR / commit and the project's `context.md`.
- `~/claude-context/identity/bios.md` and `~/claude-context/brand/*` for voice and links.
- `~/claude-context/roles/job-seeker/profile.md` so claims stay consistent and defensible.

## Steps
1. State what shipped in one sentence a non-engineer understands.
2. Add the engineer detail: the problem, your approach, the tradeoff you chose, and the result.
3. Link proof: the repo, the live demo, the PR. No proof means it does not go in.
4. Update the project README and, if relevant, the portfolio entry, in your brand voice.
5. If this demonstrates a skill worth claiming in interviews, add it to `roles/job-seeker/profile.md` with the proof link.
6. Never inflate. A defensible small claim beats an impressive one you cannot back up.

## Definition of done
- A skimmable write-up with a real proof link, in your voice, and the profile updated if warranted.

## Hand-offs
- Pulls lessons from `learn-log`.
- Pairs with `write-docs` for the project README.
