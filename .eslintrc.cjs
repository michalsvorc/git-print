module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: ["@typescript-eslint", "node"],
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "prettier",
  ],
  rules: {
    "no-console": "warn",
    "sort-imports": "warn",
    "block-scoped-var": "error",
    eqeqeq: "error",
    "no-var": "error",
    "prefer-const": "error",
    "eol-last": "error",
    "prefer-arrow-callback": "error",
    "no-trailing-spaces": "error",
    quotes: ["warn", "double", { avoidEscape: true }],
    "no-restricted-properties": [
      "error",
      {
        object: "describe",
        property: "only",
      },
      {
        object: "it",
        property: "only",
      },
    ],
    /* Turned off for ESM compatibility. */
    "node/no-missing-require": "off",
    "node/no-missing-import": "off",
    "node/no-unpublished-import": [
      "error",
      {
        allowModules: ["vitest"],
      },
    ],
  },
};
