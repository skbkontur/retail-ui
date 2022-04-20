/* eslint-disable max-len,react/no-deprecated */
import 'core-js/stable';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/dom';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

configure({
  testIdAttribute: 'data-tid',
});

jest.mock('react-focus-lock', () => (props) => <div>{props.children}</div>);
jest.mock('lodash.debounce', () =>
  jest.fn((fn) => {
    fn.cancel = jest.fn();
    return fn;
  }),
);
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

/**
 * Mock MutationObserver for `jsdom` < 13.2
 * @see https://github.com/jsdom/jsdom/pull/2398
 *
 * TODO: remove when `jest` >= 25.1.0 (`react-ui-codemod` still has an old version of `jest`)
 * @see https://github.com/facebook/jest/blob/master/CHANGELOG.md#2510
 */
global.MutationObserver = class {
  disconnect() {
    /**/
  }
  observe(element, initObject) {
    /**/
  }
};

/**
 * Since React v15.5, there's a warning printed if you access `React.createClass` or `React.PropTypes`
 * https://reactjs.org/blog/2017/04/07/react-v15.5.0.html#new-deprecation-warnings
 *
 * `import * as React from 'react'` is required by Flowtype https://flow.org/en/docs/react/types/ ,
 * but the * causes both those deprecated getters to be called.
 * This is particularly annoying in Jest since every test prints two useless warnings.
 *
 * This file can be used as a Jest setup file to simply delete those features of the `react` package.
 * You don't need the deprecation warning. Your tests will simply fail if you're still using the old ways.
 * https://facebook.github.io/jest/docs/en/configuration.html#setupfiles-array
 */

delete React.createClass;
delete React.PropTypes;
