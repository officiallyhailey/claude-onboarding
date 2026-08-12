import { Link } from "react-router-dom";
import Blocks from "../components/Blocks";
import FileTree from "../components/FileTree";
import Command from "../components/Command";
import { packageTree } from "../data/trees";
import { KitCards, kitById, kitSteps, kitCurl } from "../components/Download";
import SectionNav from "../components/SectionNav";

// The install page.
//
// Deliberately the least contained page on the site. The download cards are
// cards because they are the things you click; everything else is type on the
// field, separated by hairlines and space rather than by edges. A page of
// instructions is the easiest thing on a site to turn into a stack of boxes,
// and the boxes are what make a short job look long.
//
// It is also the only page whose content is a sequence rather than a reference,
// so each part is numbered. The numbers are the navigation.

const ALL = kitById("all");

const SNIPPET = `"hooks": {
  "PreToolUse": [
    {
      "matcher": "Bash",
      "hooks": [
        { "type": "command", "command": "~/.claude/hooks/pre-commit-guard.sh", "timeout": 10 }
      ]
    }
  ],
  "PostToolUse": [
    {
      "matcher": "Edit|Write",
      "hooks": [
        { "type": "command", "command": "~/.claude/hooks/post-edit-format.sh", "timeout": 30 }
      ]
    }
  ]
}`;

const CHECK = `ls ~/.claude/skills     | wc -l   # 12
ls ~/.claude/agents     | wc -l   # 6, the five subagents plus the scaffold README
ls ~/.claude/workflows  | wc -l   # 2
ls ~/.claude/hooks      | wc -l   # 2
ls ~/.claude/commands             # kickoff.md  ready.md  wrap.md
ls ~/claude-context               # eight folders and a README`;

const SECTIONS = [
    { id: "phases", num: "01", title: "How the phases fit together" },
    { id: "files", num: "02", title: "Get the files" },
    { id: "install", num: "03", title: "Run the installer" },
    { id: "places", num: "04", title: "What each installer places" },
    { id: "manual", num: "05", title: "The two steps that stay manual" },
    { id: "check", num: "06", title: "Check it worked" },
    { id: "next", num: "07", title: "Then what" },
];

function Step({ id, n, title, children }) {
    return (
        <div className="step" id={id}>
            <h2>
                <span className="stepn">{n}</span>
                {title}
            </h2>
            {children}
        </div>
    );
}

