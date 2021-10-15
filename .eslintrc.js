module.exports = {
  env: {
    browser: true,
    es6: true,
    jquery: true,
    jest: true,
  },
  extends: ["airbnb", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    window: true,
    document: true,
    localStorage: true,
    FormData: true,
    FileReader: true,
    Blob: true,
    navigator: true,
    Headers: true,
    Request: true,
    fetch: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  // parser: "babel-eslint",
  plugins: ["react", "prettier"],
  rules: {
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"],
      },
    ],
    /*
      allow spread operators
      This enhances readability of code by being more explicit about what props are received by the component. It is also good for maintainability by avoiding passing unintentional extra props and allowing react to emit warnings when invalid HTML props are passed to HTML elements. 
      https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
    */
    "react/jsx-props-no-spreading": [
      {
        custom: "ignore",
        explicitSpread: "ignore",
        exceptions: ["Image", "img"],
      },
    ],
    "react/prop-types": 0,
    // suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": "off",
    // allow jsx syntax in js files (for next.js project)
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }], //should add ".ts" if typescript project
    "no-underscore-dangle": 0,
    "import/imports-first": ["error", "absolute-first"],
    "import/newline-after-import": "error",
    "import/prefer-default-export": 0,
    semi: "error",
    "no-use-before-define": ["error", { variables: false }],
    "no-var": 0,
    "selector-pseudo-element-colon-notation": "single",
    "import/no-unresolved": 0,
    "import/no-webpack-loader-syntax": 0,
    "consistent-return": 0,
    "no-param-reassign": 0,
    "sort-imports": "warn",
    // suppress errors for the ++ and -- unary operators
    "no-plusplus": 0,
  },
};
