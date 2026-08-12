import { useState } from "react";

// Something to run, with a copy button, and no panel around it.
//
// The filled version of this is `.prompt` in code.css, which earns its surface
// because a prompt is a block of prose you paste into a chat box and it needs
// an edge to say where it ends. A shell command does not: it is three short
// mono lines, and boxing each one turns a page of instructions into a stack of
// containers. An accent rule down the left marks it as a thing to run, the
// mono face does the rest, and the page keeps its air.

function Command({ label = "Terminal", text, note }) {
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
        <div className="cmd">
            <div className="cmdhead">
                <span className="cmdlab">{label}</span>
                <button type="button" className={`copybtn${copied ? " ok" : ""}`} onClick={copy}>
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>
            <pre>{text}</pre>
            {note && <p className="cmdnote">{note}</p>}
        </div>
    );
}

export default Command;
