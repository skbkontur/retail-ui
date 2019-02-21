const commonRules = require("./rules");

module.exports = {
    parser: "babel-eslint",
    plugins: ["react", "babel", "flowtype", "prettier", "import"],
    env: {
        browser: true,
        es6: true,
        jest: true,
        node: true,
    },
    parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
            modules: true,
            jsx: true,
        },
    },
    settings: {
        flowtype: {
            onlyFilesWithFlowAnnotation: true,
        },
    },
    rules: Object.assign(
        {},
        {
            "prettier/prettier": [
                "error",
                {
                    printWidth: 120,
                    tabWidth: 4,
                    useTabs: false,
                    semi: true,
                    singleQuote: false,
                    trailingComma: "es5",
                    bracketSpacing: true,
                    jsxBracketSameLine: true,
                },
            ],
        },
        commonRules
    ),
};
