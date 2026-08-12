const KEY = "onboarding-opened";

// Which phases this browser has opened.
//
// The theme's first rule about a screen you return to is that progress is shown
// rather than stated, and that it is the first thing after the title. This is
// the only fact the site can honestly show: it counts opens, not completions,
// because opening a page is the only thing this browser actually knows about.
//
// Nothing is sent anywhere. If storage refuses, every function here degrades to
// "nothing opened yet", which is also what a first visit looks like, so the
// failure mode is indistinguishable from the ordinary case.

export function openedPhases() {
    try {
        const raw = localStorage.getItem(KEY);
        const list = raw ? JSON.parse(raw) : [];
        return Array.isArray(list) ? list : [];
    } catch {
        return [];
    }
}

export function markOpened(slug) {
    try {
        const list = openedPhases();
        if (list.includes(slug)) return list;
        const next = [...list, slug];
        localStorage.setItem(KEY, JSON.stringify(next));
        return next;
    } catch {
        return openedPhases();
    }
}
