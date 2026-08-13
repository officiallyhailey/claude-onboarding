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
 * Publish the height of the two sticky bars as `--chrome` on the root.
 *
 * For the full-screen hero on a phone, which has to end exactly where the tab
 * bar begins or the button under it sits behind that bar. The split is on
 * purpose: the viewport half stays in CSS, where `svh` holds still while a
 * phone's address bar retracts, and only the bars are measured here, which is
 * the half CSS cannot see. Same reason as the two above, one rule up: their
 * heights are not a number to write down.
 *
 * Observes rather than listening, so a bar that changes height on its own, a
 * wrapped label or a late font, is caught as well as a resize. Returns its own
 * teardown for an effect to call.
 */
export function trackChrome() {
    const bars = [".masthead", ".tabs"]
        .map((sel) => document.querySelector(sel))
        .filter(Boolean);

    const set = () => {
        const h = bars.reduce(
            (n, el) => n + (el.getClientRects().length ? el.offsetHeight : 0),
            0,
        );
        document.documentElement.style.setProperty("--chrome", `${h}px`);
    };

    // Fires once on observe, so the first measurement comes from here too.
    const watch = new ResizeObserver(set);
    bars.forEach((el) => watch.observe(el));

    return () => {
        watch.disconnect();
        document.documentElement.style.removeProperty("--chrome");
    };
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
