import { mount } from 'enzyme';
import React from 'react';

import { MenuItem } from '../../MenuItem';
import { ScrollContainer } from '../ScrollContainer';
import { convertScrollbarXScrollState, convertScrollbarYScrollState } from '../ScrollContainer.helpers';

describe('ScrollContainer', () => {
  test('rendering with correct vertical scroll state', () => {
    const wrapper = mount(
      <ScrollContainer>
        {new Array(50).fill('').map((i, index) => (
          <MenuItem key={index}>{'test'}</MenuItem>
        ))}
      </ScrollContainer>,
    );

    expect(wrapper.prop('refScrollY').state).toMatchObject({ scrollState: 'begin' });
  });

  test('rendering with correct horizontal scroll state', () => {
    const wrapper = mount(
      <ScrollContainer maxWidth={200}>
        {new Array(50).fill('').map((i, index) => (
          <div key={index} style={{ width: 350 }}>
            {'test'}
          </div>
        ))}
      </ScrollContainer>,
    );

    expect(wrapper.prop('refScrollX').state).toMatchObject({ scrollState: 'begin' });
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
