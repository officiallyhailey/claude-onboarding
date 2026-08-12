// The Claude burst, as the site's mark.
//
// Twelve tapered spokes from a solid centre, alternating long and short. Drawn
// rather than loaded: an <img> would be one more request and would not take
// currentColor, and the mark has to sit in both palettes and in the accent.
//
// Angles run every 30 degrees from straight up. Each spoke starts just off the
// centre so the middle reads as solid rather than as twelve lines meeting at a
// point, and the round caps are what keep it from looking like a compass rose.

const SPOKES = [
    [12, 10.6, 12, 3.0],
    [12.7, 10.79, 15.7, 5.59],
    [13.21, 11.3, 19.79, 7.5],
    [13.4, 12, 19.4, 12],
    [13.21, 12.7, 19.79, 16.5],
    [12.7, 13.21, 15.7, 18.41],
    [12, 13.4, 12, 21.0],
    [11.3, 13.21, 8.3, 18.41],
    [10.79, 12.7, 4.21, 16.5],
    [10.6, 12, 4.6, 12],
    [10.79, 11.3, 4.21, 7.5],
    [11.3, 10.79, 8.3, 5.59],
];

function ClaudeMark({ size = 18 }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            aria-hidden="true"
            focusable="false"
        >
            <g stroke="currentColor" strokeWidth="2.15" strokeLinecap="round">
                {SPOKES.map(([x1, y1, x2, y2], i) => (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                ))}
            </g>
        </svg>
    );
}

export default ClaudeMark;
