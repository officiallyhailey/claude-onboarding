// Where a popover should sit relative to the thing it explains.
//
// Shared by the glossary words in the prose, the rows in a file tree, the name
// on a code sample and the collapsed margin notes, so all four behave
// identically. That is the whole point of having one function: a reader learns
// the interaction once.

export const POP_WIDTH = 300;
const GAP = 9;
const EDGE = 12;
const MIN_ROOM = 130;

/**
 * Position for a popover anchored to `el`, in viewport coordinates.
 *
 * Side is chosen by measuring, not by a fixed threshold. It used to go above
 * whenever the anchor was more than 180px down the page, which was fine for a
 * one-line glossary definition and wrong for anything taller: a note with three
 * paragraphs anchored near the bottom would open upward and run off the top of
 * the screen. Now it takes whichever side has more room and reports how much,
 * so the box can cap itself and scroll rather than overflow.
 *
 * Anchored by its bottom edge when above, rather than by its top with a
 * transform: the entry animation animates transform, an animation beats a
 * static declaration, and the box would land on top of the thing it explains.
 */
export function anchorTo(el, width = POP_WIDTH) {
    if (!el) return null;
    const box = el.getBoundingClientRect();
    const centre = box.left + box.width / 2;
    const left = Math.max(EDGE, Math.min(centre - width / 2, window.innerWidth - width - EDGE));

    const roomAbove = box.top - GAP - EDGE;
    const roomBelow = window.innerHeight - box.bottom - GAP - EDGE;
    const above = roomAbove > roomBelow;

    return {
        left,
        above,
        top: above ? null : box.bottom + GAP,
        bottom: above ? window.innerHeight - box.top + GAP : null,
        // What the box may grow to before it has to scroll inside itself.
        room: Math.max(MIN_ROOM, Math.floor(above ? roomAbove : roomBelow)),
        // The arrow keeps pointing at the anchor even when the box has been
        // nudged sideways to stay on screen.
        arrow: Math.max(14, Math.min(centre - left, width - 14)),
    };
}
