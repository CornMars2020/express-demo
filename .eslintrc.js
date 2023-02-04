module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["google"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    quotes: ["error", "double", { avoidEscape: true }],
    "max-len": ["error", { code: 80, comments: 120 }],
    "new-cap": ["error", { capIsNew: false }],
    "no-undef": ["error"],
    "quote-props": ["error", "as-needed"],
    "object-curly-spacing": ["error", "always"],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "never",
      },
    ],
  },
};
