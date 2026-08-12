import { rich } from "../lib/richText";
import { usePop } from "../lib/usePop";
import Popover from "./Popover";

// A callout, in its two forms.
//
// WHERE THERE IS A MARGIN, it is a margin note: the full text sitting in the
// third column beside the paragraph it belongs to, interrupting nothing. That
// is only true inside the reading shell at 1180px and up.
//
// EVERYWHERE ELSE it collapses to a single line: an icon and the label, opening
// the full text in the same popover the glossary words use. This covers two
// different situations that look the same to a reader.
//
//   - A narrow window, where there is no third column to float into.
//   - A full-width container with no margin column at all, like the landing
//     page, where a float would have no column to land in.
//
// Collapsing rather than falling back to the full block in the flow is the
// point: a caveat that costs one line until it is asked for is what the margin
// was buying in the first place, and the collapsed form buys it at every width.
//
// BOTH FORMS ARE RENDERED and CSS picks one. A JS breakpoint and a CSS
// breakpoint drift the moment either is edited, and the deciding factor here is
// not really the window width but whether this note's container reserves a
// margin, which CSS knows and JS would have to be told. `display: none` keeps
// the unused one out of the accessibility tree, so nothing is announced twice.

const glyph = (d) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        {d}
    </svg>
);

const GLYPHS = {
    // A warning cannot be a colour of its own in this palette, so it is a
    // shape: the one triangle on the site.
    warn: glyph(
        <>
            <path d="M12 3.8 21 19.5H3z" />
            <path d="M12 10v4.2M12 17.3v.1" />
        </>
    ),
    // A standing rule is a pin: this one is fixed and does not move.
    rule: glyph(
        <>
            <path d="M12 21v-7" />
            <path d="M8.4 3h7.2l-1 5.4 2.4 2.3v1.6H6v-1.6l2.4-2.3z" />
        </>
    ),
    note: glyph(
        <>
            <circle cx="12" cy="12" r="8.6" />
            <path d="M12 11.2v5M12 7.9v.1" />
        </>
    ),
};

function Note({ kind, lab, paras }) {
    const { ref, showing, pinned, pos, handlers } = usePop();
    const icon = GLYPHS[kind] || GLYPHS.note;
    const label = lab || "Aside";

    return (
        <>
            {/* the margin form */}
            <aside className={`note${kind ? ` ${kind}` : ""}`}>
                <div className="lab">
                    {icon}
                    {label}
                </div>
                {paras.map((para, i) => (
                    <p key={i}>{rich(para)}</p>
                ))}
            </aside>

            {/* the collapsed form */}
            <span className={`notepin${kind ? ` ${kind}` : ""}`} ref={ref}>
                <button
                    type="button"
                    className={`pinbtn${showing ? " on" : ""}`}
                    aria-expanded={showing}
                    {...handlers}
                >
                    <span className="pinico">{icon}</span>
                    <span className="pinlab">{label}</span>
                </button>
                {showing && (
                    <Popover pos={pos} kind={kind || "note"} label={label} pinned={pinned}>
                        {paras.map((para, i) => (
                            <span className="pop-para" key={i}>
                                {rich(para)}
                            </span>
                        ))}
                    </Popover>
                )}
            </span>
        </>
    );
}

export default Note;
