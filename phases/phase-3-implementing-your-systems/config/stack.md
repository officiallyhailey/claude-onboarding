# Stack config

<!--
PURPOSE: The single place your stack is defined, so every skill in this library
is stack-agnostic and reads its commands from here. Fill this in once. When you
switch stacks or projects with different tooling, update this file (or keep a
per-project copy and point the skill at it).

Installed to ~/claude-context/config/stack.md (private context store). Skills
reference it by that path. Keep the command names below stable; skills call them
by name.
-->

## Project defaults
- Primary language(s):
- Framework(s):
- Package manager:            (npm / pnpm / yarn / pip / poetry / cargo / go)
- Runtime / version:

## Named commands (fill in the real command for each)
- install:                    (e.g. pnpm install)
- dev:                        (e.g. pnpm dev)
- build:                      (e.g. pnpm build)
- test:                       (e.g. pnpm test)
- test-one:                   (how to run a single test file)
- lint:                       (e.g. pnpm lint)
- format:                     (e.g. pnpm format  /  prettier --write .)
- typecheck:                  (e.g. pnpm tsc --noEmit  /  mypy .)
- run-script:                 (how you run an arbitrary script)

## Quality gate (what "green" means before I trust "done")
<!-- The commands that must all pass. Skills use this as the definition of done. -->
- 
- 

## Conventions
- Branch naming:              (e.g. feat/<short>, fix/<short>)
- Commit style:               (e.g. conventional commits)
- Test file location/pattern:
- Where env/secrets live:     (and how they are loaded)

## Deploy
- Target:                     (Vercel / Fly / Render / container / other)
- Deploy command or trigger:
- Smoke check after deploy:
