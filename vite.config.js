import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Port 5175 on purpose. 5173 is the default any other project takes, and 5174
// belongs to the backend lessons site this one borrows its look from; both may
// be open at the same time.
//
// `base: "./"` so a built copy opens from a folder or any sub-path, not only
// from a domain root. This site is meant to be handed to someone.
export default defineConfig({
    plugins: [react()],
    base: "./",
    server: {
        port: 5175,
    },
});
