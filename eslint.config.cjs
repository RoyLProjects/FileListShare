module.exports = [
  // global ignores (exclude build artifacts and generated/type files)
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/.turbo/**",
      "**/prisma/generated/**",
      "**/*.d.ts",
    ],
  },

  // Apply to JS-like source files across the repo
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      "no-console": "off",
    },
  },

  // TypeScript/TSX specific rules and parser
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      // Pass the parser module (must expose parse/parseForESLint), not a path string.
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        // We don't enable project-based type checking here to keep lint fast.
      },
    },
    // Use the plugin instance so we can reuse its recommended rules
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    },
    rules: {
      // start from the plugin's recommended set
      ...require("@typescript-eslint/eslint-plugin").configs.recommended.rules,
      // keep console allowed in this repo
      "no-console": "off",
    },
  },
];
