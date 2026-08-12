import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./styles/index.css";

// HashRouter rather than BrowserRouter. A built copy of this site is meant to
// be handed to someone as a folder, and opened from a file:// path or dropped
// on any static host without a rewrite rule. Deep links have to survive that,
// and a hash route is the only kind that does with no server configuration.

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </StrictMode>
);
