import { mount } from 'enzyme';
import React from 'react';

import { Button, ButtonType } from '../Button';

describe('Button', () => {
  it('has correct label', () => {
    const wrapper = mount(<Button>Foo</Button>);

    expect(wrapper.text()).toBe('Foo');
  });

  it('handles click event', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Button onClick={onClick} />);

    wrapper.find('button').simulate('click');

    expect(onClick.mock.calls.length).toBe(1);
  });

  (['submit', 'button', 'reset'] as ButtonType[]).forEach(type => {
    it(`sets type ${type} when type=${type} specified`, () => {
      const wrapper = mount(<Button type={type} />);
      expect(wrapper.find('button').prop('type')).toBe(type);
    });
  });

  it('handles click event', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Button onClick={onClick} />);

    wrapper.find('button').simulate('click');

    expect(onClick.mock.calls.length).toBe(1);
  });

  it('applies width from prop', () => {
    const width = '99px';
    const wrapper = mount(<Button width={width} />);

    expect(getComputedStyle(wrapper.getDOMNode()).width).toBe(width);
  });
});
