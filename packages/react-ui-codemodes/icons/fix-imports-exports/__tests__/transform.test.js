const defineTest = require('jscodeshift/dist/testUtils').defineTest;
jest.autoMockOff();

defineTest(__dirname, 'transform', { parser: 'flow' }, 'test_1');
defineTest(__dirname, 'transform', { parser: 'flow' }, 'test_2');
defineTest(__dirname, 'transform', { parser: 'flow' }, 'test_3');
