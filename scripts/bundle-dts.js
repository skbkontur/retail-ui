const dts = require("dts-bundle");

dts.bundle({
    name: "react-ui-validations",
    main: "declaration/src/index.d.ts",
    baseDir: "declaration",
    out: "index.d.ts",
});
