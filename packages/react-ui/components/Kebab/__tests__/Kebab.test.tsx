import React from 'react';
import { mount } from 'enzyme';

import { MenuKebabIcon } from '../../../internal/icons/16px';
import { Kebab } from '../Kebab';

const clickOutside = () => {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('mousedown', true, true);

  document.body.dispatchEvent(event);
};

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

  it('calls onBlur after opening kebab menu', () => {
    const onBlur = jest.fn();
    const wrapper = mount(<Kebab onBlur={onBlur} />);

    wrapper.find(MenuKebabIcon).simulate('click');

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur callback after click outside', () => {
    const onBlur = jest.fn();
    const wrapper = mount(<Kebab onBlur={onBlur} />);

    wrapper.find(MenuKebabIcon).simulate('click');
    clickOutside();

    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
