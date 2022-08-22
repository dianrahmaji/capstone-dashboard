module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "react-app",
    "react-app/jest",
    "airbnb",
    "plugin:react/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./jsconfig.json",
  },
  plugins: ["react", "tailwindcss", "prettier"],
  rules: {
    quotes: ["error", "double", { avoidEscape: true }],
    "react/jsx-uses-react": "off",
    // suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    // allow jsx syntax in js files (for next.js project)
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }], // should add ".ts" if typescript project
    "react/prop-types": "off",
    "no-shadow": "off",
    "no-underscore-dangle": "off",
    "import/no-unresolved": "off", // TODO: fix this
    "import/extensions": "off", // TODO: fix this
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["to"],
      },
    ],
  },
};
