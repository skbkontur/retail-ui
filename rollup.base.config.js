import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

export function buildConfig(outputDir, reactUiPackageName) {
    return {
        input: "src/index.js",
        output: {
            file: outputDir + "/index.js",
            format: "cjs",
            sourcemap: outputDir + "/index.js.map",
        },
        plugins: [
            resolve({
                extensions: [".js", ".jsx"],
            }),
            babel({
                plugins: [
                    "external-helpers",
                    [
                        "transform-define",
                        {
                            REACT_UI_PACKAGE: reactUiPackageName,
                        },
                    ],
                ],
                exclude: "node_modules/**",
                externalHelpers: false,
            }),
        ],
        external: ["lodash.isequal", "react-dom", "react", "prop-types", "add-event-listener"],
    };
}
