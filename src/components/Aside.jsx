import { usePop } from "../lib/usePop";
import Popover from "./Popover";

// A one-off aside. It looks like a glossary word and opens the same way, but it
// carries its own text instead of looking one up, so a detail that is true in
// exactly one sentence does not have to become a glossary entry to be sayable.
//
// This is what an expandable block becomes. The detail moves onto the words it
// is about and costs no vertical space until someone asks for it.

function Aside({ label, text }) {
    const { ref, showing, pinned, pos, handlers } = usePop();

    if (!text) return <>{label}</>;

    return (
        <span className="termwrap" ref={ref}>
            <button
                type="button"
                className={`term aside${showing ? " on" : ""}`}
                aria-expanded={showing}
                {...handlers}
            >
                {label}
            </button>
            {showing && (
                <Popover pos={pos} kind="aside" label="Detail" pinned={pinned}>
                    <span className="pop-body">{text}</span>
                </Popover>
            )}
        </span>
    );
}

export default Aside;
