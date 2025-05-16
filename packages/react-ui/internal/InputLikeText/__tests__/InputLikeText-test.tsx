import React from 'react';
import { render, screen } from '@testing-library/react';

import { InputLikeText, InputLikeTextDataTids } from '../InputLikeText';

describe('InputLikeText', () => {
  describe('placeholder', () => {
    it.each([[null], [undefined], ['']])('renders placeholder if value equals "%s"', (value) => {
      const placeholder = 'placeholder';
      const { baseElement } = render(<InputLikeText placeholder={placeholder}>{value}</InputLikeText>);
      expect(baseElement.textContent).toBe(placeholder);
    });

    it.each([[0], ['value']])('renders value if value equals "%s"', (value) => {
      const { baseElement } = render(<InputLikeText placeholder="placeholder">{value}</InputLikeText>);
      expect(baseElement.textContent).toBe(value.toString());
    });
  });

  it('should pass disabled to native input', () => {
    render(<InputLikeText disabled />);

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByTestId(InputLikeTextDataTids.nativeInput)).toBeDisabled();
  });
});
