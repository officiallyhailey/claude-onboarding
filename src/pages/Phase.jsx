import { Link, useParams } from "react-router-dom";
import { findPhase, neighbours } from "../data/phases";
import Blocks from "../components/Blocks";
import SectionNav from "../components/SectionNav";
import NotFound from "./NotFound";

// Scrolling to the top on arrival is handled once in App.jsx, for every route.

function Phase() {
    const { slug } = useParams();
    const phase = findPhase(slug);

    if (!phase) return <NotFound />;

    const { prev, next } = neighbours(slug);

    return (
        <div className="doc">
            <SectionNav sections={phase.sections} />

            <main>
                <div className="doc-head">
                    <Link to="/" className="back">
                        <span aria-hidden="true">&larr;</span> All four phases
                    </Link>
                    <div className="num">{`Phase 0${phase.n} · ${phase.kind}`}</div>
                    <h1>{phase.title}</h1>
                    <p className="lede">{phase.lede}</p>
                    <p className="stamp">{phase.stamp}</p>
                </div>

                {phase.sections.map((s) => (
                    <section className="block" id={s.id} key={s.id}>
                        <h2>{`${s.num} · ${s.title}`}</h2>
                        <h3 className="h">{s.heading}</h3>
                        <Blocks blocks={s.blocks} />
                    </section>
                ))}

                <nav className="pager">
                    {prev ? (
                        <Link to={`/phase/${prev.slug}`}>
                            <span className="lab">Previous</span>
                            <span className="ttl">{`Phase 0${prev.n} · ${prev.title}`}</span>
                        </Link>
                    ) : (
                        <Link to="/">
                            <span className="lab">Back to</span>
                            <span className="ttl">All four phases</span>
                        </Link>
                    )}
                    {next ? (
                        <Link to={`/phase/${next.slug}`}>
                            <span className="lab">Next</span>
                            <span className="ttl">{`Phase 0${next.n} · ${next.title}`}</span>
                        </Link>
                    ) : (
                        <Link to="/appendix">
                            <span className="lab">Next</span>
                            <span className="ttl">Appendix: glossary, file map, caveats</span>
                        </Link>
                    )}
                </nav>
            </main>
        </div>
    );
}

export default Phase;
