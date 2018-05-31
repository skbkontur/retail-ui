import { mount } from 'enzyme';
import * as React from 'react';

import Button, { ButtonUse } from '../Button';
import { ButtonType } from '..';

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

  ([
    'default',
    'primary',
    'pay',
    'success',
    'danger',
    'link'
  ] as ButtonUse[]).forEach(use => {
    it(`sets class ${use} when use=${use} specified`, () => {
      const wrapper = mount(<Button use={use} />);
      expect(wrapper.find(`.${use}`)).toHaveLength(1);
    });
  });

  (['submit', 'button', 'reset'] as ButtonType[]).forEach(type => {
    it(`sets type ${type} when type=${type} specified`, () => {
      const wrapper = mount(<Button type={type} />);
      expect(wrapper.find(`button`).prop('type')).toBe(type);
    });
  });

  it('handles click event', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Button onClick={onClick} />);

    wrapper.find('button').simulate('click');

    expect(onClick.mock.calls.length).toBe(1);
  });
});
