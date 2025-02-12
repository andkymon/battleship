import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.browser },
    env: {
      browser: true,
      amd: true,
      node: true,
    },
  },
  pluginJs.configs.recommended,
];
