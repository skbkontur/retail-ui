const dts = require('dts-bundle');

dts.bundle({
  name: '@skbkontur/react-ui-validations',
  main: 'build/declaration/src/index.d.ts',
  baseDir: 'build/declaration',
  out: '../react-ui-dist/index.d.ts',
});
dts.bundle({
  name: 'react-ui-validations',
  main: 'build/declaration/src/index.d.ts',
  baseDir: 'build/declaration',
  out: '../retail-ui-dist/index.d.ts',
});
