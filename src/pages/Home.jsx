import { Link } from "react-router-dom";
import { phases } from "../data/phases";

// The landing page.
//
// Deliberately the shortest page on the site. Everything that used to sit under
// the phase list, how the phases fit together, what is in the box, adopting
// into an existing setup, is now on /setup, which is where a reader is when any
// of it matters. A landing page that explains the whole package before you have
// agreed to read it is a table of contents with a headline on top.
//
// The atmosphere is rendered here rather than in App.jsx so it unmounts the
// moment you open a phase. A reading page wants the plain field; weather behind
// six thousand words of documentation is just a legibility problem.

function Home() {
    return (
        <>
            <div className="sky" aria-hidden="true">
                <span className="b1" />
                <span className="b2" />
                <span className="b3" />
            </div>

            <svg className="grain" aria-hidden="true">
                <filter id="mist">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.0055"
                        numOctaves="5"
                        seed="11"
                    />
                    <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.52  0 0 0 0 0.5  0 0 0 -1.1 0.92" />
                    <feGaussianBlur stdDeviation="7" />
                </filter>
                <rect width="100%" height="100%" filter="url(#mist)" />
            </svg>

            <div className="settle" aria-hidden="true" />

            <div className="landing">
                <div className="lede-block">
                    <div className="kicker">A complete onboarding package</div>
                    <h1>
                        Four phases, from writing code to running <em>a system</em>.
                    </h1>
                    <p className="sell">
                        You already know how to build. This is the part nobody teaches: how to work
                        with an agent so it actually knows who you are and how you work.
                    </p>
                    <div className="cta">
                        <Link className="go" to="/phase/understanding-claude">
                            Start with Phase 1
                            <span aria-hidden="true">&rarr;</span>
                        </Link>
                        <Link className="ghost" to="/setup">
                            Or download the kits
                        </Link>
                    </div>
                </div>

                <div className="rows">
                    {phases.map((p) => (
                        <Link className="prow" to={`/phase/${p.slug}`} key={p.slug}>
                            <span className="pn">{`0${p.n}`}</span>
                            <span className="pt">{p.title}</span>
                            <span className="pd">{p.blurb}</span>
                            <span className="pk">{p.kind}</span>
                        </Link>
                    ))}
                </div>

                <p className="after">
                    Looking something up rather than reading it through? The{" "}
                    <Link to="/appendix">appendix</Link> has every defined word in one list and every
                    file in one map.
                </p>
            </div>
        </>
    );
}

export default Home;
