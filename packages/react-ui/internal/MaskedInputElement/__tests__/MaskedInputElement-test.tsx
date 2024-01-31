import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { MaskedInputElement } from '../MaskedInputElement';

describe('MaskedInputElement', () => {
  it('onValueChange do not fire on focus', () => {
    const valueChangeEvent = jest.fn();
    render(<MaskedInputElement mask="+7 (999) 999 99 99" onValueChange={valueChangeEvent} />);

    const input = screen.getByRole('textbox');
    input.focus();

    expect(valueChangeEvent).not.toHaveBeenCalled();
  });

  it('masked input calls onUnexpectedInput', () => {
    const handleUnexpectedInput = jest.fn();
    render(<MaskedInputElement mask="+7 (999) 999 99 99" onUnexpectedInput={handleUnexpectedInput} />);

    const input = screen.getByRole('textbox');
    fireEvent.input(input, { target: { value: 'A' } });

    expect(handleUnexpectedInput).not.toHaveBeenCalled();
  });
});
