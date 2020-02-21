const fs = require('fs');
const path = require('path');

const defineTest = require('jscodeshift/dist/testUtils').defineTest;
jest.autoMockOff();

// defineTest(__dirname, 'changeImport', null, 'test1', { parser: 'ts' });
fs.readdirSync(path.join(__dirname, '../__testfixtures__'))
  .filter((filename: string) => filename.endsWith('.input.tsx'))
  .map((filename: string) => filename.replace('.input.tsx', ''))
  .forEach((test: string) => defineTest(__dirname, test, null, test, { parser: 'tsx' }));
