import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DESTINATIONS } from "../data/nav";
import { readingLine } from "../lib/scroll";

// The section nav, in its two forms.
//
// Above 1180px it is a rail down the left. Below that there is no room for a
// column, so it becomes a floating list button in the bottom-right corner that
// opens the same list as a popup. Both are built from one array and share the
// scroll behaviour, so they cannot disagree about where you are.
//
// The popup is the DevBricks stack-page pattern: a 52px circle with a list
// glyph, a panel that grows from the bottom-right corner, dismissed by a click
// outside, by Escape, or by choosing a section. Escape returns focus to the
// button, because a popup that closes and leaves focus nowhere strands anyone
// navigating by keyboard.
//
// The offset below is used twice, and that is why it is a function: it is where
// a section lands when you pick it, and it is also the line the current-section
// test measures against, so choosing a row always lights that row rather than
// the one after it.

// readingLine lives in lib/scroll.js because the landing page needs the same
// measurement to centre its phase list, and two copies of it would drift.

function SectionNav({ sections }) {
    const [here, setHere] = useState(sections[0]?.id);
    const [open, setOpen] = useState(false);
    const listRef = useRef(null);
    const btnRef = useRef(null);
    const popRef = useRef(null);

    // The page before and after this one, taken from the same list the top bar
    // and the tab bar are built from, so the three can never disagree about
    // what order the site is in. Sections move you within a page; these two
    // move you between pages, and both belong in the one control a reader
    // reaches for when they want to be somewhere else.
    const { pathname } = useLocation();
    const at = DESTINATIONS.findIndex((d) => d.to === pathname);
    const prev = at > 0 ? DESTINATIONS[at - 1] : null;
    const next = at >= 0 && at < DESTINATIONS.length - 1 ? DESTINATIONS[at + 1] : null;

    const pick = useCallback(() => {
        const line = readingLine();

        // The last section whose top has passed the line, rather than the one
        // nearest it. Nearest breaks in both directions: deep inside a long
        // section its own top is far above the line while the next section's
        // top is closer, even though the next one is still off the bottom of
        // the screen.
        let best = sections[0]?.id;
        for (const s of sections) {
            const el = document.getElementById(s.id);
            if (!el) continue;
            if (el.getBoundingClientRect().top <= line + 1) best = s.id;
        }

        // The last section is usually too short to reach the line, so without
        // this it could never become current however far you scrolled.
        const bottom = window.scrollY + window.innerHeight;
        if (bottom >= document.body.scrollHeight - 8) {
            best = sections[sections.length - 1]?.id || best;
        }

        setHere(best);
    }, [sections]);

    useEffect(() => {
        pick();
        window.addEventListener("scroll", pick, { passive: true });
        window.addEventListener("resize", pick);
        return () => {
            window.removeEventListener("scroll", pick);
            window.removeEventListener("resize", pick);
        };
    }, [pick]);

    // On a long list the rail scrolls inside itself, so the current row can end
    // up out of sight. This nudges the rail's own scrollTop and nothing else.
    //
    // It is written this way rather than with scrollIntoView because below
    // 1180px the rail is display:none, and asking a box that was never laid out
    // to scroll itself into view is at best a no-op and at worst a jump to the
    // top of the document. Touching only the container's scrollTop cannot move
    // the page at any width, whatever is or is not rendered.
    useEffect(() => {
        const list = listRef.current;
        if (!list || !list.getClientRects().length) return;
        const rail = list.closest(".rail");
        const el = list.querySelector(".on");
        if (!rail || !el) return;

        const r = rail.getBoundingClientRect();
        const e = el.getBoundingClientRect();
        const pad = 8;
        if (e.top < r.top) rail.scrollTop -= r.top - e.top + pad;
        else if (e.bottom > r.bottom) rail.scrollTop += e.bottom - r.bottom + pad;
    }, [here]);

    // pointerdown rather than click, so the popup is already gone by the time
    // the press lands on whatever was underneath it.
    useEffect(() => {
        if (!open) return;
        const away = (e) => {
            if (popRef.current?.contains(e.target)) return;
            if (btnRef.current?.contains(e.target)) return;
            setOpen(false);
        };
        const esc = (e) => {
            if (e.key === "Escape") {
                setOpen(false);
                btnRef.current?.focus();
            }
        };
        window.addEventListener("pointerdown", away, { passive: true });
        window.addEventListener("keydown", esc);
        return () => {
            window.removeEventListener("pointerdown", away);
            window.removeEventListener("keydown", esc);
        };
    }, [open]);

    const go = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = window.scrollY + el.getBoundingClientRect().top - readingLine();
        const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: Math.max(0, top), behavior: still ? "auto" : "smooth" });
        // Light the row now rather than waiting for the scroll to arrive. A
        // smooth scroll over a long page takes long enough that the choice
        // would otherwise feel like it had missed.
        setHere(id);
        setOpen(false);
    };

    const rows = sections.map((s) => (
        <li key={s.id}>
            <button
                type="button"
                className={here === s.id ? "on" : ""}
                aria-current={here === s.id ? "true" : undefined}
                onClick={() => go(s.id)}
            >
                <span className="rnum">{s.num}</span>
                <span>{s.title}</span>
            </button>
        </li>
    ));

    return (
        <>
            {/* the column, from 1180px up */}
            <nav className="rail" aria-label="Sections of this page">
                <div className="raillab">On this page</div>
                <ol ref={listRef}>{rows}</ol>
            </nav>

            {/* The popup, at every width. It used to be the rail's small-screen
                stand-in; it now also carries the previous and next page, which
                the rail does not, so it earns its place beside the rail rather
                than only in place of it. */}
            <button
                type="button"
                className="tocbtn"
                ref={btnRef}
                aria-expanded={open}
                aria-controls="section-popup"
                aria-label="Jump to a section"
                title="Jump to a section"
                onClick={() => setOpen((o) => !o)}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M4 6h16M4 12h16M4 18h10" />
                </svg>
            </button>

            <nav
                className={`tocpop${open ? " open" : ""}`}
                id="section-popup"
                ref={popRef}
                aria-label="Sections of this page"
            >
                <div className="raillab">On this page</div>
                <ol>{rows}</ol>

                {(prev || next) && (
                    <div className="tocpage">
                        {prev && (
                            <Link className="tp" to={prev.to} onClick={() => setOpen(false)}>
                                <span className="tplab">
                                    <span aria-hidden="true">&larr;</span> Previous
                                </span>
                                <span className="tpname">{prev.full}</span>
                            </Link>
                        )}
                        {next && (
                            <Link className="tp" to={next.to} onClick={() => setOpen(false)}>
                                <span className="tplab">
                                    Next <span aria-hidden="true">&rarr;</span>
                                </span>
                                <span className="tpname">{next.full}</span>
                            </Link>
                        )}
                    </div>
                )}
            </nav>
        </>
    );
}

export default SectionNav;
