import { configure } from '@testing-library/react';
import '@testing-library/jest-dom';

configure({ testIdAttribute: 'data-tid', reactStrictMode: process?.env?.STRICT_MODE === 'true' });

jest.mock('../src/smoothScrollIntoView', () => {
  const originalModule = jest.requireActual('../src/smoothScrollIntoView');
  return {
    ...originalModule,
    smoothScrollIntoView: jest.fn(originalModule.smoothScrollIntoView),
  };
});

jest.mock('react-dom', () => {
  const originalModule = jest.requireActual('react-dom');
  return {
    ...originalModule,
    findDOMNode: jest.fn(originalModule.findDOMNode),
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

global.ResizeObserver = class {
  disconnect() {
    /**/
  }
  observe() {
    /**/
  }
  unobserve() {
    /**/
  }
};
