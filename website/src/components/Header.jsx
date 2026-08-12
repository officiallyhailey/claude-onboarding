import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { DESTINATIONS } from "../data/nav";
import ClaudeMark from "./ClaudeMark";
import { readTheme, applyTheme } from "../lib/theme";

// The top bar. Sticky, not fixed: fixed takes it out of flow and the content
// then needs a matching top padding kept in step by hand.
//
// The destinations are hidden below 900px, where TabBar renders the same list
// along the bottom instead. Both read from data/nav.jsx.

function Header() {
    const [theme, setTheme] = useState(() => readTheme());

    const flip = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        applyTheme(next);
    };

    return (
        <header className="masthead">
            <div className="inner">
                <Link to="/" className="brand">
                    {/* The one place ink and field swap over, which is what makes
                        it read as a mark rather than as another chip. */}
                    <span className="mark">
                        <ClaudeMark size={17} />
                    </span>
                    <span className="wordmark">Claude for Junior Developers</span>
                </Link>

                <nav aria-label="Sections">
                    {DESTINATIONS.map((d) => (
                        <NavLink
                            key={d.to}
                            to={d.to}
                            end={d.end}
                            className={({ isActive }) => (isActive ? "on" : "")}
                            title={d.full}
                        >
                            {d.label}
                        </NavLink>
                    ))}
                </nav>

                <button
                    className="icobtn"
                    onClick={flip}
                    title={theme === "dark" ? "Switch to light" : "Switch to dark"}
                    aria-label={theme === "dark" ? "Switch to light" : "Switch to dark"}
                >
                    {theme === "dark" ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="4.2" />
                            <path d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20.5 14.6A8.6 8.6 0 1 1 9.4 3.5a7 7 0 0 0 11.1 11.1z" />
                        </svg>
                    )}
                </button>
            </div>
        </header>
    );
}

export default Header;
