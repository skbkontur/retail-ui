import { mount } from 'enzyme';
import React from 'react';

import Link from '../Link.js';

describe('', () => {
  it('calls `onClick`', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Link onClick={onClick} />);

    wrapper.find('a').simulate('click');

    expect(onClick.mock.calls.length).toBe(1);
  });

  it('does not call `onClick` when disabled', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Link disabled onClick={onClick} />);

    wrapper.find('a').simulate('click');

    expect(onClick.mock.calls.length).toBe(0);
  });
});
