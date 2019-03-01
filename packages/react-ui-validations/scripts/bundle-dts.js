const dts = require('dts-bundle');

dts.bundle({
  name: 'react-ui-validations',
  main: 'build/declaration/src/index.d.ts',
  baseDir: 'build/declaration',
  out: 'index.d.ts',
});
