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

window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
});
