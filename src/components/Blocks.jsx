import { rich } from "../lib/richText";
import FileTree from "./FileTree";
import FileCard from "./FileCard";
import Prompt from "./Prompt";
import Vocab from "./Vocab";
import Note from "./Note";
import Download from "./Download";

// Page content is data, and this is the only place that knows how to draw it.
//
// Every string that reaches the page goes through rich(), so [[glossary]] words
// and ((one-off|asides)) work in a paragraph, a list item, a table cell and a
// callout without each of those having to opt in.

function Table({ head, rows, mono, wide }) {
    return (
        <div className={`tw${wide ? " bleed" : ""}`}>
            <table className="d">
                <thead>
                    <tr>
                        {head.map((h, i) => (
                            <th key={i} className={mono && mono.includes(i) ? "m" : undefined}>
                                {rich(h)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, r) => (
                        <tr key={r}>
                            {row.map((cell, c) => (
                                <td key={c} className={mono && mono.includes(c) ? "m" : undefined}>
                                    {rich(cell)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/** A numbered table: the first column is an index, not content. */
function NumTable({ head, rows }) {
    return (
        <div className="tw">
            <table className="d">
                <thead>
                    <tr>
                        <th>#</th>
                        {head.map((h, i) => (
                            <th key={i}>{rich(h)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, r) => (
                        <tr key={r}>
                            <td className="n">{r + 1}</td>
                            {row.map((cell, c) => (
                                <td key={c}>{rich(cell)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// The theme is achromatic, so nothing here can be told apart by hue. Where the
// old design used amber and green, these carry the same meaning with an icon
// and a place on the elevation ladder, which is both what the theme requires
// and what a colour-blind reader needed anyway.
const glyph = (d) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        {d}
    </svg>
);

const CROSS = glyph(<path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />);
const TICK = glyph(<path d="M5 12.6l4.6 4.6L19 7.8" />);

function Versus({ weak, strong }) {
    return (
        <div className="versus">
            <div className="vcol weak">
                <div className="vhead">
                    {CROSS}
                    Weak
                </div>
                <pre>{weak.text}</pre>
                {weak.why && <div className="why">{rich(weak.why)}</div>}
            </div>
            <div className="vcol strong">
                <div className="vhead">
                    {TICK}
                    Strong
                </div>
                <pre>{strong.text}</pre>
                {strong.why && <div className="why">{rich(strong.why)}</div>}
            </div>
        </div>
    );
}

function Block({ b }) {
    switch (b.t) {
        case "p":
            return <p className="t">{rich(b.x)}</p>;

        case "sub":
            return <h3 className="sub">{rich(b.x)}</h3>;

        case "thesis":
            return <p className="thesis">{rich(b.x)}</p>;

        case "ul":
            return (
                <ul className="t">
                    {b.items.map((item, i) => (
                        <li key={i}>{rich(item)}</li>
                    ))}
                </ul>
            );

        case "ol":
            return (
                <ol className={b.steps ? "t steps" : "t"}>
                    {b.items.map((item, i) => (
                        <li key={i}>{rich(item)}</li>
                    ))}
                </ol>
            );

        case "table":
            // `wide` is the one named width exception in the layout: it grows
            // rightward into the margin column so the left edge still never
            // moves. For the tables that would otherwise scroll inside the
            // measure, which is worse than using margin the page has spare.
            return <Table head={b.head} rows={b.rows} mono={b.mono} wide={b.wide} />;

        case "numtable":
            return <NumTable head={b.head} rows={b.rows} />;

        case "note":
            // Note.jsx renders both the margin form and the collapsed one, and
            // CSS picks whichever the surrounding container can carry.
            return <Note kind={b.kind} lab={b.lab} paras={Array.isArray(b.x) ? b.x : [b.x]} />;

        case "tree":
            return <FileTree tree={b.tree} />;

        case "file":
            return <FileCard {...b} />;

        case "shell":
            return (
                <div className="shell">
                    <pre>{b.x}</pre>
                </div>
            );

        case "prompt":
            return <Prompt label={b.lab} text={b.x} done={b.done} />;

        case "download":
            // `only` names one kit; without it all three show. The zips are
            // packed from phases/ at build time, so this is always the tree the
            // page around it describes.
            return <Download only={b.only} />;

        case "vocab":
            return <Vocab items={b.items} mono={b.mono} />;

        case "versus":
            return <Versus weak={b.weak} strong={b.strong} />;

        case "sources":
            return (
                <ul className="sources">
                    {b.items.map(([label, href]) => (
                        <li key={href}>
                            <a href={href} target="_blank" rel="noreferrer">
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            );

        default:
            // A block type nobody has written a case for should be visible in
            // development rather than silently missing from the page.
            return <p className="t">{`[unrenderable block: ${b.t}]`}</p>;
    }
}

function Blocks({ blocks }) {
    return (
        <>
            {blocks.map((b, i) => (
                <Block b={b} key={i} />
            ))}
        </>
    );
}

export default Blocks;
