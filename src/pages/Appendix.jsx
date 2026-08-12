import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { glossaryList } from "../data/terms";
import { fileMap, ALL_TREES } from "../data/trees";
import { VERIFICATION } from "../data/verification";
import SectionNav from "../components/SectionNav";
import FileTree from "../components/FileTree";
import Vocab from "../components/Vocab";
import Blocks from "../components/Blocks";
import { mono } from "../lib/richText";

// The appendix.
//
// Three lookups and one caveat list. The point of this page is that it is the
// one you open mid-task, so nothing on it assumes you have read a phase, and
// both of the long lists filter.
//
// The glossary and the file map are not written here. They are the same objects
// the phases render from: data/terms.js is what makes a word hoverable, and the
// trees are what draw the directory listings. Rendering them again as lists
// costs nothing and guarantees the two can never disagree.

const SECTIONS = [
    { id: "glossary", num: "01", title: "Glossary" },
    { id: "filemap", num: "02", title: "File map" },
    { id: "trees", num: "03", title: "Every tree" },
    { id: "verification", num: "04", title: "Verification notes" },
    { id: "sources", num: "05", title: "Sources" },
];

function Glossary() {
    const [q, setQ] = useState("");
    const all = useMemo(() => glossaryList(), []);

    const hits = useMemo(() => {
        const needle = q.trim().toLowerCase();
        if (!needle) return all;
        return all.filter(
            (e) =>
                e.label.toLowerCase().includes(needle) ||
                e.def.toLowerCase().includes(needle) ||
                (e.note || "").toLowerCase().includes(needle)
        );
    }, [q, all]);

    return (
        <>
            <div className="fmfilter">
                <input
                    type="search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Filter the glossary"
                    aria-label="Filter the glossary"
                />
                <span className="count">
                    {hits.length} of {all.length}
                </span>
            </div>
            <div className="filemap">
                {hits.map((e) => (
                    <div className="fmrow" key={e.key}>
                        <div className="fmpath">{e.label}</div>
                        <div className="fmdef">
                            {mono(e.def)}
                            {e.note && <span className="fmnote">{mono(e.note)}</span>}
                        </div>
                    </div>
                ))}
                {hits.length === 0 && (
                    <div className="fmrow">
                        <div className="fmpath">no match</div>
                        <div className="fmdef">
                            Nothing in the glossary matches that. It may be a word the package uses
                            without defining, which is worth adding to data/terms.js.
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

function FileMap() {
    const [q, setQ] = useState("");
    const all = useMemo(() => fileMap(), []);

    const hits = useMemo(() => {
        const needle = q.trim().toLowerCase();
        if (!needle) return all;
        return all.filter(
            (e) =>
                e.path.toLowerCase().includes(needle) ||
                (e.def || "").toLowerCase().includes(needle) ||
                (e.note || "").toLowerCase().includes(needle)
        );
    }, [q, all]);

    return (
        <>
            <div className="fmfilter">
                <input
                    type="search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Filter by path, for example: memory, hook, stack"
                    aria-label="Filter the file map"
                />
                <span className="count">
                    {hits.length} of {all.length}
                </span>
            </div>
            <div className="filemap">
                {hits.map((e, i) => (
                    <div className="fmrow" key={`${e.path}-${i}`}>
                        <div className="fmpath">
                            {e.path}
                            {e.dir && !e.path.endsWith("/") && <span className="dirmark">/</span>}
                            {/* Which tree this row came from. A path can appear
                                twice, once in the whole-machine map and once in
                                the kit's own tree, and the two carry different
                                answers because they are drawn for different
                                questions. Naming the source is cheaper than
                                pretending the duplicate is a mistake. */}
                            <span className="fmsrc">{e.source}</span>
                        </div>
                        <div className="fmdef">
                            {mono(e.def)}
                            {e.note && <span className="fmnote">{mono(e.note)}</span>}
                        </div>
                    </div>
                ))}
                {hits.length === 0 && (
                    <div className="fmrow">
                        <div className="fmpath">no match</div>
                        <div className="fmdef">No path on this site contains that.</div>
                    </div>
                )}
            </div>
        </>
    );
}

function Appendix() {
    return (
        <div className="doc">
            <SectionNav sections={SECTIONS} />

            <main>
                <div className="doc-head">
                    <Link to="/" className="back">
                        <span aria-hidden="true">&larr;</span> All four phases
                    </Link>
                    <div className="num">Appendix</div>
                    <h1>Look it up</h1>
                    <p className="lede">
                        Every defined word, every file, every tree, and the points that could not be
                        fully verified. Nothing here assumes you have read a phase.
                    </p>
                </div>

                <section className="block" id="glossary">
                    <h2>01 · Glossary</h2>
                    <h3 className="h">What does this word mean?</h3>
                    <Blocks
                        blocks={[
                            {
                                t: "thesis",
                                x: "The same entries that make a word hoverable in the prose. If a term is underlined anywhere on this site, it is in this list, with the same definition.",
                            },
                            {
                                t: "p",
                                x: "The first line of each entry is what the word means on its own. The second, where there is one, is what it means inside this package: which phase it turns up in, or the consequence people keep getting caught by.",
                            },
                        ]}
                    />
                    <Glossary />
                </section>

                <section className="block" id="filemap">
                    <h2>02 · File map</h2>
                    <h3 className="h">What is this file for?</h3>
                    <Blocks
                        blocks={[
                            {
                                t: "thesis",
                                x: "Every path drawn anywhere on this site, flattened into one list, so a file can be looked up by name when you cannot remember which tree it came from.",
                            },
                            {
                                t: "p",
                                x: "This is the same data the trees render from. A row here and the matching row in a tree are the same object, so they cannot drift apart.",
                            },
                        ]}
                    />
                    <FileMap />
                </section>

                <section className="block" id="trees">
                    <h2>03 · Every tree</h2>
                    <h3 className="h">All six layouts in one place</h3>
                    <Blocks
                        blocks={[
                            {
                                t: "thesis",
                                x: "The directory layouts from all four phases, collected. Hover or tap any row for what that file or directory is for.",
                            },
                        ]}
                    />
                    {ALL_TREES.map(({ id, label, tree }) => (
                        <div key={id}>
                            <h4 className="sub">{label}</h4>
                            <FileTree tree={tree} />
                        </div>
                    ))}
                </section>

                <section className="block" id="verification">
                    <h2>04 · Verification notes</h2>
                    <h3 className="h">What could not be fully confirmed</h3>
                    <Blocks
                        blocks={[
                            {
                                t: "thesis",
                                x: "Everything in this package was checked against Anthropic's official documentation in August 2026. These points are flagged because they could not be fully confirmed, because the official sources disagree with each other, or because they rest on outside research whose numbers should not be carried further than the study that produced them.",
                            },
                            {
                                t: "p",
                                x: "They are collected here rather than left as footnotes because a reader deciding whether to rely on something needs to find the caveat without having read the page it belongs to.",
                            },
                        ]}
                    />
                    <Vocab items={VERIFICATION} />
                </section>

                <section className="block" id="sources">
                    <h2>05 · Sources</h2>
                    <h3 className="h">Everything this was checked against</h3>
                    <Blocks
                        blocks={[
                            {
                                t: "sources",
                                items: [
                                    [
                                        "Agent Skills overview",
                                        "https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview",
                                    ],
                                    [
                                        "Skill authoring best practices",
                                        "https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices",
                                    ],
                                    [
                                        "Claude prompting best practices",
                                        "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices",
                                    ],
                                    ["Claude Code: sub-agents", "https://code.claude.com/docs/en/sub-agents"],
                                    ["Claude Code: skills", "https://code.claude.com/docs/en/skills"],
                                    [
                                        "Claude Code: dynamic workflows",
                                        "https://code.claude.com/docs/en/workflows",
                                    ],
                                    ["Claude Code: routines", "https://code.claude.com/docs/en/routines"],
                                    [
                                        "Claude Code: scheduled tasks",
                                        "https://code.claude.com/docs/en/scheduled-tasks",
                                    ],
                                    ["Claude Code: memory", "https://code.claude.com/docs/en/memory"],
                                    ["Claude Code: hooks", "https://code.claude.com/docs/en/hooks"],
                                    ["Claude Code: plugins", "https://code.claude.com/docs/en/plugins"],
                                    [
                                        "Steering Claude Code",
                                        "https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more",
                                    ],
                                    [
                                        "Get started with Claude Cowork",
                                        "https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork",
                                    ],
                                    [
                                        "Cowork architecture overview",
                                        "https://support.claude.com/en/articles/14479288-claude-cowork-architecture-overview",
                                    ],
                                    [
                                        "Schedule recurring tasks in Cowork",
                                        "https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork",
                                    ],
                                    [
                                        "What are Skills?",
                                        "https://support.claude.com/en/articles/12512176-what-are-skills",
                                    ],
                                    [
                                        "Use plugins in Claude",
                                        "https://support.claude.com/en/articles/13837440-use-plugins-in-claude",
                                    ],
                                    ["Cowork product page", "https://claude.com/product/cowork"],
                                    ["agentskills.io", "https://agentskills.io"],
                                    ["agents.md", "https://agents.md"],
                                    ["modelcontextprotocol.io", "https://modelcontextprotocol.io"],
                                ],
                            },
                        ]}
                    />
                </section>

                <nav className="pager">
                    <Link to="/phase/working-together">
                        <span className="lab">Previous</span>
                        <span className="ttl">Phase 04 · Working Together</span>
                    </Link>
                    <Link to="/">
                        <span className="lab">Back to</span>
                        <span className="ttl">All four phases</span>
                    </Link>
                </nav>
            </main>
        </div>
    );
}

export default Appendix;
