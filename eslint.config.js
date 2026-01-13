// @ts-check

import { fileURLToPath } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import { default as eslint } from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig([
    includeIgnoreFile(gitignorePath, "Imported .gitignore patterns"),
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        languageOptions: { globals: globals.browser },
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    importPlugin.flatConfigs.recommended,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
    eslintPluginPrettierRecommended,
    {
        plugins: { "jsx-a11y": jsxA11y },
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: { ecmaFeatures: { jsx: true } },
        },
        rules: {
            "import/default": "off",
            "import/no-named-as-default-member": "off",
            "import/no-named-as-default": "off",
            "import/no-unresolved": "off",
            "jsx-a11y/anchor-is-valid": "off",
            "prettier/prettier": ["error", {}, { usePrettierrc: true }],
        },
    },
]);
