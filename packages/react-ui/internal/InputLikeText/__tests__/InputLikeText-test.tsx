import React from 'react';
import { mount } from 'enzyme';

import { InputLikeText } from '../InputLikeText';

describe('placeholder', () => {
  it.each([[null], [undefined], ['']])('renders placeholder if value equals "%s"', (value) => {
    const placeholder = 'placeholder';
    const wrapper = mount(<InputLikeText placeholder={placeholder}>{value}</InputLikeText>);
    expect(wrapper.text()).toBe(placeholder);
  });

  it.each([[0], ['value']])('renders value if value equals "%s"', (value) => {
    const wrapper = mount(<InputLikeText placeholder="placeholder">{value}</InputLikeText>);
    expect(wrapper.text()).toBe(value.toString());
  });
});
