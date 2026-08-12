// Dynamic workflow: find and triage every TODO/FIXME/HACK in the repo.
//
// One agent collects the comments, then one agent per comment classifies it, and
// the result comes back sorted by priority. Good for turning a pile of scattered
// code notes into an actionable, ranked list.
//
// Takes no args. Run it, then work the top of the list.

export const meta = {
  name: "triage-todos",
  description: "Finds every TODO, FIXME, and HACK comment in the repo and triages each into a category and priority, returning a priority-sorted list."
};

const hits = await agent(
  "Search the repo for TODO, FIXME, and HACK comments in source files. " +
  "Return each as file, line, and the comment text.",
  { schema: { items: [{ file: "string", line: "number", text: "string" }] }, label: "collect" }
);

const triaged = await pipeline((hits && hits.items) || [], (t) =>
  agent(
    `Triage this code comment: "${t.text}" (at ${t.file}:${t.line}). ` +
    `Classify category as one of bug, cleanup, feature, question. ` +
    `Set priority to high, med, or low. Add a one-line suggestion.`,
    {
      schema: { category: "string", priority: "string", suggestion: "string" },
      label: `${t.file}:${t.line}`
    }
  ).then((r) => ({ ...t, ...(r || {}) }))
);

const rank = { high: 0, med: 1, low: 2 };
return triaged
  .filter(Boolean)
  .sort((a, b) => (rank[a.priority] ?? 3) - (rank[b.priority] ?? 3));
