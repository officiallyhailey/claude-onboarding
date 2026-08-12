import { NavLink } from "react-router-dom";
import { DESTINATIONS } from "../data/nav";

// The bottom tab bar, below 900px.
//
// The one piece of persistent furniture in the theme, because a returning
// reader navigates by reflex and reflexes live at the bottom of the screen. It
// is `sticky` rather than `fixed` so it participates in the layout and cannot
// cover the last row: a fixed bar over a scrolling page eats content unless
// space is reserved for it, and sticky avoids the bookkeeping entirely.
//
// The active icon gets a filled pill behind it as well as the brightest ink.
// Position alone would be doing too much work: the inactive label is this
// theme's weakest value, and it holds up only because every tab also carries an
// icon and a fixed place. NavLink sets aria-current="page" on the active one by
// itself, which matters more here than usual, since the visible state is a tone
// step and a brightness and a screen reader can perceive neither.

function TabBar() {
    return (
        <nav className="tabs" aria-label="Sections">
            {DESTINATIONS.map((d) => (
                <NavLink
                    key={d.to}
                    to={d.to}
                    end={d.end}
                    title={d.full}
                    className={({ isActive }) => (isActive ? "on" : "")}
                >
                    <span className="puck">{d.icon}</span>
                    {/* `short` where there is one: seven destinations across a
                        375px phone, and the icon above already says which
                        phase this is. The full name stays in the title. */}
                    <span>{d.short || d.label}</span>
                </NavLink>
            ))}
        </nav>
    );
}

export default TabBar;
