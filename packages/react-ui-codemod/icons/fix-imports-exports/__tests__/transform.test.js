const defineTest = require('jscodeshift/dist/testUtils').defineTest;
jest.autoMockOff();

defineTest(__dirname, 'transform', null, 'test_1');
defineTest(__dirname, 'transform', null, 'test_2');
defineTest(__dirname, 'transform', null, 'test_3');
