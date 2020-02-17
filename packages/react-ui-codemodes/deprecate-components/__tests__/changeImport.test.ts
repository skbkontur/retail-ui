const fs = require('fs');
const path = require('path');

const defineTest = require('jscodeshift/dist/testUtils').defineTest;
jest.autoMockOff();

defineTest(__dirname, 'changeImport', null, 'test1', { parser: 'ts' });
