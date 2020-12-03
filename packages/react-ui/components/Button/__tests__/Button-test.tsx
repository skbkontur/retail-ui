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

  it('forwards props', () => {
    const handler = () => null;
    const rootProps = {
      'data-tid': 'tid',
      onFocus: handler,
      onPaste: handler,
    };
    const buttonProps: React.ButtonHTMLAttributes<HTMLElement> = {
      id: 'id',
      tabIndex: 2,
      'aria-label': 'aria-label',
      'aria-labelledby': 'aria-labelledby',
      name: 'name',
      form: 'form',
      autoFocus: true,
      disabled: true,
      formAction: 'url',
      formEncType: 'multipart/form-data',
      formMethod: 'post',
      formNoValidate: true,
      formTarget: '_self',
      type: 'submit',
      value: 'value',
    };
    const wrapper = mount(<Button {...rootProps} {...buttonProps} />);
    const root = wrapper.children();
    const button = wrapper.find('button');

    expect(root.props()).toMatchObject(rootProps);
    expect(button.props()).toMatchObject(buttonProps);
  });
});
