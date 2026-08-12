// Dynamic workflow: audit every file matching a glob for a stated concern.
//
// One agent lists the files, then one agent per file audits in parallel, and the
// findings come back combined and filtered. This is fan-out: more work than one
// conversation can track, run in the background (Doc 1 section 9).
//
// Run it and pass args, e.g.:
//   { "glob": "src/**/*.ts", "concern": "unhandled promise rejections" }
//
// Note: the schema shapes below follow the loose style in Doc 1 section 9. If your
// Claude Code version wants strict JSON Schema, adjust the schema objects.

export const meta = {
  name: "audit-repo",
  description: "Audits every file matching a glob for a stated concern, one agent per file, and returns a combined, severity-filtered findings list."
};

const glob = (args && args.glob) || "src/**/*";
const concern = (args && args.concern) || "bugs, security issues, or dead code";

const list = await agent(
  `List every file matching ${glob} in this repo. Return relative paths only.`,
  { schema: { files: ["string"] }, label: "collect" }
);

const perFile = await pipeline(list.files, (file) =>
  agent(
    `Read ${file} and report ONLY real instances of: ${concern}. ` +
    `For each, give the line, a severity (high/med/low), the issue, and a one-line fix. ` +
    `If there are none, return an empty findings list. Do not invent findings.`,
    {
      schema: { findings: [{ line: "number", severity: "string", issue: "string", fix: "string" }] },
      label: file
    }
  ).then((r) => ({ file, findings: (r && r.findings) || [] }))
);

return perFile
  .filter(Boolean)
  .flatMap((r) => r.findings.map((f) => ({ ...f, file: r.file })))
  .filter((f) => f.severity !== "low");
