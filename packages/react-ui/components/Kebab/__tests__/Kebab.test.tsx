import React from 'react';
import { mount } from 'enzyme';

import { MenuKebabIcon } from '../../../internal/icons/16px';
import { Kebab } from '../Kebab';

describe('Kebab', () => {
  it('calls onFocus callback', () => {
    const onFocus = jest.fn();
    const wrapper = mount(<Kebab onFocus={onFocus} />);

    wrapper.find(MenuKebabIcon).simulate('focus');

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur callback', () => {
    const onBlur = jest.fn();
    const wrapper = mount(<Kebab onBlur={onBlur} />);

    wrapper.find(MenuKebabIcon).simulate('focus').simulate('blur');

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('does not call onBlur after opening kebab menu', () => {
    const onBlur = jest.fn();
    const wrapper = mount(<Kebab onBlur={onBlur} />);

    wrapper.find(MenuKebabIcon).simulate('click');

    expect(onBlur).toHaveBeenCalledTimes(0);
  });
});
