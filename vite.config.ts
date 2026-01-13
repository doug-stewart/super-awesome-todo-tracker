/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            "@assets": path.resolve(__dirname, "./src/assets/"),
            "@components": path.resolve(__dirname, "./src/components/"),
            "@helpers": path.resolve(__dirname, "./src/helpers/"),
            "@stores": path.resolve(__dirname, "./src/stores/"),
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/setupTests.ts",
    },
});
