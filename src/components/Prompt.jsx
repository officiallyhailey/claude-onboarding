import { useState } from "react";

// A prompt to paste into Claude.
//
// The setup phases are mostly these, so they are the deliverable of those pages
// rather than an illustration on them, and they get their own treatment: a copy
// button, because retyping a twelve-line prompt is where people give up, and a
// slot for the stage's definition of done, because a stage without a stopping
// condition is the exact mistake these guides teach against.

function Prompt({ label = "Paste into Claude", text, done }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            // Clipboard refused, which happens over plain http and in some
            // embedded browsers. The text is on screen and selectable, so the
            // reader is not stuck; only the shortcut is gone.
            setCopied(false);
        }
    };

    return (
        <div className="prompt">
            <div className="prompthead">
                <span className="plab">{label}</span>
                <button type="button" className={`copybtn${copied ? " ok" : ""}`} onClick={copy}>
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>
            <pre>{text}</pre>
            {done && (
                <div className="donewhen">
                    <b>Done when:</b> {done}
                </div>
            )}
        </div>
    );
}

export default Prompt;
