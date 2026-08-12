import { useRef } from "react";
import { Link } from "react-router-dom";
import { phases } from "../data/phases";
import { centreOn } from "../lib/scroll";

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
    const rows = useRef(null);

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
                        Best practice is to follow each phase, in order, each one building onto the
                        next. Start at the beginning, take it at your own pace, and you will end up
                        with a setup that fits the way you already work and learn how to make
                        changes as your journey with AI evolves.
                    </p>
                    <div className="cta">
                        {/* Scrolls rather than routes. The phase list is the next
                            thing on this page, so sending someone into Phase 1
                            from here skips the choice they came to make. */}
                        <button
                            type="button"
                            className="go"
                            onClick={() => centreOn(rows.current)}
                        >
                            View the phases
                            <span aria-hidden="true">&darr;</span>
                        </button>
                        <Link className="ghost" to="/setup">
                            Or download the kits
                        </Link>
                    </div>
                </div>

                <div className="rows" ref={rows}>
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
