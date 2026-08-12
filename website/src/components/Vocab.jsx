import { useState } from "react";
import { rich } from "../lib/richText";

// Expandable rows. Used where the source document had a list whose second half
// is only wanted sometimes: the common mistakes, the verification notes, the
// false friends. The question stays visible, the answer costs a click.

function VocabRow({ line, meaning }) {
    const [open, setOpen] = useState(false);

    return (
        <div className={open ? "vrow open" : "vrow"}>
            <button type="button" onClick={() => setOpen(!open)} aria-expanded={open}>
                <span>{rich(line)}</span>
                <span className="tw2" aria-hidden="true">
                    +
                </span>
            </button>
            {open && (
                <div className="body">
                    <p>{rich(meaning)}</p>
                </div>
            )}
        </div>
    );
}

function Vocab({ items, mono }) {
    return (
        <div className={mono ? "vocab mono" : "vocab"}>
            {items.map(([line, meaning]) => (
                <VocabRow key={line} line={line} meaning={meaning} />
            ))}
        </div>
    );
}

export default Vocab;
