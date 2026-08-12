import Term from "../components/Term";
import Aside from "../components/Aside";
import { AUTO_TERMS, lookupTerm } from "../data/terms";

// Page text is plain strings with three pieces of markup:
//
//   [[word]]            a glossary word, hovered for the definition in terms.js
//   [[word|shown text]] looks up the first, shows the second
//   ((shown|detail))    a one-off aside: the shown text carries its own detail,
//                       hovered like a glossary word but defined right here
//   `code`              inline monospace
//
// AND THEN AUTO-LINKING. Anything in the glossary marked `auto` gets marked up
// on sight, without the sentence having to opt in. That is the difference
// between a glossary that covers the words somebody remembered to tag and one
// that covers the vocabulary: adding an entry to terms.js is now the whole job,
// and the word becomes hoverable everywhere it already appears.
//
// Three limits keep it from turning a paragraph into a field of underlines:
//
//   - Opt-in per entry. A word like `scope`, `stack` or `turn` has an everyday
//     meaning as well as this package's one, so those stay manual.
//   - Once per term per string, so a word repeated in a paragraph is marked the
//     first time and left alone after.
//   - At most three per string, because past that the marks stop reading as
//     help and start reading as noise.
//
// Code never reaches this. Inline `code` is pulled out by the pattern below
// before auto-linking runs, and a code sample is rendered raw by FileCard
// rather than going through here at all.

