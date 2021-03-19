import React from 'react';
import { mount } from 'enzyme';

import { Checkbox, CheckboxProps } from '../Checkbox';

const render = (props: CheckboxProps) => mount<Checkbox>(<Checkbox {...props} />);

describe('<Checkbox />', () => {
  it('calls onBlur after radio click', () => {
    const onBlur = jest.fn();
    render({ onBlur })
      .find('input')
      .simulate('focus')
      .simulate('blur');
    expect(onBlur).toHaveBeenCalled();
  });
  it('calls onFocus after click', () => {
    const onFocus = jest.fn();
    render({ onFocus })
      .find('input')
      .simulate('click');
    expect(onFocus).toHaveBeenCalledTimes(1);
  });
  it("doesn't call onFocus after second click", () => {
    const onFocus = jest.fn();
    render({ onFocus })
      .find('label')
      .simulate('click')
      .simulate('click');
    expect(onFocus).toHaveBeenCalledTimes(1);
  });
  it('calls onFocus after focus event', () => {
    const onFocus = jest.fn();
    render({ onFocus })
      .find('input')
      .simulate('focus');
    expect(onFocus).toHaveBeenCalledTimes(1);
  });
});
