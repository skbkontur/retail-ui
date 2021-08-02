import { mount } from 'enzyme';
import React from 'react';

import { MenuItem } from '../../MenuItem';
import { ScrollContainer } from '../ScrollContainer';
import { convertScrollbarXScrollState, convertScrollbarYScrollState } from '../ScrollContainer.helpers';

describe('ScrollContainer', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 10,
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      value: 20,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 10,
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
      configurable: true,
      value: 20,
    });
  });

  test('rendering with vertical scroll active', () => {
    const wrapper = mount(
      <ScrollContainer maxHeight={3}>
        {new Array(50).fill('').map((i, index) => (
          <MenuItem key={index}>{'test'}</MenuItem>
        ))}
      </ScrollContainer>,
    );

    expect(wrapper.find('[data-tid="ScrollContainer__ScrollBar-y"]')).toHaveLength(1);
  });

  test('rendering with horizontal scroll active', () => {
    const wrapper = mount(
      <ScrollContainer maxWidth={200}>
        {new Array(50).fill('').map((i, index) => (
          <div key={index} style={{ width: 350 }}>
            {'test'}
          </div>
        ))}
      </ScrollContainer>,
    );

    expect(wrapper.find('[data-tid="ScrollContainer__ScrollBar-x"]')).toHaveLength(1);
  });

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 0,
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      value: 0,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 0,
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
      configurable: true,
      value: 0,
    });
  });
});

describe('convertScrollbarXScrollState', () => {
  test('begin position left', () => {
    expect(convertScrollbarXScrollState('begin')).toBe('left');
  });

  test('middle position scroll', () => {
    expect(convertScrollbarXScrollState('middle')).toBe('scroll');
  });

  test('end position right', () => {
    expect(convertScrollbarXScrollState('end')).toBe('right');
  });
});

describe('convertScrollbarYScrollState', () => {
  test('begin position top', () => {
    expect(convertScrollbarYScrollState('begin')).toBe('top');
  });

  test('middle position scroll', () => {
    expect(convertScrollbarYScrollState('middle')).toBe('scroll');
  });

  test('end position bottom', () => {
    expect(convertScrollbarYScrollState('end')).toBe('bottom');
  });
});
