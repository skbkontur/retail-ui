import { mount } from 'enzyme';
import React from 'react';

import { MenuItem } from '../../MenuItem';
import { ScrollContainer } from '../ScrollContainer';

describe('ScrollContainer', () => {
  test('renders with proper scroll state', () => {
    const wrapper = mount(
      <ScrollContainer>
        {new Array(50).fill('').map((i, index) => (
          <MenuItem key={index}>{'test'}</MenuItem>
        ))}
      </ScrollContainer>,
    );

    expect(wrapper.state('scrollState')).toEqual('top');
  });
});
