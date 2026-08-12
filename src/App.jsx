import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import TabBar from "./components/TabBar";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Setup from "./pages/Setup";
import Phase from "./pages/Phase";
import Appendix from "./pages/Appendix";
import NotFound from "./pages/NotFound";
import { readTheme, onTheme } from "./lib/theme";

function App() {
    const { pathname } = useLocation();

    // A new page starts at the top. Without this, following the pager from the
    // bottom of one phase lands you halfway down the next one, and going from a
    // phase to the appendix opens it in the middle of the file map. It lives
    // here rather than on a page so no page can forget it.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // Dark is the theme's base and lives in :root, so `light` is the class that
    // does the overriding. Nothing is set on body: every rule on this site
    // resolves through the token ladders, which are declared on the root.
    const [theme, setTheme] = useState(() => readTheme());
    useEffect(() => onTheme(setTheme), []);
    useEffect(() => {
        document.documentElement.classList.toggle("light", theme === "light");
    }, [theme]);

    return (
        <>
            <Header />
            {/* Keyed on the path, so moving to another page clears an error
                rather than carrying it along. */}
            <ErrorBoundary key={pathname} resetKey={pathname}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/setup" element={<Setup />} />
                    <Route path="/phase/:slug" element={<Phase />} />
                    <Route path="/appendix" element={<Appendix />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ErrorBoundary>
            {/* After the content, not before: the bar is sticky rather than
                fixed, so it has to be the last thing in the flow for the last
                row of a page to sit clear of it. */}
            <TabBar />
        </>
    );
}

export default App;
