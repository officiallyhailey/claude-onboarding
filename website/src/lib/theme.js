const KEY = "onboarding-theme";

/**
 * Which theme the site uses: "dark" or "light".
 *
 * Dark is the Clean App theme's base, and light is a rebuild of it rather than
 * an inversion, so the class on the document is `light`: the tokens in :root
 * are the dark ladder and the light one overrides them.
 *
 * First visit follows the device. Someone whose machine is in dark mode has
 * already said what they want, and asking again is asking twice.
 */
export function readTheme() {
    try {
        const saved = localStorage.getItem(KEY);
        if (saved === "light" || saved === "dark") return saved;
    } catch {
        /* storage refused; fall through to the device */
    }
    if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    return "dark";
}

export function saveTheme(theme) {
    try {
        localStorage.setItem(KEY, theme);
    } catch {
        /* the choice still applies for this visit */
    }
}

const EVENT = "theme-change";

/** Puts the theme on the document and tells every other listener. */
export function applyTheme(theme) {
    // The root only. The tokens are declared on :root and every rule resolves
    // through them, so there is nothing for a class on body to reach.
    document.documentElement.classList.toggle("light", theme === "light");
    saveTheme(theme);
    window.dispatchEvent(new CustomEvent(EVENT, { detail: theme }));
}

/** Runs `fn` whenever the theme changes. Returns the cleanup, for useEffect. */
export function onTheme(fn) {
    const h = (e) => fn(e.detail);
    window.addEventListener(EVENT, h);
    return () => window.removeEventListener(EVENT, h);
}
