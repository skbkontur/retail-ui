// @flow

import { mount } from 'enzyme';
import * as React from 'react';

import Button from '../Button.js';

describe('Button', function() {
  it('has correct label', function() {
    const wrapper = mount(<Button>Foo</Button>);

    expect(wrapper.text()).toBe('Foo');
  });

  it('handles click event', function() {
    const onClick = jest.fn();
    const wrapper = mount(<Button onClick={onClick} />);

    wrapper.find('button').simulate('click');

    expect(onClick.mock.calls.length).toBe(1);
  });
});
