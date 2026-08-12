import { lookupTerm } from "../data/terms";
import { mono } from "../lib/richText";
import { usePop } from "../lib/usePop";
import Popover from "./Popover";

// A word in the prose that can be hovered for a definition. The definitions all
// come from the glossary in data/terms.js, which is also what the appendix
// renders, so a word cannot mean one thing in a sentence and another in the
// list at the back.

function Term({ word, label }) {
    const entry = lookupTerm(word);
    const { ref, showing, pinned, pos, handlers } = usePop();

    // A word with no entry still reads correctly, it just is not interactive.
    // That matters while the glossary is being filled in: a missing entry
    // should cost the reader nothing.
    if (!entry) return <>{label || word}</>;

    return (
        <span className="termwrap" ref={ref}>
            <button type="button" className={`term${showing ? " on" : ""}`} aria-expanded={showing} {...handlers}>
                {label || word}
            </button>
            {showing && (
                <Popover pos={pos} kind="concept" label={entry.term || word} pinned={pinned}>
                    <span className="pop-body">{mono(entry.def)}</span>
                    {entry.note && <span className="pop-note">{mono(entry.note)}</span>}
                </Popover>
            )}
        </span>
    );
}

export default Term;
