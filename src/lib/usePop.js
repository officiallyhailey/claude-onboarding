import { useEffect, useRef, useState } from "react";
import { anchorTo } from "./anchor";

/**
 * The hover-to-define behaviour, in one place.
 *
 * Hover opens it, click keeps it open, Escape or a click elsewhere closes it.
 * Keyboard focus opens it too, so the definitions are not mouse-only.
 *
 * Three components use this: a glossary word in the prose, a row in a file
 * tree, and the name on a code sample. They look different and mean different
 * things, but the way you ask them a question is the same, and it is worth
 * more that a reader learns it once than that each one behaves optimally.
 *
 * Returns the ref to put on the wrapper, whether the popover is showing, and
 * the handlers to spread onto the control.
 */
export function usePop() {
    const ref = useRef(null);
    const [open, setOpen] = useState(false);
    const [pinned, setPinned] = useState(false);
    const [pos, setPos] = useState(null);

    const showing = open || pinned;
    const place = () => setPos(anchorTo(ref.current));

    // Keep it attached to its anchor if the page moves underneath it. `true`
    // for the capture phase, so scrolling inside the tree panel counts as well
    // as scrolling the window.
    useEffect(() => {
        if (!showing) return;
        const move = () => setPos(anchorTo(ref.current));
        window.addEventListener("scroll", move, true);
        window.addEventListener("resize", move);
        return () => {
            window.removeEventListener("scroll", move, true);
            window.removeEventListener("resize", move);
        };
    }, [showing]);

    useEffect(() => {
        if (!pinned) return;
        const away = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setPinned(false);
                setOpen(false);
            }
        };
        const esc = (e) => {
            if (e.key === "Escape") {
                setPinned(false);
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", away);
        document.addEventListener("keydown", esc);
        return () => {
            document.removeEventListener("mousedown", away);
            document.removeEventListener("keydown", esc);
        };
    }, [pinned]);

    const handlers = {
        onMouseEnter: () => {
            place();
            setOpen(true);
        },
        onMouseLeave: () => setOpen(false),
        onFocus: () => {
            place();
            setOpen(true);
        },
        onBlur: () => setOpen(false),
        onClick: () => {
            place();
            setPinned((p) => !p);
        },
    };

    return { ref, showing, pinned, pos, handlers };
}
