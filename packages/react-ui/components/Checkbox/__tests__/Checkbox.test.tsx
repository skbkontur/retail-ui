import React from 'react';
import { mount } from 'enzyme';

import { Checkbox, CheckboxProps } from '../Checkbox';

const render = (props: CheckboxProps) => mount<Checkbox>(<Checkbox {...props} />);

describe('<Checkbox />', () => {
  it('calls onBlur after radio click', () => {
    const onBlur = jest.fn();
    render({ onBlur }).find('input').simulate('focus').simulate('blur');
    expect(onBlur).toHaveBeenCalled();
  });
});
