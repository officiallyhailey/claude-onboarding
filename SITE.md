# The onboarding package, as a website

The four phase guides and the package README, rebuilt as a site you can read and
navigate instead of five Markdown files you have to open in order.

Two things are deliberately different from the source documents.

**Directory layouts are live trees, not code blocks.** In the Markdown, every
tree is a fenced block with a comment trailing each line, which wraps badly and
answers only the question the author thought to answer. Here each row is a
control: hover it, or tap on a touch screen, and it says what that file is for
and what goes wrong when it is used for something else. Directories fold.

**Code samples are files.** A sample's header is its path, and the path is a
control with the same behaviour as a tree row, so the two questions a reader has
first, what is this and where does it go, are answered before they read a line.

Everything else follows from those two. Any word with a dashed underline carries
a definition from `src/data/terms.js`; the appendix renders that same object as a
list, so a word cannot mean one thing in a sentence and another at the back.

## Running it

```bash
npm install
npm run dev      # http://localhost:5175
npm run build    # static output in dist/
```

The build uses hash routing and a relative base, so `dist/` can be opened from a
folder, served from any static host, or handed to someone as a zip. Deep links
survive all three.

Both commands run `scripts/build-kits.sh` first, which packs `phases/` into the
zips the download panel offers and writes a manifest of their sizes beside them.
They land in `public/downloads/`, are never committed, and are rebuilt from the
current `phases/` every time, so the download and the page describing it cannot
drift apart. `Download.jsx` is the panel; the `download` block type puts it on a
phase page.

## Where the content lives

```
src/
├── data/
│   ├── terms.js          the glossary; powers every hover and the appendix list
│   ├── trees.js          every file tree, and the flat map the appendix renders
│   ├── verification.js   the eleven points that could not be fully confirmed
│   ├── phases.js         the four phases, in order
│   └── phases/           one file per phase: content as data, drawn by Blocks.jsx
├── components/
│   ├── FileTree.jsx      the trees
│   ├── FileCard.jsx      a code sample, shown as the file it is
│   ├── Term.jsx          a glossary word in the prose
│   ├── Popover.jsx       the box all three of those open
│   └── Blocks.jsx        the only place that knows how to draw a content block
├── lib/
│   ├── usePop.js         the hover-to-define behaviour, shared by all three
│   ├── anchor.js         where a popover sits relative to its anchor
│   └── richText.jsx      [[term]] and ((aside|detail)) markup in any string
└── styles/               tokens first, then layout, then the pieces inside it
```

To add a definition, add an entry to `terms.js` and write `[[the word]]` in any
string. To add a file to a tree, add a node in `trees.js` with a `def`; it turns
up in the appendix file map without anything else being touched.

## Editing the content

Content is data, not JSX. A section is a list of blocks, and `Blocks.jsx`
switches on `b.t`: `p`, `sub`, `thesis`, `ul`, `ol`, `table`, `numtable`, `note`,
`tree`, `file`, `shell`, `prompt`, `vocab`, `versus`, `sources`. Every string in
every one of those runs through `rich()`, so glossary markup and inline `code`
work in a paragraph, a list item, a table cell and a callout without any of them
opting in.

## The theme

Built in **Clean App**, from the DevBricks library (`themes/clean-app.md`). The
short version, because it explains most of the CSS:

**There is no colour.** The palette is achromatic, every chrome value is a grey,
and that is the theme's defining property rather than a gap in it. Hierarchy
rests on two ladders at once, six steps of ink and five of surface, so anything
that needs to stand out gets **brighter** or gets **raised**. If you find
yourself reaching for an accent, the answer here is elevation.

**Nothing is outlined.** A card is a lighter rectangle and that step is the
whole boundary. The one line in the theme is the tab bar's 1px top rule, which
earns the exception because content of unpredictable brightness scrolls under
it. Two dashed underlines survive on defined words, because those mark type
rather than enclose a surface.

**Dark is the base and light is a rebuild, not an inversion.** Both ladders are
in `base.css` and every rule resolves through them, so there is no dark
stylesheet and no mode needs an override of its own. The light ladder puts the
field in the *middle*: panels lift toward off-white while the small dense
elements sink below it. The theme guide has the measured reason, which is
headroom: dark mode spends its whole surface range in the bottom fifth, where
tiny luminance differences produce large contrast ratios, and a matte light
field has nowhere near that room.

Signature elements in use: tone-step cards with a 2px lift, the mono number
chip, the sticky bottom tab bar below 900px, and the circular icon button. The
theme's progress ring is deliberately not among them. The site used to record
which phases a browser had opened and report it back, as a ring and a fraction
and a marker on each card; none of that told a reader anything they did not
already know, so it is gone and nothing replaced it. The only thing this site
stores is which colour scheme you picked. `--lab` is the floor for readable text;
`--eyebrow` is only ever used for a label the heading immediately repeats, and
`--off` only for a tab label that also carries an icon and a fixed position.
