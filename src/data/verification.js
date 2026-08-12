// The verification notes.
//
// Eleven points that could not be fully confirmed against Anthropic's official
// documentation in August 2026, or where the official sources disagree with
// each other. They are in the appendix rather than in a footnote because a
// reader deciding whether to rely on something needs to be able to find the
// caveat without having read the page it belongs to.

export const VERIFICATION = [
    [
        "Script is not an independent primitive",
        "It is the code-bundling pattern inside a skill (scripts/) or a plugin (bin/), not a separate Anthropic product feature with its own file format. Phase 1 section 8 is written as a pattern rather than a feature for exactly this reason.",
    ],
    [
        "The Claude Code numbers are version-gated",
        "Sub-agent nesting depth (about three layers), concurrency (about twenty), and workflow caps (16 concurrent agents, 1,000 per run) are all explicitly version-gated in the docs. Treat them as version-dependent rather than as constants, and check your own version.",
    ],
    [
        "Skill description maximum length",
        "Platform docs say 1024 characters; a support article says 200. This is an unresolved conflict in Anthropic's own documentation. This site uses 1024 and flags it here.",
    ],
    [
        "SKILL.md against skill.md casing",
        "Platform docs say SKILL.md; one support article says skill.md. Unresolved. This site uses SKILL.md throughout.",
    ],
    [
        "Sub-agent delegation guidance",
        "In the delegate-when table in Phase 1 section 6, the first three rows are verbatim documented guidance. The parallel-investigation row is an inference from how isolated contexts behave, and it is marked as such inline on that page.",
    ],
    [
        "Which plans include Skills",
        "Support docs list Free through Enterprise; platform docs say Pro, Max, Team and Enterprise. Because the two disagree, this site avoids stating a plan list for skills at all.",
    ],
    [
        "Cowork launch date and original announcement",
        "The original research-preview announcement no longer resolves. This site cites the current product and support pages only.",
    ],
    [
        "Invoking Cowork scheduled tasks",
        "A /schedule command is mentioned in one support article but absent from the dedicated scheduling article. This site describes scheduled tasks without naming an invocation command. Note that /schedule in the Claude Code CLI creates a routine, which is a different thing.",
    ],
    [
        "Claude Chat Styles",
        "No longer has a dedicated support article; the personalisation article now documents Skills in its place. Deliberately not taught anywhere in this package.",
    ],
    [
        "Routines",
        "Documented as a research preview. Behaviour and availability may change, so re-verify before relying on one or teaching it to someone else.",
    ],
    [
        "The cross-platform product names",
        "Verified against vendor docs in August 2026, but this area changes fast. Several items in that table are recently renamed or recently deprecated. Re-verify before republishing any of it.",
    ],
];
