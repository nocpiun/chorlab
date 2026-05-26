import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import react from "eslint-plugin-react";
import stylistic from "@stylistic/eslint-plugin";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "components/ui/**",
  ]),
  {
    plugins: {
      react,
      "@stylistic": stylistic,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": ["error", {
        "args": "none",
        "caughtErrors": "none"
      }],
      "@typescript-eslint/consistent-type-imports": "warn",
      "import/order": ["warn", {
        groups: [
          "type",
          "builtin",
          "external",
        ],
        "newlines-between": "ignore"
      }],
      "import/first": "error",
      "import/no-duplicates": "error",
      "import/no-named-as-default": "off",
      "keyword-spacing": ["error", {
        "after": true,
        "overrides": {
          "if": { "after": false },
          "for": { "after": false },
          "while": { "after": false },
          "switch": { "after": false },
          "with": { "after": false },
        }
      }],
      "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
      "no-unneeded-braces": "off",
      "arrow-body-style": ["error", "as-needed"],
      "react/jsx-closing-bracket-location": ["error", "after-props"],
      "react/jsx-closing-tag-location": ["error", "tag-aligned"],
      "react/display-name": "off",
      "@stylistic/semi": "error",
      "@stylistic/implicit-arrow-linebreak": ["error", "beside"],
      "@stylistic/nonblock-statement-body-position": ["error", "beside"],
    }
  }
]);

export default eslintConfig;
