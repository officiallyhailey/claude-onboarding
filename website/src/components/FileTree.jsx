import { useState } from "react";
import { usePop } from "../lib/usePop";
import { mono } from "../lib/richText";
import Popover from "./Popover";

// The file tree.
//
// This is the site's main idea. The source documents draw their directory
// layouts inside fenced code blocks with a comment trailing every line, which
// makes the layout something to look at rather than something to use. Here each
// row is a control: hover it and it says what that file or directory is for,
// click it and the answer stays put.
//
// A row carries up to three things. The name is always there. The gloss beside
// it is one clause, so the tree can be skimmed without hovering thirty rows.
// The popover is the full answer, and it is the only one of the three allowed
// to be a sentence.

/** Depth-first walk, so the flat render can draw its own indent guides. */
function walk(nodes, depth, parentPath, shut, out) {
    for (const node of nodes) {
        const path = `${parentPath}/${node.name}`;
        out.push({ node, depth, path });
        if (node.children && !shut.has(path)) {
            walk(node.children, depth + 1, path, shut, out);
        }
    }
    return out;
}

function Row({ node, depth, path, folded, onFold }) {
    const { ref, showing, pinned, pos, handlers } = usePop();
    const isDir = !!node.dir;
    const foldable = isDir && node.children && node.children.length > 0;

    return (
        <div className={`trow ${isDir ? "dir" : "file"}${showing ? " on" : ""}`} ref={ref}>
            {/* One hairline per level. At four levels of plain indentation the
                eye cannot tell which parent a row belongs to. */}
            {Array.from({ length: depth }, (_, i) => (
                <span className="tguide" key={i} aria-hidden="true" />
            ))}

            {foldable ? (
                <button
                    type="button"
                    className={`ttwist${folded ? " shut" : ""}`}
                    onClick={() => onFold(path)}
                    aria-expanded={!folded}
                    aria-label={`${folded ? "Show" : "Hide"} the contents of ${node.name}`}
                    title={folded ? "Show what is inside" : "Fold this away"}
                >
                    ▼
                </button>
            ) : (
                <span className="tlead" aria-hidden="true" />
            )}

            <button type="button" className="tmain" aria-expanded={showing} {...handlers}>
                <span className="tglyph" aria-hidden="true">
                    {isDir ? "▮" : "▯"}
                </span>
                <span className="tname2">{node.name}</span>
                {node.gloss && <span className="tgloss">{node.gloss}</span>}
                {node.phase && (
                    <span className={`tphase ${node.phase}`}>
                        {node.phase.replace("p", "Phase ")}
                    </span>
                )}
            </button>

            {showing && (
                <Popover
                    pos={pos}
                    kind={isDir ? "dir" : "file"}
                    label={node.name}
                    pinned={pinned}
                >
                    <span className="pop-body">{mono(node.def)}</span>
                    {node.note && <span className="pop-note">{mono(node.note)}</span>}
                </Popover>
            )}
        </div>
    );
}

function FileTree({ tree }) {
    // Folding is by path, and starts empty: a tree in a teaching document should
    // arrive open. Folding is for getting a long one out of the way after it has
    // been read, not for hiding it before it has.
    const [shut, setShut] = useState(() => new Set(tree.folded || []));

    const onFold = (path) =>
        setShut((prev) => {
            const next = new Set(prev);
            if (next.has(path)) next.delete(path);
            else next.add(path);
            return next;
        });

    const rows = walk(tree.nodes, 0, "", shut, []);

    return (
        <div className={`tree${tree.wide ? " bleed" : ""}`}>
            <div className="treetop">
                <span className="tname">{tree.title}</span>
                {/* Two wordings for the same instruction. There is no hover on
                    a touch screen, and telling someone to do something their
                    device cannot do reads as the feature being broken. Tapping
                    pins the popover, which is the same answer. */}
                <span className="thint">
                    <span className="on-wide">Hover</span>
                    <span className="on-narrow">Tap</span> any row for what it is for
                </span>
            </div>
            <div className="treebody">
                {rows.map(({ node, depth, path }) => (
                    <Row
                        key={path}
                        node={node}
                        depth={depth}
                        path={path}
                        folded={shut.has(path)}
                        onFold={onFold}
                    />
                ))}
                {tree.trailing && <span className="tmore">{tree.trailing}</span>}
            </div>
        </div>
    );
}

export default FileTree;
