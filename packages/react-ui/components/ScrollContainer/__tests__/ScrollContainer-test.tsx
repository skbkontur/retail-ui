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
    const offsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight') as PropertyDecorator &
      ThisType<any>;
    const scrollHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollHeight') as PropertyDecorator &
      ThisType<any>;
    const offsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth') as PropertyDecorator &
      ThisType<any>;
    const scrollWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollWidth') as PropertyDecorator &
      ThisType<any>;
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', offsetHeight);
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', scrollHeight);

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', offsetWidth);
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', scrollWidth);
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
