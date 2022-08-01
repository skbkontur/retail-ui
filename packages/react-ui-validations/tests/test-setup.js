import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom';

configure({
  testIdAttribute: 'data-tid',
});

jest.mock('../src/smoothScrollIntoView', () => {
  const originalModule = jest.requireActual('../src/smoothScrollIntoView');
  return {
    ...originalModule,
    smoothScrollIntoView: jest.fn(originalModule.smoothScrollIntoView),
  };
});