const PATTERN = /\[\[([^\]]+)\]\]|\(\(([^)]+)\)\)|`([^`]+)`/g;

const MAX_AUTO_PER_STRING = 3;

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Built once. `(^|[^\w-])` rather than a lookbehind so the boundary check works
// in every engine, and it also stops `agent` matching inside `sub-agent`, which
// a plain \b would happily do because a hyphen is a word boundary.
const AUTO = AUTO_TERMS.map((term) => ({
    term,
    re: new RegExp(`(^|[^\\w-])(${escape(term)})(s?)(?![\\w-])`, "gi"),
}));

/**
 * Is the match sitting inside a path or a filename?
 *
 * `.claude/agents/`, `.gemini/agents/`, `A file in scripts/` and `*.prompt.md`
 * all contain a glossary word, and in every one of them the word is a directory
 * name rather than the concept. An underline landing mid-path reads as broken
 * rather than as helpful, so those are skipped and the next occurrence in the
 * same string is tried instead.
 *
 * The test is the whitespace-delimited token around the match: a slash, a
 * leading dot, tilde or star, or a file extension all mean "this is a path".
 */
function inPath(text, start, end) {
    let a = start;
    let b = end;
    while (a > 0 && !/\s/.test(text[a - 1])) a -= 1;
    while (b < text.length && !/\s/.test(text[b])) b += 1;
    const token = text.slice(a, b);
    return /[/\\]/.test(token) || /^[.~*]/.test(token) || /\.\w{1,4}\b/.test(token);
}

// Matches a string that is nothing but one term, optionally with a joining word
// on either side, so `skill`, `skill + subagent` and `subagent + workflow` are
// all recognised as label cells rather than sentences.
const BARE = new RegExp(
    `^(?:${AUTO_TERMS.map(escape).join("|")})s?(?:\\s*(?:\\+|,|and|or|then)\\s*(?:${AUTO_TERMS.map(escape).join("|")})s?)*$`,
    "i"
);

/**
 * Marks up the auto-linkable terms in one plain string.
 *
 * `used` is shared across the whole rich() call, so a term explicitly written
 * as [[skill]] earlier in the same string is not then auto-linked again a few
 * words later.
 */
function autoLink(text, used, keyBase) {
    if (typeof text !== "string" || text.length < 3) return [text];
    if (used.size >= MAX_AUTO_PER_STRING) return [text];

    // A cell whose whole content is the term is the term being used as DATA, not
    // as prose that needs a gloss. The Kind column of Phase 3's library table is
    // eighteen cells reading skill / subagent / hook / workflow, and underlining
    // every one of them is a column of marks that says nothing the first one did
    // not. Where a bare term genuinely is definitional, as in Phase 1's
    // building-block map, it is written [[skill|Skill]] by hand, and explicit
    // markup never reaches this function.
    if (BARE.test(text.trim())) return [text];

    // Collect every candidate first, then choose between them, rather than
    // taking the first match and recursing on what is left. The recursive
    // version only ever scanned text AFTER its first hit, so a term earlier in
    // the sentence than the longest one was silently skipped: in "An agent
    // trades predictability... never point a dynamic workflow at code", the
    // agent went unmarked because `dynamic workflow` is the longer term and
    // everything before it was emitted untouched.
    const hits = [];
    for (const { term, re } of AUTO) {
        if (used.has(term)) continue;

        // The first occurrence that is not inside a path. If the first one is,
        // the term is still worth linking further along the sentence.
        re.lastIndex = 0;
        let m;
        while ((m = re.exec(text)) !== null) {
            const start = m.index + m[1].length;
            const end = start + m[2].length + m[3].length;
            if (!inPath(text, start, end)) {
                hits.push({ term, start, end });
                break;
            }
            // Step past this one so a zero-width case cannot loop forever.
            re.lastIndex = end;
        }
    }

    if (!hits.length) return [text];

    // Longest wins where two overlap, so `dynamic workflow` beats the `workflow`
    // inside it. Ties and non-overlaps fall back to document order.
    hits.sort((a, b) => b.end - b.start - (a.end - a.start) || a.start - b.start);

    const taken = [];
    for (const hit of hits) {
        if (taken.length + used.size >= MAX_AUTO_PER_STRING) break;
        if (taken.some((t) => hit.start < t.end && t.start < hit.end)) continue;
        taken.push(hit);
    }
    taken.sort((a, b) => a.start - b.start);

    const out = [];
    let at = 0;
    for (const hit of taken) {
        if (hit.start > at) out.push(text.slice(at, hit.start));
        used.add(hit.term);
        out.push(
            <Term
                key={`${keyBase}-${hit.start}`}
                word={hit.term}
                label={text.slice(hit.start, hit.end)}
            />
        );
        at = hit.end;
    }
    if (at < text.length) out.push(text.slice(at));
    return out;
}

/**
 * Backticks only, for text that is already inside a popover.
 *
 * A definition can usefully name a real token (`req.body`, `--dry-run`), but it
 * must not run through rich(): that would put glossary terms inside a glossary
 * popover, and hovering a word to reach another word to reach a third is not a
 * thing anybody wants. This handles the one piece of markup that is safe there
 * and deliberately knows nothing about the rest.
 */
export function mono(text) {
    if (typeof text !== "string" || !text.includes("`")) return text;

    const out = [];
    let last = 0;
    let match;
    const code = /`([^`]+)`/g;

    while ((match = code.exec(text)) !== null) {
        if (match.index > last) out.push(text.slice(last, match.index));
        out.push(<code key={match.index}>{match[1]}</code>);
        last = match.index + match[0].length;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
}

export function rich(text) {
    if (typeof text !== "string") return text;

    // Which terms this string has already spent, explicit and automatic alike.
    const used = new Set();
    const out = [];
    let last = 0;
    let match;

    PATTERN.lastIndex = 0;
    while ((match = PATTERN.exec(text)) !== null) {
        if (match.index > last) {
            out.push(...autoLink(text.slice(last, match.index), used, `a${last}`));
        }

        if (match[1] !== undefined) {
            // [[word|shown]] is a glossary term.
            const [word, label] = match[1].split("|");
            // Claim it, so the auto pass does not mark the same word again in
            // this string.
            const entry = lookupTerm(word);
            if (entry) used.add(word.trim().toLowerCase());
            out.push(<Term key={match.index} word={word} label={label} />);
        } else if (match[2] !== undefined) {
            // ((shown|detail)) is a one-off aside carrying its own text.
            const cut = match[2].indexOf("|");
            const label = cut === -1 ? match[2] : match[2].slice(0, cut);
            const detail = cut === -1 ? "" : match[2].slice(cut + 1);
            out.push(<Aside key={match.index} label={label} text={detail} />);
        } else {
            out.push(
                <code className="i" key={match.index}>
                    {match[3]}
                </code>
            );
        }

        last = match.index + match[0].length;
    }

    if (last < text.length) {
        out.push(...autoLink(text.slice(last), used, `a${last}`));
    }

    // A string with no markup and no glossary word in it comes back as itself,
    // so the common case costs nothing.
    if (out.length === 1 && typeof out[0] === "string") return out[0];
    return out;
}
