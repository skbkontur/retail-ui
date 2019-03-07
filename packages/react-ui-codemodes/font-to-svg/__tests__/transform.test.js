const fs = require('fs');
const path = require('path');
const defineTest = require('jscodeshift/dist/testUtils').defineTest;
jest.autoMockOff();

fs.readdirSync(path.join(__dirname, '../__testfixtures__'))
  .filter(filename => filename.endsWith('.input.js'))
  .map(filename => filename.replace('.input.js', ''))
  .forEach(test => defineTest(__dirname, 'transform', null, test));
