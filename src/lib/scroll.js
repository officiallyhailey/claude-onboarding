// Where things land when the page scrolls itself.
//
// Both callers measure rather than assume: the top bar is sticky and its height
// changes with the viewport, and below 900px a tab bar sits over the bottom of
// the screen as well. A fixed offset is wrong at some width, always.

/** Where the top of a section should sit: clear of the sticky top bar. */
export function readingLine() {
    const head = document.querySelector(".masthead");
    return (head ? head.offsetHeight : 0) + 18;
}

/** How much of the viewport is actually free, between the two bars. */
function usable(line) {
    const bar = document.querySelector(".tabs");
    // The tab bar is display:none above 900px, and an element that was never
    // laid out reports an offsetHeight of 0 anyway, so this covers both.
    const barH = bar && bar.getClientRects().length ? bar.offsetHeight : 0;
    return window.innerHeight - line - barH;
}

/**
 * Scroll `el` to the middle of the free space.
 *
 * When the block is taller than the space available, centring it would push its
 * first row off the top of the screen, which is the opposite of what "show me
 * this" means. In that case the top edge goes to the reading line instead, so
 * the block always begins where it can be read from.
 */
export function centreOn(el) {
    if (!el) return;

    const line = readingLine();
    const box = el.getBoundingClientRect();
    const view = usable(line);

    const offset = box.height < view ? line + (view - box.height) / 2 : line;
    const top = window.scrollY + box.top - offset;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: Math.max(0, top), behavior: still ? "auto" : "smooth" });
}
