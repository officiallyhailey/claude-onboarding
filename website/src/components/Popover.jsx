import { createPortal } from "react-dom";

// The box that appears beside whatever is being pointed at. One component for
// the glossary words in the prose, the rows in a file tree and the name on a
// code sample, so the three cannot drift apart.
//
// It renders into document.body. In place it was clipped by any ancestor with a
// hidden or scrolling overflow, and there are several here: the tree panel, the
// tables, the code boxes.

function Popover({ pos, kind, label, children, pinned }) {
    if (!pos) return null;

    return createPortal(
        <span
            className={`popover ${pos.above ? "above" : "below"}${pinned ? " pinned" : ""}`}
            role="tooltip"
            style={{
                left: `${pos.left}px`,
                top: pos.top === null ? "auto" : `${pos.top}px`,
                bottom: pos.bottom === null ? "auto" : `${pos.bottom}px`,
                // Measured from the anchor, so a long note near an edge scrolls
                // inside the box rather than running off the screen.
                maxHeight: `${pos.room}px`,
                "--arrow": `${pos.arrow}px`,
            }}
        >
            {label && <span className={`pop-label n-${kind || "concept"}`}>{label}</span>}
            {children}
            {/* Only when pinned. It is the only state a reader can get stuck in,
                and the way out is not guessable from a box that opened on
                hover. */}
            {pinned && <span className="pop-hint">Click again or press Esc to close</span>}
        </span>,
        document.body
    );
}

export default Popover;
