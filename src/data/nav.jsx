// The destinations, once.
//
// The top bar uses this at width and the bottom tab bar uses it below 900px, so
// the two can never disagree about what exists or which one you are on. Adding
// a destination is one entry here.
//
// The tab labels are not the page titles. A tab label is 10px and there are six
// of them across a phone, so each one is the one word its phase's question
// actually asks: Phase 1 asks what the pieces are, Phase 2 asks how to tell
// Claude who you are, and so on. Every item keeps a label, because icon-only
// navigation saves space by making the reader guess, and this theme's inactive
// label ink is its weakest value: the icon and the label cover for each other.

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
        label: "Start",
        full: "The four phases",
        icon: icon(<path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />),
    },
    {
        to: "/phase/understanding-claude",
        label: "Pieces",
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
        label: "You",
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
        label: "Systems",
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
        label: "Practice",
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
        label: "Look up",
        full: "Appendix",
        icon: icon(
            <>
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
            </>
        ),
    },
];
