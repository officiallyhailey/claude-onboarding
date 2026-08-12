import { useEffect, useState } from "react";

// The download panel.
//
// The zips are packed from phases/ by scripts/build-kits.sh before every build,
// so what a reader downloads is the same tree this site describes rather than a
// second copy kept in step by hand.
//
// A browser cannot install anything, and pretending otherwise would be the
// worse design. So this offers the two halves of the real job side by side: the
// file, and the one command that turns the file into a working setup. The
// command is generated from window.location, so it carries whatever address
// this copy of the site is actually being served from.

const BASE = import.meta.env.BASE_URL;

const KITS = [
    {
        id: "all",
        file: "claude-onboarding.zip",
        name: "The whole package",
        desc: "All four guides, both installers, and every template, skill, subagent, hook and workflow.",
        folder: "claude-onboarding",
        run: "./install-all.sh",
    },
    {
        id: "p2",
        file: "phase-2-context-kit.zip",
        name: "Phase 2 only, the context kit",
        desc: "The private context templates and the commands scaffold, for a machine that only needs the identity layer.",
        folder: "phase-2-introducing-yourself",
        run: "./setup.sh",
    },
    {
        id: "p3",
        file: "phase-3-workflow-kit.zip",
        name: "Phase 3 only, the workflow kit",
        desc: "The twelve skills, five subagents, two hooks and two workflows, plus stack.md. Needs Phase 2 installed first.",
        folder: "phase-3-implementing-your-systems",
        run: "./setup-dev.sh",
    },
];

const ARROW = (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M12 3.6v11.2" />
        <path d="M7.4 10.4 12 15l4.6-4.6" />
        <path d="M4.5 18.4v1.1a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-1.1" />
    </svg>
);

/** Bytes as the size a download dialog would show. */
function readable(bytes) {
    if (!bytes) return null;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/**
 * The command that takes the file from the Downloads folder to installed.
 *
 * `--dry-run` is on its own line above the real run rather than left out,
 * because every guide in this package tells the reader to preview first and a
 * snippet that skipped its own advice would be the thing they copy.
 */
function steps(kit) {
    return [
        `cd ~/Downloads`,
        `unzip ${kit.file}`,
        `cd ${kit.folder}`,
        `${kit.run} --dry-run   # preview, changes nothing`,
        kit.run,
    ].join("\n");
}

function Snippet({ label, text }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            // Clipboard refused, which happens over plain http and in some
            // embedded browsers. The text is on screen and selectable.
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
        </div>
    );
}

function Card({ kit, size, lead }) {
    return (
        <a className={`dlcard${lead ? " lead" : ""}`} href={`${BASE}downloads/${kit.file}`} download>
            <span className="dlico">{ARROW}</span>
            <span className="dlbody">
                <span className="dlname">{kit.name}</span>
                <span className="dldesc">{kit.desc}</span>
            </span>
            <span className="dlmeta">
                <span className="dlfile">{kit.file}</span>
                {size && <span className="dlsize">{size}</span>}
            </span>
        </a>
    );
}

/**
 * @param only  a kit id, to show that one on its own. Omitted, all three show
 *              with the whole package leading.
 */
function Download({ only }) {
    const [sizes, setSizes] = useState({});

    // The manifest is written next to the zips by the same script that packs
    // them. If it is missing, the cards render without a size rather than
    // holding up the download they exist to offer.
    useEffect(() => {
        let live = true;
        fetch(`${BASE}downloads/manifest.json`)
            .then((r) => (r.ok ? r.json() : {}))
            .then((json) => live && setSizes(json))
            .catch(() => {});
        return () => {
            live = false;
        };
    }, []);

    const shown = only ? KITS.filter((k) => k.id === only) : KITS;
    const lead = shown[0];

    // The manual settings.json merge belongs to Phase 3, so it is only worth
    // saying where Phase 3 is one of the things on offer.
    const hooks = shown.some((k) => k.id === "all" || k.id === "p3");

    // The whole package downloads from wherever this site is being served, so
    // the terminal route needs no address written into it by hand.
    const url = new URL(`${BASE}downloads/${lead.file}`, window.location.href).href;

    return (
        <section className={`dl${only ? " one" : ""}`}>
            <div className="dlcards">
                {shown.map((kit, i) => (
                    <Card
                        key={kit.id}
                        kit={kit}
                        size={readable(sizes[kit.file])}
                        lead={!only && i === 0}
                    />
                ))}
            </div>

            <Snippet label="Then, in a terminal" text={steps(lead)} />

            <Snippet
                label="Or skip the browser entirely"
                text={`curl -fL ${url} -o ${lead.file} \\\n  && unzip -q ${lead.file} && cd ${lead.folder} && ${lead.run}`}
            />

            <p className="dlfoot">
                The installers are additive and never overwrite a file you have filled in, so
                running one twice is safe.
                {hooks && (
                    <>
                        {" "}
                        One step is deliberately left to you: the Phase 3 hooks are registered by
                        merging <code className="i">hooks/settings.snippet.json</code> into your{" "}
                        <code className="i">~/.claude/settings.json</code>, because a script guessing
                        at an existing settings file is how settings files get lost.
                    </>
                )}
            </p>
        </section>
    );
}

export default Download;