function Setup() {
    return (
        <>
            <SectionNav sections={SECTIONS} />

            <div className="hero narrow">
                <div className="kicker">Setup</div>
                <h1>Two commands, then the parts only you can fill in.</h1>
                <p>
                    Phases 1 and 4 are reading, and this site is all of it. Phases 2 and 3 install,
                    and this page is the whole of that job: what to download, what to run, where
                    every file lands, and the two steps left deliberately to you.
                </p>
            </div>

            <div className="setup">
                {/* Moved off the landing page. It is orientation rather than a
                    step, but it is the orientation a reader needs immediately
                    before installing anything, and the landing page was asking
                    for it before anyone had agreed to read the package. */}
                <Step id="phases" n="01" title="How the phases fit together">
                    <Blocks
                        blocks={[
                            {
                                t: "p",
                                x: "Phase 1 is understanding. Phases 2 and 3 are setup, done once. Phase 4 is the daily practice, repeated forever. The order is not a presentation choice: you cannot introduce yourself before you know the pieces, and you cannot implement systems before your machine knows who you are.",
                            },
                            {
                                t: "table",
                                head: ["Phase", "Answers", "Installs"],
                                rows: [
                                    [
                                        "1. Understanding Claude",
                                        "What are all the pieces, and when do I use each?",
                                        "Nothing",
                                    ],
                                    [
                                        "2. Introducing Yourself",
                                        "How do I tell Claude who I am, so every session knows?",
                                        "The context kit, at ~/claude-context",
                                    ],
                                    [
                                        "3. Implementing Your Systems",
                                        "How do I install the skills, agents, hooks, and workflows I work with?",
                                        "The workflow kit, into ~/.claude",
                                    ],
                                    [
                                        "4. Working Together",
                                        "How do I actually work with Claude well, day to day?",
                                        "Nothing. Habits",
                                    ],
                                ],
                            },
                            {
                                t: "note",
                                kind: "rule",
                                lab: "The two kits are two different layers",
                                x: [
                                    "Phase 2 is the [[context layer]]: who you are. Identity, the memory that loads into every session, your roles, your brand. It installs to a private, git-ignored ~/claude-context.",
                                    "Phase 3 is the [[procedures layer]]: how you work. Skills, subagents, hooks, and dynamic workflows, installed into ~/.claude.",
                                    "They interlock. The Phase 3 skills read from the Phase 2 context and write back to it. That is why Phase 2 comes first.",
                                ],
                            },
                        ]}
                    />
                </Step>

                <Step id="files" n="02" title="Get the files">
                    <Blocks
                        blocks={[
                            {
                                t: "p",
                                x: "Take the whole package unless you have a reason not to. The [[procedures layer]] Phase 3 installs reads from the [[context layer]] Phase 2 creates, so the two are only useful together, and the single kits exist for a machine that already has one half.",
                            },
                        ]}
                    />
                    <KitCards />
                    <Blocks
                        blocks={[
                            { t: "sub", x: "What is in the box" },
                            {
                                t: "p",
                                x: "The whole package, unzipped. The site's own source is not in it: the download is packed from the four phases alone, so this tree is the whole file.",
                            },
                        ]}
                    />
                    <FileTree tree={packageTree} />
                </Step>

                <Step id="install" n="03" title="Run the installer">
                    <Blocks
                        blocks={[
                            {
                                t: "p",
                                x: "Unzip it anywhere. `--dry-run` prints every file it would touch and changes nothing, which is worth reading once before the real run.",
                            },
                        ]}
                    />
                    <Command label="In a terminal" text={kitSteps(ALL)} />
                    <Command
                        label="Or skip the browser entirely"
                        text={kitCurl(ALL)}
                        note="Downloads, unzips and installs in one line. Same result as the four commands above."
                    />
                    <Blocks
                        blocks={[
                            {
                                t: "p",
                                x: "Both installers are additive and [[no-clobber]]. They never overwrite a file you have filled in, they back up CLAUDE.md before appending to it, and they are safe to run as many times as you like.",
                            },
                            { t: "sub", x: "Adopting into an existing setup" },
                            {
                                t: "p",
                                x: "If you already have a ~/.claude with memory and skills, you are not starting over. The installers layer onto what you have, and Phase 2 covers migrating existing memory into the new homes: move, then trim, so nothing loads twice. Your existing skills are not touched; you index them in the router.",
                            },
                        ]}
                    />
                </Step>

                <Step id="places" n="04" title="What each installer places">
                    <Blocks
                        blocks={[
                            {
                                t: "p",
                                x: "Two kits, two layers. Phase 2 installs who you are, Phase 3 installs how you work, and the second reads from the first. That is the whole reason for the order.",
                            },
                            { t: "sub", x: "Phase 2, the context kit" },
                            {
                                t: "table",
                                head: ["Lands at", "What it is"],
                                mono: [0],
                                rows: [
                                    [
                                        "~/claude-context/",
                                        "Identity, memory, roles, brand and projects. The private layer, and nothing in it is filled in for you.",
                                    ],
                                    [
                                        "~/.config/git/ignore",
                                        "Gains one line, `claude-context/`, so the private layer can never be committed to any repo on the machine.",
                                    ],
                                    [
                                        "~/.claude/commands/",
                                        "The slash commands: /wrap, /ready and /kickoff.",
                                    ],
                                    [
                                        "~/.claude/agents/",
                                        "The [[subagent]] scaffold, which Phase 3 then fills.",
                                    ],
                                    [
                                        "~/.claude/CLAUDE.md",
                                        "The import block, appended once behind a marker. The original is backed up first, and a second run is a no-op.",
                                    ],
                                ],
                            },
                            { t: "sub", x: "Phase 3, the workflow kit" },
                            {
                                t: "table",
                                head: ["Lands at", "What it is"],
                                mono: [0],
                                rows: [
                                    ["~/.claude/skills/", "Twelve [[skill|skills]], the procedures library."],
                                    ["~/.claude/agents/", "Five [[subagent|subagents]], each with its own context window."],
                                    [
                                        "~/.claude/workflows/",
                                        "Two [[dynamic workflow|dynamic workflows]].",
                                    ],
                                    [
                                        "~/.claude/hooks/",
                                        "Two [[hook]] scripts, made executable. Registering them is step 04.",
                                    ],
                                    [
                                        "~/claude-context/config/stack.md",
                                        "Your stack's commands, read by every skill. Filling it in is step 04.",
                                    ],
                                ],
                            },
                        ]}
                    />
                </Step>

                <Step id="manual" n="05" title="The two steps that stay manual">
                    <Blocks
                        blocks={[
                            {
                                t: "p",
                                x: "Neither of these is an oversight. One needs answers only you have, and the other edits a file a script has no business guessing at.",
                            },
                            { t: "sub", x: "1. Fill in stack.md" },
                            {
                                t: "p",
                                x: "Every skill in the library reads your commands from here instead of assuming a toolchain, which is what lets the same library work whether you are in Next.js, Express or React Native. An empty stack.md is a library that cannot run your tests.",
                            },
                        ]}
                    />
                    <Command label="Open it" text={`$EDITOR ~/claude-context/config/stack.md`} />
                    <Blocks
                        blocks={[
                            { t: "sub", x: "2. Register the hooks" },
                            {
                                t: "p",
                                x: "Add these keys to the `hooks` object in your `~/.claude/settings.json`, then restart Claude Code. Merge them in; do not replace the file. If you have no settings.json yet, wrap the block below in braces and that is the whole file.",
                            },
                        ]}
                    />
                    <Command label="~/.claude/settings.json" text={SNIPPET} />
                    <Blocks
                        blocks={[
                            {
                                t: "note",
                                kind: "warn",
                                lab: "Why this one is not scripted",
                                x: [
                                    "settings.json may already hold your permissions, your theme and hooks of your own. A script that merges JSON it did not write is a script that eventually overwrites something, and a lost settings file is a bad first experience of a tool that is supposed to be making things safer.",
                                    "The installer prints this step rather than performing it, and the snippet ships at hooks/settings.snippet.json inside the kit.",
                                ],
                            },
                        ]}
                    />
                </Step>

                <Step id="check" n="06" title="Check it worked">
                    <Blocks
                        blocks={[
                            {
                                t: "p",
                                x: "The counts are for a fresh machine. If you already had skills or agents of your own, yours will be higher, which is the point: the installers layer onto what is there.",
                            },
                        ]}
                    />
                    <Command label="Verify" text={CHECK} />
                    <Blocks
                        blocks={[
                            {
                                t: "p",
                                x: "If the hooks do not fire, the schema is version gated: check your version's hooks documentation, and make sure Claude Code was restarted after the settings edit.",
                            },
                        ]}
                    />
                </Step>

                <Step id="next" n="07" title="Then what">
                    <Blocks
                        blocks={[
                            {
                                t: "p",
                                x: "Installing is the smallest part. The templates are empty on purpose, and Phase 2 walks you through populating them by interview rather than by filling in blanks alone.",
                            },
                        ]}
                    />
                    <div className="setupnext">
                        <Link className="wide-card" to="/phase/introducing-yourself">
                            <div>
                                <h3>Phase 2, Introducing Yourself</h3>
                                <p>
                                    Six interview prompts that turn the empty templates into a
                                    context layer every session loads.
                                </p>
                            </div>
                            <span className="arr" aria-hidden="true">
                                &rarr;
                            </span>
                        </Link>
                        <Link className="wide-card" to="/phase/implementing-your-systems">
                            <div>
                                <h3>Phase 3, Implementing Your Systems</h3>
                                <p>
                                    What each of the twelve skills is for, which layer it belongs
                                    in, and when it fires.
                                </p>
                            </div>
                            <span className="arr" aria-hidden="true">
                                &rarr;
                            </span>
                        </Link>
                    </div>
                </Step>
            </div>
        </>
    );
}

export default Setup;
