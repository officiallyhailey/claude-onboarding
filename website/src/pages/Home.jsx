import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { phases } from "../data/phases";
import { packageTree } from "../data/trees";
import { openedPhases } from "../lib/opened";
import FileTree from "../components/FileTree";
import Blocks from "../components/Blocks";

function Home() {
    const [opened, setOpened] = useState(() => openedPhases());

    // Re-read on focus, so coming back from a phase updates the count without
    // a reload.
    useEffect(() => {
        const sync = () => setOpened(openedPhases());
        window.addEventListener("focus", sync);
        return () => window.removeEventListener("focus", sync);
    }, []);

    const done = phases.filter((p) => opened.includes(p.slug)).length;

    return (
        <>
            <div className="hero">
                <div className="kicker">A complete onboarding package</div>
                <h1>Four phases, from writing code to running a system.</h1>
                <p>
                    A path for a developer to go from writing code to running a full agentic system.
                </p>
            </div>

            {/* Progress is shown, not stated, and it is the first thing after the
                title. The ring gives the feeling and the fraction gives the
                fact, which is why both are here and neither would do alone.

                Only once something has been opened: "0 of 4" on a first visit is
                a scoreboard nobody asked for. It counts opens rather than
                completions, because that is the only thing this browser knows. */}
            {done > 0 && (
                <div className="progress">
                    <span className={`ring q${done}`} aria-hidden="true" />
                    <div>
                        <div className="big">
                            {done}
                            <span>/{phases.length}</span>
                        </div>
                        <div className="lab">
                            {done === phases.length ? "All four phases opened" : "Phases opened"}
                        </div>
                    </div>
                </div>
            )}

            <div className="pick">
                <h2>The four phases</h2>
                <div className="cards">
                    {phases.map((p) => (
                        <Link className="card" to={`/phase/${p.slug}`} key={p.slug}>
                            {/* A rounded square, not a circle, and mono. A circle
                                would read as an avatar and sans would make the
                                number look like a heading. This is the one place
                                a card is allowed to look mechanical, and with no
                                accent colour left it is also what tells the four
                                phases apart at a glance. */}
                            <span className="n">{`0${p.n}`}</span>
                            <h3>{p.title}</h3>
                            <p>{p.blurb}</p>
                            <div className="tags">
                                <span className="chip">{p.kind}</span>
                                {opened.includes(p.slug) && <span className="chip">opened</span>}
                            </div>
                            <div className="go">
                                Read it
                                <span className="arr" aria-hidden="true">
                                    &rarr;
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <Link className="wide-card" to="/appendix">
                    <div>
                        <h3>Appendix</h3>
                        <p>
                            Every defined word in one list, every file in one map, and the eleven points
                            that could not be fully verified against Anthropic's documentation. This is
                            also where to look something up mid-task without rereading a phase.
                        </p>
                    </div>
                    <span className="arr" aria-hidden="true">
                        &rarr;
                    </span>
                </Link>

                <h2>How the phases fit together</h2>
                <Blocks
                    blocks={[
                        {
                            t: "p",
                            x: "Phase 1 is understanding. Phases 2 and 3 are setup, done once. Phase 4 is the daily practice, repeated forever. The order is not a presentation choice: you cannot introduce yourself before you know the pieces, and you cannot implement systems before your machine knows who you are.",
                        },
                        {
                            t: "table",
                            head: ["Phase", "Answers", "Installs"],
                            rows: [
                                [
                                    "1. Understanding Claude",
                                    "What are all the pieces, and when do I use each?",
                                    "Nothing",
                                ],
                                [
                                    "2. Introducing Yourself",
                                    "How do I tell Claude who I am, so every session knows?",
                                    "The context kit, at ~/claude-context",
                                ],
                                [
                                    "3. Implementing Your Systems",
                                    "How do I install the skills, agents, hooks, and workflows I work with?",
                                    "The workflow kit, into ~/.claude",
                                ],
                                [
                                    "4. Working Together",
                                    "How do I actually work with Claude well, day to day?",
                                    "Nothing. Habits",
                                ],
                            ],
                        },
                        {
                            t: "note",
                            kind: "rule",
                            lab: "The two kits are two different layers",
                            x: [
                                "Phase 2 is the [[context layer]]: who you are. Identity, the memory that loads into every session, your roles, your brand. It installs to a private, git-ignored ~/claude-context.",
                                "Phase 3 is the [[procedures layer]]: how you work. Skills, subagents, hooks, and dynamic workflows, installed into ~/.claude.",
                                "They interlock. The Phase 3 skills read from the Phase 2 context and write back to it. That is why Phase 2 comes first.",
                            ],
                        },
                        {
                            t: "sub",
                            x: "Install order",
                        },
                        {
                            t: "shell",
                            x: `# Phase 2: introduce yourself (context)
cd phase-2-introducing-yourself
./setup.sh --dry-run      # preview
./setup.sh                # install

# Phase 3: implement your systems (procedures)
cd ../phase-3-implementing-your-systems
./setup-dev.sh --dry-run  # preview
./setup-dev.sh            # install`,
                        },
                        {
                            t: "p",
                            x: "Or run both from the package root with `./install-all.sh`. Both installers are additive and [[no-clobber]]: they never overwrite files you have filled in, they back up CLAUDE.md before touching it, and they are safe to re-run.",
                        },
                    ]}
                />

                <h2>What is in the box</h2>
                <FileTree tree={packageTree} />

                <Blocks
                    blocks={[
                        { t: "sub", x: "Adopting into an existing setup" },
                        {
                            t: "p",
                            x: "If you already have a ~/.claude with memory and skills, you are not starting over. The installers layer onto what you have, and Phase 2 covers migrating existing memory into the new homes: move, then trim, so nothing loads twice. Your existing skills are not touched; you index them in the router.",
                        },
                    ]}
                />
            </div>
        </>
    );
}

export default Home;
