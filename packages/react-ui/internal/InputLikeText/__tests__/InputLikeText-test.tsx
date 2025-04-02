import React from 'react';
import { render, screen } from '@testing-library/react';
import { mount } from 'enzyme';

import { InputLikeText, InputLikeTextDataTids } from '../InputLikeText';

describe('InputLikeText', () => {
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

  it('should pass disabled to native input', () => {
    render(<InputLikeText disabled />);

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByTestId(InputLikeTextDataTids.nativeInput)).toBeDisabled();
  });
});
