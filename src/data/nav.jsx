// The destinations, once.
//
// The top bar uses this at width and the bottom tab bar uses it below 900px, so
// the two can never disagree about what exists or which one you are on. Adding
// a destination is one entry here.
//
// EVERY LABEL IS THE PAGE'S OWN NAME. They used to be a third naming system:
// the nav said Pieces, You, Systems, Practice while the landing rows and the
// page headings both said Understanding Claude, Introducing Yourself and so on.
// Two of those agreed because they read the same string; the nav was the one
// inventing words, and a reader had to learn a mapping to use it.
//
// `short` is what the tab bar shows instead, where seven destinations share a
// 375px phone. "Phase" is the same word four times over and the icon above it
// already carries the topic, so only the numeral survives down there.
//
// Every item keeps a label of some kind, because icon-only navigation saves
// space by making the reader guess, and this theme's inactive label ink is its
// weakest value: the icon and the label cover for each other.

const icon = (d) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        {d}
    </svg>
);

export const DESTINATIONS = [
    {
        to: "/",
        end: true,
        label: "Home",
        full: "Home, the four phases",
        icon: icon(<path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />),
    },
    {
        to: "/setup",
        label: "Setup",
        full: "Setup, download and install",
        icon: icon(
            <>
                <path d="M12 3.8v9.4" />
                <path d="M8.2 9.6 12 13.4l3.8-3.8" />
                <path d="M4.6 16.6v2.6a1 1 0 0 0 1 1h12.8a1 1 0 0 0 1-1v-2.6" />
            </>
        ),
    },
    {
        to: "/phase/understanding-claude",
        label: "Phase 1",
        short: "1",
        full: "Phase 01, Understanding Claude",
        icon: icon(
            <>
                <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
                <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
                <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
                <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
            </>
        ),
    },
    {
        to: "/phase/introducing-yourself",
        label: "Phase 2",
        short: "2",
        full: "Phase 02, Introducing Yourself",
        icon: icon(
            <>
                <circle cx="12" cy="8" r="3.6" />
                <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
            </>
        ),
    },
    {
        to: "/phase/implementing-your-systems",
        label: "Phase 3",
        short: "3",
        full: "Phase 03, Implementing Your Systems",
        icon: icon(
            <>
                <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
                <circle cx="16" cy="7" r="2.2" />
                <circle cx="8" cy="17" r="2.2" />
            </>
        ),
    },
    {
        to: "/phase/working-together",
        label: "Phase 4",
        short: "4",
        full: "Phase 04, Working Together",
        icon: icon(
            <>
                <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8" />
                <path d="M20 4v4h-4" />
                <path d="M20 12a8 8 0 0 1-13.7 5.6L4 16" />
                <path d="M4 20v-4h4" />
            </>
        ),
    },
    {
        to: "/appendix",
        label: "Appendix",
        full: "Appendix, glossary and file map",
        icon: icon(
            <>
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
            </>
        ),
    },
];
