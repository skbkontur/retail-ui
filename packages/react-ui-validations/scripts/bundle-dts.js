const dts = require('dts-bundle');

dts.bundle({
  name: '@skbkontur/react-ui-validations',
  main: 'build/declaration/react-ui-validations/src/index.d.ts',
  baseDir: 'build/declaration',
  out: '../react-ui-dist/index.d.ts',
});
