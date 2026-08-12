import { usePop } from "../lib/usePop";
import { mono } from "../lib/richText";
import Popover from "./Popover";

// A code sample, shown as what it actually is: a file.
//
// The source documents put these in bare fenced blocks, so a reader meets a
// wall of YAML with no answer to the two questions they have first, which are
// what is this file and where does it go. Here the name is the header of the
// box and the header is a control, exactly like a row in a file tree. The two
// are the same idea at two scales, so the interaction is learned once.

function FileCard({ name, path, kind, def, note, code, why, wide }) {
    const { ref, showing, pinned, pos, handlers } = usePop();

    return (
        <div className={`filecard${wide ? " wide" : ""}`}>
            <div className="fchead">
                <span className="termwrap" ref={ref}>
                    <button
                        type="button"
                        className={`fcname${showing ? " on" : ""}`}
                        aria-expanded={showing}
                        {...handlers}
                    >
                        {path || name}
                    </button>
                    {showing && (
                        <Popover pos={pos} kind="file" label={name} pinned={pinned}>
                            <span className="pop-body">{mono(def)}</span>
                            {note && <span className="pop-note">{mono(note)}</span>}
                        </Popover>
                    )}
                </span>
                {kind && <span className="fckind">{kind}</span>}
            </div>
            <pre>
                <code>{code}</code>
            </pre>
            {why && <div className="fcwhy">{why}</div>}
        </div>
    );
}

export default FileCard;
