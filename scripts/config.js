// @flow
/* eslint-disable import/unambiguous */
module.exports = {
    retailUi: {
        name: "react-ui-validations",
        peerDependencies: {
            "retail-ui": "<1.0.0",
        },
        babel: {
            presets: [["es2015", { loose: true }], "stage-0", "react"],
            plugins: [
                [
                    "transform-define",
                    {
                        REACT_UI_PACKAGE: "retail-ui",
                    },
                ],
            ],
        },
        outDir: "dist/retail-ui",
    },
    reactUi: {
        name: "@skbkontur/react-ui-validations",
        peerDependencies: {
            "@skbkontur/react-ui": "<1.0.0",
        },
        babel: {
            presets: [["es2015", { loose: true }], "stage-0", "react"],
            plugins: [
                [
                    "transform-define",
                    {
                        REACT_UI_PACKAGE: "@skbkontur/react-ui",
                    },
                ],
            ],
        },
        outDir: "dist/react-ui",
    },
};
