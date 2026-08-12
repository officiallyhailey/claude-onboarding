import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Command from "./Command";

// The kits, and the ways of offering them.
//
// The zips are packed from phases/ by scripts/build-kits.sh before every build,
// so what a reader downloads is the same tree this site describes rather than a
// second copy kept in step by hand.
//
// A browser cannot install anything, and pretending otherwise would be the
// worse design. So every arrangement here offers the two halves of the real
// job: the file, and the commands that turn the file into a working setup. The
// commands are generated from window.location, so they carry whatever address
// this copy of the site is actually being served from.
//
// The pieces are exported because the Setup page lays them out its own way,
// with the breakdown of each installer between them. The default export is the
// compact form, for a phase page that needs one kit in the middle of its prose.

const BASE = import.meta.env.BASE_URL;

export const KITS = [
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

export const kitById = (id) => KITS.find((k) => k.id === id) || KITS[0];

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
 * Sizes for the download cards, from the manifest the packing script writes
 * beside the zips. If it is missing, the cards render without a size rather
 * than holding up the download they exist to offer.
 */
export function useKitSizes() {
    const [sizes, setSizes] = useState({});

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

    return sizes;
}

/**
 * The commands that take the file from the Downloads folder to installed.
 *
 * `--dry-run` is on its own line above the real run rather than left out,
 * because every guide in this package tells the reader to preview first and a
 * snippet that skipped its own advice would be the thing they copy.
 */
export function kitSteps(kit) {
    return [
        `cd ~/Downloads`,
        `unzip ${kit.file}`,
        `cd ${kit.folder}`,
        `${kit.run} --dry-run   # preview, changes nothing`,
        kit.run,
    ].join("\n");
}

/** The same job without the browser, addressed to wherever this site is served. */
export function kitCurl(kit) {
    const url = new URL(`${BASE}downloads/${kit.file}`, window.location.href).href;
    return `curl -fL ${url} -o ${kit.file} \\\n  && unzip -q ${kit.file} && cd ${kit.folder} && ${kit.run}`;
}

export function KitCard({ kit, size, lead }) {
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
 * Every kit as a row of cards.
 *
 * @param only  a kit id, to show that one on its own.
 */
export function KitCards({ only }) {
    const sizes = useKitSizes();
    const shown = only ? KITS.filter((k) => k.id === only) : KITS;

    return (
        <div className={`dlcards${only ? " one" : ""}`}>
            {shown.map((kit, i) => (
                <KitCard
                    key={kit.id}
                    kit={kit}
                    size={readable(sizes[kit.file])}
                    lead={!only && i === 0}
                />
            ))}
        </div>
    );
}

/**
 * One kit and the commands to install it, for a phase page.
 *
 * The full arrangement, with what each installer places and the steps that stay
 * manual, is the Setup page. This is the version that belongs mid-prose.
 */
function Download({ only }) {
    const kit = kitById(only);

    return (
        <section className="dl">
            <KitCards only={only} />
            <Command label="Then, in a terminal" text={kitSteps(kit)} />
            <p className="dlfoot">
                The installers are additive and never overwrite a file you have filled in, so
                running one twice is safe. Where every file lands, and the two steps that stay
                manual, are on the <Link to="/setup">setup page</Link>.
            </p>
        </section>
    );
}

export default Download;
